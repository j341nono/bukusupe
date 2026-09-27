import { isOpenableUrl } from "../bookmarks/validate";

/**
 * ページを開く（すべての経路がここを通る：星への突入・Enter・カードの「開く」・ダブルクリック）。
 * - http: と https: 以外は開かない（`isOpenableUrl`）。開いたら true。
 * - 拡張機能では、同じタブを切り替える（chrome.tabs.update）。newTab のときは新しいタブ（chrome.tabs.create）。
 * - Web のデモ（chrome.tabs が無い）では、同じタブは location.href、新しいタブは window.open。
 * - beforeLeave は、同じタブで移る直前に呼ぶ（「戻る」で再開するための保存）。
 */
export function openPage(url: string, { newTab = false, beforeLeave }: { newTab?: boolean; beforeLeave?: () => void } = {}): boolean {
  if (!isOpenableUrl(url)) {
    console.warn("[ブクスペ] http(s) ではない URL は開かない");
    return false;
  }
  if (typeof chrome !== "undefined" && chrome.tabs?.create) {
    if (newTab) { void chrome.tabs.create({ url }); return true; }
    beforeLeave?.();
    void chrome.tabs.getCurrent().then((tab) => {
      if (tab?.id != null) return chrome.tabs.update(tab.id, { url });
      location.href = url;
    });
    return true;
  }
  if (newTab) { window.open(url, "_blank", "noopener"); return true; }
  beforeLeave?.();
  location.href = url;
  return true;
}
