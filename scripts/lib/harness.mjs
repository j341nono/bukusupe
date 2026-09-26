/**
 * 自動確認の土台：使い捨てのプロファイルで Chrome を起動し、CDP をパイプで繋いで dist/ を拡張機能として読み込む。
 * `check-flight.mjs` が使う。（`check-extension.mjs` は同じ処理を中に持っている。いずれここへ寄せる）
 *
 * - `--load-extension` はヘッドレスでは効かないので、`Extensions.loadUnpacked` を使う。
 * - Worker の通信も見るため、`Target.setAutoAttach` で子にも繋ぐ。
 * - 応答しない命令は 60 秒で失敗にする（ヘッドレス Chrome が稀に固まるため）。
 * - キー入力は CDP の `Input.dispatchKeyEvent` を使わない（macOS で固まる）。ページ内の KeyboardEvent で送る。
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SEND_TIMEOUT_MS = 60_000;
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function launchExtension(dist, { width = 1280, height = 800 } = {}) {
  const profile = mkdtempSync(join(tmpdir(), "bukusupe-"));
  const child = spawn(CHROME, [
    "--headless=new", "--disable-gpu", "--use-gl=swiftshader", "--enable-unsafe-swiftshader",
    "--enable-unsafe-extension-debugging", "--remote-debugging-pipe",
    `--user-data-dir=${profile}`, `--window-size=${width},${height}`, "about:blank",
  ], { stdio: ["ignore", "ignore", "pipe", "pipe", "pipe"] });

  const [, , , wfd, rfd] = child.stdio;
  let buf = Buffer.alloc(0);
  const pending = new Map();
  const listeners = [];
  const events = [];
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
  let seq = 0;
  const send = (method, params = {}, sessionId) => new Promise((ok, ng) => {
    const id = ++seq;
    const timer = setTimeout(() => {
      pending.delete(id);
      ng(new Error(`${method} が ${SEND_TIMEOUT_MS / 1000} 秒応答しない（ヘッドレス Chrome の不調の可能性）`));
    }, SEND_TIMEOUT_MS);
    pending.set(id, (m) => {
      clearTimeout(timer);
      if (m.error) ng(new Error(`${method}: ${JSON.stringify(m.error)}`));
      else ok(m.result);
    });
    wfd.write(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }) + "\0");
  });

  await sleep(2500);
  const { id: extId } = await send("Extensions.loadUnpacked", { path: dist });
  const { targetId } = await send("Target.createTarget", { url: `chrome-extension://${extId}/index.html` });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  for (const domain of ["Runtime", "Log", "Page", "Network"]) await send(`${domain}.enable`, {}, sessionId);
  listeners.push((m) => {
    if (m.method !== "Target.attachedToTarget") return;
    for (const domain of ["Runtime", "Log", "Network"]) send(`${domain}.enable`, {}, m.params.sessionId).catch(() => {});
  });
  await send("Target.setAutoAttach", { autoAttach: true, waitForDebuggerOnStart: false, flatten: true }, sessionId);

  /** ページで式を評価して値を返す。例外は Error にして投げる。 */
  const evalIn = async (expression) => {
    const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }, sessionId);
    if (r.exceptionDetails) {
      throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
    }
    return r.result.value;
  };
  /** ページの読み込み直し中などで失敗したら undefined を返す。 */
  const tryEval = async (expression) => { try { return await evalIn(expression); } catch { return undefined; } };
  const waitUntil = async (expression, limitMs, stepMs = 200) => {
    const end = Date.now() + limitMs;
    while (Date.now() < end) {
      if (await tryEval(expression)) return true;
      await sleep(stepMs);
    }
    return false;
  };
  /** ページ内で KeyboardEvent を発行する（アプリが見ているのは window の keydown / keyup と event.code）。 */
  const key = (type, code, keyName, target = "document.activeElement ?? document.body") => evalIn(`(() => {
    const event = new KeyboardEvent(${JSON.stringify(type)}, { code: ${JSON.stringify(code)}, key: ${JSON.stringify(keyName)},
      bubbles: true, cancelable: true });
    (${target}).dispatchEvent(event);
    return event.defaultPrevented;
  })()`);
  const press = async (code, keyName, ms = 0) => {
    await key("keydown", code, keyName);
    if (ms) await sleep(ms);
    await key("keyup", code, keyName);
  };
  const screenshot = async () => Buffer.from((await send("Page.captureScreenshot", { format: "png" }, sessionId)).data, "base64");

  const close = async () => {
    await Promise.race([send("Browser.close").catch(() => {}), sleep(5000)]);
    child.kill("SIGKILL");
    await sleep(500);
    try { rmSync(profile, { recursive: true, force: true, maxRetries: 3 }); } catch { /* 無視 */ }
  };

  return { send, evalIn, tryEval, waitUntil, key, press, screenshot, close, events, extId, sessionId };
}

/** 確認の結果を集めて出す。 */
export function createChecker() {
  const problems = [];
  const check = (ok, label, detail = "") => {
    console.log(`${ok ? "  OK " : "  NG "} ${label}${detail ? " … " + detail : ""}`);
    if (!ok) problems.push(label);
  };
  return { check, problems };
}
