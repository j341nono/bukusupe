/**
 * コミットされる dist/ が、今のソースからビルドした結果と一致するかを確かめる（M6）。
 *   node scripts/check-dist.mjs   （check:ext の最初に動く）
 *
 * 審査員は clone した dist/ をそのまま読み込むので、ソースを直して dist/ を作り直し忘れると、古いものが渡ってしまう。
 * 一時フォルダへビルドし直し、git の index にある dist/（次のコミットに入るもの）とファイルの一覧・中身を比べる。
 * 手順：`npm run build` → `git add dist` → `npm run check:ext` → コミット。
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { createChecker } from "./lib/harness.mjs";

const { check, problems } = createChecker();
const out = mkdtempSync(join(tmpdir(), "bukusupe-dist-"));
try {
  execFileSync("node", ["scripts/copy-ort.mjs"], { stdio: "ignore" });
  execFileSync("npx", ["vite", "build", "--outDir", out, "--emptyOutDir", "--logLevel", "error"], { stdio: ["ignore", "ignore", "inherit"] });
  const built = readdirSync(out, { recursive: true, withFileTypes: true })
    // macOS が public/ に作る .DS_Store は git が無視するので比べない
    .filter((entry) => entry.isFile() && entry.name !== ".DS_Store")
    .map((entry) => relative(out, join(entry.parentPath ?? entry.path, entry.name)).split("\\").join("/"))
    .sort();
  const ignored = (() => {
    try { execFileSync("git", ["check-ignore", "-q", "dist/index.html"]); return true; } catch { return false; }
  })();
  const staged = execFileSync("git", ["ls-files", "-z", "--", "dist"], { encoding: "utf8" })
    .split("\0").filter(Boolean).map((path) => path.slice("dist/".length)).sort();
  const missing = built.filter((path) => !staged.includes(path));
  const extra = staged.filter((path) => !built.includes(path));
  const differ = built.filter((path) => staged.includes(path) &&
    !execFileSync("git", ["show", `:dist/${path}`], { maxBuffer: 256 * 1024 * 1024 }).equals(readFileSync(join(out, path))));
  check(!ignored && built.length > 0 && missing.length === 0 && extra.length === 0 && differ.length === 0,
    "コミットされる dist/ が、今のソースからビルドした結果と一致する",
    ignored ? "dist/ が .gitignore で除外されている"
      : `ビルド ${built.length} 件・index ${staged.length} 件` +
        (missing.length ? `・index に無い ${missing.slice(0, 3).join(", ")}` : "") +
        (extra.length ? `・余分 ${extra.slice(0, 3).join(", ")}` : "") +
        (differ.length ? `・中身が違う ${differ.slice(0, 3).join(", ")}（npm run build → git add dist）` : ""));
} catch (err) {
  console.error(err);
  problems.push(String(err));
} finally {
  rmSync(out, { recursive: true, force: true });
}
console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
