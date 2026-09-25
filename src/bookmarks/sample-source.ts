import type { BookmarkItem } from "./types";
import sample from "../data/sample-bookmarks.json";

/**
 * 開発用・デモのフォールバック用のサンプル 150 件。
 * fetch せず bundle に取り込む（外部からプログラムもデータも取らない）。
 */
export function loadSampleBookmarks(): BookmarkItem[] {
  return sample as BookmarkItem[];
}
