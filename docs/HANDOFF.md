# 引き継ぎ（最終更新 2026-09-29・Claude）

このファイルは、開発を引き継ぐエージェント・人のためのもの。**0 章だけは毎回読む。** 1 章から後は、必要なときに引く資料。
計画と完了条件は `docs/RELEASE.md`、仕様の正典は `docs/SPEC.md`、見た目は `docs/DESIGN.md`。
段階を終えたら、0 章を今の状態に書き直し、終えた段階の記録は `docs/history/` へ移す（[一覧](history/README.md)）。

---

## 0. いまの状態と、次にやること（最初に読む）

### いまの状態（2026-09-29）

- Chrome ウェブストアでの公開の準備中。版は `0.9.1`（限定公開の間は `0.9.x`、一般公開で `1.0.0`。`public/manifest.json`・`package.json`・git のタグをそろえ、`CHANGELOG.md` に書く）。
  ハッカソンで提出した状態はタグ `v0.1.0-hacksonic`。
- 段階 1（安全性）・段階 2（ストア向けのビルド）は完了。段階 3 は、資料・自動確認・使う人の 6 点の回答の反映まで完了（push の後の確認が残る）。
- **段階 3b（画面の言語の切り替え。英語対応を段階 7 から 0.9.0 の前へ前倒し）は完了**（2026-09-28、[記録](history/2026-09-28-stage3b-language.md)）。
  画面の文言はすべて辞書（`src/i18n/en.ts`・`ja.ts`）にあり、設定「自動／English／日本語」（初期値は自動＝ブラウザの言語が日本語なら日本語、それ以外は英語）を
  ⓘ のパネルと初回の説明画面で選べる。拡張機能の名前と説明は `_locales`（既定は英語）。
  星団名は言語に依らない形（大分類の id）で保存し、表示のときに言語の名前にする。英語の見出しはセリフ体。ストアは英語を主の掲載にし（`docs/store/listing.en.md`）、
  スクリーンショットは英語と日本語の 2 組、宣伝用の画像は英語の文字だけ。README は英語が主（日本語は `README.ja.md`）。
- **段階 3c（英語のサンプルの宇宙。3b から分けた残り）は完了**（2026-09-29、[記録](history/2026-09-29-stage3c-english-sample.md)）。
  サンプルの宇宙（`src/data/sample-bookmarks.en.json`、156 件）と Web のデモの計算済みデータ（`sample-precomputed.en.json`）を英語でも用意し、
  画面の言語で使うサンプルを選ぶ（DB も `bukusupe-sample-ja` / `bukusupe-sample-en` に分けた）。**サンプルの表示中に言語を切り替えると、その言語のサンプルへ
  読み込み直す**（自分のブックマークの表示中は、今までどおり読み込み直さずその場で文言だけ変わる）。英語の検索の正解数は日本語と同程度（`docs/BENCHMARK.md` 7 章）。
  英語の掲載用スクリーンショットも英語のサンプルで撮り直した。
- 段階 5 のうち、星座のメンバーの固定と新星・選択モード・飛行モードの操作の見直しは、先に完了している。
- 最後の `check:ext` は 18 本すべて OK（`check-i18n`・`check-language` を足した）。ヘッドレス描画のコマ数は揺れるので、しきい値付近の NG は単独で測り直してから判断する。

### 次にやること（詳しくは `docs/RELEASE.md`）

| 順 | 内容 | 状態 |
|---|---|---|
| 1 | 段階 3 の残り：push の後にプライバシーポリシー（`/bukusupe/privacy-policy.html`）が開け、旧 URL `/bukusupe/privacy/` から転送されること、使う人の了承（英語の掲載文・英語の画面の画像を含む）、ダッシュボードでの最終確認（英語を主、日本語を追加の掲載として入れる） | 使う人待ち |
| 2 | 段階 4：`0.9.1` を限定公開で申請し、試してもらう | 未着手（登録は使う人） |
| 3 | 段階 5 の残り：多い件数、データの管理とバックアップ、動きを減らす設定、WebGL が無い環境、報告の窓口 | 未着手 |
| 4 | 段階 6（1.0.0 の一般公開）・段階 7（片付け、フォルダの自動星座など） | 未着手 |

### 今の作業で気をつけること

- **言語の切り替えは、自分のブックマークの表示中はその場で（読み込み直さない）、サンプルの表示中は読み込み直る**（段階 3c）：
  サンプルは画面の言語ごとに別のブックマーク（`sample-bookmarks.json` / `.en.json`）なので、`main.ts` の `refreshLanguage()` が
  `location.reload()` する。この分岐は、データ源を決めて読み込み終えたことを示す `dataLoaded` フラグが立ってから働く
  （初回の説明画面で `state.kind` の既定値 `"sample"` のまま言語を切り替えても、まだ読み込み直さない。フラグが無いと、
  同意の前の言語切り替えでも意図せず読み込み直ってしまう）。
- **ドメインの分野語辞書（`src/embed/domain-hints.ts`）にドメインを足すときは、日本語のサンプルが使っているドメインと重ならないことを確かめる**：
  重なると日本語のサンプルの入力文が変わり、配置が変わって、星の画面上の位置に頼った確認（`check-selection` など）が落ちることがある
  （`aws.amazon.com` の実例は [段階 3c の記録](history/2026-09-29-stage3c-english-sample.md)）。
- **画面の文言は辞書を通す**（SPEC 14 章）：`src/` の画面の部品と `index.html` に日本語を直書きすると `check-i18n` が NG にする。文言を足すときは
  `src/i18n/ja.ts` と `en.ts` の両方に同じ項目を足す（英語の辞書は型で過不足を弾く）。`index.html` は `data-i18n` などの属性で項目の名前だけを持つ。
  切り替えたときに描き直す動く文言は、`main.ts` の `refreshLanguage` と `hud.ts` の `redraw` に入れる。英語は日本語より長くなりやすいので、
  部品を足したら `check-language`（英語の画面のはみ出し・重なり）を走らせる。
- **確認の Chrome の言語**：`scripts/lib/harness.mjs` の `lang`（既定 `"ja"`、`--lang`・`--accept-lang`）。既存の確認は日本語の画面で文言を見ている。
  macOS では Chrome 自体の言語（`_locales` の選び方・インストール時の警告）は変えられない。
- **星団名**：保存する名前は `{dev}+{news}` のような形（`src/layout/names.ts`）。画面に出すときは必ず `clusterLabel()` を通す。確認用の窓口の `layout()` の `name` は表示名、`key` が保存の形。
- **一緒に直すもの**：`_locales` の name・description と permissions → `docs/store/` の掲載文（英語と日本語）と申告（2 つ）（`check-store`）。
  通信先・保存場所 → `privacy-policy.html`（`check-web`。本文はこの 1 か所だけ）。版 → manifest・`package.json`・`CHANGELOG.md`（ずれるとビルドが失敗する）。
