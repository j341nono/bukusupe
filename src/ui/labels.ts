export type ZoomTier = "far" | "mid" | "near";

export type PlacedLabel = {
  key: string;
  text: string;
  /** 画面上の星（または星団）の位置 */
  sx: number;
  sy: number;
  kind: "cluster" | "star";
  /** 小さいほど大事。重なったときはこの順に残す */
  priority: number;
  cluster?: number;
  side?: "left" | "right";
  color?: string;
  searchRank?: number;
  /** カメラ移動中も追跡する地図上の位置。検索中の星は表示位置を使う。 */
  x: number;
  y: number;
  centered?: boolean;
  /** 文字の大きさ（px）。星団名は件数に応じて変える。無ければ種類の既定値 */
  fontSize?: number;
  /** 通常の地図で、最終利用日に応じたタイトルの濃さ */
  opacity?: number;
  /** 星座を強調しているとき、星座以外のタイトルを暗くする */
  dim?: boolean;
};

export type Box = { l: number; t: number; r: number; b: number };
export type ScreenCircle = { cluster: number; sx: number; sy: number; rx: number; ry: number };

/** 同時に出すラベルの上限（SPEC 7 章）。 */
const MAX_LABELS = 60;
const FONT = { cluster: 13, star: 11 } as const;
/** CSS の letter-spacing（em）。canvas の measureText には入らないので足す。 */
const LETTER_SPACING = { cluster: 0.28, star: 0.02 } as const;
/** 種類ごとの書体。CSS 変数（index.html の :root）と同じものを読む。星団名は明朝、タイトルはゴシック */
const FONT_VAR = { cluster: "--font-name", star: "--font-text" } as const;

/** 星から右へどれだけ離すか。 */
const OFFSET_X = 8;
/** 下地の左右の余白（CSS の padding と合わせる）。 */
const PADDING_X = 5;
/** 星からタイトルへの引き出し線（7px）とその余白（4px）。CSS と合わせる */
const DOT_WIDTH = 11;

/** 中距離で省略する長さ（全角を 1、半角を 0.5 として数える）。 */
const MID_WIDTH = 18;
/**
 * 近距離・検索中のタイトルの最大の長さ（同じ数え方）。とても長いタイトルが画面の外まで伸びないように（docs/SECURITY.md）。
 * マウスを乗せたときの全文も、この長さまで。それより長い分は title（ブラウザの小さな吹き出し）で見る。
 */
const NEAR_WIDTH = 40;
const SEARCH_WIDTH = 32;
const HOVER_WIDTH = 80;

const isWide = (ch: string) => !/[ -߿｡-ﾟ]/.test(ch);

export function truncate(text: string, limit: number): string {
  let width = 0;
  for (let i = 0; i < text.length; i++) {
    width += isWide(text[i]) ? 1 : 0.5;
    if (width > limit) return text.slice(0, Math.max(1, i)) + "…";
  }
  return text;
}

/** ラベルの文字の大きさ。検索中は軌道の内側ほど大きい。 */
const sizeOf = (item: PlacedLabel): number =>
  item.fontSize ?? (item.searchRank == null ? FONT[item.kind]
    : item.searchRank < 3 ? 14 : item.searchRank < 9 ? 12 : 10);

const overlaps = (a: Box, b: Box) => a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b;

/** 長方形と画面に投影した星団の楕円が交わるか。 */
export function entersCircle(box: Box, circle: ScreenCircle): boolean {
  const x = Math.max(box.l, Math.min(circle.sx, box.r));
  const y = Math.max(box.t, Math.min(circle.sy, box.b));
  return ((x - circle.sx) / circle.rx) ** 2 + ((y - circle.sy) / circle.ry) ** 2 < 1;
}

/**
 * タイトルは HTML の重ね表示で描く（SPEC 7 章）。
 * 星団中心から外へ向けてタイトルを置き、他のタイトルと重なるものを間引く。
 */
export class LabelLayer {
  private readonly elements = new Map<string, HTMLDivElement>();
  /** 表示中のラベル。width は位置合わせに使う幅（ホバーで全文にしたときは広がる）。 */
  private active: { item: PlacedLabel; text: string; baseWidth: number; width: number; height: number }[] = [];
  private readonly fontFamily: Partial<Record<PlacedLabel["kind"], string>> = {};
  private readonly measure = document.createElement("canvas").getContext("2d");
  private readonly fullText = new Map<string, string>();
  private hovered: string | null = null;
  onHover: ((key: string | null) => void) | null = null;
  onClick: ((key: string) => void) | null = null;
  onDoubleClick: ((key: string, newTab: boolean) => void) | null = null;
  onClusterClick: ((cluster: number) => void) | null = null;

