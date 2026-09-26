import type { BookmarkItem } from "../bookmarks/types";
import { passageText, textHash } from "../embed/text";
import { LAYOUT_VERSION, type Layout } from "../layout";

/**
 * Web のデモ用：サンプルの埋め込み・平均ベクトル・汎用度・配置を前もって計算して同梱したもの（M6）。
 * 開いた瞬間に星空を出し、モデルは裏で読み込む。作り直しは `npm run sample:precompute`
 * （拡張機能のビルドを Chrome で開いて、本物と同じ経路で計算した結果を書き出す）。
 *
 * 入力文の要約（textHash）・配置の版・モデルが今のものと一致しなければ使わない（通常の計算に戻る）。
 */
export type SampleCacheFile = {
  model: string;
  layoutVersion: number;
  /** サンプルの並び順の id と、入力文の要約 */
  ids: string[];
  hashes: string[];
  /** 384 次元 × 件数の Float32 を base64 にしたもの（ids の順） */
  vectors: string;
  mean: string;
  generality: number[];
  layout: Omit<Layout, "clusters"> & { clusters: (Omit<Layout["clusters"][number], "centroid"> & { centroid: string })[] };
};

export type SampleCache = {
  vectors: Map<string, Float32Array>;
  mean: Float32Array;
  generality: Map<string, number>;
  layout: Layout;
};

const toBase64 = (array: Float32Array): string => {
  const bytes = new Uint8Array(array.buffer, array.byteOffset, array.byteLength);
  let text = "";
  for (let i = 0; i < bytes.length; i += 0x8000) text += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(text);
};

const fromBase64 = (text: string): Float32Array => {
  const bytes = Uint8Array.from(atob(text), (c) => c.charCodeAt(0));
  return new Float32Array(bytes.buffer);
};

/** 計算済みの状態を書き出す形にする（`__bukusupe.exportSampleCache()` から使う）。 */
export function encodeSampleCache(items: BookmarkItem[], model: string, cache: SampleCache): SampleCacheFile {
  const ids = items.map((item) => item.id).filter((id) => cache.vectors.has(id));
  const byId = new Map(items.map((item) => [item.id, item]));
  const dim = cache.mean.length;
  const all = new Float32Array(ids.length * dim);
  ids.forEach((id, i) => all.set(cache.vectors.get(id) as Float32Array, i * dim));
  return {
    model,
    layoutVersion: cache.layout.version,
    ids,
    hashes: ids.map((id) => textHash(passageText(byId.get(id) as BookmarkItem))),
    vectors: toBase64(all),
    mean: toBase64(cache.mean),
    generality: ids.map((id) => cache.generality.get(id) ?? 0),
    layout: { ...cache.layout, clusters: cache.layout.clusters.map((c) => ({ ...c, centroid: toBase64(c.centroid) })) },
  };
}

/** 同梱したものを読み、今のサンプル・配置の版・モデルと合えば返す。合わなければ null。 */
export function decodeSampleCache(file: SampleCacheFile, items: BookmarkItem[], model: string): SampleCache | null {
  if (file.model !== model || file.layoutVersion !== LAYOUT_VERSION || file.layout.version !== LAYOUT_VERSION) return null;
  const current = new Map(items.map((item) => [item.id, textHash(passageText(item))]));
  if (current.size !== file.ids.length || file.ids.some((id, i) => current.get(id) !== file.hashes[i])) return null;
  const all = fromBase64(file.vectors);
  const mean = fromBase64(file.mean);
  const dim = mean.length;
  return {
    vectors: new Map(file.ids.map((id, i) => [id, all.slice(i * dim, (i + 1) * dim)])),
    mean,
    generality: new Map(file.ids.map((id, i) => [id, file.generality[i]])),
    layout: { ...file.layout, clusters: file.layout.clusters.map((c) => ({ ...c, centroid: fromBase64(c.centroid) })) },
  };
}
