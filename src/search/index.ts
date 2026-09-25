import type { BookmarkItem } from "../bookmarks/types";
import { pathWords } from "../embed/text";
import { centerAndNormalize, dot } from "../layout/vector";

export const GENERALITY_PENALTY = 0.03;

export type SearchHit = { id: string; title: string; score: number; lexical: number; semantic: number };

/** 1 文字ごとに実行する文字一致（SPEC 8 章）。 */
export function lexicalScore(item: BookmarkItem, query: string): number {
  const q = query.trim().toLocaleLowerCase();
  if (!q) return 0;
  const title = item.title.toLocaleLowerCase();
  if (title === q) return 1;
  if (title.startsWith(q)) return 0.9;
  if (title.includes(q)) return 0.7;
  if (item.url.toLocaleLowerCase().includes(q) || item.folderPath.join("/").toLocaleLowerCase().includes(q)) return 0.5;
  return 0;
}

/** タイトルも URL パスもフォルダも分野語も薄い星の意味検索を弱める。 */
export function weakMetadata(item: BookmarkItem): boolean {
  return item.title.trim().length <= 3 && item.folderPath.length === 0 &&
    (!pathWords(item.url) || pathWords(item.url) === "home");
}

/** フォルダも記事へのパスもない入口ページは、分野を推測しにくい。 */
function genericLandingPage(item: BookmarkItem): boolean {
  const path = pathWords(item.url);
  return item.folderPath.length === 0 && (!path || path === "home");
}

export function semanticScores(
  queryVector: Float32Array,
  items: BookmarkItem[],
  vectors: Map<string, Float32Array>,
  mean: Float32Array,
  generality: Map<string, number>,
  coefficient = GENERALITY_PENALTY,
): Map<string, number> {
  const query = centerAndNormalize(queryVector, mean);
  const raw = items.flatMap((item) => {
    const vector = vectors.get(item.id);
    if (!vector) return [];
    const centered = centerAndNormalize(vector, mean);
    const penalty = coefficient * Math.max(0, generality.get(item.id) ?? 0);
    const weak = weakMetadata(item) ? 0.2 : 0;
    const landing = genericLandingPage(item) ? 0.16 : 0;
    return [{ id: item.id, value: dot(query, centered) - penalty - weak - landing }];
  });
  if (!raw.length) return new Map();
  const avg = raw.reduce((sum, row) => sum + row.value, 0) / raw.length;
  const sd = Math.sqrt(raw.reduce((sum, row) => sum + (row.value - avg) ** 2, 0) / raw.length) || 1;
  // z 値を順位を保ったまま 0..0.89 に収める。完全一致 1.0 は常に最上位。
  return new Map(raw.map(({ id, value }) => [id, 0.89 / (1 + Math.exp(-(value - avg) / sd))]));
}

export function rankSearch(items: BookmarkItem[], text: string, semantic = new Map<string, number>()): SearchHit[] {
  return items.map((item) => {
    const lexical = lexicalScore(item, text);
    const meaning = semantic.get(item.id) ?? 0;
    return { id: item.id, title: item.title, score: Math.max(lexical, meaning), lexical, semantic: meaning };
  }).filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score || b.lexical - a.lexical || a.id.localeCompare(b.id));
}