- **問い合わせ先**：`src/config.ts` の `SUPPORT_EMAIL`（仮の値に戻すと `npm run package` が失敗する）と GitHub の Issues。
  Markdown の文書にはアドレスを `j341nono.dev [at] gmail.com` の形で書く（`privacy-policy.html` と `check-web` はそのまま）。
- **星座**：保存データは形の版 2（`members` 固定・`query`・`dismissed`・`savedAt`・`source`）。選択モードの状態は `src/main.ts` の `selection`
  （`setSelecting` / `refreshSelection`）。ページを開くのは星本体・タイトル・カードとも `openBookmark` を通す（飛行中の地図のダブルクリックだけは開かない）。
  「戻る」用の保存状態の形を変えたら `RETURN_STATE_VERSION` を上げる（今は 3）。
- **モデル**：コミット固定と SHA-256 の照合（`src/embed/model-integrity.ts`）。「始める」を押すまで、ブックマークの処理もモデルの取得もしない。
- 使う人の判断は `docs/RELEASE.md`「決めたこと」に従う（ブックマークは削除しない＝規則 3 は変えない、など）。新しい判断が要るものは作る前に確認する。

### これまでの記録

終えた段階の記録は `docs/history/` にある（[一覧](history/README.md)）。
段階 1 [安全性](history/2026-09-28-stage1-security.md)・段階 2 [ストア向けのビルド](history/2026-09-28-stage2-store-build.md)・
段階 3 [掲載の資料](history/2026-09-28-stage3-store-materials.md)・段階 3b [画面の言語](history/2026-09-28-stage3b-language.md)・段階 5 [星座の固定と新星](history/2026-09-28-stage5-constellation-members.md)・
[選択モード](history/2026-09-28-stage5-selection-mode.md)・[飛行の操作](history/2026-09-28-stage5-flight-controls.md)・
[正式公開の出発点](history/2026-09-27-release-start.md)・ハッカソン期間（[到達点](history/2026-09-26-hackathon-m2-m4.md)・
[〜09-26 の記録](history/2026-09-26-hackathon-m6-flight.md)・[09-27 の記録](history/2026-09-27-hackathon-final.md)）。

---

## 1. 到達点

ハッカソン期間の到達点（M0〜M4 の結果、レビュー後の修正）は [history/2026-09-26-hackathon-m2-m4.md](history/2026-09-26-hackathon-m2-m4.md) に移した。
正式公開に向けた各段階の結果は `docs/RELEASE.md` と `docs/history/`。

---

## 2. 決めたことと、その理由

### Manifest V3 と transformers.js（M1・最重要）

- **transformers.js v4 は既定で ONNX Runtime の `.mjs` / `.wasm` を jsDelivr から読む。**
  MV3 では外部プログラムの読み込みが禁止なので、`scripts/copy-ort.mjs` で
  `onnxruntime-web/dist/ort-wasm-simd-threaded.asyncify.{mjs,wasm}` を `public/ort/` に同梱し、
  `src/embed/ort-env.ts` の `configureOrt()` で `wasmPaths` をそこへ向ける。
  **埋め込みを使う入口では必ず `configureOrt()` を先に呼ぶ。**
- **`env.useWasmCache = false` は外さない。** true だと `.mjs` を `blob:` URL にして import するが、
  MV3 の CSP（`script-src 'self' 'wasm-unsafe-eval'`）は `blob:` のスクリプトを許さない。
- `env.allowLocalModels = false`（`chrome-extension://…/models/` を探しにいかせない）、
  `wasm.numThreads = 1`（追加のワーカーを blob から起こさせない）。
- 外部から取るのはモデルの重みだけ。`host_permissions` は `huggingface.co` と `*.hf.co`
  （重みの実体は `us.aws.cdn.hf.co` に置かれている）。
- Vite は onnxruntime-web の束に埋まった参照から `assets/` にも 27MB の `.wasm` を吐く。
  実行時に読むのは `ort/` の方なので、`vite.config.ts` の `dropDuplicateOrtWasm` で捨てている。

### 埋め込み

- モデルは `Xenova/multilingual-e5-small` の `dtype: "q8"`（＝`onnx/model_quantized.onnx`）。WebGPU は使わない。
- 接頭辞は必須。ブックマーク側 `passage: `、検索語側 `query: `。
- 入力文は `passage: {タイトル} | {フォルダの完全なパス} | {ドメイン} {分野語} {URL の単語}`。
  分野語は `src/embed/domain-hints.ts` の辞書（約 170 ドメイン）。
- 入力文のハッシュを IndexedDB に持ち、**変わった分だけ**計算し直す。モデルが変わったら全件。

### 配置

- **平均ベクトルを引いてから正規化し直す。** multilingual-e5 は無関係な文どうしでも
  0.78 前後の類似度を返すため、引かないと全部が一つの塊に寄る。平均は `meta.mean-vector` に保存し、
  後から増えたブックマークにも同じ平均を使う。取り直すのは「再配置」を押したときだけ。
- **汎用度（誰とでも似ている度合い）は、中心化する*前*のベクトルで測る。**
  中心化後のベクトルは定義上その平均がほぼ 0 になるため、`dot(v, 平均)` がほぼ 0 に潰れる。
  実測で、係数を 0.6 → 1.0 に変えても代表の並びが 1 件も動かなかった。
  いまは中心化前で測り、標準化（平均 0・分散 1）してから使っている（`src/layout/vector.ts`）。
- **代表（螺旋の内側）の順番** ＝
  `自分の星団の中心との類似度 − 2 番目に近い星団の中心との類似度 − 0.3 × 汎用度`。
  さらに、タイトルが 3 文字以下のものと汎用度が 1.5 を超えるものは候補から外す（「X」対策）。
- **星団の名前**：①代表 4 件のうち 2 件以上が同じ大分類（ドメイン辞書の分野語を変換＋タイトルに含まれる大分類の語）を
  持てばそれ → ②フォルダの多数決（1 位が半分以上ならそれ、半分未満で 2 位が 1 位の 6 割以上なら
  「1 位・2 位」、3 割以上なら 1 位） → ③分野語 → ④ドメイン → ⑤「無名の星団 N」。
  「あとで読む」「ブックマーク バー」などは候補から外す（`IGNORED_FOLDERS`）。
  同名が残ったら 2 番目に多い分野語を足して区別する。
- **粒度**：件数が中央値の 2 倍超かつ締まりが中央値未満の星団は k=2 で分割、
  5 件未満の星団は平均ベクトルが最も近い星団に統合（`src/layout/refine.ts`）。
  統合は星団の数が SPEC の下限（12 件以上なら 3 個）を下回るところで止める。
- **毎回同じ座標になること**は譲れない。乱数は種固定（`LAYOUT_SEED`）、PCA は固定初期値＋
  符号の決め方も固定、同点はすべて id 順で割る。`check:ext` が 2 回計算して完全一致を見ている。
