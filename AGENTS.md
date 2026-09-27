# ブクスペ（Bookmark Space）

> このファイルは `CLAUDE.md` と `AGENTS.md` で**同じ内容**にしている。片方を直したら、もう片方も同じにすること。

Chrome のブックマークを「星」として意味的に配置し、検索で引き寄せ、自分で選んだ星を線で結んで「星座」として保存・再表示する Chrome 拡張機能（Manifest V3）。
地図（平面）を見るだけでなく、星の間を飛ぶ「飛行モード」（SPEC 13 章）がある（3a 完了、3b は未着手）。

**いまは正式公開を目指す段階にいる（2026-09-27〜）。** ハッカソン（HACK SONIC 2026 秋）で提出した状態はタグ `v0.1.0-hacksonic`。
ここからは Chrome ウェブストアでの公開（限定公開 0.9.x → 一般公開 1.0.0）に向けて、`docs/RELEASE.md` の段階の順に進める。

## はじめに必ず読むもの

1. `docs/RELEASE.md` — **正式公開までの計画**（段階 1〜7 と、それぞれの完了条件）、版の番号の決まり、使う人の判断（「決めたこと」）。
   **今どの段階にいるかは、ここの「進み具合」と `docs/HANDOFF.md` の 0 章で確かめる。** 方針は「決めたこと」に従い、新しく判断が要るものは作る前に確認する。
2. `docs/SPEC.md` — 仕様の正典。**判断に迷ったら必ずこれを優先する。** 仕様が変わる作業は、SPEC を先に直してから作る。
3. `docs/HANDOFF.md` — **0 章に今の状態と残りのタスク**。これまでに決めた設計判断とその理由、試して失敗したこと、
   自動確認の項目一覧、主要ファイルの役割。6 章はハッカソン期間の作業記録（旧 0 章）。
4. `docs/PLAN.md` — ハッカソンまでの M0〜M6 の段階と完了条件（記録。飛行中の検索 3b はここにある）。
5. `docs/DESIGN.md` — 見た目の方向性（昔の星図のような静かで上品な美しさ）、配色と書体の規則、8 つの案と状態。
   **見た目に触れる前に必ず読む。**

**各段階を終えたら `docs/HANDOFF.md` を更新すること**（到達点、新しく決めたこと、
つまずいた点、`check:ext` に足した確認項目）。次に引き継ぐ人が読むのはこのファイル。

## 技術構成

| 項目 | 選択 |
|---|---|
| 拡張機能 | Manifest V3（`public/manifest.json` を手書き。crxjs 等のプラグインは使わない） |
| 言語・ビルド | TypeScript + Vite（`index.html` と `src/background.ts` の 2 エントリ） |
| 描画 | three.js。`MapControls` は自由回転を無効にし、左ドラッグで移動・ホイールで拡大縮小。右ドラッグの上下で傾きだけを変える（真上から 0〜60 度、地図の方角は回さない）。キー操作は W・A・S・D で移動、Space で縮小、Shift で拡大、「/」で検索欄（入力中は無効、Ctrl は使わない） |
| 埋め込み | `@huggingface/transformers` v4 + `Xenova/multilingual-e5-small`（`dtype: "q8"`＝`onnx/model_quantized.onnx`）、WASM バックエンド、Web Worker |
| 保存 | IndexedDB（`embeddings` / `meta` / `constellations`）。DB はデータ源ごとに分ける（`bukusupe-chrome` / `bukusupe-sample`） |
| 権限 | `bookmarks`, `storage`, `unlimitedStorage`, `favicon`（飛行モードの窓のアイコン。インストール時の警告が 1 つ増える）。重みの取得に `huggingface.co` / `*.hf.co` の host_permissions |

CSP は `manifest.json` の `content_security_policy.extension_pages` に
`script-src 'self' 'wasm-unsafe-eval'; object-src 'self'` を指定している。**外してはいけない。**

## ディレクトリ構成

