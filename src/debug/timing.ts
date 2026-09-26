/**
 * 測定用の時間の記録（`?debug=1` の測定スクリプトだけが使う。docs/BENCHMARK.md）。
 * 記録先が無いとき（通常の動作）は、渡された処理をそのまま呼ぶだけ。
 */
let sink: Record<string, number> | null = null;

/** これ以降の timed() の時間を集める。 */
export function startTiming(): Record<string, number> {
  sink = {};
  return sink;
}

export function stopTiming(): void {
  sink = null;
}

/** fn を呼び、記録中なら name ごとにかかった時間（ミリ秒）を足す。 */
export function timed<T>(name: string, fn: () => T): T {
  if (!sink) return fn();
  const start = performance.now();
  const result = fn();
  sink[name] = (sink[name] ?? 0) + performance.now() - start;
  return result;
}
