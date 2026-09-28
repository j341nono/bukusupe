# 段階 3b：画面の言語の切り替え（英語対応の前倒し）（2026-09-28）

「決めたこと」の 5（英語対応：A＝画面の文言と掲載文だけ）を、段階 7 から前倒しし、ストアへの最初の申請（0.9.0）の前に入れた（使う人の判断）。
計画と完了条件は `docs/RELEASE.md` 段階 3b、仕様は `docs/SPEC.md` 14 章、書体は `docs/DESIGN.md`「書体の規則」。
英語のサンプルの宇宙は段階 3c に分けた（未着手）。

## 作ったもの

- **辞書**：`src/i18n/ja.ts`・`en.ts`（108 項目）。英語の辞書は `Messages` 型なので、項目の過不足は型でも弾く。`{name}` は差し込み、
  `[[W]]` はキーの表示（kbd。`setRichText` が要素を組み立てる。HTML として解釈しない）、`#one` で終わる項目は英語の単数形（`Intl.PluralRules`）。
- **言語の決め方**：`src/i18n/index.ts`。設定「自動／English／日本語」（初期値は自動）を localStorage `bukusupe:lang` に保存。
  自動は `navigator.language` が `ja` で始まれば日本語、それ以外は英語。`t()` は数を `Intl.NumberFormat`、百分率も `Intl` で書く。
- **静的な文言**：`index.html` の本文は項目の名前だけを持つ（`data-i18n`・`data-i18n-title`・`data-i18n-placeholder`・`data-i18n-aria-label`・
  差し込む値は `data-i18n-params`）。`applyStaticText()` が入れる。ページの題と `html` の `lang` も。
- **その場での切り替え（読み込み直さない）**：選択欄（ⓘ のパネルの下の端と、初回の説明画面の右上。`createLangPicker`）で変えると、
  `applyStaticText()` と `onLangChange` に登録した描き直し（HUD・星座の一覧・新星・選択モード・「加える星座」・カード・星団名）が走る。
  HUD の進み具合の文は、言語を変えても引き直せるよう関数（`status: () => t(...)`）で渡す。ⓘ のパネルの中身は `#hud-body` に描き、
  言語の選択欄はその外に 1 度だけ置く（進み具合のたびに作り直すと、開いた選択肢が閉じるため）。
- **星団名**：大分類（`src/embed/topic-categories.ts`）を `{ id, ja, en, words }` にした。保存する名前は言語に依らない形
  （`{dev}`・`{dev}+{news}`・`{dev}#3`・`{unnamed}#3`・仮の配置の `{other}`）にし、表示のときに `clusterLabel()`（`src/i18n/cluster.ts`）が画面の言語へ直す。
  形に合わない名前（仮の配置のフォルダ名・ドメイン）はそのまま出す。保存済みの配置は、開くたびに今の命名規則で付け直す（`withCurrentNames`。座標は変えない）ので移行は要らない。
  Web のデモの計算済みのサンプルも、読み込むときに付け直す。同数のときの順は大分類の日本語の名前の順にして、日本語の星団名が以前とまったく同じになることを確かめた
  （サンプルの 9 星団）。フォルダ名は、大分類の名前（日本語か英語）と同じときだけ、その大分類の票として数える（英語のフォルダ名 "Music" なども数える）。
  タイトルからは、日本語の名前は部分一致、英語の名前は語として（大文字小文字を区別せずに）拾う。
  言語を切り替えたときは `SpaceView.setClusterNames` で名前だけを差し替え、ラベルの幅を測る書体も取り直す（`LabelLayer.resetFonts`）。
- **拡張機能の名前と説明**：`public/_locales/en`・`ja/messages.json`（`extName`・`extShortName`・`extDescription`・`actionTitle`）。
  manifest は `__MSG_…__` で引き、`default_locale` は `en`。英語の名前は "Bukusupe — Bookmark Space"、短い説明は 132 文字ちょうど。確認用のビルドの名前は「ブクスペ（確認用）」に固定した。
