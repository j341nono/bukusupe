import type {
  LaidOutBookmark,
  PickResult,
  PlanetLayout,
  RingSpec,
  View,
} from '../shared/types';
import { weatheredOpacity } from './style/color';
import { faviconUrl, truncate } from './util/favicon';
import { PLANET_LAYOUT_CONSTANTS } from './data/layout';

interface Point {
  bookmark: LaidOutBookmark;
  baseOpacity: number;
  currentOpacity: number;
  scale: number;
}

const ICON_PX = 22;
const HALO_PX = 34;
const HIT_RADIUS_PX = 16;
const LABEL_GAP = 12;

export function create2DView(container: HTMLElement, initial: PlanetLayout): View {
  let layout = initial;
  const canvas = document.createElement('canvas');
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.cursor = 'grab';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  const points = new Map<string, Point>();
  let dpr = window.devicePixelRatio || 1;
  const camera = { tx: 0, ty: 0, scale: 1 };

  const imageCache = new Map<string, HTMLImageElement>();
  function getFaviconImg(url: string): HTMLImageElement {
    let key = '';
    try {
      key = new URL(url).hostname || url;
    } catch {
      key = url;
    }
    let img = imageCache.get(key);
    if (!img) {
      img = new Image();
      img.src = faviconUrl(url, 64);
      img.addEventListener('load', () => requestDraw());
      img.addEventListener('error', () => {
        /* fallback handled in draw */
      });
      imageCache.set(key, img);
    }
    return img;
  }

  function rebuild(next: PlanetLayout): void {
    layout = next;
    points.clear();
    for (const b of next.bookmarks) {
      const opacity = weatheredOpacity(b.dateAdded);
      points.set(b.id, {
        bookmark: b,
        baseOpacity: opacity,
        currentOpacity: opacity,
        scale: 1,
      });
      getFaviconImg(b.url);
    }
    fitToContent();
  }

  function maxRingRadius(): number {
    let r = PLANET_LAYOUT_CONSTANTS.PLANET_RADIUS;
    for (const ring of layout.rings) if (ring.radius > r) r = ring.radius;
    return r;
  }

  function fitToContent(): void {
    const r = maxRingRadius() * PLANET_LAYOUT_CONSTANTS.SCREEN_SCALE;
    const w = container.clientWidth || canvas.width / dpr || 1;
    const h = container.clientHeight || canvas.height / dpr || 1;
    const padding = 60;
    const sx = (w - padding * 2) / (r * 2);
    const sy = (h - padding * 2) / (r * 2);
    camera.scale = Math.max(0.2, Math.min(4, Math.min(sx, sy)));
    camera.tx = 0;
    camera.ty = 0;
  }

  rebuild(initial);

  function resize(): void {
    dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, container.clientWidth);
    const h = Math.max(1, container.clientHeight);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  }
  resize();

  function worldToScreen(x: number, y: number): [number, number] {
    return [
      canvas.width / 2 + (x + camera.tx) * camera.scale * dpr,
      canvas.height / 2 + (y + camera.ty) * camera.scale * dpr,
    ];
  }

  let rafScheduled = false;
  function requestDraw(): void {
    if (rafScheduled) return;
    rafScheduled = true;
    requestAnimationFrame(draw);
  }

  function drawBackground(): void {
    ctx.fillStyle = '#04060c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    for (let i = 0; i < 240; i++) {
      const px = (i * 1237) % canvas.width;
      const py = (i * 6997) % canvas.height;
      ctx.fillRect(px, py, 1, 1);
    }
  }

  function drawPlanet(): void {
    const [cx, cy] = worldToScreen(0, 0);
    const r =
      PLANET_LAYOUT_CONSTANTS.PLANET_RADIUS *
      PLANET_LAYOUT_CONSTANTS.SCREEN_SCALE *
      camera.scale *
      dpr;

    // Glow
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 2.4);
    glow.addColorStop(0, 'rgba(255,217,168,0.45)');
    glow.addColorStop(0.4, 'rgba(255,217,168,0.18)');
    glow.addColorStop(1, 'rgba(255,217,168,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 2.4, 0, Math.PI * 2);
    ctx.fill();

    // Body
    const body = ctx.createRadialGradient(
      cx - r * 0.3,
      cy - r * 0.3,
      r * 0.2,
      cx,
      cy,
      r,
    );
    body.addColorStop(0, '#f4d2a2');
    body.addColorStop(0.6, '#d09c6b');
    body.addColorStop(1, '#8b5a30');
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawRings(): void {
    const [cx, cy] = worldToScreen(0, 0);
    for (const ring of layout.rings) {
      const r =
        ring.radius * PLANET_LAYOUT_CONSTANTS.SCREEN_SCALE * camera.scale * dpr;
      // Faint outer
      ctx.strokeStyle = ring.cssColor;
      ctx.globalAlpha = 0.18;
      ctx.lineWidth = 6 * dpr;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      // Bright center
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Ring label at angle 0 (right)
      const labelX = cx + r + 16 * dpr;
      const labelY = cy;
      ctx.font = `${12 * dpr}px -apple-system, "Noto Sans JP", sans-serif`;
      const text = `${truncate(ring.name, 14)} · ${ring.count}`;
      const w = ctx.measureText(text).width;
      const padX = 8 * dpr;
      const padY = 4 * dpr;
      const h = 18 * dpr;
      ctx.fillStyle = 'rgba(8,12,24,0.7)';
      roundRect(
        ctx,
        labelX - padX,
        labelY - h / 2 - padY,
        w + padX * 2,
        h + padY * 2,
        6 * dpr,
      );
      ctx.fill();
      ctx.fillStyle = ring.cssColor;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, labelX, labelY);
    }
  }

  function ringColorFor(b: LaidOutBookmark): string {
    const spec: RingSpec | undefined = layout.rings[b.ringIndex];
    return spec ? spec.cssColor : '#cccccc';
  }

  function rgba(hex: string, alpha: number): string {
    // accept hsl(...) too
    if (hex.startsWith('hsl(')) {
      return hex.replace('hsl(', 'hsla(').replace(')', `, ${alpha})`);
    }
    if (!hex.startsWith('#')) return hex;
    const h = hex.slice(1);
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function draw(): void {
    rafScheduled = false;
    drawBackground();
    drawRings();
    drawPlanet();

    const showLabels = camera.scale > 0.55;
    const iconR = (ICON_PX / 2) * dpr;
    const haloR = (HALO_PX / 2) * dpr;

    for (const p of points.values()) {
      const [sx, sy] = worldToScreen(
        p.bookmark.position2d[0],
        p.bookmark.position2d[1],
      );
      const s = p.scale;
      const alpha = p.currentOpacity;
      const color = ringColorFor(p.bookmark);

      // Halo
      const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, haloR * s);
      grad.addColorStop(0, rgba(color, 0.65 * alpha));
      grad.addColorStop(0.45, rgba(color, 0.25 * alpha));
      grad.addColorStop(1, rgba(color, 0));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(sx, sy, haloR * s, 0, Math.PI * 2);
      ctx.fill();

      // Icon
      const img = getFaviconImg(p.bookmark.url);
      ctx.globalAlpha = alpha;
      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(
          img,
          sx - iconR * s,
          sy - iconR * s,
          iconR * 2 * s,
          iconR * 2 * s,
        );
      } else {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(sx, sy, iconR * s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (showLabels && p.currentOpacity > 0.2) {
        const text = truncate(
          p.bookmark.title || p.bookmark.hostname || 'Untitled',
          22,
        );
        ctx.font = `${11 * dpr}px -apple-system, "Noto Sans JP", sans-serif`;
        const tw = ctx.measureText(text).width;
        const th = 14 * dpr;
        const ty = sy + (iconR + LABEL_GAP) * dpr;
        const padX = 6 * dpr;
        const padY = 2 * dpr;
        ctx.fillStyle = `rgba(8,12,24,${0.6 * alpha})`;
        roundRect(
          ctx,
          sx - tw / 2 - padX,
          ty - th / 2 - padY,
          tw + padX * 2,
          th + padY * 2,
          4 * dpr,
        );
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${0.92 * alpha})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, sx, ty);
      }
    }
  }

  function roundRect(
    g: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ): void {
    const rad = Math.min(r, w / 2, h / 2);
    g.beginPath();
    g.moveTo(x + rad, y);
    g.lineTo(x + w - rad, y);
    g.quadraticCurveTo(x + w, y, x + w, y + rad);
    g.lineTo(x + w, y + h - rad);
    g.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
    g.lineTo(x + rad, y + h);
    g.quadraticCurveTo(x, y + h, x, y + h - rad);
    g.lineTo(x, y + rad);
    g.quadraticCurveTo(x, y, x + rad, y);
    g.closePath();
  }

  window.addEventListener('resize', () => {
    resize();
    requestDraw();
  });
  const ro = new ResizeObserver(() => {
    resize();
    requestDraw();
  });
  ro.observe(container);
  requestDraw();

  let dragging = false;
  let dragMoved = false;
  let lastX = 0;
  let lastY = 0;
  canvas.addEventListener('pointerdown', (e) => {
    dragging = true;
    dragMoved = false;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = 'grabbing';
  });
  canvas.addEventListener('pointerup', (e) => {
    dragging = false;
    canvas.releasePointerCapture(e.pointerId);
    canvas.style.cursor = pick(e.clientX, e.clientY) ? 'pointer' : 'grab';
  });
  canvas.addEventListener('pointermove', (e) => {
    if (dragging) {
      const dx = (e.clientX - lastX) / camera.scale;
      const dy = (e.clientY - lastY) / camera.scale;
      if (Math.abs(dx) + Math.abs(dy) > 1) dragMoved = true;
      camera.tx += dx;
      camera.ty += dy;
      lastX = e.clientX;
      lastY = e.clientY;
      requestDraw();
    } else {
      canvas.style.cursor = pick(e.clientX, e.clientY) ? 'pointer' : 'grab';
    }
  });
  canvas.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * 0.001);
      camera.scale = Math.max(0.15, Math.min(8, camera.scale * factor));
      requestDraw();
    },
    { passive: false },
  );

  function pick(clientX: number, clientY: number): PickResult | null {
    const rect = canvas.getBoundingClientRect();
    const tx = (clientX - rect.left) * dpr;
    const ty = (clientY - rect.top) * dpr;
    let best: PickResult | null = null;
    let bestDist = (HIT_RADIUS_PX * dpr) ** 2;
    for (const p of points.values()) {
      const [sx, sy] = worldToScreen(
        p.bookmark.position2d[0],
        p.bookmark.position2d[1],
      );
      const d = (sx - tx) ** 2 + (sy - ty) ** 2;
      if (d < bestDist) {
        bestDist = d;
        best = { bookmark: p.bookmark, clientX, clientY };
      }
    }
    return best;
  }

  canvas.addEventListener('click', (e) => {
    if (dragMoved) {
      dragMoved = false;
      return;
    }
    const picked = pick(e.clientX, e.clientY);
    if (picked) {
      void chrome.tabs.create({ url: picked.bookmark.url });
    }
  });

  function animateRemove(id: string): void {
    const p = points.get(id);
    if (!p) return;
    const t0 = performance.now();
    const dur = 800;
    const tick = (): void => {
      const t = Math.min(1, (performance.now() - t0) / dur);
      const cur = points.get(id);
      if (!cur) return;
      cur.currentOpacity = p.baseOpacity * (1 - t);
      cur.scale = 1 - t;
      requestDraw();
      if (t < 1) requestAnimationFrame(tick);
      else points.delete(id);
    };
    tick();
  }

  return {
    onActivate(): void {
      resize();
      requestDraw();
    },
    replaceAll(next): void {
      rebuild(next);
      requestDraw();
    },
    removeBookmark(id): void {
      animateRemove(id);
    },
    search(query): void {
      const q = query.trim().toLowerCase();
      for (const p of points.values()) {
        if (!q) {
          p.currentOpacity = p.baseOpacity;
          p.scale = 1;
        } else {
          const hit =
            p.bookmark.title.toLowerCase().includes(q) ||
            p.bookmark.url.toLowerCase().includes(q);
          p.currentOpacity = hit ? 1 : 0.06;
          p.scale = hit ? 1.7 : 1;
        }
      }
      requestDraw();
    },
    pick,
  };
}
