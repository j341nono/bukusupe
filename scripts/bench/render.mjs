/**
 * 描画（件数ごと）と、何もしていないときの CPU 使用率。
 * mode = "headful"（画面ありの通常の Chrome、GPU あり。主）/ "headless"（ソフトウェア描画。参考）。
 *
 * 場面：止まっている地図、ドラッグでの移動、キー操作での移動、検索中（引き寄せの最中・落ち着いた後）、
 *       星座の保存の演出、飛行中（通常の飛行・窓が開いている状態）。各場面は捨てる 1 回＋5 回。
 * 1 コマの時間は、ページの中の requestAnimationFrame の間隔（画面の書き換えの間隔で頭打ちになる）と、
 * 1 コマの中で JS が使った時間（全体・ラベルと窓の位置の更新・描画の呼び出し）の両方を記録する。
 * CPU 使用率は CDP の SystemInfo.getProcessInfo の CPU 時間の差で、描画のループを回したとき・止めたときを比べる。
 */
import { COUNTS, PROFILE, REPEATS, SEARCH_CASES, captureEnvironment, clearSearch, guardLoad, keyEvent, launch, openApp, processMemory,
  recordFrames, saveResult, sleep, summarize, watchLoad, writeDataset } from "./lib.mjs";
import { dataset } from "./generate.mjs";

const SCENE_MS = 4000;
const IDLE_MS = 10_000;

/** 左から右へ、ゆっくりドラッグし続ける（ms ミリ秒）。 */
async function drag(app, ms) {
  // 押し始めは、ラベル（押せる）の上を避けて、地図の canvas が直接ある点にする
  const start0 = await app.json(`(() => {
    for (let y = 380; y <= 600; y += 20) for (let x = 300; x <= 420; x += 20) {
      if (document.elementFromPoint(x, y)?.id === 'space') return { x, y };
    }
    return { x: 360, y: 420 };
  })()`);
  const from = start0.x, to = start0.x + 560, y = start0.y;
  await app.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: from, y }, app.sessionId);
  await app.send("Input.dispatchMouseEvent", { type: "mousePressed", x: from, y, button: "left", buttons: 1, clickCount: 1 }, app.sessionId);
  const start = Date.now();
  let x = from;
  while (Date.now() - start < ms - 50) {
    x = from + ((Date.now() - start) / ms) * (to - from);
    await app.send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y, button: "left", buttons: 1 }, app.sessionId);
    await sleep(16);
  }
  await app.send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", buttons: 0, clickCount: 1 }, app.sessionId);
}

const camera = (app) => app.json("globalThis.__bukusupe.cameraState()");
const moved = (a, b) => (a && b ? Math.hypot(b.x - a.x, b.y - a.y) : null);

