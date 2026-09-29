/** 初回の説明とモデルの照合。修正前には 2 つとも NG になることを確かめる。 */
import { resolve } from "node:path";
import { createChecker, launchExtension, sleep } from "./lib/harness.mjs";

const DIST = resolve(process.argv[2] ?? "dist-debug");
const MODEL_FILE = "https://huggingface.co/Xenova/multilingual-e5-small/resolve/761b726dd34fb83930e26aab4e9ac3899aa1fa78/config.json";
const { check, problems } = createChecker();

{
  const app = await launchExtension(DIST, { query: "sample=1&debug=1", autoConsent: false,
    beforeOpen: async ({ send, sessionId }) => { await send("Network.enable", {}, sessionId); } });
  try {
    const shown = await app.waitUntil("!document.getElementById('first-run')?.hidden", 5000, 100);
    await sleep(800);
    const before = app.events.filter((event) => event.method === "Network.requestWillBeSent" &&
      /https:\/\/([^.]+\.)*(huggingface\.co|hf\.co)\//.test(event.params?.request?.url ?? ""));
    const text = await app.tryEval("document.getElementById('first-run')?.textContent ?? ''");
    const link = await app.tryEval("document.querySelector('#first-run a')?.href ?? ''");
    check(shown && before.length === 0 && /135\s*MB/.test(text ?? "") &&
      /端末/.test(text ?? "") && link === "https://j341nono.github.io/bukusupe/privacy-policy.html",
    "初回は説明を出し、「始める」までモデルを取得しない",
    `説明 ${shown ? "あり" : "なし"}・モデル通信 ${before.length} 件`);
    if (shown) {
      await app.evalIn("document.getElementById('first-run-start').click()");
      await app.waitUntil("['ready', 'error'].includes(document.body.dataset.phase)", 180_000, 250);
      const ready = await app.tryEval("document.body.dataset.phase === 'ready'");
      if (!ready) console.log("  初回の状態:", await app.tryEval("document.getElementById('hud')?.textContent"),
        app.events.filter((event) => event.method === "Runtime.consoleAPICalled").slice(-3)
          .map((event) => event.params.args?.map((arg) => arg.value ?? arg.description).join(" ")),
        await app.tryEval("(async () => (await (await caches.open('bukusupe-model')).keys()).map((k) => k.url))()"));
      await app.send("Page.reload", {}, app.sessionId);
      await app.waitUntil("['ready', 'error'].includes(document.body.dataset.phase)", 120_000, 250);
      const again = await app.tryEval("document.body.dataset.phase === 'ready'");
      const hidden = await app.tryEval("document.getElementById('first-run')?.hidden");
      check(ready && again && hidden === true, "同意の後にモデルを取得し、次回は説明を出さない");
    } else check(false, "同意の後にモデルを取得し、次回は説明を出さない", "初回の説明が無い");
  } catch (err) { problems.push(String(err)); }
  finally { await app.close(); }
}

{
  const app = await launchExtension(DIST, { query: "sample=1&debug=1", autoConsent: false });
  try {
    await app.waitUntil("document.readyState === 'complete'", 10_000, 100);
    await app.evalIn(`(async () => { const cache = await caches.open('bukusupe-model');
      await cache.put(${JSON.stringify(MODEL_FILE)}, new Response('{"model_type":"bert"}',
        { headers: { 'content-length': '21' } })); })()`);
    await app.send("Page.reload", {}, app.sessionId);
    if (await app.waitUntil("!document.getElementById('first-run')?.hidden", 5000, 100)) {
      await app.evalIn("document.getElementById('first-run-start').click()");
    }
    await app.waitUntil("document.body.dataset.phase === 'error' || document.body.dataset.phase === 'ready'", 90_000, 250);
    const result = JSON.parse((await app.tryEval(`(async () => JSON.stringify({
      phase: document.body.dataset.phase,
      message: document.getElementById('hud')?.textContent ?? '',
      stillCached: !!(await (await caches.open('bukusupe-model')).match(${JSON.stringify(MODEL_FILE)})),
    }))()`)) ?? "null");
    check(result?.phase === "error" && /モデル.*検証/.test(result?.message ?? "") && !result?.stillCached,
      "ハッシュが違うモデルのファイルを使わず、案内を出す",
      result ? `${result.phase}・案内 ${/モデル.*検証/.test(result.message)}・壊れたキャッシュ ${result.stillCached ? "残る" : "除いた"}` : "状態を読めない");
  } catch (err) { problems.push(String(err)); }
  finally { await app.close(); }
}

console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