  constructor(private readonly container: HTMLElement) {
    container.addEventListener("mouseover", this.onOver);
    container.addEventListener("mouseout", this.onOut);
    container.addEventListener("click", this.onLabelClick);
    container.addEventListener("dblclick", this.onLabelDoubleClick);
  }

  /** 書体を取り直す（画面の言語で名前の書体が変わるため） */
  resetFonts(): void {
    for (const kind of Object.keys(this.fontFamily) as PlacedLabel["kind"][]) delete this.fontFamily[kind];
  }

  render(items: PlacedLabel[], tier: ZoomTier, circles: ScreenCircle[] = []): number {
    const labelBoxes: Box[] = [];
    const shown: { item: PlacedLabel; text: string; box: Box }[] = [];

    for (const item of [...items].sort((a, b) => a.priority - b.priority)) {
      if (shown.length >= MAX_LABELS) break;
      const full = item.text;
      this.fullText.set(item.key, full);
      const limit = item.kind !== "star" ? Infinity
        : this.hovered === item.key ? HOVER_WIDTH
          : item.searchRank != null ? SEARCH_WIDTH
            : tier === "mid" ? MID_WIDTH : NEAR_WIDTH;
      const shortened = limit === Infinity ? full : truncate(full, limit);

      const size = sizeOf(item);
      const w = this.labelWidth(item, shortened, size);
      const h = size + 6;
      const t = item.sy - h / 2;

      // 星団名は遠くでは星雲の中心に重ねる
      const box: Box =
        item.kind === "cluster" && tier === "far"
          ? { l: item.sx - w / 2, t, r: item.sx + w / 2, b: t + h }
          : item.kind === "star" && item.side === "left"
            ? { l: item.sx - OFFSET_X - w, t, r: item.sx - OFFSET_X, b: t + h }
            : { l: item.sx + OFFSET_X, t, r: item.sx + OFFSET_X + w, b: t + h };

      if (labelBoxes.some((p) => overlaps(p, box))) continue;
      // 実際の DOM は日本語と英数字の混在で canvas の測定より広くなることがある。
      // 星団の境界には余白を取り、描画後の帯が隣の星雲へ入らないようにする。
      const circleBox = { l: box.l - 20, t: box.t - 4, r: box.r + 20, b: box.b + 4 };
      if (item.kind === "star" && item.priority > -3000 &&
        circles.some((c) => c.cluster !== item.cluster && entersCircle(circleBox, c))) continue;

      labelBoxes.push(box);
      shown.push({ item, text: shortened, box });
    }

    this.paint(shown);
    return shown.length;
  }

  clear(): void {
    this.paint([]);
  }

  /** 表示判断は変えず、保存した大きさを使って位置だけを毎フレーム動かす。 */
  updatePositions(project: (item: PlacedLabel) => { sx: number; sy: number } | null): void {
    for (const { item, width, height } of this.active) {
      const at = project(item);
      if (!at) continue;
      const x = item.centered
        ? at.sx - width / 2
        : item.kind === "star" && item.side === "left" ? at.sx - OFFSET_X - width : at.sx + OFFSET_X;
      const y = at.sy - height / 2;
      this.elements.get(item.key)!.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    }
  }

