/**
 * service worker。アイコンを押したら専用タブでブクスペを開くだけ。
 * ブックマークを書き換える処理は置かない。
 */
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
});