- 新しいブックマークは、平均ベクトルが最も近い星団の螺旋の次の位置に置く。**他の星は動かさない。**
  消えた星の位置は空けたままでよい。全体の計算し直しは「再配置」だけ。
- 星の位置には id から決まる ±25% のずれを足す（螺旋の目が揃いすぎて機械的に見えるため）。

### 描画とラベル

- 星は `Points` 1 つ（2000 件で 60 コマ/秒を確認）。画面上の大きさは 2〜12px に制限。
  螺旋の内側ほど少し大きく明るい。星団ごとに色み（意味は持たせない）。
- 星団の下に星雲（放射状グラデーションの板、`InstancedMesh`）を敷く。
- カメラは左ドラッグで移動、ホイールで拡大縮小、右ドラッグで傾きのみ変更する。
  `MapControls` の自由回転は無効のまま。初期傾き 40 度、右ドラッグの範囲は 0〜60 度。
- キー操作（`SpaceView.applyKeys`）：W・A・S・D で移動（斜めは正規化）、Space で縮小、Shift で拡大。
  速さはカメラ距離に比例（1 秒でカメラ距離の 0.8 倍、ズームは 1 秒で e^1.1 倍）。目標の速さへ指数的に近づけて
  動き出しと止まりをなめらかにする。判定は `event.code`（配列によらず物理位置）。入力欄にフォーカスがあると無効、
  `blur` と `visibilitychange` で押したままの状態を解除、Space は `preventDefault`。「/」で検索欄（`main.ts`）。
  Ctrl は使わない（Windows の Ctrl+W はページ側で止められない）。
- 星団名は、どの拡大率でもクリックで星団の中心へ約 0.6 秒で移る。遠距離なら中距離（全体が収まる距離の 0.85 倍）
  まで寄り、中・近距離なら距離を保つ。星団名はカーソルが指の形になり、ホバーで下線が出る。
- 星座を描いている・選んでいる・編集しているときは、星座の星を 1.45 倍の大きさ・明るめにし、小さな輪を付ける
  （編集中は太く明るい輪、他の星は暗く小さくして差をはっきりさせる）。星座の星のタイトルは拡大率に関係なく
  最優先で出し、それ以外のタイトル（星団名を含む）は不透明度 30% にする。
- 星座へ寄せるときは、検索欄・画面下の星座一覧と操作・左上のパネルを除いた領域の 80% に収める
  （`SpaceView.safeRect`）。パネルは、上を削るか左を削るか、広く残る方を選ぶ。カメラを仮に動かして投影し、
  位置と距離を 8 回詰める。
  `setTopDown(true)` で約 0.6 秒で真上。初期位置は外接矩形の四隅を実際に投影して、
  地図全体が画面の約 80% に収まるまで詰める。
- **タイトルは星団中心より右側の星なら右横、左側なら左横に 8px 離して置く。**
  左右は空き具合で切り替えない。他のタイトルと重なれば間引き、左端に星団色の小さな点を付ける。
  隣の星団の円に入るタイトルも間引く。
  重なりを禁じるのは**タイトル同士だけ**で、星の上に重なるのは許し、半透明の暗い下地で読ませる。
  中距離は全角 18 文字で省略（マウスを乗せると全文）、近距離は全文。同時表示は 60 件まで。
- 遠距離では星団名を星雲の中心に重ね、中距離以降は円の上端の少し上に置く。
- 遠距離の星団名はクリックで星団中心へ拡大する。距離は星団の半径が画面に収まるよう決める。
- 表示判断は、カメラが止まり、かつ星が動いていない（`StarField.isSettling` が false）状態が
  約 150ms 続いてから行う。検索の引き寄せ中に判断すると、軌道に着いたときの位置と合わない。
- 表示判断と位置更新を分ける。`src/render/scene.ts` がカメラ停止後約 150ms と段階変更時に
  `LabelLayer.render()` を呼び、毎フレーム `LabelLayer.updatePositions()` を描画直前に呼ぶ。
  幅・高さは判断時に測って保持し、毎フレームの DOM レイアウト読み取りは行わない。
  幅はページの font-family と CSS の字間で測る。左側のタイトルは右端を固定し、ホバーの全文は左へ伸ばす。
- 分野語の大分類は `src/embed/topic-categories.ts` に全語の対応を置く。星団名の分野語と
  タイトル中の語は大分類だけを数える。既存の配置を読み出す際も名前だけ再判定し、座標は保存値を維持する。

### 保存と更新（レビュー後の修正で決めたこと）

- **IndexedDB はデータ源ごとに別の DB**（`bukusupe-chrome` / `bukusupe-sample`）。`main` が
  `loadBookmarks()` の直後、最初に DB を開く前に `useDataSource(kind)` で決める。開いた後は変えられない。
- **平均ベクトルは `{ source, vector }` で保存する。** 読み出したデータ源と違えば取り直し、
  そのときは古い平均で作った保存済みの配置も使わない。
- **ブックマークの更新中にデータ源が変わったら（サンプル⇄実ブックマーク）、`location.reload()` する。**
  黙って差し替えると DB と平均が混ざる。
- **ブックマークの更新と「再配置」は `enqueue()` で 1 本の鎖に並べる。** まだ始まっていない更新が
  鎖にあれば足さない（始まった時点で最新のブックマークを読むため）。
- **星の動かし手は常に一つ。** 配置が変わったときの移動（0.9 秒）はアニメーションが動かし、ばねの状態を
  同じ位置に合わせる。検索の引き寄せと戻りはばねが動かす。ばねの目標は、検索中でなければ星の配置座標。
  検索が始まったら移動の途中でもばねへ引き継ぐ。

### 見た目の決まり（星図のパレットと書体）

方向性は「昔の星図のような、静かで上品な美しさ」。変更前の画面は `docs/screens/before/` にある。

- **色は 3 系統だけ**：藍（夜・星雲）、白〜淡いクリーム（星・文字）、金（`#d8b878` 前後）。
  - 星団ごとの色相の塗り分けはやめた。星の色は id から決まるごく僅かな色温度の揺らぎだけ（`starColor`）。
    星団は、星団どうしの空き・星雲の明度（`nebulaColor`）・星雲の形（楕円の縦横比と向き、輪郭のゆるい波打ち。
    `nebula.ts`）・星団名で見分ける。**色相は戻さない。**
  - **金は「人が名付けたもの」専用**：自分で結んだ星座の線・輪・名前、選んでいる星座の下線、星座の操作ボタン。
    検索・星団・画面の部品には使わない。
  - **M5 のフォルダの自動星座（`source: "folder"`）は、金ではなく淡い銀色（`#c9ced8` 前後）で描く前提。**
    自分で名付けた星座（金）と、既存のフォルダから作った星座（銀）を色で見分けられるようにする。
  - ブラックホールの青は、案 4（観測円）でまとめて見直す予定。今は残している。
