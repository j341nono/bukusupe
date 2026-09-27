import type { EmbedDtype, EmbedRequest, EmbedResponse } from "./protocol";
import { ortBaseUrl } from "./ort-url";

/**
 * 埋め込みの窓口。実装は差し替えられるようにしておく
 * （MV3 で transformers.js が動かない場合の退避策のため。PLAN の M1 を参照）。
 */
export interface Embedder {
  readonly model: string;
  /** モデルの読み込みが終わるまで待つ。読み込みの進み具合は onDownload に流れる。 */
  ready(): Promise<void>;
  embed(texts: string[]): Promise<Float32Array[]>;
  dispose(): void;
  onDownload?: (file: string, progress: number) => void;
}

export const MODEL_ID = "Xenova/multilingual-e5-small";

/** Worker 越しに transformers.js を使う実装。 */
export class WorkerEmbedder implements Embedder {
  readonly model = MODEL_ID;
  onDownload?: (file: string, progress: number) => void;

  private readonly worker: Worker;
  private readonly waiting = new Map<number, { resolve: (v: Float32Array[]) => void; reject: (e: Error) => void }>();
  private readonly memoryWaiting = new Map<number, (v: { bytes: number; memories: number }) => void>();
  private nextId = 1;
  private readyPromise: Promise<void>;

  /**
   * options は測定（?debug=1）のときだけ渡す：debug で Worker が WebAssembly のメモリを答えるようにし、
   * dtype で量子化を切り替える（通常は q8）。
   */
  constructor(private readonly options: { debug?: boolean; dtype?: EmbedDtype } = {}) {
    // Vite は Worker の起動の書き方を静的に読むので、2 通りをそのまま書く（確認用のビルドだけ debug の名前で起こす）
    this.worker = __DEBUG__ && options.debug
      ? new Worker(new URL("./embed.worker.ts", import.meta.url), { type: "module", name: "bukusupe-debug" })
      : new Worker(new URL("./embed.worker.ts", import.meta.url), { type: "module" });

    let resolveReady: () => void;
    let rejectReady: (e: Error) => void;
    this.readyPromise = new Promise<void>((res, rej) => {
      resolveReady = res;
      rejectReady = rej;
    });

    this.worker.onmessage = (event: MessageEvent<EmbedResponse>) => {
      const msg = event.data;
      switch (msg.type) {
        case "ready":
          resolveReady();
          break;
        case "download":
          this.onDownload?.(msg.file, msg.progress);
          break;
        case "memory":
          if (__DEBUG__) {
            this.memoryWaiting.get(msg.requestId)?.({ bytes: msg.bytes, memories: msg.memories });
            this.memoryWaiting.delete(msg.requestId);
          }
          break;
        case "vectors": {
          this.waiting.get(msg.requestId)?.resolve(msg.vectors);
          this.waiting.delete(msg.requestId);
          break;
        }
        case "error": {
          const err = new Error(msg.message);
          if (msg.requestId != null) {
            this.waiting.get(msg.requestId)?.reject(err);
            this.waiting.delete(msg.requestId);
          } else {
            rejectReady(err);
          }
          break;
        }
      }
    };
    this.worker.onerror = (e) => rejectReady(new Error(`Worker が落ちた: ${e.message}`));

    this.send({ type: "init", ortBaseUrl: ortBaseUrl(), model: this.model,
      ...(__DEBUG__ && this.options.dtype ? { dtype: this.options.dtype } : {}) });
  }

  ready(): Promise<void> {
    return this.readyPromise;
  }

  embed(texts: string[]): Promise<Float32Array[]> {
    if (texts.length === 0) return Promise.resolve([]);
    const requestId = this.nextId++;
    return new Promise((resolve, reject) => {
      this.waiting.set(requestId, { resolve, reject });
      this.send({ type: "embed", requestId, texts });
    });
  }

  dispose(): void {
    this.worker.terminate();
    for (const { reject } of this.waiting.values()) reject(new Error("Worker を止めた"));
    this.waiting.clear();
  }

  private send(msg: EmbedRequest): void {
    this.worker.postMessage(msg);
  }
}

/**
 * 確認用：Worker の中の WebAssembly のメモリの合計（バイト）。debug で起動したときだけ意味がある。
 * 配布用のビルドでは使わないので、クラスの外の関数にしてビルドの時点で取り除かれるようにする（規則 11）。
 */
export function requestWasmMemory(embedder: WorkerEmbedder): Promise<{ bytes: number; memories: number }> {
  const inner = embedder as unknown as {
    nextId: number; memoryWaiting: Map<number, (v: { bytes: number; memories: number }) => void>; worker: Worker;
  };
  const requestId = inner.nextId++;
  return new Promise((resolve) => {
    inner.memoryWaiting.set(requestId, resolve);
    inner.worker.postMessage({ type: "memory", requestId } satisfies EmbedRequest);
  });
}
