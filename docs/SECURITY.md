# ブクスペの安全性（docs/RELEASE.md 段階 1）

調査 2026-09-27、修正 2026-09-28。ブックマークのタイトル・URL・フォルダ名、星座の名前、検索語、保存したデータは、利用者のものであっても
「外から来た値」として扱う。ここに、表示と遷移の経路、保存データの扱い、拡張機能の設定、依存関係の状態をまとめる。
自動確認は `scripts/check-safety.mjs` と `scripts/check-web.mjs`（どちらも `check:ext` の中）。

## 問題・脆弱性の報告

- GitHub の Issues（https://github.com/j341nono/bukusupe/issues）か、メール（j341nono.dev [at] gmail.com）で受け付ける。
  脆弱性の詳細を公開の Issue に書きたくない場合はメールで送ってもらう。
- 問い合わせ先は `src/config.ts`（`SUPPORT_EMAIL`・`ISSUES_URL`）。仮の値に戻すと `npm run package` が失敗する（`check-release`）。

## 規則（`CLAUDE.md` / `AGENTS.md` の 9〜11）

- ページやブックマークから来た文字列を HTML として解釈させない（`innerHTML` などに入れない）。
- 利用者のデータを外部に送る処理、分析用のデータを集める処理を書かない。
- 配布物（ストア向けのビルド）に、測定用・確認用の仕組みを含めない（段階 2）。

## 表示の経路

`src/` に、文字列を HTML として解釈する処理（`innerHTML`・`outerHTML`・`insertAdjacentHTML`・`document.write` など）は無い
（`check-safety` が `src/` を調べる）。ハッカソンの時点では `src/ui/hud.ts` の 2 か所にあった（中身は固定の文言と数値だけ）が、要素の組み立てに替えた。

| 表示するもの | 場所 | 入れ方 | 長さ | 書字の向き |
|---|---|---|---|---|
| 星のタイトル（地図・近距離・中距離） | `src/ui/labels.ts` | `textContent` | 中距離 18・近距離 40（全角を 1）で「…」。全文は title | 区切る（`.label`） |
| 検索中のタイトル | `src/ui/labels.ts` | `textContent` | 32 で「…」。全文は title | 区切る |
| マウスを乗せたときのタイトル | `src/ui/labels.ts` | `textContent` | 80 まで。それより長い分は title | 区切る |
| 星団名（地図） | `src/ui/labels.ts` | `textContent` | 名前の付け方で短い | 区切る |
| 星のカード（タイトル・URL・フォルダ） | `src/main.ts` `showCard` | `textContent`、全文は `title` | 3 行・3 行・2 行で「…」 | 区切る。URL は左から右に固定（`dir="ltr"`）して、先頭のドメインが必ず見える |
| 飛行中の窓（タイトル・ドメイン） | `src/ui/flight-windows.ts` | `textContent` | 幅 230px で「…」 | 区切る |
| 遠くの星の名前 | `src/ui/flight-far-labels.ts` | `textContent` | 幅 180px で「…」 | 区切る |
| 星団名の標識（飛行中） | `src/ui/flight-windows.ts` | `textContent` | 短い | 区切る |
| 星座の名前（地図の上） | `src/render/scene.ts` | `textContent` | 幅 min(70vw, 640px) で「…」 | 区切る |
| 画面下の星座の一覧 | `src/main.ts` | `textContent`、全文は `title`、「…」の `aria-label` は `setAttribute` | 16em で「…」 | 区切る |
| 新星の一覧（タイトルと、見出しの検索語） | `src/main.ts` `renderNovae` | 要素の組み立てと `textContent`、全文は `title` | 1 行で「…」 | 区切る |
| ⓘ のパネル | `src/ui/hud.ts` | 要素の組み立てと `textContent` | 固定の文言と数値だけ | — |
| 検索語 | 入力欄の値 | `value` | 入力欄は 200 文字まで | — |