const scenes = [
  { name: "static", label: "止まっている地図", run: (app) => recordFrames(app, SCENE_MS) },
  { name: "drag", label: "ドラッグで移動", run: async (app) => {
    const before = await camera(app);
    const result = await recordFrames(app, SCENE_MS, () => drag(app, SCENE_MS));
    result.cameraMoved = moved(before, await camera(app));
    await sleep(400);
    await app.evalIn("globalThis.__bukusupe.resetCamera()");
    await sleep(800);
    return result;
  } },
  { name: "keys", label: "キー操作で移動", run: async (app) => {
    const before = await camera(app);
    const result = await recordFrames(app, SCENE_MS, async () => {
      await keyEvent(app, "keydown", "KeyD", "d"); await sleep(SCENE_MS / 2); await keyEvent(app, "keyup", "KeyD", "d");
      await keyEvent(app, "keydown", "KeyS", "s"); await sleep(SCENE_MS / 2 - 100); await keyEvent(app, "keyup", "KeyS", "s");
    });
    result.cameraMoved = moved(before, await camera(app));
    await sleep(400);
    await app.evalIn("globalThis.__bukusupe.resetCamera()");
    await sleep(800);
    return result;
  } },
  { name: "attract", label: "検索中（引き寄せの最中）", run: async (app, i) => {
    const query = SEARCH_CASES[i % SEARCH_CASES.length][0];
    const result = await recordFrames(app, 1200, () => app.json(`globalThis.__bukusupe.searchNow(${JSON.stringify(query)}).then(() => true)`));
    await sleep(1500);
    await clearSearch(app);
    await sleep(1200);
    return result;
  } },
  { name: "settled", label: "検索中（落ち着いた後）", run: async (app, i) => {
    const query = SEARCH_CASES[i % SEARCH_CASES.length][0];
    await app.json(`globalThis.__bukusupe.searchNow(${JSON.stringify(query)}).then(() => true)`);
    await sleep(3000);
    const result = await recordFrames(app, SCENE_MS);
    await clearSearch(app);
    await sleep(1200);
    return result;
  } },
  { name: "constellation", label: "星座の保存の演出", run: async (app, i) => {
    await app.json(`globalThis.__bukusupe.searchNow('宇宙を感じたい').then(() => true)`);
    await sleep(800);
    await app.evalIn("document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true, bubbles: true }))");
    await app.evalIn(`document.getElementById('constellation-name-input').value = '測定の星座 ${i}'`);
    const result = await recordFrames(app, 3000, () => app.evalIn("document.getElementById('constellation-save').click()"));
    await app.waitUntil("globalThis.__bukusupe.constellationState().animation.phase === 'done' && globalThis.__bukusupe.constellationState().active === null", 10_000, 200);
    await sleep(800);
    return result;
  } },
  { name: "flight", label: "飛行中（通常の飛行）", setup: async (app) => {
    await app.evalIn("globalThis.__bukusupe.enterFlight()");
    await app.waitUntil("globalThis.__bukusupe.flightState().phase === 'flying'", 10_000, 100);
  }, run: async (app) => {
    await app.evalIn("globalThis.__bukusupe.flightReset()");
    return recordFrames(app, SCENE_MS, async () => {
      await keyEvent(app, "keydown", "KeyW", "w"); await sleep(SCENE_MS - 100); await keyEvent(app, "keyup", "KeyW", "w");
    });
  } },
  { name: "windows", label: "飛行中（窓が開いている）", run: async (app, i) => {
    const star = await app.evalIn(`globalThis.__bukusupe.layout().stars[${i * 7}].id`);
    await app.evalIn(`globalThis.__bukusupe.flightTeleport(${JSON.stringify(star)}, 16)`);
    await sleep(600);
    return recordFrames(app, SCENE_MS);
  }, teardown: async (app) => {
    await app.evalIn("globalThis.__bukusupe.exitFlight()");
    await app.waitUntil("globalThis.__bukusupe.flightState().phase === 'idle'", 10_000, 100);
    await sleep(800);
  } },
];

async function cpuTimes(app, pids) {
  const info = (await app.send("SystemInfo.getProcessInfo", {})).processInfo;
  const byPid = new Map(info.map((p) => [p.id, p]));
  return { renderer: byPid.get(pids.renderer)?.cpuTime ?? null, gpu: byPid.get(pids.gpu)?.cpuTime ?? null,
    browser: info.find((p) => p.type === "browser")?.cpuTime ?? null };
}