- **書体**：名前（星団名・星座名・パネルの題）は明朝、記録（ブックマークのタイトル・画面の部品）はゴシック。
  CSS 変数 `--font-name`（`"Hiragino Mincho ProN", "Yu Mincho", "YuMincho", serif`）と `--font-text`。
  ラベルの幅は、`labels.ts` が種類ごとにこの変数の書体と CSS の字間（星団名 0.28em、タイトル 0.02em）で測る。
  Web フォントは使わない（外部から取るのはモデルの重みだけ）。
- 星団名の大きさは件数に応じて 13〜17px。タイトルは黒い下地の箱をやめ、何重かの暗い光輪（text-shadow）で読ませる。
  先頭は星への 7px の引き出し線（左側のタイトルは右端に付く）。
- 画面の部品：検索欄は細い暖灰色の枠。左上のパネルは準備ができたら ⓘ に畳む（使う人が開閉した後は勝手に畳まない）。
  パネルの中に操作の全文（W・A・S・D、Space・Shift、/、Esc、↑↓、Enter、Ctrl+Enter、クリック）。
  画面下の操作の説明は短くし、最初の約 10 秒で消える。星座の一覧は枠のない明朝の文字の並びで、
  選んでいる星座に金の下線、その横に「名前を変える／削除」の小さな文字リンク。周辺減光（`#vignette`）を重ねる。

### 守るべき制約（破ると審査に落ちる）

1. プログラムを外部から読み込まない。取ってよいのはモデルの重みだけ。
2. ブックマークの内容をブラウザの外に送らない。
3. `chrome.bookmarks` は読み取り系だけ。`remove` / `update` / `create` / `move` を書かない。

### 守るべきルールの全文と補足（2026-09-28 までの `CLAUDE.md` から移した。要約は `CLAUDE.md`）

1. **プログラムを外部から読み込まない。** 外部から取得してよいのはモデルの重み（データ）だけ。
   スクリプト・WASM は必ず同梱する（CDN 参照を書かない）。
   - transformers.js は**既定で ONNX Runtime の `.mjs` / `.wasm` を jsDelivr から読む**。
     埋め込みを使う入口では必ず `configureOrt()`（`src/embed/ort-env.ts`）を先に呼ぶ。
   - モデルの重みの Cache Storage は `env.cacheKey = "bukusupe-model"`（Web のデモの origin を他のページと共有するため）。
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
   ブラックホール＝検索、星座＝自分で選んで結んだ星（メンバーは保存した時点で固定）、新星＝保存の後に加わった、検索語に合う候補）は常に一貫させる。
   色は藍（夜）・白〜淡いクリーム（星と文字）・金（人が名付けたもの＝自分で結んだ星座）の 3 系統に限る。
   星団を色相で塗り分けない。フォルダの自動星座（M5）は金ではなく淡い銀色。書体は名前が明朝、記録がゴシック
   （詳しくは `docs/DESIGN.md`）。
   - 星座のメンバーは保存した時点で固定し、呼び出しで検索し直さない（SPEC 9 章、2026-09-28）。検索から作った星座は検索語を記録として持ち、
     保存の後に加わって検索語に合うブックマークを「新星」（淡い白の輪、金は使わない）として示し、「加える」「見送る」を選ばせる。
     保存データは形の版 2（`members`・`dismissed`・`savedAt`）。旧形式（`pinned` / `excluded` / `lastMembers`）は読み込むときに、
     呼び出したときの形のまま移す。Web 検索の結果の取り込みは見送り。
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

---

## 3. 試して失敗したこと

- **ヘッドレス Chrome の `--load-extension` は効かない**（Chrome 153）。`--enable-unsafe-extension-debugging`
  を足しても拡張機能は入らない。CDP を**パイプ**で繋ぎ `Extensions.loadUnpacked` を呼ぶ必要がある。
  `scripts/check-extension.mjs` がその実装。`--remote-debugging-port` ではなく `--remote-debugging-pipe`。
- **Worker の通信はページの CDP セッションに出てこない。** `Target.setAutoAttach` で
  Worker にも繋がないと、ONNX Runtime や Hugging Face への要求を取りこぼす。
- `Runtime.evaluate` に `await` 付きの式をそのまま渡すと `undefined` が返る。
  `(async () => …)()` で包み、`awaitPromise: true` を付ける。
- 自動確認が HUD の**文言**を待っていたため、文言を変えた瞬間に 300 秒待ちで止まった。
  いまは `document.body.dataset.phase`（`loading` / `model` / `embed` / `layout` / `ready` / `error`）を見ている。
  **HUD の文言を変えても壊れないので、この属性は消さないこと。**
- 中距離のタイトルが全部消えた。原因は「星の上に重ねない」規則で、星団の中心付近は星が密なため
  ラベルの帯が必ずどれかの星に当たる。当たり判定を 7px → 4px にしても変わらず、
  最終的に「星の上は許して下地を敷く」に変えた。
- 初期カメラを `cos(傾き)` の近似で合わせると、手前側が画面からはみ出す。
  四隅を実際に投影して詰める方式に変えた。
- M3 で標準化した汎用度の負値をそのまま引くと、低汎用度の Kubernetes が
  9 検索中 8 回の上位 5 件に現れた。負値は 0 に止める。
- M3 の確認で、`simulateAdd()` 後の benchmark が追加後の配置を保存し、
  `restore()` で 157 件へ戻っていた。追加前を保存するよう直した。
- M4 の自動確認で `Runtime.evaluate` の式に直接 `await` を書いたため、追加ブックマークの
  検証が実行されず `undefined` になった。非同期 IIFE に包んで直した。
- **座標の確認が保存データどうしの比較だけだったため、H1（表示位置のずれ）を見逃した。**
  さらにスクリーンショットは `benchmark()` → `restore()` の後に撮っていて、id が入れ替わる都合で
  たまたま正しく写っていた。表示位置（`starPosition`）と配置座標を直接比べる確認を足した。
- **Chrome のデータ源の経路を一度も通していなかったため、H2 を見逃した。** 新しいプロファイルでは
  ブックマークが空でサンプルになる。確認スクリプト側で `chrome.bookmarks.create` / `remove` を使って通す
  （拡張機能のコードは読み取り専用のまま）。
- 「描画とラベル位置更新の回数が一致」は、両方の数え上げが同じコマで無条件に増えるので必ず通っていた。
  「順序を変えても同じ辺」は、`pointsFor` と最小全域木が id で並べ直すので順序が効いていなかった。
  どちらも意味のある確認に置き換えた。
