/**
 * 飛行中、近づいた星に開く窓（SPEC 13 章）：サイトのアイコン・タイトル・ドメイン。
 *
 * - どの星に窓を開くか（近い順に最大 6 個）は約 0.12 秒ごとに決める。位置は毎コマ transform で動かす
 *   （地図のラベルと同じ方式。毎コマ DOM のレイアウトを読まない）。
 * - アイコンは拡張機能の `_favicon`（`chrome-extension://…/_favicon/?pageUrl=…`）から得る。外部には取りに行かない。
 *   初めて窓を開くときに読み込み、読み込んだ要素は星ごとに使い回す。拡張機能の外（開発サーバー）ではドメインの頭文字で代える。
 */
import { FLIGHT_SCALE } from "../render/flight";

/** 窓を開く距離（広げた空間の単位。地図の座標で 8 に当たる。星の間隔の約 4 つ分） */
export const WINDOW_RADIUS = 8 * FLIGHT_SCALE;
export const MAX_WINDOWS = 6;
const DECIDE_SECONDS = 0.12;

export type WindowStar = { id: string; title: string; url: string };

type Entry = { el: HTMLDivElement; star: WindowStar };

const domainOf = (url: string) => {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
};

export function faviconUrl(pageUrl: string, size = 32): string | null {
  if (typeof chrome === "undefined" || !chrome.runtime?.getURL) return null;
  const url = new URL(chrome.runtime.getURL("/_favicon/"));
  url.searchParams.set("pageUrl", pageUrl);
  url.searchParams.set("size", String(size));
  return url.toString();
}

export class FlightWindows {
  private readonly entries = new Map<string, Entry>();
  private shown: string[] = [];
  private timer = 0;
  /** いま範囲（WINDOW_RADIUS）の中にある星の数（確認用） */
  nearby = 0;

  constructor(private readonly container: HTMLElement) {}

  /**
   * 1 コマ分。distanceOf で星までの距離、project で画面の位置（写らなければ null）を得る。
   * stars は窓を開く候補（地図に並んでいるすべての星）。
   */
  update(dt: number, stars: WindowStar[], distanceOf: (id: string) => number,
    project: (id: string) => { x: number; y: number; near: number } | null): void {
    this.timer -= dt;
    if (this.timer <= 0) {
      this.timer = DECIDE_SECONDS;
      const within = stars
        .map((star) => ({ star, d: distanceOf(star.id) }))
        .filter((row) => row.d < WINDOW_RADIUS)
        .sort((a, b) => a.d - b.d || (a.star.id < b.star.id ? -1 : 1));
      this.nearby = within.length;
      const chosen = within.slice(0, MAX_WINDOWS).map((row) => row.star);
      this.show(chosen);
    }
    for (const id of this.shown) {
      const entry = this.entries.get(id);
      if (!entry) continue;
      const at = project(id);
      if (!at) { entry.el.style.opacity = "0"; continue; }
      // 星の右上に置く。近いほどはっきり
      entry.el.style.opacity = String(0.55 + 0.45 * at.near);
      entry.el.style.transform = `translate3d(${(at.x + 14).toFixed(1)}px, ${(at.y - 34).toFixed(1)}px, 0)`;
    }
  }

  clear(): void {
    this.show([]);
    this.nearby = 0;
    this.timer = 0;
  }

  /** 表示中の窓の星（確認用） */
  get visibleIds(): string[] {
    return this.shown.slice();
  }

  private show(stars: WindowStar[]): void {
    const next = new Set(stars.map((star) => star.id));
    for (const id of this.shown) {
      if (next.has(id)) continue;
      const entry = this.entries.get(id);
      if (entry) entry.el.style.display = "none";
    }
    for (const star of stars) {
      let entry = this.entries.get(star.id);
      if (!entry) {
        entry = { el: this.build(star), star };
        this.entries.set(star.id, entry);
        this.container.appendChild(entry.el);
      }
      entry.el.style.display = "";
    }
    this.shown = stars.map((star) => star.id);
  }

  /** 窓を作る。アイコンの読み込みはここで初めて始まり、以後はこの要素を使い回す。 */
  private build(star: WindowStar): HTMLDivElement {
    const el = document.createElement("div");
    el.className = "flight-window";
    el.dataset.key = star.id;
    const icon = faviconUrl(star.url);
    const domain = domainOf(star.url);
    if (icon) {
      const img = document.createElement("img");
      img.alt = "";
      img.width = 16;
      img.height = 16;
      img.decoding = "async";
      img.src = icon;
      el.appendChild(img);
    } else {
      const glyph = document.createElement("span");
      glyph.className = "flight-window-glyph";
      glyph.textContent = (domain[0] ?? "?").toUpperCase();
      el.appendChild(glyph);
    }
    const text = document.createElement("div");
    const title = document.createElement("div");
    title.className = "flight-window-title";
    title.textContent = star.title;
    const sub = document.createElement("div");
    sub.className = "flight-window-domain";
    sub.textContent = domain;
    text.append(title, sub);
    el.appendChild(text);
    el.style.opacity = "0";
    return el;
  }
}

/**
 * 飛行中の星団名（SPEC 13 章）：遠くからも標識のように見え、近づいたら薄くなる。明朝（`docs/DESIGN.md`）。
 * 位置は毎コマ transform で動かす（星雲の雲の上端の少し上）。
 */
export type SignSpec = { index: number; name: string; x: number; y: number; z: number; radius: number };

export class FlightSigns {
  private signs: { spec: SignSpec; el: HTMLDivElement }[] = [];

  constructor(private readonly container: HTMLElement) {}

  set(specs: SignSpec[]): void {
    for (const { el } of this.signs) el.remove();
    this.signs = specs.map((spec) => {
      const el = document.createElement("div");
      el.className = "flight-sign";
      el.dataset.cluster = String(spec.index);
      el.textContent = spec.name;
      el.style.opacity = "0";
      this.container.appendChild(el);
      return { spec, el };
    });
  }

  /**
   * project で画面の位置（写らなければ null）、distanceOf で宇宙船から星団の中心までの距離を得る。
   * 星団の半径より外では 0.85、中へ入るほど 0.12 まで薄くなる。
   */
  update(project: (x: number, y: number, z: number) => { x: number; y: number } | null,
    distanceOf: (spec: SignSpec) => number, level: number): void {
    for (const { spec, el } of this.signs) {
      const at = project(spec.x, spec.y + spec.radius * 0.9, spec.z);
      if (!at || level <= 0) { el.style.display = "none"; continue; }
      const d = distanceOf(spec);
      const inside = Math.min(1, Math.max(0, (d - spec.radius * 0.4) / (spec.radius * 1.2)));
      el.style.display = "";
      el.style.opacity = String((0.12 + 0.73 * inside) * level);
      el.style.transform = `translate3d(${at.x.toFixed(1)}px, ${at.y.toFixed(1)}px, 0) translate(-50%, -100%)`;
    }
  }

  clear(): void {
    for (const { el } of this.signs) el.style.display = "none";
  }
}
