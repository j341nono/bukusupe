/**
 * dist/ を実際の Chrome に拡張機能として読み込み、通しで動くか確かめる。
 *   npm run build && npm run check:ext
 *
 * 見ているもの
 *  1. 拡張機能として読み込めて、専用ページが開く
 *  2. CSP 違反・例外が出ない
 *  3. ONNX Runtime の .mjs / .wasm を拡張機能内から読んでいる（CDN から取っていない）
 *  4. 外部へ出る通信がモデルの重み（Hugging Face）だけである
 *  5. 埋め込みが全件終わる
 *  6. 再読み込みで計算し直さない（IndexedDB から戻る）
 *  7. 意味検索が妥当（検索語ごとに違う星が上位に来る）
 *  8. 同じデータなら毎回まったく同じ座標になる
 *  9. 同じ星団の中で星どうしが重ならない
 * 10. 星団どうしの円が重ならない
 * 11. ブックマークが 1 件増えても、既存の星の座標が変わらない
 * 12. 20 / 150 / 2000 件で配置が終わり、2000 件でも 60 コマ/秒を保つ
 * 13. 遠・中・近の 3 段階のスクリーンショットを docs/screens/ に保存する
 *
 * 新しいプロファイルで動かすのでブックマークは空。表示はサンプル 150 件になる。
 */
import { spawn } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DIST = resolve(process.argv[2] ?? "dist");
const SHOT = process.argv[3] ?? null;
const profile = mkdtempSync(join(tmpdir(), "bukusupe-"));

const child = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--use-gl=swiftshader", "--enable-unsafe-swiftshader",
  "--enable-unsafe-extension-debugging", "--remote-debugging-pipe",
  `--user-data-dir=${profile}`, "--window-size=1280,800", "about:blank",
], { stdio: ["ignore", "ignore", "pipe", "pipe", "pipe"] });

const [, , , wfd, rfd] = child.stdio;
let buf = Buffer.alloc(0);
const pending = new Map();
let events = [];
rfd.on("data", (chunk) => {
  buf = Buffer.concat([buf, chunk]);
  let i;
  while ((i = buf.indexOf(0)) !== -1) {
    const msg = JSON.parse(buf.subarray(0, i).toString());
    buf = buf.subarray(i + 1);
    const settle = msg.id && pending.get(msg.id);
    if (settle) { pending.delete(msg.id); settle(msg); }
    else { events.push(msg); for (const fn of listeners) fn(msg); }
  }
});

const listeners = [];
let seq = 0;
const send = (method, params = {}, sessionId) =>
  new Promise((ok, ng) => {
    const id = ++seq;
    pending.set(id, (m) => (m.error ? ng(new Error(`${method}: ${JSON.stringify(m.error)}`)) : ok(m.result)));
    wfd.write(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }) + "\0");
  });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const IGNORE = /GPU stall|GL Driver Message|software WebGL/;
const problems = [];
const check = (ok, label, detail = "") => {
  console.log(`${ok ? "  OK " : "  NG "} ${label}${detail ? " … " + detail : ""}`);
  if (!ok) problems.push(label);
};

