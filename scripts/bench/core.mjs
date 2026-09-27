/**
 * 使い回すプロファイル（モデルは取得済み）で、件数ごとに測る：
 *  startup … (b) 埋め込みはまだ・(c) すべて保存済みの起動、全件の埋め込み、モデルの読み込みと初期化
 *  query   … 検索語 1 つの埋め込み（最初の 1 回・2 回目以降、短い語・長い文）
 *  layout  … 配置の段ごとの時間と合計、汎用度
 *  search  … 文字一致の 1 文字ごとの応答、意味のスコア計算、検索全体の応答
 *  add     … ブックマークを 1 件足したときの埋め込みと配置
 *  （メモリは memory.mjs。測るたびにブラウザを起動し直す）
 *  disk    … モデルのキャッシュと IndexedDB の容量
 */
import { COUNTS, PROFILE, REPEATS, SEARCH_CASES, captureEnvironment, clearSearch, deleteBenchDb, guardLoad, launch,
  openApp, saveResult, startupMetrics, summarize, watchLoad, writeDataset } from "./lib.mjs";
import { dataset, describe } from "./generate.mjs";

const SHORT = "宇宙";
const LONG = "週末に家族で行ける、景色のきれいな温泉地と、そこで食べられるおいしい料理を知りたい";
const TYPED = "データベース 設計";