- **書体**：英語の画面では `:root:lang(en)` で `--font-name` をセリフ体（Iowan Old Style → Palatino Linotype → Palatino → Book Antiqua → Georgia）にする。
- **右下のボタン**：「選択・飛行・再配置」を固定の位置（right: 172px / 92px / 20px）から、右から詰めて並べる `#corner-actions`（flex）にした。
  英語では "Rearrange" が "Fly" に重なっていたため。
- **Web 版**：同じ辞書と設定で切り替わる（`check-web` の 7）。
- **ストアの素材**：`docs/store/listing.en.md`（主）、`privacy-practices.en.md`、`listing.ja.md` の更新。スクリーンショットは `docs/store/assets/en/`・`ja/` の 2 組、
  宣伝用の画像は英語の文字だけ（"Bukusupe" と "a universe of your bookmarks"、セリフ体）。README は英語を主にし、日本語は `README.ja.md`。
- **プライバシーポリシーと SECURITY.md**：設定に「表示の言語」を足した（localStorage `bukusupe:lang`）。

## 足した確認（`check:ext` の最後の 2 本）

- `scripts/check-i18n.mjs`（ブラウザを使わない）：辞書の項目のそろい、`_locales` のそろいと manifest の引き方、大分類の英語名、
  `src/` の画面の部品と `index.html` に辞書を通さない日本語が無いこと（コメント・`src/debug/`・`if (__DEBUG__)`・console と Error の文・辞書とデータのファイルは除く）。
  修正前のソース（`git archive HEAD`）で 4 項目とも NG、辞書の片方に項目を足す・部品に日本語を直書きすると NG になるのを確かめた。
- `scripts/check-language.mjs`：ブラウザの言語を日本語・英語にした使い捨てのプロファイルで、初回の説明画面から「自動」の言語、
  英語の画面に日本語が残っていないこと（利用者のデータは除く）、主な画面（初回の説明・初期画面・ⓘ・カード・検索・選択モード・名前の入力・星座と「…」のメニュー・飛行）の
  はみ出し・重なり・ボタンの折り返し、ⓘ での切り替えが同じページのまま効くこと、読み込み直しても保たれること、初回の説明画面の選択欄。
  スクリーンショットを `docs/screens/i18n/{ja,en}-*.png` に保存する。修正前のビルドで NG になること、右下のボタンを以前の固定の位置に戻した版で
  「#flight-toggle と #relayout が重なる」を検出することを確かめた。
- `check-web` に 7（Web のデモの言語）、`check-store` を英語と日本語の 2 組（掲載文と `_locales`、2 つの申告の権限の表、画像 13 枚）に広げた。

## つまずいた点

- **確認の Chrome の言語**：ヘッドレス Chrome の `navigator.language` は OS の言語（この Mac では `ja`）になる。`--lang` と `--accept-lang` で変えられる。
  `scripts/lib/harness.mjs` に `lang`（既定は `"ja"`）を足し、`check-extension.mjs` も `--lang=ja` で起動する（既存の確認は日本語の文言を見ているため）。
- **macOS では Chrome 自体の言語は変えられない**：`--lang` は拡張機能の `_locales` の選び方やインストール時の警告の文言には効かない。
  `-AppleLanguages (en-US)` を渡すと `Extensions.loadUnpacked` が応答しなくなった。英語の Chrome のインストール時の警告は Chrome の標準の英語の文言で書き、
  `check-store` は、走らせた Chrome の言語の欄は文言まで、もう一方の欄は警告の数と権限の対応を確かめる。
- **重なりの確かめ方**：はじめは「大きさのある部品の枠の中」だけを見ていたため、枠の外に置かれたボタン（固定の位置）どうしの重なりを見落とした。
  部品の中の文字を持つ要素を枠の大きさに依らず集め、部品をまたいで比べる形に直した。初回の説明画面が前面を覆っている間は、説明画面だけを見る。
- **意図した重なり**：星座の「…」のメニューは一覧の上に浮かべて開くので、一覧との重なりだけは除く。言語の名前「日本語」は、どの言語の画面でも同じ書き方にする（英語の画面の日本語の確認から除く）。
