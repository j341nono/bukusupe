import type { BookmarkItem } from "./types";
import { parseBookmarkItem } from "./validate";
import sample from "../data/sample-bookmarks.json";

/**
 * 開発用・デモのフォールバック用のサンプル 150 件。
 * fetch せず bundle に取り込む（外部からプログラムもデータも取らない）。
 */
/**
 * サンプルの日時（追加日・最終利用日）を作った基準日：2026-09-26 12:00（日本時間）。
 * サンプルでは、星の新しさを測る「今日」をこの日に固定する（`src/today.ts`）。
 */
export const SAMPLE_TODAY = Date.parse("2026-09-26T12:00:00+09:00");

export function loadSampleBookmarks(): BookmarkItem[] {
  // 同梱のデータでも、同じ判定を通す（http(s) だけ）
  return (sample as unknown[]).map(parseBookmarkItem).filter((item): item is BookmarkItem => item !== null);
}
