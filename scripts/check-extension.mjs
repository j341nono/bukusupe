/**
 * dist/ を実際の Chrome に拡張機能として読み込み、専用ページが動くか確かめる。
 *   npm run build && npm run check:ext
 * CSP 違反・読み込み失敗があればここで落ちる（M1 の transformers.js / WASM で効く）。
 * 新しいプロファイルで動かすのでブックマークは空。表示はサンプルにフォールバックする。
 */
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DIST = resolve(process.argv[2] ?? "dist");
const SHOT = process.argv[3] ?? null;
const profile = mkdtempSync(join(tmpdir(), "bukusupe-"));

const child = spawn(
  CHROME,
  [
    "--headless=new", "--disable-gpu", "--use-gl=swiftshader", "--enable-unsafe-swiftshader",
    "--enable-unsafe-extension-debugging", "--remote-debugging-pipe",
    `--user-data-dir=${profile}`, "--window-size=1280,800", "about:blank",
  ],
  { stdio: ["ignore", "ignore", "pipe", "pipe", "pipe"] },
);

const [, , , wfd, rfd] = child.stdio;
let buf = Buffer.alloc(0);
const pending = new Map();
const events = [];
rfd.on("data", (chunk) => {
  buf = Buffer.concat([buf, chunk]);
  let i;
  while ((i = buf.indexOf(0)) !== -1) {
    const msg = JSON.parse(buf.subarray(0, i).toString());
    buf = buf.subarray(i + 1);
    const done = msg.id && pending.get(msg.id);
    if (done) { pending.delete(msg.id); done(msg); } else events.push(msg);
  }
});

let seq = 0;
const send = (method, params = {}, sessionId) =>
  new Promise((ok, ng) => {
    const id = ++seq;
    pending.set(id, (m) => (m.error ? ng(new Error(`${method}: ${JSON.stringify(m.error)}`)) : ok(m.result)));
    wfd.write(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }) + "\0");
  });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// swiftshader の性能に関する警告は本質ではないので除く
const IGNORE = /GPU stall|GL Driver Message|Automatic fallback to software WebGL/;

let failed = false;
try {
  await sleep(2500);
  const { id: extId } = await send("Extensions.loadUnpacked", { path: DIST });
  console.log("拡張機能 ID:", extId);

  const { targetId } = await send("Target.createTarget", { url: `chrome-extension://${extId}/index.html` });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  await send("Runtime.enable", {}, sessionId);
  await send("Log.enable", {}, sessionId);
  await send("Page.enable", {}, sessionId);
  await sleep(6000);

  const evalIn = async (expression) =>
    (await send("Runtime.evaluate", { expression, returnByValue: true }, sessionId)).result.value;

  const hud = await evalIn("document.getElementById('hud')?.innerText ?? ''");
  const hasBookmarks = await evalIn("typeof chrome !== 'undefined' && !!chrome.bookmarks");
  console.log("HUD:", JSON.stringify(hud));
  console.log("bookmarks 権限:", hasBookmarks);

  if (SHOT) {
    const shot = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    writeFileSync(SHOT, Buffer.from(shot.data, "base64"));
    console.log("画面:", SHOT);
  }

  const bad = events.filter(
    (e) =>
      (e.method === "Log.entryAdded" &&
        ["error", "warning"].includes(e.params.entry.level) &&
        !IGNORE.test(e.params.entry.text)) ||
      e.method === "Runtime.exceptionThrown",
  );
  if (bad.length) {
    console.error("エラー/警告:", JSON.stringify(bad, null, 1));
    failed = true;
  } else {
    console.log("エラー/警告: なし");
  }
  if (!hud.includes("星")) { console.error("HUD が出ていない"); failed = true; }
  if (!hasBookmarks) { console.error("bookmarks 権限が無い"); failed = true; }
} catch (err) {
  console.error(err);
  failed = true;
} finally {
  await send("Browser.close").catch(() => {});
  child.kill();
  await sleep(500);
  // Chrome がまだ書き込んでいることがあるので、後片付けは失敗しても無視する
  try { rmSync(profile, { recursive: true, force: true, maxRetries: 3 }); } catch { /* 無視 */ }
}

console.log(failed ? "NG" : "OK");
process.exit(failed ? 1 : 0);
