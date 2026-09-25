import type { BookmarkItem } from "../bookmarks/types";
import { domainOf } from "../bookmarks/types";

export type Placed = {
  item: BookmarkItem;
  x: number;
  y: number;
  /** 0..1。今は最終利用日時から決める仮の明るさ（M5 で本実装） */
  brightness: number;
  groupIndex: number;
};

export type PlacedGroup = {
  name: string;
  index: number;
  x: number;
  y: number;
  radius: number;
  count: number;
};

export type LayoutResult = { stars: Placed[]; groups: PlacedGroup[] };

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // 137.508°
const SPACING = 2.0;

/**
 * M0 の**仮**配置。意味ベクトルがまだ無いので、上位フォルダでまとめて
 * フェルマー螺旋に並べるだけ。M2 で k-means → PCA → 押し広げ → 螺旋に差し替える。
 * 星団の中が螺旋という形だけ先に確かめておく。
 */
export function provisionalLayout(items: BookmarkItem[]): LayoutResult {
  const buckets = new Map<string, BookmarkItem[]>();
  for (const item of items) {
    const key = item.folderPath[0] ?? domainOf(item.url) ?? "その他";
    const list = buckets.get(key);
    if (list) list.push(item);
    else buckets.set(key, [item]);
  }

  // 件数の多い順に並べ、大きいものから内側の環に置く
  const ordered = [...buckets.entries()].sort((a, b) => b[1].length - a[1].length);

  const groups: PlacedGroup[] = [];
  const stars: Placed[] = [];

  // 星団どうしが触れない程度に詰める（押し広げの本実装は M2）
  const ringRadius = (i: number) => 13 * Math.sqrt(i) + 8;

  ordered.forEach(([name, members], gi) => {
    const radius = SPACING * Math.sqrt(members.length) * 1.1;
    const angle = gi * GOLDEN_ANGLE;
    const dist = gi === 0 ? 0 : ringRadius(gi);
    const cx = Math.cos(angle) * dist;
    const cy = Math.sin(angle) * dist;

    groups.push({ name, index: gi, x: cx, y: cy, radius, count: members.length });

    members.forEach((item, i) => {
      const r = SPACING * Math.sqrt(i + 0.5);
      const th = i * GOLDEN_ANGLE;
      stars.push({
        item,
        x: cx + Math.cos(th) * r,
        y: cy + Math.sin(th) * r,
        brightness: brightnessOf(item),
        groupIndex: gi,
      });
    });
  });

  return { stars, groups };
}

/** dateLastUsed が新しいほど明るい。値が無いときは中間（「未使用」と断定しない）。 */
function brightnessOf(item: BookmarkItem): number {
  if (!item.dateLastUsed) return 0.55;
  const days = (Date.now() - item.dateLastUsed) / 86400000;
  if (days <= 7) return 1;
  if (days >= 365) return 0.35;
  return 1 - 0.65 * ((Math.log(days) - Math.log(7)) / (Math.log(365) - Math.log(7)));
}