- **右から左へ書く制御文字**：表示の要素はすべて `unicode-bidi: isolate` で周りと区切るので、周りの文字や記号の並びは入れ替わらない。
  ただし、タイトルそのものの中では制御文字が効く（例：U+202E＋`moc.elgoog//:sptth` は、タイトルとしては `https://google.com` と見える）。
  そのため、星のカードでは本当の URL を左から右の向きに固定して必ず表示する。タイトルの中の制御文字を取り除くかは、段階 5 以降で検討する。
- **拡張機能のページの CSP**（manifest）はインライン スクリプトを止めるので、仮に HTML として解釈されても、`onerror` などは動かない（二重の守り）。

## ページを開く経路

- ページを開く処理は、すべて `src/ui/open-page.ts` の `openPage` を通る（星への突入・Enter・カードの「開く」・ダブルクリック。
  拡張機能は `chrome.tabs.update` / `create`、Web のデモは `location.href` / `window.open`）。
- 開いてよいのは `http:` と `https:` だけ（`src/bookmarks/validate.ts` の `isOpenableUrl`）。
- ブックマークを読み込む側（Chrome のデータ源・同梱のサンプル・確認用の注入）も、同じ判定（`parseBookmarkItem`）を通す。
  `javascript:`・`data:`・`file:`・`chrome:`・`about:` などは星にならない。段階 5 のバックアップの読み込みでも、この 2 つの関数を使う。
- 国際化ドメイン名（見た目が紛らわしいもの）は、Chrome が `xn--` の形にした URL のまま表示される。
- サイトのアイコン（`_favicon`）の URL は、`URLSearchParams` で符号化して組み立てる。

## 保存しているデータ

| 場所 | 中身 | 読み込むときの確かめ |
|---|---|---|
| sessionStorage `bukusupe:return-state` | 「戻る」で再開するための状態（版の番号 2） | `src/ui/return-state.ts` の `parseReturnState`：版・データ源・数値は有限で妥当な範囲・検索語は 500 文字まで・星座の id は文字列。一つでも合わなければ丸ごと捨ててふつうに開く。「戻る」以外で開いたときも捨てる |
| IndexedDB `bukusupe-chrome` / `bukusupe-sample`（測定用は `bukusupe-bench-…`） | 埋め込み・配置・星座 | 星座の行は `src/constellation/index.ts` の `parseConstellation`（形の版 2）で確かめ、旧形式の行は `parseLegacyConstellation` で確かめてから移す。どちらにも合わない行は読み飛ばしてコンソールに警告を残す。名前は保存するときに 80 文字まで |
| localStorage `bukusupe:prefer-sample`・`bukusupe:sample-hint-shown` | サンプルで試すかの選択・案内を出したか | `"1"` と比べるだけ |
| chrome.storage.local `bench:…` | 確認用の注入（確認用のビルドで `?debug=1&bench=…` のときだけ読む） | `parseBookmarkItem` を通す。配布用のビルドには、この処理も `storage` 権限も無い（段階 2） |

- Web のデモの保存領域の名前には、すべてブクスペ専用の接頭辞（`bukusupe-` / `bukusupe:`）が付いている（`check-web` が確かめる）。
  GitHub Pages では、同じユーザーの他のリポジトリのページと保存領域（同じ origin）を共有するため。モデルのキャッシュ（Cache Storage）も、
  Transformers.js の `env.cacheKey` で `bukusupe-model` にした（段階 2。既定は `transformers-cache`）。前の版の `transformers-cache` は、
  拡張機能では消し、Web のデモでは他のページのものかもしれないので残す。壊れた古いキャッシュがあっても読まないことを `check-cache` が確かめる。

## 拡張機能の設定

- `web_accessible_resources` は無い。一般の Web ページから拡張機能の中身を読んだり、拡張機能を入れていることを見抜いたりする入口にはならない。
- CSP：`script-src 'self' 'wasm-unsafe-eval'; object-src 'self'`（MV3 で必要な最小限）。
- Web のデモの CSP（`vite.config.ts` の `WEB_CSP`、`--mode web` のときだけ index.html に meta で入れる）：
  `default-src 'self'`、`script-src 'self' 'wasm-unsafe-eval'`、`worker-src 'self'`、`connect-src 'self'` と Hugging Face（`*.hf.co` を含む）、
  `style-src 'self' 'unsafe-inline'`（index.html の中の `<style>`）、`img-src 'self' data: blob:`、`object-src 'none'`、`base-uri 'self'`、
  `form-action 'none'`。モデルの取得と意味検索まで通して、違反は 0 件（`check-web`）。
