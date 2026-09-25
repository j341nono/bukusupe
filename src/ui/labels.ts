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
};

export type Box = { l: number; t: number; r: number; b: number };

/** 同時に出すラベルの上限（SPEC 7 章）。 */
const MAX_LABELS = 60;
const FONT = { cluster: 13, star: 11 } as const;

/** 星から右へどれだけ離すか。 */
const OFFSET_X = 8;
/** 下地の左右の余白（CSS の padding と合わせる）。 */
const PADDING_X = 5;

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

/**
 * タイトルは HTML の重ね表示で描く（SPEC 7 章）。
 * 星の右横に左揃えで置き、他のラベルにも他の星にも重ならないものだけ残す。
 */
export class LabelLayer {
  private readonly pool: HTMLDivElement[] = [];
  private readonly measure = document.createElement("canvas").getContext("2d");
  private readonly fullText = new Map<string, string>();
  private hovered: string | null = null;

  constructor(private readonly container: HTMLElement) {
    container.addEventListener("mouseover", this.onOver);
    container.addEventListener("mouseout", this.onOut);
  }

  render(items: PlacedLabel[], tier: ZoomTier): number {
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

      const size = FONT[item.kind];
      const w = this.textWidth(shortened, size) + PADDING_X * 2;
      const h = size + 6;
      const t = item.sy - h / 2;

      // 星団名は遠くでは星雲の中心に重ねる
      const candidates: Box[] =
        item.kind === "cluster" && tier === "far"
          ? [{ l: item.sx - w / 2, t, r: item.sx + w / 2, b: t + h }]
          : [
              // 右横に置けなければ左横へ
              { l: item.sx + OFFSET_X, t, r: item.sx + OFFSET_X + w, b: t + h },
              { l: item.sx - OFFSET_X - w, t, r: item.sx - OFFSET_X, b: t + h },
            ];

      // 重なりを禁じるのはタイトル同士だけ。星の上に重なるのは下地で読ませる
      const box = candidates.find((c) => !labelBoxes.some((p) => overlaps(p, c)));
      if (!box) continue;

      labelBoxes.push(box);
      shown.push({ item, text: shortened, box });
    }

    this.paint(shown);
    return shown.length;
  }

  clear(): void {
    this.paint([]);
  }

  private paint(shown: { item: PlacedLabel; text: string; box: Box }[]): void {
    while (this.pool.length < shown.length) {
      const el = document.createElement("div");
      el.className = "label";
      this.container.appendChild(el);
      this.pool.push(el);
    }
    shown.forEach(({ item, text, box }, i) => {
      const el = this.pool[i];
      el.textContent = text;
      el.className = `label label-${item.kind}`;
      el.dataset.key = item.key;
      // 省略したものだけ、マウスを乗せたら全文を出す
      el.style.pointerEvents = text === this.fullText.get(item.key) ? "none" : "auto";
      el.style.transform = `translate(${box.l.toFixed(1)}px, ${box.t.toFixed(1)}px)`;
      el.style.display = "block";
    });
    for (let i = shown.length; i < this.pool.length; i++) this.pool[i].style.display = "none";
  }

  private readonly onOver = (e: Event) => {
    const key = (e.target as HTMLElement)?.dataset?.key;
    if (!key) return;
    this.hovered = key;
    (e.target as HTMLElement).textContent = this.fullText.get(key) ?? "";
  };

  private readonly onOut = () => {
    this.hovered = null;
  };

  private textWidth(text: string, size: number): number {
    if (!this.measure) return text.length * size * 0.9;
    this.measure.font = `${size}px sans-serif`;
    return this.measure.measureText(text).width;
  }
}
