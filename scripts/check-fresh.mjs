/**
 * 審査員と同じ手順の確認（M6）：コミットされる内容（git の index）だけを一時フォルダに書き出し、
 * その dist/ を、まっさらなプロファイルの Chrome にビルドせずに読み込む。
 *   node scripts/check-fresh.mjs   （check:ext の中で動く）
 *
 * 初回のモデル取得 → 埋め込み → 最初の画面（星空）→ 検索欄からの意味検索まで通り、コンソールにエラー・警告が出ないことを見る。
 * dist/ は配布用のビルド（host_permissions も確認用の窓口も無い）。画面の状態 data-phase と描画・画面の要素だけで判断する。
 * 最後に ?debug=1 を付けて開き直し、配布用では確認用の窓口が出てこないことを見る（docs/RELEASE.md 段階 2）。
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createChecker, decodePng, launchExtension, sleep } from "./lib/harness.mjs";

const IGNORE = /GPU stall|GL Driver Message|software WebGL|Automatic fallback to software WebGL/;
const { check, problems } = createChecker();
const clone = mkdtempSync(join(tmpdir(), "bukusupe-clone-"));
execFileSync("git", ["checkout-index", "-a", `--prefix=${clone}/`]);
check(existsSync(join(clone, "dist", "manifest.json")) && existsSync(join(clone, "dist", "ort", "ort-wasm-simd-threaded.asyncify.wasm")),
  "コミットされる内容だけで、dist/（マニフェストと同梱の ONNX Runtime）が揃っている");
const manifest = JSON.parse(readFileSync(join(clone, "dist", "manifest.json"), "utf8"));
check(!manifest.host_permissions && !manifest.permissions.includes("storage"),
  "配布用の manifest に host_permissions と storage 権限が無い（この状態でモデルの取得から意味検索まで通すのを、以下で確かめる）",
  `permissions ${manifest.permissions.join(",")}・host_permissions ${JSON.stringify(manifest.host_permissions ?? null)}`);

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

  // 検索欄から意味検索。「夜空を眺めたい」は、サンプルのどのタイトル・URL・フォルダにも文字としては含まれないので、
  // 引き寄せられる星があれば、それはモデルの埋め込みによる意味検索の結果
  const QUERY = "夜空を眺めたい";
  // 拡張機能では、モデルが揃ってから ready になる（Web のデモの data-model は使わない）
  await app.evalIn(`(() => { const input = document.getElementById('search-input'); input.focus();
    input.value = ${JSON.stringify(QUERY)}; input.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  await app.waitUntil(`[...document.querySelectorAll('.label-star')].some((el) => el.dataset.searchRank !== '')`, 20_000, 300);
  await sleep(1500);
  const search = JSON.parse(await app.tryEval(`JSON.stringify({
    ranked: [...document.querySelectorAll('.label-star')].filter((el) => el.dataset.searchRank !== '').map((el) => el.textContent),
    create: !document.getElementById('constellation-create')?.hidden,
  })`) ?? "null");
  check(phase === "ready" && search?.ranked.length > 0 && search.create,
    "host_permissions が無くても、検索欄からの意味検索で星が引き寄せられる（文字としては一致しない検索語）",
    search ? `「${QUERY}」→ 引き寄せた星のラベル ${search.ranked.length} 件（${search.ranked.slice(0, 3).join("／")}）・星座にするボタン ${search.create ? "出る" : "出ない"}` : "測れない");
  const requests = app.events.filter((e) => e.method === "Network.requestWillBeSent").map((e) => e.params.request.url);
  const external = requests.filter((url) => /^https?:/.test(url) && !/^https:\/\/([a-z0-9-]+\.)*(huggingface\.co|hf\.co)\//.test(url));
  check(external.length === 0, "外部への通信はモデルの重み（Hugging Face）だけ", external.slice(0, 3).join(" / ") || `通信 ${requests.length} 件`);
  const bad = app.events.filter((e) =>
    (e.method === "Log.entryAdded" && ["error", "warning"].includes(e.params.entry.level) && !IGNORE.test(e.params.entry.text)) ||
    (e.method === "Runtime.consoleAPICalled" && ["error", "warning", "warn"].includes(e.params.type)) ||
    e.method === "Runtime.exceptionThrown");
  check(bad.length === 0, "初回の起動でエラー・警告が出ない",
    bad.slice(0, 3).map((e) => e.params?.entry?.text ?? e.params?.args?.[0]?.value ?? e.params?.exceptionDetails?.text).join(" / "));

  // 配布用のビルドでは、?debug=1 を付けても確認用の窓口は出てこない
  await app.send("Page.navigate", { url: `chrome-extension://${app.extId}/index.html?debug=1` }, app.sessionId);
  await sleep(500);
  await app.waitUntil("document.body.dataset.phase === 'ready'", 120_000, 300);
  const withDebug = await app.tryEval("typeof globalThis.__bukusupe");
  check(withDebug === "undefined", "配布用のビルドでは、?debug=1 を付けても確認用の窓口が無い", `__bukusupe ${withDebug}`);
} catch (err) {
  console.error(err);
  problems.push(String(err));
} finally {
  await app.close();
  rmSync(clone, { recursive: true, force: true });
}
console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
