import { loadBookmarks, type BookmarkItem, type BookmarkSourceKind } from "./bookmarks";
import { WorkerEmbedder, type Embedder } from "./embed/embedder";
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
import { ATTRACT_RATIO, CLUSTER_PRIOR, GENERALITY_PENALTY, rankSearch, semanticScores, type SearchHit } from "./search";
import { toLabelSource, toRenderStars } from "./render/present";
import { SpaceView } from "./render/scene";
import { readMeta, writeMeta } from "./store/db";
import { renderHud, renderHudMessage, setupHudControls } from "./ui/hud";
import type { ZoomTier } from "./ui/labels";

const META_MEAN = "mean-vector";
const META_LAYOUT = "layout";
const META_GENERALITY = "generality";

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
let embedder: Embedder | null = null;
let view: SpaceView | null = null;
let hits: SearchHit[] = [];
let selectedIndex = 0;
let searchTimer: number | undefined;
let searchGeneration = 0;
let cardId: string | null = null;

async function main(): Promise<void> {
  const canvas = document.getElementById("space") as HTMLCanvasElement | null;
  const labels = document.getElementById("labels");
  if (!canvas || !labels) throw new Error("画面の土台が見つからない");

  setupHudControls();
  view = new SpaceView(canvas, labels);
  view.onStarLabelClick = showCard;
  view.start();

  renderHudMessage("ブックマークを読み込んでいる…");
  const snapshot = await loadBookmarks();
  state.kind = snapshot.kind;
  state.items = snapshot.items;

  // 埋め込みが揃うまでは仮の配置で「星が生まれる」ところを見せる
  show(provisionalLayout(state.items), false);
  renderHud({ count: state.items.length, kind: state.kind, status: "星を読み解いている…", phase: "embed" });
  document.getElementById("loading")?.remove();

  embedder = new WorkerEmbedder();
  await computeEmbeddings();
  await placeStars();
  setupSearch(canvas);

  watchBookmarks();
  document.getElementById("relayout")?.addEventListener("click", () => void relayout());
}

