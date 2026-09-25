import type { BookmarkItem } from "../bookmarks/types";
import { domainOf } from "../bookmarks/types";

/**
 * 星団の名前（SPEC 7 章）。
 * メンバーに最も多いフォルダ名（30% 以上）→ 最も多いドメイン →「無名の星団 N」。
 * すべてブラウザ内で決める。
 */
export function clusterName(members: BookmarkItem[], index: number): string {
  const folders = count(members.map((m) => m.folderPath.at(-1) ?? ""));
  const topFolder = folders[0];
  if (topFolder && topFolder.key && topFolder.n / members.length >= 0.3) return topFolder.key;

  const domains = count(members.map((m) => domainOf(m.url)));
  const topDomain = domains[0];
  if (topDomain && topDomain.key) return topDomain.key;

  return `無名の星団 ${index + 1}`;
}

/** 多い順。同数のときは名前の順で決める（毎回同じ結果にするため）。 */
function count(values: string[]): { key: string; n: number }[] {
  const map = new Map<string, number>();
  for (const v of values) {
    if (!v) continue;
    map.set(v, (map.get(v) ?? 0) + 1);
  }
  return [...map]
    .map(([key, n]) => ({ key, n }))
    .sort((a, b) => b.n - a.n || (a.key < b.key ? -1 : 1));
}
