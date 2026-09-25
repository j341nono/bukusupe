/// <reference lib="webworker" />
import { pipeline, type FeatureExtractionPipeline } from "@huggingface/transformers";
import { configureOrt } from "./ort-env";
import type { EmbedRequest, EmbedResponse } from "./protocol";

// 計算は拡張機能ページから起動したこの Worker で行う。UI は止めない（SPEC 6 章）。
let extractor: Promise<FeatureExtractionPipeline> | null = null;

const post = (msg: EmbedResponse) => self.postMessage(msg);

function load(model: string): Promise<FeatureExtractionPipeline> {
  return pipeline("feature-extraction", model, {
    dtype: "q8",      // onnx/model_quantized.onnx（int8、約118MB）
    device: "wasm",   // WebGPU は使わない（SPEC 6 章）
    progress_callback: (p: { status: string; file?: string; progress?: number }) => {
      if (p.status === "progress" && p.progress != null) {
        post({ type: "download", file: p.file ?? "", progress: p.progress });
      }
    },
  });
}

self.onmessage = async (event: MessageEvent<EmbedRequest>) => {
  const msg = event.data;
  try {
    if (msg.type === "init") {
      configureOrt(msg.ortBaseUrl);
      extractor = load(msg.model);
      await extractor;
      post({ type: "ready", model: msg.model });
      return;
    }

    if (msg.type === "embed") {
      if (!extractor) throw new Error("init より先に embed が来た");
      const model = await extractor;
      const output = await model(msg.texts, { pooling: "mean", normalize: true });
      const dim = output.dims.at(-1) ?? 0;
      const flat = output.data as Float32Array;
      const vectors: Float32Array[] = [];
      for (let i = 0; i < msg.texts.length; i++) {
        // 転送のため実体を切り出す（Float32Array の view のままだと送れない）
        vectors.push(flat.slice(i * dim, (i + 1) * dim));
      }
      post({ type: "vectors", requestId: msg.requestId, vectors });
    }
  } catch (err) {
    post({
      type: "error",
      requestId: msg.type === "embed" ? msg.requestId : undefined,
      message: String((err as Error)?.stack ?? err),
    });
  }
};
