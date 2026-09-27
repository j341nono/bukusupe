import type { BookmarkItem } from "./types";
import { parseBookmarkItem } from "./validate";

/**
 * chrome.bookmarks から読み取るだけ。**書き換え系の API は使わない**
 * （SPEC 4 章：審査員の本物のブックマークを消す事故を防ぐ）。
 */
export function hasChromeBookmarks(): boolean {
  return typeof chrome !== "undefined" && !!chrome.bookmarks?.getTree;
}

export async function loadChromeBookmarks(): Promise<BookmarkItem[]> {
  const roots = await chrome.bookmarks.getTree();
  const items: BookmarkItem[] = [];

  const walk = (node: chrome.bookmarks.BookmarkTreeNode, path: string[]) => {
    if (node.url) {
      // http(s) だけを星にする（ブックマークレット・data:・file:・chrome:// などは読み飛ばす。判定は validate.ts の 1 か所）
      const item = parseBookmarkItem({ id: node.id, title: node.title, url: node.url, folderPath: path,
        dateAdded: node.dateAdded, dateLastUsed: (node as { dateLastUsed?: number }).dateLastUsed });
      if (item) items.push(item);
      return;
    }
    // ルート（id "0"）と「ブックマークバー」などの直下は、名前をパスに入れる。
    // ただし一番外側の無名ルートだけは飛ばす。
    const nextPath = node.title ? [...path, node.title] : path;
    for (const child of node.children ?? []) walk(child, nextPath);
  };

  for (const root of roots) walk(root, []);
  return items;
}