- **check:ext が再読み込みの直後に固まることがあった（7 回中 4 回、いつも同じ箇所）。** ブラウザ本体だけが
  CPU 100% になり、ページ側への `Runtime.evaluate` が返らない。`sample` で主スレッドを採ると、macOS の
  キー入力の振り分け（AppKit の `routeKeyEquivalent`）の中を回っていた。原因は、確認スクリプトが
  CDP の `Input.dispatchKeyEvent` で送っていた合成キー入力。キー操作の確認はページ内で `KeyboardEvent` を
  発行する形に替えた（アプリが見ているのは window の keydown / keyup と `event.code` なので意味は同じ）。
  あわせて、CDP の命令が 60 秒応答しないときは無限に待たず失敗として止まるようにした。
- 書体を変えてタイトルの位置が動いた結果、前の確認で置いたままのマウスの下に検索のタイトルが現れ、ホバー扱いで
  線が 1 本増えて「全体線は選択中の星だけ」が落ちた。検索の確認の前に、マウスを何も無い隅へ退避させる。
- ヘッドレスのソフトウェア描画では、1 秒あたりのコマ数の計測が実行ごとに数コマ揺れる（同じコードで 53〜61）。
  「計算中も画面が動いている」は 33〜61 と特に揺れる。しきい値に近い値が出たら、まず再実行して確かめる。

---

## 4. 動かし方

```bash
npm install
npm run dev        # http://localhost:5173 で画面を確認（サンプルデータ）
npm run build      # 配布用のビルドを dist/ に生成（版の番号がずれていると失敗する）
npm run build:debug  # 確認用のビルドを dist-debug/ に生成（check:ext・bench・sample:precompute が使う）
npm run package    # 配布用のビルドから、ストアに上げる zip を release/ に作る
npm run typecheck  # tsc --noEmit
npm run build:web  # Web のデモ（サンプルだけで動く版）を dist-web/ に作る
npm run check:ext    # 通しの自動確認（dist/ の一致 → 初回起動 → 拡張機能 → 飛行 → 止まる描画 → 今日の固定 → 安全性 → Web のデモ → キャッシュの名前 → 星座 → 選択モード → 画面の言語。35 分ほど）
npm run check:flight # 飛行モードの確認だけ（2〜3 分）
npm run check:web    # Web のデモの確認だけ
npm run check:i18n   # 辞書のそろい・辞書を通さない日本語が無いこと（ブラウザを使わない。数秒）
npm run check:language  # 画面の言語（自動・切り替え・保持・英語と日本語の画面のはみ出しと重なり。5 分ほど）
npm run sample:precompute  # サンプル・入力文・配置の計算・モデルを変えたら、Web のデモ用の計算済みを作り直す
npm run bench        # 時間とメモリの測定（2〜3 時間。--only=run1 / run2 / <項目>）。npm run bench:report で報告書だけ作り直す
npm run icons      # アイコン PNG を作り直す
```

拡張機能としての確認：`npm run build`（確認用の窓口が要るなら `npm run build:debug` と `dist-debug/`）→ `chrome://extensions` → デベロッパーモード ON →
「パッケージ化されていない拡張機能を読み込む」で `dist/` を選択 → ツールバーのアイコンを押す。

データ源は自動判定する（`chrome.bookmarks` に http(s) のブックマークがあれば Chrome、なければサンプル）。
URL に `?sample=1` を付けると拡張機能内でも強制的にサンプルデータになる（ⓘ のパネルの「サンプルの宇宙で試す」でも切り替わる）。
`?demo=1` で左上のパネルを隠す。確認用の窓口 `__bukusupe` は **確認用のビルド（dist-debug/）で `?debug=1` のときだけ**公開する
（確認スクリプトは `?debug=1` で開く）。確認用・測定用のコードは `if (__DEBUG__) { … }` で囲み、配布用のビルドでは丸ごと消す
（クラスのメソッドは消えないので、`viewDebug(view)` のような関数に分ける）。`check-release` が配布用に残っていないことを確かめる。
使っている途中でデータ源が変わったら（サンプル⇄実ブックマーク）、ページを読み込み直す。


- `predev` / `prebuild` が `scripts/copy-ort.mjs` を走らせ、`public/ort/` に ONNX Runtime を同梱する。
  `public/ort/` は git に入れない（27MB）。
- 拡張機能として：`npm run build` → `chrome://extensions` → デベロッパーモード →
  「パッケージ化されていない拡張機能を読み込む」で `dist/` → ツールバーのアイコン。
- `?sample=1` でサンプルデータに強制切り替え、`?demo=1` で左上のパネルを隠す。
- `?debug=1` を付けて開くと、画面のコンソールから `__bukusupe` が触れる（`search` / `layout` / `computeAgain` /
  `simulateAdd` / `benchmark` / `restore` / `setZoomTier` / `setTopDown` / `relayout` / `frames`）。

### `check:ext` が見ている項目

`check:ext` は、はじめに確認用のビルド（`dist-debug/`・`dist-web-debug/`）を作ってから、次の順に動かす：`check-dist`（コミットされる `dist/` が
配布用のビルドと一致）→ `check-release`（配布用の中身・版・zip）→ `check-store`（掲載文・申告・画像）→ `check-fresh`（配布用の `dist/` をまっさらなプロファイルで。権限なしで意味検索、
`?debug=1` でも窓口が無い）→ `check-extension` → `check-flight` → `check-flight-controls` → `check-idle` → `check-today` → `check-safety` → `check-web` → `check-cache` → `check-constellation` → `check-selection` → `check-model-consent` → `check-label-open` → `check-i18n`（辞書とソース）→ `check-language`（画面の言語）
（`check-extension` から後は確認用のビルド）。確認の Chrome のブラウザの言語は日本語（`harness.mjs` の `lang`。英語の画面は `check-language`・`check-web` の 7・`store-assets` が開く）。
`check-store` は、掲載文（英語が主・日本語）と `_locales` の一致、2 つの申告の権限の表、インストール時の警告、画像 13 枚（スクリーンショットは `en/`・`ja/`）を見る。
以下の番号は `check-extension` の項目。

1. 拡張機能として読み込め、専用ページが開く
2. 埋め込みが全件終わって星が並ぶ（`body.dataset.phase === "ready"`）
3. サンプル 156 件が読めている
4. `bookmarks` 権限がある
5. 計算中も画面が動いている（30 コマ/秒以上）
6. ONNX Runtime を拡張機能内から読んでいる（CDN から取っていない）
7. 外部への通信がモデルの重みだけ（`huggingface.co` / `hf.co` 以外に出ない）
8. 違う検索語で違う星が上位に来る
9. 同じデータなら毎回まったく同じ座標になる（2 回計算して完全一致）
10. 同じ星団の中で星どうしが重ならない（最小距離が間隔の 0.8 倍以上）
11. 星団どうしの円が重ならない
12. 一つのフォルダの星が複数の星団に散っている
13. 汎用的なブックマーク（GitHub・Google・Gmail・YouTube・X・Amazon・Notion）が代表に来ていない
14. 検索の上位が複数の星団にまたがる
15. ブックマークが 1 件増えても既存の星の座標が変わらない
16. 20 / 150 / 2000 件で配置が終わり、2000 件でも 60 コマ/秒を保つ
17. 再読み込みで埋め込みが揃っていて、外部から取り直さない
18. エラー・警告が出ない（swiftshader の性能警告だけ除く）
    - 拡張機能のコード（dist/ の JS）に、ブックマークを書き換える呼び出しがない
