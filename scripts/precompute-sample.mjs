/**
 * Web のデモに同梱する「計算済みのサンプル」を作る（M6・段階 3c で日本語・英語の 2 本に分けた）。
 *   npm run sample:precompute   （拡張機能をビルドしてから、これを動かす。2 本とも作り直す）
 *
 * 拡張機能のビルド（dist/）を使い捨てのプロファイルの Chrome で `?sample=1&debug=1` として開き、
 * 本物と同じ経路（Worker の埋め込み → 平均引き → 配置）で計算した結果を書き出す。
 * ブラウザの言語（`--lang` / `--accept-lang`）で、画面の言語（「自動」）とサンプルの言語が決まる。
 *   日本語 → src/data/sample-precomputed.json
 *   英語   → src/data/sample-precomputed.en.json
 * サンプルのブックマーク・入力文の作り方・配置の版・モデルを変えたら、両方作り直す
 * （古いままだと Web のデモは計算済みを使わず、コンソールに警告を出す。check:web が落ちる）。
 * 初回はモデルの重みを Hugging Face から取得する（ブックマークは送らない。サンプルだけ）。
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { launchExtension } from "./lib/harness.mjs";

const TARGETS = [
  { lang: "ja", browserLang: "ja", out: "src/data/sample-precomputed.json" },
  { lang: "en", browserLang: "en-US", out: "src/data/sample-precomputed.en.json" },
];

for (const target of TARGETS) {
  const OUT = resolve(target.out);
  const app = await launchExtension(resolve("dist-debug"), { query: "sample=1&debug=1", lang: target.browserLang });
  try {
    const ready = await app.waitUntil(
      "document.body.dataset.phase === 'ready' && globalThis.__bukusupe?.state.kind === 'sample' && globalThis.__bukusupe.state.layout",
      300_000, 1000);
    if (!ready) throw new Error(`サンプルの計算が終わらない（${target.lang}）`);
    const json = await app.evalIn("JSON.stringify(globalThis.__bukusupe.exportSampleCache())");
    const data = JSON.parse(json ?? "null");
    if (!data?.ids?.length) throw new Error(`計算済みのサンプルを取り出せない（${target.lang}）`);
    writeFileSync(OUT, JSON.stringify(data) + "\n");
    console.log(`書き出し: ${OUT}（${data.ids.length} 件・星団 ${data.layout.clusters.length}・${(json.length / 1024).toFixed(0)} KB）`);
  } finally {
    await app.close();
  }
}
