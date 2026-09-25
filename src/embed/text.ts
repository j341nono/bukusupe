import type { BookmarkItem } from "../bookmarks/types";
import { domainOf } from "../bookmarks/types";
import { hintsFor } from "./domain-hints";

/** URL のパスを記号で区切って単語にする（SPEC 6 章）。 */
export function pathWords(url: string): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return "";
  }
  let raw = parsed.pathname;
  try {
    raw = decodeURIComponent(raw);
  } catch {
    /* 壊れた％表記はそのまま */
  }
  const words = raw
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w.length > 0)
    .filter((w) => !/^\d+$/.test(w))          // 記事番号などは意味を持たない
    .filter((w) => w.length <= 24)            // ハッシュらしき長い塊を落とす
    .filter((w) => !/^[0-9a-f]{12,}$/i.test(w));
  return [...new Set(words)].slice(0, 12).join(" ");
}

/**
 * ブックマーク側の入力文（SPEC 6 章）。
 *   passage: {タイトル} | {フォルダの完全なパス} | {ドメイン} {分野の語} {URL の単語}
 * 接頭辞は必須。multilingual-e5 は passage / query の区別で精度が変わる。
 */
export function passageText(item: BookmarkItem): string {
  const domain = domainOf(item.url);
  const hints = hintsFor(domain);
  const tail = [domain, hints, pathWords(item.url)].filter(Boolean).join(" ");
  const folder = item.folderPath.join(" / ");
  return `passage: ${item.title} | ${folder} | ${tail}`;
}

/** 検索語側の入力文。 */
export function queryText(text: string): string {
  return `query: ${text}`;
}

/** 入力文が変わったかどうかの判定用。FNV-1a。 */
export function textHash(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16);
}
