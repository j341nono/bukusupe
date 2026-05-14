import type {
  Bookmark,
  WorkerRequest,
  WorkerResponse,
} from '../../shared/types';
import { bookmarkEmbedText } from './bookmarks';
import {
  bookmarkKey,
  loadEmbeddings,
  saveEmbeddings,
  type CachedEmbedding,
} from './store';

export const MODEL_ID = 'Xenova/multilingual-e5-small';

export interface EmbedProgress {
  done: number;
  total: number;
}

interface JobHandlers {
  resolve: (vectors: number[][]) => void;
  reject: (error: Error) => void;
  progress?: (p: EmbedProgress) => void;
}

export class EmbeddingService {
  private worker: Worker;
  private ready: Promise<void>;
  private jobs = new Map<string, JobHandlers>();
  private nextJobId = 1;

  constructor() {
    this.worker = new Worker(
      new URL('../workers/embed.worker.ts', import.meta.url),
      { type: 'module' },
    );

    this.ready = new Promise<void>((resolve, reject) => {
      const onMessage = (event: MessageEvent<WorkerResponse>): void => {
        if (event.data.type === 'ready') {
          this.worker.removeEventListener('message', onMessage);
          resolve();
        } else if (event.data.type === 'error' && !event.data.jobId) {
          this.worker.removeEventListener('message', onMessage);
          reject(new Error(event.data.message));
        }
      };
      this.worker.addEventListener('message', onMessage);
    });

    this.worker.addEventListener('message', (event: MessageEvent<WorkerResponse>) => {
      const msg = event.data;
      if (msg.type === 'embed:done') {
        const job = this.jobs.get(msg.jobId);
        if (job) {
          job.resolve(msg.vectors);
          this.jobs.delete(msg.jobId);
        }
      } else if (msg.type === 'progress') {
        const job = this.jobs.get(msg.jobId);
        job?.progress?.({ done: msg.done, total: msg.total });
      } else if (msg.type === 'error' && msg.jobId) {
        const job = this.jobs.get(msg.jobId);
        if (job) {
          job.reject(new Error(msg.message));
          this.jobs.delete(msg.jobId);
        }
      }
    });

    this.send({
      type: 'init',
      modelId: MODEL_ID,
      wasmBase: chrome.runtime.getURL('ort/'),
    });
  }

  private send(msg: WorkerRequest): void {
    this.worker.postMessage(msg);
  }

  async embedTexts(
    texts: string[],
    progress?: (p: EmbedProgress) => void,
  ): Promise<number[][]> {
    await this.ready;
    if (texts.length === 0) return [];
    const jobId = String(this.nextJobId++);
    return new Promise<number[][]>((resolve, reject) => {
      this.jobs.set(jobId, { resolve, reject, progress });
      this.send({ type: 'embed', jobId, texts });
    });
  }

  /**
   * Embeds bookmarks using cache where possible. Returns a map of bookmarkId → vector.
   */
  async embedBookmarks(
    bookmarks: Bookmark[],
    progress?: (p: EmbedProgress) => void,
  ): Promise<Map<string, number[]>> {
    const keys = await Promise.all(bookmarks.map(bookmarkKey));
    const cached = await loadEmbeddings(keys);

    const out = new Map<string, number[]>();
    const pending: { idx: number; bookmarkId: string; key: string; text: string }[] = [];

    for (let i = 0; i < bookmarks.length; i++) {
      const b = bookmarks[i];
      const k = keys[i];
      const entry = cached.get(k);
      if (entry && entry.modelId === MODEL_ID) {
        out.set(b.id, entry.vector);
      } else {
        pending.push({
          idx: i,
          bookmarkId: b.id,
          key: k,
          text: `passage: ${bookmarkEmbedText(b)}`,
        });
      }
    }

    if (pending.length === 0) {
      progress?.({ done: bookmarks.length, total: bookmarks.length });
      return out;
    }

    const cachedCount = bookmarks.length - pending.length;
    const vectors = await this.embedTexts(
      pending.map((p) => p.text),
      progress
        ? (p) =>
            progress({
              done: cachedCount + p.done,
              total: bookmarks.length,
            })
        : undefined,
    );

    const toSave = new Map<string, CachedEmbedding>();
    for (let i = 0; i < pending.length; i++) {
      const v = vectors[i];
      const p = pending[i];
      out.set(p.bookmarkId, v);
      toSave.set(p.key, { vector: v, modelId: MODEL_ID });
    }
    await saveEmbeddings(toSave);
    progress?.({ done: bookmarks.length, total: bookmarks.length });

    return out;
  }

  destroy(): void {
    this.worker.terminate();
  }
}
