/**
 * Web のデモ（`npm run build:web` → dist-web/）の確認（M6）。
 *   npm run build:web && node scripts/check-web.mjs
 *
 * dist-web/ を手元の小さなサーバーで GitHub Pages と同じくサブパス（/bukusupe/）に置き、使い捨てのプロファイルの Chrome で開く。
 *  1. 開いた直後、モデルの読み込みを待たずに星空が出る（Hugging Face への通信を差し止めたまま確かめる）
 *  2. モデルを読み込んでいる間は文字一致の検索で動き、控えめに知らせる。読み込みが終わると意味の検索になる
 *  3. ページは通常のページ遷移で開き、「戻る」で検索語が戻る（移動先は CDP の Fetch で手元の空ページに差し替える）
 *  4. サイトのアイコンは常に頭文字の紋章
 *  5. スマホ（タッチ・狭い画面）：ドラッグで移動、ピンチで拡大縮小、タップで選択。飛行モードのボタンは無く、案内が出る
 *  6. 外部から読み込むのはモデルの重みだけ。マニフェストを置かない。コンソールにエラー・警告が無い
 *  7. 画面の言語（SPEC 14 章）：英語の Chrome で開くと英語になり、ⓘ のパネルで日本語に切り替えられ、読み込み直しても保たれる
 */
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { createChecker, decodePng, launchExtension, sleep } from "./lib/harness.mjs";

const ROOT = resolve(process.argv[2] ?? "dist-web-debug");
const BASE = "/bukusupe/";
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript",
  ".wasm": "application/wasm", ".png": "image/png", ".json": "application/json", ".css": "text/css" };
const IGNORE = /GPU stall|GL Driver Message|software WebGL|Automatic fallback to software WebGL/;

const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (!path.startsWith(BASE)) { res.writeHead(404).end(); return; }
  let file = normalize(join(ROOT, path.slice(BASE.length)));
  if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) { res.writeHead(404).end(); return; }
  res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" }).end(readFileSync(file));
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const origin = `http://127.0.0.1:${server.address().port}`;
const PAGE = `${origin}${BASE}?debug=1`;

const { check, problems } = createChecker();
check(existsSync(join(ROOT, "index.html")) && !existsSync(join(ROOT, "manifest.json")) && !existsSync(join(ROOT, "background.js")),
  "dist-web-debug/ に画面があり、拡張機能のマニフェストと service worker は無い");

// モデルの重み（Hugging Face）への通信は、確認 1・2 の間だけ差し止める（ブラウザ全体で。Worker の通信も止まる）
const held = [];
let holding = true;
const hfPattern = [{ urlPattern: "*huggingface.co*" }, { urlPattern: "*hf.co*" }];
const app = await launchExtension(null, {
  url: PAGE,
  beforeOpen: async ({ send, sessionId }) => {
    await send("Fetch.enable", { patterns: hfPattern });
    // CSP の違反を、ページのスクリプトより先に数え始める
    await send("Page.addScriptToEvaluateOnNewDocument", { source: `window.__csp = [];
      document.addEventListener('securitypolicyviolation', (e) => window.__csp.push(e.violatedDirective + ' ' + e.blockedURI));` }, sessionId);
  },
});
const { send, evalIn, tryEval, waitUntil, screenshot } = app;
const b = "globalThis.__bukusupe";
const json = async (expression) => JSON.parse((await tryEval(`JSON.stringify(${expression})`)) ?? "null");
app.onEvent((m) => {
  if (m.method !== "Fetch.requestPaused") return;
  if (m.sessionId) return;   // ページごとの差し止め（下の 3）は、そちらで扱う
  if (holding) held.push(m.params.requestId);
  else send("Fetch.continueRequest", { requestId: m.params.requestId }).catch(() => {});
});