export async function core({ parts, counts = COUNTS, allowLoad = false }) {
  const want = (part) => parts.includes(part);
  const env = captureEnvironment({ headless: true, profile: "使い回し（モデルは取得済み）" });
  const load = watchLoad();
  const out = { startup: [], query: [], layout: [], search: [], add: [], disk: [], datasets: [] };
  const warnings = [];
  const app = await launch({ profileDir: PROFILE, startPath: "manifest.json" });
  try {
    // 最初の 1 回（モデルの取得を含むことがある）は捨てる
    await writeDataset(app, "warmup", dataset(100));
    await openApp(app, { bench: "warmup" });
    for (const n of counts) {
      const guard = await guardLoad(`${n} 件`, { allowLoad });
      if (guard.warning) warnings.push(`${n} 件: ${guard.warning}`);
      console.log(`\n=== ${n} 件 ===`);
      const items = dataset(n);
      out.datasets.push({ n, ...describe(items) });
      const bench = String(n);
      await writeDataset(app, bench, items);

      // (b) モデルは取得済み・埋め込みはまだ（DB を消して開く）
      if (want("startup")) {
        for (let run = 0; run <= REPEATS; run++) {
          await deleteBenchDb(app, bench);
          const { marks, wallMs } = await openApp(app, { bench });
          const metrics = startupMetrics(marks);
          console.log(`  (b) ${run === 0 ? "捨てる" : run} 準備 ${(metrics.ready / 1000).toFixed(1)} 秒・埋め込み ${(metrics.embedAll / 1000).toFixed(1)} 秒`);
          if (run === 0) continue;
          out.startup.push({ n, state: "b", run, ...metrics, wallMs, marks });
        }
      } else {
        await openApp(app, { bench });   // 埋め込みが無ければここで計算される
      }

      // (c) すべて保存済み（再読み込み）。最初の検索語の時間もここで測る（読み込みごとに 1 回だけ「最初」がある）
      for (let run = 0; run <= REPEATS; run++) {
        const { marks, wallMs } = await openApp(app, { bench, reload: true });
        const metrics = startupMetrics(marks);
        let first = null;
        if (want("query")) {
          const text = run % 2 === 0 ? SHORT : LONG;
          first = { kind: run % 2 === 0 ? "short" : "long", ms: await app.json(`globalThis.__bukusupe.embedTimed(${JSON.stringify(text)})`) };
        }
        console.log(`  (c) ${run === 0 ? "捨てる" : run} 準備 ${(metrics.ready / 1000).toFixed(2)} 秒・モデル ${(metrics.modelInit / 1000).toFixed(2)} 秒`);
        if (run === 0) continue;
        out.startup.push({ n, state: "c", run, ...metrics, wallMs, marks });
        if (first) out.query.push({ n, run, order: "first", ...first });
      }

      if (want("query")) {
        for (const [kind, text] of [["short", SHORT], ["long", LONG]]) {
          for (let run = 0; run <= REPEATS; run++) {
            const ms = await app.json(`globalThis.__bukusupe.embedTimed(${JSON.stringify(text)})`);
            if (run > 0) out.query.push({ n, run, order: "later", kind, ms });
          }
        }
      }

      if (want("layout")) {
        for (let run = 0; run <= REPEATS; run++) {
          const timing = await app.json("globalThis.__bukusupe.layoutTimings()");
          const generality = await app.json("globalThis.__bukusupe.generalityTiming()");
          if (run > 0) out.layout.push({ n, run, total: timing.total, clusters: timing.clusters, ...timing.steps, generalityAll: generality });
        }
        console.log(`  配置 ${out.layout.filter((r) => r.n === n).map((r) => r.total.toFixed(0)).join(" / ")} ms`);
      }

      if (want("search")) {
        for (let run = 0; run <= REPEATS; run++) {
          // 文字一致：1 文字ずつ入力したときの、入力の処理（文字一致の順位づけと星の引き寄せの開始）の時間
          const keystrokes = await app.json(`(() => {
            const input = document.getElementById('search-input');
            input.focus();
            const text = ${JSON.stringify(TYPED)};
            const times = [];
            for (let i = 1; i <= text.length; i++) {
              const start = performance.now();
              input.value = text.slice(0, i);
              input.dispatchEvent(new Event('input'));
              times.push(performance.now() - start);
            }
            return times;
          })()`);
          await clearSearch(app);
          const semantic = [];
          const overall = [];
          for (const [query] of SEARCH_CASES) {
            semantic.push(await app.json(`globalThis.__bukusupe.searchTimings(${JSON.stringify(query)})`));
            overall.push(await app.json(`(async () => { const start = performance.now();
              await globalThis.__bukusupe.searchNow(${JSON.stringify(query)});
              await new Promise((r) => requestAnimationFrame(() => r()));
              return performance.now() - start; })()`));
            await clearSearch(app);
          }
          if (run === 0) continue;
          keystrokes.forEach((ms, i) => out.search.push({ n, run, kind: "keystroke", index: i + 1, ms }));
          semantic.forEach((row, i) => out.search.push({ n, run, kind: "semantic", query: SEARCH_CASES[i][0], ...row }));
          overall.forEach((ms, i) => out.search.push({ n, run, kind: "overall", query: SEARCH_CASES[i][0], ms }));
        }
        console.log(`  検索 全体 ${summarize(out.search.filter((r) => r.n === n && r.kind === "overall").map((r) => r.ms)).median?.toFixed(0)} ms（中央値）`);
      }

      if (want("add")) {
        for (let run = 0; run <= REPEATS; run++) {
          const ms = await app.json(`(async () => { const start = performance.now();
            await globalThis.__bukusupe.simulateAdd('天の川の撮影で使うレンズの選び方 ${run}', 'https://example.com/milky-way/${run}', ['写真']);
            const elapsed = performance.now() - start;
            globalThis.__bukusupe.restore();
            return elapsed; })()`);
          if (run > 0) out.add.push({ n, run, ms });
        }
      }

      if (want("disk")) {
        const estimate = await app.json("globalThis.__bukusupe.storageEstimate()");
        // この件数の DB の中身の大きさ（論理的な大きさ：ベクトルのバイト数＋文字列と JSON の長さ）。
        // estimate() の indexedDB は、同じプロファイルの全部の DB の合計で、LevelDB の余白も含む
        const idb = await app.json(`(async () => {
          const db = await new Promise((resolve, reject) => { const r = indexedDB.open(${JSON.stringify(`bukusupe-bench-${bench}`)});
            r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); });
          const all = (store) => new Promise((resolve) => { const r = db.transaction(store).objectStore(store).getAll();
            r.onsuccess = () => resolve(r.result); });
          const size = (value) => JSON.stringify(value, (k, v) => (ArrayBuffer.isView(v) ? { bytes: v.byteLength } : v)).length * 2;
          const embeddings = await all('embeddings');
          const meta = await all('meta');
          const vectorBytes = embeddings.reduce((s, row) => s + row.vec.byteLength + (row.id.length + row.hash.length) * 2, 0);
          const metaBytes = meta.reduce((s, row) => s + size(row) + Object.values(row).reduce((t, v) =>
            t + (ArrayBuffer.isView(v) ? v.byteLength : 0), 0), 0);
          db.close();
          return { embeddings: embeddings.length, vectorBytes, metaBytes };
        })()`);
        out.disk.push({ n, caches: estimate.usageDetails?.caches ?? null, indexedDBOrigin: estimate.usageDetails?.indexedDB ?? null,
          usage: estimate.usage, embeddings: idb.embeddings, dbLogical: idb.vectorBytes + idb.metaBytes,
          vectorBytes: idb.vectorBytes, metaBytes: idb.metaBytes });
      }
    }
  } finally {
    await app.close();
  }
  const loadSamples = load.stop();
  const meta = { env, loadSamples, warnings, repeats: REPEATS, discardFirst: true };
  const rows = (list, metrics, extra = () => ({})) => list.flatMap((r) => metrics.map((m) => ({ metric: m, n: r.n, run: r.run, value: r[m], ...extra(r) })));
  if (want("startup")) {
    saveResult("startup", { ...meta, runs: out.startup, datasets: out.datasets },
      rows(out.startup, ["firstStars", "ready", "searchReady", "semanticReady", "modelInit", "embedAll"], (r) => ({ condition: r.state, unit: "ms" })));
  }
  if (want("query")) saveResult("query", { ...meta, short: SHORT, long: LONG, runs: out.query },
    out.query.map((r) => ({ metric: `embed-${r.kind}-${r.order}`, n: r.n, run: r.run, value: r.ms, unit: "ms" })));
  if (want("layout")) saveResult("layout", { ...meta, runs: out.layout },
    rows(out.layout, ["total", "center", "generality", "kmeans", "refine", "pca", "pack", "order", "names", "spiral", "generalityAll"], () => ({ unit: "ms" })));
  if (want("search")) saveResult("search", { ...meta, typed: TYPED, runs: out.search },
    out.search.flatMap((r) => r.kind === "semantic"
      ? ["embedMs", "scoreMs", "rankMs", "totalMs"].map((m) => ({ metric: `semantic-${m}`, condition: r.query, n: r.n, run: r.run, value: r[m], unit: "ms" }))
      : [{ metric: r.kind, condition: r.query ?? `${r.index} 文字目`, n: r.n, run: r.run, value: r.ms, unit: "ms" }]));
  if (want("add")) saveResult("add", { ...meta, runs: out.add }, out.add.map((r) => ({ metric: "add", n: r.n, run: r.run, value: r.ms, unit: "ms" })));
  if (want("disk")) saveResult("disk", { ...meta, runs: out.disk },
    out.disk.flatMap((r) => ["caches", "dbLogical", "vectorBytes", "metaBytes", "indexedDBOrigin", "usage"].map((m) => ({ metric: m, n: r.n, value: r[m], unit: "bytes" }))));
}