```
.
├── CLAUDE.md / AGENTS.md    # 同じ内容（エージェント向けの作業規則）
├── README.md                # 審査員・使う人向け（導入手順、使い方、権限、プライバシー）
├── THIRD_PARTY_NOTICES      # 第三者のライセンス（scripts/gen-notices.mjs で作る）。licenses/ に ONNX Runtime の表示
├── .github/workflows/pages.yml  # Web のデモを GitHub Pages に公開
├── docs/
│   ├── SPEC.md              # 仕様書（正典）
│   ├── PLAN.md              # ハッカソンまでの実装計画・完了条件（M0〜M6）
│   ├── RELEASE.md           # 正式公開までの計画・版の番号の決まり・決めたこと
│   ├── HANDOFF.md           # 引き継ぎ資料（0 章に今の状態と残りのタスク、6 章にハッカソン期間の記録）
│   ├── DESIGN.md            # 見た目の規則と案
│   └── screens/             # check:ext が保存する画面と結果。before/ はデザイン見直し前
├── index.html               # 拡張機能の専用タブ兼 dev サーバーの画面
├── public/
│   ├── manifest.json        # MV3 マニフェスト（そのまま dist/ にコピーされる）
│   ├── icons/               # 16 / 32 / 48 / 128 px（npm run icons で作る。しおりの形の星座）
│   └── ort/                 # ONNX Runtime の .mjs / .wasm（生成物。git には入れない）
├── scripts/
│   ├── gen-icons.mjs        # アイコン PNG の生成（依存なし）
│   ├── copy-ort.mjs         # ONNX Runtime の補助ファイルを public/ort/ に同梱
│   ├── check-extension.mjs  # dist/ を Chrome に読み込んで動作確認（CDP）
│   ├── check-flight.mjs     # 飛行モードの確認
│   ├── check-dist.mjs       # コミットされる dist/ が今のソースのビルドと一致するか
│   ├── check-fresh.mjs      # git の index の dist/ を、まっさらなプロファイルで初回起動
│   ├── check-web.mjs        # Web のデモ（dist-web/）の確認（PC とスマホ）
│   ├── check-idle.mjs       # 動きがあるときだけ描く（止まる・すぐ再開する・止まった画面が正しい）
│   ├── check-today.mjs      # 星の新しさの「今日」（サンプルは基準日に固定、自分のブックマークは実際の今日）
│   ├── precompute-sample.mjs  # Web のデモに同梱する計算済みのサンプルを作る
│   ├── gen-notices.mjs      # THIRD_PARTY_NOTICES を作る
│   ├── bench/               # 時間とメモリの測定（npm run bench → docs/bench/results/、npm run bench:report → docs/BENCHMARK.md）
│   └── lib/harness.mjs      # 確認スクリプトの共通の土台（CDP パイプ、ページ内のキー入力）
├── src/
│   ├── main.ts              # 画面の入口（読み込み → 埋め込み → 配置 → 検索・星座）
│   ├── background.ts        # service worker（アイコン → 専用タブ）
│   ├── bookmarks/           # ブックマークの取得（Chrome / サンプルの 2 系統。読み取りのみ）
│   ├── embed/               # 埋め込み（Worker、入力文の組み立て、ドメイン辞書、大分類、ORT 設定）
│   ├── store/               # IndexedDB（データ源ごとの DB）
│   ├── layout/              # 配置（平均引き → k-means → 粒度そろえ → PCA → 押し広げ → 螺旋）、星団名
│   ├── search/              # 文字一致＋意味検索（平均引き、汎用度の補正、z 値での正規化）
│   ├── constellation/       # 星座の保存形式、メンバーの集合、決定的な最小全域木
│   ├── debug/               # 測定用の時間の記録（?debug=1 のときだけ使う）
│   ├── render/              # three.js の描画（星・星雲・ブラックホール・星座の線）
│   ├── ui/                  # HUD とラベルの重ね表示
│   └── data/                # sample-bookmarks.json（156 件）、sample-precomputed.json（Web のデモ用の計算済み）
├── dist/                    # ビルド成果物（拡張機能として読み込む）。**リポジトリに含める**（審査員はビルドしない）
└── dist-web/                # Web のデモのビルド成果物（git には入れない。GitHub Actions が作って公開する）
```

## ビルドと確認の手順

```bash
npm install
npm run dev        # http://localhost:5173 で画面を確認（サンプルデータ）
npm run build      # dist/ を生成
npm run typecheck  # tsc --noEmit
npm run build:web  # Web のデモ（サンプルだけで動く版）を dist-web/ に作る
npm run check:ext    # 通しの自動確認（dist/ の一致 → 初回起動 → 拡張機能 → 飛行 → 止まる描画 → 今日の固定 → Web のデモ。20 分ほど）
npm run check:flight # 飛行モードの確認だけ（2〜3 分）
npm run check:web    # Web のデモの確認だけ
npm run sample:precompute  # サンプル・入力文・配置の計算・モデルを変えたら、Web のデモ用の計算済みを作り直す
npm run bench        # 時間とメモリの測定（2〜3 時間。--only=run1 / run2 / <項目>）。npm run bench:report で報告書だけ作り直す
```

拡張機能としての確認：`npm run build` → `chrome://extensions` → デベロッパーモード ON →
「パッケージ化されていない拡張機能を読み込む」で `dist/` を選択 → ツールバーのアイコンを押す。

データ源は自動判定する（`chrome.bookmarks` に http(s) のブックマークがあれば Chrome、なければサンプル）。
URL に `?sample=1` を付けると拡張機能内でも強制的にサンプルデータになる（ⓘ のパネルの「サンプルの宇宙で試す」でも切り替わる）。
`?demo=1` で左上のパネルを隠す。確認用の窓口 `__bukusupe` は **`?debug=1` のときだけ**公開する（確認スクリプトは `?debug=1` で開く）。
使っている途中でデータ源が変わったら（サンプル⇄実ブックマーク）、ページを読み込み直す。

## 守るべきルール

