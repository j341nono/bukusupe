/**
 * 画面の言語の、ソースだけで確かめられる確認（SPEC 14 章。ブラウザは使わない）。
 *   node scripts/check-i18n.mjs [ソースの根]   （check:ext の中で動く。根を渡すと、別の版のソースを確かめられる）
 *
 *  1. 英語と日本語の辞書（src/i18n/en.ts・ja.ts）の項目の名前がすべてそろっている（片方にしかない項目が無い、空の文言が無い）
 *  2. 拡張機能の名前と説明文（public/_locales/en・ja）の項目がそろい、manifest が __MSG_…__ で引き、default_locale が en
 *  3. 星団名の大分類（src/embed/topic-categories.ts）が、すべて日本語と英語の名前を持つ
 *  4. src/ の画面の部品と index.html に、辞書を通さない日本語の文言が直接書かれていない。
 *     見ないもの：コメント、確認用の仕組み（src/debug/ と `if (__DEBUG__) { … }` の中）、開発者向けの記録（console.* と Error の文）、
 *     辞書そのもの（src/i18n/ja.ts・en.ts）と、画面の文言ではないデータ（下の DATA_FILES。理由つき）
 *  5. 英語と日本語の文言の一覧（docs/i18n-review.md）が、今の辞書から作ったものと同じ（`npm run i18n:review` で作り直す）
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { createChecker } from "./lib/harness.mjs";

const ROOT = resolve(process.argv[2] ?? new URL("..", import.meta.url).pathname);
const { check, problems } = createChecker();
const read = (path) => (existsSync(join(ROOT, path)) ? readFileSync(join(ROOT, path), "utf8") : null);
const JAPANESE = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー、。「」（）・！？＋]/u;

// --- 1. 辞書の項目 ---
const keysOf = (source) => source ? [...source.matchAll(/^\s*"([^"]+)":\s*"((?:[^"\\]|\\.)*)",?\s*$/gm)].map((m) => ({ key: m[1], text: m[2] })) : null;
const ja = keysOf(read("src/i18n/ja.ts"));
const en = keysOf(read("src/i18n/en.ts"));
{
  const jaKeys = new Set(ja?.map((e) => e.key) ?? []);
  const enKeys = new Set(en?.map((e) => e.key) ?? []);
  const onlyJa = [...jaKeys].filter((k) => !enKeys.has(k));
  const onlyEn = [...enKeys].filter((k) => !jaKeys.has(k));
  const empty = [...(ja ?? []), ...(en ?? [])].filter((e) => !e.text.trim()).map((e) => e.key);
  const japaneseInEn = (en ?? []).filter((e) => JAPANESE.test(e.text) && e.key !== "lang.ja").map((e) => e.key);
  check(!!ja && !!en && jaKeys.size > 50 && onlyJa.length === 0 && onlyEn.length === 0 && empty.length === 0 && japaneseInEn.length === 0,
    "英語と日本語の辞書の項目の名前がすべてそろい、空の文言や、英語の辞書に日本語の文言が無い",
    !ja || !en ? "辞書（src/i18n/ja.ts・en.ts）が無い"
      : `日本語 ${jaKeys.size}・英語 ${enKeys.size} 項目${onlyJa.length ? `・日本語だけ ${onlyJa.join(", ")}` : ""}${onlyEn.length ? `・英語だけ ${onlyEn.join(", ")}` : ""}` +
        `${empty.length ? `・空 ${empty.join(", ")}` : ""}${japaneseInEn.length ? `・英語に日本語 ${japaneseInEn.join(", ")}` : ""}`);
}

// --- 2. 拡張機能の名前と説明文（_locales） ---
{
  const json = (path) => { const text = read(path); try { return text ? JSON.parse(text) : null; } catch { return null; } };
  const manifest = json("public/manifest.json") ?? {};
  const loc = { en: json("public/_locales/en/messages.json"), ja: json("public/_locales/ja/messages.json") };
  const enKeys = Object.keys(loc.en ?? {}).sort().join(",");
  const jaKeys = Object.keys(loc.ja ?? {}).sort().join(",");
  const used = JSON.stringify(manifest).match(/__MSG_(\w+)__/g)?.map((m) => m.slice(6, -2)) ?? [];
  const missing = used.filter((k) => !loc.en?.[k]?.message || !loc.ja?.[k]?.message);
  const fields = ["name", "description"].filter((f) => !/^__MSG_\w+__$/.test(manifest[f] ?? ""));
  const desc = { en: loc.en?.extDescription?.message ?? "", ja: loc.ja?.extDescription?.message ?? "" };
  check(manifest.default_locale === "en" && !!loc.en && !!loc.ja && enKeys === jaKeys && missing.length === 0 && fields.length === 0 &&
    [...desc.en].length <= 132 && [...desc.ja].length <= 132 && !JAPANESE.test(loc.en?.extName?.message ?? "ア"),
    "拡張機能の名前と説明文を _locales（en・ja、既定は en）から引き、項目がそろい、説明文が 132 文字以内",
    `default_locale ${manifest.default_locale ?? "無し"}・en ${enKeys || "無し"}・ja ${jaKeys || "無し"}` +
      `${missing.length ? `・訳が無い ${missing.join(", ")}` : ""}${fields.length ? `・直書き ${fields.join(", ")}` : ""}` +
      `・説明 en ${[...desc.en].length}・ja ${[...desc.ja].length} 文字`);
}

// --- 3. 大分類の英語名 ---
{
  const source = read("src/embed/topic-categories.ts") ?? "";
  const rows = [...source.matchAll(/\{\s*id:\s*"([^"]+)",\s*ja:\s*"([^"]+)",\s*en:\s*"([^"]+)"/g)];
  const bad = rows.filter((m) => JAPANESE.test(m[3]) || !JAPANESE.test(m[2]) && m[2] !== m[3]).map((m) => m[1]);
  const words = (source.match(/words: "/g) ?? []).length;
  check(rows.length >= 10 && rows.length === words && bad.length === 0, "星団名の大分類が、すべて日本語と英語の名前を持つ",
    `大分類 ${rows.length}（語の並び ${words}）${bad.length ? `・合わない ${bad.join(", ")}` : ""}`);
}

// --- 4. 辞書を通さない日本語の文言 ---
/** 画面の文言ではないデータ（日本語を含んでよい）と、その理由 */
const DATA_FILES = {
  "src/i18n/ja.ts": "日本語の辞書",
  "src/i18n/en.ts": "英語の辞書（言語の名前「日本語」を含む）",
  "src/embed/domain-hints.ts": "埋め込みの入力に足す分野語（意味の計算に使う。画面には出ない）",
  "src/embed/topic-categories.ts": "星団名の大分類の辞書（日本語と英語の名前）と、埋め込みの分野語",
};

