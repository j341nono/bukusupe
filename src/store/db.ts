import type { BookmarkSourceKind } from "../bookmarks/types";
import type { Lang } from "../i18n";

/**
 * IndexedDB。埋め込みベクトル（384 次元の float32）と、配置・星座（M2 / M4）を置く。
 * 画面を開くたびに再計算しないための土台。依存なしの薄い包み。
 *
 * DB はデータ源ごとに分ける（bukusupe-chrome / bukusupe-sample-ja / bukusupe-sample-en）。
 * 一つにすると、サンプルと実ブックマークを行き来したときに、相手の埋め込みを「消えた分」として
 * 削除し、星座のメンバーを空にし、相手の平均ベクトルを使い回してしまう。
 * サンプルは画面の言語ごとにブックマークが違う（段階 3c）ので、言語ごとにも DB を分ける。
 */
let dbName: string | null = null;
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

/** どのデータ源の DB を使うか。最初に DB を開く前に一度だけ決める。sampleLang はデータ源が sample のときだけ要る。 */
export function useDataSource(kind: BookmarkSourceKind, bench?: string, sampleLang?: Lang): void {
  // bench は測定（?debug=1&bench=…）のときだけ。生成したブックマークの DB を、サンプルの DB と分ける
  const next = __DEBUG__ && bench ? `bukusupe-bench-${bench}` : kind === "sample" ? `bukusupe-sample-${sampleLang}` : `bukusupe-${kind}`;
  if (dbPromise && next !== dbName) throw new Error("DB を開いた後にデータ源は変えられない");
  dbName = next;
}

export function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  if (!dbName) throw new Error("useDataSource() より先に DB を開こうとした");
  const name = dbName;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(name, DB_VERSION);
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
    // 古い版のページが DB を開いたままだと、版上げがそのページの終了を待って止まる。
    // 相手には onversionchange で閉じてもらい、ここでは待っていることを知らせる。
    req.onblocked = () => {
      console.warn("[ブクスペ] 古いタブが DB を開いたままのため、閉じられるのを待っている");
      onBlocked?.();
    };
    req.onsuccess = () => {
      const db = req.result;
      // 別のタブが新しい版で開こうとしたら、こちらは閉じて読み込み直す（相手を止めない）
      db.onversionchange = () => {
        db.close();
        dbPromise = null;
        location.reload();
      };
      resolve(db);
    };
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

let onBlocked: (() => void) | null = null;

/** DB の版上げが古いタブに止められているときの知らせ先（画面に出すため）。 */
export function onDbBlocked(handler: () => void): void {
  onBlocked = handler;
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
