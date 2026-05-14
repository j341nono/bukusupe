import type { SwMessage } from '../shared/types';

const UNIVERSE_PATH = 'universe.html';

function universeUrl(): string {
  return chrome.runtime.getURL(UNIVERSE_PATH);
}

async function findUniverseTabs(): Promise<chrome.tabs.Tab[]> {
  const target = universeUrl();
  const tabs = await chrome.tabs.query({});
  return tabs.filter((t) => t.url === target || t.pendingUrl === target);
}

chrome.action.onClicked.addListener(async () => {
  const existing = await findUniverseTabs();
  if (existing.length > 0 && existing[0].id !== undefined) {
    await chrome.tabs.update(existing[0].id, { active: true });
    if (existing[0].windowId !== undefined) {
      await chrome.windows.update(existing[0].windowId, { focused: true });
    }
    return;
  }
  await chrome.tabs.create({ url: universeUrl() });
});

async function broadcast(message: SwMessage): Promise<void> {
  const tabs = await findUniverseTabs();
  for (const tab of tabs) {
    if (tab.id !== undefined) {
      chrome.tabs.sendMessage(tab.id, message).catch(() => {
        // tab may have just closed; ignore
      });
    }
  }
}

chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  void broadcast({ type: 'bookmark:created', id, bookmark });
});

chrome.bookmarks.onChanged.addListener((id, info) => {
  void broadcast({ type: 'bookmark:changed', id, info });
});

chrome.bookmarks.onRemoved.addListener((id, info) => {
  void broadcast({ type: 'bookmark:removed', id, info });
});

chrome.bookmarks.onMoved.addListener((id, info) => {
  void broadcast({ type: 'bookmark:moved', id, info });
});
