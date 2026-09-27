/**
 * 測定（docs/BENCHMARK.md）の共通部品：統計、測定の環境の記録、負荷の見張り、結果の保存、ブラウザの操作。
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { loadavg, tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { launchExtension, sleep } from "../lib/harness.mjs";

export { sleep };
export const ROOT = resolve(new URL("../..", import.meta.url).pathname);
// 環境変数は、スクリプト自体の試運転（少ない回数・別の保存先）のためだけに使う
export const RESULTS = process.env.BENCH_RESULTS ?? join(ROOT, "docs/bench/results");
export const DIST = join(ROOT, "dist");
/** 測定用の使い回すプロファイル（モデルのキャッシュと埋め込みを残す）。リポジトリの外に置く */
export const PROFILE = process.env.BENCH_PROFILE ?? join(tmpdir(), "bukusupe-bench-profile");
export const COUNTS = [100, 500, 1000, 2000, 5000];
export const REPEATS = Number(process.env.BENCH_REPEATS ?? 5);   // 捨てる 1 回のあとに数える回数
/** 1 分平均のロードアベレージの目安（記録と報告書の ⚠ のため。測定自体の負荷も含むので、止める判断には使わない） */
export const LOAD_LIMIT = 4;
/**
 * 他のアプリの CPU 使用率（この測定のスクリプトと、それが起動した Chrome を除いた合計。1 コア＝100%）がこれを超えたら、
 * 測定を始めない。ロードアベレージは測定そのもの（埋め込みの計算など）の負荷も含んでしまうため、判断にはこちらを使う。
 */
export const OTHER_CPU_LIMIT = 150;

/** この測定のスクリプトの子孫（起動した Chrome など）を除いた、他のプロセスの CPU 使用率の合計（ps の %cpu） */
export function otherCpu() {
  const rows = execFileSync("ps", ["-Ao", "pid=,ppid=,%cpu=,comm="], { encoding: "utf8" }).split("\n")
    .map((line) => line.trim().match(/^(\d+)\s+(\d+)\s+([\d.]+)\s+(.*)$/)).filter(Boolean)
    .map(([, pid, ppid, cpu, comm]) => ({ pid: Number(pid), ppid: Number(ppid), cpu: Number(cpu), comm }));
  const mine = new Set([process.pid]);
  for (let changed = true; changed;) {
    changed = false;
    for (const row of rows) if (!mine.has(row.pid) && mine.has(row.ppid)) { mine.add(row.pid); changed = true; }
  }
  const others = rows.filter((row) => !mine.has(row.pid));
  const top = others.sort((a, b) => b.cpu - a.cpu).slice(0, 3).map((row) => `${row.comm.split("/").pop()} ${row.cpu}%`);
  return { total: others.reduce((sum, row) => sum + row.cpu, 0), top };
}

// ---------- 統計 ----------

export function quantile(values, q) {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!sorted.length) return null;
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos), hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

/** 中央値・四分位範囲（q1〜q3）・95 パーセンタイル・件数 */
export function summarize(values) {
  const finite = values.filter(Number.isFinite);
  return { n: finite.length, median: quantile(finite, 0.5), q1: quantile(finite, 0.25), q3: quantile(finite, 0.75),
    p95: quantile(finite, 0.95), min: finite.length ? Math.min(...finite) : null, max: finite.length ? Math.max(...finite) : null };
}

// ---------- 測定の環境 ----------

const run = (cmd, args) => { try { return execFileSync(cmd, args, { encoding: "utf8" }).trim(); } catch { return ""; } };

