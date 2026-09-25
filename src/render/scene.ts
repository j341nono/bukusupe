import * as THREE from "three";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";
import type { Layout } from "../layout";
import { layoutExtent } from "../layout";
import { LabelLayer, type PlacedLabel, type ScreenCircle, type ZoomTier } from "../ui/labels";
import { Nebulae } from "./nebula";
import { StarField, clusterColor, createBackdrop, type RenderStar } from "./stars";

/** 静止時のカメラの傾き（真上から 40 度。SPEC 7 章） */
const TILT = THREE.MathUtils.degToRad(40);
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
  stars: { id: string; title: string; x: number; y: number; cluster: number; rank: number }[];
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
  private readonly labels: LabelLayer;

  private running = false;
  private extent = 60;
  private bounds = { minX: -30, maxX: 30, minY: -30, maxY: 30 };
  /** 地図全体が画面の約 80% に収まる距離。拡大率の段階はこれを基準にする。 */
  private fitDistance = 90;
  private labelSource: LabelSource = { clusters: [], stars: [] };
  private labelTimer = 0;
  private screenCircles: ScreenCircle[] = [];
  private tilt = TILT;
  private tiltTarget = TILT;
  private searchIds: string[] = [];
  private searchCenter = { x: 0, y: 0 };
  private searchUnit = 1;
  private readonly blackHole = new THREE.Group();
  private readonly trace = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: 0x91baff, transparent: true, opacity: 0.32, depthWrite: false }),
  );
  private readonly selectedHalo = new THREE.Mesh(
    new THREE.RingGeometry(0.35, 0.47, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, side: THREE.DoubleSide }),
  );
  private selectedId: string | null = null;

  /** 描画できたコマ数。計算中も画面が動いていることの確認に使う。 */
  frames = 0;

  constructor(private readonly canvas: HTMLCanvasElement, labelContainer: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.setClearColor(0x05060f, 1);

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

    this.backdrop = createBackdrop();
    this.scene.add(this.backdrop);
    this.scene.add(this.nebulae.object);
    this.scene.add(this.field.object);
    const core = new THREE.Mesh(new THREE.CircleGeometry(0.36, 48),
      new THREE.MeshBasicMaterial({ color: 0x010108, side: THREE.DoubleSide }));
    core.rotation.x = -Math.PI / 2;
    core.position.y = 0.08;
    this.blackHole.add(core);
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
    this.trace.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(21 * 6), 3).setUsage(THREE.DynamicDrawUsage));
    this.trace.geometry.setDrawRange(0, 0);
    this.scene.add(this.trace);
    this.selectedHalo.rotation.x = -Math.PI / 2;
    this.selectedHalo.visible = false;
    this.scene.add(this.selectedHalo);

    this.labels = new LabelLayer(labelContainer);

    addEventListener("resize", this.resize);
    this.resize();
  }

  setLayout(layout: Layout, stars: RenderStar[], source: LabelSource, frame = true): void {
    this.field.setStars(stars);
    this.nebulae.set(
      source.clusters
        .filter((c) => c.count > 0)
        .map((c) => ({ x: c.x, y: c.y, radius: c.radius, color: clusterColor(c.index, 0.45) })),
    );
    this.labelSource = source;
    this.extent = layoutExtent(layout);
    this.bounds = boundsOf(stars, this.extent);
    if (frame) this.frameAll();
    this.resize();
    this.labelTimer = 0;
  }

  /** 入力を始めたら真上から、やめたら斜めから（SPEC 7 章）。 */
  setTopDown(topDown: boolean): void {
    this.tiltTarget = topDown ? 0 : TILT;
  }

  /** 画面中央の地図上の点を中心に、検索結果を軌道へ移す。 */
  setSearch(ids: string[]): void {
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
    this.labelTimer = 0;
  }

  selectSearch(id: string | null): void {
    this.selectedId = id;
    this.selectedHalo.visible = !!id;
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

  cameraTilt(): number {
    return THREE.MathUtils.radToDeg(this.tilt);
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
    const factor = tier === "far" ? 1.9 : tier === "mid" ? 0.85 : 0.3;
    this.setDistance(this.fitDistance * factor);
  }

  /** check:ext が画面上のタイトルと星団の円を照合するための投影値。 */
  labelGeometry(): ScreenCircle[] {
    return this.screenCircles;
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

    if (Math.abs(this.tilt - this.tiltTarget) > 1e-4) {
      const step = (TILT / TURN_SECONDS) * dt;
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
    if (this.searchIds.length) {
      const position = this.trace.geometry.getAttribute("position") as THREE.BufferAttribute;
      const values = position.array as Float32Array;
      this.searchIds.forEach((id, i) => {
        const home = this.field.placed.find((star) => star.id === id);
        const current = this.field.displayPosition(id);
        if (!home || !current) return;
        values.set([home.x, 0.02, -home.y, current.x, 0.02, -current.y], i * 6);
      });
      position.needsUpdate = true;
      this.trace.geometry.setDrawRange(0, this.searchIds.length * 2);
    }
    if (this.selectedId) {
      const p = this.field.displayPosition(this.selectedId);
      if (p) this.selectedHalo.position.set(p.x, 0.11, -p.y);
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    // ラベルは毎コマ組み直さない（星の描画を邪魔しない）
    this.labelTimer -= dt;
    if (this.labelTimer <= 0) {
      this.labelTimer = 0.12;
      this.updateLabels();
    }
  };

  private updateLabels(): void {
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
    for (const c of this.labelSource.clusters) {
      if (c.count === 0) continue;
      // 遠くでは星雲の中心に重ねる。寄ったら円の上端の少し上へ
      const at = tier === "far" ? project(c.x, c.y) : project(c.x, c.y + c.radius + 1.5);
      if (!at) continue;
      items.push({
        key: `c${c.index}`,
        text: c.name,
        sx: at.sx,
        sy: at.sy,
        kind: "cluster",
        priority: -1000 + (1000 - c.count),   // 大きい星団ほど先に置く
      });
    }

    const limit = tier === "mid" ? 4 : Infinity;
    if (this.searchIds.length || tier !== "far") {
      const searchRank = new Map(this.searchIds.map((id, i) => [id, i]));
      for (const s of this.labelSource.stars) {
        if (this.searchIds.length && !searchRank.has(s.id)) continue;
        if (!this.searchIds.length && s.rank >= limit) continue;
        const displayed = this.searchIds.length ? this.field.displayPosition(s.id) : null;
        const at = project(displayed?.x ?? s.x, displayed?.y ?? s.y);
        if (!at) continue;
        const outward = this.searchIds.length ? Math.hypot(at.sx - size.x / 2, at.sy - size.y / 2) || 1 : 1;
        const own = this.labelSource.clusters.find((c) => c.index === s.cluster);
        items.push({
          key: s.id, text: s.title,
          sx: this.searchIds.length ? at.sx + (at.sx - size.x / 2) / outward * 10 : at.sx,
          sy: this.searchIds.length ? at.sy + (at.sy - size.y / 2) / outward * 10 : at.sy,
          kind: "star",
          priority: this.searchIds.length ? (searchRank.get(s.id) ?? 99) - 100 : s.rank,
          cluster: s.cluster,
          side: this.searchIds.length ? (at.sx >= size.x / 2 ? "right" : "left") : !own || s.x >= own.x ? "right" : "left",
          color: clusterColor(s.cluster).getStyle(),
        });
      }
    }

    this.labels.render(this.searchIds.length ? items.filter((item) => item.kind === "star") : items,
      this.searchIds.length ? "near" : tier, this.searchIds.length ? [] : circles);
  }

  private readonly resize = (): void => {
    const w = this.canvas.clientWidth || innerWidth;
    const h = this.canvas.clientHeight || innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    // 世界の大きさ 1 が画面上で何ピクセルになるか（距離 1 のとき）
    const scale =
      this.renderer.getDrawingBufferSize(new THREE.Vector2()).y /
      (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)));
    this.setPointScale(scale);
  };

  private setPointScale(scale: number): void {
    for (const obj of [this.backdrop, this.field.object]) {
      const mat = obj.material as THREE.ShaderMaterial;
      if (mat?.uniforms?.uScale) mat.uniforms.uScale.value = scale;
    }
  }
}
