import type { Point2 } from "./pca";

/**
 * 星団を円と見なし、重ならないように押し広げる（SPEC 7 章）。
 * 単純な反発の反復。順番を固定しているので結果は毎回同じ。
 */
export function packCircles(centers: Point2[], radii: number[], gap: number, iterations = 600): Point2[] {
  const pos = centers.map((p) => ({ x: p.x, y: p.y }));
  const n = pos.length;
  if (n <= 1) return pos.map(() => ({ x: 0, y: 0 }));

  for (let iter = 0; iter < iterations; iter++) {
    let moved = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = pos[j].x - pos[i].x;
        const dy = pos[j].y - pos[i].y;
        let d = Math.hypot(dx, dy);
        const need = radii[i] + radii[j] + gap;
        if (d >= need) continue;
        // 完全に重なっているときは、番号で決まる向きへずらす（乱数を使わない）
        let ux: number, uy: number;
        if (d < 1e-6) {
          const a = ((i * 97 + j * 31) % 360) * (Math.PI / 180);
          ux = Math.cos(a);
          uy = Math.sin(a);
          d = 1e-6;
        } else {
          ux = dx / d;
          uy = dy / d;
        }
        const push = (need - d) / 2;
        pos[i].x -= ux * push;
        pos[i].y -= uy * push;
        pos[j].x += ux * push;
        pos[j].y += uy * push;
        moved += push;
      }
    }
    // ゆるく中心へ寄せて、散らばりすぎないようにする
    for (const p of pos) {
      p.x *= 0.998;
      p.y *= 0.998;
    }
    if (moved < 1e-4 && iter > 50) break;
  }

  // 重心を原点に置く
  const cx = pos.reduce((s, p) => s + p.x, 0) / n;
  const cy = pos.reduce((s, p) => s + p.y, 0) / n;
  return pos.map((p) => ({ x: p.x - cx, y: p.y - cy }));
}
