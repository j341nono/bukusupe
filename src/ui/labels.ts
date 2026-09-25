import * as THREE from "three";

export type LabelItem = {
  key: string;
  text: string;
  x: number;
  y: number;
  kind: "cluster" | "star";
  /** 小さいほど大事。重なったときはこの順に残す */
  priority: number;
};

export type ZoomTier = "far" | "mid" | "near";

/** 同時に出すラベルの上限（SPEC 7 章）。 */
const MAX_LABELS = 60;

const FONT = { cluster: 13, star: 11 } as const;

/**
 * タイトルは HTML の重ね表示で描く（SPEC 7 章）。
 * 重要度の高い順に置いていき、すでに置いたものと重なるものは間引く。
 */
export class LabelLayer {
  private readonly pool: HTMLDivElement[] = [];
  private readonly measure = document.createElement("canvas").getContext("2d");

  constructor(private readonly container: HTMLElement) {}

  render(items: LabelItem[], camera: THREE.Camera, width: number, height: number): number {
    const placed: { l: number; t: number; r: number; b: number }[] = [];
    const shown: { item: LabelItem; sx: number; sy: number }[] = [];
    const v = new THREE.Vector3();

    const sorted = [...items].sort((a, b) => a.priority - b.priority);
    for (const item of sorted) {
      if (shown.length >= MAX_LABELS) break;
      v.set(item.x, 0, -item.y).project(camera);
      if (v.z > 1) continue;                                   // カメラの後ろ
      const sx = (v.x * 0.5 + 0.5) * width;
      const sy = (-v.y * 0.5 + 0.5) * height;
      if (sx < -80 || sx > width + 80 || sy < -40 || sy > height + 40) continue;

      const size = FONT[item.kind];
      const w = this.textWidth(item.text, size) + 10;
      const h = size + 8;
      const box = { l: sx - w / 2, t: sy - h / 2 - size, r: sx + w / 2, b: sy + h / 2 - size };
      if (placed.some((p) => p.l < box.r && box.l < p.r && p.t < box.b && box.t < p.b)) continue;

      placed.push(box);
      shown.push({ item, sx, sy });
    }

    this.paint(shown);
    return shown.length;
  }

  clear(): void {
    this.paint([]);
  }

  private paint(shown: { item: LabelItem; sx: number; sy: number }[]): void {
    while (this.pool.length < shown.length) {
      const el = document.createElement("div");
      el.className = "label";
      this.container.appendChild(el);
      this.pool.push(el);
    }
    shown.forEach(({ item, sx, sy }, i) => {
      const el = this.pool[i];
      el.textContent = item.text;
      el.className = `label label-${item.kind}`;
      el.style.transform = `translate(-50%, -100%) translate(${sx.toFixed(1)}px, ${(sy - 9).toFixed(1)}px)`;
      el.style.display = "block";
    });
    for (let i = shown.length; i < this.pool.length; i++) this.pool[i].style.display = "none";
  }

  private textWidth(text: string, size: number): number {
    if (!this.measure) return text.length * size * 0.9;
    this.measure.font = `${size}px sans-serif`;
    return this.measure.measureText(text).width;
  }
}
