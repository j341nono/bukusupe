/**
 * 動きがあるときだけ描く（docs/BENCHMARK.md「改善の余地」）の確認。
 *   node scripts/check-idle.mjs   （check:ext の中で動く）
 *
 *  1. 何もしない状態で数秒たつと、描画の回数（__bukusupe.frames()）が増えなくなる
 *  2. 止まった状態から、移動（キー・ドラッグ・ホイール）・検索・星座の選択を行うと、すぐに描画が再開し、
 *     落ち着いたらまた止まる。止まった後の画面が、その状態を描き直した画面と同じ（古いコマのまま止まっていない）
 *  3. 止まった状態から飛行モードに入ると、操作しなくても毎コマ描き、出るとまた止まる
 * 画面の比較はスクリーンショットの画素で行う。「描き直した画面」は確認用の __bukusupe.renderNow() で 1 コマ描いたもの。
 */
import { resolve } from "node:path";
import { createChecker, decodePng, launchExtension, sleep } from "./lib/harness.mjs";

const DIST = resolve(process.argv[2] ?? "dist-debug");
const { check, problems } = createChecker();
const app = await launchExtension(DIST);
const { send, evalIn, tryEval, waitUntil, key, press, screenshot } = app;
const b = "globalThis.__bukusupe";
const json = async (expression) => JSON.parse((await tryEval(`JSON.stringify(${expression})`)) ?? "null");
const frames = () => evalIn(`${b}.frames()`);

/** 1 秒のあいだ描画の回数が増えなければ「止まっている」。最大 limitMs 待つ。止まったら true */
async function waitIdle(limitMs = 8000) {
  const end = Date.now() + limitMs;
  while (Date.now() < end) {
    const a = await frames();
    await sleep(1000);
    if ((await frames()) - a <= 0) return true;
  }
  return false;
}

/** 止まった後の画面が、同じ状態を描き直した画面と同じか（違う画素の数を返す） */
async function staleDiff() {
  const before = decodePng(await screenshot());
  await evalIn(`${b}.renderNow?.()`);
  await sleep(150);
  const after = decodePng(await screenshot());
  let diff = 0;
  for (let i = 0; i < before.data.length; i += 4) {
    if (Math.abs(before.data[i] - after.data[i]) + Math.abs(before.data[i + 1] - after.data[i + 1]) + Math.abs(before.data[i + 2] - after.data[i + 2]) > 6) diff++;
  }
  return diff;
}

/**
 * 止まった状態から action を行い、すぐに描画が再開するか・落ち着いたら止まるか・止まった画面が正しいかを見る。
 * verify は、落ち着いた後の状態の確かめ（true / false と説明）。
 */
async function fromIdle(label, action, verify) {
  const idleBefore = await waitIdle();
  const f0 = await frames();
  const started = Date.now();
  const acting = action();   // 操作の途中から見張る（キーを押している間なども含めて）
  // 操作を始めてから、最初のコマが描かれるまでの時間
  let resumedMs = null;
  while (Date.now() - started < 2000) {
    if ((await frames()) > f0) { resumedMs = Date.now() - started; break; }
    await sleep(10);
  }
  await acting;
  const idleAfter = await waitIdle(12_000);
  const state = await verify();
  const diff = idleAfter ? await staleDiff() : null;
  check(idleBefore && resumedMs != null && resumedMs <= 200 && idleAfter && state.ok && diff === 0,
    `止まった状態から${label}と、すぐに描画が再開し、落ち着いたら止まる。止まった画面は描き直した画面と同じ`,
    `前 ${idleBefore ? "停止" : "描き続け"}・再開まで ${resumedMs ?? "—"} ms・後 ${idleAfter ? "停止" : "描き続け"}・${state.text}・描き直しとの違い ${diff ?? "—"} 画素`);
}

