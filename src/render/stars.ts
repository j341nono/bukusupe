import * as THREE from "three";

/** 星座の星の強調。selected は描いている・選んでいるとき、edit は編集しているとき。 */
/** none：強調なし／selected：選んだ星座の星／select：選択モードで選んだ星（他の星は暗くしない。SPEC 9 章） */
export type EmphasisMode = "none" | "selected" | "select";

/**
 * 星の見え方。星ごとの基準の大きさ（世界の単位）・明るさ（不透明度）・色。
 * 地図でも飛行モードでも、この値が効く（飛行中の遠近法や検索の軌道は、この上に掛かる）。
 * 段階 2（星の等級）は `StarField.setAppearance()` でこれを「最後に触れた日」から決める関数に差し替える。
 */
export type StarAppearance = { size: number; alpha: number; color: THREE.Color };
export type AppearanceFn = (star: RenderStar) => StarAppearance;

/** いまの見え方：明るさ（最終利用日時）と、螺旋の内側（代表）ほど少し大きく明るく。 */
export const defaultAppearance: AppearanceFn = (s) => {
  const lead = 1 / (1 + s.rank * 0.5);
  return {
    size: (0.95 + s.brightness * 1.25) * (1 + lead * 0.45),
    alpha: Math.min(1, (0.45 + s.brightness * 0.55) * (1 + lead * 0.25)),
    color: starColor(s.id, s.brightness),
  };
};

export type RenderStar = {
  id: string;
  x: number;
  y: number;
  /** 0..1。最終利用日時から決める */
  brightness: number;
  /** 最後に触れた日（最終利用日と追加日の新しいほう。無ければ undefined）。見え方の関数が使う */
  touched?: number;
  cluster: number;
  /** 星団の中での並び。0 が最も星団らしい星 */
  rank: number;
};

const VERT = /* glsl */ `
uniform float uScale;    // 画面の高さと画角から決まる、世界の大きさ→ピクセルの係数
uniform float uMaxSize;  // 画面上の大きさの上限（地図 12px、飛行中は大きく）
uniform float uFlight;   // 飛行中 1。近い（大きく写る）星ほど明るくする
uniform float uSizeScale; // 大きさの係数。地図は遠くから見るので 1、飛行中は近くから見るので小さく
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float px = aSize * uSizeScale * uScale / max(-mv.z, 0.001);
  gl_PointSize = clamp(px, 2.0, uMaxSize);
  gl_Position = projectionMatrix * mv;
  vAlpha = aAlpha * (1.0 + uFlight * clamp((px - 8.0) / 40.0, 0.0, 1.0) * 0.8);
  vColor = aColor;
}
`;

/** 地図での星の大きさの上限（px）。飛行中は FLIGHT_MAX_POINT まで大きくなる。 */
export const MAP_MAX_POINT = 12;
export const FLIGHT_MAX_POINT = 64;
/** 飛行中の星の大きさの係数（地図の大きさの値を、近くから見る前提に縮める） */
export const FLIGHT_SIZE_SCALE = 0.55;

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
    uniforms: { uScale: { value: 800 }, uMaxSize: { value: MAP_MAX_POINT }, uFlight: { value: 0 }, uSizeScale: { value: 1 } },
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

/** 星団ごとの色み。意味は持たせず、まとまりが見える程度の差にとどめる。 */
/**
 * 星の色。星団ごとの色相の塗り分けはやめ、温かみのある白〜淡いクリームに収める（星図のパレット）。
 * id から決まるごく僅かな色温度の揺らぎだけを残す。意味は持たせない。明るさは最終利用日時のまま。
 */
export function starColor(id: string, brightness: number): THREE.Color {
  let h = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 0x01000193) >>> 0;
  const t = (h % 1000) / 1000;                       // 0：やや暖かい 〜 1：やや冷たい
  const hue = t < 0.5 ? 0.11 : 0.6;
  const saturation = 0.06 + Math.abs(t - 0.5) * 0.28;  // 最大でも 0.2
  return new THREE.Color().setHSL(hue, saturation, 0.8 + brightness * 0.15);
}

/**
 * 星雲の色。色相は藍の 1 系統に固定し、星団ごとの違いは明度（と nebula.ts の形）で付ける。
 */