try {
  // --- 1. 開いた直後、モデルを待たずに星空が出る ---
  const ready = await waitUntil(`document.body.dataset.phase === 'ready' && (${b}?.layout()?.stars.length ?? 0) > 0`, 15_000, 100);
  const age = await tryEval("performance.now()");
  await sleep(1500);
  const first = await json(`{ stars: ${b}.layout().stars.length, model: document.body.dataset.model ?? null,
    modelReady: ${b}.modelReady(), status: !document.getElementById('model-status').hidden,
    statusText: document.getElementById('model-status').textContent, kind: ${b}.state.kind }`);
  const shot = decodePng(await screenshot());
  let lit = 0;
  for (let i = 0; i < shot.data.length; i += 4) if (shot.data[i] + shot.data[i + 1] + shot.data[i + 2] > 300) lit++;
  writeFileSync("docs/screens/web-initial.png", await screenshot());
  console.log("  画面: docs/screens/web-initial.png");
  check(ready && age < 8000 && first?.stars === 156 && first.kind === "sample" && first.modelReady === false &&
    first.model === "loading" && held.length > 0 && lit > 200,
  "開いた直後、モデルの読み込みを待たずにサンプルの星空が出る（モデルの通信を止めたまま）",
  first ? `準備まで ${(age / 1000).toFixed(1)} 秒・星 ${first.stars}・モデル ${first.model}・差し止めた通信 ${held.length} 件・明るい画素 ${lit}` : "測れない");

  // --- 2. 読み込み中は文字一致の検索。控えめに知らせる。揃ったら意味の検索 ---
  const lexicalAsync = await evalIn(`(async () => (await ${b}.searchNow('React')).length)()`);
  check(first?.status === true && lexicalAsync > 0 && (await tryEval(`${b}.modelReady()`)) === false,
    "モデルの読み込み中は文字一致の検索で動き、検索欄の下に控えめに知らせる",
    `知らせ「${first?.statusText ?? ""}」・「React」で ${lexicalAsync} 件`);
  await evalIn("(() => { const i = document.getElementById('search-input'); i.value = ''; i.dispatchEvent(new Event('input')); i.blur(); })()");
  holding = false;
  for (const requestId of held.splice(0)) await send("Fetch.continueRequest", { requestId }).catch(() => {});
  await send("Fetch.disable", {}).catch(() => {});
  const modelReady = await waitUntil(`${b}.modelReady() === true && document.body.dataset.model === 'ready'`, 300_000, 1000);
  const semanticAsync = await evalIn(`(async () => {
    const hits = await ${b}.searchNow('宇宙を感じたい');
    return JSON.stringify({ count: hits.length, statusHidden: document.getElementById('model-status').hidden,
      top: hits.slice(0, 3).map((hit) => ${b}.state.items.find((item) => item.id === hit.id)?.title) });
  })()`);
  const sem = JSON.parse(semanticAsync ?? "null");
  check(modelReady && sem?.count > 0 && sem.statusHidden,
    "モデルの読み込みが終わると、意味の検索になり、知らせが消える",
    sem ? `「宇宙を感じたい」で ${sem.count} 件（${sem.top.join(" / ")}）` : "読み込みが終わらない");

  // --- 3. ページは通常のページ遷移で開き、「戻る」で検索語が戻る ---
  app.onEvent((m) => {
    if (m.method !== "Fetch.requestPaused" || !m.sessionId) return;
    send("Fetch.fulfillRequest", { requestId: m.params.requestId, responseCode: 200,
      responseHeaders: [{ name: "Content-Type", value: "text/html; charset=utf-8" }],
      body: Buffer.from("<!doctype html><title>page</title><p>page</p>").toString("base64") }, m.sessionId).catch(() => {});
  });
  await send("Fetch.enable", { patterns: [{ urlPattern: "https://*" }] }, app.sessionId);
  await evalIn("document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))");
  const left = await waitUntil("location.protocol === 'https:'", 8000, 100);
  const navigated = await tryEval("location.href");
  await tryEval("history.back()");
  const back = await waitUntil(`location.origin === ${JSON.stringify(origin)} && document.body.dataset.phase === 'ready' &&
    document.getElementById('search-input').value === '宇宙を感じたい' && ${b}.searchState().ids.length > 0`, 30_000, 300);
  await send("Fetch.disable", {}, app.sessionId).catch(() => {});
  check(left && back, "ページは通常のページ遷移で開き、「戻る」で検索語と検索結果が戻る",
    `移動 ${left ? "した" : "しない"}・戻って検索語 ${back ? "あり" : "なし"}`);
  await evalIn("(() => { const i = document.getElementById('search-input'); i.value = ''; i.dispatchEvent(new Event('input')); i.blur(); })()");
  await sleep(800);

  // --- 4. サイトのアイコンは常に頭文字の紋章（飛行中の窓で見る） ---
  await evalIn(`${b}.enterFlight()`);
  await waitUntil(`${b}.flightState().phase === 'flying'`, 5000);
  const star = await evalIn(`${b}.layout().stars[0].id`);
  await evalIn(`${b}.flightTeleport(${JSON.stringify(star)}, 16)`);
  await waitUntil("document.querySelectorAll('.flight-window[data-icon]').length > 0", 5000);
  await sleep(400);
  const icons = await json("[...document.querySelectorAll('.flight-window')].filter((el) => el.style.display !== 'none').map((el) => el.dataset.icon ?? null)");
  check(icons?.length > 0 && icons.every((icon) => icon === "crest") && (await tryEval("document.querySelectorAll('.flight-window img').length")) === 0,
    "サイトのアイコンは、外部から取らず常に頭文字の紋章", `窓 ${icons?.length ?? 0} 個（${(icons ?? []).join(",")}）`);
  await evalIn(`${b}.exitFlight()`);
  await sleep(1600);

  // --- 5. スマホ：タッチで移動・拡大縮小・選択。飛行モードのボタンは無く、案内が出る ---
  const { targetId: mobileId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId: m } = await send("Target.attachToTarget", { targetId: mobileId, flatten: true });
  for (const domain of ["Runtime", "Log", "Page"]) await send(`${domain}.enable`, {}, m);
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }, m);
  await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 }, m);
  await send("Page.navigate", { url: PAGE }, m);
  const mEval = async (expression) => {
    const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }, m).catch(() => null);
    return r?.result?.value;
  };
  let mobileReady = false;
  for (let i = 0; i < 60 && !mobileReady; i++) {
    await sleep(250);
    mobileReady = !!(await mEval(`document.body.dataset.phase === 'ready' && (${b}?.layout()?.stars.length ?? 0) > 0`));
  }
  await sleep(1200);
  const touch = (type, points) => send("Input.dispatchTouchEvent", { type, touchPoints: points.map(([x, y], id) => ({ x, y, id })) }, m);
  const camera = async () => JSON.parse((await mEval(`JSON.stringify(${b}.cameraState())`)) ?? "null");
  const ui = JSON.parse((await mEval(`JSON.stringify({
    flight: getComputedStyle(document.getElementById('flight-toggle')).display,
    note: getComputedStyle(document.getElementById('touch-note')).display,
    noteText: document.getElementById('touch-note').textContent.trim(),
    overflow: document.documentElement.scrollWidth > innerWidth })`)) ?? "null");
  check(mobileReady && ui?.flight === "none" && ui.note !== "none" && ui.noteText === "飛行モードは PC で試せます" && !ui.overflow,
    "スマホでは飛行モードのボタンを隠し、「飛行モードは PC で試せます」と案内する（横にはみ出さない）",
    ui ? `ボタン ${ui.flight}・案内 ${ui.note}「${ui.noteText}」` : "開けない");
  // ドラッグで移動
  const c0 = await camera();
  await touch("touchStart", [[200, 520]]);
  for (let i = 1; i <= 8; i++) { await touch("touchMove", [[200 + i * 12, 520 + i * 10]]); await sleep(16); }
  await touch("touchEnd", []);
  await sleep(900);
  const c1 = await camera();
  // ピンチで拡大（指を広げる）
  await touch("touchStart", [[195, 420], [195, 480]]);
  for (let i = 1; i <= 8; i++) { await touch("touchMove", [[195, 420 - i * 14], [195, 480 + i * 14]]); await sleep(16); }
  await touch("touchEnd", []);
  await sleep(900);
  const c2 = await camera();
  const moved = c0 && c1 && Math.hypot(c1.x - c0.x, c1.y - c0.y) > 0.5 && Math.abs(c1.distance - c0.distance) < 0.5;
  const zoomed = c1 && c2 && c2.distance < c1.distance * 0.85;
  check(moved && zoomed, "スマホでは、1 本指のドラッグで移動し、2 本指のピンチで拡大する",
    c0 && c1 && c2 ? `中心 (${c0.x.toFixed(1)}, ${c0.y.toFixed(1)})→(${c1.x.toFixed(1)}, ${c1.y.toFixed(1)})・距離 ${c1.distance.toFixed(0)}→${c2.distance.toFixed(0)}` : "測れない");
  // タップで星を選ぶ（カードが出る）
  const target = JSON.parse((await mEval(`JSON.stringify((() => {
    const stars = ${b}.layout().stars.map((s) => ({ id: s.id, p: ${b}.starScreen(s.id) }))
      .filter((s) => s.p && s.p.x > 40 && s.p.x < innerWidth - 40 && s.p.y > 140 && s.p.y < innerHeight - 120);
    return stars[0] ?? null; })())`)) ?? "null");
  if (target) {
    await touch("touchStart", [[target.p.x, target.p.y]]);
    await sleep(60);
    await touch("touchEnd", []);
  }
  await sleep(700);
  const card = JSON.parse((await mEval(`JSON.stringify({ shown: !document.getElementById('star-card').hidden,
    title: document.getElementById('star-card-title').textContent,
    want: ${b}.state.items.find((item) => item.id === ${JSON.stringify(target?.id ?? "")})?.title ?? null })`)) ?? "null");
  check(target && card?.shown && card.title === card.want, "スマホでは、星をタップすると選べる（カードが出る）",
    card ? `カード ${card.shown ? "表示" : "なし"}「${card.title}」` : "測れない");
  // タッチで検索（入力して結果が出る）
  const mobileSearch = await mEval(`(async () => (await ${b}.searchNow('パスタ')).length)()`);
  await sleep(1200);
  const orbit = await mEval(`${b}.searchGeometry().stars.length`);
  check(mobileSearch > 0 && orbit > 0, "スマホでも検索でき、星が引き寄せられる", `「パスタ」で ${mobileSearch} 件・軌道 ${orbit} 件`);
  const mobileShot = await send("Page.captureScreenshot", { format: "png" }, m);
  writeFileSync("docs/screens/web-mobile.png", Buffer.from(mobileShot.data, "base64"));
  console.log("  画面: docs/screens/web-mobile.png");
  await send("Target.closeTarget", { targetId: mobileId }).catch(() => {});

  // --- CSP：Web 版の index.html に CSP があり、違反が 0 件（モデルの取得と意味検索まで通った後で） ---
  const html = readFileSync(join(ROOT, "index.html"), "utf8");
  const csp = html.match(/<meta[^>]+http-equiv="Content-Security-Policy"[^>]+content="([^"]+)"/i)?.[1] ?? null;
  const violations = await json("window.__csp ?? null");
  check(csp && /script-src[^;]*'self'/.test(csp) && !/script-src[^;]*'unsafe-inline'/.test(csp) && /connect-src/.test(csp) &&
    Array.isArray(violations) && violations.length === 0,
  "Web 版の index.html に CSP があり、モデルの取得と意味検索まで通して、CSP の違反が 0 件",
  `CSP ${csp ? csp.slice(0, 90) + "…" : "なし"}・違反 ${violations ? violations.length : "数えられない"}${violations?.length ? "（" + violations.slice(0, 2).join(" / ") + "）" : ""}`);
  // 保存領域の名前に、ブクスペ専用の接頭辞が付いている
  const namesAsync = JSON.parse((await evalIn(`(async () => JSON.stringify({ idb: (await indexedDB.databases()).map((d) => d.name),
    local: Object.keys(localStorage), session: Object.keys(sessionStorage), cache: await caches.keys() }))()`)) ?? "null");
  const unprefixed = namesAsync ? [...namesAsync.idb.filter((n) => !n.startsWith("bukusupe-")),
    ...namesAsync.local.filter((k) => !k.startsWith("bukusupe:")), ...namesAsync.session.filter((k) => !k.startsWith("bukusupe:")),
    ...namesAsync.cache.filter((n) => !n.startsWith("bukusupe-"))] : ["測れない"];
  check(namesAsync && namesAsync.idb.length > 0 && namesAsync.cache.length > 0 && unprefixed.length === 0,
    "Web 版の保存領域（IndexedDB・localStorage・sessionStorage・モデルの Cache Storage）の名前に、ブクスペ専用の接頭辞が付いている",
    namesAsync ? `IndexedDB ${namesAsync.idb.join(", ")}・Cache Storage ${namesAsync.cache.join(", ")}・localStorage ${namesAsync.local.join(", ") || "なし"}・sessionStorage ${namesAsync.session.join(", ") || "なし"}${unprefixed.length ? "・接頭辞なし " + unprefixed.join(", ") : ""}` : "測れない");

  // --- 6. 外部から読むのはモデルの重みだけ。コンソールにエラー・警告が無い ---
  const requests = app.events.filter((e) => e.method === "Network.requestWillBeSent").map((e) => e.params.request.url);
  const external = requests.filter((url) => /^https?:/.test(url) && !url.startsWith(origin) &&
    !/^https:\/\/([a-z0-9-]+\.)*(huggingface\.co|hf\.co)\//.test(url) &&
    // 3 で開いたページ（とそのページが求める favicon）は、Fetch で手元の空ページに差し替えていて外には出ていない
    !(navigated && url.startsWith(new URL(navigated).origin)));
  const scripts = requests.filter((url) => /\.(m?js|wasm)(\?|$)/.test(url) && !url.startsWith(origin));
  check(external.length === 0 && scripts.length === 0, "外部から読み込むのはモデルの重みだけ（スクリプト・WASM は同梱のもの）",
    external.concat(scripts).slice(0, 3).join(" / ") || `通信 ${requests.length} 件`);
  // --- 7. プライバシーポリシーのページ（/bukusupe/privacy/）。書いた通信先・保存場所が、実際の動き（この確認で見たもの）と合っている ---
  const privacyRes = await fetch(`${origin}${BASE}privacy/`).catch(() => null);
  const privacy = privacyRes?.ok ? await privacyRes.text() : "";
  const hostsSeen = [...new Set(requests.filter((url) => /^https?:/.test(url) && !url.startsWith(origin) &&
    !(navigated && url.startsWith(new URL(navigated).origin))).map((url) => new URL(url).host))];
  const hostsCovered = hostsSeen.every((host) => host === "huggingface.co" || host.endsWith(".hf.co"));
  const storesUsed = namesAsync ? [namesAsync.idb.length && "IndexedDB", namesAsync.cache.length && "Cache Storage",
    namesAsync.local.length && "localStorage", namesAsync.session.length && "sessionStorage"].filter(Boolean) : [];
  const mustSay = ["huggingface.co", "*.hf.co", "IndexedDB", "Cache Storage", "localStorage", "sessionStorage", "GET",
    "j341nono.dev@gmail.com", "https://github.com/j341nono/bukusupe/issues", "最終更新", "Last updated", 'lang="en"', 'lang="ja"',
    // 限定的な使用（Limited Use）の決まりが求める、拡張機能のサイトに置く宣言
    "including the Limited Use requirements"];
  const missing = mustSay.filter((word) => !privacy.includes(word));
  check(privacyRes?.ok && existsSync(join(ROOT, "privacy", "index.html")) && missing.length === 0 && !/<script/i.test(privacy) &&
    /Content-Security-Policy/.test(privacy) && hostsSeen.length > 0 && hostsCovered && storesUsed.every((name) => privacy.includes(name)),
    "プライバシーポリシーのページ（/privacy/、日本語と英語）があり、書いた通信先と保存場所が実際の動きと合っている",
    `ページ ${privacyRes?.status ?? "なし"}・実際の通信先 ${hostsSeen.join(", ") || "なし"}（${hostsCovered ? "記載の範囲" : "記載に無い通信先がある"}）・` +
    `使った保存場所 ${storesUsed.join(", ")}${missing.length ? `・記載に無い ${missing.join(", ")}` : ""}`);

  const bad = app.events.filter((e) =>
    (e.method === "Log.entryAdded" && ["error", "warning"].includes(e.params.entry.level) && !IGNORE.test(e.params.entry.text)) ||
    (e.method === "Runtime.consoleAPICalled" && ["error", "warning", "warn"].includes(e.params.type)) ||
    e.method === "Runtime.exceptionThrown");
  check(bad.length === 0, "エラー・警告が出ない（PC とスマホ）",
    bad.slice(0, 3).map((e) => e.params?.entry?.text ?? e.params?.args?.[0]?.value ?? e.params?.exceptionDetails?.text).join(" / "));
} catch (err) {
  console.error(err);
  problems.push(String(err));
} finally {
  await app.close();
}

