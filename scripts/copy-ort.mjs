/**
 * ONNX Runtime の補助ファイルを拡張機能に同梱する。
 * transformers.js は既定でこれを jsDelivr の CDN から読み込む（MV3 では禁止）。
 * public/ort/ に置き、実行時に env.backends.onnx.wasm.wasmPaths をここへ向ける。
 */
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SRC = new URL("../node_modules/onnxruntime-web/dist/", import.meta.url);
const DST = new URL("../public/ort/", import.meta.url);

// transformers.js v4 が既定で使う版（asyncify）に合わせる
const FILES = ["ort-wasm-simd-threaded.asyncify.mjs", "ort-wasm-simd-threaded.asyncify.wasm"];

mkdirSync(DST, { recursive: true });
for (const name of FILES) {
  const from = fileURLToPath(new URL(name, SRC));
  const to = fileURLToPath(new URL(name, DST));
  copyFileSync(from, to);
  console.log(`同梱: ${name} (${(statSync(to).size / 1e6).toFixed(1)} MB)`);
}