  private paint(shown: { item: PlacedLabel; text: string; box: Box }[]): void {
    const next = new Set(shown.map(({ item }) => item.key));
    for (const [key, el] of this.elements) {
      if (next.has(key)) continue;
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      setTimeout(() => {
        if (this.active.some(({ item }) => item.key === key)) return;
        el.remove();
        this.elements.delete(key);
      }, 220);
    }
    this.active = shown.map(({ item, text, box }) => ({ item, text,
      baseWidth: box.r - box.l, width: box.r - box.l, height: box.b - box.t }));
    shown.forEach(({ item, text, box }) => {
      let el = this.elements.get(item.key);
      const fresh = !el;
      if (!el) {
        el = document.createElement("div");
        el.className = "label";
        el.style.opacity = "0";
        this.container.appendChild(el);
        this.elements.set(item.key, el);
      }
      el.textContent = text;
      // 省略したときは、全文を title に入れる（マウスを乗せると見られる）
      const full = this.fullText.get(item.key) ?? text;
      if (full !== text) el.title = full;
      else el.removeAttribute("title");
      const orbit = item.searchRank == null ? "" : item.searchRank < 3 ? " label-orbit-inner"
        : item.searchRank < 9 ? " label-orbit-middle" : " label-orbit-outer";
      // 星団名はどの拡大率でもクリックでその星団へ移れる
      el.className = `label label-${item.kind}${orbit}${item.kind === "cluster" ? " label-cluster-focus" : ""}` +
        `${item.dim ? " label-dim" : ""}`;
      el.dataset.key = item.key;
      el.dataset.searchRank = item.searchRank == null ? "" : String(item.searchRank);
      el.dataset.cluster = item.cluster == null ? "" : String(item.cluster);
      el.dataset.side = item.side ?? "";
      el.dataset.kind = item.kind;
      el.style.textAlign = item.side === "left" ? "right" : "left";
      el.style.fontSize = item.fontSize ? `${item.fontSize}px` : "";
      el.style.width = item.searchRank == null ? "" : `${(box.r - box.l).toFixed(1)}px`;
      el.style.boxSizing = item.searchRank == null ? "" : "border-box";
      el.style.setProperty("--cluster-color", item.color ?? "transparent");
      // 省略したものだけ、マウスを乗せたら全文を出す
      el.style.pointerEvents = "auto";
      el.style.transform = `translate3d(${box.l.toFixed(1)}px, ${box.t.toFixed(1)}px, 0)`;
      const opacity = item.dim ? "0.3" : this.hovered === item.key ? "1" : String(item.opacity ?? 1);
      if (fresh) requestAnimationFrame(() => { if (this.active.some(({ item: active }) => active.key === item.key)) el.style.opacity = opacity; });
      else el.style.opacity = opacity;
    });
  }

  private readonly onOver = (e: Event) => {
    const el = e.target as HTMLElement;
    const key = el?.dataset?.key;
    if (!key) return;
    this.hovered = key;
    this.onHover?.(key);
    el.classList.add("is-hovered");
    const hovered = this.active.find(({ item }) => item.key === key);
    if (hovered?.item.opacity != null) el.style.opacity = "1";
    // 全文を出す。ただし長すぎるものは HOVER_WIDTH まで（残りは title で見る）
    const full = truncate(this.fullText.get(key) ?? "", HOVER_WIDTH);
    el.textContent = full;
    // 左側のタイトルは右端（星の側）を固定して、全文を左へ伸ばす。星の上にかぶらないように
    const entry = this.active.find(({ item }) => item.key === key);
    if (entry && entry.text !== full) {
      const size = sizeOf(entry.item);
      entry.width = this.labelWidth(entry.item, full, size);
    }
  };

  private readonly onOut = (e: Event) => {
    const el = e.target as HTMLElement;
    el.classList.remove("is-hovered");
    const entry = this.active.find(({ item }) => item.key === el.dataset?.key);
    if (entry) {
      el.textContent = entry.text;
      entry.width = entry.baseWidth;
      el.style.opacity = entry.item.dim ? "0.3" : String(entry.item.opacity ?? 1);
    }
    this.hovered = null;
    this.onHover?.(null);
  };

  /** 下地・色の点・検索中の余白まで含めたラベルの幅。 */
  private labelWidth(item: PlacedLabel, text: string, size: number): number {
    return this.textWidth(text, size, item.kind) + PADDING_X * 2 + (item.kind === "star" ? DOT_WIDTH : 0)
      + (item.searchRank == null ? 0 : 16);
  }

  private readonly onLabelClick = (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    if (el?.dataset?.kind === "star" && el.dataset.key) this.onClick?.(el.dataset.key);
    else if (el?.dataset?.kind === "cluster" && el.classList.contains("label-cluster-focus")) {
      this.onClusterClick?.(Number(el.dataset.cluster));
    }
  };

  private readonly onLabelDoubleClick = (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    if (el?.dataset?.kind === "star" && el.dataset.key) {
      this.onDoubleClick?.(el.dataset.key, e.ctrlKey || e.metaKey);
      e.preventDefault();
    }
  };

  /** 実際に表示しているフォント（ページの font-family）と字間で測る。 */
  private textWidth(text: string, size: number, kind: PlacedLabel["kind"]): number {
    const spacing = text.length * size * LETTER_SPACING[kind];
    if (!this.measure) return text.length * size * 0.9 + spacing;
    // 実際に表示している書体で測る（星団名＝明朝、タイトル＝ゴシック）
    this.fontFamily[kind] ??= getComputedStyle(document.documentElement).getPropertyValue(FONT_VAR[kind]).trim() ||
      getComputedStyle(this.container).fontFamily || "sans-serif";
    this.measure.font = `${size}px ${this.fontFamily[kind]}`;
    return this.measure.measureText(text).width + spacing;
  }
}
