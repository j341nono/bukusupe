/** フェルマー螺旋（ひまわりの種の配置）。SPEC 7 章。 */
export const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));   // 137.508°

export function spiralPoint(index: number, spacing: number): { x: number; y: number } {
  const r = spacing * Math.sqrt(index + 0.5);
  const th = index * GOLDEN_ANGLE;
  return { x: Math.cos(th) * r, y: Math.sin(th) * r };
}

/** 螺旋に index 個並べたときの外周の半径。星団の円の大きさに使う。 */
export function spiralRadius(count: number, spacing: number): number {
  return count <= 0 ? 0 : spacing * Math.sqrt(count - 0.5);
}
