/**
 * (a) 完全な初回の起動（毎回まっさらなプロファイル。モデルの取得から）。
 * サンプルの 156 件で 3 回（最初の 1 回も捨てない：初めて開いた体験そのもの）と、足し算の妥当性を確かめるため 2000 件で 1 回。
 * 取得したファイルごとのバイト数・時間・実効の通信速度も控える。
 */
import { captureEnvironment, downloads, guardLoad, launch, memorySnapshot, openApp, saveResult, startupMetrics, watchLoad,
  writeDataset } from "./lib.mjs";
import { dataset } from "./generate.mjs";

export async function fresh({ allowLoad = false, sampleRuns = Number(process.env.BENCH_FRESH_RUNS ?? 3), checkCount = Number(process.env.BENCH_FRESH_CHECK ?? 2000) }) {
  const env = captureEnvironment({ headless: true, profile: "毎回まっさら" });
  const load = watchLoad();
  const runs = [];
  const warnings = [];
  const plan = [...Array.from({ length: sampleRuns }, (_, i) => ({ n: 156, run: i + 1 })), ...(checkCount > 0 ? [{ n: checkCount, run: 1 }] : [])];
  for (const { n, run } of plan) {
    const guard = await guardLoad(`完全な初回 ${n} 件 ${run} 回目`, { allowLoad });
    if (guard.warning) warnings.push(guard.warning);
    const app = await launch({ startPath: "manifest.json" });
    try {
      const bench = n === 156 ? null : String(n);
      if (bench) await writeDataset(app, bench, dataset(n));
      const since = app.events.length;
      const { marks, wallMs } = await openApp(app, { bench });
      const metrics = startupMetrics(marks);
      const files = downloads(app, since);
      const memory = await memorySnapshot(app);
      console.log(`  (a) ${n} 件 ${run} 回目：星 ${(metrics.firstStars / 1000).toFixed(1)} 秒・準備 ${(metrics.ready / 1000).toFixed(1)} 秒・` +
        `モデル ${(metrics.modelInit / 1000).toFixed(1)} 秒・取得 ${(files.reduce((s, f) => s + f.bytes, 0) / 1e6).toFixed(1)} MB`);
      runs.push({ n, run, ...metrics, wallMs, marks, files, memory });
    } finally {
      await app.close();
    }
  }
  const rows = runs.flatMap((r) => [
    ...["firstStars", "ready", "searchReady", "semanticReady", "modelInit", "embedAll"].map((m) => ({ metric: m, condition: "a", n: r.n, run: r.run, value: r[m], unit: "ms" })),
    ...r.files.map((f) => ({ metric: "download-bytes", condition: f.file, n: r.n, run: r.run, value: f.bytes, unit: "bytes" })),
    ...r.files.map((f) => ({ metric: "download-seconds", condition: f.file, n: r.n, run: r.run, value: f.seconds, unit: "s" })),
  ]);
  saveResult("fresh", { env, loadSamples: load.stop(), warnings, runs }, rows);
}
