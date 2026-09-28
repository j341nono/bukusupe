# 段階 3c：英語のサンプルの宇宙（2026-09-29）

段階 3b で画面は英語になったが、サンプルの宇宙とWeb のデモの計算済みのデータは日本語のままだった（3b から分けた残り）。
計画と完了条件は `docs/RELEASE.md` 段階 3c。版は `0.9.1`。

## 作ったもの

- **英語のサンプル**：`src/data/sample-bookmarks.en.json`（156 件）。日本語のサンプル（`sample-bookmarks.json`）と同じ 14 個の
  フォルダ・件数の配分（開発/フロントエンド・バックエンド・ツール、AI、デザイン、料理、旅行、音楽、お金、健康、ガジェット、ニュース、
  あとで読む、フォルダ無し）にし、実在のサイトの URL を使った（特定の会社を目立たせない扱いは、日本語のサンプルと同じく了承済み）。
  宇宙関係のブックマークは News（5 件）・Design（1 件）・Travel（1 件）・Read Later（3 件）・フォルダ無し（2 件）の 5 か所に分けて
  入れ、「space」のような検索語で複数の星団から星が集まるようにした。追加日・最終利用日は、日本語のサンプルの各項目の「基準日からの
  日数」をそのまま流用して作った（同じ考え方・同じ基準日 `SAMPLE_TODAY` = 2026-09-26 12:00 JST を保つため）。
- **ドメインの分野語辞書**：`src/embed/domain-hints.ts` に、英語のサンプルだけで使う約 60 件を足した（末尾の「段階 3c」の見出しの下）。
  既存の大分類の語（`src/embed/topic-categories.ts`）にすべて対応させた（対応が無い語があると `src/layout/names.ts` の起動時の
  検査で例外になる）。
- **サンプルの選び方**：`loadSampleBookmarks(lang: Lang)`（`src/bookmarks/sample-source.ts`）が、画面の言語（`src/i18n` の `lang()`）で
  日本語・英語のどちらかの JSON を返す。`src/bookmarks/index.ts` の `loadBookmarks()` から呼ぶ。
- **DB を言語ごとにも分ける**：`src/store/db.ts` の `useDataSource(kind, bench?, sampleLang?)` が、データ源が `sample` のときは
  `bukusupe-sample-ja` / `bukusupe-sample-en` を使う（`bukusupe-sample` 単独では無くなった。前の版の `bukusupe-sample` DB は
  そのまま残るが、使わなくなるだけで害は無い）。
- **言語の切り替えで読み込み直す（サンプルのときだけ）**：`src/main.ts` の `refreshLanguage()` に、`state.kind === "sample"`
  （bench 測定中を除く）なら `location.reload()` する分岐を足した。**注意**：この分岐は「データ源を決めて読み込み終えた後」
  （`dataLoaded` フラグ）でないと働かないようにした。無いと、初回の説明画面（同意の前、まだ `state.kind` の既定値 `"sample"` の
  ままで実データを読み込んでいない）で言語の選択欄を触っただけで、意図せず読み込み直ってしまう（`check-language.mjs` の
  「初回の説明画面に言語の選択欄があり…」の確認がこれで落ち、原因を突き止めて直した）。自分のブックマークを表示中は、この分岐に
  入らないので、言語を切り替えてもデータは変わらない（今までどおりその場で文言だけ変わる）。
- **Web のデモ**：計算済みのデータを `src/data/sample-precomputed.json`（日本語）・`sample-precomputed.en.json`（英語）の 2 本に
  分けた。`scripts/precompute-sample.mjs` が、ブラウザの言語（`ja` / `en-US`）を変えて 2 回実行し、両方作り直す
  （`npm run sample:precompute` は変更なし、中身が 2 本分になった）。`startFromSampleCache()`（`main.ts`）は、画面の言語で
  読み込む方を選ぶ。
- **検索の正解数**：`scripts/measure-search-en.mjs`（新規、bench 系のスクリプトと同じ位置づけで `check:ext` には組み込まない）で、
  日本語の既存 9 語と同じ趣旨の英語の 9 語を測った。結果は英語 34 / 45、日本語 39 / 45 で同程度（`docs/BENCHMARK.md` 7 章）。
- **ストアの素材**：`npm run store:assets` で、英語の掲載用スクリーンショット（`docs/store/assets/en/`）を英語のサンプルで撮り直した
  （日本語の分・宣伝用画像・アイコンも一緒に作り直されるが中身は変わらない）。`docs/screens/i18n/en-*.png`（`check-language` が撮る）も
  英語のサンプルの星空になった。

## 確認

- `check-language.mjs`：「英語の画面のサンプルの宇宙は、ブックマークのタイトルも英語（日本語が残っていない）」を足した。
  「言語の切り替え」の確認（サンプルの表示中に English ⇄ 日本語）を、読み込み直る前提に直した
  （`__languageMarker` で「読み込み直らなかった」ことを見ていたのを、「読み込み直った」ことを見るのに変えた。星団名だけでなく
  サンプルのブックマークのタイトルも、切り替えた言語のものになっていることを見る）。
- `check-web.mjs`：項目 7（画面の言語）を、切り替えで読み込み直る前提に直し、英語のサンプル・日本語のサンプルどちらも
  タイトルに相手の言語の文字が無いことを見るようにした。
- どちらも、修正前のコード（reload の分岐が無い版）では新しく足した確認が NG になり、直すと通ることを確かめた（規則 8）。
- `npm run check:ext`（18 本）はすべて OK。

## つまずいた点

- **`aws.amazon.com` の重複**：足したドメイン分野語辞書の 1 件 `aws.amazon.com`（英語のサンプルの RAG の記事用）が、
  たまたま日本語のサンプルの既存のブックマーク（s046「RAG（検索拡張生成）の基本」、`aws.amazon.com/jp/...`）のドメインとも一致し、
  そのブックマークの入力文に新しい分野語が加わって、**日本語のサンプルの配置がわずかに変わってしまった**。配置は毎回同じ座標に
  なる（規則8・`check-extension` の 9）ため、これ自体は「同じ入力なら同じ結果」を破らないが、既存の確認スクリプトの中に、
  特定の星の画面上の位置（遠くの星・近くの星のスクリーン座標）に頼ったハードコードがあり（`check-selection.mjs`）、配置が変わった
  ことでその 1 本が落ちた（症状は「検索を消した後、選んでいた星が消える」という一見無関係な失敗で、原因の特定に手間取った。
  `git stash` で変更を分割適用しながら二分探索した）。**対策**：英語のサンプルだけで使うドメインを足すときは、日本語のサンプルが
  使っているドメインと重ならないことを確かめてから登録するようにした（重なっていた `aws.amazon.com` は外した。
  英語のタイトル自体が説明的なので、無くても embeddings は十分機能する）。
- **`refreshLanguage()` の reload 分岐の早期発火**：上記の `dataLoaded` フラグが無い版では、初回の説明画面の言語の選択欄を
  切り替えただけで（まだ `awaitFirstRunConsent()` の中で、実データを読み込む前）、`state.kind` の既定値が `"sample"` のままなので
  意図せず `location.reload()` してしまい、`check-language.mjs` の switching の確認が原因不明の `TypeError: Cannot set
  properties of null` で落ちた（要素が一瞬で消えたように見えた。実際は reload の途中でスクリプトを評価していた）。
