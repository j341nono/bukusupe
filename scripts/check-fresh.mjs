/**
 * 審査員と同じ手順の確認（M6）：コミットされる内容（git の index）だけを一時フォルダに書き出し、
 * その dist/ を、まっさらなプロファイルの Chrome にビルドせずに読み込む。
 *   node scripts/check-fresh.mjs   （check:ext の中で動く）
 *
 * 初回のモデル取得 → 埋め込み → 最初の画面（星空）まで通り、コンソールにエラー・警告が出ないことを見る。
 * ?debug=1 を付けずに開く（確認用の窓口に頼らず、画面の状態 data-phase と描画だけで判断する）。
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createChecker, decodePng, launchExtension, sleep } from "./lib/harness.mjs";

const IGNORE = /GPU stall|GL Driver Message|software WebGL|Automatic fallback to software WebGL/;
const { check, problems } = createChecker();
const clone = mkdtempSync(join(tmpdir(), "bukusupe-clone-"));
execFileSync("git", ["checkout-index", "-a", `--prefix=${clone}/`]);
check(existsSync(join(clone, "dist", "manifest.json")) && existsSync(join(clone, "dist", "ort", "ort-wasm-simd-threaded.asyncify.wasm")),
  "コミットされる内容だけで、dist/（マニフェストと同梱の ONNX Runtime）が揃っている");

const app = await launchExtension(join(clone, "dist"), { query: "" });
try {
  const seen = new Set();
  const start = Date.now();
  let phase = "";
  while (Date.now() - start < 600_000) {
    phase = (await app.tryEval("document.body.dataset.phase")) ?? "";
    if (phase) seen.add(phase);
    if (phase === "ready" || phase === "error") break;
    await sleep(200);
  }
  const seconds = (Date.now() - start) / 1000;
  await sleep(2500);
  const shot = await app.screenshot();
  writeFileSync("docs/screens/first-run.png", shot);
  console.log("  画面: docs/screens/first-run.png");
  const png = decodePng(shot);
  let lit = 0;
  for (let i = 0; i < png.data.length; i += 4) if (png.data[i] + png.data[i + 1] + png.data[i + 2] > 300) lit++;
  const hud = await app.tryEval("document.getElementById('hud')?.textContent ?? ''");
  const debug = await app.tryEval("typeof globalThis.__bukusupe");
  check(phase === "ready" && seen.has("model") && seen.has("embed") && lit > 200 && /サンプル/.test(hud ?? ""),
    "まっさらなプロファイルで、初回のモデル取得 → 埋め込み → 最初の画面（サンプルの星空）まで通る",
    `${[...seen].join(" → ")}・${seconds.toFixed(0)} 秒・明るい画素 ${lit}`);
  check(debug === "undefined", "?debug=1 なしでは確認用の窓口が無い", `__bukusupe ${debug}`);
  const requests = app.events.filter((e) => e.method === "Network.requestWillBeSent").map((e) => e.params.request.url);
  const external = requests.filter((url) => /^https?:/.test(url) && !/^https:\/\/([a-z0-9-]+\.)*(huggingface\.co|hf\.co)\//.test(url));
  check(external.length === 0, "外部への通信はモデルの重み（Hugging Face）だけ", external.slice(0, 3).join(" / ") || `通信 ${requests.length} 件`);
  const bad = app.events.filter((e) =>
    (e.method === "Log.entryAdded" && ["error", "warning"].includes(e.params.entry.level) && !IGNORE.test(e.params.entry.text)) ||
    (e.method === "Runtime.consoleAPICalled" && ["error", "warning", "warn"].includes(e.params.type)) ||
    e.method === "Runtime.exceptionThrown");
  check(bad.length === 0, "初回の起動でエラー・警告が出ない",
    bad.slice(0, 3).map((e) => e.params?.entry?.text ?? e.params?.args?.[0]?.value ?? e.params?.exceptionDetails?.text).join(" / "));
} catch (err) {
  console.error(err);
  problems.push(String(err));
} finally {
  await app.close();
  rmSync(clone, { recursive: true, force: true });
}
console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
