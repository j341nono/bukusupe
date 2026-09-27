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

/** 星座の名前・検索語の長さの上限と、メンバーの数の上限（これを超えるものは壊れた値とみなす） */
const NAME_MAX = 200;
const QUERY_MAX = 500;
const MEMBERS_MAX = 10_000;

const isStringList = (v: unknown, max = MEMBERS_MAX): v is string[] =>
  Array.isArray(v) && v.length <= max && v.every((x) => typeof x === "string" && x.length > 0 && x.length <= 256);

/**
 * 外から来た値（IndexedDB から読んだ行、段階 5 のバックアップの読み込み）を、星座 1 つとして確かめる。合わなければ null。
 * 判定はここ 1 か所にまとめる（docs/SECURITY.md）。
 */
export function parseConstellation(value: unknown): Constellation | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const row = value as Record<string, unknown>;
  if (typeof row.id !== "string" || row.id.length === 0 || row.id.length > 256) return null;
  if (typeof row.name !== "string" || row.name.length === 0 || row.name.length > NAME_MAX) return null;
  if (row.source !== "search" && row.source !== "folder") return null;
  if (!isStringList(row.pinned) || !isStringList(row.excluded) || !isStringList(row.lastMembers)) return null;
  if (typeof row.createdAt !== "number" || !Number.isFinite(row.createdAt)) return null;
  if (row.query !== undefined && (typeof row.query !== "string" || row.query.length > QUERY_MAX)) return null;
  if (row.folderId !== undefined && typeof row.folderId !== "string") return null;
  const vector = row.queryVector;
  if (vector !== undefined && (!Array.isArray(vector) || vector.length > 4096 ||
    !vector.every((x) => typeof x === "number" && Number.isFinite(x)))) return null;
  return {
    id: row.id, name: row.name, source: row.source, pinned: row.pinned, excluded: row.excluded, lastMembers: row.lastMembers,
    createdAt: row.createdAt,
    ...(row.query !== undefined ? { query: row.query as string } : {}),
    ...(vector !== undefined ? { queryVector: vector as number[] } : {}),
    ...(row.folderId !== undefined ? { folderId: row.folderId as string } : {}),
  };
}

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
