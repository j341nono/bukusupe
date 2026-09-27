/**
 * ブクスペの時間とメモリの測定（docs/BENCHMARK.md）。
 *   npm run bench                         … 全体（1 回目と 2 回目）
 *   npm run bench -- --only=run1          … 描画（画面あり）以外のすべて
 *   npm run bench -- --only=run2          … 画面ありの描画と CPU 使用率（Chrome の窓が前面に出る。Mac を操作しない）
 *   npm run bench -- --only=layout,search … 一部だけ（名前は下の SUITES）
 *   オプション：--counts=100,500（件数を絞る）、--allow-load（負荷が高くても続ける）、--no-report（報告書を作らない）
 *
 * 使う dist/ は、今のソースからビルドしたもの（npm run build）。?debug=1 の測定用の仕組みを使う。
 */
import { COUNTS } from "./lib.mjs";
import { size } from "./size.mjs";
import { fresh } from "./fresh.mjs";
import { core } from "./core.mjs";
import { memory } from "./memory.mjs";
import { web } from "./web.mjs";
import { quant } from "./quant.mjs";
import { render } from "./render.mjs";
import { report } from "./report.mjs";

const CORE = ["startup", "query", "layout", "search", "add", "disk"];
const SUITES = ["size", "fresh", ...CORE, "memory", "web", "quant", "render-headless", "render-headful", "idle-headless", "idle-headful"];
// idle は、何もしていない地図の CPU 使用率だけ（描画の場面は測らない）。render-* は場面と CPU 使用率の両方
const ALIASES = { run1: SUITES.filter((s) => !["render-headful", "idle-headless", "idle-headful"].includes(s)), run2: ["render-headful"],
  idle: ["idle-headless", "idle-headful"], all: SUITES.filter((s) => !s.startsWith("idle-")) };

/** 所要時間の目安（分）。埋め込みは 1 秒あたり約 16 件（1 スレッド）で見積もる */
function estimateMinutes(suite, counts) {
  const items = counts.reduce((s, n) => s + n, 0);
  switch (suite) {
    case "size": return 1;
    case "fresh": return 6;
    case "startup": return (6 * items) / 16 / 60 + counts.length * 1.5;
    case "web": return 4;
    case "quant": return 35;
    case "memory": return (6 * items) / 16 / 60 + counts.length * 2.5;
    case "render-headless": case "render-headful": return counts.length * 6.5;
    case "idle-headless": case "idle-headful": return counts.length * 2.5;
    default: return counts.length * 0.8;
  }
}

const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const [k, v] = a.replace(/^--/, "").split("=");
  return [k, v ?? true];
}));
const requested = String(args.only ?? "all").split(",").flatMap((name) => ALIASES[name] ?? [name]);
const unknown = requested.filter((name) => !SUITES.includes(name));
if (unknown.length) {
  console.error(`知らない項目: ${unknown.join(", ")}（使える名前: ${[...SUITES, ...Object.keys(ALIASES)].join(", ")}）`);
  process.exit(1);
}
const counts = args.counts ? String(args.counts).split(",").map(Number) : COUNTS;
const allowLoad = !!args["allow-load"];

// 開始と終了の目安の時刻
const plan = SUITES.filter((s) => requested.includes(s) && !(CORE.includes(s) && s !== "startup" && requested.includes("startup")));
let minutes = plan.reduce((sum, s) => sum + estimateMinutes(s, counts), 0);
if (requested.some((s) => CORE.includes(s)) && !requested.includes("startup")) minutes += estimateMinutes("startup", counts) / 3;
const start = new Date();
const end = new Date(start.getTime() + minutes * 60_000);
const hhmm = (d) => d.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
console.log(`測定：${requested.join(", ")}（件数 ${counts.join(" / ")}）`);
console.log(`開始 ${hhmm(start)}・終了の目安 ${hhmm(end)}（約 ${Math.round(minutes)} 分）`);
if (requested.includes("render-headful") || requested.includes("idle-headful")) console.log("画面ありの描画の測定中は Chrome の窓が前面に出ます。終わるまで Mac を操作しないでください。");

const failures = [];
async function step(name, fn) {
  console.log(`\n##### ${name} #####`);
  const t = Date.now();
  try { await fn(); } catch (err) { console.error(`  ${name} が失敗した：`, err); failures.push(`${name}: ${err?.message ?? err}`); }
  console.log(`  （${((Date.now() - t) / 60_000).toFixed(1)} 分）`);
}

if (requested.includes("size")) await step("size", () => size());
if (requested.includes("fresh")) await step("fresh", () => fresh({ allowLoad }));
const coreParts = CORE.filter((p) => requested.includes(p));
if (coreParts.length) await step(`core（${coreParts.join(", ")}）`, () => core({ parts: coreParts, counts, allowLoad }));
if (requested.includes("memory")) await step("memory", () => memory({ counts, allowLoad }));
if (requested.includes("web")) await step("web", () => web({ allowLoad }));
if (requested.includes("quant")) await step("quant", () => quant({ allowLoad }));
if (requested.includes("render-headless")) await step("render-headless", () => render({ mode: "headless", counts, allowLoad }));
if (requested.includes("render-headful")) await step("render-headful", () => render({ mode: "headful", counts, allowLoad }));
if (requested.includes("idle-headless")) await step("idle-headless", () => render({ mode: "headless", counts, allowLoad, scenesToo: false }));
if (requested.includes("idle-headful")) await step("idle-headful", () => render({ mode: "headful", counts, allowLoad, scenesToo: false }));
if (!args["no-report"]) await step("report", () => report());

console.log(`\n終了 ${hhmm(new Date())}` + (failures.length ? `・失敗 ${failures.length} 件：\n  ${failures.join("\n  ")}` : "・すべて完了"));
process.exit(failures.length ? 1 : 0);
