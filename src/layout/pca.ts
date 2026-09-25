import { meanVector } from "./vector";

export type Point2 = { x: number; y: number };

/**
 * 主成分分析で 2 次元に落とす。星団の中心（十数本のベクトル）にだけ使うので、
 * べき乗法で十分。初期値も符号の決め方も固定し、毎回同じ結果になるようにする。
 */
export function pca2(vectors: Float32Array[]): Point2[] {
  const n = vectors.length;
  if (n === 0) return [];
  if (n === 1) return [{ x: 0, y: 0 }];

  const dim = vectors[0].length;
  const mean = meanVector(vectors);
  const centered = vectors.map((v) => {
    const out = new Float64Array(dim);
    for (let i = 0; i < dim; i++) out[i] = v[i] - mean[i];
    return out;
  });

  const first = principal(centered, dim, null);
  const second = principal(centered, dim, first);

  return centered.map((row) => ({ x: project(row, first), y: project(row, second) }));
}

const project = (row: Float64Array, axis: Float64Array) => {
  let sum = 0;
  for (let i = 0; i < row.length; i++) sum += row[i] * axis[i];
  return sum;
};

/** べき乗法で主成分を 1 本求める。deflate があれば、その向きの成分を毎回取り除く。 */
function principal(rows: Float64Array[], dim: number, deflate: Float64Array | null): Float64Array {
  let v = new Float64Array(dim);
  // 初期値は固定（乱数を使わない）
  for (let i = 0; i < dim; i++) v[i] = Math.sin(i + 1);
  normalize(v);

  for (let iter = 0; iter < 80; iter++) {
    const next = new Float64Array(dim);
    for (const row of rows) {
      const s = project(row, v);
      for (let i = 0; i < dim; i++) next[i] += s * row[i];
    }
    if (deflate) {
      const s = project(next, deflate);
      for (let i = 0; i < dim; i++) next[i] -= s * deflate[i];
    }
    if (!normalize(next)) break;
    v = next;
  }

  // 符号の曖昧さを固定する：絶対値が最大の成分を正にする
  let maxIdx = 0;
  for (let i = 1; i < dim; i++) if (Math.abs(v[i]) > Math.abs(v[maxIdx])) maxIdx = i;
  if (v[maxIdx] < 0) for (let i = 0; i < dim; i++) v[i] = -v[i];
  return v;
}

function normalize(v: Float64Array): boolean {
  let sum = 0;
  for (const x of v) sum += x * x;
  const norm = Math.sqrt(sum);
  if (norm < 1e-12) return false;
  for (let i = 0; i < v.length; i++) v[i] /= norm;
  return true;
}
