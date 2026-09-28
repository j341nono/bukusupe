/**
 * 飛行モードの操作の確認（SPEC 13 章「操作」）。
 *   node scripts/check-flight-controls.mjs   （check:ext の中で動く。確認用のビルド dist-debug/ を使う。サンプルのデータ源）
 *
 * キー入力はページ内の KeyboardEvent（CDP の Input.dispatchKeyEvent は macOS のヘッドレス Chrome で固まる）。マウスは CDP のマウスの入力。
 *  1. 何も操作しなくても、宇宙船が前へ進み続ける
 *  2. W・↑ で機首が上を、S・↓ で下を、A・← で左を、D・→ で右を向く
 *  3. W を押し続けると一回転して機首が元の向きに戻り、その途中でカメラの上の向きが反転する。真上・真下を通っても向きが乱れない
 *  4. Space で加速し、Shift で減速する。減速しても速さが 0 にならない
 *  5. マウスのボタンを離しているときは、マウスの位置で機首が動かない（押してドラッグしている間だけ向きが変わる）
 *  6. 操作をやめると、左右の傾きが水平に戻り、機首の上下の向きは変わらない
 *  7. 星空の範囲を越えると、機首が中心のほうへ向き直る（範囲の中では向き直らない）
 */
import { resolve } from "node:path";
import { createChecker, launchExtension, sleep } from "./lib/harness.mjs";

const DIST = resolve(process.argv[2] ?? "dist-debug");
const b = "globalThis.__bukusupe";
const { check, problems } = createChecker();
const app = await launchExtension(DIST, { query: "sample=1&debug=1" });
const { send, evalIn, tryEval, waitUntil } = app;
const json = async (expr) => JSON.parse((await tryEval(`JSON.stringify(${expr})`)) ?? "null");
/**
 * 飛行の状態。変更前の版（yaw・pitch だけで向きを持ち、forward などを返さない）でも、動きそのもので比べられるよう、
 * 足りない値は yaw・pitch から求める（規則 8：変更前のコードで NG になるのを見るため）
 */
const state = async () => {
  const st = await json(`${b}.flightState?.() ?? null`);
  if (st?.ship && !st.ship.forward) {
    const { yaw, pitch } = st.ship;
    st.ship.forward = [-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch)];
    st.ship.up = [Math.sin(yaw) * Math.sin(pitch), Math.cos(pitch), Math.cos(yaw) * Math.sin(pitch)];
    st.ship.cameraUp = [0, 1, 0];
    st.ship.level = 0;
  }
  return st;
};
const key = (type, code, keyName) => evalIn(`window.dispatchEvent(new KeyboardEvent(${JSON.stringify(type)},
  { code: ${JSON.stringify(code)}, key: ${JSON.stringify(keyName)}, bubbles: true, cancelable: true }))`);
const hold = async (code, keyName, ms) => { await key("keydown", code, keyName); await sleep(ms); await key("keyup", code, keyName); };
const mouse = (type, x, y, extra = {}) => send("Input.dispatchMouseEvent", { type, x, y, ...extra }, app.sessionId);
const dot = (a, c) => a[0] * c[0] + a[1] * c[1] + a[2] * c[2];
const angle = (a, c) => Math.acos(Math.max(-1, Math.min(1, dot(a, c))));
/** 機首の向きの、上から見た角度（地図の上が 0、左が正） */
const heading = (f) => Math.atan2(-f[0], -f[2]);
const finite = (st) => !!st && [st.ship.x, st.ship.y, st.ship.z, st.ship.speed, ...st.ship.forward, ...st.ship.up, ...st.ship.cameraUp].every(Number.isFinite);
async function reset() {
  await evalIn(`${b}.flightReset()`);
  await sleep(700);   // 向きを変える速さとカメラの遅れが落ち着くまで
}

