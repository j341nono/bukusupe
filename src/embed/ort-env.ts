import { env } from "@huggingface/transformers";

/**
 * MV3 で transformers.js を動かすための設定。
 *
 * - ONNX Runtime の .mjs / .wasm は既定で jsDelivr から読み込まれる。
 *   拡張機能ではプログラムの外部読み込みが禁止なので、同梱先へ向け直す。
 * - useWasmCache を false にする。true だと .mjs を blob: URL にして import するが、
 *   MV3 の CSP（script-src 'self'）では blob: のスクリプトを読み込めない。
 * - モデルの重み（データ）だけは Hugging Face から取得してキャッシュする。
 */
export function configureOrt(ortBaseUrl: string): void {
  env.allowLocalModels = false;   // chrome-extension://…/models/ を探しにいかせない
  env.allowRemoteModels = true;   // 重みは Hugging Face から
  env.useWasmCache = false;       // blob: URL 化を止める（CSP 対策）

  const wasm = env.backends.onnx.wasm;
  if (!wasm) throw new Error("ONNX の WASM バックエンドが見つからない");
  wasm.wasmPaths = {
    mjs: `${ortBaseUrl}ort-wasm-simd-threaded.asyncify.mjs`,
    wasm: `${ortBaseUrl}ort-wasm-simd-threaded.asyncify.wasm`,
  };
  wasm.numThreads = 1;  // 追加のワーカーを blob から起こさせない
  wasm.proxy = false;
}
