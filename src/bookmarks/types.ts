/** 画面が扱うブックマーク 1 件。Chrome 由来でもサンプル由来でもこの形にそろえる。 */
export type BookmarkItem = {
  id: string;
  title: string;
  url: string;
  /** ルートからのフォルダ名の並び（ルート直下は空配列） */
  folderPath: string[];
  dateAdded?: number;
  /** Chrome 114 以降。無い場合がある（「未使用」と断定しない） */
  dateLastUsed?: number;
};

export type BookmarkSourceKind = "chrome" | "sample";

export type BookmarkSnapshot = {
  kind: BookmarkSourceKind;
  items: BookmarkItem[];
};

export const folderPathString = (item: BookmarkItem): string =>
  item.folderPath.join(" / ");

export function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}
