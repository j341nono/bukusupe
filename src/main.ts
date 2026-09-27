import { SAMPLE_TODAY, loadBookmarks, setPreferSample, type BookmarkItem, type BookmarkSourceKind } from "./bookmarks";
import { setToday } from "./today";
import { MODEL_ID, WorkerEmbedder, requestWasmMemory, type Embedder } from "./embed/embedder";
import { decodeSampleCache, encodeSampleCache, type SampleCacheFile } from "./data/sample-cache";
import { ensureEmbeddings } from "./embed/ensure";
import { passageText, queryText } from "./embed/text";
import { generalityScores, standardize } from "./layout/vector";
import {
  addStar,
  computeLayout,
  dropMissing,
  LAYOUT_VERSION,
  meanVector,
  type Layout,
} from "./layout";
import { provisionalLayout } from "./layout/provisional";
import { clusterNames } from "./layout/names";
import { membersFor, minimumSpanningTree, parseConstellation, pointsFor, type Constellation } from "./constellation";
import { ATTRACT_RATIO, CLUSTER_PRIOR, GENERALITY_PENALTY, rankSearch, semanticScores, type SearchHit } from "./search";
import { toLabelSource, toRenderStars } from "./render/present";
import { SpaceView, viewDebug } from "./render/scene";
import { startTiming, stopTiming } from "./debug/timing";
import type { EmbedDtype } from "./embed/protocol";
import { lastTouched, touchAppearance } from "./render/magnitude";
import { deleteConstellation, onDbBlocked, readConstellations, readMeta, useDataSource, writeConstellation, writeMeta } from "./store/db";
import { renderHud, renderHudMessage, setSourceSwitch, settleHud, setupHudControls } from "./ui/hud";
import { openPage } from "./ui/open-page";
import { RETURN_STATE_KEY, RETURN_STATE_VERSION, parseReturnState, storeReturnState, takeReturnState } from "./ui/return-state";
import type { ZoomTier } from "./ui/labels";

const META_MEAN = "mean-vector";
const META_LAYOUT = "layout";
const META_GENERALITY = "generality";

/** 平均ベクトルは、どのデータ源から作ったかと一緒に保存する。違えば取り直す。 */
type StoredMean = { source: BookmarkSourceKind; vector: Float32Array };

type AppState = {
  kind: BookmarkSourceKind;
  items: BookmarkItem[];
  vectors: Map<string, Float32Array>;
  mean: Float32Array | null;
  /** 誰とでも似ている度合い。M3 の検索の補正にも使う */
  generality: Map<string, number>;
  layout: Layout | null;
};

const state: AppState = {
  kind: "sample", items: [], vectors: new Map(), mean: null, generality: new Map(), layout: null,
};
/**
 * 測定（docs/BENCHMARK.md）の印。`?debug=1` のときだけ、起動の節目の時刻（performance.now）を控える。
 * `?debug=1&dtype=fp16|fp32` は量子化の比較のためだけの切り替え（通常は q8）。
 */
const PARAMS = new URLSearchParams(location.search);
// 確認用のビルドだけ（配布用のビルドでは __DEBUG__ が false なので、DEBUG の下のコードは取り除かれる）
const DEBUG = __DEBUG__ && PARAMS.get("debug") === "1";
const DTYPE = DEBUG && ["q8", "fp16", "fp32"].includes(PARAMS.get("dtype") ?? "") ? PARAMS.get("dtype") as EmbedDtype : undefined;
const benchMarks: Record<string, number> = {};
const mark = (name: string): void => {
  if (DEBUG && benchMarks[name] === undefined) benchMarks[name] = performance.now();
};
const createEmbedder = (): WorkerEmbedder => {
  const created = DEBUG ? new WorkerEmbedder({ debug: true, dtype: DTYPE }) : new WorkerEmbedder();
  if (DEBUG) {
    mark("embedderStart");
    created.ready().then(() => mark("modelReady")).catch(() => {});
  }
  return created;
};

/** Web のデモ（`npm run build:web`）。サンプルだけで動き、計算済みの配置で開いた瞬間に星空を出す（M6） */
// ビルド時の定数（"web" と "web-debug" で true）。拡張機能のビルドでは、Web のデモだけのコードが丸ごと消える
const WEB = __WEB__;
let embedder: Embedder | null = null;
/** 意味の検索に使えるか。Web のデモでは、裏で読み込んでいるモデルが揃うまで文字一致の検索だけにする */
let modelReady = !WEB;
let view: SpaceView | null = null;
let hits: SearchHit[] = [];
let selectedIndex = 0;
let searchTimer: number | undefined;
let searchGeneration = 0;
let cardId: string | null = null;
let constellations: Constellation[] = [];
let activeConstellationId: string | null = null;
let editing: { query: string; automatic: string[]; pinned: Set<string>; excluded: Set<string> } | null = null;
let savingAnimation = false;
let openModifierHeld = false;

function saveReturnState(): void {
  if (!view) return;
  const flight = view.flightState();
  storeReturnState({ source: state.kind, flying: flight.active,
    ship: flight.active ? flight.ship : null, camera: view.navigationCamera(),
    query: (document.getElementById("search-input") as HTMLInputElement | null)?.value ?? "",
    constellationId: activeConstellationId });
}

/**
 * 「戻る」で開いたときだけ、保存した状態から再開する。保存状態は確かめてから使い（`parseReturnState`）、
 * 合わなければ丸ごと捨ててふつうに開く。
 */
async function restoreReturnState(): Promise<void> {
  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  const raw = takeReturnState();
  if (navigation?.type !== "back_forward" || !raw || !view) return;
  const saved = parseReturnState(raw, state.kind);
  if (!saved) {
    console.warn("[ブクスペ] 「戻る」用の保存状態が壊れていたので、ふつうに開いた");
    return;
  }
  if (saved.constellationId && constellations.some((row) => row.id === saved.constellationId)) {
    await toggleConstellation(saved.constellationId);
  }
  view.restoreNavigationCamera(saved.camera);
  if (saved.query) {
    const input = document.getElementById("search-input") as HTMLInputElement;
    input.value = saved.query;
    applySearch(await searchResults(saved.query));
  }
  if (saved.flying && saved.ship) view.resumeFlight(saved.ship);
}

