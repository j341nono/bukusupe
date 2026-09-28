# 段階 2：ストア向けのビルド（2026-09-28）

> 旧 `docs/HANDOFF.md` 0 章から移した。詳しくは `docs/RELEASE.md` 段階 2 の「結果」。
> ファイル一覧は [README.md](README.md)。

### 段階 2 でしたこと（2026-09-28。詳しくは `docs/RELEASE.md` 段階 2 の「結果」）

- **`host_permissions` を外した**。Hugging Face は CORS を許すので、拡張機能の画面と Worker から権限なしで重みを取れる（転送先 `us.aws.cdn.hf.co` を含む）。
  インストール時の「多数のウェブサイト上にある自分のデータの読み取りと変更」の警告がなくなった。
- **配布用と確認用のビルドを分けた**。`npm run build` → `dist/` が配布用（ストアの zip の元。リポジトリに含める）、`npm run build:debug` →
  `dist-debug/` が確認用（`storage` 権限を足す。`check:ext`・`bench`・`sample:precompute` はこちら）。Web のデモも `build:web` / `build:web:debug`。
  - ビルドの定数 `__DEBUG__`（確認用だけ true）と `__WEB__`（Web のデモだけ true）を `vite.config.ts` の `define` で入れる（`src/debug/globals.d.ts`）。
    **確認用・測定用のコードは `if (__DEBUG__) { … }` で囲む。** クラスのメソッドはビルドで消えないので、`SpaceView` の測定用の操作は
    `viewDebug(view)`（`src/render/scene.ts`）、Worker のメモリは `requestWasmMemory(embedder)`（`src/embed/embedder.ts`）という関数に分けた。
  - `import.meta.env.MODE === "web"` の判定は `web-debug` で外れ、`startsWith("web")` にすると定数にならず、拡張機能に Web のデモ用の計算済みのサンプルが
    入ってしまった。ビルドの定数 `__WEB__` にした（`check-release` が `sample-precomputed` を見張る）。
- **版の番号**：`public/manifest.json` と `package.json` がずれていると、配布用のビルドが失敗する（`vite.config.ts` の `checkVersion`）。
- **`npm run package`**（`scripts/package.mjs`）：`dist/` から `release/bukusupe-X.Y.Z.zip`。問い合わせのメール（`src/config.ts` の `SUPPORT_EMAIL`）が
  仮の値だと失敗する。2026-09-28 に本物の値（`j341nono.dev [at] gmail.com`）にした。
- **モデルのキャッシュ**を `bukusupe-model` にした（`env.cacheKey`）。前の版の `transformers-cache` は拡張機能では消し、Web のデモでは残す。
- **ONNX Runtime Web**：正式版の `1.31.0` はまだ無い。開発版のまま（更新は使う人の判断）。
- 確認：`scripts/check-release.mjs`（新規、`check:ext` の 2 番目）、`check-fresh` の追加（権限なしで意味検索、`?debug=1` でも窓口が無い）、
  `scripts/check-cache.mjs`（新規、`check:ext` の最後。壊れた古いキャッシュがあっても動く）、`check-web` の保存領域の名前に Cache Storage を足した。

---
