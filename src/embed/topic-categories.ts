/**
 * 分野語から星団名に使う大分類への対応。埋め込み用の語（words）はそのまま残す。
 * 大分類は、言語に依らない id と、画面に出す日本語・英語の名前を持つ（SPEC 7 章・14 章）。
 * 保存する星団名は id で持ち、表示のときに画面の言語の名前へ直す（`src/i18n/cluster.ts`）。
 */
export type TopicCategory = { id: string; ja: string; en: string; words: string };

export const CATEGORIES: readonly TopicCategory[] = [
  { id: "dev", ja: "開発", en: "Development",
    words: "3D API Android Apple CSS Chrome Go JavaScript Python React Rust SQL Svelte TypeScript Vue Web WebGL macOS インフラ エディタ キャッシュ コンテナ サーバー シェーダー セキュリティ ソフトウェア設計 ソースコード テクノロジー データベース ドキュメント ノートブック バージョン管理 パッケージ パッケージ管理 ビルドツール フレームワーク フロントエンド ブラウザ プログラミング プログラミング言語 リファレンス リポジトリ 推論 拡張機能 描画 正規表現 認証 通信 運用 開発 開発ツール 電子工作 小型計算機 性能 対応表 断片" },
  { id: "ai", ja: "AI", en: "AI",
    words: "AI 人工知能 機械学習 深層学習 プロンプト モデル 生成 データ分析 統計" },
  { id: "design", ja: "デザイン", en: "Design",
    words: "UI アイコン アクセシビリティ アニメーション デザイン フォント 作品 配色 指針" },
  { id: "news", ja: "ニュース", en: "News",
    words: "SNS ガジェット スタートアップ ニュース ビジネス ブックマーク ブログ 交流 写真 動画 報道 掲示板 短文投稿 視聴 記事 話題 百科事典 質問 回答 調べもの 解説 技術記事" },
  { id: "space", ja: "宇宙", en: "Space",
    words: "ロケット 天体 天文 宇宙 宇宙ステーション 打ち上げ 星空 星座 望遠鏡 観測" },
  { id: "science", ja: "科学", en: "Science",
    words: "研究 科学 科学館 論文 展示 学習" },
  { id: "food", ja: "料理", en: "Cooking",
    words: "グルメ レシピ 料理 製パン 製菓 調味料 調理器具 飲食店 香辛料" },
  { id: "travel", ja: "旅行", en: "Travel",
    words: "ヨーロッパ 乗換 交通 地図 場所 宿泊 旅行 切符 航空券 観光 鉄道" },
  { id: "music", ja: "音楽", en: "Music",
    words: "DTM ギター コード 配信 音楽 音楽制作 音楽理論 購入 素材" },
  { id: "money", ja: "お金", en: "Money",
    words: "お金 ふるさと納税 会計 価格比較 制度 家計簿 年金 投資 確定申告 税金 経済 行政 証券 金融" },
  { id: "health", ja: "健康", en: "Health",
    words: "ランニング 健康 労働 医療 献血 目 筋力トレーニング 運動" },
  { id: "life", ja: "暮らし", en: "Everyday life",
    words: "カレンダー メモ モニターアーム 予報 予定 仕事 作業環境 保管 天気 家電 暮らし 翻訳 英語 言語 連絡" },
  { id: "shopping", ja: "買い物", en: "Shopping",
    words: "中古 個人売買 買い物 通販 キーボード 入力機器" },
  { id: "docs", ja: "文書", en: "Docs & notes",
    words: "ファイル 文書 表計算" },
  { id: "chat", ja: "対話", en: "Messaging",
    words: "チャット メール 対話" },
];

/** 分野語 → 大分類の id */
export const TOPIC_CATEGORY = new Map<string, string>();
for (const category of CATEGORIES) {
  for (const word of category.words.split(" ")) {
    if (TOPIC_CATEGORY.has(word)) throw new Error(`分野語の大分類が重複: ${word}`);
    TOPIC_CATEGORY.set(word, category.id);
  }
}

export const CATEGORY_BY_ID = new Map(CATEGORIES.map((c) => [c.id, c]));

/** 分野語の大分類の id */
export function broadCategory(word: string): string | undefined {
  return TOPIC_CATEGORY.get(word);
}

/** 名前（フォルダ名）が、どの大分類の名前に当たるか。日本語はそのまま、英語は大文字小文字を区別せずに比べる */
export function categoryNamed(name: string): string | undefined {
  const trimmed = name.trim();
  const lower = trimmed.toLowerCase();
  return CATEGORIES.find((c) => c.ja === trimmed || c.en.toLowerCase() === lower)?.id;
}

/** 英語の名前を、語として（前後が英字でない所で）探す */
const EN_PATTERN = new Map(CATEGORIES.map((c) => [c.id, new RegExp(`(^|[^a-z])${c.en.toLowerCase()}($|[^a-z])`)]));

/** タイトルに含まれる大分類（日本語の名前は部分一致、英語の名前は語として大文字小文字を区別せずに一致） */
export function categoriesInTitle(title: string): string[] {
  const lower = title.toLowerCase();
  return CATEGORIES.filter((c) => title.includes(c.ja) || EN_PATTERN.get(c.id)!.test(lower)).map((c) => c.id);
}
