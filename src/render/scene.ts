import * as THREE from "three";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";
import type { Layout } from "../layout";
import { layoutExtent } from "../layout";
import { LabelLayer, type PlacedLabel, type ScreenCircle, type ZoomTier } from "../ui/labels";
import { Nebulae } from "./nebula";
import { FLIGHT_MAX_POINT, FLIGHT_SIZE_SCALE, MAP_MAX_POINT, StarField, createBackdrop, nebulaColor, type AppearanceFn, type EmphasisMode, type RenderStar } from "./stars";
import { FLIGHT_SCALE, Flight, type FlightInput } from "./flight";
import { createShip } from "./ship";
import { FlightNebulae, FlightSky } from "./sky";
import { FlightSigns, FlightWindows, WINDOW_RADIUS, type WindowStar } from "../ui/flight-windows";
import { flightHeights } from "../layout/lift";
import { ConstellationLayer, type DrawnConstellation } from "./constellations";
import type { ConstellationPoint } from "../constellation";

/** 星に入る（SPEC 13 章）：芯の半径、突入の演出の長さ、開いた後の押し戻しと、同じ星に反応しない時間。
 *  半径と押し戻しは、広げた空間（FLIGHT_SCALE 倍）の単位 */
const STAR_CORE_RADIUS = 0.45 * FLIGHT_SCALE;
const DIVE_SECONDS = 0.45;
const PUSH_BACK = 2.5 * FLIGHT_SCALE;
const ENTRY_COOLDOWN_MS = 4000;
const CAMERA_FOV = 50;
/** 検索中に星座の線を描かない範囲：外側の軌道（半径 2.55）の少し外まで（検索の単位の倍数） */
const SEARCH_HOLE = 2.55 * 1.2;

/** 静止時のカメラの傾き（真上から 40 度。SPEC 7 章） */
const TILT = THREE.MathUtils.degToRad(40);
/** 右ドラッグで変えられる傾きの上限（真上から 60 度。水平方向には回さない） */
const MAX_TILT = THREE.MathUtils.degToRad(60);
/** 星団名・星座へのカメラ移動にかける時間 */
const CLUSTER_FOCUS_SECONDS = 0.6;
/** 「中距離」の代表の距離（地図全体が収まる距離に対する割合） */
const MID_DISTANCE = 0.85;
const POINTS_FOCUS_SECONDS = 0.65;
/** キー操作の移動の速さ（1 秒あたり、カメラ距離に対する割合）と、ズームの速さ */
const KEY_PAN_SPEED = 0.8;
const KEY_ZOOM_RATE = 1.1;
/** 動き出しと止まりの加速・減速のなめらかさ（大きいほど速く目標の速さに着く） */
const KEY_EASE = 9;
const MOVE_KEYS: Record<string, [number, number]> = {
  KeyW: [0, 1], KeyS: [0, -1], KeyA: [-1, 0], KeyD: [1, 0],
};

/** 文字を打っている最中か（キー操作を無効にする） */
function typing(): boolean {
  const el = document.activeElement as HTMLElement | null;
  return !!el && (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el.isContentEditable);
}
/** 傾き⇄真上の切り替えにかける時間（SPEC 7 章） */
const TURN_SECONDS = 0.6;

function boundsOf(stars: { x: number; y: number }[], fallback: number) {
  if (stars.length === 0) return { minX: -fallback, maxX: fallback, minY: -fallback, maxY: fallback };
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const s of stars) {
    minX = Math.min(minX, s.x); maxX = Math.max(maxX, s.x);
    minY = Math.min(minY, s.y); maxY = Math.max(maxY, s.y);
  }
  return { minX, maxX, minY, maxY };
}

export type LabelSource = {
  clusters: { index: number; name: string; x: number; y: number; radius: number; count: number }[];
  stars: { id: string; title: string; url: string; x: number; y: number; cluster: number; rank: number }[];
};

export class SpaceView {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly controls: MapControls;
  private readonly clock = new THREE.Clock();
  private readonly backdrop: THREE.Points;
  private readonly field = new StarField();
  private readonly nebulae = new Nebulae();
  private readonly constellations = new ConstellationLayer();
  private readonly labels: LabelLayer;

