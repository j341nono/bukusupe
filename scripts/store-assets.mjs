/**
 * Chrome ウェブストアの掲載用の画像を作る（docs/RELEASE.md 段階 3、docs/store/listing.ja.md の表）。
 *   npm run store:assets   （確認用のビルド dist-debug/ を作ってから動かす）
 *
 * 使い捨てのプロファイルの Chrome で、サンプルの宇宙（?sample=1）を開いて撮る。自分のブックマークなど個人の情報は映らない。
 * 画面の大きさは Emulation.setDeviceMetricsOverride で、ストアの決まりの大きさにそろえる（端末の画素の比は 1）。
 *  - screenshot-1-map.png           1280×800  銀河の地図
 *  - screenshot-2-search.png        1280×800  ブラックホール検索
 *  - screenshot-3-constellation.png 1280×800  星座（選んだ状態）
 *  - screenshot-4-selection.png     1280×800  選択モード（複数の星団から選んだ状態）
 *  - screenshot-5-flight.png        1280×800  3D 飛行モード（近づいた星の窓）
 *  - promo-small-440x280.png        440×280   小さな宣伝用画像（星空と名前だけ）
 *  - promo-marquee-1400x560.png     1400×560  大きな宣伝用画像（星空と名前と一行の説明）
 *  - icon-128.png                   128×128   manifest のアイコンを 96px に縮めて透明な余白を付ける
 * 宣伝用の画像は、画面の部品を隠した星空の上に、DESIGN.md の書体（名前は明朝）と色（藍・生成り）で名前を重ねて撮る。
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { launchExtension, sleep } from "./lib/harness.mjs";
import { writeStoreIcon } from "./store-icon.mjs";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const OUT = join(ROOT, "docs/store/assets");
const b = "globalThis.__bukusupe";
mkdirSync(OUT, { recursive: true });

const app = await launchExtension(join(ROOT, "dist-debug"), { query: "sample=1&debug=1" });
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
  await shot("screenshot-1-map.png");

  // 2. ブラックホール検索
  await evalIn(`${b}.searchNow('夜空を眺めたい')`);
  await sleep(3000);
  await shot("screenshot-2-search.png");

  // 3. 星座：検索から選択モードに入り、名前を付けて保存し、呼び出す
  await evalIn("document.getElementById('constellation-create').click()");
  await evalIn("document.getElementById('selection-new').click()");
  await evalIn("document.getElementById('constellation-name-input').value = '夜空の記録'");
  await evalIn("document.getElementById('constellation-save').click()");
  await waitUntil(`${b}.constellationState().rows.length === 1 && ${b}.constellationState().animation.phase === 'done' &&
    ${b}.constellationState().active === null`, 20_000, 200);
  await sleep(1500);
  const id = await evalIn(`${b}.constellationState().rows[0].id`);
  await evalIn(`${b}.recallConstellation(${JSON.stringify(id)})`);
  await sleep(2500);
  await shot("screenshot-3-constellation.png");
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
  await shot("screenshot-4-selection.png");
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
  await shot("screenshot-5-flight.png");
  await key("keydown", "Escape", "Escape");
  await key("keyup", "Escape", "Escape");
  await waitUntil(`(() => { const f = ${b}.flightState?.(); return !!f && !f.active; })()`, 10_000, 100);

  // 宣伝用の画像：画面の部品とラベルを隠した星空に、名前を重ねる（星座の金の線は、自分で名付けた星座としてそのまま残す）
  await evalIn(`(() => {
    const style = document.createElement('style');
    style.textContent = '#search-box, #constellation-list, #constellation-name, #flight-toggle, #select-toggle, #relayout, #hint, #hud, #hud-toggle, #labels, #star-card, #selection-bar, #constellation-novae { display: none !important; }' +
      '#promo { position: fixed; inset: 0; display: flex; flex-direction: column; justify-content: center; pointer-events: none; z-index: 10;' +
      ' background: radial-gradient(ellipse at 30% 50%, rgba(7,10,24,0.78) 0%, rgba(7,10,24,0.35) 45%, rgba(7,10,24,0) 70%); }' +
      '#promo h1 { margin: 0; font-family: "Hiragino Mincho ProN", "Yu Mincho", serif; font-weight: normal; color: #ece6d6; letter-spacing: 0.32em;' +
      ' text-shadow: 0 0 18px rgba(4,6,16,0.95); }' +
      '#promo p { margin: 0; font-family: "Hiragino Mincho ProN", "Yu Mincho", serif; color: #a29d8c; letter-spacing: 0.3em; text-shadow: 0 0 12px rgba(4,6,16,0.95); }';
    document.head.append(style);
    const promo = document.createElement('div');
    promo.id = 'promo';
    const h1 = document.createElement('h1'); h1.textContent = 'ブクスペ';
    const p = document.createElement('p'); p.textContent = 'ブックマークの宇宙';
    promo.append(h1, p);
    document.body.append(promo);
  })()`);
  const promo = async (width, height, file, title, sub, left) => {
    await size(width, height);
    await evalIn(`${b}.resetCamera()`);
    await evalIn(`(() => { const el = document.getElementById('promo');
      el.style.paddingLeft = '${left}px'; el.querySelector('h1').style.fontSize = '${title}px'; el.querySelector('p').style.fontSize = '${sub}px';
      el.querySelector('p').style.marginTop = '${Math.round(title * 0.35)}px'; })()`);
    await sleep(2500);
    await shot(file);
  };
  await promo(1400, 560, "promo-marquee-1400x560.png", 64, 22, 150);
  await promo(440, 280, "promo-small-440x280.png", 34, 12, 40);

  writeStoreIcon(ROOT);
  console.log("  icon-128.png");
} finally {
  await app.close();
}
