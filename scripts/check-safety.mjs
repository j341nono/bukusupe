/**
 * 安全性の確認（docs/RELEASE.md 段階 1、docs/SECURITY.md）。
 *   node scripts/check-safety.mjs   （check:ext の中で動く）
 *
 *  1. src/ に、文字列を HTML として解釈する処理（innerHTML など）が無い
 *  2. 形の違う星座の行が IndexedDB にあっても、正常に起動し、残りの星座が表示される（読み飛ばしたことを警告に残す）
 *  3. javascript:・data:・file:・chrome: の星を確認用の注入で入れても、「開く」・Enter・星への突入・ページを開く関数のどれでも、
 *     chrome.tabs.update / create と、ページの移動が 0 回
 *  4. 「戻る」用の保存状態が壊れていても（数値でない値・形の違う値・壊れた JSON・20 万文字の検索語・版の違い）、いつもどおり準備完了になり、
 *     カメラの位置と距離が有限の値で、例外が 0 件
 *  5. 右から左へ書く制御文字を含むタイトルで、表示の要素が書字の向きを周りと区切り、カードに本当のドメインが表示されている
 *  6. 1,000 文字のタイトルで、地図のラベル（検索中を含む）とカードが画面からはみ出さない
 *  7. タイトル・フォルダ名に HTML を含むブックマークが、地図・検索中・カード・飛行中の窓のどこでも文字として表示され、スクリプトが動かない
 *     （今のコードに穴は無かったので、修正前も通る。HTML として解釈する処理が入り込んだときに気づくための見張り）
 * 確認用のブックマークは、?debug=1&bench=… の注入（chrome.storage.local）で入れる。拡張機能はブックマークを変えない。
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { createChecker, launchExtension, sleep } from "./lib/harness.mjs";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const DIST = resolve(process.argv[2] ?? "dist-debug");
const { check, problems } = createChecker();
const b = "globalThis.__bukusupe";

// --- 1. src/ に HTML として解釈する処理が無い（ブラウザは使わない） ---
{
  const sinks = /\b(innerHTML|outerHTML|insertAdjacentHTML|document\.write(ln)?|createContextualFragment|srcdoc)\b/;
  const found = [];
  for (const entry of readdirSync(join(ROOT, "src"), { recursive: true, withFileTypes: true })) {
    if (!entry.isFile() || !/\.(ts|js|mjs)$/.test(entry.name)) continue;
    const path = join(entry.parentPath ?? entry.path, entry.name);
    readFileSync(path, "utf8").split("\n").forEach((line, i) => {
      if (sinks.test(line)) found.push(`${path.slice(ROOT.length + 1)}:${i + 1}`);
    });
  }
  check(found.length === 0, "src/ に innerHTML・outerHTML・insertAdjacentHTML・document.write などが無い", found.join(", ") || "なし");
}

const app = await launchExtension(DIST);
const { send, evalIn, tryEval, waitUntil, key } = app;
const ext = `chrome-extension://${app.extId}`;
const json = async (expression) => JSON.parse((await tryEval(`JSON.stringify(${expression})`)) ?? "null");
const errorsSince = (since) => app.events.slice(since).filter((e) => e.method === "Runtime.exceptionThrown" ||
  (e.method === "Runtime.consoleAPICalled" && e.params.type === "error"))
  .map((e) => String(e.params.exceptionDetails?.exception?.description ?? e.params.exceptionDetails?.text ?? e.params.args?.[0]?.value ?? "").slice(0, 120));
const warningsSince = (since) => app.events.slice(since).filter((e) => e.method === "Runtime.consoleAPICalled" && ["warning", "warn"].includes(e.params.type))
  .map((e) => String(e.params.args?.map((a) => a.value ?? a.description ?? "").join(" ")).slice(0, 160));
const gotoManifest = async () => {
  await send("Page.navigate", { url: `${ext}/manifest.json` }, app.sessionId);
  await waitUntil("document.readyState === 'complete' && !!globalThis.chrome?.storage?.local", 20_000, 100);
};
const openApp = async (query = "debug=1") => {
  const since = app.events.length;
  await send("Page.navigate", { url: `${ext}/index.html?${query}` }, app.sessionId);
  const ready = await waitUntil(`document.body.dataset.phase === 'ready' && (${b}?.layout()?.stars.length ?? 0) > 0`, 180_000, 300);
  return { ready, since };
};

try {
  const first = await waitUntil(`document.body.dataset.phase === 'ready'`, 300_000, 500);
  check(first, "埋め込みが終わって星が並ぶ（サンプル）");
  const sampleIds = await json(`${b}.state.items.slice(0, 4).map((i) => i.id)`);

  // --- 2. 形の違う星座の行が IndexedDB にあっても起動する ---
  await gotoManifest();
  await evalIn(`new Promise((resolve, reject) => {
    const req = indexedDB.open('bukusupe-sample-ja');
    req.onerror = () => reject(req.error);
    req.onsuccess = () => {
      const db = req.result;
      const tx = db.transaction('constellations', 'readwrite');
      const store = tx.objectStore('constellations');
      store.put({ id: 'ok-1', name: '正しい星座', source: 'search', query: '宇宙を感じたい', pinned: [], excluded: [],
        lastMembers: ${JSON.stringify(sampleIds)}, createdAt: Date.now() });
      store.put({ id: 'bad-1', name: { html: '<b>x</b>' }, lastMembers: 'abc' });
      store.put({ id: 'bad-2' });
      store.put({ id: 'bad-3', name: '壊れた星座', source: 'search', query: 'x', pinned: null, excluded: [], lastMembers: [1, {}, null], createdAt: 'yesterday' });
      store.put({ id: 42, name: 'id が数値', lastMembers: [] });
      tx.oncomplete = () => { db.close(); resolve(true); };
      tx.onerror = () => reject(tx.error);
    };
  })`);
  const withBad = await openApp();
  await sleep(1500);
  const list = await json(`[...document.querySelectorAll('#constellation-list button')].map((x) => x.textContent).filter((t) => t !== '…')`);
  const skipped = warningsSince(withBad.since).filter((w) => /星座/.test(w));
  check(withBad.ready && list?.length === 1 && list[0] === "正しい星座" && errorsSince(withBad.since).length === 0 && skipped.length > 0,
    "形の違う星座の行が IndexedDB にあっても正常に起動し、残りの星座が表示される（読み飛ばしたことを警告に残す）",
    `準備 ${withBad.ready ? "完了" : "未完"}・一覧 ${JSON.stringify(list)}・例外 ${errorsSince(withBad.since).length} 件・警告 ${skipped.length} 件`);
  // 片付け：確認用の星座の行を消しておく
  await gotoManifest();
  await evalIn(`new Promise((resolve) => { const req = indexedDB.open('bukusupe-sample-ja'); req.onsuccess = () => {
    const tx = req.result.transaction('constellations', 'readwrite'); tx.objectStore('constellations').clear();
    tx.oncomplete = () => { req.result.close(); resolve(true); }; }; })`);

  // --- 3・5・6 の確認用のブックマーク（注入） ---
  const sample = JSON.parse(readFileSync(join(ROOT, "src/data/sample-bookmarks.json"), "utf8")).slice(0, 30);
  const special = [
    { id: "sp-js", title: "とくべつな星 xyzzyjs", url: "javascript:window.__jsurl=1", folderPath: ["特殊"] },
    { id: "sp-data", title: "とくべつな星 xyzzydata", url: "data:text/html,<script>window.__dataurl=1</script>", folderPath: ["特殊"] },
    { id: "sp-file", title: "とくべつな星 xyzzyfile", url: "file:///etc/hosts", folderPath: ["特殊"] },
    { id: "sp-chrome", title: "とくべつな星 xyzzychrome", url: "chrome://settings/", folderPath: ["特殊"] },
  ];
  const rtl = { id: "rtl-1", title: "‮moc.elgoog//:sptth", url: "https://evil.example/phish", folderPath: ["‮redlof"] };
  const long = { id: "long-1", title: "長い".repeat(500), url: "https://example.com/very-long-title", folderPath: ["長い".repeat(200)] };
  const html = { id: "xss-1", title: '<img src=x onerror="window.__xss=1">宇宙の写真 xyzzyhtml', url: "https://example.com/xss",
    folderPath: ['<img src=x onerror="window.__xss=2">フォルダ'] };
  await gotoManifest();
  await evalIn(`chrome.storage.local.set({ "bench:safety": ${JSON.stringify([...sample, ...special, rtl, long, html])} })`);
  const injected = await openApp("debug=1&bench=safety");
  check(injected.ready, "確認用のブックマークを注入して開ける");

  // --- 3. 特殊な URL を開かない ---
  const stub = `(() => {
    window.__calls = [];
    chrome.tabs.update = (...args) => { window.__calls.push(['update', String(args.at(-1)?.url)]); return Promise.resolve({}); };
    chrome.tabs.create = (options) => { window.__calls.push(['create', String(options?.url)]); return Promise.resolve({}); };
    window.open = (url) => { window.__calls.push(['window.open', String(url)]); return null; };
  })()`;
  await evalIn(stub);
  const navBefore = app.events.length;
  const becameStars = await json(`${b}.state.items.filter((i) => ${JSON.stringify(special.map((s) => s.id))}.includes(i.id)).map((i) => i.id)`);
  const tried = [];
  for (const sp of special) {
    if (!becameStars.includes(sp.id)) continue;
    // 星のカードの「開く」（同じタブ・Ctrl で新しいタブ）
    await evalIn(`${b}.toggleEditMember(${JSON.stringify(sp.id)})`);
    await evalIn(`document.getElementById('star-card-open').click()`);
    await evalIn(`document.getElementById('star-card-open').dispatchEvent(new MouseEvent('click', { ctrlKey: true, bubbles: true }))`);
    // 検索して Enter
    const top = await evalIn(`(async () => (await ${b}.searchNow(${JSON.stringify(sp.title.split(" ")[1])}))[0]?.id ?? null)()`);
    if (top === sp.id) await evalIn("document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))");
    await evalIn("(() => { const i = document.getElementById('search-input'); i.value = ''; i.dispatchEvent(new Event('input')); i.blur(); })()");
    // 飛行中に星の芯へ入る
    await evalIn(`${b}.enterFlight()`);
    await waitUntil(`${b}.flightState().phase === 'flying'`, 8000, 100);
    await evalIn(`${b}.flightTeleport(${JSON.stringify(sp.id)}, 24)`);
    await key("keydown", "KeyW", "w");
    await sleep(1600);
    await key("keyup", "KeyW", "w");
    await evalIn(`${b}.exitFlight()`);
    await waitUntil(`${b}.flightState().phase === 'idle'`, 8000, 100);
    tried.push(sp.id);
  }
  // ページを開く関数そのもの（どの経路もここを通る）
  const hasOpen = await evalIn(`typeof ${b}.openUrl === 'function'`);
  if (hasOpen) {
    for (const sp of special) {
      await evalIn(`${b}.openUrl(${JSON.stringify(sp.url)}, false)`);
      await evalIn(`${b}.openUrl(${JSON.stringify(sp.url)}, true)`);
    }
    await evalIn(`${b}.openUrl('https://example.com/ok', true)`);   // http(s) は開く（関数が働いていることの確かめ）
  }
  await sleep(500);
  const calls = await json("window.__calls ?? []");
  const moved = app.events.slice(navBefore).filter((e) => e.method === "Page.frameNavigated" && !e.params.frame.parentId);
  const badCalls = (calls ?? []).filter(([, url]) => !/^https?:/.test(url));
  const okCall = (calls ?? []).some(([kind, url]) => kind === "create" && url === "https://example.com/ok");
  check(hasOpen && okCall && badCalls.length === 0 && moved.length === 0 && (await tryEval("window.__jsurl ?? null")) === null,
    "javascript:・data:・file:・chrome: の星は、「開く」・Enter・星への突入・ページを開く関数のどれでも開かない（http(s) は開く）",
    `星になった ${becameStars.length} 件（試した経路 ${tried.length} 件）・開こうとした特殊な URL ${badCalls.length} 回・ページの移動 ${moved.length} 回・` +
    `開く関数 ${hasOpen ? "あり" : "なし"}・https は ${okCall ? "開く" : "開かない"}`);

  // --- 5. 右から左へ書く制御文字 ---
  await evalIn(stub);
  await evalIn(`${b}.toggleEditMember('rtl-1')`);
  await sleep(300);
  const bidi = await json(`(() => {
    const probe = (tag, cls, parent = document.body) => { const el = document.createElement(tag); if (cls) el.className = cls; parent.appendChild(el);
      const v = getComputedStyle(el).unicodeBidi; el.remove(); return v; };
    const card = document.getElementById('star-card');
    return {
      cardTitle: getComputedStyle(document.getElementById('star-card-title')).unicodeBidi,
      cardFolder: getComputedStyle(document.getElementById('star-card-folder')).unicodeBidi,
      cardUrl: getComputedStyle(document.getElementById('star-card-url')).unicodeBidi,
      label: probe('div', 'label label-star', document.getElementById('labels')),
      clusterLabel: probe('div', 'label label-cluster', document.getElementById('labels')),
      windowTitle: probe('div', 'flight-window-title', document.getElementById('flight-windows')),
      farLabel: probe('div', 'flight-far-label', document.getElementById('flight-far-labels')),
      sign: probe('div', 'flight-sign', document.getElementById('flight-signs')),
      constellationName: getComputedStyle(document.getElementById('constellation-name')).unicodeBidi,
      constellationButton: probe('button', '', document.getElementById('constellation-list')),
      urlText: document.getElementById('star-card-url').textContent,
      urlVisible: (() => { const r = document.getElementById('star-card-url').getBoundingClientRect(); return r.height > 0 && r.top >= 0 && r.bottom <= innerHeight; })(),
      shown: !card.hidden,
    };
  })()`);
  const isolated = bidi && ["cardTitle", "cardFolder", "cardUrl", "label", "clusterLabel", "windowTitle", "farLabel", "sign", "constellationName", "constellationButton"]
    .every((k) => /^isolate/.test(bidi[k]));
  check(bidi?.shown && isolated && bidi.urlVisible && bidi.urlText.startsWith("https://evil.example"),
    "右から左へ書く制御文字を含むタイトルでも、表示の要素が書字の向きを周りと区切り、カードに本当のドメインが読める形で表示される",
    bidi ? `区切り ${isolated ? "すべて" : JSON.stringify(Object.fromEntries(Object.entries(bidi).filter(([k, v]) => typeof v === "string" && k !== "urlText")))}・URL「${bidi.urlText.slice(0, 40)}」` : "測れない");

  // --- 6. 1,000 文字のタイトル ---
  await evalIn(`${b}.toggleEditMember('long-1')`);
  await sleep(300);
  const card = await json(`(() => { const r = document.getElementById('star-card').getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, vw: innerWidth, vh: innerHeight, full: document.getElementById('star-card-title').title?.length ?? 0 }; })()`);
  await evalIn("document.getElementById('star-card').hidden = true");
  await evalIn(`(async () => { await ${b}.searchNow('長い長い長い'); })()`);
  await sleep(2500);
  const labelBox = async () => json(`(() => { const el = [...document.querySelectorAll('.label-star')].find((x) => x.dataset.key === 'long-1' && x.style.opacity !== '0');
    if (!el) return null; const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, width: r.width, vw: innerWidth }; })()`);
  const searchLabel = await labelBox();
  await evalIn("(() => { const i = document.getElementById('search-input'); i.value = ''; i.dispatchEvent(new Event('input')); i.blur(); })()");
  await sleep(1200);
  // 地図（近距離）のラベル：その星の星団へ寄る
  const clusterOfLong = await evalIn(`${b}.layout().stars.find((s) => s.id === 'long-1')?.cluster ?? 0`);
  await tryEval(`${b}.focusCluster?.(${clusterOfLong})`);
  await evalIn(`${b}.setZoomTier('near')`);
  await sleep(2500);
  // その星にマウスを乗せて、地図のラベルを必ず出す（マウスを乗せたときの全文の表示も、はみ出さないこと）
  const at = await json(`${b}.starScreen('long-1')`);
  if (at) await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: Math.round(at.x), y: Math.round(at.y) }, app.sessionId);
  await sleep(1500);
  const mapLabel = await labelBox();
  const inside = (box) => box && box.left >= -1 && box.right <= box.vw + 1;
  check(card && card.top >= 0 && card.bottom <= card.vh && card.right <= card.vw && searchLabel && inside(searchLabel) && mapLabel && inside(mapLabel),
    "1,000 文字のタイトルでも、地図のラベル（検索中を含む）とカードが画面からはみ出さない",
    `カード 上 ${card?.top?.toFixed(0)}・下 ${card?.bottom?.toFixed(0)}（画面の高さ ${card?.vh}）・検索中のラベルの幅 ${searchLabel?.width?.toFixed(0) ?? "表示なし"}・` +
    `地図のラベルの幅 ${mapLabel?.width?.toFixed(0) ?? "表示なし"}（画面の幅 ${card?.vw}）`);

  // --- 7. HTML を含むタイトル・フォルダ名は、どこでも文字として表示される ---
  const injectedNow = () => json(`{ elements: document.querySelectorAll('img[src="x"]').length, xss: window.__xss ?? null }`);
  await evalIn(`(async () => { await ${b}.searchNow('xyzzyhtml'); })()`);
  await sleep(2000);
  const inSearch = await json(`[...document.querySelectorAll('.label-star')].some((el) => el.dataset.key === 'xss-1' && el.textContent.includes('<img'))`);
  await evalIn("(() => { const i = document.getElementById('search-input'); i.value = ''; i.dispatchEvent(new Event('input')); i.blur(); })()");
  await evalIn(`${b}.toggleEditMember('xss-1')`);
  await sleep(300);
  const inCard = await json(`document.getElementById('star-card-title').textContent.includes('<img') && document.getElementById('star-card-folder').textContent.includes('<img')`);
  await evalIn("document.getElementById('star-card').hidden = true");
  await evalIn(`${b}.enterFlight()`);
  await waitUntil(`${b}.flightState().phase === 'flying'`, 8000, 100);
  await evalIn(`${b}.flightTeleport('xss-1', 12)`);
  await sleep(1500);
  const inWindow = await json(`[...document.querySelectorAll('.flight-window')].some((el) => el.dataset.key === 'xss-1' && el.textContent.includes('<img'))`);
  await evalIn(`${b}.exitFlight()`);
  await waitUntil(`${b}.flightState().phase === 'idle'`, 8000, 100);
  const after = await injectedNow();
  check(inSearch && inCard && inWindow && after?.elements === 0 && after.xss === null,
    "タイトル・フォルダ名の HTML は、検索中のタイトル・カード・飛行中の窓で文字として表示され、スクリプトが動かない",
    `検索中 ${inSearch ? "文字" : "見つからない"}・カード ${inCard ? "文字" : "見つからない"}・飛行中の窓 ${inWindow ? "文字" : "見つからない"}・` +
    `差し込まれた要素 ${after?.elements ?? "?"}・検知用の値 ${after?.xss ?? "書き換わらない"}`);

  // --- 4. 「戻る」用の保存状態が壊れていても、いつもどおり開く ---
  await openApp();
  const info = (await json(`${b}.returnStateInfo?.() ?? null`)) ?? { key: "bukusupe:return-state-v1", version: undefined };
  const withVersion = (value) => (info.version === undefined ? value : { version: info.version, ...value });
  const cases = {
    "数値でない値": withVersion({ source: "sample", flying: true, ship: { x: "a", y: null, z: {}, yaw: "b", pitch: 1e308, speed: -1 },
      camera: { x: "NaN", y: 1e309, distance: -5, tilt: 99 }, query: 12345, constellationId: { a: 1 } }),
    "形の違う値": withVersion({ source: "sample", flying: "yes", ship: [], camera: [], query: null, constellationId: null }),
    "壊れた JSON": "{not json",
    "20 万文字の検索語": withVersion({ source: "sample", flying: false, ship: null, camera: { x: 0, y: 0, distance: 90, tilt: 0.7 }, query: "宇".repeat(200_000), constellationId: null }),
    "版の違う値": { version: 999, source: "sample", flying: false, ship: null, camera: { x: 1, y: 1, distance: 90, tilt: 0.5 }, query: "宇宙", constellationId: null },
  };
  const results = [];
  for (const [label, value] of Object.entries(cases)) {
    const raw = typeof value === "string" ? value : JSON.stringify(value);
    await evalIn(`sessionStorage.setItem(${JSON.stringify(info.key)}, ${JSON.stringify(raw)})`);
    await send("Page.navigate", { url: "about:blank" }, app.sessionId);
    await sleep(600);
    const since = app.events.length;
    await tryEval("history.back()");
    const ready = await waitUntil(`document.body.dataset.phase === 'ready' && (${b}?.layout()?.stars.length ?? 0) > 0`, 60_000, 300);
    await sleep(1200);
    const st = await json(`{ cam: ${b}.cameraState(), ship: ${b}.flightState().ship, flying: ${b}.flightState().active }`);
    const finite = st && [st.cam.x, st.cam.y, st.cam.distance].every(Number.isFinite) && st.cam.distance > 0 &&
      [st.ship.x, st.ship.y, st.ship.z, st.ship.yaw, st.ship.pitch].every(Number.isFinite);
    const errs = errorsSince(since);
    results.push({ label, ok: ready && finite && errs.length === 0, text: `${label}：準備 ${ready ? "完了" : "未完"}・カメラ ${finite ? "有限" : "NaN など"}・例外 ${errs.length}` });
    if (st?.flying) { await evalIn(`${b}.exitFlight()`).catch(() => {}); await sleep(1500); }
  }
  check(results.every((r) => r.ok), "「戻る」用の保存状態が壊れていても、いつもどおり準備完了になり、カメラの位置と距離が有限で、例外が出ない",
    results.map((r) => r.text).join("／"));
} catch (err) {
  console.error(err);
  problems.push(String(err));
} finally {
  await app.close();
}
console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