  private running = false;
  private extent = 60;
  private bounds = { minX: -30, maxX: 30, minY: -30, maxY: 30 };
  /** 地図全体が画面の約 80% に収まる距離。拡大率の段階はこれを基準にする。 */
  private fitDistance = 90;
  private labelSource: LabelSource = { clusters: [], stars: [] };
  private labelsDirty = true;
  private lastLabelMotion = 0;
  private lastLabelTier: ZoomTier | null = null;
  private readonly lastLabelCamera = new THREE.Matrix4();
  private labelCameraKnown = false;
  private labelDecisions = 0;
  private labelPositionUpdates = 0;
  private maxLabelPositionMs = 0;
  private screenCircles: ScreenCircle[] = [];
  private tilt = TILT;
  private tiltTarget = TILT;
  private tiltSpeed = TILT / TURN_SECONDS;
  private preferredTilt = TILT;
  private tiltPointer: number | null = null;
  private tiltPointerY = 0;
  private tiltCapture: HTMLElement | null = null;
  private focus: { from: THREE.Vector3; to: THREE.Vector3; fromDistance: number;
    toDistance: number; elapsed: number; duration: number } | null = null;
  private readonly keys = new Set<string>();
  private readonly keyPan = new THREE.Vector2();
  private keyZoom = 0;
  private editIds: string[] = [];
  /** 飛行モード（SPEC 13 章）。入る前の検索は flightSearch に預け、出たら掛け直す */
  private readonly flight = new Flight();
  private readonly flightLook = new THREE.Vector3();
  private readonly ship = createShip();
  private readonly sky = new FlightSky();
  private readonly flightNebulae = new FlightNebulae();
  private readonly signs = new FlightSigns(document.getElementById("flight-signs") ?? document.body);
  private readonly windows = new FlightWindows(document.getElementById("flight-windows") ?? document.body);
  private windowStars: WindowStar[] = [];
  /** 星に入る演出の途中。終わるとページを開き、宇宙船を押し戻す */
  private dive: { id: string; elapsed: number } | null = null;
  /** 星ごとの、次に反応してよい時刻（performance.now） */
  private readonly entryCooldown = new Map<string, number>();
  private lastEntry: string | null = null;
  private readonly flash = document.getElementById("flight-flash");
  /** 星の芯に入ったとき（突入の演出の後）に呼ばれる。main がそのページを新しいタブで開く */
  onEnterStar: ((id: string) => void) | null = null;
  /** 飛行中のマウスの位置（画面中央からのずれ、-1〜1）。入った直後は 0（動かすまで機首は動かない） */
  private readonly flightMouse = new THREE.Vector2();
  private flightSearch: string[] | null = null;
  private heights = new Map<string, number>();
  /** 飛行モードに入った・出たときに呼ばれる（画面の部品の出し分けは main が行う） */
  onFlightChange: ((active: boolean) => void) | null = null;
  /** 星座を選んだまま検索を始めたときのカメラ。検索を消したらここへ戻す */
  private searchStash: { target: THREE.Vector3; distance: number } | null = null;
  private emphasisIds = new Set<string>();
  private emphasisMode: EmphasisMode = "none";
  private searchIds: string[] = [];
  private searchCenter = { x: 0, y: 0 };
  private searchUnit = 1;
  private readonly blackHole = new THREE.Group();
  private readonly trace = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: 0x91baff, transparent: true, opacity: 0.32, depthWrite: false }),
  );
  private readonly tails = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      vertexShader: `attribute float aAlpha; varying float vAlpha;
        void main() { vAlpha = aAlpha; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `varying float vAlpha;
        void main() { gl_FragColor = vec4(0.56, 0.73, 1.0, vAlpha); }`,
    }),
  );
  private readonly selectedHalo = new THREE.Mesh(
    new THREE.RingGeometry(0.35, 0.47, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, side: THREE.DoubleSide }),
  );
  private selectedId: string | null = null;
  private hoveredId: string | null = null;
  private fullTraceCount = 0;
  private maxTailPixels = 0;
  private constellationName: HTMLElement | null = null;
  private constellationNameId: string | null = null;
  private constellationNameWait = false;

  /** 描画できたコマ数。計算中も画面が動いていることの確認に使う。 */
  frames = 0;
  onStarLabelClick: ((id: string) => void) | null = null;

  constructor(private readonly canvas: HTMLCanvasElement, labelContainer: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.setClearColor(0x070a18, 1);

    this.camera = new THREE.PerspectiveCamera(50, 1, 0.5, 6000);
    this.camera.position.set(0, 90 * Math.cos(TILT), 90 * Math.sin(TILT));
    this.camera.lookAt(0, 0, 0);

    this.controls = new MapControls(this.camera, canvas);
    // SPEC 7 章：操作は移動と拡大縮小のみ。自由な回転は許可しない。
    this.controls.enableRotate = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 6;
    this.controls.maxDistance = 2000;
    this.controls.addEventListener("start", () => { this.focus = null; });
    for (const surface of [canvas, labelContainer]) {
      surface.addEventListener("pointerdown", this.onTiltStart, true);
      surface.addEventListener("pointermove", this.onTiltMove, true);
      surface.addEventListener("pointerup", this.onTiltEnd, true);
      surface.addEventListener("pointercancel", this.onTiltEnd, true);
      surface.addEventListener("contextmenu", (event) => event.preventDefault());
    }

    this.backdrop = createBackdrop();
    this.scene.add(this.backdrop);
    this.scene.add(this.nebulae.object);
    this.scene.add(this.field.object);
    this.scene.add(this.constellations.object);
    this.constellationName = document.getElementById("constellation-name");
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.5, 2.5).rotateX(-Math.PI / 2),
      new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, depthTest: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `varying vec2 vUv;
          void main() {
            float r = length((vUv - 0.5) * 2.5);
            float ring = exp(-pow((r - 0.42) / 0.09, 2.0));
            float halo = exp(-pow((r - 0.55) / 0.31, 2.0));
            gl_FragColor = vec4(0.48, 0.65, 1.0, ring * 0.68 + halo * 0.28);
          }`,
      }),
    );
    glow.position.y = 0.05;
    glow.renderOrder = 2;
    this.blackHole.add(glow);
    const core = new THREE.Mesh(new THREE.CircleGeometry(0.36, 48),
      new THREE.MeshBasicMaterial({ color: 0x000004, side: THREE.DoubleSide, depthTest: false }));
    core.rotation.x = -Math.PI / 2;
    core.position.y = 0.08;
    core.renderOrder = 3;
    this.blackHole.add(core);
    const rim = new THREE.Mesh(new THREE.RingGeometry(0.355, 0.395, 64),
      new THREE.MeshBasicMaterial({ color: 0xa8c5ff, transparent: true, opacity: 0.95,
        side: THREE.DoubleSide, depthWrite: false, depthTest: false }));
    rim.rotation.x = -Math.PI / 2;
    rim.position.y = 0.09;
    rim.renderOrder = 4;
    this.blackHole.add(rim);
    for (const radius of [1, 1.75, 2.55]) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(radius - 0.012, radius + 0.012, 96),
        new THREE.MeshBasicMaterial({ color: 0x7897df, transparent: true, opacity: 0.23, side: THREE.DoubleSide }));
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.03;
      this.blackHole.add(ring);
    }
    this.blackHole.visible = false;
    this.scene.add(this.blackHole);
    this.trace.visible = false;
    this.trace.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(2 * 6), 3).setUsage(THREE.DynamicDrawUsage));
    this.trace.geometry.setDrawRange(0, 0);
    this.scene.add(this.trace);
    this.tails.visible = false;
    this.tails.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(21 * 8 * 3), 3).setUsage(THREE.DynamicDrawUsage));
    this.tails.geometry.setAttribute("aAlpha", new THREE.BufferAttribute(new Float32Array(21 * 8), 1).setUsage(THREE.DynamicDrawUsage));
    this.tails.geometry.setDrawRange(0, 0);
    this.scene.add(this.tails);
    this.selectedHalo.rotation.x = -Math.PI / 2;
    this.selectedHalo.visible = false;
    this.scene.add(this.selectedHalo);

    this.labels = new LabelLayer(labelContainer);
    this.labels.onHover = (key) => this.hoverStar(key);
    this.labels.onClick = (key) => this.onStarLabelClick?.(key);
    this.labels.onClusterClick = (cluster) => this.focusCluster(cluster);

    addEventListener("resize", this.resize);
    this.scene.add(this.ship.group);
    this.scene.add(this.sky.object);
    this.scene.add(this.flightNebulae.object);
    window.addEventListener("mousemove", (event: MouseEvent) => {
      if (!this.flight.active) return;
      this.flightMouse.set(event.clientX / innerWidth * 2 - 1, event.clientY / innerHeight * 2 - 1);
    });
    document.addEventListener("mouseleave", () => this.flightMouse.set(0, 0));
    addEventListener("keydown", this.onKeyDown);
    addEventListener("keyup", this.onKeyUp);
    // ウィンドウからフォーカスが外れたら、押したままの状態をすべて解除する
    addEventListener("blur", this.releaseKeys);
    document.addEventListener("visibilitychange", this.releaseKeys);
    this.resize();
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (typing() || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.code in MOVE_KEYS) this.keys.add(event.code);
    else if (event.code === "Space") {
      this.keys.add("Space");
      event.preventDefault();   // ページのスクロールや、フォーカス中のボタンの押下を止める
    } else if (event.key === "Shift") this.keys.add("Shift");
  };

  private readonly onKeyUp = (event: KeyboardEvent): void => {
    if (event.code in MOVE_KEYS) this.keys.delete(event.code);
    else if (event.code === "Space") { this.keys.delete("Space"); event.preventDefault(); }
    else if (event.key === "Shift") this.keys.delete("Shift");
  };

  private readonly releaseKeys = (): void => { this.keys.clear(); };

  /** W・A・S・D で移動、Space で縮小、Shift で拡大。押している間は連続で、始まりと終わりはなめらかに。 */
  private applyKeys(dt: number): void {
    if (typing()) this.keys.clear();
    const dir = new THREE.Vector2();
    for (const code of this.keys) {
      const d = MOVE_KEYS[code];
      if (d) dir.add(new THREE.Vector2(d[0], d[1]));
    }
    if (dir.lengthSq() > 0) dir.normalize();   // 斜めでも同じ速さ
    const distance = this.camera.position.distanceTo(this.controls.target);
    const ease = 1 - Math.exp(-dt * KEY_EASE);
    this.keyPan.lerp(dir.multiplyScalar(distance * KEY_PAN_SPEED), ease);
    const zoomWant = (this.keys.has("Space") ? 1 : 0) - (this.keys.has("Shift") ? 1 : 0);
    this.keyZoom += (zoomWant * KEY_ZOOM_RATE - this.keyZoom) * ease;

    const panning = this.keyPan.length() > distance * 0.002;
    const zooming = Math.abs(this.keyZoom) > 0.002;
    if (!panning) this.keyPan.set(0, 0);
    if (!zooming) this.keyZoom = 0;
    if (!panning && !zooming) return;
    this.focus = null;
    // 画面の上＝地図の +y（three の -z）。水平方向の回転はしないので、画面の向きと地図の向きは常に同じ
    this.controls.target.x += this.keyPan.x * dt;
    this.controls.target.z -= this.keyPan.y * dt;
    const next = THREE.MathUtils.clamp(distance * Math.exp(this.keyZoom * dt),
      this.controls.minDistance, this.controls.maxDistance);
    this.setDistance(next);
  }

  setLayout(layout: Layout, stars: RenderStar[], source: LabelSource, frame = true): void {
    this.field.setStars(stars);
    this.field.setEmphasis([...this.emphasisIds], this.emphasisMode);
    // 飛行モードの高さ。配置が変わるたびに取り直す（地図の座標は変えない）
    this.heights = flightHeights(layout);
    this.field.setHeights(this.heights);
    this.placeFlightClusters(layout, source);
    this.field.setLift(this.flight.lift);
    if (this.flight.active) frame = false;   // 飛行中はカメラを宇宙船が持っている
    this.nebulae.set(
      source.clusters
        .filter((c) => c.count > 0)
        .map((c) => ({ x: c.x, y: c.y, radius: c.radius, color: nebulaColor(c.index), seed: c.index })),
    );
    this.labelSource = source;
    this.windowStars = source.stars.map((star) => ({ id: star.id, title: star.title, url: star.url }));
    this.extent = layoutExtent(layout);
    this.bounds = boundsOf(stars, this.extent);
    if (frame) this.frameAll();
    this.resize();
    this.labelsDirty = true;
  }

  setConstellations(rows: DrawnConstellation[]): void {
    this.constellations.set(rows);
    this.constellations.setLift((id) => this.heights.get(id) ?? 0, this.flight.lift);
    this.refreshEmphasis();
  }

  setEditMembers(points: ConstellationPoint[]): void {
    this.editIds = points.map((point) => point.id);
    this.refreshEmphasis();
  }

  /**
   * 星座の星を強調し、小さな輪を付け、タイトルを優先する。
   * 星座を選んだまま検索しているときは検索を前面に出す：星座の線を暗くし、強調・輪・タイトルの優先・名前を解く
   * （編集中は、選んでいる星が見えないと困るので強調を残す）。
   */
  private refreshEmphasis(): void {
    const searching = this.searchIds.length > 0;
    const selected = this.constellationNameId && !searching ? this.constellations.points(this.constellationNameId) : [];
    const mode: EmphasisMode = this.editIds.length ? "edit" : selected.length ? "selected" : "none";
    this.constellations.select(searching ? null : this.constellationNameId);
    if (this.constellationName && !this.constellationNameWait) {
      this.constellationName.classList.toggle("is-visible", !!this.constellationNameId && !searching);
    }
    const ids = mode === "edit" ? this.editIds : selected.map((point) => point.id);
    this.emphasisIds = new Set(ids);
    this.emphasisMode = mode;
    this.field.setEmphasis(ids, mode);
    this.constellations.editMembers(ids.flatMap((id) => {
      const p = this.field.displayPosition(id);
      return p ? [{ id, ...p }] : [];
    }), mode === "edit");
    this.labelsDirty = true;
  }

  selectConstellation(id: string | null, name = ""): void {
    this.constellations.select(id);
    this.constellationNameId = id;
    this.searchStash = null;   // 選び直したら、検索前のカメラには戻さない
    this.refreshEmphasis();
    this.constellationNameWait = false;
    if (this.constellationName) {
      this.constellationName.textContent = name;
      this.constellationName.classList.toggle("is-visible", !!id);
    }
  }

  saveConstellation(id: string, name: string, points: ConstellationPoint[]): void {
    this.setTopDown(true);
    this.setSearch([]);
    this.selectSearch(null);
    this.constellations.select(id);
    this.constellations.startDrawing(id);
    this.constellationNameId = id;
    this.refreshEmphasis();
    this.constellationNameWait = true;
    if (this.constellationName) {
      this.constellationName.textContent = name;
      this.constellationName.classList.remove("is-visible");
    }
    this.focusPoints(points);
  }

  /**
   * 星座全体が、画面の部品（検索欄・画面下の星座一覧と操作・左上のパネル）を除いた領域に収まるよう寄る。
   * 傾きの移動中なら行き先の傾きで合わせる。カメラを仮に動かして投影し、位置と距離を詰めていく。
   */
  focusPoints(points: ConstellationPoint[]): void {
    if (!points.length) return;
    const safe = this.safeRect();
    const size = this.renderer.getSize(new THREE.Vector2());
    const saved = { target: this.controls.target.clone(), position: this.camera.position.clone(), tilt: this.tilt };
    const b = boundsOf(points, this.extent);
    const target = new THREE.Vector3((b.minX + b.maxX) / 2, 0, -(b.minY + b.maxY) / 2);
    let distance = Math.max(this.controls.minDistance, (b.maxX - b.minX + b.maxY - b.minY) * 1.2 + 10);
    const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const ray = new THREE.Raycaster();
    const hit = (px: number, py: number) => {
      ray.setFromCamera(new THREE.Vector2(px / size.x * 2 - 1, -(py / size.y) * 2 + 1), this.camera);
      return ray.ray.intersectPlane(ground, new THREE.Vector3());
    };
    const p = new THREE.Vector3();
    this.tilt = this.tiltTarget;
    for (let i = 0; i < 8; i++) {
      this.controls.target.copy(target);
      this.setDistance(distance);
      this.camera.updateMatrixWorld();
      let l = Infinity, r = -Infinity, t = Infinity, bottom = -Infinity;
      for (const point of points) {
        p.set(point.x, 0, -point.y).project(this.camera);
        const sx = (p.x * 0.5 + 0.5) * size.x, sy = (-p.y * 0.5 + 0.5) * size.y;
        l = Math.min(l, sx); r = Math.max(r, sx); t = Math.min(t, sy); bottom = Math.max(bottom, sy);
      }
      // 星の大きさとタイトル分の余白を見込んで、領域の 80% に収める
      const scale = Math.max((r - l + 24) / (safe.width * 0.8), (bottom - t + 24) / (safe.height * 0.8), 0.05);
      const from = hit((l + r) / 2, (t + bottom) / 2);
      const to = hit(safe.left + safe.width / 2, safe.top + safe.height / 2);
      if (from && to) target.add(from.sub(to));
      distance = THREE.MathUtils.clamp(distance * scale, this.controls.minDistance, this.controls.maxDistance);
    }
    this.controls.target.copy(saved.target);
    this.camera.position.copy(saved.position);
    this.tilt = saved.tilt;
    this.controls.update();
    this.focus = { from: this.controls.target.clone(), to: target,
      fromDistance: this.camera.position.distanceTo(this.controls.target), toDistance: distance,
      elapsed: 0, duration: POINTS_FOCUS_SECONDS };
  }

  /** 画面の部品を除いた、星座を置いてよい領域（左上のパネルは、上か左のどちらかを削る方を選ぶ）。 */
  safeRect(): { left: number; top: number; width: number; height: number } {
    const size = this.renderer.getSize(new THREE.Vector2());
    const rectOf = (id: string) => {
      const el = document.getElementById(id);
      if (!el || el.hidden || getComputedStyle(el).display === "none") return null;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 ? r : null;
    };
    const pad = 12;
    const search = rectOf("search-box");
    const bottoms = ["constellation-list", "constellation-manage"].map(rectOf).filter((r) => !!r) as DOMRect[];
    const panel = ["hud", "hud-toggle"].map(rectOf).filter((r) => !!r) as DOMRect[];
    const top = (search?.bottom ?? 0) + pad;
    const bottom = Math.min(size.y, ...bottoms.map((r) => r.top)) - pad;
    const panelRight = Math.max(0, ...panel.map((r) => r.right)) + pad;
    const panelBottom = Math.max(0, ...panel.map((r) => r.bottom)) + pad;
    const beside = { left: panel.length ? panelRight : pad, top, right: size.x - pad, bottom };
    const below = { left: pad, top: Math.max(top, panel.length ? panelBottom : 0), right: size.x - pad, bottom };
    const area = (r: typeof beside) => Math.max(0, r.right - r.left) * Math.max(0, r.bottom - r.top);
    const best = area(beside) >= area(below) ? beside : below;
    return { left: best.left, top: best.top, width: Math.max(40, best.right - best.left), height: Math.max(40, best.bottom - best.top) };
  }

  constellationAnimationState(): ReturnType<ConstellationLayer["animationState"]> {
    return this.constellations.animationState();
  }

  constellationGeometry(): ReturnType<ConstellationLayer["geometry"]> {
    return this.constellations.geometry();
  }

  get inFlight(): boolean {
    return this.flight.active;
  }

  /** タブを離れる直前に保存する地図の視点。飛行中は入る前の視点を返す。 */
  navigationCamera(): { x: number; y: number; distance: number; tilt: number } {
    return { x: this.controls.target.x, y: -this.controls.target.z,
      distance: this.flight.active ? this.flight.returnDistance : this.camera.position.distanceTo(this.controls.target),
      tilt: this.flight.active ? this.preferredTilt : this.tilt };
  }

  restoreNavigationCamera(saved: { x: number; y: number; distance: number; tilt: number }): void {
    this.focus = null;
    this.controls.target.set(saved.x, 0, -saved.y);
    this.tilt = this.tiltTarget = this.preferredTilt = THREE.MathUtils.clamp(saved.tilt, 0, MAX_TILT);
    this.setDistance(saved.distance);
    this.labelsDirty = true;
  }

  /** 保存した船の位置から、突入アニメーションを挟まずに再開する。座標は地図の単位。 */
  resumeFlight(saved: { x: number; y: number; z: number; yaw: number; pitch: number; speed: number }): void {
    if (!this.enterFlight()) return;
    this.flight.resume(new THREE.Vector3(saved.x * FLIGHT_SCALE, saved.z * FLIGHT_SCALE, -saved.y * FLIGHT_SCALE),
      saved.yaw, saved.pitch, saved.speed, this.camera, this.flightLook);
    this.field.setLift(1);
    this.field.object.scale.setScalar(FLIGHT_SCALE);
    this.constellations.object.scale.setScalar(FLIGHT_SCALE);
    this.constellations.setLift((id) => this.heights.get(id) ?? 0, 1);
    this.flightNebulae.setOpacity(1);
  }

  /**
   * 飛行モードに入る（SPEC 13 章）。どの画面からでも入れる。
   * 入る前の検索は預けて軌道を解き（立体の星空では軌道を描かない。3b で飛行中の検索を作る）、出たら掛け直す。
   * 星座の選択はそのまま（輪と名前だけ隠す）。
   */
  enterFlight(): boolean {
    if (this.flight.active) return false;
    this.flightSearch = this.searchIds.slice();
    this.searchIds = [];
    this.field.setSearch([], this.searchCenter, this.searchUnit);
    this.constellations.setSearchHole(null);
    this.blackHole.visible = false;
    this.trace.visible = false;
    this.tails.visible = false;
    this.selectedHalo.visible = false;
    this.focus = null;
    this.keys.clear();
    this.controls.enabled = false;
    this.labels.clear();
    this.nebulae.object.visible = false;   // 平面の星雲は、立体の星の雲には合わない
    this.constellations.setFlight(true);
    this.constellationName?.classList.remove("is-visible");
    this.setFlightMaterial(true);
    const distance = this.camera.position.distanceTo(this.controls.target);
    this.flightMouse.set(0, 0);
    this.flight.enter(this.camera, this.controls.target.clone(), distance, 3, this.extent);
    this.ship.group.visible = true;
    // 地図の遠景は広げた空間では近づけてしまうので、飛行中は触れられない背景の星空に替える
    this.sky.object.visible = true;
    this.flightNebulae.object.visible = true;
    this.backdrop.visible = false;
    this.onFlightChange?.(true);
    return true;
  }

  /** 飛行モードから出る。宇宙船がいた場所の真上から見た地図に、入る前の拡大率で戻る。 */
  exitFlight(): boolean {
    if (!this.flight.active || this.flight.phase === "leaving") return false;
    this.endDive(false);
    this.flight.leave(this.camera, this.flightLook);
    return true;
  }

  /** 出る移り変わりが終わった：地図の操作を戻し、預けていた検索と星座の表示を掛け直す。 */
  private finishFlight(): void {
    this.field.object.scale.setScalar(1);
    this.constellations.object.scale.setScalar(1);
    this.controls.target.copy(this.flight.mapTarget());
    this.tilt = 0;
    this.setDistance(this.flight.returnDistance);
    this.controls.enabled = true;
    this.nebulae.object.visible = true;
    this.ship.group.visible = false;
    this.sky.object.visible = false;
    this.flightNebulae.object.visible = false;
    this.backdrop.visible = true;
    this.windows.clear();
    this.signs.clear();
    this.constellations.setFlight(false);
    this.setFlightMaterial(false);
    const ids = this.flightSearch ?? [];
    this.flightSearch = null;
    // 真上から見た地図に降りたあと、検索中でなければ使う人の傾きへ戻す
    this.tiltTarget = ids.length ? 0 : this.preferredTilt;
    this.tiltSpeed = Math.abs(this.tiltTarget - this.tilt) / TURN_SECONDS;
    if (ids.length) {
      this.setSearch(ids);
      this.selectSearch(this.selectedId);
    }
    this.refreshEmphasis();
    this.labelsDirty = true;
    this.lastLabelTier = null;
    this.onFlightChange?.(false);
  }

  private setFlightMaterial(on: boolean): void {
    const mat = this.field.object.material as THREE.ShaderMaterial;
    mat.uniforms.uMaxSize.value = on ? FLIGHT_MAX_POINT : MAP_MAX_POINT;
    mat.uniforms.uFlight.value = on ? 1 : 0;
    mat.uniforms.uSizeScale.value = on ? FLIGHT_SIZE_SCALE : 1;
  }

  /** 飛行中の星雲の雲と星団名の標識を、星団ごとに置く（中心の高さはメンバーの高さの平均。広げた空間の座標） */
  private placeFlightClusters(layout: Layout, source: LabelSource): void {
    const sums = new Map<number, { h: number; n: number }>();
    for (const star of layout.stars) {
      const row = sums.get(star.cluster) ?? { h: 0, n: 0 };
      row.h += this.heights.get(star.id) ?? 0;
      row.n++;
      sums.set(star.cluster, row);
    }
    const live = source.clusters.filter((c) => c.count > 0);
    const at = (c: (typeof live)[number]) => {
      const row = sums.get(c.index);
      const h = row && row.n ? row.h / row.n : 0;
      return { x: c.x * FLIGHT_SCALE, y: h * FLIGHT_SCALE, z: -c.y * FLIGHT_SCALE, radius: c.radius * FLIGHT_SCALE };
    };
    this.flightNebulae.set(live.map((c) => ({ index: c.index, ...at(c), color: nebulaColor(c.index) })));
    this.signs.set(live.map((c) => ({ index: c.index, name: c.name, ...at(c) })));
  }

  /** 星の見え方（大きさ・明るさ・色）を決める関数を差し替える。地図と飛行モードの両方に効く */
  setStarAppearance(fn: AppearanceFn): void {
    this.field.setAppearance(fn);
  }

  /** いまの空間の拡大率（地図 1 → 飛行中 FLIGHT_SCALE。立ち上がりと一緒に変わる） */
  private get spaceScale(): number {
    return 1 + (FLIGHT_SCALE - 1) * this.flight.lift;
  }

  /** 星 id の、いま描いている位置（three の座標。空間の拡大率を掛けたもの）。 */
  private worldOf(id: string, out = new THREE.Vector3()): THREE.Vector3 | null {
    const p = this.field.position3(id);
    if (!p) return null;
    const k = this.spaceScale;
    return out.set(p.x * k, p.z * k, -p.y * k);
  }

  /** 確認用：飛行中の星の 3 次元の位置（地図の座標の向きで、広げた空間の単位）。 */
  flightStars(): { id: string; x: number; y: number; z: number }[] {
    const k = this.spaceScale;
    return this.field.placed.flatMap((star) => {
      const p = this.field.position3(star.id);
      return p ? [{ id: star.id, x: p.x * k, y: p.y * k, z: p.z * k }] : [];
    });
  }

  /** 確認用：星座の線の辺と、両端の高さ（地図の座標の z）。 */
  flightConstellationSegments(): { id: string; a: string; b: string; az: number; bz: number }[] {
    return this.constellations.segments().map((seg) => ({ ...seg, az: seg.az - 0.12, bz: seg.bz - 0.12 }));
  }

  /** 確認用：宇宙船を入った直後の位置と向きに戻す。 */
  flightReset(): void {
    this.flight.reset();
  }

  flightHeights(): { id: string; z: number }[] {
    return this.field.placed.map((star) => ({ id: star.id, z: this.heights.get(star.id) ?? 0 }));
  }

  /** 最後に入った星と宇宙船の距離（確認用） */
  private entryDistance(): number | null {
    const q = this.lastEntry ? this.worldOf(this.lastEntry) : null;
    return q ? this.flight.ship.position.distanceTo(q) : null;
  }

  flightState(): { active: boolean; phase: string; transitioning: boolean; lift: number; nearby: number; windows: string[]; nebulae: number;
    diving: boolean; lastEntry: string | null; entryDistance: number | null; scale: number;
    searchStashed: number;
    ship: { x: number; y: number; z: number; speed: number; yaw: number; pitch: number } } {
    const ship = this.flight.ship;
    return { active: this.flight.active, phase: this.flight.phase, transitioning: this.flight.transitioning,
      lift: this.flight.lift, nearby: this.windows.nearby, windows: this.windows.visibleIds, nebulae: this.flightNebulae.count,
      diving: !!this.dive, lastEntry: this.lastEntry, entryDistance: this.entryDistance(),
      scale: FLIGHT_SCALE, searchStashed: this.flightSearch?.length ?? 0,
      // 宇宙船の位置は地図の座標（広げた空間の座標を FLIGHT_SCALE で割ったもの）で返す
      ship: { x: ship.position.x / FLIGHT_SCALE, y: -ship.position.z / FLIGHT_SCALE, z: ship.position.y / FLIGHT_SCALE,
        speed: ship.speed, yaw: ship.yaw, pitch: ship.pitch } };
  }

  /** 入力を始めたら真上から、やめたら斜めから（SPEC 7 章）。 */
  setTopDown(topDown: boolean): void {
    this.tiltTarget = topDown ? 0 : this.preferredTilt;
    this.tiltSpeed = Math.abs(this.tiltTarget - this.tilt) / TURN_SECONDS;
  }

  private readonly onTiltStart = (event: PointerEvent): void => {
    if (event.button !== 2 || this.flight.active) return;
    this.focus = null;
    this.tiltPointer = event.pointerId;
    this.tiltPointerY = event.clientY;
    this.tiltCapture = event.currentTarget as HTMLElement;
    this.tiltCapture.setPointerCapture(event.pointerId);
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  private readonly onTiltMove = (event: PointerEvent): void => {
    if (event.pointerId !== this.tiltPointer) return;
    const delta = event.clientY - this.tiltPointerY;
    this.tiltPointerY = event.clientY;
    this.tilt = THREE.MathUtils.clamp(this.tilt + delta * 0.004, 0, MAX_TILT);
    this.preferredTilt = this.tiltTarget = this.tilt;
    this.setDistance(this.camera.position.distanceTo(this.controls.target));
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  private readonly onTiltEnd = (event: PointerEvent): void => {
    if (event.pointerId !== this.tiltPointer) return;
    this.tiltPointer = null;
    if (this.tiltCapture?.hasPointerCapture(event.pointerId)) this.tiltCapture.releasePointerCapture(event.pointerId);
    this.tiltCapture = null;
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  /** 画面中央の地図上の点を中心に、検索結果を軌道へ移す。 */
  setSearch(ids: string[]): void {
    const wasSearching = this.searchIds.length > 0;
    const searching = ids.length > 0;
    if (!wasSearching && searching && this.constellationNameId) {
      // 星座を選んだまま検索を始めた：いまのカメラ（星座に寄せた位置）を覚えておく
      this.searchStash = { target: this.controls.target.clone(),
        distance: this.camera.position.distanceTo(this.controls.target) };
    } else if (wasSearching && !searching && this.searchStash && this.constellationNameId) {
      // 検索を消した：星座を選んでいたときのカメラへ戻る
      this.focus = { from: this.controls.target.clone(), to: this.searchStash.target,
        fromDistance: this.camera.position.distanceTo(this.controls.target),
        toDistance: this.searchStash.distance, elapsed: 0, duration: POINTS_FOCUS_SECONDS };
    }
    if (!searching) this.searchStash = null;
    this.searchIds = ids.slice(0, 21);
    const ray = new THREE.Raycaster();
    ray.setFromCamera(new THREE.Vector2(0, 0), this.camera);
    const at = new THREE.Vector3();
    ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), at);
    this.searchCenter = { x: at.x, y: -at.z };
    const distance = this.camera.position.distanceTo(this.controls.target);
    const unit = Math.max(2, distance * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * 0.18);
    this.searchUnit = unit;
    this.field.setSearch(this.searchIds, this.searchCenter, unit);
    this.blackHole.visible = this.searchIds.length > 0;
    this.blackHole.position.set(at.x, 0, at.z);
    this.blackHole.scale.setScalar(unit);
    this.trace.visible = this.searchIds.length > 0;
    this.tails.visible = this.searchIds.length > 0;
    this.constellations.setSearchHole(this.searchIds.length ? this.blackHole.position : null, SEARCH_HOLE * unit);
    this.hoveredId = null;
    this.labelsDirty = true;
    if (wasSearching !== searching) this.refreshEmphasis();
  }

  selectSearch(id: string | null): void {
    this.selectedId = id;
    this.selectedHalo.visible = !!id;
  }

  hoverStar(id: string | null): void {
    this.hoveredId = id && this.searchIds.includes(id) ? id : null;
  }

  traceGeometry(): { tails: number; fullLines: number; maxTailPixels: number; startAlpha: number; endAlpha: number } {
    const values = this.tails.geometry.getAttribute("aAlpha").array as Float32Array;
    return {
      tails: this.searchIds.length,
      fullLines: this.fullTraceCount,
      maxTailPixels: this.maxTailPixels,
      startAlpha: values[0] ?? 0,
      endAlpha: values[7] ?? 0,
    };
  }

  searchGeometry(): { center: { x: number; y: number }; unit: number; stars: { id: string; x: number; y: number }[] } {
    return {
      center: this.searchCenter,
      unit: this.searchUnit,
      stars: this.searchIds.flatMap((id) => {
        const point = this.field.displayPosition(id);
        return point ? [{ id, ...point }] : [];
      }),
    };
  }

  /**
   * 確認用：星座の線を描かない範囲の、画面上の中心と半径（px）。半径は円周上の 32 点の投影のうち最も近いもの
   * から 2px 引いた値（傾いていても内側に収まる）。検索していなければ null。
   */
  searchHole(): { x: number; y: number; r: number } | null {
    if (!this.searchIds.length) return null;
    this.camera.updateMatrixWorld();
    const size = this.renderer.getSize(new THREE.Vector2());
    const toScreen = (v: THREE.Vector3) => {
      v.project(this.camera);
      return { x: (v.x * 0.5 + 0.5) * size.x, y: (-v.y * 0.5 + 0.5) * size.y };
    };
    const c = this.blackHole.position;
    const center = toScreen(c.clone());
    const radius = SEARCH_HOLE * this.searchUnit;
    let r = Infinity;
    for (let i = 0; i < 32; i++) {
      const a = (i / 32) * Math.PI * 2;
      const p = toScreen(new THREE.Vector3(c.x + Math.cos(a) * radius, 0.12, c.z + Math.sin(a) * radius));
      r = Math.min(r, Math.hypot(p.x - center.x, p.y - center.y));
    }
    return { ...center, r: r - 2 };
  }

  /** 確認用：星座の線と光点を出す・消す（画素を比べるため） */
  setConstellationLinesVisible(visible: boolean): void {
    this.constellations.object.visible = visible;
  }

  starScreen(id: string): { x: number; y: number } | null {
    const point = this.field.displayPosition(id);
    if (!point) return null;
    const size = this.renderer.getSize(new THREE.Vector2());
    const projected = new THREE.Vector3(point.x, 0, -point.y).project(this.camera);
    return { x: (projected.x * 0.5 + 0.5) * size.x, y: (-projected.y * 0.5 + 0.5) * size.y };
  }

  starPosition(id: string): { x: number; y: number } | null {
    return this.field.displayPosition(id);
  }

  starVisual(id: string): { size: number; alpha: number } | null {
    return this.field.visual(id);
  }

  cameraTilt(): number {
    return THREE.MathUtils.radToDeg(this.tilt);
  }

  cameraState(): { x: number; y: number; distance: number; tier: ZoomTier } {
    return { x: this.controls.target.x, y: -this.controls.target.z,
      distance: this.camera.position.distanceTo(this.controls.target), tier: this.zoomTier };
  }

  /**
   * 星団名のクリックで、その星団の中心へ約 0.6 秒で移る（どの拡大率でも）。
   * 今が中距離より遠ければ中距離まで寄り、それより近ければ今の距離を保つ。
   */
  focusCluster(index: number): void {
    if (this.searchIds.length) return;
    const cluster = this.labelSource.clusters.find((row) => row.index === index && row.count > 0);
    if (!cluster) return;
    const current = this.camera.position.distanceTo(this.controls.target);
    const mid = this.fitDistance * MID_DISTANCE;
    this.focus = {
      from: this.controls.target.clone(),
      to: new THREE.Vector3(cluster.x, 0, -cluster.y),
      fromDistance: current,
      toDistance: this.zoomTier === "far" ? mid : current,
      elapsed: 0,
      duration: CLUSTER_FOCUS_SECONDS,
    };
  }

  /** 確認用：星団へ寄った後に全体表示へ戻す。 */
  resetCamera(): void {
    this.focus = null;
    this.frameAll();
    this.labelsDirty = true;
  }

  pickStar(clientX: number, clientY: number): string | null {
    const size = this.renderer.getSize(new THREE.Vector2());
    const v = new THREE.Vector3();
    let closest: string | null = null;
    let best = 14 * 14;
    for (const star of this.field.placed) {
      const p = this.field.displayPosition(star.id);
      if (!p) continue;
      v.set(p.x, 0, -p.y).project(this.camera);
      const x = (v.x * 0.5 + 0.5) * size.x;
      const y = (-v.y * 0.5 + 0.5) * size.y;
      const d = (x - clientX) ** 2 + (y - clientY) ** 2;
      if (d < best) { best = d; closest = star.id; }
    }
    return closest;
  }

  /** いまの拡大率の段階。ラベルの出し方を決める。 */
  get zoomTier(): ZoomTier {
    const d = this.camera.position.distanceTo(this.controls.target);
    if (d > this.fitDistance * 1.4) return "far";
    if (d > this.fitDistance * 0.55) return "mid";
    return "near";
  }

  /** 確認用：段階ごとの決まった拡大率に合わせる。 */
  setZoomTier(tier: ZoomTier): void {
    const factor = tier === "far" ? 1.9 : tier === "mid" ? MID_DISTANCE : 0.3;
    this.setDistance(this.fitDistance * factor);
  }

  /** check:ext が画面上のタイトルと星団の円を照合するための投影値。 */
  labelGeometry(): ScreenCircle[] {
    return this.screenCircles;
  }

  labelStats(): { frames: number; positionUpdates: number; decisions: number; maxPositionMs: number } {
    return { frames: this.frames, positionUpdates: this.labelPositionUpdates,
      decisions: this.labelDecisions, maxPositionMs: this.maxLabelPositionMs };
  }

  resetLabelTiming(): void {
    this.maxLabelPositionMs = 0;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.renderer.setAnimationLoop(this.tick);
  }

  /** 地図全体が画面の約 80% に収まる位置へカメラを置く */
  private frameAll(): void {
    const b = this.bounds;
    const margin = 2;
    this.controls.target.set((b.minX + b.maxX) / 2, 0, -(b.minY + b.maxY) / 2);

    const tanV = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    const tanH = tanV * this.camera.aspect;
    const halfW = (b.maxX - b.minX) / 2 + margin;
    const halfH = ((b.maxY - b.minY) / 2 + margin) * Math.cos(this.tilt);
    let dist = Math.max(25, Math.max(halfW / tanH, halfH / tanV) / 0.8);

    // 傾けたぶん手前が広がるので、四隅を実際に投影して 80% に合わせ込む
    const corners = [
      [b.minX - margin, b.minY - margin],
      [b.maxX + margin, b.minY - margin],
      [b.minX - margin, b.maxY + margin],
      [b.maxX + margin, b.maxY + margin],
    ];
    const probe = new THREE.Vector3();
    for (let i = 0; i < 6; i++) {
      this.setDistance(dist);
      this.camera.updateMatrixWorld();
      let worst = 0;
      for (const [x, y] of corners) {
        probe.set(x, 0, -y).project(this.camera);
        worst = Math.max(worst, Math.abs(probe.x), Math.abs(probe.y));
      }
      if (worst <= 0) break;
      const next = dist * (worst / 0.8);
      if (Math.abs(next - dist) < dist * 0.005) break;
      dist = next;
    }
    this.fitDistance = dist;
    this.setDistance(dist);
  }

  private setDistance(dist: number): void {
    const t = this.controls.target;
    this.camera.position.set(
      t.x,
      t.y + dist * Math.cos(this.tilt),
      t.z + dist * Math.sin(this.tilt),
    );
    this.controls.update();
  }

  private readonly tick = (): void => {
    this.frames++;
    const dt = Math.min(0.05, this.clock.getDelta());
    if (this.flight.active) {
      this.flightTick(dt);
      return;
    }
    this.applyKeys(dt);

    if (this.focus) {
      const focus = this.focus;
      focus.elapsed = Math.min(focus.duration, focus.elapsed + dt);
      const progress = focus.elapsed / focus.duration;
      const eased = progress * progress * (3 - 2 * progress);
      this.controls.target.lerpVectors(focus.from, focus.to, eased);
      this.setDistance(THREE.MathUtils.lerp(focus.fromDistance, focus.toDistance, eased));
      if (progress === 1) this.focus = null;
    }

    if (Math.abs(this.tilt - this.tiltTarget) > 1e-4) {
      const step = this.tiltSpeed * dt;
      const diff = this.tiltTarget - this.tilt;
      this.tilt += Math.sign(diff) * Math.min(Math.abs(diff), step);
      const t = this.controls.target;
      const dist = this.camera.position.distanceTo(t);
      this.camera.position.set(
        t.x,
        t.y + dist * Math.cos(this.tilt),
        t.z + dist * Math.sin(this.tilt),
      );
    }

    this.field.update(dt);
    // 輪は遠くからでも見分けられるよう、画面上で半径約 9px を保つ（寄ったときは縮めない）
    const ringScale = Math.max(1, this.camera.position.distanceTo(this.controls.target) * 0.024);
    this.constellations.moveEditMembers((id) => this.field.displayPosition(id), ringScale);
    this.constellations.update(dt);
    if (this.constellationNameWait && this.constellations.animationState().phase === "done") {
      this.constellationNameWait = false;
      this.constellationName?.classList.add("is-visible");
    }
    if (this.searchIds.length) {
      const tailPosition = this.tails.geometry.getAttribute("position") as THREE.BufferAttribute;
      const tailAlpha = this.tails.geometry.getAttribute("aAlpha") as THREE.BufferAttribute;
      const tailValues = tailPosition.array as Float32Array;
      const tailAlphas = tailAlpha.array as Float32Array;
      const size = this.renderer.getSize(new THREE.Vector2());
      this.maxTailPixels = 0;
      this.searchIds.forEach((id, i) => {
        const home = this.field.placed.find((star) => star.id === id);
        const current = this.field.displayPosition(id);
        if (!home || !current) return;
        const a = new THREE.Vector3(current.x, 0, -current.y).project(this.camera);
        const b = new THREE.Vector3(home.x, 0, -home.y).project(this.camera);
        const distance = Math.hypot((a.x - b.x) * size.x / 2, (a.y - b.y) * size.y / 2);
        const fraction = distance > 0 ? Math.min(1, 40 / distance) : 0;
        this.maxTailPixels = Math.max(this.maxTailPixels, distance * fraction);
        for (let j = 0; j < 4; j++) {
          for (let end = 0; end < 2; end++) {
            const step = (j + end) / 4;
            const t = step * fraction;
            const index = i * 8 + j * 2 + end;
            tailValues.set([
              current.x + (home.x - current.x) * t, 0.05,
              -(current.y + (home.y - current.y) * t),
            ], index * 3);
            tailAlphas[index] = 0.48 * (1 - step) ** 2;
          }
        }
      });
      tailPosition.needsUpdate = true;
      tailAlpha.needsUpdate = true;
      this.tails.geometry.setDrawRange(0, this.searchIds.length * 8);
      const position = this.trace.geometry.getAttribute("position") as THREE.BufferAttribute;
      const values = position.array as Float32Array;
      const highlighted = [...new Set([this.selectedId, this.hoveredId])]
        .filter((id): id is string => !!id && this.searchIds.includes(id));
      this.fullTraceCount = 0;
      for (const id of highlighted) {
        const home = this.field.placed.find((star) => star.id === id);
        const current = this.field.displayPosition(id);
        if (!home || !current) continue;
        values.set([home.x, 0.03, -home.y, current.x, 0.03, -current.y], this.fullTraceCount * 6);
        this.fullTraceCount++;
      }
      position.needsUpdate = true;
      this.trace.geometry.setDrawRange(0, this.fullTraceCount * 2);
      this.trace.visible = this.fullTraceCount > 0;
    } else {
      this.fullTraceCount = 0;
      this.maxTailPixels = 0;
    }
    if (this.selectedId) {
      const p = this.field.displayPosition(this.selectedId);
      if (p) this.selectedHalo.position.set(p.x, 0.11, -p.y);
    }
    this.controls.update();
    this.camera.updateMatrixWorld();
    if (this.constellationNameId && this.constellationName) {
      const members = this.constellations.points(this.constellationNameId);
      if (members.length) {
        const canvasSize = this.renderer.getSize(new THREE.Vector2());
        let left = Infinity, right = -Infinity, top = Infinity;
        const p = new THREE.Vector3();
        for (const member of members) {
          p.set(member.x, 0, -member.y).project(this.camera);
          left = Math.min(left, (p.x * 0.5 + 0.5) * canvasSize.x);
          right = Math.max(right, (p.x * 0.5 + 0.5) * canvasSize.x);
          top = Math.min(top, (-p.y * 0.5 + 0.5) * canvasSize.y);
        }
        this.constellationName.style.transform = `translate3d(${(left + right) / 2}px, ${Math.max(95, top - 12)}px, 0) translate(-50%, -100%)`;
      }
    }
    const now = performance.now();
    const matrix = this.camera.matrixWorld.elements;
    const previous = this.lastLabelCamera.elements;
    const cameraMoving = !this.labelCameraKnown || matrix.some((value, i) => Math.abs(value - previous[i]) > 1e-6);
    // 星がばねで軌道へ向かっている間も、カメラの移動中と同じく表示の判断を待つ。
    // 動き出す前の位置で左右や重なりを決めると、軌道に着いたときに内側に出たり重なったりする。
    const moving = cameraMoving || this.field.isSettling;
    if (moving) {
      this.lastLabelMotion = now;
      if (cameraMoving) this.lastLabelCamera.copy(this.camera.matrixWorld);
      this.labelCameraKnown = true;
    }
    const tier = this.zoomTier;
    if (this.lastLabelTier === null || tier !== this.lastLabelTier ||
      (!moving && now - this.lastLabelMotion >= 150 && (this.labelsDirty || this.lastLabelMotion > 0))) {
      this.decideLabels();
      this.labelsDirty = false;
      this.lastLabelTier = tier;
      this.lastLabelMotion = 0;
      this.labelDecisions++;
    }
    const labelStart = performance.now();
    const size = this.renderer.getSize(new THREE.Vector2());
    const point = new THREE.Vector3();
    this.labels.updatePositions((item) => {
      const current = item.searchRank == null ? null : this.field.displayPosition(item.key);
      point.set(current?.x ?? item.x, 0, -(current?.y ?? item.y)).project(this.camera);
      if (point.z > 1) return null;
      let sx = (point.x * 0.5 + 0.5) * size.x;
      let sy = (-point.y * 0.5 + 0.5) * size.y;
      if (item.searchRank != null) {
        const outward = Math.hypot(sx - size.x / 2, sy - size.y / 2) || 1;
        sx += (sx - size.x / 2) / outward * 10;
        sy += (sy - size.y / 2) / outward * 10;
      }
      return { sx, sy };
    });
    this.labelPositionUpdates++;
    this.maxLabelPositionMs = Math.max(this.maxLabelPositionMs, performance.now() - labelStart);
    this.renderer.render(this.scene, this.camera);
  };

  /** 飛行中の 1 コマ：宇宙船とカメラ、星の立ち上がり、星座の線。地図のラベルや操作は動かさない。 */
  private flightTick(dt: number): void {
    if (typing()) this.keys.clear();
    // 突入の演出の間は操作を受け付けず、宇宙船を止めておく
    const input: FlightInput = this.dive
      ? { thrust: 0, turn: 0, climb: 0, mouseX: 0, mouseY: 0 }
      : {
        thrust: (this.keys.has("KeyW") ? 1 : 0) - (this.keys.has("KeyS") ? 1 : 0),
        turn: (this.keys.has("KeyA") ? 1 : 0) - (this.keys.has("KeyD") ? 1 : 0),
        climb: (this.keys.has("Space") ? 1 : 0) - (this.keys.has("Shift") ? 1 : 0),
        mouseX: this.flightMouse.x,
        mouseY: this.flightMouse.y,
      };
    if (this.dive) this.flight.ship.speed = 0;
    const previous = this.flight.ship.position.clone();
    const { finished } = this.flight.update(dt, this.camera, this.flightLook, input);
    this.field.object.scale.setScalar(this.spaceScale);
    this.constellations.object.scale.setScalar(this.spaceScale);
    this.sky.follow(this.camera);
    this.flightNebulae.setOpacity(this.flight.lift);
    if (this.flight.transitioning || finished) {
      // 立ち上がりの途中だけ、星座の線の高さを書き直す（飛んでいる間は変わらない）
      this.constellations.setLift((id) => this.heights.get(id) ?? 0, this.flight.lift);
    }
    if (this.flight.phase === "flying") {
      if (this.dive) this.advanceDive(dt);
      else {
        const hit = this.findStarHit(previous, this.flight.ship.position);
        if (hit) this.dive = { id: hit, elapsed: 0 };
      }
    }
    const ship = this.flight.ship;
    this.ship.group.position.copy(ship.position);
    this.ship.group.rotation.set(ship.pitch, ship.yaw, 0);
    this.ship.setThrust(this.flight.thrustLevel);
    this.camera.updateMatrixWorld();
    if (this.flight.phase === "flying") this.updateWindows(dt);
    else if (this.flight.phase === "leaving") this.windows.clear();
    this.updateSigns();
    this.field.setLift(this.flight.lift);
    this.field.update(dt);
    this.constellations.update(dt);
    this.camera.updateMatrixWorld();
    this.renderer.render(this.scene, this.camera);
    if (finished === "left") this.finishFlight();
  }

  /**
   * 宇宙船がこのコマで通った線分（a → b）が、どれかの星の芯（半径 STAR_CORE_RADIUS）に触れたか。
   * 線分で見るので、速く飛んでも星をすり抜けない。反応しない時間の中にある星は除く。
   */
  private findStarHit(a: THREE.Vector3, b: THREE.Vector3): string | null {
    const now = performance.now();
    const ab = b.clone().sub(a);
    const len2 = ab.lengthSq();
    const p = new THREE.Vector3();
    let best: { id: string; t: number } | null = null;
    for (const star of this.field.placed) {
      if ((this.entryCooldown.get(star.id) ?? 0) > now) continue;
      if (!this.worldOf(star.id, p)) continue;
      const t = len2 > 0 ? THREE.MathUtils.clamp(p.clone().sub(a).dot(ab) / len2, 0, 1) : 0;
      const d = a.clone().addScaledVector(ab, t).distanceTo(p);
      if (d < STAR_CORE_RADIUS && (!best || t < best.t)) best = { id: star.id, t };
    }
    return best?.id ?? null;
  }

  /** 突入の演出：画角を少し狭め、淡い光を満ちさせてから引く。終わったらページを開いて押し戻す。 */
  private advanceDive(dt: number): void {
    if (!this.dive) return;
    this.dive.elapsed += dt;
    const t = Math.min(1, this.dive.elapsed / DIVE_SECONDS);
    this.camera.fov = CAMERA_FOV - 16 * Math.sin(Math.PI * t);
    this.camera.updateProjectionMatrix();
    if (this.flash) this.flash.style.opacity = String(0.85 * Math.sin(Math.PI * t));
    if (t >= 1) this.endDive(true);
  }

  private endDive(open: boolean): void {
    const dive = this.dive;
    this.dive = null;
    this.camera.fov = CAMERA_FOV;
    this.camera.updateProjectionMatrix();
    if (this.flash) this.flash.style.opacity = "0";
    if (!dive || !open) return;
    this.entryCooldown.set(dive.id, performance.now() + ENTRY_COOLDOWN_MS);
    this.lastEntry = dive.id;
    // 開いた後は、来た方向へ少し押し戻して止める
    this.flight.ship.position.addScaledVector(this.flight.forward(), -PUSH_BACK);
    this.flight.ship.speed = 0;
    this.onEnterStar?.(dive.id);
  }

  /** 星団名の標識：星雲の雲の上端の少し上。近づくと薄く、立ち上がりと一緒に現れる。 */
  private updateSigns(): void {
    const size = this.renderer.getSize(new THREE.Vector2());
    const v = new THREE.Vector3();
    const ship = this.flight.ship.position;
    this.signs.update(
      (x, y, z) => {
        v.set(x, y, z).project(this.camera);
        if (v.z > 1 || v.z < -1) return null;
        return { x: (v.x * 0.5 + 0.5) * size.x, y: (-v.y * 0.5 + 0.5) * size.y };
      },
      (spec) => Math.hypot(spec.x - ship.x, spec.y - ship.y, spec.z - ship.z),
      this.flight.phase === "leaving" ? 0 : this.flight.lift,
    );
  }

  /** 近づいた星の窓（近い順に最大 6 個）。選ぶのは間引き、位置は毎コマ。 */
  private updateWindows(dt: number): void {
    const shipPos = this.flight.ship.position;
    const size = this.renderer.getSize(new THREE.Vector2());
    const v = new THREE.Vector3();
    const w = new THREE.Vector3();
    this.windows.update(dt, this.windowStars,
      (id) => {
        const p = this.worldOf(id, w);
        return p ? p.distanceTo(shipPos) : Infinity;
      },
      (id) => {
        const p = this.worldOf(id, w);
        if (!p) return null;
        const d = p.distanceTo(shipPos);
        v.copy(p).project(this.camera);
        if (v.z > 1 || v.z < -1) return null;
        return { x: (v.x * 0.5 + 0.5) * size.x, y: (-v.y * 0.5 + 0.5) * size.y,
          near: THREE.MathUtils.clamp(1 - d / WINDOW_RADIUS, 0, 1) };
      });
  }

  /**
   * 確認用：宇宙船を星 id の前、距離 distance に置いて止める。星団の中心から見て外側に置き、星を正面に見る
   * （途中に他の星が入りにくい）。
   */
  flightTeleport(id: string, distance: number): boolean {
    const point = this.worldOf(id);
    const star = this.labelSource.stars.find((s) => s.id === id);
    const cluster = this.labelSource.clusters.find((c) => c.index === star?.cluster);
    if (!point || !star || !this.flight.active) return false;
    let dx = star.x - (cluster?.x ?? 0), dy = star.y - (cluster?.y ?? 0);
    const len = Math.hypot(dx, dy) || 1;
    if (Math.hypot(dx, dy) < 1e-6) { dx = 0; dy = -1; }
    const position = point.clone().add(new THREE.Vector3(dx / len, 0, -dy / len).multiplyScalar(distance));
    this.flight.place(position, point);
    return true;
  }

  /** 確認用：星 id の、画面上の大きさ（px）。シェーダーと同じ計算。 */
  starScreenSize(id: string): number | null {
    const p = this.worldOf(id);
    const base = this.field.pointSize(id);
    if (!p || base == null) return null;
    this.camera.updateMatrixWorld();
    // 空間の拡大率は星までの距離に効く（シェーダーの modelView に含まれる）。点の基準の大きさ aSize には掛からない
    const view = p.applyMatrix4(this.camera.matrixWorldInverse);
    const mat = this.field.object.material as THREE.ShaderMaterial;
    const px = base * mat.uniforms.uSizeScale.value * mat.uniforms.uScale.value / Math.max(-view.z, 0.001);
    return THREE.MathUtils.clamp(px, 2, mat.uniforms.uMaxSize.value);
  }

  private decideLabels(): void {
    const tier = this.zoomTier;
    const size = this.renderer.getSize(new THREE.Vector2());
    const v = new THREE.Vector3();
    this.camera.updateMatrixWorld();

    const project = (x: number, y: number): { sx: number; sy: number } | null => {
      v.set(x, 0, -y).project(this.camera);
      if (v.z > 1) return null;
      const sx = (v.x * 0.5 + 0.5) * size.x;
      const sy = (-v.y * 0.5 + 0.5) * size.y;
      if (sx < -120 || sx > size.x + 120 || sy < -40 || sy > size.y + 40) return null;
      return { sx, sy };
    };

    const items: PlacedLabel[] = [];
    const circles: ScreenCircle[] = [];
    for (const c of this.labelSource.clusters) {
      if (c.count === 0) continue;
      const center = project(c.x, c.y);
      if (!center) continue;
      let rx = 0, ry = 0;
      for (let i = 0; i < 32; i++) {
        const angle = i * Math.PI / 16;
        const edge = project(c.x + Math.cos(angle) * c.radius, c.y + Math.sin(angle) * c.radius);
        if (edge) {
          rx = Math.max(rx, Math.abs(edge.sx - center.sx));
          ry = Math.max(ry, Math.abs(edge.sy - center.sy));
        }
      }
      if (rx > 0 && ry > 0) circles.push({ cluster: c.index, ...center, rx, ry });
    }
    this.screenCircles = circles;
    // 星団名の大きさは件数に応じて 13〜17px（大きな星団ほど見出しとして大きく）
    const counts = this.labelSource.clusters.filter((c) => c.count > 0).map((c) => c.count);
    const minCount = Math.min(...counts), maxCount = Math.max(...counts);
    const clusterSize = (count: number) =>
      13 + (maxCount > minCount ? (count - minCount) / (maxCount - minCount) : 0.5) * 4;
    for (const c of this.labelSource.clusters) {
      if (c.count === 0) continue;
      // 遠くでは星雲の中心に重ねる。寄ったら円の上端の少し上へ
      const at = tier === "far" ? project(c.x, c.y) : project(c.x, c.y + c.radius + 1.5);
      if (!at) continue;
      items.push({
        key: `c${c.index}`,
        text: c.name,
        x: c.x, y: tier === "far" ? c.y : c.y + c.radius + 1.5,
        centered: tier === "far",
        sx: at.sx,
        sy: at.sy,
        kind: "cluster",
        cluster: c.index,
        priority: -1000 + (1000 - c.count),   // 大きい星団ほど先に置く
        // 遠くでは星団が小さく写るので、名前も 8 割にして星団からはみ出しにくくする
        fontSize: Math.round(clusterSize(c.count) * (tier === "far" ? 0.8 : 1) * 2) / 2,
        dim: this.emphasisMode !== "none",
      });
    }

    const limit = tier === "mid" ? 4 : Infinity;
    const emphasized = this.emphasisIds;
    if (this.searchIds.length || tier !== "far" || emphasized.size) {
      const searchRank = new Map(this.searchIds.map((id, i) => [id, i]));
      for (const s of this.labelSource.stars) {
        // 星座の星のタイトルは、拡大率や検索に関係なく出す
        const star = emphasized.has(s.id);
        if (!star && this.searchIds.length && !searchRank.has(s.id)) continue;
        if (!star && !this.searchIds.length && (tier === "far" || s.rank >= limit)) continue;
        const displayed = this.searchIds.length ? this.field.displayPosition(s.id) : null;
        const at = project(displayed?.x ?? s.x, displayed?.y ?? s.y);
        if (!at) continue;
        const outward = this.searchIds.length ? Math.hypot(at.sx - size.x / 2, at.sy - size.y / 2) || 1 : 1;
        const own = this.labelSource.clusters.find((c) => c.index === s.cluster);
        items.push({
          key: s.id, text: s.title,
          x: s.x, y: s.y,
          sx: this.searchIds.length ? at.sx + (at.sx - size.x / 2) / outward * 10 : at.sx,
          sy: this.searchIds.length ? at.sy + (at.sy - size.y / 2) / outward * 10 : at.sy,
          kind: "star",
          // 星座の星を最優先。それ以外は暗くする
          priority: star ? -3000 + s.rank
            : this.searchIds.length ? (searchRank.get(s.id) ?? 99) - 100 : s.rank,
          dim: emphasized.size > 0 && !star,
          searchRank: this.searchIds.length ? searchRank.get(s.id) : undefined,
          cluster: s.cluster,
          side: this.searchIds.length ? (at.sx >= size.x / 2 ? "right" : "left") : !own || s.x >= own.x ? "right" : "left",
        });
      }
    }

    // 星座の星のタイトルは省略せず、隣の星団の円に入っても間引かない
    this.labels.render(this.searchIds.length ? items.filter((item) => item.kind === "star") : items,
      this.searchIds.length || emphasized.size ? "near" : tier, this.searchIds.length ? [] : circles);
  }

  private readonly resize = (): void => {
    const w = this.canvas.clientWidth || innerWidth;
    const h = this.canvas.clientHeight || innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.labelsDirty = true;
    // 世界の大きさ 1 が画面上で何ピクセルになるか（距離 1 のとき）
    const scale =
      this.renderer.getDrawingBufferSize(new THREE.Vector2()).y /
      (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)));
    this.setPointScale(scale);
  };

  private setPointScale(scale: number): void {
    this.sky.setScale(scale);
    for (const obj of [this.backdrop, this.field.object]) {
      const mat = obj.material as THREE.ShaderMaterial;
      if (mat?.uniforms?.uScale) mat.uniforms.uScale.value = scale;
    }
  }
}
