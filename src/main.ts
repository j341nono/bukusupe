import { loadBookmarks, type BookmarkItem, type BookmarkSourceKind } from "./bookmarks";
import { provisionalLayout } from "./layout/provisional";
import { SpaceView } from "./render/scene";
import { renderHud, renderHudMessage } from "./ui/hud";
import { WorkerEmbedder, type Embedder } from "./embed/embedder";
import { ensureEmbeddings, similarity } from "./embed/ensure";
import { queryText } from "./embed/text";

type AppState = {
  kind: BookmarkSourceKind;
  items: BookmarkItem[];
  vectors: Map<string, Float32Array>;
};

const state: AppState = { kind: "sample", items: [], vectors: new Map() };
let embedder: Embedder | null = null;
let view: SpaceView | null = null;

async function main(): Promise<void> {
  const canvas = document.getElementById("space") as HTMLCanvasElement | null;
  if (!canvas) throw new Error("canvas #space が見つからない");

  view = new SpaceView(canvas);
  view.start();

  renderHudMessage("ブックマークを読み込んでいる…");
  const snapshot = await loadBookmarks();
  state.kind = snapshot.kind;
  state.items = snapshot.items;

  // M0 の仮配置。意味での配置は M2 で入れ替える。
  view.setLayout(provisionalLayout(state.items));
  renderHud({ count: state.items.length, kind: state.kind, status: "星を読み解いている…" });
  document.getElementById("loading")?.remove();

  embedder = new WorkerEmbedder();
  await computeEmbeddings();
  watchBookmarks();
}

/** 足りない分の埋め込みを計算し、進み具合を HUD に出す。 */
async function computeEmbeddings(): Promise<void> {
  if (!embedder) return;
  const base = { count: state.items.length, kind: state.kind };
  try {
    state.vectors = await ensureEmbeddings(state.items, embedder, (p) => {
      if (p.phase === "model") {
        renderHud({ ...base, status: `モデルを取り込んでいる ${p.percent.toFixed(0)}%`, progress: p.percent / 100 });
      } else if (p.phase === "embed") {
        renderHud({ ...base, status: `星を読み解いている ${p.done} / ${p.total}`, progress: p.done / p.total });
      } else {
        renderHud({ ...base, status: `意味を覚えた（${p.total} 件）` });
      }
    });
  } catch (err) {
    console.error("[ブクスペ] 埋め込みに失敗", err);
    renderHud({ ...base, status: "意味の計算に失敗した" });
  }
}

/**
 * ブックマークの追加・変更・削除に追随する（SPEC 6 章）。
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
      view?.setLayout(provisionalLayout(state.items));
      await computeEmbeddings();   // 変わった分だけ計算される
    }, 500) as unknown as number;
  };
  chrome.bookmarks.onCreated.addListener(refresh);
  chrome.bookmarks.onChanged.addListener(refresh);
  chrome.bookmarks.onRemoved.addListener(refresh);
  chrome.bookmarks.onMoved.addListener(refresh);   // フォルダのパスが入力文に入るため
}

/** 開発時の確認用の窓口（M2 以降は画面から使う）。 */
type DebugApi = {
  state: AppState;
  frames: () => number;
  search: (text: string, topK?: number) => Promise<{ title: string; score: number }[]>;
};
(globalThis as unknown as { __bukusupe: DebugApi }).__bukusupe = {
  state,
  frames: () => view?.frames ?? 0,
  async search(text: string, topK = 5) {
    if (!embedder) throw new Error("埋め込みがまだ動いていない");
    const [vec] = await embedder.embed([queryText(text)]);
    const byId = new Map(state.items.map((i) => [i.id, i]));
    return [...state.vectors]
      .map(([id, v]) => ({ title: byId.get(id)?.title ?? id, score: similarity(vec, v) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  },
};

main().catch((err) => {
  console.error(err);
  renderHudMessage("読み込みに失敗した。コンソールを確認する。");
});
