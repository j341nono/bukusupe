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
  await send("Performance.enable", {}, sessionId);
  const layoutCount = async () => (await send("Performance.getMetrics", {}, sessionId))
    .metrics.find((metric) => metric.name === "LayoutCount")?.value ?? NaN;
  const sampleLabels = `JSON.stringify((() => {
    const cx = innerWidth / 2, cy = innerHeight / 2;
    const out = {};
    for (const el of document.querySelectorAll('.label-star')) {
      if (el.style.opacity !== '1') continue;
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
  await evalIn("globalThis.__bukusupe.setZoomTier('far')");
  await sleep(900);
  const focusBefore = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.cameraState())")) ?? "null");
  const focusLabel = JSON.parse((await evalIn(`(() => {
    const label = [...document.querySelectorAll('.label-cluster-focus')]
      .find((el) => el.textContent === 'AI');
    if (!label) return JSON.stringify({ index: -1, hit: false });
    const rect = label.getBoundingClientRect();
    const x = rect.left + rect.width / 2, y = rect.top + rect.height / 2;
    return JSON.stringify({ index: Number(label.dataset.cluster), x, y,
      hit: document.elementFromPoint(x, y) === label });
  })()`)) ?? "null");
  if (focusLabel?.hit) {
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: focusLabel.x, y: focusLabel.y }, sessionId);
    await send("Input.dispatchMouseEvent", { type: "mousePressed", x: focusLabel.x, y: focusLabel.y,
      button: "left", buttons: 1, clickCount: 1 }, sessionId);
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: focusLabel.x, y: focusLabel.y,
      button: "left", buttons: 0, clickCount: 1 }, sessionId);
  }
  await sleep(950);
  const focusAfter = JSON.parse((await evalIn(`JSON.stringify({
    camera: globalThis.__bukusupe.cameraState(),
    starLabels: [...document.querySelectorAll('.label-star')]
      .filter((el) => Number(getComputedStyle(el).opacity) > 0.9).length
  })`)) ?? "null");
  const focusedCluster = layout.clusters.find((cluster) => cluster.index === focusLabel?.index);
  check(focusLabel?.hit && focusedCluster && focusBefore.tier === "far" && focusAfter.camera.tier !== "far" &&
    focusAfter.camera.distance < focusBefore.distance &&
    Math.hypot(focusAfter.camera.x - focusedCluster.x, focusAfter.camera.y - focusedCluster.y) < 0.1 &&
    focusAfter.starLabels > 0,
  "遠距離の星団名をクリックすると中心へ拡大し、星のタイトルが出る",
  focusedCluster ? `${focusedCluster.name}: ${focusBefore.distance.toFixed(1)}→${focusAfter.camera.distance.toFixed(1)} / ${focusAfter.camera.tier}` : "星団名がない");
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
  await dragLabels("検索中");
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
  check(tiltAfter > tiltBefore + 10 && tiltAfter <= 65.1,
    "右ドラッグで地図の傾きだけが変わる", `${tiltBefore.toFixed(1)}°→${tiltAfter.toFixed(1)}°`);
  await evalIn("globalThis.__bukusupe.setTopDown(true)");
  await sleep(900);
  const topDownTilt = await evalIn("globalThis.__bukusupe.cameraTilt()");
  await evalIn("globalThis.__bukusupe.setTopDown(false)");
  await sleep(900);
  const restoredTilt = await evalIn("globalThis.__bukusupe.cameraTilt()");
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
  await evalIn("document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown', {key:'Enter',ctrlKey:true,bubbles:true}))");
  const editStart = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.constellationState().editing)")) ?? "null");
  check(editStart?.members.length === Math.min(12, initialConstellationSearch.ids.length),
    "Ctrl+Enter で上位最大12件を編集状態へ入れる", `${editStart?.members.length ?? 0} 件`);
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
  const animationFramesBefore = await evalIn("globalThis.__bukusupe.frames()");
  await sleep(1000);
  const animationFramesAfter = await evalIn("globalThis.__bukusupe.frames()");
  check(animationFramesAfter - animationFramesBefore >= 55, "保存演出中も60コマを保つ",
    `${animationFramesAfter - animationFramesBefore} コマ/秒`);
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
    savedLines?.members.length === savedRow.lastMembers.length,
  "保存後は通常の夜空で星座の線が15%になる");
  {
    const shot = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    writeFileSync("docs/screens/constellation-saved.png", Buffer.from(shot.data, "base64"));
    console.log("  画面: docs/screens/constellation-saved.png");
  }
  const ids = savedRow.lastMembers;
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
    JSON.stringify(persistedRow?.lastMembers) === JSON.stringify(savedRow.lastMembers) &&
    JSON.stringify(persistedLines?.edges) === JSON.stringify(savedLines.edges),
  "再読み込み後も名前・メンバー・線が残る");
  await evalIn(`globalThis.__bukusupe.recallConstellation(${JSON.stringify(constellationId)})`);
  await sleep(850);
  const recalled = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.constellationState())")) ?? "null");
  const cameraOnConstellation = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.cameraState())")) ?? "null");
  const recalledPoints = recalled.rows[0].lastMembers.map((id) => byId.get(id)).filter(Boolean);
  const centerX = (Math.min(...recalledPoints.map((p) => p.x)) + Math.max(...recalledPoints.map((p) => p.x))) / 2;
  const centerY = (Math.min(...recalledPoints.map((p) => p.y)) + Math.max(...recalledPoints.map((p) => p.y))) / 2;
  check(recalled.active === constellationId && recalled.geometry.find((row) => row.id === constellationId)?.opacity === 0.85 &&
    !recalled.rows[0].lastMembers.includes(removedId) && recalled.rows[0].lastMembers.includes(addedId) &&
    Math.hypot(cameraOnConstellation.x - centerX, cameraOnConstellation.y - centerY) < 1,
  "呼び出しで明るくなり、excluded は除外・pinned は維持される");
  await evalIn(`globalThis.__bukusupe.recallConstellation(${JSON.stringify(constellationId)})`);
  check((await evalIn("globalThis.__bukusupe.constellationState().active")) === null,
    "もう一度選ぶと星座の強調を解除する");
  const addedLayout = JSON.parse((await evalIn("(async () => JSON.stringify(await globalThis.__bukusupe.simulateAdd('宇宙を感じたい', 'https://example.org/space-new', ['宇宙'])))()")) ?? "null");
  const newId = addedLayout?.stars.find((star) => star.id.startsWith("sim-"))?.id;
  await evalIn(`globalThis.__bukusupe.recallConstellation(${JSON.stringify(constellationId)})`);
  const withNew = JSON.parse((await evalIn("JSON.stringify(globalThis.__bukusupe.constellationState().rows[0].lastMembers)")) ?? "[]");
  check(!!newId && withNew.includes(newId), "検索に合うブックマークを追加して呼び出すとメンバーに入る",
    `${newId} / ${withNew.includes(newId) ? "含まれる" : "含まれない"}`);
  await evalIn("globalThis.__bukusupe.restore()");
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
    await evalIn("document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',ctrlKey:true,bubbles:true}))");
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
  console.log(`  サンプルの星座：メンバー ${sampleRow?.lastMembers.length ?? 0} 件`);

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
  const chromeRows = await tryEval("globalThis.__bukusupe.constellationState().rows.length");
  check(chromeRows === 0, "サンプルの星座が実ブックマークの画面に混ざらない", `${chromeRows} 件`);

  // 3. 実ブックマークで星座を作り、本物の削除通知で線が結び直されるか
  const chromeRow = await saveConstellationNamed("宇宙の写真や星空", "実ブックマークの星座", SPACE);
  const removedMember = chromeRow?.lastMembers[0];
  if (removedMember) await evalIn(`(async () => { await chrome.bookmarks.remove(${JSON.stringify(removedMember)}); })()`);
  const relinked = await waitUntil(`(() => {
    const row = globalThis.__bukusupe.constellationState().rows.find((r) => r.name === "実ブックマークの星座");
    return row && !row.lastMembers.includes(${JSON.stringify(removedMember)}) &&
      !globalThis.__bukusupe.state.items.some((item) => item.id === ${JSON.stringify(removedMember)});
  })()`, 15000);
  await sleep(300);
  const chromeState = JSON.parse((await tryEval(`JSON.stringify({
    c: globalThis.__bukusupe.constellationState(), layout: globalThis.__bukusupe.layout() })`)) ?? "null");
  const chromeLines = chromeState?.c.geometry.find((row) => row.id === chromeRow?.id);
  const chromeById = new Map((chromeState?.layout?.stars ?? []).map((star) => [star.id, star]));
  const remaining = (chromeRow?.lastMembers ?? []).filter((id) => id !== removedMember);
  const expectedLines = kruskal(remaining.map((id) => chromeById.get(id)).filter(Boolean));
  check(relinked && (chromeRow?.lastMembers.length ?? 0) >= 6 && chromeLines &&
    !chromeLines.members.includes(removedMember) && chromeLines.members.length === remaining.length &&
    sameEdges(chromeLines.edges, expectedLines),
  "本物の削除通知で、星座のメンバーと線が結び直される",
  `${chromeRow?.lastMembers.length ?? 0} → ${chromeLines?.members.length ?? 0} 星 / ${chromeLines?.edges.length ?? 0} 辺`);

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

  // 5. サンプルに戻すと、サンプルの星座と平均ベクトルがそのまま残っている
  await send("Page.navigate", { url: `chrome-extension://${extId}/index.html?sample=1` }, sessionId);
  await waitUntil("globalThis.__bukusupe?.state.kind === 'sample' && document.body.dataset.phase === 'ready'", 60000);
  const backRow = JSON.parse((await tryEval(`JSON.stringify(globalThis.__bukusupe.constellationState().rows
    .find((row) => row.id === ${JSON.stringify(sampleRow?.id)}) ?? null)`)) ?? "null");
  check(backRow && (sampleRow?.lastMembers.length ?? 0) > 0 &&
    JSON.stringify(backRow.lastMembers) === JSON.stringify(sampleRow.lastMembers),
  "サンプルに戻すと、サンプルの星座のメンバーがそのまま残る",
  `${sampleRow?.lastMembers.length ?? 0} → ${backRow?.lastMembers.length ?? "なし"} 件`);
  const backMean = JSON.parse((await tryEval("JSON.stringify(Array.from(globalThis.__bukusupe.state.mean ?? []))")) ?? "[]");
  const backGap = backMean.length === sampleMean.length && sampleMean.length > 0
    ? Math.max(...sampleMean.map((v, i) => Math.abs(v - backMean[i]))) : Infinity;
  check(backGap < 1e-6, "サンプルの平均ベクトルが実ブックマークのもので上書きされない",
    Number.isFinite(backGap) ? `差 最大 ${backGap.toExponential(1)}` : "測れない");

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
