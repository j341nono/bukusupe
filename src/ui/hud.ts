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

/**
 * 操作の全文（ⓘ の中）。画面下の説明は最初の約 10 秒で消えるので、ここに必ず全部を置く。
 * 各行は「キー（kbd）と文言」の並び。文字列を HTML として解釈させないよう、要素を組み立てて入れる（規則 9）。
 */
type HelpPart = { key: string } | string;
const HELP: HelpPart[][] = [
  [{ key: "W" }, { key: "A" }, { key: "S" }, { key: "D" }, "・左ドラッグ　移動"],
  [{ key: "Space" }, " 縮小　", { key: "Shift" }, " 拡大（ホイールでも）"],
  ["右ドラッグの上下　傾き"],
  [{ key: "/" }, " 検索欄へ　", { key: "Esc" }, " 検索を消して抜ける"],
  [{ key: "↑" }, { key: "↓" }, " 候補を選ぶ　", { key: "Enter" }, " 同じタブで開く（", { key: "Ctrl" }, "/", { key: "⌘" }, " で新しいタブ）"],
  [{ key: "Shift" }, "+", { key: "Enter" }, " 検索結果を星座にする"],
  ["星団名をクリック　その星団へ移動"],
  ["星をクリック　カード（ダブルクリックで開く）"],
];

/** 要素を作って文言を入れる（textContent。HTML として解釈しない） */
function node<K extends keyof HTMLElementTagNameMap>(tag: K, className = "", text = ""): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

function helpList(): HTMLUListElement {
  const list = node("ul", "hud-help");
  for (const parts of HELP) {
    const item = node("li");
    for (const part of parts) item.append(typeof part === "string" ? part : node("kbd", "", part.key));
    list.append(item);
  }
  return list;
}

function line(label: string, value: string): HTMLDivElement {
  const el = node("div", "hud-line");
  el.append(node("span", "hud-key", label), value);
  return el;
}

/** ⓘ のパネルの「サンプルの宇宙で試す／自分のブックマークに戻る」。null なら出さない（Web のデモ、ブックマークが無いとき） */
let sourceSwitch: BookmarkSourceKind | null = null;
let onSourceSwitch: ((to: BookmarkSourceKind) => void) | null = null;

export function setSourceSwitch(to: BookmarkSourceKind | null, handler: (to: BookmarkSourceKind) => void): void {
  sourceSwitch = to;
  onSourceSwitch = handler;
}

const SWITCH_LABEL: Record<BookmarkSourceKind, string> = {
  sample: "サンプルの宇宙で試す",
  chrome: "自分のブックマークに戻る",
};

export function renderHud(state: HudState): void {
  const el = document.getElementById("hud");
  if (!el) return;
  if (state.phase) document.body.dataset.phase = state.phase;
  const parts: Node[] = [node("div", "hud-title", "ブクスペ"), line("星", String(state.count)), line("データ源", SOURCE_LABEL[state.kind])];
  if (state.status) {
    parts.push(node("div", "hud-status", state.status));
    if (state.progress != null) {
      const bar = node("div", "hud-bar");
      const fill = node("i");
      fill.style.width = `${Math.round(Math.min(1, Math.max(0, state.progress)) * 100)}%`;
      bar.append(fill);
      parts.push(bar);
    }
  }
  if (sourceSwitch) {
    const button = node("button", "hud-switch", SWITCH_LABEL[sourceSwitch]);
    button.id = "source-toggle";
    button.type = "button";
    parts.push(button);
  }
  parts.push(helpList());
  el.replaceChildren(...parts);
}

export function renderHudMessage(message: string, phase: HudPhase = "loading"): void {
  const el = document.getElementById("hud");
  if (!el) return;
  document.body.dataset.phase = phase;
  el.replaceChildren(node("div", "hud-title", "ブクスペ"), node("div", "hud-status", message));
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
  // パネルは描き直されるので、切り替えのボタンは親で受ける
  document.getElementById("hud")?.addEventListener("click", (event) => {
    if ((event.target as HTMLElement | null)?.id === "source-toggle" && sourceSwitch) onSourceSwitch?.(sourceSwitch);
  });
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
