/**
 * 任意の比較：モデルの量子化（q8＝今の設定の int8、fp16、fp32）。
 * - モデルの容量（取得したバイト数）、1000 件の全件の埋め込みの時間（(b) の状態で捨てる 1 回＋5 回）、
 *   検索語 1 つの時間、メモリ、サンプル 156 件での既存の 9 語の正解数（上位 5 件のうち期待する分野の件数）。
 * - fp16 が WebAssembly で動かない・速くならない場合は、無理に動かさず、その事実（エラーや時間）を記録する。
 */
import { PROFILE, REPEATS, SEARCH_CASES, captureEnvironment, deleteBenchDb, downloads, guardLoad, launch, memorySnapshot, openApp,
  saveResult, startupMetrics, watchLoad, writeDataset } from "./lib.mjs";
import { SAMPLE, dataset } from "./generate.mjs";

const N = Number(process.env.BENCH_QUANT_N ?? 1000);
const SHORT = "宇宙";
const LONG = "週末に家族で行ける、景色のきれいな温泉地と、そこで食べられるおいしい料理を知りたい";

export async function quant({ allowLoad = false, dtypes = (process.env.BENCH_QUANT_DTYPES ?? "q8,fp16,fp32").split(",") }) {
  const env = captureEnvironment({ headless: true, profile: "使い回し" });
  const load = watchLoad();
  const results = [];
  const app = await launch({ profileDir: PROFILE, startPath: "manifest.json" });
  try {
    for (const dtype of dtypes) {
      await guardLoad(`量子化 ${dtype}`, { allowLoad });
      const bench = `${N}@${dtype}`;
      const row = { dtype, runs: [], queries: [], memory: [], quality: null, error: null, files: [] };
      try {
        await writeDataset(app, bench, dataset(N));
        for (let run = 0; run <= REPEATS; run++) {
          await deleteBenchDb(app, bench);
          const since = app.events.length;
          const { marks } = await openApp(app, { bench, dtype, timeoutMs: 3_600_000 });
          const metrics = startupMetrics(marks);
          const files = downloads(app, since).filter((f) => f.file.endsWith(".onnx"));
          if (files.length) row.files.push(...files);
          console.log(`  ${dtype} ${run === 0 ? "捨てる" : run}：埋め込み ${(metrics.embedAll / 1000).toFixed(1)} 秒・モデル ${(metrics.modelInit / 1000).toFixed(1)} 秒`);
          if (run === 0) continue;
          row.runs.push({ run, ...metrics });
          row.memory.push({ run, ...(await memorySnapshot(app)) });
        }
        for (const [kind, text] of [["short", SHORT], ["long", LONG]]) {
          for (let run = 0; run <= REPEATS; run++) {
            const ms = await app.json(`globalThis.__bukusupe.embedTimed(${JSON.stringify(text)})`);
            if (run > 0) row.queries.push({ kind, run, ms });
          }
        }
        // 検索の正解数：サンプル 156 件（この量子化で埋め込み直す）での既存の 9 語
        const sampleBench = `sample@${dtype}`;
        await writeDataset(app, sampleBench, SAMPLE);
        await openApp(app, { bench: sampleBench, dtype, timeoutMs: 3_600_000 });
        const perQuery = [];
        for (const [query, expected] of SEARCH_CASES) {
          const top5 = await app.json(`globalThis.__bukusupe.search(${JSON.stringify(query)}, 5)`);
          perQuery.push({ query, hits: top5.filter(expected).length, top5: top5.map((r) => r.title) });
        }
        row.quality = { total: perQuery.reduce((s, q) => s + q.hits, 0), max: SEARCH_CASES.length * 5, perQuery };
        console.log(`  ${dtype}：正解 ${row.quality.total} / ${row.quality.max}`);
      } catch (err) {
        row.error = String(err?.message ?? err);
        const logs = app.events.filter((e) => e.method === "Runtime.exceptionThrown" || (e.method === "Runtime.consoleAPICalled" && e.params.type === "error"))
          .slice(-3).map((e) => e.params?.exceptionDetails?.exception?.description ?? e.params?.args?.[0]?.value ?? "");
        row.errorLogs = logs;
        console.warn(`  ${dtype} は測れなかった：${row.error}`);
      }
      results.push(row);
    }
  } finally {
    await app.close();
  }
  saveResult("quant", { env, loadSamples: load.stop(), n: N, results }, results.flatMap((r) => [
    ...r.runs.flatMap((x) => ["embedAll", "modelInit"].map((m) => ({ metric: m, condition: r.dtype, n: N, run: x.run, value: x[m], unit: "ms" }))),
    ...r.queries.map((q) => ({ metric: `query-${q.kind}`, condition: r.dtype, n: N, run: q.run, value: q.ms, unit: "ms" })),
    ...r.memory.flatMap((x) => ["wasm", "workerHeap", "renderer"].map((m) => ({ metric: m, condition: r.dtype, n: N, run: x.run, value: x[m], unit: "bytes" }))),
    ...r.files.map((f) => ({ metric: "model-bytes", condition: r.dtype, n: N, value: f.bytes, unit: "bytes" })),
    ...(r.quality ? [{ metric: "quality", condition: r.dtype, n: 156, value: r.quality.total, unit: `/${r.quality.max}` }] : []),
    ...(r.error ? [{ metric: "error", condition: r.dtype, value: r.error }] : []),
  ]));
}
