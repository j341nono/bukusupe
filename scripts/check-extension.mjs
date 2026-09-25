/**
 * dist/ を実際の Chrome に拡張機能として読み込み、通しで動くか確かめる。
 *   npm run build && npm run check:ext
 *
 * 見ているもの
 *  1. 拡張機能として読み込めて、専用ページが開く
 *  2. CSP 違反・例外が出ない
 *  3. ONNX Runtime の .mjs / .wasm を拡張機能内から読んでいる（CDN から取っていない）
 *  4. 外部へ出る通信がモデルの重み（Hugging Face）だけである
 *  5. 埋め込みが全件終わる
 *  6. 再読み込みで計算し直さない（IndexedDB から戻る）
 *  7. 意味検索が妥当（検索語ごとに違う星が上位に来る）
 *  8. 同じデータなら毎回まったく同じ座標になる
 *  9. 同じ星団の中で星どうしが重ならない
 * 10. 星団どうしの円が重ならない
 * 11. ブックマークが 1 件増えても、既存の星の座標が変わらない
 * 12. 20 / 150 / 2000 件で配置が終わり、2000 件でも 60 コマ/秒を保つ
 * 13. 遠・中・近の 3 段階のスクリーンショットを docs/screens/ に保存する
 *
 * 新しいプロファイルで動かすのでブックマークは空。表示はサンプル 150 件になる。
 */
import { spawn } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DIST = resolve(process.argv[2] ?? "dist");
const SHOT = process.argv[3] ?? null;
const profile = mkdtempSync(join(tmpdir(), "bukusupe-"));

const child = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--use-gl=swiftshader", "--enable-unsafe-swiftshader",
  "--enable-unsafe-extension-debugging", "--remote-debugging-pipe",
  `--user-data-dir=${profile}`, "--window-size=1280,800", "about:blank",
], { stdio: ["ignore", "ignore", "pipe", "pipe", "pipe"] });

const [, , , wfd, rfd] = child.stdio;
let buf = Buffer.alloc(0);
const pending = new Map();
let events = [];
rfd.on("data", (chunk) => {
  buf = Buffer.concat([buf, chunk]);
  let i;
  while ((i = buf.indexOf(0)) !== -1) {
    const msg = JSON.parse(buf.subarray(0, i).toString());
    buf = buf.subarray(i + 1);
    const settle = msg.id && pending.get(msg.id);
    if (settle) { pending.delete(msg.id); settle(msg); }
    else { events.push(msg); for (const fn of listeners) fn(msg); }
  }
});

const listeners = [];
let seq = 0;
const send = (method, params = {}, sessionId) =>
  new Promise((ok, ng) => {
    const id = ++seq;
    pending.set(id, (m) => (m.error ? ng(new Error(`${method}: ${JSON.stringify(m.error)}`)) : ok(m.result)));
    wfd.write(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }) + "\0");
  });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const IGNORE = /GPU stall|GL Driver Message|software WebGL/;
const problems = [];
const check = (ok, label, detail = "") => {
  console.log(`${ok ? "  OK " : "  NG "} ${label}${detail ? " … " + detail : ""}`);
  if (!ok) problems.push(label);
};

