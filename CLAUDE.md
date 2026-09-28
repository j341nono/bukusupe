# ブクスペ（Bookmark Space）

> このファイルは `CLAUDE.md` と `AGENTS.md` で**同じ内容**にしている。片方を直したら、もう片方も同じにすること。

Chrome のブックマークを「星」として意味的に配置し、検索で引き寄せ、選んだ星を線で結んで「星座」として保存する Chrome 拡張機能（Manifest V3）。
星の間を飛ぶ「飛行モード」もある（SPEC 13 章）。**いまは Chrome ウェブストアでの正式公開を目指す段階**（限定公開 0.9.x → 一般公開 1.0.0）。

## はじめに読むもの

1. `docs/HANDOFF.md` の **0 章** — 今の状態・次にやること・今の作業で気をつけること。1 章から後は必要なときに引く資料
   （決めたことの理由、試して失敗したこと、動かし方と `check:ext` の項目、主要ファイル、詳しい技術構成とディレクトリ構成）。
2. `docs/RELEASE.md` — 段階 1〜7 の計画と完了条件、「進み具合」、版の番号の決まり、使う人が「決めたこと」。新しく判断が要るものは作る前に確認する。
3. `docs/SPEC.md` — 仕様の正典。**迷ったらこれを優先する。** 仕様が変わる作業は、SPEC を先に直してから作る。
4. `docs/DESIGN.md` — 見た目の規則。**見た目に触れる前に必ず読む。**
5. 終わった段階の記録は `docs/history/`（[一覧](docs/history/README.md)）、ハッカソンまでの計画は `docs/PLAN.md`。毎回読む必要はない。

**段階を終えたら `docs/HANDOFF.md` の 0 章を今の状態に書き直し**（到達点、新しく決めたこと、つまずいた点、足した確認）、
終えた段階の記録は `docs/history/` に移す。`docs/RELEASE.md` の「進み具合」も更新する。

## 技術構成（要点。詳しくは `docs/HANDOFF.md` 5 章）

- Manifest V3。`public/manifest.json` は手書き（crxjs 等は使わない）。TypeScript + Vite。描画は three.js。
- 埋め込みは `@huggingface/transformers` v4 + `Xenova/multilingual-e5-small`（q8、WASM、Web Worker）。保存は IndexedDB（データ源ごとに DB を分ける）。
- 権限は `bookmarks`・`unlimitedStorage`・`favicon`。host_permissions は無し。確認用のビルドだけ `storage`。
- CSP `script-src 'self' 'wasm-unsafe-eval'; object-src 'self'`（manifest の `content_security_policy.extension_pages`）は**外してはいけない。**
- ビルドは 4 種：`dist/`（配布用。**リポジトリに含める**）、`dist-debug/`（確認用。`?debug=1` の窓口 `__bukusupe` あり）、`dist-web/`・`dist-web-debug/`（Web のデモ）。
  確認用・測定用のコードは `if (__DEBUG__) { … }` で囲む（クラスのメソッドは消えないので `viewDebug(view)` のような関数に分ける）。

## ビルドと確認

```bash
npm run dev          # http://localhost:5173（サンプルデータ）
npm run typecheck
npm run build        # 配布用 → dist/（版の番号がずれていると失敗する）
npm run build:debug  # 確認用 → dist-debug/（個別の確認スクリプトの前に作る）
npm run package      # ストアに上げる zip → release/
npm run check:ext    # 通しの自動確認（30 分ほど。コミットの直前に 1 回だけ）
```

個別の確認：`npm run build:debug >/dev/null && node scripts/check-<名前>.mjs`
（`check:flight`・`check:web`・`check:idle`・`check:safety`・`check:store`・`check:release`・`check:dist` は npm の名前もある）。
どの確認が何を見ているかは `docs/HANDOFF.md` 4 章。

## 作業の進め方

- **作業の途中では、変更に関係する確認のスクリプトだけを走らせる。`check:ext` の全体は、コミットの直前に 1 回だけ走らせる。**
- コミットの前：`npm run build` → `git add dist` → `npm run check:ext`（最初の確認が、git の index の `dist/` と今のソースのビルドを比べる）→ コミット。
- コミットメッセージは `feat(scope): ...` のように prefix 付き・英語・簡潔に 1 行。
- 完成ライン（SPEC 4 章）を最優先し、範囲を広げない。仕様書にない判断が要るなら、作る前に確認する。

## 守るべきルール

全文と補足（理由・例）は `docs/HANDOFF.md` 2 章「守るべきルールの全文と補足」。

1. **プログラムを外部から読み込まない。** 外部から取ってよいのはモデルの重み（データ）だけ。スクリプト・WASM は同梱する（CDN を参照しない）。
   - 埋め込みを使う入口では必ず先に `configureOrt()`（`src/embed/ort-env.ts`）を呼ぶ（transformers.js は既定で ONNX Runtime を jsDelivr から読む）。
   - `env.cacheKey = "bukusupe-model"` のまま。`env.useWasmCache` は false のまま（true にすると `blob:` URL になり CSP に弾かれる）。
2. **ブックマークの内容をブラウザの外に送らない。** 分析・ログ送信・外部 API 呼び出しを書かない。
3. **ブックマークを削除・変更しない。** `chrome.bookmarks` は `getTree` / `search` と `onCreated` / `onChanged` / `onRemoved` / `onMoved` の購読だけ。
   `remove` / `removeTree` / `update` / `create` / `move` は使わない（使ってよいのは確認スクリプトの使い捨てのプロファイルの中だけ）。
4. **コミットの前に `npm run build` と `npm run check:ext` を通す**（手順は「作業の進め方」）。
5. **段階を終えるたびに `docs/HANDOFF.md` を更新する。**
6. **仕様が変わるものは SPEC を先に直す。** 範囲を広げない。
7. **見た目と意味の対応を一貫させる**：星＝ブックマーク、星団＝意味のまとまり、明るさ＝最終利用、ブラックホール＝検索、
   星座＝自分で選んで結んだ星（メンバーは保存した時点で固定。SPEC 9 章）、新星＝保存の後に加わった検索語に合う候補（淡い白の輪）。
   色は藍・白〜淡いクリーム・金（人が名付けたもの）の 3 系統だけ。星団を色相で塗り分けない。書体は名前が明朝、記録がゴシック（`docs/DESIGN.md`）。
8. **自動確認を足す・変えるときは、修正前のコードで失敗し、修正後に通ることを確かめる。** 構造上必ず通る確認を書かない。
   - キー入力の確認は CDP の `Input.dispatchKeyEvent` ではなく、ページ内の `KeyboardEvent` で行う（macOS のヘッドレス Chrome で固まる）。
   - ヘッドレス描画のコマ数は数コマ揺れる。しきい値付近で落ちたら再実行して確かめる。
9. **ページやブックマークから来た文字列を HTML として解釈させない。** `textContent` や属性で入れ、
   `innerHTML` / `outerHTML` / `insertAdjacentHTML` / `document.write` に入れない。
   ページを開くのは `http:` / `https:` の URL だけ。
10. **利用者のデータを外部に送る処理、分析用のデータを集める処理を書かない。** 問題の報告は、利用者が内容を見て自分で送る形にする。
11. **配布物に測定用・確認用の仕組みを含めない。** `__bukusupe`・`src/debug/`・測定用の注入などは配布用のビルドで静的に取り除く（`check-release` が確かめる）。
