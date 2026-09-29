/**
 * Chrome ウェブストアの掲載用の画像を作る（docs/RELEASE.md 段階 3、docs/store/listing.ja.md の表）。
 *   npm run store:assets   （確認用のビルド dist-debug/ を作ってから動かす）
 *
 * 使い捨てのプロファイルの Chrome で、サンプルの宇宙（?sample=1）を開いて撮る。自分のブックマークなど個人の情報は映らない。
 * 画面の大きさは Emulation.setDeviceMetricsOverride で、ストアの決まりの大きさにそろえる（端末の画素の比は 1）。
 * スクリーンショットは、英語の画面（en/、主の掲載）と日本語の画面（ja/、日本語の掲載）の 2 組。ブラウザの言語を変えて開き、画面の「自動」で切り替える。
 *  - {en,ja}/screenshot-1-map.png           1280×800  銀河の地図
 *  - {en,ja}/screenshot-2-search.png        1280×800  ブラックホール検索
 *  - {en,ja}/screenshot-3-constellation.png 1280×800  星座（選んだ状態）
 *  - {en,ja}/screenshot-4-selection.png     1280×800  選択モード（複数の星団から選んだ状態）
 *  - {en,ja}/screenshot-5-flight.png        1280×800  3D 飛行モード（近づいた星の窓）
 *  - icon-128.png                   128×128   manifest のアイコンを 96px に縮めて透明な余白を付ける
 * 宣伝用の画像（promo-small-440x280.png・promo-marquee-1400x560.png）は、使う人が手で作った画像をリポジトリで管理する
 * （元の高解像度の画像は promo-small-1572x1001.png・promo-marquee-1983x793.png）。このスクリプトは作らず、上書きもしない。
 * 大きさと形式は check-store が確かめる。
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { launchExtension, sleep } from "./lib/harness.mjs";
import { writeStoreIcon } from "./store-icon.mjs";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const OUT = join(ROOT, "docs/store/assets");
const b = "globalThis.__bukusupe";
/** 言語ごとの文言（検索語と星座の名前） */
const WORDS = {
  en: { query: "stargazing", constellation: "Night sky" },
  ja: { query: "夜空を眺めたい", constellation: "夜空の記録" },
};

for (const lang of ["ja", "en"]) {
  mkdirSync(join(OUT, lang), { recursive: true });
  await capture(lang);
}
writeStoreIcon(ROOT);
console.log("  icon-128.png");

async function capture(lang) {
const app = await launchExtension(join(ROOT, "dist-debug"), { query: "sample=1&debug=1", lang: lang === "en" ? "en-US" : "ja" });
const { send, evalIn, waitUntil } = app;
const json = async (expr) => JSON.parse((await evalIn(`JSON.stringify(${expr})`)) ?? "null");
const key = (type, code, name) => evalIn(`window.dispatchEvent(new KeyboardEvent(${JSON.stringify(type)}, { code: ${JSON.stringify(code)}, key: ${JSON.stringify(name)}, bubbles: true }))`);
async function size(width, height) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false }, app.sessionId);
  await sleep(600);
}
async function shot(file) {
  await sleep(300);
  const { data } = await send("Page.captureScreenshot", { format: "png" }, app.sessionId);
  writeFileSync(join(OUT, file), Buffer.from(data, "base64"));
  console.log(`  ${file}`);
}
const words = WORDS[lang];
async function clearSearch() {
  await evalIn("(() => { const i = document.getElementById('search-input'); i.value = ''; i.dispatchEvent(new Event('input')); i.blur(); })()");
  await sleep(1200);
}

