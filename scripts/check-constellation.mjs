/**
 * 星座のメンバーの固定と新星の確認（docs/RELEASE.md 段階 5、決めたこと 1・C。SPEC 9 章）。
 *   node scripts/check-constellation.mjs   （check:ext の中で動く。確認用のビルド dist-debug/ を使う）
 *
 * 使い捨てのプロファイルに確認スクリプトがブックマークを作り、自分のブックマークのデータ源で確かめる。
 *  1. 旧形式（pinned / excluded / lastMembers、呼び出すたびに検索し直す）の保存データが、新形式に移行される。
 *     移行後のメンバーは「移行の直前に呼び出したら表示されたメンバー」＝ pinned ∪（検索の上位 12 − excluded）。
 *     検索語を持たない旧形式の行は pinned だけ。期待値は、この確認の中で検索の結果から組み立てる（移行の関数は使わない）
 *  2. 検索から星座を保存した後、検索語に合うブックマークを足して呼び出しても、メンバーと線が変わらない。足した星は新星として示される
 *  3. 新星を「加える」とメンバーに入り（線を結び直す）、「見送る」と記録され、二度と新星として出ない
 *  4. 再読み込みの後も、メンバーと線の形が同じ
 *  5. 検索語を持たない星座を保存・呼び出しできる
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createChecker, launchExtension, sleep } from "./lib/harness.mjs";

const DIST = resolve(process.argv[2] ?? "dist-debug");
const b = "globalThis.__bukusupe";
const { check, problems } = createChecker();
const app = await launchExtension(DIST);
const { send, evalIn, tryEval, waitUntil } = app;
const json = async (expr) => JSON.parse((await tryEval(`JSON.stringify(${expr})`)) ?? "null");
const sameSet = (a, c) => !!a && !!c && a.length === c.length && new Set(a).size === a.length && a.every((x) => c.includes(x));
const sameEdges = (a, c) => !!a && !!c && JSON.stringify(a) === JSON.stringify(c);

const TITLES = [
  "今夜見える星座の探し方", "天体写真の撮り方入門", "望遠鏡の選び方", "流れ星の観測ガイド", "プラネタリウムの上映案内",
  "ロケット打ち上げの記録", "月の満ち欠けカレンダー",
  "親子丼の作り方", "カレーのスパイス配合", "パスタのゆで方", "お味噌汁の基本", "だしの取り方", "唐揚げを柔らかくするコツ",
  "焼き魚をきれいに焼く",
];
const LEGACY_QUERY = "料理を作りたい";
const QUERY = "星空を観察したい";

async function reload() {
  await send("Page.reload", {}, app.sessionId);
  await sleep(500);
  return waitUntil(`document.body.dataset.phase === 'ready' && ${b}?.state.kind === 'chrome'`, 180_000, 300);
}

/** 旧形式の行を IndexedDB に直接書く（前の版が保存したデータの代わり） */
async function putRows(rows) {
  await evalIn(`new Promise((resolve, reject) => {
    const req = indexedDB.open('bukusupe-chrome');
    req.onerror = () => reject(req.error);
    req.onsuccess = () => {
      const db = req.result;
      const tx = db.transaction('constellations', 'readwrite');
      for (const row of ${JSON.stringify(rows)}) tx.objectStore('constellations').put(row);
      tx.oncomplete = () => { db.close(); resolve(true); };
      tx.onerror = () => reject(tx.error);
    };
  })`);
}

/** IndexedDB に保存されている行そのもの */
const rawRow = (id) => evalIn(`new Promise((resolve) => {
  const req = indexedDB.open('bukusupe-chrome');
  req.onsuccess = () => {
    const get = req.result.transaction('constellations').objectStore('constellations').get(${JSON.stringify(id)});
    get.onsuccess = () => { req.result.close(); resolve(JSON.stringify(get.result ?? null)); };
  };
})`).then((text) => JSON.parse(text ?? "null"));

// 旧形式（変更前のコード）でも比べられるよう、members が無ければ lastMembers を読む（規則 8：変更前の動きで NG になるのを見るため）
const rowOf = (id) => json(`(() => { const r = ${b}.constellationState().rows.find((r) => r.id === ${JSON.stringify(id)});
  return r ? { ...r, members: r.members ?? r.lastMembers } : null; })()`);
