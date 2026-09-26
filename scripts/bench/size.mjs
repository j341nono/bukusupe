/**
 * 配布物の大きさ：dist/（拡張機能）と dist-web/（Web のデモ）の合計と、ファイルごとの内訳。
 */
import { execFileSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { ROOT, captureEnvironment, saveResult } from "./lib.mjs";

function files(dir) {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile() && e.name !== ".DS_Store")
    .map((e) => { const path = join(e.parentPath ?? e.path, e.name); return { file: relative(dir, path), bytes: statSync(path).size }; })
    .sort((a, b) => b.bytes - a.bytes);
}

export async function size() {
  execFileSync("npm", ["run", "build:web"], { cwd: ROOT, stdio: "ignore" });
  const builds = { dist: files(join(ROOT, "dist")), "dist-web": files(join(ROOT, "dist-web")) };
  const totals = Object.fromEntries(Object.entries(builds).map(([k, list]) => [k, list.reduce((s, f) => s + f.bytes, 0)]));
  for (const [k, v] of Object.entries(totals)) console.log(`  ${k}: ${(v / 1024 / 1024).toFixed(1)} MB`);
  saveResult("size", { env: captureEnvironment(), builds, totals },
    Object.entries(builds).flatMap(([k, list]) => [{ metric: "total", condition: k, value: totals[k], unit: "bytes" },
      ...list.map((f) => ({ metric: "file", condition: `${k}/${f.file}`, value: f.bytes, unit: "bytes" }))]));
}
