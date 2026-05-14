import { Color } from 'three';

interface Categorizable {
  folderPath: string;
  hostname: string;
}

function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function categoryKey(b: Categorizable): string {
  const top = b.folderPath.split('/')[0];
  if (top) return `folder:${top}`;
  if (b.hostname) return `host:${b.hostname}`;
  return 'default';
}

export function categoryHueDegrees(b: Categorizable): number {
  return hashStr(categoryKey(b)) % 360;
}

export function categoryColor(b: Categorizable): Color {
  const h = categoryHueDegrees(b) / 360;
  return new Color().setHSL(h, 0.75, 0.62);
}

export function categoryCssColor(b: Categorizable, alpha = 1): string {
  const hue = categoryHueDegrees(b).toFixed(0);
  if (alpha >= 1) return `hsl(${hue}, 75%, 62%)`;
  return `hsla(${hue}, 75%, 62%, ${alpha})`;
}

const DAY = 24 * 60 * 60 * 1000;

/**
 * 0–30d → 1.0 (vivid), 30d–1y → fade to 0.55, 1y–3y → fade to 0.25, >3y → 0.25.
 */
export function weatheredOpacity(dateAddedMs: number): number {
  const age = Date.now() - dateAddedMs;
  if (age < 30 * DAY) return 1.0;
  if (age < 365 * DAY) {
    const t = (age - 30 * DAY) / (335 * DAY);
    return 1.0 - 0.45 * t;
  }
  if (age < 3 * 365 * DAY) {
    const t = (age - 365 * DAY) / (2 * 365 * DAY);
    return 0.55 - 0.3 * t;
  }
  return 0.25;
}
