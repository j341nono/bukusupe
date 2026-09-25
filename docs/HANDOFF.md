# 引き継ぎ（2026-09-26）

このファイルは、開発を引き継ぐエージェント・人のためのもの。
**まず `docs/SPEC.md`（仕様の正典）と `docs/PLAN.md`（段階と完了条件）を読むこと。**
各段階を終えたら、このファイルの「到達点」と「決めたこと」を更新すること。

---

## 1. 到達点

| 段階 | 状態 | 内容 |
|---|---|---|
| M0 | 完了 | MV3 の雛形、アイコン → 専用タブ、サンプル 156 件、three.js の表示 |
| M1 | 完了 | 埋め込み Worker（transformers.js）、IndexedDB への保存、進み具合の表示 |
| M2 | 完了 | 意味配置（平均引き → k-means → 粒度そろえ → PCA → 押し広げ → 螺旋）、星雲、ラベル、カメラ |
| M3 | **未着手** | 文字一致＋意味検索、ブラックホールへの引き寄せ、光の線、キーボード操作 |
| M4 | 未着手 | 星座（完成ラインはここ） |
| M5 / M6 | 未着手 | フォルダの自動星座・新星・検索候補 / 配布物と README |

### M2 で残した課題（M3 に入る前に判断が要るもの）

- 星団「DTM」の名前が狭い。代表 4 件のうち 2 件が分野語「DTM」を持ったため勝った。
  細かすぎる分野語を辞書から外すか、フォルダ名と同点なら広い方を選ぶかは未決。
- 星団の粒度の**分割**規則（件数が中央値の 2 倍超かつ締まりが中央値未満）は、
  サンプルでは一度も発動していない。**統合**（5 件未満）だけが効いている。
- 「料理」「お金・ニュース」など寄せ集めの星団が残る。SPEC どおりの `k = round(sqrt(N/2))` の結果。

### M3 に入るときに使えるもの

- `meta.generality`（IndexedDB）に「誰とでも似ている度合い」を保存済み。
  検索で YouTube・X・Amazon のような汎用ブックマークが上位に来るのを抑えるのに使う。
  実測：`search("宇宙を感じたい")` の上位 10 件に YouTube・X・Amazon が混ざる。
- `meta.mean-vector` に平均ベクトル。**検索語の埋め込みにも同じ平均を引く**こと。
- `view.setTopDown(true/false)` がカメラの傾き⇄真上（約 0.6 秒）。入力欄のフォーカスに繋ぐだけでよい。
- `__bukusupe.search(text, topK)` が意味検索の素の実装（星団名つきで返る）。

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
- **星団の名前**：①代表 4 件のうち 2 件以上が同じ分野語（ドメイン辞書＋タイトルに含まれる語）を
  持てばそれ → ②フォルダの多数決（1 位が半分以上ならそれ、半分未満で 2 位が 1 位の 6 割以上なら
  「1 位・2 位」、3 割以上なら 1 位） → ③分野語 → ④ドメイン → ⑤「無名の星団 N」。
  「あとで読む」「ブックマーク バー」などは候補から外す（`IGNORED_FOLDERS`）。
  同名が残ったら 2 番目に多い分野語を足して区別する。
- **粒度**：件数が中央値の 2 倍超かつ締まりが中央値未満の星団は k=2 で分割、
  5 件未満の星団は平均ベクトルが最も近い星団に統合（`src/layout/refine.ts`）。
- **毎回同じ座標になること**は譲れない。乱数は種固定（`LAYOUT_SEED`）、PCA は固定初期値＋
  符号の決め方も固定、同点はすべて id 順で割る。`check:ext` が 2 回計算して完全一致を見ている。
- 新しいブックマークは、平均ベクトルが最も近い星団の螺旋の次の位置に置く。**他の星は動かさない。**
  消えた星の位置は空けたままでよい。全体の計算し直しは「再配置」だけ。
- 星の位置には id から決まる ±25% のずれを足す（螺旋の目が揃いすぎて機械的に見えるため）。

### 描画とラベル

- 星は `Points` 1 つ（2000 件で 60 コマ/秒を確認）。画面上の大きさは 2〜12px に制限。
  螺旋の内側ほど少し大きく明るい。星団ごとに色み（意味は持たせない）。
