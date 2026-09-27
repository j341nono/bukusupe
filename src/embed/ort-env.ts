import { env } from "@huggingface/transformers";

/**
 * モデルの重みを入れる Cache Storage の名前。Transformers.js の既定（`transformers-cache`）ではなく、ブクスペ専用の名前にする。
 * Web のデモ（GitHub Pages）は同じ origin の他のページと保存領域を共有するので、他のページのキャッシュと混ざらないようにする。
 */
export const MODEL_CACHE = "bukusupe-model";
/** 0.1.0 までの版が使っていた名前 */
export const OLD_MODEL_CACHE = "transformers-cache";

/**
 * 前の版が残したモデルのキャッシュを消す。拡張機能の保存領域はブクスペだけのものなので消してよい。
 * Web のデモでは、同じ origin の他のページのものかもしれないので呼ばない。
 */
export async function dropOldModelCache(): Promise<void> {
  try {
    await caches.delete(OLD_MODEL_CACHE);
  } catch {
    // 消せなくても、今の版は読まないので動作には関係しない
  }
}

/**
 * MV3 で transformers.js を動かすための設定。
 *
 * - ONNX Runtime の .mjs / .wasm は既定で jsDelivr から読み込まれる。
 *   拡張機能ではプログラムの外部読み込みが禁止なので、同梱先へ向け直す。
 * - useWasmCache を false にする。true だと .mjs を blob: URL にして import するが、
 *   MV3 の CSP（script-src 'self'）では blob: のスクリプトを読み込めない。
 * - モデルの重み（データ）だけは Hugging Face から取得してキャッシュする（Cache Storage の MODEL_CACHE）。
 */
export function configureOrt(ortBaseUrl: string): void {
  env.allowLocalModels = false;   // chrome-extension://…/models/ を探しにいかせない
  env.allowRemoteModels = true;   // 重みは Hugging Face から
  env.useWasmCache = false;       // blob: URL 化を止める（CSP 対策）
  env.cacheKey = MODEL_CACHE;     // 既定の transformers-cache ではなく、ブクスペ専用の名前

  const wasm = env.backends.onnx.wasm;
  if (!wasm) throw new Error("ONNX の WASM バックエンドが見つからない");
  wasm.wasmPaths = {
    mjs: `${ortBaseUrl}ort-wasm-simd-threaded.asyncify.mjs`,
    wasm: `${ortBaseUrl}ort-wasm-simd-threaded.asyncify.wasm`,
  };
  wasm.numThreads = 1;  // 追加のワーカーを blob から起こさせない
  wasm.proxy = false;
}