const linesOf = (id) => json(`${b}.constellationState().geometry.find((g) => g.id === ${JSON.stringify(id)}) ?? null`);
const novae = () => json(`${b}.constellationState().novae ?? null`);
/** 画面の新星の一覧（見えている行の id） */
const novaList = () => json(`[...document.querySelectorAll('#constellation-novae [data-id]')]
  .filter((el) => el.getClientRects().length > 0).map((el) => el.dataset.id)`);
/** 検索して、引き寄せた星の id を順に返す */
const searchIds = async (text) =>
  JSON.parse((await evalIn(`(async () => JSON.stringify((await ${b}.searchNow(${JSON.stringify(text)})).map((h) => h.id)))()`)) ?? "[]");
const idOfUrl = (url) => evalIn(`${b}.state.items.find((i) => i.url === ${JSON.stringify(url)})?.id ?? null`);

async function clearSearch() {
  await evalIn("(() => { const i = document.getElementById('search-input'); i.value = ''; i.dispatchEvent(new Event('input')); i.blur(); })()");
  await sleep(400);
}

/** 星座を選んだ状態にする（選んでいれば、いったん解いてから選び直す） */
async function recall(id) {
  if ((await evalIn(`${b}.constellationState().active`)) === id) await evalIn(`${b}.recallConstellation(${JSON.stringify(id)})`);
  await evalIn(`${b}.recallConstellation(${JSON.stringify(id)})`);
  await waitUntil(`${b}.constellationState().active === ${JSON.stringify(id)}`, 60_000, 100);
  await sleep(600);
}

/** ブックマークを作り、星として並ぶまで待つ。作ったブックマークの id を返す */
async function addBookmark(title, url) {
  await evalIn(`chrome.bookmarks.create({ parentId: "1", title: ${JSON.stringify(title)}, url: ${JSON.stringify(url)} })`);
  await waitUntil(`(() => { const item = ${b}.state.items.find((i) => i.url === ${JSON.stringify(url)});
    return !!item && (${b}.layout()?.stars ?? []).some((s) => s.id === item.id) && document.body.dataset.phase === 'ready'; })()`, 60_000, 300);
  return idOfUrl(url);
}

