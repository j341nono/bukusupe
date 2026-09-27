import type { Layout } from "../layout";

/** 保存データの形の版（SPEC 9 章）。1 は 2026-09-28 より前の形（呼び出すたびに検索し直す方式） */
export const CONSTELLATION_FORMAT = 2;

/**
 * 星座（SPEC 9 章）。メンバーは保存した時点で固定し、呼び出しで検索し直さない。
 * 検索語は、検索から作ったときの記録で、新星（後から加わった、検索語に合うブックマーク）を探すのにだけ使う。
 */
export type Constellation = {
  format: typeof CONSTELLATION_FORMAT;
  id: string;
  name: string;
  source: "search" | "selection" | "folder";
  members: string[];
  query?: string;
  queryVector?: number[];
  folderId?: string;
  /** 見送った新星。二度と新星として出さない */
  dismissed: string[];
  /** メンバーを決めて保存した時刻。新星は、これより後に加わったブックマークから探す */
  savedAt: number;
  createdAt: number;
};

/** 2026-09-28 より前の形。読み込んだときに新しい形へ移す（SPEC 9 章「旧形式からの移行」） */
export type LegacyConstellation = {
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
const isTime = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);

/** 新旧どちらの形にも共通する項目を確かめる。合わなければ null */
function parseCommon(row: Record<string, unknown>) {
  if (typeof row.id !== "string" || row.id.length === 0 || row.id.length > 256) return null;
  if (typeof row.name !== "string" || row.name.length === 0 || row.name.length > NAME_MAX) return null;
  if (!isTime(row.createdAt)) return null;
  if (row.query !== undefined && (typeof row.query !== "string" || row.query.length > QUERY_MAX)) return null;
  if (row.folderId !== undefined && typeof row.folderId !== "string") return null;
  const vector = row.queryVector;
  if (vector !== undefined && (!Array.isArray(vector) || vector.length > 4096 ||
    !vector.every((x) => typeof x === "number" && Number.isFinite(x)))) return null;
  return {
    id: row.id, name: row.name, createdAt: row.createdAt,
    ...(row.query !== undefined ? { query: row.query as string } : {}),
    ...(vector !== undefined ? { queryVector: vector as number[] } : {}),
    ...(row.folderId !== undefined ? { folderId: row.folderId as string } : {}),
  };
}

const asRecord = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;

/**
 * 外から来た値（IndexedDB から読んだ行、段階 5 のバックアップの読み込み）を、新しい形の星座 1 つとして確かめる。合わなければ null。
 * 判定はここ 1 か所にまとめる（docs/SECURITY.md）。旧形式の行は parseLegacyConstellation で読む。
 */
export function parseConstellation(value: unknown): Constellation | null {
  const row = asRecord(value);
  if (!row || row.format !== CONSTELLATION_FORMAT) return null;
  const common = parseCommon(row);
  if (!common) return null;
  if (row.source !== "search" && row.source !== "selection" && row.source !== "folder") return null;
  if (!isStringList(row.members) || !isStringList(row.dismissed) || !isTime(row.savedAt)) return null;
  return { format: CONSTELLATION_FORMAT, ...common, source: row.source, members: [...new Set(row.members)],
    dismissed: [...new Set(row.dismissed)], savedAt: row.savedAt };
}

/** 旧形式の行（format が無く、pinned / excluded / lastMembers を持つ）を確かめる。合わなければ null */
export function parseLegacyConstellation(value: unknown): LegacyConstellation | null {
  const row = asRecord(value);
  if (!row || row.format !== undefined) return null;
  const common = parseCommon(row);
  if (!common) return null;
  if (row.source !== "search" && row.source !== "folder") return null;
  if (!isStringList(row.pinned) || !isStringList(row.excluded) || !isStringList(row.lastMembers)) return null;
  return { ...common, source: row.source, pinned: row.pinned, excluded: row.excluded, lastMembers: row.lastMembers };
}

/**
 * 旧形式の行を新しい形へ移す。members は「移行の直前に呼び出したら表示されたメンバー」（呼び出す側が
 * migratedMembers で求める）。外した星（excluded）は見送った新星（dismissed）に移す。
 */
export function migrateConstellation(legacy: LegacyConstellation, members: string[], now: number): Constellation {
  return {
    format: CONSTELLATION_FORMAT, id: legacy.id, name: legacy.name, source: legacy.source,
    members: [...new Set(members)], dismissed: [...new Set(legacy.excluded)], savedAt: now, createdAt: legacy.createdAt,
    ...(legacy.query !== undefined ? { query: legacy.query } : {}),
    ...(legacy.queryVector !== undefined ? { queryVector: legacy.queryVector } : {}),
    ...(legacy.folderId !== undefined ? { folderId: legacy.folderId } : {}),
  };
}

/**
 * 旧形式の呼び出しが表示したメンバー：pinned ∪（検索の上位 12 − excluded）から、今あるブックマークだけ。
 * automatic は、保存した検索語で今検索して引き寄せた星の id（順位順）。検索語が無ければ空。
 */
export function migratedMembers(legacy: LegacyConstellation, automatic: string[], alive: Set<string>): string[] {
  return membersFor(automatic, legacy.pinned, legacy.excluded).filter((id) => alive.has(id));
}

/**
 * 新星：検索語で今検索して引き寄せた上位（automatic、最大 12）のうち、保存した後に加わり、メンバーでも見送ったものでもない星。
 * addedAt が分からない星（追加日時の無いブックマーク）は新星にしない。
 */
export function novaeFor(row: Constellation, automatic: string[], addedAt: (id: string) => number | undefined): string[] {
  const members = new Set(row.members);
  const dismissed = new Set(row.dismissed);
  return automatic.slice(0, 12).filter((id) => {
    const added = addedAt(id);
    return added !== undefined && added > row.savedAt && !members.has(id) && !dismissed.has(id);
  });
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