try {
  await sleep(2500);
  const { id: extId } = await send("Extensions.loadUnpacked", { path: DIST });
  console.log("拡張機能 ID:", extId);

  const { targetId } = await send("Target.createTarget", { url: `chrome-extension://${extId}/index.html` });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  await send("Runtime.enable", {}, sessionId);
  await send("Log.enable", {}, sessionId);
  await send("Network.enable", {}, sessionId);
  await send("Page.enable", {}, sessionId);

  // 埋め込みは Worker の中で動く。Worker の通信も見るために自動で接続する。
  listeners.push((m) => {
    if (m.method !== "Target.attachedToTarget") return;
    const child = m.params.sessionId;
    send("Network.enable", {}, child).catch(() => {});
    send("Runtime.enable", {}, child).catch(() => {});
    send("Log.enable", {}, child).catch(() => {});
  });
  await send("Target.setAutoAttach",
    { autoAttach: true, waitForDebuggerOnStart: false, flatten: true }, sessionId);

  const evalIn = async (expression) =>
    (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }, sessionId)).result.value;
  const hud = () => evalIn("document.getElementById('hud')?.innerText ?? ''");
  const phase = () => evalIn("document.body.dataset.phase ?? ''");

  // --- 1 回目：モデル取得と全件の埋め込み ---
  let text = "";
  const waitDone = async (limitSec) => {
    for (let i = 0; i < limitSec / 2; i++) {
      await sleep(2000);
      text = await hud();
      const line = text.split("\n").at(-1) ?? "";
      process.stdout.write(`\r  … ${line.padEnd(56)}`);
      const p = await phase();
      if (p === "ready" || p === "error") return p === "ready";
    }
    return false;
  };
  // 計算の最中に画面が動いているか（Worker で回っている証拠）
  let liveFrames = null;
  const watchFrames = (async () => {
    for (let i = 0; i < 150; i++) {
      await sleep(2000);
      const t = await hud();
      if (/星を読み解いている \d/.test(t)) {
        const a = await evalIn("globalThis.__bukusupe.frames()");
        await sleep(1000);
        const b = await evalIn("globalThis.__bukusupe.frames()");
        liveFrames = b - a;
        return;
      }
      if (["ready", "error"].includes(await phase())) return;
    }
  })();

  const finished = await waitDone(300);
  await watchFrames;
  process.stdout.write("\r" + " ".repeat(64) + "\r");
  console.log("HUD:", JSON.stringify(text));

  check(finished, "埋め込みが全件終わって星が並ぶ");
  check(/星\s*150/.test(text.replace(/\s+/g, " ")), "サンプル 150 件が読めている");
  check(await evalIn("typeof chrome !== 'undefined' && !!chrome.bookmarks"), "bookmarks 権限がある");
  check(liveFrames != null && liveFrames > 10, "計算中も画面が動いている",
    liveFrames == null ? "測れなかった" : `1 秒あたり ${liveFrames} コマ`);

  const urls = events.filter((e) => e.method === "Network.requestWillBeSent").map((e) => e.params.request.url);
  const wasmUrls = urls.filter((u) => /\.(mjs|wasm)$/.test(u));
  const external = urls.filter((u) => !u.startsWith("chrome-extension://"));
  check(
    wasmUrls.length > 0 && wasmUrls.every((u) => u.startsWith("chrome-extension://")),
    "ONNX Runtime を拡張機能内から読んでいる",
    wasmUrls.map((u) => u.split("/").pop()).join(", "),
  );
  check(
    external.every((u) => /^https:\/\/([a-z0-9-]+\.)*(huggingface\.co|hf\.co)\//.test(u)),
    "外部への通信はモデルの重みだけ",
    [...new Set(external.map((u) => new URL(u).host))].join(", ") || "(なし)",
  );

  const searchExpr = (q) =>
    `(async () => JSON.stringify(await globalThis.__bukusupe.search(${JSON.stringify(q)}, 3)))()`;
  const top = JSON.parse((await evalIn(searchExpr("猫や犬などの動物"))) ?? "[]");
  console.log("  意味検索「猫や犬などの動物」:", top.map((t) => `${t.title}(${t.score.toFixed(3)})`).join(" / "));
  const control = JSON.parse((await evalIn(searchExpr("確定申告"))) ?? "[]");
  console.log("  意味検索「確定申告」:", control.map((t) => `${t.title}(${t.score.toFixed(3)})`).join(" / "));
  check(top[0]?.title !== control[0]?.title, "違う検索語で違う星が上位に来る");

  // --- 配置（M2） ---
  const layout = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.layout())")) ?? "null");
  const again1 = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.computeAgain())")) ?? "null");
  const again2 = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.computeAgain())")) ?? "null");
  check(
    layout != null && JSON.stringify(again1) === JSON.stringify(again2) &&
      JSON.stringify(layout.stars) === JSON.stringify(again1.stars),
    "同じデータなら毎回まったく同じ座標になる",
  );

  const spacing = layout?.spacing ?? 2;
  const byCluster = new Map();
  for (const s of layout?.stars ?? []) {
    if (!byCluster.has(s.cluster)) byCluster.set(s.cluster, []);
    byCluster.get(s.cluster).push(s);
  }
  let minGap = Infinity;
  for (const group of byCluster.values()) {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        minGap = Math.min(minGap, Math.hypot(group[i].x - group[j].x, group[i].y - group[j].y));
      }
    }
  }
  check(minGap >= spacing * 0.8, "同じ星団の中で星どうしが重ならない",
    `最小 ${minGap.toFixed(2)}（間隔 ${spacing} の ${(minGap / spacing).toFixed(2)} 倍）`);

  const live = (layout?.clusters ?? []).filter((c) => c.count > 0);
  let worstOverlap = Infinity;
  for (let i = 0; i < live.length; i++) {
    for (let j = i + 1; j < live.length; j++) {
      const d = Math.hypot(live[i].x - live[j].x, live[i].y - live[j].y);
      worstOverlap = Math.min(worstOverlap, d - live[i].radius - live[j].radius);
    }
  }
  check(live.length < 2 || worstOverlap > 0, "星団どうしの円が重ならない",
    `一番近い組で ${worstOverlap.toFixed(2)} の空き`);

  // 星団ごとの内訳と、フォルダがいくつの星団に散っているか（物語の要点）
  const folderOf = new Map((layout?.stars ?? []).map((s) => [s.id, s.folder || "(ルート)"]));
  const spread = new Map();
  const detail = live.map((c) => {
    const members = (byCluster.get(c.index) ?? []).map((s) => folderOf.get(s.id) ?? "");
    const tally = new Map();
    for (const f of members) {
      tally.set(f, (tally.get(f) ?? 0) + 1);
      if (!spread.has(f)) spread.set(f, new Set());
      spread.get(f).add(c.index);
    }
    const folders = [...tally].sort((a, b) => b[1] - a[1]).map(([f, n]) => `${f}:${n}`);
    return { ...c, folders };
  });
  console.log("  星団:", live.map((c) => `${c.name}(${c.count})`).join(" / "));
  for (const c of detail) console.log(`    #${c.index} ${c.name}（${c.count}）`, c.folders.join(" "));
  const scattered = [...spread].filter(([, set]) => set.size >= 2);
  check(scattered.length > 0, "一つのフォルダの星が複数の星団に散っている",
    scattered.map(([f, set]) => `${f}→${set.size}`).join(" "));
  writeFileSync("docs/screens/clusters.json", JSON.stringify(detail, null, 1) + "\n");

  const added = JSON.parse((await evalIn(
    `(async () => JSON.stringify(await globalThis.__bukusupe.simulateAdd(
       "宇宙飛行士の訓練のすべて", "https://www.jaxa.jp/projects/astronaut/training/", ["あとで読む"])))()`,
  )) ?? "null");
  const before = new Map((layout?.stars ?? []).map((s) => [s.id, s]));
  const moved = (added?.stars ?? []).filter((s) => {
    const old = before.get(s.id);
    return old && (old.x !== s.x || old.y !== s.y || old.cluster !== s.cluster);
  });
  const newStar = (added?.stars ?? []).find((s) => !before.has(s.id));
  check(added != null && moved.length === 0 && newStar != null,
    "1 件増えても既存の星の座標が変わらない",
    newStar ? `新しい星は星団 ${newStar.cluster} の ${newStar.rank} 番目` : "新しい星が見つからない");

  // --- 件数を増やしたときの配置と描画 ---
  for (const n of [20, 150, 2000]) {
    const r = JSON.parse((await evalIn(
      `(async () => JSON.stringify(await globalThis.__bukusupe.benchmark(${n})))()`,
    )) ?? "null");
    const ok = r != null && r.clusters.length > 0;
    const detail = r ? `配置 ${r.layoutMs.toFixed(0)} ミリ秒 / ${r.fps.toFixed(0)} コマ ・ 星団 ${r.clusters.length}` : "計算できない";
    if (n === 2000) check(ok && r.fps >= 55, `${n} 件で配置が終わり 60 コマを保つ`, detail);
    else check(ok, `${n} 件で配置が終わる`, detail);
  }
  await evalIn("globalThis.__bukusupe.restore()");
  await sleep(1200);

  // --- 遠・中・近のスクリーンショット ---
  mkdirSync("docs/screens", { recursive: true });
  for (const tier of ["far", "mid", "near"]) {
    await evalIn(`globalThis.__bukusupe.setZoomTier(${JSON.stringify(tier)})`);
    await sleep(900);
    const shot = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    const path = `docs/screens/${tier}.png`;
    writeFileSync(path, Buffer.from(shot.data, "base64"));
    console.log("  画面:", path);
  }
  await evalIn("globalThis.__bukusupe.setZoomTier('mid')");

  // --- 2 回目：再読み込みで計算し直さないこと ---
  events = [];
  const t0 = Date.now();
  await send("Page.reload", {}, sessionId);
  let reloadedOk = false;
  for (let i = 0; i < 30; i++) {
    await sleep(500);
    text = await hud();
    if ((await phase()) === "ready") { reloadedOk = true; break; }
  }
  const elapsed = Date.now() - t0;
  const refetched = events
    .filter((e) => e.method === "Network.requestWillBeSent")
    .map((e) => e.params.request.url)
    .filter((u) => !u.startsWith("chrome-extension://"));
  check(reloadedOk, "再読み込み後も埋め込みが揃っている", `${(elapsed / 1000).toFixed(1)} 秒`);
  check(refetched.length === 0, "再読み込みで外部から取り直さない", `${refetched.length} 件`);

  if (SHOT) {
    const shot = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    writeFileSync(SHOT, Buffer.from(shot.data, "base64"));
    console.log("  画面:", SHOT);
  }

  const bad = events.concat().filter(
    (e) =>
      (e.method === "Log.entryAdded" &&
        ["error", "warning"].includes(e.params.entry.level) &&
        !IGNORE.test(e.params.entry.text)) ||
      e.method === "Runtime.exceptionThrown",
  );
  check(bad.length === 0, "エラー・警告が出ない",
    bad.map((b) => b.params?.entry?.text ?? b.params?.exceptionDetails?.text).join(" / "));
} catch (err) {
  console.error(err);
  problems.push(String(err));
} finally {
  await send("Browser.close").catch(() => {});
  child.kill();
  await sleep(500);
  try { rmSync(profile, { recursive: true, force: true, maxRetries: 3 }); } catch { /* 無視 */ }
}

console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
