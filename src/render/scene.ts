import * as THREE from "three";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";
import type { Layout } from "../layout";
import { layoutExtent } from "../layout";
import { LabelLayer, type PlacedLabel, type ZoomTier } from "../ui/labels";
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
  stars: { id: string; title: string; x: number; y: number; rank: number }[];
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
  private tilt = TILT;
  private tiltTarget = TILT;

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

    // 星の位置は、ラベルが星の上に重ならないようにするためにも使う
    const starPoints: { sx: number; sy: number }[] = [];
    const limit = tier === "mid" ? 4 : Infinity;
    for (const s of this.labelSource.stars) {
      const at = project(s.x, s.y);
      if (!at) continue;
      starPoints.push(at);
      if (tier === "far" || s.rank >= limit) continue;
      items.push({ key: s.id, text: s.title, sx: at.sx, sy: at.sy, kind: "star", priority: s.rank });
    }

    this.labels.render(items, starPoints, tier);
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
