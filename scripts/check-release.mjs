/**
 * 配布用のビルド（ストアに出すもの）の確認（docs/RELEASE.md 段階 2）。
 *   node scripts/check-release.mjs   （check:ext の中で動く。Chrome は使わない）
 *
 *  1. コミットされる dist/（git の index）に、確認用・測定用の仕組みの名前と、Web のデモ用の計算済みのサンプルが残っていない（規則 11）
 *  2. dist/ の manifest に host_permissions と storage 権限が無く、版が package.json とそろっている
 *  3. Web のデモの配布用のビルドにも、確認用・測定用の仕組みの名前が残っていない
 *  4. manifest と package.json の版がずれていると、配布用のビルドが失敗する
 *  5. npm run package：問い合わせのメールアドレスが仮の値なら失敗し、版がずれていても失敗し、
 *     src/config.ts の本物の問い合わせ先のままなら manifest.json が直下にある zip（ファイル名に版）を作る
 */
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createChecker } from "./lib/harness.mjs";
import { FORBIDDEN_EXTENSION, PLACEHOLDER_EMAIL, findForbidden, supportEmail, versions } from "./lib/release.mjs";

const { check, problems } = createChecker();
const tmp = mkdtempSync(join(tmpdir(), "bukusupe-release-"));
const { pkg } = versions(".");
const run = (cmd, args, env = {}) => spawnSync(cmd, args, { encoding: "utf8", env: { ...process.env, ...env } });

try {
  // git の index にある dist/（次のコミットに入るもの）を取り出す
  const files = execFileSync("git", ["ls-files", "-z", "--", "dist"], { encoding: "utf8" });
  execFileSync("git", ["checkout-index", "-z", "--stdin", `--prefix=${tmp}/`], { input: files });
  const dist = join(tmp, "dist");

  // --- 1. 確認用・測定用の仕組みが残っていない ---
  const found = existsSync(dist) ? findForbidden(dist, FORBIDDEN_EXTENSION) : ["dist/ が無い"];
  check(found.length === 0, "配布用のビルド（dist/）に、確認用・測定用の仕組みの名前が残っていない",
    found.length ? `${found.length} 件：${found.slice(0, 4).join("、")}` : "");

  // --- 2. manifest ---
  const manifest = JSON.parse(readFileSync(join(dist, "manifest.json"), "utf8"));
  const perms = [...(manifest.permissions ?? [])].sort().join(",");
  check(!manifest.host_permissions && !manifest.optional_host_permissions && perms === "bookmarks,favicon,unlimitedStorage" &&
    manifest.version === pkg && !/確認用/.test(manifest.name),
    "配布用の manifest に host_permissions と storage が無く、版が package.json とそろっている",
    `permissions ${perms}・host_permissions ${JSON.stringify(manifest.host_permissions ?? null)}・版 ${manifest.version}（package.json ${pkg}）`);

  // --- 3. Web のデモ（配布用） ---
  const web = join(tmp, "web");
  const webBuild = run("npx", ["vite", "build", "--mode", "web", "--outDir", web, "--emptyOutDir", "--logLevel", "error"]);
  const webFound = webBuild.status === 0 ? findForbidden(web) : [`ビルドに失敗：${webBuild.stderr.slice(0, 200)}`];
  check(webFound.length === 0, "Web のデモの配布用のビルドに、確認用・測定用の仕組みの名前が残っていない",
    webFound.slice(0, 4).join("、"));

  // --- 4. 版ずれで配布用のビルドが失敗する ---
  const mismatch = run("npx", ["vite", "build", "--outDir", join(tmp, "mismatch"), "--emptyOutDir", "--logLevel", "error"],
    { BUKUSUPE_TEST_PACKAGE_VERSION: "0.0.1-mismatch" });
  check(mismatch.status !== 0 && /版の番号がそろっていない/.test(mismatch.stderr + mismatch.stdout),
    "manifest と package.json の版がずれていると、配布用のビルドが失敗する",
    `終了コード ${mismatch.status}`);

  // --- 5. npm run package ---
  const pack = (env) => run("node", ["scripts/package.mjs"],
    { BUKUSUPE_PACKAGE_DIST: dist, BUKUSUPE_PACKAGE_OUT: join(tmp, "release"), ...env });
  // 仮の値に戻したときに失敗すること（本物の値は src/config.ts に入っているので、道具の中だけで仮の値に差し替える）
  const placeholder = pack({ BUKUSUPE_TEST_SUPPORT_EMAIL: PLACEHOLDER_EMAIL });
  check(placeholder.status !== 0 && /仮の値/.test(placeholder.stderr) && !existsSync(join(tmp, "release", `bukusupe-${pkg}.zip`)),
    "問い合わせのメールアドレスが仮の値なら、npm run package が失敗する", `終了コード ${placeholder.status}`);
  const skew = pack({ BUKUSUPE_TEST_SUPPORT_EMAIL: "someone@example.com", BUKUSUPE_TEST_PACKAGE_VERSION: "0.0.1-mismatch" });
  check(skew.status !== 0 && /版の番号がそろっていない/.test(skew.stderr),
    "版がずれていると、npm run package が失敗する", `終了コード ${skew.status}`);
  // 差し替えずに（src/config.ts の本物の問い合わせ先で）作れる
  const ok = pack({});
  const zip = join(tmp, "release", `bukusupe-${pkg}.zip`);
  const entries = ok.status === 0 && existsSync(zip) ? execFileSync("unzip", ["-Z1", zip], { encoding: "utf8" }).trim().split("\n") : [];
  const zipped = entries.includes("manifest.json") ? JSON.parse(execFileSync("unzip", ["-p", zip, "manifest.json"], { encoding: "utf8" })) : null;
  check(ok.status === 0 && zipped?.version === pkg && entries.includes("index.html") && entries.includes("background.js") &&
    !entries.some((e) => e.startsWith("dist/") || e.endsWith(".DS_Store")),
    "npm run package が、manifest.json を直下に置いた zip（ファイル名に版）を作る",
    ok.status === 0 ? `bukusupe-${pkg}.zip・${entries.length} ファイル・直下の manifest の版 ${zipped?.version}・問い合わせ先 ${supportEmail(".")}` : ok.stderr.slice(0, 200));
} catch (err) {
  console.error(err);
  problems.push(String(err));
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
