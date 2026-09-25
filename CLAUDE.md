# ブクスペ（Bookmark Space）

Chrome のブックマークを「星」として意味的に配置し、検索で引き寄せ、自分で選んだ星を線で結んで「星座」として保存・再表示する Chrome 拡張機能（Manifest V3）。

- 仕様書：`docs/SPEC.md`（**判断に迷ったら必ずこれを優先する**）
- 実装計画と各段階の完了条件：`docs/PLAN.md`

## 技術構成

| 項目 | 選択 |
|---|---|
| 拡張機能 | Manifest V3（`public/manifest.json` を手書き。crxjs 等のプラグインは使わない） |
| 言語・ビルド | TypeScript + Vite（`index.html` と `src/background.ts` の 2 エントリ） |
| 描画 | three.js（`MapControls` を回転無効で使い、移動と拡大縮小のみ） |
| 埋め込み | `@huggingface/transformers` v4 + `Xenova/multilingual-e5-small`（`dtype: "q8"`＝`onnx/model_quantized.onnx`）、WASM バックエンド、Web Worker |
| 保存 | IndexedDB（`embeddings` / `meta`。M2 以降で配置・星座を足す） |
| 権限 | `bookmarks`, `storage`（必要なら `unlimitedStorage`） |

CSP は `manifest.json` の `content_security_policy.extension_pages` に
`script-src 'self' 'wasm-unsafe-eval'; object-src 'self'` を指定している。**外してはいけない。**

## ディレクトリ構成

```
.
├── CLAUDE.md
├── docs/
│   ├── SPEC.md              # 仕様書（正典）
│   ├── PLAN.md              # 実装計画・完了条件
│   └── screens/             # check:ext が保存する遠・中・近の画面
├── index.html               # 拡張機能の専用タブ兼 dev サーバーの画面
├── public/
│   ├── manifest.json        # MV3 マニフェスト（そのまま dist/ にコピーされる）
│   ├── icons/               # 16 / 48 / 128 px
│   └── ort/                 # ONNX Runtime の .mjs / .wasm（生成物。git には入れない）
├── scripts/
│   ├── gen-icons.mjs        # アイコン PNG の生成（依存なし）
│   ├── copy-ort.mjs         # ONNX Runtime の補助ファイルを public/ort/ に同梱
│   └── check-extension.mjs  # dist/ を Chrome に読み込んで動作確認（CDP）
├── src/
│   ├── main.ts              # 画面の入口
│   ├── background.ts        # service worker（アイコン → 専用タブ）
│   ├── bookmarks/           # ブックマークの取得（Chrome / サンプルの 2 系統）
│   ├── embed/               # 埋め込み（Worker、入力文の組み立て、ドメイン辞書、ORT 設定）
│   ├── store/               # IndexedDB
│   ├── layout/              # 配置（平均引き → k-means → PCA → 押し広げ → 螺旋）
│   ├── render/              # three.js の描画（Points 1 つで数千件）
│   ├── ui/                  # HUD とラベルの重ね表示
│   └── data/sample-bookmarks.json   # 開発・デモ用の 150 件
└── dist/                    # ビルド成果物（拡張機能として読み込む）
```

## ビルドと確認の手順

```bash
npm install
npm run dev        # http://localhost:5173 で画面を確認（サンプルデータ）
npm run build      # dist/ を生成
npm run typecheck  # tsc --noEmit
npm run check:ext  # dist/ を実際の Chrome に読み込み、専用ページが動くか自動で確認
```

拡張機能としての確認：`npm run build` → `chrome://extensions` → デベロッパーモード ON →
「パッケージ化されていない拡張機能を読み込む」で `dist/` を選択 → ツールバーのアイコンを押す。

データ源は自動判定する（`chrome.bookmarks` があれば Chrome、なければサンプル）。
URL に `?sample=1` を付けると拡張機能内でも強制的にサンプルデータになる。

## 守るべきルール

1. **プログラムを外部から読み込まない。** 外部から取得してよいのはモデルの重み（データ）だけ。
   スクリプト・WASM は必ず同梱する（CDN 参照を書かない）。
   - transformers.js は**既定で ONNX Runtime の `.mjs` / `.wasm` を jsDelivr から読む**。
     埋め込みを使う入口では必ず `configureOrt()`（`src/embed/ort-env.ts`）を先に呼ぶ。
   - `env.useWasmCache` は false のままにする。true にすると `.mjs` を `blob:` URL にして
     読み込もうとし、MV3 の CSP（`script-src 'self'`）に弾かれる。
2. **ブックマークの内容をブラウザの外に送らない。** 分析・ログ送信・外部 API 呼び出しを書かない。
3. **ブックマークを削除・変更する処理を書かない。** `chrome.bookmarks` は読み取り系
   （`getTree` / `search` / `onCreated` / `onChanged` / `onRemoved`）のみ使う。
   `remove` / `removeTree` / `update` / `create` / `move` は使わない。
4. **各段階の終わりに `npm run build` と `npm run check:ext` が通ることを確認してからコミットする。**
5. コミットメッセージは `feat(scope): ...` のように prefix 付き・英語・簡潔に 1 行。
6. **完成ライン（SPEC 4 章）を最優先し、範囲を広げない。** 仕様書にない判断が必要なら実装前に確認する。
7. 見た目と意味の対応（星＝ブックマーク、星団＝意味のまとまり、明るさ＝最終利用、
   ブラックホール＝検索、星座＝保存済み検索、新星＝新規候補）は常に一貫させる。