// --- 7. 画面の言語（英語の Chrome。モデルの通信は止めておく：計算済みのサンプルで星空が出るので、言語の確認には要らない） ---
// サンプルは言語ごとに違う（段階 3c）ので、ⓘ のパネルで切り替えると読み込み直してその言語のサンプルになる。
const en = await launchExtension(null, { url: PAGE, lang: "en-US",
  beforeOpen: ({ send, sessionId }) => send("Network.setBlockedURLs", { urls: ["*huggingface.co*", "*hf.co*"] }, sessionId) });
try {
  const waitReady = () => en.waitUntil(`document.body.dataset.phase === 'ready' && (globalThis.__bukusupe?.layout()?.stars.length ?? 0) > 0`, 20_000, 200);
  const ready = await waitReady();
  const texts = async () => JSON.parse(await en.evalIn(`JSON.stringify({ lang: document.documentElement.lang,
    placeholder: document.getElementById('search-input').placeholder,
    clusters: globalThis.__bukusupe.layout().clusters.filter((c) => c.count > 0).map((c) => c.name),
    titles: globalThis.__bukusupe.layout().stars.map((s) => s.title) })`));
  const before = await texts();
  await en.evalIn(`(() => { const s = document.getElementById('hud-lang'); s.value = 'ja'; s.dispatchEvent(new Event('change')); })()`);
  // 切り替えはその言語のサンプルへ読み込み直す（読み込み直してよい。main.ts の refreshLanguage）
  await waitReady();
  const switched = await texts();
  await en.send("Page.reload", {}, en.sessionId);
  await waitReady();
  const reloaded = await texts();
  const japanese = (list) => list.some((n) => /[\p{Script=Han}\p{Script=Katakana}]/u.test(n));
  check(ready && before.lang === "en" && before.placeholder === "Search the stars" && !japanese(before.clusters) && !japanese(before.titles) &&
    switched.lang === "ja" && switched.placeholder === "星を探す" && japanese(switched.clusters) && japanese(switched.titles) &&
    reloaded.lang === "ja" && reloaded.placeholder === "星を探す" && japanese(reloaded.titles),
    "Web のデモも、英語の Chrome では英語のサンプル、ⓘ のパネルで日本語に切り替えると日本語のサンプルへ読み込み直し、読み込み直しても保たれる",
    `${before.placeholder}（${before.clusters.slice(0, 3).join("/")}）→ ${switched.placeholder}（${switched.clusters.slice(0, 3).join("/")}）→ 読み込み直し ${reloaded.placeholder}`);
} catch (err) {
  console.error(err);
  problems.push(String(err));
} finally {
  await en.close();
  server.close();
}

console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
