/**
 * 画面の言語（SPEC 14 章）。設定は「自動／English／日本語」で、初期値は「自動」。
 * 「自動」はブラウザの言語が日本語なら日本語、それ以外は英語。選んだ設定は localStorage に残し、次に開いたときも使う。
 * 切り替えたら、読み込み直さずに画面の文言を差し替える（静的な文言は data-i18n の属性、動く文言は onLangChange で描き直す）。
 */
import en from "./en";
import ja, { type MessageKey, type Messages } from "./ja";

export type Lang = "ja" | "en";
export type LangSetting = "auto" | Lang;
export type { MessageKey };

const DICTIONARIES: Record<Lang, Messages> = { ja, en };
export const LANG_SETTING_KEY = "bukusupe:lang";
const SETTINGS: readonly LangSetting[] = ["auto", "en", "ja"];

/** ブラウザの言語から決める。日本語（ja, ja-JP …）なら日本語、それ以外は英語 */
export function detectLang(language: string | undefined = typeof navigator === "undefined" ? undefined : navigator.language): Lang {
  return /^ja(-|$)/i.test(language ?? "") ? "ja" : "en";
}

export function readLangSetting(): LangSetting {
  try {
    const saved = localStorage.getItem(LANG_SETTING_KEY) as LangSetting | null;
    return saved && SETTINGS.includes(saved) ? saved : "auto";
  } catch { return "auto"; }
}

const resolve = (setting: LangSetting): Lang => (setting === "auto" ? detectLang() : setting);

let setting: LangSetting = readLangSetting();
let current: Lang = resolve(setting);
const listeners: (() => void)[] = [];

export const lang = (): Lang => current;
export const langSetting = (): LangSetting => setting;

/** 言語が変わったときに描き直すもの（動く文言）を登録する */
export function onLangChange(listener: () => void): void {
  listeners.push(listener);
}

/** 設定を変えて保存し、画面の文言をその場で差し替える */
export function setLangSetting(next: LangSetting): void {
  if (!SETTINGS.includes(next)) return;
  setting = next;
  try { localStorage.setItem(LANG_SETTING_KEY, next); } catch { /* 保存できなくても、このページの切り替えは行う */ }
  const changed = resolve(next) !== current;
  current = resolve(next);
  applyStaticText();
  for (const input of document.querySelectorAll<HTMLSelectElement>("select[data-lang-picker]")) input.value = setting;
  if (changed) for (const listener of listeners) listener();
}

const numberFormat = new Map<Lang, Intl.NumberFormat>();
export function formatNumber(value: number): string {
  let format = numberFormat.get(current);
  if (!format) numberFormat.set(current, format = new Intl.NumberFormat(current));
  return format.format(value);
}

/** 0〜100 の進み具合を、言語に合わせた百分率で書く */
export function formatPercent(percent: number): string {
  return new Intl.NumberFormat(current, { style: "percent", maximumFractionDigits: 0 }).format(Math.max(0, Math.min(100, percent)) / 100);
}

type Params = Record<string, string | number>;

/**
 * 文言を引く。params の数は Intl で書く。params.count があり、英語の単数形（Intl.PluralRules が "one"）なら `key#one` を使う。
 */
export function t(key: MessageKey, params: Params = {}): string {
  const dict = DICTIONARIES[current];
  let text: string = dict[key];
  if (typeof params.count === "number") {
    const plural = `${key}#${new Intl.PluralRules(current).select(params.count)}` as MessageKey;
    if (plural in dict) text = dict[plural];
  }
  return text.replace(/\{(\w+)\}/g, (whole, name: string) => {
    const value = params[name];
    return value === undefined ? whole : typeof value === "number" ? formatNumber(value) : value;
  });
}

/**
 * `[[W]]` をキーの表示（kbd）にして入れる。文字はすべて textContent と Text で入れる（HTML として解釈しない。規則 9）。
 */
export function setRichText(el: Element, text: string): void {
  const parts: Node[] = [];
  for (const [i, piece] of text.split(/\[\[(.+?)\]\]/).entries()) {
    if (!piece) continue;
    if (i % 2 === 1) {
      const kbd = document.createElement("kbd");
      kbd.textContent = piece;
      parts.push(kbd);
    } else parts.push(document.createTextNode(piece));
  }
  el.replaceChildren(...parts);
}

/**
 * index.html の静的な文言（data-i18n・data-i18n-title・data-i18n-placeholder・data-i18n-aria-label）を入れる。
 * root が要素なら、その要素自身と中の要素。document なら、ページの題と言語（html の lang）も。
 */
export function applyStaticText(root: ParentNode = document): void {
  const all = (selector: string): HTMLElement[] =>
    [...(root instanceof HTMLElement && root.matches(selector) ? [root] : []), ...root.querySelectorAll<HTMLElement>(selector)];
  if (root === document) {
    document.documentElement.lang = current;
    document.title = t("app.name");
  }
  for (const el of all("[data-i18n]")) setRichText(el, t(el.dataset.i18n as MessageKey, paramsOf(el)));
  for (const [key, attribute] of [["i18nTitle", "title"], ["i18nPlaceholder", "placeholder"], ["i18nAriaLabel", "aria-label"]] as const) {
    for (const el of all(`[data-i18n-${attribute}]`)) el.setAttribute(attribute, t(el.dataset[key] as MessageKey, paramsOf(el)));
  }
}

/** data-i18n-params（JSON）で差し込む値 */
function paramsOf(el: HTMLElement): Params {
  try { return el.dataset.i18nParams ? JSON.parse(el.dataset.i18nParams) as Params : {}; } catch { return {}; }
}

/**
 * 言語の選択欄（ⓘ のパネルと初回の説明画面に置く）。選ぶとその場で切り替わる。
 */
export function createLangPicker(id: string): HTMLLabelElement {
  const label = document.createElement("label");
  label.className = "lang-picker";
  const caption = document.createElement("span");
  caption.dataset.i18n = "lang.label";
  const select = document.createElement("select");
  select.id = id;
  select.dataset.langPicker = "";
  for (const value of SETTINGS) {
    const option = document.createElement("option");
    option.value = value;
    option.dataset.i18n = `lang.${value}`;
    select.append(option);
  }
  select.value = setting;
  select.addEventListener("change", () => setLangSetting(select.value as LangSetting));
  label.append(caption, select);
  applyStaticText(label);
  return label;
}