try {
  await waitUntil(`document.body.dataset.phase === 'ready'`, 300_000, 500);
  await key("keydown", "KeyF", "f");
  await key("keyup", "KeyF", "f");
  const entered = await waitUntil(`(() => { const f = ${b}.flightState?.(); return !!f && f.active && !f.transitioning; })()`, 8000, 100);
  check(entered, "F で飛行モードに入る");

  // --- 1. 操作しなくても前へ進む ---
  await reset();
  const s0 = await state();
  await sleep(1500);
  const s1 = await state();
  const moved = s0 && s1 ? Math.hypot(s1.ship.x - s0.ship.x, s1.ship.y - s0.ship.y, s1.ship.z - s0.ship.z) : 0;
  const along = s0 && s1 ? ((s1.ship.x - s0.ship.x) * s0.ship.forward[0] + (s1.ship.y - s0.ship.y) * -s0.ship.forward[2] +
    (s1.ship.z - s0.ship.z) * s0.ship.forward[1]) : 0;
  check(s1 && s1.ship.speed > 0 && moved > 0.5 && along > moved * 0.9, "何も操作しなくても、宇宙船が機首の向きへ進み続ける",
    s1 ? `1.5 秒で ${moved.toFixed(1)}（機首の向きへ ${along.toFixed(1)}）・速さ ${s1.ship.speed.toFixed(1)}` : "測れない");

  // --- 2. 機首の向き ---
  const turns = [];
  for (const [code, name, kind] of [["KeyW", "w", "up"], ["ArrowUp", "ArrowUp", "up"], ["KeyS", "s", "down"], ["ArrowDown", "ArrowDown", "down"],
    ["KeyA", "a", "left"], ["ArrowLeft", "ArrowLeft", "left"], ["KeyD", "d", "right"], ["ArrowRight", "ArrowRight", "right"]]) {
    await reset();
    const a = (await state())?.ship.forward;
    await hold(code, name, 700);
    const c = (await state())?.ship.forward;
    if (!a || !c) { turns.push({ code, ok: false, text: "測れない" }); continue; }
    const dy = c[1] - a[1], dh = heading(c) - heading(a);
    const ok = kind === "up" ? dy > 0.2 : kind === "down" ? dy < -0.2 : kind === "left" ? dh > 0.2 && Math.abs(dy) < 0.1 : dh < -0.2 && Math.abs(dy) < 0.1;
    turns.push({ code, ok, text: `${code} 上下 ${dy.toFixed(2)}・左右 ${dh.toFixed(2)}` });
  }
  check(turns.every((t) => t.ok), "W と ↑ で機首が上を、S と ↓ で下を、A と ← で左を、D と → で右を向く", turns.map((t) => t.text).join("／"));

  // --- 3. 宙返り ---
  await reset();
  const start = await state();
  const samples = [];
  await key("keydown", "KeyW", "w");
  const t0 = Date.now();
  let total = 0, prev = start?.ship.forward, back = false;
  while (Date.now() - t0 < 9000) {
    await sleep(80);
    const st = await state();
    if (!st) continue;
    samples.push(st);
    if (prev) total += angle(prev, st.ship.forward);
    prev = st.ship.forward;
    if (total > Math.PI * 1.7 && dot(st.ship.forward, start.ship.forward) > 0.97) { back = true; break; }
  }
  await key("keyup", "KeyW", "w");
  const steps = samples.slice(1).map((st, i) => angle(samples[i].ship.forward, st.ship.forward));
  const minCameraUp = Math.min(...samples.map((st) => st.ship.cameraUp[1]));
  const maxForwardY = Math.max(...samples.map((st) => st.ship.forward[1]));
  const minForwardY = Math.min(...samples.map((st) => st.ship.forward[1]));
  check(start && back && total > Math.PI * 1.7 && minCameraUp < -0.5,
    "W を押し続けると一回転して機首が元の向きに戻り、その途中でカメラの上の向きが反転する",
    `回った角度 ${(total * 180 / Math.PI).toFixed(0)} 度・元の向きに ${back ? "戻った" : "戻らない"}・カメラの上の向きの最小 y ${minCameraUp.toFixed(2)}・${((Date.now() - t0) / 1000).toFixed(1)} 秒`);
  check(samples.length > 10 && samples.every(finite) && maxForwardY > 0.98 && minForwardY < -0.98 && Math.max(...steps) < 0.5,
    "機首が真上・真下を通っても、向きの計算が乱れない（NaN や急な飛びが無い）",
    `記録 ${samples.length} 回・機首の y ${minForwardY.toFixed(2)}〜${maxForwardY.toFixed(2)}・1 回の変化の最大 ${(Math.max(...steps) * 180 / Math.PI).toFixed(1)} 度・数でない値 ${samples.filter((st) => !finite(st)).length}`);

  // --- 4. 加速・減速 ---
  await reset();
  const v0 = (await state())?.ship.speed;
  await hold("Space", " ", 1000);
  const v1 = (await state())?.ship.speed;
  await hold("ShiftLeft", "Shift", 4000);
  const slow = await state();
  await sleep(1000);
  const slow2 = await state();
  const creeping = slow && slow2 ? Math.hypot(slow2.ship.x - slow.ship.x, slow2.ship.y - slow.ship.y, slow2.ship.z - slow.ship.z) : 0;
  check(v0 > 0 && v1 > v0 * 1.3 && slow && slow.ship.speed > 0 && slow.ship.speed < v0 * 0.5 && Math.abs(slow.ship.speed - slow.minSpeed) < 1e-6 &&
    creeping > 0 && slow.ship.speed <= slow.maxSpeed * 0.1,
    "Space で加速し、Shift で減速する。減速しても速さが 0 にならず、ゆっくり進み続ける",
    `${v0?.toFixed(1)} → Space ${v1?.toFixed(1)} → Shift ${slow?.ship.speed?.toFixed?.(2)}（下限 ${slow?.minSpeed?.toFixed?.(2)}・最高 ${slow?.maxSpeed?.toFixed?.(1)}）・1 秒で ${creeping.toFixed(2)} 進む`);

  // --- 5. マウス ---
  await reset();
  const m0 = (await state())?.ship.forward;
  await mouse("mouseMoved", 1270, 790, { button: "none" });
  await evalIn("window.dispatchEvent(new MouseEvent('mousemove', { clientX: innerWidth - 2, clientY: innerHeight - 2 }))");
  await sleep(1200);
  const m1 = (await state())?.ship.forward;
  const idleTurn = m0 && m1 ? angle(m0, m1) : NaN;
  // ボタンを押して右へドラッグしている間は、右を向く。離すと止まる
  await mouse("mouseMoved", 640, 400, { button: "none" });
  await mouse("mousePressed", 640, 400, { button: "left", buttons: 1, clickCount: 1 });
  for (let i = 1; i <= 6; i++) { await mouse("mouseMoved", 640 + i * 40, 400, { button: "left", buttons: 1 }); await sleep(30); }
  await sleep(800);
  const m2 = (await state())?.ship.forward;
  await mouse("mouseReleased", 880, 400, { button: "left", buttons: 0, clickCount: 1 });
  await sleep(700);
  const m3 = (await state())?.ship.forward;
  await sleep(800);
  const m4 = (await state())?.ship.forward;
  const dragTurn = m1 && m2 ? heading(m2) - heading(m1) : NaN;
  const afterRelease = m3 && m4 ? Math.abs(heading(m4) - heading(m3)) : NaN;
  check(idleTurn < 0.02 && dragTurn < -0.2 && afterRelease < 0.05,
    "マウスのボタンを離しているときは、マウスの位置で機首が動かない（押して右へドラッグしている間だけ右を向き、離すと止まる）",
    `ボタンなしで右下へ置いて 1.2 秒 ${(idleTurn * 180 / Math.PI).toFixed(1)} 度・ドラッグ中 ${(dragTurn * 180 / Math.PI).toFixed(0)} 度・離した後 ${(afterRelease * 180 / Math.PI).toFixed(1)} 度`);

  // --- 6. 左右の傾きが水平に戻る（機首の上下は変わらない） ---
  await reset();
  await evalIn(`${b}.flightSetAngles(0.4, 0.35, 0.9)`);
  await sleep(100);
  const r0 = await state();
  await sleep(3500);
  const r1 = await state();
  check(r0 && r1 && Math.abs(r0.ship.level) > 0.5 && Math.abs(r1.ship.level) < 0.05 && Math.abs(r1.ship.forward[1] - r0.ship.forward[1]) < 0.02,
    "操作をやめると、左右の傾きが水平に戻り、機首の上下の向きは変わらない",
    r0 && r1 ? `傾き ${(r0.ship.level * 180 / Math.PI).toFixed(0)} 度 → ${(r1.ship.level * 180 / Math.PI).toFixed(1)} 度・機首の上下 ${r0.ship.forward[1].toFixed(3)} → ${r1.ship.forward[1].toFixed(3)}` : "測れない");

  // --- 7. 星空の範囲の外 ---
  const range = (await state())?.range;
  if (range) {
    // 範囲の中：外向きに置いても、向きは変わらない
    await evalIn(`${b}.flightPlace(${range.bound * 0.5}, 0, 0, ${range.bound * 0.9}, 0, 0)`);
    await sleep(100);
    const i0 = await state();
    await sleep(1000);
    const i1 = await state();
    // 範囲の外：外向きに置くと、中心のほうへ向き直る
    await evalIn(`${b}.flightPlace(${range.bound * 1.2}, 0, 0, ${range.bound * 1.6}, 0, 0)`);
    await sleep(100);
    const o0 = await state();
    await sleep(3000);
    const o1 = await state();
    const toCenter = (st) => { const p = [st.ship.x, st.ship.z, -st.ship.y]; const n = Math.hypot(...p); return p.map((v) => -v / n); };
    const inside = i0 && i1 ? angle(i0.ship.forward, i1.ship.forward) : NaN;
    const before = o0 ? angle(o0.ship.forward, toCenter(o0)) : NaN;
    const after = o1 ? angle(o1.ship.forward, toCenter(o1)) : NaN;
    check(inside < 0.02 && o0?.homing && before > 2.5 && after < before - 0.8,
      "星空の範囲を越えると、機首が中心のほうへ向き直る（範囲の中では向き直らない）",
      `範囲の中 ${(inside * 180 / Math.PI).toFixed(1)} 度・範囲の外で中心との角度 ${(before * 180 / Math.PI).toFixed(0)} → ${(after * 180 / Math.PI).toFixed(0)} 度`);
  } else check(false, "星空の範囲を越えると、機首が中心のほうへ向き直る", "範囲が分からない");

  await key("keydown", "Escape", "Escape");
  const left = await waitUntil(`(() => { const f = ${b}.flightState?.(); return !!f && !f.active; })()`, 8000, 100);
  const up = await json(`(() => { const v = ${b}.cameraState(); return v; })()`);
  check(left && !!up, "Esc で地図に戻る");

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
