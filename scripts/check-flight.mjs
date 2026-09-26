/**
 * 飛行モード（SPEC 13 章・PLAN 段階 3a）の自動確認。
 *   npm run build && npm run check:flight     （check:ext からも続けて走る）
 *
 * 見ているもの
 *  1. 入力欄に文字を打っているときの F では入らない
 *  2. 地図・星団に寄った状態・星座を選んだ状態・検索中の 4 つから入って出ると、入る前の状態に戻る
 *  3. 飛行中も星の x・y は地図の座標と一致し、z は同じデータなら毎回同じ
 *  4. 星に近づくと、画面上の星が大きくなる
 *  5. 近づいた星に窓が開く（最大 6 個、_favicon のアイコン・タイトル・ドメイン）
 *  6. 星の芯に入ると、新しいタブを開く処理がちょうど 1 回呼ばれ、続けて入っても数秒は開かない
 *  7. 保存済みの星座の線が、立体の位置で結ばれている
 *  8. 2000 件で、飛行中も 60 コマ/秒を保つ
 *  9. スクリーンショット：flight-overview.png / flight-near.png / flight-constellation.png
 *  （参考）favicon の権限でインストール時の警告が増えるか
 *
 * 新しいタブは確認スクリプト側で chrome.tabs.create を差し替えて数える（実際には開かない）。
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createChecker, launchExtension, sleep } from "./lib/harness.mjs";

const DIST = resolve(process.argv[2] ?? "dist");
const { check, problems } = createChecker();
const IGNORE = /GPU stall|GL Driver Message|software WebGL/;
let app = null;

try {
  app = await launchExtension(DIST);
  const { evalIn, tryEval, waitUntil, key, press, screenshot, events } = app;
  console.log("拡張機能 ID:", app.extId);

  const ready = await waitUntil("document.body.dataset.phase === 'ready'", 300_000, 2000);
  check(ready, "埋め込みが終わって星が並ぶ");
  await sleep(1500);

  const b = "globalThis.__bukusupe";
  const json = async (expression) => JSON.parse((await evalIn(`JSON.stringify(${expression})`)) ?? "null");
  const flight = () => json(`${b}.flightState?.() ?? null`);
  const waitFlight = (active) => waitUntil(
    `(() => { const f = ${b}.flightState?.(); return !!f && f.active === ${active} && !f.transitioning; })()`, 6000, 100);
  /** 宇宙船を星の前に置く（確認用）。まだ無い段階では失敗として続ける */
  const teleport = (id, distance) => tryEval(`${b}.flightTeleport(${JSON.stringify(id)}, ${distance})`);
  const snapshot = () => json(`{
    camera: ${b}.cameraState(),
    search: ${b}.searchState().ids,
    input: document.getElementById('search-input').value,
    active: ${b}.constellationState().active,
    lines: ${b}.constellationState().geometry.map((g) => g.opacity),
  }`);
  const sameState = (a, z) => a && z &&
    Math.hypot(a.camera.x - z.camera.x, a.camera.y - z.camera.y) < 0.5 &&
    Math.abs(a.camera.distance - z.camera.distance) / a.camera.distance < 0.02 &&
    JSON.stringify(a.search) === JSON.stringify(z.search) && a.input === z.input &&
    a.active === z.active && JSON.stringify(a.lines) === JSON.stringify(z.lines);
  const describe = (a, z) => a && z
    ? `カメラ (${a.camera.x.toFixed(1)}, ${a.camera.y.toFixed(1)}, ${a.camera.distance.toFixed(0)})→(${z.camera.x.toFixed(1)}, ${z.camera.y.toFixed(1)}, ${z.camera.distance.toFixed(0)})・検索 ${a.search.length}→${z.search.length} 件・星座 ${a.active ? "選択" : "なし"}→${z.active ? "選択" : "なし"}`
    : "測れない";
  /** 入って、出て、入る前と同じ状態に戻るか。via は "F" か "button" */
  const roundTrip = async (via) => {
    const before = await snapshot();
    if (via === "F") await key("keydown", "KeyF", "f");
    else await evalIn("document.getElementById('flight-toggle')?.click()");
    const entered = await waitFlight(true);
    const inFlight = await flight();
    await key("keydown", "Escape", "Escape");
    const left = await waitFlight(false);
    await sleep(900);   // 真上からの地図へ降りる動きと、傾きの戻りを待つ
    const after = await snapshot();
    return { ok: entered && left && inFlight?.lift > 0.99 && sameState(before, after), text: describe(before, after), before, after };
  };

  // --- （参考）favicon の権限でインストール時の警告が増えるか ---
  const warnings = JSON.parse((await app.tryEval(`(async () => {
    if (!chrome.management?.getPermissionWarningsByManifest) return "null";
    const m = chrome.runtime.getManifest();
    const without = { ...m, permissions: (m.permissions ?? []).filter((p) => p !== 'favicon') };
    return JSON.stringify({ hasFavicon: (m.permissions ?? []).includes('favicon'),
      with: await chrome.management.getPermissionWarningsByManifest(JSON.stringify(m)),
      without: await chrome.management.getPermissionWarningsByManifest(JSON.stringify(without)) });
  })()`)) ?? "null");
  console.log("  （参考）インストール時の警告:", warnings
    ? `favicon の権限 ${warnings.hasFavicon ? "あり" : "なし"}・あり ${JSON.stringify(warnings.with)} / なし ${JSON.stringify(warnings.without)}`
    : "chrome.management が使えない");

  // --- 1. 入力欄に文字を打っているときの F では入らない ---
  await evalIn("document.getElementById('search-input').focus()");
  await key("keydown", "KeyF", "f", "document.getElementById('search-input')");
  await sleep(600);
  const typed = await flight();
  await evalIn("document.getElementById('search-input').blur()");
  check(typed != null && typed.active === false, "入力欄にフォーカスがあるとき、F では飛行モードに入らない",
    typed ? `飛行 ${typed.active ? "入った" : "入らない"}` : "flightState が無い");
  await sleep(700);

  // --- 2a. 地図から（F で入り、Esc で出る）。入った直後の画面も保存する ---
  await evalIn(`${b}.resetCamera()`);
  await sleep(600);
  const beforeMap = await snapshot();
  await key("keydown", "KeyF", "f");
  const enteredMap = await waitFlight(true);
  await sleep(300);
  mkdirSync("docs/screens", { recursive: true });
  if (enteredMap) {
    writeFileSync("docs/screens/flight-overview.png", await screenshot());
    console.log("  画面: docs/screens/flight-overview.png");
  }

  // --- 宇宙船と操作：W で前進、A で左旋回、Space で上昇・Shift で下降、旋回の速さに上限、操作の説明 ---
  const ship0 = (await flight())?.ship;
  await press("KeyW", "w", 900);
  const ship1 = (await flight())?.ship;
  const moved = ship0 && ship1 ? Math.hypot(ship1.x - ship0.x, ship1.y - ship0.y) : 0;
  // 前進は機首の向き（yaw 0 なら地図の上＝+y）へ
  const forwardOk = ship0 && ship1 && ship1.speed > 0 && moved > 0.5 && ship1.y - ship0.y > moved * 0.9;
  await press("KeyS", "s", 1500);   // 止まるまで減速
  await press("KeyA", "a", 700);
  const ship2 = (await flight())?.ship;
  await press("Space", " ", 600);
  const ship3 = (await flight())?.ship;
  await press("ShiftLeft", "Shift", 600);
  const ship4 = (await flight())?.ship;
  // 旋回の上限：マウスを右端に置いたまま D を押し続けても、1 秒あたりの旋回は上限を超えない
  await evalIn("window.dispatchEvent(new MouseEvent('mousemove', { clientX: innerWidth - 1, clientY: innerHeight / 2 }))");
  const yawA = (await flight())?.ship.yaw;
  const tA = Date.now();
  await press("KeyD", "d", 1000);
  const yawB = (await flight())?.ship.yaw;
  const turnRate = yawA != null && yawB != null ? Math.abs(yawB - yawA) / ((Date.now() - tA) / 1000) : NaN;
  await evalIn("window.dispatchEvent(new MouseEvent('mousemove', { clientX: innerWidth / 2, clientY: innerHeight / 2 }))");
  await sleep(600);
  const help = await evalIn(`(() => { const el = document.getElementById('flight-help');
    return el && getComputedStyle(el).display !== 'none' ? el.textContent : ''; })()`);
  const helpOk = ["W", "S", "A", "D", "Space", "Shift", "Esc"].every((k) => help.includes(k)) && help.includes("マウス");
  check(!!forwardOk && ship2 && ship2.yaw > ship1.yaw + 0.2 && ship3 && ship3.z > ship2.z + 0.3 && ship4 && ship4.z < ship3.z - 0.3 &&
    turnRate > 0.3 && turnRate <= 1.5 && helpOk,
  "宇宙船：W で前進、A で左旋回、Space で上昇・Shift で下降、旋回の速さに上限、操作の説明が出ている",
  ship1 ? `前進 ${moved.toFixed(1)}・旋回 ${(ship2?.yaw - ship1.yaw).toFixed(2)} rad・上昇 ${(ship3?.z - ship2?.z).toFixed(1)}・下降 ${(ship4?.z - ship3?.z).toFixed(1)}・旋回の速さ ${turnRate.toFixed(2)} rad/秒・説明 ${helpOk ? "あり" : "なし"}` : "測れない");
  // 位置を入った直後に戻す（以降の確認が入った直後の配置を前提にするため）
  await tryEval(`${b}.flightReset?.()`);

  // --- 3. 飛行中も x・y は地図の座標と一致し、z は同じデータなら毎回同じ ---
  const stars = await json(`${b}.flightStars?.() ?? null`);
  const layout = await json(`${b}.layout()`);
  const heightsA = await json(`${b}.flightHeights?.() ?? null`);
  const heightsB = await json(`${b}.flightHeights?.() ?? null`);
  const home = new Map((layout?.stars ?? []).map((s) => [s.id, s]));
  const heightOf = new Map((heightsA ?? []).map((h) => [h.id, h.z]));
  let xyOff = 0, zOff = 0, zMin = Infinity, zMax = -Infinity;
  for (const s of stars ?? []) {
    const h = home.get(s.id);
    if (!h || Math.abs(h.x - s.x) > 1e-3 || Math.abs(h.y - s.y) > 1e-3) xyOff++;
    if (Math.abs((heightOf.get(s.id) ?? NaN) - s.z) > 1e-3 || Number.isNaN(heightOf.get(s.id))) zOff++;
    zMin = Math.min(zMin, s.z); zMax = Math.max(zMax, s.z);
  }
  check(enteredMap && stars?.length === layout?.stars.length && xyOff === 0 && zOff === 0 &&
    JSON.stringify(heightsA) === JSON.stringify(heightsB) && zMax - zMin > 5,
  "飛行中も星の x・y は地図の座標と一致し、z は同じデータなら毎回同じ",
  stars ? `${stars.length} 星・x・y のずれ ${xyOff}・z のずれ ${zOff}・高さの幅 ${(zMax - zMin).toFixed(1)}` : "flightStars が無い");

  // --- 4. 星に近づくと、画面上の星が大きくなる ---
  // 星団のいちばん外側の星を、星団の外から狙う（途中に他の星が入りにくい）
  const target = layout?.stars.filter((s) => s.cluster === layout.clusters[0].index).sort((p, q) => q.rank - p.rank)[0];
  const sizeAt = async (distance) => {
    await teleport(target.id, distance);
    await sleep(250);
    return tryEval(`${b}.starScreenSize(${JSON.stringify(target.id)})`);
  };
  const size30 = target ? await sizeAt(30).catch(() => null) : null;
  const size3 = target ? await sizeAt(3).catch(() => null) : null;
  check(size30 != null && size3 != null && size3 > size30 * 2,
    "星に近づくと、画面上の星が大きくなる",
    size30 != null && size3 != null ? `距離 30 で ${size30.toFixed(1)}px → 距離 3 で ${size3.toFixed(1)}px` : "測れない");

  // --- 5. 窓：星団の中心の近くで、最大 6 個、_favicon のアイコン・タイトル・ドメイン ---
  const core = layout?.stars.filter((s) => s.cluster === layout.clusters[0].index).sort((p, q) => p.rank - q.rank)[0];
  if (core) await teleport(core.id, 7);
  await sleep(600);
  await waitUntil(`[...document.querySelectorAll('.flight-window img')].every((img) => img.complete)`, 4000, 150);
  await sleep(300);
  const windows = await json(`(() => {
    const near = ${b}.flightState?.()?.nearby ?? 0;
    const list = [...document.querySelectorAll('.flight-window')].filter((el) => el.style.display !== 'none' && el.style.opacity !== '0');
    return { near, count: list.length, items: list.map((el) => {
      const img = el.querySelector('img');
      return { icon: img?.getAttribute('src') ?? '', loaded: !!img && img.complete && img.naturalWidth > 0,
        title: el.querySelector('.flight-window-title')?.textContent ?? '',
        domain: el.querySelector('.flight-window-domain')?.textContent ?? '' };
    }) };
  })()`);
  const goodWindows = (windows?.items ?? []).filter((w) => /\/_favicon\/\?pageUrl=/.test(w.icon) && w.loaded && w.title && w.domain);
  check(windows && windows.count >= 1 && windows.count <= 6 && windows.near > 6 && goodWindows.length === windows.count,
    "近づいた星に窓が開く（最大 6 個、_favicon のアイコン・タイトル・ドメイン）",
    windows ? `範囲内の星 ${windows.near}・窓 ${windows.count} 個・アイコン読み込み済み ${goodWindows.length}` : "測れない");
  if (windows?.count) {
    writeFileSync("docs/screens/flight-near.png", await screenshot());
    console.log("  画面: docs/screens/flight-near.png");
  }

  // --- 6. 星の芯に入ると、新しいタブを開く処理がちょうど 1 回。続けて入っても数秒は開かない ---
  await evalIn(`(() => {
    window.__opened = [];
    chrome.tabs.create = (options) => { window.__opened.push(options.url); return Promise.resolve({ id: -1 }); };
  })()`);
  const targetUrl = await evalIn(`${b}.state.items.find((i) => i.id === ${JSON.stringify(target?.id)})?.url ?? ''`);
  // 1 回目：星を正面に置いて W。開いたらすぐ離す（その後の押し戻しで止まる）
  if (target) await teleport(target.id, 6);
  await key("keydown", "KeyW", "w");
  await waitUntil("window.__opened.length > 0", 4000, 50);
  await key("keyup", "KeyW", "w");
  await sleep(900);
  const firstOpen = await json("window.__opened");
  const afterPush = await flight();
  // 2 回目：同じ星へすぐにもう一度入る。数秒間は同じ星を開かない（奥の別の星に入るのは仕様どおり）
  if (target) await teleport(target.id, 4);
  await press("KeyW", "w", 1300);
  await press("KeyS", "s", 1200);
  const secondOpen = await json("window.__opened");
  const sameAgain = (secondOpen ?? []).filter((url) => url === targetUrl).length;
  check(firstOpen?.length === 1 && firstOpen[0] === targetUrl && sameAgain === 1 && (afterPush?.entryDistance ?? 0) > 2,
    "星の芯に入ると新しいタブを開く処理がちょうど 1 回。押し戻され、同じ星に続けて入っても数秒は開かない",
    `1 回目 ${firstOpen?.length ?? "?"} 回（${firstOpen?.[0] === targetUrl ? "その星" : "別の星"}）・押し戻し後の距離 ${afterPush?.entryDistance?.toFixed?.(1) ?? "?"}・続けて入った後の同じ星 ${sameAgain} 回`);
  // 動いた後に出ると、宇宙船がいた場所の真上から見た地図に、入る前の拡大率で戻る
  const shipAtExit = (await flight())?.ship;
  await key("keydown", "Escape", "Escape");
  await waitFlight(false);
  await sleep(900);
  const afterMap = await snapshot();
  check(enteredMap && !!shipAtExit && !!afterMap && !!beforeMap &&
    Math.hypot(afterMap.camera.x - shipAtExit.x, afterMap.camera.y - shipAtExit.y) < 0.5 &&
    Math.abs(beforeMap.camera.distance - afterMap.camera.distance) / beforeMap.camera.distance < 0.02 &&
    JSON.stringify(beforeMap.search) === JSON.stringify(afterMap.search) && beforeMap.active === afterMap.active,
  "飛んだ後に出ると、宇宙船がいた場所の真上から見た地図に、入る前の拡大率で戻る",
  shipAtExit && afterMap ? `宇宙船 (${shipAtExit.x.toFixed(1)}, ${shipAtExit.y.toFixed(1)}) → 地図の中心 (${afterMap.camera.x.toFixed(1)}, ${afterMap.camera.y.toFixed(1)})・距離 ${beforeMap.camera.distance.toFixed(0)}→${afterMap.camera.distance.toFixed(0)}` : "測れない");

  // --- 2b. 地図から、動かずに出ると元の位置に戻る（F / Esc） ---
  await evalIn(`${b}.resetCamera()`);
  await sleep(500);
  const map = await roundTrip("F");
  check(map.ok, "地図から F で入って Esc で出ると、入る前の状態に戻る", map.text);

  // --- 2c. 星団に寄った状態から ---
  await evalIn(`(() => { const el = [...document.querySelectorAll('.label-cluster-focus')][0]; el?.click(); })()`);
  await sleep(1000);
  const cluster = await roundTrip("F");
  check(cluster.ok && cluster.before.camera.tier !== "far", "星団に寄った状態から入って出ると、入る前の状態に戻る", cluster.text);

  // --- 7. 星座：作って選び、飛行中の線が立体の位置で結ばれているか ---
  await evalIn(`${b}.resetCamera()`);
  await evalIn(`(async () => { await ${b}.searchNow('宇宙を感じたい'); })()`);
  await sleep(700);
  await evalIn("document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', ctrlKey: true, bubbles: true }))");
  await evalIn("document.getElementById('constellation-name-input').value = '飛行の星座'");
  await evalIn("document.getElementById('constellation-save').click()");
  await waitUntil(`${b}.constellationState().rows.length === 1 && ${b}.constellationState().animation.phase === 'done'`, 8000);
  await sleep(1700);
  const constellationId = await evalIn(`${b}.constellationState().rows[0]?.id ?? null`);
  await evalIn(`${b}.recallConstellation(${JSON.stringify(constellationId)})`);
  await sleep(1200);
  const selected = await roundTrip("button");
  check(selected.ok && selected.before.active === constellationId,
    "星座を選んだ状態から（「飛行」ボタンで）入って出ると、入る前の状態に戻る", selected.text);

  await evalIn("document.getElementById('flight-toggle')?.click()");
  await waitFlight(true);
  const segments = await json(`${b}.flightConstellationSegments?.() ?? null`);
  const heights = new Map(((await json(`${b}.flightHeights?.() ?? null`)) ?? []).map((h) => [h.id, h.z]));
  const lifted = (segments ?? []).filter((seg) =>
    Math.abs(seg.az - (heights.get(seg.a) ?? NaN)) < 1e-3 && Math.abs(seg.bz - (heights.get(seg.b) ?? NaN)) < 1e-3);
  check(segments && segments.length > 0 && lifted.length === segments.length &&
    segments.some((seg) => Math.abs(seg.az - seg.bz) > 0.5),
  "保存済みの星座の線が、立体の位置で結ばれている", segments ? `${lifted.length}/${segments.length} 辺が星の高さで結ばれている` : "測れない");
  const member = await evalIn(`${b}.constellationState().rows[0]?.lastMembers[0] ?? null`);
  if (member) await teleport(member, 26);
  await sleep(500);
  if (segments?.length) {
    writeFileSync("docs/screens/flight-constellation.png", await screenshot());
    console.log("  画面: docs/screens/flight-constellation.png");
  }
  await key("keydown", "Escape", "Escape");
  await waitFlight(false);
  await sleep(900);

  // --- 2d. 検索中から（入力欄は使えないので「飛行」ボタンで） ---
  await evalIn(`${b}.recallConstellation(${JSON.stringify(constellationId)})`);   // 選択を解く
  await sleep(400);
  await evalIn(`(async () => { await ${b}.searchNow('パスタ'); })()`);
  await sleep(1500);
  const searching = await roundTrip("button");
  await sleep(1200);
  const orbitBack = await evalIn(`${b}.searchGeometry().stars.length`);
  check(searching.ok && searching.before.search.length > 0 && orbitBack > 0,
    "検索中から入って出ると、入る前の状態（検索語・結果・軌道）に戻る", `${searching.text}・軌道 ${orbitBack} 件`);
  await evalIn("(() => { const i = document.getElementById('search-input'); i.value = ''; i.dispatchEvent(new Event('input')); i.blur(); })()");
  await sleep(800);

  // --- 8. 2000 件で、飛行中も 60 コマ/秒 ---
  await evalIn(`(async () => { await ${b}.benchmark(2000); })()`);
  await sleep(1000);
  await key("keydown", "KeyF", "f");
  await waitFlight(true);
  await key("keydown", "KeyW", "w");
  const f0 = await evalIn(`${b}.frames()`);
  const t0 = Date.now();
  await sleep(1500);
  const fps = ((await evalIn(`${b}.frames()`)) - f0) / ((Date.now() - t0) / 1000);
  await key("keyup", "KeyW", "w");
  check(fps >= 55, "2000 件で、飛行中も 60 コマ/秒を保つ", `${fps.toFixed(0)} コマ/秒`);
  await key("keydown", "Escape", "Escape");
  await waitFlight(false);
  await evalIn(`${b}.restore()`);
  await sleep(500);

  const bad = events.filter((e) =>
    (e.method === "Log.entryAdded" && ["error", "warning"].includes(e.params.entry.level) && !IGNORE.test(e.params.entry.text)) ||
    e.method === "Runtime.exceptionThrown");
  check(bad.length === 0, "エラー・警告が出ない", bad.map((e) => e.params?.entry?.text ?? e.params?.exceptionDetails?.exception?.description ?? e.params?.exceptionDetails?.text).join(" / "));
} catch (err) {
  console.error(err);
  problems.push(String(err));
} finally {
  await app?.close();
}

console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