1. **プログラムを外部から読み込まない。** 外部から取得してよいのはモデルの重み（データ）だけ。
   スクリプト・WASM は必ず同梱する（CDN 参照を書かない）。
   - transformers.js は**既定で ONNX Runtime の `.mjs` / `.wasm` を jsDelivr から読む**。
     埋め込みを使う入口では必ず `configureOrt()`（`src/embed/ort-env.ts`）を先に呼ぶ。
   - `env.useWasmCache` は false のままにする。true にすると `.mjs` を `blob:` URL にして
     読み込もうとし、MV3 の CSP（`script-src 'self'`）に弾かれる。
2. **ブックマークの内容をブラウザの外に送らない。** 分析・ログ送信・外部 API 呼び出しを書かない。
3. **ブックマークを削除・変更する処理を書かない。**（計画の「時間があれば」にブックマークの削除があるが、
   この規則を変えるかは使う人の判断待ち。判断が出るまでは書かない） `chrome.bookmarks` は読み取り系
   （`getTree` / `search` と、`onCreated` / `onChanged` / `onRemoved` / `onMoved` の購読）のみ使う。
   `remove` / `removeTree` / `update` / `create` / `move` は使わない
   （`check:ext` が使い捨てのプロファイルで使うのは確認スクリプトの側だけ）。
4. **各段階の終わりに `npm run build` と `npm run check:ext` が通ることを確認してからコミットする。**
   `dist/` はリポジトリに含めるので、手順は `npm run build` → `git add dist` → `npm run check:ext` → コミット
   （`check:ext` の最初の確認が、git の index の `dist/` と今のソースのビルドを比べる）。
5. コミットメッセージは `feat(scope): ...` のように prefix 付き・英語・簡潔に 1 行。
6. **完成ライン（SPEC 4 章）を最優先し、範囲を広げない。** 仕様書にない判断が必要なら実装前に確認する。
   段階を終えるたびに `docs/HANDOFF.md` を更新する。
7. 見た目と意味の対応（星＝ブックマーク、星団＝意味のまとまり、明るさ＝最終利用、
   ブラックホール＝検索、星座＝保存済み検索、新星＝新規候補）は常に一貫させる。
   色は藍（夜）・白〜淡いクリーム（星と文字）・金（人が名付けたもの＝自分で結んだ星座）の 3 系統に限る。
   星団を色相で塗り分けない。フォルダの自動星座（M5）は金ではなく淡い銀色。書体は名前が明朝、記録がゴシック
   （詳しくは `docs/DESIGN.md`）。
   - 星座は今の方式（保存した検索語で呼び出し、pinned / excluded を反映。SPEC 9 章）のまま。
     「自分で選んだ星だけ」への変更、新星、Web 検索の結果の取り込みはハッカソンでは見送った（`docs/HANDOFF.md` 6 章）。
     正式公開に向けて、星座は「保存した時点のメンバーで固定し、新しく合う星は新星として示す」方式に変えると決めた
     （`docs/RELEASE.md`「決めたこと」の 1。段階 5 で SPEC 9 章を先に直してから作る。それまでは今の方式のまま）。
8. **自動確認（`check:ext`）を追加・変更するときは、修正前のコードで失敗し、修正後に通ることを確かめる。**
   確認を先に書いて修正前のコードで走らせ、狙った確認が NG になるのを見てから直す。構造上必ず通る確認
   （同じ値どうしの比較、保存データだけの比較など）を書かない。
   - キー入力の確認は、CDP の `Input.dispatchKeyEvent` ではなくページ内の `KeyboardEvent` で行う
     （macOS のヘッドレス Chrome で固まる。`docs/HANDOFF.md` 3 章）。
   - ヘッドレスのソフトウェア描画では 1 秒あたりのコマ数が数コマ揺れる。しきい値付近で落ちたら再実行して確かめる。
9. **ページやブックマークから来た文字列を、HTML として解釈させない。** ブックマークのタイトル・URL・フォルダ名・ドメイン、
   星座の名前、検索語、ページから得た値などは、`textContent` や属性の設定で入れる。`innerHTML` / `outerHTML` /
   `insertAdjacentHTML` / `document.write` に入れない（固定の文言だけでも、できるだけ使わない）。ページを開くのは `http:` / `https:` の URL だけ。
10. **利用者のデータを外部に送る処理、分析用のデータを集める処理を書かない。** 利用状況の計測・エラーの自動送信・外部の分析サービスも含む。
    問題の報告は、利用者が内容を見てから自分で送る形にする（規則 2 を、ブックマーク以外の利用者のデータにも広げたもの）。
11. **配布物（ストア向けのビルド）に、測定用・確認用の仕組みを含めない。** 確認用の窓口（`__bukusupe`）、`src/debug/`、測定用のデータの注入、
    量子化の切り替え、`setContinuousRender` / `renderNow` などは、ストア向けのビルドで静的に取り除く（`docs/RELEASE.md` 段階 2）。
    開発用の `dist/` と `check:ext` では使ってよい。
