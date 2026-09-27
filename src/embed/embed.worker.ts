/// <reference lib="webworker" />
import { pipeline, type FeatureExtractionPipeline } from "@huggingface/transformers";
import { configureOrt, dropOldModelCache } from "./ort-env";
import type { EmbedDtype, EmbedRequest, EmbedResponse } from "./protocol";

/**
 * 測定用（?debug=1 のときだけ。画面が Worker の名前を "bukusupe-debug" にして起動する）：
 * ONNX Runtime が作る WebAssembly のメモリを控えておき、大きさを答えられるようにする。
 * 通常の起動では何もしない。
 */
const wasmMemories: WebAssembly.Memory[] = [];
if (__DEBUG__ && self.name === "bukusupe-debug") {
  const remember = (instance: WebAssembly.Instance) => {
    for (const value of Object.values(instance.exports)) {
      if (value instanceof WebAssembly.Memory && !wasmMemories.includes(value)) wasmMemories.push(value);
    }
  };
  const NativeMemory = WebAssembly.Memory;
  WebAssembly.Memory = function (descriptor: WebAssembly.MemoryDescriptor) {
    const memory = new NativeMemory(descriptor);
    wasmMemories.push(memory);
    return memory;
  } as unknown as typeof WebAssembly.Memory;
  WebAssembly.Memory.prototype = NativeMemory.prototype;
  const instantiate = WebAssembly.instantiate.bind(WebAssembly) as (...args: unknown[]) =>
    Promise<WebAssembly.WebAssemblyInstantiatedSource | WebAssembly.Instance>;
  WebAssembly.instantiate = (async (...args: unknown[]) => {
    const result = await instantiate(...args);
    remember("instance" in result ? result.instance : result);
    return result;
  }) as unknown as typeof WebAssembly.instantiate;
  const streaming = WebAssembly.instantiateStreaming?.bind(WebAssembly);
  if (streaming) {
    WebAssembly.instantiateStreaming = (async (...args: Parameters<typeof WebAssembly.instantiateStreaming>) => {
      const result = await streaming(...args);
      remember(result.instance);
      return result;
    }) as typeof WebAssembly.instantiateStreaming;
  }
}

// 計算は拡張機能ページから起動したこの Worker で行う。UI は止めない（SPEC 6 章）。
let extractor: Promise<FeatureExtractionPipeline> | null = null;

const post = (msg: EmbedResponse) => self.postMessage(msg);

function load(model: string, dtype: EmbedDtype): Promise<FeatureExtractionPipeline> {
  return pipeline("feature-extraction", model, {
    dtype,            // 通常は q8 = onnx/model_quantized.onnx（int8、約118MB）。fp16・fp32 は測定の比較だけ
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
      // 量子化の切り替えは確認用のビルドだけ（配布用は常に q8）
      const dtype = __DEBUG__ ? msg.dtype ?? "q8" : "q8";
      // extractor は、この処理の中で待たずに（同期で）入れる。await の間に次の embed が届くと、準備の前だとみなして失敗するため。
      // 前の版のモデルのキャッシュ（transformers-cache）は、読み込みの前に消す。拡張機能だけ（Web のデモは origin を他のページと共有する）
      extractor = (async () => {
        if (!__WEB__) await dropOldModelCache();
        return load(msg.model, dtype);
      })();
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

    if (__DEBUG__ && msg.type === "memory") {
      const bytes = wasmMemories.reduce((sum, memory) => sum + memory.buffer.byteLength, 0);
      post({ type: "memory", requestId: msg.requestId, bytes, memories: wasmMemories.length });
    }
  } catch (err) {
    post({
      type: "error",
      requestId: msg.type === "init" ? undefined : msg.requestId,
      message: String((err as Error)?.stack ?? err),
    });
  }
};
