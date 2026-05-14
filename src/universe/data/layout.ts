import type {
  Bookmark,
  LaidOutBookmark,
  PlanetLayout,
  RingSpec,
} from '../../shared/types';
import {
  hashBookmarkSet,
  loadLayout,
  saveLayout,
  type CachedLayout,
} from './store';
import { MODEL_ID } from './embeddings';

const SATURN_TILT = (24 * Math.PI) / 180;
const PLANET_RADIUS = 16;
const RING_INNER_GAP = 14; // gap between planet surface and innermost ring
const RING_STEP = 14;
const SCREEN_SCALE = 7; // 3D unit → 2D px

const MIN_RING_SIZE = 3;
const MAX_RINGS = 12;
const MISC_NAME = 'その他';

const RING_PALETTE: string[] = [
  '#FFB55A',
  '#7FB3FF',
  '#FF8A95',
  '#A8E6A0',
  '#D9A8FF',
  '#FFD66B',
  '#6FE4D3',
  '#FF9AC4',
  '#B0E0FF',
  '#FFCAA8',
  '#C9B0FF',
  '#A8FFD4',
];

function categoryFor(b: Bookmark): string {
  const top = b.folderPath.split('/')[0];
  if (top) return top;
  if (b.hostname) return b.hostname;
  return MISC_NAME;
}

function colorFor(index: number): string {
  return RING_PALETTE[index % RING_PALETTE.length];
}

/**
 * Project vectors onto the first principal component. Returns one scalar per
 * input, normalized to [0, 1]. Deterministic given the same input.
 */
function pcaProjections(vectors: number[][]): number[] {
  const n = vectors.length;
  const dim = vectors[0].length;

  const mean = new Array<number>(dim).fill(0);
  for (const v of vectors) for (let i = 0; i < dim; i++) mean[i] += v[i];
  for (let i = 0; i < dim; i++) mean[i] /= n;
  const centered = vectors.map((v) => v.map((x, i) => x - mean[i]));

  let pc = [...centered[0]];
  let norm = Math.sqrt(pc.reduce((s, x) => s + x * x, 0));
  if (norm < 1e-9) {
    pc = new Array<number>(dim).fill(0);
    pc[0] = 1;
    norm = 1;
  }
  pc = pc.map((x) => x / norm);

  for (let iter = 0; iter < 60; iter++) {
    const next = new Array<number>(dim).fill(0);
    for (const v of centered) {
      let dot = 0;
      for (let i = 0; i < dim; i++) dot += v[i] * pc[i];
      for (let i = 0; i < dim; i++) next[i] += dot * v[i];
    }
    const m = Math.sqrt(next.reduce((s, x) => s + x * x, 0));
    if (m < 1e-9) break;
    const newPc = next.map((x) => x / m);
    let diff = 0;
    for (let i = 0; i < dim; i++) diff += Math.abs(pc[i] - newPc[i]);
    pc = newPc;
    if (diff < 1e-6) break;
  }

  // Stabilize sign: the first input should project to a non-negative value.
  let firstProj = 0;
  for (let i = 0; i < dim; i++) firstProj += centered[0][i] * pc[i];
  if (firstProj < 0) pc = pc.map((x) => -x);

  const projections = centered.map((v) => {
    let d = 0;
    for (let i = 0; i < dim; i++) d += v[i] * pc[i];
    return d;
  });
  const min = Math.min(...projections);
  const max = Math.max(...projections);
  const range = max - min || 1;
  return projections.map((p) => (p - min) / range);
}

interface GroupedBookmark {
  name: string;
  items: Bookmark[];
}

function groupAndMerge(present: Bookmark[]): GroupedBookmark[] {
  const groups = new Map<string, Bookmark[]>();
  for (const b of present) {
    const cat = categoryFor(b);
    let arr = groups.get(cat);
    if (!arr) {
      arr = [];
      groups.set(cat, arr);
    }
    arr.push(b);
  }

  const entries = [...groups.entries()].map(([name, items]) => ({
    name,
    items,
  }));

  // Stage 1: merge groups smaller than MIN_RING_SIZE into "その他".
  const big: GroupedBookmark[] = [];
  let misc: Bookmark[] = [];
  for (const g of entries) {
    if (g.items.length >= MIN_RING_SIZE && g.name !== MISC_NAME) {
      big.push(g);
    } else {
      misc.push(...g.items);
    }
  }

  // Stage 2: cap to MAX_RINGS, demote smallest to misc.
  big.sort((a, b) => b.items.length - a.items.length || a.name.localeCompare(b.name));
  while (big.length > MAX_RINGS - (misc.length > 0 ? 1 : 0)) {
    const demoted = big.pop()!;
    misc.push(...demoted.items);
  }

  if (misc.length > 0) {
    big.push({ name: MISC_NAME, items: misc });
  }

  return big;
}

function assignAnglesByRank(projections: number[]): number[] {
  const n = projections.length;
  const indices = projections.map((_, i) => i);
  indices.sort((a, b) => projections[a] - projections[b]);
  const angles = new Array<number>(n);
  indices.forEach((origIdx, rank) => {
    angles[origIdx] = (rank / n) * Math.PI * 2;
  });
  return angles;
}

export async function computeLayout(
  bookmarks: Bookmark[],
  embeddings: Map<string, number[]>,
): Promise<PlanetLayout> {
  const present = bookmarks.filter((b) => embeddings.has(b.id));
  if (present.length === 0) {
    return { rings: [], tilt: SATURN_TILT, bookmarks: [] };
  }

  const setHash = await hashBookmarkSet(present.map((b) => b.id));
  const cached = await loadLayout();
  if (cached && cached.setHash === setHash && cached.modelId === MODEL_ID) {
    return cached.layout;
  }

  const groups = groupAndMerge(present);

  const rings: RingSpec[] = groups.map((g, i) => ({
    index: i,
    name: g.name,
    radius: PLANET_RADIUS + RING_INNER_GAP + i * RING_STEP,
    count: g.items.length,
    cssColor: colorFor(i),
  }));

  const laidOut: LaidOutBookmark[] = [];
  for (let r = 0; r < groups.length; r++) {
    const g = groups[r];
    const spec = rings[r];
    const items = g.items;
    const vectors = items.map((b) => embeddings.get(b.id) as number[]);

    let angles: number[];
    if (items.length === 1) {
      angles = [0];
    } else if (items.length < 4) {
      angles = items.map((_, i) => (i / items.length) * Math.PI * 2);
    } else {
      const proj = pcaProjections(vectors);
      angles = assignAnglesByRank(proj);
    }

    for (let i = 0; i < items.length; i++) {
      const b = items[i];
      const a = angles[i];
      const x = Math.cos(a) * spec.radius;
      const z = Math.sin(a) * spec.radius;
      laidOut.push({
        ...b,
        vector: vectors[i],
        ringIndex: r,
        angle: a,
        position3d: [x, 0, z],
        position2d: [x * SCREEN_SCALE, z * SCREEN_SCALE],
      });
    }
  }

  const layout: PlanetLayout = { rings, tilt: SATURN_TILT, bookmarks: laidOut };
  const toCache: CachedLayout = {
    setHash,
    modelId: MODEL_ID,
    layout,
    computedAt: Date.now(),
  };
  await saveLayout(toCache);
  return layout;
}

export const PLANET_LAYOUT_CONSTANTS = {
  PLANET_RADIUS,
  SATURN_TILT,
  SCREEN_SCALE,
};
