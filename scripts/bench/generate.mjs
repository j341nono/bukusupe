/**
 * 測定用のブックマークの一覧を作る（決定的。同じ件数なら毎回同じ）。docs/BENCHMARK.md「生成の方法と限界」。
 *
 * - 100 件：生成せず、サンプル 156 件から、先頭のフォルダ（分野）の比率を保って選ぶ。
 * - 500 件以上：サンプル 156 件をすべて含め、残りを生成する。生成する 1 件は、
 *   元の 1 件（サンプルを順に巡る。分野の比率がサンプルと同じになる）と、同じフォルダの相手の 1 件を組み合わせる。
 *   タイトルは元の見出し＋相手の見出し・添え語のどれかの形、URL は元のドメイン＋相手のパスの語＋通し番号、
 *   フォルダは元と同じ、日時は元の日時を少しずらす。埋め込みは実際に計算するので、ベクトルの複製ではない。
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./lib.mjs";

export const SAMPLE = JSON.parse(readFileSync(join(ROOT, "src/data/sample-bookmarks.json"), "utf8"));

/** 種を固定した乱数（mulberry32） */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const topOf = (item) => item.folderPath[0] ?? "(ルート)";
const folderOf = (item) => item.folderPath.join("/") || "(ルート)";

/** タイトルの見出し（区切り記号の前）と、区切りの後ろ */
function splitTitle(title) {
  const parts = title.split(/\s*[|｜–—:：]\s*|\s+-\s+/).filter(Boolean);
  return { head: parts[0] ?? title, tail: parts.slice(1).join(" ") || null };
}

const MODIFIERS = ["入門", "まとめ", "比較", "メモ", "事例", "チェックリスト", "よくある質問", "最新情報", "ガイド", "読書記録",
  "つまずいた点", "始め方", "おすすめ", "振り返り", "Tips", "手順", "考え方", "リンク集", "解説", "実践"];

function pathWords(url) {
  try {
    return new URL(url).pathname.split(/[/._-]+/).filter((w) => /^[a-z][a-z0-9]{2,}$/i.test(w)).slice(0, 2);
  } catch { return []; }
}

function hostOf(url) {
  try { return new URL(url).hostname; } catch { return "example.com"; }
}

/** 100 件：分野の比率を保って選ぶ（最大剰余法。各分野の中は id の順） */
function subset(n) {
  const groups = new Map();
  for (const item of SAMPLE) groups.set(topOf(item), [...(groups.get(topOf(item)) ?? []), item]);
  const quotas = [...groups].map(([key, items]) => ({ key, items, exact: (items.length * n) / SAMPLE.length }));
  for (const q of quotas) q.count = Math.floor(q.exact);
  let left = n - quotas.reduce((s, q) => s + q.count, 0);
  for (const q of [...quotas].sort((a, b) => (b.exact - b.count) - (a.exact - a.count) || (a.key < b.key ? -1 : 1))) {
    if (left-- <= 0) break;
    q.count++;
  }
  return quotas.flatMap((q) => q.items.slice(0, q.count));
}

export function dataset(n) {
  if (n <= SAMPLE.length) return subset(n);
  const random = rng(20260927 + n);
  const byFolder = new Map();
  for (const item of SAMPLE) byFolder.set(folderOf(item), [...(byFolder.get(folderOf(item)) ?? []), item]);
  const items = SAMPLE.map((item) => ({ ...item }));
  for (let i = 0; items.length < n; i++) {
    const base = SAMPLE[i % SAMPLE.length];
    const mates = byFolder.get(folderOf(base)).filter((item) => item !== base);
    const partner = mates.length ? mates[Math.floor(random() * mates.length)] : base;
    const b = splitTitle(base.title), p = splitTitle(partner.title);
    const modifier = MODIFIERS[Math.floor(random() * MODIFIERS.length)];
    const form = Math.floor(random() * 3);
    const title = form === 0 ? `${b.head} ${modifier}`
      : form === 1 ? `${p.head} と ${b.head}`
        : `${b.head} – ${p.tail ?? modifier}`;
    const words = pathWords(partner.url);
    const url = `https://${hostOf(base.url)}/${[...words, (i + 1).toString(36)].join("/")}`;
    const shift = Math.floor((random() - 0.5) * 60 * 86_400_000);   // ±30 日
    items.push({ id: `g${n}-${i}`, title, url, folderPath: base.folderPath.slice(),
      ...(base.dateAdded ? { dateAdded: base.dateAdded + shift } : {}),
      ...(base.dateLastUsed ? { dateLastUsed: Math.max(base.dateLastUsed + shift, (base.dateAdded ?? 0) + shift + 1) } : {}) });
  }
  return items;
}

/** 生成した一覧の性質（報告書の「生成の方法と限界」に使う） */
export function describe(items) {
  const lengths = items.map((item) => [...item.title].length).sort((a, b) => a - b);
  const q = (p) => lengths[Math.min(lengths.length - 1, Math.floor(p * lengths.length))];
  const tops = {};
  for (const item of items) tops[topOf(item)] = (tops[topOf(item)] ?? 0) + 1;
  return { count: items.length, generated: items.filter((item) => item.id.startsWith("g")).length,
    titleLength: { median: q(0.5), p90: q(0.9), max: lengths.at(-1) },
    uniqueTitles: new Set(items.map((item) => item.title)).size,
    uniqueHosts: new Set(items.map((item) => hostOf(item.url))).size,
    topFolders: tops };
}
