/**
 * 画面の言語の確認（SPEC 14 章）。確認用のビルド dist-debug/ を、ブラウザの言語を変えた使い捨てのプロファイルで開く。
 *   npm run build:debug >/dev/null && node scripts/check-language.mjs   （check:ext の中で動く）
 *
 *  1. 「自動」で、ブラウザの言語が日本語なら日本語、英語なら英語で表示される（初回の説明画面から）
 *  2. 英語の画面の部品に、日本語の文字が残っていない（利用者のデータ＝ブックマークのタイトルや星座の名前は除く）。星団名も英語
 *  3. 主な画面（初回の説明画面、初期画面、ⓘ のパネル、検索、選択モード、星座、飛行モード）で、画面の部品の文字がはみ出したり、
 *     部品どうしが重なったりしていない（英語と日本語の両方）。スクリーンショットを docs/screens/i18n/ に保存する
 *  4. ⓘ のパネルで言語を切り替えると、読み込み直さずにその場で文言（星団名を含む）が変わり、読み込み直しても保たれる
 *     初回の説明画面にも言語の選択欄があり、切り替えると説明画面の文言が変わる
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { createChecker, launchExtension, sleep } from "./lib/harness.mjs";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const DIST = resolve(process.argv[2] ?? join(ROOT, "dist-debug"));
const SHOTS = join(ROOT, "docs/screens/i18n");
mkdirSync(SHOTS, { recursive: true });
const { check, problems } = createChecker();
const b = "globalThis.__bukusupe";

/**
 * 画面の部品の、はみ出しと重なりを調べる（ページの中で動かす）。
 * - 部品（PARTS）が画面の外へはみ出していない。部品どうしが重なっていない
 * - 部品の中の、文字を持つ要素（ボタン・文など）が、枠からはみ出していない（text-overflow: ellipsis で意図して省略するものは除く）
 * - 部品の中の、文字を持つ要素どうしが重なっていない。ボタンの文字が 2 行に折り返していない
 */
const LAYOUT_PROBE = `(() => {
  const PARTS = ["first-run", "search-box", "corner-actions", "hud-toggle", "hud", "selection-bar", "constellation-list",
    "constellation-manage", "constellation-novae", "star-card", "flight-help", "hint", "sample-hint"];
  const shown = (el) => {
    if (!el || el.closest("[hidden]")) return false;
    for (let node = el; node && node !== document.documentElement; node = node.parentElement) {
      const s = getComputedStyle(node);
      if (s.display === "none" || s.visibility === "hidden" || Number(s.opacity) < 0.05) return false;
    }
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const box = (el) => el.getBoundingClientRect();
  const cross = (a, c) => Math.min(a.right, c.right) - Math.max(a.left, c.left) > 1 && Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top) > 1;
  const name = (el) => el.id ? "#" + el.id : el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.split(" ")[0] : "") +
    "「" + (el.textContent ?? "").trim().slice(0, 16) + "」";
  const found = [];
  // 初回の説明画面は、ほかの部品の上を覆う（その間は説明画面だけを見る）
  const cover = document.getElementById("first-run");
  const parts = shown(cover) ? [cover.querySelector("article")]
    : PARTS.map((id) => document.getElementById(id)).filter(shown);
  /** 意図して重ねるもの：星座の「…」のメニューは、一覧の上に浮かべて開く */
  const allowed = (a, c) => [a.id, c.id].sort().join() === "constellation-list,constellation-manage";
  for (const el of parts) {
    const r = box(el);
    if (r.left < -1 || r.top < -1 || r.right > innerWidth + 1 || r.bottom > innerHeight + 1) found.push(name(el) + " が画面の外にはみ出す");
  }
  for (let i = 0; i < parts.length; i++) for (let j = i + 1; j < parts.length; j++) {
    if (!allowed(parts[i], parts[j]) && cross(box(parts[i]), box(parts[j]))) found.push(name(parts[i]) + " と " + name(parts[j]) + " が重なる");
  }
  // 文字を持つ要素（ボタン・文など）。部品の枠の外に置かれたものも見落とさないよう、部品の中の要素を枠の大きさに依らず集め、部品をまたいで比べる
  const roots = shown(cover) ? [cover] : PARTS.map((id) => document.getElementById(id)).filter(Boolean);
  const items = roots.flatMap((root) => [root, ...root.querySelectorAll("*")]).filter((el) => shown(el) &&
    ([...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) || ["BUTTON", "INPUT", "SELECT"].includes(el.tagName)));
  const inMenu = (el) => !!el.closest("#constellation-manage");
  const inList = (el) => !!el.closest("#constellation-list");
  for (const el of items) {
    const s = getComputedStyle(el);
    const r = box(el);
    if (r.left < -1 || r.top < -1 || r.right > innerWidth + 1 || r.bottom > innerHeight + 1) found.push(name(el) + " が画面の外にはみ出す");
    if (s.display !== "inline" && s.textOverflow !== "ellipsis" && el.scrollWidth > el.clientWidth + 1 && el.tagName !== "INPUT")
      found.push(name(el) + " の文字が枠からはみ出す（" + el.scrollWidth + " > " + el.clientWidth + "）");
    if (el.tagName === "BUTTON" && s.textOverflow !== "ellipsis") {
      const range = document.createRange();
      range.selectNodeContents(el);
      const tops = new Set([...range.getClientRects()].map((rect) => Math.round(rect.top / 4)));
      if (tops.size > 1) found.push(name(el) + " の文字が折り返している");
    }
  }
  for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
    const a = items[i], c = items[j];
    if (a.contains(c) || c.contains(a)) continue;
    if ((inMenu(a) && inList(c)) || (inMenu(c) && inList(a))) continue;
    if (cross(box(a), box(c))) found.push(name(a) + " と " + name(c) + " が重なる");
  }
  const texts = items.length;
  return { parts: parts.map(name), texts, found };
})()`;

