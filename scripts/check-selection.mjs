/**
 * 選択モードの確認（SPEC 9 章「作る流れ（選択モード）」）。
 *   node scripts/check-selection.mjs   （check:ext の中で動く。確認用のビルド dist-debug/ を使う。サンプルのデータ源）
 *
 *  1. C キー・「選択」ボタンで入り、同じ操作か Esc で抜ける
 *  2. 検索中の「星座にする」から入ると、検索で引き寄せた上位（最大 12）が選ばれている
 *  3. 検索結果に入っていない遠くの星を選び、検索を消し、星団名のクリックで移動してさらに選び、W キーで動かし、拡大縮小しても、選んだ星が残る
 *     （星の選択は本物の入力：CDP のマウスのクリック。キーはページ内の KeyboardEvent）。選んだ星のタイトルが優先して出る
 *  4. Shift＋ドラッグで、四角の範囲の中の星がまとめて選ばれ、その間に画面が動かない（Shift による拡大もしない）
 *  5. 選択モード中も、画面を動かしている間 1 秒あたり 60 コマを保つ
 *  6. 選択モード中も、星のタイトル・星のダブルクリックでそのページを開き、選んだ状態は変わらない（1 回目と 2 回目のクリックで元に戻る）。
 *     ページを同じタブで開いて「戻る」で戻ると、選択モードで同じ星を選んだ状態から再開する（ダブルクリックは本物のマウスの入力）
 *  7. 「新しい星座にする」「既存の星座に加える」「星座から外す」がメンバーに反映され、再読み込みの後も残る。検索中に作ると検索語が残る
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createChecker, launchExtension, sleep } from "./lib/harness.mjs";

const DIST = resolve(process.argv[2] ?? "dist-debug");
const b = "globalThis.__bukusupe";
const { check, problems } = createChecker();
const app = await launchExtension(DIST, { query: "sample=1&debug=1" });
const { send, evalIn, tryEval, waitUntil } = app;
const json = async (expr) => JSON.parse((await tryEval(`JSON.stringify(${expr})`)) ?? "null");
const selection = () => json(`${b}.selectionState?.() ?? null`);
const sameSet = (a, c) => !!a && !!c && a.length === c.length && a.every((x) => c.includes(x));
const key = (type, code, keyName) => evalIn(`window.dispatchEvent(new KeyboardEvent(${JSON.stringify(type)},
  { code: ${JSON.stringify(code)}, key: ${JSON.stringify(keyName)}, bubbles: true }))`);
const press = async (code, keyName) => { await key("keydown", code, keyName); await key("keyup", code, keyName); };
const mouse = (type, x, y, extra = {}) => send("Input.dispatchMouseEvent", { type, x, y, button: "left", ...extra }, app.sessionId);
/** 画面上の位置をダブルクリックする（本物のマウスの入力。click・click・dblclick の順に届く） */
async function doubleClickAt(p) {
  await mouse("mouseMoved", p.x, p.y, { button: "none" });
  for (const clickCount of [1, 2]) {
    await mouse("mousePressed", p.x, p.y, { buttons: 1, clickCount });
    await mouse("mouseReleased", p.x, p.y, { buttons: 0, clickCount });
  }
}
/** 画面上の位置をクリックする（本物のマウスの入力） */
async function clickAt(p) {
  await mouse("mouseMoved", p.x, p.y, { button: "none" });
  await mouse("mousePressed", p.x, p.y, { buttons: 1, clickCount: 1 });
  await mouse("mouseReleased", p.x, p.y, { buttons: 0, clickCount: 1 });
  await sleep(250);
}
const screenOf = (id) => json(`${b}.starScreen(${JSON.stringify(id)})`);
const onScreen = (p) => p && p.x > 40 && p.x < 1240 && p.y > 110 && p.y < 560;
async function clearSearch() {
  await evalIn("(() => { const i = document.getElementById('search-input'); i.value = ''; i.dispatchEvent(new Event('input')); i.blur(); })()");
  await sleep(900);
}

