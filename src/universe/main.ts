import './style/universe.css';
import { getAllBookmarks } from './data/bookmarks';
import { EmbeddingService } from './data/embeddings';
import { computeLayout } from './data/layout';
import { deleteEmbeddingByUrl } from './data/store';
import type { PlanetLayout, SwMessage, View } from '../shared/types';
import { create3DView } from './view3d';
import { create2DView } from './view2d';
import { wireTooltip } from './ui/tooltip';
import { wireControls } from './ui/controls';

function progressEl(): HTMLElement {
  return document.getElementById('progress')!;
}
function labelEl(): HTMLElement {
  return document.getElementById('progress-label')!;
}
function fillEl(): HTMLDivElement {
  return document.getElementById('progress-fill') as HTMLDivElement;
}

function showProgress(label: string, done?: number, total?: number): void {
  const p = progressEl();
  p.classList.remove('error');
  p.style.display = 'block';
  labelEl().textContent =
    typeof done === 'number' && typeof total === 'number'
      ? `${label} ${done}/${total}`
      : label;
  if (typeof done === 'number' && typeof total === 'number' && total > 0) {
    fillEl().style.width = `${(done / total) * 100}%`;
  } else {
    fillEl().style.width = '0%';
  }
}

function hideProgress(): void {
  progressEl().style.display = 'none';
}

function showError(message: string): void {
  const p = progressEl();
  p.classList.add('error');
  p.style.display = 'block';
  labelEl().textContent = `⚠ ${message}`;
  fillEl().style.width = '0%';
}

function showEmpty(): void {
  const app = document.getElementById('app')!;
  const empty = document.createElement('div');
  empty.className = 'empty-state';
  const h = document.createElement('h2');
  h.textContent = 'ブックマークがありません';
  const p = document.createElement('p');
  p.textContent =
    'Chrome にブックマークを追加すると、惑星の周りにリングが並びます。';
  empty.append(h, p);
  app.appendChild(empty);
}

interface RuntimeContext {
  view3d: View;
  view2d: View;
  embeddings: EmbeddingService;
}

async function refresh(ctx: RuntimeContext): Promise<void> {
  const bookmarks = await getAllBookmarks();
  const vectors = await ctx.embeddings.embedBookmarks(bookmarks);
  const layout = await computeLayout(bookmarks, vectors);
  ctx.view3d.replaceAll(layout);
  ctx.view2d.replaceAll(layout);
}

async function handleSwMessage(msg: SwMessage, ctx: RuntimeContext): Promise<void> {
  if (msg.type === 'bookmark:removed') {
    ctx.view3d.removeBookmark(msg.id);
    ctx.view2d.removeBookmark(msg.id);
    const url = msg.info.node.url;
    if (url) {
      await deleteEmbeddingByUrl(url);
    }
    return;
  }
  if (
    msg.type === 'bookmark:created' ||
    msg.type === 'bookmark:changed' ||
    msg.type === 'bookmark:moved'
  ) {
    await refresh(ctx);
  }
}

async function bootstrap(): Promise<void> {
  showProgress('ブックマークを読み込み中…');
  const bookmarks = await getAllBookmarks();

  if (bookmarks.length === 0) {
    hideProgress();
    showEmpty();
    return;
  }

  const embeddings = new EmbeddingService();
  showProgress('埋め込みモデルを準備中…');

  const vectors = await embeddings.embedBookmarks(bookmarks, (p) => {
    showProgress('星に変換中', p.done, p.total);
  });

  showProgress('リングを構築中…');
  const layout: PlanetLayout = await computeLayout(bookmarks, vectors);

  hideProgress();

  const view3dEl = document.getElementById('view-3d') as HTMLDivElement;
  const view2dEl = document.getElementById('view-2d') as HTMLDivElement;
  const tooltipEl = document.getElementById('tooltip') as HTMLDivElement;

  const view3d = create3DView(view3dEl, layout);
  const view2d = create2DView(view2dEl, layout);
  const active: { current: View } = { current: view3d };

  wireTooltip(tooltipEl, active);
  wireControls({
    onToggle: (is3D) => {
      view3dEl.style.display = is3D ? 'block' : 'none';
      view2dEl.style.display = is3D ? 'none' : 'block';
      active.current = is3D ? view3d : view2d;
      active.current.onActivate();
    },
    onSearch: (q) => {
      view3d.search(q);
      view2d.search(q);
    },
  });

  const ctx: RuntimeContext = { view3d, view2d, embeddings };
  chrome.runtime.onMessage.addListener((raw) => {
    const msg = raw as SwMessage;
    if (!msg || typeof msg !== 'object' || typeof msg.type !== 'string') return;
    void handleSwMessage(msg, ctx);
  });
}

void bootstrap().catch((e) => {
  console.error(e);
  showError(e instanceof Error ? e.message : String(e));
});
