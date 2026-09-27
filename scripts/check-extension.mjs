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
 * 14. 準備完了直後・再配置後・検索中・再読み込み後に、星の表示位置が配置座標と一致する
 * 15. ドラッグ中、ラベルが星と同じだけ動く（毎コマ追従している）
 * 16. Chrome のデータ源：サンプル⇄実ブックマークの切り替えで星座・平均ベクトルが混ざらない、
 *     本物の削除通知で星座の線が結び直される、続けて変わっても配置に重複・欠落がない
 *
 * 新しいプロファイルで動かすのでブックマークは空。表示はサンプル 156 件になる。
 * 実ブックマークの経路は、この確認スクリプトが使い捨てのプロファイルに chrome.bookmarks.create /
 * remove でブックマークを作って通す。拡張機能のコード自体は読み取り専用のまま。
 */
import { spawn } from "node:child_process";
import { mkdtempSync, mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DIST = resolve(process.argv[2] ?? "dist-debug");
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
// ヘッドレス Chrome が稀に応答しなくなる（ブラウザ本体が CPU 100% のまま）。無限に待たず、
// 60 秒で失敗として止めて、どの命令で止まったかを出す。
const SEND_TIMEOUT_MS = 60_000;
const send = (method, params = {}, sessionId) =>
  new Promise((ok, ng) => {
    const id = ++seq;
    const timer = setTimeout(() => {
      pending.delete(id);
      ng(new Error(`${method} が ${SEND_TIMEOUT_MS / 1000} 秒応答しない（ヘッドレス Chrome の不調の可能性）`));
    }, SEND_TIMEOUT_MS);
    pending.set(id, (m) => {
      clearTimeout(timer);
      if (m.error) ng(new Error(`${method}: ${JSON.stringify(m.error)}`));
      else ok(m.result);
    });
    wfd.write(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }) + "\0");
  });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const IGNORE = /GPU stall|GL Driver Message|software WebGL/;

/** 拡張機能とは別の方法（クラスカル法）で最小全域木を求める。描いた線の検算に使う。 */
function kruskal(points) {
  const pairs = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      pairs.push({ i, j, d: (points[i].x - points[j].x) ** 2 + (points[i].y - points[j].y) ** 2 });
    }
  }
  pairs.sort((a, b) => a.d - b.d);
  const parent = points.map((_, i) => i);
  const root = (i) => (parent[i] === i ? i : (parent[i] = root(parent[i])));
  const edges = [];
  for (const { i, j } of pairs) {
    const a = root(i), b = root(j);
    if (a === b) continue;
    parent[a] = b;
    edges.push([points[i].id, points[j].id]);
  }
  return edges;
}
const edgeKeys = (edges) => edges.map((e) => [e.a ?? e[0], e.b ?? e[1]].sort().join("|")).sort();
const sameEdges = (a, b) => JSON.stringify(edgeKeys(a)) === JSON.stringify(edgeKeys(b));

/** dist/ の JS に、ブックマークを書き換える呼び出しがないか（読み取り専用の確認）。 */
function bookmarkWrites(dir) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true, recursive: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".js")) continue;
    const path = join(entry.parentPath ?? entry.path, entry.name);
    const hits = readFileSync(path, "utf8").match(/bookmarks\.(create|update|remove|removeTree|move)\b/g);
    if (hits) found.push(`${entry.name}: ${[...new Set(hits)].join(", ")}`);
  }
  return found;
}
const problems = [];
const check = (ok, label, detail = "") => {
  console.log(`${ok ? "  OK " : "  NG "} ${label}${detail ? " … " + detail : ""}`);
  if (!ok) problems.push(label);
};