/** TypeScript のソースから、コメントを除いた文字列の中身を行番号つきで取り出す（簡単な字句の読み取り） */
function stringsOf(source) {
  const out = [];
  let i = 0, line = 1;
  const debugBlocks = [];
  for (const m of source.matchAll(/if \(__DEBUG__\) \{/g)) debugBlocks.push([m.index, closingBrace(source, m.index + m[0].length - 1)]);
  const inDebug = (at) => debugBlocks.some(([a, b]) => at >= a && at <= b);
  const lineText = (n) => source.split("\n")[n - 1] ?? "";
  while (i < source.length) {
    const c = source[i];
    if (c === "\n") { line++; i++; continue; }
    if (c === "/" && source[i + 1] === "/") { while (i < source.length && source[i] !== "\n") i++; continue; }
    if (c === "/" && source[i + 1] === "*") {
      const end = source.indexOf("*/", i + 2);
      line += (source.slice(i, end).match(/\n/g) ?? []).length;
      i = end + 2;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      const start = i, startLine = line;
      i++;
      let text = "";
      while (i < source.length && source[i] !== c) {
        if (source[i] === "\\") { text += source[i + 1]; i += 2; continue; }
        if (source[i] === "\n") line++;
        text += source[i++];
      }
      i++;
      const context = lineText(startLine);
      // 複数行のテンプレート文字列はシェーダー（GLSL）なので、その中のコメントも除く
      const body = c === "`" && text.includes("\n") ? text.replace(/\/\/[^\n]*/g, "") : text;
      if (!inDebug(start) && !/console\.\w+\(|Error\(/.test(context)) out.push({ line: startLine, text: body });
      continue;
    }
    i++;
  }
  return out;
}

function closingBrace(source, open) {
  let depth = 0;
  for (let i = open; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}" && --depth === 0) return i;
  }
  return source.length;
}

function* tsFiles(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) { if (entry.name !== "debug" && entry.name !== "data") yield* tsFiles(path); }
    else if (/\.ts$/.test(entry.name) && !entry.name.endsWith(".d.ts")) yield path;
  }
}

const found = [];
for (const path of tsFiles(join(ROOT, "src"))) {
  const rel = relative(ROOT, path).split("\\").join("/");
  if (DATA_FILES[rel]) continue;
  for (const { line, text } of stringsOf(readFileSync(path, "utf8"))) {
    if (JAPANESE.test(text)) found.push(`${rel}:${line} ${text.slice(0, 30)}`);
  }
}
const html = (read("index.html") ?? "")
  .replace(/<style[\s\S]*?<\/style>/g, "").replace(/<script[\s\S]*?<\/script>/g, "").replace(/<!--[\s\S]*?-->/g, "");
html.split("\n").forEach((text, i) => { if (JAPANESE.test(text)) found.push(`index.html（本文の ${i + 1} 行目） ${text.trim().slice(0, 30)}`); });
check(!!read("src/i18n/ja.ts") && found.length === 0, "src/ の画面の部品と index.html に、辞書を通さない日本語の文言が直接書かれていない",
  found.length ? `${found.length} 件：${found.slice(0, 5).join("・")}` : `除いたデータ ${Object.keys(DATA_FILES).length} 件`);

// --- 5. 文言の一覧（docs/i18n-review.md） ---
{
  const { renderI18nReview } = await import("./gen-i18n-review.mjs");
  let want = null;
  try { want = await renderI18nReview(ROOT); } catch { /* 辞書を読めなければ NG */ }
  const have = read("docs/i18n-review.md");
  check(!!want && have === want, "英語と日本語の文言の一覧（docs/i18n-review.md）が今の辞書と同じ",
    !have ? "一覧が無い" : !want ? "辞書を読めない" : have === want ? "同じ" : "違う（npm run i18n:review で作り直す）");
}

console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