try {
  await sleep(2500);
  const { id: extId } = await send("Extensions.loadUnpacked", { path: DIST });
  console.log("拡張機能 ID:", extId);

  const { targetId } = await send("Target.createTarget", { url: `chrome-extension://${extId}/index.html` });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  await send("Runtime.enable", {}, sessionId);
  await send("Log.enable", {}, sessionId);
  await send("Network.enable", {}, sessionId);
  await send("Page.enable", {}, sessionId);

  // 埋め込みは Worker の中で動く。Worker の通信も見るために自動で接続する。
  listeners.push((m) => {
    if (m.method !== "Target.attachedToTarget") return;
    const child = m.params.sessionId;
    send("Network.enable", {}, child).catch(() => {});
    send("Runtime.enable", {}, child).catch(() => {});
    send("Log.enable", {}, child).catch(() => {});
  });
  await send("Target.setAutoAttach",
    { autoAttach: true, waitForDebuggerOnStart: false, flatten: true }, sessionId);

  const evalIn = async (expression) =>
    (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }, sessionId)).result.value;
  const hud = () => evalIn("document.getElementById('hud')?.innerText ?? ''");
  const phase = () => evalIn("document.body.dataset.phase ?? ''");

  // --- 1 回目：モデル取得と全件の埋め込み ---
  let text = "";
  const waitDone = async (limitSec) => {
    for (let i = 0; i < limitSec / 2; i++) {
      await sleep(2000);
      text = await hud();
      const line = text.split("\n").at(-1) ?? "";
      process.stdout.write(`\r  … ${line.padEnd(56)}`);
      const p = await phase();
      if (p === "ready" || p === "error") return p === "ready";
    }
    return false;
  };
  // 計算の最中に画面が動いているか（Worker で回っている証拠）
  let liveFrames = null;
  const watchFrames = (async () => {
    for (let i = 0; i < 150; i++) {
      await sleep(2000);
      const t = await hud();
      if (/星を読み解いている \d/.test(t)) {
        const a = await evalIn("globalThis.__bukusupe.frames()");
        await sleep(1000);
        const b = await evalIn("globalThis.__bukusupe.frames()");
        liveFrames = b - a;
        return;
      }
      if (["ready", "error"].includes(await phase())) return;
    }
  })();

  const finished = await waitDone(300);
  await watchFrames;
  process.stdout.write("\r" + " ".repeat(64) + "\r");
  console.log("HUD:", JSON.stringify(text));

  check(finished, "埋め込みが全件終わって星が並ぶ");
  check(/星\s*156/.test(text.replace(/\s+/g, " ")), "サンプル 156 件が読めている");
  check(await evalIn("typeof chrome !== 'undefined' && !!chrome.bookmarks"), "bookmarks 権限がある");
  check(liveFrames != null && liveFrames > 10, "計算中も画面が動いている",
    liveFrames == null ? "測れなかった" : `1 秒あたり ${liveFrames} コマ`);

  const urls = events.filter((e) => e.method === "Network.requestWillBeSent").map((e) => e.params.request.url);
  const wasmUrls = urls.filter((u) => /\.(mjs|wasm)$/.test(u));
  const external = urls.filter((u) => !u.startsWith("chrome-extension://"));
  check(
    wasmUrls.length > 0 && wasmUrls.every((u) => u.startsWith("chrome-extension://")),
    "ONNX Runtime を拡張機能内から読んでいる",
    wasmUrls.map((u) => u.split("/").pop()).join(", "),
  );
  check(
    external.every((u) => /^https:\/\/([a-z0-9-]+\.)*(huggingface\.co|hf\.co)\//.test(u)),
    "外部への通信はモデルの重みだけ",
    [...new Set(external.map((u) => new URL(u).host))].join(", ") || "(なし)",
  );

  const searchExpr = (q) =>
    `(async () => JSON.stringify(await globalThis.__bukusupe.search(${JSON.stringify(q)}, 3)))()`;
  const top = JSON.parse((await evalIn(searchExpr("猫や犬などの動物"))) ?? "[]");
  console.log("  意味検索「猫や犬などの動物」:", top.map((t) => `${t.title}(${t.score.toFixed(3)})`).join(" / "));
  const control = JSON.parse((await evalIn(searchExpr("確定申告"))) ?? "[]");
  console.log("  意味検索「確定申告」:", control.map((t) => `${t.title}(${t.score.toFixed(3)})`).join(" / "));
  check(top[0]?.title !== control[0]?.title, "違う検索語で違う星が上位に来る");

  // --- 配置（M2） ---
  const layout = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.layout())")) ?? "null");
  const again1 = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.computeAgain())")) ?? "null");
  const again2 = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.computeAgain())")) ?? "null");
  check(
    layout != null && JSON.stringify(again1) === JSON.stringify(again2) &&
      JSON.stringify(layout.stars) === JSON.stringify(again1.stars),
    "同じデータなら毎回まったく同じ座標になる",
  );

  const spacing = layout?.spacing ?? 2;
  const byCluster = new Map();
  for (const s of layout?.stars ?? []) {
    if (!byCluster.has(s.cluster)) byCluster.set(s.cluster, []);
    byCluster.get(s.cluster).push(s);
  }
  let minGap = Infinity;
  for (const group of byCluster.values()) {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        minGap = Math.min(minGap, Math.hypot(group[i].x - group[j].x, group[i].y - group[j].y));
      }
    }
  }
  check(minGap >= spacing * 0.8, "同じ星団の中で星どうしが重ならない",
    `最小 ${minGap.toFixed(2)}（間隔 ${spacing} の ${(minGap / spacing).toFixed(2)} 倍）`);

  const live = (layout?.clusters ?? []).filter((c) => c.count > 0);
  let worstOverlap = Infinity;
  for (let i = 0; i < live.length; i++) {
    for (let j = i + 1; j < live.length; j++) {
      const d = Math.hypot(live[i].x - live[j].x, live[i].y - live[j].y);
      worstOverlap = Math.min(worstOverlap, d - live[i].radius - live[j].radius);
    }
  }
  check(live.length < 2 || worstOverlap > 0, "星団どうしの円が重ならない",
    `一番近い組で ${worstOverlap.toFixed(2)} の空き`);

  // 星団ごとの内訳と、フォルダがいくつの星団に散っているか（物語の要点）
  const folderOf = new Map((layout?.stars ?? []).map((s) => [s.id, s.folder || "(ルート)"]));
  const spread = new Map();
  const detail = live.map((c) => {
    const members = (byCluster.get(c.index) ?? []).map((s) => folderOf.get(s.id) ?? "");
    const tally = new Map();
    for (const f of members) {
      tally.set(f, (tally.get(f) ?? 0) + 1);
      if (!spread.has(f)) spread.set(f, new Set());
      spread.get(f).add(c.index);
    }
    const folders = [...tally].sort((a, b) => b[1] - a[1]).map(([f, n]) => `${f}:${n}`);
    return { ...c, folders };
  });
  console.log("  星団:", live.map((c) => `${c.name}(${c.count})`).join(" / "));
  const musicCluster = detail.find((c) => c.folders.some((f) => f.startsWith("音楽:")));
  check(musicCluster?.name === "音楽", "音楽の星団名が大分類になっている",
    musicCluster ? `${musicCluster.name}（${musicCluster.count} 件）` : "音楽の星団がない");
  for (const c of detail) console.log(`    #${c.index} ${c.name}（${c.count}）`, c.folders.join(" "));
  const scattered = [...spread].filter(([, set]) => set.size >= 2);
  check(scattered.length > 0, "一つのフォルダの星が複数の星団に散っている",
    scattered.map(([f, set]) => `${f}→${set.size}`).join(" "));
  writeFileSync("docs/screens/clusters.json", JSON.stringify(detail, null, 1) + "\n");

  // 代表（螺旋の内側 4 件）と、汎用的なブックマークが代表に来ていないか
  const GENERIC = ["GitHub", "Google", "Gmail", "YouTube", "X", "Amazon.co.jp", "Notion"];
  const leads = live.map((c) => ({
    name: c.name,
    titles: (byCluster.get(c.index) ?? []).filter((s) => s.rank < 4)
      .sort((a, b) => a.rank - b.rank).map((s) => s.title),
  }));
  for (const c of leads) console.log(`    代表 ${c.name}:`, c.titles.join(" / "));
  const badLeads = leads.flatMap((c) => c.titles.filter((t) => GENERIC.includes(t)));
  check(badLeads.length === 0, "汎用的なブックマークが代表に来ていない",
    badLeads.length ? badLeads.join(", ") : "なし");

  const space = JSON.parse((await evalIn(
    `(async () => JSON.stringify(await globalThis.__bukusupe.search("宇宙を感じたい", 10)))()`,
  )) ?? "[]");
  console.log("  「宇宙を感じたい」上位 10 件:");
  for (const r of space) console.log(`    ${r.score.toFixed(3)} [${r.cluster}] ${r.title}`);
  check(new Set(space.map((r) => r.cluster)).size >= 2,
    "検索の上位が複数の星団にまたがる", `${new Set(space.map((r) => r.cluster)).size} つの星団`);

  const added = JSON.parse((await evalIn(
    `(async () => JSON.stringify(await globalThis.__bukusupe.simulateAdd(
       "宇宙飛行士の訓練のすべて", "https://www.jaxa.jp/projects/astronaut/training/", ["あとで読む"])))()`,
  )) ?? "null");
  const before = new Map((layout?.stars ?? []).map((s) => [s.id, s]));
  const moved = (added?.stars ?? []).filter((s) => {
    const old = before.get(s.id);
    return old && (old.x !== s.x || old.y !== s.y || old.cluster !== s.cluster);
  });
  const newStar = (added?.stars ?? []).find((s) => !before.has(s.id));
  check(added != null && moved.length === 0 && newStar != null,
    "1 件増えても既存の星の座標が変わらない",
    newStar ? `新しい星は星団 ${newStar.cluster} の ${newStar.rank} 番目` : "新しい星が見つからない");

  // --- 件数を増やしたときの配置と描画 ---
  for (const n of [20, 150, 2000]) {
    const r = JSON.parse((await evalIn(
      `(async () => JSON.stringify(await globalThis.__bukusupe.benchmark(${n})))()`,
    )) ?? "null");
    const ok = r != null && r.clusters.length > 0;
    const detail = r ? `配置 ${r.layoutMs.toFixed(0)} ミリ秒 / ${r.fps.toFixed(0)} コマ ・ 星団 ${r.clusters.length}` : "計算できない";
    if (n === 2000) check(ok && r.fps >= 55, `${n} 件で配置が終わり 60 コマを保つ`, detail);
    else check(ok, `${n} 件で配置が終わる`, detail);
  }
  await evalIn("globalThis.__bukusupe.restore()");
  await sleep(1200);

  // 初期画面でタイトルの帯が隣の星団の投影円に入り込まない。
  const labelGeometry = JSON.parse((await evalIn(`JSON.stringify({
    circles: globalThis.__bukusupe.labelGeometry(),
    labels: [...document.querySelectorAll('.label-star')]
      .filter((el) => getComputedStyle(el).display !== 'none')
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { cluster: Number(el.dataset.cluster), l: r.left, t: r.top, r: r.right, b: r.bottom };
      })
  })`)) ?? "null");
  const intrusive = (labelGeometry?.labels ?? []).filter((box) =>
    labelGeometry.circles.some((circle) => {
      if (circle.cluster === box.cluster) return false;
      const x = Math.max(box.l, Math.min(circle.sx, box.r));
      const y = Math.max(box.t, Math.min(circle.sy, box.b));
      return ((x - circle.sx) / circle.rx) ** 2 + ((y - circle.sy) / circle.ry) ** 2 < 1;
    }));
  check(labelGeometry?.labels?.length > 0 && intrusive.length === 0,
    "初期画面でタイトルが隣の星団の円に入らない",
    `${labelGeometry?.labels?.length ?? 0} 件表示、侵入 ${intrusive.length} 件`);

  // --- 遠・中・近のスクリーンショット ---
  mkdirSync("docs/screens", { recursive: true });
  {
    // 何もしていないときの初期位置（地図全体が画面の約 80%）
    const shot = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    writeFileSync("docs/screens/initial.png", Buffer.from(shot.data, "base64"));
    console.log("  画面: docs/screens/initial.png");
  }
  for (const tier of ["far", "mid", "near"]) {
    await evalIn(`globalThis.__bukusupe.setZoomTier(${JSON.stringify(tier)})`);
    await sleep(900);
    const shot = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    const path = `docs/screens/${tier}.png`;
    writeFileSync(path, Buffer.from(shot.data, "base64"));
    console.log("  画面:", path);
  }
  await evalIn("globalThis.__bukusupe.setZoomTier('mid')");

  // --- M3: 検索の精度・時間・見た目 ---
  const cases = [
    ["宇宙を感じたい", (r) => r.cluster === "宇宙" || /宇宙|星空|天文|NASA|JAXA|プラネタリウム/.test(r.title)],
    ["パスタ", (r) => r.folder.startsWith("料理")],
    ["recipe", (r) => r.folder.startsWith("料理")],
    ["週末に行ける温泉", (r) => r.folder.startsWith("旅行")],
    ["React の状態管理", (r) => r.folder.startsWith("開発/フロントエンド")],
    ["データベース 設計", (r) => r.folder.startsWith("開発/バックエンド")],
    ["生成AI", (r) => r.folder.startsWith("AI")],
    ["節約", (r) => r.folder.startsWith("お金")],
    ["睡眠を改善したい", (r) => r.folder.startsWith("健康")],
  ];
  const repeated = new Map();
  const report = [];
  const attractRatio = await evalIn("globalThis.__bukusupe.attractRatio");
  console.log("  M3 検索（上位 5 件 / 期待件数）:");
  for (const [query, expected] of cases) {
    const result = JSON.parse((await evalIn(`(async () => {
      const start = performance.now();
      const hits = await globalThis.__bukusupe.search(${JSON.stringify(query)}, 30);
      return JSON.stringify({ hits, ms: performance.now() - start });
    })()`)) ?? "null");
    const top5 = result?.hits?.slice(0, 5) ?? [];
    const count = top5.filter(expected).length;
    const baseline = JSON.parse((await evalIn(`(async () => JSON.stringify(await globalThis.__bukusupe.search(${JSON.stringify(query)}, 5, 0.03, 0)))()`)) ?? "[]");
    const previous = baseline.filter(expected).length;
    const attracted = result?.hits?.filter((r) => r.score >= result.hits[0].score * attractRatio).slice(0, 21).length ?? 0;
    for (const hit of top5) repeated.set(hit.id, { title: hit.title, n: (repeated.get(hit.id)?.n ?? 0) + 1 });
    report.push({ query, previous, expected: count, attracted, ms: result?.ms ?? Infinity, titles: top5.map((r) => r.title) });
    console.log(`    ${query}: ${previous}→${count}/5, 引き寄せ ${attracted} 件, ${result?.ms?.toFixed(0)}ms — ${top5.map((r) => r.title).join(" / ")}`);
  }
  const frequent = [...repeated.values()].filter((r) => r.n >= 4);
  console.log("  4 回以上出る星:", frequent.length ? frequent.map((r) => `${r.title}(${r.n})`).join(" / ") : "なし");
  writeFileSync("docs/screens/search-results.json", JSON.stringify({
    generalityCoefficient: await evalIn("globalThis.__bukusupe.searchCoefficient"),
    clusterPriorCoefficient: await evalIn("globalThis.__bukusupe.clusterPriorCoefficient"),
    attractRatio: await evalIn("globalThis.__bukusupe.attractRatio"),
    queries: report.map(({ query, previous, expected, attracted, titles }) => ({ query, previous, expected, attracted, top5: titles })),
    repeatedAtLeastFour: frequent,
  }, null, 2) + "\n");
  check(report.every((r) => r.expected >= 1), "全検索語で期待分野の星が上位 5 件に入る");
  check(report.every((r) => r.expected >= r.previous), "星団の事前確率で既存 9 語の期待件数が悪化しない",
    `${report.reduce((sum, r) => sum + r.previous, 0)}→${report.reduce((sum, r) => sum + r.expected, 0)}/45`);
  check(report.some((r) => r.attracted < 21) && report.every((r) => r.attracted > 0 && r.attracted <= 21),
    "引き寄せる数がスコア比率で変わる", report.map((r) => r.attracted).join(" / "));
  check(frequent.length === 0, "上位 5 件に 4 回以上出る汎用的な星がない");
  const universe10 = JSON.parse((await evalIn(`(async () => JSON.stringify(await globalThis.__bukusupe.search('宇宙を感じたい', 10)))()`)) ?? "[]");
  const genericSpace = universe10.filter((r) => ["YouTube", "X", "Amazon.co.jp"].includes(r.title));
  check(genericSpace.length === 0, "宇宙検索の上位 10 件に YouTube・X・Amazon がない",
    genericSpace.map((r) => r.title).join(" / ") || "なし");
  const exact = JSON.parse((await evalIn(`(async () => JSON.stringify(await globalThis.__bukusupe.search('YouTube', 1)))()`)) ?? "[]");
  check(exact[0]?.title === "YouTube", "タイトル完全一致が必ず最上位になる");
  check(report.every((r) => r.ms <= 300), "意味検索が埋め込み込みで 300ms 以内",
    `最長 ${Math.max(...report.map((r) => r.ms)).toFixed(0)}ms`);
  const lexicalMs = await evalIn(`(() => {
    const input = document.getElementById('search-input');
    const start = performance.now();
    input.value = '宇'; input.dispatchEvent(new Event('input'));
    return performance.now() - start;
  })()`);
  check(lexicalMs <= 16, "1 文字の文字一致が 16ms 以内", `${lexicalMs.toFixed(2)}ms`);
  check((await evalIn("globalThis.__bukusupe.searchState().ids.length")) > 0,
    "1 文字入力で文字一致の星がすぐ集まる");
  await evalIn(`(async () => globalThis.__bukusupe.searchNow('宇宙を感じたい'))()`);
  await sleep(1400);
  const searchGeometry = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.searchGeometry())")) ?? "null");
  const radii = searchGeometry.stars.map((s) => Math.hypot(s.x - searchGeometry.center.x, s.y - searchGeometry.center.y) / searchGeometry.unit);
  check(searchGeometry.stars.length === report[0].attracted && radii.every((r, i) =>
    Math.abs(r - (i < 3 ? 1 : i < 9 ? 1.75 : 2.55)) < 0.15),
  "しきい値以上の星だけが 3 / 6 / 12 の軌道へ並ぶ", `${searchGeometry.stars.length} 件`);
  const traceBase = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.traceGeometry())")) ?? "null");
  check(traceBase.tails === searchGeometry.stars.length && traceBase.fullLines === 1 &&
    traceBase.maxTailPixels <= 41 && traceBase.startAlpha > traceBase.endAlpha,
    "短い尾だけを常時表示し、全体線は選択中の星だけ", JSON.stringify(traceBase));
  const visuals = JSON.parse((await evalIn(`JSON.stringify([0, 3, 9].map((rank) =>
    globalThis.__bukusupe.starVisual(globalThis.__bukusupe.searchState().ids[rank])))`)) ?? "[]");
  check(visuals.every(Boolean) && visuals[0].size > visuals[1].size && visuals[1].size > visuals[2].size &&
    visuals[0].alpha > visuals[1].alpha && visuals[1].alpha > visuals[2].alpha,
    "内側ほど星が大きく明るい", JSON.stringify(visuals));
  const labels = JSON.parse((await evalIn(`JSON.stringify([...document.querySelectorAll('.label-star')]
    .filter((el) => getComputedStyle(el).display !== 'none' && el.dataset.searchRank !== '')
    .map((el) => { const rect = el.getBoundingClientRect();
      return { rank: Number(el.dataset.searchRank), side: el.dataset.side,
        l: rect.left, r: rect.right, t: rect.top, b: rect.bottom,
        font: parseFloat(getComputedStyle(el).fontSize),
        star: globalThis.__bukusupe.starScreen(el.dataset.key) }; }))`)) ?? "[]");
  const aligned = labels.every((label) => label.side === "right"
    ? label.l > label.star.x : label.r < label.star.x);
  const separate = labels.every((a, i) => labels.every((b, j) => i === j ||
    a.r <= b.l || b.r <= a.l || a.b <= b.t || b.b <= a.t));
  const inner = labels.filter((label) => label.rank < 3);
  const outer = labels.find((label) => label.rank >= 9);
  check(inner.length === Math.min(3, searchGeometry.stars.length) && !!outer &&
    inner.every((label) => label.font > outer.font) && aligned && separate,
    "タイトルは外向きで重ならず、内側を優先して大きく表示",
    `${labels.length} 件表示、内側 ${inner.length}、外側 ${outer?.font ?? '-'}px、向き ${aligned}、重なりなし ${separate}`);
  if (!aligned) console.log("  タイトル向きの不一致:", labels.filter((label) => label.side === "right" ? label.l <= label.star.x : label.r >= label.star.x));
  check(await evalIn(`(() => { const el = document.querySelector('.label-orbit-outer');
    if (!el) return false; el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    const highlighted = el.classList.contains('is-hovered');
    el.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
    return highlighted; })()`), "外側のタイトルはマウスを乗せると明るくなる");
  const secondId = searchGeometry.stars[1]?.id;
  await evalIn(`(() => { const p = globalThis.__bukusupe.starScreen(${JSON.stringify(secondId)});
    document.getElementById('space').dispatchEvent(new MouseEvent('mousemove', { clientX: p.x, clientY: p.y, bubbles: true })); })()`);
  await sleep(180);
  check((await evalIn("globalThis.__bukusupe.traceGeometry().fullLines")) === 2,
    "マウスを乗せた星だけ元位置までの線が増える");
  await evalIn("document.getElementById('space').dispatchEvent(new MouseEvent('mouseleave'))");
  await sleep(180);
  check((await evalIn("globalThis.__bukusupe.cameraTilt()")) < 1,
    "入力欄のフォーカスでカメラが真上になる");
  check(JSON.stringify(layout.stars) === JSON.stringify(JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.layout())")) ?? "null").stars),
    "検索中も保存座標が変わらない");
  const controls = JSON.parse((await evalIn(`(() => {
    const input = document.getElementById('search-input');
    const before = globalThis.__bukusupe.searchState();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    const down = globalThis.__bukusupe.searchState();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    const up = globalThis.__bukusupe.searchState();
    return JSON.stringify({ before, down, up });
  })()`)) ?? "null");
  check(controls.down.selected === controls.down.ids[1] && controls.up.selected === controls.before.selected,
    "上下キーで候補の選択が移る");
  const clicked = JSON.parse((await evalIn(`(() => {
    const id = globalThis.__bukusupe.searchState().selected;
    const point = globalThis.__bukusupe.starScreen(id);
    document.getElementById('space').dispatchEvent(new MouseEvent('click', { clientX: point.x, clientY: point.y, bubbles: true }));
    return JSON.stringify({ title: document.getElementById('star-card-title').textContent,
      hidden: document.getElementById('star-card').hidden });
  })()`)) ?? "null");
  check(!clicked.hidden && !!clicked.title, "星のクリックでカードが開く", clicked.title);
  await evalIn("document.getElementById('star-card').hidden = true");
  const beforeSearchFrames = await evalIn("globalThis.__bukusupe.frames()");
  await sleep(1000);
  const afterSearchFrames = await evalIn("globalThis.__bukusupe.frames()");
  check(afterSearchFrames - beforeSearchFrames >= 55, "検索中も 60 コマを保つ",
    `${afterSearchFrames - beforeSearchFrames} コマ/秒`);
  {
    const shot = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    writeFileSync("docs/screens/search.png", Buffer.from(shot.data, "base64"));
    console.log("  画面: docs/screens/search.png");
  }
  const opened = JSON.parse((await evalIn(`(async () => {
    const before = (await chrome.tabs.query({})).map((tab) => tab.id);
    document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 300));
    const after = (await chrome.tabs.query({})).map((tab) => tab.id);
    const added = after.filter((id) => !before.includes(id));
    if (added.length) await chrome.tabs.remove(added);
    return JSON.stringify({ before: before.length, after: after.length });
  })()`)) ?? "null");
  check(opened.after === opened.before + 1, "Enter で選択中のページを新しいタブで開く");
  await evalIn(`(() => document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })))()`);
  await sleep(1200);
  const returned = JSON.parse((await evalIn(`JSON.stringify({
    input: document.getElementById('search-input').value,
    count: globalThis.__bukusupe.searchState().ids.length,
    tilt: globalThis.__bukusupe.cameraTilt(),
    position: globalThis.__bukusupe.starPosition(${JSON.stringify(searchGeometry.stars[0]?.id)})
  })`)) ?? "null");
  const home = layout.stars.find((s) => s.id === searchGeometry.stars[0]?.id);
  check(returned.input === "" && returned.count === 0 && returned.tilt > 39 &&
    home && Math.hypot(returned.position.x - home.x, returned.position.y - home.y) < 0.5,
  "Esc で検索が消え、星とカメラが元へ戻る");

  // --- 2 回目：再読み込みで計算し直さないこと ---
  events = [];
  const t0 = Date.now();
  await send("Page.reload", {}, sessionId);
  let reloadedOk = false;
  for (let i = 0; i < 30; i++) {
    await sleep(500);
    text = await hud();
    if ((await phase()) === "ready") { reloadedOk = true; break; }
  }
  const elapsed = Date.now() - t0;
  const refetched = events
    .filter((e) => e.method === "Network.requestWillBeSent")
    .map((e) => e.params.request.url)
    .filter((u) => !u.startsWith("chrome-extension://"));
  check(reloadedOk, "再読み込み後も埋め込みが揃っている", `${(elapsed / 1000).toFixed(1)} 秒`);
  const reloadedLayout = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.layout())")) ?? "null");
  check(reloadedLayout && JSON.stringify(reloadedLayout.stars) === JSON.stringify(layout.stars),
    "検索を消して再読み込みしても星の座標が変わらない");
  check(refetched.length === 0, "再読み込みで外部から取り直さない", `${refetched.length} 件`);

  if (SHOT) {
    const shot = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    writeFileSync(SHOT, Buffer.from(shot.data, "base64"));
    console.log("  画面:", SHOT);
  }

  const bad = events.concat().filter(
    (e) =>
      (e.method === "Log.entryAdded" &&
        ["error", "warning"].includes(e.params.entry.level) &&
        !IGNORE.test(e.params.entry.text)) ||
      e.method === "Runtime.exceptionThrown",
  );
  check(bad.length === 0, "エラー・警告が出ない",
    bad.map((b) => b.params?.entry?.text ?? b.params?.exceptionDetails?.text).join(" / "));
} catch (err) {
  console.error(err);
  problems.push(String(err));
} finally {
  await send("Browser.close").catch(() => {});
  child.kill();
  await sleep(500);
  try { rmSync(profile, { recursive: true, force: true, maxRetries: 3 }); } catch { /* 無視 */ }
}

console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
