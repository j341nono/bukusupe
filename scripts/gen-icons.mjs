// 依存なしで拡張機能のアイコン PNG を作る。
// 夜空の丸に、中央の星（四条の光）と小さな星をいくつか。
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";

const SIZES = [16, 48, 128];
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

// 小さな星（相対座標・相対サイズ・明るさ）
const SPECKS = [
  [0.26, 0.28, 0.055, 0.9],
  [0.74, 0.3, 0.045, 0.75],
  [0.3, 0.74, 0.045, 0.7],
  [0.72, 0.71, 0.05, 0.85],
  [0.5, 0.18, 0.035, 0.6],
  [0.19, 0.52, 0.035, 0.55],
  [0.82, 0.52, 0.035, 0.55],
];

function render(size) {
  const buf = Buffer.alloc(size * 4 * size);
  const ss = 3; // 超サンプリング
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < ss; sy++) {
        for (let sx = 0; sx < ss; sx++) {
          const u = (x + (sx + 0.5) / ss) / size;
          const v = (y + (sy + 0.5) / ss) / size;
          const dx = u - 0.5, dy = v - 0.5;
          const d = Math.hypot(dx, dy);

          // 夜空の円（縁は少しだけぼかす）
          const edge = clamp01((0.48 - d) * size * 0.9);
          if (edge <= 0) continue;
          // 中心に向かって藍から紫へ
          const t = clamp01(d / 0.48);
          let cr = 12 + 34 * (1 - t) * (1 - t);
          let cg = 14 + 20 * (1 - t) * (1 - t);
          let cb = 38 + 58 * (1 - t) * (1 - t);

          // 中央の星：核 + 四条の光
          const core = Math.exp(-(d * d) / (2 * 0.016));
          const spikeH = Math.exp(-(dy * dy) / (2 * 0.00035)) * Math.exp(-(dx * dx) / (2 * 0.028));
          const spikeV = Math.exp(-(dx * dx) / (2 * 0.00035)) * Math.exp(-(dy * dy) / (2 * 0.028));
          let star = clamp01(core + 0.75 * (spikeH + spikeV));

          // 小さな星
          let specks = 0;
          for (const [px, py, pr, pi] of SPECKS) {
            const pd = Math.hypot(u - px, v - py);
            specks += pi * Math.exp(-(pd * pd) / (2 * pr * pr * 0.35));
          }
          star = clamp01(star + specks * 0.9);

          cr += (255 - cr) * star;
          cg += (250 - cg) * star;
          cb += (235 - cb) * Math.min(1, star * 1.1);

          r += cr * edge; g += cg * edge; b += cb * edge; a += 255 * edge;
        }
      }
      const n = ss * ss;
      const i = (y * size + x) * 4;
      buf[i] = Math.round(clamp01(r / n / 255) * 255);
      buf[i + 1] = Math.round(clamp01(g / n / 255) * 255);
      buf[i + 2] = Math.round(clamp01(b / n / 255) * 255);
      buf[i + 3] = Math.round(clamp01(a / n / 255) * 255);
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
