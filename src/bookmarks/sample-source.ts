import type { Lang } from "../i18n";
import type { BookmarkItem } from "./types";
import { parseBookmarkItem } from "./validate";
import sampleJa from "../data/sample-bookmarks.json";
import sampleEn from "../data/sample-bookmarks.en.json";

/**
 * 開発用・デモのフォールバック用のサンプル 156 件（日本語・英語それぞれ）。
 * fetch せず bundle に取り込む（外部からプログラムもデータも取らない）。
 * 画面の言語ごとに別のサンプル（ブックマークのタイトルが画面の言語と合うように。段階 3c）。
 */
const SAMPLE_BY_LANG: Record<Lang, unknown[]> = { ja: sampleJa, en: sampleEn };

/**
 * サンプルの日時（追加日・最終利用日）を作った基準日：2026-09-26 12:00（日本時間）。
 * サンプルでは、星の新しさを測る「今日」をこの日に固定する（`src/today.ts`）。日本語・英語で同じ基準日を使う。
 */
export const SAMPLE_TODAY = Date.parse("2026-09-26T12:00:00+09:00");

export function loadSampleBookmarks(lang: Lang): BookmarkItem[] {
  // 同梱のデータでも、同じ判定を通す（http(s) だけ）
  return SAMPLE_BY_LANG[lang].map(parseBookmarkItem).filter((item): item is BookmarkItem => item !== null);
}
