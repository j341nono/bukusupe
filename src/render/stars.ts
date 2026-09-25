import * as THREE from "three";
import type { LayoutResult } from "../layout/provisional";

const VERT = /* glsl */ `
uniform float uScale;   // 画面の高さと画角から決まる、世界の大きさ→ピクセルの係数
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = clamp(aSize * uScale / max(-mv.z, 0.001), 1.0, 96.0);
  gl_Position = projectionMatrix * mv;
  vAlpha = aAlpha;
  vColor = aColor;
}
`;

const FRAG = /* glsl */ `
varying float vAlpha;
varying vec3 vColor;
void main() {
  float r = length(gl_PointCoord - 0.5);
  float core = smoothstep(0.5, 0.06, r);
  float glow = exp(-r * r * 11.0);
  float a = (core * 0.8 + glow * 0.55) * vAlpha;
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor, a);
}
`;

/** 星の材質。uScale は画面の大きさに追随させる（SpaceView が更新する）。 */
export function createStarMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: { uScale: { value: 800 } },
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

/** 星団ごとの色み。意味は持たせず、まとまりが見える程度の差にとどめる。 */
const HUES = [0.58, 0.52, 0.09, 0.75, 0.13, 0.46, 0.86, 0.62, 0.02, 0.33];

export class StarField {
  readonly object: THREE.Points;
  private readonly alpha: THREE.BufferAttribute;
  private readonly count: number;
  /** 星が一つずつ生まれる演出のための、星ごとの点灯時刻（秒） */
  private readonly bornAt: Float32Array;
  private readonly targetAlpha: Float32Array;

  constructor(layout: LayoutResult) {
    const stars = layout.stars;
    this.count = stars.length;

    const pos = new Float32Array(stars.length * 3);
    const size = new Float32Array(stars.length);
    const color = new Float32Array(stars.length * 3);
    const alpha = new Float32Array(stars.length);
    this.bornAt = new Float32Array(stars.length);
    this.targetAlpha = new Float32Array(stars.length);

    const c = new THREE.Color();
    stars.forEach((s, i) => {
      // 地図の (x, y) を three の床面 (x, 0, -y) に置く。奥行きに意味は無い。
      pos[i * 3] = s.x;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = -s.y;

      size[i] = 0.95 + s.brightness * 1.25;
      c.setHSL(HUES[s.groupIndex % HUES.length], 0.35, 0.72 + s.brightness * 0.2);
      color[i * 3] = c.r;
      color[i * 3 + 1] = c.g;
      color[i * 3 + 2] = c.b;

      this.targetAlpha[i] = 0.45 + s.brightness * 0.55;
      alpha[i] = 0;
      // 内側の星から順に生まれる
      this.bornAt[i] = (i / Math.max(1, stars.length)) * 1.6;
    });

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geom.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geom.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    this.alpha = new THREE.BufferAttribute(alpha, 1);
    geom.setAttribute("aAlpha", this.alpha);

    this.object = new THREE.Points(geom, createStarMaterial());
    this.object.frustumCulled = false;
  }

  /** 生まれる演出。すべて点灯したら true を返す。 */
  update(elapsed: number): boolean {
    let done = true;
    const a = this.alpha.array as Float32Array;
    for (let i = 0; i < this.count; i++) {
      const t = (elapsed - this.bornAt[i]) / 0.5;
      if (t >= 1) {
        a[i] = this.targetAlpha[i];
        continue;
      }
      done = false;
      if (t <= 0) {
        a[i] = 0;
      } else {
        // 生まれた瞬間だけ少し強く光ってから落ち着く
        const flash = 1 + 0.9 * Math.sin(Math.PI * t) * (1 - t);
        a[i] = this.targetAlpha[i] * t * flash;
      }
    }
    this.alpha.needsUpdate = true;
    return done;
  }
}

/** 遠景の星（ブックマークではない。宇宙に見せるためだけの背景）。 */
export function createBackdrop(seed = 7): THREE.Points {
  const n = 1400;
  const pos = new Float32Array(n * 3);
  const size = new Float32Array(n);
  const color = new Float32Array(n * 3);
  const alpha = new Float32Array(n);

  let s = seed;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };

  for (let i = 0; i < n; i++) {
    const r = 420 + rnd() * 380;
    const th = rnd() * Math.PI * 2;
    const ph = Math.acos(2 * rnd() - 1);
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = r * Math.cos(ph) * 0.55;
    pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    size[i] = 0.5 + rnd() * 1.1;
    const tint = 0.72 + rnd() * 0.28;
    color[i * 3] = tint;
    color[i * 3 + 1] = tint;
    color[i * 3 + 2] = 1;
    alpha[i] = 0.05 + rnd() * 0.16;
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geom.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
  geom.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
  geom.setAttribute("aAlpha", new THREE.BufferAttribute(alpha, 1));

  const points = new THREE.Points(geom, createStarMaterial());
  points.frustumCulled = false;
  return points;
}
