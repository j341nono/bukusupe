import type { BookmarkItem } from "../bookmarks/types";
import { jitterOf } from "./jitter";
import { clusterCount, kmeans } from "./kmeans";
import { clusterNames } from "./names";
import { refineClusters } from "./refine";
import { packCircles, } from "./pack";
import { pca2 } from "./pca";
import { LAYOUT_SEED } from "./rng";
import { spiralPoint, spiralRadius } from "./spiral";
import { centerAndNormalize, dot, generalityScores, meanVector, standardize } from "./vector";

/** 配置の形が変わったら上げる。古い保存は捨てて計算し直す。 */
export const LAYOUT_VERSION = 2;

/** 星の間隔。星団の円の大きさもこれを基準にする。 */
export const SPACING = 2.0;

/** 星団の円どうしの空き。星雲のもやが重ならない程度に広く取る。 */
export const CLUSTER_GAP = SPACING * 3.2;

/**
 * 代表の選び方の係数。
 * 「自分の星団らしさ − 2 番目の星団との近さ − 係数 × 誰とでも似ている度合い」で並べる。
 * 大きくするほど、GitHub や Google のような汎用的なブックマークが内側に来なくなる。
 * 汎用度は標準化してあるので、類似度の差（0.05〜0.2 程度）と同じ物差しで効く。
 */
export const GENERALITY_PENALTY = 0.3;

/** 代表の候補から外す条件。短すぎるタイトルと、誰とでも似すぎているもの。 */
export const LEAD_MIN_TITLE = 4;
export const LEAD_MAX_GENERALITY = 1.5;

export type StarRecord = {
  id: string;
  x: number;
  y: number;
  cluster: number;
  /** 星団の中での並び。0 が最も星団らしい星 */
  rank: number;
};

export type ClusterRecord = {
  index: number;
  name: string;
  x: number;
  y: number;
  radius: number;
  count: number;
  /** 平均ベクトル。後から増えた星をどの星団に入れるか決めるのに使う */
  centroid: Float32Array;
  /** 次に星を置く螺旋の位置 */
  nextIndex: number;
};

export type Layout = {
  version: number;
  spacing: number;
  stars: StarRecord[];
  clusters: ClusterRecord[];
};

/**
 * 星団 → 星の二段構えで配置する（SPEC 7 章）。
 * 入力の埋め込みは、全体の平均を引いて正規化し直したものを使う。
 */