async function main(): Promise<void> {
  const canvas = document.getElementById("space") as HTMLCanvasElement | null;
  const labels = document.getElementById("labels");
  if (!canvas || !labels) throw new Error("画面の土台が見つからない");

  setupHudControls();
  view = new SpaceView(canvas, labels);
  // 星の色と明るさは「最後に触れた日」から（段階 2 の一部。ラベルの目立ち方は段階 2 の残り）
  view.setStarAppearance(touchAppearance);
  view.onStarLabelClick = handleStarClick;
  setupFlight();
  view.start();

  renderHudMessage("ブックマークを読み込んでいる…");
  const snapshot = await loadBookmarks();
  mark("bookmarks");
  state.kind = snapshot.kind;
  state.items = snapshot.items;
  // 星の新しさを測る「今日」：サンプル（Web のデモを含む）は基準日に固定、自分のブックマークは実際の今日（ページを開いた時点）
  setToday(state.kind === "sample" ? SAMPLE_TODAY : Date.now());
  // サンプル⇄自分のブックマーク（ⓘ のパネル）。自分のブックマークが 1 件も無ければ、戻る先が無いので出さない
  setSourceSwitch(state.kind === "chrome" ? "sample" : snapshot.chromeCount > 0 ? "chrome" : null, switchSource);
  // DB はデータ源ごとに分ける。以後、このページでデータ源は変えない（変わったら読み込み直す）
  useDataSource(state.kind, snapshot.bench);
  onDbBlocked(() => renderHudMessage("ほかのブクスペのタブを閉じると続きを始める"));

  if (WEB && (await startFromSampleCache())) {
    document.getElementById("loading")?.remove();
    loadModelInBackground();
  } else {
    // 埋め込みが揃うまでは仮の配置で「星が生まれる」ところを見せる
    show(provisionalLayout(state.items), false);
    renderHud({ count: state.items.length, kind: state.kind, status: "星を読み解いている…", phase: "embed" });
    document.getElementById("loading")?.remove();

    embedder = createEmbedder();
    await computeEmbeddings();
    await placeStars();
  }
  mark("ready");
  constellations = await loadConstellations();
  await reconcileConstellations();
  refreshConstellations();
  setupSearch(canvas);
  mark("searchReady");
  setupConstellations();
  await restoreReturnState();
  offerSample();

  watchBookmarks();
  document.getElementById("relayout")?.addEventListener("click", () => void enqueue(relayout));
}

/**
 * Web のデモ：同梱した計算済みの埋め込みと配置で、すぐに星空を出す。
 * 今のサンプル・配置の版・モデルと合わなければ使わず、通常の計算に戻る（`npm run sample:precompute` で作り直す）。
 */
async function startFromSampleCache(): Promise<boolean> {
  const file = (await import("./data/sample-precomputed.json")).default as unknown as SampleCacheFile;
  const cache = decodeSampleCache(file, state.items, MODEL_ID);
  if (!cache) {
    console.warn("[ブクスペ] 同梱した計算済みのサンプルが古い（npm run sample:precompute で作り直す）");
    return false;
  }
  state.vectors = cache.vectors;
  state.mean = cache.mean;
  state.generality = cache.generality;
  show(cache.layout);
  renderHud({ count: state.items.length, kind: state.kind,
    status: `${cache.layout.clusters.filter((c) => c.count > 0).length} つの星団`, phase: "ready" });
  settleHud();
  return true;
}

/**
 * Web のデモ：モデルを裏で読み込む。揃うまでは文字一致の検索で動かし、検索欄の下に控えめに知らせる。
 * 揃ったら、入力中の検索を意味の検索でやり直す。
 */
function loadModelInBackground(): void {
  const status = document.getElementById("model-status");
  document.body.dataset.model = "loading";
  if (status) status.hidden = false;
  embedder = createEmbedder();
  embedder.onDownload = (_file, percent) => {
    view?.wake();   // Worker からの通知
    if (status) status.textContent = `意味の検索を準備している ${percent.toFixed(0)}%（それまでは文字の一致で探す）`;
  };
  embedder.ready().then(() => {
    view?.wake();
    modelReady = true;
    document.body.dataset.model = "ready";
    if (status) status.hidden = true;
    const input = document.getElementById("search-input") as HTMLInputElement | null;
    if (input?.value.trim()) input.dispatchEvent(new Event("input"));
  }).catch((err) => {
    console.error("[ブクスペ] モデルを読み込めなかった", err);
    document.body.dataset.model = "error";
    if (status) status.textContent = "意味の検索を準備できなかった（文字の一致で探す）";
  });
}

/**
 * データ源を切り替えて読み込み直す（DB はデータ源ごとに分かれているので、星座や配置は混ざらない）。
 * `?sample=1` で開いていたら、自分のブックマークに戻るときに外す。
 */
function switchSource(to: BookmarkSourceKind): void {
  setPreferSample(to === "sample");
  const url = new URL(location.href);
  if (to === "chrome" && url.searchParams.has("sample")) {
    url.searchParams.delete("sample");
    location.replace(url);
  } else location.reload();
}

/** 自分のブックマークが 20 件未満なら、初回だけサンプルの宇宙を控えめに勧める（ⓘ からいつでも切り替えられる）。 */
const SAMPLE_HINT_KEY = "bukusupe:sample-hint-shown";
const FEW_BOOKMARKS = 20;
function offerSample(): void {
  const hint = document.getElementById("sample-hint");
  if (!hint || state.kind !== "chrome" || state.items.length >= FEW_BOOKMARKS) return;
  try {
    if (localStorage.getItem(SAMPLE_HINT_KEY)) return;
    localStorage.setItem(SAMPLE_HINT_KEY, "1");
  } catch { return; }
  hint.hidden = false;
  document.getElementById("sample-hint-try")?.addEventListener("click", () => switchSource("sample"));
  document.getElementById("sample-hint-close")?.addEventListener("click", () => { hint.hidden = true; });
}

/**
 * ブックマークの更新と「再配置」を 1 本の Promise の鎖に並べる（同時に走らせない）。
 * 前の処理が終わる前に次を始めると、古い状態で作った配置が後から保存されることがある。
 */
let chain: Promise<void> = Promise.resolve();
function enqueue(task: () => Promise<void>): Promise<void> {
  chain = chain.then(task).catch((err) => console.error("[ブクスペ] 更新に失敗", err));
  return chain;
}

