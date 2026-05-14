/// <reference lib="webworker" />
import {
  pipeline,
  env,
  type FeatureExtractionPipeline,
} from '@huggingface/transformers';
import type { WorkerRequest, WorkerResponse } from '../../shared/types';

env.allowLocalModels = false;
env.allowRemoteModels = true;

// `chrome.*` is not available inside regular Web Workers, so the main
// thread passes the extension's ort/ URL via the init message. We apply
// it before pipeline() is called.
function applyWasmPaths(base: string): void {
  const onnxBackend = env.backends?.onnx;
  if (onnxBackend?.wasm) {
    onnxBackend.wasm.wasmPaths = base;
  }
}

let extractor: FeatureExtractionPipeline | undefined;
let currentModelId: string | undefined;

function post(msg: WorkerResponse): void {
  (self as unknown as DedicatedWorkerGlobalScope).postMessage(msg);
}

async function ensureModel(modelId: string): Promise<void> {
  if (extractor && currentModelId === modelId) return;
  // pipeline() returns a complex union; narrow via unknown for the embedding task.
  const p: unknown = await pipeline('feature-extraction', modelId);
  extractor = p as FeatureExtractionPipeline;
  currentModelId = modelId;
}

self.addEventListener('message', async (event: MessageEvent<WorkerRequest>) => {
  const msg = event.data;
  try {
    if (msg.type === 'init') {
      applyWasmPaths(msg.wasmBase);
      await ensureModel(msg.modelId);
      post({ type: 'ready' });
      return;
    }
    if (msg.type === 'embed') {
      if (!extractor) throw new Error('Embedding model not initialized');
      const BATCH = 16;
      const vectors: number[][] = [];
      const total = msg.texts.length;
      for (let i = 0; i < total; i += BATCH) {
        const batch = msg.texts.slice(i, i + BATCH);
        const output = await extractor(batch, {
          pooling: 'mean',
          normalize: true,
        });
        const data = output.tolist() as number[][];
        vectors.push(...data);
        post({
          type: 'progress',
          jobId: msg.jobId,
          done: Math.min(i + BATCH, total),
          total,
        });
      }
      post({ type: 'embed:done', jobId: msg.jobId, vectors });
    }
  } catch (e) {
    const jobId = 'jobId' in msg ? msg.jobId : undefined;
    post({
      type: 'error',
      jobId,
      message: e instanceof Error ? e.message : String(e),
    });
  }
});
