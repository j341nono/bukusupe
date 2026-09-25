import { loadBookmarks } from "./bookmarks";
import { provisionalLayout } from "./layout/provisional";
import { SpaceView } from "./render/scene";
import { renderHud, renderHudMessage } from "./ui/hud";

async function main(): Promise<void> {
  const canvas = document.getElementById("space") as HTMLCanvasElement | null;
  if (!canvas) throw new Error("canvas #space が見つからない");

  const view = new SpaceView(canvas);
  view.start();

  renderHudMessage("ブックマークを読み込んでいる…");
  const { kind, items } = await loadBookmarks();

  // M0 は仮配置。意味での配置は M2 で入れ替える。
  view.setLayout(provisionalLayout(items));
  renderHud(items.length, kind);

  document.getElementById("loading")?.remove();
}

main().catch((err) => {
  console.error(err);
  renderHudMessage("読み込みに失敗した。コンソールを確認する。");
});