/** 足りない分の埋め込みを計算し、進み具合を HUD に出す。 */
async function computeEmbeddings(): Promise<void> {
  if (!embedder) return;
  const base = { count: state.items.length, kind: state.kind };
  // 埋め込みの計算中は、進み具合の表示と星の誕生のあいだ描き続ける（動きがあるときだけ描く方式の例外）
  view?.hold("embedding", true);
  try {
    state.vectors = await ensureEmbeddings(state.items, embedder, (p) => {
      mark(`embed:${p.phase}`);
      view?.wake();   // Worker からの通知
      if (p.phase === "model") {
        renderHud({ ...base, status: `モデルを取り込んでいる ${p.percent.toFixed(0)}%`, progress: p.percent / 100, phase: "model" });
      } else if (p.phase === "embed") {
        renderHud({ ...base, status: `星を読み解いている ${p.done} / ${p.total}`, progress: p.done / p.total, phase: "embed" });
      } else {
        renderHud({ ...base, status: "星を並べている…", phase: "layout" });
      }
    });
  } catch (err) {
    console.error("[ブクスペ] 埋め込みに失敗", err);
    renderHud({ ...base, status: "意味の計算に失敗した", phase: "error" });
  } finally {
    view?.hold("embedding", false);
  }
}

/**
 * 意味での配置。保存してあるものがあれば使い、増えた分だけ足す（SPEC 7 章）。
 * 全体の計算し直しは「再配置」を押したときだけ。
 */
async function placeStars(): Promise<void> {
  if (state.vectors.size === 0) return;
  const { mean, recomputed } = await loadOrComputeMean();
  state.mean = mean;
  await updateGenerality();

  // 平均ベクトルを取り直したときは、古い平均で作った配置を使わない
  const stored = recomputed ? undefined : await readMeta<Layout>(META_LAYOUT);
  let layout: Layout | null = null;

  if (stored && stored.version === LAYOUT_VERSION && stored.stars.length > 0) {
    const alive = new Set(state.items.map((i) => i.id));
    layout = dropMissing(stored, alive);
    const known = new Set(layout.stars.map((s) => s.id));
    const added = state.items.filter((i) => !known.has(i.id) && state.vectors.has(i.id));
    for (const item of added) {
      layout = addStar(layout, item.id, state.vectors.get(item.id) as Float32Array, state.mean);
    }
    // 命名規則が変わっても、保存済みの星の座標はそのまま使う。
    const byId = new Map(state.items.map((item) => [item.id, item]));
    const names = clusterNames(layout.clusters.map((c) => layout!.stars
      .filter((s) => s.cluster === c.index)
      .sort((a, b) => a.rank - b.rank)
      .flatMap((s) => { const item = byId.get(s.id); return item ? [item] : []; })));
    const namesChanged = layout.clusters.some((c, i) => c.name !== names[i]);
    if (namesChanged) layout = { ...layout, clusters: layout.clusters.map((c, i) => ({ ...c, name: names[i] })) };
    if (namesChanged || added.length > 0 || layout.stars.length !== stored.stars.length) {
      await writeMeta(META_LAYOUT, layout);
    }
  }

  if (!layout || layout.stars.length === 0) {
    layout = computeLayout(state.items, state.vectors, state.mean);
    await writeMeta(META_LAYOUT, layout);
  }

  show(layout);
  renderHud({
    count: state.items.length,
    kind: state.kind,
    status: `${layout.clusters.filter((c) => c.count > 0).length} つの星団`,
    phase: "ready",
  });
  settleHud();
}

/** 全部まとめて計算し直す（「再配置」）。平均ベクトルも取り直す。 */
async function relayout(): Promise<void> {
  if (state.vectors.size === 0) return;
  renderHud({ count: state.items.length, kind: state.kind, status: "並べ直している…", phase: "layout" });
  const mean = meanVector([...state.vectors.values()]);
  state.mean = mean;
  await writeMeta<StoredMean>(META_MEAN, { source: state.kind, vector: mean });
  const layout = computeLayout(state.items, state.vectors, mean);
  await writeMeta(META_LAYOUT, layout);
  show(layout);
  renderHud({
    count: state.items.length,
    kind: state.kind,
    status: `${layout.clusters.filter((c) => c.count > 0).length} つの星団`,
    phase: "ready",
  });
}

/**
 * 「誰とでも似ている度合い」を計算して保存する（M3 の検索の補正でも使う）。
 * ブックマークが増減・変更されるたびに取り直す（O(N) なので軽い）。
 */
async function updateGenerality(): Promise<void> {
  if (!state.mean) return;
  const ids: string[] = [];
  const raw: Float32Array[] = [];
  for (const item of state.items) {
    const v = state.vectors.get(item.id);
    if (!v) continue;
    ids.push(item.id);
    raw.push(v);
  }
  const scores = standardize(generalityScores(raw));
  state.generality = new Map(ids.map((id, i) => [id, scores[i]]));
  await writeMeta(META_GENERALITY, Object.fromEntries(state.generality));
}

async function loadOrComputeMean(): Promise<{ mean: Float32Array; recomputed: boolean }> {
  const stored = await readMeta<StoredMean>(META_MEAN);
  if (stored?.source === state.kind && stored.vector?.length > 0) {
    return { mean: stored.vector, recomputed: false };
  }
  const mean = meanVector([...state.vectors.values()]);
  await writeMeta<StoredMean>(META_MEAN, { source: state.kind, vector: mean });
  return { mean, recomputed: true };
}

function show(layout: Layout, frame = true): void {
  state.layout = layout;
  // 測定：最初に星を描いたコマ（show の後の最初のコマ）
  if (DEBUG && layout.stars.length && benchMarks.firstStars === undefined) {
    requestAnimationFrame(() => requestAnimationFrame(() => mark("firstStars")));
  }
  const byId = new Map(state.items.map((i) => [i.id, i]));
  view?.setLayout(layout, toRenderStars(layout, byId), toLabelSource(layout, byId), frame);
  refreshConstellations();
  if (hits.length) {
    view?.setSearch(hits.map((hit) => hit.id));
    view?.selectSearch(hits[selectedIndex]?.id ?? null);
  }
}

function refreshConstellations(): void {
  view?.setConstellations(constellations.map((row) => ({ id: row.id, name: row.name,
    points: pointsFor(state.layout, row.lastMembers) })));
  if (editing) view?.setEditMembers(pointsFor(state.layout, currentEditMembers()));
  renderConstellationList();
}

