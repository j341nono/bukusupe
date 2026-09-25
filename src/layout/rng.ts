/** 種を固定した擬似乱数。同じデータなら毎回まったく同じ配置になるようにする。 */
export function makeRng(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** 配置に使う種。変えると地図が別物になるので固定する。 */
export const LAYOUT_SEED = 20260926;
