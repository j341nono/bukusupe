/**
 * 段階 3c：英語の検索語 9 つ（日本語の 9 語と同じ趣旨）で、上位 5 件の正解数を測る一回きりの測定スクリプト。
 *   npm run build:debug >/dev/null && node scripts/measure-search-en.mjs
 * 結果は docs/BENCHMARK.md に手で転記する（check:ext には組み込まない。bench 系のスクリプトと同じ位置づけ）。
 */
import { resolve } from "node:path";
import { launchExtension } from "./lib/harness.mjs";

const app = await launchExtension(resolve("dist-debug"), { query: "sample=1&debug=1", lang: "en-US" });
try {
  const ready = await app.waitUntil(
    "document.body.dataset.phase === 'ready' && globalThis.__bukusupe?.state.kind === 'sample' && globalThis.__bukusupe.state.layout",
    300_000, 1000);
  if (!ready) throw new Error("サンプルの計算が終わらない");

  // 日本語の 9 語（scripts/check-extension.mjs）と同じ趣旨の英語の検索語
  const cases = [
    ["I want to feel the vastness of space", (r) => /space|astronom|telescope|nasa|planetarium|constellation|rocket|night sky|black hole|stargaz|orbit|galaxy/i.test(r.title)],
    ["pasta", (r) => r.folder.startsWith("Cooking")],
    ["recipe", (r) => r.folder.startsWith("Cooking")],
    ["a relaxing weekend getaway", (r) => r.folder.startsWith("Travel")],
    ["React state management", (r) => r.folder.startsWith("Dev/Frontend")],
    ["database design", (r) => r.folder.startsWith("Dev/Backend")],
    ["generative AI", (r) => r.folder.startsWith("AI")],
    ["how to save money", (r) => r.folder.startsWith("Money")],
    ["improve my sleep", (r) => r.folder.startsWith("Health")],
  ];

  const report = [];
  console.log("  英語の検索（上位 5 件 / 期待件数）:");
  for (const [query, expected] of cases) {
    const result = JSON.parse((await app.evalIn(`(async () => {
      const hits = await globalThis.__bukusupe.search(${JSON.stringify(query)}, 30);
      return JSON.stringify({ hits });
    })()`)) ?? "null");
    const top5 = result?.hits?.slice(0, 5) ?? [];
    const count = top5.filter(expected).length;
    report.push({ query, expected: count, titles: top5.map((r) => r.title) });
    console.log(`    ${query}: ${count}/5 — ${top5.map((r) => r.title).join(" / ")}`);
  }
  const total = report.reduce((sum, r) => sum + r.expected, 0);
  console.log(`  合計: ${total}/45`);
  console.log(JSON.stringify(report, null, 2));
} finally {
  await app.close();
}
