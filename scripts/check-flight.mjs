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
 * ページを開く処理は確認スクリプト側で chrome.tabs.update（同じタブ）と chrome.tabs.create（新しいタブ）を差し替えて数える。
 * 「戻る」の確認だけは実際に移動する。移動先は CDP の Fetch で手元の空ページに差し替える（外部には通信しない）。
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createChecker, decodePng, launchExtension, sleep } from "./lib/harness.mjs";

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

  // --- 見え方：最後に触れた日（最終利用日と追加日の新しいほう）で、色と明るさが決まる ---
  const looks = await json(`(() => {
    const f = ${b}.appearanceFor;
    if (!f) return null;
    const now = Date.now(), day = 864e5;
    const recent = f({ id: 'a', dateLastUsed: now - 1 * day, dateAdded: now - 400 * day, rank: 5 });
    const old = f({ id: 'b', dateLastUsed: now - 700 * day, dateAdded: now - 900 * day, rank: 5 });
    const onlyAdded = f({ id: 'c', dateAdded: now - 2 * day, rank: 5 });
    const same1 = f({ id: 'd', dateLastUsed: now - 40 * day, dateAdded: now - 90 * day, rank: 5 });
    const same2 = f({ id: 'another-id', dateLastUsed: now - 40 * day, dateAdded: now - 90 * day, rank: 5 });
    return { recent, old, onlyAdded, same: JSON.stringify(same1) === JSON.stringify(same2) };
  })()`);
  const bluish = (c) => c && c[2] > c[0];
  const warm = (c) => c && c[0] > c[2];
  check(looks && looks.recent.alpha > looks.old.alpha && looks.recent.size >= looks.old.size &&
    bluish(looks.recent.color) && warm(looks.old.color) && bluish(looks.onlyAdded.color),
  "最近触れた星ほど明るく青白く、長く触れていない星ほど暗く橙寄り（追加日も最後に触れた日に数える）",
  looks ? `最近 明るさ ${looks.recent.alpha.toFixed(2)}・色 ${looks.recent.color.map((v) => v.toFixed(2)).join(",")} / 古い 明るさ ${looks.old.alpha.toFixed(2)}・色 ${looks.old.color.map((v) => v.toFixed(2)).join(",")}` : "appearanceFor が無い");
  check(looks?.same === true, "最終利用日も追加日も同じ星なら、同じ見た目になる（id によらない）");
  // 実際のサンプルの星でも：いちばん最近触れた星は、いちばん長く触れていない星より明るい（地図の表示）
  const real = await json(`(() => {
    const items = ${b}.state.items.map((i) => ({ id: i.id, t: Math.max(i.dateLastUsed ?? 0, i.dateAdded ?? 0) })).filter((i) => i.t > 0)
      .sort((p, q) => q.t - p.t);
    const newest = items[0], oldest = items.at(-1);
    return { newest: ${b}.starVisual(newest.id), oldest: ${b}.starVisual(oldest.id) };
  })()`);
  check(real && real.newest.alpha > real.oldest.alpha, "地図でも、最近触れた星は長く触れていない星より明るい",
    real ? `${real.newest.alpha.toFixed(2)} > ${real.oldest.alpha.toFixed(2)}` : "測れない");

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
  // 飛行モードの空間は地図の座標の定数倍（scale）に広げている
  const S = (await flight())?.scale ?? 1;
  const heightsA = await json(`${b}.flightHeights?.() ?? null`);
  const heightsB = await json(`${b}.flightHeights?.() ?? null`);
  const home = new Map((layout?.stars ?? []).map((s) => [s.id, s]));
  const heightOf = new Map((heightsA ?? []).map((h) => [h.id, h.z]));
  let xyOff = 0, zOff = 0, zMin = Infinity, zMax = -Infinity;
  for (const s of stars ?? []) {
    const h = home.get(s.id);
    if (!h || Math.abs(h.x * S - s.x) > 1e-2 || Math.abs(h.y * S - s.y) > 1e-2) xyOff++;
    if (Math.abs((heightOf.get(s.id) ?? NaN) * S - s.z) > 1e-2 || Number.isNaN(heightOf.get(s.id))) zOff++;
    zMin = Math.min(zMin, s.z); zMax = Math.max(zMax, s.z);
  }
  check(enteredMap && S >= 2 && stars?.length === layout?.stars.length && xyOff === 0 && zOff === 0 &&
    JSON.stringify(heightsA) === JSON.stringify(heightsB) && zMax - zMin > 5 * S,
  "飛行中の星の x・y・z は、地図の座標と高さを定数倍（空間を広げる）したものと一致し、同じデータなら毎回同じ",
  stars ? `倍率 ${S}・${stars.length} 星・x・y のずれ ${xyOff}・z のずれ ${zOff}・高さの幅 ${(zMax - zMin).toFixed(1)}` : "flightStars が無い");

  // --- 4. 星に近づくと、画面上の星が大きくなる ---
  // 星団のいちばん外側の星を、星団の外から狙う（途中に他の星が入りにくい）
  const target = layout?.stars.filter((s) => s.cluster === layout.clusters[0].index).sort((p, q) => q.rank - p.rank)[0];
  const sizeAt = async (distance) => {
    await teleport(target.id, distance * S);
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
  if (core) await teleport(core.id, 4 * S);
  await sleep(600);
  await waitUntil(`[...document.querySelectorAll('.flight-window img')].every((img) => img.complete)`, 4000, 150);
  await sleep(300);
  const windows = await json(`(() => {
    const near = ${b}.flightState?.()?.nearby ?? 0;
    const list = [...document.querySelectorAll('.flight-window')].filter((el) => el.style.display !== 'none' && el.style.opacity !== '0');
    return { near, count: list.length, items: list.map((el) => {
      const img = el.querySelector('img');
      const crest = el.querySelector('.flight-window-crest');
      return { icon: img?.getAttribute('src') ?? '', loaded: !!img && img.complete && img.naturalWidth > 0,
        kind: el.dataset.icon ?? '', crest: !!crest && getComputedStyle(crest).display !== 'none' ? crest.textContent : '',
        imgShown: !!img && getComputedStyle(img).display !== 'none',
        title: el.querySelector('.flight-window-title')?.textContent ?? '',
        domain: el.querySelector('.flight-window-domain')?.textContent ?? '' };
    }) };
  })()`);
  const goodWindows = (windows?.items ?? []).filter((w) => /\/_favicon\/\?pageUrl=/.test(w.icon) && w.loaded && w.title && w.domain);
  check(windows && windows.count >= 1 && windows.count <= 6 && windows.near > 6 && goodWindows.length === windows.count,
    "近づいた星に窓が開く（最大 6 個、_favicon のアイコン・タイトル・ドメイン）",
    windows ? `範囲内の星 ${windows.near}・窓 ${windows.count} 個・アイコン読み込み済み ${goodWindows.length}` : "測れない");
  // 新しいプロファイルではどのサイトのアイコンも未取得で、_favicon は既定の地球儀を返す。
  // その窓は、地球儀ではなくドメインの頭文字の紋章を出す
  const crests = (windows?.items ?? []).filter((w) => w.kind === 'crest' && w.crest && !w.imgShown &&
    w.crest === (w.domain[0] ?? '').toUpperCase());
  check(windows && windows.count > 0 && crests.length === windows.count,
    "既定のアイコン（地球儀）だった窓には、ドメインの頭文字の紋章が出る",
    windows ? `窓 ${windows.count} 個中 紋章 ${crests.length} 個（${(windows.items ?? []).map((w) => w.kind || '?').join(",")}）` : "測れない");
  // 星雲と星団名：飛行中は星団の数だけ、淡い星雲の雲と星団名の標識。星団の中では、その星団の標識が薄くなる
  const signs = await json(`(() => {
    const list = [...document.querySelectorAll('.flight-sign')];
    const home = list.find((el) => el.dataset.cluster === ${JSON.stringify(String(layout?.clusters[0]?.index))});
    const others = list.filter((el) => el !== home && el.style.display !== 'none').map((el) => Number(el.style.opacity));
    return { signs: list.length, clouds: ${b}.flightState?.()?.nebulae ?? 0,
      home: home ? Number(home.style.opacity) : null, farthest: Math.max(0, ...others) };
  })()`);
  const liveClusters = (layout?.clusters ?? []).filter((c) => c.count > 0).length;
  check(signs && signs.signs === liveClusters && signs.clouds === liveClusters && signs.home != null && signs.home < signs.farthest,
    "飛行中、星団ごとに淡い星雲の雲と星団名の標識があり、星団の中ではその標識が薄くなる",
    signs ? `標識 ${signs.signs}・雲 ${signs.clouds}（星団 ${liveClusters}）・中にいる星団の標識 ${signs.home?.toFixed?.(2) ?? "-"} / 遠くの標識 ${signs.farthest.toFixed(2)}` : "測れない");
  if (windows?.count) {
    writeFileSync("docs/screens/flight-near.png", await screenshot());
    console.log("  画面: docs/screens/flight-near.png");
  }

  // --- デブリ：星雲の範囲の外にだけあり、同じデータなら毎回同じ位置 ---
  const debris = await json(`${b}.flightDebris?.() ?? null`);
  const debrisAgain = await json(`${b}.flightDebris?.(true) ?? null`);
  const ranges = await json(`${b}.flightNebulaRanges?.() ?? null`);
  const dist3 = (p, q) => Math.hypot(p.x - q.x, p.y - q.y, p.z - q.z);
  const intruding = (debris ?? []).filter((d) => (ranges ?? []).some((c) => dist3(d, c) < c.radius + d.r));
  check(debris && debris.length >= 20 && ranges?.length > 0 && intruding.length === 0 &&
    JSON.stringify(debris) === JSON.stringify(debrisAgain),
  "デブリは、どの星団の星雲の範囲にも入っておらず、同じデータなら毎回同じ位置",
  debris ? `${debris.length} 個・星雲の範囲に入っている ${intruding.length} 個・計算し直しと ${JSON.stringify(debris) === JSON.stringify(debrisAgain) ? "一致" : "不一致"}` : "flightDebris が無い");

  // --- デブリにぶつかると、減速して押し戻される ---
  const rock = debris?.[0];
  if (rock) await tryEval(`${b}.flightPlace(${rock.x}, ${rock.y}, ${rock.z + rock.r + 14}, ${rock.x}, ${rock.y}, ${rock.z})`);
  await key("keydown", "KeyW", "w");
  await waitUntil(`(${b}.flightState?.()?.bumps ?? 0) > 0`, 6000, 50);
  await key("keyup", "KeyW", "w");
  const bump = (await flight())?.lastBump;
  check(bump && bump.speedAfter < bump.speedBefore && bump.distanceAfter >= bump.minDistance - 0.01,
    "デブリにぶつかると、宇宙船が減速して押し戻される",
    bump ? `速さ ${bump.speedBefore.toFixed(1)}→${bump.speedAfter.toFixed(1)}・ぶつかった後の距離 ${bump.distanceAfter.toFixed(1)}（最小 ${bump.minDistance.toFixed(1)}）` : "ぶつからない");
  await press("KeyS", "s", 1200);

  // --- 加速リング：くぐると一時的に速くなり、上限を超えない。しばらくすると元の最高速度に戻る ---
  const rings = await json(`${b}.flightRings?.() ?? null`);
  const ring = rings?.[0];
  if (ring) await tryEval(`${b}.flightPlace(${ring.x - ring.nx * 22}, ${ring.y - ring.ny * 22}, ${ring.z - ring.nz * 22}, ${ring.x}, ${ring.y}, ${ring.z})`);
  await key("keydown", "KeyW", "w");
  let peak = 0, boostSeen = 0, cap = 0, normalMax = 0;
  for (let i = 0; i < 40; i++) {
    const st = await flight();
    peak = Math.max(peak, st?.ship?.speed ?? 0);
    boostSeen = Math.max(boostSeen, st?.boosts ?? 0);
    cap = st?.boostCap ?? cap;
    normalMax = st?.maxSpeed ?? normalMax;
    await sleep(80);
  }
  await key("keyup", "KeyW", "w");
  await sleep(2500);
  const settled = await flight();
  check(rings && rings.length > 0 && boostSeen > 0 && peak > normalMax * 1.05 && peak <= cap + 1e-6 &&
    (settled?.ship?.speed ?? Infinity) <= normalMax + 1e-6,
  "加速リングをくぐると一時的に速くなり、上限を超えず、しばらくすると元の最高速度に戻る",
  rings ? `リング ${rings.length} 個・くぐった回数 ${boostSeen}・最高 ${peak.toFixed(1)}（ふだんの最高 ${normalMax.toFixed(1)}・上限 ${cap.toFixed(1)}）・後で ${settled?.ship?.speed?.toFixed(1)}` : "flightRings が無い");
  if (ring) {
    await tryEval(`${b}.flightPlace(${ring.x - ring.nx * 60}, ${ring.y - ring.ny * 60 + 6}, ${ring.z - ring.nz * 60}, ${ring.x}, ${ring.y}, ${ring.z})`);
    await sleep(500);
    writeFileSync("docs/screens/flight-debris.png", await screenshot());
    console.log("  画面: docs/screens/flight-debris.png");
  }

  // --- 遠くの星の名前：窓より遠い星にも、名前だけを小さく出す（上限あり、重ならない） ---
  if (await evalIn(`typeof ${b}.flightState?.()?.farLabelLimit === 'number'`)) {
  await tryEval(`${b}.flightReset?.()`);
  await sleep(800);
  const far = await json(`(() => {
    const st = ${b}.flightState?.();
    const els = [...document.querySelectorAll('.flight-far-label')].filter((el) => el.style.display !== 'none' && el.style.opacity !== '0');
    const boxes = els.map((el) => el.getBoundingClientRect());
    let overlaps = 0;
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], c = boxes[j];
      if (a.left < c.right && c.left < a.right && a.top < c.bottom && c.top < a.bottom) overlaps++;
    }
    const nearIds = new Set(st?.windows ?? []);
    return { count: els.length, limit: st?.farLabelLimit ?? 0, overlaps, dupes: els.filter((el) => nearIds.has(el.dataset.key)).length,
      windows: nearIds.size };
  })()`);
  check(far && far.count > 6 && far.count <= far.limit && far.overlaps === 0 && far.dupes === 0,
    "飛行中、窓より遠い星にも名前が出る（上限あり、重ならない、窓と重複しない）",
    far ? `遠くの名前 ${far.count} 個（上限 ${far.limit}）・窓 ${far.windows} 個・重なり ${far.overlaps}` : "測れない");

  }

  // --- 6. 星の芯に入ると、同じタブの切り替えがちょうど 1 回（新しいタブは開かない）。続けて入っても数秒は開かない ---
  await evalIn(`(() => {
    window.__opened = []; window.__switched = [];
    window.__origCreate = chrome.tabs.create; window.__origUpdate = chrome.tabs.update;
    chrome.tabs.create = (options) => { window.__opened.push(options.url); return Promise.resolve({ id: -1 }); };
    chrome.tabs.update = (...args) => { const o = args.find((a) => a && typeof a === 'object'); window.__switched.push(o?.url);
      return Promise.resolve({ id: -1 }); };
  })()`);
  const targetUrl = await evalIn(`${b}.state.items.find((i) => i.id === ${JSON.stringify(target?.id)})?.url ?? ''`);
  // 1 回目：星を正面に置いて W。切り替えたらすぐ離す（その後の押し戻しで止まる）
  if (target) await teleport(target.id, 6 * S);
  await key("keydown", "KeyW", "w");
  await waitUntil("window.__switched.length + window.__opened.length > 0", 4000, 50);
  await key("keyup", "KeyW", "w");
  await sleep(900);
  const firstSwitch = await json("window.__switched");
  const firstOpen = await json("window.__opened");
  const afterPush = await flight();
  // 2 回目：同じ星へすぐにもう一度入る。数秒間は同じ星を開かない（奥の別の星に入るのは仕様どおり）
  if (target) await teleport(target.id, 4 * S);
  await press("KeyW", "w", 1300);
  await press("KeyS", "s", 1200);
  const secondSwitch = await json("window.__switched");
  const sameAgain = (secondSwitch ?? []).filter((url) => url === targetUrl).length;
  check(firstSwitch?.length === 1 && firstSwitch[0] === targetUrl && firstOpen?.length === 0 && sameAgain === 1 &&
    (afterPush?.entryDistance ?? 0) > 2 * S * 0.5,
  "星の芯に入ると、新しいタブではなく同じタブの切り替えがちょうど 1 回。押し戻され、同じ星に続けて入っても数秒は開かない",
  `切り替え ${firstSwitch?.length ?? "?"} 回（${firstSwitch?.[0] === targetUrl ? "その星" : "別の星"}）・新しいタブ ${firstOpen?.length ?? "?"} 回・押し戻し後の距離 ${afterPush?.entryDistance?.toFixed?.(1) ?? "?"}・続けて入った後の同じ星 ${sameAgain} 回`);
  // Ctrl を押しながら入ると、新しいタブで開く（別の星団のいちばん外側の星で）
  const target2 = layout?.stars.filter((st) => st.cluster === layout.clusters[1].index).sort((p, q) => q.rank - p.rank)[0];
  const target2Url = await evalIn(`${b}.state.items.find((i) => i.id === ${JSON.stringify(target2?.id)})?.url ?? ''`);
  await key("keydown", "ControlLeft", "Control");
  if (target2) await teleport(target2.id, 6 * S);
  await key("keydown", "KeyW", "w");
  await waitUntil("window.__opened.length > 0", 4000, 50);
  await key("keyup", "KeyW", "w");
  await key("keyup", "ControlLeft", "Control");
  await sleep(900);
  const ctrlOpen = await json("window.__opened");
  const ctrlSwitch = await json("window.__switched");
  check(ctrlOpen?.length === 1 && ctrlOpen[0] === target2Url && ctrlSwitch?.length === secondSwitch?.length,
    "Ctrl を押しながら星に入ると、新しいタブで開く（同じタブは切り替えない）",
    `新しいタブ ${ctrlOpen?.length ?? "?"} 回（${ctrlOpen?.[0] === target2Url ? "その星" : "別の星"}）・同じタブ ${ctrlSwitch?.length ?? "?"} 回`);
  // 地図の画面でも：Enter で同じタブ、Ctrl+Enter で新しいタブ（確認は地図に戻ってから）
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
  await evalIn("document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true, bubbles: true }))");
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
  if (member) await teleport(member, 20 * S);
  await sleep(500);
  if (segments?.length) {
    writeFileSync("docs/screens/flight-constellation.png", await screenshot());
    console.log("  画面: docs/screens/flight-constellation.png");
  }
  await key("keydown", "Escape", "Escape");
  await waitFlight(false);
  await sleep(900);

  // --- 星座を選んだまま検索すると、ブラックホールの周り（外側の軌道の少し外まで）に星座の線を描かない ---
  // 星座の線を出した画面と消した画面を撮り、違う画素がブラックホールの周りに無いこと（外にはあること）を見る
  await evalIn(`(async () => { await ${b}.searchNow('宇宙を感じたい'); })()`);
  await sleep(2200);
  const hole = await json(`${b}.searchHole?.() ?? null`);
  await tryEval(`${b}.setConstellationTestLine?.(true)`);
  await tryEval(`${b}.setConstellationTestOpacity?.(1)`);
  await sleep(150);
  const shotOnBuffer = await screenshot();
  await tryEval(`${b}.setConstellationLinesVisible?.(false)`);
  await sleep(300);
  const shotOff = decodePng(await screenshot());
  await tryEval(`${b}.setConstellationLinesVisible?.(true)`);
  await tryEval(`${b}.setConstellationTestOpacity?.(null)`);
  await tryEval(`${b}.setConstellationTestLine?.(false)`);
  const shotOn = decodePng(shotOnBuffer);
  let insideDiff = 0, outsideDiff = 0;
  for (let y = 0; y < shotOn.height; y++) {
    for (let x = 0; x < shotOn.width; x++) {
      const i = (y * shotOn.width + x) * 4;
      const d = Math.abs(shotOn.data[i] - shotOff.data[i]) + Math.abs(shotOn.data[i + 1] - shotOff.data[i + 1]) +
        Math.abs(shotOn.data[i + 2] - shotOff.data[i + 2]);
      if (d <= 6) continue;
      if (hole && Math.hypot(x - hole.x, y - hole.y) < hole.r) insideDiff++;
      else outsideDiff++;
    }
  }
  // Chrome のソフトウェア描画では切り替え前後の少数の画素が揺れるため、5 画素だけ許容する。
  // discard を外すと内側の線が数百画素以上になり、この判定は NG になる。
  check(hole && hole.r > 20 && insideDiff <= 5 && outsideDiff > 0,
    "星座を選んだまま検索すると、ブラックホールの周りに星座の線が描かれていない（外側には淡く残る）",
    hole ? `半径 ${hole.r.toFixed(0)}px の内側で線の画素 ${insideDiff}・外側 ${outsideDiff}` : "searchHole が無い");
  await evalIn("(() => { const i = document.getElementById('search-input'); i.value = ''; i.dispatchEvent(new Event('input')); i.blur(); })()");
  await sleep(900);

  // --- 地図でも：検索して Enter は同じタブ、Ctrl+Enter は新しいタブ、カードの「開く」も同じタブ ---
  await evalIn(`(async () => { await ${b}.searchNow('パスタ'); })()`);
  await sleep(1200);
  const before = await json("{ switched: window.__switched.length, opened: window.__opened.length }");
  await evalIn("document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))");
  await evalIn("document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', ctrlKey: true, bubbles: true }))");
  const afterKeys = await json("{ switched: window.__switched.length, opened: window.__opened.length }");
  check(afterKeys.switched === before.switched + 1 && afterKeys.opened === before.opened + 1,
    "地図で Enter は同じタブ、Ctrl+Enter は新しいタブで開く",
    `同じタブ +${afterKeys.switched - before.switched}・新しいタブ +${afterKeys.opened - before.opened}`);
  await evalIn("(() => { const i = document.getElementById('search-input'); i.value = ''; i.dispatchEvent(new Event('input')); i.blur(); })()");
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

  // --- 操作の説明：入ってすぐは大きく、約 10 秒で薄く小さくなり、左下へ寄る（窓や星に重ならないように） ---
  await key("keydown", "KeyF", "f");
  await waitFlight(true);
  const helpAt = () => json(`(() => { const el = document.getElementById('flight-help'); const r = el.getBoundingClientRect();
    return { w: r.width, h: r.height, left: r.left, bottom: r.bottom, opacity: Number(getComputedStyle(el).opacity) }; })()`);
  const helpFirst = await helpAt();
  await sleep(11_000);
  const helpLater = await helpAt();
  check(helpFirst && helpLater && helpFirst.h >= 40 && helpLater.h < 40 && helpLater.opacity <= 0.6 &&
    helpLater.left < 80 && helpLater.bottom > 700 - 80,
  "操作の説明は、入って約 10 秒で薄く小さくなり、左下へ寄る",
  helpFirst && helpLater ? `高さ ${helpFirst.h.toFixed(0)}→${helpLater.h.toFixed(0)}px・不透明度 ${helpFirst.opacity}→${helpLater.opacity}・左 ${helpLater.left.toFixed(0)}px` : "測れない");
  await key("keydown", "Escape", "Escape");
  await waitFlight(false);
  await sleep(800);

  // --- ページに切り替えて「戻る」で戻ると、飛行中の宇宙船の位置と検索語が元に戻る ---
  // 移動先は Fetch で手元の空ページに差し替える（外部には通信しない）
  app.onEvent((m) => {
    if (m.method !== "Fetch.requestPaused") return;
    app.send("Fetch.fulfillRequest", { requestId: m.params.requestId, responseCode: 200,
      responseHeaders: [{ name: "Content-Type", value: "text/html; charset=utf-8" }],
      body: Buffer.from("<!doctype html><title>page</title><p>page</p>").toString("base64") }, m.sessionId).catch(() => {});
  });
  await evalIn("chrome.tabs.update = window.__origUpdate; chrome.tabs.create = window.__origCreate;");
  await evalIn(`(async () => { await ${b}.searchNow('宇宙'); })()`);
  await sleep(1200);
  await evalIn("document.getElementById('flight-toggle').click()");
  await waitFlight(true);
  if (target) await teleport(target.id, 6 * S);
  // 切り替える直前の宇宙船の位置を、確認用にタブの中へ控える（アプリの保存とは別）
  await evalIn(`(() => { const orig = chrome.tabs.update.bind(chrome.tabs);
    chrome.tabs.update = (...args) => { sessionStorage.setItem('test:ship', JSON.stringify(${b}.flightState().ship)); return orig(...args); }; })()`);
  await app.send("Fetch.enable", { patterns: [{ urlPattern: "http*://*" }] }, app.sessionId);
  await key("keydown", "KeyW", "w");
  const left = await waitUntil("location.protocol.startsWith('http')", 8000, 100);
  await tryEval("history.back()");
  const resumed = await waitUntil(`document.body.dataset.phase === 'ready' && ${b}?.flightState?.()?.active === true &&
    !${b}.flightState().transitioning`, 60_000, 300);
  await app.send("Fetch.disable", {}, app.sessionId).catch(() => {});
  await sleep(500);
  const back = await json(`(() => ({ saved: JSON.parse(sessionStorage.getItem('test:ship') ?? 'null'), now: ${b}.flightState().ship,
    input: document.getElementById('search-input').value, stashed: ${b}.flightState().searchStashed ?? null }))()`);
  const shipBack = back?.saved && back?.now && Math.hypot(back.saved.x - back.now.x, back.saved.y - back.now.y, back.saved.z - back.now.z) < 0.05 &&
    Math.abs(back.saved.yaw - back.now.yaw) < 1e-3;
  check(left && resumed && shipBack && back.input === "宇宙" && (back.stashed ?? 0) > 0,
    "ページに切り替えて「戻る」で戻ると、飛行中の宇宙船の位置・向きと検索語が元に戻る",
    `移動 ${left ? "した" : "しない"}・再開 ${resumed ? "した" : "しない"}・宇宙船 ${shipBack ? "同じ位置" : "違う位置"}・検索語「${back?.input ?? ""}」・預けた検索 ${back?.stashed ?? "?"} 件`);
  // 新しく開いたときは、保存した状態を使わない
  const fresh = await app.send("Target.createTarget", { url: `chrome-extension://${app.extId}/index.html` });
  const freshSession = (await app.send("Target.attachToTarget", { targetId: fresh.targetId, flatten: true })).sessionId;
  await app.send("Runtime.enable", {}, freshSession);
  let freshState = null;
  for (let i = 0; i < 60 && !freshState; i++) {
    await sleep(1000);
    const r = await app.send("Runtime.evaluate", { returnByValue: true, expression:
      `document.body.dataset.phase === 'ready' ? JSON.stringify({ flight: globalThis.__bukusupe.flightState().active, input: document.getElementById('search-input').value }) : null` }, freshSession).catch(() => null);
    freshState = r?.result?.value ? JSON.parse(r.result.value) : null;
  }
  await app.send("Target.closeTarget", { targetId: fresh.targetId }).catch(() => {});
  check(freshState && freshState.flight === false && freshState.input === "",
    "ブクスペを新しく開いたときは、保存した状態を使わない", freshState ? `飛行 ${freshState.flight}・検索語「${freshState.input}」` : "測れない");
  await key("keydown", "Escape", "Escape");
  await waitFlight(false);
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
  await sleep(3000);
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
