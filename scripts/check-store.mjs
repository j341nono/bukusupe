/**
 * ストアに出す掲載文・申告・画像の確認（docs/RELEASE.md 段階 3）。
 *   node scripts/check-store.mjs   （check:ext の中で動く。配布用の dist/ の manifest を使う）
 *
 *  1. 掲載文（docs/store/listing.ja.md）：名前が 75 文字以内で manifest の name と同じ、短い説明が 132 文字以内で manifest の description と同じ、
 *     詳しい説明にプライバシーポリシーの URL がある
 *  2. 申告（docs/store/privacy-practices.md）：権限の説明の表が、配布用の manifest の権限と 1 対 1 で対応している（足りない・余分が無い）
 *  3. インストール時の警告（chrome.management.getPermissionWarningsByManifest で、配布用の manifest から実際に求める）の文言が、
 *     申告の「インストール時の警告」の欄にすべてそのまま書かれていて、余分も無い
 *  4. 掲載用の画像（docs/store/assets/）の大きさが、ストアの決まり（1280×800・440×280・1400×560・128×128）に合っている
 */
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { createChecker, launchExtension } from "./lib/harness.mjs";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const STORE = join(ROOT, "docs/store");
const { check, problems } = createChecker();
const manifest = JSON.parse(readFileSync(join(ROOT, "dist/manifest.json"), "utf8"));
const read = (name) => (existsSync(join(STORE, name)) ? readFileSync(join(STORE, name), "utf8") : "");
const block = (text, name) => text.match(new RegExp(`<!-- ${name}:start -->\\n([\\s\\S]*?)\\n<!-- ${name}:end -->`))?.[1]?.trim() ?? null;
const chars = (s) => [...(s ?? "")].length;

// --- 1. 掲載文 ---
const listing = read("listing.ja.md");
const name = block(listing, "name");
const summary = block(listing, "summary");
const description = block(listing, "description");
check(name && chars(name) <= 75 && name === manifest.name, "掲載文の名前が 75 文字以内で、manifest の name と同じ",
  `${chars(name)} 文字・manifest ${name === manifest.name ? "と同じ" : `と違う（${manifest.name}）`}`);
check(summary && chars(summary) <= 132 && summary === manifest.description, "掲載文の短い説明が 132 文字以内で、manifest の description と同じ",
  `${chars(summary)} 文字・manifest ${summary === manifest.description ? "と同じ" : "と違う"}`);
check(description && chars(description) > 300 && description.includes("https://j341nono.github.io/bukusupe/privacy/"),
  "詳しい説明があり、プライバシーポリシーのページへ行ける", `${chars(description)} 文字`);

// --- 2. 権限の説明の表 ---
const practices = read("privacy-practices.md");
const table = block(practices, "permissions") ?? "";
const described = [...table.matchAll(/^\|\s*`([^`]+)`\s*\|/gm)].map((m) => m[1]);
const wanted = [...(manifest.permissions ?? []), ...(manifest.host_permissions ?? [])];
const missing = wanted.filter((p) => !described.includes(p));
const extra = described.filter((p) => !wanted.includes(p));
check(described.length > 0 && missing.length === 0 && extra.length === 0,
  "申告の権限の説明が、配布用の manifest の権限と 1 対 1 で対応している",
  `manifest ${wanted.join(", ")}・説明 ${described.join(", ")}${missing.length ? `・説明が無い ${missing.join(", ")}` : ""}${extra.length ? `・余分 ${extra.join(", ")}` : ""}`);

// --- 3. インストール時の警告 ---
const warningsBlock = block(practices, "warnings") ?? "";
const writtenWarnings = [...warningsBlock.matchAll(/^- 「(.+?)」/gm)].map((m) => m[1]);
let actual = null;
const app = await launchExtension(join(ROOT, "dist"), { query: "" });
try {
  actual = JSON.parse((await app.tryEval(`(async () => JSON.stringify(
    await chrome.management.getPermissionWarningsByManifest(${JSON.stringify(JSON.stringify(manifest))})))()`)) ?? "null");
} finally {
  await app.close();
}
const notWritten = (actual ?? []).filter((w) => !writtenWarnings.includes(w));
const stale = writtenWarnings.filter((w) => !(actual ?? []).includes(w));
check(Array.isArray(actual) && actual.length > 0 && notWritten.length === 0 && stale.length === 0,
  "インストール時の警告の文言（配布用の manifest から実際に求めたもの）が、申告の説明とそろっている",
  `実際 ${JSON.stringify(actual)}${notWritten.length ? `・説明に無い ${notWritten.join("／")}` : ""}${stale.length ? `・実際には出ない ${stale.join("／")}` : ""}`);

// --- 4. 画像の大きさ ---
/** PNG の大きさ（IHDR）。PNG でなければ null */
function pngSize(path) {
  if (!existsSync(path)) return null;
  const b = readFileSync(path);
  if (b.length < 24 || b.readUInt32BE(0) !== 0x89504e47) return null;
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}
const images = [
  ["screenshot-1-map.png", 1280, 800], ["screenshot-2-search.png", 1280, 800], ["screenshot-3-constellation.png", 1280, 800],
  ["screenshot-4-selection.png", 1280, 800], ["screenshot-5-flight.png", 1280, 800],
  ["promo-small-440x280.png", 440, 280], ["promo-marquee-1400x560.png", 1400, 560], ["icon-128.png", 128, 128],
];
const sizes = images.map(([file, w, h]) => ({ file, want: `${w}×${h}`, size: pngSize(join(STORE, "assets", file)) }));
const wrong = sizes.filter((s) => !s.size || `${s.size.w}×${s.size.h}` !== s.want);
const iconSame = existsSync(join(STORE, "assets/icon-128.png")) &&
  readFileSync(join(STORE, "assets/icon-128.png")).equals(readFileSync(join(ROOT, "public/icons/icon128.png")));
check(wrong.length === 0 && iconSame, "掲載用の画像の大きさがストアの決まりに合い、ストア用のアイコンは拡張機能のアイコンと同じ",
  wrong.length ? wrong.map((s) => `${s.file} ${s.size ? `${s.size.w}×${s.size.h}` : "無い"}（${s.want}）`).join("・") : `${sizes.length} 枚・アイコン ${iconSame ? "同じ" : "違う"}`);

console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
