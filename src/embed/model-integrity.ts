import { env } from "@huggingface/transformers";
import { MODEL_CACHE } from "./ort-env";
import type { EmbedDtype } from "./protocol";

/** 公開済みモデルのコミット。内容の SHA-256 も下に固定する。 */
export const MODEL_REVISION = "761b726dd34fb83930e26aab4e9ac3899aa1fa78";
const HASHES: Record<string, string> = {
  "config.json": "cb99455288675345e1a4f411438d5d0adbba5fbd3a67ea4fb03c015433b996c1",
  "tokenizer_config.json": "a1d6bc8734a6f635dc158508bef000f8e2e5a759c7d92f984b2c86e5ff53425b",
  "special_tokens_map.json": "d05497f1da52c5e09554c0cd874037a083e1dc1b9cfd48034d1c717f1afc07a7",
  "tokenizer.json": "0b44a9d7b51c3c62626640cda0e2c2f70fdacdc25bbbd68038369d14ebdf4c39",
  "onnx/model_quantized.onnx": "f80102d3f2a1229f387d3c81909990d8945513e347b0eab049f7de3c6f98c193",
  "onnx/model_fp16.onnx": "0e0fe349c99ea21c6f3aa273af21f7fb753c1e1174ef1647032029c2be3251c3",
  "onnx/model.onnx": "4aa845c27760e06e9a686b9d8b5d440eae4b6612cd09e5b522b716d3941f77ff",
};

const hex = (bytes: Uint8Array): string => [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");

/** 不正なファイルはキャッシュから除き、ライブラリへ一切渡さない。 */
export async function prepareVerifiedModel(model: string, dtype: EmbedDtype,
  progress: (file: string, percent: number) => void): Promise<void> {
  const cache = await caches.open(MODEL_CACHE);
  const files = ["config.json", "tokenizer_config.json", "tokenizer.json", "special_tokens_map.json",
    dtype === "q8" ? "onnx/model_quantized.onnx" : dtype === "fp16" ? "onnx/model_fp16.onnx" : "onnx/model.onnx"];
  for (const file of files) {
    const url = `https://huggingface.co/${model}/resolve/${MODEL_REVISION}/${file}`;
    let response = await cache.match(url);
    const wasCached = !!response;
    if (!response) {
      progress(file, 0);
      response = await fetch(url);
      if (!response.ok) throw new Error(`モデルの取得に失敗しました（${file}: ${response.status}）`);
    }
    const bytes = await response.arrayBuffer();
    const hash = hex(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)));
    if (hash !== HASHES[file]) {
      if (wasCached) await cache.delete(url);
      throw new Error(`MODEL_INTEGRITY_ERROR: モデルの検証に失敗しました（${file}）。再読み込みしてください。`);
    }
    if (!wasCached) await cache.put(url, new Response(bytes, { headers: { "content-type": "application/octet-stream" } }));
    progress(file, 100);
  }
  // 検証済みキャッシュだけをライブラリに読ませる。欠落があれば失敗させ、未検証の通信には戻さない。
  env.useCustomCache = true;
  env.customCache = {
    match: async (key: string) => {
      const file = files.find((name) => key.endsWith(`/${name}`));
      return file ? cache.match(`https://huggingface.co/${model}/resolve/${MODEL_REVISION}/${file}`) : undefined;
    },
    put: async () => { throw new Error("検証前のモデルをキャッシュに入れられない"); },
  };
  env.allowLocalModels = true;
  env.allowRemoteModels = false;
}
