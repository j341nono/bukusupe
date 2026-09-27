import type { BookmarkItem } from "./types";

/**
 * ブックマークとして扱ってよい値かどうかの判定（docs/SECURITY.md）。1 か所にまとめ、読み込む側（Chrome のデータ源・サンプル・
 * 確認用の注入・段階 5 のバックアップの読み込み）と、ページを開く側（`src/ui/open-page.ts`）の両方で使う。
 */

/** URL の長さの上限（これより長いものは星にしない・開かない） */
export const MAX_URL_LENGTH = 32_768;
/** タイトル・フォルダ名の長さの上限（表示は別に省略する。保存と計算を重くしないため） */
export const MAX_TEXT_LENGTH = 4_096;

/** ページとして開いてよい URL か：http: と https: だけ。javascript:・data:・file:・chrome: などは開かない */
export function isOpenableUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.length === 0 || value.length > MAX_URL_LENGTH) return false;
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

const isDate = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value) && value > 0;

/**
 * 外から来た値を、ブックマーク 1 件として確かめる。合わなければ null。
 * id と URL は必須。タイトルが無ければ URL を使う。長すぎる文字列は切り詰める。日時は正の有限な数だけを残す。
 */
export function parseBookmarkItem(value: unknown): BookmarkItem | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  if (typeof row.id !== "string" || row.id.length === 0 || row.id.length > 256) return null;
  if (!isOpenableUrl(row.url)) return null;
  const title = typeof row.title === "string" && row.title.length > 0 ? row.title : row.url;
  const folderPath = Array.isArray(row.folderPath) ? row.folderPath.filter((name): name is string => typeof name === "string") : [];
  return {
    id: row.id,
    title: title.slice(0, MAX_TEXT_LENGTH),
    url: row.url,
    folderPath: folderPath.map((name) => name.slice(0, MAX_TEXT_LENGTH)),
    ...(isDate(row.dateAdded) ? { dateAdded: row.dateAdded } : {}),
    ...(isDate(row.dateLastUsed) ? { dateLastUsed: row.dateLastUsed } : {}),
  };
}
