/** 同梱した ort/ の絶対 URL。拡張機能でも開発サーバーでも同じ形で得る。
 *  transformers.js を読み込まないので、画面側の束が重くならない。 */
export function ortBaseUrl(): string {
  if (typeof chrome !== "undefined" && chrome.runtime?.getURL) {
    return chrome.runtime.getURL("ort/");
  }
  // 開発サーバーと Web のデモ。GitHub Pages のようにサブパス（/bukusupe/）に置かれても、ページと同じ場所の ort/ を指す
  return new URL("./ort/", location.href).href;
}
