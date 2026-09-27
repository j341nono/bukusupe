/**
 * 配布用のビルド（ストアに出すもの）を確かめる部品。scripts/check-release.mjs と scripts/package.mjs が使う（docs/RELEASE.md 段階 2）。
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * 配布用のビルドに残ってはいけない、確認用・測定用の仕組みの名前（規則 11）。
 * 確認用の窓口（__bukusupe とその中の名前）、?debug=1 と ?dtype= の読み取り、測定用のデータの注入と DB、Worker の測定の目印、
 * 描画の測定の操作。どれも __DEBUG__ の中にあり、配布用のビルドでは取り除かれるはず。
 */
export const FORBIDDEN = [
  "__bukusupe", "bukusupe-debug", "bench:", "bukusupe-bench-",
  'get("debug")', 'get("dtype")',
  "exportSampleCache", "layoutTimings", "searchTimings", "generalityTiming", "embedTimed", "storageEstimate",
  "returnStateInfo", "simulateAdd", "computeAgain", "measureLexical",
  "setContinuousRender", "renderNow", "setLoopPaused", "takeProfile", "setProfiling", "wasmMemory",
];

/** 拡張機能の配布物にだけ、さらに残ってはいけないもの：Web のデモの計算済みのサンプル（拡張機能は自分で計算する） */
export const FORBIDDEN_EXTENSION = ["sample-precomputed"];

/** dir の中の .js / .html / .json / .mjs から、FORBIDDEN（と extra）の名前を探す。見つかったものを返す */
export function findForbidden(dir, extra = []) {
  const found = [];
  for (const entry of readdirSync(dir, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const path = join(entry.parentPath ?? entry.path, entry.name);
    for (const word of extra) if (entry.name.includes(word)) found.push(`${relative(dir, path)}: ファイル名に ${word}`);
    if (!/\.(m?js|html|json)$/.test(entry.name)) continue;
    const text = readFileSync(path, "utf8");
    for (const word of [...FORBIDDEN, ...extra]) if (text.includes(word)) found.push(`${relative(dir, path)}: ${word}`);
  }
  return found;
}

/** public/manifest.json と package.json の版 */
export function versions(root) {
  return {
    manifest: JSON.parse(readFileSync(join(root, "public/manifest.json"), "utf8")).version,
    // 版ずれの確認のために、package.json の版を環境変数で差し替えられる（道具の中だけ。vite.config.ts の checkVersion と同じ）
    pkg: process.env.BUKUSUPE_TEST_PACKAGE_VERSION ?? JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version,
  };
}

/** 問い合わせのメールアドレス（src/config.ts）。確認のために環境変数で差し替えられる（道具の中だけ） */
export function supportEmail(root) {
  if (process.env.BUKUSUPE_TEST_SUPPORT_EMAIL) return process.env.BUKUSUPE_TEST_SUPPORT_EMAIL;
  return readFileSync(join(root, "src/config.ts"), "utf8").match(/SUPPORT_EMAIL\s*=\s*"([^"]*)"/)?.[1] ?? null;
}

export const PLACEHOLDER_EMAIL = "bukusupe-support@example.invalid";
