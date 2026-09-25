import * as THREE from "three";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";
import type { LayoutResult } from "../layout/provisional";
import { StarField, createBackdrop } from "./stars";

/** 静止時のカメラの傾き（真上から 40 度。SPEC 7 章） */
const TILT = THREE.MathUtils.degToRad(40);

export class SpaceView {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly controls: MapControls;
  private readonly clock = new THREE.Clock();
  private field: StarField | null = null;
  private readonly backdrop: THREE.Points;
  private running = false;
  /** 描画できたコマ数。計算中も画面が動いていることの確認に使う。 */
  frames = 0;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.setClearColor(0x05060f, 1);

    this.camera = new THREE.PerspectiveCamera(50, 1, 0.5, 4000);
    this.camera.position.set(0, 90 * Math.cos(TILT), 90 * Math.sin(TILT));
    this.camera.lookAt(0, 0, 0);

    this.controls = new MapControls(this.camera, canvas);
    // SPEC 7 章：操作は移動と拡大縮小のみ。自由な回転は許可しない。
    this.controls.enableRotate = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 8;
    this.controls.maxDistance = 600;

    this.backdrop = createBackdrop();
    this.scene.add(this.backdrop);

    addEventListener("resize", this.resize);
    this.resize();
  }

  setLayout(layout: LayoutResult): void {
    if (this.field) {
      this.scene.remove(this.field.object);
      this.field.object.geometry.dispose();
    }
    this.field = new StarField(layout);
    this.scene.add(this.field.object);
    this.resize();
    this.frameAll(layout);
    this.clock.start();
  }

  /** 全体が画面に収まる距離へカメラを置く */
  private frameAll(layout: LayoutResult): void {
    let max = 10;
    for (const s of layout.stars) max = Math.max(max, Math.hypot(s.x, s.y));
    const tanV = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    const tanH = tanV * this.camera.aspect;
    // 縦と横のきつい方に合わせ、傾けた分の余白を足す
    const dist = Math.max(40, max * Math.max(1 / tanV, 1 / tanH) * 1.05);
    this.controls.target.set(0, 0, 0);
    this.camera.position.set(0, dist * Math.cos(TILT), dist * Math.sin(TILT));
    this.controls.maxDistance = dist * 3;
    this.controls.update();
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.renderer.setAnimationLoop(this.tick);
  }

  private readonly tick = (): void => {
    this.frames++;
    const t = this.clock.getElapsedTime();
    this.field?.update(t);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  private readonly resize = (): void => {
    const w = this.canvas.clientWidth || innerWidth;
    const h = this.canvas.clientHeight || innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    // 世界の大きさ 1 が画面上で何ピクセルになるか（距離 1 のとき）
    const scale =
      (this.renderer.getDrawingBufferSize(new THREE.Vector2()).y) /
      (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)));
    this.setPointScale(scale);
  };

  private setPointScale(scale: number): void {
    for (const obj of [this.backdrop, this.field?.object]) {
      const mat = obj?.material as THREE.ShaderMaterial | undefined;
      if (mat?.uniforms?.uScale) mat.uniforms.uScale.value = scale;
    }
  }
}
