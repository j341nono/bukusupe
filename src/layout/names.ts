import type { BookmarkItem } from "../bookmarks/types";
import { domainOf } from "../bookmarks/types";
import { DOMAIN_HINTS, hintsFor } from "../embed/domain-hints";
import { BROAD_CATEGORIES, TOPIC_CATEGORY, broadCategory } from "../embed/topic-categories";

for (const word of new Set(Object.values(DOMAIN_HINTS).flatMap((v) => v.split(/\s+/).filter(Boolean)))) {
  if (!TOPIC_CATEGORY.has(word)) throw new Error(`分野語に大分類がない: ${word}`);
}

/** 代表の数（螺旋の内側）。この中で分野語が揃えば、それを星団の名前にする。 */
const LEADERS = 4;
const LEADER_AGREE = 2;

/** 分野を表さないフォルダ名。星団の名前には使わない。 */
const IGNORED_FOLDERS = new Set([
  "あとで読む", "あとでよむ", "後で読む", "後でよむ", "その他", "未分類", "未整理", "雑",
  "ブックマーク バー", "ブックマークバー", "お気に入り", "その他のブックマーク",
  "モバイルのブックマーク", "同期したタブ", "新しいフォルダ",
  "Bookmarks bar", "Bookmarks Bar", "Other bookmarks", "Other Bookmarks",
  "Mobile bookmarks", "Reading list", "Read later", "Unsorted", "Misc", "New folder",
]);

type Tally = { key: string; n: number };

/** 多い順。同数のときは名前の順で決める（毎回同じ結果にするため）。 */
function tally(values: string[]): Tally[] {
  const map = new Map<string, number>();
  for (const v of values) {
    if (!v) continue;
    map.set(v, (map.get(v) ?? 0) + 1);
  }
  return [...map].map(([key, n]) => ({ key, n })).sort((a, b) => b.n - a.n || (a.key < b.key ? -1 : 1));
}

const folderTally = (members: BookmarkItem[]): Tally[] =>
  tally(members.map((m) => m.folderPath.at(-1) ?? "")
    .filter((f) => !IGNORED_FOLDERS.has(f) && BROAD_CATEGORIES.includes(f)));

/** ドメインの分野語を大分類に直し、タイトルからは大分類の語だけを拾う。 */
function hintsOf(item: BookmarkItem): string[] {
  const fromDomain = hintsFor(domainOf(item.url)).split(/\s+/).map(broadCategory).filter((w): w is string => !!w);
  const fromTitle = BROAD_CATEGORIES.filter((w) => item.title.includes(w));
  return [...new Set([...fromDomain, ...fromTitle])];
}

/** 大分類の集計。フォルダで決まらないときに使う。 */
const hintTally = (members: BookmarkItem[]): Tally[] => tally(members.flatMap(hintsOf));

/**
 * 星団の名前（SPEC 7 章 ＋ 調整）。
 * 1 位のフォルダが半分以上ならそれ。半分未満で 2 位が 1 位の 6 割以上なら「1 位・2 位」。
 * フォルダで決まらないときは大分類、最後は「無名の星団 N」。
 * 同じ名前が残ったら、別の大分類を足して区別する。
 */
export function clusterNames(groups: BookmarkItem[][]): string[] {
  const names = groups.map((members, index) => {
    if (members.length === 0) return `無名の星団 ${index + 1}`;

    // 代表 4 件のうち 2 件以上が同じ大分類を持つなら、フォルダの多数決より優先する
    const leaders = members.slice(0, LEADERS);
    const shared = tally(leaders.flatMap(hintsOf)).filter((h) => h.n >= LEADER_AGREE);
    if (shared[0]) return shared[0].key;

    const folders = folderTally(members);
    const [top, second] = folders;

    if (top) {
      const share = top.n / members.length;
      if (share >= 0.5) return top.key;
      if (second && second.n >= top.n * 0.6) return `${top.key}・${second.key}`;
      if (share >= 0.3) return top.key;
    }

    const hint = hintTally(members)[0];
    if (hint) return hint.key;

    return `無名の星団 ${index + 1}`;
  });

  // 同名が残ったら、その星団の 2 番目に多い分野の語で区別する
  const seen = new Map<string, number[]>();
  names.forEach((name, i) => {
    const list = seen.get(name);
    if (list) list.push(i);
    else seen.set(name, [i]);
  });
  for (const [, indices] of seen) {
    if (indices.length < 2) continue;
    for (const i of indices) {
      const hints = hintTally(groups[i]).filter((h) => !names[i].includes(h.key));
      names[i] = hints[1] ? `${names[i]}・${hints[1].key}` : hints[0] ? `${names[i]}・${hints[0].key}` : `${names[i]} ${i + 1}`;
    }
  }
  return names;
}