/** 保存した星座を読む。形の合わない行は読み飛ばし（コンソールに警告を残す）、残りで起動する */
async function loadConstellations(): Promise<Constellation[]> {
  const rows = await readConstellations<unknown>();
  const valid = rows.map(parseConstellation).filter((row): row is Constellation => row !== null);
  if (valid.length < rows.length) {
    console.warn(`[ブクスペ] 形の合わない星座の行を ${rows.length - valid.length} 件読み飛ばした`);
  }
  return valid;
}

async function reconcileConstellations(): Promise<void> {
  const alive = new Set(state.items.map((item) => item.id));
  for (const row of constellations) {
    const members = row.lastMembers.filter((id) => alive.has(id));
    if (members.length === row.lastMembers.length) continue;
    row.lastMembers = members;
    await writeConstellation(row);
  }
  refreshConstellations();
}

function currentEditMembers(): string[] {
  return editing ? membersFor(editing.automatic, [...editing.pinned], [...editing.excluded]) : [];
}

function handleStarClick(id: string): void {
  if (editing) {
    if (currentEditMembers().includes(id)) {
      editing.pinned.delete(id);
      editing.excluded.add(id);
    } else {
      editing.excluded.delete(id);
      editing.pinned.add(id);
    }
    view?.setEditMembers(pointsFor(state.layout, currentEditMembers()));
  } else showCard(id);
}

function beginConstellation(): void {
  const input = document.getElementById("search-input") as HTMLInputElement;
  const query = input.value.trim();
  if (!query || !hits.length || editing) return;
  editing = { query, automatic: hits.slice(0, 12).map((hit) => hit.id),
    pinned: new Set(), excluded: new Set() };
  (document.getElementById("constellation-create") as HTMLElement).hidden = true;
  (document.getElementById("constellation-editor") as HTMLElement).hidden = false;
  const nameInput = document.getElementById("constellation-name-input") as HTMLInputElement;
  nameInput.value = query;
  nameInput.focus();
  view?.setEditMembers(pointsFor(state.layout, currentEditMembers()));
}

function cancelConstellation(): void {
  editing = null;
  view?.setEditMembers([]);
  (document.getElementById("constellation-editor") as HTMLElement).hidden = true;
  const input = document.getElementById("search-input") as HTMLInputElement;
  (document.getElementById("constellation-create") as HTMLElement).hidden = !input.value.trim() || !hits.length;
}

async function saveConstellation(): Promise<void> {
  if (!editing) return;
  // 名前は入力欄と同じ 80 文字まで（読み込むときの確かめ parseConstellation の上限に収める）
  const name = ((document.getElementById("constellation-name-input") as HTMLInputElement).value.trim() || editing.query).slice(0, 80);
  const members = currentEditMembers().filter((id) => state.items.some((item) => item.id === id));
  const queryVector = embedder && modelReady ? Array.from((await embedder.embed([queryText(editing.query)]))[0]) : undefined;
  const row: Constellation = {
    id: crypto.randomUUID(), name, source: "search", query: editing.query, queryVector,
    pinned: [...editing.pinned], excluded: [...editing.excluded], lastMembers: members, createdAt: Date.now(),
  };
  await writeConstellation(row);
  constellations.push(row);
  cancelConstellation();
  ++searchGeneration;
  clearTimeout(searchTimer);
  const input = document.getElementById("search-input") as HTMLInputElement;
  input.value = "";
  input.blur();
  (document.getElementById("constellation-create") as HTMLElement).hidden = true;
  hits = [];
  activeConstellationId = row.id;
  savingAnimation = true;
  refreshConstellations();
  view?.saveConstellation(row.id, row.name, pointsFor(state.layout, members));
  renderConstellationList();
  // 保存後は夜空へ戻る。線と名前は描画ループの経過時間で進む。
  const finish = () => {
    if (view?.constellationAnimationState().phase === "done") {
      window.setTimeout(() => {
        savingAnimation = false;
        activeConstellationId = null;
        view?.selectConstellation(null);
        // 演出のあいだに入力欄へ戻っていたら、真上のまま（検索の見やすさを保つ）
        if (document.activeElement !== document.getElementById("search-input")) view?.setTopDown(false);
        renderConstellationList();
      }, 1200);
    } else requestAnimationFrame(finish);
  };
  requestAnimationFrame(finish);
}

/** 星座の選択の世代。検索し直している間に別の星座が選ばれたら、古い方の結果は捨てる。 */
let recallGeneration = 0;

async function toggleConstellation(id: string): Promise<void> {
  if (savingAnimation) return;
  const generation = ++recallGeneration;
  if (activeConstellationId === id) {
    activeConstellationId = null;
    view?.selectConstellation(null);
    renderConstellationList();
    return;
  }
  const row = constellations.find((item) => item.id === id);
  if (!row) return;
  const ranked = row.query ? await searchResults(row.query) : [];
  // 素早く続けて選ばれたときは、最後に選ばれたものだけを有効にする
  if (generation !== recallGeneration) return;
  const threshold = (ranked[0]?.score ?? 0) * ATTRACT_RATIO;
  const automatic = ranked.filter((hit) => hit.score >= threshold).slice(0, 12).map((hit) => hit.id);
  const alive = new Set(state.items.map((item) => item.id));
  row.lastMembers = membersFor(automatic, row.pinned, row.excluded).filter((itemId) => alive.has(itemId));
  await writeConstellation(row);
  if (generation !== recallGeneration) return;
  activeConstellationId = id;
  refreshConstellations();
  view?.selectConstellation(id, row.name);
  view?.focusPoints(pointsFor(state.layout, row.lastMembers));
}

/**
 * 画面下の星座一覧。並べるのは星座の名前だけ。
 * 「名前を変える」「削除」は、選んでいる星座の横の「…」を押すと開く小さなメニューに入れる。
 */
function renderConstellationList(): void {
  const list = document.getElementById("constellation-list");
  if (!list) return;
  document.body.classList.toggle("has-constellations", constellations.length > 0);
  closeConstellationMenu();
  list.replaceChildren();
  for (const row of constellations) {
    const button = document.createElement("button");
    button.textContent = row.name;
    button.title = row.name;   // 長い名前は CSS で省略する。全文はここで見られる
    button.classList.toggle("is-active", row.id === activeConstellationId);
    button.addEventListener("click", () => void toggleConstellation(row.id));
    list.append(button);
    if (row.id === activeConstellationId && !savingAnimation) {
      const more = document.createElement("button");
      more.id = "constellation-more";
      more.textContent = "…";
      more.title = "この星座の操作";
      more.setAttribute("aria-label", `「${row.name}」の操作`);
      more.setAttribute("aria-haspopup", "menu");
      more.setAttribute("aria-expanded", "false");
      more.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleConstellationMenu(more);
      });
      list.append(more);
    }
  }
}

