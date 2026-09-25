import type { BookmarkSourceKind } from "../bookmarks/types";

const SOURCE_LABEL: Record<BookmarkSourceKind, string> = {
  chrome: "Chrome",
  sample: "サンプル",
};

/** 画面左上の状態表示。M0 では件数とデータ源だけ。 */
export function renderHud(count: number, kind: BookmarkSourceKind): void {
  const el = document.getElementById("hud");
  if (!el) return;
  el.innerHTML = `
    <div class="hud-title">ブクスペ</div>
    <div class="hud-line"><span class="hud-key">星</span>${count}</div>
    <div class="hud-line"><span class="hud-key">データ源</span>${SOURCE_LABEL[kind]}</div>
  `;
  el.classList.add("is-ready");
}

export function renderHudMessage(message: string): void {
  const el = document.getElementById("hud");
  if (!el) return;
  el.innerHTML = `<div class="hud-title">ブクスペ</div><div class="hud-line">${message}</div>`;
}