export function captureEnvironment(extra = {}) {
  const hw = run("system_profiler", ["SPHardwareDataType"]);
  const gpu = run("system_profiler", ["SPDisplaysDataType"]);
  const field = (text, name) => text.match(new RegExp(`${name}:\\s*(.+)`))?.[1]?.trim() ?? null;
  const batt = run("pmset", ["-g", "batt"]);
  const pm = run("pmset", ["-g"]);
  const chrome = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  return {
    measuredAt: new Date().toISOString(),
    machine: { model: field(hw, "Model Name"), identifier: field(hw, "Model Identifier"), chip: field(hw, "Chip"),
      cores: field(hw, "Total Number of Cores"), memory: field(hw, "Memory") },
    gpu: { model: field(gpu, "Chipset Model"), cores: gpu.match(/Type: GPU[\s\S]*?Total Number of Cores:\s*(\d+)/)?.[1] ?? null,
      metal: field(gpu, "Metal Support"), display: field(gpu, "Resolution"),
      // 表示に使っている画面（蓋を閉じて外部ディスプレイを使う場合はその画面）とリフレッシュレート
      displayName: gpu.match(/\n\s+Displays:\s*\n\s*([^\n]+):/)?.[1]?.trim() ?? null, looksLike: field(gpu, "UI Looks like"),
      clamshellClosed: /"AppleClamshellState" = Yes/.test(run("ioreg", ["-r", "-k", "AppleClamshellState", "-d", "4"])) },
    os: `${run("sw_vers", ["-productName"])} ${run("sw_vers", ["-productVersion"])} (${run("sw_vers", ["-buildVersion"])})`,
    chrome: run(chrome, ["--version"]),
    node: process.version,
    power: { source: batt.match(/drawing from '([^']+)'/)?.[1] ?? null, battery: batt.split("\n")[1]?.trim() ?? null,
      lowPowerMode: pm.match(/lowpowermode\s+(\d)/)?.[1] === "1" },
    load: loadavg().map((v) => Number(v.toFixed(2))),
    otherCpu: otherCpu(),
    ...extra,
  };
}

/** 測定の間、5 秒ごとに負荷を控える。stop() で止めて、控えた値を返す。 */
export function watchLoad() {
  const samples = [];
  const timer = setInterval(() => samples.push({ at: new Date().toISOString(), load1: loadavg()[0], otherCpu: otherCpu().total }), 5000);
  return { stop() { clearInterval(timer); return samples; } };
}

/**
 * 測定を始める前に、他のアプリの負荷を確かめる。高ければ最大 2 分待ち、それでも高ければ止める（--allow-load で続ける）。
 */
export async function guardLoad(label, { allowLoad = false } = {}) {
  for (let i = 0; i < 24; i++) {
    const other = otherCpu();
    if (other.total <= OTHER_CPU_LIMIT) return { load1: loadavg()[0], otherCpu: other.total, warning: null };
    if (i === 0) console.warn(`  ⚠ 他のアプリの負荷が高い（CPU ${other.total.toFixed(0)}% > ${OTHER_CPU_LIMIT}%：${other.top.join("、")}）。` +
      `他のアプリを閉じてください。${label} の前で最大 2 分待つ`);
    await sleep(5000);
  }
  const other = otherCpu();
  const load1 = loadavg()[0];
  const warning = `他のアプリの負荷が高いまま測定した（CPU ${other.total.toFixed(0)}%：${other.top.join("、")}。1 分平均のロードアベレージ ${load1.toFixed(2)}）`;
  if (!allowLoad) throw new Error(`${label}：${warning}。測定を止めた（--allow-load で続けられる）`);
  console.warn(`  ⚠ ${warning}`);
  return { load1, warning };
}

// ---------- 結果の保存 ----------

