/**
 * Web のデモ：開いてから星が見えるまでと、意味検索が使えるようになるまで。
 * (a) 相当：まっさらなプロファイルで 3 回（モデルの取得から）。(c) 相当：最後のプロファイルで再読み込み（捨てる 1 回＋5 回）。
 * dist-web/ を手元のサーバーのサブパス /bukusupe/ に置いて開く（GitHub Pages と同じ形）。
 */
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { REPEATS, ROOT, captureEnvironment, downloads, guardLoad, launch, saveResult, startupMetrics, watchLoad } from "./lib.mjs";

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".wasm": "application/wasm",
  ".png": "image/png", ".json": "application/json" };

function serve(root) {
  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (!path.startsWith("/bukusupe/")) { res.writeHead(404).end(); return; }
    let file = normalize(join(root, path.slice("/bukusupe/".length)));
    if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    if (!existsSync(file)) { res.writeHead(404).end(); return; }
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" }).end(readFileSync(file));
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok(server)));
}

async function openWeb(app, url, reload) {
  const started = Date.now();
  if (reload) await app.send("Page.reload", {}, app.sessionId);
  else await app.send("Page.navigate", { url }, app.sessionId);
  await app.waitUntil("(() => { const m = globalThis.__bukusupe?.marks?.(); return m && m.modelReady !== undefined && m.searchReady !== undefined; })()", 900_000, 200);
  return { marks: await app.json("globalThis.__bukusupe.marks()"), wallMs: Date.now() - started };
}

export async function web({ allowLoad = false, freshRuns = Number(process.env.BENCH_WEB_RUNS ?? 3) }) {
  execFileSync("npm", ["run", "build:web"], { cwd: ROOT, stdio: "ignore" });
  const server = await serve(join(ROOT, "dist-web"));
  const url = `http://127.0.0.1:${server.address().port}/bukusupe/?debug=1`;
  const env = captureEnvironment({ headless: true });
  const load = watchLoad();
  const runs = [];
  try {
    for (let run = 1; run <= freshRuns; run++) {
      await guardLoad(`Web (a) ${run} 回目`, { allowLoad });
      const app = await launch({ dist: null, url: "about:blank" });
      try {
        const since = app.events.length;
        const { marks, wallMs } = await openWeb(app, url, false);
        runs.push({ state: "a", run, ...startupMetrics(marks), wallMs, marks, files: downloads(app, since) });
        console.log(`  Web (a) ${run}：星 ${marks.firstStars?.toFixed(0)} ms・意味検索 ${startupMetrics(marks).semanticReady?.toFixed(0)} ms`);
        if (run === freshRuns) {
          for (let r = 0; r <= REPEATS; r++) {
            const reloaded = await openWeb(app, url, true);
            if (r > 0) runs.push({ state: "c", run: r, ...startupMetrics(reloaded.marks), wallMs: reloaded.wallMs, marks: reloaded.marks });
          }
          console.log(`  Web (c)：星 ${runs.filter((x) => x.state === "c").map((x) => x.firstStars.toFixed(0)).join(" / ")} ms`);
        }
      } finally {
        await app.close();
      }
    }
  } finally {
    server.close();
  }
  saveResult("web", { env, loadSamples: load.stop(), runs },
    runs.flatMap((r) => ["firstStars", "ready", "semanticReady", "modelInit"].map((m) => ({ metric: m, condition: r.state, n: 156, run: r.run, value: r[m], unit: "ms" }))));
}