export function computeLayout(
  items: BookmarkItem[],
  vectors: Map<string, Float32Array>,
  mean: Float32Array,
): Layout {
  const usable = items.filter((item) => vectors.has(item.id));
  const n = usable.length;
  if (n === 0) return { version: LAYOUT_VERSION, spacing: SPACING, stars: [], clusters: [] };

  const centered = usable.map((item) => centerAndNormalize(vectors.get(item.id) as Float32Array, mean));
  // 汎用度は中心化する前のベクトルで測り、類似度の差と同じ物差しに直す
  const generality = standardize(generalityScores(usable.map((i) => vectors.get(i.id) as Float32Array)));

  // 1. 星団に分ける
  const k = clusterCount(n);
  const { assignments, centroids } = refineClusters(centered, kmeans(centered, k, LAYOUT_SEED), LAYOUT_SEED);

  const groups: number[][] = centroids.map(() => []);
  assignments.forEach((c, i) => groups[c].push(i));

  // 2. 星団の中心を置く（PCA → 拡大 → 押し広げ）
  const radii = groups.map((g) => SPACING * Math.sqrt(g.length) * 1.1);
  const projected = pca2(centroids);
  const maxAbs = Math.max(1e-6, ...projected.map((p) => Math.hypot(p.x, p.y)));
  const spread = 1.6 * Math.sqrt(radii.reduce((s, r) => s + r * r, 0));
  const scaled = projected.map((p) => ({ x: (p.x / maxAbs) * spread, y: (p.y / maxAbs) * spread }));
  const packed = packCircles(scaled, radii, CLUSTER_GAP);

  // 3. 星団の中の星を螺旋に置く
  const stars: StarRecord[] = [];
  const clusters: ClusterRecord[] = [];
  const orderedByCluster = groups.map((memberIdx, c) => orderMembers(memberIdx, c));
  const names = clusterNames(orderedByCluster.map((g) => g.map((i) => usable[i])));

  function orderMembers(memberIdx: number[], c: number): number[] {
    // 代表らしい順。誰とでも似ているものは内側に来ないようにする
    const score = (i: number) => {
      const own = dot(centered[i], centroids[c]);
      let second = -Infinity;
      for (let o = 0; o < centroids.length; o++) {
        if (o === c) continue;
        second = Math.max(second, dot(centered[i], centroids[o]));
      }
      if (second === -Infinity) second = 0;
      // 「X」のような短いタイトルや、誰とでも似ているものは代表にしない
      const excluded =
        usable[i].title.trim().length < LEAD_MIN_TITLE || generality[i] > LEAD_MAX_GENERALITY;
      return own - second - GENERALITY_PENALTY * generality[i] - (excluded ? 1000 : 0);
    };
    const scores = new Map(memberIdx.map((i) => [i, score(i)]));
    return [...memberIdx].sort((a, b) => {
      const d = (scores.get(b) as number) - (scores.get(a) as number);
      if (Math.abs(d) > 1e-9) return d;
      return usable[a].id < usable[b].id ? -1 : 1;   // 同点は id で決める
    });
  }

  orderedByCluster.forEach((ordered, c) => {
    ordered.forEach((idx, rank) => {
      const p = spiralPoint(rank, SPACING);
      const j = jitterOf(usable[idx].id, SPACING);
      stars.push({
        id: usable[idx].id,
        x: packed[c].x + p.x + j.dx,
        y: packed[c].y + p.y + j.dy,
        cluster: c,
        rank,
      });
    });

    clusters.push({
      index: c,
      name: names[c],
      x: packed[c].x,
      y: packed[c].y,
      radius: Math.max(radii[c], spiralRadius(ordered.length, SPACING) + SPACING * 0.5),
      count: ordered.length,
      centroid: centroids[c],
      nextIndex: ordered.length,
    });
  });

  stars.sort((a, b) => a.cluster - b.cluster || a.rank - b.rank);
  return { version: LAYOUT_VERSION, spacing: SPACING, stars, clusters };
}

/**
 * 後から増えたブックマークを足す（SPEC 7 章）。
 * 平均ベクトルが最も近い星団の、螺旋の次の位置（一番外側）に置く。**他の星は動かさない。**
 */
export function addStar(layout: Layout, id: string, vector: Float32Array, mean: Float32Array): Layout {
  if (layout.clusters.length === 0) return layout;
  const v = centerAndNormalize(vector, mean);

  let best = 0;
  let bestScore = -Infinity;
  for (const cluster of layout.clusters) {
    const score = dot(v, cluster.centroid);
    if (score > bestScore + 1e-12) { bestScore = score; best = cluster.index; }
  }

  const cluster = layout.clusters[best];
  const rank = cluster.nextIndex;
  const p = spiralPoint(rank, layout.spacing);
  const j = jitterOf(id, layout.spacing);
  const star: StarRecord = { id, x: cluster.x + p.x + j.dx, y: cluster.y + p.y + j.dy, cluster: best, rank };

  return {
    ...layout,
    stars: [...layout.stars, star],
    clusters: layout.clusters.map((c) =>
      c.index === best
        ? {
            ...c,
            nextIndex: rank + 1,
            count: c.count + 1,
            radius: Math.max(c.radius, Math.hypot(p.x, p.y) + layout.spacing * 0.5),
          }
        : c,
    ),
  };
}

/** 消えたブックマークの星を落とす。位置は空けたままでよい（SPEC 7 章）。 */
export function dropMissing(layout: Layout, aliveIds: Set<string>): Layout {
  const stars = layout.stars.filter((s) => aliveIds.has(s.id));
  if (stars.length === layout.stars.length) return layout;
  const counts = new Map<number, number>();
  for (const s of stars) counts.set(s.cluster, (counts.get(s.cluster) ?? 0) + 1);
  return {
    ...layout,
    stars,
    clusters: layout.clusters.map((c) => ({ ...c, count: counts.get(c.index) ?? 0 })),
  };
}

/** 地図の広がり（中心から一番遠い星までの距離）。カメラの収まりに使う。 */
export function layoutExtent(layout: Layout): number {
  let max = 10;
  for (const s of layout.stars) max = Math.max(max, Math.hypot(s.x, s.y));
  return max;
}

export { meanVector };
