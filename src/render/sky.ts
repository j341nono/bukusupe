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
