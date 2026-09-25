import { kmeans } from "./kmeans";
import { dot, normalizedMean } from "./vector";

export type Grouping = { assignments: number[]; centroids: Float32Array[] };

/** 星団の最小の大きさ。これ未満は近い星団に統合する。 */
const MIN_MEMBERS = 5;

const median = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const groupsOf = (assignments: number[], k: number): number[][] => {
  const groups: number[][] = Array.from({ length: k }, () => []);
  assignments.forEach((c, i) => groups[c]?.push(i));
  return groups;
};

/** 星団の締まり具合＝メンバーと平均ベクトルの類似度の平均。 */
const tightness = (members: number[], vectors: Float32Array[], centroid: Float32Array): number =>
  members.length === 0 ? 1 : members.reduce((s, i) => s + dot(vectors[i], centroid), 0) / members.length;

/**
 * 星団の粒度をそろえる。
 * - 大きすぎて（件数が中央値の 2 倍超）かつ緩い（締まり具合が中央値未満）星団は 2 つに割る。
 * - 5 件未満の星団は、平均ベクトルが最も近い星団に統合する。
 * 順番はすべて番号順で、乱数の種も固定しているので、同じ入力なら同じ結果になる。
 */
export function refineClusters(vectors: Float32Array[], input: Grouping, seed: number): Grouping {
  let assignments = [...input.assignments];
  let centroids: Float32Array[] = input.centroids.map((c) => new Float32Array(c));

  // --- 分割 ---
  {
    const groups = groupsOf(assignments, centroids.length);
    const counts = groups.map((g) => g.length);
    const tight = groups.map((g, c) => tightness(g, vectors, centroids[c]));
    const countLimit = median(counts.filter((n) => n > 0)) * 2;
    const tightLimit = median(tight.filter((_, c) => counts[c] > 0));

    groups.forEach((members, c) => {
      if (members.length < MIN_MEMBERS * 2) return;
      if (members.length <= countLimit || tight[c] >= tightLimit) return;
      const sub = kmeans(members.map((i) => vectors[i]), 2, seed + c * 7919);
      const next = centroids.length;
      let movedCount = 0;
      members.forEach((idx, k) => {
        if (sub.assignments[k] === 1) { assignments[idx] = next; movedCount++; }
      });
      if (movedCount === 0 || movedCount === members.length) return;   // 割れなかった
      centroids.push(sub.centroids[1]);
      centroids[c] = sub.centroids[0];
    });
  }

  // --- 統合 ---
  for (let guard = 0; guard < 50; guard++) {
    const groups = groupsOf(assignments, centroids.length);
    const alive = groups.map((g, c) => ({ c, n: g.length })).filter((g) => g.n > 0);
    if (alive.length <= 1) break;
    // 小さい星団から順に（同数なら番号順）
    const small = alive.filter((g) => g.n < MIN_MEMBERS).sort((a, b) => a.n - b.n || a.c - b.c)[0];
    if (!small) break;

    let target = -1;
    let bestScore = -Infinity;
    for (const other of alive) {
      if (other.c === small.c) continue;
      const score = dot(centroids[small.c], centroids[other.c]);
      if (score > bestScore + 1e-12) { bestScore = score; target = other.c; }
    }
    if (target < 0) break;
    assignments = assignments.map((c) => (c === small.c ? target : c));
    centroids[target] = normalizedMean(groupsOf(assignments, centroids.length)[target].map((i) => vectors[i]));
  }

  // --- 空いた番号を詰めて、平均ベクトルを取り直す ---
  const used = [...new Set(assignments)].sort((a, b) => a - b);
  const remap = new Map(used.map((c, i) => [c, i]));
  assignments = assignments.map((c) => remap.get(c) as number);
  const finalGroups = groupsOf(assignments, used.length);
  centroids = finalGroups.map((g) => normalizedMean(g.map((i) => vectors[i])));

  return { assignments, centroids };
}