try {
  await waitUntil(`document.body.dataset.phase === 'ready'`, 300_000, 500);
  await evalIn(`(async () => {
    const titles = ${JSON.stringify(TITLES)};
    for (let i = 0; i < titles.length; i++) {
      await chrome.bookmarks.create({ parentId: "1", title: titles[i], url: "https://example.com/constellation/" + i });
    }
  })()`);
  // サンプル → 自分のブックマークに切り替わると、ページが読み込み直される
  const chromeReady = await waitUntil(`${b}?.state.kind === 'chrome' && document.body.dataset.phase === 'ready' &&
    (${b}.layout()?.stars.length ?? 0) === ${TITLES.length}`, 300_000, 500);
  check(chromeReady, "確認用のブックマークで、自分のブックマークの宇宙が開く", `${TITLES.length} 件`);

  // --- 1. 旧形式の移行 ---
  // 期待値：旧形式の呼び出し（pinned ∪（検索の上位 12 − excluded）、消えたブックマークは除く）を、この確認の中で組み立てる
  const hits = await searchIds(LEGACY_QUERY);
  await clearSearch();
  const allIds = await json(`${b}.state.items.map((i) => i.id)`);
  const automatic = hits.slice(0, 12);
  const excludedId = automatic[0];
  const pinnedId = allIds.find((id) => !automatic.includes(id));
  const legacyExpected = [...new Set([pinnedId, ...automatic.filter((id) => id !== excludedId)])];
  const selectedIds = allIds.slice(0, 3);
  await putRows([
    { id: "legacy-search", name: "旧形式の星座", source: "search", query: LEGACY_QUERY, pinned: [pinnedId], excluded: [excludedId],
      lastMembers: [excludedId, allIds[allIds.length - 1]], createdAt: Date.now() - 86_400_000 },
    { id: "legacy-plain", name: "旧形式の検索語なし", source: "search", pinned: selectedIds, excluded: [],
      lastMembers: [selectedIds[0]], createdAt: Date.now() - 86_400_000 },
  ]);
  const reloaded = await reload();
  // 移行は、検索（モデル）が使えるようになってから行う。終わるまで待つ
  const settled = await waitUntil(`${b}.constellationState().pendingMigration === 0 &&
    ${b}.constellationState().rows.some((r) => r.id === 'legacy-search')`, 120_000, 300);
  await sleep(300);
  const migrated = await rowOf("legacy-search");
  const migratedLines = await linesOf("legacy-search");
  const mst = await json(`${b}.mstFor(${JSON.stringify(legacyExpected)})`);
  check(reloaded && settled && automatic.length >= 3 && sameSet(migrated?.members, legacyExpected) && sameSet(migratedLines?.members, legacyExpected) &&
    sameEdges(migratedLines?.edges, mst),
    "旧形式の星座が、呼び出したときに表示されていたメンバーと線の形のまま、新形式に移行される",
    `検索の上位 ${automatic.length}・期待 ${legacyExpected.length} 星・移行後 ${migrated?.members?.length ?? "なし"} 星・線 ${migratedLines?.edges.length ?? 0} 辺（期待 ${mst?.length ?? 0}）`);
  const raw = await rawRow("legacy-search");
  check(raw && Array.isArray(raw.members) && sameSet(raw.members, legacyExpected) && raw.query === LEGACY_QUERY &&
    !("lastMembers" in raw) && !("pinned" in raw) && !("excluded" in raw),
    "移行した形が IndexedDB に保存され、検索語は記録として残る",
    raw ? `保存された項目 ${Object.keys(raw).sort().join(",")}` : "行が無い");
  const plain = await rowOf("legacy-plain");
  check(sameSet(plain?.members, selectedIds) && !plain?.query, "検索語を持たない旧形式の星座は、加えた星（pinned）がメンバーになる",
    `${plain?.members?.length ?? "なし"} 星`);

  // --- 2. 保存した後にブックマークを足しても、メンバーと線が変わらない。足した星は新星 ---
  await evalIn(`${b}.searchNow(${JSON.stringify(QUERY)})`);
  await sleep(900);
  await evalIn("document.getElementById('constellation-create').click()");
  await evalIn("document.getElementById('constellation-name-input').value = '星空の観察'");
  await evalIn("document.getElementById('constellation-save').click()");
  await waitUntil(`${b}.constellationState().rows.some((r) => r.name === '星空の観察')`, 60_000, 200);
  await waitUntil(`${b}.constellationState().animation.phase === 'done' && ${b}.constellationState().active === null`, 10_000, 200);
  const id = await evalIn(`${b}.constellationState().rows.find((r) => r.name === '星空の観察')?.id ?? null`);
  const saved = await rowOf(id);
  const savedLines = await linesOf(id);
  const nova1 = await addBookmark(QUERY, "https://example.com/nova/1");
  const afterAdd = await searchIds(QUERY);
  await clearSearch();
  await recall(id);
  const recalled = await rowOf(id);
  const recalledLines = await linesOf(id);
  check(!!id && saved?.members?.length >= 3 && !!nova1 && afterAdd.slice(0, 12).includes(nova1) &&
    sameSet(recalled?.members, saved.members) && sameSet(recalledLines?.members, saved.members) && sameEdges(recalledLines?.edges, savedLines?.edges),
    "星座を保存した後、検索語に合うブックマークを足して呼び出しても、メンバーと線が変わらない",
    `保存 ${saved?.members?.length ?? 0} 星・足した星の検索順位 ${afterAdd.indexOf(nova1) + 1}・呼び出し ${recalled?.members?.length ?? 0} 星・線 ${recalledLines?.edges.length ?? 0} 辺（保存時 ${savedLines?.edges.length ?? 0}）`);
  const shown = await novae();
  const listed = await novaList();
  const ringed = await json(`${b}.constellationState().novaeShown ?? null`);
  check(shown?.includes(nova1) && listed?.includes(nova1) && ringed?.includes(nova1) && !recalled?.members?.includes(nova1),
    "足したブックマークは、呼び出したときに新星として示される（地図の輪と一覧。メンバーには入らない）",
    `新星 ${JSON.stringify(shown)}・地図の輪 ${JSON.stringify(ringed)}・画面の一覧 ${JSON.stringify(listed)}`);

  {
    await sleep(600);
    const shot = await send("Page.captureScreenshot", { format: "png" }, app.sessionId);
    writeFileSync("docs/screens/constellation-novae.png", Buffer.from(shot.data, "base64"));
    console.log("  画面: docs/screens/constellation-novae.png");
  }

  // --- 3. 加える・見送る ---
  await evalIn(`document.querySelector('#constellation-novae [data-id="${nova1}"] [data-action="accept"]')?.click()`);
  await sleep(800);
  const accepted = await rowOf(id);
  const acceptedLines = await linesOf(id);
  const acceptedMst = await json(`${b}.mstFor(${JSON.stringify(accepted?.members ?? [])})`);
  const acceptedRaw = await rawRow(id);
  check(accepted?.members?.includes(nova1) && accepted.members.length === saved.members.length + 1 &&
    sameSet(acceptedLines?.members, accepted.members) && sameEdges(acceptedLines?.edges, acceptedMst) &&
    acceptedRaw?.members?.includes(nova1) && !(await novae())?.includes(nova1) && !(await novaList())?.includes(nova1),
    "新星を「加える」と、メンバーに入って線が結び直され、新星の一覧から消える",
    `${saved?.members?.length ?? 0} → ${accepted?.members?.length ?? 0} 星・線 ${acceptedLines?.edges.length ?? 0} 辺`);
  const nova2 = await addBookmark(QUERY, "https://example.com/nova/2");
  await recall(id);
  const shown2 = await novae();
  await evalIn(`document.querySelector('#constellation-novae [data-id="${nova2}"] [data-action="dismiss"]')?.click()`);
  await sleep(600);
  const dismissedRow = await rowOf(id);
  const listAfterDismiss = await novaList();
  await recall(id);
  const shownAgain = await novae();
  check(shown2?.includes(nova2) && !dismissedRow?.members?.includes(nova2) && !listAfterDismiss?.includes(nova2) &&
    Array.isArray(shownAgain) && !shownAgain.includes(nova2),
    "新星を「見送る」と、メンバーに入らず、呼び出し直しても二度と新星として出ない",
    `見送る前 ${JSON.stringify(shown2)}・呼び出し直し ${JSON.stringify(shownAgain)}`);

  // --- 4. 再読み込みの後も同じ ---
  const beforeReload = { row: await rowOf(id), lines: await linesOf(id) };
  await reload();
  await sleep(800);
  await recall(id);
  const afterReload = { row: await rowOf(id), lines: await linesOf(id), novae: await novae() };
  check(sameSet(afterReload.row?.members, beforeReload.row?.members) && sameEdges(afterReload.lines?.edges, beforeReload.lines?.edges) &&
    Array.isArray(afterReload.novae) && !afterReload.novae.includes(nova1) && !afterReload.novae.includes(nova2),
    "再読み込みの後も、メンバーと線の形が同じで、加えた星・見送った星は新星として出ない",
    `${beforeReload.row?.members?.length ?? 0} → ${afterReload.row?.members?.length ?? 0} 星・線 ${afterReload.lines?.edges.length ?? 0} 辺・新星 ${JSON.stringify(afterReload.novae)}`);

  // --- 5. 検索語を持たない星座 ---
  const picked = allIds.slice(4, 9);
  const createdId = await evalIn(`(async () => (await ${b}.createConstellation('選んだ星', ${JSON.stringify(picked)}))?.id ?? null)()`);
  await waitUntil(`${b}.constellationState().animation.phase === 'done'`, 10_000, 200);
  await reload();
  await sleep(800);
  await recall(createdId);
  const plainRow = await rowOf(createdId);
  const plainLines = await linesOf(createdId);
  const plainMst = await json(`${b}.mstFor(${JSON.stringify(picked)})`);
  const plainNovae = await novae();
  check(!!createdId && plainRow && !plainRow.query && !plainRow.queryVector && sameSet(plainRow.members, picked) &&
    sameSet(plainLines?.members, picked) && sameEdges(plainLines?.edges, plainMst) && Array.isArray(plainNovae) && plainNovae.length === 0,
    "検索語を持たない星座を保存し、再読み込みの後に呼び出せる（新星は出ない）",
    `${plainRow?.members?.length ?? "なし"} 星・線 ${plainLines?.edges.length ?? 0} 辺・検索語 ${plainRow?.query ?? "なし"}`);

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