function toggleConstellationMenu(anchor: HTMLElement): void {
  const menu = document.getElementById("constellation-manage");
  if (!menu) return;
  if (!menu.hidden) { closeConstellationMenu(); return; }
  menu.hidden = false;
  anchor.setAttribute("aria-expanded", "true");
  // 「…」の真上に開く
  const rect = anchor.getBoundingClientRect();
  menu.style.left = `${Math.max(8, Math.min(innerWidth - menu.offsetWidth - 8, rect.left + rect.width / 2 - menu.offsetWidth / 2))}px`;
  menu.style.bottom = `${innerHeight - rect.top + 6}px`;
}

function closeConstellationMenu(): void {
  const menu = document.getElementById("constellation-manage");
  if (menu) menu.hidden = true;
  document.getElementById("constellation-more")?.setAttribute("aria-expanded", "false");
}

function setupConstellations(): void {
  document.getElementById("constellation-create")?.addEventListener("click", beginConstellation);
  document.getElementById("constellation-save")?.addEventListener("click", () => void saveConstellation());
  document.getElementById("constellation-cancel")?.addEventListener("click", cancelConstellation);
  document.getElementById("constellation-name-input")?.addEventListener("keydown", (event) => {
    if ((event as KeyboardEvent).key === "Enter") { event.preventDefault(); void saveConstellation(); }
    if ((event as KeyboardEvent).key === "Escape") { event.preventDefault(); cancelConstellation(); }
  });
  // メニューの外を押したら閉じる
  document.addEventListener("click", (event) => {
    const menu = document.getElementById("constellation-manage");
    if (menu && !menu.hidden && !menu.contains(event.target as Node)) closeConstellationMenu();
  });
  document.getElementById("constellation-rename")?.addEventListener("click", async () => {
    closeConstellationMenu();
    const row = constellations.find((item) => item.id === activeConstellationId);
    if (!row) return;
    const name = window.prompt("星座の名前", row.name)?.trim().slice(0, 80);
    if (!name) return;
    row.name = name;
    await writeConstellation(row);
    view?.selectConstellation(row.id, name);
    renderConstellationList();
  });
  document.getElementById("constellation-delete")?.addEventListener("click", async () => {
    closeConstellationMenu();
    if (!activeConstellationId) return;
    const id = activeConstellationId;
    await deleteConstellation(id);
    constellations = constellations.filter((item) => item.id !== id);
    ++recallGeneration;
    activeConstellationId = null;
    view?.selectConstellation(null);
    refreshConstellations();
  });
  document.addEventListener("keydown", (event) => {
    const menu = document.getElementById("constellation-manage");
    if (event.key === "Escape" && menu && !menu.hidden) { closeConstellationMenu(); return; }
    if (event.key !== "Escape" || event.target === document.getElementById("search-input") ||
      event.target === document.getElementById("constellation-name-input")) return;
    if (editing) cancelConstellation();
    else if (activeConstellationId) {
      ++recallGeneration;
      activeConstellationId = null;
      view?.selectConstellation(null);
      renderConstellationList();
    }
  });
  renderConstellationList();
}

async function searchResults(text: string, coefficient = GENERALITY_PENALTY,
  priorCoefficient = CLUSTER_PRIOR): Promise<SearchHit[]> {
  if (!embedder || !modelReady || !state.mean || text.trim().length < 2) return rankSearch(state.items, text);
  const [query] = await embedder.embed([queryText(text)]);
  const semantic = semanticScores(query, state.items, state.vectors, state.mean, state.generality,
    coefficient, state.layout, priorCoefficient);
  return rankSearch(state.items, text, semantic);
}

function openBookmark(id: string, newTab = false): void {
  const item = state.items.find((row) => row.id === id);
  if (!item) return;
  // ページを開く処理はすべて openPage を通る（http(s) 以外は開かない）
  openPage(item.url, { newTab, beforeLeave: saveReturnState });
}

function showCard(id: string): void {
  const item = state.items.find((row) => row.id === id);
  const card = document.getElementById("star-card");
  if (!item || !card) return;
  cardId = id;
  // 長いものは CSS で行数を限って省略する。全文はマウスを乗せたときの title で見られる
  const setText = (id: string, text: string) => {
    const el = document.getElementById(id) as HTMLElement;
    el.textContent = text;
    el.title = text;
  };
  setText("star-card-title", item.title);
  setText("star-card-url", item.url);
  setText("star-card-folder", item.folderPath.join(" / ") || "ルート");
  card.hidden = false;
}

function applySearch(next: SearchHit[]): void {
  const threshold = (next[0]?.score ?? 0) * ATTRACT_RATIO;
  hits = next.filter((hit) => hit.score >= threshold).slice(0, 21);
  selectedIndex = 0;
  view?.setSearch(hits.map((hit) => hit.id));
  view?.selectSearch(hits[0]?.id ?? null);
  const create = document.getElementById("constellation-create") as HTMLElement | null;
  if (create) create.hidden = !hits.length || !(document.getElementById("search-input") as HTMLInputElement).value.trim() || !!editing;
}

