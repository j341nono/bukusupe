/**
 * メモリ（件数ごと）：起動直後（(c)）・全件の埋め込みの後（(b)）・検索中・飛行中。three.js の描画の資源も控える。
 *
 * 測るたびにブラウザを起動し直し、アプリを 1 回だけ開いた状態で測る。
 * （はじめは core.mjs の中で、同じブラウザでページを行き来しながら測っていたが、前に開いたアプリのページが
 *  「戻る」のためのキャッシュ（bfcache）などで同じプロセスに残り、プロセス全体のメモリが積み上がって見えた。
 *  100 件で 5.7 GB、5000 件で 1.2 GB のように件数と逆の傾きになり、使えなかった。docs/BENCHMARK.md「測定の方法」）
 */
import { COUNTS, PROFILE, REPEATS, captureEnvironment, clearSearch, deleteBenchDb, guardLoad, launch, memorySnapshot, openApp,
  saveResult, sleep, watchLoad, writeDataset } from "./lib.mjs";
import { dataset } from "./generate.mjs";

export async function memory({ counts = COUNTS, allowLoad = false }) {
  const env = captureEnvironment({ headless: true, profile: "使い回し（モデルと埋め込みは保存済み）", method: "測るたびにブラウザを起動し直す" });
  const load = watchLoad();
  const runs = [];
  const renderInfo = [];
  const warnings = [];
  for (const n of counts) {
    const guard = await guardLoad(`メモリ ${n} 件`, { allowLoad });
    if (guard.warning) warnings.push(`${n} 件: ${guard.warning}`);
    const bench = String(n);
    console.log(`\n=== メモリ ${n} 件 ===`);
    for (let run = 0; run <= REPEATS; run++) {
      // (b) 全件の埋め込みの後：DB を消してから開き、埋め込みが終わったところで測る
      let app = await launch({ profileDir: PROFILE, startPath: "manifest.json" });
      try {
        await writeDataset(app, bench, dataset(n));
        await deleteBenchDb(app, bench);
        await openApp(app, { bench });
        await sleep(1500);
        const afterEmbed = await memorySnapshot(app);
        if (run > 0) runs.push({ n, point: "afterEmbed", run, ...afterEmbed });
      } finally {
        await app.close();
      }
      // (c) 起動直後・検索中・飛行中：起動し直して、保存済みの状態で開く
      app = await launch({ profileDir: PROFILE, startPath: "manifest.json" });
      try {
        await openApp(app, { bench });
        await sleep(1500);
        const afterStartup = await memorySnapshot(app);
        if (run === REPEATS) renderInfo.push({ n, scene: "map", ...(await app.json("globalThis.__bukusupe.renderInfo()")) });
        await app.json("globalThis.__bukusupe.searchNow('宇宙を感じたい').then(() => true)");
        await sleep(1500);
        const searching = await memorySnapshot(app);
        if (run === REPEATS) renderInfo.push({ n, scene: "search", ...(await app.json("globalThis.__bukusupe.renderInfo()")) });
        await clearSearch(app);
        await sleep(800);
        await app.evalIn("globalThis.__bukusupe.enterFlight()");
        await app.waitUntil("globalThis.__bukusupe.flightState().phase === 'flying'", 10_000, 100);
        const star = await app.evalIn("globalThis.__bukusupe.layout().stars[0].id");
        await app.evalIn(`globalThis.__bukusupe.flightTeleport(${JSON.stringify(star)}, 16)`);
        await sleep(1500);
        const flying = await memorySnapshot(app);
        if (run === REPEATS) renderInfo.push({ n, scene: "flight", ...(await app.json("globalThis.__bukusupe.renderInfo()")) });
        if (run > 0) runs.push({ n, point: "afterStartup", run, ...afterStartup }, { n, point: "searching", run, ...searching }, { n, point: "flying", run, ...flying });
        console.log(`  ${run === 0 ? "捨てる" : run}：ページのプロセス 起動直後 ${(afterStartup.renderer / 1e6).toFixed(0)} MB・飛行中 ${(flying.renderer / 1e6).toFixed(0)} MB`);
      } finally {
        await app.close();
      }
    }
  }
  saveResult("memory", { env, loadSamples: load.stop(), warnings, method: "isolated", repeats: REPEATS, discardFirst: true, runs, renderInfo },
    runs.flatMap((r) => ["pageHeap", "workerHeap", "wasm", "renderer", "gpu", "total"].map((m) => ({ metric: m, condition: r.point, n: r.n, run: r.run, value: r[m], unit: "bytes" }))));
}