- **権限（段階 2）**：配布用の manifest は `bookmarks`・`unlimitedStorage`・`favicon` だけ。`host_permissions` は外した（Hugging Face は
  CORS を許しているので、拡張機能の画面と Worker から権限なしで重みを取れる。まっさらなプロファイルでモデルの取得 → 意味検索まで通すのを
  `check-fresh` が確かめる）。`storage` は確認用の注入のためだけなので、確認用のビルド（`dist-debug/`）の manifest にだけ足す。
- **確認用・測定用の仕組み（段階 2）**：`?debug=1` の窓口・測定用の注入と DB・量子化の切り替え・Worker のメモリの記録・描画の測定は
  `if (__DEBUG__) { … }` の中にあり、配布用のビルドでは取り除かれる。`check-release` が名前の一覧（`scripts/lib/release.mjs` の `FORBIDDEN`）で
  配布物を調べ、`check-fresh` が配布用のビルドで `?debug=1` を付けても窓口が無いことを確かめる。

## 依存関係

- `npm audit`（配布物の依存・開発用の依存とも）：0 件（2026-09-27）。
- ONNX Runtime Web は、Transformers.js 4.3.0 が指定する開発版（`1.31.0-dev.20260914-8d85527a0`）。段階 2 で調べた結果（2026-09-28）：
  `1.31.0` の正式版はまだ出ていない（npm の `latest` は `1.30.0`、2026-09-14。`dev` は `1.31.0-dev.20260918`）。Transformers.js も `4.3.0` が最新で、
  指定は変わっていない。`1.30.0` に下げるのは、Transformers.js が前提にする版と食い違うので勧めない。`1.31.0` の正式版か、それを指定する
  Transformers.js が出たら更新する（使う人の判断）。

## 調査のときの結果（2026-09-27）と修正

| # | 重要度 | 内容 | 状態 |
|---|---|---|---|
| 1 | 中 | ページを開く処理が URL の種類を確かめていなかった | 修正（`openPage`・`isOpenableUrl`・`parseBookmarkItem`） |
| 2 | 中 | 「戻る」用の保存状態を確かめずに使い、壊れた値で起動が止まる・カメラが NaN になった | 修正（`parseReturnState`、版の番号） |
| 3 | 中 | `host_permissions` が必要より広い | 修正（外した。段階 2） |
| 4 | 低 | 右から左へ書く制御文字で、タイトルを別の URL に見せかけられる | 修正（書字の向きを区切る、カードの URL を固定） |
| 5 | 低 | とても長いタイトルが画面からはみ出した（ラベルの幅 12,261px、カードの上端 −779px） | 修正（長さの上限と「…」、全文は title） |
| 6 | 低 | `hud.ts` の `innerHTML` 2 か所 | 修正（要素の組み立て） |
| 7 | 低 | IndexedDB から読んだ星座の形を確かめず、形の違う行で起動が止まった | 修正（`parseConstellation`） |
| 8 | 低 | Web のデモに CSP が無い | 修正（`WEB_CSP`） |
| 9 | 低 | ストア向けに要らない権限・仕組み（`storage`、`?debug=1`） | 修正（確認用のビルドに分けた。段階 2） |
| 10 | 低 | ONNX Runtime Web が開発版 | 調べた（正式版の 1.31.0 は未公開。更新は使う人の判断） |

実地の確かめ：`<img src=x onerror=…>`・`<script>`・`"><svg onload=…>` を含むタイトルとフォルダ名、HTML を含む星座の名前で、
地図・カード・検索中・星座の名前と一覧・飛行中の窓のどこでも文字として表示され、差し込まれた要素・ダイアログ・例外は 0 件だった（修正前から）。
