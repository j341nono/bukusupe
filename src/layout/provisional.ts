import type { BookmarkItem } from "../bookmarks/types";
import { domainOf } from "../bookmarks/types";
import { LAYOUT_VERSION, SPACING, type ClusterRecord, type Layout, type StarRecord } from "./index";
import { spiralPoint, spiralRadius, GOLDEN_ANGLE } from "./spiral";

/**
 * 埋め込みが揃うまでのあいだ見せる仮の配置。
 * 上位フォルダでまとめて螺旋に並べるだけ。意味での配置ができたら置き換わる。
 */
export function provisionalLayout(items: BookmarkItem[]): Layout {
  const buckets = new Map<string, BookmarkItem[]>();
  for (const item of items) {
    const key = item.folderPath[0] ?? domainOf(item.url) ?? "その他";
    const list = buckets.get(key);
    if (list) list.push(item);
    else buckets.set(key, [item]);
  }

  const ordered = [...buckets.entries()].sort((a, b) => b[1].length - a[1].length || (a[0] < b[0] ? -1 : 1));
  const stars: StarRecord[] = [];
  const clusters: ClusterRecord[] = [];

  ordered.forEach(([name, members], gi) => {
    const angle = gi * GOLDEN_ANGLE;
    const dist = gi === 0 ? 0 : 13 * Math.sqrt(gi) + 8;
    const cx = Math.cos(angle) * dist;
    const cy = Math.sin(angle) * dist;

    members.forEach((item, rank) => {
      const p = spiralPoint(rank, SPACING);
      stars.push({ id: item.id, x: cx + p.x, y: cy + p.y, cluster: gi, rank });
    });

    clusters.push({
      index: gi,
      name,
      x: cx,
      y: cy,
      radius: spiralRadius(members.length, SPACING) + SPACING * 0.5,
      count: members.length,
      centroid: new Float32Array(0),
      nextIndex: members.length,
    });
  });

  return { version: LAYOUT_VERSION, spacing: SPACING, stars, clusters };
}