19. 音楽フォルダを中心とする星団が「音楽」と名付く（旧名「DTM」）
20. 初期画面のタイトルが隣の星団の投影円に入らない（156 件で表示 16 件、侵入 0 件）
21. 9 検索の上位 5 件・期待分野件数・4 回以上繰り返す星を `search-results.json` に記録する
22. 宇宙検索の上位 10 件に YouTube・X・Amazon がない、タイトル完全一致が最上位
23. 文字一致 16ms 以内、意味検索は埋め込み込みで 300ms 以内、検索中も 60 コマ/秒
24. 最大 21 件が 3 / 6 / 12 に並ぶ。検索中は引き寄せた星だけが動き、他の星は配置座標のまま表示される
    - 準備完了直後・「再配置」の後・再読み込みの後に、**全星の表示位置が配置座標と 0.01 未満で一致する**
25. フォーカスで真上、上下キーで選択、クリックでカード、Enter で新しいタブ、Esc で復帰
26. `docs/screens/search.png` に検索画面を保存する
27. 星団の事前確率を加えても 9 語の期待分野件数がどれも悪化しない
28. 引き寄せ数が 1 位のスコアの 85% 以上で変わり、常に 21 件にはならない
29. 常時表示は 40px 以下で先へ消える尾だけ。元位置までの線は選択中・ホバー中だけ
30. 内側ほど星とタイトルが大きく明るい。検索タイトルは外向きに揃い、重ならず、外側から間引く
31. 外側タイトルはホバーで明るくなる
32. 通常画面と検索中のドラッグで、ラベルが星と同じだけ動く（星からのずれの変化 0.5px 以内、星は 20px 以上移動）
33. ドラッグ中のラベル位置更新は毎回 2ms 以内
34. ドラッグ中、Chrome の `LayoutCount` とラベル再判定回数が増えない
35. 通常画面と検索中の星タイトルをクリックすると、その星のカードが開く
36. 右ドラッグで傾きが変わり（上限 60 度）、真上への切り替え後にその傾きへ戻る
37. 近・中・遠のどれでも、星団名のクリックでその星団の中心へ移る（遠なら中距離まで寄る、カーソルは指の形）
38. Ctrl+Enter で上位最大 12 件の編集に入り、星の加除が pinned / excluded に残る
39. 保存演出で線を 1 本ずつ描き、後から星座名を表示し、60 コマ/秒を保つ
40. 最小全域木が星の数−1 本、交差なし。描いた線が、別の方法（クラスカル法）で求めた最小全域木と一致する
41. 保存後の線は 15%、呼び出した線は 85%。再選択で解除できる
42. 再読み込み後も名前・メンバー・辺が残る
43. 呼び出しで excluded を除き pinned を残し、新たな検索一致ブックマークも加える
44. 名前変更と星座だけの削除ができる
46. **Chrome のデータ源**（確認スクリプトが使い捨てのプロファイルにブックマークを作る）
    - 実ブックマークへ切り替わると、差し替えずにページを読み込み直す
    - 平均ベクトルが実ブックマークから作り直され、サンプルの星座が混ざらない
    - 本物の削除通知（`chrome.bookmarks.remove`）で、星座のメンバーと線が結び直される
    - 続けてブックマークが変わっても、配置に重複・欠落がない
    - サンプルに戻すと、サンプルの星座のメンバーと平均ベクトルがそのまま残る
47. 12・15・19 件でも星団が 3 個以上ある
48. 真上のまま検索語を 4 回打ち替えても、検索中のタイトルが内側に出たり重なったりしない
49. W を押し続けるとカメラが上へ移動し、入力欄にフォーカスがあるときは動かない。Space で縮小、Shift で拡大、「/」で検索欄
50. 星座を選ぶと、すべての星が画面の部品を除いた領域に収まる。星座の星のタイトルが優先され、他は暗くなる
51. 「わたしの宇宙」を選んだ画面を `docs/screens/constellation-selected.png` に保存する
52. Space でページがスクロールしない（keydown の既定の動作を止めている）
53. 星座を選んだまま検索すると、星座の強調が解かれて検索の軌道が前面に出る（線 ≤ 15%、星座の星の明るさ < 0.5、
    星座のタイトル 0 件、名前は非表示、真上）。`docs/screens/constellation-search.png` を保存する
54. 検索を消すと、元の星座を選んだ状態（線 85%、強調、タイトル、名前、カメラ位置）に戻る
55. 画面下の一覧に「名前を変える」「削除」が常時は出ず、選んでいる星座の横の「…」から開ける
56. 2000 件の中距離で表示ラベルが 6〜32 件に収まり、表示星の平均の新しさが全体より 0.15 以上高い
57. 近距離で明るい星のタイトルが暗い星より濃く、大きい（独立に算出した新しさの上下 4 分の 1 で比較）
45. `constellation-edit.png`、`constellation-drawing.png`、`constellation-saved.png` を保存する

そのうえで `docs/screens/` に initial・far・mid・near のスクリーンショットと
`clusters.json`（星団の名前・件数・フォルダ内訳）を書き出す。

**新しい機能を足したら、この一覧に確認項目を足すこと。**

---

## 5. 主要ファイル