- 星団の下に星雲（放射状グラデーションの板、`InstancedMesh`）を敷く。
- カメラは移動と拡大縮小のみ（`MapControls` の `enableRotate = false`）。静止時 40 度、
  `setTopDown(true)` で約 0.6 秒で真上。初期位置は外接矩形の四隅を実際に投影して、
  地図全体が画面の約 80% に収まるまで詰める。
- **タイトルは星の右横 8px に左揃え、縦は星の中心。右が塞がっていたら左横。**
  重なりを禁じるのは**タイトル同士だけ**で、星の上に重なるのは許し、半透明の暗い下地で読ませる。
  中距離は全角 18 文字で省略（マウスを乗せると全文）、近距離は全文。同時表示は 60 件まで。
- 遠距離では星団名を星雲の中心に重ね、中距離以降は円の上端の少し上に置く。

### 守るべき制約（破ると審査に落ちる）

1. プログラムを外部から読み込まない。取ってよいのはモデルの重みだけ。
2. ブックマークの内容をブラウザの外に送らない。
3. `chrome.bookmarks` は読み取り系だけ。`remove` / `update` / `create` / `move` を書かない。

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

---

## 4. 動かし方

```bash
npm install
npm run dev        # http://localhost:5173（サンプル 156 件）
npm run build      # tsc --noEmit && vite build → dist/
npm run typecheck
npm run check:ext  # dist/ を実際の Chrome に読み込んで通しで確認（数分かかる）
npm run icons      # アイコン PNG を作り直す
```

- `predev` / `prebuild` が `scripts/copy-ort.mjs` を走らせ、`public/ort/` に ONNX Runtime を同梱する。
  `public/ort/` は git に入れない（27MB）。
- 拡張機能として：`npm run build` → `chrome://extensions` → デベロッパーモード →
  「パッケージ化されていない拡張機能を読み込む」で `dist/` → ツールバーのアイコン。
- `?sample=1` でサンプルデータに強制切り替え、`?demo=1` で左上のパネルを隠す。
- 画面のコンソールから `__bukusupe` が触れる（`search` / `layout` / `computeAgain` /
  `simulateAdd` / `benchmark` / `restore` / `setZoomTier` / `setTopDown` / `relayout` / `frames`）。

### `check:ext` が見ている項目

1. 拡張機能として読み込め、専用ページが開く
2. 埋め込みが全件終わって星が並ぶ（`body.dataset.phase === "ready"`）
3. サンプル 156 件が読めている
4. `bookmarks` 権限がある
5. 計算中も画面が動いている（コマ数を実測）
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
| `src/store/db.ts` | IndexedDB（`embeddings` と `meta`）。`meta` に `mean-vector` / `generality` / `layout` |
| `src/layout/index.ts` | 配置の本体。`computeLayout` / `addStar` / `dropMissing` と各種の係数 |
| `src/layout/kmeans.ts` `pca.ts` `pack.ts` `spiral.ts` `refine.ts` | 配置の部品。すべて決定的 |
| `src/layout/vector.ts` | 平均引き・正規化・汎用度・標準化 |
| `src/layout/names.ts` | 星団の名前 |
| `src/layout/provisional.ts` | 埋め込みが揃うまでの仮の配置（フォルダごとの螺旋） |
| `src/render/scene.ts` | three.js のシーン、カメラ、拡大率の段階、ラベルの組み立て |
| `src/render/stars.ts` | 星の描画（`Points` 1 つ）と位置の移り変わり |
| `src/render/nebula.ts` | 星雲のもや |
| `src/render/present.ts` | 配置 → 描画用の形への変換 |
| `src/ui/hud.ts` | 左上のパネルと `body.dataset.phase` |
| `src/ui/labels.ts` | タイトルの重ね表示（配置規則と間引き） |
| `scripts/check-extension.mjs` | 自動確認（CDP パイプ） |
| `scripts/copy-ort.mjs` | ONNX Runtime の同梱 |
| `scripts/gen-icons.mjs` | アイコン PNG の生成（依存なし） |
