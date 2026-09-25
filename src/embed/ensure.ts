import type { BookmarkItem } from "../bookmarks/types";
import {
  deleteEmbeddings,
  readAllEmbeddings,
  readMeta,
  writeEmbeddings,
  writeMeta,
  type StoredEmbedding,
} from "../store/db";
import type { Embedder } from "./embedder";
import { passageText, textHash } from "./text";

export type EmbedPhase =
  | { phase: "model"; percent: number; file: string }
  | { phase: "embed"; done: number; total: number }
  | { phase: "done"; total: number };

const BATCH = 16;
const META_MODEL = "embedding-model";

/**
 * 足りない分だけ埋め込みを計算する（SPEC 6 章）。
 * 計算するのは、初めて見るブックマークと、入力文が変わったブックマークだけ。
 * モデルが変わったときは全件計算し直す。
 */
export async function ensureEmbeddings(
  items: BookmarkItem[],
  embedder: Embedder,
  onProgress: (p: EmbedPhase) => void,
): Promise<Map<string, Float32Array>> {
  const stored = await readAllEmbeddings();
  const previousModel = await readMeta<string>(META_MODEL);
  const modelChanged = previousModel !== undefined && previousModel !== embedder.model;
  if (modelChanged) stored.clear();

  const texts = new Map(items.map((item) => [item.id, passageText(item)]));
  const hashes = new Map([...texts].map(([id, text]) => [id, textHash(text)]));

  const stale = items.filter((item) => stored.get(item.id)?.hash !== hashes.get(item.id));
  const result = new Map<string, Float32Array>();
  for (const item of items) {
    const row = stored.get(item.id);
    if (row && row.hash === hashes.get(item.id)) result.set(item.id, row.vec);
  }

  // 消えたブックマークの分は片づける（ブックマーク自体には触らない）
  const alive = new Set(items.map((i) => i.id));
  const orphans = [...stored.keys()].filter((id) => !alive.has(id));

  if (stale.length === 0) {
    if (orphans.length) await deleteEmbeddings(orphans);
    onProgress({ phase: "done", total: result.size });
    return result;
  }

  embedder.onDownload = (file, percent) => onProgress({ phase: "model", percent, file });
  await embedder.ready();

  let processed = 0;
  onProgress({ phase: "embed", done: 0, total: stale.length });
  for (let i = 0; i < stale.length; i += BATCH) {
    const chunk = stale.slice(i, i + BATCH);
    const vectors = await embedder.embed(chunk.map((item) => texts.get(item.id) as string));
    const rows: StoredEmbedding[] = chunk.map((item, k) => ({
      id: item.id,
      hash: hashes.get(item.id) as string,
      vec: vectors[k],
    }));
    // 途中で閉じられても、ここまでの分は残る
    await writeEmbeddings(rows);
    for (const row of rows) result.set(row.id, row.vec);
    processed += chunk.length;
    onProgress({ phase: "embed", done: processed, total: stale.length });
  }

  if (orphans.length) await deleteEmbeddings(orphans);
  await writeMeta(META_MODEL, embedder.model);
  onProgress({ phase: "done", total: result.size });
  return result;
}

/** コサイン類似度。ベクトルは正規化済みなので内積でよい。 */
export function similarity(a: Float32Array, b: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}
