# 画面の文言の一覧（英語と日本語）

英語の文言を読み合わせるための資料。`node scripts/gen-i18n-review.mjs`（`npm run i18n:review`）で辞書から作る。**手で直さない**（辞書を直して作り直す）。

- 辞書：`src/i18n/en.ts`・`ja.ts`（108 項目）。`{name}` は差し込む値、`[[W]]` はキーの表示、`#one` で終わる項目は英語の単数形。
- 星団名の大分類：`src/embed/topic-categories.ts`。拡張機能の名前と説明：`public/_locales/`（Chrome 自体の言語で選ばれる）。

## 拡張機能の名前と説明（`public/_locales`）

| 項目 | English | 日本語 |
|---|---|---|
| `extName` | Bukusupe — Bookmark Space | ブクスペ — ブックマークの宇宙 |
| `extShortName` | Bukusupe | ブクスペ |
| `extDescription` | Turn your bookmarks into a galaxy of stars and find pages by meaning. Link them into constellations and fly among them. | ブックマークを星にして、意味の近さで並べた宇宙地図。検索で星を引き寄せ、選んだ星を星座として残し、星の間を飛べる。ブックマークはブラウザの外に送りません。 |
| `actionTitle` | Open Bukusupe | ブクスペを開く |

## 星団名の大分類

| id | English | 日本語 |
|---|---|---|
| `dev` | Development | 開発 |
| `ai` | AI | AI |
| `design` | Design | デザイン |
| `news` | News | ニュース |
| `space` | Space | 宇宙 |
| `science` | Science | 科学 |
| `food` | Cooking | 料理 |
| `travel` | Travel | 旅行 |
| `music` | Music | 音楽 |
| `money` | Money | お金 |
| `health` | Health | 健康 |
| `life` | Everyday life | 暮らし |
| `shopping` | Shopping | 買い物 |
| `docs` | Docs & notes | 文書 |
| `chat` | Messaging | 対話 |

## 辞書

### app

| 項目 | English | 日本語 |
|---|---|---|
| `app.name` | Bukusupe | ブクスペ |

### lang

| 項目 | English | 日本語 |
|---|---|---|
| `lang.label` | Language | 表示の言語 |
| `lang.auto` | Auto | 自動 |
| `lang.en` | English | English |
| `lang.ja` | 日本語 | 日本語 |

### firstRun

| 項目 | English | 日本語 |
|---|---|---|
| `firstRun.aria` | Welcome | 初回のご案内 |
| `firstRun.heading` | Before you begin | ブクスペを始める前に |
| `firstRun.local` | Your bookmarks are processed only on this device. Their contents are never sent anywhere. | ブックマークはこの端末の中だけで処理します。内容を外部へ送りません。 |
| `firstRun.model` | The first time you start, Bukusupe downloads a language model (about {size} MB) from Hugging Face, so it can understand what your bookmarks are about. | 初回に、意味を読み取るためのモデル（約{size} MB）を Hugging Face から取得します。 |
| `firstRun.privacy` | Read the privacy policy | プライバシーポリシーを読む |
| `firstRun.start` | Start | 始める |

### search

| 項目 | English | 日本語 |
|---|---|---|
| `search.placeholder` | Search the stars | 星を探す |
| `search.aria` | Search bookmarks | ブックマークを検索 |
| `search.createConstellation` | Make a constellation | 星座にする |
| `search.createConstellationTitle` | Turn the search results into a constellation (Shift+Enter) | 検索で引き寄せた星を選んで、星座を作る（Shift+Enter） |
| `search.selectAll` | Select all results | 結果をすべて選ぶ |

### model

| 項目 | English | 日本語 |
|---|---|---|
| `model.preparing` | Getting search by meaning ready — using keyword search for now | 意味の検索を準備している（それまでは文字の一致で探す） |
| `model.preparingPercent` | Getting search by meaning ready {percent} — using keyword search for now | 意味の検索を準備している {percent}（それまでは文字の一致で探す） |
| `model.integrityFailedText` | The model couldn't be verified. Reload to try again (keyword search still works). | モデルの検証に失敗しました。再読み込みしてください（文字の一致で探せます） |
| `model.failedText` | Search by meaning is unavailable — using keyword search | 意味の検索を準備できなかった（文字の一致で探す） |

### status

