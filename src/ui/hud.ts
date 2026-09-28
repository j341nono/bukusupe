import type { BookmarkSourceKind } from "../bookmarks/types";
import { createLangPicker, formatNumber, onLangChange, setRichText, t, type MessageKey } from "../i18n";

const SOURCE_LABEL: Record<BookmarkSourceKind, MessageKey> = {
  chrome: "hud.sourceChrome",
  sample: "hud.sourceSample",
};

/** いまどこまで進んだか。自動確認はこれを見る（文言を変えても壊れないように）。 */
export type HudPhase = "loading" | "model" | "embed" | "layout" | "ready" | "error";

export type HudState = {
  count: number;
  kind: BookmarkSourceKind;
  phase?: HudPhase;
  /** 進み具合の一行。空なら出さない。言語を切り替えたときに引き直せるよう、関数で渡す */
  status?: () => string;
  /** 0..1。あれば細い棒を出す */
  progress?: number;
};

/**
 * 操作の全文（ⓘ の中）。画面下の説明は最初の約 10 秒で消えるので、ここに必ず全部を置く。
 * 文言は辞書にあり、`[[W]]` がキーの表示（kbd）になる。HTML として解釈させない（規則 9、`setRichText`）。
 */
const HELP: MessageKey[] = [
  "help.move", "help.zoom", "help.tilt", "help.search", "help.open", "help.constellation", "help.selection", "help.cluster", "help.star",
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
  for (const key of HELP) {
    const item = node("li");
    setRichText(item, t(key));
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

const SWITCH_LABEL: Record<BookmarkSourceKind, MessageKey> = {
  sample: "hud.switchToSample",
  chrome: "hud.switchToChrome",
};

/** 最後に描いた中身。言語を切り替えたら、これで描き直す */
let redraw: (() => void) | null = null;

/**
 * パネルの中身（#hud-body）を描く。言語の選択欄はその外に 1 度だけ置く（進み具合のたびに作り直すと、開いた選択肢が閉じてしまうため）。
 */
function hudBody(): HTMLElement | null {
  const hud = document.getElementById("hud");
  if (hud && !document.getElementById("hud-lang")) hud.append(createLangPicker("hud-lang"));
  return document.getElementById("hud-body");
}

export function renderHud(state: HudState): void {
  const el = hudBody();
  if (!el) return;
  redraw = () => renderHud(state);
  if (state.phase) document.body.dataset.phase = state.phase;
  const parts: Node[] = [node("div", "hud-title", t("app.name")), line(t("hud.stars"), formatNumber(state.count)),
    line(t("hud.source"), t(SOURCE_LABEL[state.kind]))];
  if (state.status) {
    parts.push(node("div", "hud-status", state.status()));
    if (state.progress != null) {
      const bar = node("div", "hud-bar");
      const fill = node("i");
      fill.style.width = `${Math.round(Math.min(1, Math.max(0, state.progress)) * 100)}%`;
      bar.append(fill);
      parts.push(bar);
    }
  }
  if (sourceSwitch) {
    const button = node("button", "hud-switch", t(SWITCH_LABEL[sourceSwitch]));
    button.id = "source-toggle";
    button.type = "button";
    parts.push(button);
  }
  parts.push(helpList());
  el.replaceChildren(...parts);
}

export function renderHudMessage(message: MessageKey, phase: HudPhase = "loading"): void {
  const el = hudBody();
  if (!el) return;
  redraw = () => renderHudMessage(message, phase);
  document.body.dataset.phase = phase;
  el.replaceChildren(node("div", "hud-title", t("app.name")), node("div", "hud-status", t(message)));
}

onLangChange(() => redraw?.());

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
