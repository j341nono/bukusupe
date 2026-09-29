/**
 * ストアに出す掲載文・申告・画像の確認（docs/RELEASE.md 段階 3）。
 *   node scripts/check-store.mjs   （check:ext の中で動く。配布用の dist/ の manifest を使う）
 *
 *  1. 掲載文（docs/store/listing.en.md が主、listing.ja.md）：名前が 75 文字以内で、その言語の _locales の extName と同じ、
 *     短い説明が 132 文字以内で extDescription と同じ、詳しい説明にプライバシーポリシーの URL がある
 *  2. 申告（docs/store/privacy-practices.md・privacy-practices.en.md）：権限の説明の表が、配布用の manifest の権限と 1 対 1 で対応している
 *  3. インストール時の警告（chrome.management.getPermissionWarningsByManifest で、配布用の manifest から実際に求める）の文言が、
 *     Chrome の言語の申告の「インストール時の警告」の欄にすべてそのまま書かれていて、余分も無い。
 *     もう一方の言語の欄は、同じ数の警告が同じ権限に対応していることを確かめる（macOS のヘッドレス Chrome は言語を変えられないため）
 *  4. 掲載用の画像（docs/store/assets/）の大きさが、ストアの決まり（1280×800・440×280・1400×560・128×128）に合っている。
 *     スクリーンショットは英語（en/）と日本語（ja/）の 2 組
 */
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { createChecker, decodePng, launchExtension } from "./lib/harness.mjs";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const STORE = join(ROOT, "docs/store");
const { check, problems } = createChecker();
const manifest = JSON.parse(readFileSync(join(ROOT, "dist/manifest.json"), "utf8"));
const read = (name) => (existsSync(join(STORE, name)) ? readFileSync(join(STORE, name), "utf8") : "");
const block = (text, name) => text.match(new RegExp(`<!-- ${name}:start -->\\n([\\s\\S]*?)\\n<!-- ${name}:end -->`))?.[1]?.trim() ?? null;
const chars = (s) => [...(s ?? "")].length;

// --- 1. 掲載文（英語が主。manifest の name・description は _locales から引く） ---
/** manifest の値。__MSG_x__ なら、その言語の _locales の値 */
const localized = (value, lang) => {
  const key = /^__MSG_(\w+)__$/.exec(value ?? "")?.[1];
  if (!key) return value;
  const path = join(ROOT, "dist/_locales", lang, "messages.json");
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf8"))[key]?.message : undefined;
};
for (const [lang, label] of [["en", "英語"], ["ja", "日本語"]]) {
  const listing = read(`listing.${lang}.md`);
  const name = block(listing, "name");
  const summary = block(listing, "summary");
  const description = block(listing, "description");
  const wantName = localized(manifest.name, lang);
  const wantSummary = localized(manifest.description, lang);
  check(name && chars(name) <= 75 && name === wantName, `${label}の掲載文の名前が 75 文字以内で、manifest（_locales/${lang}）の name と同じ`,
    `${chars(name)} 文字・manifest ${name === wantName ? "と同じ" : `と違う（${wantName}）`}`);
  check(summary && chars(summary) <= 132 && summary === wantSummary, `${label}の掲載文の短い説明が 132 文字以内で、manifest（_locales/${lang}）の description と同じ`,
    `${chars(summary)} 文字・manifest ${summary === wantSummary ? "と同じ" : "と違う"}`);
  check(description && chars(description) > 300 && description.includes("https://j341nono.github.io/bukusupe/privacy-policy.html"),
    `${label}の詳しい説明があり、プライバシーポリシーのページへ行ける`, `${chars(description)} 文字`);
}
check(manifest.default_locale === "en", "主の掲載は英語（manifest の default_locale が en）", manifest.default_locale ?? "無し");

// --- 2. 権限の説明の表（日本語を添えた版と、英語だけの版） ---
const practices = { ja: read("privacy-practices.md"), en: read("privacy-practices.en.md") };
const wanted = [...(manifest.permissions ?? []), ...(manifest.host_permissions ?? [])];
for (const [lang, file] of [["ja", "privacy-practices.md"], ["en", "privacy-practices.en.md"]]) {
  const table = block(practices[lang], "permissions") ?? "";
  const described = [...table.matchAll(/^\|\s*`([^`]+)`\s*\|/gm)].map((m) => m[1]);
  const missing = wanted.filter((p) => !described.includes(p));
  const extra = described.filter((p) => !wanted.includes(p));
  check(described.length > 0 && missing.length === 0 && extra.length === 0,
    `申告（${file}）の権限の説明が、配布用の manifest の権限と 1 対 1 で対応している`,
    `manifest ${wanted.join(", ")}・説明 ${described.join(", ")}${missing.length ? `・説明が無い ${missing.join(", ")}` : ""}${extra.length ? `・余分 ${extra.join(", ")}` : ""}`);
}

// --- 3. インストール時の警告 ---
/** 欄の各行：文言（日本語は「…」、英語は "…"）と、その行が説明する権限 */
const warningLines = (lang) => [...(block(practices[lang], "warnings") ?? "").matchAll(lang === "ja" ? /^- 「(.+?)」(.*)$/gm : /^- "(.+?)"(.*)$/gm)]
  .map((m) => ({ text: m[1], permission: /`([^`]+)`/.exec(m[2])?.[1] ?? null }));
