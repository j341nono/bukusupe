/**
 * 星の明るさ・色・ラベルの目立ち方を決める「今日」の確認。
 *   node scripts/check-today.mjs   （check:ext の中で動く）
 *
 *  1. サンプルのデータ源では、実際の日付を変えても、星の見た目とラベルの目立ち方が変わらない
 *     （サンプルの日時は基準日 2026-09-26 に合わせて作ってあるので、「今日」をその日に固定する）
 *  2. 自分のブックマークのデータ源では、実際の日付に応じて変わる
 * 実際の日付は、ページのスクリプトより先に Date を 400 日先へずらす小さな差し替えを入れて変える（CDP の
 * Page.addScriptToEvaluateOnNewDocument）。ブックマークは使い捨てのプロファイルに確認スクリプトが作る。
 */
import { resolve } from "node:path";
import { createChecker, launchExtension, sleep } from "./lib/harness.mjs";

const DIST = resolve(process.argv[2] ?? "dist");
const SHIFT_DAYS = 400;
const { check, problems } = createChecker();
const app = await launchExtension(DIST);
const { send, evalIn, tryEval, waitUntil } = app;
const b = "globalThis.__bukusupe";

/** Date を shiftDays 日先へずらす差し替え（0 なら外す）を入れて、読み込み直し、準備完了まで待つ */
let scriptId = null;
async function reloadWithShift(shiftDays, expectKind) {
  if (scriptId) await send("Page.removeScriptToEvaluateOnNewDocument", { identifier: scriptId }, app.sessionId);
  scriptId = null;
  if (shiftDays) {
    const shift = shiftDays * 86_400_000;
    scriptId = (await send("Page.addScriptToEvaluateOnNewDocument", { source: `(() => {
      const RealDate = Date;
      class ShiftedDate extends RealDate {
        constructor(...args) { if (args.length === 0) super(RealDate.now() + ${shift}); else super(...args); }
        static now() { return RealDate.now() + ${shift}; }
      }
      globalThis.Date = ShiftedDate;
    })()` }, app.sessionId)).identifier;
  }
  await send("Page.reload", {}, app.sessionId);
  await sleep(500);
  const ready = await waitUntil(`document.body.dataset.phase === 'ready' && ${b}?.state.kind === ${JSON.stringify(expectKind)} &&
    (${b}?.layout()?.stars.length ?? 0) > 0`, 300_000, 300);
  // 星の誕生の演出とラベルの判断が落ち着くまで
  await evalIn(`${b}.resetCamera()`);
  await evalIn(`${b}.setZoomTier('mid')`);
  await sleep(3500);
  return ready;
}

/** いまの星の見た目（大きさ・明るさ）と、見えている地図のラベルの不透明度 */
async function snapshot() {
  return JSON.parse((await tryEval(`JSON.stringify({
    now: Date.now(),
    stars: ${b}.layout().stars.slice(0, 40).map((s) => ({ id: s.id, ...${b}.starVisual(s.id) })),
    labels: [...document.querySelectorAll('.label-star')].filter((el) => Number(el.style.opacity) > 0)
      .map((el) => ({ key: el.dataset.key, opacity: el.style.opacity, size: el.style.fontSize })).sort((a, c) => a.key < c.key ? -1 : 1),
  })`)) ?? "null");
}

function compare(a, c) {
  const byId = new Map(c.stars.map((s) => [s.id, s]));
  const starDiff = a.stars.reduce((m, s) => { const o = byId.get(s.id);
    return o ? Math.max(m, Math.abs(o.alpha - s.alpha), Math.abs(o.size - s.size)) : Infinity; }, 0);
  const labelsA = new Map(a.labels.map((l) => [l.key, l]));
  const shared = c.labels.filter((l) => labelsA.has(l.key));
  const labelDiff = shared.reduce((m, l) => Math.max(m, Math.abs(Number(l.opacity) - Number(labelsA.get(l.key).opacity))), 0);
  const sameLabels = a.labels.length === c.labels.length && shared.length === c.labels.length &&
    shared.every((l) => l.opacity === labelsA.get(l.key).opacity && l.size === labelsA.get(l.key).size);
  return { starDiff, labelDiff, sameLabels, labels: `${a.labels.length}→${c.labels.length} 件` };
}

try {
  // --- 1. サンプルのデータ源 ---
  await waitUntil(`document.body.dataset.phase === 'ready'`, 300_000, 500);
  const s0ready = await reloadWithShift(0, "sample");
  const s0 = await snapshot();
  const s1ready = await reloadWithShift(SHIFT_DAYS, "sample");
  const s1 = await snapshot();
  const sample = s0 && s1 ? compare(s0, s1) : null;
  const shifted = s0 && s1 ? (s1.now - s0.now) / 86_400_000 : 0;
  check(s0ready && s1ready && shifted > SHIFT_DAYS - 1 && sample && sample.starDiff < 1e-6 && sample.sameLabels,
    `サンプルのデータ源では、実際の日付を ${SHIFT_DAYS} 日ずらしても、星の明るさとラベルの目立ち方が変わらない`,
    sample ? `日付 +${shifted.toFixed(0)} 日・星の大きさと明るさの差 最大 ${sample.starDiff.toFixed(4)}・ラベル ${sample.labels}・不透明度の差 最大 ${sample.labelDiff.toFixed(2)}` : "測れない");

  // --- 2. 自分のブックマークのデータ源（使い捨てのプロファイルにブックマークを作る） ---
  await evalIn(`(async () => {
    const titles = ["ロケット打ち上げの記録", "今夜見える星座の探し方", "天体写真の撮り方入門", "プラネタリウムの上映案内",
      "親子丼の作り方", "カレーのスパイス配合", "パスタのゆで方", "お味噌汁の基本", "望遠鏡の選び方", "唐揚げを柔らかくするコツ",
      "流れ星の観測ガイド", "だしの取り方"];
    for (let i = 0; i < titles.length; i++) {
      await chrome.bookmarks.create({ parentId: "1", title: titles[i], url: "https://example.com/today/" + i });
    }
  })()`);
  await waitUntil(`${b}?.state.kind === 'chrome' && document.body.dataset.phase === 'ready'`, 120_000, 500);
  const c0ready = await reloadWithShift(0, "chrome");
  const c0 = await snapshot();
  const c1ready = await reloadWithShift(SHIFT_DAYS, "chrome");
  const c1 = await snapshot();
  const chromeCmp = c0 && c1 ? compare(c0, c1) : null;
  // 400 日たつと、作ったばかりのブックマークは暗く小さくなる
  const dimmer = c0 && c1 ? c1.stars.every((s) => { const o = c0.stars.find((x) => x.id === s.id); return o && s.alpha < o.alpha - 0.01; }) : false;
  check(c0ready && c1ready && chromeCmp && chromeCmp.starDiff > 0.01 && dimmer,
    `自分のブックマークのデータ源では、実際の日付に応じて星の明るさが変わる（${SHIFT_DAYS} 日後は暗くなる）`,
    chromeCmp ? `星 ${c0.stars.length} 個・大きさと明るさの差 最大 ${chromeCmp.starDiff.toFixed(3)}・すべて暗く ${dimmer ? "なった" : "ならない"}・ラベルの不透明度の差 最大 ${chromeCmp.labelDiff.toFixed(2)}` : "測れない");

  const bad = app.events.filter((e) => e.method === "Runtime.exceptionThrown");
  check(bad.length === 0, "例外が出ない", bad.slice(0, 2).map((e) => e.params?.exceptionDetails?.text).join(" / "));
} catch (err) {
  console.error(err);
  problems.push(String(err));
} finally {
  await app.close();
}
console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
