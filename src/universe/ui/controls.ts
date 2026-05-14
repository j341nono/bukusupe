export interface ControlsHandlers {
  onToggle(is3D: boolean): void;
  onSearch(query: string): void;
}

export function wireControls(handlers: ControlsHandlers): void {
  let is3D = true;
  const toggleBtn = document.getElementById('toggle-view') as HTMLButtonElement;
  const searchInput = document.getElementById('search') as HTMLInputElement;

  toggleBtn.textContent = '🟦 2D';
  toggleBtn.addEventListener('click', () => {
    is3D = !is3D;
    toggleBtn.textContent = is3D ? '🟦 2D' : '🧊 3D';
    handlers.onToggle(is3D);
  });

  let lastQuery = '';
  searchInput.addEventListener('input', () => {
    const q = searchInput.value;
    if (q === lastQuery) return;
    lastQuery = q;
    handlers.onSearch(q);
  });
}
