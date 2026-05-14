import type { Bookmark, PlanetLayout } from '../../shared/types';

const EMBED_PREFIX = 'embed:';
const LAYOUT_KEY = 'layout:v2';

export interface CachedEmbedding {
  vector: number[];
  modelId: string;
}

export interface CachedLayout {
  setHash: string;
  modelId: string;
  layout: PlanetLayout;
  computedAt: number;
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function urlKey(url: string): Promise<string> {
  return sha256Hex(url);
}

export async function bookmarkKey(b: Bookmark): Promise<string> {
  return urlKey(b.url);
}

function embedStorageKey(urlHash: string): string {
  return `${EMBED_PREFIX}${urlHash}`;
}

export async function loadEmbeddings(
  urlHashes: string[],
): Promise<Map<string, CachedEmbedding>> {
  if (urlHashes.length === 0) return new Map();
  const fullKeys = urlHashes.map(embedStorageKey);
  const result = await chrome.storage.local.get(fullKeys);
  const out = new Map<string, CachedEmbedding>();
  for (const h of urlHashes) {
    const v = result[embedStorageKey(h)] as CachedEmbedding | undefined;
    if (v) out.set(h, v);
  }
  return out;
}

export async function saveEmbeddings(
  entries: Map<string, CachedEmbedding>,
): Promise<void> {
  if (entries.size === 0) return;
  const map: Record<string, CachedEmbedding> = {};
  for (const [h, v] of entries) {
    map[embedStorageKey(h)] = v;
  }
  await chrome.storage.local.set(map);
}

export async function deleteEmbeddingByUrl(url: string): Promise<void> {
  const hash = await urlKey(url);
  await chrome.storage.local.remove(embedStorageKey(hash));
}

export async function loadLayout(): Promise<CachedLayout | undefined> {
  const result = await chrome.storage.local.get(LAYOUT_KEY);
  return result[LAYOUT_KEY] as CachedLayout | undefined;
}

export async function saveLayout(layout: CachedLayout): Promise<void> {
  await chrome.storage.local.set({ [LAYOUT_KEY]: layout });
}

export async function hashBookmarkSet(ids: string[]): Promise<string> {
  const sorted = [...ids].sort().join(',');
  return (await sha256Hex(sorted)).slice(0, 24);
}
