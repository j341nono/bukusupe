import * as THREE from "three";
import { createStarMaterial } from "./stars";

/**
 * 飛行中だけ見える、遠くの背景の星空（SPEC 13 章）。ブックマークではなく、触れられない。
 *
 * 半径の違う 3 つの殻に星を散らし、それぞれをカメラに一部だけついて来させる（視差）。
 * 遠い殻ほどカメラとほぼ一緒に動くので近づけず、近い殻ほど少しずつ流れて見え、奥行きと飛んでいる感覚が出る。
 * 色は白〜淡いクリーム（`docs/DESIGN.md`）。
 */
const LAYERS = [
  { count: 900, radius: 1400, follow: 0.88, size: 3.6, alpha: [0.2, 0.55] },
  { count: 700, radius: 2400, follow: 0.95, size: 5.2, alpha: [0.12, 0.4] },
  { count: 600, radius: 3800, follow: 0.99, size: 7.0, alpha: [0.08, 0.28] },
];

export class FlightSky {
  readonly object = new THREE.Group();
  private readonly layers: { points: THREE.Points; follow: number }[] = [];

  constructor(seed = 11) {
    let s = seed;
    const rnd = () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
    for (const layer of LAYERS) {
      const pos = new Float32Array(layer.count * 3);
      const size = new Float32Array(layer.count);
      const color = new Float32Array(layer.count * 3);
      const alpha = new Float32Array(layer.count);
      for (let i = 0; i < layer.count; i++) {
        const th = rnd() * Math.PI * 2;
        const ph = Math.acos(2 * rnd() - 1);
        const r = layer.radius * (0.9 + rnd() * 0.2);
        pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pos[i * 3 + 1] = r * Math.cos(ph);
        pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
        size[i] = layer.size * (0.5 + rnd());
        const tint = 0.8 + rnd() * 0.2;
        const warm = rnd() * 0.06;
        color[i * 3] = tint;
        color[i * 3 + 1] = tint * (0.98 - warm * 0.3);
        color[i * 3 + 2] = tint * (0.96 - warm);
        alpha[i] = layer.alpha[0] + rnd() * (layer.alpha[1] - layer.alpha[0]);
      }
      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geom.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
      geom.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
      geom.setAttribute("aAlpha", new THREE.BufferAttribute(alpha, 1));
      const material = createStarMaterial();
      material.uniforms.uMaxSize.value = 3;
      const points = new THREE.Points(geom, material);
      points.frustumCulled = false;
      this.layers.push({ points, follow: layer.follow });
      this.object.add(points);
    }
    this.object.visible = false;
  }

  /** 画面の大きさの係数（SpaceView の resize から） */
  setScale(scale: number): void {
    for (const { points } of this.layers) (points.material as THREE.ShaderMaterial).uniforms.uScale.value = scale;
  }

  /** 殻をカメラに一部だけついて来させる（遠いほどよくついて来る＝近づけない）。 */
  follow(camera: THREE.Camera): void {
    for (const { points, follow } of this.layers) points.position.copy(camera.position).multiplyScalar(follow);
  }
}

/**
 * 飛行中の星雲（SPEC 13 章・`docs/DESIGN.md`）：星団ごとに、淡い藍の雲を立体の星の雲に重ねる。
 * 柔らかい光の板（Sprite）を星団ごとに 2 枚、星団の中心のまわりに少しずつずらして置く（位置は星団の番号から決まる）。
 * 枚数と大きさは、塗る面積（重さ）を抑える上限。2000 件（20 星団）で 4 枚にすると 60 コマを割った。
 * 色は `nebulaColor`（藍の 1 色相、明度だけ星団ごとに違う）。
 */
export type CloudSpec = { index: number; x: number; y: number; z: number; radius: number; color: THREE.Color };

export class FlightNebulae {
  readonly object = new THREE.Group();
  private readonly texture: THREE.Texture;
  private sprites: THREE.Sprite[] = [];
  count = 0;

  constructor() {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(255,255,255,0.9)");
      g.addColorStop(0.4, "rgba(255,255,255,0.35)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
    }
    this.texture = new THREE.CanvasTexture(canvas);
    this.object.visible = false;
  }

  /** 星団の雲を置き直す（位置は広げた空間の座標）。 */
  set(clouds: CloudSpec[]): void {
    for (const sprite of this.sprites) {
      this.object.remove(sprite);
      (sprite.material as THREE.Material).dispose();
    }
    this.sprites = [];
    for (const c of clouds) {
      for (let k = 0; k < 2; k++) {
        const a = c.index * 2.39 + k * 2.6;
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.texture, color: c.color, transparent: true,
          opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false }));
        sprite.position.set(c.x + Math.cos(a) * c.radius * 0.35, c.y + Math.sin(a * 1.3) * c.radius * 0.2,
          c.z + Math.sin(a) * c.radius * 0.35);
        sprite.scale.setScalar(c.radius * (1.35 + 0.2 * ((k + c.index) % 3)));
        this.sprites.push(sprite);
        this.object.add(sprite);
      }
    }
    this.count = clouds.length;
  }

  /** 立ち上がりに合わせて現れる（0〜1） */
  setOpacity(level: number): void {
    for (const sprite of this.sprites) (sprite.material as THREE.SpriteMaterial).opacity = 0.2 * level;
  }
}
