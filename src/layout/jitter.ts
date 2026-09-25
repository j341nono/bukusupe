/**
 * 星ごとの小さなずれ。id から決まるので毎回同じ。
 * 螺旋の目が揃いすぎて機械的に見えるのを崩す（間隔の ±25% 程度）。
 */
export function jitterOf(id: string, spacing: number): { dx: number; dy: number } {
  let h = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  const a = (h % 3600) / 3600 * Math.PI * 2;
  const r = ((h >>> 12) % 1000) / 1000 * spacing * 0.25;
  return { dx: Math.cos(a) * r, dy: Math.sin(a) * r };
}