/**
 * 英語の画面の部品に残った日本語（利用者のデータ＝ブックマークのタイトル・URL・フォルダ、星座の名前、検索語は除く）。
 * 星団名のラベル（地図と飛行中）も見る。
 */
const JAPANESE_PROBE = `(() => {
  const JA = /[\\p{Script=Hiragana}\\p{Script=Katakana}\\p{Script=Han}ー、。「」（）・！？＋]/u;
  const USER = "#labels .label-star, #star-card-title, #star-card-url, #star-card-folder, #constellation-list button:not(#constellation-more), " +
    "#constellation-name, .nova-title, #selection-targets button, #flight-windows, #flight-far-labels, #search-input, #constellation-name-input";
  const found = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const el = node.parentElement;
    // 言語の選択肢の「日本語」は、その言語の名前（どの言語の画面でも同じ書き方にする）
    if (!el || el.closest(USER) || el.closest("script, style, option[value=ja]")) continue;
    let text = node.textContent;
    if (el.closest("#constellation-novae p")) text = text.replace(/“[^”]*”/g, "");
    if (JA.test(text)) found.push(text.trim().slice(0, 24));
  }
  for (const el of document.querySelectorAll("[title], [placeholder], [aria-label]")) {
    if (el.closest(USER) && !el.matches("#search-input, #constellation-name-input")) continue;
    for (const attr of ["title", "placeholder", "aria-label"]) {
      const value = (el.getAttribute(attr) ?? "").replace(/“[^”]*”/g, "");
      if (JA.test(value)) found.push(attr + "=" + value.slice(0, 24));
    }
  }
  if (JA.test(document.title)) found.push("title=" + document.title);
  return [...new Set(found)];
})()`;

const probe = async (app) => app.evalIn(LAYOUT_PROBE);
const shot = async (app, lang, file) => writeFileSync(join(SHOTS, `${lang}-${file}.png`), await app.screenshot());

