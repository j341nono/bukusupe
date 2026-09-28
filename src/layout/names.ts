import type { BookmarkItem } from "../bookmarks/types";
import { domainOf } from "../bookmarks/types";
import { DOMAIN_HINTS, hintsFor } from "../embed/domain-hints";
import { CATEGORY_BY_ID, TOPIC_CATEGORY, broadCategory, categoriesInTitle, categoryNamed } from "../embed/topic-categories";

for (const word of new Set(Object.values(DOMAIN_HINTS).flatMap((v) => v.split(/\s+/).filter(Boolean)))) {
  if (!TOPIC_CATEGORY.has(word)) throw new Error(`分野語に大分類がない: ${word}`);
}

/** 代表の数（螺旋の内側）。この中で分野語が揃えば、それを星団の名前にする。 */
const LEADERS = 4;
const LEADER_AGREE = 2;

/**
 * 保存する星団名の形（言語に依らない）。表示のときに `clusterLabel()`（src/i18n/cluster.ts）が画面の言語に直す。
 * - `{dev}`：大分類（id）。`{dev}+{ai}` は 2 つを並べた名前
 * - `#3`：同じ名前を区別する番号（`{dev}#3`）
 * - `{unnamed}#3`：無名の星団 3
 */
export const categoryToken = (id: string): string => `{${id}}`;
export const UNNAMED = "{unnamed}";
/** 仮の配置（埋め込みの前）で、フォルダもドメインも無い星をまとめる名前 */
export const OTHER = "{other}";

type Tally = { key: string; n: number };

/** 同数のときの順：大分類の日本語の名前の順（大分類を id にする前と同じ結果にするため） */
const orderName = (key: string): string => CATEGORY_BY_ID.get(key)?.ja ?? key;

/** 多い順。同数のときは名前の順で決める（毎回同じ結果にするため）。 */
function tally(values: string[]): Tally[] {
  const map = new Map<string, number>();
  for (const v of values) {
    if (!v) continue;
    map.set(v, (map.get(v) ?? 0) + 1);
  }
  return [...map].map(([key, n]) => ({ key, n }))
    .sort((a, b) => b.n - a.n || (orderName(a.key) < orderName(b.key) ? -1 : 1));
}

/** フォルダ名は、大分類の名前（日本語か英語）と同じときだけ、その大分類として数える（分野を表さないフォルダ名は使わない） */
const folderTally = (members: BookmarkItem[]): Tally[] =>
  tally(members.map((m) => categoryNamed(m.folderPath.at(-1) ?? "") ?? ""));

/** ドメインの分野語を大分類に直し、タイトルからは大分類の名前だけを拾う。 */
function hintsOf(item: BookmarkItem): string[] {
  const fromDomain = hintsFor(domainOf(item.url)).split(/\s+/).map(broadCategory).filter((w): w is string => !!w);
  const fromTitle = categoriesInTitle(item.title);
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
    if (members.length === 0) return `${UNNAMED}#${index + 1}`;

    // 代表 4 件のうち 2 件以上が同じ大分類を持つなら、フォルダの多数決より優先する
    const leaders = members.slice(0, LEADERS);
    const shared = tally(leaders.flatMap(hintsOf)).filter((h) => h.n >= LEADER_AGREE);
    if (shared[0]) return categoryToken(shared[0].key);

    const folders = folderTally(members);
    const [top, second] = folders;

    if (top) {
      const share = top.n / members.length;
      if (share >= 0.5) return categoryToken(top.key);
      if (second && second.n >= top.n * 0.6) return `${categoryToken(top.key)}+${categoryToken(second.key)}`;
      if (share >= 0.3) return categoryToken(top.key);
    }

    const hint = hintTally(members)[0];
    if (hint) return categoryToken(hint.key);

    return `${UNNAMED}#${index + 1}`;
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
      const hints = hintTally(groups[i]).filter((h) => !names[i].includes(categoryToken(h.key)));
      const extra = hints[1] ?? hints[0];
      names[i] = extra ? `${names[i]}+${categoryToken(extra.key)}` : `${names[i]}#${i + 1}`;
    }
  }
  return names;
}