try {
  await waitUntil(`document.body.dataset.phase === 'ready' && ${b}?.state.kind === 'sample'`, 300_000, 500);
  await size(1280, 800);
  // 最初の案内（「ドラッグで移動…」）を消しておく
  await evalIn("document.getElementById('hint')?.remove()");
  await evalIn(`${b}.resetCamera()`);
  await sleep(2500);
  const layout = await json(`${b}.layout()`);

  // 1. 銀河の地図
  await shot(`${lang}/screenshot-1-map.png`);

  // 2. ブラックホール検索
  await evalIn(`${b}.searchNow(${JSON.stringify(words.query)})`);
  await sleep(3000);
  await shot(`${lang}/screenshot-2-search.png`);

  // 3. 星座：検索から選択モードに入り、名前を付けて保存し、呼び出す
  await evalIn("document.getElementById('constellation-create').click()");
  await evalIn("document.getElementById('selection-new').click()");
  await evalIn(`document.getElementById('constellation-name-input').value = ${JSON.stringify(words.constellation)}`);
  await evalIn("document.getElementById('constellation-save').click()");
  await waitUntil(`${b}.constellationState().rows.length === 1 && ${b}.constellationState().animation.phase === 'done' &&
    ${b}.constellationState().active === null`, 20_000, 200);
  await sleep(1500);
  const id = await evalIn(`${b}.constellationState().rows[0].id`);
  await evalIn(`${b}.recallConstellation(${JSON.stringify(id)})`);
  await sleep(2500);
  await shot(`${lang}/screenshot-3-constellation.png`);
  await evalIn(`${b}.recallConstellation(${JSON.stringify(id)})`);   // 選択を解く
  await sleep(600);

  // 4. 選択モード：画面の上のほうの 3 つの星団から、それぞれ上位の星を選ぶ（画面の下の操作の欄に隠れないように）
  await evalIn(`${b}.resetCamera()`);
  await sleep(1200);
  await key("keydown", "KeyC", "c");
  await key("keyup", "KeyC", "c");
  const clusters = [...layout.clusters].filter((c) => c.count > 0).sort((p, q) => q.y - p.y).slice(0, 3).map((c) => c.index);
  const picks = layout.stars.filter((s) => clusters.includes(s.cluster) && s.rank < 3).map((s) => s.id);
  for (const star of picks) await evalIn(`${b}.toggleEditMember(${JSON.stringify(star)})`);
  await sleep(1800);
  await shot(`${lang}/screenshot-4-selection.png`);
  await key("keydown", "Escape", "Escape");
  await key("keyup", "Escape", "Escape");
  await sleep(600);

  // 5. 3D 飛行モード：いちばん大きな星団の外側の星の前へ
  await key("keydown", "KeyF", "f");
  await key("keyup", "KeyF", "f");
  await waitUntil(`(() => { const f = ${b}.flightState?.(); return !!f && f.active && !f.transitioning; })()`, 10_000, 100);
  const scale = (await json(`${b}.flightState()`))?.scale ?? 4;
  const biggest = [...layout.clusters].sort((p, q) => q.count - p.count)[0].index;
  const target = layout.stars.filter((s) => s.cluster === biggest).sort((p, q) => q.rank - p.rank)[0];
  // 窓が開く範囲（WINDOW_RADIUS＝8×scale）の内側に置き、いちばん遅い速さにして、操作の説明が小さくなる（約 10 秒）まで待つ
  await evalIn(`${b}.flightTeleport(${JSON.stringify(target.id)}, ${6 * scale})`);
  await key("keydown", "ShiftLeft", "Shift");
  await sleep(1500);
  await key("keyup", "ShiftLeft", "Shift");
  await waitUntil(`document.getElementById('flight-help')?.classList.contains('is-compact')`, 15_000, 200);
  await waitUntil(`document.querySelectorAll('.flight-window').length > 0`, 5000, 100);
  await sleep(1000);
  await shot(`${lang}/screenshot-5-flight.png`);
  await key("keydown", "Escape", "Escape");
  await key("keyup", "Escape", "Escape");
  await waitUntil(`(() => { const f = ${b}.flightState?.(); return !!f && !f.active; })()`, 10_000, 100);
} finally {
  await app.close();
}
}
