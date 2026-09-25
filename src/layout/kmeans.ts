import { makeRng } from "./rng";
import { dot, normalizedMean } from "./vector";

export type KMeansResult = {
  assignments: number[];
  centroids: Float32Array[];
};

/** SPEC 7 章：k = clamp(round(sqrt(N/2)), 3, 20)。N が 12 未満なら 1 つ。 */
export function clusterCount(n: number): number {
  if (n < 12) return 1;
  return Math.min(20, Math.max(3, Math.round(Math.sqrt(n / 2))));
}

const cosineDistance = (a: Float32Array, b: Float32Array) => 1 - dot(a, b);

/**
 * コサイン距離の k-means（k-means++ で初期化、種は固定）。
 * ベクトルは正規化済みである前提（内積＝コサイン類似度）。
 */
export function kmeans(vectors: Float32Array[], k: number, seed: number, maxIter = 50): KMeansResult {
  const n = vectors.length;
  if (n === 0) return { assignments: [], centroids: [] };
  if (k <= 1 || n <= k) {
    if (k <= 1) {
      return { assignments: new Array(n).fill(0), centroids: [normalizedMean(vectors)] };
    }
    return { assignments: vectors.map((_, i) => i), centroids: vectors.map((v) => v.slice()) };
  }

  const rng = makeRng(seed);
  const centroids: Float32Array[] = [vectors[Math.min(n - 1, Math.floor(rng() * n))].slice()];

  // k-means++：既存の中心から遠い点ほど選ばれやすくする
  const best = new Float64Array(n).fill(Infinity);
  while (centroids.length < k) {
    const last = centroids[centroids.length - 1];
    let total = 0;
    for (let i = 0; i < n; i++) {
      const d = cosineDistance(vectors[i], last);
      if (d < best[i]) best[i] = d;
      total += best[i] * best[i];
    }
    let target = rng() * total;
    let picked = n - 1;
    for (let i = 0; i < n; i++) {
      target -= best[i] * best[i];
      if (target <= 0) { picked = i; break; }
    }
    centroids.push(vectors[picked].slice());
  }

  const assignments = new Array<number>(n).fill(-1);
  for (let iter = 0; iter < maxIter; iter++) {
    let moved = false;
    for (let i = 0; i < n; i++) {
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let c = 0; c < centroids.length; c++) {
        const d = cosineDistance(vectors[i], centroids[c]);
        if (d < bestDist - 1e-12) { bestDist = d; bestIdx = c; }   // 同点なら小さい番号
      }
      if (assignments[i] !== bestIdx) { assignments[i] = bestIdx; moved = true; }
    }

    // 空になった星団には、いま最も中心から遠い点を移す（順番は固定）
    for (let c = 0; c < centroids.length; c++) {
      if (assignments.includes(c)) continue;
      let worst = 0;
      let worstDist = -1;
      for (let i = 0; i < n; i++) {
        const d = cosineDistance(vectors[i], centroids[assignments[i]]);
        if (d > worstDist + 1e-12) { worstDist = d; worst = i; }
      }
      assignments[worst] = c;
      moved = true;
    }

    for (let c = 0; c < centroids.length; c++) {
      const members = vectors.filter((_, i) => assignments[i] === c);
      if (members.length > 0) centroids[c] = normalizedMean(members);
    }
    if (!moved) break;
  }

  return { assignments, centroids };
}
