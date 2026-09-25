import type { Layout } from "../layout";

export type Constellation = {
  id: string;
  name: string;
  source: "search" | "folder";
  query?: string;
  queryVector?: number[];
  folderId?: string;
  pinned: string[];
  excluded: string[];
  lastMembers: string[];
  createdAt: number;
};

export type ConstellationPoint = { id: string; x: number; y: number };
export type ConstellationEdge = { a: string; b: string };

/** 同距離を id で割るプリム法。座標は検索中の表示位置ではなく保存済みの位置。 */
export function minimumSpanningTree(points: ConstellationPoint[]): ConstellationEdge[] {
  const sorted = [...points].sort((a, b) => a.id.localeCompare(b.id));
  if (sorted.length < 2) return [];
  const visited = new Set([sorted[0].id]);
  const edges: ConstellationEdge[] = [];
  while (visited.size < sorted.length) {
    let best: { a: string; b: string; distance: number } | null = null;
    for (const from of sorted) {
      if (!visited.has(from.id)) continue;
      for (const to of sorted) {
        if (visited.has(to.id)) continue;
        const distance = (from.x - to.x) ** 2 + (from.y - to.y) ** 2;
        if (!best || distance < best.distance ||
          (distance === best.distance && (from.id < best.a || (from.id === best.a && to.id < best.b)))) {
          best = { a: from.id, b: to.id, distance };
        }
      }
    }
    if (!best) break;
    edges.push({ a: best.a, b: best.b });
    visited.add(best.b);
  }
  return edges;
}

export function pointsFor(layout: Layout | null, ids: string[]): ConstellationPoint[] {
  const wanted = new Set(ids);
  return layout?.stars.filter((star) => wanted.has(star.id))
    .map(({ id, x, y }) => ({ id, x, y })).sort((a, b) => a.id.localeCompare(b.id)) ?? [];
}

/** 自動候補は検索上位12件。明示追加は除外より優先する。 */
export function membersFor(automatic: string[], pinned: string[], excluded: string[]): string[] {
  const blocked = new Set(excluded);
  return [...new Set([...pinned, ...automatic.slice(0, 12).filter((id) => !blocked.has(id))])];
}
