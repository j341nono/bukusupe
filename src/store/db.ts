/**
 * IndexedDB。埋め込みベクトル（384 次元の float32）と、配置・星座（M2 / M4）を置く。
 * 画面を開くたびに再計算しないための土台。依存なしの薄い包み。
 */
const DB_NAME = "bukusupe";
const DB_VERSION = 2;

export const STORE_EMBEDDINGS = "embeddings";
export const STORE_META = "meta";
export const STORE_CONSTELLATIONS = "constellations";

export type StoredEmbedding = {
  id: string;
  hash: string;   // 入力文のハッシュ。変わったときだけ計算し直す
  vec: Float32Array;
};

let dbPromise: Promise<IDBDatabase> | null = null;

export function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_EMBEDDINGS)) {
        db.createObjectStore(STORE_EMBEDDINGS, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META, { keyPath: "key" });
      }
      if (!db.objectStoreNames.contains(STORE_CONSTELLATIONS)) {
        db.createObjectStore(STORE_CONSTELLATIONS, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

const done = (tx: IDBTransaction): Promise<void> =>
  new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });

export async function readAllEmbeddings(): Promise<Map<string, StoredEmbedding>> {
  const db = await openDb();
  const tx = db.transaction(STORE_EMBEDDINGS, "readonly");
  const req = tx.objectStore(STORE_EMBEDDINGS).getAll();
  const rows: StoredEmbedding[] = await new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result as StoredEmbedding[]);
    req.onerror = () => reject(req.error);
  });
  return new Map(rows.map((r) => [r.id, r]));
}

export async function writeEmbeddings(rows: StoredEmbedding[]): Promise<void> {
  if (rows.length === 0) return;
  const db = await openDb();
  const tx = db.transaction(STORE_EMBEDDINGS, "readwrite");
  const store = tx.objectStore(STORE_EMBEDDINGS);
  for (const row of rows) store.put(row);
  await done(tx);
}

export async function deleteEmbeddings(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  const db = await openDb();
  const tx = db.transaction(STORE_EMBEDDINGS, "readwrite");
  const store = tx.objectStore(STORE_EMBEDDINGS);
  for (const id of ids) store.delete(id);
  await done(tx);
}

export async function readMeta<T>(key: string): Promise<T | undefined> {
  const db = await openDb();
  const tx = db.transaction(STORE_META, "readonly");
  const req = tx.objectStore(STORE_META).get(key);
  const row: { key: string; value: T } | undefined = await new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return row?.value;
}

export async function writeMeta<T>(key: string, value: T): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(STORE_META, "readwrite");
  tx.objectStore(STORE_META).put({ key, value });
  await done(tx);
}

export async function readConstellations<T>(): Promise<T[]> {
  const db = await openDb();
  const tx = db.transaction(STORE_CONSTELLATIONS, "readonly");
  const req = tx.objectStore(STORE_CONSTELLATIONS).getAll();
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result as T[]);
    req.onerror = () => reject(req.error);
  });
}

export async function writeConstellation<T extends { id: string }>(row: T): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(STORE_CONSTELLATIONS, "readwrite");
  tx.objectStore(STORE_CONSTELLATIONS).put(row);
  await done(tx);
}

export async function deleteConstellation(id: string): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(STORE_CONSTELLATIONS, "readwrite");
  tx.objectStore(STORE_CONSTELLATIONS).delete(id);
  await done(tx);
}