try {
  await waitUntil(`document.body.dataset.phase === 'ready'`, 300_000, 500);
  await evalIn(`${b}.resetCamera()`);
  await sleep(800);
  const layout = await json(`${b}.layout()`);

  // --- 1. 入り方・抜け方 ---
  await press("KeyC", "c");
  const byKey = await selection();
  await press("KeyC", "c");
  const byKeyOff = await selection();
  await evalIn("document.getElementById('select-toggle')?.click()");
  const byButton = await selection();
  await press("Escape", "Escape");
  const byEsc = await selection();
  check(byKey?.active === true && byKeyOff?.active === false && byButton?.active === true && byEsc?.active === false,
    "C キーと「選択」ボタンで選択モードに入り、同じ操作か Esc で抜ける",
    `C ${byKey?.active}→${byKeyOff?.active}・ボタン ${byButton?.active}・Esc ${byEsc?.active}`);

  // --- 2. 検索中の「星座にする」から入る ---
  await evalIn(`${b}.searchNow('宇宙を感じたい')`);
  await sleep(900);
  const hitIds = (await json(`${b}.searchState().ids`)) ?? [];
  await evalIn("document.getElementById('constellation-create').click()");
  await sleep(300);
  const fromSearch = await selection();
  const selectAllShown = await evalIn("(() => { const el = document.getElementById('select-all'); return !!el && !el.hidden && el.getClientRects().length > 0; })()");
  check(hitIds.length >= 3 && fromSearch?.active && sameSet(fromSearch.ids, hitIds.slice(0, 12)) && selectAllShown,
    "検索中の「星座にする」から入ると、検索で引き寄せた上位が選ばれ、「結果をすべて選ぶ」が出る",
    `引き寄せた星 ${hitIds.length}・選ばれた星 ${fromSearch?.ids?.length ?? "なし"}（期待 ${Math.min(12, hitIds.length)}）・すべて選ぶ ${selectAllShown ? "あり" : "なし"}`);
  await evalIn("document.getElementById('select-all')?.click()");
  await sleep(200);
  const allSelected = await selection();
  check(sameSet(allSelected?.ids, hitIds), "「結果をすべて選ぶ」で、引き寄せた星がすべて選ばれる",
    `${allSelected?.ids?.length ?? 0} / ${hitIds.length}`);
  await evalIn("document.getElementById('selection-clear')?.click()");
  await sleep(200);
  const cleared = await selection();
  check(cleared?.active === true && cleared.ids.length === 0, "「選択を解除」で選んだ星が外れ、選択モードは続く", `${cleared?.ids?.length ?? "なし"} 星`);

  // --- 3. 遠くの星を選び、移動しても残る ---
  const hitClusters = new Set(layout.stars.filter((s) => hitIds.includes(s.id)).map((s) => s.cluster));
  let far = null;
  for (const s of layout.stars) {
    if (hitIds.includes(s.id) || hitClusters.has(s.cluster)) continue;
    const p = await screenOf(s.id);
    if (onScreen(p)) { far = { ...s, p }; break; }
  }
  if (far) await clickAt(far.p);
  const afterFar = await selection();
  await clearSearch();
  const afterClear = await selection();
  const cameraBefore = await json(`${b}.cameraState()`);
  // 画面に出ている星団名から、遠くの星とも検索結果とも違う星団を選んで押す（検索を消した後、カメラが止まって星団名が出るのを待つ）
  await waitUntil(`document.querySelectorAll('.label-cluster').length > 0`, 8000, 200);
  await sleep(300);
  const shownClusters = (await json(`[...document.querySelectorAll('.label-cluster')]
    .filter((el) => el.style.display !== 'none' && el.style.opacity !== '0').map((el) => Number(el.dataset.cluster))`)) ?? [];
  const otherIndex = shownClusters.find((c) => c !== far?.cluster && !hitClusters.has(c)) ??
    shownClusters.find((c) => c !== far?.cluster);
  const otherCluster = layout.clusters.find((c) => c.index === otherIndex);
  const clusterLabel = await evalIn(`(() => { const el = document.querySelector('.label-cluster[data-cluster="${otherIndex}"]');
    if (!el) return false; el.click(); return true; })()`);
  await sleep(1400);
  const cameraAfter = await json(`${b}.cameraState()`);
  const moved = cameraBefore && cameraAfter && Math.hypot(cameraAfter.x - cameraBefore.x, cameraAfter.y - cameraBefore.y) > 1;
  let near = null;
  for (const s of layout.stars.filter((s) => s.cluster === otherCluster?.index)) {
    const p = await screenOf(s.id);
    if (onScreen(p)) { near = { ...s, p }; break; }
  }
  if (near) await clickAt(near.p);
  // W キーで動かし、ホイールで拡大縮小する
  await key("keydown", "KeyW", "w");
  await sleep(500);
  await key("keyup", "KeyW", "w");
  await mouse("mouseWheel", 640, 400, { button: "none", deltaX: 0, deltaY: -300 });
  await sleep(500);
  await mouse("mouseWheel", 640, 400, { button: "none", deltaX: 0, deltaY: 300 });
  await sleep(900);
  const kept = await selection();
  const rings = (await json(`${b}.selectionRings?.() ?? null`)) ?? [];
  check(!!far && afterFar?.ids.includes(far.id) && afterClear?.ids.includes(far.id) && clusterLabel && moved && !!near &&
    kept?.ids.includes(far.id) && kept.ids.includes(near.id) && rings.includes(far.id) && rings.includes(near.id),
    "検索結果に入っていない遠くの星を選び、検索を消し、星団名のクリックで移動してさらに選び、W・拡大縮小で動かしても、選んだ星が残る（金の輪も）",
    `遠くの星 ${far ? "選んだ" : "見つからない"}・星団名 ${clusterLabel ? "押した" : "見つからない"}（${JSON.stringify(cameraBefore)} → ${JSON.stringify(cameraAfter)}）・検索を消した後 ${afterClear?.ids.includes(far?.id) ? "残る" : "消えた"}・星団名で移動 ${moved ? "した" : "しない"}・` +
    `移動先の星 ${near ? "選んだ" : "見つからない"}・残った ${kept?.ids.length ?? 0} 星・輪 ${rings.length}`);
  // 選んだ星のタイトルが優先して出る（画面の中にある選んだ星）
  await sleep(400);
  const labels = await json(`(() => { const ids = ${b}.selectionState().ids;
    const shown = ids.filter((id) => { const p = ${b}.starScreen(id); return p && p.x > 0 && p.x < innerWidth && p.y > 0 && p.y < innerHeight; });
    const els = [...document.querySelectorAll('.label-star')].filter((el) => shown.includes(el.dataset.key) && el.style.opacity !== '0' && el.style.display !== 'none');
    return { shown: shown.length, labelled: els.length, bright: els.filter((el) => Number(el.style.opacity || 1) >= 0.99).length }; })()`);
  check(labels && labels.shown > 0 && labels.labelled === labels.shown && labels.bright === labels.labelled,
    "選んだ星のタイトルが、他より優先して明るく表示される", labels ? `画面の中の選んだ星 ${labels.shown}・タイトル ${labels.labelled}・明るい ${labels.bright}` : "測れない");

  // --- 4. Shift＋ドラッグ ---
  await evalIn(`${b}.resetCamera()`);
  await sleep(1000);
  const before = await selection();
  // まだ選んでいない星が 3 つ以上入る四角を、画面の中の星から探す
  const all = [];
  for (const s of layout.stars) {
    const p = await screenOf(s.id);
    if (p) all.push({ id: s.id, cluster: s.cluster, ...p });
  }
  const screens = all.filter(onScreen);
  let rect = null;
  for (const c of layout.clusters) {
    const inCluster = screens.filter((s) => s.cluster === c.index && !before.ids.includes(s.id));
    if (inCluster.length < 3) continue;
    const xs = inCluster.map((s) => s.x), ys = inCluster.map((s) => s.y);
    const r = { x0: Math.min(...xs) - 6, y0: Math.min(...ys) - 6, x1: Math.max(...xs) + 6, y1: Math.max(...ys) + 6 };
    if (r.x1 - r.x0 > 20 && r.y1 - r.y0 > 20 && r.x1 - r.x0 < 400 && r.y1 - r.y0 < 300) { rect = r; break; }
  }
  const expected = rect ? all.filter((s) => s.x >= rect.x0 && s.x <= rect.x1 && s.y >= rect.y0 && s.y <= rect.y1).map((s) => s.id) : [];
  const cam0 = await json(`${b}.cameraState()`);
  if (rect) {
    await key("keydown", "ShiftLeft", "Shift");
    await sleep(300);
    await mouse("mouseMoved", rect.x0, rect.y0, { button: "none", modifiers: 8 });
    await mouse("mousePressed", rect.x0, rect.y0, { buttons: 1, clickCount: 1, modifiers: 8 });
    for (let i = 1; i <= 8; i++) {
      await mouse("mouseMoved", rect.x0 + (rect.x1 - rect.x0) * i / 8, rect.y0 + (rect.y1 - rect.y0) * i / 8, { buttons: 1, modifiers: 8 });
      await sleep(40);
    }
    const drawn = await evalIn("(() => { const el = document.getElementById('select-rect'); return !!el && !el.hidden && el.getBoundingClientRect().width > 10; })()");
    await mouse("mouseReleased", rect.x1, rect.y1, { buttons: 0, clickCount: 1, modifiers: 8 });
    await sleep(300);
    await key("keyup", "ShiftLeft", "Shift");
    await sleep(600);
    const cam1 = await json(`${b}.cameraState()`);
    const after = await selection();
    const added = after?.ids.filter((id) => !before.ids.includes(id)) ?? [];
    const still = cam0 && cam1 && Math.hypot(cam1.x - cam0.x, cam1.y - cam0.y) < 0.01 && Math.abs(cam1.distance - cam0.distance) / cam0.distance < 0.001;
    check(expected.length >= 3 && sameSet(added.sort(), expected.filter((id) => !before.ids.includes(id)).sort()) &&
      before.ids.every((id) => after.ids.includes(id)) && still && drawn,
      "Shift＋ドラッグで、四角の範囲の中の星がまとめて選ばれ、その間に画面が動かない（Shift で拡大もしない）",
      `範囲の中 ${expected.length} 星・新たに選ばれた ${added.length} 星・前から選んだ星 ${before.ids.every((id) => after?.ids.includes(id)) ? "残る" : "消えた"}・` +
      `画面 ${still ? "動かない" : `動いた（${JSON.stringify(cam0)} → ${JSON.stringify(cam1)}）`}・四角 ${drawn ? "描いた" : "描かない"}`);
  } else check(false, "Shift＋ドラッグで、四角の範囲の中の星がまとめて選ばれ、その間に画面が動かない", "範囲を作れる星団が見つからない");

  {
    await sleep(500);
    const shot = await send("Page.captureScreenshot", { format: "png" }, app.sessionId);
    writeFileSync("docs/screens/selection.png", Buffer.from(shot.data, "base64"));
    console.log("  画面: docs/screens/selection.png");
  }
  const picked = await selection();
  const pickedClusters = new Set(layout.stars.filter((s) => picked?.ids.includes(s.id)).map((s) => s.cluster));
  check(pickedClusters.size >= 3, "複数の星団から星を選んだ状態になっている（画面を保存）", `${picked?.ids.length ?? 0} 星・${pickedClusters.size} 星団`);

  // --- 5. 選択モード中の描画のなめらかさ ---
  const fps = JSON.parse((await evalIn(`(async () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyD', key: 'd', bubbles: true }));
    await new Promise((r) => setTimeout(r, 300));
    const frames = ${b}.frames;
    let t0 = null, f0 = 0, t1 = 0, f1 = 0;
    await new Promise((resolve) => {
      const step = (ts) => {
        if (t0 === null) { t0 = ts; f0 = frames(); }
        t1 = ts; f1 = frames();
        if (ts - t0 >= 1000) { resolve(); return; }
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyD', key: 'd', bubbles: true }));
    return JSON.stringify({ fps: (f1 - f0) / ((t1 - t0) / 1000), selecting: ${b}.selectionState().active, selected: ${b}.selectionState().ids.length });
  })()`)) ?? "null");
  check(fps && fps.selecting && fps.selected > 0 && fps.fps >= 55, "選択モード中も、画面を動かしている間 1 秒あたり 60 コマを保つ",
    fps ? `${fps.fps.toFixed(0)} コマ/秒（選んだ星 ${fps.selected}）` : "測れない");

  // --- 6. 選択モード中のダブルクリックでページを開き、「戻る」で同じ選択に戻る ---
  {
    const selBefore = (await selection())?.ids ?? [];
    // (a) 星のタイトルのダブルクリック：ページを開く呼び出しだけを受け取り、移動はしない
    const label = await json(`(() => { const sel = ${b}.selectionState().ids;
      const el = [...document.querySelectorAll('.label-star[data-key]')].find((el) => !sel.includes(el.dataset.key) &&
        el.style.display !== 'none' && el.style.opacity !== '0' && Number(el.style.opacity || 1) > 0.3 && (() => {
          const r = el.getBoundingClientRect(); return r.width > 4 && r.left > 0 && r.right < innerWidth && r.top > 60 && r.bottom < innerHeight - 120 &&
            document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) === el; })());
      if (!el) return null; const r = el.getBoundingClientRect();
      return { id: el.dataset.key, x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
    await evalIn(`(() => { window.__origUpdateSel = chrome.tabs.update; window.__openedSel = null;
      chrome.tabs.update = async (_id, args) => { window.__openedSel = { url: args.url, sel: ${b}.selectionState() }; }; })()`);
    if (label) await doubleClickAt(label);
    await sleep(400);
    const labelOpened = await json("window.__openedSel");
    await evalIn("chrome.tabs.update = window.__origUpdateSel");
    const labelUrl = label ? await json(`${b}.state.items.find((item) => item.id === ${JSON.stringify(label.id)})?.url ?? null`) : null;
    const afterLabel = await selection();
    check(!!label && labelOpened?.url === labelUrl && labelOpened?.sel?.active === true && sameSet(labelOpened.sel.ids, selBefore) &&
      afterLabel?.active === true && sameSet(afterLabel.ids, selBefore),
      "選択モード中に星のタイトルをダブルクリックすると、そのページを開き、選んだ星は変わらない（1 回目と 2 回目のクリックで元に戻る）",
      `タイトル ${label ? "見つけた" : "見つからない"}・開いた ${labelOpened?.url ?? "なし"}（期待 ${labelUrl}）・` +
      `開く時点の選択 ${labelOpened?.sel?.ids?.length ?? "?"} / ${selBefore.length}・後の選択 ${afterLabel?.ids?.length ?? "?"}`);

    // (b) 星本体のダブルクリック：同じタブで実際にページへ移り、「戻る」で戻る。移動先は Fetch で手元の空ページに差し替える（外部には通信しない）
    let star = null;
    for (const s of layout.stars) {
      if (selBefore.includes(s.id)) continue;
      const p = await screenOf(s.id);
      if (!onScreen(p)) continue;
      const hit = await json(`(() => { const el = document.elementFromPoint(${p.x}, ${p.y});
        return el?.id === 'space' && ${b}.pickStar?.(${p.x}, ${p.y}) === ${JSON.stringify(s.id)}; })()`);
      if (hit) { star = { id: s.id, ...p }; break; }
    }
    app.onEvent((m) => {
      if (m.method !== "Fetch.requestPaused") return;
      app.send("Fetch.fulfillRequest", { requestId: m.params.requestId, responseCode: 200,
        responseHeaders: [{ name: "Content-Type", value: "text/html; charset=utf-8" }],
        body: Buffer.from("<!doctype html><title>page</title><p>page</p>").toString("base64") }, m.sessionId).catch(() => {});
    });
    await app.send("Fetch.enable", { patterns: [{ urlPattern: "http*://*" }] }, app.sessionId);
    // ページへ移る直前の選択を、確認用にタブの中へ控える（アプリの保存とは別）
    await evalIn(`(() => { const orig = chrome.tabs.update.bind(chrome.tabs);
      chrome.tabs.update = (...args) => { sessionStorage.setItem('test:selection', JSON.stringify(${b}.selectionState())); return orig(...args); }; })()`);
    if (star) await doubleClickAt(star);
    const left = !!star && await waitUntil("location.protocol.startsWith('http')", 8000, 100);
    if (left) await tryEval("history.back()");
    const resumed = left && await waitUntil(`document.body.dataset.phase === 'ready' && !!${b} && ${b}.selectionState().active === true`, 120_000, 300);
    await app.send("Fetch.disable", {}, app.sessionId).catch(() => {});
    await sleep(800);
    const back = await json(`({ saved: JSON.parse(sessionStorage.getItem('test:selection') ?? 'null'), now: ${b}.selectionState(),
      rings: ${b}.selectionRings(), selecting: document.body.classList.contains('is-selecting'),
      bar: !document.getElementById('selection-bar').hidden })`);
    check(!!star && left && resumed && back?.saved?.active === true && sameSet(back.saved.ids, selBefore) &&
      back.now.active === true && sameSet(back.now.ids, selBefore) && sameSet(back.rings, selBefore) && back.selecting && back.bar,
      "選択モードで別の星をダブルクリックしてページを開き、「戻る」で戻ると、選択モードで同じ星が選ばれた状態になっている",
      `星 ${star ? "見つけた" : "見つからない"}・移動 ${left ? "した" : "しない"}・再開 ${resumed ? "した" : "しない"}・` +
      `開く時点の選択 ${back?.saved?.ids?.length ?? "?"} / ${selBefore.length}・戻った後 ${back?.now?.active ? "選択モード" : "選択モードでない"} ` +
      `${back?.now?.ids?.length ?? "?"} 星（同じ ${sameSet(back?.now?.ids, selBefore) ? "はい" : "いいえ"}）・輪 ${back?.rings?.length ?? "?"}・下の操作 ${back?.bar ? "あり" : "なし"}`);
  }

  // --- 7. まとめて行う操作 ---
  const members = (await selection()).ids;
  await evalIn("document.getElementById('selection-new')?.click()");
  await sleep(200);
  const nameOpen = await evalIn("(() => { const el = document.getElementById('constellation-name-input'); return !!el && el.getClientRects().length > 0; })()");
  await evalIn("document.getElementById('constellation-name-input').value = '選んだ星座'");
  await evalIn("document.getElementById('constellation-save').click()");
  await waitUntil(`${b}.constellationState().rows.some((r) => r.name === '選んだ星座')`, 30_000, 200);
  await waitUntil(`${b}.constellationState().animation.phase === 'done' && ${b}.constellationState().active === null`, 15_000, 200);
  const created = await json(`${b}.constellationState().rows.find((r) => r.name === '選んだ星座') ?? null`);
  const afterCreate = await selection();
  check(nameOpen && created && sameSet(created.members, members) && !created.query && created.source === "selection" && afterCreate?.active === false,
    "「新しい星座にする」で、選んだ星がメンバーの星座を保存する（検索していなければ検索語を持たない）。保存すると選択モードを抜ける",
    `名前の入力 ${nameOpen ? "出た" : "出ない"}・メンバー ${created?.members.length ?? 0} / ${members.length}・検索語 ${created?.query ?? "なし"}・${created?.source}`);

  // 既存の星座に加える
  const extra = layout.stars.filter((s) => !created?.members.includes(s.id)).slice(0, 2).map((s) => s.id);
  await press("KeyC", "c");
  for (const id of extra) await evalIn(`${b}.toggleEditMember(${JSON.stringify(id)})`);
  await evalIn("document.getElementById('selection-add')?.click()");
  await sleep(200);
  const targetShown = await evalIn(`!!document.querySelector('#selection-targets [data-id="${created?.id}"]')`);
  await evalIn(`document.querySelector('#selection-targets [data-id="${created?.id}"]')?.click()`);
  await sleep(600);
  const added = await json(`${b}.constellationState().rows.find((r) => r.id === ${JSON.stringify(created?.id)}) ?? null`);
  const addedGeometry = await json(`${b}.constellationState().geometry.find((g) => g.id === ${JSON.stringify(created?.id)}) ?? null`);
  check(targetShown && added && extra.every((id) => added.members.includes(id)) && added.members.length === (created?.members.length ?? 0) + 2 &&
    sameSet(addedGeometry?.members, added.members),
    "「既存の星座に加える」で、一覧から選んだ星座のメンバーに、選んだ星が加わる（線も結び直す）",
    `一覧 ${targetShown ? "あり" : "なし"}・${created?.members.length ?? 0} → ${added?.members.length ?? 0} 星`);

  // 星座から外す（その星座を選んでいる状態で）
  const active = await evalIn(`${b}.constellationState().active`);
  if (active !== created?.id) await evalIn(`${b}.recallConstellation(${JSON.stringify(created?.id)})`);
  await sleep(300);
  const sel = await selection();
  for (const id of sel?.ids ?? []) await evalIn(`${b}.toggleEditMember(${JSON.stringify(id)})`);
  const drop = [extra[0], created?.members[0]];
  for (const id of drop) await evalIn(`${b}.toggleEditMember(${JSON.stringify(id)})`);
  const removeEnabled = await evalIn("(() => { const el = document.getElementById('selection-remove'); return !!el && !el.disabled && !el.hidden; })()");
  await evalIn("document.getElementById('selection-remove')?.click()");
  await sleep(600);
  const removed = await json(`${b}.constellationState().rows.find((r) => r.id === ${JSON.stringify(created?.id)}) ?? null`);
  const removedGeometry = await json(`${b}.constellationState().geometry.find((g) => g.id === ${JSON.stringify(created?.id)}) ?? null`);
  check(removeEnabled && removed && drop.every((id) => !removed.members.includes(id) && removed.dismissed.includes(id)) &&
    removed.members.length === (added?.members.length ?? 0) - 2 && sameSet(removedGeometry?.members, removed.members),
    "「星座から外す」で、選んでいる星座から選んだ星が外れる（線も結び直し、新星として出し直さないよう見送りに記録）",
    `ボタン ${removeEnabled ? "使える" : "使えない"}・${added?.members.length ?? 0} → ${removed?.members.length ?? 0} 星`);

  // 検索中に作ると、検索語が残る
  await press("Escape", "Escape");
  await evalIn(`${b}.searchNow('料理のレシピ')`);
  await sleep(900);
  await evalIn("document.getElementById('constellation-create').click()");
  await sleep(200);
  const searchSelected = (await selection())?.ids ?? [];
  await evalIn("document.getElementById('selection-new')?.click()");
  await evalIn("document.getElementById('constellation-name-input').value = '検索から作った星座'");
  await evalIn("document.getElementById('constellation-save').click()");
  await waitUntil(`${b}.constellationState().rows.some((r) => r.name === '検索から作った星座')`, 30_000, 200);
  await waitUntil(`${b}.constellationState().animation.phase === 'done' && ${b}.constellationState().active === null`, 15_000, 200);
  const fromQuery = await json(`${b}.constellationState().rows.find((r) => r.name === '検索から作った星座') ?? null`);
  check(fromQuery && fromQuery.query === "料理のレシピ" && fromQuery.source === "search" && fromQuery.queryVector?.length === 384 &&
    sameSet(fromQuery.members, searchSelected),
    "検索中に「新しい星座にする」で作ると、その検索語と埋め込みを記録として残す",
    `検索語 ${fromQuery?.query ?? "なし"}・${fromQuery?.source}・メンバー ${fromQuery?.members.length ?? 0}`);

  // 再読み込みの後も残る
  await send("Page.reload", {}, app.sessionId);
  await sleep(500);
  await waitUntil(`document.body.dataset.phase === 'ready' && !!${b}`, 120_000, 300);
  await sleep(500);
  const persisted = await json(`${b}.constellationState().rows`);
  const p1 = persisted?.find((r) => r.id === created?.id);
  const p2 = persisted?.find((r) => r.id === fromQuery?.id);
  check(p1 && sameSet(p1.members, removed?.members) && p2 && sameSet(p2.members, fromQuery?.members) && p2.query === "料理のレシピ",
    "「新しい星座にする」「既存の星座に加える」「星座から外す」の結果が、再読み込みの後も残る",
    `選んだ星座 ${p1?.members.length ?? "なし"} 星・検索から作った星座 ${p2?.members.length ?? "なし"} 星`);

  const bad = app.events.filter((e) => e.method === "Runtime.exceptionThrown");
  check(bad.length === 0, "例外が出ない", bad.slice(0, 2).map((e) => e.params?.exceptionDetails?.exception?.description?.split("\n")[0] ?? e.params?.exceptionDetails?.text).join(" / "));
} catch (err) {
  console.error(err);
  problems.push(String(err));
} finally {
  await app.close();
}
console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
