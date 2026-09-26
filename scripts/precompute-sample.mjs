/**
 * Web のデモに同梱する「計算済みのサンプル」を作る（M6）。
 *   npm run sample:precompute   （拡張機能をビルドしてから、これを動かす）
 *
 * 拡張機能のビルド（dist/）を使い捨てのプロファイルの Chrome で `?sample=1&debug=1` として開き、
 * 本物と同じ経路（Worker の埋め込み → 平均引き → 配置）で計算した結果を src/data/sample-precomputed.json に書き出す。
 * サンプルのブックマーク・入力文の作り方・配置の版・モデルを変えたら作り直す
 * （古いままだと Web のデモは計算済みを使わず、コンソールに警告を出す。check:web が落ちる）。
 * 初回はモデルの重みを Hugging Face から取得する（ブックマークは送らない。サンプルだけ）。
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { launchExtension } from "./lib/harness.mjs";

const OUT = resolve("src/data/sample-precomputed.json");
const app = await launchExtension(resolve("dist"), { query: "sample=1&debug=1" });
try {
  const ready = await app.waitUntil(
    "document.body.dataset.phase === 'ready' && globalThis.__bukusupe?.state.kind === 'sample' && globalThis.__bukusupe.state.layout",
    300_000, 1000);
  if (!ready) throw new Error("サンプルの計算が終わらない");
  const json = await app.evalIn("JSON.stringify(globalThis.__bukusupe.exportSampleCache())");
  const data = JSON.parse(json ?? "null");
  if (!data?.ids?.length) throw new Error("計算済みのサンプルを取り出せない");
  writeFileSync(OUT, JSON.stringify(data) + "\n");
  console.log(`書き出し: ${OUT}（${data.ids.length} 件・星団 ${data.layout.clusters.length}・${(json.length / 1024).toFixed(0)} KB）`);
} finally {
  await app.close();
}
