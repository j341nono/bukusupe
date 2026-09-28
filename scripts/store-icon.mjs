/** ストア掲載用だけ、元の 128px アイコンを 96px に縮め、四辺に 16px の透明な余白を付ける。 */
import { deflateSync } from "node:zlib";
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { decodePng } from "./lib/harness.mjs";

function crc32(data) {
  let crc = 0xffffffff;
  for (const byte of data) {
    crc ^= byte;
    for (let k = 0; k < 8; k++) crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const body = Buffer.concat([Buffer.from(type), data]);
  const length = Buffer.alloc(4), crc = Buffer.alloc(4);
  length.writeUInt32BE(data.length); crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

export function writeStoreIcon(root = resolve(new URL("..", import.meta.url).pathname)) {
  const source = decodePng(readFileSync(join(root, "public/icons/icon128.png")));
  const pixels = Buffer.alloc(128 * 128 * 4);
  // 縮小は各出力画素に対応する元画像の中央を双線形で取る。
  for (let y = 0; y < 96; y++) for (let x = 0; x < 96; x++) {
    const sx = (x + 0.5) * 128 / 96 - 0.5, sy = (y + 0.5) * 128 / 96 - 0.5;
    const x0 = Math.max(0, Math.floor(sx)), y0 = Math.max(0, Math.floor(sy));
    const x1 = Math.min(127, x0 + 1), y1 = Math.min(127, y0 + 1);
    const fx = sx - x0, fy = sy - y0;
    for (let c = 0; c < 4; c++) {
      const at = (px, py) => source.data[(py * 128 + px) * 4 + c];
      const a = at(x0, y0) * (1 - fx) + at(x1, y0) * fx;
      const b = at(x0, y1) * (1 - fx) + at(x1, y1) * fx;
      pixels[((y + 16) * 128 + x + 16) * 4 + c] = Math.round(a * (1 - fy) + b * fy);
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(128, 0); ihdr.writeUInt32BE(128, 4); ihdr[8] = 8; ihdr[9] = 6;
  const raw = Buffer.alloc(128 * (1 + 128 * 4));
  for (let y = 0; y < 128; y++) pixels.copy(raw, y * (1 + 128 * 4) + 1, y * 128 * 4, (y + 1) * 128 * 4);
  writeFileSync(join(root, "docs/store/assets/icon-128.png"), Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0)),
  ]));
}

if (process.argv[1] && resolve(process.argv[1]) === new URL(import.meta.url).pathname) writeStoreIcon();
