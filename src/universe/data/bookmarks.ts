import type { Bookmark } from '../../shared/types';

export async function getAllBookmarks(): Promise<Bookmark[]> {
  const tree = await chrome.bookmarks.getTree();
  const out: Bookmark[] = [];

  const walk = (node: chrome.bookmarks.BookmarkTreeNode, path: string[]): void => {
    if (node.url) {
      let hostname = '';
      try {
        hostname = new URL(node.url).hostname;
      } catch {
        // some bookmarks (e.g., chrome://) may fail; leave blank
      }
      out.push({
        id: node.id,
        title: node.title || hostname || node.url,
        url: node.url,
        hostname,
        dateAdded: node.dateAdded ?? Date.now(),
        folderPath: path.join('/'),
        parentId: node.parentId,
      });
      return;
    }
    if (node.children) {
      const nextPath = node.title ? [...path, node.title] : path;
      for (const child of node.children) walk(child, nextPath);
    }
  };

  for (const root of tree) walk(root, []);
  return out;
}

export function bookmarkEmbedText(b: Bookmark): string {
  const lines = [b.title, b.hostname, b.folderPath].filter(Boolean);
  return lines.join('\n');
}
