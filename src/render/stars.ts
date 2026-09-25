import * as THREE from "three";

/** 星座の星の強調。selected は描いている・選んでいるとき、edit は編集しているとき。 */
export type EmphasisMode = "none" | "selected" | "edit";

export type RenderStar = {
  id: string;
  x: number;
  y: number;
  /** 0..1。最終利用日時から決める */
  brightness: number;
  cluster: number;
  /** 星団の中での並び。0 が最も星団らしい星 */
  rank: number;
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
  gl_PointSize = clamp(aSize * uScale / max(-mv.z, 0.001), 2.0, 12.0);
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

export function clusterColor(cluster: number, lightness = 0.72): THREE.Color {
  return new THREE.Color().setHSL(HUES[cluster % HUES.length], 0.35, lightness);
}

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
  private sizeAttr!: THREE.BufferAttribute;
  private baseSize = new Float32Array(0);
  private searchSize = new Float32Array(0);
  private from = new Float32Array(0);
  private to = new Float32Array(0);
  private bornAt = new Float32Array(0);
  private targetAlpha = new Float32Array(0);
  private moveT = 1;
  private elapsed = 0;
  private springX = new Float32Array(0);
  private springY = new Float32Array(0);
  private velocityX = new Float32Array(0);
  private velocityY = new Float32Array(0);
  private searchX = new Float32Array(0);
  private searchY = new Float32Array(0);
  private searchAlpha = new Float32Array(0);
  private searching = false;
  private settling = false;
  private lastSearch: { ids: string[]; center: { x: number; y: number }; unit: number } =
    { ids: [], center: { x: 0, y: 0 }, unit: 1 };
  private emphasis = new Set<string>();
  private emphasisMode: EmphasisMode = "none";

  /** 星が動いている最中か（配置の移動、または検索の引き寄せ・戻りのばね）。 */
  get isSettling(): boolean {
    return this.settling;
  }

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
    this.springX = new Float32Array(n);
    this.springY = new Float32Array(n);
    this.velocityX = new Float32Array(n);
    this.velocityY = new Float32Array(n);
    this.searchX = new Float32Array(n);
    this.searchY = new Float32Array(n);
    this.searchAlpha = new Float32Array(n);
    this.baseSize = new Float32Array(n);
    this.searchSize = new Float32Array(n);
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
      // ばねは移動前の位置から始め、目標は新しい配置の位置に置く。
      // （目標まで移動前の位置にすると、ばねが毎コマ古い位置へ引き戻してしまう）
      this.springX[i] = fx;
      this.springY[i] = fy;
      this.searchX[i] = s.x;
      this.searchY[i] = s.y;

      // 地図の (x, y) を three の床面 (x, 0, -y) に置く。奥行きに意味は無い。
      pos[i * 3] = fx;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = -fy;

      // 螺旋の内側（その星団らしい星）ほど少し大きく、少し明るく
      const lead = 1 / (1 + s.rank * 0.5);
      size[i] = (0.95 + s.brightness * 1.25) * (1 + lead * 0.45);
      this.baseSize[i] = this.searchSize[i] = size[i];
      c.copy(clusterColor(s.cluster, 0.72 + s.brightness * 0.2));
      color[i * 3] = c.r;
      color[i * 3 + 1] = c.g;
      color[i * 3 + 2] = c.b;

      this.targetAlpha[i] = Math.min(1, (0.45 + s.brightness * 0.55) * (1 + lead * 0.25));
      this.searchAlpha[i] = this.targetAlpha[i];
      // 初回は内側の星から順に生まれる演出。以降は新しい星だけ光らせる
      const born = staggered ? (i / Math.max(1, n)) * 1.6 : 0;
      this.bornAt[i] = old ? -1 : born;
      alpha[i] = old ? this.targetAlpha[i] : 0;
    });

    this.stars = next;
    this.elapsed = 0;
    this.moveT = animate && previous.size > 0 ? 0 : 1;
    this.searching = false;
    this.lastSearch = { ids: [], center: { x: 0, y: 0 }, unit: 1 };

    this.geom.dispose();
    this.geom = new THREE.BufferGeometry();
    this.position = new THREE.BufferAttribute(pos, 3);
    this.alphaAttr = new THREE.BufferAttribute(alpha, 1);
    this.sizeAttr = new THREE.BufferAttribute(size, 1);
    this.geom.setAttribute("position", this.position);
    this.geom.setAttribute("aSize", this.sizeAttr);
    this.geom.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    this.geom.setAttribute("aAlpha", this.alphaAttr);
    this.object.geometry = this.geom;
  }

  /** 上位 21 件を内側から 3 / 6 / 12 の軌道に並べる。 */
  setSearch(ids: string[], center: { x: number; y: number }, unit: number): void {
    // 配置の移動の途中なら、いまの位置（spring に同期済み）からばねで続ける
    this.moveT = 1;
    this.lastSearch = { ids, center, unit };
    this.applyTargets();
  }

  /**
   * 星座の星を強調する（描いているとき・選んでいるとき・編集しているとき）。
   * 強調した星は少し大きく明るく。編集中は、星座に入っていない星をさらに暗くして差をはっきりさせる。
   */
  setEmphasis(ids: string[], mode: EmphasisMode): void {
    this.emphasis = new Set(mode === "none" ? [] : ids);
    this.emphasisMode = mode;
    this.applyTargets();
  }

  private applyTargets(): void {
    const { ids, center, unit } = this.lastSearch;
    this.searching = ids.length > 0;
    const rank = new Map(ids.slice(0, 21).map((id, i) => [id, i]));
    this.stars.forEach((star, i) => {
      const r = rank.get(star.id);
      if (r == null) {
        this.searchX[i] = star.x;
        this.searchY[i] = star.y;
        this.searchAlpha[i] = this.searching ? this.targetAlpha[i] * 0.25 : this.targetAlpha[i];
        this.searchSize[i] = this.baseSize[i];
        return;
      }
      const ring = r < 3 ? 0 : r < 9 ? 1 : 2;
      const start = [0, 3, 9][ring];
      const count = [3, 6, 12][ring];
      const angle = -Math.PI / 2 + ((r - start) / count) * Math.PI * 2 + ring * 0.12;
      const radius = [1, 1.75, 2.55][ring] * unit;
      this.searchX[i] = center.x + Math.cos(angle) * radius;
      this.searchY[i] = center.y + Math.sin(angle) * radius;
      this.searchAlpha[i] = [1, 0.78, 0.55][ring];
      this.searchSize[i] = [3.4, 2.5, 1.7][ring];
    });
    if (this.emphasisMode === "none") return;
    this.stars.forEach((star, i) => {
      if (this.emphasis.has(star.id)) {
        this.searchSize[i] = Math.max(this.searchSize[i], this.baseSize[i]) * 1.45;
        this.searchAlpha[i] = Math.min(1, Math.max(this.searchAlpha[i], this.targetAlpha[i]) * 1.4 + 0.1);
      } else if (this.emphasisMode === "edit") {
        this.searchAlpha[i] *= 0.45;
        this.searchSize[i] *= 0.85;
      }
    });
  }

  displayPosition(id: string): { x: number; y: number } | null {
    const i = this.index.get(id);
    return i == null ? null : { x: this.springX[i], y: this.springY[i] };
  }

  visual(id: string): { size: number; alpha: number } | null {
    const i = this.index.get(id);
    if (i == null) return null;
    return {
      size: (this.sizeAttr.array as Float32Array)[i],
      alpha: (this.alphaAttr.array as Float32Array)[i],
    };
  }

  update(dt: number): void {
    if (this.stars.length === 0) return;
    this.elapsed += dt;

    if (this.moveT < 1) {
      this.moveT = Math.min(1, this.moveT + dt / MOVE_SECONDS);
      const e = easeInOut(this.moveT);
      const pos = this.position.array as Float32Array;
      for (let i = 0; i < this.stars.length; i++) {
        const x = this.from[i * 2] + (this.to[i * 2] - this.from[i * 2]) * e;
        const y = this.from[i * 2 + 1] + (this.to[i * 2 + 1] - this.from[i * 2 + 1]) * e;
        pos[i * 3] = x;
        pos[i * 3 + 2] = -y;
        // 表示位置（displayPosition）とラベルが、移動中の星を追えるように合わせておく
        this.springX[i] = x;
        this.springY[i] = y;
        this.velocityX[i] = 0;
        this.velocityY[i] = 0;
      }
      this.position.needsUpdate = true;
    }

    const alpha = this.alphaAttr.array as Float32Array;

    const pos = this.position.array as Float32Array;
    let moving = false;
    let travelling = false;   // 目標にまだ着いていない星があるか（ラベルの判断を待つため）
    // 配置の移動中（moveT < 1）はばねを動かさない。動かし手は常に一つ
    for (let i = 0; this.moveT >= 1 && i < this.stars.length; i++) {
      if (!this.searching && Math.abs(this.springX[i] - this.stars[i].x) < 0.001 &&
        Math.abs(this.springY[i] - this.stars[i].y) < 0.001 &&
        Math.abs(this.velocityX[i]) + Math.abs(this.velocityY[i]) < 0.001) continue;
      const damping = Math.exp(-13 * dt);
      this.velocityX[i] = (this.velocityX[i] + (this.searchX[i] - this.springX[i]) * 90 * dt) * damping;
      this.velocityY[i] = (this.velocityY[i] + (this.searchY[i] - this.springY[i]) * 90 * dt) * damping;
      this.springX[i] += this.velocityX[i] * dt;
      this.springY[i] += this.velocityY[i] * dt;
      // 0.3（星の間隔の 15%）以内まで来れば、左右と重なりの判断には十分。位置は毎コマ追うので
      // 残りの差でラベルがずれることはない。0.02 まで待つと判断が約 1.4 秒遅れる
      if (Math.abs(this.searchX[i] - this.springX[i]) + Math.abs(this.searchY[i] - this.springY[i]) > 0.3 ||
        Math.abs(this.velocityX[i]) + Math.abs(this.velocityY[i]) > 1) travelling = true;
      pos[i * 3] = this.springX[i];
      pos[i * 3 + 2] = -this.springY[i];
      moving = true;
    }
    if (moving) this.position.needsUpdate = true;
    this.settling = travelling || this.moveT < 1;
    if (this.searching || moving || this.stars.some((_, i) => Math.abs(alpha[i] - this.searchAlpha[i]) > 0.001)) {
      for (let i = 0; i < this.stars.length; i++) {
        alpha[i] += (this.searchAlpha[i] - alpha[i]) * Math.min(1, dt * 12);
      }
      this.alphaAttr.needsUpdate = true;
    }

    // 誕生の演出は、なめらかにする処理より後に置く。先に置くと、まだ生まれていない星（0）が
    // なめらかにする処理で目標の約 2 割まで引き上げられ、最初から薄く見えてしまう。
    let born = false;
    for (let i = 0; i < this.stars.length; i++) {
      if (this.bornAt[i] < 0) continue;              // もう点いている
      born = true;
      const t = (this.elapsed - this.bornAt[i]) / BORN_SECONDS;
      if (t >= 1) {
        alpha[i] = this.targetAlpha[i];
        this.bornAt[i] = -1;
      } else if (t <= 0) {
        alpha[i] = 0;
      } else {
        // 生まれた瞬間だけ少し強く光ってから落ち着く
        const flash = 1 + 0.9 * Math.sin(Math.PI * t) * (1 - t);
        alpha[i] = this.targetAlpha[i] * t * flash;
      }
    }
    if (born) this.alphaAttr.needsUpdate = true;
    const sizes = this.sizeAttr.array as Float32Array;
    if (this.stars.some((_, i) => Math.abs(sizes[i] - this.searchSize[i]) > 0.001)) {
      for (let i = 0; i < this.stars.length; i++) {
        sizes[i] += (this.searchSize[i] - sizes[i]) * Math.min(1, dt * 12);
      }
      this.sizeAttr.needsUpdate = true;
    }
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
