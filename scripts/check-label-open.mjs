/** 表示中の星のタイトルをダブルクリックすると、星本体と同じページを開く。 */
import { resolve } from "node:path";
import { createChecker, launchExtension } from "./lib/harness.mjs";

const { check, problems } = createChecker();
const app = await launchExtension(resolve(process.argv[2] ?? "dist-debug"), { query: "sample=1&debug=1" });
try {
  const ready = await app.waitUntil("document.body.dataset.phase === 'ready'", 300_000, 250);
  if (ready) await app.evalIn("globalThis.__bukusupe.searchNow('宇宙')");
  const visible = await app.waitUntil("!!document.querySelector('.label-star[data-key]')", 10_000, 100);
  const result = visible ? JSON.parse(await app.evalIn(`(async () => {
    const label = document.querySelector('.label-star[data-key]');
    const id = label.dataset.key;
    const url = globalThis.__bukusupe.state.items.find((item) => item.id === id)?.url;
    const originalGet = chrome.tabs.getCurrent, originalUpdate = chrome.tabs.update;
    let opened = null;
    chrome.tabs.getCurrent = async () => ({ id: 77 });
    chrome.tabs.update = async (_id, args) => { opened = args.url; };
    label.dispatchEvent(new MouseEvent('dblclick', { bubbles: true, cancelable: true }));
    await new Promise((resolve) => setTimeout(resolve, 100));
    chrome.tabs.getCurrent = originalGet; chrome.tabs.update = originalUpdate;
    return JSON.stringify({ url, opened });
  })()`)) : null;
  check(ready && visible && result?.url === result?.opened, "タイトルのダブルクリックで、その星のページを同じタブに開く",
    result ? `対象 ${result.url}・開いた ${result.opened}` : "ラベルを表示できない");
} catch (err) { problems.push(String(err)); console.error(err); }
finally { await app.close(); }
console.log(problems.length ? `NG（${problems.length} 件）` : "OK");
process.exit(problems.length ? 1 : 0);