function setupSearch(canvas: HTMLCanvasElement): void {
  const input = document.getElementById("search-input") as HTMLInputElement;
  const card = document.getElementById("star-card") as HTMLElement;
  // 「/」で検索欄へ（文字を打っている最中は、そのまま文字として入れる）
  document.addEventListener("keydown", (event) => {
    if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey || view?.inFlight) return;
    const active = document.activeElement;
    if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;
    event.preventDefault();
    input.focus();
  });
  input.addEventListener("focus", () => view?.setTopDown(true));
  input.addEventListener("blur", () => { if (!input.value.trim()) view?.setTopDown(false); });
  input.addEventListener("input", () => {
    const text = input.value.trim();
    const generation = ++searchGeneration;
    clearTimeout(searchTimer);
    card.hidden = true;
    cardId = null;
    if (!text) {
      applySearch([]);
      if (document.activeElement !== input) view?.setTopDown(false);
      return;
    }
    applySearch(rankSearch(state.items, text));
    if (text.length < 2) return;
    searchTimer = window.setTimeout(async () => {
      try {
        const next = await searchResults(text);
        if (generation === searchGeneration) applySearch(next);
      } catch (error) { console.error("[ブクスペ] 検索に失敗", error); }
    }, 300);
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.shiftKey) {
      beginConstellation();
      event.preventDefault();
    } else if (event.key === "Escape") {
      if (editing) { cancelConstellation(); event.preventDefault(); return; }
      if (activeConstellationId && !input.value.trim()) {
        ++recallGeneration;
        activeConstellationId = null;
        view?.selectConstellation(null);
        renderConstellationList();
        event.preventDefault();
        return;
      }
      input.value = "";
      input.dispatchEvent(new Event("input"));
      input.blur();
      event.preventDefault();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (!hits.length) return;
      selectedIndex = (selectedIndex + (event.key === "ArrowDown" ? 1 : -1) + hits.length) % hits.length;
      view?.selectSearch(hits[selectedIndex].id);
      event.preventDefault();
    } else if (event.key === "Enter" && hits[selectedIndex]) {
      openBookmark(hits[selectedIndex].id, event.ctrlKey || event.metaKey);
      event.preventDefault();
    }
  });
  canvas.addEventListener("click", (event) => {
    if (view?.inFlight) return;
    const id = view?.pickStar(event.clientX, event.clientY);
    if (id) handleStarClick(id);
    else card.hidden = true;
  });
  canvas.addEventListener("mousemove", (event) => {
    if (!view?.inFlight) view?.hoverStar(view.pickStar(event.clientX, event.clientY));
  });
  canvas.addEventListener("mouseleave", () => view?.hoverStar(null));
  canvas.addEventListener("dblclick", (event) => {
    if (view?.inFlight) return;
    if (editing) return;
    const id = view?.pickStar(event.clientX, event.clientY);
    if (id) openBookmark(id, event.ctrlKey || event.metaKey);
  });
  document.getElementById("star-card-open")?.addEventListener("click", (event) => {
    if (cardId) openBookmark(cardId, (event as MouseEvent).ctrlKey || (event as MouseEvent).metaKey);
  });
}

/**
 * 飛行モード（SPEC 13 章）の出入り。「飛行」ボタンか F で入り、Esc で出る。
 * 入る前の状態（検索語・検索結果・星座の選択）は main の側では何も変えない（SpaceView が表示だけを預かる）。
 * 文字を打っている最中の F は文字として扱う。星座の編集中は入らない。
 */
function setupFlight(): void {
  const button = document.getElementById("flight-toggle") as HTMLButtonElement | null;
  const typingNow = () => {
    const el = document.activeElement;
    return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || (el as HTMLElement | null)?.isContentEditable;
  };
  const enter = () => {
    if (!view || editing || view.inFlight) return;
    (document.activeElement as HTMLElement | null)?.blur?.();
    (document.getElementById("star-card") as HTMLElement).hidden = true;
    cardId = null;
    view.enterFlight();
  };
  const leave = () => { view?.exitFlight(); };
  // 星の芯に入ったら同じタブで開く。Ctrl/⌘ を押していれば新しいタブにする。
  view!.onEnterStar = (id) => openBookmark(id, openModifierHeld);
  // 操作の説明は、入ってすぐは大きく出し、約 10 秒で薄く小さくして左下へ寄せる（窓や星に重ならないように）
  const help = document.getElementById("flight-help");
  let helpTimer: number | undefined;
  view!.onFlightChange = (active) => {
    document.body.classList.toggle("is-flying", active);
    clearTimeout(helpTimer);
    help?.classList.remove("is-compact");
    if (active) helpTimer = window.setTimeout(() => help?.classList.add("is-compact"), 10_000);
    if (button) {
      button.textContent = active ? "地図へ戻る" : "飛行";
      button.title = active ? "地図へ戻る（Esc）" : "星の間を飛ぶ（F）";
    }
  };
  button?.addEventListener("click", () => (view?.inFlight ? leave() : enter()));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Control" || event.key === "Meta") openModifierHeld = true;
  }, { capture: true });
  window.addEventListener("keyup", (event) => {
    if (event.key === "Control" || event.key === "Meta") openModifierHeld = false;
  }, { capture: true });
  window.addEventListener("blur", () => { openModifierHeld = false; });
  // 取り込み段階（capture）で受け、飛行中の Esc が検索を消したり星座の選択を解いたりしないようにする
  window.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (view?.inFlight) {
      if (event.key === "Escape") leave();
      // 飛行中は、地図の操作（/ で検索、Enter、矢印など）を届かせない。飛行の操作は SpaceView が見る
      if (event.key === "Escape" || event.key === "/" || event.key === "Enter" || event.key.startsWith("Arrow")) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      return;
    }
    if (event.code === "KeyF" && !typingNow()) {
      event.preventDefault();
      enter();
    }
  }, { capture: true });
}

/**
 * ブックマークの追加・変更・削除に追随する（SPEC 6 章 / 7 章）。
 * 読み取り専用の購読で、ブックマーク自体には触らない。
 */
function watchBookmarks(): void {
  if (typeof chrome === "undefined" || !chrome.bookmarks?.onCreated) return;
  let timer: number | undefined;
  // まだ始まっていない更新が鎖にあれば、それが最新のブックマークを読むので足さない
  let queued = false;
  const sync = async () => {
    queued = false;
    const snapshot = await loadBookmarks();
    if (snapshot.kind !== state.kind) {
      // サンプル⇄実ブックマーク：DB も平均も別物なので、黙って差し替えず読み込み直す
      location.reload();
      return;
    }
    state.items = snapshot.items;
    await computeEmbeddings();   // 変わった分だけ計算される
    await placeStars();          // 増えた星だけ足される
    await reconcileConstellations();
  };
  const refresh = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (queued) return;
      queued = true;
      void enqueue(sync);
    }, 500) as unknown as number;
  };
  chrome.bookmarks.onCreated.addListener(refresh);
  chrome.bookmarks.onChanged.addListener(refresh);
  chrome.bookmarks.onRemoved.addListener(refresh);
  chrome.bookmarks.onMoved.addListener(refresh);   // フォルダのパスが入力文に入るため
}

