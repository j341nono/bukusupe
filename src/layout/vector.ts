/**
 * multilingual-e5 は無関係な文どうしでも 0.78 前後の類似度を返す。
 * 全体の平均ベクトルを引いてから正規化し直すと、その下駄が外れて
 * 「どの方向に寄っているか」の差だけが残る。k-means と PCA にはこれを使う。
 */
export function meanVector(vectors: Float32Array[]): Float32Array {
  const dim = vectors[0]?.length ?? 0;
  const mean = new Float32Array(dim);
  if (vectors.length === 0) return mean;
  for (const v of vectors) {
    for (let i = 0; i < dim; i++) mean[i] += v[i];
  }
  for (let i = 0; i < dim; i++) mean[i] /= vectors.length;
  return mean;
}

/** 平均を引いて長さ 1 に直す。長さが 0 に潰れたときは元のベクトルを返す。 */
export function centerAndNormalize(v: Float32Array, mean: Float32Array): Float32Array {
  const out = new Float32Array(v.length);
  let sum = 0;
  for (let i = 0; i < v.length; i++) {
    const d = v[i] - mean[i];
    out[i] = d;
    sum += d * d;
  }
  const norm = Math.sqrt(sum);
  if (norm < 1e-8) return v.slice();
  for (let i = 0; i < out.length; i++) out[i] /= norm;
  return out;
}

export function dot(a: Float32Array, b: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

/** 平均ベクトル（正規化済み）。空の星団のときは 0 のまま返す。 */
export function normalizedMean(vectors: Float32Array[]): Float32Array {
  const mean = meanVector(vectors);
  let sum = 0;
  for (const v of mean) sum += v * v;
  const norm = Math.sqrt(sum);
  if (norm > 1e-8) for (let i = 0; i < mean.length; i++) mean[i] /= norm;
  return mean;
}

/**
 * 「誰とでも似ている度合い」。他の全ブックマークとの類似度の平均。
 *
 * Σ_j dot(v_i, v_j) / N = dot(v_i, (Σ_j v_j)/N) と書けるので、
 * 全部の組を回さずに済む（2000 件でも一瞬）。
 *
 * **中心化する前**のベクトルで測る。平均を引いて正規化し直したベクトルは、
 * 定義上その平均がほぼ 0 になるため、この指標がほとんど 0 に潰れて使い物にならない
 * （係数を変えても並びが 1 件も動かないことを実測して確かめた）。
 */
export function generalityScores(vectors: Float32Array[]): number[] {
  if (vectors.length === 0) return [];
  const avg = meanVector(vectors);
  return vectors.map((v) => dot(v, avg));
}

/** 平均 0・分散 1 に直す。類似度の差と同じ物差しで足し引きするため。 */
export function standardize(values: number[]): number[] {
  if (values.length === 0) return [];
  const mean = values.reduce((s, v) => s + v, 0) / values.length;
  const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length;
  const sd = Math.sqrt(variance);
  if (sd < 1e-9) return values.map(() => 0);
  return values.map((v) => (v - mean) / sd);
}
