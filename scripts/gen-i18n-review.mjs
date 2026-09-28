/**
 * 画面の英語と日本語の文言を並べた一覧を docs/i18n-review.md に書き出す（英語の文言を読み合わせるための資料）。
 *   node scripts/gen-i18n-review.mjs   （npm run i18n:review）
 * 辞書（src/i18n/en.ts・ja.ts）、星団名の大分類（src/embed/topic-categories.ts）、拡張機能の名前と説明（public/_locales）を並べる。
 * 辞書を変えたら作り直す（作り直していないと check-i18n の 5 が NG にする）。
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

/** 一覧の本文を作る（root はソースの根） */
export async function renderI18nReview(root) {
const ROOT = root;
const { default: en } = await import(join(ROOT, "src/i18n/en.ts"));
const { default: ja } = await import(join(ROOT, "src/i18n/ja.ts"));
const { CATEGORIES } = await import(join(ROOT, "src/embed/topic-categories.ts"));
const locales = Object.fromEntries(["en", "ja"].map((lang) =>
  [lang, JSON.parse(readFileSync(join(ROOT, "public/_locales", lang, "messages.json"), "utf8"))]));

/** 表の升に入れる形（| と改行を崩さない） */
const cell = (text) => String(text ?? "").replace(/\|/g, "\\|").replace(/\n/g, "<br>");
const table = (head, rows) => [`| ${head.join(" | ")} |`, `|${head.map(() => "---").join("|")}|`,
  ...rows.map((row) => `| ${row.map(cell).join(" | ")} |`)].join("\n");

const keys = Object.keys(ja);
const groups = new Map();
for (const key of keys) {
  const group = key.split(".")[0];
  groups.set(group, [...(groups.get(group) ?? []), key]);
}

const out = [
  "# 画面の文言の一覧（英語と日本語）",
  "",
  "英語の文言を読み合わせるための資料。`node scripts/gen-i18n-review.mjs`（`npm run i18n:review`）で辞書から作る。**手で直さない**（辞書を直して作り直す）。",
  "",
  "- 辞書：`src/i18n/en.ts`・`ja.ts`（" + keys.length + " 項目）。`{name}` は差し込む値、`[[W]]` はキーの表示、`#one` で終わる項目は英語の単数形。",
  "- 星団名の大分類：`src/embed/topic-categories.ts`。拡張機能の名前と説明：`public/_locales/`（Chrome 自体の言語で選ばれる）。",
  "",
  "## 拡張機能の名前と説明（`public/_locales`）",
  "",
  table(["項目", "English", "日本語"], Object.keys(locales.en).map((key) => [`\`${key}\``, locales.en[key].message, locales.ja[key]?.message])),
  "",
  "## 星団名の大分類",
  "",
  table(["id", "English", "日本語"], CATEGORIES.map((c) => [`\`${c.id}\``, c.en, c.ja])),
  "",
  "## 辞書",
  "",
];
for (const [group, list] of groups) {
  out.push(`### ${group}`, "", table(["項目", "English", "日本語"], list.map((key) => [`\`${key}\``, en[key], ja[key]])), "");
}
return out.join("\n");
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = resolve(new URL("..", import.meta.url).pathname);
  writeFileSync(join(root, "docs/i18n-review.md"), await renderI18nReview(root));
  console.log("docs/i18n-review.md を書き出した");
}
