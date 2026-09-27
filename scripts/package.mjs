/**
 * ストアにアップロードする zip を作る（docs/RELEASE.md 段階 2）。  npm run package（配布用のビルドの後にこれを動かす）
 *
 * - 配布用のビルド（dist/）から作る。manifest.json が zip の直下に来る形。ファイル名に版の番号を入れる（release/bukusupe-X.Y.Z.zip）。
 * - 次のどれかなら失敗する：manifest と package.json の版が違う、dist/ の版が違う、問い合わせのメールアドレスが仮の値のまま、
 *   dist/ に確認用・測定用の仕組みが残っている。
 * - release/ はリポジトリに入れない（.gitignore）。
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { FORBIDDEN_EXTENSION, PLACEHOLDER_EMAIL, findForbidden, supportEmail, versions } from "./lib/release.mjs";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
// 確認（scripts/check-release.mjs）のときだけ、読む dist/ と書き出す先を差し替える
const DIST = resolve(process.env.BUKUSUPE_PACKAGE_DIST ?? join(ROOT, "dist"));
const fail = (message) => { console.error(`package：${message}`); process.exit(1); };

const { manifest, pkg } = versions(ROOT);
if (manifest !== pkg) fail(`版の番号がそろっていない（public/manifest.json ${manifest}・package.json ${pkg}）`);
if (!existsSync(join(DIST, "manifest.json"))) fail("dist/ が無い。先に npm run build");
const built = JSON.parse(readFileSync(join(DIST, "manifest.json"), "utf8"));
if (built.version !== manifest) fail(`dist/ の版（${built.version}）が public/manifest.json（${manifest}）と違う。npm run build し直す`);
const email = supportEmail(ROOT);
if (!email || email === PLACEHOLDER_EMAIL || email.endsWith(".invalid")) {
  fail(`問い合わせのメールアドレスが仮の値のまま（src/config.ts の SUPPORT_EMAIL = ${email}）。使う人から受け取ったアドレスに直す`);
}
const forbidden = findForbidden(DIST, FORBIDDEN_EXTENSION);
if (forbidden.length) fail(`dist/ に確認用・測定用の仕組みが残っている：${forbidden.slice(0, 5).join("、")}`);

const outDir = resolve(process.env.BUKUSUPE_PACKAGE_OUT ?? join(ROOT, "release"));
mkdirSync(outDir, { recursive: true });
const zip = join(outDir, `bukusupe-${manifest}.zip`);
rmSync(zip, { force: true });
// dist/ の中身を、そのまま zip の直下へ（manifest.json が直下に来る）。macOS の .DS_Store とソースマップは入れない
execFileSync("zip", ["-r", "-X", "-q", zip, ".", "-x", "*.DS_Store", "*.map"], { cwd: DIST });
const list = execFileSync("unzip", ["-Z1", zip], { encoding: "utf8" }).trim().split("\n");
console.log(`作った：${zip.replace(`${ROOT}/`, "")}（${(statSync(zip).size / 1e6).toFixed(1)} MB、${list.length} ファイル）`);
for (const name of list) console.log(`  ${name}`);
