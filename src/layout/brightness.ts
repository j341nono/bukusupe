import type { BookmarkItem } from "../bookmarks/types";

/**
 * 星の明るさ＝最近使ったか（SPEC 7 章）。
 * dateLastUsed が無いときは中間の明るさにし、「未使用」と断定しない。
 */
export function brightnessOf(item: BookmarkItem, now = Date.now()): number {
  if (!item.dateLastUsed) return 0.55;
  const days = (now - item.dateLastUsed) / 86400000;
  if (days <= 7) return 1;
  if (days >= 365) return 0.35;
  return 1 - 0.65 * ((Math.log(days) - Math.log(7)) / (Math.log(365) - Math.log(7)));
}