/** 1 つの言語で、主な画面を順に開き、はみ出し・重なり・残った日本語を調べて撮る */
async function tour(lang) {
  const tag = lang === "ja" ? "日本語" : "英語";
  const app = await launchExtension(DIST, { query: "sample=1&debug=1", autoConsent: false, lang: lang === "ja" ? "ja" : "en-US" });
  const { evalIn, waitUntil } = app;
  const json = async (expr) => JSON.parse((await evalIn(`JSON.stringify(${expr})`)) ?? "null");
  const layoutIssues = [];
  const japanese = [];
  const visit = async (screen, file) => {
    await sleep(400);
    const result = await probe(app);
    layoutIssues.push(...result.found.map((f) => `${screen}：${f}`));
    if (lang !== "ja") japanese.push(...(await evalIn(JAPANESE_PROBE)).map((f) => `${screen}：${f}`));
    await shot(app, lang, file);
    return result;
  };
  try {
    // --- 初回の説明画面 ---
    await waitUntil("!document.getElementById('first-run')?.hidden", 20_000, 200);
    const first = await json(`({ lang: document.documentElement.lang, heading: document.querySelector('#first-run h1')?.textContent,
      start: document.getElementById('first-run-start')?.textContent, picker: document.getElementById('first-run-lang-select')?.value ?? null,
      placeholder: document.getElementById('search-input')?.placeholder })`);
    const want = lang === "ja"
      ? { lang: "ja", heading: "ブクスペを始める前に", start: "始める", placeholder: "星を探す" }
      : { lang: "en", heading: "Before you begin", start: "Start", placeholder: "Search the stars" };
    check(first?.lang === want.lang && first.heading === want.heading && first.start === want.start && first.placeholder === want.placeholder &&
      first.picker === "auto",
      `「自動」で、ブラウザの言語が${tag}なら${tag}で表示される（初回の説明画面から。言語の選択欄は「自動」）`,
      JSON.stringify(first));
    await visit("初回の説明画面", "1-first-run");
    await evalIn("document.getElementById('first-run-start').click()");

    // --- 初期画面 ---
    await waitUntil(`document.body.dataset.phase === 'ready' && ${b}?.state.kind === 'sample'`, 300_000, 500);
    await evalIn(`${b}.resetCamera()`);
    await sleep(2500);
    await visit("初期画面", "2-map");
    const clusterNames = await json(`${b}.layout().clusters.filter((c) => c.count > 0).map((c) => c.name)`);
    const starTitles = await json(`${b}.layout().stars.map((s) => s.title)`);

    // --- ⓘ のパネル ---
    await evalIn("document.getElementById('hud-toggle').click()");
    await sleep(300);
    const hudPicker = await evalIn("document.getElementById('hud-lang')?.value ?? null");
    await visit("ⓘ のパネル", "3-info");
    await evalIn("document.getElementById('hud-toggle').click()");

    // --- カード（星をクリック） ---
    const star = await evalIn(`${b}.layout().stars.find((s) => s.rank === 0)?.id`);
    await evalIn(`(() => { const p = ${b}.starScreen(${JSON.stringify(star)});
      document.getElementById('space').dispatchEvent(new MouseEvent('click', { clientX: p.x, clientY: p.y, bubbles: true })); })()`);
    await sleep(300);
    const cardShown = await evalIn("!document.getElementById('star-card').hidden");
    await visit("カード", "4-card");

    // --- 検索 ---
    const query = lang === "ja" ? "夜空を眺めたい" : "stargazing";
    await evalIn(`${b}.searchNow(${JSON.stringify(query)})`);
    await sleep(3000);
    await visit("検索", "5-search");

    // --- 選択モード（検索の「星座にする」から）と、名前の入力 ---
    await evalIn("document.getElementById('constellation-create').click()");
    await sleep(800);
    await visit("選択モード", "6-selection");
    await evalIn("document.getElementById('selection-new').click()");
    await visit("選択モードの名前の入力", "6b-selection-name");
    await evalIn(`document.getElementById('constellation-name-input').value = ${JSON.stringify(lang === "ja" ? "夜空の記録" : "Night sky")}`);
    await evalIn("document.getElementById('constellation-save').click()");
    await waitUntil(`${b}.constellationState().rows.length === 1 && ${b}.constellationState().animation.phase === 'done' &&
      ${b}.constellationState().active === null`, 20_000, 200);
    await sleep(800);

    // --- 星座（呼び出して、「…」のメニューを開く） ---
    const id = await evalIn(`${b}.constellationState().rows[0].id`);
    await evalIn(`${b}.recallConstellation(${JSON.stringify(id)})`);
    await sleep(2500);
    await evalIn("document.getElementById('constellation-more')?.click()");
    await sleep(300);
    await visit("星座", "7-constellation");
    await evalIn("document.body.click()");
    await evalIn(`${b}.recallConstellation(${JSON.stringify(id)})`);
    await sleep(600);

    // --- 飛行モード ---
    await evalIn("window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyF', key: 'f', bubbles: true }))");
    await evalIn("window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyF', key: 'f', bubbles: true }))");
    await waitUntil(`(() => { const f = ${b}.flightState?.(); return !!f && f.active && !f.transitioning; })()`, 10_000, 100);
    await sleep(1200);
    await visit("飛行モード", "8-flight");
    const flightButton = await evalIn("document.getElementById('flight-toggle').textContent");
    await evalIn("window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape', key: 'Escape', bubbles: true }))");
    await waitUntil(`(() => { const f = ${b}.flightState?.(); return !!f && !f.active; })()`, 10_000, 100);

    check(layoutIssues.length === 0 && cardShown,
      `${tag}の画面：主な画面（初回の説明・初期画面・ⓘ・カード・検索・選択モード・星座・飛行）で、部品の文字がはみ出したり重なったりしていない`,
      layoutIssues.length ? `${layoutIssues.length} 件：${layoutIssues.slice(0, 4).join("／")}` : `docs/screens/i18n/${lang}-*.png`);
    if (lang !== "ja") {
      const japaneseNames = clusterNames.filter((n) => /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u.test(n));
      check(japanese.length === 0 && japaneseNames.length === 0 && flightButton === "Back to map" && hudPicker === "auto",
        "英語の画面の部品に日本語が残っていない（星団名も英語。ブックマークのタイトルなど利用者のデータは除く）",
        japanese.length || japaneseNames.length ? `${[...new Set(japanese)].slice(0, 5).join("／")} ${japaneseNames.join("・")}` : `星団 ${clusterNames.join(" / ")}`);
      // 段階 3c：英語の画面では英語のサンプルが出る（サンプルのブックマークのタイトルに日本語が無い）
      const japaneseTitles = starTitles.filter((n) => /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u.test(n));
      check(japaneseTitles.length === 0, "英語の画面のサンプルの宇宙は、ブックマークのタイトルも英語（日本語が残っていない）",
        japaneseTitles.slice(0, 5).join("／"));
    }
  } finally {
    await app.close();
  }
}