/** 足りない分の埋め込みを計算し、進み具合を HUD に出す。 */
async function computeEmbeddings(): Promise<void> {
  if (!embedder) return;
  const base = { count: state.items.length, kind: state.kind };
  try {
    state.vectors = await ensureEmbeddings(state.items, embedder, (p) => {
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
  }
}

/**
 * 意味での配置。保存してあるものがあれば使い、増えた分だけ足す（SPEC 7 章）。
 * 全体の計算し直しは「再配置」を押したときだけ。
 */
async function placeStars(): Promise<void> {
  if (state.vectors.size === 0) return;
  state.mean = await loadOrComputeMean();
  await updateGenerality();

  const stored = await readMeta<Layout>(META_LAYOUT);
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
}

/** 全部まとめて計算し直す（「再配置」）。平均ベクトルも取り直す。 */
async function relayout(): Promise<void> {
  if (state.vectors.size === 0) return;
  renderHud({ count: state.items.length, kind: state.kind, status: "並べ直している…", phase: "layout" });
  const mean = meanVector([...state.vectors.values()]);
  state.mean = mean;
  await writeMeta(META_MEAN, mean);
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

async function loadOrComputeMean(): Promise<Float32Array> {
  const stored = await readMeta<Float32Array>(META_MEAN);
  if (stored && stored.length > 0) return stored;
  const mean = meanVector([...state.vectors.values()]);
  await writeMeta(META_MEAN, mean);
  return mean;
}

function show(layout: Layout, frame = true): void {
  state.layout = layout;
  const byId = new Map(state.items.map((i) => [i.id, i]));
  view?.setLayout(layout, toRenderStars(layout, byId), toLabelSource(layout, byId), frame);
  if (hits.length) {
    view?.setSearch(hits.map((hit) => hit.id));
    view?.selectSearch(hits[selectedIndex]?.id ?? null);
  }
}

async function searchResults(text: string, coefficient = GENERALITY_PENALTY,
  priorCoefficient = CLUSTER_PRIOR): Promise<SearchHit[]> {
  if (!embedder || !state.mean || text.trim().length < 2) return rankSearch(state.items, text);
  const [query] = await embedder.embed([queryText(text)]);
  const semantic = semanticScores(query, state.items, state.vectors, state.mean, state.generality,
    coefficient, state.layout, priorCoefficient);
  return rankSearch(state.items, text, semantic);
}

function openBookmark(id: string): void {
  const item = state.items.find((row) => row.id === id);
  if (!item) return;
  if (typeof chrome !== "undefined" && chrome.tabs?.create) void chrome.tabs.create({ url: item.url });
  else window.open(item.url, "_blank", "noopener");
}

function showCard(id: string): void {
  const item = state.items.find((row) => row.id === id);
  const card = document.getElementById("star-card");
  if (!item || !card) return;
  cardId = id;
  (document.getElementById("star-card-title") as HTMLElement).textContent = item.title;
  (document.getElementById("star-card-url") as HTMLElement).textContent = item.url;
  (document.getElementById("star-card-folder") as HTMLElement).textContent = item.folderPath.join(" / ") || "ルート";
  card.hidden = false;
}

function applySearch(next: SearchHit[]): void {
  const threshold = (next[0]?.score ?? 0) * ATTRACT_RATIO;
  hits = next.filter((hit) => hit.score >= threshold).slice(0, 21);
  selectedIndex = 0;
  view?.setSearch(hits.map((hit) => hit.id));
  view?.selectSearch(hits[0]?.id ?? null);
}

function setupSearch(canvas: HTMLCanvasElement): void {
  const input = document.getElementById("search-input") as HTMLInputElement;
  const card = document.getElementById("star-card") as HTMLElement;
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
    if (event.key === "Escape") {
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
      openBookmark(hits[selectedIndex].id);
      event.preventDefault();
    }
  });
  canvas.addEventListener("click", (event) => {
    const id = view?.pickStar(event.clientX, event.clientY);
    if (id) showCard(id);
    else card.hidden = true;
  });
  canvas.addEventListener("mousemove", (event) => view?.hoverStar(view.pickStar(event.clientX, event.clientY)));
  canvas.addEventListener("mouseleave", () => view?.hoverStar(null));
  canvas.addEventListener("dblclick", (event) => {
    const id = view?.pickStar(event.clientX, event.clientY);
    if (id) openBookmark(id);
  });
  document.getElementById("star-card-open")?.addEventListener("click", () => { if (cardId) openBookmark(cardId); });
}

/**
 * ブックマークの追加・変更・削除に追随する（SPEC 6 章 / 7 章）。
 * 読み取り専用の購読で、ブックマーク自体には触らない。
 */
function watchBookmarks(): void {
  if (typeof chrome === "undefined" || !chrome.bookmarks?.onCreated) return;
  let timer: number | undefined;
  const refresh = () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const snapshot = await loadBookmarks();
      state.kind = snapshot.kind;
      state.items = snapshot.items;
      await computeEmbeddings();   // 変わった分だけ計算される
      await placeStars();          // 増えた星だけ足される
    }, 500) as unknown as number;
  };
  chrome.bookmarks.onCreated.addListener(refresh);
  chrome.bookmarks.onChanged.addListener(refresh);
  chrome.bookmarks.onRemoved.addListener(refresh);
  chrome.bookmarks.onMoved.addListener(refresh);   // フォルダのパスが入力文に入るため
}

// --- 開発と自動確認のための窓口（M3 以降は画面から使う） ---

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

(globalThis as unknown as { __bukusupe: unknown }).__bukusupe = {
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

    const before = view?.frames ?? 0;
    const start = performance.now();
    await new Promise((r) => setTimeout(r, 1500));
    const fps = ((view?.frames ?? 0) - before) / ((performance.now() - start) / 1000);
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
  labelGeometry: () => view?.labelGeometry() ?? [],
  setTopDown: (on: boolean) => view?.setTopDown(on),
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
  starScreen: (id: string) => view?.starScreen(id),
  starPosition: (id: string) => view?.starPosition(id),
  starVisual: (id: string) => view?.starVisual(id),
  traceGeometry: () => view?.traceGeometry(),
  labelStats: () => view?.labelStats(),
  resetLabelTiming: () => view?.resetLabelTiming(),
  cameraTilt: () => view?.cameraTilt(),
  measureLexical: (text: string) => { const t = performance.now(); rankSearch(state.items, text); return performance.now() - t; },
};

main().catch((err) => {
  console.error(err);
  renderHudMessage("読み込みに失敗した。コンソールを確認する。");
});
