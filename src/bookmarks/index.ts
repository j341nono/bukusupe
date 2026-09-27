import type { BookmarkSnapshot } from "./types";
import { hasChromeBookmarks, loadChromeBookmarks } from "./chrome-source";
import { loadSampleBookmarks } from "./sample-source";

/** ⓘ のパネルで「サンプルの宇宙で試す」を選んだか（このブラウザに覚える。ブックマーク自体には触らない） */
const PREFER_SAMPLE_KEY = "bukusupe:prefer-sample";

export function prefersSample(): boolean {
  try { return localStorage.getItem(PREFER_SAMPLE_KEY) === "1"; } catch { return false; }
}

export function setPreferSample(on: boolean): void {
  try {
    if (on) localStorage.setItem(PREFER_SAMPLE_KEY, "1");
    else localStorage.removeItem(PREFER_SAMPLE_KEY);
  } catch { /* 保存できなくても、このページの切り替えは URL で行う */ }
}

/**
 * データ源を決めて読み込む。
 * - 拡張機能として動いていれば Chrome のブックマーク
 * - 開発サーバー・Web のデモ（chrome.bookmarks が無い）ならサンプル
 * - `?sample=1` か、ⓘ のパネルで「サンプルの宇宙で試す」を選んでいればサンプル
 * chromeCount は Chrome のブックマーク（http(s) のもの）の件数。サンプルを表示しているときも数える
 * （「自分のブックマークに戻る」を出すか、少ないときに案内を出すかの判断に使う）。
 */
export async function loadBookmarks(): Promise<BookmarkSnapshot & { chromeCount: number; bench?: string }> {
  const bench = await loadBenchBookmarks();
  if (bench) return bench;
  const forced = new URLSearchParams(location.search).get("sample") === "1" || prefersSample();
  if (hasChromeBookmarks()) {
    try {
      const items = await loadChromeBookmarks();
      if (!forced && items.length > 0) return { kind: "chrome", items, chromeCount: items.length };
      return { kind: "sample", items: loadSampleBookmarks(), chromeCount: items.length };
    } catch (err) {
      console.warn("[ブクスペ] ブックマークを読めなかったのでサンプルに切り替える", err);
    }
  }
  return { kind: "sample", items: loadSampleBookmarks(), chromeCount: 0 };
}

/**
 * 測定用（docs/BENCHMARK.md）：`?debug=1&bench=<名前>` で開いたときだけ、測定スクリプトが chrome.storage.local の
 * `bench:<名前>` に書いた、サンプルから生成したブックマークを読み込む。データ源はサンプルとして扱い、DB は名前ごとに分ける。
 * ブックマーク自体には触らない。
 */
async function loadBenchBookmarks(): Promise<(BookmarkSnapshot & { chromeCount: number; bench: string }) | null> {
  const params = new URLSearchParams(location.search);
  const bench = params.get("debug") === "1" ? params.get("bench") : null;
  if (!bench || typeof chrome === "undefined" || !chrome.storage?.local) return null;
  const key = `bench:${bench}`;
  const items = (await chrome.storage.local.get(key))[key];
  return Array.isArray(items) ? { kind: "sample", items, chromeCount: 0, bench } : null;
}

export { SAMPLE_TODAY } from "./sample-source";
export * from "./types";