export function nebulaColor(cluster: number): THREE.Color {
  // 隣り合う番号で明暗が交互になるよう並べる（背景の藍に溶けない明るさにする）
  const lightness = [0.46, 0.34, 0.54, 0.38, 0.5, 0.31, 0.57, 0.42][cluster % 8];
  return new THREE.Color().setHSL(0.63, 0.3, lightness);
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
  private animating = true;
  private springX = new Float32Array(0);
  private springY = new Float32Array(0);
  private velocityX = new Float32Array(0);
  private velocityY = new Float32Array(0);
  private searchX = new Float32Array(0);
  private searchY = new Float32Array(0);
  private searchAlpha = new Float32Array(0);
  private searching = false;
  private settling = false;
  private colorAttr!: THREE.BufferAttribute;
  private appearance: AppearanceFn = defaultAppearance;
  /** 飛行モードの高さ（星ごと）と、立ち上がりの度合い（0：平面、1：立体） */
  private heights = new Float32Array(0);
  private lift = 0;
  private liftDirty = false;

  /** 星の見え方を差し替える（段階 2 の等級など）。地図と飛行モードの両方に効く。 */
  setAppearance(fn: AppearanceFn): void {
    this.appearance = fn;
    const sizes = this.sizeAttr?.array as Float32Array | undefined;
    const colors = this.colorAttr?.array as Float32Array | undefined;
    if (!sizes || !colors) return;
    this.stars.forEach((star, i) => {
      const look = fn(star);
      this.baseSize[i] = look.size;
      this.targetAlpha[i] = look.alpha;
      colors[i * 3] = look.color.r;
      colors[i * 3 + 1] = look.color.g;
      colors[i * 3 + 2] = look.color.b;
    });
    this.colorAttr.needsUpdate = true;
    this.applyTargets();
  }

  /** 飛行モードの高さを星ごとに入れる（地図の座標は変えない）。 */
  setHeights(heights: Map<string, number>): void {
    this.heights = new Float32Array(this.stars.length);
    this.stars.forEach((star, i) => { this.heights[i] = heights.get(star.id) ?? 0; });
    this.liftDirty = true;
  }

  /** 立ち上がりの度合い（0：地図の平面、1：飛行モードの立体）。 */
  setLift(value: number): void {
    if (value === this.lift) return;
    this.lift = value;
    this.liftDirty = true;
  }

  /** いま描いている 3 次元の位置（地図の座標 x・y と高さ z）。 */
  position3(id: string): { x: number; y: number; z: number } | null {
    const i = this.index.get(id);
    if (i == null) return null;
    const pos = this.position.array as Float32Array;
    return { x: pos[i * 3], y: -pos[i * 3 + 2], z: pos[i * 3 + 1] };
  }

  /** 飛行中の当たり判定向け。毎コマの小さなオブジェクト生成を避ける。 */
  positionWorld(id: string, out: THREE.Vector3, scale: number): boolean {
    const i = this.index.get(id);
    if (i == null) return false;
    const pos = this.position.array as Float32Array;
    out.set(pos[i * 3] * scale, pos[i * 3 + 1] * scale, pos[i * 3 + 2] * scale);
    return true;
  }

  /** 星の基準の大きさ（世界の単位。画面上の大きさはこれを距離で割って決まる）。 */
  pointSize(id: string): number | null {
    const i = this.index.get(id);
    return i == null ? null : (this.sizeAttr.array as Float32Array)[i];
  }
  private lastSearch: { ids: string[]; center: { x: number; y: number }; unit: number } =
    { ids: [], center: { x: 0, y: 0 }, unit: 1 };
  private emphasis = new Set<string>();
  private emphasisMode: EmphasisMode = "none";

  /** 星が動いている最中か（配置の移動、または検索の引き寄せ・戻りのばね）。 */
  get isSettling(): boolean {
    return this.settling;
  }

  /**
   * 見た目がまだ変わっている最中か（配置の移動・ばね・誕生の演出・明るさと大きさの追従）。
   * 直前の update で決まる。false の間は、次のコマを描いても見た目は変わらない（描画のループを止めてよい）。
   */
  get isAnimating(): boolean {
    return this.animating;
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

      // 見え方は差し替えられる関数から（既定は明るさ＋螺旋の内側ほど少し大きく明るく）
      const look = this.appearance(s);
      size[i] = look.size;
      this.baseSize[i] = this.searchSize[i] = size[i];
      c.copy(look.color);
      color[i * 3] = c.r;
      color[i * 3 + 1] = c.g;
      color[i * 3 + 2] = c.b;

      this.targetAlpha[i] = look.alpha;
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
    this.colorAttr = new THREE.BufferAttribute(color, 3);
    this.geom.setAttribute("aColor", this.colorAttr);
    this.geom.setAttribute("aAlpha", this.alphaAttr);
    this.heights = new Float32Array(n);
    this.liftDirty = true;
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
   * 強調した星は少し大きく明るく。選択モードでも、選んでいない星は暗くしない（どの星も普段の明るさで選べるように）。
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
    if (this.stars.length === 0) { this.animating = false; return; }
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
      // 目標（検索していなければ配置の位置、検索中は軌道の位置）に着いて止まっている星は動かさない
      if (Math.abs(this.springX[i] - this.searchX[i]) < 0.001 &&
        Math.abs(this.springY[i] - this.searchY[i]) < 0.001 &&
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
    const fading = this.stars.some((_, i) => Math.abs(alpha[i] - this.searchAlpha[i]) > 0.001);
    if (this.searching || moving || fading) {
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

    if (this.liftDirty) {
      for (let i = 0; i < this.stars.length; i++) pos[i * 3 + 1] = this.heights[i] * this.lift;
      this.position.needsUpdate = true;
      this.liftDirty = false;
    }
    const sizes = this.sizeAttr.array as Float32Array;
    const resizing = this.stars.some((_, i) => Math.abs(sizes[i] - this.searchSize[i]) > 0.001);
    if (resizing) {
      for (let i = 0; i < this.stars.length; i++) {
        sizes[i] += (this.searchSize[i] - sizes[i]) * Math.min(1, dt * 12);
      }
      this.sizeAttr.needsUpdate = true;
    }
    this.animating = this.moveT < 1 || moving || fading || born || resizing;
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
    // 遠景の星も同じ白〜淡いクリームの範囲に（青みを抑える）
    const tint = 0.78 + rnd() * 0.22;
    const warm = rnd() * 0.06;
    color[i * 3] = tint;
    color[i * 3 + 1] = tint * (0.98 - warm * 0.3);
    color[i * 3 + 2] = tint * (0.96 - warm);
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
