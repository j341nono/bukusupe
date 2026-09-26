import { WINDOW_RADIUS, type WindowStar } from "./flight-windows";
import { FLIGHT_SCALE } from "../render/flight";

const LIMIT = 24;
const FAR_RADIUS = 30 * FLIGHT_SCALE;
const DECIDE_SECONDS = 0.2;
type Position = { x: number; y: number };
type Label = { id: string; el: HTMLDivElement; width: number };

/** 窓の外側にある星の小さな名前。採否は間引いて決め、位置は毎コマ動かす。 */
export class FlightFarLabels {
  readonly limit = LIMIT;
  private readonly entries = new Map<string, Label>();
  private shown: Label[] = [];
  private timer = 0;

  constructor(private readonly container: HTMLElement) {}

  update(dt: number, stars: WindowStar[], nearIds: string[], distanceOf: (id: string) => number,
    project: (id: string) => Position | null): void {
    this.timer -= dt;
    if (this.timer <= 0) {
      this.timer = DECIDE_SECONDS;
      const near = new Set(nearIds);
      const candidates: { star: WindowStar; d: number }[] = [];
      // 数千件では決定的な間隔で候補を取る。近い窓は別に全件から選ばれる。
      const stride = Math.max(1, Math.ceil(stars.length / 400));
      for (let i = 0; i < stars.length; i += stride) {
        const star = stars[i];
        if (near.has(star.id)) continue;
        const d = distanceOf(star.id);
        if (d >= WINDOW_RADIUS && d < FAR_RADIUS) candidates.push({ star, d });
      }
      candidates.sort((a, b) => a.d - b.d || a.star.id.localeCompare(b.star.id));
      const taken: { x: number; y: number; w: number }[] = [];
      const chosen: Label[] = [];
      let examined = 0;
      for (const { star } of candidates) {
        if (++examined > 160) break;
        const at = project(star.id);
        if (!at || at.x < 24 || at.y < 80 || at.x > innerWidth - 24 || at.y > innerHeight - 52) continue;
        let label = this.entries.get(star.id);
        const width = label?.width ?? Math.min(180, Math.max(28, [...star.title].length * 12));
        const box = { x: at.x + 10, y: at.y - 14, w: width + 20 };
        if (taken.some((other) => box.x < other.x + other.w + 16 && other.x < box.x + box.w + 16 &&
          box.y < other.y + 30 && other.y < box.y + 30)) continue;
        if (!label) {
          const el = document.createElement("div");
          el.className = "flight-far-label";
          el.dataset.key = star.id;
          el.textContent = star.title;
          el.style.display = "none";
          this.container.appendChild(el);
          label = { id: star.id, el, width };
          this.entries.set(star.id, label);
        }
        taken.push(box);
        chosen.push(label);
        if (chosen.length >= LIMIT) break;
      }
      const ids = new Set(chosen.map((label) => label.id));
      for (const label of this.shown) if (!ids.has(label.id)) label.el.style.display = "none";
      for (const label of chosen) label.el.style.display = "";
      this.shown = chosen;
    }
    for (const label of this.shown) {
      const at = project(label.id);
      if (!at) { label.el.style.display = "none"; continue; }
      label.el.style.transform = `translate3d(${(at.x + 10).toFixed(1)}px, ${(at.y - 14).toFixed(1)}px, 0)`;
    }
  }

  clear(): void {
    for (const label of this.shown) label.el.style.display = "none";
    this.shown = [];
    this.timer = 0;
  }
}