try {
  await sleep(2500);
  const { id: extId } = await send("Extensions.loadUnpacked", { path: DIST });
  console.log("拡張機能 ID:", extId);

  const { targetId } = await send("Target.createTarget", { url: `chrome-extension://${extId}/index.html?debug=1` });
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
  await send("Performance.enable", {}, sessionId);
  const layoutCount = async () => (await send("Performance.getMetrics", {}, sessionId))
    .metrics.find((metric) => metric.name === "LayoutCount")?.value ?? NaN;
  /** 表示の判断は星が落ち着いてから行い、ラベルは 180ms で現れる。現れ終わるまで待つ（最大 3 秒）。 */
  const waitForLabel = async (filter) => {
    for (let i = 0; i < 30; i++) {
      if (await evalIn(`[...document.querySelectorAll('.label-star${filter}')]
        .some((el) => Number(getComputedStyle(el).opacity) > 0.9)`)) return true;
      await sleep(100);
    }
    return false;
  };
  const sampleLabels = `JSON.stringify((() => {
    const cx = innerWidth / 2, cy = innerHeight / 2;
    const out = {};
    for (const el of document.querySelectorAll('.label-star')) {
      // 見えているラベルすべて（段階 2 から、地図のタイトルの不透明度は新しさで 0.4〜1.0。ちょうど 1 だけに絞ると、
      // サンプルの日時と今日の差で 0 件になることがある）
      if (!(Number(el.style.opacity) > 0)) continue;
      const m = /translate3d\\(([-\\d.]+)px, ([-\\d.]+)px/.exec(el.style.transform);
      const p = m && globalThis.__bukusupe.starScreen(el.dataset.key);
      if (!p) continue;
      let sx = p.x, sy = p.y;
      if (el.dataset.searchRank !== '') {
        const o = Math.hypot(sx - cx, sy - cy) || 1;
        sx += (sx - cx) / o * 10;
        sy += (sy - cy) / o * 10;
      }
      out[el.dataset.key] = { dx: Number(m[1]) - sx, dy: Number(m[2]) - sy, sx: p.x, sy: p.y };
    }
    return out;
  })())`;
  const dragLabels = async (mode) => {
    await sleep(250);
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 530, y: 600 }, sessionId);
    await send("Input.dispatchMouseEvent", { type: "mousePressed", x: 530, y: 600,
      button: "left", buttons: 1, clickCount: 1 }, sessionId);
    await evalIn("globalThis.__bukusupe.resetLabelTiming()");
    const before = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.labelStats())")) ?? "null");
    const beforeLayouts = await layoutCount();
    // ドラッグの途中で、ラベルの位置（style.transform）と星の画面位置を同じ瞬間に読む。
    // どちらもレイアウトを起こさない読み方にしている（LayoutCount の確認を汚さない）。
    const samples = [];
    for (let step = 1; step <= 45; step++) {
      await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 530 + step * 4, y: 600 + step,
        button: "left", buttons: 1 }, sessionId);
      await sleep(16);
      if (step % 9 === 0) samples.push(JSON.parse((await evalIn(sampleLabels)) ?? "{}"));
    }
    const afterLayouts = await layoutCount();
    const after = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.labelStats())")) ?? "null");
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: 710, y: 645,
      button: "left", buttons: 0, clickCount: 1 }, sessionId);
    const frames = after.frames - before.frames;
    // 星からラベルまでのずれ（右横 8px など）は、ドラッグ中ずっと同じでなければならない。
    const keys = Object.keys(samples[0] ?? {}).filter((key) => samples.every((sample) => sample[key]));
    let worst = 0, travel = 0;
    for (const key of keys) {
      const first = samples[0][key];
      const last = samples.at(-1)[key];
      travel = Math.max(travel, Math.hypot(last.sx - first.sx, last.sy - first.sy));
      for (const sample of samples) {
        worst = Math.max(worst, Math.hypot(sample[key].dx - first.dx, sample[key].dy - first.dy));
      }
    }
    check(frames >= 30 && keys.length >= 3 && travel > 20 && worst <= 0.5,
      `${mode}のドラッグ中、ラベルが星と同じだけ動く`,
      `${keys.length} 件を ${samples.length} 回測定、星の移動 ${travel.toFixed(0)}px、ずれの変化 最大 ${worst.toFixed(2)}px、${frames} コマ`);
    check(after.maxPositionMs <= 2, `${mode}のラベル位置更新が毎回 2ms 以内`,
      `最大 ${after.maxPositionMs.toFixed(2)}ms`);
    check(afterLayouts === beforeLayouts && after.decisions === before.decisions,
      `${mode}の移動中に再レイアウトとラベル再判定がない`,
      `LayoutCount ${beforeLayouts}→${afterLayouts}、再判定 ${after.decisions - before.decisions} 回`);
  };
  const hud = () => evalIn("document.getElementById('hud')?.innerText ?? ''");
  const phase = () => evalIn("document.body.dataset.phase ?? ''");
  /** 全星の表示位置（ばね・移動の結果）と、配置の座標の差。H1 の検出に使う。 */
  const positionDrift = async () => JSON.parse((await evalIn(`JSON.stringify((() => {
    const layout = globalThis.__bukusupe.layout();
    let off = 0, missing = 0, max = 0;
    for (const s of layout?.stars ?? []) {
      const p = globalThis.__bukusupe.starPosition(s.id);
      if (!p) { missing++; continue; }
      const d = Math.hypot(p.x - s.x, p.y - s.y);
      max = Math.max(max, d);
      if (d >= 0.01) off++;
    }
    return { stars: layout?.stars.length ?? 0, off, missing, max };
  })())`)) ?? "null");
  const driftText = (d) => d ? `${d.off}/${d.stars} 件ずれ、最大 ${d.max.toFixed(3)}` : "測れない";
  const driftOk = (d) => d != null && d.stars > 0 && d.off === 0 && d.missing === 0;

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
  check(liveFrames != null && liveFrames >= 30, "計算中も画面が動いている",
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

  const writes = bookmarkWrites(DIST);
  check(writes.length === 0, "拡張機能のコードにブックマークを書き換える呼び出しがない",
    writes.join(" / ") || "なし");

  // 仮配置から意味配置への移動（0.9 秒）が終わるのを待ってから、表示位置を配置と比べる。
  await sleep(1800);
  const readyDrift = await positionDrift();
  check(driftOk(readyDrift), "準備完了直後、全星の表示位置が配置座標と一致する", driftText(readyDrift));
  await evalIn("(async () => { await globalThis.__bukusupe.relayout(); })()");
  await sleep(1800);
  const relayoutDrift = await positionDrift();
  check(driftOk(relayoutDrift), "再配置の後も、全星の表示位置が配置座標と一致する", driftText(relayoutDrift));

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
  // 12〜19 件でも、統合で SPEC の下限（12 件以上なら 3 個）を割らない
  const small = [];
  for (const n of [12, 15, 19]) {
    const r = JSON.parse((await evalIn(
      `(async () => JSON.stringify(await globalThis.__bukusupe.benchmark(${n})))()`,
    )) ?? "null");
    small.push(`${n} 件→${r?.clusters.length ?? "?"} 個`);
    if (!r || r.clusters.length < 3) small.failed = true;
  }
  check(!small.failed, "12・15・19 件でも星団が 3 個以上ある", small.join(" / "));
  for (const n of [20, 150, 2000]) {
    const r = JSON.parse((await evalIn(
      `(async () => JSON.stringify(await globalThis.__bukusupe.benchmark(${n})))()`,
    )) ?? "null");
    const ok = r != null && r.clusters.length > 0;
    const detail = r ? `配置 ${r.layoutMs.toFixed(0)} ミリ秒 / ${r.fps.toFixed(0)} コマ ・ 星団 ${r.clusters.length}` : "計算できない";
    if (n === 2000) check(ok && r.fps >= 55, `${n} 件で配置が終わり 60 コマを保つ`, detail);
    else check(ok, `${n} 件で配置が終わる`, detail);
    if (n === 2000) {
      await evalIn("globalThis.__bukusupe.setZoomTier('mid')");
      await sleep(500);
      const mid = JSON.parse((await evalIn(`(() => {
        const items = globalThis.__bukusupe.state.items;
        const byId = new Map(items.map((item) => [item.id, item]));
        const recent = (item) => {
          const touched = Math.max(item?.dateLastUsed ?? 0, item?.dateAdded ?? 0);
          if (!touched) return 0.5;
          const days = Math.max(0, (Date.now() - touched) / 86400000);
          return 1 - Math.min(1, Math.log(days + 1) / Math.log(731));
        };
        const shown = [...document.querySelectorAll('.label-star')].filter((el) =>
          Number(getComputedStyle(el).opacity) > 0.05 && byId.has(el.dataset.key));
        const avg = (values) => values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
        return JSON.stringify({ count: shown.length, all: avg(items.map(recent)),
          shown: avg(shown.map((el) => recent(byId.get(el.dataset.key)))) });
      })()`)) ?? "null");
      check(mid && mid.count >= 6 && mid.count <= 32 && mid.shown > mid.all + 0.15,
        "2000 件の中距離では、明るい星のラベルを優先して読みやすい数に収める",
        mid ? `${mid.count} 件・表示星の平均 ${mid.shown.toFixed(3)} / 全体 ${mid.all.toFixed(3)}` : "測れない");
    }
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
        return { title: el.textContent, opacity: getComputedStyle(el).opacity,
          cluster: Number(el.dataset.cluster), l: r.left, t: r.top, r: r.right, b: r.bottom };
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
    `${labelGeometry?.labels?.length ?? 0} 件表示、侵入 ${intrusive.length} 件 ${JSON.stringify(intrusive)}`);
  await waitForLabel("");
  const labelCard = JSON.parse((await evalIn(`(() => {
    const el = [...document.querySelectorAll('.label-star')]
      .find((label) => Number(getComputedStyle(label).opacity) > 0.9);
    if (!el) return JSON.stringify({ found: false });
    el.click();
    const card = document.getElementById('star-card');
    return JSON.stringify({ found: true, clickable: getComputedStyle(el).pointerEvents === 'auto',
      visible: !card.hidden, title: document.getElementById('star-card-title').textContent,
      label: el.textContent });
  })()`)) ?? "null");
  check(labelCard?.found && labelCard.clickable && labelCard.visible &&
    labelCard.title.startsWith(labelCard.label.replace(/…$/, "")),
    "星のタイトルをクリックすると同じ星のカードが開く", labelCard?.title ?? "ラベルなし");
  await evalIn("document.getElementById('star-card').hidden = true");

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
  const contrast = JSON.parse((await evalIn(`(() => {
    const byId = new Map(globalThis.__bukusupe.state.items.map((item) => [item.id, item]));
    const recent = (item) => {
      const touched = Math.max(item?.dateLastUsed ?? 0, item?.dateAdded ?? 0);
      if (!touched) return 0.5;
      const days = Math.max(0, (Date.now() - touched) / 86400000);
      return 1 - Math.min(1, Math.log(days + 1) / Math.log(731));
    };
    const rows = [...document.querySelectorAll('.label-star')].filter((el) =>
      Number(getComputedStyle(el).opacity) > 0.05 && byId.has(el.dataset.key))
      .map((el) => ({ brightness: recent(byId.get(el.dataset.key)),
        opacity: Number(getComputedStyle(el).opacity), font: parseFloat(getComputedStyle(el).fontSize) }))
      .sort((a, b) => a.brightness - b.brightness);
    const count = Math.max(1, Math.floor(rows.length / 4));
    const avg = (values) => values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
    const dark = rows.slice(0, count), bright = rows.slice(-count);
    return JSON.stringify({ count: rows.length,
      dark: { brightness: avg(dark.map((row) => row.brightness)), opacity: avg(dark.map((row) => row.opacity)), font: avg(dark.map((row) => row.font)) },
      bright: { brightness: avg(bright.map((row) => row.brightness)), opacity: avg(bright.map((row) => row.opacity)), font: avg(bright.map((row) => row.font)) } });
  })()`)) ?? "null");
  check(contrast && contrast.count >= 8 && contrast.bright.brightness > contrast.dark.brightness + 0.2 &&
    contrast.bright.opacity > contrast.dark.opacity + 0.1 && contrast.bright.font > contrast.dark.font,
  "明るい星のタイトルは暗い星より不透明度が高く、文字も大きい",
  contrast ? `${contrast.count} 件・不透明度 ${contrast.dark.opacity.toFixed(2)}→${contrast.bright.opacity.toFixed(2)}・文字 ${contrast.dark.font.toFixed(1)}→${contrast.bright.font.toFixed(1)}px` : "測れない");
  await evalIn("globalThis.__bukusupe.setZoomTier('far')");
  await sleep(900);
  // 近・中・遠のどの拡大率でも、星団名をクリックするとその星団の中心へ移る。
  // 中距離より遠ければ中距離まで寄り、それより近ければ距離を保つ。
  const clusterClicks = [];
  for (const tier of ["far", "mid", "near"]) {
    await evalIn("globalThis.__bukusupe.resetCamera()");
    await evalIn(`globalThis.__bukusupe.setZoomTier(${JSON.stringify(tier)})`);
    await sleep(700);
    const before = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.cameraState())")) ?? "null");
    let target = null;
    for (let i = 0; i < 20 && !target; i++) {
      target = JSON.parse((await evalIn(`(() => {
        const cam = globalThis.__bukusupe.cameraState();
        const clusters = globalThis.__bukusupe.layout().clusters;
        for (const el of document.querySelectorAll('.label-cluster-focus')) {
          if (Number(getComputedStyle(el).opacity) < 0.9) continue;
          const rect = el.getBoundingClientRect();
          const x = rect.left + rect.width / 2, y = rect.top + rect.height / 2;
          if (x < 0 || y < 0 || x > innerWidth || y > innerHeight || document.elementFromPoint(x, y) !== el) continue;
          const c = clusters.find((row) => row.index === Number(el.dataset.cluster));
          if (c && Math.hypot(c.x - cam.x, c.y - cam.y) > 1) {
            return JSON.stringify({ x, y, cluster: c, cursor: getComputedStyle(el).cursor });
          }
        }
        return "null";
      })()`)) ?? "null");
      if (!target) await sleep(150);
    }
    if (target) {
      await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: target.x, y: target.y }, sessionId);
      await send("Input.dispatchMouseEvent", { type: "mousePressed", x: target.x, y: target.y,
        button: "left", buttons: 1, clickCount: 1 }, sessionId);
      await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: target.x, y: target.y,
        button: "left", buttons: 0, clickCount: 1 }, sessionId);
    }
    await sleep(900);
    const after = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.cameraState())")) ?? "null");
    const centered = target && Math.hypot(after.x - target.cluster.x, after.y - target.cluster.y) < 0.1;
    const distanceOk = tier === "far"
      ? after.tier === "mid" && after.distance < before.distance
      : Math.abs(after.distance - before.distance) / before.distance < 0.01;
    clusterClicks.push({ tier, ok: !!(target && centered && distanceOk && target.cursor === "pointer"),
      text: target ? `${tier}: ${target.cluster.name} ${before.distance.toFixed(0)}→${after.distance.toFixed(0)} (${after.tier})` : `${tier}: 押せる星団名がない` });
  }
  check(clusterClicks.every((row) => row.ok), "近・中・遠のどれでも、星団名のクリックでその星団の中心へ移る（カーソルは指の形）",
    clusterClicks.map((row) => row.text).join(" / "));
  await evalIn("globalThis.__bukusupe.resetCamera()");
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
  // 前の確認で置いたままのマウスの下に検索のタイトルが現れると、ホバー扱いになって線が増える。
  // 何も無い左下の隅へ退避させてから検索する。
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 4, y: 790 }, sessionId);
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
  await waitForLabel(':not([data-search-rank=""])');
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
  const searchPositions = JSON.parse((await evalIn(`JSON.stringify((() => {
    const layout = globalThis.__bukusupe.layout();
    const hits = new Set(globalThis.__bukusupe.searchState().ids);
    let still = 0, stillOff = 0, moved = 0;
    for (const s of layout.stars) {
      const p = globalThis.__bukusupe.starPosition(s.id);
      if (!p) continue;
      const d = Math.hypot(p.x - s.x, p.y - s.y);
      if (hits.has(s.id)) { if (d > 0.5) moved++; }
      else { still++; if (d >= 0.01) stillOff++; }
    }
    return { hits: hits.size, still, stillOff, moved, stored: JSON.stringify(layout.stars) };
  })())`)) ?? "null");
  check(searchPositions && searchPositions.stored === JSON.stringify(layout.stars) &&
    searchPositions.hits > 0 && searchPositions.moved === searchPositions.hits && searchPositions.stillOff === 0,
  "検索中、引き寄せた星だけが動き、他の星は配置座標のまま",
  searchPositions ? `引き寄せ ${searchPositions.moved}/${searchPositions.hits}、動かない星のずれ ${searchPositions.stillOff}/${searchPositions.still}` : "測れない");
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
  await waitForLabel(':not([data-search-rank=""])');
  const searchLabelCard = JSON.parse((await evalIn(`(() => {
    const el = document.querySelector('.label-orbit-inner');
    if (!el) return JSON.stringify({ found: false });
    el.click();
    return JSON.stringify({ found: true, visible: !document.getElementById('star-card').hidden,
      title: document.getElementById('star-card-title').textContent, label: el.textContent });
  })()`)) ?? "null");
  check(searchLabelCard?.found && searchLabelCard.visible && searchLabelCard.title === searchLabelCard.label,
    "検索中のタイトルもクリックでカードが開く", searchLabelCard?.title ?? "ラベルなし");
  await evalIn("document.getElementById('star-card').hidden = true");
  // 描画の力（検索を表示したまま何コマ描けるか）を測る。動きがあるときだけ描く方式では、落ち着いた検索は描き直さないので、
  // この 3 秒は止めずに描かせる（止まることの確認は check-idle.mjs）
  await evalIn("globalThis.__bukusupe.setContinuousRender(true)");
  const beforeSearchFrames = await evalIn("globalThis.__bukusupe.frames()");
  const searchFrameStart = performance.now();
  await sleep(3000);
  const afterSearchFrames = await evalIn("globalThis.__bukusupe.frames()");
  const searchFps = (afterSearchFrames - beforeSearchFrames) / ((performance.now() - searchFrameStart) / 1000);
  await evalIn("globalThis.__bukusupe.setContinuousRender(false)");
  check(searchFps >= 55, "検索中も 60 コマを保つ", `${searchFps.toFixed(1)} コマ/秒（3 秒平均）`);
  {
    const shot = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    writeFileSync("docs/screens/search.png", Buffer.from(shot.data, "base64"));
    console.log("  画面: docs/screens/search.png");
  }
  // 真上のまま検索語を打ち替える。星が軌道に着いてからタイトルの左右と重なりを決めていれば、
  // タイトルは星から見て外側に出て、互いに重ならない。
  const labelAudit = `JSON.stringify((() => {
    const cx = innerWidth / 2;
    const labels = [...document.querySelectorAll('.label-star')]
      .filter((el) => el.dataset.searchRank !== '' && el.style.opacity === '1');
    let wrongSide = 0, overlaps = 0;
    const boxes = labels.map((el) => el.getBoundingClientRect());
    labels.forEach((el, i) => {
      const p = globalThis.__bukusupe.starScreen(el.dataset.key);
      // 中心線の上の星（各リングの先頭は黒穴の真上に来る）は、左右どちらに出ても外向き
      if (!p || Math.abs(p.x - cx) < 4) return;
      const outwardRight = p.x >= cx;
      const labelRight = (boxes[i].left + boxes[i].right) / 2 >= p.x;
      if (outwardRight !== labelRight) wrongSide++;
    });
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      if (a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom) overlaps++;
    }
    return { shown: labels.length, wrongSide, overlaps };
  })())`;
  const retyped = [];
  for (const query of ["パスタ", "React の状態管理", "睡眠を改善したい", "宇宙を感じたい"]) {
    await evalIn(`(async () => { await globalThis.__bukusupe.searchNow(${JSON.stringify(query)}); })()`);
    await sleep(2000);
    retyped.push({ query, ...JSON.parse((await evalIn(labelAudit)) ?? "{}") });
  }
  check(retyped.every((r) => r.shown > 0 && r.wrongSide === 0 && r.overlaps === 0),
    "検索語を打ち替えても、タイトルが内側に出たり重なったりしない",
    retyped.map((r) => `${r.query}: ${r.shown} 件・内側 ${r.wrongSide}・重なり ${r.overlaps}`).join(" / "));
  await dragLabels("検索中");
  const opened = JSON.parse((await evalIn(`(async () => {
    const originalUpdate = chrome.tabs.update, originalCreate = chrome.tabs.create;
    const switched = [], created = [];
    chrome.tabs.update = (...args) => { switched.push(args.at(-1)?.url); return Promise.resolve({ id: -1 }); };
    chrome.tabs.create = (options) => { created.push(options.url); return Promise.resolve({ id: -2 }); };
    document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 300));
    chrome.tabs.update = originalUpdate; chrome.tabs.create = originalCreate;
    return JSON.stringify({ switched, created, selected: globalThis.__bukusupe.searchState().selected });
  })()`)) ?? "null");
  const selectedUrl = await evalIn(`globalThis.__bukusupe.state.items.find((row) => row.id === ${JSON.stringify(opened.selected)})?.url`);
  check(opened.switched.length === 1 && opened.switched[0] === selectedUrl && opened.created.length === 0,
    "Enter で選択中のページへ同じタブを切り替える");
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
  await dragLabels("通常画面");
  const tiltBefore = await evalIn("globalThis.__bukusupe.cameraTilt()");
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 790, y: 460 }, sessionId);
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x: 790, y: 460,
    button: "right", buttons: 2, clickCount: 1 }, sessionId);
  for (let step = 1; step <= 12; step++) {
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 790, y: 460 + step * 10,
      button: "right", buttons: 2 }, sessionId);
  }
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: 790, y: 580,
    button: "right", buttons: 0, clickCount: 1 }, sessionId);
  await sleep(180);
  const tiltAfter = await evalIn("globalThis.__bukusupe.cameraTilt()");
  check(tiltAfter > tiltBefore + 10 && tiltAfter <= 60.1,
    "右ドラッグで地図の傾きだけが変わる", `${tiltBefore.toFixed(1)}°→${tiltAfter.toFixed(1)}°`);
  await evalIn("globalThis.__bukusupe.setTopDown(true)");
  await sleep(900);
  const topDownTilt = await evalIn("globalThis.__bukusupe.cameraTilt()");
  await evalIn("globalThis.__bukusupe.setTopDown(false)");
  await sleep(900);
  const restoredTilt = await evalIn("globalThis.__bukusupe.cameraTilt()");
  // --- キー操作 ---
  // キーはページの中で KeyboardEvent として発行する。CDP の Input.dispatchKeyEvent は、macOS の
  // ヘッドレス Chrome ではブラウザ本体のキー振り分け（AppKit の routeKeyEquivalent）で詰まり、
  // その後の再読み込みで固まることがあった（sample で確認）。アプリが見ているのは window の
  // keydown / keyup と event.code・event.key なので、確認の意味は変わらない。
  const key = async (type, code, keyName) => evalIn(`(() => {
    const target = document.activeElement ?? document.body;
    const event = new KeyboardEvent(${JSON.stringify(type)}, { code: ${JSON.stringify(code)}, key: ${JSON.stringify(keyName)},
      bubbles: true, cancelable: true });
    target.dispatchEvent(event);
    return event.defaultPrevented;
  })()`);
  const hold = async (code, keyName, _vk, ms) => {
    const prevented = await key("keydown", code, keyName);
    await sleep(ms);
    await key("keyup", code, keyName);
    await sleep(500);   // 止まりの減速が終わるまで
    return prevented;
  };
  const cam = async () => JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.cameraState())")) ?? "null");
  await evalIn("document.activeElement?.blur()");
  const beforeW = await cam();
  await hold("KeyW", "w", 87, 600);
  const afterW = await cam();
  check(afterW.y > beforeW.y + beforeW.distance * 0.1 && Math.abs(afterW.x - beforeW.x) < 0.01,
    "W を押し続けるとカメラが上へ移動する", `y ${beforeW.y.toFixed(1)}→${afterW.y.toFixed(1)}`);
  await evalIn("document.getElementById('search-input').focus()");
  await sleep(300);
  const beforeTyping = await cam();
  await hold("KeyW", "w", 87, 600);
  const afterTyping = await cam();
  await evalIn("(() => { const input = document.getElementById('search-input'); input.value = ''; input.dispatchEvent(new Event('input')); input.blur(); })()");
  await sleep(900);
  check(Math.hypot(afterTyping.x - beforeTyping.x, afterTyping.y - beforeTyping.y) < 0.01,
    "入力欄にフォーカスがあるときは W で動かない");
  const beforeSpace = await cam();
  const spacePrevented = await hold("Space", " ", 32, 500);
  const afterSpace = await cam();
  check(spacePrevented === true, "Space でページがスクロールしない（既定の動作を止めている）");
  await hold("ShiftLeft", "Shift", 16, 500);
  const afterShift = await cam();
  check(afterSpace.distance > beforeSpace.distance * 1.2 && afterShift.distance < afterSpace.distance * 0.85,
    "Space で縮小、Shift で拡大する",
    `距離 ${beforeSpace.distance.toFixed(0)}→${afterSpace.distance.toFixed(0)}→${afterShift.distance.toFixed(0)}`);
  const slash = await evalIn(`(() => {
    document.activeElement?.blur();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: '/', bubbles: true, cancelable: true }));
    const focused = document.activeElement === document.getElementById('search-input');
    document.getElementById('search-input').blur();
    return focused;
  })()`);
  check(slash, "「/」で検索欄にフォーカスする");
  await evalIn("globalThis.__bukusupe.resetCamera()");
  await sleep(300);

  check(topDownTilt < 1 && Math.abs(restoredTilt - tiltAfter) < 1,
    "検索の真上表示を抜けると右ドラッグで決めた傾きへ戻る",
    `${topDownTilt.toFixed(1)}°→${restoredTilt.toFixed(1)}°`);

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
  await sleep(1800);
  const reloadDrift = await positionDrift();
  check(reloadedLayout && JSON.stringify(reloadedLayout.stars) === JSON.stringify(layout.stars) && driftOk(reloadDrift),
    "再読み込み後も、保存座標が同じで、全星がその位置に表示される", driftText(reloadDrift));
  check(refetched.length === 0, "再読み込みで外部から取り直さない", `${refetched.length} 件`);

  // --- M4：星座の編集、描画、保存と再検索 ---
  await evalIn("globalThis.__bukusupe.searchNow('宇宙を感じたい')");
  await sleep(900);
  const initialConstellationSearch = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.searchState())")) ?? "null");
  check(initialConstellationSearch.ids.length >= 3 &&
    await evalIn("!document.getElementById('constellation-create').hidden"),
  "検索中に星座にする操作が表示される");
  await evalIn("document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown', {key:'Enter',shiftKey:true,bubbles:true}))");
  const editStart = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.constellationState().editing)")) ?? "null");
  check(editStart?.members.length === Math.min(12, initialConstellationSearch.ids.length),
    "Shift+Enter で上位最大12件を編集状態へ入れる", `${editStart?.members.length ?? 0} 件`);
  const removedId = editStart?.members[0];
  const firstCluster = layout.stars.find((s) => s.id === removedId)?.cluster;
  const addedId = layout.stars.find((s) => s.cluster === firstCluster &&
    !initialConstellationSearch.ids.includes(s.id))?.id;
  await evalIn(`globalThis.__bukusupe.toggleEditMember(${JSON.stringify(removedId)})`);
  await evalIn(`globalThis.__bukusupe.toggleEditMember(${JSON.stringify(addedId)})`);
  const editChanged = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.constellationState().editing)")) ?? "null");
  check(editChanged.excluded.includes(removedId) && editChanged.pinned.includes(addedId) &&
    !editChanged.members.includes(removedId) && editChanged.members.includes(addedId),
  "編集で星を外し、検索圏外の星を加えると excluded / pinned に残る");
  await evalIn("document.getElementById('constellation-name-input').value='わたしの宇宙'");
  // 星が軌道に着いてタイトルが出るのを待ってから撮る
  await waitForLabel(':not([data-search-rank=""])');
  await sleep(300);
  {
    const shot = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    writeFileSync("docs/screens/constellation-edit.png", Buffer.from(shot.data, "base64"));
    console.log("  画面: docs/screens/constellation-edit.png");
  }
  await evalIn("document.getElementById('constellation-save').click()");
  let constellationId = null;
  for (let i = 0; i < 30; i++) {
    await sleep(100);
    constellationId = await evalIn("globalThis.__bukusupe.constellationState().rows[0]?.id ?? null");
    if (constellationId) break;
  }
  check(!!constellationId, "名前を付けた星座が IndexedDB に保存される");
  let drawingCaptured = false;
  for (let i = 0; i < 65; i++) {
    const animation = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.constellationState().animation)")) ?? "null");
    if (animation?.phase === "drawing" && animation.edgesDrawn >= Math.ceil(animation.edges / 2) &&
      animation.edgesDrawn < animation.edges) {
      const shot = await send("Page.captureScreenshot", { format: "png" }, sessionId);
      writeFileSync("docs/screens/constellation-drawing.png", Buffer.from(shot.data, "base64"));
      console.log("  画面: docs/screens/constellation-drawing.png");
      drawingCaptured = true;
      break;
    }
    await sleep(40);
  }
  check(drawingCaptured, "線を1本ずつ描く途中を確認できる");
  // 演出が続いている間（最大 1 秒）のコマ数を数える。動きがあるときだけ描く方式では、演出が終われば描かなくなるので、
  // 窓が演出の終わりを越えると、その分コマ数が少なく出る（演出の途中のコマ落ちとは別）
  const animationFps = JSON.parse((await evalIn(`(async () => {
    const b = globalThis.__bukusupe;
    // 直前のスクリーンショットで止まったコマを数えないよう、2 コマ待ってから、コマの時刻でそろえて数える
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    let f0 = null, t0 = null, f1 = null, t1 = null;
    await new Promise((resolve) => {
      const step = (ts) => {
        if (t0 === null) { t0 = ts; f0 = b.frames(); }
        t1 = ts; f1 = b.frames();
        if (ts - t0 >= 1000 || b.constellationState().animation.phase === 'done') { resolve(); return; }
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    const seconds = (t1 - t0) / 1000;
    return JSON.stringify({ fps: seconds > 0 ? (f1 - f0) / seconds : 0, seconds });
  })()`)) ?? "null");
  check(animationFps && animationFps.seconds >= 0.3 && animationFps.fps >= 55, "保存演出中も60コマを保つ",
    animationFps ? `${animationFps.fps.toFixed(0)} コマ/秒（演出中の ${animationFps.seconds.toFixed(2)} 秒）` : "測れない");
  let nameAppeared = false;
  for (let i = 0; i < 30; i++) {
    nameAppeared = await evalIn("document.getElementById('constellation-name').classList.contains('is-visible')");
    if (nameAppeared) break;
    await sleep(100);
  }
  check(nameAppeared, "線を描き終えた後に星座名が浮かぶ");
  await sleep(1700);
  const savedConstellation = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.constellationState())")) ?? "null");
  const savedRow = savedConstellation.rows.find((row) => row.id === constellationId);
  const savedLines = savedConstellation.geometry.find((row) => row.id === constellationId);
  check(savedConstellation.active === null && savedRow?.name === "わたしの宇宙" &&
    savedRow.queryVector?.length === 384 && savedLines?.opacity === 0.15 &&
    savedLines?.members.length === savedRow.members.length,
  "保存後は通常の夜空で星座の線が15%になる");
  {
    const shot = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    writeFileSync("docs/screens/constellation-saved.png", Buffer.from(shot.data, "base64"));
    console.log("  画面: docs/screens/constellation-saved.png");
  }
  const ids = savedRow.members;
  const mstA = JSON.parse((await evalIn(`JSON.stringify(globalThis.__bukusupe.mstFor(${JSON.stringify(ids)}))`)) ?? "[]");
  const byId = new Map(layout.stars.map((s) => [s.id, s]));
  const crosses = (e1, e2) => {
    if ([e1.a, e1.b].some((id) => id === e2.a || id === e2.b)) return false;
    const [a, b, c, d] = [e1.a, e1.b, e2.a, e2.b].map((id) => byId.get(id));
    const side = (p, q, r) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
    return side(a, b, c) * side(a, b, d) < 0 && side(c, d, a) * side(c, d, b) < 0;
  };
  check(mstA.length === ids.length - 1 && mstA.every((e, i) => mstA.every((other, j) => i === j || !crosses(e, other))),
    "最小全域木の辺は星の数−1で、交差しない", `${ids.length} 星 / ${mstA.length} 辺`);
  const independent = kruskal(ids.map((id) => byId.get(id)).filter(Boolean));
  check(independent.length === ids.length - 1 && sameEdges(savedLines.edges, independent) && sameEdges(mstA, independent),
    "描いた線が、別の方法（クラスカル法）で求めた最小全域木と一致する", `${independent.length} 辺`);

  await send("Page.reload", {}, sessionId);
  for (let i = 0; i < 30 && (await phase()) !== "ready"; i++) await sleep(500);
  const persisted = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.constellationState())")) ?? "null");
  const persistedRow = persisted.rows.find((row) => row.id === constellationId);
  const persistedLines = persisted.geometry.find((row) => row.id === constellationId);
  check(persistedRow?.name === savedRow.name &&
    JSON.stringify(persistedRow?.members) === JSON.stringify(savedRow.members) &&
    JSON.stringify(persistedLines?.edges) === JSON.stringify(savedLines.edges),
  "再読み込み後も名前・メンバー・線が残る");
  await evalIn(`globalThis.__bukusupe.recallConstellation(${JSON.stringify(constellationId)})`);
  await sleep(850);
  const recalled = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.constellationState())")) ?? "null");
  check(recalled.active === constellationId && recalled.geometry.find((row) => row.id === constellationId)?.opacity === 0.85 &&
    !recalled.rows[0].members.includes(removedId) && recalled.rows[0].members.includes(addedId),
  "呼び出しで明るくなり、excluded は除外・pinned は維持される");
  // カメラが寄り終わり、タイトルの判断（カメラ停止の約 150ms 後）が済むのを待つ
  for (let i = 0; i < 20; i++) {
    const ready = await evalIn(`(() => { const ids = new Set(globalThis.__bukusupe.constellationState().rows[0].members);
      return [...document.querySelectorAll('.label-star')].some((el) => ids.has(el.dataset.key) && el.style.opacity === '1'); })()`);
    if (ready) break;
    await sleep(100);
  }
  await sleep(250);
  // 星座のすべての星が、画面の部品（検索欄・星座一覧と操作・左上のパネル）に隠れず、画面の中にある
  const fit = JSON.parse((await evalIn(`JSON.stringify((() => {
    const ids = globalThis.__bukusupe.constellationState().rows[0].members;
    const parts = ['search-box', 'constellation-list', 'constellation-manage', 'hud', 'hud-toggle']
      .map((id) => document.getElementById(id))
      .filter((el) => el && !el.hidden && getComputedStyle(el).display !== 'none')
      .map((el) => el.getBoundingClientRect()).filter((r) => r.width > 0 && r.height > 0);
    const bad = [];
    for (const id of ids) {
      const p = globalThis.__bukusupe.starScreen(id);
      if (!p) { bad.push(id); continue; }
      const inside = p.x >= 0 && p.y >= 0 && p.x <= innerWidth && p.y <= innerHeight;
      const covered = parts.some((r) => p.x >= r.left - 4 && p.x <= r.right + 4 && p.y >= r.top - 4 && p.y <= r.bottom + 4);
      if (!inside || covered) bad.push(id);
    }
    return { stars: ids.length, bad: bad.length };
  })())`)) ?? "null");
  check(fit && fit.stars > 0 && fit.bad === 0, "星座を選ぶと、すべての星が画面の部品を除いた領域に収まる",
    fit ? `${fit.stars} 星中 ${fit.bad} 星がはみ出し・隠れ` : "測れない");
  // 星座の星は大きく明るく、タイトルが優先され、他のタイトルは暗い
  const emphasis = JSON.parse((await evalIn(`JSON.stringify((() => {
    const ids = new Set(globalThis.__bukusupe.constellationState().rows[0].members);
    const labels = [...document.querySelectorAll('.label')].filter((el) => el.style.display !== 'none');
    const member = labels.filter((el) => ids.has(el.dataset.key));
    const others = labels.filter((el) => !ids.has(el.dataset.key) && el.style.opacity !== '0');
    return { members: ids.size, memberLabels: member.length,
      memberBright: member.every((el) => el.style.opacity === '1'),
      othersDim: others.every((el) => el.style.opacity === '0.3') };
  })())`)) ?? "null");
  check(emphasis && emphasis.memberLabels >= Math.min(3, emphasis.members) && emphasis.memberBright && emphasis.othersDim,
    "選んだ星座の星のタイトルが優先され、それ以外は暗くなる",
    emphasis ? `星座 ${emphasis.members} 星・タイトル ${emphasis.memberLabels} 件` : "測れない");
  {
    const shot = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    writeFileSync("docs/screens/constellation-selected.png", Buffer.from(shot.data, "base64"));
    console.log("  画面: docs/screens/constellation-selected.png");
  }

  // --- 星座を選んだまま検索すると、検索が前面に出る。検索を消すと星座の表示に戻る ---
  const selectedCamera = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.cameraState())")) ?? "null");
  const constellationView = (id) => `JSON.stringify((() => {
    const b = globalThis.__bukusupe;
    const s = b.constellationState();
    const row = s.rows.find((r) => r.id === ${JSON.stringify(constellationId)});
    const hits = new Set(b.searchState().ids);
    const members = row.members.filter((m) => !hits.has(m));
    const labels = [...document.querySelectorAll('.label-star')]
      .filter((el) => members.includes(el.dataset.key) && el.style.opacity !== '0');
    return {
      active: s.active,
      opacity: s.geometry.find((g) => g.id === row.id)?.opacity,
      memberAlpha: Math.max(0, ...members.map((m) => b.starVisual(m)?.alpha ?? 0)),
      memberLabels: labels.length,
      brightLabels: labels.filter((el) => el.style.opacity === '1').length,
      orbit: b.searchGeometry().stars.length,
      tilt: b.cameraTilt(),
      nameShown: document.getElementById('constellation-name').classList.contains('is-visible'),
      camera: b.cameraState(),
    };
  })())`;
  await evalIn("(async () => { await globalThis.__bukusupe.searchNow('パスタ'); })()");
  await sleep(2200);
  const duringSearch = JSON.parse((await evalIn(constellationView())) ?? "null");
  check(duringSearch && duringSearch.orbit > 0 && duringSearch.opacity <= 0.15 && duringSearch.memberAlpha < 0.5 &&
    duringSearch.memberLabels === 0 && !duringSearch.nameShown && duringSearch.tilt < 1,
  "星座を選んだまま検索すると、星座の強調が解かれて検索の軌道が前面に出る",
  duringSearch ? `軌道 ${duringSearch.orbit} 件・線 ${duringSearch.opacity}・星座の星の明るさ ${duringSearch.memberAlpha.toFixed(2)}・星座のタイトル ${duringSearch.memberLabels} 件・名前 ${duringSearch.nameShown ? "表示" : "非表示"}` : "測れない");
  {
    const shot = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    writeFileSync("docs/screens/constellation-search.png", Buffer.from(shot.data, "base64"));
    console.log("  画面: docs/screens/constellation-search.png");
  }
  await evalIn("(() => { const i = document.getElementById('search-input'); i.value = ''; i.dispatchEvent(new Event('input')); i.blur(); })()");
  await sleep(1600);
  for (let i = 0; i < 20; i++) {
    const back = JSON.parse((await evalIn(constellationView())) ?? "null");
    if (back?.brightLabels > 0) break;
    await sleep(150);
  }
  const afterSearch = JSON.parse((await evalIn(constellationView())) ?? "null");
  const cameraBack = afterSearch && selectedCamera &&
    Math.hypot(afterSearch.camera.x - selectedCamera.x, afterSearch.camera.y - selectedCamera.y) < 0.5 &&
    Math.abs(afterSearch.camera.distance - selectedCamera.distance) / selectedCamera.distance < 0.02;
  check(afterSearch && afterSearch.active === constellationId && afterSearch.opacity === 0.85 &&
    afterSearch.memberAlpha > 0.6 && afterSearch.brightLabels > 0 && afterSearch.nameShown && cameraBack,
  "検索を消すと、元の星座を選んだ状態（強調・カメラ位置）に戻る",
  afterSearch ? `線 ${afterSearch.opacity}・星座の星の明るさ ${afterSearch.memberAlpha.toFixed(2)}・タイトル ${afterSearch.brightLabels} 件・カメラ ${cameraBack ? "元の位置" : "ずれた"}` : "測れない");
  await evalIn(`globalThis.__bukusupe.recallConstellation(${JSON.stringify(constellationId)})`);
  check((await evalIn("globalThis.__bukusupe.constellationState().active")) === null,
    "もう一度選ぶと星座の強調を解除する");
  // メンバーは保存した時点で固定（SPEC 9 章）。検索語に合うブックマークが増えても、呼び出しで検索し直さない
  const beforeAdd = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.constellationState().rows[0].members)")) ?? "[]");
  const addedLayout = JSON.parse((await evalIn("(async () => JSON.stringify(await globalThis.__bukusupe.simulateAdd('宇宙を感じたい', 'https://example.org/space-new', ['宇宙'])))()")) ?? "null");
  const newId = addedLayout?.stars.find((star) => star.id.startsWith("sim-"))?.id;
  const newRank = JSON.parse((await evalIn("(async () => JSON.stringify((await globalThis.__bukusupe.searchNow('宇宙を感じたい')).map((h) => h.id)))()")) ?? "[]").indexOf(newId);
  await evalIn("(() => { const i = document.getElementById('search-input'); i.value = ''; i.dispatchEvent(new Event('input')); i.blur(); })()");
  await sleep(300);
  await evalIn(`globalThis.__bukusupe.recallConstellation(${JSON.stringify(constellationId)})`);
  const withNew = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.constellationState().rows[0].members)")) ?? "[]");
  check(!!newId && newRank >= 0 && newRank < 12 && !withNew.includes(newId) && JSON.stringify(withNew) === JSON.stringify(beforeAdd),
    "検索に合うブックマークを追加して呼び出しても、メンバーは保存した時点のまま",
    `足した星の検索順位 ${newRank + 1}・メンバー ${beforeAdd.length} → ${withNew.length} 星（${withNew.includes(newId) ? "足した星が入った" : "足した星は入らない"}）`);
  await evalIn("globalThis.__bukusupe.restore()");
  // 画面下には名前だけ。「名前を変える」「削除」は、選んでいる星座の横の「…」から開く
  const menu = JSON.parse((await evalIn(`JSON.stringify((() => {
    const visible = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const rename = document.getElementById('constellation-rename');
    const remove = document.getElementById('constellation-delete');
    const closed = !visible(rename) && !visible(remove);
    const more = document.getElementById('constellation-more');
    const beside = !!more && visible(more) && more.previousElementSibling?.classList.contains('is-active');
    more?.click();
    return { closed, beside, opened: visible(rename) && visible(remove) };
  })())`)) ?? "null");
  check(menu && menu.closed && menu.beside && menu.opened,
    "画面下の一覧に「名前を変える」「削除」が常時は出ず、選んでいる星座の横の「…」から開ける",
    menu ? `常時表示 ${menu.closed ? "なし" : "あり"}・「…」 ${menu.beside ? "あり" : "なし"}・開くと ${menu.opened ? "出る" : "出ない"}` : "測れない");
  await evalIn("window.prompt=()=> '宇宙の記録'; document.getElementById('constellation-rename').click()");
  await sleep(200);
  check((await evalIn("globalThis.__bukusupe.constellationState().rows[0].name")) === "宇宙の記録",
    "星座の名前を変更できる");
  await evalIn("document.getElementById('constellation-delete').click()");
  await sleep(200);
  check((await evalIn("globalThis.__bukusupe.constellationState().rows.length")) === 0,
    "星座だけを削除できる");

  // --- Chrome のデータ源（H2）---
  // ブックマークは確認スクリプトが使い捨てのプロファイルに作る。拡張機能は読むだけ。
  // ページが読み込み直されている最中は evaluate が失敗するので、失敗は「まだ」と扱う。
  const tryEval = async (expression) => { try { return await evalIn(expression); } catch { return undefined; } };
  const waitUntil = async (expression, limitMs) => {
    const end = Date.now() + limitMs;
    while (Date.now() < end) {
      if (await tryEval(expression)) return true;
      await sleep(300);
    }
    return false;
  };
  const meanGap = `(() => {
    const s = globalThis.__bukusupe.state;
    const vectors = [...s.vectors.values()];
    if (!vectors.length || !s.mean) return null;
    const mean = new Float64Array(vectors[0].length);
    for (const v of vectors) for (let d = 0; d < mean.length; d++) mean[d] += v[d] / vectors.length;
    let gap = 0;
    for (let d = 0; d < mean.length; d++) gap = Math.max(gap, Math.abs(mean[d] - s.mean[d]));
    return gap;
  })()`;
  const saveConstellationNamed = async (query, name, pinTitles = []) => {
    await evalIn(`(async () => { await globalThis.__bukusupe.searchNow(${JSON.stringify(query)}); })()`);
    await sleep(600);
    await evalIn("document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',shiftKey:true,bubbles:true}))");
    // 線の照合が意味を持つよう、編集中に星を加えて星座を大きくする（加えた星は pinned に入る）
    await evalIn(`(() => {
      const want = new Set(${JSON.stringify(pinTitles)});
      const members = new Set(globalThis.__bukusupe.constellationState().editing?.members ?? []);
      for (const item of globalThis.__bukusupe.state.items) {
        if (want.has(item.title) && !members.has(item.id)) globalThis.__bukusupe.toggleEditMember(item.id);
      }
    })()`);
    await evalIn(`document.getElementById('constellation-name-input').value = ${JSON.stringify(name)}`);
    await evalIn("document.getElementById('constellation-save').click()");
    await waitUntil(`globalThis.__bukusupe.constellationState().rows.some((row) => row.name === ${JSON.stringify(name)})`, 5000);
    // 保存の演出（戻る 0.95 秒＋線＋名前＋1.2 秒）が終わるまで待つ
    await waitUntil("globalThis.__bukusupe.constellationState().animation.phase === 'done'", 8000);
    await sleep(1600);
    return JSON.parse((await evalIn(`JSON.stringify(globalThis.__bukusupe.constellationState().rows
      .find((row) => row.name === ${JSON.stringify(name)}) ?? null)`)) ?? "null");
  };

  // 1. サンプルのまま星座を保存し、その時点の平均ベクトルを控える
  const sampleRow = await saveConstellationNamed("宇宙を感じたい", "サンプルの星座");
  const sampleMean = JSON.parse((await evalIn("JSON.stringify(Array.from(globalThis.__bukusupe.state.mean))")) ?? "[]");
  console.log(`  サンプルの星座：メンバー ${sampleRow?.members.length ?? 0} 件`);

  // 2. 実ブックマークを 20 件作る → データ源が Chrome に変わる
  await evalIn("window.__beforeSwitch = true");
  const SPACE = ["ロケット打ち上げの記録", "今夜見える星座の探し方", "天体写真の撮り方入門", "国際宇宙ステーションを見る",
    "プラネタリウムの上映案内", "月面探査の最新ニュース", "望遠鏡の選び方", "流れ星の観測ガイド",
    "銀河と星雲の写真集", "火星探査機の記録"];
  const FOOD = ["親子丼の作り方", "カレーのスパイス配合", "パスタのゆで方", "お味噌汁の基本",
    "パン作りの発酵", "唐揚げを柔らかくするコツ", "作りおきおかず", "だしの取り方", "ケーキの焼き方", "餃子の包み方"];
  await evalIn(`(async () => {
    const titles = ${JSON.stringify([...SPACE, ...FOOD])};
    for (let i = 0; i < titles.length; i++) {
      await chrome.bookmarks.create({ parentId: "1", title: titles[i],
        url: "https://example.com/" + (i < 10 ? "space/" : "food/") + i });
    }
  })()`);
  const switched = await waitUntil(
    "globalThis.__bukusupe?.state.kind === 'chrome' && document.body.dataset.phase === 'ready' && globalThis.__bukusupe.state.vectors.size === 20",
    120000);
  const reloaded = switched && (await tryEval("window.__beforeSwitch === true")) !== true;
  check(switched && reloaded, "実ブックマークへ切り替わると、差し替えずにページを読み込み直す",
    switched ? (reloaded ? "読み込み直した" : "同じページのまま差し替えた") : "切り替わらない");
  const chromeGap = await tryEval(meanGap);
  check(chromeGap != null && chromeGap < 1e-5, "平均ベクトルが実ブックマークから作り直される",
    chromeGap == null ? "測れない" : `実ブックマークの平均との差 最大 ${chromeGap.toFixed(4)}`);
  const hintAt20 = await tryEval("!!document.getElementById('sample-hint') && !document.getElementById('sample-hint').hidden");
  const chromeRows = await tryEval("globalThis.__bukusupe.constellationState().rows.length");
  check(chromeRows === 0, "サンプルの星座が実ブックマークの画面に混ざらない", `${chromeRows} 件`);

  // 3. 実ブックマークで星座を作り、本物の削除通知で線が結び直されるか
  const chromeRow = await saveConstellationNamed("宇宙の写真や星空", "実ブックマークの星座", SPACE);
  const removedMember = chromeRow?.members[0];
  if (removedMember) await evalIn(`(async () => { await chrome.bookmarks.remove(${JSON.stringify(removedMember)}); })()`);
  const relinked = await waitUntil(`(() => {
    const row = globalThis.__bukusupe.constellationState().rows.find((r) => r.name === "実ブックマークの星座");
    return row && !row.members.includes(${JSON.stringify(removedMember)}) &&
      !globalThis.__bukusupe.state.items.some((item) => item.id === ${JSON.stringify(removedMember)});
  })()`, 15000);
  await sleep(300);
  const chromeState = JSON.parse((await tryEval(`JSON.stringify({
    c: globalThis.__bukusupe.constellationState(), layout: globalThis.__bukusupe.layout() })`)) ?? "null");
  const chromeLines = chromeState?.c.geometry.find((row) => row.id === chromeRow?.id);
  const chromeById = new Map((chromeState?.layout?.stars ?? []).map((star) => [star.id, star]));
  const remaining = (chromeRow?.members ?? []).filter((id) => id !== removedMember);
  const expectedLines = kruskal(remaining.map((id) => chromeById.get(id)).filter(Boolean));
  check(relinked && (chromeRow?.members.length ?? 0) >= 6 && chromeLines &&
    !chromeLines.members.includes(removedMember) && chromeLines.members.length === remaining.length &&
    sameEdges(chromeLines.edges, expectedLines),
  "本物の削除通知で、星座のメンバーと線が結び直される",
  `${chromeRow?.members.length ?? 0} → ${chromeLines?.members.length ?? 0} 星 / ${chromeLines?.edges.length ?? 0} 辺`);

  // 3b. ブックマークが 20 件未満なら、初回に「サンプルで試す」を勧める案内が控えめに出る（2 回目以降は出ない）
  const hintVisible = "(() => { const el = document.getElementById('sample-hint'); return !!el && !el.hidden && getComputedStyle(el).display !== 'none'; })()";
  await send("Page.reload", {}, sessionId);
  await waitUntil("globalThis.__bukusupe?.state.kind === 'chrome' && document.body.dataset.phase === 'ready'", 60000);
  await sleep(500);
  const hintFirst = await tryEval(hintVisible);
  const hintCount = await tryEval("globalThis.__bukusupe.state.items.length");
  await send("Page.reload", {}, sessionId);
  await waitUntil("globalThis.__bukusupe?.state.kind === 'chrome' && document.body.dataset.phase === 'ready'", 60000);
  await sleep(500);
  const hintSecond = await tryEval(hintVisible);
  check(hintAt20 === false && hintFirst === true && hintCount < 20 && hintSecond === false,
    "ブックマークが 20 件未満なら、初回だけサンプルを勧める案内が出る（20 件では出ない）",
    `20 件 ${hintAt20 ? "出る" : "出ない"}・${hintCount} 件の初回 ${hintFirst ? "出る" : "出ない"}・2 回目 ${hintSecond ? "出る" : "出ない"}`);

  // 4. 続けてブックマークが変わっても、更新が重ならず、配置に重複・欠落がない（M3）
  await evalIn(`(async () => {
    for (let i = 0; i < 3; i++) await chrome.bookmarks.create({ parentId: "1", title: "星空の撮影地 " + i, url: "https://example.com/burst-a/" + i });
    await new Promise((resolve) => setTimeout(resolve, 700));
    for (let i = 0; i < 3; i++) await chrome.bookmarks.create({ parentId: "1", title: "おにぎりの具 " + i, url: "https://example.com/burst-b/" + i });
  })()`);
  const consistent = await waitUntil(`(() => {
    const b = globalThis.__bukusupe;
    const items = b.state.items.map((item) => item.id).sort();
    const stars = (b.layout()?.stars ?? []).map((star) => star.id).sort();
    return document.body.dataset.phase === 'ready' && items.length === 25 &&
      new Set(stars).size === stars.length && JSON.stringify(items) === JSON.stringify(stars);
  })()`, 30000);
  check(consistent, "続けてブックマークが変わっても、配置に重複・欠落がない",
    `${await tryEval("globalThis.__bukusupe.state.items.length")} 件 / 星 ${await tryEval("globalThis.__bukusupe.layout()?.stars.length")} 個`);

  // 4b. ⓘ のパネルの切り替えで、サンプルの宇宙へ（読み込み直す）。もう一度押すと自分のブックマークに戻る
  const toggleLabel = "document.getElementById('source-toggle')?.textContent?.trim() ?? null";
  const labelOnChrome = await tryEval(toggleLabel);
  await evalIn("window.__beforeToggle = true");
  await tryEval("document.getElementById('source-toggle')?.click()");
  const toSample = await waitUntil("globalThis.__bukusupe?.state.kind === 'sample' && document.body.dataset.phase === 'ready' && window.__beforeToggle !== true", 60000);
  const sampleRows = await tryEval(`globalThis.__bukusupe.constellationState().rows.some((row) => row.id === ${JSON.stringify(sampleRow?.id)})`);
  const labelOnSample = await tryEval(toggleLabel);
  await tryEval("document.getElementById('source-toggle')?.click()");
  const toChrome = await waitUntil("globalThis.__bukusupe?.state.kind === 'chrome' && document.body.dataset.phase === 'ready' && globalThis.__bukusupe.state.items.length === 25", 60000);
  check(toSample && sampleRows === true && toChrome && labelOnChrome === "サンプルの宇宙で試す" && labelOnSample === "自分のブックマークに戻る",
    "ⓘ の切り替えで、読み込み直してサンプルの宇宙へ移り（サンプルの星座が残っている）、また自分のブックマークに戻る",
    `「${labelOnChrome}」→ サンプル ${toSample ? "OK" : "NG"}（星座 ${sampleRows ? "あり" : "なし"}）・「${labelOnSample}」→ 自分のブックマーク ${toChrome ? "OK" : "NG"}`);

  // 5. サンプルに戻すと、サンプルの星座と平均ベクトルがそのまま残っている
  await send("Page.navigate", { url: `chrome-extension://${extId}/index.html?sample=1&debug=1` }, sessionId);
  await waitUntil("globalThis.__bukusupe?.state.kind === 'sample' && document.body.dataset.phase === 'ready'", 60000);
  const backRow = JSON.parse((await tryEval(`JSON.stringify(globalThis.__bukusupe.constellationState().rows
    .find((row) => row.id === ${JSON.stringify(sampleRow?.id)}) ?? null)`)) ?? "null");
  check(backRow && (sampleRow?.members.length ?? 0) > 0 &&
    JSON.stringify(backRow.members) === JSON.stringify(sampleRow.members),
  "サンプルに戻すと、サンプルの星座のメンバーがそのまま残る",
  `${sampleRow?.members.length ?? 0} → ${backRow?.members.length ?? "なし"} 件`);
  const backMean = JSON.parse((await tryEval("JSON.stringify(Array.from(globalThis.__bukusupe.state.mean ?? []))")) ?? "[]");
  const backGap = backMean.length === sampleMean.length && sampleMean.length > 0
    ? Math.max(...sampleMean.map((v, i) => Math.abs(v - backMean[i]))) : Infinity;
  check(backGap < 1e-6, "サンプルの平均ベクトルが実ブックマークのもので上書きされない",
    Number.isFinite(backGap) ? `差 最大 ${backGap.toExponential(1)}` : "測れない");

  // ?debug=1 を付けずに開くと、確認用の窓口 __bukusupe は無い（M6）
  await send("Page.navigate", { url: `chrome-extension://${extId}/index.html` }, sessionId);
  const plainReady = await waitUntil("document.body.dataset.phase === 'ready'", 60000);
  const exposed = await tryEval("typeof globalThis.__bukusupe");
  check(plainReady && exposed === "undefined", "?debug=1 を付けずに開くと、確認用の窓口 __bukusupe が無い",
    `準備 ${plainReady ? "完了" : "未完"}・__bukusupe ${exposed}`);

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
  await Promise.race([send("Browser.close").catch(() => {}), sleep(5000)]);
  child.kill("SIGKILL");
  await sleep(500);
  try { rmSync(profile, { recursive: true, force: true, maxRetries: 3 }); } catch { /* 無視 */ }
}

console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