let actual = null, uiLanguage = "";
const app = await launchExtension(join(ROOT, "dist"), { query: "", autoConsent: false });
try {
  actual = JSON.parse((await app.tryEval(`(async () => JSON.stringify(
    await chrome.management.getPermissionWarningsByManifest(${JSON.stringify(JSON.stringify(manifest))})))()`)) ?? "null");
  uiLanguage = (await app.tryEval("chrome.i18n.getUILanguage()")) ?? "";
} finally {
  await app.close();
}
const chromeLang = /^ja/i.test(uiLanguage) ? "ja" : "en";
const written = warningLines(chromeLang).map((w) => w.text);
const notWritten = (actual ?? []).filter((w) => !written.includes(w));
const stale = written.filter((w) => !(actual ?? []).includes(w));
check(Array.isArray(actual) && actual.length > 0 && notWritten.length === 0 && stale.length === 0,
  `インストール時の警告の文言（配布用の manifest から、${chromeLang === "ja" ? "日本語" : "英語"}の Chrome で実際に求めたもの）が、申告の説明とそろっている`,
  `Chrome の言語 ${uiLanguage}・実際 ${JSON.stringify(actual)}${notWritten.length ? `・説明に無い ${notWritten.join("／")}` : ""}${stale.length ? `・実際には出ない ${stale.join("／")}` : ""}`);
const other = chromeLang === "ja" ? "en" : "ja";
const perms = (lang) => warningLines(lang).map((w) => w.permission).sort().join(",");
check(warningLines(other).length === (actual ?? []).length && perms(other) === perms(chromeLang) && !perms(other).split(",").includes(""),
  `もう一方の言語（${other === "ja" ? "日本語" : "英語"}）の警告の欄も、同じ数の警告が同じ権限に対応している`,
  `${other} ${perms(other) || "無し"}・${chromeLang} ${perms(chromeLang) || "無し"}`);

// --- 4. 画像の大きさ ---
/** PNG の大きさ（IHDR）。PNG でなければ null */
function pngSize(path) {
  if (!existsSync(path)) return null;
  const b = readFileSync(path);
  if (b.length < 24 || b.readUInt32BE(0) !== 0x89504e47) return null;
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}
const SCREENSHOTS = ["screenshot-1-map.png", "screenshot-2-search.png", "screenshot-3-constellation.png", "screenshot-4-selection.png", "screenshot-5-flight.png"];
const images = [
  ...["en", "ja"].flatMap((lang) => SCREENSHOTS.map((file) => [`${lang}/${file}`, 1280, 800])),
  ["promo-small-440x280.png", 440, 280], ["promo-marquee-1400x560.png", 1400, 560], ["icon-128.png", 128, 128],
];
const sizes = images.map(([file, w, h]) => ({ file, want: `${w}×${h}`, size: pngSize(join(STORE, "assets", file)) }));
const wrong = sizes.filter((s) => !s.size || `${s.size.w}×${s.size.h}` !== s.want);
const icon = decodePng(readFileSync(join(STORE, "assets/icon-128.png")));
let margin = true, center = false;
for (let y = 0; y < 128; y++) for (let x = 0; x < 128; x++) {
  const alpha = icon.data[(y * 128 + x) * 4 + 3];
  if ((x < 16 || x >= 112 || y < 16 || y >= 112) && alpha !== 0) margin = false;
  if (x >= 16 && x < 112 && y >= 16 && y < 112 && alpha > 0) center = true;
}
check(wrong.length === 0 && margin && center, "掲載用画像の大きさと、ストア用アイコンの透明な余白 16px",
  wrong.length ? wrong.map((s) => `${s.file} ${s.size ? `${s.size.w}×${s.size.h}` : "無い"}（${s.want}）`).join("・") : `${sizes.length} 枚・余白 ${margin ? "あり" : "なし"}`);

console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
