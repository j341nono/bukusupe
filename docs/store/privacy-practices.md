# プライバシーへの取り組み（デベロッパー ダッシュボードの「プライバシー」タブ）の案

版 0.9.0 用、2026-09-28（docs/RELEASE.md 段階 3）。ダッシュボードの入力欄は、審査する人が読みやすいよう英語で書き、日本語を添える。
`scripts/check-store.mjs` が、下の権限の表と配布用の manifest の権限の対応、インストール時の警告の文言を確かめる。

根拠にした公式の説明（2026-09-28 に確認）：
- プライバシー タブの各欄：https://developer.chrome.com/docs/webstore/cws-dashboard-privacy
- 利用者のデータの FAQ：https://developer.chrome.com/docs/webstore/program-policies/user-data-faq
- プライバシーポリシーの決まり：https://developer.chrome.com/docs/webstore/program-policies/privacy
- 開示の決まり：https://developer.chrome.com/docs/webstore/program-policies/disclosure-requirements
- 限定的な使用（Limited Use）：https://developer.chrome.com/docs/webstore/program-policies/limited-use
- Manifest V3 の追加の決まり（リモートのロジック）：https://developer.chrome.com/docs/webstore/program-policies/mv3-requirements
- リモートで配信されるコード（RHC）：https://developer.chrome.com/docs/extensions/develop/migrate/remote-hosted-code
- 2026 年の方針の更新（2026-08-01 から適用）：https://developer.chrome.com/blog/cws-policy-updates-2026

---

## 1. 単一の目的（Single purpose description）

English（入力する文）：

> Bukusupe shows the user's Chrome bookmarks as a map of stars arranged by meaning, so the user can browse, search, and revisit their own bookmarks,
> group chosen bookmarks into saved "constellations", and open a bookmark from the map. All processing happens locally in the browser.

日本語：ブクスペは、利用者の Chrome のブックマークを、意味の近さで並べた星の地図として表示し、自分のブックマークを眺める・探す・開き直す、
選んだブックマークを「星座」としてまとめて残す、という一つの目的のための拡張機能です。処理はすべてブラウザの中で行います。

---

## 2. 権限ごとの理由（Permission justification）

配布用の manifest（`dist/manifest.json`）の権限は `bookmarks`・`unlimitedStorage`・`favicon` の 3 つ。`host_permissions` は無い（段階 2 で外した）。

<!-- permissions:start -->
| 権限 | 入力する理由（English） | 日本語 |
|---|---|---|
| `bookmarks` | Reads the user's bookmarks (title, URL, folder, date added, date last used) to draw them as stars on the map and to search them. The extension only reads bookmarks and listens for bookmark changes to keep the map up to date; it never creates, edits, moves, or deletes bookmarks. | ブックマークを星として地図に描き、検索するために読み取る。変更に追随するため変更の通知も受ける。ブックマークを作る・変える・動かす・消すことはしない。 |
| `unlimitedStorage` | Stores, inside the browser, the computed meaning vectors (embeddings) for each bookmark, the map layout, the user's constellations, and the downloaded language model data (about 135 MB), which can exceed the default storage quota. Nothing is sent off the device. | 各ブックマークの意味のベクトル（埋め込み）、配置、星座、取得したモデルのデータ（約 135 MB）をブラウザの中に保存する。既定の容量を超えうるため。外部には送らない。 |
| `favicon` | Shows each site's icon in flight mode using the icons Chrome already has on the device (the `_favicon` URL). The extension never fetches icons from the network. | 飛行モードで、Chrome が端末に持っているサイトのアイコン（`_favicon`）を表示する。アイコンを取りに外部へ通信しない。 |
<!-- permissions:end -->

---

## 3. インストール時の警告（段階 2 の残り：文言と説明の照合）

配布用の manifest から `chrome.management.getPermissionWarningsByManifest` で求めた、インストール時に Chrome が表示する文言（日本語の Chrome）。
`scripts/check-store.mjs` が、この欄と実際の文言が一致していることを確かめる。

<!-- warnings:start -->
- 「ブックマークの読み取りと変更」：`bookmarks` の権限による。Chrome の表示は「読み取りと変更」をひとまとめにしているが、ブクスペは読み取るだけで、変更・削除はしない（上の表の `bookmarks` と、README・プライバシーポリシーでも同じ説明）。
- 「アクセスしたウェブサイトのアイコンの読み取り」：`favicon` の権限による。Chrome が端末に持っているアイコンを表示するだけで、外部には取りに行かない（上の表の `favicon`）。
<!-- warnings:end -->

`unlimitedStorage` は警告を出さない。`host_permissions` を外したので「多数のウェブサイト上にある自分のデータの読み取りと変更」は出ない。

---

## 4. リモートコード（Are you using remote code?）

選ぶもの：**No, I am not using remote code**（リモートコードを使用していません）。

理由（English、欄があれば入力する）：

> All JavaScript and WebAssembly (including the ONNX Runtime used to run the language model) are bundled in the extension package; nothing
> executable is loaded from the network, and there is no eval or dynamic script loading. The only network access is a one-time download of the data
> files of a fixed, publicly available text-embedding model (Xenova/multilingual-e5-small: weights, tokenizer and configuration) from Hugging Face.
> These files are data (JSON and model weights) consumed by the bundled runtime; they do not change the extension's logic.