/**
 * 言語を切り替える：ⓘ のパネルで English → サンプルは言語ごとにブックマークが違う（段階 3c）ので読み込み直してその言語の
 * サンプルになる（読み込み直しても保たれる）。初回の説明画面の選択欄は、データを読み込む前なのでその場で変わる。
 */
async function switching() {
  const app = await launchExtension(DIST, { query: "sample=1&debug=1", autoConsent: false, lang: "ja" });
  const { evalIn, waitUntil, send, sessionId } = app;
  const ready = () => waitUntil(`document.body.dataset.phase === 'ready' && ${b}?.state.kind === 'sample'`, 300_000, 500);
  const json = async (expr) => JSON.parse((await evalIn(`JSON.stringify(${expr})`)) ?? "null");
  const pick = async (id, value) => { try { return await evalIn(`(() => { const s = document.getElementById(${JSON.stringify(id)}); s.value = ${JSON.stringify(value)};
    s.dispatchEvent(new Event('change', { bubbles: true })); })()`); } catch (err) { throw new Error(`pick(${id}) failed: ${err}`); } };
  const texts = () => json(`({ lang: document.documentElement.lang, placeholder: document.getElementById('search-input').placeholder,
    select: document.getElementById('select-toggle').textContent, flight: document.getElementById('flight-toggle').textContent,
    help: document.querySelector('#hud .hud-help li')?.textContent ?? '', hud: document.querySelector('#hud .hud-status')?.textContent ?? '',
    clusters: [...document.querySelectorAll('#labels .label-cluster')].map((el) => el.textContent), picker: document.getElementById('hud-lang')?.value,
    titles: ${b}.layout().stars.map((s) => s.title), marker: globalThis.__languageMarker ?? null })`);
  const japanese = (list) => list.some((n) => /[\p{Script=Han}\p{Script=Katakana}]/u.test(n));
  try {
    await waitUntil("!document.getElementById('first-run')?.hidden", 20_000, 200);
    const before = await evalIn("document.querySelector('#first-run h1').textContent");
    await pick("first-run-lang-select", "en");
    const after = await evalIn("document.querySelector('#first-run h1').textContent");
    await pick("first-run-lang-select", "auto");
    const back = await evalIn("document.querySelector('#first-run h1').textContent");
    check(before === "ブクスペを始める前に" && after === "Before you begin" && back === before,
      "初回の説明画面に言語の選択欄があり、切り替えると説明画面の文言がその場で変わる（データを読み込む前）", `${before} → ${after} → ${back}`);
    await evalIn("document.getElementById('first-run-start').click()");
    await ready();
    await evalIn(`${b}.resetCamera()`);
    await sleep(2000);
    await evalIn("globalThis.__languageMarker = 'same-page'");
    const ja = await texts();
    await evalIn("document.getElementById('hud-toggle').click()");
    await pick("hud-lang", "en");
    // サンプルの言語も変わるので、読み込み直る（__languageMarker は消える）
    await ready();
    await sleep(1500);
    const en = await texts();
    const changed = en.lang === "en" && en.placeholder === "Search the stars" && en.select === "Select" && en.flight === "Fly" &&
      /move/i.test(en.help) && /clusters?$/.test(en.hud) && en.clusters.length > 0 && !japanese(en.clusters) && !japanese(en.titles) &&
      japanese(ja.clusters) && japanese(ja.titles);
    check(changed && en.marker === null,
      "ⓘ のパネルで English を選ぶと、その言語のサンプルへ読み込み直り、画面の文言と星団名・サンプルのブックマークが英語に変わる",
      `${ja.placeholder}・${ja.select}・${ja.clusters.slice(0, 3).join("/")} → ${en.placeholder}・${en.select}・${en.clusters.slice(0, 3).join("/")}・${en.hud}・読み込み直った ${en.marker === null}`);
    await send("Page.reload", {}, sessionId);
    await ready();
    await sleep(1500);
    const reloaded = await texts();
    const stored = await evalIn("localStorage.getItem('bukusupe:lang')");
    check(reloaded.lang === "en" && reloaded.placeholder === "Search the stars" && reloaded.picker === "en" && stored === "en" && !japanese(reloaded.titles),
      "選んだ言語（English）は保存され、ブラウザの言語が日本語でも、次に開いたときに英語のサンプルのまま",
      `lang ${reloaded.lang}・${reloaded.placeholder}・選択欄 ${reloaded.picker}・保存 ${stored}`);
    await pick("hud-lang", "ja");
    await ready();
    await sleep(1500);
    const jaAgain = await texts();
    check(jaAgain.lang === "ja" && jaAgain.placeholder === "星を探す" && jaAgain.flight === "飛行" && japanese(jaAgain.titles) &&
      [...jaAgain.clusters].sort().join() === [...ja.clusters].sort().join(),
      "日本語に戻すと、文言・星団名・サンプルのブックマークが元の日本語に戻る（同じデータなので配置も同じ）",
      `${jaAgain.lang}・${jaAgain.placeholder}・${jaAgain.flight}・${jaAgain.clusters.join("/")}（元 ${ja.clusters.join("/")}）`);
  } finally {
    await app.close();
  }
}

for (const [label, run] of [["日本語の画面", () => tour("ja")], ["英語の画面", () => tour("en")], ["言語の切り替え", switching]]) {
  try { await run(); } catch (err) { check(false, `${label}の確認を最後まで行えた`, String(err).slice(0, 160)); }
}
console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
