# 段階 1：安全性の調査と修正（2026-09-28）

> 旧 `docs/HANDOFF.md` 0 章から移した。詳しくは `docs/SECURITY.md` と `docs/RELEASE.md` 段階 1。
> ファイル一覧は [README.md](README.md)。

### 段階 1 でしたこと（2026-09-28）

詳しくは `docs/SECURITY.md`。確認は `scripts/check-safety.mjs`（新規）と `scripts/check-web.mjs`（`check:ext` の中）。
- ページを開く処理を `src/ui/open-page.ts` の `openPage` 1 つにまとめ、`http:` / `https:` 以外は開かない。判定は `src/bookmarks/validate.ts`
  （`isOpenableUrl`・`parseBookmarkItem`）の 1 か所で、ブックマークを読み込む側（Chrome・サンプル・確認用の注入）も同じ判定を通す。
- 「戻る」用の保存状態は `src/ui/return-state.ts`（版の番号 2、場所は `bukusupe:return-state`）。`parseReturnState` で確かめ、合わなければ捨てる。
- 星座の行は `src/constellation/index.ts` の `parseConstellation` で確かめ、合わない行は読み飛ばして警告を残す。名前は保存・名前の変更のときに 80 文字まで。
  検索欄は 200 文字まで。
- 表示：タイトル・フォルダ名・星座の名前の要素に `unicode-bidi: isolate`。カードの URL は `dir="ltr"`。長いものは「…」で省略し、全文は title。
  地図のタイトルは近距離 40・検索中 32・マウスを乗せたとき 80 まで（全角を 1）。
- `hud.ts` の `innerHTML` を要素の組み立てに替えた（`src/` に HTML として解釈する処理は無い）。
- Web のデモの index.html に CSP（`vite.config.ts` の `WEB_CSP`、`--mode web` のときだけ）。
- 確認用の窓口に `openUrl`・`returnStateInfo`・`focusCluster` を足した（`?debug=1` のときだけ。段階 2 で配布物から取り除く）。
