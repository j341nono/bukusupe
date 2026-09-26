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

/** 操作の全文（ⓘ の中）。画面下の説明は最初の約 10 秒で消えるので、ここに必ず全部を置く。 */
const HELP = `
  <ul class="hud-help">
    <li><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>・左ドラッグ　移動</li>
    <li><kbd>Space</kbd> 縮小　<kbd>Shift</kbd> 拡大（ホイールでも）</li>
    <li>右ドラッグの上下　傾き</li>
    <li><kbd>/</kbd> 検索欄へ　<kbd>Esc</kbd> 検索を消して抜ける</li>
    <li><kbd>↑</kbd><kbd>↓</kbd> 候補を選ぶ　<kbd>Enter</kbd> 同じタブで開く（<kbd>Ctrl</kbd>/<kbd>⌘</kbd> で新しいタブ）</li>
    <li><kbd>Shift</kbd>+<kbd>Enter</kbd> 検索結果を星座にする</li>
    <li>星団名をクリック　その星団へ移動</li>
    <li>星をクリック　カード（ダブルクリックで開く）</li>
  </ul>`;

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
    ${HELP}
  `;
}

export function renderHudMessage(message: string, phase: HudPhase = "loading"): void {
  const el = document.getElementById("hud");
  if (!el) return;
  document.body.dataset.phase = phase;
  el.innerHTML = `<div class="hud-title">ブクスペ</div><div class="hud-status">${escape(message)}</div>`;
}

/** 左上のパネルの開閉。?demo=1 のときは丸ごと隠す。 */
let userToggled = false;

export function setupHudControls(): void {
  // 画面下の操作の説明は、最初の約 10 秒だけ見せる
  window.setTimeout(() => document.getElementById("hint")?.classList.add("is-faded"), 10_000);
  if (new URLSearchParams(location.search).get("demo") === "1") {
    document.body.classList.add("is-demo");
    return;
  }
  document.getElementById("hud-toggle")?.addEventListener("click", () => {
    userToggled = true;
    document.getElementById("hud")?.classList.toggle("is-collapsed");
  });
}

/**
 * 準備ができたらパネルを ⓘ に畳む（読み込みの進み具合は見せたいので、最初は開いておく）。
 * 使う人が自分で開閉した後は、勝手に畳まない。
 */
export function settleHud(): void {
  if (userToggled) return;
  document.getElementById("hud")?.classList.add("is-collapsed");
}