日本語：スクリプトと WebAssembly（モデルを動かす ONNX Runtime を含む）はすべて同梱し、外部から読み込まない（`eval` も動的なスクリプトの読み込みも無い）。
外部から取得するのは、公開されている決まった埋め込みモデル（`Xenova/multilingual-e5-small`）のデータ（重み・トークナイザ・設定の JSON）だけ。

公式の定義：RHC は「拡張機能のファイル以外から読み込まれてブラウザが実行するもの。JavaScript や WASM など。データや JSON・CSS は含まない」
（remote-hosted-code のページ）。ただし、Manifest V3 の追加の決まりには「外部の資源はロジックを含んではならない」「データとして取得しても、
複雑な命令を実行する解釈器を作るのは違反」とある。モデル（ONNX）は演算の並びを含むデータなので、下の「確認したいこと」の 3 に挙げた。

---

## 5. データの使用（Data usage）の案

### 申告が要るか

- 利用者のデータの FAQ の 3：「端末の中だけで処理・保存し、外部のサーバーや第三者に送らない場合も、データの扱いを開示しなければならない」
  （*"Yes. Extensions are required to disclose how they handle user data, even when data is processed or stored locally on a user's device and is not
  transmitted to external servers or third parties."*）。
- 同じく 4：利用者のデータの例に「ウェブの閲覧の活動（利用者が求めた・触れたウェブサイトやウェブの資源についての情報。ブラウザが触れたドメインや URL を含む）」がある。
- ブックマークは、タイトル・URL・最終利用日を持つので、この「ウェブの閲覧の活動」にあたると判断した。**端末の中だけで扱う場合も申告する**。

### チェックする種類（案）

ダッシュボードの種類の名前と定義は、公式の説明のページには載っておらず、ダッシュボードの画面で決まる（入力するときに画面の定義と照らし合わせる）。

| 種類（ダッシュボードの表記の想定） | 案 | 理由 |
|---|---|---|
| Web history（ウェブ履歴） | **チェックする** | ブックマークの URL・タイトル・最終利用日を読み取って、端末の中で処理・保存する。FAQ の「ウェブの閲覧の活動」の定義に当たる |
| Personally identifiable information（個人を特定できる情報） | しない | 氏名・メールアドレスなどは扱わない |
| Health / Financial and payment / Authentication information | しない | 扱わない |
| Personal communications（個人的な通信） | しない | 扱わない |
| Location（位置情報） | しない | 扱わない（IP アドレスはモデルの取得のときに Hugging Face に届くが、ブクスペは受け取らない） |
| User activity（ユーザーのアクティビティ） | しない | クリックや入力を記録・送信しない（画面の操作は画面の中で使うだけ） |
| Website content（ウェブサイトのコンテンツ） | しない | ブックマークしたページの中身は読まない |

### 誓約（3 つともチェックする）

ダッシュボードの誓約の文言は、公式の説明のページには載っていない（下は、限定的な使用の決まりが禁じる使い方に対応する誓約として想定したもの。入力するときに画面の文言と照らし合わせる）。

- I do not sell or transfer user data to third parties, outside of the approved use cases.（第三者に販売・移転しない）
- I do not use or transfer user data for purposes that are unrelated to my item's single purpose.（単一の目的と関係の無い目的に使わない）
- I do not use or transfer user data to determine creditworthiness or for lending purposes.（信用力の判断や貸付に使わない）

根拠：ブクスペは利用者のデータを外部に送らず、単一の目的（自分のブックマークを地図にして探す・残す）のためだけに端末の中で使う（限定的な使用の決まり、
2026 年の更新「集めるデータは単一の目的に厳密に必要なものに限る」にも合う）。

### 限定的な使用の宣言

限定的な使用の決まり：「限定的な使用の決まりに従うという宣言を、拡張機能のウェブサイトに置かなければならない」（例として挙がっている文：
*"The use of information received from Google APIs will adhere to the Chrome Web Store User Data Policy, including the Limited Use requirements."*）。
→ プライバシーポリシーのページ（日本語・英語の両方）に、この文を置いた（`check-web` が確かめる）。

### プライバシーポリシーの URL

https://j341nono.github.io/bukusupe/privacy/ （日本語・English。プライバシーポリシーの決まり：「利用者のデータを扱うなら、正確で最新のプライバシーポリシーを掲げる」。
FAQ の 14：端末の中だけに保存する場合も必要）

---

## 6. 開示と同意（2026 年の更新）

開示の決まり：「利用者のデータを扱うなら、インストールの前に、どのデータを集めてどう使うかを目立つように開示し、利用者の積極的で十分な説明を受けた同意を得る。
インストール後にデータの扱いを変えるときは、その変更を目立つように開示する」。

今の形：ストアの掲載文の「プライバシー」の段落、プライバシーポリシー、インストール時の「ブックマークの読み取りと変更」の確認で、インストールの前に開示している。
拡張機能の画面の中に、初回の説明（ブックマークは端末の中だけで扱う、など）は無い。これで足りるかは「確認したいこと」の 2。
