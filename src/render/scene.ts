import * as THREE from "three";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";
import type { Layout } from "../layout";
import { layoutExtent } from "../layout";
import { LabelLayer, type LabelItem, type ZoomTier } from "../ui/labels";
import { StarField, createBackdrop, type RenderStar } from "./stars";

/** 静止時のカメラの傾き（真上から 40 度。SPEC 7 章） */
const TILT = THREE.MathUtils.degToRad(40);
/** 傾き⇄真上の切り替えにかける時間（SPEC 7 章） */
const TURN_SECONDS = 0.6;

export type LabelSource = {
  clusters: { index: number; name: string; x: number; y: number; count: number }[];
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
  private readonly labels: LabelLayer;

  private running = false;
  private extent = 60;
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
    this.scene.add(this.field.object);

    this.labels = new LabelLayer(labelContainer);

    addEventListener("resize", this.resize);
    this.resize();
  }

  setLayout(layout: Layout, stars: RenderStar[], source: LabelSource, frame = true): void {
    this.field.setStars(stars);
    this.labelSource = source;
    this.extent = layoutExtent(layout);
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
    if (d > this.extent * 2.0) return "far";
    if (d > this.extent * 0.9) return "mid";
    return "near";
  }

  /** 確認用：段階ごとの決まった拡大率に合わせる。 */
  setZoomTier(tier: ZoomTier): void {
    const factor = tier === "far" ? 2.6 : tier === "mid" ? 1.3 : 0.5;
    this.setDistance(this.extent * factor);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.renderer.setAnimationLoop(this.tick);
  }

  /** 全体が画面に収まる距離へカメラを置く */
  private frameAll(): void {
    this.controls.target.set(0, 0, 0);
    const tanV = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    const tanH = tanV * this.camera.aspect;
    this.setDistance(Math.max(30, this.extent * Math.max(1 / tanV, 1 / tanH) * 1.05));
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
    const items: LabelItem[] = [];

    for (const c of this.labelSource.clusters) {
      if (c.count === 0) continue;
      items.push({
        key: `c${c.index}`,
        text: c.name,
        x: c.x,
        y: c.y,
        kind: "cluster",
        priority: -1000 + (1000 - c.count),   // 大きい星団ほど先に置く
      });
    }

    if (tier !== "far") {
      const limit = tier === "mid" ? 4 : Infinity;
      for (const s of this.labelSource.stars) {
        if (s.rank >= limit) continue;
        items.push({ key: s.id, text: s.title, x: s.x, y: s.y, kind: "star", priority: s.rank });
      }
    }

    const size = this.renderer.getSize(new THREE.Vector2());
    this.labels.render(items, this.camera, size.x, size.y);
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
