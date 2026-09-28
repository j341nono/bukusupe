# 段階 5 の 2b：選択モード（2026-09-28）

> 旧 `docs/HANDOFF.md` 0 章から移した。詳しくは `docs/SPEC.md` 9 章「作る流れ（選択モード）」と `docs/RELEASE.md` 段階 5 の 2b。
> ファイル一覧は [README.md](README.md)。

### 選択モード（2026-09-28、使う人の依頼で追加。`docs/RELEASE.md` 段階 5 の 2b）

星座を、検索とは関係なく地図のどこからでも作れるようにした（`docs/SPEC.md` 9 章「作る流れ（選択モード）」）。
- 状態は `main.ts` の `selection`（選んだ星の id の集合。null なら選択モードではない）。入る・抜けるは `setSelecting`、表示の更新は `refreshSelection`。
  前の「編集状態」（`editing`・pinned / excluded）は無くし、検索の「星座にする」は上位 12 を選んだ状態で選択モードに入る入口にした。
- 入口は右下の「選択」ボタン（`#select-toggle`）と **C** キー（文字の入力中・飛行中は無効）。Esc は、開いている小さな一覧 → 選択モード → 星座の選択、の順に一つずつ閉じる。
  Esc の受け取りは `document` から `window` に移した（ページ内で `window` に出したキーの確認でも届くように）。
- 選んだ星の表示は `SpaceView.setSelecting` と強調の種類 `"select"`（`src/render/stars.ts`）：金の輪、少し大きく明るく、選んでいない星は暗くしない。
  タイトルはふつうの地図の出し方のまま、選んだ星だけ優先（`priority -4000`、明るさ 1、星団の円でも間引かない）。
- Shift＋ドラッグは、`window` の取り込み段階で `pointerdown` を受けて止め、MapControls に渡さない（画面を動かさない）。四角は `#select-rect`。
  範囲の判定は `SpaceView.starsInRect`（表示している位置を投影）。ほとんど動かさなければ、ふつうのクリックとして扱う。選択モードでは Shift で拡大しない（`applyKeys`）。
- まとめて行う操作は画面の下の `#selection-bar`。「新しい星座にする」は名前の入力（`#constellation-name-input`・`#constellation-save`、前と同じ id）を開き、
  検索中なら検索語と埋め込みを記録して `createConstellation` を呼ぶ（保存の演出は前のまま）。「既存の星座に加える」は `#selection-targets` の一覧から。
  「星座から外す」は星座を選んでいるときだけ使え、外した星は `dismissed` に入れる（新星として出し直さない）。すべてのメンバーは外せない。加える・外すの後はその星座を選んで見せる。
- 選択モードの間は、ダブルクリックで開かず、飛行モードに入らず、新星の一覧を出さない。カメラの寄せ（`safeRect`）は `#selection-bar` を避ける。
- 確認：`scripts/check-selection.mjs`（新規）。星の選択は CDP のマウスのクリック、キーはページ内の KeyboardEvent。`check-extension` の編集状態の確認は選択モードに書き換えた。
