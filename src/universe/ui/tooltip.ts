import type { View } from '../../shared/types';

function formatDate(ts: number): string {
  try {
    return new Date(ts).toLocaleDateString('ja-JP');
  } catch {
    return '';
  }
}

export function wireTooltip(
  tooltip: HTMLElement,
  active: { current: View },
): void {
  const titleEl = document.createElement('div');
  titleEl.className = 'title';
  const urlEl = document.createElement('div');
  urlEl.className = 'url';
  const metaEl = document.createElement('div');
  metaEl.className = 'meta';
  tooltip.append(titleEl, urlEl, metaEl);

  window.addEventListener('mousemove', (event) => {
    const hit = active.current.pick(event.clientX, event.clientY);
    if (!hit) {
      tooltip.style.display = 'none';
      return;
    }
    titleEl.textContent = hit.bookmark.title;
    urlEl.textContent = hit.bookmark.url;
    const folderSuffix = hit.bookmark.folderPath ? ` / ${hit.bookmark.folderPath}` : '';
    metaEl.textContent = `追加: ${formatDate(hit.bookmark.dateAdded)}${folderSuffix}`;
    tooltip.style.display = 'block';
    const x = Math.min(window.innerWidth - tooltip.offsetWidth - 8, hit.clientX + 14);
    const y = Math.min(window.innerHeight - tooltip.offsetHeight - 8, hit.clientY + 14);
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  });
}