| 項目 | English | 日本語 |
|---|---|---|
| `status.loadingBookmarks` | Loading bookmarks… | ブックマークを読み込んでいる… |
| `status.dbBlocked` | Close the other Bukusupe tabs to continue | ほかのブクスペのタブを閉じると続きを始める |
| `status.reading` | Reading the stars… | 星を読み解いている… |
| `status.readingProgress` | Reading the stars {done} / {total} | 星を読み解いている {done} / {total} |
| `status.model` | Loading the model {percent} | モデルを取り込んでいる {percent} |
| `status.placing` | Placing the stars… | 星を並べている… |
| `status.relayout` | Rearranging… | 並べ直している… |
| `status.clusters` | {count} clusters | {count} つの星団 |
| `status.clusters#one` | {count} cluster | {count} つの星団 |
| `status.integrityFailed` | The model couldn't be verified. Please reload. | モデルの検証に失敗しました。再読み込みしてください |
| `status.embedFailed` | Couldn't analyze your bookmarks | 意味の計算に失敗した |
| `status.loadFailed` | Something went wrong while loading. Please reload. | 読み込みに失敗しました。再読み込みしてください。 |

### loading

| 項目 | English | 日本語 |
|---|---|---|
| `loading` | Counting the stars… | 星を数えている… |

### hud

| 項目 | English | 日本語 |
|---|---|---|
| `hud.stars` | Stars | 星 |
| `hud.source` | Source | データ源 |
| `hud.sourceChrome` | Chrome | Chrome |
| `hud.sourceSample` | Sample | サンプル |
| `hud.switchToSample` | Try the sample universe | サンプルの宇宙で試す |
| `hud.switchToChrome` | Back to my bookmarks | 自分のブックマークに戻る |
| `hud.toggleTitle` | Show or hide the info panel | 情報を開閉する |
| `hud.toggleAria` | Info | 情報 |

### help

| 項目 | English | 日本語 |
|---|---|---|
| `help.move` | [[W]][[A]][[S]][[D]] or left-drag: move | [[W]][[A]][[S]][[D]]・左ドラッグ　移動 |
| `help.zoom` | [[Space]] zoom out · [[Shift]] zoom in (or scroll) | [[Space]] 縮小　[[Shift]] 拡大（ホイールでも） |
| `help.tilt` | Right-drag up/down: tilt | 右ドラッグの上下　傾き |
| `help.search` | [[/]] search · [[Esc]] clear the search | [[/]] 検索欄へ　[[Esc]] 検索を消して抜ける |
| `help.open` | [[↑]][[↓]] pick a result · [[Enter]] open in this tab ([[Ctrl]]/[[⌘]]: new tab) | [[↑]][[↓]] 候補を選ぶ　[[Enter]] 同じタブで開く（[[Ctrl]]/[[⌘]] で新しいタブ） |
| `help.constellation` | [[Shift]]+[[Enter]] make the results a constellation | [[Shift]]+[[Enter]] 検索結果を選んで星座にする |
| `help.selection` | [[C]] selection mode (pick stars for a constellation; [[Shift]]+drag picks an area) | [[C]] 選択モード（星を選んで星座にする。[[Shift]]+ドラッグで範囲を選ぶ） |
| `help.cluster` | Click a cluster name: fly to it | 星団名をクリック　その星団へ移動 |
| `help.star` | Click a star to see details · double-click to open | 星をクリック　カード（ダブルクリックで開く） |

### hint

| 項目 | English | 日本語 |
|---|---|---|
| `hint.pointer` | Drag to move · scroll to zoom · all controls under ⓘ | ドラッグで移動・ホイールで拡大縮小　操作の一覧は ⓘ |
| `hint.touch` | Drag to move · pinch to zoom · tap to select | ドラッグで移動・ピンチで拡大縮小・タップで選ぶ |

### touchNote

| 項目 | English | 日本語 |
|---|---|---|
| `touchNote` | Flight mode is available on a computer | 飛行モードは PC で試せます |

### sampleHint

| 項目 | English | 日本語 |
|---|---|---|
| `sampleHint.text` | You have only a few bookmarks, so the sky is still sparse. Try the sample universe with {count} stars (you can switch back anytime from ⓘ). | ブックマークが少ないので、星空がまだまばらです。{count} 個の星が並ぶサンプルの宇宙でも試せます（ⓘ からいつでも切り替えられます）。 |
| `sampleHint.try` | Try the sample universe | サンプルの宇宙で試す |
| `sampleHint.close` | Close | 閉じる |

### relayout

| 項目 | English | 日本語 |
|---|---|---|
| `relayout.label` | Rearrange | 再配置 |
| `relayout.title` | Arrange the stars again from scratch | 星団から並べ直す |

### flight

