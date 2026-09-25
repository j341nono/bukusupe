/** 分野語から星団名に使う大分類への対応。埋め込み用の語はそのまま残す。 */
const TERMS: Record<string, string> = {
  開発: "3D API Android Apple CSS Chrome Go JavaScript Python React Rust SQL Svelte TypeScript Vue Web WebGL macOS インフラ エディタ キャッシュ コンテナ サーバー シェーダー セキュリティ ソフトウェア設計 ソースコード テクノロジー データベース ドキュメント ノートブック バージョン管理 パッケージ パッケージ管理 ビルドツール フレームワーク フロントエンド ブラウザ プログラミング プログラミング言語 リファレンス リポジトリ 推論 拡張機能 描画 正規表現 認証 通信 運用 開発 開発ツール 電子工作 小型計算機 性能 対応表 断片",
  AI: "AI 人工知能 機械学習 深層学習 プロンプト モデル 生成 データ分析 統計",
  デザイン: "UI アイコン アクセシビリティ アニメーション デザイン フォント 作品 配色 指針",
  ニュース: "SNS ガジェット スタートアップ ニュース ビジネス ブックマーク ブログ 交流 写真 動画 報道 掲示板 短文投稿 視聴 記事 話題 百科事典 質問 回答 調べもの 解説 技術記事",
  宇宙: "ロケット 天体 天文 宇宙 宇宙ステーション 打ち上げ 星空 星座 望遠鏡 観測",
  科学: "研究 科学 科学館 論文 展示 学習",
  料理: "グルメ レシピ 料理 製パン 製菓 調味料 調理器具 飲食店 香辛料",
  旅行: "ヨーロッパ 乗換 交通 地図 場所 宿泊 旅行 切符 航空券 観光 鉄道",
  音楽: "DTM ギター コード 配信 音楽 音楽制作 音楽理論 購入 素材",
  お金: "お金 ふるさと納税 会計 価格比較 制度 家計簿 年金 投資 確定申告 税金 経済 行政 証券 金融",
  健康: "ランニング 健康 労働 医療 献血 目 筋力トレーニング 運動",
  暮らし: "カレンダー メモ モニターアーム 予報 予定 仕事 作業環境 保管 天気 家電 暮らし 翻訳 英語 言語 連絡",
  買い物: "中古 個人売買 買い物 通販 キーボード 入力機器",
  文書: "ファイル 文書 表計算",
  対話: "チャット メール 対話",
};

export const TOPIC_CATEGORY = new Map<string, string>();
for (const [category, words] of Object.entries(TERMS)) {
  for (const word of words.split(" ")) {
    if (TOPIC_CATEGORY.has(word)) throw new Error(`分野語の大分類が重複: ${word}`);
    TOPIC_CATEGORY.set(word, category);
  }
}

export const BROAD_CATEGORIES = [...new Set(Object.keys(TERMS))]
  .sort((a, b) => b.length - a.length || a.localeCompare(b));

export function broadCategory(word: string): string | undefined {
  return TOPIC_CATEGORY.get(word);
}
