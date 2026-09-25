import type { BookmarkSnapshot } from "./types";
import { hasChromeBookmarks, loadChromeBookmarks } from "./chrome-source";
import { loadSampleBookmarks } from "./sample-source";

/**
 * データ源を決めて読み込む。
 * - 拡張機能として動いていれば Chrome のブックマーク
 * - 開発サーバー（chrome.bookmarks が無い）ならサンプル
 * - `?sample=1` を付けると拡張機能内でもサンプルに切り替わる（デモのフォールバック）
 */
export async function loadBookmarks(): Promise<BookmarkSnapshot> {
  const forced = new URLSearchParams(location.search).get("sample");
  if (forced !== "1" && hasChromeBookmarks()) {
    try {
      const items = await loadChromeBookmarks();
      if (items.length > 0) return { kind: "chrome", items };
    } catch (err) {
      console.warn("[ブクスペ] ブックマークを読めなかったのでサンプルに切り替える", err);
    }
  }
  return { kind: "sample", items: loadSampleBookmarks() };
}

export * from "./types";