| 項目 | English | 日本語 |
|---|---|---|
| `flight.enter` | Fly | 飛行 |
| `flight.enterTitle` | Fly among the stars (F) | 星の間を飛ぶ（F） |
| `flight.exit` | Back to map | 地図へ戻る |
| `flight.exitTitle` | Back to the map (Esc) | 地図へ戻る（Esc） |
| `flight.helpPitch` | [[W]][[S]] ([[↑]][[↓]]) Nose up/down | [[W]][[S]]（[[↑]][[↓]]）機首の上下 |
| `flight.helpYaw` | [[A]][[D]] ([[←]][[→]]) Turn | [[A]][[D]]（[[←]][[→]]）左右 |
| `flight.helpSpeed` | [[Space]] Faster [[Shift]] Slower | [[Space]] 加速 [[Shift]] 減速 |
| `flight.helpMouse` | Drag the mouse to steer | マウスはドラッグで機首の向き |
| `flight.helpExit` | [[Esc]] Back to map | [[Esc]] 地図へ戻る |
| `flight.helpNote` | The ship never stops. Near a star you see its name; fly into its core to open the page. | 宇宙船は止まらずに進む。星に近づくと名前が見え、星の芯に入るとそのページが開く |

### card

| 項目 | English | 日本語 |
|---|---|---|
| `card.open` | Open | 開く |
| `card.root` | Top level | フォルダなし |

### select

| 項目 | English | 日本語 |
|---|---|---|
| `select.toggle` | Select | 選択 |
| `select.toggleEnd` | Done | 選択を終える |
| `select.toggleTitle` | Pick stars to make a constellation (C) | 星を選んで星座を作る（C） |

### selection

| 項目 | English | 日本語 |
|---|---|---|
| `selection.aria` | Selected stars | 選んだ星 |
| `selection.mode` | Selection mode | 選択モード |
| `selection.help` | Click to pick or unpick · Shift+drag to pick an area · C or Esc to finish | クリックで選ぶ・外す　Shift＋ドラッグで範囲を選ぶ　C か Esc で終える |
| `selection.count` | {count} stars selected | {count} 個の星を選んでいる |
| `selection.count#one` | {count} star selected | {count} 個の星を選んでいる |
| `selection.none` | No stars selected | 星を選んでいない |
| `selection.new` | New constellation | 新しい星座にする |
| `selection.add` | Add to a constellation | 既存の星座に加える |
| `selection.remove` | Remove from constellation | 星座から外す |
| `selection.clear` | Clear selection | 選択を解除 |
| `selection.noConstellations` | No saved constellations yet | 保存した星座がまだ無い |
| `selection.pickConstellation` | First choose the constellation to remove stars from, in the list at the bottom | 外す星座を、画面の下の一覧から選ぶ |
| `selection.notInConstellation` | The selected stars are not in this constellation | 選んだ星は、この星座に入っていない |
| `selection.cannotRemoveAll` | You can’t remove every star (to delete the constellation, use “…” → Delete) | すべての星は外せない（星座を消すときは「…」の「削除」） |
| `selection.targetsAria` | Constellation to add to | 加える星座 |
| `selection.targetsHeading` | Choose a constellation | 加える星座を選ぶ |

### constellation

| 項目 | English | 日本語 |
|---|---|---|
| `constellation.name` | Constellation name | 星座の名前 |
| `constellation.save` | Save | 保存 |
| `constellation.cancel` | Cancel | やめる |
| `constellation.untitled` | Untitled constellation | 名前のない星座 |
| `constellation.listAria` | Saved constellations | 保存した星座 |
| `constellation.menuAria` | Constellation actions | 星座の操作 |
| `constellation.rename` | Rename | 名前を変える |
| `constellation.delete` | Delete | 削除 |
| `constellation.more` | Actions for this constellation | この星座の操作 |
| `constellation.moreAria` | Actions for “{name}” | 「{name}」の操作 |

### novae

| 項目 | English | 日本語 |
|---|---|---|
| `novae.aria` | New stars | 新星 |
| `novae.label` | New stars | 新星 |
| `novae.heading` | New since you saved · matching “{query}” | 保存の後に加わり、「{query}」に合う星 |
| `novae.accept` | Add | 加える |
| `novae.dismiss` | Dismiss | 見送る |

### cluster

| 項目 | English | 日本語 |
|---|---|---|
| `cluster.unnamed` | Unnamed cluster {n} | 無名の星団 {n} |
| `cluster.other` | Other | その他 |
| `cluster.join` |  ·  | ・ |
| `cluster.numbered` | {name} {n} | {name} {n} |
