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
};

export type Box = { l: number; t: number; r: number; b: number };
export type ScreenCircle = { cluster: number; sx: number; sy: number; rx: number; ry: number };

/** 同時に出すラベルの上限（SPEC 7 章）。 */
const MAX_LABELS = 60;
const FONT = { cluster: 13, star: 11 } as const;

/** 星から右へどれだけ離すか。 */
const OFFSET_X = 8;
/** 下地の左右の余白（CSS の padding と合わせる）。 */
const PADDING_X = 5;
const DOT_WIDTH = 10;

/** 中距離で省略する長さ（全角を 1、半角を 0.5 として数える）。 */
const MID_WIDTH = 18;

const isWide = (ch: string) => !/[ -߿｡-ﾟ]/.test(ch);

export function truncate(text: string, limit: number): string {
  let width = 0;
  for (let i = 0; i < text.length; i++) {
    width += isWide(text[i]) ? 1 : 0.5;
    if (width > limit) return text.slice(0, Math.max(1, i)) + "…";
  }
  return text;
}

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
  private active: { item: PlacedLabel; width: number; height: number }[] = [];
  private readonly measure = document.createElement("canvas").getContext("2d");
  private readonly fullText = new Map<string, string>();
  private hovered: string | null = null;
  onHover: ((key: string | null) => void) | null = null;
  onClick: ((key: string) => void) | null = null;

  constructor(private readonly container: HTMLElement) {
    container.addEventListener("mouseover", this.onOver);
    container.addEventListener("mouseout", this.onOut);
    container.addEventListener("click", this.onLabelClick);
  }

  render(items: PlacedLabel[], tier: ZoomTier, circles: ScreenCircle[] = []): number {
    const labelBoxes: Box[] = [];
    const shown: { item: PlacedLabel; text: string; box: Box }[] = [];

    for (const item of [...items].sort((a, b) => a.priority - b.priority)) {
      if (shown.length >= MAX_LABELS) break;
      const full = item.text;
      this.fullText.set(item.key, full);
      const shortened =
        item.kind === "star" && tier === "mid" && this.hovered !== item.key
          ? truncate(full, MID_WIDTH)
          : full;

      const size = item.searchRank == null ? FONT[item.kind]
        : item.searchRank < 3 ? 14 : item.searchRank < 9 ? 12 : 10;
      const w = this.textWidth(shortened, size) + PADDING_X * 2 + (item.kind === "star" ? DOT_WIDTH : 0)
        + (item.searchRank == null ? 0 : 16);
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
      if (item.kind === "star" && circles.some((c) => c.cluster !== item.cluster && entersCircle(box, c))) continue;

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
    this.active = shown.map(({ item, box }) => ({ item, width: box.r - box.l, height: box.b - box.t }));
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
      const orbit = item.searchRank == null ? "" : item.searchRank < 3 ? " label-orbit-inner"
        : item.searchRank < 9 ? " label-orbit-middle" : " label-orbit-outer";
      el.className = `label label-${item.kind}${orbit}`;
      el.dataset.key = item.key;
      el.dataset.searchRank = item.searchRank == null ? "" : String(item.searchRank);
      el.dataset.cluster = item.cluster == null ? "" : String(item.cluster);
      el.dataset.side = item.side ?? "";
      el.dataset.kind = item.kind;
      el.style.textAlign = item.side === "left" ? "right" : "left";
      el.style.width = item.searchRank == null ? "" : `${(box.r - box.l).toFixed(1)}px`;
      el.style.boxSizing = item.searchRank == null ? "" : "border-box";
      el.style.setProperty("--cluster-color", item.color ?? "transparent");
      // 省略したものだけ、マウスを乗せたら全文を出す
      el.style.pointerEvents = item.kind === "star" ? "auto" : "none";
      el.style.transform = `translate3d(${box.l.toFixed(1)}px, ${box.t.toFixed(1)}px, 0)`;
      if (fresh) requestAnimationFrame(() => { if (this.active.some(({ item: active }) => active.key === item.key)) el.style.opacity = "1"; });
      else el.style.opacity = "1";
    });
  }

  private readonly onOver = (e: Event) => {
    const el = e.target as HTMLElement;
    const key = el?.dataset?.key;
    if (!key) return;
    this.hovered = key;
    this.onHover?.(key);
    el.classList.add("is-hovered");
    el.textContent = this.fullText.get(key) ?? "";
  };

  private readonly onOut = (e: Event) => {
    (e.target as HTMLElement).classList.remove("is-hovered");
    this.hovered = null;
    this.onHover?.(null);
  };

  private readonly onLabelClick = (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    if (el?.dataset?.kind !== "star" || !el.dataset.key) return;
    this.onClick?.(el.dataset.key);
  };

  private textWidth(text: string, size: number): number {
    if (!this.measure) return text.length * size * 0.9;
    this.measure.font = `${size}px sans-serif`;
    return this.measure.measureText(text).width;
  }
}