| ファイル | 役割 |
|---|---|
| `src/main.ts` | 画面の入口。読み込み → 埋め込み → 配置 → 表示の流れと、`__bukusupe` の窓口 |
| `src/background.ts` | service worker。アイコン → 専用タブだけ |
| `src/bookmarks/` | ブックマークの取得。`chrome-source`（読み取りのみ）と `sample-source`（150+6 件） |
| `src/embed/ort-env.ts` | **MV3 で transformers.js を動かすための設定。触る前に上の 2 章を読むこと** |
| `src/embed/embed.worker.ts` | 埋め込みの Worker（`feature-extraction`、mean pooling、normalize） |
| `src/embed/embedder.ts` | `Embedder` インターフェースと Worker 越しの実装（差し替え可能にしてある） |
| `src/embed/ensure.ts` | 足りない分だけ埋め込む。進み具合を流す |
| `src/embed/text.ts` | 入力文の組み立てとハッシュ |
| `src/embed/domain-hints.ts` | ドメイン → 分野語の辞書（星団の名前にも使う） |
| `src/embed/topic-categories.ts` | 分野語から星団名に使う大分類への対応。大分類は id と日本語・英語の名前を持つ |
| `src/store/db.ts` | IndexedDB（`embeddings` / `meta` / `constellations`）。DB はデータ源ごと（`bukusupe-chrome` / `bukusupe-sample`）。`meta` に `mean-vector`（データ源つき） / `generality` / `layout` |
| `src/constellation/index.ts` | 星座の保存形式、メンバーの集合、決定的なプリム法 |
| `src/layout/index.ts` | 配置の本体。`computeLayout` / `addStar` / `dropMissing` と各種の係数 |
| `src/layout/kmeans.ts` `pca.ts` `pack.ts` `spiral.ts` `refine.ts` | 配置の部品。すべて決定的 |
| `src/layout/vector.ts` | 平均引き・正規化・汎用度・標準化 |
| `src/layout/names.ts` | 星団の名前（言語に依らない形で作る。表示は `clusterLabel`） |
| `src/search/index.ts` | 文字一致、平均を引いた意味検索、汎用度補正、z 値での正規化と順位 |
| `src/layout/provisional.ts` | 埋め込みが揃うまでの仮の配置（フォルダごとの螺旋） |
| `src/render/scene.ts` | three.js のシーン、カメラ、拡大率の段階、ラベルの組み立て |
| `src/render/constellations.ts` | 星座の線、選択した星の輪、保存時の線の演出 |
| `src/render/stars.ts` | 星の描画（`Points` 1 つ）と位置の移り変わり |
| `src/render/nebula.ts` | 星雲のもや |
| `src/render/present.ts` | 配置 → 描画用の形への変換 |
| `src/ui/hud.ts` | 左上のパネル（中身は `#hud-body`、言語の選択欄はその外）と `body.dataset.phase` |
| `src/i18n/index.ts` | 画面の言語（設定の保存、自動の判定、`t()`、`applyStaticText`、`setRichText`、言語の選択欄、`onLangChange`） |
| `src/i18n/ja.ts` `en.ts` | 画面の文言の辞書（項目の名前をそろえる） |
| `src/i18n/cluster.ts` | 保存した星団名（`{dev}+{news}` など）を画面の言語の名前にする `clusterLabel` |
| `public/_locales/` | 拡張機能の名前・説明・ボタンの説明（en・ja。`default_locale` は en） |
| `src/ui/labels.ts` | タイトルの重ね表示（配置規則と間引き、種類ごとの書体での幅の測定） |
| `docs/DESIGN.md` | 見た目の方向性、配色と書体の規則、8 つの案と状態 |
| `scripts/check-extension.mjs` | 自動確認（CDP パイプ） |
| `scripts/copy-ort.mjs` | ONNX Runtime の同梱 |
| `scripts/gen-icons.mjs` | アイコン PNG の生成（依存なし） |

### 文書の一覧（2026-09-28 までの `CLAUDE.md`「はじめに必ず読むもの」）

地図（平面）を見るだけでなく、星の間を飛ぶ「飛行モード」（SPEC 13 章）がある（3a 完了、3b は未着手）。

1. `docs/RELEASE.md` — **正式公開までの計画**（段階 1〜7 と、それぞれの完了条件）、版の番号の決まり、使う人の判断（「決めたこと」）。
   **今どの段階にいるかは、ここの「進み具合」と `docs/HANDOFF.md` の 0 章で確かめる。** 方針は「決めたこと」に従い、新しく判断が要るものは作る前に確認する。
2. `docs/SPEC.md` — 仕様の正典。**判断に迷ったら必ずこれを優先する。** 仕様が変わる作業は、SPEC を先に直してから作る。
3. `docs/HANDOFF.md` — **0 章に今の状態と残りのタスク**。これまでに決めた設計判断とその理由、試して失敗したこと、
   自動確認の項目一覧、主要ファイルの役割。6 章はハッカソン期間の作業記録（旧 0 章）。
4. `docs/PLAN.md` — ハッカソンまでの M0〜M6 の段階と完了条件（記録。飛行中の検索 3b はここにある）。
5. `docs/DESIGN.md` — 見た目の方向性（昔の星図のような静かで上品な美しさ）、配色と書体の規則、8 つの案と状態。
   **見た目に触れる前に必ず読む。**

**各段階を終えたら `docs/HANDOFF.md` を更新すること**（到達点、新しく決めたこと、

### 技術構成（詳しい表。要点は `CLAUDE.md`）

| 項目 | 選択 |
|---|---|
| 拡張機能 | Manifest V3（`public/manifest.json` を手書き。crxjs 等のプラグインは使わない） |
| 言語・ビルド | TypeScript + Vite（`index.html` と `src/background.ts` の 2 エントリ） |
| 描画 | three.js。`MapControls` は自由回転を無効にし、左ドラッグで移動・ホイールで拡大縮小。右ドラッグの上下で傾きだけを変える（真上から 0〜60 度、地図の方角は回さない）。キー操作は W・A・S・D で移動、Space で縮小、Shift で拡大、「/」で検索欄、C で選択モード（星を選んで星座にする。Shift＋ドラッグで範囲選択、その間は Shift で拡大しない）、F で飛行モード（入力中は無効、Ctrl は使わない）。飛行中は宇宙船が常に前進し、W・S（↑↓）で機首の上下、A・D（←→）で左右、Space で加速・Shift で減速、マウスはドラッグ中だけ機首の向き。向きは四元数 |
| 埋め込み | `@huggingface/transformers` v4 + `Xenova/multilingual-e5-small`（`dtype: "q8"`＝`onnx/model_quantized.onnx`）、WASM バックエンド、Web Worker |
| 保存 | IndexedDB（`embeddings` / `meta` / `constellations`）。DB はデータ源ごとに分ける（`bukusupe-chrome` / `bukusupe-sample`） |
| 権限 | `bookmarks`, `unlimitedStorage`, `favicon`（飛行モードの窓のアイコン。インストール時の警告が 1 つ増える）。host_permissions は無し（Hugging Face が CORS を許すので、重みは権限なしで取れる）。確認用のビルドだけ `storage`（確認用の注入） |

CSP は `manifest.json` の `content_security_policy.extension_pages` に
`script-src 'self' 'wasm-unsafe-eval'; object-src 'self'` を指定している。**外してはいけない。**

### ディレクトリ構成