/** docs/bench/results/<name>.json と .csv に保存する。rows は CSV の行（suite, metric, condition, n, run, value, unit）。 */
export function saveResult(name, data, rows) {
  mkdirSync(RESULTS, { recursive: true });
  writeFileSync(join(RESULTS, `${name}.json`), JSON.stringify(data, null, 2) + "\n");
  const header = "suite,metric,condition,n,run,value,unit";
  const esc = (v) => (v == null ? "" : /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
  const lines = rows.map((r) => [name, r.metric, r.condition ?? "", r.n ?? "", r.run ?? "", r.value, r.unit ?? ""].map(esc).join(","));
  writeFileSync(join(RESULTS, `${name}.csv`), [header, ...lines].join("\n") + "\n");
  console.log(`  保存: ${join(RESULTS, name).replace(`${ROOT}/`, "")}.json / .csv（${rows.length} 行）`);
}

export function loadResult(name) {
  const path = join(RESULTS, `${name}.json`);
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : null;
}

// ---------- ブラウザ ----------

/**
 * 拡張機能を読み込んだ Chrome を起動する。profileDir を渡すと、そのプロファイルを使い回す。
 * Worker の CDP セッションを控え、JS のヒープを測れるようにする。
 */
export async function launch({ headless = true, profileDir = null, query = "debug=1", url = null, beforeOpen = null, dist = DIST,
  width = 1280, height = 800, startPath = null } = {}) {
  const app = await launchExtension(dist, { headless, profileDir, query, url, beforeOpen, width, height, startPath });
  app.workerSessions = [];
  app.onEvent((m) => {
    if (m.method === "Target.attachedToTarget" && m.params.targetInfo.type === "worker") app.workerSessions.push(m.params.sessionId);
    if (m.method === "Target.detachedFromTarget") app.workerSessions = app.workerSessions.filter((id) => id !== m.params.sessionId);
  });
  app.ext = app.extId ? `chrome-extension://${app.extId}` : null;
  app.json = async (expression) => JSON.parse((await app.evalIn(`(async () => JSON.stringify(await (async () => (${expression}))()))()`)) ?? "null");
  return app;
}

/** 拡張機能のページ（アプリを動かさない manifest.json）へ移る。chrome.storage と IndexedDB を触るため。 */
export async function gotoBlankExtensionPage(app) {
  await app.send("Page.navigate", { url: `${app.ext}/manifest.json` }, app.sessionId);
  await app.waitUntil("document.readyState === 'complete' && typeof chrome !== 'undefined' && !!chrome.storage?.local", 20_000, 100);
}

/** 生成したブックマークを chrome.storage.local の bench:<name> に書く（アプリは ?debug=1&bench=<name> で読む）。 */
export async function writeDataset(app, name, items) {
  await gotoBlankExtensionPage(app);
  await app.evalIn(`chrome.storage.local.set({ ${JSON.stringify(`bench:${name}`)}: ${JSON.stringify(items)} })`);
}

/** 測定用の DB（bukusupe-bench-<name>）を消す。埋め込みが無い状態（段階 b）から始めるため。 */
export async function deleteBenchDb(app, name) {
  await gotoBlankExtensionPage(app);
  const ok = await app.evalIn(`new Promise((resolve) => {
    const req = indexedDB.deleteDatabase(${JSON.stringify(`bukusupe-bench-${name}`)});
    req.onsuccess = () => resolve(true); req.onerror = () => resolve(false); req.onblocked = () => resolve("blocked");
  })`);
  if (ok !== true) throw new Error(`DB を消せない: ${ok}`);
}

/** アプリを開き、準備完了（配置が済み、モデルも読み込み済み）まで待つ。節目の時刻と、待った時間を返す。 */
export async function openApp(app, { bench = null, dtype = null, extra = "", timeoutMs = 1_800_000, reload = false } = {}) {
  const query = ["debug=1", bench ? `bench=${encodeURIComponent(bench)}` : "", dtype ? `dtype=${dtype}` : "", extra].filter(Boolean).join("&");
  const started = Date.now();
  if (reload) await app.send("Page.reload", { ignoreCache: false }, app.sessionId);
  else await app.send("Page.navigate", { url: `${app.ext}/index.html?${query}` }, app.sessionId);
  const ok = await app.waitUntil(`(() => { const m = globalThis.__bukusupe?.marks?.();
    return (document.body.dataset.phase === 'ready' || document.body.dataset.phase === 'error') && m && m.searchReady !== undefined && m.modelReady !== undefined; })()`,
  timeoutMs, 250);
  const phase = await app.tryEval("document.body.dataset.phase");
  if (!ok || phase !== "ready") throw new Error(`アプリが準備完了にならない（phase=${phase}）`);
  const marks = await app.json("globalThis.__bukusupe.marks()");
  // ページを開くたびに、ページを移る処理を止めておく（飛行中に星へ入っても移らない）
  await app.evalIn(`(() => { if (typeof chrome !== 'undefined' && chrome.tabs) {
    chrome.tabs.update = () => Promise.resolve({}); chrome.tabs.create = () => Promise.resolve({}); } })()`);
  return { marks, wallMs: Date.now() - started };
}

/** 節目から、起動の指標（ミリ秒）を出す。 */
export function startupMetrics(marks) {
  const m = marks ?? {};
  return {
    firstStars: m.firstStars ?? null,
    ready: m.ready ?? null,
    searchReady: m.searchReady ?? null,
    semanticReady: m.searchReady != null && m.modelReady != null ? Math.max(m.searchReady, m.modelReady) : null,
    modelInit: m.modelReady != null && m.embedderStart != null ? m.modelReady - m.embedderStart : null,
    embedAll: m["embed:done"] != null && m["embed:embed"] != null ? m["embed:done"] - m["embed:embed"] : null,
  };
}

/** Chrome のプロセスのうち、拡張機能のページのレンダラーと GPU のプロセスのメモリ（RSS、バイト）。 */
export function processMemory(app) {
  const lines = execFileSync("ps", ["-Ao", "pid=,ppid=,rss=,command="], { encoding: "utf8" }).split("\n");
  const rows = lines.map((line) => line.trim().match(/^(\d+)\s+(\d+)\s+(\d+)\s+(.*)$/)).filter(Boolean)
    .map(([, pid, ppid, rss, command]) => ({ pid: Number(pid), ppid: Number(ppid), rss: Number(rss) * 1024, command }))
    .filter((row) => row.ppid === app.pid || row.pid === app.pid);
  const renderers = rows.filter((row) => row.command.includes("--type=renderer"));
  const extension = renderers.filter((row) => row.command.includes("--extension-process"));
  const page = (extension.length ? extension : renderers).sort((a, b) => b.rss - a.rss)[0] ?? null;
  const gpu = rows.find((row) => row.command.includes("--type=gpu-process")) ?? null;
  const browser = rows.find((row) => row.pid === app.pid) ?? null;
  return { renderer: page?.rss ?? null, rendererPid: page?.pid ?? null, gpu: gpu?.rss ?? null, gpuPid: gpu?.pid ?? null,
    browser: browser?.rss ?? null, total: rows.reduce((sum, row) => sum + row.rss, 0) };
}

/** JS のヒープ（ページと Worker）、WebAssembly のメモリ、プロセス全体のメモリ（バイト）。GC の後に測る。 */
export async function memorySnapshot(app) {
  await app.send("HeapProfiler.collectGarbage", {}, app.sessionId).catch(() => {});
  const page = await app.send("Runtime.getHeapUsage", {}, app.sessionId);
  let worker = null;
  for (const id of app.workerSessions) {
    const usage = await app.send("Runtime.getHeapUsage", {}, id).catch(() => null);
    if (usage) worker = (worker ?? 0) + usage.usedSize;
  }
  const wasm = await app.json("globalThis.__bukusupe.wasmMemory()");
  return { pageHeap: page.usedSize, workerHeap: worker, wasm: wasm?.bytes ?? null, ...processMemory(app) };
}

/** Worker の通信の記録から、モデルなどの取得をファイルごとにまとめる（リダイレクトは 1 つの要求として数える）。 */
export function downloads(app, since = 0) {
  const byId = new Map();
  for (const e of app.events.slice(since)) {
    const p = e.params ?? {};
    if (e.method === "Network.requestWillBeSent") {
      const row = byId.get(p.requestId) ?? { url: p.request.url, start: p.timestamp };
      row.finalUrl = p.request.url;
      byId.set(p.requestId, row);
    } else if (e.method === "Network.responseReceived" && byId.has(p.requestId)) {
      byId.get(p.requestId).status = p.response.status;
      byId.get(p.requestId).fromCache = p.response.fromDiskCache || p.response.fromServiceWorker || false;
    } else if (e.method === "Network.loadingFinished" && byId.has(p.requestId)) {
      Object.assign(byId.get(p.requestId), { end: p.timestamp, bytes: p.encodedDataLength });
    }
  }
  // transformers.js は本体の前に、小さな範囲の要求（206）で大きさを確かめることがある。ファイルごとに要求を合わせ、
  // バイト数は合計、時間は最初の要求の開始から最後の要求の終わりまでとする
  const byFile = new Map();
  for (const row of byId.values()) {
    if (!/huggingface\.co|hf\.co/.test(row.url) || !row.end || !(row.bytes > 0)) continue;
    const file = decodeURIComponent(row.url.replace(/^.*\/resolve\/[^/]+\//, ""));
    const agg = byFile.get(file) ?? { file, url: row.url, bytes: 0, requests: 0, start: Infinity, end: -Infinity };
    agg.bytes += row.bytes;
    agg.requests++;
    agg.start = Math.min(agg.start, row.start);
    agg.end = Math.max(agg.end, row.end);
    byFile.set(file, agg);
  }
  return [...byFile.values()].map((f) => ({ file: f.file, url: f.url, bytes: f.bytes, requests: f.requests, seconds: f.end - f.start,
    mbps: (f.bytes * 8) / 1e6 / Math.max(1e-6, f.end - f.start), startOffset: f.start, endOffset: f.end }));
}

/** ページの中で、requestAnimationFrame の間隔と 1 コマの内訳を ms ミリ秒のあいだ集める。action はその間に行う操作。 */
export async function recordFrames(app, ms, action = null) {
  await app.evalIn(`(() => {
    // 前の記録のループが、次の記録へ書き込まないよう、記録先をこの呼び出しに閉じ込める
    if (globalThis.__benchFrames) globalThis.__benchFrames.run = false;
    const b = { t: [], run: true };
    globalThis.__benchFrames = b;
    const loop = (ts) => { if (!b.run) return; b.t.push(ts); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
    globalThis.__bukusupe.takeProfile();
    globalThis.__bukusupe.setProfiling(true);
  })()`);
  const started = Date.now();
  if (action) await action();
  const left = ms - (Date.now() - started);
  if (left > 0) await sleep(left);
  const data = await app.json(`(() => {
    const b = globalThis.__benchFrames; b.run = false;
    const profile = globalThis.__bukusupe.takeProfile();
    globalThis.__bukusupe.setProfiling(false);
    return { t: b.t, profile };
  })()`);
  const r = (v) => Math.round(v * 1000) / 1000;
  const intervals = data.t.slice(1).map((t, i) => r(t - data.t[i]));
  const seconds = (data.t.at(-1) - data.t[0]) / 1000;
  return { intervals, fps: seconds > 0 ? intervals.length / seconds : 0,
    total: data.profile.map((f) => r(f.total)), overlay: data.profile.map((f) => r(f.overlay)), render: data.profile.map((f) => r(f.render)) };
}

/** ページの中で KeyboardEvent を出す（CDP のキー入力は macOS のヘッドレスで固まるため使わない）。 */
export const keyEvent = (app, type, code, key, extra = {}) => app.evalIn(`(document.activeElement ?? document.body).dispatchEvent(
  new KeyboardEvent(${JSON.stringify(type)}, { code: ${JSON.stringify(code)}, key: ${JSON.stringify(key)}, bubbles: true, cancelable: true, ...${JSON.stringify(extra)} }))`);

export const clearSearch = (app) => app.evalIn(`(() => { const i = document.getElementById('search-input');
  i.value = ''; i.dispatchEvent(new Event('input')); i.blur(); })()`);

/** 既存の 9 つの検索語と、期待する分野（scripts/check-extension.mjs の M3 と同じ） */
export const SEARCH_CASES = [
  ["宇宙を感じたい", (r) => r.cluster === "宇宙" || /宇宙|星空|天文|NASA|JAXA|プラネタリウム/.test(r.title)],
  ["パスタ", (r) => r.folder.startsWith("料理")],
  ["recipe", (r) => r.folder.startsWith("料理")],
  ["週末に行ける温泉", (r) => r.folder.startsWith("旅行")],
  ["React の状態管理", (r) => r.folder.startsWith("開発/フロントエンド")],
  ["データベース 設計", (r) => r.folder.startsWith("開発/バックエンド")],
  ["生成AI", (r) => r.folder.startsWith("AI")],
  ["節約", (r) => r.folder.startsWith("お金")],
  ["睡眠を改善したい", (r) => r.folder.startsWith("健康")],
];

export const bytesToMB = (b) => (b == null ? null : b / 1024 / 1024);
