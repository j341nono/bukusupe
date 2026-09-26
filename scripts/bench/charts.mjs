/**
 * 報告書のグラフ（docs/bench/*.png）。依存を足さず、SVG で描いてヘッドレスの Chrome で PNG にする。
 * 件数に対する増え方を見るので、横軸は件数（対数）。色は docs/DESIGN.md の星図のパレットに寄せる。
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { launchExtension } from "../lib/harness.mjs";
import { ROOT } from "./lib.mjs";

const W = 760, H = 440, PAD = { l: 70, r: 190, t: 48, b: 56 };
const COLORS = ["#8fb4ff", "#e9e1cc", "#d8b878", "#9fd0c0", "#c9a0dc", "#f0a080", "#a0a8c8", "#7ec8e3"];
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);

function ticks(min, max, count = 5) {
  const span = max - min || 1;
  const step = 10 ** Math.floor(Math.log10(span / count));
  const nice = [1, 2, 2.5, 5, 10].map((m) => m * step).find((s) => span / s <= count) ?? step * 10;
  const out = [];
  for (let v = Math.ceil(min / nice) * nice; v <= max + 1e-9; v += nice) out.push(Number(v.toPrecision(10)));
  return out;
}

/** series: [{ name, points: [[x, y]], dashed? }] */
export function lineChart({ title, xLabel = "ブックマークの件数", yLabel, series, logX = true, yMin = 0 }) {
  const xs = series.flatMap((s) => s.points.map((p) => p[0]));
  const ys = series.flatMap((s) => s.points.map((p) => p[1])).filter(Number.isFinite);
  const xMin = Math.min(...xs), xMax = Math.max(...xs);
  const yMax = Math.max(...ys) * 1.1 || 1;
  const fx = (x) => PAD.l + ((logX ? Math.log10(x) - Math.log10(xMin) : x - xMin) / ((logX ? Math.log10(xMax) - Math.log10(xMin) : xMax - xMin) || 1)) * (W - PAD.l - PAD.r);
  const fy = (y) => H - PAD.b - ((y - yMin) / (yMax - yMin || 1)) * (H - PAD.t - PAD.b);
  const parts = [`<rect width="${W}" height="${H}" fill="#0b1024"/>`,
    `<text x="${PAD.l}" y="28" fill="#ece6d6" font-size="16">${esc(title)}</text>`];
  for (const v of ticks(yMin, yMax)) {
    parts.push(`<line x1="${PAD.l}" x2="${W - PAD.r}" y1="${fy(v)}" y2="${fy(v)}" stroke="#2a3050"/>`,
      `<text x="${PAD.l - 8}" y="${fy(v) + 4}" fill="#a29d8c" font-size="11" text-anchor="end">${v}</text>`);
  }
  for (const x of [...new Set(xs)].sort((a, b) => a - b)) {
    parts.push(`<text x="${fx(x)}" y="${H - PAD.b + 18}" fill="#a29d8c" font-size="11" text-anchor="middle">${x}</text>`);
  }
  parts.push(`<text x="${(PAD.l + W - PAD.r) / 2}" y="${H - 14}" fill="#a29d8c" font-size="12" text-anchor="middle">${esc(xLabel)}${logX ? "（対数）" : ""}</text>`,
    `<text x="18" y="${(PAD.t + H - PAD.b) / 2}" fill="#a29d8c" font-size="12" text-anchor="middle" transform="rotate(-90 18 ${(PAD.t + H - PAD.b) / 2})">${esc(yLabel)}</text>`);
  series.forEach((s, i) => {
    const color = COLORS[i % COLORS.length];
    const pts = s.points.filter((p) => Number.isFinite(p[1])).sort((a, b) => a[0] - b[0]);
    if (!pts.length) return;
    parts.push(`<polyline fill="none" stroke="${color}" stroke-width="2" ${s.dashed ? 'stroke-dasharray="6 4"' : ""} points="${pts.map((p) => `${fx(p[0])},${fy(p[1])}`).join(" ")}"/>`,
      ...pts.map((p) => `<circle cx="${fx(p[0])}" cy="${fy(p[1])}" r="3" fill="${color}"/>`),
      `<line x1="${W - PAD.r + 16}" x2="${W - PAD.r + 36}" y1="${PAD.t + 10 + i * 20}" y2="${PAD.t + 10 + i * 20}" stroke="${color}" stroke-width="2" ${s.dashed ? 'stroke-dasharray="6 4"' : ""}/>`,
      `<text x="${W - PAD.r + 42}" y="${PAD.t + 14 + i * 20}" fill="#ece6d6" font-size="11">${esc(s.name)}</text>`);
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" font-family="Hiragino Kaku Gothic ProN, sans-serif">${parts.join("")}</svg>`;
}

/** { ファイル名: SVG } を docs/bench/<名前>.png にする */
export async function renderCharts(charts) {
  const names = Object.keys(charts);
  if (!names.length) return [];
  const app = await launchExtension(null, { url: "about:blank", width: W, height: H });
  try {
    await app.send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: false }, app.sessionId);
    for (const name of names) {
      const html = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;overflow:hidden;background:#0b1024}svg{display:block}</style></head>` +
        `<body>${charts[name]}</body></html>`;
      await app.send("Page.navigate", { url: `data:text/html;charset=utf-8;base64,${Buffer.from(html).toString("base64")}` }, app.sessionId);
      await app.waitUntil("document.readyState === 'complete'", 5000, 50);
      const shot = await app.send("Page.captureScreenshot", { format: "png" }, app.sessionId);
      writeFileSync(join(ROOT, "docs/bench", `${name}.png`), Buffer.from(shot.data, "base64"));
    }
  } finally {
    await app.close();
  }
  return names.map((name) => `docs/bench/${name}.png`);
}
