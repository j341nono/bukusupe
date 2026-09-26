// 依存なしで拡張機能のアイコン PNG を作る（`npm run icons`）。
// 星図の版画のように：深い藍の角丸の地に、淡い生成りの観測円と、しおり（ブックマーク）の形に並んだ 5 つの星を
// 細い線で結んだ星座。配色は docs/DESIGN.md の規則どおり藍と白〜生成りだけ（金は人が名付けた星座専用なので使わない）。
// 16px では観測円と背景の小さな星を省き、線と星を太らせて形だけを残す。
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";

const SIZES = [16, 32, 48, 128];
const OUT = new URL("../public/icons/", import.meta.url);

function crc32(buf) {
  let c, crc = 0xffffffff;
  for (let n = 0; n < buf.length; n++) {
    c = (crc ^ buf[n]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = c ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function png(size, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // RGBA
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0; // filter: none
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const mix = (a, b, t) => a + (b - a) * t;

/** 点 (px, py) と線分 a–b の距離 */
function segmentDistance(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const t = clamp01(((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy));
  return Math.hypot(px - (ax + dx * t), py - (ay + dy * t));
}

/** 角丸の正方形の中なら正（縁までの距離）、外なら負 */
function roundedSquare(u, v, radius) {
  const qx = Math.abs(u - 0.5) - (0.5 - radius), qy = Math.abs(v - 0.5) - (0.5 - radius);
  const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0);
  return radius - outside;
}

// しおりの形：上の 2 つ、下の 2 つ、下辺の切れ込み。左上の星だけ少し青白く明るい（最近触れた星）
const BOOKMARK = [[0.34, 0.25], [0.66, 0.25], [0.66, 0.77], [0.5, 0.635], [0.34, 0.77]];
const BOOKMARK_16 = [[4.5, 3.5], [11.5, 3.5], [11.5, 12.5], [8, 10], [4.5, 12.5]];
const STAR_GAIN = [1.25, 0.95, 0.9, 1.0, 0.85];
// 背景のかすかな星
const SPECKS = [[0.18, 0.2, 0.5], [0.83, 0.16, 0.4], [0.86, 0.62, 0.45], [0.15, 0.58, 0.35], [0.24, 0.88, 0.3], [0.8, 0.88, 0.4]];

const NIGHT_EDGE = [7, 10, 24];      // #070a18
const NIGHT_CENTER = [24, 31, 66];   // 中心をわずかに明るい藍に（周辺減光）
const CREAM = [236, 230, 214];       // #ece6d6
const STAR = [251, 248, 240];
const BLUE_WHITE = [226, 236, 255];

function render(size) {
  const small = size <= 16;
  const px = 1 / size;
  const lineWidth = small ? 1.05 * px : Math.max(0.9 * px, 0.014);
  const starRadius = small ? 1.25 * px : 0.034;
  // 16px は頂点を画素の中心に合わせ、線がにじまないようにする
  const shape = small ? BOOKMARK_16.map(([bx, by]) => [bx / 16, by / 16]) : BOOKMARK;
  const buf = Buffer.alloc(size * 4 * size);
  const ss = 4; // 超サンプリング
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < ss; sy++) {
        for (let sx = 0; sx < ss; sx++) {
          const u = (x + (sx + 0.5) / ss) / size;
          const v = (y + (sy + 0.5) / ss) / size;
          const inside = roundedSquare(u, v, 0.2);
          if (inside <= 0) continue;
          const d = Math.hypot(u - 0.5, v - 0.47);
          const t = clamp01(d / 0.62);
          let c = NIGHT_CENTER.map((n, i) => mix(n, NIGHT_EDGE[i], t * t));

          const over = (color, alpha) => { c = c.map((n, i) => mix(n, color[i], clamp01(alpha))); };
          if (!small) {
            // 観測円（星図の外周の細い円）と、背景のかすかな星
            const ring = Math.abs(Math.hypot(u - 0.5, v - 0.5) - 0.405);
            over(CREAM, 0.22 * clamp01(1 - ring / (0.6 * px + 0.004)));
            for (const [sxp, syp, gain] of SPECKS) {
              const sd = Math.hypot(u - sxp, v - syp);
              over(CREAM, gain * Math.exp(-(sd * sd) / (2 * (0.9 * px + 0.006) ** 2)));
            }
          }
          // 星座の線（しおりの輪郭）
          let line = Infinity;
          for (let i = 0; i < shape.length; i++) {
            const [ax, ay] = shape[i], [bx, by] = shape[(i + 1) % shape.length];
            line = Math.min(line, segmentDistance(u, v, ax, ay, bx, by));
          }
          over(CREAM, (small ? 0.72 : 0.62) * clamp01((lineWidth / 2 - line) / (0.5 * px) + 0.5));
          // 星：芯と、にじみ。左上の星だけ短い四条の光
          shape.forEach(([cx, cy], i) => {
            const sd = Math.hypot(u - cx, v - cy);
            const gain = STAR_GAIN[i];
            const color = i === 0 ? BLUE_WHITE : STAR;
            over(color, gain * Math.exp(-(sd * sd) / (2 * (starRadius * 0.55) ** 2)));
            over(color, 0.35 * gain * Math.exp(-(sd * sd) / (2 * (starRadius * 1.3) ** 2)));
            if (i === 0 && !small) {
              const dx = Math.abs(u - cx), dy = Math.abs(v - cy);
              const spike = Math.exp(-(dy * dy) / (2 * (0.5 * px + 0.003) ** 2)) * Math.exp(-dx / 0.05) +
                Math.exp(-(dx * dx) / (2 * (0.5 * px + 0.003) ** 2)) * Math.exp(-dy / 0.05);
              over(color, 0.8 * spike);
            }
          });
          const edge = clamp01(inside * size * 1.5);
          r += c[0] * edge; g += c[1] * edge; b += c[2] * edge; a += 255 * edge;
        }
      }
      const n = ss * ss;
      const i = (y * size + x) * 4;
      // 透明な縁の色は、不透明度で割って戻す（縁が黒ずまないように）
      const alpha = a / n / 255;
      buf[i] = Math.round(alpha > 0 ? clamp01(r / n / 255 / alpha) * 255 : 0);
      buf[i + 1] = Math.round(alpha > 0 ? clamp01(g / n / 255 / alpha) * 255 : 0);
      buf[i + 2] = Math.round(alpha > 0 ? clamp01(b / n / 255 / alpha) * 255 : 0);
      buf[i + 3] = Math.round(clamp01(alpha) * 255);
    }
  }
  return buf;
}

mkdirSync(OUT, { recursive: true });
for (const size of SIZES) {
  const file = new URL(`icon${size}.png`, OUT);
  writeFileSync(file, png(size, render(size)));
  console.log("wrote", file.pathname);
}