try {
  const ready = await waitUntil(`document.body.dataset.phase === 'ready' && (${b}?.layout()?.stars.length ?? 0) > 0`, 300_000, 500);
  check(ready, "埋め込みが終わって星が並ぶ");
  await evalIn(`${b}.resetCamera()`);
  await sleep(1500);

  // --- 1. 何もしない状態で数秒たつと、描画の回数が増えなくなる ---
  await sleep(3000);
  const a = await frames();
  await sleep(1500);
  const idleFrames = (await frames()) - a;
  check(idleFrames <= 0, "何もしない状態で数秒たつと、描画の回数が増えなくなる", `1.5 秒で ${idleFrames} コマ`);

  // --- 2. 移動（キー・ドラッグ・ホイール） ---
  let camera = null;
  await fromIdle("キー（D）で移動する", async () => {
    camera = await json(`${b}.cameraState()`);
    await press("KeyD", "d", 600);
  }, async () => {
    const after = await json(`${b}.cameraState()`);
    const moved = Math.hypot(after.x - camera.x, after.y - camera.y);
    return { ok: moved > 1, text: `カメラ ${moved.toFixed(1)} 動いた` };
  });
  const freePoint = await json(`(() => { for (let y = 380; y <= 600; y += 20) for (let x = 300; x <= 420; x += 20)
    if (document.elementFromPoint(x, y)?.id === 'space') return { x, y }; return { x: 360, y: 420 }; })()`);
  await fromIdle("ドラッグで移動する", async () => {
    camera = await json(`${b}.cameraState()`);
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: freePoint.x, y: freePoint.y }, app.sessionId);
    await send("Input.dispatchMouseEvent", { type: "mousePressed", x: freePoint.x, y: freePoint.y, button: "left", buttons: 1, clickCount: 1 }, app.sessionId);
    for (let i = 1; i <= 20; i++) {
      await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: freePoint.x + i * 12, y: freePoint.y, button: "left", buttons: 1 }, app.sessionId);
      await sleep(16);
    }
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: freePoint.x + 240, y: freePoint.y, button: "left", buttons: 0, clickCount: 1 }, app.sessionId);
  }, async () => {
    const after = await json(`${b}.cameraState()`);
    const moved = Math.hypot(after.x - camera.x, after.y - camera.y);
    return { ok: moved > 1, text: `カメラ ${moved.toFixed(1)} 動いた` };
  });
  await fromIdle("ホイールで拡大する", async () => {
    camera = await json(`${b}.cameraState()`);
    await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: 640, y: 400, deltaX: 0, deltaY: -400 }, app.sessionId);
  }, async () => {
    const after = await json(`${b}.cameraState()`);
    return { ok: after.distance < camera.distance * 0.95, text: `距離 ${camera.distance.toFixed(0)}→${after.distance.toFixed(0)}` };
  });
  await evalIn(`${b}.resetCamera()`);

  // --- 検索（引き寄せ）と、検索を消して戻る ---
  await fromIdle("検索する", () => evalIn(`(async () => { await ${b}.searchNow('宇宙を感じたい'); })()`), async () => {
    const g = await json(`${b}.searchGeometry()`);
    const info = await json(`${b}.renderInfo()`);
    return { ok: g.stars.length > 0 && info.calls >= 10, text: `軌道 ${g.stars.length} 件・描画の呼び出し ${info.calls}（ブラックホールと軌道を含む）` };
  });
  // 星座を作る（保存の演出も、最後まで描いてから止まる）
  await fromIdle("星座を保存する", async () => {
    await evalIn("document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true, bubbles: true }))");
    await evalIn("document.getElementById('constellation-name-input').value = '止まる星座'");
    await evalIn("document.getElementById('constellation-save').click()");
  }, async () => {
    await waitUntil(`${b}.constellationState().active === null`, 8000);
    const s = await json(`${b}.constellationState()`);
    return { ok: s.rows.length === 1 && s.animation.phase === "done", text: `星座 ${s.rows.length} 件・演出 ${s.animation.phase}` };
  });
  await evalIn("document.getElementById('search-input').blur()");
  const constellationId = await evalIn(`${b}.constellationState().rows[0]?.id ?? null`);
  await fromIdle("星座を選ぶ", async () => {
    camera = await json(`${b}.cameraState()`);
    await evalIn(`${b}.recallConstellation(${JSON.stringify(constellationId)})`);
  }, async () => {
    const s = await json(`${b}.constellationState()`);
    const after = await json(`${b}.cameraState()`);
    const name = await evalIn("document.getElementById('constellation-name').classList.contains('is-visible')");
    return { ok: s.active === constellationId && name && Math.hypot(after.x - camera.x, after.y - camera.y) > 0.5,
      text: `選択 ${s.active === constellationId ? "あり" : "なし"}・名前 ${name ? "表示" : "なし"}・カメラが寄った` };
  });

  // --- 3. 飛行モード：操作しなくても毎コマ描き、出るとまた止まる ---
  const idleBeforeFlight = await waitIdle();
  await key("keydown", "KeyF", "f");
  await waitUntil(`${b}.flightState().phase === 'flying'`, 5000, 100);
  const f1 = await frames();
  await sleep(1000);
  const flightFrames = (await frames()) - f1;
  await key("keydown", "Escape", "Escape");
  await waitUntil(`${b}.flightState().phase === 'idle'`, 5000, 100);
  const idleAfterFlight = await waitIdle(12_000);
  check(idleBeforeFlight && flightFrames >= 30 && idleAfterFlight,
    "止まった状態から飛行モードに入ると、操作しなくても毎コマ描き、地図へ戻ると止まる",
    `前 ${idleBeforeFlight ? "停止" : "描き続け"}・飛行中 ${flightFrames} コマ/秒・戻った後 ${idleAfterFlight ? "停止" : "描き続け"}`);

  // --- 4. 何度止まって再開しても、描画のループが重ならない（1 秒に描く回数が、画面の書き換えの回数を超えない） ---
  // ここまでで何度も止まり・再開している。止めずに描かせた 1 秒で、描いた回数とページの requestAnimationFrame の回数を比べる
  await waitIdle();
  const overlap = JSON.parse((await evalIn(`(async () => {
    ${b}.setContinuousRender(true);
    await new Promise((r) => setTimeout(r, 300));
    let raf = 0, run = true;
    const count = () => { if (!run) return; raf++; requestAnimationFrame(count); };
    requestAnimationFrame(count);
    const f0 = ${b}.frames();
    await new Promise((r) => setTimeout(r, 1000));
    run = false;
    const drawn = ${b}.frames() - f0;
    ${b}.setContinuousRender(false);
    return JSON.stringify({ drawn, raf });
  })()`)) ?? "null");
  check(overlap && overlap.raf > 20 && overlap.drawn <= overlap.raf * 1.1,
    "何度止まって再開しても、描画のループが重ならない（1 秒に描く回数が画面の書き換えの回数を超えない）",
    overlap ? `1 秒で描画 ${overlap.drawn} 回・画面の書き換え ${overlap.raf} 回` : "測れない");

  const bad = app.events.filter((e) => e.method === "Runtime.exceptionThrown" ||
    (e.method === "Log.entryAdded" && ["error", "warning"].includes(e.params.entry.level) && !/GPU stall|GL Driver|software WebGL/.test(e.params.entry.text)));
  check(bad.length === 0, "エラー・警告が出ない", bad.slice(0, 2).map((e) => e.params?.entry?.text ?? e.params?.exceptionDetails?.text).join(" / "));
} catch (err) {
  console.error(err);
  problems.push(String(err));
} finally {
  await app.close();
}
console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