```
.
├── CLAUDE.md / AGENTS.md    # 同じ内容（エージェント向けの作業規則）
├── README.md                # 使う人向け（英語が主。導入手順、使い方、権限、プライバシー）。日本語は README.ja.md
├── THIRD_PARTY_NOTICES      # 第三者のライセンス（scripts/gen-notices.mjs で作る）。licenses/ に ONNX Runtime の表示
├── .github/workflows/pages.yml  # Web のデモを GitHub Pages に公開
├── docs/
│   ├── SPEC.md              # 仕様書（正典）
│   ├── PLAN.md              # ハッカソンまでの実装計画・完了条件（M0〜M6）
│   ├── RELEASE.md           # 正式公開までの計画・版の番号の決まり・決めたこと
│   ├── store/               # ストアの掲載文（listing.en.md が主、listing.ja.md）、プライバシーの申告の案（privacy-practices.md・.en.md）、掲載用の画像（assets/。スクリーンショットは en/・ja/）
│   ├── SECURITY.md          # 安全性（表示と遷移の経路、保存データの確かめ、設定、依存関係）
│   ├── HANDOFF.md           # 引き継ぎ資料（0 章に今の状態と残りのタスク、6 章にハッカソン期間の記録）
│   ├── DESIGN.md            # 見た目の規則と案
│   ├── history/             # 終えた段階の記録
│   └── screens/             # check:ext が保存する画面と結果。before/ はデザイン見直し前、i18n/ は英語と日本語の主な画面
├── index.html               # 拡張機能の専用タブ兼 dev サーバーの画面
├── privacy-policy.html      # プライバシーポリシー（英語、唯一の本文）。Web のデモと一緒に GitHub Pages の /bukusupe/privacy-policy.html に出す
├── privacy/index.html       # 旧 URL（/bukusupe/privacy/）から privacy-policy.html への転送だけ（本文は置かない）
├── public/
│   ├── manifest.json        # MV3 マニフェスト（そのまま dist/ にコピーされる。名前と説明は __MSG_…__）
│   ├── _locales/            # 拡張機能の名前と説明（en・ja）
│   ├── icons/               # 16 / 32 / 48 / 128 px（npm run icons で作る。しおりの形の星座）
│   └── ort/                 # ONNX Runtime の .mjs / .wasm（生成物。git には入れない）
├── scripts/
│   ├── gen-icons.mjs        # アイコン PNG の生成（依存なし）
│   ├── copy-ort.mjs         # ONNX Runtime の補助ファイルを public/ort/ に同梱
│   ├── check-extension.mjs  # dist/ を Chrome に読み込んで動作確認（CDP）
│   ├── check-flight.mjs     # 飛行モードの確認
│   ├── check-flight-controls.mjs  # 飛行モードの操作（常に前進・W/S と矢印で機首・宙返り・加速と減速・ドラッグ・ロールの水平戻し・宇宙の果て）
│   ├── check-dist.mjs       # コミットされる dist/ が今のソースのビルドと一致するか
│   ├── check-release.mjs    # 配布用のビルドに確認用の仕組みが残っていない・版ずれと仮の問い合わせ先で失敗する
│   ├── check-cache.mjs      # モデルのキャッシュの名前（前の版の壊れたキャッシュがあっても動く）
│   ├── check-constellation.mjs  # 星座のメンバーの固定・新星（加える／見送る）・旧形式の移行・検索語の無い星座
│   ├── check-selection.mjs  # 選択モード（出入り・選ぶ・Shift＋ドラッグ・移動しても残る・ダブルクリックで開いて「戻る」で同じ選択・新しい星座／加える／外す・60 コマ）
│   ├── package.mjs          # ストアに上げる zip を作る（npm run package）
│   ├── check-store.mjs      # 掲載文の字数と manifest の一致・権限の説明と manifest・インストール時の警告・画像の大きさ
│   ├── store-assets.mjs     # 掲載用の画像を撮り直す（npm run store:assets）
│   ├── check-fresh.mjs      # git の index の dist/ を、まっさらなプロファイルで初回起動
│   ├── check-web.mjs        # Web のデモ（dist-web/）の確認（PC とスマホ）
│   ├── check-idle.mjs       # 動きがあるときだけ描く（止まる・すぐ再開する・止まった画面が正しい）
│   ├── check-today.mjs      # 星の新しさの「今日」（サンプルは基準日に固定、自分のブックマークは実際の今日）
│   ├── check-safety.mjs     # 安全性（HTML として解釈しない・http(s) だけ開く・保存状態の確かめ・書字の向き・長いタイトル）
│   ├── check-i18n.mjs       # 辞書の項目のそろい・_locales・大分類の英語名・辞書を通さない日本語が無いこと
│   ├── check-language.mjs   # 画面の言語（自動・切り替え・保持・主な画面のはみ出しと重なり、docs/screens/i18n/）
│   ├── precompute-sample.mjs  # Web のデモに同梱する計算済みのサンプルを作る
│   ├── gen-notices.mjs      # THIRD_PARTY_NOTICES を作る
│   ├── bench/               # 時間とメモリの測定（npm run bench → docs/bench/results/、npm run bench:report → docs/BENCHMARK.md）
│   └── lib/                 # harness.mjs（確認スクリプトの共通の土台）、release.mjs（配布物に残ってはいけない名前・版・問い合わせ先）
├── src/
│   ├── main.ts              # 画面の入口（読み込み → 埋め込み → 配置 → 検索・星座）
│   ├── config.ts            # 問い合わせ先（SUPPORT_EMAIL と Issues の URL。仮の値に戻すと npm run package が失敗する）
│   ├── background.ts        # service worker（アイコン → 専用タブ）
│   ├── bookmarks/           # ブックマークの取得（Chrome / サンプルの 2 系統。読み取りのみ）
│   ├── embed/               # 埋め込み（Worker、入力文の組み立て、ドメイン辞書、大分類、ORT 設定）
│   ├── store/               # IndexedDB（データ源ごとの DB）
│   ├── layout/              # 配置（平均引き → k-means → 粒度そろえ → PCA → 押し広げ → 螺旋）、星団名
│   ├── search/              # 文字一致＋意味検索（平均引き、汎用度の補正、z 値での正規化）
│   ├── constellation/       # 星座の保存形式（形の版 2 と旧形式の移行）、新星の判定、決定的な最小全域木
│   ├── debug/               # 測定用の時間の記録（?debug=1 のときだけ使う）
│   ├── render/              # three.js の描画（星・星雲・ブラックホール・星座の線）
│   ├── ui/                  # HUD とラベルの重ね表示
│   ├── i18n/                # 画面の言語（辞書 en・ja、言語の設定、星団名の表示）
│   └── data/                # sample-bookmarks.json（156 件）、sample-precomputed.json（Web のデモ用の計算済み）
├── dist/                    # 配布用のビルド（拡張機能として読み込む・ストアの zip の元）。**リポジトリに含める**（審査員はビルドしない）
├── dist-debug/              # 確認用のビルド（?debug=1 の窓口・測定用の仕組みを含む。check:ext と bench が使う。git には入れない）
├── dist-web/                # Web のデモのビルド成果物（git には入れない。GitHub Actions が作って公開する）
├── dist-web-debug/          # Web のデモの確認用のビルド（check:web が使う。git には入れない）
└── release/                 # npm run package が作る zip（git には入れない）
```

---

## 6. ハッカソン期間の作業記録

`docs/history/` に移した：[〜2026-09-26（M6・飛行モード 3a など）](history/2026-09-26-hackathon-m6-flight.md)、
[2026-09-27（今日の固定・止まる描画・測定）](history/2026-09-27-hackathon-final.md)。