if (__DEBUG__) {
  // --- 開発と自動確認のための窓口。確認用のビルドで、URL に ?debug=1 があるときだけ公開する（M6、段階 2）。
  // 配布用のビルドでは __DEBUG__ が false なので、この中は丸ごと取り除かれる（規則 11）。 ---

  const plain = (layout: Layout) => ({
    spacing: layout.spacing,
    stars: layout.stars.map((s) => ({
      id: s.id,
      x: s.x,
      y: s.y,
      cluster: s.cluster,
      rank: s.rank,
      title: state.items.find((i) => i.id === s.id)?.title ?? "",
      folder: state.items.find((i) => i.id === s.id)?.folderPath.join("/") ?? "",
    })),
    clusters: layout.clusters.map((c) => ({
      index: c.index,
      name: c.name,
      x: c.x,
      y: c.y,
      radius: c.radius,
      count: c.count,
    })),
  });

  let saved: { items: BookmarkItem[]; vectors: Map<string, Float32Array>; layout: Layout | null } | null = null;

  const debugApi = {
    state,
    frames: () => view?.frames ?? 0,
    layout: () => (state.layout ? plain(state.layout) : null),

    /** 同じ入力から配置をもう一度計算する（毎回同じ座標になることの確認用）。 */
    computeAgain() {
      if (!state.mean) return null;
      return plain(computeLayout(state.items, state.vectors, state.mean));
    },

    /** ブックマークが 1 件増えたときの動きを、本物の経路で再現する。 */
    async simulateAdd(title: string, url: string, folder: string[] = []) {
      if (!embedder || !state.mean || !state.layout) return null;
      saved ??= { items: state.items, vectors: state.vectors, layout: state.layout };
      const item: BookmarkItem = { id: `sim-${Date.now()}`, title, url, folderPath: folder };
      const [vec] = await embedder.embed([passageText(item)]);
      state.items = [...state.items, item];
      state.vectors = new Map(state.vectors).set(item.id, vec);
      const next = addStar(state.layout, item.id, vec, state.mean);
      show(next, false);
      return plain(next);
    },

    /** 件数を増やしたときの配置と描画を測る。サンプルを複製して作る。 */
    async benchmark(n: number) {
      if (!state.mean) return null;
      saved ??= { items: state.items, vectors: state.vectors, layout: state.layout };
      const base = saved.items.filter((i) => saved?.vectors.has(i.id));
      const items: BookmarkItem[] = [];
      const vectors = new Map<string, Float32Array>();
      let seed = 12345;
      const rnd = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296 - 0.5);
      for (let i = 0; i < n; i++) {
        const src = base[i % base.length];
        const copy: BookmarkItem = { ...src, id: `bench-${i}` };
        const v = saved.vectors.get(src.id) as Float32Array;
        const jittered = new Float32Array(v.length);
        let sum = 0;
        for (let d = 0; d < v.length; d++) {
          jittered[d] = v[d] + rnd() * 0.06;
          sum += jittered[d] * jittered[d];
        }
        const norm = Math.sqrt(sum);
        for (let d = 0; d < v.length; d++) jittered[d] /= norm;
        items.push(copy);
        vectors.set(copy.id, jittered);
      }
      const mean = meanVector([...vectors.values()]);
      const t0 = performance.now();
      const layout = computeLayout(items, vectors, mean);
      const layoutMs = performance.now() - t0;

      state.items = items;
      state.vectors = vectors;
      show(layout);

      // 描画の力（何コマ描けるか）を測るので、この 1.5 秒は動きが無くても止めずに描く
      const vd = view ? viewDebug(view) : null;
      vd?.setContinuousRender(true);
      const before = view?.frames ?? 0;
      const start = performance.now();
      await new Promise((r) => setTimeout(r, 1500));
      const fps = ((view?.frames ?? 0) - before) / ((performance.now() - start) / 1000);
      vd?.setContinuousRender(false);
      return { n, layoutMs, fps, clusters: layout.clusters.map((c) => ({ name: c.name, count: c.count })) };
    },

    /** benchmark の前の状態に戻す。 */
    restore() {
      if (!saved) return false;
      state.items = saved.items;
      state.vectors = saved.vectors;
      if (saved.layout) show(saved.layout);
      saved = null;
      return true;
    },

    setZoomTier: (tier: ZoomTier) => view?.setZoomTier(tier),
    cameraState: () => view?.cameraState(),
    resetCamera: () => view?.resetCamera(),
    labelGeometry: () => view?.labelGeometry() ?? [],
    setTopDown: (on: boolean) => view?.setTopDown(on),
    // 飛行モード（SPEC 13 章）の確認用
    enterFlight: () => view?.enterFlight(),
    exitFlight: () => view?.exitFlight(),
    flightState: () => view?.flightState(),
    flightStars: () => view?.flightStars(),
    flightHeights: () => view?.flightHeights(),
    flightReset: () => view?.flightReset(),
    flightDebris: (again = false) => view?.flightDebris(again),
    flightNebulaRanges: () => view?.flightNebulaRanges(),
    flightRings: () => view?.flightRings(),
    flightPlace: (px: number, py: number, pz: number, lx: number, ly: number, lz: number) =>
      view?.flightPlace(px, py, pz, lx, ly, lz),
    flightTeleport: (id: string, distance: number) => view?.flightTeleport(id, distance),
    starScreenSize: (id: string) => view?.starScreenSize(id),
    flightConstellationSegments: () => view?.flightConstellationSegments(),
    /** 確認用：最終利用日・追加日・螺旋の順位から、星の見え方（大きさ・明るさ・色）を求める */
    appearanceFor: (input: { id?: string; dateLastUsed?: number; dateAdded?: number; rank?: number }) => {
      const look = touchAppearance({ id: input.id ?? "", x: 0, y: 0, brightness: 0, cluster: 0, rank: input.rank ?? 0,
        touched: lastTouched(input) });
      return { size: look.size, alpha: look.alpha, color: [look.color.r, look.color.g, look.color.b] };
    },
    relayout,

    async search(text: string, topK = 5, coefficient = GENERALITY_PENALTY, priorCoefficient = CLUSTER_PRIOR) {
      const ranked = await searchResults(text, coefficient, priorCoefficient);
      const byId = new Map(state.items.map((i) => [i.id, i]));
      const clusterOf = new Map((state.layout?.stars ?? []).map((s) => [s.id, s.cluster]));
      const names = new Map((state.layout?.clusters ?? []).map((c) => [c.index, c.name]));
      return ranked.slice(0, topK).map((row) => ({ ...row,
        folder: byId.get(row.id)?.folderPath.join("/") ?? "",
        cluster: names.get(clusterOf.get(row.id) ?? -1) ?? "(未配置)",
      }));
    },
    searchNow: async (text: string) => {
      const input = document.getElementById("search-input") as HTMLInputElement;
      input.focus();
      input.value = text;
      input.dispatchEvent(new Event("input"));
      if (text.length >= 2) {
        const generation = ++searchGeneration;
        clearTimeout(searchTimer);
        const result = await searchResults(text);
        if (generation === searchGeneration) applySearch(result);
      }
      return hits;
    },
    searchState: () => ({ ids: hits.map((hit) => hit.id), selected: hits[selectedIndex]?.id ?? null }),
    searchCoefficient: GENERALITY_PENALTY,
    clusterPriorCoefficient: CLUSTER_PRIOR,
    attractRatio: ATTRACT_RATIO,
    searchGeometry: () => view?.searchGeometry(),
    searchHole: () => view?.searchHole() ?? null,
    setConstellationLinesVisible: (visible: boolean) => view?.setConstellationLinesVisible(visible),
    setConstellationTestOpacity: (value: number | null) => view?.setConstellationTestOpacity(value),
    setConstellationTestLine: (enabled: boolean) => view?.setConstellationTestLine(enabled),
    starScreen: (id: string) => view?.starScreen(id),
    starPosition: (id: string) => view?.starPosition(id),
    starVisual: (id: string) => view?.starVisual(id),
    traceGeometry: () => view?.traceGeometry(),
    labelStats: () => view?.labelStats(),
    resetLabelTiming: () => view?.resetLabelTiming(),
    cameraTilt: () => view?.cameraTilt(),
    measureLexical: (text: string) => { const t = performance.now(); rankSearch(state.items, text); return performance.now() - t; },
    constellationState: () => ({ rows: constellations, active: activeConstellationId,
      editing: editing ? { query: editing.query, automatic: editing.automatic,
        pinned: [...editing.pinned], excluded: [...editing.excluded], members: currentEditMembers() } : null,
      geometry: view?.constellationGeometry(), animation: view?.constellationAnimationState() }),
    toggleEditMember: handleStarClick,
    /** 確認用：ページを開く関数そのもの（http(s) 以外は開かないことの確かめ） */
    openUrl: (url: string, newTab = false) => openPage(url, { newTab, beforeLeave: saveReturnState }),
    /** 確認用：「戻る」用の保存状態の場所と版 */
    returnStateInfo: () => ({ key: RETURN_STATE_KEY, version: RETURN_STATE_VERSION }),
    /** 確認用：星団へ寄る（1,000 文字のタイトルのラベルを近距離で見るため） */
    focusCluster: (index: number) => view?.focusCluster(index),
    recallConstellation: toggleConstellation,
    mstFor: (ids: string[]) => minimumSpanningTree(pointsFor(state.layout, ids)),
    /** Web のデモに同梱する計算済みのサンプル（`npm run sample:precompute` が使う） */
    exportSampleCache: () => (state.kind === "sample" && state.layout && state.mean ? encodeSampleCache(state.items, MODEL_ID,
      { vectors: state.vectors, mean: state.mean, generality: state.generality, layout: state.layout }) : null),
    modelReady: () => modelReady,

    // --- 測定（docs/BENCHMARK.md、scripts/bench/）---
    /** 起動の節目の時刻（performance.now、ミリ秒） */
    marks: () => ({ ...benchMarks }),
    /** 今の入力で配置をもう一度計算し、段ごとの時間を返す（保存も表示もしない） */
    layoutTimings() {
      if (!state.mean) return null;
      const steps = startTiming();
      const start = performance.now();
      const layout = computeLayout(state.items, state.vectors, state.mean);
      const total = performance.now() - start;
      stopTiming();
      return { n: layout.stars.length, clusters: layout.clusters.length, total, steps: { ...steps } };
    },
    /** 検索の内訳：検索語の埋め込み・意味のスコア・順位づけ（文字一致を含む）の時間 */
    async searchTimings(text: string) {
      if (!embedder || !state.mean) return null;
      const t0 = performance.now();
      const [query] = await embedder.embed([queryText(text)]);
      const t1 = performance.now();
      const semantic = semanticScores(query, state.items, state.vectors, state.mean, state.generality,
        GENERALITY_PENALTY, state.layout, CLUSTER_PRIOR);
      const t2 = performance.now();
      const ranked = rankSearch(state.items, text, semantic);
      const t3 = performance.now();
      return { embedMs: t1 - t0, scoreMs: t2 - t1, rankMs: t3 - t2, totalMs: t3 - t0, hits: ranked.length };
    },
    /** 検索語 1 つの埋め込みの時間 */
    async embedTimed(text: string) {
      if (!embedder) return null;
      const start = performance.now();
      await embedder.embed([queryText(text)]);
      return performance.now() - start;
    },
    /** 汎用度の計算の時間（全件） */
    generalityTiming() {
      const vectors = state.items.flatMap((item) => state.vectors.get(item.id) ?? []);
      const start = performance.now();
      standardize(generalityScores(vectors));
      return performance.now() - start;
    },
    wasmMemory: () => (embedder instanceof WorkerEmbedder ? requestWasmMemory(embedder) : null),
    storageEstimate: () => navigator.storage.estimate(),
    renderInfo: () => (view ? viewDebug(view).renderInfo() : null),
    setProfiling: (on: boolean) => (view ? viewDebug(view).setProfiling(on) : undefined),
    takeProfile: () => (view ? viewDebug(view).takeProfile() : []),
    setLoopPaused: (paused: boolean) => (view ? viewDebug(view).setLoopPaused(paused) : undefined),
    /** 動きがあるときだけ描く方式の確認用：止めずに描く・いまの状態で 1 コマ描く・ループが回っているか */
    setContinuousRender: (on: boolean) => (view ? viewDebug(view).setContinuousRender(on) : undefined),
    renderNow: () => (view ? viewDebug(view).renderNow() : undefined),
    isRendering: () => view?.isRendering ?? false,
    dtype: () => DTYPE ?? "q8",
  };
  if (DEBUG) {
    (globalThis as unknown as { __bukusupe: typeof debugApi }).__bukusupe = debugApi;
  }
}

main().catch((err) => {
  console.error(err);
  renderHudMessage("読み込みに失敗した。コンソールを確認する。");
});
