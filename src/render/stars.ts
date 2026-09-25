import * as THREE from "three";

export type RenderStar = {
  id: string;
  x: number;
  y: number;
  /** 0..1。最終利用日時から決める */
  brightness: number;
  cluster: number;
};

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

const MOVE_SECONDS = 0.9;
const BORN_SECONDS = 0.5;

/**
 * 星の群れ。Points 1 つで描くので、数千件でもコマ落ちしない。
 * 配置が入れ替わったときは、同じ星は前の位置から新しい位置へ動かす。
 */
export class StarField {
  readonly object: THREE.Points;

  private geom = new THREE.BufferGeometry();
  private stars: RenderStar[] = [];
  private index = new Map<string, number>();
  private position!: THREE.BufferAttribute;
  private alphaAttr!: THREE.BufferAttribute;
  private from = new Float32Array(0);
  private to = new Float32Array(0);
  private bornAt = new Float32Array(0);
  private targetAlpha = new Float32Array(0);
  private moveT = 1;
  private elapsed = 0;

  constructor() {
    this.object = new THREE.Points(this.geom, createStarMaterial());
    this.object.frustumCulled = false;
  }

  get count(): number {
    return this.stars.length;
  }

  /** 表示中の星の位置（地図の座標）。ラベルの重ね表示に使う。 */
  get placed(): RenderStar[] {
    return this.stars;
  }

  setStars(next: RenderStar[], animate = true): void {
    const previous = this.positionsById();
    const n = next.length;

    const pos = new Float32Array(n * 3);
    const size = new Float32Array(n);
    const color = new Float32Array(n * 3);
    const alpha = new Float32Array(n);
    this.from = new Float32Array(n * 2);
    this.to = new Float32Array(n * 2);
    this.bornAt = new Float32Array(n);
    this.targetAlpha = new Float32Array(n);
    this.index = new Map();

    const c = new THREE.Color();
    const staggered = previous.size === 0;
    next.forEach((s, i) => {
      this.index.set(s.id, i);
      const old = previous.get(s.id);
      const fx = old ? old.x : s.x;
      const fy = old ? old.y : s.y;
      this.from[i * 2] = fx;
      this.from[i * 2 + 1] = fy;
      this.to[i * 2] = s.x;
      this.to[i * 2 + 1] = s.y;

      // 地図の (x, y) を three の床面 (x, 0, -y) に置く。奥行きに意味は無い。
      pos[i * 3] = fx;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = -fy;

      size[i] = 0.95 + s.brightness * 1.25;
      c.setHSL(HUES[s.cluster % HUES.length], 0.35, 0.72 + s.brightness * 0.2);
      color[i * 3] = c.r;
      color[i * 3 + 1] = c.g;
      color[i * 3 + 2] = c.b;

      this.targetAlpha[i] = 0.45 + s.brightness * 0.55;
      // 初回は内側の星から順に生まれる演出。以降は新しい星だけ光らせる
      const born = staggered ? (i / Math.max(1, n)) * 1.6 : 0;
      this.bornAt[i] = old ? -1 : born;
      alpha[i] = old ? this.targetAlpha[i] : 0;
    });

    this.stars = next;
    this.elapsed = 0;
    this.moveT = animate && previous.size > 0 ? 0 : 1;

    this.geom.dispose();
    this.geom = new THREE.BufferGeometry();
    this.position = new THREE.BufferAttribute(pos, 3);
    this.alphaAttr = new THREE.BufferAttribute(alpha, 1);
    this.geom.setAttribute("position", this.position);
    this.geom.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    this.geom.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    this.geom.setAttribute("aAlpha", this.alphaAttr);
    this.object.geometry = this.geom;
  }

  update(dt: number): void {
    if (this.stars.length === 0) return;
    this.elapsed += dt;

    if (this.moveT < 1) {
      this.moveT = Math.min(1, this.moveT + dt / MOVE_SECONDS);
      const e = easeInOut(this.moveT);
      const pos = this.position.array as Float32Array;
      for (let i = 0; i < this.stars.length; i++) {
        pos[i * 3] = this.from[i * 2] + (this.to[i * 2] - this.from[i * 2]) * e;
        pos[i * 3 + 2] = -(this.from[i * 2 + 1] + (this.to[i * 2 + 1] - this.from[i * 2 + 1]) * e);
      }
      this.position.needsUpdate = true;
    }

    const alpha = this.alphaAttr.array as Float32Array;
    let changed = false;
    for (let i = 0; i < this.stars.length; i++) {
      if (this.bornAt[i] < 0) continue;              // もう点いている
      const t = (this.elapsed - this.bornAt[i]) / BORN_SECONDS;
      if (t >= 1) {
        alpha[i] = this.targetAlpha[i];
        this.bornAt[i] = -1;
        changed = true;
        continue;
      }
      changed = true;
      if (t <= 0) {
        alpha[i] = 0;
      } else {
        // 生まれた瞬間だけ少し強く光ってから落ち着く
        const flash = 1 + 0.9 * Math.sin(Math.PI * t) * (1 - t);
        alpha[i] = this.targetAlpha[i] * t * flash;
      }
    }
    if (changed) this.alphaAttr.needsUpdate = true;
  }

  private positionsById(): Map<string, { x: number; y: number }> {
    const map = new Map<string, { x: number; y: number }>();
    if (this.stars.length === 0) return map;
    const pos = this.position.array as Float32Array;
    this.stars.forEach((s, i) => map.set(s.id, { x: pos[i * 3], y: -pos[i * 3 + 2] }));
    return map;
  }
}

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

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
