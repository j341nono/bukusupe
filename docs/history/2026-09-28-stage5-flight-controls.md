# 段階 5 の 2c：飛行モードの操作の見直し（2026-09-28）

> 旧 `docs/HANDOFF.md` 0 章から移した。詳しくは `docs/SPEC.md` 13 章と `docs/RELEASE.md` 段階 5 の 2c。
> ファイル一覧は [README.md](README.md)。

### 飛行モードの操作の見直し（2026-09-28、使う人の依頼。`docs/RELEASE.md` 段階 5 の 2c、`docs/SPEC.md` 13 章）

- `src/render/flight.ts`：宇宙船の向きは `ship.orientation`（四元数。機首が -z、上が +y）。yaw・pitch は表示と保存のときだけ `anglesOf`（YXZ）で換算する。
  向きを変える速さは機体の軸ごと（`turnRate`：x＝機首の上下、y＝左右、z＝ロール）に、目標へなめらかに寄せ（`TURN_EASE`）、上限を付ける。
  回転は機体の軸のまわりに後ろから掛ける。操作が無いときだけ `levelingRate` でロールを水平へ戻す（機首がほぼ真上・真下のときは戻さない）。
  範囲の外（`bound`・`ceiling`）では、機首を中心へ向ける回転を前から掛ける。念のための外側の壁は範囲の 2 倍。
- 速さ：入った直後は最高速度の 35%（`CRUISE`）、下限は 6%（`MIN_SPEED`、0 にはしない）。Space で +50%/秒、Shift で −60%/秒。最高速度と加速リングは前のまま。
- カメラ：`cameraOrientation` が機体の向きを少し遅れて追い（`CAMERA_FOLLOW`）、その後ろ・上から見る。`camera.up` も機体に合わせるので、
  地図に戻る移り変わりで真上へ戻し、戻り終わったら必ず (0, 1, 0) にする（MapControls のため）。
- 入力（`src/render/scene.ts` の `flightTick`）：W/↑・S/↓・A/←・D/→・Space・Shift。矢印キーは、main の飛行中のキーの取り込みで止めていたのを、
  ページのスクロールだけ止めて SpaceView へ届けるようにした。マウスは `pointerdown` から `pointerup` までだけ（押した点からのずれ）。
- 星に入った後は、押し戻していちばん遅い速さにする（止めない）。止まらないので、入った星は `reentryBlocked` で、一度離れるまで入り直さない。
- 「戻る」の保存状態の宇宙船に `roll` を足した（無ければ 0。版の番号は 2 のまま）。
- 確認：`scripts/check-flight-controls.mjs`（新規）。`check-flight` の古い操作の確認（W で前進、マウスの位置で旋回）は、説明の文言の確認に替え、
  前進に W を使っていた所は Space（加速）に替えた。「戻る」の確認は、再開した後も機首の向きへ進むので、機首の向きの線の上にあるかで見る。
