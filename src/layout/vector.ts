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
