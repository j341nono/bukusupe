/**
 * モデルのキャッシュの名前の確認（docs/RELEASE.md 段階 2）。
 *   node scripts/check-cache.mjs   （check:ext の中で動く。確認用のビルド dist-debug/ と dist-web-debug/ を使う）
 *
 * モデルの重みは Cache Storage の `bukusupe-model` に入れる（Transformers.js の既定は `transformers-cache`）。
 * 前の版が `transformers-cache` に残したキャッシュが壊れていても、今の版は読まずに動くことを確かめる：
 *  1. ふつうに開いてモデルを取得させる → 取得した重みの URL を集める
 *  2. `transformers-cache` の同じ URL に壊れた中身を入れ、`bukusupe-model` を消す（前の版から更新した直後と同じ状態）
 *  3. 読み込み直して、モデルが揃い、意味検索で星が引き寄せられる
 *  拡張機能：拡張機能だけの保存領域なので、古い `transformers-cache` は消す。
 *  Web のデモ：GitHub Pages の同じ origin の他のページと共有しているので、古いものは消さずに残す。
 */
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { createChecker, launchExtension, sleep } from "./lib/harness.mjs";

const NEW = "bukusupe-model";
const OLD = "transformers-cache";
const QUERY = "夜空を眺めたい";   // サンプルのどのタイトル・URL・フォルダにも文字としては含まれない
const b = "globalThis.__bukusupe";
const { check, problems } = createChecker();

/** モデルの重みの URL を集め、古い名前のキャッシュに壊れた中身で入れ、他のキャッシュを消す。集めた URL の数を返す */
const CORRUPT = `(async () => {
  const urls = new Set();
  for (const name of await caches.keys()) {
    const cache = await caches.open(name);
    for (const request of await cache.keys()) if (/huggingface\\.co|hf\\.co/.test(request.url)) urls.add(request.url);
  }
  for (const name of await caches.keys()) await caches.delete(name);
  const old = await caches.open(${JSON.stringify(OLD)});
  for (const url of urls) {
    await old.put(url, new Response("broken", { headers: { "content-type": "application/octet-stream", "content-length": "6" } }));
  }
  return JSON.stringify({ urls: urls.size, names: await caches.keys() });
})()`;
const CACHES = `(async () => JSON.stringify(await Promise.all((await caches.keys()).map(async (name) =>
  ({ name, count: (await (await caches.open(name)).keys()).length })))))()`;
const SEARCH = `(async () => { const hits = await ${b}.searchNow(${JSON.stringify(QUERY)});
  return JSON.stringify({ count: hits.length, semantic: hits.filter((hit) => hit.semantic > 0 && hit.lexical === 0).length }); })()`;

/** 1 つの画面（拡張機能か Web のデモ）で 1〜3 を行う */
async function scenario(label, app, reload, modelReady, keepOld) {
  const firstReady = await app.waitUntil(modelReady, 300_000, 500);
  const before = JSON.parse((await app.tryEval(CACHES)) ?? "[]");
  const corrupted = JSON.parse((await app.tryEval(CORRUPT)) ?? "null");
  await reload();
  const ready = await app.waitUntil(modelReady, 300_000, 500);
  const phase = await app.tryEval("document.body.dataset.phase + '/' + (document.body.dataset.model ?? '')");
  const search = ready ? JSON.parse((await app.tryEval(SEARCH)) ?? "null") : null;
  const after = JSON.parse((await app.tryEval(CACHES)) ?? "[]");
  const fresh = after.find((c) => c.name === NEW);
  const old = after.find((c) => c.name === OLD);
  check(firstReady && before.some((c) => c.name === NEW && c.count > 0),
    `${label}：モデルの重みを Cache Storage の ${NEW} に入れる`, before.map((c) => `${c.name} ${c.count} 件`).join("・") || "キャッシュ無し");
  check(corrupted?.urls > 0 && ready && search?.semantic > 0 && fresh?.count > 0,
    `${label}：前の版の ${OLD} が壊れていても、モデルが揃い、意味検索で星が引き寄せられる`,
    `壊した重み ${corrupted?.urls ?? 0} 件・${phase}・「${QUERY}」→ ${search ? `${search.count} 件（意味だけで一致 ${search.semantic}）` : "検索できない"}・${NEW} ${fresh?.count ?? 0} 件`);
  check(keepOld ? old?.count === corrupted?.urls : !old,
    keepOld ? `${label}：他のページと共有する origin なので、古い ${OLD} は消さずに残す` : `${label}：古い ${OLD} は消す`,
    after.map((c) => `${c.name} ${c.count} 件`).join("・"));
}

// --- 拡張機能 ---
{
  const app = await launchExtension(resolve(process.argv[2] ?? "dist-debug"), { query: "sample=1&debug=1" });
  try {
    await scenario("拡張機能", app, async () => {
      await app.send("Page.reload", {}, app.sessionId);
      await sleep(500);
    }, `document.body.dataset.phase === 'ready' && !!${b}?.modelReady()`, false);
    // 古いキャッシュを消している途中（Worker の準備の途中）に来た埋め込みの頼みも、準備を待ってから計算される
    const rightAway = JSON.parse((await app.tryEval(`(async () => JSON.stringify(await ${b}.embedRightAway()))()`)) ?? "null");
    check(rightAway?.ok === true, "拡張機能：Worker を作った直後の埋め込みの頼みも、モデルの準備を待って計算される",
      rightAway?.error ?? "");
    const bad = app.events.filter((e) => e.method === "Runtime.exceptionThrown");
    check(bad.length === 0, "拡張機能：例外が出ない", bad.slice(0, 2).map((e) => e.params?.exceptionDetails?.text).join(" / "));
  } catch (err) {
    console.error(err);
    problems.push(String(err));
  } finally {
    await app.close();
  }
}

// --- Web のデモ（GitHub Pages と同じくサブパスに置く） ---
{
  const ROOT = resolve(process.argv[3] ?? "dist-web-debug");
  const BASE = "/bukusupe/";
  const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript",
    ".wasm": "application/wasm", ".png": "image/png", ".json": "application/json" };
  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (!path.startsWith(BASE)) { res.writeHead(404).end(); return; }
    let file = normalize(join(ROOT, path.slice(BASE.length)));
    if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    if (!existsSync(file)) { res.writeHead(404).end(); return; }
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" }).end(readFileSync(file));
  });
  await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
  const page = `http://127.0.0.1:${server.address().port}${BASE}?debug=1`;
  const app = await launchExtension(resolve(process.argv[2] ?? "dist-debug"), { url: page });
  try {
    await scenario("Web のデモ", app, async () => {
      await app.send("Page.navigate", { url: page }, app.sessionId);
      await sleep(500);
    }, `document.body.dataset.model === 'ready' && !!${b}?.modelReady()`, true);
  } catch (err) {
    console.error(err);
    problems.push(String(err));
  } finally {
    await app.close();
    server.close();
  }
}

console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
