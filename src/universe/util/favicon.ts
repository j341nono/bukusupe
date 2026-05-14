export function faviconUrl(pageUrl: string, size: 16 | 32 | 64 = 32): string {
  return chrome.runtime.getURL(
    `/_favicon/?pageUrl=${encodeURIComponent(pageUrl)}&size=${size}`,
  );
}

export function truncate(s: string, max: number): string {
  return s.length <= max ? s : `${s.slice(0, max - 1)}…`;
}
