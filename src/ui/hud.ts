import type { BookmarkSourceKind } from "../bookmarks/types";

const SOURCE_LABEL: Record<BookmarkSourceKind, string> = {
  chrome: "Chrome",
  sample: "サンプル",
};

/** いまどこまで進んだか。自動確認はこれを見る（文言を変えても壊れないように）。 */
export type HudPhase = "loading" | "model" | "embed" | "layout" | "ready" | "error";

export type HudState = {
  count: number;
  kind: BookmarkSourceKind;
  phase?: HudPhase;
  /** 進み具合の一行。空なら出さない */
  status?: string;
  /** 0..1。あれば細い棒を出す */
  progress?: number;
};

const escape = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

export function renderHud(state: HudState): void {
  const el = document.getElementById("hud");
  if (!el) return;
  if (state.phase) document.body.dataset.phase = state.phase;
  const bar =
    state.progress == null
      ? ""
      : `<div class="hud-bar"><i style="width:${Math.round(state.progress * 100)}%"></i></div>`;
  el.innerHTML = `
    <div class="hud-title">ブクスペ</div>
    <div class="hud-line"><span class="hud-key">星</span>${state.count}</div>
    <div class="hud-line"><span class="hud-key">データ源</span>${SOURCE_LABEL[state.kind]}</div>
    ${state.status ? `<div class="hud-status">${escape(state.status)}</div>${bar}` : ""}
  `;
}

export function renderHudMessage(message: string, phase: HudPhase = "loading"): void {
  const el = document.getElementById("hud");
  if (!el) return;
  document.body.dataset.phase = phase;
  el.innerHTML = `<div class="hud-title">ブクスペ</div><div class="hud-status">${escape(message)}</div>`;
}
