/**
 * ドメインに分野の語を足すための小さな辞書（SPEC 6 章）。
 * タイトルが薄いブックマーク（「ホーム」など）の意味を補う。
 * すべてブラウザ内で完結する。外部の分類 API は使わない。
 */
export const DOMAIN_HINTS: Record<string, string> = {
  // プログラミング・技術記事
  "qiita.com": "プログラミング 技術記事",
  "zenn.dev": "プログラミング 技術記事",
  "note.com": "ブログ 記事",
  "hatenablog.com": "ブログ 記事",
  "hatena.ne.jp": "ブログ 記事 ブックマーク",
  "b.hatena.ne.jp": "テクノロジー ニュース ブックマーク",
  "github.com": "ソースコード 開発 リポジトリ",
  "gist.github.com": "ソースコード 断片",
  "gitlab.com": "ソースコード 開発",
  "stackoverflow.com": "プログラミング 質問 回答",
  "developer.mozilla.org": "Web 開発 リファレンス",
  "developer.chrome.com": "Chrome 拡張機能 Web 開発",
  "web.dev": "Web 開発 性能",
  "css-tricks.com": "CSS Web デザイン 開発",
  "caniuse.com": "ブラウザ 対応表 Web 開発",
  "npmjs.com": "JavaScript パッケージ 開発",
  "docs.docker.com": "コンテナ 開発 インフラ",
  "kubernetes.io": "コンテナ インフラ 運用",
  "docs.github.com": "開発 ドキュメント",
  "regex101.com": "正規表現 開発ツール",
  "vim.rtorr.com": "エディタ 開発ツール",
  "code.visualstudio.com": "エディタ 開発ツール",
  "git-scm.com": "バージョン管理 開発",
  "brew.sh": "パッケージ管理 macOS 開発",
  "typescriptlang.org": "TypeScript プログラミング言語",
  "developer.apple.com": "Apple 開発",
  "developer.android.com": "Android 開発",
  "rust-lang.org": "Rust プログラミング言語",
  "doc.rust-jp.rs": "Rust プログラミング言語",
  "gobyexample.com": "Go プログラミング言語",
  "go.dev": "Go プログラミング言語",
  "python.org": "Python プログラミング言語",
  "docs.python.org": "Python プログラミング言語",
  "postgresql.org": "データベース SQL",
  "postgresql.jp": "データベース SQL",
  "redis.io": "データベース キャッシュ",
  "nginx.org": "Web サーバー インフラ",
  "grpc.io": "通信 API 開発",
  "fastapi.tiangolo.com": "Python Web フレームワーク",
  "nextjs.org": "React Web フレームワーク",
  "react.dev": "React フロントエンド",
  "ja.react.dev": "React フロントエンド",
  "vuejs.org": "Vue フロントエンド",
  "ja.vuejs.org": "Vue フロントエンド",
  "svelte.dev": "Svelte フロントエンド",
  "vite.dev": "ビルドツール フロントエンド",
  "tailwindcss.com": "CSS フロントエンド",
  "threejs.org": "3D 描画 WebGL",
  "shadertoy.com": "シェーダー 3D 描画",
  "thebookofshaders.com": "シェーダー 3D 描画",
  "onnxruntime.ai": "機械学習 推論",
  "overreacted.io": "React フロントエンド ブログ",
  "martinfowler.com": "ソフトウェア設計 開発",
  "authlete.com": "認証 セキュリティ",

  // AI・機械学習・研究
  "huggingface.co": "機械学習 AI モデル",
  "arxiv.org": "論文 研究",
  "paperswithcode.com": "論文 機械学習",
  "openai.com": "AI 人工知能",
  "anthropic.com": "AI 人工知能",
  "claude.ai": "AI 人工知能 対話",
  "pytorch.org": "機械学習 深層学習",
  "tensorflow.org": "機械学習 深層学習",
  "scikit-learn.org": "機械学習 統計",
  "kaggle.com": "データ分析 機械学習",
  "colab.research.google.com": "データ分析 機械学習 ノートブック",
  "lilianweng.github.io": "機械学習 研究 ブログ",
  "jalammar.github.io": "機械学習 解説 ブログ",
  "promptingguide.ai": "AI プロンプト 生成",

  // デザイン
  "figma.com": "デザイン UI",
  "dribbble.com": "デザイン 作品",
  "behance.net": "デザイン 作品",
  "m3.material.io": "デザイン UI 指針",
  "fonts.google.com": "フォント デザイン",
  "coolors.co": "配色 デザイン",
  "lucide.dev": "アイコン デザイン",
  "easings.net": "アニメーション デザイン",
  "unsplash.com": "写真 素材",
  "webaim.org": "アクセシビリティ デザイン",

  // ニュース・情報
  "news.ycombinator.com": "テクノロジー ニュース 英語",
  "techcrunch.com": "スタートアップ テクノロジー ニュース",
  "itmedia.co.jp": "テクノロジー ニュース",
  "gigazine.net": "テクノロジー ニュース",
  "gizmodo.jp": "ガジェット テクノロジー ニュース",
  "nikkei.com": "経済 ニュース",
  "nhk.or.jp": "ニュース 報道",
  "asahi.com": "ニュース 報道",
  "yomiuri.co.jp": "ニュース 報道",
  "reddit.com": "掲示板 話題",
  "x.com": "SNS 短文投稿",
  "twitter.com": "SNS 短文投稿",
  "facebook.com": "SNS 交流",
  "instagram.com": "SNS 写真",
  "youtube.com": "動画 視聴",
  "nicovideo.jp": "動画 視聴",
  "wikipedia.org": "百科事典 調べもの",
  "ja.wikipedia.org": "百科事典 調べもの",

  // 宇宙・科学
  "jaxa.jp": "宇宙 科学 研究",
  "nasa.gov": "宇宙 科学 研究",
  "apod.nasa.gov": "宇宙 天体 写真",
  "sorae.info": "宇宙 科学 ニュース",
  "nao.ac.jp": "天文 宇宙 研究",
  "subarutelescope.org": "天文 宇宙 望遠鏡",
  "natureasia.com": "科学 論文 研究",
  "nextspaceflight.com": "宇宙 ロケット 打ち上げ",
  "hubblesite.org": "宇宙 天体 写真 望遠鏡",
  "spotthestation.nasa.gov": "宇宙 宇宙ステーション 観測",
  "astroarts.co.jp": "天文 星空 星座",
  "miraikan.jst.go.jp": "科学館 展示 宇宙",

  // 料理・暮らし
  "cookpad.com": "料理 レシピ",
  "kurashiru.com": "料理 レシピ 動画",
  "delishkitchen.tv": "料理 レシピ 動画",
  "kikkoman.co.jp": "料理 レシピ 調味料",
  "sbfoods.co.jp": "料理 レシピ 香辛料",
  "lettuceclub.net": "料理 レシピ 暮らし",
  "cotta.jp": "製菓 製パン 料理",
  "kai-group.com": "調理器具 暮らし",

  // 旅行・地図
  "jalan.net": "旅行 宿泊",
  "rurubu.travel": "旅行 観光",
  "skyscanner.jp": "旅行 航空券",
  "booking.com": "旅行 宿泊",
  "airbnb.jp": "旅行 宿泊",
  "tabelog.com": "飲食店 グルメ",
  "google.com/maps": "地図 場所",
  "transit.yahoo.co.jp": "乗換 交通",
  "jr-odekake.net": "鉄道 旅行 切符",
  "eurail.com": "鉄道 旅行 ヨーロッパ",
  "tenki.jp": "天気 予報",

  // 音楽
  "open.spotify.com": "音楽 配信",
  "spotify.com": "音楽 配信",
  "bandcamp.com": "音楽 購入",
  "soundcloud.com": "音楽 配信",
  "ufret.jp": "音楽 ギター コード",
  "soundquest.jp": "音楽理論 学習",
  "sleepfreaks-dtm.com": "音楽制作 DTM",
  "ableton.com": "音楽制作 DTM",
  "dova-s.jp": "音楽 素材",

  // お金・行政
  "nta.go.jp": "税金 確定申告 行政",
  "fsa.go.jp": "金融 制度 行政",
  "mhlw.go.jp": "健康 労働 行政",
  "nenkin.go.jp": "年金 行政",
  "furusato-tax.jp": "ふるさと納税 税金",
  "moneyforward.com": "家計簿 お金",
  "freee.co.jp": "会計 確定申告 お金",
  "rakuten-sec.co.jp": "投資 証券 お金",
  "diamond.jp": "経済 ビジネス 記事",

  // 健康・運動
  "runnet.jp": "ランニング 運動",
  "myprotein.jp": "筋力トレーニング 運動",
  "tyojyu.or.jp": "健康 医療",
  "kenketsu.jp": "献血 医療",
  "santen.co.jp": "目 健康 医療",

  // 買い物・道具
  "amazon.co.jp": "買い物 通販",
  "rakuten.co.jp": "買い物 通販",
  "kakaku.com": "価格比較 買い物 家電",
  "mercari.com": "買い物 中古 個人売買",
  "raspberrypi.com": "電子工作 小型計算機",
  "happyhackingkb.com": "キーボード 入力機器",
  "ergotron.com": "モニターアーム 作業環境",

  // 仕事道具
  "notion.so": "メモ 文書 仕事",
  "docs.google.com": "文書 表計算 仕事",
  "drive.google.com": "ファイル 保管 仕事",
  "calendar.google.com": "予定 カレンダー 仕事",
  "mail.google.com": "メール 連絡",
  "slack.com": "連絡 チャット 仕事",
  "deepl.com": "翻訳 言語",
  "figma.io": "デザイン UI",
};

export function hintsFor(domain: string): string {
  if (DOMAIN_HINTS[domain]) return DOMAIN_HINTS[domain];
  // サブドメインを落としながら探す（例：docs.example.co.jp → example.co.jp）
  const parts = domain.split(".");
  for (let i = 1; i < parts.length - 1; i++) {
    const tail = parts.slice(i).join(".");
    if (DOMAIN_HINTS[tail]) return DOMAIN_HINTS[tail];
  }
  return "";
}