export async function render({ mode = "headless", counts = COUNTS, allowLoad = false, idle = true, scenesToo = true }) {
  const headless = mode === "headless";
  const app = await launch({ profileDir: PROFILE, startPath: "manifest.json", headless, width: 1280, height: 800 });
  const env = captureEnvironment({ headless, mode });
  const load = watchLoad();
  const frames = [];
  const idleRows = [];
  const warnings = [];
  try {
    env.webgl = null;
    for (const n of counts) {
      const guard = await guardLoad(`描画 ${mode} ${n} 件`, { allowLoad });
      if (guard.warning) warnings.push(`${n} 件: ${guard.warning}`);
      console.log(`\n=== 描画 ${mode} ${n} 件 ===`);
      const bench = String(n);
      await writeDataset(app, bench, dataset(n));
      await openApp(app, { bench });
      env.webgl ??= await app.evalIn(`(() => { const gl = document.createElement('canvas').getContext('webgl2');
        const ext = gl?.getExtension('WEBGL_debug_renderer_info'); return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : null; })()`);
      if (!headless && /swiftshader|software/i.test(env.webgl ?? "")) throw new Error(`画面ありなのに GPU で描いていない（${env.webgl}）`);
      const visibility = await app.evalIn("document.visibilityState");
      if (!headless && visibility !== "visible") throw new Error(`Chrome の窓が見えていない（visibilityState=${visibility}）。窓を隠さないでください`);
      env.devicePixelRatio ??= await app.evalIn("devicePixelRatio");
      env.viewport ??= await app.evalIn("`${innerWidth}x${innerHeight}`");
      await app.evalIn("globalThis.__bukusupe.resetCamera()");
      await sleep(1500);
      for (const scene of scenesToo ? scenes : []) {
        if (scene.setup) await scene.setup(app);
        for (let i = 0; i <= REPEATS; i++) {
          // 移動の場面は、実際にカメラが動いたか（cameraMoved）も控える（入力が効かずに止まった地図を測っていないか）
          const result = await scene.run(app, i);
          if (i === 0) continue;
          frames.push({ n, scene: scene.name, label: scene.label, run: i, ...result });
        }
        if (["drag", "keys"].includes(scene.name) && frames.filter((f) => f.n === n && f.scene === scene.name).some((f) => !(f.cameraMoved > 0.5))) {
          warnings.push(`${n} 件の「${scene.label}」でカメラが動かなかった回がある`);
          console.warn(`  ⚠ ${scene.label}：カメラが動かなかった回がある`);
        }
        if (scene.teardown) await scene.teardown(app);
        const rows = frames.filter((f) => f.n === n && f.scene === scene.name);
        const s = summarize(rows.flatMap((f) => f.intervals));
        console.log(`  ${scene.label}：間隔 中央値 ${s.median?.toFixed(1)} ms・p95 ${s.p95?.toFixed(1)} ms・` +
          `${summarize(rows.map((f) => f.fps)).median?.toFixed(0)} コマ/秒・JS ${summarize(rows.flatMap((f) => f.total)).median?.toFixed(2)} ms`);
      }
      if (idle) {
        // 何もしていない地図：描画のループを回したとき・止めたときの CPU 使用率（1 コアを 100%）
        await app.evalIn("globalThis.__bukusupe.resetCamera()");
        await sleep(2000);
        const pids = processMemory(app);
        env.renderMode ??= await app.evalIn("typeof globalThis.__bukusupe.isRendering === 'function' ? 'on-demand' : 'continuous'");
        for (const paused of [false, true]) {
          await app.evalIn(`globalThis.__bukusupe.setLoopPaused(${paused})`);
          for (let i = 0; i <= REPEATS; i++) {
            const a = await cpuTimes(app, { renderer: pids.rendererPid, gpu: pids.gpuPid });
            const f0 = await app.evalIn("globalThis.__bukusupe.frames()");
            await sleep(IDLE_MS);
            const b = await cpuTimes(app, { renderer: pids.rendererPid, gpu: pids.gpuPid });
            const drawn = (await app.evalIn("globalThis.__bukusupe.frames()")) - f0;
            if (i === 0) continue;
            const pct = (k) => (a[k] != null && b[k] != null ? ((b[k] - a[k]) / (IDLE_MS / 1000)) * 100 : null);
            idleRows.push({ n, loop: paused ? "paused" : "running", run: i, renderer: pct("renderer"), gpu: pct("gpu"), browser: pct("browser"),
              framesPerSecond: drawn / (IDLE_MS / 1000) });
          }
          await app.evalIn("globalThis.__bukusupe.setLoopPaused(false)");
          const r = idleRows.filter((x) => x.n === n && x.loop === (paused ? "paused" : "running"));
          console.log(`  止まっている地図の CPU（ループ${paused ? "停止" : "あり"}）：ページ ${summarize(r.map((x) => x.renderer)).median?.toFixed(1)}%・GPU ${summarize(r.map((x) => x.gpu)).median?.toFixed(1)}%`);
        }
      }
    }
  } finally {
    await app.close();
  }
  const loadSamples = load.stop();
  if (scenesToo) saveResult(`render-${mode}`, { env, loadSamples, warnings, sceneMs: SCENE_MS, frames }, frames.flatMap((f) => [
    { metric: "fps", condition: f.scene, n: f.n, run: f.run, value: f.fps, unit: "fps" },
    ...["intervals", "total", "overlay", "render"].flatMap((k) => {
      const s = summarize(f[k]);
      return [{ metric: `${k}-median`, condition: f.scene, n: f.n, run: f.run, value: s.median, unit: "ms" },
        { metric: `${k}-p95`, condition: f.scene, n: f.n, run: f.run, value: s.p95, unit: "ms" }];
    }),
  ]));
  if (idle) saveResult(`idle-${mode}`, { env, loadSamples, warnings, windowMs: IDLE_MS, runs: idleRows },
    idleRows.flatMap((r) => ["renderer", "gpu", "browser"].map((m) => ({ metric: `cpu-${m}`, condition: r.loop, n: r.n, run: r.run, value: r[m], unit: "%" }))));
}
