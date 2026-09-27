/**
 * docs/BENCHMARK.md を、docs/bench/results/ の生の結果から作る（数字は手で書き写さない）。
 *   npm run bench:report
 * 文章の中の数字も、ここで結果から埋める。測っていない項目は「未測定」と書く。
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { COUNTS, LOAD_LIMIT, OTHER_CPU_LIMIT, ROOT, loadResult, summarize } from "./lib.mjs";
import { lineChart, renderCharts } from "./charts.mjs";

export async function report() {
const R = Object.fromEntries(["size", "fresh", "startup", "query", "layout", "search", "add", "memory", "disk", "web", "quant",
  "render-headful", "render-headless", "idle-headful", "idle-headless", "idle-headful-continuous", "idle-headless-continuous"]
  .map((name) => [name, loadResult(name)]));

// ---------- 書式 ----------
const isNum = (v) => typeof v === "number" && Number.isFinite(v);
const sec = (ms) => (isNum(ms) ? (ms >= 10_000 ? `${(ms / 1000).toFixed(1)} 秒` : `${(ms / 1000).toFixed(2)} 秒`) : "—");
// ページの中の時刻は 0.1 ms 刻み（クロスオリジン分離していないページでは粗くなる）なので、それより小さい値は「< 0.1 ms」
const msf = (ms) => (isNum(ms) ? (ms >= 100 ? `${ms.toFixed(0)} ms` : ms >= 10 ? `${ms.toFixed(1)} ms` : ms >= 0.1 ? `${ms.toFixed(2)} ms` : "< 0.1 ms") : "—");
// 容量は 10 進（1 MB = 1,000,000 バイト、1 KB = 1,000 バイト）
const mb = (b) => (isNum(b) ? `${(b / 1e6).toFixed(1)} MB` : "—");
const kb = (b) => (isNum(b) ? (b >= 1e6 ? mb(b) : `${(b / 1e3).toFixed(0)} KB`) : "—");
const pct = (v) => (isNum(v) ? `${v.toFixed(1)}%` : "—");
const num = (v, d = 1) => (isNum(v) ? v.toFixed(d) : "—");
/** 中央値（四分位範囲）／p95 */
const stat = (values, f = msf) => {
  const s = summarize(values);
  return s.n ? `${f(s.median)}（${f(s.q1)}〜${f(s.q3)}）／ p95 ${f(s.p95)}` : "—";
};
const med = (values) => summarize(values).median;
const table = (head, rows) => [`| ${head.join(" | ")} |`, `|${head.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
const missing = (name) => `（未測定：\`npm run bench -- --only=${name}\`）`;
const counts = (rows) => [...new Set(rows.map((r) => r.n))].sort((a, b) => a - b);

const charts = {};
const lines = [];
const out = (...text) => lines.push(...text);

// ---------- 数字の用意 ----------
const startup = R.startup?.runs ?? [];
const st = (n, state, key) => med(startup.filter((r) => r.n === n && r.state === state).map((r) => r[key]));
const freshRuns = R.fresh?.runs ?? [];
const freshSample = freshRuns.filter((r) => r.n === 156);
const freshCheck = freshRuns.find((r) => r.n !== 156) ?? null;
const modelFiles = (() => {
  const byFile = new Map();
  for (const run of freshSample) for (const f of run.files) byFile.set(f.file, [...(byFile.get(f.file) ?? []), f]);
  return [...byFile].map(([file, list]) => ({ file, bytes: med(list.map((f) => f.bytes)), seconds: med(list.map((f) => f.seconds)),
    mbps: med(list.map((f) => f.mbps)) })).sort((a, b) => b.bytes - a.bytes);
})();
const modelBytes = modelFiles.reduce((s, f) => s + f.bytes, 0);
// 完全な初回の足し算：取得と初期化の時間（(a) の modelInit）−（(b) の modelInit）を、(b) の時間に足す
const aInit = med(freshSample.map((r) => r.modelInit));
const bInit = med(startup.filter((r) => r.state === "b").map((r) => r.modelInit));
const downloadExtra = isNum(aInit) && isNum(bInit) ? aInit - bInit : null;
const estimateA = (n, key) => (isNum(st(n, "b", key)) && isNum(downloadExtra) ? st(n, "b", key) + downloadExtra : null);
const rate = (n) => { const e = st(n, "b", "embedAll"); return isNum(e) ? n / (e / 1000) : null; };
const headful = R["render-headful"]?.frames ?? [];
const headless = R["render-headless"]?.frames ?? [];
const sceneStat = (frames, n, scene, key) => summarize(frames.filter((f) => f.n === n && f.scene === scene).flatMap((f) => f[key]));
const idleH = R["idle-headful"]?.runs ?? [];
// 画面ありの測定で使った画面のリフレッシュレート（記録の「UI Looks like … @ 144.00Hz」から）と、1 コマの持ち時間
const headfulEnv = R["render-headful"]?.env ?? null;
const refreshHz = Number(headfulEnv?.gpu?.looksLike?.match(/@\s*([\d.]+)\s*Hz/)?.[1]) || null;
const frameBudget = refreshHz ? 1000 / refreshHz : null;
const idleS = R["idle-headless"]?.runs ?? [];
// 変更前（常に描いていたとき）の結果。動きがあるときだけ描く方式に変えたあとは、変更前後を比べる
const idleHBefore = R["idle-headful-continuous"]?.runs ?? [];
const idleSBefore = R["idle-headless-continuous"]?.runs ?? [];
const onDemand = R["idle-headful"]?.env?.renderMode === "on-demand" || R["idle-headless"]?.env?.renderMode === "on-demand";
const idleMed = (rows, n, loop, key) => med(rows.filter((r) => r.n === n && r.loop === loop).map((r) => r[key]));
const mem = R.memory?.runs ?? [];
const memMed = (n, point, key) => med(mem.filter((r) => r.n === n && r.point === point).map((r) => r[key]));
const searchRows = R.search?.runs ?? [];
const bigN = (rows) => (rows.some((r) => r.n === 2000) ? 2000 : Math.max(0, ...rows.map((r) => r.n)));

// ---------- 本文 ----------
out("# ブクスペの時間とメモリの測定", "",
  "> このファイルは `scripts/bench/report.mjs` が `docs/bench/results/` の生の結果（JSON・CSV）から作る。数字を手で直さない。",
  "> 測り直しは `npm run bench`（一部は `npm run bench -- --only=<項目>`）、報告書だけ作り直すのは `npm run bench:report`。", "");

// 要約
out("## 要約", "");
{
  const n = bigN(startup);
  const rows = [];
  if (freshSample.length) rows.push(["初めて開いてから星が見えるまで（サンプル 156 件、モデルの取得を含む）", sec(med(freshSample.map((r) => r.firstStars))),
    `意味検索が使えるまで ${sec(med(freshSample.map((r) => r.semanticReady)))}（${freshSample.length} 回の中央値）`]);
  if (modelBytes) rows.push(["初回に取得するモデルの容量", mb(modelBytes), `10 Mbps で約 ${num(modelBytes * 8 / 10e6, 0)} 秒・100 Mbps で約 ${num(modelBytes * 8 / 100e6, 0)} 秒`]);
  if (n) rows.push([`2 回目以降の起動（${n} 件、すべて保存済み）`, sec(st(n, "c", "ready")), `意味検索が使えるまで ${sec(st(n, "c", "semanticReady"))}`]);
  if (n && isNum(rate(n))) rows.push([`全件の埋め込み（${n} 件、初回だけ）`, sec(st(n, "b", "embedAll")), `1 秒あたり ${num(rate(n), 1)} 件`]);
  const sN = bigN(searchRows);
  if (sN) rows.push([`検索の応答（${sN} 件、検索語の埋め込みから星の引き寄せの開始まで）`, msf(med(searchRows.filter((r) => r.n === sN && r.kind === "overall").map((r) => r.ms))),
    `入力の待ち 300 ms を除く。文字一致の 1 文字は ${msf(med(searchRows.filter((r) => r.n === sN && r.kind === "keystroke").map((r) => r.ms)))}`]);
  const fN = bigN(headful);
  if (fN) {
    const s = sceneStat(headful, fN, "flight", "intervals");
    rows.push([`飛行中の 1 コマの間隔（${fN} 件、画面あり）`, `中央値 ${msf(s.median)}・p95 ${msf(s.p95)}`,
      `${num(med(headful.filter((f) => f.n === fN && f.scene === "flight").map((f) => f.fps)), 0)} コマ/秒。1 コマの JS ${msf(sceneStat(headful, fN, "flight", "total").median)}`]);
  }
  const iN = bigN(idleH);
  const both = (rows, n, loop) => (idleMed(rows, n, loop, "renderer") ?? 0) + (idleMed(rows, n, loop, "gpu") ?? 0);
  if (iN && onDemand && idleHBefore.length) rows.push([`何もしていない地図の CPU 使用率（${iN} 件、画面あり）`, pct(both(idleH, iN, "running")),
    `ページ＋GPU のプロセス。動きがあるときだけ描く方式にする前は ${pct(both(idleHBefore, iN, "running"))}`]);
  else if (iN) rows.push([`何もしていない地図の CPU 使用率（${iN} 件、画面あり）`, pct(both(idleH, iN, "running")),
    `ページ＋GPU のプロセス。描画のループを止めると ${pct(both(idleH, iN, "paused"))}`]);
  out(rows.length ? table(["項目", "値", "補足"], rows) : "（まだ測定していない）", "");
}

// 環境
out("## 測定の環境と条件", "");
{
  const envRows = Object.entries(R).filter(([, v]) => v?.env).map(([name, v]) => {
    const e = v.env;
    const loads = (v.loadSamples ?? []).map((s) => s.load1);
    const others = (v.loadSamples ?? []).map((s) => s.otherCpu).filter(isNum);
    const maxLoad = loads.length ? Math.max(...loads) : e.load?.[0];
    const maxOther = others.length ? Math.max(...others) : e.otherCpu?.total;
    return [name, e.measuredAt?.slice(0, 16).replace("T", " ") ?? "—", e.headless === false ? `画面あり（${e.webgl ?? "GPU"}）` : e.headless ? "ヘッドレス（ソフトウェア描画）" : "—",
      `${e.power?.source ?? "—"}${e.power?.lowPowerMode ? "・低電力モード" : ""}`,
      `${num(e.otherCpu?.total, 0)}% → 中央値 ${num(summarize(others).median, 0)}%・最大 ${num(maxOther, 0)}%${maxOther > OTHER_CPU_LIMIT ? " ⚠" : ""}`,
      `${num(e.load?.[0], 2)} → 最大 ${num(maxLoad, 2)}${maxLoad > LOAD_LIMIT ? "（高め）" : ""}`];
  });
  const e = Object.values(R).find((v) => v?.env)?.env;
  if (e) {
    out(table(["項目", "値"], [["機種", `${e.machine.model}（${e.machine.identifier}）`], ["CPU", `${e.machine.chip}（${e.machine.cores}）`],
      ["メモリ", e.machine.memory], ["GPU", `${e.gpu.model}（${e.gpu.cores} コア、${e.gpu.metal}）`],
      ["画面（画面ありの描画）", headfulEnv ? `${headfulEnv.gpu.displayName ?? "—"}、${headfulEnv.gpu.looksLike ?? "—"}${headfulEnv.gpu.clamshellClosed ? "（本体の蓋を閉じ、外部ディスプレイだけで表示）" : ""}` : "—"],
      ["OS", e.os], ["Chrome", e.chrome], ["Node.js", e.node]]), "");
    out("測定ごとの日時・描画の方法・電源・負荷。「他のアプリの CPU」は、この測定のスクリプトと、それが起動した Chrome を除いたプロセスの CPU 使用率の合計" +
      `（1 コア＝100%、5 秒ごと。${OTHER_CPU_LIMIT}% を超えたら ⚠。測定の各段の前に超えていたら、下がるまで待ち、下がらなければ測定を止める）。` +
      "ロードアベレージ（1 分平均）は測定そのもの（埋め込みの計算など）の負荷も含むので参考：", "",
      table(["結果", "日時（UTC）", "描画", "電源", "他のアプリの CPU（開始時 → 測定中）", "ロードアベレージ（開始時 → 最大）"], envRows), "");
    const warnings = Object.values(R).flatMap((v) => v?.warnings ?? []);
    if (warnings.length) out(`> ⚠ 負荷の警告：${warnings.join("／")}`, "");
  }
  out("**条件**", "",
    `- ブックマークの件数：${COUNTS.join("・")} 件（100 件はサンプルから選び、500 件以上は生成。下の「生成の方法と限界」）。`,
    "- 起動の 3 段階：(a) 完全な初回（まっさらなプロファイル。モデルの取得から）、(b) モデルは取得済みで埋め込みはまだ（測定用の DB を消して開く）、(c) すべて保存済み（再読み込み）。",
    "- 繰り返し：各測定は最初の 1 回を捨て、5 回。完全な初回はサンプル 156 件で 3 回（最初の 1 回も捨てない）と、足し算の確認のため 2000 件で 1 回。",
    "- 表の値は **中央値（四分位範囲 q1〜q3）／ p95**。1 コマの時間は、5 回分のすべてのコマをまとめた分布。",
    "- 測定用の仕組みは `?debug=1` のときだけ動く（`src/debug/timing.ts`、`SpaceView.setProfiling` など）。ふだんの動作は変えていない。", "");
  const ds = R.startup?.datasets ?? [];
  if (ds.length) {
    out("**使ったブックマーク**", "", table(["件数", "うち生成", "タイトルの長さ（中央値／p90／最大）", "重複しないタイトル", "ドメインの種類"],
      ds.map((d) => [d.n, d.generated, `${d.titleLength.median}／${d.titleLength.p90}／${d.titleLength.max} 文字`, d.uniqueTitles, d.uniqueHosts])), "");
  }
}

// 1. 起動
out("## 1. 起動", "");
if (startup.length) {
  out("最初に星が見える（仮の配置を含む）・配置が決まる（準備完了）・意味検索が使えるようになる（検索欄の準備とモデルの読み込みの遅いほう）までの時間。ページを開いた時点から。", "");
  out(table(["件数", "段階", "最初に星が見える", "配置が決まる", "意味検索が使える"], counts(startup).flatMap((n) => ["b", "c"].map((state) => {
    const rows = startup.filter((r) => r.n === n && r.state === state);
    return [n, state === "b" ? "(b) 埋め込みはまだ" : "(c) 保存済み", stat(rows.map((r) => r.firstStars), sec), stat(rows.map((r) => r.ready), sec), stat(rows.map((r) => r.semanticReady), sec)];
  }))), "");
  const est = counts(startup).map((n) => [n, sec(estimateA(n, "ready")), sec(estimateA(n, "semanticReady"))]);
  out("**(a) 完全な初回**（モデルの取得から）", "");
  if (freshSample.length) {
    out(table(["件数", "回数", "最初に星が見える", "配置が決まる", "意味検索が使える", "取得と初期化"], [[156, freshSample.length,
      stat(freshSample.map((r) => r.firstStars), sec), stat(freshSample.map((r) => r.ready), sec), stat(freshSample.map((r) => r.semanticReady), sec),
      stat(freshSample.map((r) => r.modelInit), sec)]]), "");
    out(`他の件数の完全な初回は、(b) の時間に「取得の分」＝ (a) の取得と初期化 ${sec(aInit)} −（(b) のキャッシュからの初期化 ${sec(bInit)}）＝ ${sec(downloadExtra)} を足して求めた：`, "",
      table(["件数", "配置が決まる（計算）", "意味検索が使える（計算）"], est), "");
    if (freshCheck) {
      const calc = estimateA(freshCheck.n, "ready");
      out(`足し算の確かめ：${freshCheck.n} 件で完全な初回を 1 回実測すると、配置が決まるまで ${sec(freshCheck.ready)}（計算 ${sec(calc)}、差 ${isNum(calc) ? `${num(((freshCheck.ready - calc) / calc) * 100, 1)}%` : "—"}）。` +
        `その回の取得と初期化は ${sec(freshCheck.modelInit)}（通信の速さの揺れを含む）。`, "");
    }
  } else out(missing("fresh"), "");
  charts["startup"] = lineChart({ title: "起動：配置が決まるまで（秒）", yLabel: "秒", series: [
    { name: "(b) 埋め込みはまだ", points: counts(startup).map((n) => [n, st(n, "b", "ready") / 1000]) },
    { name: "(c) 保存済み", points: counts(startup).map((n) => [n, st(n, "c", "ready") / 1000]) },
    ...(isNum(downloadExtra) ? [{ name: "(a) 完全な初回（計算）", dashed: true, points: counts(startup).map((n) => [n, estimateA(n, "ready") / 1000]) }] : []),
  ] });
  out("![起動](bench/startup.png)", "");
} else out(missing("startup"), "");
out("**Web 版**（サンプル 156 件。計算済みの配置を同梱し、モデルは裏で読み込む）", "");
if (R.web) {
  const w = R.web.runs;
  out(table(["段階", "回数", "最初に星が見える", "意味検索が使える"], ["a", "c"].map((state) => {
    const rows = w.filter((r) => r.state === state);
    return [state === "a" ? "初めて開く（モデルの取得から）" : "2 回目以降（再読み込み）", rows.length, stat(rows.map((r) => r.firstStars), msf), stat(rows.map((r) => r.semanticReady), sec)];
  })), "");
} else out(missing("web"), "");

// 2. モデルと埋め込み
out("## 2. モデルと埋め込み", "");
if (modelFiles.length) {
  const total = modelBytes;
  // 全体の取得時間：最初の要求の開始から、最後の要求の終わりまで（ファイルは並行して取得される）
  const secs = med(freshSample.map((r) => r.files.length && r.files[0].endOffset != null
    ? Math.max(...r.files.map((f) => f.endOffset)) - Math.min(...r.files.map((f) => f.startOffset))
    : r.files.reduce((s, f) => Math.max(s, f.seconds), 0)));
  out(`モデルの取得（完全な初回 ${freshSample.length} 回の中央値。ファイルは並行して取得される）：`, "",
    table(["ファイル", "容量", "取得の時間", "実効の速さ"], modelFiles.map((f) => [f.file, kb(f.bytes), sec(f.seconds * 1000), `${num(f.mbps, 0)} Mbps`])), "",
    `合計 ${mb(total)}。取得の全体（最初の要求から最後の終わりまで）は ${sec(secs * 1000)}、全体の実効の速さ ${num((total * 8) / 1e6 / secs, 0)} Mbps。` +
    `容量から計算した取得時間の目安：10 Mbps で ${num(total * 8 / 10e6, 0)} 秒、50 Mbps で ${num(total * 8 / 50e6, 0)} 秒、100 Mbps で ${num(total * 8 / 100e6, 0)} 秒。`, "");
} else out(missing("fresh"), "");
if (startup.length) {
  out("キャッシュからのモデルの読み込みと初期化（Worker の起動から準備完了まで。件数によらないはず）：", "",
    table(["件数", "(b)", "(c)"], counts(startup).map((n) => [n, stat(startup.filter((r) => r.n === n && r.state === "b").map((r) => r.modelInit), sec),
      stat(startup.filter((r) => r.n === n && r.state === "c").map((r) => r.modelInit), sec)])), "",
    "全件の埋め込み（(b)。ONNX Runtime は 1 スレッド、16 件ずつ）：", "",
    table(["件数", "時間", "1 秒あたりの件数"], counts(startup).map((n) => [n, stat(startup.filter((r) => r.n === n && r.state === "b").map((r) => r.embedAll), sec), num(rate(n), 1)])), "");
  charts["embed"] = lineChart({ title: "全件の埋め込みの速さ（件/秒）", yLabel: "件/秒", series: [{ name: "(b) 全件", points: counts(startup).map((n) => [n, rate(n)]) }] });
  out("![埋め込みの速さ](bench/embed.png)", "");
}
if (R.add) {
  out("ブックマークを 1 件足したとき（入力文の埋め込み → 最も近い星団の螺旋の次に置く → 表示。変更の通知から始まるまでの 0.5 秒の待ちは含まない）：", "",
    table(["件数", "時間"], counts(R.add.runs).map((n) => [n, stat(R.add.runs.filter((r) => r.n === n).map((r) => r.ms))])), "");
} else out(missing("add"), "");
if (R.query) {
  const q = R.query.runs;
  out(`検索語 1 つの埋め込み（短い語「${R.query.short}」、長い文 ${[...R.query.long].length} 文字）。「最初の 1 回」は再読み込みの後の 1 回目：`, "",
    table(["", "短い語", "長い文"], [["最初の 1 回", stat(q.filter((r) => r.order === "first" && r.kind === "short").map((r) => r.ms)), stat(q.filter((r) => r.order === "first" && r.kind === "long").map((r) => r.ms))],
      ["2 回目以降", stat(q.filter((r) => r.order === "later" && r.kind === "short").map((r) => r.ms)), stat(q.filter((r) => r.order === "later" && r.kind === "long").map((r) => r.ms))]]), "");
} else out(missing("query"), "");

// 3. 配置と検索
out("## 3. 配置と検索", "");
if (R.layout) {
  const L = R.layout.runs;
  const steps = [["center", "平均引き"], ["generality", "汎用度"], ["kmeans", "k-means"], ["refine", "分け直し"], ["pca", "PCA"], ["pack", "押し広げ"],
    ["order", "星団の中の順"], ["names", "星団名"], ["spiral", "螺旋"]];
  out("配置の計算（段ごとの中央値と合計。汎用度は配置の中で使うもの）：", "",
    table(["件数", ...steps.map((s) => s[1]), "合計"], counts(L).map((n) => {
      const rows = L.filter((r) => r.n === n);
      return [n, ...steps.map(([k]) => msf(med(rows.map((r) => r[k])))), stat(rows.map((r) => r.total))];
    })), "",
    table(["件数", "汎用度の計算（全件、単独）"], counts(L).map((n) => [n, stat(L.filter((r) => r.n === n).map((r) => r.generalityAll))])), "");
  charts["layout"] = lineChart({ title: "配置の計算（ms、中央値）", yLabel: "ms", series: [["total", "合計"], ...steps.filter(([k]) => ["kmeans", "refine", "pack", "order", "generality"].includes(k))]
    .map(([k, label]) => ({ name: label, points: counts(L).map((n) => [n, med(L.filter((r) => r.n === n).map((r) => r[k]))]) })) });
  out("![配置](bench/layout.png)", "");
} else out(missing("layout"), "");
if (searchRows.length) {
  const S = searchRows;
  out(`検索（${R.search.typed ? `文字一致は「${R.search.typed}」を 1 文字ずつ入力` : ""}。意味検索は既存の 9 語）：`, "",
    table(["件数", "文字一致の 1 文字（入力の処理）", "検索語の埋め込み", "意味のスコア計算", "順位づけ", "検索全体の応答"], counts(S).map((n) => [n,
      stat(S.filter((r) => r.n === n && r.kind === "keystroke").map((r) => r.ms)), msf(med(S.filter((r) => r.n === n && r.kind === "semantic").map((r) => r.embedMs))),
      stat(S.filter((r) => r.n === n && r.kind === "semantic").map((r) => r.scoreMs)), msf(med(S.filter((r) => r.n === n && r.kind === "semantic").map((r) => r.rankMs))),
      stat(S.filter((r) => r.n === n && r.kind === "overall").map((r) => r.ms))])), "",
    "検索全体の応答は、検索語の埋め込み・スコア・順位づけ・星の引き寄せの開始・次のコマの描画まで。実際の入力では、打ち終わってから 300 ms 待ってから意味検索を始める（この表には含まない）。", "");
  charts["search"] = lineChart({ title: "検索の応答（ms、中央値）", yLabel: "ms", series: [
    { name: "検索全体", points: counts(S).map((n) => [n, med(S.filter((r) => r.n === n && r.kind === "overall").map((r) => r.ms))]) },
    { name: "意味のスコア計算", points: counts(S).map((n) => [n, med(S.filter((r) => r.n === n && r.kind === "semantic").map((r) => r.scoreMs))]) },
    { name: "文字一致 1 文字", points: counts(S).map((n) => [n, med(S.filter((r) => r.n === n && r.kind === "keystroke").map((r) => r.ms))]) },
  ] });
  out("![検索](bench/search.png)", "");
} else out(missing("search"), "");

// 4. 描画
out("## 4. 描画", "");
const sceneLabels = [["static", "止まっている地図"], ["drag", "ドラッグで移動"], ["keys", "キー操作で移動"], ["attract", "検索（引き寄せの最中）"],
  ["settled", "検索（落ち着いた後）"], ["constellation", "星座の保存の演出"], ["flight", "飛行（通常）"], ["windows", "飛行（窓が開いている）"]];
for (const [frames, label, key] of [[headful, "画面あり（GPU あり）", "render-headful"], [headless, "ヘッドレス（ソフトウェア描画。参考）", "render-headless"]]) {
  out(`### ${label}`, "");
  if (!frames.length) { out(missing(key), ""); continue; }
  if (onDemand) out("> この節の場面ごとの測定は、動きがあるときだけ描く方式に変える前（常に描いていたとき）のもの。動いている場面の描画の重さは変わらない。", "");
  const env = R[key].env;
  out(`描画：${env.webgl ?? "—"}、窓 ${env.viewport ?? "—"}（devicePixelRatio ${env.devicePixelRatio ?? "—"}）。` +
    "「間隔」は requestAnimationFrame の間隔（画面の書き換えの間隔で頭打ち）、「JS」は 1 コマの中で JS が使った時間、" +
    "その内訳の「重ね表示」はラベル・窓・標識の判断と位置の更新、「描画」は three.js の描画の呼び出し（GPU の処理の完了は含まない）。", "");
  for (const n of counts(frames)) {
    out(`**${n} 件**`, "", table(["場面", "コマ/秒", "間隔（中央値／p95）", "JS（中央値／p95）", "重ね表示（中央値）", "描画（中央値）"], sceneLabels.map(([scene, name]) => {
      const iv = sceneStat(frames, n, scene, "intervals"), js = sceneStat(frames, n, scene, "total");
      return [name, num(med(frames.filter((f) => f.n === n && f.scene === scene).map((f) => f.fps)), 0), `${msf(iv.median)}／${msf(iv.p95)}`,
        `${msf(js.median)}／${msf(js.p95)}`, msf(sceneStat(frames, n, scene, "overlay").median), msf(sceneStat(frames, n, scene, "render").median)];
    })), "");
  }
  charts[key] = lineChart({ title: `1 コマの間隔の p95（ms、${label}）`, yLabel: "ms", series: sceneLabels.map(([scene, name]) => ({ name,
    points: counts(frames).map((n) => [n, sceneStat(frames, n, scene, "intervals").p95]) })) });
  charts[`${key}-js`] = lineChart({ title: `1 コマの JS の時間の p95（ms、${label}）`, yLabel: "ms", series: sceneLabels.map(([scene, name]) => ({ name,
    points: counts(frames).map((n) => [n, sceneStat(frames, n, scene, "total").p95]) })) });
  out(`![描画 ${label}](bench/${key}.png)`, "", `![1 コマの JS ${label}](bench/${key}-js.png)`, "");
}

// 5. 資源
out("## 5. 資源", "");
if (mem.length) {
  const points = [["afterStartup", "起動直後（(c)）"], ["afterEmbed", "全件の埋め込みの後（(b)）"], ["searching", "検索中"], ["flying", "飛行中"]];
  out("メモリ（中央値。JS のヒープは GC の後の使用量、WebAssembly は ONNX Runtime のメモリの確保量、プロセスは RSS。" +
    (R.memory.method === "isolated" ? "測るたびにブラウザを起動し直し、アプリを 1 回だけ開いた状態で測った" : "") + "）：", "",
    table(["件数", "時点", "JS ヒープ（ページ）", "JS ヒープ（Worker）", "WebAssembly", "拡張機能のページのプロセス", "GPU のプロセス"],
      counts(mem).flatMap((n) => points.map(([p, name]) => [n, name, mb(memMed(n, p, "pageHeap")), mb(memMed(n, p, "workerHeap")), mb(memMed(n, p, "wasm")),
        mb(memMed(n, p, "renderer")), mb(memMed(n, p, "gpu"))]))), "");
  charts["memory"] = lineChart({ title: "メモリ（MB、全件の埋め込みの後）", yLabel: "MB", series: [["renderer", "ページのプロセス"], ["wasm", "WebAssembly"], ["pageHeap", "JS ヒープ（ページ）"], ["workerHeap", "JS ヒープ（Worker）"]]
    .map(([k, name]) => ({ name, points: counts(mem).map((n) => [n, memMed(n, "afterEmbed", k) / 1e6]) })) });
  out("![メモリ](bench/memory.png)", "");
  const info = R.memory.renderInfo ?? [];
  if (info.length) out("three.js の描画の資源（`renderer.info`。描画の呼び出しは直前の 1 コマ）：", "",
    table(["件数", "場面", "ジオメトリ", "テクスチャ", "シェーダー", "描画の呼び出し", "点", "線", "三角形"], info.map((r) => [r.n, { map: "地図", search: "検索中", flight: "飛行中" }[r.scene] ?? r.scene,
      r.geometries, r.textures, r.programs, r.calls, r.points, r.lines, r.triangles])), "");
} else out(missing("memory"), "");
if (R.disk) {
  out("ディスク（モデルのキャッシュは Cache Storage、IndexedDB はこの件数の DB の中身の論理的な大きさ。拡張機能の全体の使用量は同じプロファイルの他の件数の DB も含む）：", "",
    table(["件数", "モデルのキャッシュ", "IndexedDB（この件数）", "うちベクトル", "うち配置など", "拡張機能の使用量（全体）"], R.disk.runs.map((r) => [r.n, mb(r.caches), kb(r.dbLogical), kb(r.vectorBytes), kb(r.metaBytes), mb(r.usage)])), "");
} else out(missing("disk"), "");
if (R.size) {
  out("配布物の大きさ：", "", table(["", "合計", "大きいファイル（上位 5）"], Object.entries(R.size.builds).map(([k, list]) => [k, mb(R.size.totals[k]),
    list.slice(0, 5).map((f) => `${f.file} ${kb(f.bytes)}`).join("、")])), "");
} else out(missing("size"), "");
out("何もしていない地図の CPU 使用率（10 秒ごと。1 コアを 100%。ページ＝拡張機能のページのプロセス。" +
  (onDemand ? "「変更前」は常に描いていたとき、「変更後」は動きがあるときだけ描く方式、「ループ停止」は描画のループを止めたとき（下限の目安）" : "") + "）：", "");
for (const [rows, before, label, key] of [[idleH, idleHBefore, "画面あり", "idle-headful"], [idleS, idleSBefore, "ヘッドレス（参考）", "idle-headless"]]) {
  if (!rows.length) { out(`${label}：${missing(key)}`, ""); continue; }
  if (onDemand && before.length) {
    out(`**${label}**`, "", table(["件数", "変更前：ページ", "変更前：GPU", "変更後：ページ", "変更後：GPU", "変更後の描画（コマ/秒）", "ループ停止：ページ", "ループ停止：GPU"],
      counts(rows).map((n) => [n, pct(idleMed(before, n, "running", "renderer")), pct(idleMed(before, n, "running", "gpu")),
        stat(rows.filter((r) => r.n === n && r.loop === "running").map((r) => r.renderer), pct), pct(idleMed(rows, n, "running", "gpu")),
        num(idleMed(rows, n, "running", "framesPerSecond"), 1), pct(idleMed(rows, n, "paused", "renderer")), pct(idleMed(rows, n, "paused", "gpu"))])), "");
  } else {
    out(`**${label}**`, "", table(["件数", "ループあり：ページ", "ループあり：GPU", "ループ停止：ページ", "ループ停止：GPU"], counts(rows).map((n) => [n,
      stat(rows.filter((r) => r.n === n && r.loop === "running").map((r) => r.renderer), pct), pct(idleMed(rows, n, "running", "gpu")),
      stat(rows.filter((r) => r.n === n && r.loop === "paused").map((r) => r.renderer), pct), pct(idleMed(rows, n, "paused", "gpu"))])), "");
  }
}

// 6. 量子化
out("## 6. 任意の比較：モデルの量子化", "");
if (R.quant) {
  const Q = R.quant.results;
  const q8Size = modelFiles.find((f) => f.file.endsWith("model_quantized.onnx"))?.bytes;
  out(table(["量子化", "モデルの容量", `全件の埋め込み（${R.quant.n} 件）`, "検索語（短い語、2 回目以降）", "WebAssembly のメモリ", "9 語の正解数（上位 5 件）", "備考"], Q.map((r) => [
    r.dtype === "q8" ? "int8（今の設定）" : r.dtype, mb(r.dtype === "q8" ? q8Size : med(r.files.map((f) => f.bytes))),
    stat(r.runs.map((x) => x.embedAll), sec), stat(r.queries.filter((x) => x.kind === "short").map((x) => x.ms)), mb(med(r.memory.map((x) => x.wasm))),
    r.quality ? `${r.quality.total} / ${r.quality.max}` : "—", r.error ? `動かなかった：${r.error.slice(0, 120)}` : ""])), "");
  const detail = Q.filter((r) => r.quality);
  if (detail.length) out("検索語ごとの正解数：", "", table(["検索語", ...detail.map((r) => r.dtype)], detail[0].quality.perQuery.map((q, i) => [q.query, ...detail.map((r) => r.quality.perQuery[i]?.hits ?? "—")])), "");
} else out(missing("quant"), "");

// 方法と限界
out("## 測定の方法と限界", "",
  "- **時間の測り方**：起動の節目は、ページの中の `performance.now()`（ページを開いた時点が 0）で控えた（`?debug=1` のときだけ）。" +
  "「最初に星が見える」は、最初に星を表示した後の 2 コマ目。埋め込みが無いとき（(a)・(b)）は、意味で並べる前の仮の配置で星が出る。",
  "- **ヘッドレスと画面あり**：ヘッドレスは GPU を使わないソフトウェア描画（SwiftShader）なので、描画の時間は実際より大きく、コマ数は少なく出る。" +
  `画面ありでは、コマの間隔が画面の書き換えの間隔（測定に使った画面 ${headfulEnv?.gpu?.displayName ?? "—"} は ${refreshHz ?? "—"}Hz で約 ${num(frameBudget, 1)} ms）で頭打ちになるため、余裕の大きさは「1 コマの JS の時間」で見る。` +
  "GPU の処理時間は、WebGL の時間計測の拡張が通常は使えないため測っていない。",
  "- **通信の速さ**：モデルの取得の時間は、測った時点の回線と Hugging Face の配信の状態に左右される。容量から計算した 10・50・100 Mbps の目安を併記した。",
  "- **生成したブックマークの偏り**：500 件以上は、サンプル 156 件の分野の比率とタイトルの語を組み合わせて作った。分野はサンプルの 12 系統に限られ、" +
  "語の組み合わせも限られるため、実物より「似た文」が多い（上の表の「重複しないタイトル」「ドメインの種類」）。そのため、星団の数・検索の当たりやすさ・" +
  "k-means の収束の速さは実物と違う可能性がある。埋め込みの時間は入力文の長さで変わり、生成したタイトルはサンプルより少し長い。",
  "- **メモリの測り方**：JS のヒープは CDP の `Runtime.getHeapUsage`（GC の後）。WebAssembly は Worker の中で ONNX Runtime が確保したメモリの大きさ" +
  "（確保量で、実際に使っている量ではない）。プロセスは `ps` の RSS で、共有のページを含み、GPU のプロセスは他のタブの分も含みうる。",
  "- **ディスク**：モデルのキャッシュは `navigator.storage.estimate()` の caches。IndexedDB は DB の中身から数えた論理的な大きさで、実際のファイル（LevelDB）の大きさは圧縮や余白で変わる。",
  "- **単位**：容量とメモリは 10 進（1 MB = 1,000,000 バイト）。ページの中の時刻は 0.1 ms 刻みに粗められているため、それより短い時間は「< 0.1 ms」と書いた。",
  ...(R.memory?.method === "isolated" ? ["- **メモリの測り方（途中で変えた点）**：はじめは件数ごとの測定と同じブラウザで、ページを行き来しながら測ったが、" +
    "前に開いたアプリのページが「戻る」のためのキャッシュ（bfcache）などで同じプロセスに残り、プロセス全体のメモリが積み上がって見えた" +
    "（拡張機能のページのプロセスが 100 件で数 GB、件数が増えるほど小さいという逆の傾き。空のページと 4 回行き来するだけで 947 MB → 1,171 MB に増えることも確かめた）。" +
    "そこで、測るたびにブラウザを起動し直してアプリを 1 回だけ開く方法で測り直し、表はその結果にした（はじめの結果は `results/memory-navigating.*` に残した）。" +
    "JS のヒープと WebAssembly のメモリは、ページと Worker ごとに測るので、この影響を受けない。量子化の比較の WebAssembly のメモリも同じ理由で使える。"] : []),
  ...(onDemand ? (() => {
    const rows = [...idleH, ...idleS].filter((r) => r.loop === "running");
    const high = rows.filter((r) => (r.renderer ?? 0) > 1);
    const drew = high.filter((r) => (r.framesPerSecond ?? 0) > 1);
    return [`- **何もしていない地図の CPU 使用率（変更後）の外れ値**：${rows.length} 回のうち、ページが 1% を超えた回が ${high.length} 回あった。` +
      `そのうち ${high.length - drew.length} 回は描画が 0 回で、ページのプロセスの描画以外の処理によるもの（多くは各件数の 2 回目、ページを開いてから` +
      "20〜30 秒ほどの時間帯に集まっていた。ブラウザの中の定期的な処理とみられるが、原因は特定していない）。" +
      `${drew.length} 回は描画が再開していた（画面ありの測定中に他のアプリを使っていたため、窓の上をマウスが通るなどの入力で再開したとみられる）。` +
      "表の値は中央値なので、これらの影響は小さい。"];
  })() : []),
  "- **画面ありの測定と「他のアプリの CPU」**：画面ありでは、Chrome の窓を画面に合成する WindowServer の負荷も「他のアプリ」に数えている（測定そのものの負荷を一部含む）。",
  "- **負荷の判定（計画から変えた点）**：計画では「1 分平均のロードアベレージが 4 を超えたら中断」としていたが、試運転でロードアベレージが測定そのもの" +
  "（埋め込みの計算やソフトウェア描画）で 5〜12 に上がり、次の段が止まった。そこで中断の判断は「この測定のスクリプトと、それが起動した Chrome を除いた" +
  `他のプロセスの CPU 使用率の合計が ${OTHER_CPU_LIMIT}% を超えたとき」に変え（最大 2 分待ち、下がらなければ止める）、ロードアベレージは参考として記録した。`,
  ...(() => {
    const re = Object.entries(R).flatMap(([name, v]) => (v?.remeasured ?? []).map((m) => `${name}：${m.item}。理由：${m.reason}。測り直した日時 ${m.at?.slice(0, 16).replace("T", " ")}（UTC）`));
    const skipped = Object.entries(R).flatMap(([name, v]) => (v?.skipped ?? []).map((m) => `${name}：${m.item}。理由：${m.reason}`));
    return [
      ...(re.length ? [`- **測り直した項目**：${re.join("／")}。表の値は測り直した結果に差し替えた（元の値も結果のファイルの \`remeasured\` に残した）。`] : []),
      ...(skipped.length ? [`- **飛ばした項目**：${skipped.join("／")}。`] : []),
    ];
  })(),
  "- **その他**：件数ごとの測定は、同じプロファイルで順に行った（ディスクのキャッシュは温まっている）。1 件の追加は、確認用の窓口（`simulateAdd`）で本物と同じ関数を通した。", "");

// 改善の余地
out("## 結果からわかる改善の余地", "");
{
  const items = [];
  const iN = bigN(idleH.length ? idleH : idleS);
  const idleRows = idleH.length ? idleH : idleS;
  const idleBefore = idleH.length ? idleHBefore : idleSBefore;
  if (iN && onDemand && idleBefore.length) {
    const b1 = idleMed(idleBefore, iN, "running", "renderer"), b2 = idleMed(idleBefore, iN, "running", "gpu");
    const a1 = idleMed(idleRows, iN, "running", "renderer"), a2 = idleMed(idleRows, iN, "running", "gpu");
    const s1 = idleMed(idleRows, iN, "paused", "renderer"), s2 = idleMed(idleRows, iN, "paused", "gpu");
    items.push(`**何もしていないときも描き続けていた → 直した**：描画のループ（\`setAnimationLoop\`）は、止まっている地図でも毎コマ描いていた。` +
      "カメラ・星・検索・演出・ラベルの判断・入力のどれかがあるときだけ描き、すべて落ち着いたら（12 コマ続けて変化が無ければ）ループを止める方式に変えた" +
      "（入力・ブックマークの更新・Worker からの通知・画面を変える操作ですぐに再開。飛行中と埋め込みの計算中は毎コマ描く）。" +
      `${iN} 件の地図で、何もしていないときの CPU 使用率は、変更前のページ ${pct(b1)}・GPU ${pct(b2)} から、変更後はページ ${pct(a1)}・GPU ${pct(a2)} になった` +
      `（${idleH.length ? "画面あり" : "ヘッドレス"}。ループを止めたときの下限はページ ${pct(s1)}・GPU ${pct(s2)}）。ノートの電池の持ちに効く。` +
      "星のわずかな瞬きや星雲の揺らぎのように、止まっていても動く演出を今後入れる場合は、その分だけ描き続ける必要がある。");
  } else if (iN) {
    const run = idleMed(idleRows, iN, "running", "renderer"), stop = idleMed(idleRows, iN, "paused", "renderer");
    const runG = idleMed(idleRows, iN, "running", "gpu"), stopG = idleMed(idleRows, iN, "paused", "gpu");
    items.push(`**何もしていないときも描き続けている**：描画のループ（\`setAnimationLoop\`）は、止まっている地図でも毎コマ描いている。` +
      `${iN} 件の地図で、ループを回したままだとページ ${pct(run)}・GPU ${pct(runG)}、止めると ${pct(stop)}・${pct(stopG)}（${idleH.length ? "画面あり" : "ヘッドレス"}）。` +
      "カメラ・星・検索・演出のどれかが動いているときだけ描く方式（動きが止まったらループを止め、入力や状態の変化で再開する）にすれば、" +
      `何もしていない間の CPU 使用率は、ほぼループを止めたときの値（ページ ${pct(stop)}・GPU ${pct(stopG)}）まで下がる見込み。ノートの電池の持ちに効く。` +
      "ただし、星のわずかな瞬きや星雲の揺らぎのように止まっていても動く演出を入れると、その分は描き続ける必要がある。");
  }
  const n = bigN(startup);
  if (n && isNum(rate(n))) items.push(`**全件の埋め込みは 1 スレッド**：ONNX Runtime を 1 スレッド（\`numThreads = 1\`、MV3 の制約で追加の Worker を blob から起こさない）で動かしており、` +
    `${n} 件で ${sec(st(n, "b", "embedAll"))}（1 秒あたり ${num(rate(n), 1)} 件）かかる。初回だけの処理だが、件数に比例して延びる。` +
    "埋め込みの Worker を複数立てて分担すれば短くできる見込み（その分メモリは増える。5 章の WebAssembly のメモリを参照）。");
  if (R.quant) {
    const q = Object.fromEntries(R.quant.results.map((r) => [r.dtype, r]));
    if (q.q8?.quality && q.fp32?.quality) {
      const t8 = med(q.q8.runs.map((r) => r.embedAll)), t32 = med(q.fp32.runs.map((r) => r.embedAll));
      const w8 = med(q.q8.memory.map((r) => r.wasm)), w32 = med(q.fp32.memory.map((r) => r.wasm));
      const s32 = med(q.fp32.files.map((f) => f.bytes)), s8 = modelFiles.find((f) => f.file.endsWith("model_quantized.onnx"))?.bytes;
      items.push(`**量子化は今の int8 のままでよい**：この WebAssembly（1 スレッド）の実行では、埋め込みの時間は int8 ${sec(t8)}、fp32 ${sec(t32)}` +
        `（差 ${num(((t8 - t32) / t32) * 100, 0)}%）で、int8 にしても速くはならない。一方で、容量は int8 ${mb(s8)}・fp32 ${mb(s32)}、` +
        `WebAssembly のメモリは int8 ${mb(w8)}・fp32 ${mb(w32)} と大きな差がある。既存の 9 語の正解数は int8 ${q.q8.quality.total}、fp32 ${q.fp32.quality.total}` +
        `（最大 ${q.q8.quality.max}）で、精度でも劣らない（検索の係数は int8 の埋め込みで調整してきたので、int8 に有利な可能性はある）。` +
        "速さを上げたいなら、量子化ではなく、スレッドや Worker の数を見直すほうが効く見込み。");
    }
  }
  const fN = bigN(headful);
  if (fN) {
    const worst = sceneLabels.map(([scene, name]) => ({ name, p95: sceneStat(headful, fN, scene, "total").p95 })).sort((a, b) => b.p95 - a.p95)[0];
    items.push(`**描画の余裕**：画面ありの ${fN} 件で、1 コマの JS の p95 がいちばん大きい場面は「${worst.name}」の ${msf(worst.p95)}。` +
      `${refreshHz ?? "—"}Hz の 1 コマ（約 ${num(frameBudget, 1)} ms）${isNum(frameBudget) && worst.p95 > frameBudget ? "を超えることがあり、コマ落ちの原因になりうる" : "に収まっている"}。`);
  }
  out(items.length ? items.map((t) => `- ${t}`).join("\n") : "（測定の後に書く）", "");
}

writeFileSync(join(ROOT, "docs/BENCHMARK.md"), lines.join("\n") + "\n");
console.log("  書き出し: docs/BENCHMARK.md");
const made = await renderCharts(Object.fromEntries(Object.entries(charts).filter(([, svg]) => svg)));
console.log(`  グラフ: ${made.join(", ") || "なし"}`);
}

if (import.meta.url === `file://${process.argv[1]}`) await report();
