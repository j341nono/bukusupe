import type { Layout } from "./index";
import { layoutExtent } from "./index";

/**
 * 飛行モードの高さ（SPEC 13 章）。地図の x・y はそのまま、高さ z だけを足す。
 * z ＝ 星団ごとの高さ ＋ 星ごとのずらし。どちらも id と番号から決まるので、同じデータなら毎回同じ。
 *
 * 星ごとのずらしは、星団の円を球と見なしたときの、その星の位置での球の厚みの範囲に収める
 * （星団の中心に近い星ほど上下に広く、縁の星ほど平たい）。こうすると星団が立体の星の雲に見える。
 * 星の位置と星団の中心・半径だけで決まるので、星が増えても既存の星の高さは変わらない。
 */
export function flightHeights(layout: Layout): Map<string, number> {
  const span = Math.max(12, layoutExtent(layout) * 0.32);
  const clusters = new Map(layout.clusters.map((c) => [c.index, c]));
  const heights = new Map<string, number>();
  for (const star of layout.stars) {
    const cluster = clusters.get(star.cluster);
    if (!cluster) { heights.set(star.id, 0); continue; }
    const base = (hash01(`cluster:${cluster.index}`) - 0.5) * span;
    const d = Math.hypot(star.x - cluster.x, star.y - cluster.y);
    const thickness = Math.sqrt(Math.max(0, cluster.radius * cluster.radius - d * d));
    const offset = (hash01(`star:${star.id}`) * 2 - 1) * thickness * 0.9;
    heights.set(star.id, base + offset);
  }
  return heights;
}

/** 文字列から 0..1 の値を決める（FNV-1a）。 */
function hash01(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 0x01000193) >>> 0;
  return (h % 100000) / 100000;
}
