(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();function Rd(){return typeof chrome<"u"&&!!chrome.bookmarks?.getTree}async function Cd(){const i=await chrome.bookmarks.getTree(),t=[],e=(n,s)=>{if(n.url){if(!/^https?:/i.test(n.url))return;t.push({id:n.id,title:n.title||n.url,url:n.url,folderPath:s,dateAdded:n.dateAdded,dateLastUsed:n.dateLastUsed});return}const r=n.title?[...s,n.title]:s;for(const a of n.children??[])e(a,r)};for(const n of i)e(n,[]);return t}const Pd=JSON.parse('[{"id":"s001","title":"React – ユーザインターフェース構築のためのライブラリ","url":"https://ja.react.dev/","folderPath":["開発","フロントエンド"],"dateAdded":1712433993053,"dateLastUsed":1788728955583},{"id":"s002","title":"useEffect の完全ガイド","url":"https://overreacted.io/a-complete-guide-to-useeffect/","folderPath":["開発","フロントエンド"],"dateAdded":1711737307094,"dateLastUsed":1789004884488},{"id":"s003","title":"Vue.js - プログレッシブ JavaScript フレームワーク","url":"https://ja.vuejs.org/guide/introduction.html","folderPath":["開発","フロントエンド"],"dateAdded":1704264265735,"dateLastUsed":1769289474181},{"id":"s004","title":"Svelte • Cybernetically enhanced web apps","url":"https://svelte.dev/","folderPath":["開発","フロントエンド"],"dateAdded":1652648094695,"dateLastUsed":1715994712712},{"id":"s005","title":"Vite | Next Generation Frontend Tooling","url":"https://ja.vite.dev/guide/","folderPath":["開発","フロントエンド"],"dateAdded":1743357949851},{"id":"s006","title":"TypeScript: Handbook - The Basics","url":"https://www.typescriptlang.org/docs/handbook/2/basic-types.html","folderPath":["開発","フロントエンド"],"dateAdded":1765505142764,"dateLastUsed":1789328210530},{"id":"s007","title":"CSS Grid Layout を極める","url":"https://developer.mozilla.org/ja/docs/Web/CSS/CSS_grid_layout","folderPath":["開発","フロントエンド"],"dateAdded":1721939328211,"dateLastUsed":1789254546386},{"id":"s008","title":"Flexbox チートシート","url":"https://css-tricks.com/snippets/css/a-guide-to-flexbox/","folderPath":["開発","フロントエンド"],"dateAdded":1760819256628,"dateLastUsed":1776370499652},{"id":"s009","title":"Web Components の作り方","url":"https://developer.mozilla.org/ja/docs/Web/API/Web_components","folderPath":["開発","フロントエンド"],"dateAdded":1655256559958,"dateLastUsed":1723412774550},{"id":"s010","title":"Tailwind CSS - Rapidly build modern websites","url":"https://tailwindcss.com/docs/installation","folderPath":["開発","フロントエンド"],"dateAdded":1709653786840,"dateLastUsed":1735340405148},{"id":"s011","title":"Can I use... Support tables for HTML5, CSS3","url":"https://caniuse.com/","folderPath":["開発","フロントエンド"],"dateAdded":1714432195963,"dateLastUsed":1782438851723},{"id":"s012","title":"Core Web Vitals とは何か","url":"https://web.dev/articles/vitals?hl=ja","folderPath":["開発","フロントエンド"],"dateAdded":1692298319475,"dateLastUsed":1765141126849},{"id":"s013","title":"Next.js App Router の考え方","url":"https://nextjs.org/docs/app/building-your-application/routing","folderPath":["開発","フロントエンド"],"dateAdded":1691286469815,"dateLastUsed":1768520589465},{"id":"s014","title":"アクセシビリティ入門 - WAI-ARIA の基本","url":"https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA","folderPath":["開発","フロントエンド"],"dateAdded":1719163702280,"dateLastUsed":1789171536181},{"id":"s015","title":"Go by Example","url":"https://gobyexample.com/","folderPath":["開発","バックエンド"],"dateAdded":1768302549651,"dateLastUsed":1772928519293},{"id":"s016","title":"Rust プログラミング言語 日本語版","url":"https://doc.rust-jp.rs/book-ja/","folderPath":["開発","バックエンド"],"dateAdded":1723948878483,"dateLastUsed":1776453784437},{"id":"s017","title":"PostgreSQL 16 ドキュメント","url":"https://www.postgresql.jp/document/16/html/index.html","folderPath":["開発","バックエンド"],"dateAdded":1763064448634,"dateLastUsed":1779842555477},{"id":"s018","title":"Redis のデータ型を理解する","url":"https://redis.io/docs/latest/develop/data-types/","folderPath":["開発","バックエンド"],"dateAdded":1751649241355,"dateLastUsed":1783288724699},{"id":"s019","title":"Docker Compose の書き方","url":"https://docs.docker.com/compose/compose-file/","folderPath":["開発","バックエンド"],"dateAdded":1752976254622,"dateLastUsed":1788998741749},{"id":"s020","title":"Kubernetes の Pod とは","url":"https://kubernetes.io/ja/docs/concepts/workloads/pods/","folderPath":["開発","バックエンド"],"dateAdded":1737317806199,"dateLastUsed":1788997989410},{"id":"s021","title":"gRPC の基礎","url":"https://grpc.io/docs/what-is-grpc/introduction/","folderPath":["開発","バックエンド"],"dateAdded":1679817732956},{"id":"s022","title":"REST API 設計のベストプラクティス","url":"https://qiita.com/NagaokaKenichi/items/0647c30ef596cedf4bf2","folderPath":["開発","バックエンド"],"dateAdded":1737122446720,"dateLastUsed":1771457922252},{"id":"s023","title":"FastAPI - 高速な Python Web フレームワーク","url":"https://fastapi.tiangolo.com/ja/","folderPath":["開発","バックエンド"],"dateAdded":1650201895429,"dateLastUsed":1721616619167},{"id":"s024","title":"SQL アンチパターン まとめ","url":"https://zenn.dev/praha/articles/sql-antipatterns","folderPath":["開発","バックエンド"],"dateAdded":1703244238247,"dateLastUsed":1775357706633},{"id":"s025","title":"分散システムの誤謬 8 つ","url":"https://architecturenotes.co/p/fallacies-of-distributed-systems","folderPath":["開発","バックエンド"],"dateAdded":1756636162985,"dateLastUsed":1771701436598},{"id":"s026","title":"nginx のリバースプロキシ設定","url":"https://nginx.org/en/docs/http/ngx_http_proxy_module.html","folderPath":["開発","バックエンド"],"dateAdded":1755306270069,"dateLastUsed":1768093929761},{"id":"s027","title":"OAuth 2.0 と OpenID Connect の違い","url":"https://www.authlete.com/ja/developers/oauth_and_oidc/","folderPath":["開発","バックエンド"],"dateAdded":1762785706617,"dateLastUsed":1789609161542},{"id":"s028","title":"Pro Git 日本語版","url":"https://git-scm.com/book/ja/v2","folderPath":["開発","ツール"],"dateAdded":1760324230074,"dateLastUsed":1771813313257},{"id":"s029","title":"GitHub Actions のワークフロー構文","url":"https://docs.github.com/ja/actions/using-workflows/workflow-syntax-for-github-actions","folderPath":["開発","ツール"],"dateAdded":1657161314236,"dateLastUsed":1705629305102},{"id":"s030","title":"Vim チートシート","url":"https://vim.rtorr.com/lang/ja","folderPath":["開発","ツール"],"dateAdded":1693311964390,"dateLastUsed":1751497283092},{"id":"s031","title":"VS Code キーボードショートカット","url":"https://code.visualstudio.com/docs/getstarted/keybindings","folderPath":["開発","ツール"],"dateAdded":1682302105050},{"id":"s032","title":"tmux の使い方","url":"https://qiita.com/nmrmsys/items/03f97f5eabec18a3a18b","folderPath":["開発","ツール"],"dateAdded":1741957738806},{"id":"s033","title":"正規表現テスター regex101","url":"https://regex101.com/","folderPath":["開発","ツール"],"dateAdded":1728701506866,"dateLastUsed":1771443278563},{"id":"s034","title":"jq マニュアル","url":"https://jqlang.github.io/jq/manual/","folderPath":["開発","ツール"],"dateAdded":1756695994970,"dateLastUsed":1784596228368},{"id":"s035","title":"ripgrep の使い方","url":"https://github.com/BurntSushi/ripgrep","folderPath":["開発","ツール"],"dateAdded":1715130082264,"dateLastUsed":1789944941893},{"id":"s036","title":"Homebrew — macOS 用パッケージマネージャー","url":"https://brew.sh/ja/","folderPath":["開発","ツール"],"dateAdded":1767818122562,"dateLastUsed":1788551126938},{"id":"s037","title":"Chrome DevTools の便利機能","url":"https://developer.chrome.com/docs/devtools/?hl=ja","folderPath":["開発","ツール"],"dateAdded":1726401795768,"dateLastUsed":1771799513924},{"id":"s038","title":"Chrome 拡張機能 Manifest V3 移行ガイド","url":"https://developer.chrome.com/docs/extensions/develop/migrate?hl=ja","folderPath":["開発","ツール"],"dateAdded":1730767066379,"dateLastUsed":1746223914558},{"id":"s039","title":"chrome.bookmarks API リファレンス","url":"https://developer.chrome.com/docs/extensions/reference/api/bookmarks?hl=ja","folderPath":["開発","ツール"],"dateAdded":1660298595527,"dateLastUsed":1708987253201},{"id":"s040","title":"Attention Is All You Need","url":"https://arxiv.org/abs/1706.03762","folderPath":["AI"],"dateAdded":1685154729968,"dateLastUsed":1721159277381},{"id":"s041","title":"The Illustrated Transformer","url":"https://jalammar.github.io/illustrated-transformer/","folderPath":["AI"],"dateAdded":1738265277677,"dateLastUsed":1789524462635},{"id":"s042","title":"Hugging Face – The AI community building the future","url":"https://huggingface.co/","folderPath":["AI"],"dateAdded":1704568931035},{"id":"s043","title":"transformers.js ドキュメント","url":"https://huggingface.co/docs/transformers.js/index","folderPath":["AI"],"dateAdded":1718756850198,"dateLastUsed":1789613969807},{"id":"s044","title":"multilingual-e5-small モデルカード","url":"https://huggingface.co/intfloat/multilingual-e5-small","folderPath":["AI"],"dateAdded":1778955344821,"dateLastUsed":1790197346489},{"id":"s045","title":"埋め込みベクトルとは何か","url":"https://zenn.dev/microsoft/articles/embedding-introduction","folderPath":["AI"],"dateAdded":1785027869345,"dateLastUsed":1790194451336},{"id":"s046","title":"RAG（検索拡張生成）の基本","url":"https://aws.amazon.com/jp/what-is/retrieval-augmented-generation/","folderPath":["AI"],"dateAdded":1728238560465,"dateLastUsed":1782245954440},{"id":"s047","title":"PyTorch チュートリアル","url":"https://pytorch.org/tutorials/beginner/basics/intro.html","folderPath":["AI"],"dateAdded":1703332978670,"dateLastUsed":1770406352581},{"id":"s048","title":"scikit-learn: machine learning in Python","url":"https://scikit-learn.org/stable/","folderPath":["AI"],"dateAdded":1774293497876,"dateLastUsed":1789153286648},{"id":"s049","title":"t-SNE と UMAP の違いを理解する","url":"https://pair-code.github.io/understanding-umap/","folderPath":["AI"],"dateAdded":1710520354660,"dateLastUsed":1783114670349},{"id":"s050","title":"k-means++ の初期化","url":"https://en.wikipedia.org/wiki/K-means%2B%2B","folderPath":["AI"],"dateAdded":1711525359063,"dateLastUsed":1779139253449},{"id":"s051","title":"ONNX Runtime Web で推論を動かす","url":"https://onnxruntime.ai/docs/tutorials/web/","folderPath":["AI"],"dateAdded":1760884125773},{"id":"s052","title":"プロンプトエンジニアリングガイド","url":"https://www.promptingguide.ai/jp","folderPath":["AI"],"dateAdded":1720787646676,"dateLastUsed":1776642736393},{"id":"s053","title":"Whisper による音声文字起こし","url":"https://github.com/openai/whisper","folderPath":["AI"],"dateAdded":1661881125438,"dateLastUsed":1698622681980},{"id":"s054","title":"拡散モデルの数理","url":"https://lilianweng.github.io/posts/2021-07-11-diffusion-models/","folderPath":["AI"],"dateAdded":1683909474755},{"id":"s055","title":"Figma の基本操作","url":"https://help.figma.com/hc/ja/articles/360039823894","folderPath":["デザイン"],"dateAdded":1730188066098},{"id":"s056","title":"Material Design 3","url":"https://m3.material.io/","folderPath":["デザイン"],"dateAdded":1752201304544},{"id":"s057","title":"Refactoring UI のヒント集","url":"https://www.refactoringui.com/","folderPath":["デザイン"],"dateAdded":1718843138824,"dateLastUsed":1768941735436},{"id":"s058","title":"配色を決めるツール Coolors","url":"https://coolors.co/","folderPath":["デザイン"],"dateAdded":1741292272014,"dateLastUsed":1748134347009},{"id":"s059","title":"Google Fonts 日本語","url":"https://fonts.google.com/?subset=japanese","folderPath":["デザイン"],"dateAdded":1713221182925,"dateLastUsed":1736807227347},{"id":"s060","title":"アイコン集 Lucide","url":"https://lucide.dev/icons/","folderPath":["デザイン"],"dateAdded":1708471138363,"dateLastUsed":1782351250098},{"id":"s061","title":"イージング関数チートシート","url":"https://easings.net/ja","folderPath":["デザイン"],"dateAdded":1765623007359,"dateLastUsed":1790032423147},{"id":"s062","title":"three.js examples","url":"https://threejs.org/examples/","folderPath":["デザイン"],"dateAdded":1716882144123},{"id":"s063","title":"Shadertoy","url":"https://www.shadertoy.com/","folderPath":["デザイン"],"dateAdded":1759058619712,"dateLastUsed":1788641145430},{"id":"s064","title":"The Book of Shaders","url":"https://thebookofshaders.com/?lan=jp","folderPath":["デザイン"],"dateAdded":1722684382425},{"id":"s065","title":"配色のアクセシビリティ判定","url":"https://webaim.org/resources/contrastchecker/","folderPath":["デザイン"],"dateAdded":1768087924095,"dateLastUsed":1788559723409},{"id":"s066","title":"基本の肉じゃがレシピ","url":"https://cookpad.com/jp/recipes/16371745","folderPath":["料理"],"dateAdded":1724876602017,"dateLastUsed":1769993459053},{"id":"s067","title":"失敗しないカルボナーラの作り方","url":"https://www.kurashiru.com/recipes/8e1f4a0d","folderPath":["料理"],"dateAdded":1692783528686},{"id":"s068","title":"土鍋でごはんを炊く","url":"https://delishkitchen.tv/recipes/144033745623975303","folderPath":["料理"],"dateAdded":1715165984819,"dateLastUsed":1769631902222},{"id":"s069","title":"だしの取り方 — 昆布とかつお節","url":"https://www.kikkoman.co.jp/homecook/search/recipe/00001234/","folderPath":["料理"],"dateAdded":1773559802876,"dateLastUsed":1789932202793},{"id":"s070","title":"週末に作りおきできるおかず 10 品","url":"https://www.lettuceclub.net/recipe/","folderPath":["料理"],"dateAdded":1747621079320,"dateLastUsed":1769725406712},{"id":"s071","title":"スパイスから作るチキンカレー","url":"https://www.sbfoods.co.jp/recipe/detail/00003456.html","folderPath":["料理"],"dateAdded":1772224539302},{"id":"s072","title":"パン作りの発酵温度","url":"https://cotta.jp/special/article/?p=12345","folderPath":["料理"],"dateAdded":1752989013646,"dateLastUsed":1789762934481},{"id":"s073","title":"ぬか床の育て方","url":"https://www.hakko-blog.com/nukadoko/","folderPath":["料理"],"dateAdded":1676041620842,"dateLastUsed":1725153684290},{"id":"s074","title":"コーヒーのハンドドリップ入門","url":"https://www.kurasu.kyoto/blogs/journal/hand-drip","folderPath":["料理"],"dateAdded":1768472835979},{"id":"s075","title":"包丁の研ぎ方","url":"https://www.kai-group.com/products/special/knife/sharpen/","folderPath":["料理"],"dateAdded":1767212147765,"dateLastUsed":1778378897279},{"id":"s076","title":"青春18きっぷの使い方","url":"https://www.jr-odekake.net/railroad/ticket/seishun18/","folderPath":["旅行"],"dateAdded":1705282426320,"dateLastUsed":1727903860773},{"id":"s077","title":"屋久島 縄文杉トレッキング","url":"https://yakukan.jp/course/jomonsugi/","folderPath":["旅行"],"dateAdded":1776025079211,"dateLastUsed":1789431649931},{"id":"s078","title":"台北 3 泊 4 日のモデルコース","url":"https://www.taiwan-tourism.jp/model-course/taipei/","folderPath":["旅行"],"dateAdded":1734475601088},{"id":"s079","title":"北海道 道東ドライブ","url":"https://www.visit-eastern-hokkaido.jp/","folderPath":["旅行"],"dateAdded":1674075008033,"dateLastUsed":1699921235264},{"id":"s080","title":"格安航空券の探し方 Skyscanner","url":"https://www.skyscanner.jp/","folderPath":["旅行"],"dateAdded":1758413108018,"dateLastUsed":1790039530794},{"id":"s081","title":"Google マップでマイマップを作る","url":"https://www.google.com/maps/about/mymaps/","folderPath":["旅行"],"dateAdded":1710935416317,"dateLastUsed":1770499220106},{"id":"s082","title":"ヨーロッパ鉄道パス Eurail","url":"https://www.eurail.com/ja","folderPath":["旅行"],"dateAdded":1685627616154,"dateLastUsed":1737577691115},{"id":"s083","title":"御朱印めぐりの作法","url":"https://jinjahoncho.or.jp/goshuin/","folderPath":["旅行"],"dateAdded":1713713288384,"dateLastUsed":1775867553904},{"id":"s084","title":"星がきれいに見える場所 星空指数","url":"https://tenki.jp/indexes/starry_sky/","folderPath":["旅行"],"dateAdded":1721603528792,"dateLastUsed":1766866896912},{"id":"s085","title":"パッキングリストのテンプレート","url":"https://www.notion.so/templates/packing-list","folderPath":["旅行"],"dateAdded":1719107541075,"dateLastUsed":1765148882827},{"id":"s086","title":"Spotify Web Player","url":"https://open.spotify.com/","folderPath":["音楽"],"dateAdded":1723705563099,"dateLastUsed":1779068364058},{"id":"s087","title":"ギターコード辞典","url":"https://www.ufret.jp/","folderPath":["音楽"],"dateAdded":1690379718118,"dateLastUsed":1718826611899},{"id":"s088","title":"音楽理論入門 — ダイアトニックコード","url":"https://soundquest.jp/quest/chord/diatonic/","folderPath":["音楽"],"dateAdded":1693275919209},{"id":"s089","title":"DTM 初心者のためのミックス","url":"https://sleepfreaks-dtm.com/mixing/","folderPath":["音楽"],"dateAdded":1715229353699,"dateLastUsed":1782678851189},{"id":"s090","title":"Ableton Live の使い方","url":"https://www.ableton.com/ja/live/","folderPath":["音楽"],"dateAdded":1745732376883,"dateLastUsed":1778979778655},{"id":"s091","title":"フリー音源 DOVA-SYNDROME","url":"https://dova-s.jp/","folderPath":["音楽"],"dateAdded":1715084183097,"dateLastUsed":1781307889914},{"id":"s092","title":"レコードの手入れと保管","url":"https://www.stereosound.co.jp/analog/care/","folderPath":["音楽"],"dateAdded":1738964154721,"dateLastUsed":1789677835214},{"id":"s093","title":"Bandcamp で音楽を買う","url":"https://bandcamp.com/","folderPath":["音楽"],"dateAdded":1765412918620},{"id":"s094","title":"新NISA の制度をまとめて理解する","url":"https://www.fsa.go.jp/policy/nisa2/about/index.html","folderPath":["お金"],"dateAdded":1745186210651,"dateLastUsed":1785207294300},{"id":"s095","title":"確定申告の手引き（国税庁）","url":"https://www.nta.go.jp/taxes/shiraberu/shinkoku/tebiki/index.htm","folderPath":["お金"],"dateAdded":1737127902293},{"id":"s096","title":"ふるさと納税の仕組み","url":"https://www.furusato-tax.jp/about","folderPath":["お金"],"dateAdded":1714457991196,"dateLastUsed":1790021725686},{"id":"s097","title":"インデックス投資の基本","url":"https://www.rakuten-sec.co.jp/web/learn/index_fund/","folderPath":["お金"],"dateAdded":1764561607640,"dateLastUsed":1772135088567},{"id":"s098","title":"家計簿アプリ マネーフォワード ME","url":"https://moneyforward.com/","folderPath":["お金"],"dateAdded":1660737422045,"dateLastUsed":1724896536998},{"id":"s099","title":"個人事業主の開業届の出し方","url":"https://www.freee.co.jp/kb/kb-kaigyou/kaigyou-todoke/","folderPath":["お金"],"dateAdded":1728162232184,"dateLastUsed":1775684637944},{"id":"s100","title":"住宅ローン 金利の比較","url":"https://www.homes.co.jp/loan/","folderPath":["お金"],"dateAdded":1715885685590,"dateLastUsed":1766976276699},{"id":"s101","title":"年金の受け取り方を考える","url":"https://www.nenkin.go.jp/service/jukyu/","folderPath":["お金"],"dateAdded":1740049317922,"dateLastUsed":1768696952039},{"id":"s102","title":"腰痛を防ぐストレッチ","url":"https://www.tyojyu.or.jp/net/kenkou-tyoju/undou/stretch.html","folderPath":["健康"],"dateAdded":1709165127876,"dateLastUsed":1782787530376},{"id":"s103","title":"睡眠の質を上げる 12 の指針","url":"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000047221.html","folderPath":["健康"],"dateAdded":1726398690219,"dateLastUsed":1783461552313},{"id":"s104","title":"ランニング初心者の走り方","url":"https://runnet.jp/beginner/","folderPath":["健康"],"dateAdded":1700710395447,"dateLastUsed":1771370583911},{"id":"s105","title":"筋トレのメニューの組み方","url":"https://www.myprotein.jp/thezone/training/workout-routine/","folderPath":["健康"],"dateAdded":1771593952775,"dateLastUsed":1789094343214},{"id":"s106","title":"デスクワークの姿勢を直す","url":"https://www.j-ohta.or.jp/posture/","folderPath":["健康"],"dateAdded":1697864626841,"dateLastUsed":1707686179477},{"id":"s107","title":"目の疲れをとる方法","url":"https://www.santen.co.jp/ja/healthcare/eye/eyecare/","folderPath":["健康"],"dateAdded":1767093037573,"dateLastUsed":1789611766394},{"id":"s108","title":"献血の予約","url":"https://www.kenketsu.jp/","folderPath":["健康"],"dateAdded":1720168923124},{"id":"s109","title":"HHKB Professional HYBRID","url":"https://happyhackingkb.com/jp/products/hybrid/","folderPath":["ガジェット"],"dateAdded":1732230831052,"dateLastUsed":1782088244556},{"id":"s110","title":"自作キーボードの始め方","url":"https://salicylic-acid3.hatenablog.com/entry/keyboard-guide","folderPath":["ガジェット"],"dateAdded":1704497925399,"dateLastUsed":1711842096914},{"id":"s111","title":"Raspberry Pi 5 のセットアップ","url":"https://www.raspberrypi.com/documentation/computers/getting-started.html","folderPath":["ガジェット"],"dateAdded":1735941208174,"dateLastUsed":1778355535287},{"id":"s112","title":"M4 MacBook Pro レビュー","url":"https://www.itmedia.co.jp/pcuser/articles/2411/12/news100.html","folderPath":["ガジェット"],"dateAdded":1777504196086},{"id":"s113","title":"電子ペーパー端末の比較","url":"https://www.gizmodo.jp/2024/06/eink-tablet-comparison.html","folderPath":["ガジェット"],"dateAdded":1752854633104,"dateLastUsed":1777417513960},{"id":"s114","title":"モニターアームの選び方","url":"https://www.ergotron.com/ja-jp/monitor-arms","folderPath":["ガジェット"],"dateAdded":1722082190887,"dateLastUsed":1782162900958},{"id":"s115","title":"ノイズキャンセリングイヤホン比較","url":"https://kakaku.com/kaden/earphone/","folderPath":["ガジェット"],"dateAdded":1712714740609,"dateLastUsed":1766703873534},{"id":"s116","title":"Hacker News","url":"https://news.ycombinator.com/","folderPath":["ニュース"],"dateAdded":1785819136672,"dateLastUsed":1790300199277},{"id":"s117","title":"はてなブックマーク - テクノロジー","url":"https://b.hatena.ne.jp/hotentry/it","folderPath":["ニュース"],"dateAdded":1694863742386,"dateLastUsed":1772062559132},{"id":"s118","title":"ITmedia NEWS","url":"https://www.itmedia.co.jp/news/","folderPath":["ニュース"],"dateAdded":1680436793255},{"id":"s119","title":"日経電子版","url":"https://www.nikkei.com/","folderPath":["ニュース"],"dateAdded":1772280280985,"dateLastUsed":1789613826471},{"id":"s120","title":"NHK ニュース","url":"https://www3.nhk.or.jp/news/","folderPath":["ニュース"],"dateAdded":1687989627329,"dateLastUsed":1736976377322},{"id":"s121","title":"TechCrunch","url":"https://techcrunch.com/","folderPath":["ニュース"],"dateAdded":1765842406556,"dateLastUsed":1773087475404},{"id":"s122","title":"宇宙開発ニュース sorae","url":"https://sorae.info/","folderPath":["ニュース"],"dateAdded":1778379249126,"dateLastUsed":1789871758987},{"id":"s123","title":"JAXA | 宇宙航空研究開発機構","url":"https://www.jaxa.jp/","folderPath":["ニュース"],"dateAdded":1723357814732,"dateLastUsed":1781047051637},{"id":"s124","title":"NASA Astronomy Picture of the Day","url":"https://apod.nasa.gov/apod/astropix.html","folderPath":["ニュース"],"dateAdded":1721241214054,"dateLastUsed":1769648932804},{"id":"s125","title":"ゼロから作る Deep Learning のノート","url":"https://zenn.dev/ganariya/articles/deep-learning-from-scratch","folderPath":["あとで読む"],"dateAdded":1736547746932},{"id":"s126","title":"なぜ我々はスタンドアップをするのか","url":"https://martinfowler.com/articles/on-dailies.html","folderPath":["あとで読む"],"dateAdded":1786917329453},{"id":"s127","title":"京都の紅葉の名所 2025","url":"https://kyoto-design.jp/special/momiji","folderPath":["あとで読む"],"dateAdded":1699643721598},{"id":"s128","title":"ブラックホールの写真はどう撮られたか","url":"https://www.natureasia.com/ja-jp/ndigest/v16/n6/","folderPath":["あとで読む"],"dateAdded":1724046709328},{"id":"s129","title":"料理がうまくなる人の共通点","url":"https://note.com/cooking_note/n/n123456789","folderPath":["あとで読む"],"dateAdded":1679520573343},{"id":"s130","title":"個人開発で月 10 万円を目指す","url":"https://zenn.dev/hokuto/articles/indie-dev-revenue","folderPath":["あとで読む"],"dateAdded":1696548214998,"dateLastUsed":1722379536340},{"id":"s131","title":"フェルマー螺旋とひまわりの種","url":"https://ja.wikipedia.org/wiki/%E3%83%95%E3%82%A7%E3%83%AB%E3%83%9E%E3%83%BC%E8%9E%BA%E6%97%8B","folderPath":["あとで読む"],"dateAdded":1678735115749,"dateLastUsed":1699494030031},{"id":"s132","title":"星座の起源と歴史","url":"https://www.nao.ac.jp/astro/basic/constellation.html","folderPath":["あとで読む"],"dateAdded":1743153637265},{"id":"s133","title":"積ん読の心理学","url":"https://gigazine.net/news/20240301-tsundoku/","folderPath":["あとで読む"],"dateAdded":1701911780211,"dateLastUsed":1748219706921},{"id":"s134","title":"英語の多読を続けるコツ","url":"https://note.com/english_reading/n/n987654321","folderPath":["あとで読む"],"dateAdded":1729858609594},{"id":"s135","title":"投資を始める前に読む本 5 冊","url":"https://diamond.jp/articles/-/334455","folderPath":["あとで読む"],"dateAdded":1720091327719},{"id":"s136","title":"ポモドーロ・テクニックの実践","url":"https://francescocirillo.com/products/the-pomodoro-technique","folderPath":["あとで読む"],"dateAdded":1713375467382},{"id":"s137","title":"Google","url":"https://www.google.com/","folderPath":[],"dateAdded":1648541852885,"dateLastUsed":1790206114688},{"id":"s138","title":"GitHub","url":"https://github.com/","folderPath":[],"dateAdded":1597877501338,"dateLastUsed":1790296278422},{"id":"s139","title":"Gmail","url":"https://mail.google.com/","folderPath":[],"dateAdded":1660602816530,"dateLastUsed":1790114715237},{"id":"s140","title":"YouTube","url":"https://www.youtube.com/","folderPath":[],"dateAdded":1608767049047,"dateLastUsed":1790212993279},{"id":"s141","title":"X","url":"https://x.com/home","folderPath":[],"dateAdded":1645655027504,"dateLastUsed":1790194722992},{"id":"s142","title":"Amazon.co.jp","url":"https://www.amazon.co.jp/","folderPath":[],"dateAdded":1672216418193,"dateLastUsed":1790301951233},{"id":"s143","title":"Notion","url":"https://www.notion.so/","folderPath":[],"dateAdded":1624232771658,"dateLastUsed":1790383748816},{"id":"s144","title":"DeepL 翻訳","url":"https://www.deepl.com/ja/translator","folderPath":[],"dateAdded":1679264864901,"dateLastUsed":1790109986482},{"id":"s145","title":"Wikipedia 日本語版","url":"https://ja.wikipedia.org/","folderPath":[],"dateAdded":1635857927466,"dateLastUsed":1790116793780},{"id":"s146","title":"天気予報 - tenki.jp","url":"https://tenki.jp/","folderPath":[],"dateAdded":1633808792236,"dateLastUsed":1790373103842},{"id":"s147","title":"Google カレンダー","url":"https://calendar.google.com/","folderPath":[],"dateAdded":1650576337559,"dateLastUsed":1790028120846},{"id":"s148","title":"乗換案内 - Yahoo!路線情報","url":"https://transit.yahoo.co.jp/","folderPath":[],"dateAdded":1598276267075,"dateLastUsed":1790127361459},{"id":"s149","title":"すばる望遠鏡 - 国立天文台ハワイ観測所","url":"https://subarutelescope.org/jp/","folderPath":["ニュース"],"dateAdded":1712264913059,"dateLastUsed":1771024161630},{"id":"s150","title":"最小全域木（プリム法）の解説","url":"https://qiita.com/drken/items/mst-prim","folderPath":["あとで読む"],"dateAdded":1697113304547},{"id":"s151","title":"ロケット打ち上げ予定 - Next Spaceflight","url":"https://nextspaceflight.com/launches/","folderPath":["ニュース"],"dateAdded":1785827903716},{"id":"s152","title":"今夜の星空 - 国立天文台 ほしぞら情報","url":"https://www.nao.ac.jp/astro/sky/2026/","folderPath":["あとで読む"],"dateAdded":1788142089010,"dateLastUsed":1789427435742},{"id":"s153","title":"プラネタリウム 日本科学未来館","url":"https://www.miraikan.jst.go.jp/exhibitions/dome/","folderPath":["旅行"],"dateAdded":1787126525684,"dateLastUsed":1790119940428},{"id":"s154","title":"星座の見つけ方 - 北斗七星からたどる","url":"https://www.astroarts.co.jp/alacarte/beginner/","folderPath":[],"dateAdded":1788320322172,"dateLastUsed":1788908756913},{"id":"s155","title":"ハッブル宇宙望遠鏡の天体写真ギャラリー","url":"https://hubblesite.org/images/gallery","folderPath":["デザイン"],"dateAdded":1787892121074,"dateLastUsed":1789601124252},{"id":"s156","title":"国際宇宙ステーションの現在位置","url":"https://spotthestation.nasa.gov/","folderPath":[],"dateAdded":1787470263798}]');function wl(){return Pd}function Ho(i){try{return new URL(i).hostname.replace(/^www\./,"")}catch{return""}}const Xa="bukusupe:prefer-sample";function Ld(){try{return localStorage.getItem(Xa)==="1"}catch{return!1}}function Dd(i){try{i?localStorage.setItem(Xa,"1"):localStorage.removeItem(Xa)}catch{}}async function lh(){const i=new URLSearchParams(location.search).get("sample")==="1"||Ld();if(Rd())try{const t=await Cd();return!i&&t.length>0?{kind:"chrome",items:t,chromeCount:t.length}:{kind:"sample",items:wl(),chromeCount:t.length}}catch(t){console.warn("[ブクスペ] ブックマークを読めなかったのでサンプルに切り替える",t)}return{kind:"sample",items:wl(),chromeCount:0}}function Id(){return typeof chrome<"u"&&chrome.runtime?.getURL?chrome.runtime.getURL("ort/"):new URL("./ort/",location.href).href}const ch="Xenova/multilingual-e5-small";class Ud{model=ch;onDownload;worker;waiting=new Map;nextId=1;readyPromise;constructor(){this.worker=new Worker(new URL(""+new URL("assets/embed.worker-6KrfaLy0.js",import.meta.url).href,import.meta.url),{type:"module"});let t,e;this.readyPromise=new Promise((n,s)=>{t=n,e=s}),this.worker.onmessage=n=>{const s=n.data;switch(s.type){case"ready":t();break;case"download":this.onDownload?.(s.file,s.progress);break;case"vectors":{this.waiting.get(s.requestId)?.resolve(s.vectors),this.waiting.delete(s.requestId);break}case"error":{const r=new Error(s.message);s.requestId!=null?(this.waiting.get(s.requestId)?.reject(r),this.waiting.delete(s.requestId)):e(r);break}}},this.worker.onerror=n=>e(new Error(`Worker が落ちた: ${n.message}`)),this.send({type:"init",ortBaseUrl:Id(),model:this.model})}ready(){return this.readyPromise}embed(t){if(t.length===0)return Promise.resolve([]);const e=this.nextId++;return new Promise((n,s)=>{this.waiting.set(e,{resolve:n,reject:s}),this.send({type:"embed",requestId:e,texts:t})})}dispose(){this.worker.terminate();for(const{reject:t}of this.waiting.values())t(new Error("Worker を止めた"));this.waiting.clear()}send(t){this.worker.postMessage(t)}}const ps={"qiita.com":"プログラミング 技術記事","zenn.dev":"プログラミング 技術記事","note.com":"ブログ 記事","hatenablog.com":"ブログ 記事","hatena.ne.jp":"ブログ 記事 ブックマーク","b.hatena.ne.jp":"テクノロジー ニュース ブックマーク","github.com":"ソースコード 開発 リポジトリ","gist.github.com":"ソースコード 断片","gitlab.com":"ソースコード 開発","stackoverflow.com":"プログラミング 質問 回答","developer.mozilla.org":"Web 開発 リファレンス","developer.chrome.com":"Chrome 拡張機能 Web 開発","web.dev":"Web 開発 性能","css-tricks.com":"CSS Web デザイン 開発","caniuse.com":"ブラウザ 対応表 Web 開発","npmjs.com":"JavaScript パッケージ 開発","docs.docker.com":"コンテナ 開発 インフラ","kubernetes.io":"コンテナ インフラ 運用","docs.github.com":"開発 ドキュメント","regex101.com":"正規表現 開発ツール","vim.rtorr.com":"エディタ 開発ツール","code.visualstudio.com":"エディタ 開発ツール","git-scm.com":"バージョン管理 開発","brew.sh":"パッケージ管理 macOS 開発","typescriptlang.org":"TypeScript プログラミング言語","developer.apple.com":"Apple 開発","developer.android.com":"Android 開発","rust-lang.org":"Rust プログラミング言語","doc.rust-jp.rs":"Rust プログラミング言語","gobyexample.com":"Go プログラミング言語","go.dev":"Go プログラミング言語","python.org":"Python プログラミング言語","docs.python.org":"Python プログラミング言語","postgresql.org":"データベース SQL","postgresql.jp":"データベース SQL","redis.io":"データベース キャッシュ","nginx.org":"Web サーバー インフラ","grpc.io":"通信 API 開発","fastapi.tiangolo.com":"Python Web フレームワーク","nextjs.org":"React Web フレームワーク","react.dev":"React フロントエンド","ja.react.dev":"React フロントエンド","vuejs.org":"Vue フロントエンド","ja.vuejs.org":"Vue フロントエンド","svelte.dev":"Svelte フロントエンド","vite.dev":"ビルドツール フロントエンド","tailwindcss.com":"CSS フロントエンド","threejs.org":"3D 描画 WebGL","shadertoy.com":"シェーダー 3D 描画","thebookofshaders.com":"シェーダー 3D 描画","onnxruntime.ai":"機械学習 推論","overreacted.io":"React フロントエンド ブログ","martinfowler.com":"ソフトウェア設計 開発","authlete.com":"認証 セキュリティ","huggingface.co":"機械学習 AI モデル","arxiv.org":"論文 研究","paperswithcode.com":"論文 機械学習","openai.com":"AI 人工知能","anthropic.com":"AI 人工知能","claude.ai":"AI 人工知能 対話","pytorch.org":"機械学習 深層学習","tensorflow.org":"機械学習 深層学習","scikit-learn.org":"機械学習 統計","kaggle.com":"データ分析 機械学習","colab.research.google.com":"データ分析 機械学習 ノートブック","lilianweng.github.io":"機械学習 研究 ブログ","jalammar.github.io":"機械学習 解説 ブログ","promptingguide.ai":"AI プロンプト 生成","figma.com":"デザイン UI","dribbble.com":"デザイン 作品","behance.net":"デザイン 作品","m3.material.io":"デザイン UI 指針","fonts.google.com":"フォント デザイン","coolors.co":"配色 デザイン","lucide.dev":"アイコン デザイン","easings.net":"アニメーション デザイン","unsplash.com":"写真 素材","webaim.org":"アクセシビリティ デザイン","news.ycombinator.com":"テクノロジー ニュース 英語","techcrunch.com":"スタートアップ テクノロジー ニュース","itmedia.co.jp":"テクノロジー ニュース","gigazine.net":"テクノロジー ニュース","gizmodo.jp":"ガジェット テクノロジー ニュース","nikkei.com":"経済 ニュース","nhk.or.jp":"ニュース 報道","asahi.com":"ニュース 報道","yomiuri.co.jp":"ニュース 報道","reddit.com":"掲示板 話題","x.com":"SNS 短文投稿","twitter.com":"SNS 短文投稿","facebook.com":"SNS 交流","instagram.com":"SNS 写真","youtube.com":"動画 視聴","nicovideo.jp":"動画 視聴","wikipedia.org":"百科事典 調べもの","ja.wikipedia.org":"百科事典 調べもの","jaxa.jp":"宇宙 科学 研究","nasa.gov":"宇宙 科学 研究","apod.nasa.gov":"宇宙 天体 写真","stellarium.org":"宇宙 星空 天文","spaceweather.com":"宇宙 天体 観測","sorae.info":"宇宙 科学 ニュース","nao.ac.jp":"天文 宇宙 研究","subarutelescope.org":"天文 宇宙 望遠鏡","natureasia.com":"科学 論文 研究","nextspaceflight.com":"宇宙 ロケット 打ち上げ","hubblesite.org":"宇宙 天体 写真 望遠鏡","spotthestation.nasa.gov":"宇宙 宇宙ステーション 観測","astroarts.co.jp":"天文 星空 星座","miraikan.jst.go.jp":"科学館 展示 宇宙","cookpad.com":"料理 レシピ","kurashiru.com":"料理 レシピ 動画","delishkitchen.tv":"料理 レシピ 動画","kikkoman.co.jp":"料理 レシピ 調味料","sbfoods.co.jp":"料理 レシピ 香辛料","lettuceclub.net":"料理 レシピ 暮らし","cotta.jp":"製菓 製パン 料理","kai-group.com":"調理器具 暮らし","jalan.net":"旅行 宿泊","rurubu.travel":"旅行 観光","skyscanner.jp":"旅行 航空券","booking.com":"旅行 宿泊","airbnb.jp":"旅行 宿泊","tabelog.com":"飲食店 グルメ","google.com/maps":"地図 場所","transit.yahoo.co.jp":"乗換 交通","jr-odekake.net":"鉄道 旅行 切符","eurail.com":"鉄道 旅行 ヨーロッパ","tenki.jp":"天気 予報","open.spotify.com":"音楽 配信","spotify.com":"音楽 配信","bandcamp.com":"音楽 購入","soundcloud.com":"音楽 配信","ufret.jp":"音楽 ギター コード","soundquest.jp":"音楽理論 学習","sleepfreaks-dtm.com":"音楽制作 DTM","ableton.com":"音楽制作 DTM","dova-s.jp":"音楽 素材","nta.go.jp":"税金 確定申告 行政","fsa.go.jp":"金融 制度 行政","mhlw.go.jp":"健康 労働 行政","nenkin.go.jp":"年金 行政","furusato-tax.jp":"ふるさと納税 税金","moneyforward.com":"家計簿 お金","freee.co.jp":"会計 確定申告 お金","rakuten-sec.co.jp":"投資 証券 お金","diamond.jp":"経済 ビジネス 記事","runnet.jp":"ランニング 運動","myprotein.jp":"筋力トレーニング 運動","tyojyu.or.jp":"健康 医療","kenketsu.jp":"献血 医療","santen.co.jp":"目 健康 医療","amazon.co.jp":"買い物 通販","rakuten.co.jp":"買い物 通販","kakaku.com":"価格比較 買い物 家電","mercari.com":"買い物 中古 個人売買","raspberrypi.com":"電子工作 小型計算機","happyhackingkb.com":"キーボード 入力機器","ergotron.com":"モニターアーム 作業環境","notion.so":"メモ 文書 仕事","docs.google.com":"文書 表計算 仕事","drive.google.com":"ファイル 保管 仕事","calendar.google.com":"予定 カレンダー 仕事","mail.google.com":"メール 連絡","slack.com":"連絡 チャット 仕事","deepl.com":"翻訳 言語","figma.io":"デザイン UI"};function hh(i){if(ps[i])return ps[i];const t=i.split(".");for(let e=1;e<t.length-1;e++){const n=t.slice(e).join(".");if(ps[n])return ps[n]}return""}function wr(i){let t;try{t=new URL(i)}catch{return""}let e=t.pathname;try{e=decodeURIComponent(e)}catch{}const n=e.split(/[^\p{L}\p{N}]+/u).filter(s=>s.length>0).filter(s=>!/^\d+$/.test(s)).filter(s=>s.length<=24).filter(s=>!/^[0-9a-f]{12,}$/i.test(s));return[...new Set(n)].slice(0,12).join(" ")}function Vo(i){const t=Ho(i.url),e=hh(t),n=[t,e,wr(i.url)].filter(Boolean).join(" "),s=i.folderPath.join(" / ");return`passage: ${i.title} | ${s} | ${n}`}function dh(i){return`query: ${i}`}function uh(i){let t=2166136261;for(let e=0;e<i.length;e++)t^=i.charCodeAt(e),t=Math.imul(t,16777619)>>>0;return t.toString(16)}function fh(i,t){let e=2166136261;for(let r=0;r<i.length;r++)e^=i.charCodeAt(r),e=Math.imul(e,16777619)>>>0;const n=e%3600/3600*Math.PI*2,s=(e>>>12)%1e3/1e3*t*.25;return{dx:Math.cos(n)*s,dy:Math.sin(n)*s}}function Nd(i){let t=i>>>0||1;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}const Tl=20260926;function Qi(i){const t=i[0]?.length??0,e=new Float32Array(t);if(i.length===0)return e;for(const n of i)for(let s=0;s<t;s++)e[s]+=n[s];for(let n=0;n<t;n++)e[n]/=i.length;return e}function Tr(i,t){const e=new Float32Array(i.length);let n=0;for(let r=0;r<i.length;r++){const a=i[r]-t[r];e[r]=a,n+=a*a}const s=Math.sqrt(n);if(s<1e-8)return i.slice();for(let r=0;r<e.length;r++)e[r]/=s;return e}function bn(i,t){let e=0;for(let n=0;n<i.length;n++)e+=i[n]*t[n];return e}function Ar(i){const t=Qi(i);let e=0;for(const s of t)e+=s*s;const n=Math.sqrt(e);if(n>1e-8)for(let s=0;s<t.length;s++)t[s]/=n;return t}function ph(i){if(i.length===0)return[];const t=Qi(i);return i.map(e=>bn(e,t))}function mh(i){if(i.length===0)return[];const t=i.reduce((s,r)=>s+r,0)/i.length,e=i.reduce((s,r)=>s+(r-t)**2,0)/i.length,n=Math.sqrt(e);return n<1e-9?i.map(()=>0):i.map(s=>(s-t)/n)}function Fd(i){return i<12?1:Math.min(20,Math.max(3,Math.round(Math.sqrt(i/2))))}const Jr=(i,t)=>1-bn(i,t);function gh(i,t,e,n=50){const s=i.length;if(s===0)return{assignments:[],centroids:[]};if(t<=1||s<=t)return t<=1?{assignments:new Array(s).fill(0),centroids:[Ar(i)]}:{assignments:i.map((c,u)=>u),centroids:i.map(c=>c.slice())};const r=Nd(e),a=[i[Math.min(s-1,Math.floor(r()*s))].slice()],o=new Float64Array(s).fill(1/0);for(;a.length<t;){const c=a[a.length-1];let u=0;for(let f=0;f<s;f++){const m=Jr(i[f],c);m<o[f]&&(o[f]=m),u+=o[f]*o[f]}let h=r()*u,d=s-1;for(let f=0;f<s;f++)if(h-=o[f]*o[f],h<=0){d=f;break}a.push(i[d].slice())}const l=new Array(s).fill(-1);for(let c=0;c<n;c++){let u=!1;for(let h=0;h<s;h++){let d=0,f=1/0;for(let m=0;m<a.length;m++){const _=Jr(i[h],a[m]);_<f-1e-12&&(f=_,d=m)}l[h]!==d&&(l[h]=d,u=!0)}for(let h=0;h<a.length;h++){if(l.includes(h))continue;let d=0,f=-1;for(let m=0;m<s;m++){const _=Jr(i[m],a[l[m]]);_>f+1e-12&&(f=_,d=m)}l[d]=h,u=!0}for(let h=0;h<a.length;h++){const d=i.filter((f,m)=>l[m]===h);d.length>0&&(a[h]=Ar(d))}if(!u)break}return{assignments:l,centroids:a}}const _h={開発:"3D API Android Apple CSS Chrome Go JavaScript Python React Rust SQL Svelte TypeScript Vue Web WebGL macOS インフラ エディタ キャッシュ コンテナ サーバー シェーダー セキュリティ ソフトウェア設計 ソースコード テクノロジー データベース ドキュメント ノートブック バージョン管理 パッケージ パッケージ管理 ビルドツール フレームワーク フロントエンド ブラウザ プログラミング プログラミング言語 リファレンス リポジトリ 推論 拡張機能 描画 正規表現 認証 通信 運用 開発 開発ツール 電子工作 小型計算機 性能 対応表 断片",AI:"AI 人工知能 機械学習 深層学習 プロンプト モデル 生成 データ分析 統計",デザイン:"UI アイコン アクセシビリティ アニメーション デザイン フォント 作品 配色 指針",ニュース:"SNS ガジェット スタートアップ ニュース ビジネス ブックマーク ブログ 交流 写真 動画 報道 掲示板 短文投稿 視聴 記事 話題 百科事典 質問 回答 調べもの 解説 技術記事",宇宙:"ロケット 天体 天文 宇宙 宇宙ステーション 打ち上げ 星空 星座 望遠鏡 観測",科学:"研究 科学 科学館 論文 展示 学習",料理:"グルメ レシピ 料理 製パン 製菓 調味料 調理器具 飲食店 香辛料",旅行:"ヨーロッパ 乗換 交通 地図 場所 宿泊 旅行 切符 航空券 観光 鉄道",音楽:"DTM ギター コード 配信 音楽 音楽制作 音楽理論 購入 素材",お金:"お金 ふるさと納税 会計 価格比較 制度 家計簿 年金 投資 確定申告 税金 経済 行政 証券 金融",健康:"ランニング 健康 労働 医療 献血 目 筋力トレーニング 運動",暮らし:"カレンダー メモ モニターアーム 予報 予定 仕事 作業環境 保管 天気 家電 暮らし 翻訳 英語 言語 連絡",買い物:"中古 個人売買 買い物 通販 キーボード 入力機器",文書:"ファイル 文書 表計算",対話:"チャット メール 対話"},Rr=new Map;for(const[i,t]of Object.entries(_h))for(const e of t.split(" ")){if(Rr.has(e))throw new Error(`分野語の大分類が重複: ${e}`);Rr.set(e,i)}const xh=[...new Set(Object.keys(_h))].sort((i,t)=>t.length-i.length||i.localeCompare(t));function Od(i){return Rr.get(i)}for(const i of new Set(Object.values(ps).flatMap(t=>t.split(/\s+/).filter(Boolean))))if(!Rr.has(i))throw new Error(`分野語に大分類がない: ${i}`);const Bd=4,kd=2,zd=new Set(["あとで読む","あとでよむ","後で読む","後でよむ","その他","未分類","未整理","雑","ブックマーク バー","ブックマークバー","お気に入り","その他のブックマーク","モバイルのブックマーク","同期したタブ","新しいフォルダ","Bookmarks bar","Bookmarks Bar","Other bookmarks","Other Bookmarks","Mobile bookmarks","Reading list","Read later","Unsorted","Misc","New folder"]);function Go(i){const t=new Map;for(const e of i)e&&t.set(e,(t.get(e)??0)+1);return[...t].map(([e,n])=>({key:e,n})).sort((e,n)=>n.n-e.n||(e.key<n.key?-1:1))}const Hd=i=>Go(i.map(t=>t.folderPath.at(-1)??"").filter(t=>!zd.has(t)&&xh.includes(t)));function vh(i){const t=hh(Ho(i.url)).split(/\s+/).map(Od).filter(n=>!!n),e=xh.filter(n=>i.title.includes(n));return[...new Set([...t,...e])]}const Al=i=>Go(i.flatMap(vh));function yh(i){const t=i.map((n,s)=>{if(n.length===0)return`無名の星団 ${s+1}`;const r=n.slice(0,Bd),a=Go(r.flatMap(vh)).filter(h=>h.n>=kd);if(a[0])return a[0].key;const o=Hd(n),[l,c]=o;if(l){const h=l.n/n.length;if(h>=.5)return l.key;if(c&&c.n>=l.n*.6)return`${l.key}・${c.key}`;if(h>=.3)return l.key}const u=Al(n)[0];return u?u.key:`無名の星団 ${s+1}`}),e=new Map;t.forEach((n,s)=>{const r=e.get(n);r?r.push(s):e.set(n,[s])});for(const[,n]of e)if(!(n.length<2))for(const s of n){const r=Al(i[s]).filter(a=>!t[s].includes(a.key));t[s]=r[1]?`${t[s]}・${r[1].key}`:r[0]?`${t[s]}・${r[0].key}`:`${t[s]} ${s+1}`}return t}const Rl=5,Cl=i=>{if(i.length===0)return 0;const t=[...i].sort((n,s)=>n-s),e=t.length>>1;return t.length%2?t[e]:(t[e-1]+t[e])/2},Fs=(i,t)=>{const e=Array.from({length:t},()=>[]);return i.forEach((n,s)=>e[n]?.push(s)),e},Vd=(i,t,e)=>i.length===0?1:i.reduce((n,s)=>n+bn(t[s],e),0)/i.length;function Gd(i,t,e){const n=i.length>=12?3:1;let s=[...t.assignments],r=t.centroids.map(c=>new Float32Array(c));{const c=Fs(s,r.length),u=c.map(m=>m.length),h=c.map((m,_)=>Vd(m,i,r[_])),d=Cl(u.filter(m=>m>0))*2,f=Cl(h.filter((m,_)=>u[_]>0));c.forEach((m,_)=>{if(m.length<Rl*2||m.length<=d||h[_]>=f)return;const g=gh(m.map(b=>i[b]),2,e+_*7919),p=r.length;let S=0;m.forEach((b,v)=>{g.assignments[v]===1&&(s[b]=p,S++)}),!(S===0||S===m.length)&&(r.push(g.centroids[1]),r[_]=g.centroids[0])})}for(let c=0;c<50;c++){const h=Fs(s,r.length).map((_,g)=>({c:g,n:_.length})).filter(_=>_.n>0);if(h.length<=Math.max(1,n))break;const d=h.filter(_=>_.n<Rl).sort((_,g)=>_.n-g.n||_.c-g.c)[0];if(!d)break;let f=-1,m=-1/0;for(const _ of h){if(_.c===d.c)continue;const g=bn(r[d.c],r[_.c]);g>m+1e-12&&(m=g,f=_.c)}if(f<0)break;s=s.map(_=>_===d.c?f:_),r[f]=Ar(Fs(s,r.length)[f].map(_=>i[_]))}const a=[...new Set(s)].sort((c,u)=>c-u),o=new Map(a.map((c,u)=>[c,u]));return s=s.map(c=>o.get(c)),r=Fs(s,a.length).map(c=>Ar(c.map(u=>i[u]))),{assignments:s,centroids:r}}function Wd(i,t,e,n=600){const s=i.map(l=>({x:l.x,y:l.y})),r=s.length;if(r<=1)return s.map(()=>({x:0,y:0}));for(let l=0;l<n;l++){let c=0;for(let u=0;u<r;u++)for(let h=u+1;h<r;h++){const d=s[h].x-s[u].x,f=s[h].y-s[u].y;let m=Math.hypot(d,f);const _=t[u]+t[h]+e;if(m>=_)continue;let g,p;if(m<1e-6){const b=(u*97+h*31)%360*(Math.PI/180);g=Math.cos(b),p=Math.sin(b),m=1e-6}else g=d/m,p=f/m;const S=(_-m)/2;s[u].x-=g*S,s[u].y-=p*S,s[h].x+=g*S,s[h].y+=p*S,c+=S}for(const u of s)u.x*=.998,u.y*=.998;if(c<1e-4&&l>50)break}const a=s.reduce((l,c)=>l+c.x,0)/r,o=s.reduce((l,c)=>l+c.y,0)/r;return s.map(l=>({x:l.x-a,y:l.y-o}))}function Xd(i){const t=i.length;if(t===0)return[];if(t===1)return[{x:0,y:0}];const e=i[0].length,n=Qi(i),s=i.map(o=>{const l=new Float64Array(e);for(let c=0;c<e;c++)l[c]=o[c]-n[c];return l}),r=Pl(s,e,null),a=Pl(s,e,r);return s.map(o=>({x:Cr(o,r),y:Cr(o,a)}))}const Cr=(i,t)=>{let e=0;for(let n=0;n<i.length;n++)e+=i[n]*t[n];return e};function Pl(i,t,e){let n=new Float64Array(t);for(let r=0;r<t;r++)n[r]=Math.sin(r+1);Ll(n);for(let r=0;r<80;r++){const a=new Float64Array(t);for(const o of i){const l=Cr(o,n);for(let c=0;c<t;c++)a[c]+=l*o[c]}if(e){const o=Cr(a,e);for(let l=0;l<t;l++)a[l]-=o*e[l]}if(!Ll(a))break;n=a}let s=0;for(let r=1;r<t;r++)Math.abs(n[r])>Math.abs(n[s])&&(s=r);if(n[s]<0)for(let r=0;r<t;r++)n[r]=-n[r];return n}function Ll(i){let t=0;for(const n of i)t+=n*n;const e=Math.sqrt(t);if(e<1e-12)return!1;for(let n=0;n<i.length;n++)i[n]/=e;return!0}const Mh=Math.PI*(3-Math.sqrt(5));function Wo(i,t){const e=t*Math.sqrt(i+.5),n=i*Mh;return{x:Math.cos(n)*e,y:Math.sin(n)*e}}function Sh(i,t){return i<=0?0:t*Math.sqrt(i-.5)}const Pr=3,qe=2,jd=qe*3.2,Yd=.3,qd=4,Kd=1.5;function Lr(i,t,e){const n=i.filter(w=>t.has(w.id)),s=n.length;if(s===0)return{version:Pr,spacing:qe,stars:[],clusters:[]};const r=n.map(w=>Tr(t.get(w.id),e)),a=mh(ph(n.map(w=>t.get(w.id)))),o=Fd(s),{assignments:l,centroids:c}=Gd(r,gh(r,o,Tl),Tl),u=c.map(()=>[]);l.forEach((w,A)=>u[w].push(A));const h=u.map(w=>qe*Math.sqrt(w.length)*1.1),d=Xd(c),f=Math.max(1e-6,...d.map(w=>Math.hypot(w.x,w.y))),m=1.6*Math.sqrt(h.reduce((w,A)=>w+A*A,0)),_=d.map(w=>({x:w.x/f*m,y:w.y/f*m})),g=Wd(_,h,jd),p=[],S=[],b=u.map((w,A)=>C(w,A)),v=yh(b.map(w=>w.map(A=>n[A])));function C(w,A){const D=y=>{const L=bn(r[y],c[A]);let U=-1/0;for(let H=0;H<c.length;H++)H!==A&&(U=Math.max(U,bn(r[y],c[H])));U===-1/0&&(U=0);const z=n[y].title.trim().length<qd||a[y]>Kd;return L-U-Yd*a[y]-(z?1e3:0)},E=new Map(w.map(y=>[y,D(y)]));return[...w].sort((y,L)=>{const U=E.get(L)-E.get(y);return Math.abs(U)>1e-9?U:n[y].id<n[L].id?-1:1})}return b.forEach((w,A)=>{w.forEach((D,E)=>{const y=Wo(E,qe),L=fh(n[D].id,qe);p.push({id:n[D].id,x:g[A].x+y.x+L.dx,y:g[A].y+y.y+L.dy,cluster:A,rank:E})}),S.push({index:A,name:v[A],x:g[A].x,y:g[A].y,radius:Math.max(h[A],Sh(w.length,qe)+qe*.5),count:w.length,centroid:c[A],nextIndex:w.length})}),p.sort((w,A)=>w.cluster-A.cluster||w.rank-A.rank),{version:Pr,spacing:qe,stars:p,clusters:S}}function Eh(i,t,e,n){if(i.clusters.length===0)return i;const s=Tr(e,n);let r=0,a=-1/0;for(const d of i.clusters){const f=bn(s,d.centroid);f>a+1e-12&&(a=f,r=d.index)}const o=i.clusters[r],l=o.nextIndex,c=Wo(l,i.spacing),u=fh(t,i.spacing),h={id:t,x:o.x+c.x+u.dx,y:o.y+c.y+u.dy,cluster:r,rank:l};return{...i,stars:[...i.stars,h],clusters:i.clusters.map(d=>d.index===r?{...d,nextIndex:l+1,count:d.count+1,radius:Math.max(d.radius,Math.hypot(c.x,c.y)+i.spacing*.5)}:d)}}function $d(i,t){const e=i.stars.filter(s=>t.has(s.id));if(e.length===i.stars.length)return i;const n=new Map;for(const s of e)n.set(s.cluster,(n.get(s.cluster)??0)+1);return{...i,stars:e,clusters:i.clusters.map(s=>({...s,count:n.get(s.index)??0}))}}function bh(i){let t=10;for(const e of i.stars)t=Math.max(t,Math.hypot(e.x,e.y));return t}const Qr=i=>{const t=new Uint8Array(i.buffer,i.byteOffset,i.byteLength);let e="";for(let n=0;n<t.length;n+=32768)e+=String.fromCharCode(...t.subarray(n,n+32768));return btoa(e)};function Zd(i,t,e){const n=i.map(o=>o.id).filter(o=>e.vectors.has(o)),s=new Map(i.map(o=>[o.id,o])),r=e.mean.length,a=new Float32Array(n.length*r);return n.forEach((o,l)=>a.set(e.vectors.get(o),l*r)),{model:t,layoutVersion:e.layout.version,ids:n,hashes:n.map(o=>uh(Vo(s.get(o)))),vectors:Qr(a),mean:Qr(e.mean),generality:n.map(o=>e.generality.get(o)??0),layout:{...e.layout,clusters:e.layout.clusters.map(o=>({...o,centroid:Qr(o.centroid)}))}}}let Dr=null;const Jd=2,zn="embeddings",ji="meta",Hn="constellations";let Bi=null;function Qd(i){const t=`bukusupe-${i}`;if(Bi&&t!==Dr)throw new Error("DB を開いた後にデータ源は変えられない");Dr=t}function Wn(){if(Bi)return Bi;if(!Dr)throw new Error("useDataSource() より先に DB を開こうとした");const i=Dr;return Bi=new Promise((t,e)=>{const n=indexedDB.open(i,Jd);n.onupgradeneeded=()=>{const s=n.result;s.objectStoreNames.contains(zn)||s.createObjectStore(zn,{keyPath:"id"}),s.objectStoreNames.contains(ji)||s.createObjectStore(ji,{keyPath:"key"}),s.objectStoreNames.contains(Hn)||s.createObjectStore(Hn,{keyPath:"id"})},n.onblocked=()=>{console.warn("[ブクスペ] 古いタブが DB を開いたままのため、閉じられるのを待っている"),wh?.()},n.onsuccess=()=>{const s=n.result;s.onversionchange=()=>{s.close(),Bi=null,location.reload()},t(s)},n.onerror=()=>e(n.error)}),Bi}let wh=null;function tu(i){wh=i}const Ps=i=>new Promise((t,e)=>{i.oncomplete=()=>t(),i.onerror=()=>e(i.error),i.onabort=()=>e(i.error)});async function eu(){const e=(await Wn()).transaction(zn,"readonly").objectStore(zn).getAll(),n=await new Promise((s,r)=>{e.onsuccess=()=>s(e.result),e.onerror=()=>r(e.error)});return new Map(n.map(s=>[s.id,s]))}async function nu(i){if(i.length===0)return;const e=(await Wn()).transaction(zn,"readwrite"),n=e.objectStore(zn);for(const s of i)n.put(s);await Ps(e)}async function Dl(i){if(i.length===0)return;const e=(await Wn()).transaction(zn,"readwrite"),n=e.objectStore(zn);for(const s of i)n.delete(s);await Ps(e)}async function Xo(i){const n=(await Wn()).transaction(ji,"readonly").objectStore(ji).get(i);return(await new Promise((r,a)=>{n.onsuccess=()=>r(n.result),n.onerror=()=>a(n.error)}))?.value}async function oi(i,t){const n=(await Wn()).transaction(ji,"readwrite");n.objectStore(ji).put({key:i,value:t}),await Ps(n)}async function iu(){const e=(await Wn()).transaction(Hn,"readonly").objectStore(Hn).getAll();return new Promise((n,s)=>{e.onsuccess=()=>n(e.result),e.onerror=()=>s(e.error)})}async function Xr(i){const e=(await Wn()).transaction(Hn,"readwrite");e.objectStore(Hn).put(i),await Ps(e)}async function su(i){const e=(await Wn()).transaction(Hn,"readwrite");e.objectStore(Hn).delete(i),await Ps(e)}const Il=16,Ul="embedding-model";async function ru(i,t,e){const n=await eu(),s=await Xo(Ul);s!==void 0&&s!==t.model&&n.clear();const a=new Map(i.map(f=>[f.id,Vo(f)])),o=new Map([...a].map(([f,m])=>[f,uh(m)])),l=i.filter(f=>n.get(f.id)?.hash!==o.get(f.id)),c=new Map;for(const f of i){const m=n.get(f.id);m&&m.hash===o.get(f.id)&&c.set(f.id,m.vec)}const u=new Set(i.map(f=>f.id)),h=[...n.keys()].filter(f=>!u.has(f));if(l.length===0)return h.length&&await Dl(h),e({phase:"done",total:c.size}),c;t.onDownload=(f,m)=>e({phase:"model",percent:m,file:f}),await t.ready();let d=0;e({phase:"embed",done:0,total:l.length});for(let f=0;f<l.length;f+=Il){const m=l.slice(f,f+Il),_=await t.embed(m.map(p=>a.get(p.id))),g=m.map((p,S)=>({id:p.id,hash:o.get(p.id),vec:_[S]}));await nu(g);for(const p of g)c.set(p.id,p.vec);d+=m.length,e({phase:"embed",done:d,total:l.length})}return h.length&&await Dl(h),await oi(Ul,t.model),e({phase:"done",total:c.size}),c}function au(i){const t=new Map;for(const r of i){const a=r.folderPath[0]??Ho(r.url)??"その他",o=t.get(a);o?o.push(r):t.set(a,[r])}const e=[...t.entries()].sort((r,a)=>a[1].length-r[1].length||(r[0]<a[0]?-1:1)),n=[],s=[];return e.forEach(([r,a],o)=>{const l=o*Mh,c=o===0?0:13*Math.sqrt(o)+8,u=Math.cos(l)*c,h=Math.sin(l)*c;a.forEach((d,f)=>{const m=Wo(f,qe);n.push({id:d.id,x:u+m.x,y:h+m.y,cluster:o,rank:f})}),s.push({index:o,name:r,x:u,y:h,radius:Sh(a.length,qe)+qe*.5,count:a.length,centroid:new Float32Array(0),nextIndex:a.length})}),{version:Pr,spacing:qe,stars:n,clusters:s}}function Th(i){const t=[...i].sort((s,r)=>s.id.localeCompare(r.id));if(t.length<2)return[];const e=new Set([t[0].id]),n=[];for(;e.size<t.length;){let s=null;for(const r of t)if(e.has(r.id))for(const a of t){if(e.has(a.id))continue;const o=(r.x-a.x)**2+(r.y-a.y)**2;(!s||o<s.distance||o===s.distance&&(r.id<s.a||r.id===s.a&&a.id<s.b))&&(s={a:r.id,b:a.id,distance:o})}if(!s)break;n.push({a:s.a,b:s.b}),e.add(s.b)}return n}function li(i,t){const e=new Set(t);return i?.stars.filter(n=>e.has(n.id)).map(({id:n,x:s,y:r})=>({id:n,x:s,y:r})).sort((n,s)=>n.id.localeCompare(s.id))??[]}function Ah(i,t,e){const n=new Set(e);return[...new Set([...t,...i.slice(0,12).filter(s=>!n.has(s))])]}const Ir=.03,Ur=.5,jo=.85;function ou(i,t){const e=t.trim().toLocaleLowerCase();if(!e)return 0;const n=i.title.toLocaleLowerCase();return n===e?1:n.startsWith(e)?.9:n.includes(e)?.7:i.url.toLocaleLowerCase().includes(e)||i.folderPath.join("/").toLocaleLowerCase().includes(e)?.5:0}function lu(i){return i.title.trim().length<=3&&i.folderPath.length===0&&(!wr(i.url)||wr(i.url)==="home")}function cu(i){const t=wr(i.url);return i.folderPath.length===0&&(!t||t==="home")}function hu(i,t,e,n,s,r=Ir,a,o=Ur){const l=Tr(i,n),c=new Map(a?.stars.map(m=>[m.id,m.cluster])??[]),u=new Map(a?.clusters.map(m=>[m.index,bn(l,m.centroid)])??[]),h=t.flatMap(m=>{const _=e.get(m.id);if(!_)return[];const g=Tr(_,n),p=r*Math.max(0,s.get(m.id)??0),S=lu(m)?.2:0,b=cu(m)?.16:0,v=o*Math.max(0,u.get(c.get(m.id)??-1)??0);return[{id:m.id,value:bn(l,g)-p-S-b+v}]});if(!h.length)return new Map;const d=h.reduce((m,_)=>m+_.value,0)/h.length,f=Math.sqrt(h.reduce((m,_)=>m+(_.value-d)**2,0)/h.length)||1;return new Map(h.map(({id:m,value:_})=>[m,.89/(1+Math.exp(-(_-d)/f))]))}function Nr(i,t,e=new Map){return i.map(n=>{const s=ou(n,t),r=e.get(n.id)??0;return{id:n.id,title:n.title,score:Math.max(s,r),lexical:s,semantic:r}}).filter(n=>n.score>0).sort((n,s)=>s.score-n.score||s.lexical-n.lexical||n.id.localeCompare(s.id))}function du(i,t=Date.now()){if(!i.dateLastUsed)return .55;const e=(t-i.dateLastUsed)/864e5;return e<=7?1:e>=365?.35:1-.65*((Math.log(e)-Math.log(7))/(Math.log(365)-Math.log(7)))}const Yo="180",Mn={ROTATE:0,DOLLY:1,PAN:2},cn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},uu=0,Nl=1,fu=2,Rh=1,pu=2,yn=3,Vn=0,Oe=1,Ue=2,On=0,Hi=1,ci=2,Fl=3,Ol=4,mu=5,ei=100,gu=101,_u=102,xu=103,vu=104,yu=200,Mu=201,Su=202,Eu=203,ja=204,Ya=205,bu=206,wu=207,Tu=208,Au=209,Ru=210,Cu=211,Pu=212,Lu=213,Du=214,qa=0,Ka=1,$a=2,Yi=3,Za=4,Ja=5,Qa=6,to=7,Ch=0,Iu=1,Uu=2,Bn=0,Nu=1,Fu=2,Ou=3,Bu=4,ku=5,zu=6,Hu=7,Ph=300,qi=301,Ki=302,eo=303,no=304,jr=306,io=1e3,si=1001,so=1002,Ge=1003,Vu=1004,Os=1005,hn=1006,ta=1007,ri=1008,wn=1009,Lh=1010,Dh=1011,ys=1012,qo=1013,hi=1014,dn=1015,Ls=1016,Ko=1017,$o=1018,Ms=1020,Ih=35902,Uh=35899,Nh=1021,Fh=1022,rn=1023,Ss=1026,Es=1027,Zo=1028,Jo=1029,Oh=1030,Qo=1031,tl=1033,xr=33776,vr=33777,yr=33778,Mr=33779,ro=35840,ao=35841,oo=35842,lo=35843,co=36196,ho=37492,uo=37496,fo=37808,po=37809,mo=37810,go=37811,_o=37812,xo=37813,vo=37814,yo=37815,Mo=37816,So=37817,Eo=37818,bo=37819,wo=37820,To=37821,Ao=36492,Ro=36494,Co=36495,Po=36283,Lo=36284,Do=36285,Io=36286,Gu=3200,Wu=3201,Xu=0,ju=1,Un="",Ke="srgb",$i="srgb-linear",Fr="linear",Qt="srgb",_i=7680,Bl=519,Yu=512,qu=513,Ku=514,Bh=515,$u=516,Zu=517,Ju=518,Qu=519,Uo=35044,ea=35048,kl="300 es",un=2e3,Or=2001;class ui{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Re=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let zl=1234567;const Vi=Math.PI/180,bs=180/Math.PI;function Sn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Re[i&255]+Re[i>>8&255]+Re[i>>16&255]+Re[i>>24&255]+"-"+Re[t&255]+Re[t>>8&255]+"-"+Re[t>>16&15|64]+Re[t>>24&255]+"-"+Re[e&63|128]+Re[e>>8&255]+"-"+Re[e>>16&255]+Re[e>>24&255]+Re[n&255]+Re[n>>8&255]+Re[n>>16&255]+Re[n>>24&255]).toLowerCase()}function zt(i,t,e){return Math.max(t,Math.min(e,i))}function el(i,t){return(i%t+t)%t}function tf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function ef(i,t,e){return i!==t?(e-i)/(t-i):0}function gs(i,t,e){return(1-e)*i+e*t}function nf(i,t,e,n){return gs(i,t,1-Math.exp(-e*n))}function sf(i,t=1){return t-Math.abs(el(i,t*2)-t)}function rf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function af(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function of(i,t){return i+Math.floor(Math.random()*(t-i+1))}function lf(i,t){return i+Math.random()*(t-i)}function cf(i){return i*(.5-Math.random())}function hf(i){i!==void 0&&(zl=i);let t=zl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function df(i){return i*Vi}function uf(i){return i*bs}function ff(i){return(i&i-1)===0&&i!==0}function pf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function mf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function gf(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),u=a((t+n)/2),h=r((t-n)/2),d=a((t-n)/2),f=r((n-t)/2),m=a((n-t)/2);switch(s){case"XYX":i.set(o*u,l*h,l*d,o*c);break;case"YZY":i.set(l*d,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*d,o*u,o*c);break;case"XZX":i.set(o*u,l*m,l*f,o*c);break;case"YXY":i.set(l*f,o*u,l*m,o*c);break;case"ZYZ":i.set(l*m,l*f,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function sn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function $t(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const pe={DEG2RAD:Vi,RAD2DEG:bs,generateUUID:Sn,clamp:zt,euclideanModulo:el,mapLinear:tf,inverseLerp:ef,lerp:gs,damp:nf,pingpong:sf,smoothstep:rf,smootherstep:af,randInt:of,randFloat:lf,randFloatSpread:cf,seededRandom:hf,degToRad:df,radToDeg:uf,isPowerOfTwo:ff,ceilPowerOfTwo:pf,floorPowerOfTwo:mf,setQuaternionFromProperEuler:gf,normalize:$t,denormalize:sn};class dt{constructor(t=0,e=0){dt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3];const d=r[a+0],f=r[a+1],m=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=_;return}if(h!==_||l!==d||c!==f||u!==m){let g=1-o;const p=l*d+c*f+u*m+h*_,S=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const C=Math.sqrt(b),w=Math.atan2(C,p*S);g=Math.sin(g*w)/C,o=Math.sin(o*w)/C}const v=o*S;if(l=l*g+d*v,c=c*g+f*v,u=u*g+m*v,h=h*g+_*v,g===1-o){const C=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=C,c*=C,u*=C,h*=C}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[a],d=r[a+1],f=r[a+2],m=r[a+3];return t[e]=o*m+u*h+l*f-c*d,t[e+1]=l*m+u*d+c*h-o*f,t[e+2]=c*m+u*f+o*d-l*h,t[e+3]=u*m-o*h-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),h=o(r/2),d=l(n/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"YZX":this._x=d*u*h+c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h-d*f*m;break;case"XZY":this._x=d*u*h-c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],h=e[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(zt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-e)*u)/c,d=Math.sin(e*u)/c;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(t=0,e=0,n=0){R.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Hl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Hl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),u=2*(o*e-r*s),h=2*(r*n-a*e);return this.x=e+l*c+a*h-o*u,this.y=n+l*u+o*c-r*h,this.z=s+l*h+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this.z=zt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this.z=zt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return na.copy(this).projectOnVector(t),this.sub(na)}reflect(t){return this.sub(na.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const na=new R,Hl=new Gn;class Ft{constructor(t,e,n,s,r,a,o,l,c){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],m=n[8],_=s[0],g=s[3],p=s[6],S=s[1],b=s[4],v=s[7],C=s[2],w=s[5],A=s[8];return r[0]=a*_+o*S+l*C,r[3]=a*g+o*b+l*w,r[6]=a*p+o*v+l*A,r[1]=c*_+u*S+h*C,r[4]=c*g+u*b+h*w,r[7]=c*p+u*v+h*A,r[2]=d*_+f*S+m*C,r[5]=d*g+f*b+m*w,r[8]=d*p+f*v+m*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=u*a-o*c,d=o*l-u*r,f=c*r-a*l,m=e*h+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return t[0]=h*_,t[1]=(s*c-u*n)*_,t[2]=(o*n-s*a)*_,t[3]=d*_,t[4]=(u*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ia.makeScale(t,e)),this}rotate(t){return this.premultiply(ia.makeRotation(-t)),this}translate(t,e){return this.premultiply(ia.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ia=new Ft;function kh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Br(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function _f(){const i=Br("canvas");return i.style.display="block",i}const Vl={};function ws(i){i in Vl||(Vl[i]=!0,console.warn(i))}function xf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Gl=new Ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wl=new Ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vf(){const i={enabled:!0,workingColorSpace:$i,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Qt&&(s.r=En(s.r),s.g=En(s.g),s.b=En(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qt&&(s.r=Gi(s.r),s.g=Gi(s.g),s.b=Gi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Un?Fr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ws("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ws("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[$i]:{primaries:t,whitePoint:n,transfer:Fr,toXYZ:Gl,fromXYZ:Wl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ke},outputColorSpaceConfig:{drawingBufferColorSpace:Ke}},[Ke]:{primaries:t,whitePoint:n,transfer:Qt,toXYZ:Gl,fromXYZ:Wl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ke}}}),i}const Xt=vf();function En(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Gi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let xi;class yf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{xi===void 0&&(xi=Br("canvas")),xi.width=t.width,xi.height=t.height;const s=xi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=xi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Br("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=En(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(En(e[n]/255)*255):e[n]=En(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Mf=0;class nl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=Sn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(sa(s[a].image)):r.push(sa(s[a]))}else r=sa(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function sa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?yf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Sf=0;const ra=new R;class Pe extends ui{constructor(t=Pe.DEFAULT_IMAGE,e=Pe.DEFAULT_MAPPING,n=si,s=si,r=hn,a=ri,o=rn,l=wn,c=Pe.DEFAULT_ANISOTROPY,u=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=Sn(),this.name="",this.source=new nl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new dt(0,0),this.repeat=new dt(1,1),this.center=new dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ra).x}get height(){return this.source.getSize(ra).y}get depth(){return this.source.getSize(ra).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ph)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case io:t.x=t.x-Math.floor(t.x);break;case si:t.x=t.x<0?0:1;break;case so:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case io:t.y=t.y-Math.floor(t.y);break;case si:t.y=t.y<0?0:1;break;case so:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Pe.DEFAULT_IMAGE=null;Pe.DEFAULT_MAPPING=Ph;Pe.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,n=0,s=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],m=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,v=(f+1)/2,C=(p+1)/2,w=(u+d)/4,A=(h+_)/4,D=(m+g)/4;return b>v&&b>C?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=w/n,r=A/n):v>C?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=w/s,r=D/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=A/r,s=D/r),this.set(n,s,r,e),this}let S=Math.sqrt((g-m)*(g-m)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(S)<.001&&(S=1),this.x=(g-m)/S,this.y=(h-_)/S,this.z=(d-u)/S,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this.z=zt(this.z,t.z,e.z),this.w=zt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this.z=zt(this.z,t,e),this.w=zt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ef extends ui{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Pe(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:hn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new nl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class di extends Ef{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class zh extends Pe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class bf extends Pe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fi{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Qe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Qe):Qe.fromBufferAttribute(r,a),Qe.applyMatrix4(t.matrixWorld),this.expandByPoint(Qe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Bs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Bs.copy(n.boundingBox)),Bs.applyMatrix4(t.matrixWorld),this.union(Bs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qe),Qe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ss),ks.subVectors(this.max,ss),vi.subVectors(t.a,ss),yi.subVectors(t.b,ss),Mi.subVectors(t.c,ss),Rn.subVectors(yi,vi),Cn.subVectors(Mi,yi),Yn.subVectors(vi,Mi);let e=[0,-Rn.z,Rn.y,0,-Cn.z,Cn.y,0,-Yn.z,Yn.y,Rn.z,0,-Rn.x,Cn.z,0,-Cn.x,Yn.z,0,-Yn.x,-Rn.y,Rn.x,0,-Cn.y,Cn.x,0,-Yn.y,Yn.x,0];return!aa(e,vi,yi,Mi,ks)||(e=[1,0,0,0,1,0,0,0,1],!aa(e,vi,yi,Mi,ks))?!1:(zs.crossVectors(Rn,Cn),e=[zs.x,zs.y,zs.z],aa(e,vi,yi,Mi,ks))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(mn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const mn=[new R,new R,new R,new R,new R,new R,new R,new R],Qe=new R,Bs=new fi,vi=new R,yi=new R,Mi=new R,Rn=new R,Cn=new R,Yn=new R,ss=new R,ks=new R,zs=new R,qn=new R;function aa(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){qn.fromArray(i,r);const o=s.x*Math.abs(qn.x)+s.y*Math.abs(qn.y)+s.z*Math.abs(qn.z),l=t.dot(qn),c=e.dot(qn),u=n.dot(qn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const wf=new fi,rs=new R,oa=new R;class pi{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):wf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;rs.subVectors(t,this.center);const e=rs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(rs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(oa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(rs.copy(t.center).add(oa)),this.expandByPoint(rs.copy(t.center).sub(oa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const gn=new R,la=new R,Hs=new R,Pn=new R,ca=new R,Vs=new R,ha=new R;class Ds{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(gn.copy(this.origin).addScaledVector(this.direction,e),gn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){la.copy(t).add(e).multiplyScalar(.5),Hs.copy(e).sub(t).normalize(),Pn.copy(this.origin).sub(la);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Hs),o=Pn.dot(this.direction),l=-Pn.dot(Hs),c=Pn.lengthSq(),u=Math.abs(1-a*a);let h,d,f,m;if(u>0)if(h=a*l-o,d=a*o-l,m=r*u,h>=0)if(d>=-m)if(d<=m){const _=1/u;h*=_,d*=_,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-m?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=m?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(la).addScaledVector(Hs,d),f}intersectSphere(t,e){gn.subVectors(t.center,this.origin);const n=gn.dot(this.direction),s=gn.dot(gn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),u>=0?(r=(t.min.y-d.y)*u,a=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,a=(t.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(t.min.z-d.z)*h,l=(t.max.z-d.z)*h):(o=(t.max.z-d.z)*h,l=(t.min.z-d.z)*h),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,gn)!==null}intersectTriangle(t,e,n,s,r){ca.subVectors(e,t),Vs.subVectors(n,t),ha.crossVectors(ca,Vs);let a=this.direction.dot(ha),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Pn.subVectors(this.origin,t);const l=o*this.direction.dot(Vs.crossVectors(Pn,Vs));if(l<0)return null;const c=o*this.direction.dot(ca.cross(Pn));if(c<0||l+c>a)return null;const u=-o*Pn.dot(ha);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ee{constructor(t,e,n,s,r,a,o,l,c,u,h,d,f,m,_,g){ee.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,u,h,d,f,m,_,g)}set(t,e,n,s,r,a,o,l,c,u,h,d,f,m,_,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ee().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Si.setFromMatrixColumn(t,0).length(),r=1/Si.setFromMatrixColumn(t,1).length(),a=1/Si.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const d=a*u,f=a*h,m=o*u,_=o*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=f+m*c,e[5]=d-_*c,e[9]=-o*l,e[2]=_-d*c,e[6]=m+f*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*u,f=l*h,m=c*u,_=c*h;e[0]=d+_*o,e[4]=m*o-f,e[8]=a*c,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=f*o-m,e[6]=_+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*u,f=l*h,m=c*u,_=c*h;e[0]=d-_*o,e[4]=-a*h,e[8]=m+f*o,e[1]=f+m*o,e[5]=a*u,e[9]=_-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*u,f=a*h,m=o*u,_=o*h;e[0]=l*u,e[4]=m*c-f,e[8]=d*c+_,e[1]=l*h,e[5]=_*c+d,e[9]=f*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,f=a*c,m=o*l,_=o*c;e[0]=l*u,e[4]=_-d*h,e[8]=m*h+f,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=f*h+m,e[10]=d-_*h}else if(t.order==="XZY"){const d=a*l,f=a*c,m=o*l,_=o*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=d*h+_,e[5]=a*u,e[9]=f*h-m,e[2]=m*h-f,e[6]=o*u,e[10]=_*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Tf,t,Af)}lookAt(t,e,n){const s=this.elements;return ze.subVectors(t,e),ze.lengthSq()===0&&(ze.z=1),ze.normalize(),Ln.crossVectors(n,ze),Ln.lengthSq()===0&&(Math.abs(n.z)===1?ze.x+=1e-4:ze.z+=1e-4,ze.normalize(),Ln.crossVectors(n,ze)),Ln.normalize(),Gs.crossVectors(ze,Ln),s[0]=Ln.x,s[4]=Gs.x,s[8]=ze.x,s[1]=Ln.y,s[5]=Gs.y,s[9]=ze.y,s[2]=Ln.z,s[6]=Gs.z,s[10]=ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],S=n[3],b=n[7],v=n[11],C=n[15],w=s[0],A=s[4],D=s[8],E=s[12],y=s[1],L=s[5],U=s[9],z=s[13],H=s[2],j=s[6],G=s[10],it=s[14],V=s[3],ot=s[7],ut=s[11],wt=s[15];return r[0]=a*w+o*y+l*H+c*V,r[4]=a*A+o*L+l*j+c*ot,r[8]=a*D+o*U+l*G+c*ut,r[12]=a*E+o*z+l*it+c*wt,r[1]=u*w+h*y+d*H+f*V,r[5]=u*A+h*L+d*j+f*ot,r[9]=u*D+h*U+d*G+f*ut,r[13]=u*E+h*z+d*it+f*wt,r[2]=m*w+_*y+g*H+p*V,r[6]=m*A+_*L+g*j+p*ot,r[10]=m*D+_*U+g*G+p*ut,r[14]=m*E+_*z+g*it+p*wt,r[3]=S*w+b*y+v*H+C*V,r[7]=S*A+b*L+v*j+C*ot,r[11]=S*D+b*U+v*G+C*ut,r[15]=S*E+b*z+v*it+C*wt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],h=t[6],d=t[10],f=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+r*l*h-s*c*h-r*o*d+n*c*d+s*o*f-n*l*f)+_*(+e*l*f-e*c*d+r*a*d-s*a*f+s*c*u-r*l*u)+g*(+e*c*h-e*o*f-r*a*h+n*a*f+r*o*u-n*c*u)+p*(-s*o*u-e*l*h+e*o*d+s*a*h-n*a*d+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=t[9],d=t[10],f=t[11],m=t[12],_=t[13],g=t[14],p=t[15],S=h*g*c-_*d*c+_*l*f-o*g*f-h*l*p+o*d*p,b=m*d*c-u*g*c-m*l*f+a*g*f+u*l*p-a*d*p,v=u*_*c-m*h*c+m*o*f-a*_*f-u*o*p+a*h*p,C=m*h*l-u*_*l-m*o*d+a*_*d+u*o*g-a*h*g,w=e*S+n*b+s*v+r*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return t[0]=S*A,t[1]=(_*d*r-h*g*r-_*s*f+n*g*f+h*s*p-n*d*p)*A,t[2]=(o*g*r-_*l*r+_*s*c-n*g*c-o*s*p+n*l*p)*A,t[3]=(h*l*r-o*d*r-h*s*c+n*d*c+o*s*f-n*l*f)*A,t[4]=b*A,t[5]=(u*g*r-m*d*r+m*s*f-e*g*f-u*s*p+e*d*p)*A,t[6]=(m*l*r-a*g*r-m*s*c+e*g*c+a*s*p-e*l*p)*A,t[7]=(a*d*r-u*l*r+u*s*c-e*d*c-a*s*f+e*l*f)*A,t[8]=v*A,t[9]=(m*h*r-u*_*r-m*n*f+e*_*f+u*n*p-e*h*p)*A,t[10]=(a*_*r-m*o*r+m*n*c-e*_*c-a*n*p+e*o*p)*A,t[11]=(u*o*r-a*h*r-u*n*c+e*h*c+a*n*f-e*o*f)*A,t[12]=C*A,t[13]=(u*_*s-m*h*s+m*n*d-e*_*d-u*n*g+e*h*g)*A,t[14]=(m*o*s-a*_*s-m*n*l+e*_*l+a*n*g-e*o*g)*A,t[15]=(a*h*s-u*o*s+u*n*l-e*h*l-a*n*d+e*o*d)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,h=o+o,d=r*c,f=r*u,m=r*h,_=a*u,g=a*h,p=o*h,S=l*c,b=l*u,v=l*h,C=n.x,w=n.y,A=n.z;return s[0]=(1-(_+p))*C,s[1]=(f+v)*C,s[2]=(m-b)*C,s[3]=0,s[4]=(f-v)*w,s[5]=(1-(d+p))*w,s[6]=(g+S)*w,s[7]=0,s[8]=(m+b)*A,s[9]=(g-S)*A,s[10]=(1-(d+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Si.set(s[0],s[1],s[2]).length();const a=Si.set(s[4],s[5],s[6]).length(),o=Si.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],tn.copy(this);const c=1/r,u=1/a,h=1/o;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=u,tn.elements[5]*=u,tn.elements[6]*=u,tn.elements[8]*=h,tn.elements[9]*=h,tn.elements[10]*=h,e.setFromRotationMatrix(tn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=un,l=!1){const c=this.elements,u=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let m,_;if(l)m=r/(a-r),_=a*r/(a-r);else if(o===un)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Or)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=un,l=!1){const c=this.elements,u=2/(e-t),h=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s);let m,_;if(l)m=1/(a-r),_=a/(a-r);else if(o===un)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===Or)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Si=new R,tn=new ee,Tf=new R(0,0,0),Af=new R(1,1,1),Ln=new R,Gs=new R,ze=new R,Xl=new ee,jl=new Gn;class Tn{constructor(t=0,e=0,n=0,s=Tn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-zt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(zt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-zt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Xl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Xl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return jl.setFromEuler(this),this.setFromQuaternion(jl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Tn.DEFAULT_ORDER="XYZ";class il{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Rf=0;const Yl=new R,Ei=new Gn,_n=new ee,Ws=new R,as=new R,Cf=new R,Pf=new Gn,ql=new R(1,0,0),Kl=new R(0,1,0),$l=new R(0,0,1),Zl={type:"added"},Lf={type:"removed"},bi={type:"childadded",child:null},da={type:"childremoved",child:null};class Te extends ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=Sn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new R,e=new Tn,n=new Gn,s=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ee},normalMatrix:{value:new Ft}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new il,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.multiply(Ei),this}rotateOnWorldAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.premultiply(Ei),this}rotateX(t){return this.rotateOnAxis(ql,t)}rotateY(t){return this.rotateOnAxis(Kl,t)}rotateZ(t){return this.rotateOnAxis($l,t)}translateOnAxis(t,e){return Yl.copy(t).applyQuaternion(this.quaternion),this.position.add(Yl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ql,t)}translateY(t){return this.translateOnAxis(Kl,t)}translateZ(t){return this.translateOnAxis($l,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ws.copy(t):Ws.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),as.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(as,Ws,this.up):_n.lookAt(Ws,as,this.up),this.quaternion.setFromRotationMatrix(_n),s&&(_n.extractRotation(s.matrixWorld),Ei.setFromRotationMatrix(_n),this.quaternion.premultiply(Ei.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Zl),bi.child=t,this.dispatchEvent(bi),bi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Lf),da.child=t,this.dispatchEvent(da),da.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_n.multiply(t.parent.matrixWorld)),t.applyMatrix4(_n),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Zl),bi.child=t,this.dispatchEvent(bi),bi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,t,Cf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,Pf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),h=a(t.shapes),d=a(t.skeletons),f=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Te.DEFAULT_UP=new R(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const en=new R,xn=new R,ua=new R,vn=new R,wi=new R,Ti=new R,Jl=new R,fa=new R,pa=new R,ma=new R,ga=new ge,_a=new ge,xa=new ge;class Ve{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),en.subVectors(t,e),s.cross(en);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){en.subVectors(s,e),xn.subVectors(n,e),ua.subVectors(t,e);const a=en.dot(en),o=en.dot(xn),l=en.dot(ua),c=xn.dot(xn),u=xn.dot(ua),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,m=(a*u-o*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vn.x),l.addScaledVector(a,vn.y),l.addScaledVector(o,vn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return ga.setScalar(0),_a.setScalar(0),xa.setScalar(0),ga.fromBufferAttribute(t,e),_a.fromBufferAttribute(t,n),xa.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(ga,r.x),a.addScaledVector(_a,r.y),a.addScaledVector(xa,r.z),a}static isFrontFacing(t,e,n,s){return en.subVectors(n,e),xn.subVectors(t,e),en.cross(xn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return en.subVectors(this.c,this.b),xn.subVectors(this.a,this.b),en.cross(xn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ve.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ve.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Ve.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Ve.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ve.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;wi.subVectors(s,n),Ti.subVectors(r,n),fa.subVectors(t,n);const l=wi.dot(fa),c=Ti.dot(fa);if(l<=0&&c<=0)return e.copy(n);pa.subVectors(t,s);const u=wi.dot(pa),h=Ti.dot(pa);if(u>=0&&h<=u)return e.copy(s);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(wi,a);ma.subVectors(t,r);const f=wi.dot(ma),m=Ti.dot(ma);if(m>=0&&f<=m)return e.copy(r);const _=f*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(Ti,o);const g=u*m-f*h;if(g<=0&&h-u>=0&&f-m>=0)return Jl.subVectors(r,s),o=(h-u)/(h-u+(f-m)),e.copy(s).addScaledVector(Jl,o);const p=1/(g+_+d);return a=_*p,o=d*p,e.copy(n).addScaledVector(wi,a).addScaledVector(Ti,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Hh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dn={h:0,s:0,l:0},Xs={h:0,s:0,l:0};function va(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Xt.workingColorSpace){if(t=el(t,1),e=zt(e,0,1),n=zt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=va(a,r,t+1/3),this.g=va(a,r,t),this.b=va(a,r,t-1/3)}return Xt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ke){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ke){const n=Hh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=En(t.r),this.g=En(t.g),this.b=En(t.b),this}copyLinearToSRGB(t){return this.r=Gi(t.r),this.g=Gi(t.g),this.b=Gi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ke){return Xt.workingToColorSpace(Ce.copy(this),t),Math.round(zt(Ce.r*255,0,255))*65536+Math.round(zt(Ce.g*255,0,255))*256+Math.round(zt(Ce.b*255,0,255))}getHexString(t=Ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.workingToColorSpace(Ce.copy(this),e);const n=Ce.r,s=Ce.g,r=Ce.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Xt.workingColorSpace){return Xt.workingToColorSpace(Ce.copy(this),e),t.r=Ce.r,t.g=Ce.g,t.b=Ce.b,t}getStyle(t=Ke){Xt.workingToColorSpace(Ce.copy(this),t);const e=Ce.r,n=Ce.g,s=Ce.b;return t!==Ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Dn),this.setHSL(Dn.h+t,Dn.s+e,Dn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Dn),t.getHSL(Xs);const n=gs(Dn.h,Xs.h,e),s=gs(Dn.s,Xs.s,e),r=gs(Dn.l,Xs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ce=new kt;kt.NAMES=Hh;let Df=0;class mi extends ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=Sn(),this.name="",this.type="Material",this.blending=Hi,this.side=Vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ja,this.blendDst=Ya,this.blendEquation=ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=Yi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_i,this.stencilZFail=_i,this.stencilZPass=_i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Hi&&(n.blending=this.blending),this.side!==Vn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ja&&(n.blendSrc=this.blendSrc),this.blendDst!==Ya&&(n.blendDst=this.blendDst),this.blendEquation!==ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Yi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_i&&(n.stencilFail=this.stencilFail),this.stencilZFail!==_i&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==_i&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class fn extends mi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Ch,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new R,js=new dt;let If=0;class ie{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:If++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Uo,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)js.fromBufferAttribute(this,e),js.applyMatrix3(t),this.setXY(e,js.x,js.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=sn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=$t(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=sn(e,this.array)),e}setX(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=sn(e,this.array)),e}setY(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=sn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=sn(e,this.array)),e}setW(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),s=$t(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),s=$t(s,this.array),r=$t(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Uo&&(t.usage=this.usage),t}}class Vh extends ie{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Gh extends ie{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Kt extends ie{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Uf=0;const Ye=new ee,ya=new Te,Ai=new R,He=new fi,os=new fi,be=new R;class qt extends ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=Sn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(kh(t)?Gh:Vh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ft().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ye.makeRotationFromQuaternion(t),this.applyMatrix4(Ye),this}rotateX(t){return Ye.makeRotationX(t),this.applyMatrix4(Ye),this}rotateY(t){return Ye.makeRotationY(t),this.applyMatrix4(Ye),this}rotateZ(t){return Ye.makeRotationZ(t),this.applyMatrix4(Ye),this}translate(t,e,n){return Ye.makeTranslation(t,e,n),this.applyMatrix4(Ye),this}scale(t,e,n){return Ye.makeScale(t,e,n),this.applyMatrix4(Ye),this}lookAt(t){return ya.lookAt(t),ya.updateMatrix(),this.applyMatrix4(ya.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ai).negate(),this.translate(Ai.x,Ai.y,Ai.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Kt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];He.setFromBufferAttribute(r),this.morphTargetsRelative?(be.addVectors(this.boundingBox.min,He.min),this.boundingBox.expandByPoint(be),be.addVectors(this.boundingBox.max,He.max),this.boundingBox.expandByPoint(be)):(this.boundingBox.expandByPoint(He.min),this.boundingBox.expandByPoint(He.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){const n=this.boundingSphere.center;if(He.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];os.setFromBufferAttribute(o),this.morphTargetsRelative?(be.addVectors(He.min,os.min),He.expandByPoint(be),be.addVectors(He.max,os.max),He.expandByPoint(be)):(He.expandByPoint(os.min),He.expandByPoint(os.max))}He.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(be));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)be.fromBufferAttribute(o,c),l&&(Ai.fromBufferAttribute(t,c),be.add(Ai)),s=Math.max(s,n.distanceToSquared(be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ie(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<n.count;D++)o[D]=new R,l[D]=new R;const c=new R,u=new R,h=new R,d=new dt,f=new dt,m=new dt,_=new R,g=new R;function p(D,E,y){c.fromBufferAttribute(n,D),u.fromBufferAttribute(n,E),h.fromBufferAttribute(n,y),d.fromBufferAttribute(r,D),f.fromBufferAttribute(r,E),m.fromBufferAttribute(r,y),u.sub(c),h.sub(c),f.sub(d),m.sub(d);const L=1/(f.x*m.y-m.x*f.y);isFinite(L)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(L),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(L),o[D].add(_),o[E].add(_),o[y].add(_),l[D].add(g),l[E].add(g),l[y].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let D=0,E=S.length;D<E;++D){const y=S[D],L=y.start,U=y.count;for(let z=L,H=L+U;z<H;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const b=new R,v=new R,C=new R,w=new R;function A(D){C.fromBufferAttribute(s,D),w.copy(C);const E=o[D];b.copy(E),b.sub(C.multiplyScalar(C.dot(E))).normalize(),v.crossVectors(w,E);const L=v.dot(l[D])<0?-1:1;a.setXYZW(D,b.x,b.y,b.z,L)}for(let D=0,E=S.length;D<E;++D){const y=S[D],L=y.start,U=y.count;for(let z=L,H=L+U;z<H;z+=3)A(t.getX(z+0)),A(t.getX(z+1)),A(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ie(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new R,r=new R,a=new R,o=new R,l=new R,c=new R,u=new R,h=new R;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),_=t.getX(d+1),g=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,g),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)be.fromBufferAttribute(t,e),be.normalize(),t.setXYZ(e,be.x,be.y,be.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,m=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let p=0;p<u;p++)d[m++]=c[f++]}return new ie(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new qt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ql=new ee,Kn=new Ds,Ys=new pi,tc=new R,qs=new R,Ks=new R,$s=new R,Ma=new R,Zs=new R,ec=new R,Js=new R;class ye extends Te{constructor(t=new qt,e=new fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Zs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],h=r[l];u!==0&&(Ma.fromBufferAttribute(h,t),a?Zs.addScaledVector(Ma,u):Zs.addScaledVector(Ma.sub(e),u))}e.add(Zs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ys.copy(n.boundingSphere),Ys.applyMatrix4(r),Kn.copy(t.ray).recast(t.near),!(Ys.containsPoint(Kn.origin)===!1&&(Kn.intersectSphere(Ys,tc)===null||Kn.origin.distanceToSquared(tc)>(t.far-t.near)**2))&&(Ql.copy(r).invert(),Kn.copy(t.ray).applyMatrix4(Ql),!(n.boundingBox!==null&&Kn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Kn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],S=Math.max(g.start,f.start),b=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let v=S,C=b;v<C;v+=3){const w=o.getX(v),A=o.getX(v+1),D=o.getX(v+2);s=Qs(this,p,t,n,c,u,h,w,A,D),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const S=o.getX(g),b=o.getX(g+1),v=o.getX(g+2);s=Qs(this,a,t,n,c,u,h,S,b,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],S=Math.max(g.start,f.start),b=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=S,C=b;v<C;v+=3){const w=v,A=v+1,D=v+2;s=Qs(this,p,t,n,c,u,h,w,A,D),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const S=g,b=g+1,v=g+2;s=Qs(this,a,t,n,c,u,h,S,b,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Nf(i,t,e,n,s,r,a,o){let l;if(t.side===Oe?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Vn,o),l===null)return null;Js.copy(o),Js.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Js);return c<e.near||c>e.far?null:{distance:c,point:Js.clone(),object:i}}function Qs(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,qs),i.getVertexPosition(l,Ks),i.getVertexPosition(c,$s);const u=Nf(i,t,e,n,qs,Ks,$s,ec);if(u){const h=new R;Ve.getBarycoord(ec,qs,Ks,$s,h),s&&(u.uv=Ve.getInterpolatedAttribute(s,o,l,c,h,new dt)),r&&(u.uv1=Ve.getInterpolatedAttribute(r,o,l,c,h,new dt)),a&&(u.normal=Ve.getInterpolatedAttribute(a,o,l,c,h,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new R,materialIndex:0};Ve.getNormal(qs,Ks,$s,d.normal),u.face=d,u.barycoord=h}return u}class Is extends qt{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,s,a,2),m("x","z","y",1,-1,t,n,-e,s,a,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Kt(c,3)),this.setAttribute("normal",new Kt(u,3)),this.setAttribute("uv",new Kt(h,2));function m(_,g,p,S,b,v,C,w,A,D,E){const y=v/A,L=C/D,U=v/2,z=C/2,H=w/2,j=A+1,G=D+1;let it=0,V=0;const ot=new R;for(let ut=0;ut<G;ut++){const wt=ut*L-z;for(let Ht=0;Ht<j;Ht++){const se=Ht*y-U;ot[_]=se*S,ot[g]=wt*b,ot[p]=H,c.push(ot.x,ot.y,ot.z),ot[_]=0,ot[g]=0,ot[p]=w>0?1:-1,u.push(ot.x,ot.y,ot.z),h.push(Ht/A),h.push(1-ut/D),it+=1}}for(let ut=0;ut<D;ut++)for(let wt=0;wt<A;wt++){const Ht=d+wt+j*ut,se=d+wt+j*(ut+1),oe=d+(wt+1)+j*(ut+1),jt=d+(wt+1)+j*ut;l.push(Ht,se,jt),l.push(se,oe,jt),V+=6}o.addGroup(f,V,E),f+=V,d+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Is(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Zi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ie(i){const t={};for(let e=0;e<i.length;e++){const n=Zi(i[e]);for(const s in n)t[s]=n[s]}return t}function Ff(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Wh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}const Of={clone:Zi,merge:Ie};var Bf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class We extends mi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bf,this.fragmentShader=kf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Zi(t.uniforms),this.uniformsGroups=Ff(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Xh extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee,this.coordinateSystem=un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const In=new R,nc=new dt,ic=new dt;class $e extends Xh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=bs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Vi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return bs*2*Math.atan(Math.tan(Vi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){In.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(In.x,In.y).multiplyScalar(-t/In.z),In.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(In.x,In.y).multiplyScalar(-t/In.z)}getViewSize(t,e){return this.getViewBounds(t,nc,ic),e.subVectors(ic,nc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Vi*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ri=-90,Ci=1;class zf extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new $e(Ri,Ci,t,e);s.layers=this.layers,this.add(s);const r=new $e(Ri,Ci,t,e);r.layers=this.layers,this.add(r);const a=new $e(Ri,Ci,t,e);a.layers=this.layers,this.add(a);const o=new $e(Ri,Ci,t,e);o.layers=this.layers,this.add(o);const l=new $e(Ri,Ci,t,e);l.layers=this.layers,this.add(l);const c=new $e(Ri,Ci,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===un)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Or)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(h,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class jh extends Pe{constructor(t=[],e=qi,n,s,r,a,o,l,c,u){super(t,e,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Hf extends di{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new jh(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Is(5,5,5),r=new We({name:"CubemapFromEquirect",uniforms:Zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Oe,blending:On});r.uniforms.tEquirect.value=e;const a=new ye(s,r),o=e.minFilter;return e.minFilter===ri&&(e.minFilter=hn),new zf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}class Ze extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vf={type:"move"};class Sa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,n),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ze;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Gf extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Wf{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Uo,this.updateRanges=[],this.version=0,this.uuid=Sn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const De=new R;class kr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix4(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyNormalMatrix(t),this.setXYZ(e,De.x,De.y,De.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.transformDirection(t),this.setXYZ(e,De.x,De.y,De.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=sn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=$t(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=sn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=sn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=sn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=sn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),s=$t(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),s=$t(s,this.array),r=$t(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new ie(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new kr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class sl extends mi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new kt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Pi;const ls=new R,Li=new R,Di=new R,Ii=new dt,cs=new dt,Yh=new ee,tr=new R,hs=new R,er=new R,sc=new dt,Ea=new dt,rc=new dt;class qh extends Te{constructor(t=new sl){if(super(),this.isSprite=!0,this.type="Sprite",Pi===void 0){Pi=new qt;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Wf(e,5);Pi.setIndex([0,1,2,0,2,3]),Pi.setAttribute("position",new kr(n,3,0,!1)),Pi.setAttribute("uv",new kr(n,2,3,!1))}this.geometry=Pi,this.material=t,this.center=new dt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Li.setFromMatrixScale(this.matrixWorld),Yh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Di.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Li.multiplyScalar(-Di.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;nr(tr.set(-.5,-.5,0),Di,a,Li,s,r),nr(hs.set(.5,-.5,0),Di,a,Li,s,r),nr(er.set(.5,.5,0),Di,a,Li,s,r),sc.set(0,0),Ea.set(1,0),rc.set(1,1);let o=t.ray.intersectTriangle(tr,hs,er,!1,ls);if(o===null&&(nr(hs.set(-.5,.5,0),Di,a,Li,s,r),Ea.set(0,1),o=t.ray.intersectTriangle(tr,er,hs,!1,ls),o===null))return;const l=t.ray.origin.distanceTo(ls);l<t.near||l>t.far||e.push({distance:l,point:ls.clone(),uv:Ve.getInterpolation(ls,tr,hs,er,sc,Ea,rc,new dt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function nr(i,t,e,n,s,r){Ii.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(cs.x=r*Ii.x-s*Ii.y,cs.y=s*Ii.x+r*Ii.y):cs.copy(Ii),i.copy(t),i.x+=cs.x,i.y+=cs.y,i.applyMatrix4(Yh)}class Xf extends Pe{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Ge,u=Ge,h,d){super(null,a,o,l,c,u,s,r,h,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zr extends ie{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ui=new ee,ac=new ee,ir=[],oc=new fi,jf=new ee,ds=new ye,us=new pi;class Kh extends ye{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new zr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,jf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new fi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ui),oc.copy(t.boundingBox).applyMatrix4(Ui),this.boundingBox.union(oc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new pi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ui),us.copy(t.boundingSphere).applyMatrix4(Ui),this.boundingSphere.union(us)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(ds.geometry=this.geometry,ds.material=this.material,ds.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),us.copy(this.boundingSphere),us.applyMatrix4(n),t.ray.intersectsSphere(us)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ui),ac.multiplyMatrices(n,Ui),ds.matrixWorld=ac,ds.raycast(t,ir);for(let a=0,o=ir.length;a<o;a++){const l=ir[a];l.instanceId=r,l.object=this,e.push(l)}ir.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new zr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Xf(new Float32Array(s*this.count),s,this.count,Zo,dn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ba=new R,Yf=new R,qf=new Ft;class on{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ba.subVectors(n,e).cross(Yf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ba),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||qf.getNormalMatrix(t),s=this.coplanarPoint(ba).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $n=new pi,Kf=new dt(.5,.5),sr=new R;class $h{constructor(t=new on,e=new on,n=new on,s=new on,r=new on,a=new on){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=un,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],h=r[5],d=r[6],f=r[7],m=r[8],_=r[9],g=r[10],p=r[11],S=r[12],b=r[13],v=r[14],C=r[15];if(s[0].setComponents(c-a,f-u,p-m,C-S).normalize(),s[1].setComponents(c+a,f+u,p+m,C+S).normalize(),s[2].setComponents(c+o,f+h,p+_,C+b).normalize(),s[3].setComponents(c-o,f-h,p-_,C-b).normalize(),n)s[4].setComponents(l,d,g,v).normalize(),s[5].setComponents(c-l,f-d,p-g,C-v).normalize();else if(s[4].setComponents(c-l,f-d,p-g,C-v).normalize(),e===un)s[5].setComponents(c+l,f+d,p+g,C+v).normalize();else if(e===Or)s[5].setComponents(l,d,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),$n.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),$n.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere($n)}intersectsSprite(t){$n.center.set(0,0,0);const e=Kf.distanceTo(t.center);return $n.radius=.7071067811865476+e,$n.applyMatrix4(t.matrixWorld),this.intersectsSphere($n)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(sr.x=s.normal.x>0?t.max.x:t.min.x,sr.y=s.normal.y>0?t.max.y:t.min.y,sr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(sr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class rl extends mi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Hr=new R,Vr=new R,lc=new ee,fs=new Ds,rr=new pi,wa=new R,cc=new R;class Zh extends Te{constructor(t=new qt,e=new rl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Hr.fromBufferAttribute(e,s-1),Vr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Hr.distanceTo(Vr);t.setAttribute("lineDistance",new Kt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(s),rr.radius+=r,t.ray.intersectsSphere(rr)===!1)return;lc.copy(s).invert(),fs.copy(t.ray).applyMatrix4(lc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=c){const p=u.getX(_),S=u.getX(_+1),b=ar(this,t,fs,l,p,S,_);b&&e.push(b)}if(this.isLineLoop){const _=u.getX(m-1),g=u.getX(f),p=ar(this,t,fs,l,_,g,m-1);p&&e.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=c){const p=ar(this,t,fs,l,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){const _=ar(this,t,fs,l,m-1,f,m-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ar(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(Hr.fromBufferAttribute(o,s),Vr.fromBufferAttribute(o,r),e.distanceSqToSegment(Hr,Vr,wa,cc)>n)return;wa.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(wa);if(!(c<t.near||c>t.far))return{distance:c,point:cc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const hc=new R,dc=new R;class Ts extends Zh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)hc.fromBufferAttribute(e,s),dc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+hc.distanceTo(dc);t.setAttribute("lineDistance",new Kt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Jh extends mi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new kt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const uc=new ee,No=new Ds,or=new pi,lr=new R;class Yr extends Te{constructor(t=new qt,e=new Jh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),or.copy(n.boundingSphere),or.applyMatrix4(s),or.radius+=r,t.ray.intersectsSphere(or)===!1)return;uc.copy(s).invert(),No.copy(t.ray).applyMatrix4(uc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=d,_=f;m<_;m++){const g=c.getX(m);lr.fromBufferAttribute(h,g),fc(lr,g,l,s,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let m=d,_=f;m<_;m++)lr.fromBufferAttribute(h,m),fc(lr,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function fc(i,t,e,n,s,r,a){const o=No.distanceSqToPoint(i);if(o<e){const l=new R;No.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Qh extends Pe{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class td extends Pe{constructor(t,e,n=hi,s,r,a,o=Ge,l=Ge,c,u=Ss,h=1){if(u!==Ss&&u!==Es)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:h};super(d,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new nl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class ed extends Pe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class al extends qt{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new R,u=new dt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=e;h++,d+=3){const f=n+h/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[d]/t+1)/2,u.y=(a[d+1]/t+1)/2,l.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Kt(a,3)),this.setAttribute("normal",new Kt(o,3)),this.setAttribute("uv",new Kt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new al(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class qr extends qt{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],f=[];let m=0;const _=[],g=n/2;let p=0;S(),a===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new Kt(h,3)),this.setAttribute("normal",new Kt(d,3)),this.setAttribute("uv",new Kt(f,2));function S(){const v=new R,C=new R;let w=0;const A=(e-t)/n;for(let D=0;D<=r;D++){const E=[],y=D/r,L=y*(e-t)+t;for(let U=0;U<=s;U++){const z=U/s,H=z*l+o,j=Math.sin(H),G=Math.cos(H);C.x=L*j,C.y=-y*n+g,C.z=L*G,h.push(C.x,C.y,C.z),v.set(j,A,G).normalize(),d.push(v.x,v.y,v.z),f.push(z,1-y),E.push(m++)}_.push(E)}for(let D=0;D<s;D++)for(let E=0;E<r;E++){const y=_[E][D],L=_[E+1][D],U=_[E+1][D+1],z=_[E][D+1];(t>0||E!==0)&&(u.push(y,L,z),w+=3),(e>0||E!==r-1)&&(u.push(L,U,z),w+=3)}c.addGroup(p,w,0),p+=w}function b(v){const C=m,w=new dt,A=new R;let D=0;const E=v===!0?t:e,y=v===!0?1:-1;for(let U=1;U<=s;U++)h.push(0,g*y,0),d.push(0,y,0),f.push(.5,.5),m++;const L=m;for(let U=0;U<=s;U++){const H=U/s*l+o,j=Math.cos(H),G=Math.sin(H);A.x=E*G,A.y=g*y,A.z=E*j,h.push(A.x,A.y,A.z),d.push(0,y,0),w.x=j*.5+.5,w.y=G*.5*y+.5,f.push(w.x,w.y),m++}for(let U=0;U<s;U++){const z=C+U,H=L+U;v===!0?u.push(H,H+1,z):u.push(H+1,H,z),D+=3}c.addGroup(p,D,v===!0?1:2),p+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qr(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ol extends qr{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new ol(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ll extends qt{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),c(n),u(),this.setAttribute("position",new Kt(r,3)),this.setAttribute("normal",new Kt(r.slice(),3)),this.setAttribute("uv",new Kt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const b=new R,v=new R,C=new R;for(let w=0;w<e.length;w+=3)f(e[w+0],b),f(e[w+1],v),f(e[w+2],C),l(b,v,C,S)}function l(S,b,v,C){const w=C+1,A=[];for(let D=0;D<=w;D++){A[D]=[];const E=S.clone().lerp(v,D/w),y=b.clone().lerp(v,D/w),L=w-D;for(let U=0;U<=L;U++)U===0&&D===w?A[D][U]=E:A[D][U]=E.clone().lerp(y,U/L)}for(let D=0;D<w;D++)for(let E=0;E<2*(w-D)-1;E++){const y=Math.floor(E/2);E%2===0?(d(A[D][y+1]),d(A[D+1][y]),d(A[D][y])):(d(A[D][y+1]),d(A[D+1][y+1]),d(A[D+1][y]))}}function c(S){const b=new R;for(let v=0;v<r.length;v+=3)b.x=r[v+0],b.y=r[v+1],b.z=r[v+2],b.normalize().multiplyScalar(S),r[v+0]=b.x,r[v+1]=b.y,r[v+2]=b.z}function u(){const S=new R;for(let b=0;b<r.length;b+=3){S.x=r[b+0],S.y=r[b+1],S.z=r[b+2];const v=g(S)/2/Math.PI+.5,C=p(S)/Math.PI+.5;a.push(v,1-C)}m(),h()}function h(){for(let S=0;S<a.length;S+=6){const b=a[S+0],v=a[S+2],C=a[S+4],w=Math.max(b,v,C),A=Math.min(b,v,C);w>.9&&A<.1&&(b<.2&&(a[S+0]+=1),v<.2&&(a[S+2]+=1),C<.2&&(a[S+4]+=1))}}function d(S){r.push(S.x,S.y,S.z)}function f(S,b){const v=S*3;b.x=t[v+0],b.y=t[v+1],b.z=t[v+2]}function m(){const S=new R,b=new R,v=new R,C=new R,w=new dt,A=new dt,D=new dt;for(let E=0,y=0;E<r.length;E+=9,y+=6){S.set(r[E+0],r[E+1],r[E+2]),b.set(r[E+3],r[E+4],r[E+5]),v.set(r[E+6],r[E+7],r[E+8]),w.set(a[y+0],a[y+1]),A.set(a[y+2],a[y+3]),D.set(a[y+4],a[y+5]),C.copy(S).add(b).add(v).divideScalar(3);const L=g(C);_(w,y+0,S,L),_(A,y+2,b,L),_(D,y+4,v,L)}}function _(S,b,v,C){C<0&&S.x===1&&(a[b]=S.x-1),v.x===0&&v.z===0&&(a[b]=C/2/Math.PI+.5)}function g(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ll(t.vertices,t.indices,t.radius,t.details)}}const cr=new R,hr=new R,Ta=new R,dr=new Ve;class $f extends qt{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(Vi*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);const{a:_,b:g,c:p}=dr;if(_.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),dr.getNormal(Ta),h[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,h[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,h[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let S=0;S<3;S++){const b=(S+1)%3,v=h[S],C=h[b],w=dr[u[S]],A=dr[u[b]],D=`${v}_${C}`,E=`${C}_${v}`;E in d&&d[E]?(Ta.dot(d[E].normal)<=r&&(f.push(w.x,w.y,w.z),f.push(A.x,A.y,A.z)),d[E]=null):D in d||(d[D]={index0:c[S],index1:c[b],normal:Ta.clone()})}}for(const m in d)if(d[m]){const{index0:_,index1:g}=d[m];cr.fromBufferAttribute(o,_),hr.fromBufferAttribute(o,g),f.push(cr.x,cr.y,cr.z),f.push(hr.x,hr.y,hr.z)}this.setAttribute("position",new Kt(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class cl extends ll{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new cl(t.radius,t.detail)}}class ts extends qt{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,h=t/o,d=e/l,f=[],m=[],_=[],g=[];for(let p=0;p<u;p++){const S=p*d-a;for(let b=0;b<c;b++){const v=b*h-r;m.push(v,-S,0),_.push(0,0,1),g.push(b/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<o;S++){const b=S+c*p,v=S+c*(p+1),C=S+1+c*(p+1),w=S+1+c*p;f.push(b,v,w),f.push(v,C,w)}this.setIndex(f),this.setAttribute("position",new Kt(m,3)),this.setAttribute("normal",new Kt(_,3)),this.setAttribute("uv",new Kt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ts(t.width,t.height,t.widthSegments,t.heightSegments)}}class ai extends qt{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let h=t;const d=(e-t)/s,f=new R,m=new dt;for(let _=0;_<=s;_++){for(let g=0;g<=n;g++){const p=r+g/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,u.push(m.x,m.y)}h+=d}for(let _=0;_<s;_++){const g=_*(n+1);for(let p=0;p<n;p++){const S=p+g,b=S,v=S+n+1,C=S+n+2,w=S+1;o.push(b,v,w),o.push(v,C,w)}}this.setIndex(o),this.setAttribute("position",new Kt(l,3)),this.setAttribute("normal",new Kt(c,3)),this.setAttribute("uv",new Kt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ai(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class hl extends qt{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],u=new R,h=new R,d=new R;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const _=m/s*r,g=f/n*Math.PI*2;h.x=(t+e*Math.cos(g))*Math.cos(_),h.y=(t+e*Math.cos(g))*Math.sin(_),h.z=e*Math.sin(g),o.push(h.x,h.y,h.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(m/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const _=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,S=(s+1)*f+m;a.push(_,g,S),a.push(g,p,S)}this.setIndex(a),this.setAttribute("position",new Kt(o,3)),this.setAttribute("normal",new Kt(l,3)),this.setAttribute("uv",new Kt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hl(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Zf extends mi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Jf extends mi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Qf extends Xh{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class tp extends $e{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class ep{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}const pc=new ee;class mc{constructor(t,e,n=0,s=1/0){this.ray=new Ds(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new il,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return pc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(pc),this}intersectObject(t,e=!0,n=[]){return Fo(t,this,n,e),n.sort(gc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Fo(t[s],this,n,e);return n.sort(gc),n}}function gc(i,t){return i.distance-t.distance}function Fo(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Fo(r[a],t,e,!0)}}class _c{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=zt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(zt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class np extends ui{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function xc(i,t,e,n){const s=ip(n);switch(e){case Nh:return i*t;case Zo:return i*t/s.components*s.byteLength;case Jo:return i*t/s.components*s.byteLength;case Oh:return i*t*2/s.components*s.byteLength;case Qo:return i*t*2/s.components*s.byteLength;case Fh:return i*t*3/s.components*s.byteLength;case rn:return i*t*4/s.components*s.byteLength;case tl:return i*t*4/s.components*s.byteLength;case xr:case vr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case yr:case Mr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ao:case lo:return Math.max(i,16)*Math.max(t,8)/4;case ro:case oo:return Math.max(i,8)*Math.max(t,8)/2;case co:case ho:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case uo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case fo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case po:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case mo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case go:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case _o:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case xo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case vo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case yo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Mo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case So:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Eo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case bo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case wo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case To:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ao:case Ro:case Co:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Po:case Lo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Do:case Io:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ip(i){switch(i){case wn:case Lh:return{byteLength:1,components:1};case ys:case Dh:case Ls:return{byteLength:2,components:1};case Ko:case $o:return{byteLength:2,components:4};case hi:case qo:case dn:return{byteLength:4,components:1};case Ih:case Uh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yo);function nd(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function sp(i){const t=new WeakMap;function e(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){const m=h[d],_=h[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){const _=h[f];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var rp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ap=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,op=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,up=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,pp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_p=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,xp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,vp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,yp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Mp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,wp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Tp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ap=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Rp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Cp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Pp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Lp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Dp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ip=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Up=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Np="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Op=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Bp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,kp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,zp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Yp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$p=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Zp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Jp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,em=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,nm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,im=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,sm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,rm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,am=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,om=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,dm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,um=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,pm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_m=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,xm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ym=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Mm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Em=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,bm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Am=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Rm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Dm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Im=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Um=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Nm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Om=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,km=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Hm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Vm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Gm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Wm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ym=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Km=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$m=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Qm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ng=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ig=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const sg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,og=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,dg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ug=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,fg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_g=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,vg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Eg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Tg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ag=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Cg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ig=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ug=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ng=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Og=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Bt={alphahash_fragment:rp,alphahash_pars_fragment:ap,alphamap_fragment:op,alphamap_pars_fragment:lp,alphatest_fragment:cp,alphatest_pars_fragment:hp,aomap_fragment:dp,aomap_pars_fragment:up,batching_pars_vertex:fp,batching_vertex:pp,begin_vertex:mp,beginnormal_vertex:gp,bsdfs:_p,iridescence_fragment:xp,bumpmap_pars_fragment:vp,clipping_planes_fragment:yp,clipping_planes_pars_fragment:Mp,clipping_planes_pars_vertex:Sp,clipping_planes_vertex:Ep,color_fragment:bp,color_pars_fragment:wp,color_pars_vertex:Tp,color_vertex:Ap,common:Rp,cube_uv_reflection_fragment:Cp,defaultnormal_vertex:Pp,displacementmap_pars_vertex:Lp,displacementmap_vertex:Dp,emissivemap_fragment:Ip,emissivemap_pars_fragment:Up,colorspace_fragment:Np,colorspace_pars_fragment:Fp,envmap_fragment:Op,envmap_common_pars_fragment:Bp,envmap_pars_fragment:kp,envmap_pars_vertex:zp,envmap_physical_pars_fragment:Zp,envmap_vertex:Hp,fog_vertex:Vp,fog_pars_vertex:Gp,fog_fragment:Wp,fog_pars_fragment:Xp,gradientmap_pars_fragment:jp,lightmap_pars_fragment:Yp,lights_lambert_fragment:qp,lights_lambert_pars_fragment:Kp,lights_pars_begin:$p,lights_toon_fragment:Jp,lights_toon_pars_fragment:Qp,lights_phong_fragment:tm,lights_phong_pars_fragment:em,lights_physical_fragment:nm,lights_physical_pars_fragment:im,lights_fragment_begin:sm,lights_fragment_maps:rm,lights_fragment_end:am,logdepthbuf_fragment:om,logdepthbuf_pars_fragment:lm,logdepthbuf_pars_vertex:cm,logdepthbuf_vertex:hm,map_fragment:dm,map_pars_fragment:um,map_particle_fragment:fm,map_particle_pars_fragment:pm,metalnessmap_fragment:mm,metalnessmap_pars_fragment:gm,morphinstance_vertex:_m,morphcolor_vertex:xm,morphnormal_vertex:vm,morphtarget_pars_vertex:ym,morphtarget_vertex:Mm,normal_fragment_begin:Sm,normal_fragment_maps:Em,normal_pars_fragment:bm,normal_pars_vertex:wm,normal_vertex:Tm,normalmap_pars_fragment:Am,clearcoat_normal_fragment_begin:Rm,clearcoat_normal_fragment_maps:Cm,clearcoat_pars_fragment:Pm,iridescence_pars_fragment:Lm,opaque_fragment:Dm,packing:Im,premultiplied_alpha_fragment:Um,project_vertex:Nm,dithering_fragment:Fm,dithering_pars_fragment:Om,roughnessmap_fragment:Bm,roughnessmap_pars_fragment:km,shadowmap_pars_fragment:zm,shadowmap_pars_vertex:Hm,shadowmap_vertex:Vm,shadowmask_pars_fragment:Gm,skinbase_vertex:Wm,skinning_pars_vertex:Xm,skinning_vertex:jm,skinnormal_vertex:Ym,specularmap_fragment:qm,specularmap_pars_fragment:Km,tonemapping_fragment:$m,tonemapping_pars_fragment:Zm,transmission_fragment:Jm,transmission_pars_fragment:Qm,uv_pars_fragment:tg,uv_pars_vertex:eg,uv_vertex:ng,worldpos_vertex:ig,background_vert:sg,background_frag:rg,backgroundCube_vert:ag,backgroundCube_frag:og,cube_vert:lg,cube_frag:cg,depth_vert:hg,depth_frag:dg,distanceRGBA_vert:ug,distanceRGBA_frag:fg,equirect_vert:pg,equirect_frag:mg,linedashed_vert:gg,linedashed_frag:_g,meshbasic_vert:xg,meshbasic_frag:vg,meshlambert_vert:yg,meshlambert_frag:Mg,meshmatcap_vert:Sg,meshmatcap_frag:Eg,meshnormal_vert:bg,meshnormal_frag:wg,meshphong_vert:Tg,meshphong_frag:Ag,meshphysical_vert:Rg,meshphysical_frag:Cg,meshtoon_vert:Pg,meshtoon_frag:Lg,points_vert:Dg,points_frag:Ig,shadow_vert:Ug,shadow_frag:Ng,sprite_vert:Fg,sprite_frag:Og},at={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},ln={basic:{uniforms:Ie([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:Ie([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new kt(0)}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:Ie([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:Ie([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:Ie([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new kt(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:Ie([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:Ie([at.points,at.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:Ie([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:Ie([at.common,at.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:Ie([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:Ie([at.sprite,at.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distanceRGBA:{uniforms:Ie([at.common,at.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distanceRGBA_vert,fragmentShader:Bt.distanceRGBA_frag},shadow:{uniforms:Ie([at.lights,at.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};ln.physical={uniforms:Ie([ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};const ur={r:0,b:0,g:0},Zn=new Tn,Bg=new ee;function kg(i,t,e,n,s,r,a){const o=new kt(0);let l=r===!0?0:1,c,u,h=null,d=0,f=null;function m(b){let v=b.isScene===!0?b.background:null;return v&&v.isTexture&&(v=(b.backgroundBlurriness>0?e:t).get(v)),v}function _(b){let v=!1;const C=m(b);C===null?p(o,l):C&&C.isColor&&(p(C,1),v=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(b,v){const C=m(v);C&&(C.isCubeTexture||C.mapping===jr)?(u===void 0&&(u=new ye(new Is(1,1,1),new We({name:"BackgroundCubeMaterial",uniforms:Zi(ln.backgroundCube.uniforms),vertexShader:ln.backgroundCube.vertexShader,fragmentShader:ln.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Zn.copy(v.backgroundRotation),Zn.x*=-1,Zn.y*=-1,Zn.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Zn.y*=-1,Zn.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Bg.makeRotationFromEuler(Zn)),u.material.toneMapped=Xt.getTransfer(C.colorSpace)!==Qt,(h!==C||d!==C.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=C,d=C.version,f=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new ye(new ts(2,2),new We({name:"BackgroundMaterial",uniforms:Zi(ln.background.uniforms),vertexShader:ln.background.vertexShader,fragmentShader:ln.background.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Xt.getTransfer(C.colorSpace)!==Qt,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(h!==C||d!==C.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=C,d=C.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,v){b.getRGB(ur,Wh(i)),n.buffers.color.setClear(ur.r,ur.g,ur.b,v,a)}function S(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,v=1){o.set(b),l=v,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(o,l)},render:_,addToRenderList:g,dispose:S}}function zg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(y,L,U,z,H){let j=!1;const G=h(z,U,L);r!==G&&(r=G,c(r.object)),j=f(y,z,U,H),j&&m(y,z,U,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,v(y,L,U,z),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function h(y,L,U){const z=U.wireframe===!0;let H=n[y.id];H===void 0&&(H={},n[y.id]=H);let j=H[L.id];j===void 0&&(j={},H[L.id]=j);let G=j[z];return G===void 0&&(G=d(l()),j[z]=G),G}function d(y){const L=[],U=[],z=[];for(let H=0;H<e;H++)L[H]=0,U[H]=0,z[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:z,object:y,attributes:{},index:null}}function f(y,L,U,z){const H=r.attributes,j=L.attributes;let G=0;const it=U.getAttributes();for(const V in it)if(it[V].location>=0){const ut=H[V];let wt=j[V];if(wt===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(wt=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(wt=y.instanceColor)),ut===void 0||ut.attribute!==wt||wt&&ut.data!==wt.data)return!0;G++}return r.attributesNum!==G||r.index!==z}function m(y,L,U,z){const H={},j=L.attributes;let G=0;const it=U.getAttributes();for(const V in it)if(it[V].location>=0){let ut=j[V];ut===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(ut=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(ut=y.instanceColor));const wt={};wt.attribute=ut,ut&&ut.data&&(wt.data=ut.data),H[V]=wt,G++}r.attributes=H,r.attributesNum=G,r.index=z}function _(){const y=r.newAttributes;for(let L=0,U=y.length;L<U;L++)y[L]=0}function g(y){p(y,0)}function p(y,L){const U=r.newAttributes,z=r.enabledAttributes,H=r.attributeDivisors;U[y]=1,z[y]===0&&(i.enableVertexAttribArray(y),z[y]=1),H[y]!==L&&(i.vertexAttribDivisor(y,L),H[y]=L)}function S(){const y=r.newAttributes,L=r.enabledAttributes;for(let U=0,z=L.length;U<z;U++)L[U]!==y[U]&&(i.disableVertexAttribArray(U),L[U]=0)}function b(y,L,U,z,H,j,G){G===!0?i.vertexAttribIPointer(y,L,U,H,j):i.vertexAttribPointer(y,L,U,z,H,j)}function v(y,L,U,z){_();const H=z.attributes,j=U.getAttributes(),G=L.defaultAttributeValues;for(const it in j){const V=j[it];if(V.location>=0){let ot=H[it];if(ot===void 0&&(it==="instanceMatrix"&&y.instanceMatrix&&(ot=y.instanceMatrix),it==="instanceColor"&&y.instanceColor&&(ot=y.instanceColor)),ot!==void 0){const ut=ot.normalized,wt=ot.itemSize,Ht=t.get(ot);if(Ht===void 0)continue;const se=Ht.buffer,oe=Ht.type,jt=Ht.bytesPerElement,Y=oe===i.INT||oe===i.UNSIGNED_INT||ot.gpuType===qo;if(ot.isInterleavedBufferAttribute){const Z=ot.data,mt=Z.stride,Dt=ot.offset;if(Z.isInstancedInterleavedBuffer){for(let bt=0;bt<V.locationSize;bt++)p(V.location+bt,Z.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let bt=0;bt<V.locationSize;bt++)g(V.location+bt);i.bindBuffer(i.ARRAY_BUFFER,se);for(let bt=0;bt<V.locationSize;bt++)b(V.location+bt,wt/V.locationSize,oe,ut,mt*jt,(Dt+wt/V.locationSize*bt)*jt,Y)}else{if(ot.isInstancedBufferAttribute){for(let Z=0;Z<V.locationSize;Z++)p(V.location+Z,ot.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Z=0;Z<V.locationSize;Z++)g(V.location+Z);i.bindBuffer(i.ARRAY_BUFFER,se);for(let Z=0;Z<V.locationSize;Z++)b(V.location+Z,wt/V.locationSize,oe,ut,wt*jt,wt/V.locationSize*Z*jt,Y)}}else if(G!==void 0){const ut=G[it];if(ut!==void 0)switch(ut.length){case 2:i.vertexAttrib2fv(V.location,ut);break;case 3:i.vertexAttrib3fv(V.location,ut);break;case 4:i.vertexAttrib4fv(V.location,ut);break;default:i.vertexAttrib1fv(V.location,ut)}}}}S()}function C(){D();for(const y in n){const L=n[y];for(const U in L){const z=L[U];for(const H in z)u(z[H].object),delete z[H];delete L[U]}delete n[y]}}function w(y){if(n[y.id]===void 0)return;const L=n[y.id];for(const U in L){const z=L[U];for(const H in z)u(z[H].object),delete z[H];delete L[U]}delete n[y.id]}function A(y){for(const L in n){const U=n[L];if(U[y.id]===void 0)continue;const z=U[y.id];for(const H in z)u(z[H].object),delete z[H];delete U[y.id]}}function D(){E(),a=!0,r!==s&&(r=s,c(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:D,resetDefaultState:E,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:g,disableUnusedAttributes:S}}function Hg(i,t,e){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),e.update(u,n,1)}function a(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),e.update(u,n,h))}function o(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let m=0;m<h;m++)f+=u[m];e.update(f,n,1)}function l(c,u,h,d){if(h===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],u[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let m=0;for(let _=0;_<h;_++)m+=u[_]*d[_];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Vg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==rn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const D=A===Ls&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==wn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==dn&&!D)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=m>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:S,maxVaryings:b,maxFragmentUniforms:v,vertexTextures:C,maxSamples:w}}function Gg(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new on,o=new Ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,f){const m=h.clippingPlanes,_=h.clipIntersection,g=h.clipShadows,p=i.get(h);if(!s||m===null||m.length===0||r&&!g)r?u(null):c();else{const S=r?0:n,b=S*4;let v=p.clippingState||null;l.value=v,v=u(m,d,b,f);for(let C=0;C!==b;++C)v[C]=e[C];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,d,f,m){const _=h!==null?h.length:0;let g=null;if(_!==0){if(g=l.value,m!==!0||g===null){const p=f+_*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(g===null||g.length<p)&&(g=new Float32Array(p));for(let b=0,v=f;b!==_;++b,v+=4)a.copy(h[b]).applyMatrix4(S,o),a.normal.toArray(g,v),g[v+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function Wg(i){let t=new WeakMap;function e(a,o){return o===eo?a.mapping=qi:o===no&&(a.mapping=Ki),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===eo||o===no)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Hf(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const ki=4,vc=[.125,.215,.35,.446,.526,.582],ni=20,Aa=new Qf,yc=new kt;let Ra=null,Ca=0,Pa=0,La=!1;const Qn=(1+Math.sqrt(5))/2,Ni=1/Qn,Mc=[new R(-Qn,Ni,0),new R(Qn,Ni,0),new R(-Ni,0,Qn),new R(Ni,0,Qn),new R(0,Qn,-Ni),new R(0,Qn,Ni),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],Xg=new R;class Sc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=Xg}=r;Ra=this._renderer.getRenderTarget(),Ca=this._renderer.getActiveCubeFace(),Pa=this._renderer.getActiveMipmapLevel(),La=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ra,Ca,Pa),this._renderer.xr.enabled=La,t.scissorTest=!1,fr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===qi||t.mapping===Ki?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ra=this._renderer.getRenderTarget(),Ca=this._renderer.getActiveCubeFace(),Pa=this._renderer.getActiveMipmapLevel(),La=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:hn,minFilter:hn,generateMipmaps:!1,type:Ls,format:rn,colorSpace:$i,depthBuffer:!1},s=Ec(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ec(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=jg(r)),this._blurMaterial=Yg(r,t,e)}return s}_compileMaterial(t){const e=new ye(this._lodPlanes[0],t);this._renderer.compile(e,Aa)}_sceneToCubeUV(t,e,n,s,r){const l=new $e(90,1,e,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(yc),h.toneMapping=Bn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));const _=new fn({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1}),g=new ye(new Is,_);let p=!1;const S=t.background;S?S.isColor&&(_.color.copy(S),t.background=null,p=!0):(_.color.copy(yc),p=!0);for(let b=0;b<6;b++){const v=b%3;v===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[b],r.y,r.z)):v===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[b]));const C=this._cubeSize;fr(s,v*C,b>2?C:0,C,C),h.setRenderTarget(s),p&&h.render(g,l),h.render(t,l)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,t.background=S}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===qi||t.mapping===Ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=wc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new ye(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;fr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Aa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Mc[(s-r-1)%Mc.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new ye(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ni-1),_=r/m,g=isFinite(r)?1+Math.floor(u*_):ni;g>ni&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ni}`);const p=[];let S=0;for(let A=0;A<ni;++A){const D=A/_,E=Math.exp(-D*D/2);p.push(E),A===0?S+=E:A<g&&(S+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/S;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:b}=this;d.dTheta.value=m,d.mipInt.value=b-n;const v=this._sizeLods[s],C=3*v*(s>b-ki?s-b+ki:0),w=4*(this._cubeSize-v);fr(e,C,w,3*v,2*v),l.setRenderTarget(e),l.render(h,Aa)}}function jg(i){const t=[],e=[],n=[];let s=i;const r=i-ki+1+vc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-ki?l=vc[a-i+ki-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,_=3,g=2,p=1,S=new Float32Array(_*m*f),b=new Float32Array(g*m*f),v=new Float32Array(p*m*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,D=w>2?0:-1,E=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];S.set(E,_*m*w),b.set(d,g*m*w);const y=[w,w,w,w,w,w];v.set(y,p*m*w)}const C=new qt;C.setAttribute("position",new ie(S,_)),C.setAttribute("uv",new ie(b,g)),C.setAttribute("faceIndex",new ie(v,p)),t.push(C),s>ki&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ec(i,t,e){const n=new di(i,t,e);return n.texture.mapping=jr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function fr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Yg(i,t,e){const n=new Float32Array(ni),s=new R(0,1,0);return new We({name:"SphericalGaussianBlur",defines:{n:ni,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function bc(){return new We({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function wc(){return new We({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function dl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function qg(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===eo||l===no,u=l===qi||l===Ki;if(c||u){let h=t.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Sc(i)),h=c?e.fromEquirectangular(o,h):e.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return c&&f&&f.height>0||u&&f&&s(f)?(e===null&&(e=new Sc(i)),h=c?e.fromEquirectangular(o):e.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Kg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ws("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function $g(i,t,e,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,m=h.attributes.position;let _=0;if(f!==null){const S=f.array;_=f.version;for(let b=0,v=S.length;b<v;b+=3){const C=S[b+0],w=S[b+1],A=S[b+2];d.push(C,w,w,A,A,C)}}else if(m!==void 0){const S=m.array;_=m.version;for(let b=0,v=S.length/3-1;b<v;b+=3){const C=b+0,w=b+1,A=b+2;d.push(C,w,w,A,A,C)}}else return;const g=new(kh(d)?Gh:Vh)(d,1);g.version=_;const p=r.get(h);p&&t.remove(p),r.set(h,g)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Zg(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*a),e.update(f,n,1)}function c(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*a,m),e.update(f,n,m))}function u(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function h(d,f,m,_){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,m);let p=0;for(let S=0;S<m;S++)p+=f[S]*_[S];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Jg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Qg(i,t,e){const n=new WeakMap,s=new ge;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let E=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let b=0;f===!0&&(b=1),m===!0&&(b=2),_===!0&&(b=3);let v=o.attributes.position.count*b,C=1;v>t.maxTextureSize&&(C=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const w=new Float32Array(v*C*4*h),A=new zh(w,v,C,h);A.type=dn,A.needsUpdate=!0;const D=b*4;for(let y=0;y<h;y++){const L=g[y],U=p[y],z=S[y],H=v*C*4*y;for(let j=0;j<L.count;j++){const G=j*D;f===!0&&(s.fromBufferAttribute(L,j),w[H+G+0]=s.x,w[H+G+1]=s.y,w[H+G+2]=s.z,w[H+G+3]=0),m===!0&&(s.fromBufferAttribute(U,j),w[H+G+4]=s.x,w[H+G+5]=s.y,w[H+G+6]=s.z,w[H+G+7]=0),_===!0&&(s.fromBufferAttribute(z,j),w[H+G+8]=s.x,w[H+G+9]=s.y,w[H+G+10]=s.z,w[H+G+11]=z.itemSize===4?s.w:1)}}d={count:h,texture:A,size:new dt(v,C)},n.set(o,d),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function t0(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,h=t.get(l,u);if(s.get(h)!==c&&(t.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return h}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}const id=new Pe,Tc=new td(1,1),sd=new zh,rd=new bf,ad=new jh,Ac=[],Rc=[],Cc=new Float32Array(16),Pc=new Float32Array(9),Lc=new Float32Array(4);function es(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Ac[s];if(r===void 0&&(r=new Float32Array(s),Ac[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Me(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Se(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Kr(i,t){let e=Rc[t];e===void 0&&(e=new Int32Array(t),Rc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function e0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function n0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2fv(this.addr,t),Se(e,t)}}function i0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;i.uniform3fv(this.addr,t),Se(e,t)}}function s0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4fv(this.addr,t),Se(e,t)}}function r0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(Me(e,n))return;Lc.set(n),i.uniformMatrix2fv(this.addr,!1,Lc),Se(e,n)}}function a0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(Me(e,n))return;Pc.set(n),i.uniformMatrix3fv(this.addr,!1,Pc),Se(e,n)}}function o0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(Me(e,n))return;Cc.set(n),i.uniformMatrix4fv(this.addr,!1,Cc),Se(e,n)}}function l0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function c0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2iv(this.addr,t),Se(e,t)}}function h0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;i.uniform3iv(this.addr,t),Se(e,t)}}function d0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4iv(this.addr,t),Se(e,t)}}function u0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function f0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2uiv(this.addr,t),Se(e,t)}}function p0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;i.uniform3uiv(this.addr,t),Se(e,t)}}function m0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4uiv(this.addr,t),Se(e,t)}}function g0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Tc.compareFunction=Bh,r=Tc):r=id,e.setTexture2D(t||r,s)}function _0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||rd,s)}function x0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ad,s)}function v0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||sd,s)}function y0(i){switch(i){case 5126:return e0;case 35664:return n0;case 35665:return i0;case 35666:return s0;case 35674:return r0;case 35675:return a0;case 35676:return o0;case 5124:case 35670:return l0;case 35667:case 35671:return c0;case 35668:case 35672:return h0;case 35669:case 35673:return d0;case 5125:return u0;case 36294:return f0;case 36295:return p0;case 36296:return m0;case 35678:case 36198:case 36298:case 36306:case 35682:return g0;case 35679:case 36299:case 36307:return _0;case 35680:case 36300:case 36308:case 36293:return x0;case 36289:case 36303:case 36311:case 36292:return v0}}function M0(i,t){i.uniform1fv(this.addr,t)}function S0(i,t){const e=es(t,this.size,2);i.uniform2fv(this.addr,e)}function E0(i,t){const e=es(t,this.size,3);i.uniform3fv(this.addr,e)}function b0(i,t){const e=es(t,this.size,4);i.uniform4fv(this.addr,e)}function w0(i,t){const e=es(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function T0(i,t){const e=es(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function A0(i,t){const e=es(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function R0(i,t){i.uniform1iv(this.addr,t)}function C0(i,t){i.uniform2iv(this.addr,t)}function P0(i,t){i.uniform3iv(this.addr,t)}function L0(i,t){i.uniform4iv(this.addr,t)}function D0(i,t){i.uniform1uiv(this.addr,t)}function I0(i,t){i.uniform2uiv(this.addr,t)}function U0(i,t){i.uniform3uiv(this.addr,t)}function N0(i,t){i.uniform4uiv(this.addr,t)}function F0(i,t,e){const n=this.cache,s=t.length,r=Kr(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||id,r[a])}function O0(i,t,e){const n=this.cache,s=t.length,r=Kr(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||rd,r[a])}function B0(i,t,e){const n=this.cache,s=t.length,r=Kr(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||ad,r[a])}function k0(i,t,e){const n=this.cache,s=t.length,r=Kr(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||sd,r[a])}function z0(i){switch(i){case 5126:return M0;case 35664:return S0;case 35665:return E0;case 35666:return b0;case 35674:return w0;case 35675:return T0;case 35676:return A0;case 5124:case 35670:return R0;case 35667:case 35671:return C0;case 35668:case 35672:return P0;case 35669:case 35673:return L0;case 5125:return D0;case 36294:return I0;case 36295:return U0;case 36296:return N0;case 35678:case 36198:case 36298:case 36306:case 35682:return F0;case 35679:case 36299:case 36307:return O0;case 35680:case 36300:case 36308:case 36293:return B0;case 36289:case 36303:case 36311:case 36292:return k0}}class H0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=y0(e.type)}}class V0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=z0(e.type)}}class G0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Da=/(\w+)(\])?(\[|\.)?/g;function Dc(i,t){i.seq.push(t),i.map[t.id]=t}function W0(i,t,e){const n=i.name,s=n.length;for(Da.lastIndex=0;;){const r=Da.exec(n),a=Da.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Dc(e,c===void 0?new H0(o,i,t):new V0(o,i,t));break}else{let h=e.map[o];h===void 0&&(h=new G0(o),Dc(e,h)),e=h}}}class Sr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);W0(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Ic(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const X0=37297;let j0=0;function Y0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Uc=new Ft;function q0(i){Xt._getMatrix(Uc,Xt.workingColorSpace,i);const t=`mat3( ${Uc.elements.map(e=>e.toFixed(4))} )`;switch(Xt.getTransfer(i)){case Fr:return[t,"LinearTransferOETF"];case Qt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Nc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Y0(i.getShaderSource(t),o)}else return r}function K0(i,t){const e=q0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function $0(i,t){let e;switch(t){case Nu:e="Linear";break;case Fu:e="Reinhard";break;case Ou:e="Cineon";break;case Bu:e="ACESFilmic";break;case zu:e="AgX";break;case Hu:e="Neutral";break;case ku:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const pr=new R;function Z0(){Xt.getLuminanceCoefficients(pr);const i=pr.x.toFixed(4),t=pr.y.toFixed(4),e=pr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function J0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ms).join(`
`)}function Q0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function t_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function ms(i){return i!==""}function Fc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Oc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const e_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oo(i){return i.replace(e_,i_)}const n_=new Map;function i_(i,t){let e=Bt[t];if(e===void 0){const n=n_.get(t);if(n!==void 0)e=Bt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Oo(e)}const s_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bc(i){return i.replace(s_,r_)}function r_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function kc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function a_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Rh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===pu?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===yn&&(t="SHADOWMAP_TYPE_VSM"),t}function o_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case qi:case Ki:t="ENVMAP_TYPE_CUBE";break;case jr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function l_(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Ki&&(t="ENVMAP_MODE_REFRACTION"),t}function c_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ch:t="ENVMAP_BLENDING_MULTIPLY";break;case Iu:t="ENVMAP_BLENDING_MIX";break;case Uu:t="ENVMAP_BLENDING_ADD";break}return t}function h_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function d_(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=a_(e),c=o_(e),u=l_(e),h=c_(e),d=h_(e),f=J0(e),m=Q0(r),_=s.createProgram();let g,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ms).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ms).join(`
`),p.length>0&&(p+=`
`)):(g=[kc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ms).join(`
`),p=[kc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Bn?"#define TONE_MAPPING":"",e.toneMapping!==Bn?Bt.tonemapping_pars_fragment:"",e.toneMapping!==Bn?$0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,K0("linearToOutputTexel",e.outputColorSpace),Z0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ms).join(`
`)),a=Oo(a),a=Fc(a,e),a=Oc(a,e),o=Oo(o),o=Fc(o,e),o=Oc(o,e),a=Bc(a),o=Bc(o),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=S+g+a,v=S+p+o,C=Ic(s,s.VERTEX_SHADER,b),w=Ic(s,s.FRAGMENT_SHADER,v);s.attachShader(_,C),s.attachShader(_,w),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(L){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(_)||"",z=s.getShaderInfoLog(C)||"",H=s.getShaderInfoLog(w)||"",j=U.trim(),G=z.trim(),it=H.trim();let V=!0,ot=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,C,w);else{const ut=Nc(s,C,"vertex"),wt=Nc(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+j+`
`+ut+`
`+wt)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(G===""||it==="")&&(ot=!1);ot&&(L.diagnostics={runnable:V,programLog:j,vertexShader:{log:G,prefix:g},fragmentShader:{log:it,prefix:p}})}s.deleteShader(C),s.deleteShader(w),D=new Sr(s,_),E=t_(s,_)}let D;this.getUniforms=function(){return D===void 0&&A(this),D};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,X0)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=j0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=w,this}let u_=0;class f_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new p_(t),e.set(t,n)),n}}class p_{constructor(t){this.id=u_++,this.code=t,this.usedTimes=0}}function m_(i,t,e,n,s,r,a){const o=new il,l=new f_,c=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return c.add(E),E===0?"uv":`uv${E}`}function g(E,y,L,U,z){const H=U.fog,j=z.geometry,G=E.isMeshStandardMaterial?U.environment:null,it=(E.isMeshStandardMaterial?e:t).get(E.envMap||G),V=it&&it.mapping===jr?it.image.height:null,ot=m[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const ut=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,wt=ut!==void 0?ut.length:0;let Ht=0;j.morphAttributes.position!==void 0&&(Ht=1),j.morphAttributes.normal!==void 0&&(Ht=2),j.morphAttributes.color!==void 0&&(Ht=3);let se,oe,jt,Y;if(ot){const Yt=ln[ot];se=Yt.vertexShader,oe=Yt.fragmentShader}else se=E.vertexShader,oe=E.fragmentShader,l.update(E),jt=l.getVertexShaderID(E),Y=l.getFragmentShaderID(E);const Z=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),Dt=z.isInstancedMesh===!0,bt=z.isBatchedMesh===!0,Gt=!!E.map,Ae=!!E.matcap,P=!!it,le=!!E.aoMap,Ut=!!E.lightMap,Pt=!!E.bumpMap,xt=!!E.normalMap,ce=!!E.displacementMap,vt=!!E.emissiveMap,Ot=!!E.metalnessMap,Ee=!!E.roughnessMap,me=E.anisotropy>0,T=E.clearcoat>0,x=E.dispersion>0,O=E.iridescence>0,X=E.sheen>0,$=E.transmission>0,W=me&&!!E.anisotropyMap,Et=T&&!!E.clearcoatMap,st=T&&!!E.clearcoatNormalMap,yt=T&&!!E.clearcoatRoughnessMap,Mt=O&&!!E.iridescenceMap,tt=O&&!!E.iridescenceThicknessMap,ht=X&&!!E.sheenColorMap,Ct=X&&!!E.sheenRoughnessMap,St=!!E.specularMap,lt=!!E.specularColorMap,Nt=!!E.specularIntensityMap,I=$&&!!E.transmissionMap,et=$&&!!E.thicknessMap,rt=!!E.gradientMap,pt=!!E.alphaMap,J=E.alphaTest>0,K=!!E.alphaHash,_t=!!E.extensions;let It=Bn;E.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(It=i.toneMapping);const re={shaderID:ot,shaderType:E.type,shaderName:E.name,vertexShader:se,fragmentShader:oe,defines:E.defines,customVertexShaderID:jt,customFragmentShaderID:Y,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:bt,batchingColor:bt&&z._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&z.instanceColor!==null,instancingMorph:Dt&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:$i,alphaToCoverage:!!E.alphaToCoverage,map:Gt,matcap:Ae,envMap:P,envMapMode:P&&it.mapping,envMapCubeUVHeight:V,aoMap:le,lightMap:Ut,bumpMap:Pt,normalMap:xt,displacementMap:d&&ce,emissiveMap:vt,normalMapObjectSpace:xt&&E.normalMapType===ju,normalMapTangentSpace:xt&&E.normalMapType===Xu,metalnessMap:Ot,roughnessMap:Ee,anisotropy:me,anisotropyMap:W,clearcoat:T,clearcoatMap:Et,clearcoatNormalMap:st,clearcoatRoughnessMap:yt,dispersion:x,iridescence:O,iridescenceMap:Mt,iridescenceThicknessMap:tt,sheen:X,sheenColorMap:ht,sheenRoughnessMap:Ct,specularMap:St,specularColorMap:lt,specularIntensityMap:Nt,transmission:$,transmissionMap:I,thicknessMap:et,gradientMap:rt,opaque:E.transparent===!1&&E.blending===Hi&&E.alphaToCoverage===!1,alphaMap:pt,alphaTest:J,alphaHash:K,combine:E.combine,mapUv:Gt&&_(E.map.channel),aoMapUv:le&&_(E.aoMap.channel),lightMapUv:Ut&&_(E.lightMap.channel),bumpMapUv:Pt&&_(E.bumpMap.channel),normalMapUv:xt&&_(E.normalMap.channel),displacementMapUv:ce&&_(E.displacementMap.channel),emissiveMapUv:vt&&_(E.emissiveMap.channel),metalnessMapUv:Ot&&_(E.metalnessMap.channel),roughnessMapUv:Ee&&_(E.roughnessMap.channel),anisotropyMapUv:W&&_(E.anisotropyMap.channel),clearcoatMapUv:Et&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:st&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:yt&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Mt&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&_(E.sheenRoughnessMap.channel),specularMapUv:St&&_(E.specularMap.channel),specularColorMapUv:lt&&_(E.specularColorMap.channel),specularIntensityMapUv:Nt&&_(E.specularIntensityMap.channel),transmissionMapUv:I&&_(E.transmissionMap.channel),thicknessMapUv:et&&_(E.thicknessMap.channel),alphaMapUv:pt&&_(E.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(xt||me),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!j.attributes.uv&&(Gt||pt),fog:!!H,useFog:E.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:mt,skinning:z.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:Ht,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:It,decodeVideoTexture:Gt&&E.map.isVideoTexture===!0&&Xt.getTransfer(E.map.colorSpace)===Qt,decodeVideoTextureEmissive:vt&&E.emissiveMap.isVideoTexture===!0&&Xt.getTransfer(E.emissiveMap.colorSpace)===Qt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ue,flipSided:E.side===Oe,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:_t&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_t&&E.extensions.multiDraw===!0||bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return re.vertexUv1s=c.has(1),re.vertexUv2s=c.has(2),re.vertexUv3s=c.has(3),c.clear(),re}function p(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const L in E.defines)y.push(L),y.push(E.defines[L]);return E.isRawShaderMaterial===!1&&(S(y,E),b(y,E),y.push(i.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function S(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function b(E,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),E.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),E.push(o.mask)}function v(E){const y=m[E.type];let L;if(y){const U=ln[y];L=Of.clone(U.uniforms)}else L=E.uniforms;return L}function C(E,y){let L;for(let U=0,z=u.length;U<z;U++){const H=u[U];if(H.cacheKey===y){L=H,++L.usedTimes;break}}return L===void 0&&(L=new d_(i,y,E,r),u.push(L)),L}function w(E){if(--E.usedTimes===0){const y=u.indexOf(E);u[y]=u[u.length-1],u.pop(),E.destroy()}}function A(E){l.remove(E)}function D(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:C,releaseProgram:w,releaseShaderCache:A,programs:u,dispose:D}}function g_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function __(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function zc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Hc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h,d,f,m,_,g){let p=i[t];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:m,renderOrder:h.renderOrder,z:_,group:g},i[t]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=_,p.group=g),t++,p}function o(h,d,f,m,_,g){const p=a(h,d,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(h,d,f,m,_,g){const p=a(h,d,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(h,d){e.length>1&&e.sort(h||__),n.length>1&&n.sort(d||zc),s.length>1&&s.sort(d||zc)}function u(){for(let h=t,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function x_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Hc,i.set(n,[a])):s>=r.length?(a=new Hc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function v_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new kt};break;case"SpotLight":e={position:new R,direction:new R,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new R,halfWidth:new R,halfHeight:new R};break}return i[t.id]=e,e}}}function y_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let M_=0;function S_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function E_(i){const t=new v_,e=y_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const s=new R,r=new ee,a=new ee;function o(c){let u=0,h=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,S=0,b=0,v=0,C=0,w=0,A=0;c.sort(S_);for(let E=0,y=c.length;E<y;E++){const L=c[E],U=L.color,z=L.intensity,H=L.distance,j=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=U.r*z,h+=U.g*z,d+=U.b*z;else if(L.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(L.sh.coefficients[G],z);A++}else if(L.isDirectionalLight){const G=t.get(L);if(G.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const it=L.shadow,V=e.get(L);V.shadowIntensity=it.intensity,V.shadowBias=it.bias,V.shadowNormalBias=it.normalBias,V.shadowRadius=it.radius,V.shadowMapSize=it.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=j,n.directionalShadowMatrix[f]=L.shadow.matrix,S++}n.directional[f]=G,f++}else if(L.isSpotLight){const G=t.get(L);G.position.setFromMatrixPosition(L.matrixWorld),G.color.copy(U).multiplyScalar(z),G.distance=H,G.coneCos=Math.cos(L.angle),G.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),G.decay=L.decay,n.spot[_]=G;const it=L.shadow;if(L.map&&(n.spotLightMap[C]=L.map,C++,it.updateMatrices(L),L.castShadow&&w++),n.spotLightMatrix[_]=it.matrix,L.castShadow){const V=e.get(L);V.shadowIntensity=it.intensity,V.shadowBias=it.bias,V.shadowNormalBias=it.normalBias,V.shadowRadius=it.radius,V.shadowMapSize=it.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=j,v++}_++}else if(L.isRectAreaLight){const G=t.get(L);G.color.copy(U).multiplyScalar(z),G.halfWidth.set(L.width*.5,0,0),G.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=G,g++}else if(L.isPointLight){const G=t.get(L);if(G.color.copy(L.color).multiplyScalar(L.intensity),G.distance=L.distance,G.decay=L.decay,L.castShadow){const it=L.shadow,V=e.get(L);V.shadowIntensity=it.intensity,V.shadowBias=it.bias,V.shadowNormalBias=it.normalBias,V.shadowRadius=it.radius,V.shadowMapSize=it.mapSize,V.shadowCameraNear=it.camera.near,V.shadowCameraFar=it.camera.far,n.pointShadow[m]=V,n.pointShadowMap[m]=j,n.pointShadowMatrix[m]=L.shadow.matrix,b++}n.point[m]=G,m++}else if(L.isHemisphereLight){const G=t.get(L);G.skyColor.copy(L.color).multiplyScalar(z),G.groundColor.copy(L.groundColor).multiplyScalar(z),n.hemi[p]=G,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const D=n.hash;(D.directionalLength!==f||D.pointLength!==m||D.spotLength!==_||D.rectAreaLength!==g||D.hemiLength!==p||D.numDirectionalShadows!==S||D.numPointShadows!==b||D.numSpotShadows!==v||D.numSpotMaps!==C||D.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=v+C-w,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,D.directionalLength=f,D.pointLength=m,D.spotLength=_,D.rectAreaLength=g,D.hemiLength=p,D.numDirectionalShadows=S,D.numPointShadows=b,D.numSpotShadows=v,D.numSpotMaps=C,D.numLightProbes=A,n.version=M_++)}function l(c,u){let h=0,d=0,f=0,m=0,_=0;const g=u.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const b=c[p];if(b.isDirectionalLight){const v=n.directional[h];v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),h++}else if(b.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),f++}else if(b.isRectAreaLight){const v=n.rectArea[m];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(g),a.identity(),r.copy(b.matrixWorld),r.premultiply(g),a.extractRotation(r),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),m++}else if(b.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(g),d++}else if(b.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(g),_++}}}return{setup:o,setupView:l,state:n}}function Vc(i){const t=new E_(i),e=[],n=[];function s(u){c.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function b_(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Vc(i),t.set(s,[o])):r>=a.length?(o=new Vc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const w_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,T_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function A_(i,t,e){let n=new $h;const s=new dt,r=new dt,a=new ge,o=new Zf({depthPacking:Wu}),l=new Jf,c={},u=e.maxTextureSize,h={[Vn]:Oe,[Oe]:Vn,[Ue]:Ue},d=new We({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new dt},radius:{value:4}},vertexShader:w_,fragmentShader:T_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new qt;m.setAttribute("position",new ie(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ye(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rh;let p=this.type;this.render=function(w,A,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;const E=i.getRenderTarget(),y=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),U=i.state;U.setBlending(On),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const z=p!==yn&&this.type===yn,H=p===yn&&this.type!==yn;for(let j=0,G=w.length;j<G;j++){const it=w[j],V=it.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const ot=V.getFrameExtents();if(s.multiply(ot),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ot.x),s.x=r.x*ot.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ot.y),s.y=r.y*ot.y,V.mapSize.y=r.y)),V.map===null||z===!0||H===!0){const wt=this.type!==yn?{minFilter:Ge,magFilter:Ge}:{};V.map!==null&&V.map.dispose(),V.map=new di(s.x,s.y,wt),V.map.texture.name=it.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const ut=V.getViewportCount();for(let wt=0;wt<ut;wt++){const Ht=V.getViewport(wt);a.set(r.x*Ht.x,r.y*Ht.y,r.x*Ht.z,r.y*Ht.w),U.viewport(a),V.updateMatrices(it,wt),n=V.getFrustum(),v(A,D,V.camera,it,this.type)}V.isPointLightShadow!==!0&&this.type===yn&&S(V,D),V.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(E,y,L)};function S(w,A){const D=t.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new di(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,D,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,D,f,_,null)}function b(w,A,D,E){let y=null;const L=D.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(L!==void 0)y=L;else if(y=D.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const U=y.uuid,z=A.uuid;let H=c[U];H===void 0&&(H={},c[U]=H);let j=H[z];j===void 0&&(j=y.clone(),H[z]=j,A.addEventListener("dispose",C)),y=j}if(y.visible=A.visible,y.wireframe=A.wireframe,E===yn?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:h[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,D.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const U=i.properties.get(y);U.light=D}return y}function v(w,A,D,E,y){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===yn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,w.matrixWorld);const z=t.update(w),H=w.material;if(Array.isArray(H)){const j=z.groups;for(let G=0,it=j.length;G<it;G++){const V=j[G],ot=H[V.materialIndex];if(ot&&ot.visible){const ut=b(w,ot,E,y);w.onBeforeShadow(i,w,A,D,z,ut,V),i.renderBufferDirect(D,null,z,ut,w,V),w.onAfterShadow(i,w,A,D,z,ut,V)}}}else if(H.visible){const j=b(w,H,E,y);w.onBeforeShadow(i,w,A,D,z,j,null),i.renderBufferDirect(D,null,z,j,w,null),w.onAfterShadow(i,w,A,D,z,j,null)}}const U=w.children;for(let z=0,H=U.length;z<H;z++)v(U[z],A,D,E,y)}function C(w){w.target.removeEventListener("dispose",C);for(const D in c){const E=c[D],y=w.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}const R_={[qa]:Ka,[$a]:Qa,[Za]:to,[Yi]:Ja,[Ka]:qa,[Qa]:$a,[to]:Za,[Ja]:Yi};function C_(i,t){function e(){let I=!1;const et=new ge;let rt=null;const pt=new ge(0,0,0,0);return{setMask:function(J){rt!==J&&!I&&(i.colorMask(J,J,J,J),rt=J)},setLocked:function(J){I=J},setClear:function(J,K,_t,It,re){re===!0&&(J*=It,K*=It,_t*=It),et.set(J,K,_t,It),pt.equals(et)===!1&&(i.clearColor(J,K,_t,It),pt.copy(et))},reset:function(){I=!1,rt=null,pt.set(-1,0,0,0)}}}function n(){let I=!1,et=!1,rt=null,pt=null,J=null;return{setReversed:function(K){if(et!==K){const _t=t.get("EXT_clip_control");K?_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.ZERO_TO_ONE_EXT):_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.NEGATIVE_ONE_TO_ONE_EXT),et=K;const It=J;J=null,this.setClear(It)}},getReversed:function(){return et},setTest:function(K){K?Z(i.DEPTH_TEST):mt(i.DEPTH_TEST)},setMask:function(K){rt!==K&&!I&&(i.depthMask(K),rt=K)},setFunc:function(K){if(et&&(K=R_[K]),pt!==K){switch(K){case qa:i.depthFunc(i.NEVER);break;case Ka:i.depthFunc(i.ALWAYS);break;case $a:i.depthFunc(i.LESS);break;case Yi:i.depthFunc(i.LEQUAL);break;case Za:i.depthFunc(i.EQUAL);break;case Ja:i.depthFunc(i.GEQUAL);break;case Qa:i.depthFunc(i.GREATER);break;case to:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pt=K}},setLocked:function(K){I=K},setClear:function(K){J!==K&&(et&&(K=1-K),i.clearDepth(K),J=K)},reset:function(){I=!1,rt=null,pt=null,J=null,et=!1}}}function s(){let I=!1,et=null,rt=null,pt=null,J=null,K=null,_t=null,It=null,re=null;return{setTest:function(Yt){I||(Yt?Z(i.STENCIL_TEST):mt(i.STENCIL_TEST))},setMask:function(Yt){et!==Yt&&!I&&(i.stencilMask(Yt),et=Yt)},setFunc:function(Yt,pn,an){(rt!==Yt||pt!==pn||J!==an)&&(i.stencilFunc(Yt,pn,an),rt=Yt,pt=pn,J=an)},setOp:function(Yt,pn,an){(K!==Yt||_t!==pn||It!==an)&&(i.stencilOp(Yt,pn,an),K=Yt,_t=pn,It=an)},setLocked:function(Yt){I=Yt},setClear:function(Yt){re!==Yt&&(i.clearStencil(Yt),re=Yt)},reset:function(){I=!1,et=null,rt=null,pt=null,J=null,K=null,_t=null,It=null,re=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let u={},h={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,S=null,b=null,v=null,C=null,w=null,A=new kt(0,0,0),D=0,E=!1,y=null,L=null,U=null,z=null,H=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,it=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(V)[1]),G=it>=1):V.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),G=it>=2);let ot=null,ut={};const wt=i.getParameter(i.SCISSOR_BOX),Ht=i.getParameter(i.VIEWPORT),se=new ge().fromArray(wt),oe=new ge().fromArray(Ht);function jt(I,et,rt,pt){const J=new Uint8Array(4),K=i.createTexture();i.bindTexture(I,K),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _t=0;_t<rt;_t++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(et,0,i.RGBA,1,1,pt,0,i.RGBA,i.UNSIGNED_BYTE,J):i.texImage2D(et+_t,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,J);return K}const Y={};Y[i.TEXTURE_2D]=jt(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=jt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=jt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=jt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(i.DEPTH_TEST),a.setFunc(Yi),Pt(!1),xt(Nl),Z(i.CULL_FACE),le(On);function Z(I){u[I]!==!0&&(i.enable(I),u[I]=!0)}function mt(I){u[I]!==!1&&(i.disable(I),u[I]=!1)}function Dt(I,et){return h[I]!==et?(i.bindFramebuffer(I,et),h[I]=et,I===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=et),I===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=et),!0):!1}function bt(I,et){let rt=f,pt=!1;if(I){rt=d.get(et),rt===void 0&&(rt=[],d.set(et,rt));const J=I.textures;if(rt.length!==J.length||rt[0]!==i.COLOR_ATTACHMENT0){for(let K=0,_t=J.length;K<_t;K++)rt[K]=i.COLOR_ATTACHMENT0+K;rt.length=J.length,pt=!0}}else rt[0]!==i.BACK&&(rt[0]=i.BACK,pt=!0);pt&&i.drawBuffers(rt)}function Gt(I){return m!==I?(i.useProgram(I),m=I,!0):!1}const Ae={[ei]:i.FUNC_ADD,[gu]:i.FUNC_SUBTRACT,[_u]:i.FUNC_REVERSE_SUBTRACT};Ae[xu]=i.MIN,Ae[vu]=i.MAX;const P={[yu]:i.ZERO,[Mu]:i.ONE,[Su]:i.SRC_COLOR,[ja]:i.SRC_ALPHA,[Ru]:i.SRC_ALPHA_SATURATE,[Tu]:i.DST_COLOR,[bu]:i.DST_ALPHA,[Eu]:i.ONE_MINUS_SRC_COLOR,[Ya]:i.ONE_MINUS_SRC_ALPHA,[Au]:i.ONE_MINUS_DST_COLOR,[wu]:i.ONE_MINUS_DST_ALPHA,[Cu]:i.CONSTANT_COLOR,[Pu]:i.ONE_MINUS_CONSTANT_COLOR,[Lu]:i.CONSTANT_ALPHA,[Du]:i.ONE_MINUS_CONSTANT_ALPHA};function le(I,et,rt,pt,J,K,_t,It,re,Yt){if(I===On){_===!0&&(mt(i.BLEND),_=!1);return}if(_===!1&&(Z(i.BLEND),_=!0),I!==mu){if(I!==g||Yt!==E){if((p!==ei||v!==ei)&&(i.blendEquation(i.FUNC_ADD),p=ei,v=ei),Yt)switch(I){case Hi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ci:i.blendFunc(i.ONE,i.ONE);break;case Fl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ol:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Hi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ci:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Fl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ol:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}S=null,b=null,C=null,w=null,A.set(0,0,0),D=0,g=I,E=Yt}return}J=J||et,K=K||rt,_t=_t||pt,(et!==p||J!==v)&&(i.blendEquationSeparate(Ae[et],Ae[J]),p=et,v=J),(rt!==S||pt!==b||K!==C||_t!==w)&&(i.blendFuncSeparate(P[rt],P[pt],P[K],P[_t]),S=rt,b=pt,C=K,w=_t),(It.equals(A)===!1||re!==D)&&(i.blendColor(It.r,It.g,It.b,re),A.copy(It),D=re),g=I,E=!1}function Ut(I,et){I.side===Ue?mt(i.CULL_FACE):Z(i.CULL_FACE);let rt=I.side===Oe;et&&(rt=!rt),Pt(rt),I.blending===Hi&&I.transparent===!1?le(On):le(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const pt=I.stencilWrite;o.setTest(pt),pt&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),vt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Pt(I){y!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),y=I)}function xt(I){I!==uu?(Z(i.CULL_FACE),I!==L&&(I===Nl?i.cullFace(i.BACK):I===fu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):mt(i.CULL_FACE),L=I}function ce(I){I!==U&&(G&&i.lineWidth(I),U=I)}function vt(I,et,rt){I?(Z(i.POLYGON_OFFSET_FILL),(z!==et||H!==rt)&&(i.polygonOffset(et,rt),z=et,H=rt)):mt(i.POLYGON_OFFSET_FILL)}function Ot(I){I?Z(i.SCISSOR_TEST):mt(i.SCISSOR_TEST)}function Ee(I){I===void 0&&(I=i.TEXTURE0+j-1),ot!==I&&(i.activeTexture(I),ot=I)}function me(I,et,rt){rt===void 0&&(ot===null?rt=i.TEXTURE0+j-1:rt=ot);let pt=ut[rt];pt===void 0&&(pt={type:void 0,texture:void 0},ut[rt]=pt),(pt.type!==I||pt.texture!==et)&&(ot!==rt&&(i.activeTexture(rt),ot=rt),i.bindTexture(I,et||Y[I]),pt.type=I,pt.texture=et)}function T(){const I=ut[ot];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function x(){try{i.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function O(){try{i.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function X(){try{i.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function $(){try{i.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Et(){try{i.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function st(){try{i.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function yt(){try{i.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Mt(){try{i.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function tt(){try{i.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ht(I){se.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),se.copy(I))}function Ct(I){oe.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),oe.copy(I))}function St(I,et){let rt=c.get(et);rt===void 0&&(rt=new WeakMap,c.set(et,rt));let pt=rt.get(I);pt===void 0&&(pt=i.getUniformBlockIndex(et,I.name),rt.set(I,pt))}function lt(I,et){const pt=c.get(et).get(I);l.get(et)!==pt&&(i.uniformBlockBinding(et,pt,I.__bindingPointIndex),l.set(et,pt))}function Nt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ot=null,ut={},h={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,S=null,b=null,v=null,C=null,w=null,A=new kt(0,0,0),D=0,E=!1,y=null,L=null,U=null,z=null,H=null,se.set(0,0,i.canvas.width,i.canvas.height),oe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Z,disable:mt,bindFramebuffer:Dt,drawBuffers:bt,useProgram:Gt,setBlending:le,setMaterial:Ut,setFlipSided:Pt,setCullFace:xt,setLineWidth:ce,setPolygonOffset:vt,setScissorTest:Ot,activeTexture:Ee,bindTexture:me,unbindTexture:T,compressedTexImage2D:x,compressedTexImage3D:O,texImage2D:Mt,texImage3D:tt,updateUBOMapping:St,uniformBlockBinding:lt,texStorage2D:st,texStorage3D:yt,texSubImage2D:X,texSubImage3D:$,compressedTexSubImage2D:W,compressedTexSubImage3D:Et,scissor:ht,viewport:Ct,reset:Nt}}function P_(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new dt,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(T,x){return f?new OffscreenCanvas(T,x):Br("canvas")}function _(T,x,O){let X=1;const $=me(T);if(($.width>O||$.height>O)&&(X=O/Math.max($.width,$.height)),X<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const W=Math.floor(X*$.width),Et=Math.floor(X*$.height);h===void 0&&(h=m(W,Et));const st=x?m(W,Et):h;return st.width=W,st.height=Et,st.getContext("2d").drawImage(T,0,0,W,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+W+"x"+Et+")."),st}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),T;return T}function g(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function S(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(T,x,O,X,$=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let W=x;if(x===i.RED&&(O===i.FLOAT&&(W=i.R32F),O===i.HALF_FLOAT&&(W=i.R16F),O===i.UNSIGNED_BYTE&&(W=i.R8)),x===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(W=i.R8UI),O===i.UNSIGNED_SHORT&&(W=i.R16UI),O===i.UNSIGNED_INT&&(W=i.R32UI),O===i.BYTE&&(W=i.R8I),O===i.SHORT&&(W=i.R16I),O===i.INT&&(W=i.R32I)),x===i.RG&&(O===i.FLOAT&&(W=i.RG32F),O===i.HALF_FLOAT&&(W=i.RG16F),O===i.UNSIGNED_BYTE&&(W=i.RG8)),x===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(W=i.RG8UI),O===i.UNSIGNED_SHORT&&(W=i.RG16UI),O===i.UNSIGNED_INT&&(W=i.RG32UI),O===i.BYTE&&(W=i.RG8I),O===i.SHORT&&(W=i.RG16I),O===i.INT&&(W=i.RG32I)),x===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(W=i.RGB8UI),O===i.UNSIGNED_SHORT&&(W=i.RGB16UI),O===i.UNSIGNED_INT&&(W=i.RGB32UI),O===i.BYTE&&(W=i.RGB8I),O===i.SHORT&&(W=i.RGB16I),O===i.INT&&(W=i.RGB32I)),x===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),O===i.UNSIGNED_INT&&(W=i.RGBA32UI),O===i.BYTE&&(W=i.RGBA8I),O===i.SHORT&&(W=i.RGBA16I),O===i.INT&&(W=i.RGBA32I)),x===i.RGB&&(O===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(W=i.R11F_G11F_B10F)),x===i.RGBA){const Et=$?Fr:Xt.getTransfer(X);O===i.FLOAT&&(W=i.RGBA32F),O===i.HALF_FLOAT&&(W=i.RGBA16F),O===i.UNSIGNED_BYTE&&(W=Et===Qt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&t.get("EXT_color_buffer_float"),W}function v(T,x){let O;return T?x===null||x===hi||x===Ms?O=i.DEPTH24_STENCIL8:x===dn?O=i.DEPTH32F_STENCIL8:x===ys&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===hi||x===Ms?O=i.DEPTH_COMPONENT24:x===dn?O=i.DEPTH_COMPONENT32F:x===ys&&(O=i.DEPTH_COMPONENT16),O}function C(T,x){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ge&&T.minFilter!==hn?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function w(T){const x=T.target;x.removeEventListener("dispose",w),D(x),x.isVideoTexture&&u.delete(x)}function A(T){const x=T.target;x.removeEventListener("dispose",A),y(x)}function D(T){const x=n.get(T);if(x.__webglInit===void 0)return;const O=T.source,X=d.get(O);if(X){const $=X[x.__cacheKey];$.usedTimes--,$.usedTimes===0&&E(T),Object.keys(X).length===0&&d.delete(O)}n.remove(T)}function E(T){const x=n.get(T);i.deleteTexture(x.__webglTexture);const O=T.source,X=d.get(O);delete X[x.__cacheKey],a.memory.textures--}function y(T){const x=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(x.__webglFramebuffer[X]))for(let $=0;$<x.__webglFramebuffer[X].length;$++)i.deleteFramebuffer(x.__webglFramebuffer[X][$]);else i.deleteFramebuffer(x.__webglFramebuffer[X]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[X])}else{if(Array.isArray(x.__webglFramebuffer))for(let X=0;X<x.__webglFramebuffer.length;X++)i.deleteFramebuffer(x.__webglFramebuffer[X]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let X=0;X<x.__webglColorRenderbuffer.length;X++)x.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[X]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const O=T.textures;for(let X=0,$=O.length;X<$;X++){const W=n.get(O[X]);W.__webglTexture&&(i.deleteTexture(W.__webglTexture),a.memory.textures--),n.remove(O[X])}n.remove(T)}let L=0;function U(){L=0}function z(){const T=L;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),L+=1,T}function H(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function j(T,x){const O=n.get(T);if(T.isVideoTexture&&Ot(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&O.__version!==T.version){const X=T.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(O,T,x);return}}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+x)}function G(T,x){const O=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){Y(O,T,x);return}e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+x)}function it(T,x){const O=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){Y(O,T,x);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+x)}function V(T,x){const O=n.get(T);if(T.version>0&&O.__version!==T.version){Z(O,T,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+x)}const ot={[io]:i.REPEAT,[si]:i.CLAMP_TO_EDGE,[so]:i.MIRRORED_REPEAT},ut={[Ge]:i.NEAREST,[Vu]:i.NEAREST_MIPMAP_NEAREST,[Os]:i.NEAREST_MIPMAP_LINEAR,[hn]:i.LINEAR,[ta]:i.LINEAR_MIPMAP_NEAREST,[ri]:i.LINEAR_MIPMAP_LINEAR},wt={[Yu]:i.NEVER,[Qu]:i.ALWAYS,[qu]:i.LESS,[Bh]:i.LEQUAL,[Ku]:i.EQUAL,[Ju]:i.GEQUAL,[$u]:i.GREATER,[Zu]:i.NOTEQUAL};function Ht(T,x){if(x.type===dn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===hn||x.magFilter===ta||x.magFilter===Os||x.magFilter===ri||x.minFilter===hn||x.minFilter===ta||x.minFilter===Os||x.minFilter===ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,ot[x.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,ot[x.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,ot[x.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ut[x.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ut[x.minFilter]),x.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,wt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ge||x.minFilter!==Os&&x.minFilter!==ri||x.type===dn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function se(T,x){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",w));const X=x.source;let $=d.get(X);$===void 0&&($={},d.set(X,$));const W=H(x);if(W!==T.__cacheKey){$[W]===void 0&&($[W]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),$[W].usedTimes++;const Et=$[T.__cacheKey];Et!==void 0&&($[T.__cacheKey].usedTimes--,Et.usedTimes===0&&E(x)),T.__cacheKey=W,T.__webglTexture=$[W].texture}return O}function oe(T,x,O){return Math.floor(Math.floor(T/O)/x)}function jt(T,x,O,X){const W=T.updateRanges;if(W.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,O,X,x.data);else{W.sort((tt,ht)=>tt.start-ht.start);let Et=0;for(let tt=1;tt<W.length;tt++){const ht=W[Et],Ct=W[tt],St=ht.start+ht.count,lt=oe(Ct.start,x.width,4),Nt=oe(ht.start,x.width,4);Ct.start<=St+1&&lt===Nt&&oe(Ct.start+Ct.count-1,x.width,4)===lt?ht.count=Math.max(ht.count,Ct.start+Ct.count-ht.start):(++Et,W[Et]=Ct)}W.length=Et+1;const st=i.getParameter(i.UNPACK_ROW_LENGTH),yt=i.getParameter(i.UNPACK_SKIP_PIXELS),Mt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let tt=0,ht=W.length;tt<ht;tt++){const Ct=W[tt],St=Math.floor(Ct.start/4),lt=Math.ceil(Ct.count/4),Nt=St%x.width,I=Math.floor(St/x.width),et=lt,rt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Nt),i.pixelStorei(i.UNPACK_SKIP_ROWS,I),e.texSubImage2D(i.TEXTURE_2D,0,Nt,I,et,rt,O,X,x.data)}T.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,st),i.pixelStorei(i.UNPACK_SKIP_PIXELS,yt),i.pixelStorei(i.UNPACK_SKIP_ROWS,Mt)}}function Y(T,x,O){let X=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(X=i.TEXTURE_3D);const $=se(T,x),W=x.source;e.bindTexture(X,T.__webglTexture,i.TEXTURE0+O);const Et=n.get(W);if(W.version!==Et.__version||$===!0){e.activeTexture(i.TEXTURE0+O);const st=Xt.getPrimaries(Xt.workingColorSpace),yt=x.colorSpace===Un?null:Xt.getPrimaries(x.colorSpace),Mt=x.colorSpace===Un||st===yt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);let tt=_(x.image,!1,s.maxTextureSize);tt=Ee(x,tt);const ht=r.convert(x.format,x.colorSpace),Ct=r.convert(x.type);let St=b(x.internalFormat,ht,Ct,x.colorSpace,x.isVideoTexture);Ht(X,x);let lt;const Nt=x.mipmaps,I=x.isVideoTexture!==!0,et=Et.__version===void 0||$===!0,rt=W.dataReady,pt=C(x,tt);if(x.isDepthTexture)St=v(x.format===Es,x.type),et&&(I?e.texStorage2D(i.TEXTURE_2D,1,St,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,St,tt.width,tt.height,0,ht,Ct,null));else if(x.isDataTexture)if(Nt.length>0){I&&et&&e.texStorage2D(i.TEXTURE_2D,pt,St,Nt[0].width,Nt[0].height);for(let J=0,K=Nt.length;J<K;J++)lt=Nt[J],I?rt&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,lt.width,lt.height,ht,Ct,lt.data):e.texImage2D(i.TEXTURE_2D,J,St,lt.width,lt.height,0,ht,Ct,lt.data);x.generateMipmaps=!1}else I?(et&&e.texStorage2D(i.TEXTURE_2D,pt,St,tt.width,tt.height),rt&&jt(x,tt,ht,Ct)):e.texImage2D(i.TEXTURE_2D,0,St,tt.width,tt.height,0,ht,Ct,tt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){I&&et&&e.texStorage3D(i.TEXTURE_2D_ARRAY,pt,St,Nt[0].width,Nt[0].height,tt.depth);for(let J=0,K=Nt.length;J<K;J++)if(lt=Nt[J],x.format!==rn)if(ht!==null)if(I){if(rt)if(x.layerUpdates.size>0){const _t=xc(lt.width,lt.height,x.format,x.type);for(const It of x.layerUpdates){const re=lt.data.subarray(It*_t/lt.data.BYTES_PER_ELEMENT,(It+1)*_t/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,It,lt.width,lt.height,1,ht,re)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,lt.width,lt.height,tt.depth,ht,lt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,St,lt.width,lt.height,tt.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?rt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,lt.width,lt.height,tt.depth,ht,Ct,lt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,J,St,lt.width,lt.height,tt.depth,0,ht,Ct,lt.data)}else{I&&et&&e.texStorage2D(i.TEXTURE_2D,pt,St,Nt[0].width,Nt[0].height);for(let J=0,K=Nt.length;J<K;J++)lt=Nt[J],x.format!==rn?ht!==null?I?rt&&e.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,lt.width,lt.height,ht,lt.data):e.compressedTexImage2D(i.TEXTURE_2D,J,St,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?rt&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,lt.width,lt.height,ht,Ct,lt.data):e.texImage2D(i.TEXTURE_2D,J,St,lt.width,lt.height,0,ht,Ct,lt.data)}else if(x.isDataArrayTexture)if(I){if(et&&e.texStorage3D(i.TEXTURE_2D_ARRAY,pt,St,tt.width,tt.height,tt.depth),rt)if(x.layerUpdates.size>0){const J=xc(tt.width,tt.height,x.format,x.type);for(const K of x.layerUpdates){const _t=tt.data.subarray(K*J/tt.data.BYTES_PER_ELEMENT,(K+1)*J/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,tt.width,tt.height,1,ht,Ct,_t)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ht,Ct,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,St,tt.width,tt.height,tt.depth,0,ht,Ct,tt.data);else if(x.isData3DTexture)I?(et&&e.texStorage3D(i.TEXTURE_3D,pt,St,tt.width,tt.height,tt.depth),rt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ht,Ct,tt.data)):e.texImage3D(i.TEXTURE_3D,0,St,tt.width,tt.height,tt.depth,0,ht,Ct,tt.data);else if(x.isFramebufferTexture){if(et)if(I)e.texStorage2D(i.TEXTURE_2D,pt,St,tt.width,tt.height);else{let J=tt.width,K=tt.height;for(let _t=0;_t<pt;_t++)e.texImage2D(i.TEXTURE_2D,_t,St,J,K,0,ht,Ct,null),J>>=1,K>>=1}}else if(Nt.length>0){if(I&&et){const J=me(Nt[0]);e.texStorage2D(i.TEXTURE_2D,pt,St,J.width,J.height)}for(let J=0,K=Nt.length;J<K;J++)lt=Nt[J],I?rt&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ht,Ct,lt):e.texImage2D(i.TEXTURE_2D,J,St,ht,Ct,lt);x.generateMipmaps=!1}else if(I){if(et){const J=me(tt);e.texStorage2D(i.TEXTURE_2D,pt,St,J.width,J.height)}rt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ht,Ct,tt)}else e.texImage2D(i.TEXTURE_2D,0,St,ht,Ct,tt);g(x)&&p(X),Et.__version=W.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function Z(T,x,O){if(x.image.length!==6)return;const X=se(T,x),$=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+O);const W=n.get($);if($.version!==W.__version||X===!0){e.activeTexture(i.TEXTURE0+O);const Et=Xt.getPrimaries(Xt.workingColorSpace),st=x.colorSpace===Un?null:Xt.getPrimaries(x.colorSpace),yt=x.colorSpace===Un||Et===st?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const Mt=x.isCompressedTexture||x.image[0].isCompressedTexture,tt=x.image[0]&&x.image[0].isDataTexture,ht=[];for(let K=0;K<6;K++)!Mt&&!tt?ht[K]=_(x.image[K],!0,s.maxCubemapSize):ht[K]=tt?x.image[K].image:x.image[K],ht[K]=Ee(x,ht[K]);const Ct=ht[0],St=r.convert(x.format,x.colorSpace),lt=r.convert(x.type),Nt=b(x.internalFormat,St,lt,x.colorSpace),I=x.isVideoTexture!==!0,et=W.__version===void 0||X===!0,rt=$.dataReady;let pt=C(x,Ct);Ht(i.TEXTURE_CUBE_MAP,x);let J;if(Mt){I&&et&&e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Nt,Ct.width,Ct.height);for(let K=0;K<6;K++){J=ht[K].mipmaps;for(let _t=0;_t<J.length;_t++){const It=J[_t];x.format!==rn?St!==null?I?rt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,0,0,It.width,It.height,St,It.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,Nt,It.width,It.height,0,It.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,0,0,It.width,It.height,St,lt,It.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,Nt,It.width,It.height,0,St,lt,It.data)}}}else{if(J=x.mipmaps,I&&et){J.length>0&&pt++;const K=me(ht[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Nt,K.width,K.height)}for(let K=0;K<6;K++)if(tt){I?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ht[K].width,ht[K].height,St,lt,ht[K].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Nt,ht[K].width,ht[K].height,0,St,lt,ht[K].data);for(let _t=0;_t<J.length;_t++){const re=J[_t].image[K].image;I?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,0,0,re.width,re.height,St,lt,re.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,Nt,re.width,re.height,0,St,lt,re.data)}}else{I?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,St,lt,ht[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Nt,St,lt,ht[K]);for(let _t=0;_t<J.length;_t++){const It=J[_t];I?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,0,0,St,lt,It.image[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,Nt,St,lt,It.image[K])}}}g(x)&&p(i.TEXTURE_CUBE_MAP),W.__version=$.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function mt(T,x,O,X,$,W){const Et=r.convert(O.format,O.colorSpace),st=r.convert(O.type),yt=b(O.internalFormat,Et,st,O.colorSpace),Mt=n.get(x),tt=n.get(O);if(tt.__renderTarget=x,!Mt.__hasExternalTextures){const ht=Math.max(1,x.width>>W),Ct=Math.max(1,x.height>>W);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?e.texImage3D($,W,yt,ht,Ct,x.depth,0,Et,st,null):e.texImage2D($,W,yt,ht,Ct,0,Et,st,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),vt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,$,tt.__webglTexture,0,ce(x)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,$,tt.__webglTexture,W),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(T,x,O){if(i.bindRenderbuffer(i.RENDERBUFFER,T),x.depthBuffer){const X=x.depthTexture,$=X&&X.isDepthTexture?X.type:null,W=v(x.stencilBuffer,$),Et=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=ce(x);vt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,st,W,x.width,x.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,st,W,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,W,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Et,i.RENDERBUFFER,T)}else{const X=x.textures;for(let $=0;$<X.length;$++){const W=X[$],Et=r.convert(W.format,W.colorSpace),st=r.convert(W.type),yt=b(W.internalFormat,Et,st,W.colorSpace),Mt=ce(x);O&&vt(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt,yt,x.width,x.height):vt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Mt,yt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,yt,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function bt(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=n.get(x.depthTexture);X.__renderTarget=x,(!X.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),j(x.depthTexture,0);const $=X.__webglTexture,W=ce(x);if(x.depthTexture.format===Ss)vt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0);else if(x.depthTexture.format===Es)vt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Gt(T){const x=n.get(T),O=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const X=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),X){const $=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,X.removeEventListener("dispose",$)};X.addEventListener("dispose",$),x.__depthDisposeCallback=$}x.__boundDepthTexture=X}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");const X=T.texture.mipmaps;X&&X.length>0?bt(x.__webglFramebuffer[0],T):bt(x.__webglFramebuffer,T)}else if(O){x.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[X]),x.__webglDepthbuffer[X]===void 0)x.__webglDepthbuffer[X]=i.createRenderbuffer(),Dt(x.__webglDepthbuffer[X],T,!1);else{const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=x.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,W)}}else{const X=T.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Dt(x.__webglDepthbuffer,T,!1);else{const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,W)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ae(T,x,O){const X=n.get(T);x!==void 0&&mt(X.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Gt(T)}function P(T){const x=T.texture,O=n.get(T),X=n.get(x);T.addEventListener("dispose",A);const $=T.textures,W=T.isWebGLCubeRenderTarget===!0,Et=$.length>1;if(Et||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=x.version,a.memory.textures++),W){O.__webglFramebuffer=[];for(let st=0;st<6;st++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[st]=[];for(let yt=0;yt<x.mipmaps.length;yt++)O.__webglFramebuffer[st][yt]=i.createFramebuffer()}else O.__webglFramebuffer[st]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let st=0;st<x.mipmaps.length;st++)O.__webglFramebuffer[st]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(Et)for(let st=0,yt=$.length;st<yt;st++){const Mt=n.get($[st]);Mt.__webglTexture===void 0&&(Mt.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&vt(T)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let st=0;st<$.length;st++){const yt=$[st];O.__webglColorRenderbuffer[st]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[st]);const Mt=r.convert(yt.format,yt.colorSpace),tt=r.convert(yt.type),ht=b(yt.internalFormat,Mt,tt,yt.colorSpace,T.isXRRenderTarget===!0),Ct=ce(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ct,ht,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+st,i.RENDERBUFFER,O.__webglColorRenderbuffer[st])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Dt(O.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(W){e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),Ht(i.TEXTURE_CUBE_MAP,x);for(let st=0;st<6;st++)if(x.mipmaps&&x.mipmaps.length>0)for(let yt=0;yt<x.mipmaps.length;yt++)mt(O.__webglFramebuffer[st][yt],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+st,yt);else mt(O.__webglFramebuffer[st],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);g(x)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let st=0,yt=$.length;st<yt;st++){const Mt=$[st],tt=n.get(Mt);let ht=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ht=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,tt.__webglTexture),Ht(ht,Mt),mt(O.__webglFramebuffer,T,Mt,i.COLOR_ATTACHMENT0+st,ht,0),g(Mt)&&p(ht)}e.unbindTexture()}else{let st=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(st=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(st,X.__webglTexture),Ht(st,x),x.mipmaps&&x.mipmaps.length>0)for(let yt=0;yt<x.mipmaps.length;yt++)mt(O.__webglFramebuffer[yt],T,x,i.COLOR_ATTACHMENT0,st,yt);else mt(O.__webglFramebuffer,T,x,i.COLOR_ATTACHMENT0,st,0);g(x)&&p(st),e.unbindTexture()}T.depthBuffer&&Gt(T)}function le(T){const x=T.textures;for(let O=0,X=x.length;O<X;O++){const $=x[O];if(g($)){const W=S(T),Et=n.get($).__webglTexture;e.bindTexture(W,Et),p(W),e.unbindTexture()}}}const Ut=[],Pt=[];function xt(T){if(T.samples>0){if(vt(T)===!1){const x=T.textures,O=T.width,X=T.height;let $=i.COLOR_BUFFER_BIT;const W=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Et=n.get(T),st=x.length>1;if(st)for(let Mt=0;Mt<x.length;Mt++)e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer);const yt=T.texture.mipmaps;yt&&yt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let Mt=0;Mt<x.length;Mt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),st){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Et.__webglColorRenderbuffer[Mt]);const tt=n.get(x[Mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,tt,0)}i.blitFramebuffer(0,0,O,X,0,0,O,X,$,i.NEAREST),l===!0&&(Ut.length=0,Pt.length=0,Ut.push(i.COLOR_ATTACHMENT0+Mt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Ut.push(W),Pt.push(W),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Pt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ut))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),st)for(let Mt=0;Mt<x.length;Mt++){e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,Et.__webglColorRenderbuffer[Mt]);const tt=n.get(x[Mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,tt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const x=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function ce(T){return Math.min(s.maxSamples,T.samples)}function vt(T){const x=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Ot(T){const x=a.render.frame;u.get(T)!==x&&(u.set(T,x),T.update())}function Ee(T,x){const O=T.colorSpace,X=T.format,$=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==$i&&O!==Un&&(Xt.getTransfer(O)===Qt?(X!==rn||$!==wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}function me(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=U,this.setTexture2D=j,this.setTexture2DArray=G,this.setTexture3D=it,this.setTextureCube=V,this.rebindTextures=Ae,this.setupRenderTarget=P,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=vt}function L_(i,t){function e(n,s=Un){let r;const a=Xt.getTransfer(s);if(n===wn)return i.UNSIGNED_BYTE;if(n===Ko)return i.UNSIGNED_SHORT_4_4_4_4;if(n===$o)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ih)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Uh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Lh)return i.BYTE;if(n===Dh)return i.SHORT;if(n===ys)return i.UNSIGNED_SHORT;if(n===qo)return i.INT;if(n===hi)return i.UNSIGNED_INT;if(n===dn)return i.FLOAT;if(n===Ls)return i.HALF_FLOAT;if(n===Nh)return i.ALPHA;if(n===Fh)return i.RGB;if(n===rn)return i.RGBA;if(n===Ss)return i.DEPTH_COMPONENT;if(n===Es)return i.DEPTH_STENCIL;if(n===Zo)return i.RED;if(n===Jo)return i.RED_INTEGER;if(n===Oh)return i.RG;if(n===Qo)return i.RG_INTEGER;if(n===tl)return i.RGBA_INTEGER;if(n===xr||n===vr||n===yr||n===Mr)if(a===Qt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===xr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===xr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Mr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ro||n===ao||n===oo||n===lo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ro)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ao)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===oo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===lo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===co||n===ho||n===uo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===co||n===ho)return a===Qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===uo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===fo||n===po||n===mo||n===go||n===_o||n===xo||n===vo||n===yo||n===Mo||n===So||n===Eo||n===bo||n===wo||n===To)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===fo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===po)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===mo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===go)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===_o)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===xo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===vo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===yo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Mo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===So)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Eo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===bo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===wo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===To)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ao||n===Ro||n===Co)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ao)return a===Qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ro)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Co)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Po||n===Lo||n===Do||n===Io)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Po)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Lo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Do)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Io)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ms?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const D_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,I_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class U_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new ed(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new We({vertexShader:D_,fragmentShader:I_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ye(new ts(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class N_ extends ui{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,m=null;const _=typeof XRWebGLBinding<"u",g=new U_,p={},S=e.getContextAttributes();let b=null,v=null;const C=[],w=[],A=new dt;let D=null;const E=new $e;E.viewport=new ge;const y=new $e;y.viewport=new ge;const L=[E,y],U=new tp;let z=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Z=C[Y];return Z===void 0&&(Z=new Sa,C[Y]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(Y){let Z=C[Y];return Z===void 0&&(Z=new Sa,C[Y]=Z),Z.getGripSpace()},this.getHand=function(Y){let Z=C[Y];return Z===void 0&&(Z=new Sa,C[Y]=Z),Z.getHandSpace()};function j(Y){const Z=w.indexOf(Y.inputSource);if(Z===-1)return;const mt=C[Z];mt!==void 0&&(mt.update(Y.inputSource,Y.frame,c||a),mt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function G(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",it);for(let Y=0;Y<C.length;Y++){const Z=w[Y];Z!==null&&(w[Y]=null,C[Y].disconnect(Z))}z=null,H=null,g.reset();for(const Y in p)delete p[Y];t.setRenderTarget(b),f=null,d=null,h=null,s=null,v=null,jt.stop(),n.isPresenting=!1,t.setPixelRatio(D),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(s,e)),h},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",G),s.addEventListener("inputsourceschange",it),S.xrCompatible!==!0&&await e.makeXRCompatible(),D=t.getPixelRatio(),t.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let mt=null,Dt=null,bt=null;S.depth&&(bt=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=S.stencil?Es:Ss,Dt=S.stencil?Ms:hi);const Gt={colorFormat:e.RGBA8,depthFormat:bt,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(Gt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new di(d.textureWidth,d.textureHeight,{format:rn,type:wn,depthTexture:new td(d.textureWidth,d.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const mt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,mt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new di(f.framebufferWidth,f.framebufferHeight,{format:rn,type:wn,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),jt.setContext(s),jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function it(Y){for(let Z=0;Z<Y.removed.length;Z++){const mt=Y.removed[Z],Dt=w.indexOf(mt);Dt>=0&&(w[Dt]=null,C[Dt].disconnect(mt))}for(let Z=0;Z<Y.added.length;Z++){const mt=Y.added[Z];let Dt=w.indexOf(mt);if(Dt===-1){for(let Gt=0;Gt<C.length;Gt++)if(Gt>=w.length){w.push(mt),Dt=Gt;break}else if(w[Gt]===null){w[Gt]=mt,Dt=Gt;break}if(Dt===-1)break}const bt=C[Dt];bt&&bt.connect(mt)}}const V=new R,ot=new R;function ut(Y,Z,mt){V.setFromMatrixPosition(Z.matrixWorld),ot.setFromMatrixPosition(mt.matrixWorld);const Dt=V.distanceTo(ot),bt=Z.projectionMatrix.elements,Gt=mt.projectionMatrix.elements,Ae=bt[14]/(bt[10]-1),P=bt[14]/(bt[10]+1),le=(bt[9]+1)/bt[5],Ut=(bt[9]-1)/bt[5],Pt=(bt[8]-1)/bt[0],xt=(Gt[8]+1)/Gt[0],ce=Ae*Pt,vt=Ae*xt,Ot=Dt/(-Pt+xt),Ee=Ot*-Pt;if(Z.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ee),Y.translateZ(Ot),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),bt[10]===-1)Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const me=Ae+Ot,T=P+Ot,x=ce-Ee,O=vt+(Dt-Ee),X=le*P/T*me,$=Ut*P/T*me;Y.projectionMatrix.makePerspective(x,O,X,$,me,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function wt(Y,Z){Z===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Z.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let Z=Y.near,mt=Y.far;g.texture!==null&&(g.depthNear>0&&(Z=g.depthNear),g.depthFar>0&&(mt=g.depthFar)),U.near=y.near=E.near=Z,U.far=y.far=E.far=mt,(z!==U.near||H!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),z=U.near,H=U.far),U.layers.mask=Y.layers.mask|6,E.layers.mask=U.layers.mask&3,y.layers.mask=U.layers.mask&5;const Dt=Y.parent,bt=U.cameras;wt(U,Dt);for(let Gt=0;Gt<bt.length;Gt++)wt(bt[Gt],Dt);bt.length===2?ut(U,E,y):U.projectionMatrix.copy(E.projectionMatrix),Ht(Y,U,Dt)};function Ht(Y,Z,mt){mt===null?Y.matrix.copy(Z.matrixWorld):(Y.matrix.copy(mt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Z.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=bs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(U)},this.getCameraTexture=function(Y){return p[Y]};let se=null;function oe(Y,Z){if(u=Z.getViewerPose(c||a),m=Z,u!==null){const mt=u.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let Dt=!1;mt.length!==U.cameras.length&&(U.cameras.length=0,Dt=!0);for(let P=0;P<mt.length;P++){const le=mt[P];let Ut=null;if(f!==null)Ut=f.getViewport(le);else{const xt=h.getViewSubImage(d,le);Ut=xt.viewport,P===0&&(t.setRenderTargetTextures(v,xt.colorTexture,xt.depthStencilTexture),t.setRenderTarget(v))}let Pt=L[P];Pt===void 0&&(Pt=new $e,Pt.layers.enable(P),Pt.viewport=new ge,L[P]=Pt),Pt.matrix.fromArray(le.transform.matrix),Pt.matrix.decompose(Pt.position,Pt.quaternion,Pt.scale),Pt.projectionMatrix.fromArray(le.projectionMatrix),Pt.projectionMatrixInverse.copy(Pt.projectionMatrix).invert(),Pt.viewport.set(Ut.x,Ut.y,Ut.width,Ut.height),P===0&&(U.matrix.copy(Pt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Dt===!0&&U.cameras.push(Pt)}const bt=s.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){h=n.getBinding();const P=h.getDepthInformation(mt[0]);P&&P.isValid&&P.texture&&g.init(P,s.renderState)}if(bt&&bt.includes("camera-access")&&_){t.state.unbindTexture(),h=n.getBinding();for(let P=0;P<mt.length;P++){const le=mt[P].camera;if(le){let Ut=p[le];Ut||(Ut=new ed,p[le]=Ut);const Pt=h.getCameraImage(le);Ut.sourceTexture=Pt}}}}for(let mt=0;mt<C.length;mt++){const Dt=w[mt],bt=C[mt];Dt!==null&&bt!==void 0&&bt.update(Dt,Z,c||a)}se&&se(Y,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),m=null}const jt=new nd;jt.setAnimationLoop(oe),this.setAnimationLoop=function(Y){se=Y},this.dispose=function(){}}}const Jn=new Tn,F_=new ee;function O_(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Wh(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,S,b,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),h(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,S,b):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Oe&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Oe&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const S=t.get(p),b=S.envMap,v=S.envMapRotation;b&&(g.envMap.value=b,Jn.copy(v),Jn.x*=-1,Jn.y*=-1,Jn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Jn.y*=-1,Jn.z*=-1),g.envMapRotation.value.setFromMatrix4(F_.makeRotationFromEuler(Jn)),g.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,S,b){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*S,g.scale.value=b*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,S){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Oe&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const S=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function B_(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,b){const v=b.program;n.uniformBlockBinding(S,v)}function c(S,b){let v=s[S.id];v===void 0&&(m(S),v=u(S),s[S.id]=v,S.addEventListener("dispose",g));const C=b.program;n.updateUBOMapping(S,C);const w=t.render.frame;r[S.id]!==w&&(d(S),r[S.id]=w)}function u(S){const b=h();S.__bindingPointIndex=b;const v=i.createBuffer(),C=S.__size,w=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,C,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,v),v}function h(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const b=s[S.id],v=S.uniforms,C=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let w=0,A=v.length;w<A;w++){const D=Array.isArray(v[w])?v[w]:[v[w]];for(let E=0,y=D.length;E<y;E++){const L=D[E];if(f(L,w,E,C)===!0){const U=L.__offset,z=Array.isArray(L.value)?L.value:[L.value];let H=0;for(let j=0;j<z.length;j++){const G=z[j],it=_(G);typeof G=="number"||typeof G=="boolean"?(L.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,U+H,L.__data)):G.isMatrix3?(L.__data[0]=G.elements[0],L.__data[1]=G.elements[1],L.__data[2]=G.elements[2],L.__data[3]=0,L.__data[4]=G.elements[3],L.__data[5]=G.elements[4],L.__data[6]=G.elements[5],L.__data[7]=0,L.__data[8]=G.elements[6],L.__data[9]=G.elements[7],L.__data[10]=G.elements[8],L.__data[11]=0):(G.toArray(L.__data,H),H+=it.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,b,v,C){const w=S.value,A=b+"_"+v;if(C[A]===void 0)return typeof w=="number"||typeof w=="boolean"?C[A]=w:C[A]=w.clone(),!0;{const D=C[A];if(typeof w=="number"||typeof w=="boolean"){if(D!==w)return C[A]=w,!0}else if(D.equals(w)===!1)return D.copy(w),!0}return!1}function m(S){const b=S.uniforms;let v=0;const C=16;for(let A=0,D=b.length;A<D;A++){const E=Array.isArray(b[A])?b[A]:[b[A]];for(let y=0,L=E.length;y<L;y++){const U=E[y],z=Array.isArray(U.value)?U.value:[U.value];for(let H=0,j=z.length;H<j;H++){const G=z[H],it=_(G),V=v%C,ot=V%it.boundary,ut=V+ot;v+=ot,ut!==0&&C-ut<it.storage&&(v+=C-ut),U.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=it.storage}}}const w=v%C;return w>0&&(v+=C-w),S.__size=v,S.__cache={},this}function _(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),b}function g(S){const b=S.target;b.removeEventListener("dispose",g);const v=a.indexOf(b.__bindingPointIndex);a.splice(v,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class k_{constructor(t={}){const{canvas:e=_f(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const S=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let C=!1;this._outputColorSpace=Ke;let w=0,A=0,D=null,E=-1,y=null;const L=new ge,U=new ge;let z=null;const H=new kt(0);let j=0,G=e.width,it=e.height,V=1,ot=null,ut=null;const wt=new ge(0,0,G,it),Ht=new ge(0,0,G,it);let se=!1;const oe=new $h;let jt=!1,Y=!1;const Z=new ee,mt=new R,Dt=new ge,bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function Ae(){return D===null?V:1}let P=n;function le(M,N){return e.getContext(M,N)}try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Yo}`),e.addEventListener("webglcontextlost",rt,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",J,!1),P===null){const N="webgl2";if(P=le(N,M),P===null)throw le(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Ut,Pt,xt,ce,vt,Ot,Ee,me,T,x,O,X,$,W,Et,st,yt,Mt,tt,ht,Ct,St,lt,Nt;function I(){Ut=new Kg(P),Ut.init(),St=new L_(P,Ut),Pt=new Vg(P,Ut,t,St),xt=new C_(P,Ut),Pt.reversedDepthBuffer&&d&&xt.buffers.depth.setReversed(!0),ce=new Jg(P),vt=new g_,Ot=new P_(P,Ut,xt,vt,Pt,St,ce),Ee=new Wg(v),me=new qg(v),T=new sp(P),lt=new zg(P,T),x=new $g(P,T,ce,lt),O=new t0(P,x,T,ce),tt=new Qg(P,Pt,Ot),st=new Gg(vt),X=new m_(v,Ee,me,Ut,Pt,lt,st),$=new O_(v,vt),W=new x_,Et=new b_(Ut),Mt=new kg(v,Ee,me,xt,O,f,l),yt=new A_(v,O,Pt),Nt=new B_(P,ce,Pt,xt),ht=new Hg(P,Ut,ce),Ct=new Zg(P,Ut,ce),ce.programs=X.programs,v.capabilities=Pt,v.extensions=Ut,v.properties=vt,v.renderLists=W,v.shadowMap=yt,v.state=xt,v.info=ce}I();const et=new N_(v,P);this.xr=et,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const M=Ut.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Ut.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(M){M!==void 0&&(V=M,this.setSize(G,it,!1))},this.getSize=function(M){return M.set(G,it)},this.setSize=function(M,N,B=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=M,it=N,e.width=Math.floor(M*V),e.height=Math.floor(N*V),B===!0&&(e.style.width=M+"px",e.style.height=N+"px"),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(G*V,it*V).floor()},this.setDrawingBufferSize=function(M,N,B){G=M,it=N,V=B,e.width=Math.floor(M*B),e.height=Math.floor(N*B),this.setViewport(0,0,M,N)},this.getCurrentViewport=function(M){return M.copy(L)},this.getViewport=function(M){return M.copy(wt)},this.setViewport=function(M,N,B,k){M.isVector4?wt.set(M.x,M.y,M.z,M.w):wt.set(M,N,B,k),xt.viewport(L.copy(wt).multiplyScalar(V).round())},this.getScissor=function(M){return M.copy(Ht)},this.setScissor=function(M,N,B,k){M.isVector4?Ht.set(M.x,M.y,M.z,M.w):Ht.set(M,N,B,k),xt.scissor(U.copy(Ht).multiplyScalar(V).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(M){xt.setScissorTest(se=M)},this.setOpaqueSort=function(M){ot=M},this.setTransparentSort=function(M){ut=M},this.getClearColor=function(M){return M.copy(Mt.getClearColor())},this.setClearColor=function(){Mt.setClearColor(...arguments)},this.getClearAlpha=function(){return Mt.getClearAlpha()},this.setClearAlpha=function(){Mt.setClearAlpha(...arguments)},this.clear=function(M=!0,N=!0,B=!0){let k=0;if(M){let F=!1;if(D!==null){const Q=D.texture.format;F=Q===tl||Q===Qo||Q===Jo}if(F){const Q=D.texture.type,ct=Q===wn||Q===hi||Q===ys||Q===Ms||Q===Ko||Q===$o,gt=Mt.getClearColor(),ft=Mt.getClearAlpha(),Rt=gt.r,Lt=gt.g,Tt=gt.b;ct?(m[0]=Rt,m[1]=Lt,m[2]=Tt,m[3]=ft,P.clearBufferuiv(P.COLOR,0,m)):(_[0]=Rt,_[1]=Lt,_[2]=Tt,_[3]=ft,P.clearBufferiv(P.COLOR,0,_))}else k|=P.COLOR_BUFFER_BIT}N&&(k|=P.DEPTH_BUFFER_BIT),B&&(k|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",rt,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",J,!1),Mt.dispose(),W.dispose(),Et.dispose(),vt.dispose(),Ee.dispose(),me.dispose(),O.dispose(),lt.dispose(),Nt.dispose(),X.dispose(),et.dispose(),et.removeEventListener("sessionstart",an),et.removeEventListener("sessionend",vl),Xn.stop()};function rt(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const M=ce.autoReset,N=yt.enabled,B=yt.autoUpdate,k=yt.needsUpdate,F=yt.type;I(),ce.autoReset=M,yt.enabled=N,yt.autoUpdate=B,yt.needsUpdate=k,yt.type=F}function J(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function K(M){const N=M.target;N.removeEventListener("dispose",K),_t(N)}function _t(M){It(M),vt.remove(M)}function It(M){const N=vt.get(M).programs;N!==void 0&&(N.forEach(function(B){X.releaseProgram(B)}),M.isShaderMaterial&&X.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,B,k,F,Q){N===null&&(N=bt);const ct=F.isMesh&&F.matrixWorld.determinant()<0,gt=Sd(M,N,B,k,F);xt.setMaterial(k,ct);let ft=B.index,Rt=1;if(k.wireframe===!0){if(ft=x.getWireframeAttribute(B),ft===void 0)return;Rt=2}const Lt=B.drawRange,Tt=B.attributes.position;let Vt=Lt.start*Rt,Jt=(Lt.start+Lt.count)*Rt;Q!==null&&(Vt=Math.max(Vt,Q.start*Rt),Jt=Math.min(Jt,(Q.start+Q.count)*Rt)),ft!==null?(Vt=Math.max(Vt,0),Jt=Math.min(Jt,ft.count)):Tt!=null&&(Vt=Math.max(Vt,0),Jt=Math.min(Jt,Tt.count));const fe=Jt-Vt;if(fe<0||fe===1/0)return;lt.setup(F,k,gt,B,ft);let ae,ne=ht;if(ft!==null&&(ae=T.get(ft),ne=Ct,ne.setIndex(ae)),F.isMesh)k.wireframe===!0?(xt.setLineWidth(k.wireframeLinewidth*Ae()),ne.setMode(P.LINES)):ne.setMode(P.TRIANGLES);else if(F.isLine){let At=k.linewidth;At===void 0&&(At=1),xt.setLineWidth(At*Ae()),F.isLineSegments?ne.setMode(P.LINES):F.isLineLoop?ne.setMode(P.LINE_LOOP):ne.setMode(P.LINE_STRIP)}else F.isPoints?ne.setMode(P.POINTS):F.isSprite&&ne.setMode(P.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ws("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ne.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ut.get("WEBGL_multi_draw"))ne.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const At=F._multiDrawStarts,he=F._multiDrawCounts,Wt=F._multiDrawCount,Be=ft?T.get(ft).bytesPerElement:1,gi=vt.get(k).currentProgram.getUniforms();for(let ke=0;ke<Wt;ke++)gi.setValue(P,"_gl_DrawID",ke),ne.render(At[ke]/Be,he[ke])}else if(F.isInstancedMesh)ne.renderInstances(Vt,fe,F.count);else if(B.isInstancedBufferGeometry){const At=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,he=Math.min(B.instanceCount,At);ne.renderInstances(Vt,fe,he)}else ne.render(Vt,fe)};function re(M,N,B){M.transparent===!0&&M.side===Ue&&M.forceSinglePass===!1?(M.side=Oe,M.needsUpdate=!0,Ns(M,N,B),M.side=Vn,M.needsUpdate=!0,Ns(M,N,B),M.side=Ue):Ns(M,N,B)}this.compile=function(M,N,B=null){B===null&&(B=M),p=Et.get(B),p.init(N),b.push(p),B.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),M!==B&&M.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const k=new Set;return M.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const Q=F.material;if(Q)if(Array.isArray(Q))for(let ct=0;ct<Q.length;ct++){const gt=Q[ct];re(gt,B,F),k.add(gt)}else re(Q,B,F),k.add(Q)}),p=b.pop(),k},this.compileAsync=function(M,N,B=null){const k=this.compile(M,N,B);return new Promise(F=>{function Q(){if(k.forEach(function(ct){vt.get(ct).currentProgram.isReady()&&k.delete(ct)}),k.size===0){F(M);return}setTimeout(Q,10)}Ut.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Yt=null;function pn(M){Yt&&Yt(M)}function an(){Xn.stop()}function vl(){Xn.start()}const Xn=new nd;Xn.setAnimationLoop(pn),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(M){Yt=M,et.setAnimationLoop(M),M===null?Xn.stop():Xn.start()},et.addEventListener("sessionstart",an),et.addEventListener("sessionend",vl),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(N),N=et.getCamera()),M.isScene===!0&&M.onBeforeRender(v,M,N,D),p=Et.get(M,b.length),p.init(N),b.push(p),Z.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),oe.setFromProjectionMatrix(Z,un,N.reversedDepth),Y=this.localClippingEnabled,jt=st.init(this.clippingPlanes,Y),g=W.get(M,S.length),g.init(),S.push(g),et.enabled===!0&&et.isPresenting===!0){const Q=v.xr.getDepthSensingMesh();Q!==null&&$r(Q,N,-1/0,v.sortObjects)}$r(M,N,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(ot,ut),Gt=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,Gt&&Mt.addToRenderList(g,M),this.info.render.frame++,jt===!0&&st.beginShadows();const B=p.state.shadowsArray;yt.render(B,M,N),jt===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=g.opaque,F=g.transmissive;if(p.setupLights(),N.isArrayCamera){const Q=N.cameras;if(F.length>0)for(let ct=0,gt=Q.length;ct<gt;ct++){const ft=Q[ct];Ml(k,F,M,ft)}Gt&&Mt.render(M);for(let ct=0,gt=Q.length;ct<gt;ct++){const ft=Q[ct];yl(g,M,ft,ft.viewport)}}else F.length>0&&Ml(k,F,M,N),Gt&&Mt.render(M),yl(g,M,N);D!==null&&A===0&&(Ot.updateMultisampleRenderTarget(D),Ot.updateRenderTargetMipmap(D)),M.isScene===!0&&M.onAfterRender(v,M,N),lt.resetDefaultState(),E=-1,y=null,b.pop(),b.length>0?(p=b[b.length-1],jt===!0&&st.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?g=S[S.length-1]:g=null};function $r(M,N,B,k){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)B=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||oe.intersectsSprite(M)){k&&Dt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Z);const ct=O.update(M),gt=M.material;gt.visible&&g.push(M,ct,gt,B,Dt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||oe.intersectsObject(M))){const ct=O.update(M),gt=M.material;if(k&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Dt.copy(M.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Dt.copy(ct.boundingSphere.center)),Dt.applyMatrix4(M.matrixWorld).applyMatrix4(Z)),Array.isArray(gt)){const ft=ct.groups;for(let Rt=0,Lt=ft.length;Rt<Lt;Rt++){const Tt=ft[Rt],Vt=gt[Tt.materialIndex];Vt&&Vt.visible&&g.push(M,ct,Vt,B,Dt.z,Tt)}}else gt.visible&&g.push(M,ct,gt,B,Dt.z,null)}}const Q=M.children;for(let ct=0,gt=Q.length;ct<gt;ct++)$r(Q[ct],N,B,k)}function yl(M,N,B,k){const F=M.opaque,Q=M.transmissive,ct=M.transparent;p.setupLightsView(B),jt===!0&&st.setGlobalState(v.clippingPlanes,B),k&&xt.viewport(L.copy(k)),F.length>0&&Us(F,N,B),Q.length>0&&Us(Q,N,B),ct.length>0&&Us(ct,N,B),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function Ml(M,N,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[k.id]===void 0&&(p.state.transmissionRenderTarget[k.id]=new di(1,1,{generateMipmaps:!0,type:Ut.has("EXT_color_buffer_half_float")||Ut.has("EXT_color_buffer_float")?Ls:wn,minFilter:ri,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace}));const Q=p.state.transmissionRenderTarget[k.id],ct=k.viewport||L;Q.setSize(ct.z*v.transmissionResolutionScale,ct.w*v.transmissionResolutionScale);const gt=v.getRenderTarget(),ft=v.getActiveCubeFace(),Rt=v.getActiveMipmapLevel();v.setRenderTarget(Q),v.getClearColor(H),j=v.getClearAlpha(),j<1&&v.setClearColor(16777215,.5),v.clear(),Gt&&Mt.render(B);const Lt=v.toneMapping;v.toneMapping=Bn;const Tt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),p.setupLightsView(k),jt===!0&&st.setGlobalState(v.clippingPlanes,k),Us(M,B,k),Ot.updateMultisampleRenderTarget(Q),Ot.updateRenderTargetMipmap(Q),Ut.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let Jt=0,fe=N.length;Jt<fe;Jt++){const ae=N[Jt],ne=ae.object,At=ae.geometry,he=ae.material,Wt=ae.group;if(he.side===Ue&&ne.layers.test(k.layers)){const Be=he.side;he.side=Oe,he.needsUpdate=!0,Sl(ne,B,k,At,he,Wt),he.side=Be,he.needsUpdate=!0,Vt=!0}}Vt===!0&&(Ot.updateMultisampleRenderTarget(Q),Ot.updateRenderTargetMipmap(Q))}v.setRenderTarget(gt,ft,Rt),v.setClearColor(H,j),Tt!==void 0&&(k.viewport=Tt),v.toneMapping=Lt}function Us(M,N,B){const k=N.isScene===!0?N.overrideMaterial:null;for(let F=0,Q=M.length;F<Q;F++){const ct=M[F],gt=ct.object,ft=ct.geometry,Rt=ct.group;let Lt=ct.material;Lt.allowOverride===!0&&k!==null&&(Lt=k),gt.layers.test(B.layers)&&Sl(gt,N,B,ft,Lt,Rt)}}function Sl(M,N,B,k,F,Q){M.onBeforeRender(v,N,B,k,F,Q),M.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),F.onBeforeRender(v,N,B,k,M,Q),F.transparent===!0&&F.side===Ue&&F.forceSinglePass===!1?(F.side=Oe,F.needsUpdate=!0,v.renderBufferDirect(B,N,k,F,M,Q),F.side=Vn,F.needsUpdate=!0,v.renderBufferDirect(B,N,k,F,M,Q),F.side=Ue):v.renderBufferDirect(B,N,k,F,M,Q),M.onAfterRender(v,N,B,k,F,Q)}function Ns(M,N,B){N.isScene!==!0&&(N=bt);const k=vt.get(M),F=p.state.lights,Q=p.state.shadowsArray,ct=F.state.version,gt=X.getParameters(M,F.state,Q,N,B),ft=X.getProgramCacheKey(gt);let Rt=k.programs;k.environment=M.isMeshStandardMaterial?N.environment:null,k.fog=N.fog,k.envMap=(M.isMeshStandardMaterial?me:Ee).get(M.envMap||k.environment),k.envMapRotation=k.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,Rt===void 0&&(M.addEventListener("dispose",K),Rt=new Map,k.programs=Rt);let Lt=Rt.get(ft);if(Lt!==void 0){if(k.currentProgram===Lt&&k.lightsStateVersion===ct)return bl(M,gt),Lt}else gt.uniforms=X.getUniforms(M),M.onBeforeCompile(gt,v),Lt=X.acquireProgram(gt,ft),Rt.set(ft,Lt),k.uniforms=gt.uniforms;const Tt=k.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Tt.clippingPlanes=st.uniform),bl(M,gt),k.needsLights=bd(M),k.lightsStateVersion=ct,k.needsLights&&(Tt.ambientLightColor.value=F.state.ambient,Tt.lightProbe.value=F.state.probe,Tt.directionalLights.value=F.state.directional,Tt.directionalLightShadows.value=F.state.directionalShadow,Tt.spotLights.value=F.state.spot,Tt.spotLightShadows.value=F.state.spotShadow,Tt.rectAreaLights.value=F.state.rectArea,Tt.ltc_1.value=F.state.rectAreaLTC1,Tt.ltc_2.value=F.state.rectAreaLTC2,Tt.pointLights.value=F.state.point,Tt.pointLightShadows.value=F.state.pointShadow,Tt.hemisphereLights.value=F.state.hemi,Tt.directionalShadowMap.value=F.state.directionalShadowMap,Tt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Tt.spotShadowMap.value=F.state.spotShadowMap,Tt.spotLightMatrix.value=F.state.spotLightMatrix,Tt.spotLightMap.value=F.state.spotLightMap,Tt.pointShadowMap.value=F.state.pointShadowMap,Tt.pointShadowMatrix.value=F.state.pointShadowMatrix),k.currentProgram=Lt,k.uniformsList=null,Lt}function El(M){if(M.uniformsList===null){const N=M.currentProgram.getUniforms();M.uniformsList=Sr.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function bl(M,N){const B=vt.get(M);B.outputColorSpace=N.outputColorSpace,B.batching=N.batching,B.batchingColor=N.batchingColor,B.instancing=N.instancing,B.instancingColor=N.instancingColor,B.instancingMorph=N.instancingMorph,B.skinning=N.skinning,B.morphTargets=N.morphTargets,B.morphNormals=N.morphNormals,B.morphColors=N.morphColors,B.morphTargetsCount=N.morphTargetsCount,B.numClippingPlanes=N.numClippingPlanes,B.numIntersection=N.numClipIntersection,B.vertexAlphas=N.vertexAlphas,B.vertexTangents=N.vertexTangents,B.toneMapping=N.toneMapping}function Sd(M,N,B,k,F){N.isScene!==!0&&(N=bt),Ot.resetTextureUnits();const Q=N.fog,ct=k.isMeshStandardMaterial?N.environment:null,gt=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:$i,ft=(k.isMeshStandardMaterial?me:Ee).get(k.envMap||ct),Rt=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Lt=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Tt=!!B.morphAttributes.position,Vt=!!B.morphAttributes.normal,Jt=!!B.morphAttributes.color;let fe=Bn;k.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(fe=v.toneMapping);const ae=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ne=ae!==void 0?ae.length:0,At=vt.get(k),he=p.state.lights;if(jt===!0&&(Y===!0||M!==y)){const Le=M===y&&k.id===E;st.setState(k,M,Le)}let Wt=!1;k.version===At.__version?(At.needsLights&&At.lightsStateVersion!==he.state.version||At.outputColorSpace!==gt||F.isBatchedMesh&&At.batching===!1||!F.isBatchedMesh&&At.batching===!0||F.isBatchedMesh&&At.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&At.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&At.instancing===!1||!F.isInstancedMesh&&At.instancing===!0||F.isSkinnedMesh&&At.skinning===!1||!F.isSkinnedMesh&&At.skinning===!0||F.isInstancedMesh&&At.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&At.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&At.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&At.instancingMorph===!1&&F.morphTexture!==null||At.envMap!==ft||k.fog===!0&&At.fog!==Q||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==st.numPlanes||At.numIntersection!==st.numIntersection)||At.vertexAlphas!==Rt||At.vertexTangents!==Lt||At.morphTargets!==Tt||At.morphNormals!==Vt||At.morphColors!==Jt||At.toneMapping!==fe||At.morphTargetsCount!==ne)&&(Wt=!0):(Wt=!0,At.__version=k.version);let Be=At.currentProgram;Wt===!0&&(Be=Ns(k,N,F));let gi=!1,ke=!1,is=!1;const de=Be.getUniforms(),Xe=At.uniforms;if(xt.useProgram(Be.program)&&(gi=!0,ke=!0,is=!0),k.id!==E&&(E=k.id,ke=!0),gi||y!==M){xt.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),de.setValue(P,"projectionMatrix",M.projectionMatrix),de.setValue(P,"viewMatrix",M.matrixWorldInverse);const Ne=de.map.cameraPosition;Ne!==void 0&&Ne.setValue(P,mt.setFromMatrixPosition(M.matrixWorld)),Pt.logarithmicDepthBuffer&&de.setValue(P,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&de.setValue(P,"isOrthographic",M.isOrthographicCamera===!0),y!==M&&(y=M,ke=!0,is=!0)}if(F.isSkinnedMesh){de.setOptional(P,F,"bindMatrix"),de.setOptional(P,F,"bindMatrixInverse");const Le=F.skeleton;Le&&(Le.boneTexture===null&&Le.computeBoneTexture(),de.setValue(P,"boneTexture",Le.boneTexture,Ot))}F.isBatchedMesh&&(de.setOptional(P,F,"batchingTexture"),de.setValue(P,"batchingTexture",F._matricesTexture,Ot),de.setOptional(P,F,"batchingIdTexture"),de.setValue(P,"batchingIdTexture",F._indirectTexture,Ot),de.setOptional(P,F,"batchingColorTexture"),F._colorsTexture!==null&&de.setValue(P,"batchingColorTexture",F._colorsTexture,Ot));const je=B.morphAttributes;if((je.position!==void 0||je.normal!==void 0||je.color!==void 0)&&tt.update(F,B,Be),(ke||At.receiveShadow!==F.receiveShadow)&&(At.receiveShadow=F.receiveShadow,de.setValue(P,"receiveShadow",F.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(Xe.envMap.value=ft,Xe.flipEnvMap.value=ft.isCubeTexture&&ft.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&N.environment!==null&&(Xe.envMapIntensity.value=N.environmentIntensity),ke&&(de.setValue(P,"toneMappingExposure",v.toneMappingExposure),At.needsLights&&Ed(Xe,is),Q&&k.fog===!0&&$.refreshFogUniforms(Xe,Q),$.refreshMaterialUniforms(Xe,k,V,it,p.state.transmissionRenderTarget[M.id]),Sr.upload(P,El(At),Xe,Ot)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Sr.upload(P,El(At),Xe,Ot),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&de.setValue(P,"center",F.center),de.setValue(P,"modelViewMatrix",F.modelViewMatrix),de.setValue(P,"normalMatrix",F.normalMatrix),de.setValue(P,"modelMatrix",F.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Le=k.uniformsGroups;for(let Ne=0,Zr=Le.length;Ne<Zr;Ne++){const jn=Le[Ne];Nt.update(jn,Be),Nt.bind(jn,Be)}}return Be}function Ed(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function bd(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(M,N,B){const k=vt.get(M);k.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),vt.get(M.texture).__webglTexture=N,vt.get(M.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:B,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,N){const B=vt.get(M);B.__webglFramebuffer=N,B.__useDefaultFramebuffer=N===void 0};const wd=P.createFramebuffer();this.setRenderTarget=function(M,N=0,B=0){D=M,w=N,A=B;let k=!0,F=null,Q=!1,ct=!1;if(M){const ft=vt.get(M);if(ft.__useDefaultFramebuffer!==void 0)xt.bindFramebuffer(P.FRAMEBUFFER,null),k=!1;else if(ft.__webglFramebuffer===void 0)Ot.setupRenderTarget(M);else if(ft.__hasExternalTextures)Ot.rebindTextures(M,vt.get(M.texture).__webglTexture,vt.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Tt=M.depthTexture;if(ft.__boundDepthTexture!==Tt){if(Tt!==null&&vt.has(Tt)&&(M.width!==Tt.image.width||M.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ot.setupDepthRenderbuffer(M)}}const Rt=M.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(ct=!0);const Lt=vt.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Lt[N])?F=Lt[N][B]:F=Lt[N],Q=!0):M.samples>0&&Ot.useMultisampledRTT(M)===!1?F=vt.get(M).__webglMultisampledFramebuffer:Array.isArray(Lt)?F=Lt[B]:F=Lt,L.copy(M.viewport),U.copy(M.scissor),z=M.scissorTest}else L.copy(wt).multiplyScalar(V).floor(),U.copy(Ht).multiplyScalar(V).floor(),z=se;if(B!==0&&(F=wd),xt.bindFramebuffer(P.FRAMEBUFFER,F)&&k&&xt.drawBuffers(M,F),xt.viewport(L),xt.scissor(U),xt.setScissorTest(z),Q){const ft=vt.get(M.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,ft.__webglTexture,B)}else if(ct){const ft=N;for(let Rt=0;Rt<M.textures.length;Rt++){const Lt=vt.get(M.textures[Rt]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Rt,Lt.__webglTexture,B,ft)}}else if(M!==null&&B!==0){const ft=vt.get(M.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ft.__webglTexture,B)}E=-1},this.readRenderTargetPixels=function(M,N,B,k,F,Q,ct,gt=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ft=vt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ct!==void 0&&(ft=ft[ct]),ft){xt.bindFramebuffer(P.FRAMEBUFFER,ft);try{const Rt=M.textures[gt],Lt=Rt.format,Tt=Rt.type;if(!Pt.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pt.textureTypeReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-k&&B>=0&&B<=M.height-F&&(M.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+gt),P.readPixels(N,B,k,F,St.convert(Lt),St.convert(Tt),Q))}finally{const Rt=D!==null?vt.get(D).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(M,N,B,k,F,Q,ct,gt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=vt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ct!==void 0&&(ft=ft[ct]),ft)if(N>=0&&N<=M.width-k&&B>=0&&B<=M.height-F){xt.bindFramebuffer(P.FRAMEBUFFER,ft);const Rt=M.textures[gt],Lt=Rt.format,Tt=Rt.type;if(!Pt.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pt.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Vt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Vt),P.bufferData(P.PIXEL_PACK_BUFFER,Q.byteLength,P.STREAM_READ),M.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+gt),P.readPixels(N,B,k,F,St.convert(Lt),St.convert(Tt),0);const Jt=D!==null?vt.get(D).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,Jt);const fe=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await xf(P,fe,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Vt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,Q),P.deleteBuffer(Vt),P.deleteSync(fe),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,N=null,B=0){const k=Math.pow(2,-B),F=Math.floor(M.image.width*k),Q=Math.floor(M.image.height*k),ct=N!==null?N.x:0,gt=N!==null?N.y:0;Ot.setTexture2D(M,0),P.copyTexSubImage2D(P.TEXTURE_2D,B,0,0,ct,gt,F,Q),xt.unbindTexture()};const Td=P.createFramebuffer(),Ad=P.createFramebuffer();this.copyTextureToTexture=function(M,N,B=null,k=null,F=0,Q=null){Q===null&&(F!==0?(ws("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=F,F=0):Q=0);let ct,gt,ft,Rt,Lt,Tt,Vt,Jt,fe;const ae=M.isCompressedTexture?M.mipmaps[Q]:M.image;if(B!==null)ct=B.max.x-B.min.x,gt=B.max.y-B.min.y,ft=B.isBox3?B.max.z-B.min.z:1,Rt=B.min.x,Lt=B.min.y,Tt=B.isBox3?B.min.z:0;else{const je=Math.pow(2,-F);ct=Math.floor(ae.width*je),gt=Math.floor(ae.height*je),M.isDataArrayTexture?ft=ae.depth:M.isData3DTexture?ft=Math.floor(ae.depth*je):ft=1,Rt=0,Lt=0,Tt=0}k!==null?(Vt=k.x,Jt=k.y,fe=k.z):(Vt=0,Jt=0,fe=0);const ne=St.convert(N.format),At=St.convert(N.type);let he;N.isData3DTexture?(Ot.setTexture3D(N,0),he=P.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Ot.setTexture2DArray(N,0),he=P.TEXTURE_2D_ARRAY):(Ot.setTexture2D(N,0),he=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const Wt=P.getParameter(P.UNPACK_ROW_LENGTH),Be=P.getParameter(P.UNPACK_IMAGE_HEIGHT),gi=P.getParameter(P.UNPACK_SKIP_PIXELS),ke=P.getParameter(P.UNPACK_SKIP_ROWS),is=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ae.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ae.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Rt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Lt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Tt);const de=M.isDataArrayTexture||M.isData3DTexture,Xe=N.isDataArrayTexture||N.isData3DTexture;if(M.isDepthTexture){const je=vt.get(M),Le=vt.get(N),Ne=vt.get(je.__renderTarget),Zr=vt.get(Le.__renderTarget);xt.bindFramebuffer(P.READ_FRAMEBUFFER,Ne.__webglFramebuffer),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Zr.__webglFramebuffer);for(let jn=0;jn<ft;jn++)de&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,vt.get(M).__webglTexture,F,Tt+jn),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,vt.get(N).__webglTexture,Q,fe+jn)),P.blitFramebuffer(Rt,Lt,ct,gt,Vt,Jt,ct,gt,P.DEPTH_BUFFER_BIT,P.NEAREST);xt.bindFramebuffer(P.READ_FRAMEBUFFER,null),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(F!==0||M.isRenderTargetTexture||vt.has(M)){const je=vt.get(M),Le=vt.get(N);xt.bindFramebuffer(P.READ_FRAMEBUFFER,Td),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Ad);for(let Ne=0;Ne<ft;Ne++)de?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,je.__webglTexture,F,Tt+Ne):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,je.__webglTexture,F),Xe?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Le.__webglTexture,Q,fe+Ne):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Le.__webglTexture,Q),F!==0?P.blitFramebuffer(Rt,Lt,ct,gt,Vt,Jt,ct,gt,P.COLOR_BUFFER_BIT,P.NEAREST):Xe?P.copyTexSubImage3D(he,Q,Vt,Jt,fe+Ne,Rt,Lt,ct,gt):P.copyTexSubImage2D(he,Q,Vt,Jt,Rt,Lt,ct,gt);xt.bindFramebuffer(P.READ_FRAMEBUFFER,null),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Xe?M.isDataTexture||M.isData3DTexture?P.texSubImage3D(he,Q,Vt,Jt,fe,ct,gt,ft,ne,At,ae.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(he,Q,Vt,Jt,fe,ct,gt,ft,ne,ae.data):P.texSubImage3D(he,Q,Vt,Jt,fe,ct,gt,ft,ne,At,ae):M.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,Q,Vt,Jt,ct,gt,ne,At,ae.data):M.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,Q,Vt,Jt,ae.width,ae.height,ne,ae.data):P.texSubImage2D(P.TEXTURE_2D,Q,Vt,Jt,ct,gt,ne,At,ae);P.pixelStorei(P.UNPACK_ROW_LENGTH,Wt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Be),P.pixelStorei(P.UNPACK_SKIP_PIXELS,gi),P.pixelStorei(P.UNPACK_SKIP_ROWS,ke),P.pixelStorei(P.UNPACK_SKIP_IMAGES,is),Q===0&&N.generateMipmaps&&P.generateMipmap(he),xt.unbindTexture()},this.initRenderTarget=function(M){vt.get(M).__webglFramebuffer===void 0&&Ot.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Ot.setTextureCube(M,0):M.isData3DTexture?Ot.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Ot.setTexture2DArray(M,0):Ot.setTexture2D(M,0),xt.unbindTexture()},this.resetState=function(){w=0,A=0,D=null,xt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Xt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Xt._getUnpackColorSpace()}}const z_=864e5,H_=730,V_=new kt().setHSL(.6,.42,.88),Gc=new kt().setHSL(.12,.1,.86),G_=new kt().setHSL(.075,.45,.7),W_=Date.now();function ul(i){const t=Math.max(i.dateLastUsed??0,i.dateAdded??0);return t>0?t:void 0}function ti(i,t=W_){if(i==null)return .5;const e=Math.max(0,(t-i)/z_);return 1-Math.min(1,Math.log(e+1)/Math.log(H_+1))}function X_(i){return i>=.5?Gc.clone().lerp(V_,(i-.5)*2):G_.clone().lerp(Gc,i*2)}const od=i=>{const t=ti(i.touched),e=.3+.7*t,n=1/(1+i.rank*.5);return{size:(.95+e*1.25)*(1+n*.45),alpha:Math.min(1,(.45+e*.55)*(1+n*.25)),color:X_(t)}};function j_(i,t){const e=[];for(const n of i.stars){const s=t.get(n.id);s&&e.push({id:n.id,x:n.x,y:n.y,brightness:du(s),touched:ul(s),cluster:n.cluster,rank:n.rank})}return e}function Y_(i,t){return{clusters:i.clusters.map(e=>({index:e.index,name:e.name,x:e.x,y:e.y,radius:e.radius,count:e.count})),stars:i.stars.flatMap(e=>{const n=t.get(e.id);return n?[{id:e.id,title:n.title,url:n.url,x:e.x,y:e.y,cluster:e.cluster,rank:e.rank,touched:ul(n)}]:[]})}}const Wc={type:"change"},fl={type:"start"},ld={type:"end"},mr=new Ds,Xc=new on,q_=Math.cos(70*pe.DEG2RAD),ve=new R,Fe=2*Math.PI,te={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ia=1e-6;class K_ extends np{constructor(t,e=null){super(t,e),this.state=te.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Mn.ROTATE,MIDDLE:Mn.DOLLY,RIGHT:Mn.PAN},this.touches={ONE:cn.ROTATE,TWO:cn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new Gn,this._lastTargetPosition=new R,this._quat=new Gn().setFromUnitVectors(t.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new _c,this._sphericalDelta=new _c,this._scale=1,this._panOffset=new R,this._rotateStart=new dt,this._rotateEnd=new dt,this._rotateDelta=new dt,this._panStart=new dt,this._panEnd=new dt,this._panDelta=new dt,this._dollyStart=new dt,this._dollyEnd=new dt,this._dollyDelta=new dt,this._dollyDirection=new R,this._mouse=new dt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Z_.bind(this),this._onPointerDown=$_.bind(this),this._onPointerUp=J_.bind(this),this._onContextMenu=rx.bind(this),this._onMouseWheel=ex.bind(this),this._onKeyDown=nx.bind(this),this._onTouchStart=ix.bind(this),this._onTouchMove=sx.bind(this),this._onMouseDown=Q_.bind(this),this._onMouseMove=tx.bind(this),this._interceptControlDown=ax.bind(this),this._interceptControlUp=ox.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Wc),this.update(),this.state=te.NONE}update(t=null){const e=this.object.position;ve.copy(e).sub(this.target),ve.applyQuaternion(this._quat),this._spherical.setFromVector3(ve),this.autoRotate&&this.state===te.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Fe:n>Math.PI&&(n-=Fe),s<-Math.PI?s+=Fe:s>Math.PI&&(s-=Fe),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(ve.setFromSpherical(this._spherical),ve.applyQuaternion(this._quatInverse),e.copy(this.target).add(ve),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=ve.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new R(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new R(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=ve.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(mr.origin.copy(this.object.position),mr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(mr.direction))<q_?this.object.lookAt(this.target):(Xc.setFromNormalAndCoplanarPoint(this.object.up,this.target),mr.intersectPlane(Xc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ia||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ia||this._lastTargetPosition.distanceToSquared(this.target)>Ia?(this.dispatchEvent(Wc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Fe/60*this.autoRotateSpeed*t:Fe/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ve.setFromMatrixColumn(e,0),ve.multiplyScalar(-t),this._panOffset.add(ve)}_panUp(t,e){this.screenSpacePanning===!0?ve.setFromMatrixColumn(e,1):(ve.setFromMatrixColumn(e,0),ve.crossVectors(this.object.up,ve)),ve.multiplyScalar(t),this._panOffset.add(ve)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ve.copy(s).sub(this.target);let r=ve.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Fe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Fe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Fe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Fe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Fe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Fe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Fe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Fe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new dt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function $_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Z_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function J_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ld),this.state=te.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Q_(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Mn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=te.DOLLY;break;case Mn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=te.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=te.ROTATE}break;case Mn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=te.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=te.PAN}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(fl)}function tx(i){switch(this.state){case te.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case te.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case te.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function ex(i){this.enabled===!1||this.enableZoom===!1||this.state!==te.NONE||(i.preventDefault(),this.dispatchEvent(fl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(ld))}function nx(i){this.enabled!==!1&&this._handleKeyDown(i)}function ix(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case cn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=te.TOUCH_ROTATE;break;case cn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=te.TOUCH_PAN;break;default:this.state=te.NONE}break;case 2:switch(this.touches.TWO){case cn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=te.TOUCH_DOLLY_PAN;break;case cn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=te.TOUCH_DOLLY_ROTATE;break;default:this.state=te.NONE}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(fl)}function sx(i){switch(this._trackPointer(i),this.state){case te.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case te.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case te.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case te.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=te.NONE}}function rx(i){this.enabled!==!1&&i.preventDefault()}function ax(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ox(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class lx extends K_{constructor(t,e){super(t,e),this.screenSpacePanning=!1,this.mouseButtons={LEFT:Mn.PAN,MIDDLE:Mn.DOLLY,RIGHT:Mn.ROTATE},this.touches={ONE:cn.PAN,TWO:cn.DOLLY_ROTATE}}}const cx=60,hx={cluster:13,star:11},dx={cluster:.28,star:.02},ux={cluster:"--font-name",star:"--font-text"},Fi=8,fx=5,px=11,mx=18,gx=i=>!/[ -߿｡-ﾟ]/.test(i);function _x(i,t){let e=0;for(let n=0;n<i.length;n++)if(e+=gx(i[n])?1:.5,e>t)return i.slice(0,Math.max(1,n))+"…";return i}const jc=i=>i.fontSize??(i.searchRank==null?hx[i.kind]:i.searchRank<3?14:i.searchRank<9?12:10),xx=(i,t)=>i.l<t.r&&t.l<i.r&&i.t<t.b&&t.t<i.b;function vx(i,t){const e=Math.max(i.l,Math.min(t.sx,i.r)),n=Math.max(i.t,Math.min(t.sy,i.b));return((e-t.sx)/t.rx)**2+((n-t.sy)/t.ry)**2<1}class yx{constructor(t){this.container=t,t.addEventListener("mouseover",this.onOver),t.addEventListener("mouseout",this.onOut),t.addEventListener("click",this.onLabelClick)}container;elements=new Map;active=[];fontFamily={};measure=document.createElement("canvas").getContext("2d");fullText=new Map;hovered=null;onHover=null;onClick=null;onClusterClick=null;render(t,e,n=[]){const s=[],r=[];for(const a of[...t].sort((o,l)=>o.priority-l.priority)){if(r.length>=cx)break;const o=a.text;this.fullText.set(a.key,o);const l=a.kind==="star"&&e==="mid"&&this.hovered!==a.key?_x(o,mx):o,c=jc(a),u=this.labelWidth(a,l,c),h=c+6,d=a.sy-h/2,f=a.kind==="cluster"&&e==="far"?{l:a.sx-u/2,t:d,r:a.sx+u/2,b:d+h}:a.kind==="star"&&a.side==="left"?{l:a.sx-Fi-u,t:d,r:a.sx-Fi,b:d+h}:{l:a.sx+Fi,t:d,r:a.sx+Fi+u,b:d+h};if(s.some(_=>xx(_,f)))continue;const m={l:f.l-20,t:f.t-4,r:f.r+20,b:f.b+4};a.kind==="star"&&a.priority>-3e3&&n.some(_=>_.cluster!==a.cluster&&vx(m,_))||(s.push(f),r.push({item:a,text:l,box:f}))}return this.paint(r),r.length}clear(){this.paint([])}updatePositions(t){for(const{item:e,width:n,height:s}of this.active){const r=t(e);if(!r)continue;const a=e.centered?r.sx-n/2:e.kind==="star"&&e.side==="left"?r.sx-Fi-n:r.sx+Fi,o=r.sy-s/2;this.elements.get(e.key).style.transform=`translate3d(${a.toFixed(1)}px, ${o.toFixed(1)}px, 0)`}}paint(t){const e=new Set(t.map(({item:n})=>n.key));for(const[n,s]of this.elements)e.has(n)||(s.style.opacity="0",s.style.pointerEvents="none",setTimeout(()=>{this.active.some(({item:r})=>r.key===n)||(s.remove(),this.elements.delete(n))},220));this.active=t.map(({item:n,text:s,box:r})=>({item:n,text:s,baseWidth:r.r-r.l,width:r.r-r.l,height:r.b-r.t})),t.forEach(({item:n,text:s,box:r})=>{let a=this.elements.get(n.key);const o=!a;a||(a=document.createElement("div"),a.className="label",a.style.opacity="0",this.container.appendChild(a),this.elements.set(n.key,a)),a.textContent=s;const l=n.searchRank==null?"":n.searchRank<3?" label-orbit-inner":n.searchRank<9?" label-orbit-middle":" label-orbit-outer";a.className=`label label-${n.kind}${l}${n.kind==="cluster"?" label-cluster-focus":""}${n.dim?" label-dim":""}`,a.dataset.key=n.key,a.dataset.searchRank=n.searchRank==null?"":String(n.searchRank),a.dataset.cluster=n.cluster==null?"":String(n.cluster),a.dataset.side=n.side??"",a.dataset.kind=n.kind,a.style.textAlign=n.side==="left"?"right":"left",a.style.fontSize=n.fontSize?`${n.fontSize}px`:"",a.style.width=n.searchRank==null?"":`${(r.r-r.l).toFixed(1)}px`,a.style.boxSizing=n.searchRank==null?"":"border-box",a.style.setProperty("--cluster-color",n.color??"transparent"),a.style.pointerEvents="auto",a.style.transform=`translate3d(${r.l.toFixed(1)}px, ${r.t.toFixed(1)}px, 0)`;const c=n.dim?"0.3":this.hovered===n.key?"1":String(n.opacity??1);o?requestAnimationFrame(()=>{this.active.some(({item:u})=>u.key===n.key)&&(a.style.opacity=c)}):a.style.opacity=c})}onOver=t=>{const e=t.target,n=e?.dataset?.key;if(!n)return;this.hovered=n,this.onHover?.(n),e.classList.add("is-hovered"),this.active.find(({item:o})=>o.key===n)?.item.opacity!=null&&(e.style.opacity="1");const r=this.fullText.get(n)??"";e.textContent=r;const a=this.active.find(({item:o})=>o.key===n);if(a&&a.text!==r){const o=jc(a.item);a.width=this.labelWidth(a.item,r,o)}};onOut=t=>{const e=t.target;e.classList.remove("is-hovered");const n=this.active.find(({item:s})=>s.key===e.dataset?.key);n&&(e.textContent=n.text,n.width=n.baseWidth,e.style.opacity=n.item.dim?"0.3":String(n.item.opacity??1)),this.hovered=null,this.onHover?.(null)};labelWidth(t,e,n){return this.textWidth(e,n,t.kind)+fx*2+(t.kind==="star"?px:0)+(t.searchRank==null?0:16)}onLabelClick=t=>{const e=t.target;e?.dataset?.kind==="star"&&e.dataset.key?this.onClick?.(e.dataset.key):e?.dataset?.kind==="cluster"&&e.classList.contains("label-cluster-focus")&&this.onClusterClick?.(Number(e.dataset.cluster))};textWidth(t,e,n){const s=t.length*e*dx[n];return this.measure?(this.fontFamily[n]??=getComputedStyle(document.documentElement).getPropertyValue(ux[n]).trim()||getComputedStyle(this.container).fontFamily||"sans-serif",this.measure.font=`${e}px ${this.fontFamily[n]}`,this.measure.measureText(t).width+s):t.length*e*.9+s}}const Mx=`
attribute vec3 aColor;
attribute float aSeed;
varying vec2 vUv;
varying vec3 vColor;
varying float vSeed;
void main() {
  vUv = uv;
  vColor = aColor;
  vSeed = aSeed;
  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
}
`,Sx=`
varying vec2 vUv;
varying vec3 vColor;
varying float vSeed;
void main() {
  vec2 p = (vUv - 0.5) * 2.0;
  // 輪郭をゆるく波打たせ、星団ごとに違う形の雲にする（色相ではなく形で見分ける）
  float angle = atan(p.y, p.x);
  float wobble = 1.0 + 0.13 * sin(3.0 * angle + vSeed * 2.1) + 0.07 * sin(5.0 * angle + vSeed * 4.7);
  float d = length(p) * wobble;
  if (d > 1.0) discard;
  float a = pow(1.0 - d, 2.2) * 0.42;
  gl_FragColor = vec4(vColor, a);
}
`;class Ex{object=new Ze;mesh=null;geometry=new ts(1,1).rotateX(-Math.PI/2);material=new We({vertexShader:Mx,fragmentShader:Sx,transparent:!0,depthWrite:!1,blending:ci});set(t){if(this.mesh&&(this.object.remove(this.mesh),this.mesh.dispose(),this.mesh=null),t.length===0)return;const e=new Kh(this.geometry,this.material,t.length),n=new Float32Array(t.length*3),s=new Float32Array(t.length),r=new Gn,a=new R(0,1,0),o=new ee;t.forEach((l,c)=>{const u=l.radius*2.8,h=.8+l.seed*37%10/50;r.setFromAxisAngle(a,l.seed*53%180*Math.PI/180),o.compose(new R(l.x,-.2,-l.y),r,new R(u,1,u*h)),s[c]=l.seed,e.setMatrixAt(c,o),n[c*3]=l.color.r,n[c*3+1]=l.color.g,n[c*3+2]=l.color.b}),e.geometry.setAttribute("aColor",new zr(n,3)),e.geometry.setAttribute("aSeed",new zr(s,1)),e.instanceMatrix.needsUpdate=!0,e.frustumCulled=!1,this.mesh=e,this.object.add(e)}}const bx=i=>{const t=1/(1+i.rank*.5);return{size:(.95+i.brightness*1.25)*(1+t*.45),alpha:Math.min(1,(.45+i.brightness*.55)*(1+t*.25)),color:Cx(i.id,i.brightness)}},wx=`
uniform float uScale;    // 画面の高さと画角から決まる、世界の大きさ→ピクセルの係数
uniform float uMaxSize;  // 画面上の大きさの上限（地図 12px、飛行中は大きく）
uniform float uFlight;   // 飛行中 1。近い（大きく写る）星ほど明るくする
uniform float uSizeScale; // 大きさの係数。地図は遠くから見るので 1、飛行中は近くから見るので小さく
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float px = aSize * uSizeScale * uScale / max(-mv.z, 0.001);
  gl_PointSize = clamp(px, 2.0, uMaxSize);
  gl_Position = projectionMatrix * mv;
  vAlpha = aAlpha * (1.0 + uFlight * clamp((px - 8.0) / 40.0, 0.0, 1.0) * 0.8);
  vColor = aColor;
}
`,cd=12,Tx=64,Ax=.55,Rx=`
varying float vAlpha;
varying vec3 vColor;
void main() {
  float r = length(gl_PointCoord - 0.5);
  float core = smoothstep(0.5, 0.06, r);
  float glow = exp(-r * r * 11.0);
  float a = (core * 0.8 + glow * 0.55) * vAlpha;
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor, a);
}
`;function pl(){return new We({uniforms:{uScale:{value:800},uMaxSize:{value:cd},uFlight:{value:0},uSizeScale:{value:1}},vertexShader:wx,fragmentShader:Rx,transparent:!0,depthWrite:!1,blending:ci})}function Cx(i,t){let e=2166136261;for(let a=0;a<i.length;a++)e=Math.imul(e^i.charCodeAt(a),16777619)>>>0;const n=e%1e3/1e3,s=n<.5?.11:.6,r=.06+Math.abs(n-.5)*.28;return new kt().setHSL(s,r,.8+t*.15)}function Yc(i){const t=[.46,.34,.54,.38,.5,.31,.57,.42][i%8];return new kt().setHSL(.63,.3,t)}const Px=.9,Lx=.5;class Dx{object;geom=new qt;stars=[];index=new Map;position;alphaAttr;sizeAttr;baseSize=new Float32Array(0);searchSize=new Float32Array(0);from=new Float32Array(0);to=new Float32Array(0);bornAt=new Float32Array(0);targetAlpha=new Float32Array(0);moveT=1;elapsed=0;springX=new Float32Array(0);springY=new Float32Array(0);velocityX=new Float32Array(0);velocityY=new Float32Array(0);searchX=new Float32Array(0);searchY=new Float32Array(0);searchAlpha=new Float32Array(0);searching=!1;settling=!1;colorAttr;appearance=bx;heights=new Float32Array(0);lift=0;liftDirty=!1;setAppearance(t){this.appearance=t;const e=this.sizeAttr?.array,n=this.colorAttr?.array;!e||!n||(this.stars.forEach((s,r)=>{const a=t(s);this.baseSize[r]=a.size,this.targetAlpha[r]=a.alpha,n[r*3]=a.color.r,n[r*3+1]=a.color.g,n[r*3+2]=a.color.b}),this.colorAttr.needsUpdate=!0,this.applyTargets())}setHeights(t){this.heights=new Float32Array(this.stars.length),this.stars.forEach((e,n)=>{this.heights[n]=t.get(e.id)??0}),this.liftDirty=!0}setLift(t){t!==this.lift&&(this.lift=t,this.liftDirty=!0)}position3(t){const e=this.index.get(t);if(e==null)return null;const n=this.position.array;return{x:n[e*3],y:-n[e*3+2],z:n[e*3+1]}}positionWorld(t,e,n){const s=this.index.get(t);if(s==null)return!1;const r=this.position.array;return e.set(r[s*3]*n,r[s*3+1]*n,r[s*3+2]*n),!0}pointSize(t){const e=this.index.get(t);return e==null?null:this.sizeAttr.array[e]}lastSearch={ids:[],center:{x:0,y:0},unit:1};emphasis=new Set;emphasisMode="none";get isSettling(){return this.settling}constructor(){this.object=new Yr(this.geom,pl()),this.object.frustumCulled=!1}get count(){return this.stars.length}get placed(){return this.stars}setStars(t,e=!0){const n=this.positionsById(),s=t.length,r=new Float32Array(s*3),a=new Float32Array(s),o=new Float32Array(s*3),l=new Float32Array(s);this.from=new Float32Array(s*2),this.to=new Float32Array(s*2),this.bornAt=new Float32Array(s),this.targetAlpha=new Float32Array(s),this.springX=new Float32Array(s),this.springY=new Float32Array(s),this.velocityX=new Float32Array(s),this.velocityY=new Float32Array(s),this.searchX=new Float32Array(s),this.searchY=new Float32Array(s),this.searchAlpha=new Float32Array(s),this.baseSize=new Float32Array(s),this.searchSize=new Float32Array(s),this.index=new Map;const c=new kt,u=n.size===0;t.forEach((h,d)=>{this.index.set(h.id,d);const f=n.get(h.id),m=f?f.x:h.x,_=f?f.y:h.y;this.from[d*2]=m,this.from[d*2+1]=_,this.to[d*2]=h.x,this.to[d*2+1]=h.y,this.springX[d]=m,this.springY[d]=_,this.searchX[d]=h.x,this.searchY[d]=h.y,r[d*3]=m,r[d*3+1]=0,r[d*3+2]=-_;const g=this.appearance(h);a[d]=g.size,this.baseSize[d]=this.searchSize[d]=a[d],c.copy(g.color),o[d*3]=c.r,o[d*3+1]=c.g,o[d*3+2]=c.b,this.targetAlpha[d]=g.alpha,this.searchAlpha[d]=this.targetAlpha[d];const p=u?d/Math.max(1,s)*1.6:0;this.bornAt[d]=f?-1:p,l[d]=f?this.targetAlpha[d]:0}),this.stars=t,this.elapsed=0,this.moveT=e&&n.size>0?0:1,this.searching=!1,this.lastSearch={ids:[],center:{x:0,y:0},unit:1},this.geom.dispose(),this.geom=new qt,this.position=new ie(r,3),this.alphaAttr=new ie(l,1),this.sizeAttr=new ie(a,1),this.geom.setAttribute("position",this.position),this.geom.setAttribute("aSize",this.sizeAttr),this.colorAttr=new ie(o,3),this.geom.setAttribute("aColor",this.colorAttr),this.geom.setAttribute("aAlpha",this.alphaAttr),this.heights=new Float32Array(s),this.liftDirty=!0,this.object.geometry=this.geom}setSearch(t,e,n){this.moveT=1,this.lastSearch={ids:t,center:e,unit:n},this.applyTargets()}setEmphasis(t,e){this.emphasis=new Set(e==="none"?[]:t),this.emphasisMode=e,this.applyTargets()}applyTargets(){const{ids:t,center:e,unit:n}=this.lastSearch;this.searching=t.length>0;const s=new Map(t.slice(0,21).map((r,a)=>[r,a]));this.stars.forEach((r,a)=>{const o=s.get(r.id);if(o==null){this.searchX[a]=r.x,this.searchY[a]=r.y,this.searchAlpha[a]=this.searching?this.targetAlpha[a]*.25:this.targetAlpha[a],this.searchSize[a]=this.baseSize[a];return}const l=o<3?0:o<9?1:2,c=[0,3,9][l],u=[3,6,12][l],h=-Math.PI/2+(o-c)/u*Math.PI*2+l*.12,d=[1,1.75,2.55][l]*n;this.searchX[a]=e.x+Math.cos(h)*d,this.searchY[a]=e.y+Math.sin(h)*d,this.searchAlpha[a]=[1,.78,.55][l],this.searchSize[a]=[3.4,2.5,1.7][l]}),this.emphasisMode!=="none"&&this.stars.forEach((r,a)=>{this.emphasis.has(r.id)?(this.searchSize[a]=Math.max(this.searchSize[a],this.baseSize[a])*1.45,this.searchAlpha[a]=Math.min(1,Math.max(this.searchAlpha[a],this.targetAlpha[a])*1.4+.1)):this.emphasisMode==="edit"&&(this.searchAlpha[a]*=.45,this.searchSize[a]*=.85)})}displayPosition(t){const e=this.index.get(t);return e==null?null:{x:this.springX[e],y:this.springY[e]}}visual(t){const e=this.index.get(t);return e==null?null:{size:this.sizeAttr.array[e],alpha:this.alphaAttr.array[e]}}update(t){if(this.stars.length===0)return;if(this.elapsed+=t,this.moveT<1){this.moveT=Math.min(1,this.moveT+t/Px);const l=Ix(this.moveT),c=this.position.array;for(let u=0;u<this.stars.length;u++){const h=this.from[u*2]+(this.to[u*2]-this.from[u*2])*l,d=this.from[u*2+1]+(this.to[u*2+1]-this.from[u*2+1])*l;c[u*3]=h,c[u*3+2]=-d,this.springX[u]=h,this.springY[u]=d,this.velocityX[u]=0,this.velocityY[u]=0}this.position.needsUpdate=!0}const e=this.alphaAttr.array,n=this.position.array;let s=!1,r=!1;for(let l=0;this.moveT>=1&&l<this.stars.length;l++){if(!this.searching&&Math.abs(this.springX[l]-this.stars[l].x)<.001&&Math.abs(this.springY[l]-this.stars[l].y)<.001&&Math.abs(this.velocityX[l])+Math.abs(this.velocityY[l])<.001)continue;const c=Math.exp(-13*t);this.velocityX[l]=(this.velocityX[l]+(this.searchX[l]-this.springX[l])*90*t)*c,this.velocityY[l]=(this.velocityY[l]+(this.searchY[l]-this.springY[l])*90*t)*c,this.springX[l]+=this.velocityX[l]*t,this.springY[l]+=this.velocityY[l]*t,(Math.abs(this.searchX[l]-this.springX[l])+Math.abs(this.searchY[l]-this.springY[l])>.3||Math.abs(this.velocityX[l])+Math.abs(this.velocityY[l])>1)&&(r=!0),n[l*3]=this.springX[l],n[l*3+2]=-this.springY[l],s=!0}if(s&&(this.position.needsUpdate=!0),this.settling=r||this.moveT<1,this.searching||s||this.stars.some((l,c)=>Math.abs(e[c]-this.searchAlpha[c])>.001)){for(let l=0;l<this.stars.length;l++)e[l]+=(this.searchAlpha[l]-e[l])*Math.min(1,t*12);this.alphaAttr.needsUpdate=!0}let a=!1;for(let l=0;l<this.stars.length;l++){if(this.bornAt[l]<0)continue;a=!0;const c=(this.elapsed-this.bornAt[l])/Lx;if(c>=1)e[l]=this.targetAlpha[l],this.bornAt[l]=-1;else if(c<=0)e[l]=0;else{const u=1+.9*Math.sin(Math.PI*c)*(1-c);e[l]=this.targetAlpha[l]*c*u}}if(a&&(this.alphaAttr.needsUpdate=!0),this.liftDirty){for(let l=0;l<this.stars.length;l++)n[l*3+1]=this.heights[l]*this.lift;this.position.needsUpdate=!0,this.liftDirty=!1}const o=this.sizeAttr.array;if(this.stars.some((l,c)=>Math.abs(o[c]-this.searchSize[c])>.001)){for(let l=0;l<this.stars.length;l++)o[l]+=(this.searchSize[l]-o[l])*Math.min(1,t*12);this.sizeAttr.needsUpdate=!0}}positionsById(){const t=new Map;if(this.stars.length===0)return t;const e=this.position.array;return this.stars.forEach((n,s)=>t.set(n.id,{x:e[s*3],y:-e[s*3+2]})),t}}const Ix=i=>i<.5?2*i*i:1-(-2*i+2)**2/2;function Ux(i=7){const e=new Float32Array(4200),n=new Float32Array(1400),s=new Float32Array(1400*3),r=new Float32Array(1400);let a=i;const o=()=>(a=(a*1664525+1013904223)%4294967296,a/4294967296);for(let u=0;u<1400;u++){const h=420+o()*380,d=o()*Math.PI*2,f=Math.acos(2*o()-1);e[u*3]=h*Math.sin(f)*Math.cos(d),e[u*3+1]=h*Math.cos(f)*.55,e[u*3+2]=h*Math.sin(f)*Math.sin(d),n[u]=.5+o()*1.1;const m=.78+o()*.22,_=o()*.06;s[u*3]=m,s[u*3+1]=m*(.98-_*.3),s[u*3+2]=m*(.96-_),r[u]=.05+o()*.16}const l=new qt;l.setAttribute("position",new ie(e,3)),l.setAttribute("aSize",new ie(n,1)),l.setAttribute("aColor",new ie(s,3)),l.setAttribute("aAlpha",new ie(r,1));const c=new Yr(l,pl());return c.frustumCulled=!1,c}const ue=4,Nx=1.4,Fx=1.2,Ox=1.8,Bx=12,qc=1e-4,Kc=1.2,kx=1,zx=1,Hx=6,Vx=.5,Gx=4,Ua=.15,Wx=6,$c=i=>{const t=Math.abs(i);return t<Ua?0:Math.sign(i)*Math.min(1,(t-Ua)/(1-Ua))};class Xx{phase="idle";lift=0;ship={position:new R,yaw:0,pitch:0,speed:0};mapDistance=90;turnVelocity=0;climbVelocity=0;maxSpeed=12;boostLeft=0;boostMultiplier=1.6;bound=120;ceiling=40;startPosition=new R;elapsed=0;fromPosition=new R;fromLook=new R;toPosition=new R;toLook=new R;get active(){return this.phase!=="idle"}get normalMaxSpeed(){return this.maxSpeed}get boostCap(){return this.maxSpeed*this.boostMultiplier}boost(){this.boostLeft=1.5,this.ship.speed=Math.min(this.boostCap,Math.max(this.ship.speed*1.35,this.maxSpeed*1.2))}get transitioning(){return this.phase==="entering"||this.phase==="leaving"}forward(t=new R){const{yaw:e,pitch:n}=this.ship;return t.set(-Math.sin(e)*Math.cos(n),Math.sin(n),-Math.cos(e)*Math.cos(n))}enter(t,e,n,s,r){this.mapDistance=n;const a=r*ue;this.maxSpeed=pe.clamp(a*2/30,10,120),this.bound=a*1.5,this.ceiling=Math.max(40,a*.5),this.ship.position.set(e.x*ue,s,e.z*ue),this.startPosition.copy(this.ship.position),this.reset(),this.fromPosition.copy(t.position),this.fromLook.copy(e),this.chasePose(this.toPosition,this.toLook),this.phase="entering",this.elapsed=0}resume(t,e,n,s,r,a){this.ship.position.copy(t),this.ship.yaw=e,this.ship.pitch=n,this.ship.speed=Math.max(0,Math.min(this.maxSpeed,s)),this.phase="flying",this.lift=1,this.elapsed=0,this.turnVelocity=0,this.climbVelocity=0,this.chasePose(r.position,a),r.lookAt(a)}reset(){this.ship.position.copy(this.startPosition),this.ship.yaw=0,this.ship.pitch=0,this.ship.speed=0,this.turnVelocity=0,this.climbVelocity=0,this.boostLeft=0}place(t,e){this.ship.position.copy(t);const n=e.clone().sub(t).normalize();this.ship.yaw=Math.atan2(-n.x,-n.z),this.ship.pitch=Math.asin(pe.clamp(n.y,-1,1)),this.ship.speed=0,this.turnVelocity=0,this.climbVelocity=0}get thrustLevel(){return this.maxSpeed>0?this.ship.speed/this.maxSpeed:0}steer(t,e){const n=this.ship;this.boostLeft>0&&(this.boostLeft=Math.max(0,this.boostLeft-t));const s=this.boostLeft>0?this.boostCap:this.maxSpeed;e.thrust>0&&(n.speed+=this.maxSpeed*.5*t),e.thrust<0&&(n.speed-=this.maxSpeed*1*t),n.speed=pe.clamp(n.speed,0,s);const r=pe.clamp(e.turn*kx-$c(e.mouseX)*zx,-Kc,Kc);this.turnVelocity+=(r-this.turnVelocity)*(1-Math.exp(-t*Hx)),n.yaw+=this.turnVelocity*t;const a=-$c(e.mouseY)*Vx;n.pitch+=(a-n.pitch)*(1-Math.exp(-t*Gx));const o=Math.max(4,this.maxSpeed*.45);this.climbVelocity+=(e.climb*o-this.climbVelocity)*(1-Math.exp(-t*Wx)),n.position.addScaledVector(this.forward(),n.speed*t),n.position.y+=this.climbVelocity*t;const l=Math.hypot(n.position.x,n.position.z);l>this.bound&&(n.position.x*=this.bound/l,n.position.z*=this.bound/l),n.position.y=pe.clamp(n.position.y,-this.ceiling,this.ceiling)}leave(t,e){if(this.phase==="idle"||this.phase==="leaving")return;this.fromPosition.copy(t.position),this.fromLook.copy(e);const n=this.mapTarget();this.toLook.copy(n),this.toPosition.set(n.x,this.mapDistance*Math.cos(qc),n.z+this.mapDistance*Math.sin(qc)),this.phase="leaving",this.elapsed=0}mapTarget(){return new R(this.ship.position.x/ue,0,this.ship.position.z/ue)}get returnDistance(){return this.mapDistance}update(t,e,n,s){let r=null;if(this.phase==="entering"||this.phase==="leaving"){const a=this.phase==="entering"?Nx:Fx;this.elapsed=Math.min(a,this.elapsed+t);const o=this.elapsed/a,l=o*o*(3-2*o);return this.phase==="entering"&&this.chasePose(this.toPosition,this.toLook),e.position.lerpVectors(this.fromPosition,this.toPosition,l),n.lerpVectors(this.fromLook,this.toLook,l),e.lookAt(n),this.lift=this.phase==="entering"?l:1-l,o>=1&&(r=this.phase==="entering"?"entered":"left",this.phase=this.phase==="entering"?"flying":"idle"),{finished:r}}return this.phase==="flying"&&(this.steer(t,s),this.chasePose(e.position,n),e.lookAt(n),this.lift=1),{finished:r}}chasePose(t,e){const n=this.forward();t.copy(this.ship.position).addScaledVector(n,-5.5),t.y+=Ox,e.copy(this.ship.position).addScaledVector(n,Bx)}}const Zc=1844034,Na=2436434,jx=15327692,Yx=13623551;function qx(){const i=new Ze,t=h=>new fn({color:h,side:Ue}),e=new rl({color:jx,transparent:!0,opacity:.9}),n=(h,d)=>{const f=new ye(h,t(d)),m=new Ts(new $f(h,20),e);i.add(f,m)},s=new ol(.15,1.05,10,1,!0).rotateX(-Math.PI/2).translate(0,0,-.32);n(s,Zc);const r=new qr(.15,.12,.42,10,1,!0).rotateX(Math.PI/2).translate(0,0,.41);n(r,Zc);const a=h=>{const d=new qt;return d.setAttribute("position",new Kt([h*.1,0,-.05,h*.1,0,.55,h*.92,-.04,.72],3)),d};n(a(1),Na),n(a(-1),Na);const o=new qt;o.setAttribute("position",new Kt([0,.1,.25,0,.1,.62,0,.42,.68],3)),n(o,Na);const l=(()=>{const h=document.createElement("canvas");h.width=h.height=64;const d=h.getContext("2d");if(d){const f=d.createRadialGradient(32,32,0,32,32,32);f.addColorStop(0,"rgba(255,255,255,1)"),f.addColorStop(.35,"rgba(255,255,255,0.45)"),f.addColorStop(1,"rgba(255,255,255,0)"),d.fillStyle=f,d.fillRect(0,0,64,64)}return new Qh(h)})(),c=new qh(new sl({map:l,color:Yx,transparent:!0,blending:ci,depthWrite:!1}));c.position.set(0,0,.7),i.add(c),i.rotation.order="YXZ",i.visible=!1;const u=h=>{const d=pe.clamp(h,0,1);c.scale.setScalar(.35+d*.55),c.material.opacity=.35+d*.6};return u(0),{group:i,setThrust:u}}const Kx=[{count:900,radius:1400,follow:.88,size:3.6,alpha:[.2,.55]},{count:700,radius:2400,follow:.95,size:5.2,alpha:[.12,.4]},{count:600,radius:3800,follow:.99,size:7,alpha:[.08,.28]}];class $x{object=new Ze;layers=[];constructor(t=11){let e=t;const n=()=>(e=Math.imul(e,1664525)+1013904223>>>0)/4294967296;for(const s of Kx){const r=new Float32Array(s.count*3),a=new Float32Array(s.count),o=new Float32Array(s.count*3),l=new Float32Array(s.count);for(let d=0;d<s.count;d++){const f=n()*Math.PI*2,m=Math.acos(2*n()-1),_=s.radius*(.9+n()*.2);r[d*3]=_*Math.sin(m)*Math.cos(f),r[d*3+1]=_*Math.cos(m),r[d*3+2]=_*Math.sin(m)*Math.sin(f),a[d]=s.size*(.5+n());const g=.8+n()*.2,p=n()*.06;o[d*3]=g,o[d*3+1]=g*(.98-p*.3),o[d*3+2]=g*(.96-p),l[d]=s.alpha[0]+n()*(s.alpha[1]-s.alpha[0])}const c=new qt;c.setAttribute("position",new ie(r,3)),c.setAttribute("aSize",new ie(a,1)),c.setAttribute("aColor",new ie(o,3)),c.setAttribute("aAlpha",new ie(l,1));const u=pl();u.uniforms.uMaxSize.value=3;const h=new Yr(c,u);h.frustumCulled=!1,this.layers.push({points:h,follow:s.follow}),this.object.add(h)}this.object.visible=!1}setScale(t){for(const{points:e}of this.layers)e.material.uniforms.uScale.value=t}follow(t){for(const{points:e,follow:n}of this.layers)e.position.copy(t.position).multiplyScalar(n)}}class Zx{object=new Ze;texture;sprites=[];count=0;constructor(){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d");if(e){const n=e.createRadialGradient(64,64,0,64,64,64);n.addColorStop(0,"rgba(255,255,255,0.9)"),n.addColorStop(.4,"rgba(255,255,255,0.35)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,128,128)}this.texture=new Qh(t),this.object.visible=!1}set(t){for(const e of this.sprites)this.object.remove(e),e.material.dispose();this.sprites=[];for(const e of t)for(let n=0;n<2;n++){const s=e.index*2.39+n*2.6,r=new qh(new sl({map:this.texture,color:e.color,transparent:!0,opacity:.2,blending:ci,depthWrite:!1}));r.position.set(e.x+Math.cos(s)*e.radius*.35,e.y+Math.sin(s*1.3)*e.radius*.2,e.z+Math.sin(s)*e.radius*.35),r.scale.setScalar(e.radius*(1.35+.2*((n+e.index)%3))),this.sprites.push(r),this.object.add(r)}this.count=t.length}setOpacity(t){for(const e of this.sprites)e.material.opacity=.2*t}}class Jx{object=new Ze;debris=[];rings=[];ranges=[];rocks=null;dummy=new Te;elapsed=0;set(t,e){this.object.clear(),this.ranges.splice(0,this.ranges.length,...t),this.debris.length=0,this.rings.length=0;let s=t.reduce((h,d)=>Math.imul(h^Math.round(d.x*100+d.z),1664525)>>>0,2166136261);const r=()=>(s=Math.imul(s,1664525)+1013904223>>>0)/4294967296,a=Math.max(100,e*4.6);for(let h=0;h<4e3&&this.debris.length<140;h++){const d={x:(r()*2-1)*a,y:(r()*2-1)*a*.22,z:(r()*2-1)*a,r:.6+r()*1.4};Math.hypot(d.x,d.z+14)>e*4*1.25||t.some(f=>Math.hypot(d.x-f.x,d.y-f.y,d.z-f.z)<f.radius+d.r+8)||this.debris.push(d)}const o=new cl(1,0),l=new fn({color:8226206}),c=new Kh(o,l,this.debris.length);c.frustumCulled=!1,this.debris.forEach((h,d)=>{this.dummy.position.set(h.x,h.y,h.z),this.dummy.scale.setScalar(h.r),this.dummy.rotation.set(r()*6,r()*6,r()*6),this.dummy.updateMatrix(),c.setMatrixAt(d,this.dummy.matrix);const f=.5+r()*.28;c.setColorAt(d,new kt().setRGB(f*.72,f*.78,f))}),c.instanceMatrix.needsUpdate=!0,this.rocks=c,this.object.add(c);const u=[...t].sort((h,d)=>h.x-d.x||h.z-d.z);for(let h=0;h<u.length-1;h++){const d=u[h],f=u[h+1],m=f.x-d.x,_=f.z-d.z,g=Math.hypot(m,_);if(g<24)continue;const p={x:(d.x+f.x)/2,y:(d.y+f.y)/2,z:(d.z+f.z)/2,nx:m/g,ny:0,nz:_/g,radius:6};this.rings.push(p);const S=new ye(new hl(p.radius,.26,7,44),new fn({color:14476788,transparent:!0,opacity:.62,depthWrite:!1}));S.position.set(p.x,p.y,p.z),S.quaternion.setFromUnitVectors(new R(0,0,1),new R(p.nx,0,p.nz)),this.object.add(S)}}update(t){this.elapsed+=t,this.rocks&&(this.rocks.rotation.y=Math.sin(this.elapsed*.08)*.008)}}const ml=8*ue,Qx=6,tv=.12,ev=i=>{try{return new URL(i).hostname.replace(/^www\./,"")}catch{return""}};function hd(i,t=32){if(typeof chrome>"u"||!chrome.runtime?.getURL)return null;const e=new URL(chrome.runtime.getURL("/_favicon/"));return e.searchParams.set("pageUrl",i),e.searchParams.set("size",String(t)),e.toString()}const nv="https://bukusupe-unvisited-page.invalid/",ii=32;let Fa=null;function dd(i){const t=document.createElement("canvas");t.width=t.height=ii;const e=t.getContext("2d",{willReadFrequently:!0});if(!e)return null;e.drawImage(i,0,0,ii,ii);const n=e.getImageData(0,0,ii,ii).data;let s=2166136261;for(let r=0;r<n.length;r++)s=Math.imul(s^n[r],16777619)>>>0;return`${s.toString(16)}:${n.length}`}function iv(i){return new Promise(t=>{const e=new Image;e.onload=()=>t(e),e.onerror=()=>t(null),e.src=i})}function sv(){if(!Fa){const i=hd(nv,ii);Fa=i?iv(i).then(t=>t?dd(t):null):Promise.resolve(null)}return Fa}function rv(i){let t=2166136261;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),16777619)>>>0;return`hsl(${t%360}, 24%, 76%)`}class av{constructor(t){this.container=t}container;entries=new Map;shown=[];timer=0;nearby=0;update(t,e,n,s){if(this.timer-=t,this.timer<=0){this.timer=tv;const r=e.map(o=>({star:o,d:n(o.id)})).filter(o=>o.d<ml).sort((o,l)=>o.d-l.d||(o.star.id<l.star.id?-1:1));this.nearby=r.length;const a=r.slice(0,Qx).map(o=>o.star);this.show(a)}for(const r of this.shown){const a=this.entries.get(r);if(!a)continue;const o=s(r);if(!o){a.el.style.opacity="0";continue}a.el.style.opacity=String(.55+.45*o.near),a.el.style.transform=`translate3d(${(o.x+14).toFixed(1)}px, ${(o.y-34).toFixed(1)}px, 0)`}}clear(){this.show([]),this.nearby=0,this.timer=0}get visibleIds(){return this.shown.slice()}show(t){const e=new Set(t.map(n=>n.id));for(const n of this.shown){if(e.has(n))continue;const s=this.entries.get(n);s&&(s.el.style.display="none")}for(const n of t){let s=this.entries.get(n.id);s||(s={el:this.build(n),star:n},this.entries.set(n.id,s),this.container.appendChild(s.el)),s.el.style.display=""}this.shown=t.map(n=>n.id)}build(t){const e=document.createElement("div");e.className="flight-window",e.dataset.key=t.id;const n=hd(t.url,ii),s=ev(t.url),r=document.createElement("span");r.className="flight-window-crest",r.textContent=(s[0]??"?").toUpperCase(),r.style.background=rv(s);const a=()=>{e.dataset.icon="crest",r.style.display="";const u=e.querySelector("img");u&&(u.style.display="none")};if(n){const u=document.createElement("img");u.alt="",u.width=16,u.height=16,u.style.display="none",r.style.display="none",u.onload=async()=>{const[h,d]=[dd(u),await sv()];h&&d&&h===d?a():(e.dataset.icon="favicon",u.style.display="")},u.onerror=a,u.src=n,e.append(u,r)}else e.append(r),a();const o=document.createElement("div"),l=document.createElement("div");l.className="flight-window-title",l.textContent=t.title;const c=document.createElement("div");return c.className="flight-window-domain",c.textContent=s,o.append(l,c),e.appendChild(o),e.style.opacity="0",e}}class ov{constructor(t){this.container=t}container;signs=[];set(t){for(const{el:e}of this.signs)e.remove();this.signs=t.map(e=>{const n=document.createElement("div");return n.className="flight-sign",n.dataset.cluster=String(e.index),n.textContent=e.name,n.style.opacity="0",this.container.appendChild(n),{spec:e,el:n}})}update(t,e,n){for(const{spec:s,el:r}of this.signs){const a=t(s.x,s.y+s.radius*.9,s.z);if(!a||n<=0){r.style.display="none";continue}const o=e(s),l=Math.min(1,Math.max(0,(o-s.radius*.4)/(s.radius*1.2)));r.style.display="",r.style.opacity=String((.12+.73*l)*n),r.style.transform=`translate3d(${a.x.toFixed(1)}px, ${a.y.toFixed(1)}px, 0) translate(-50%, -100%)`}}clear(){for(const{el:t}of this.signs)t.style.display="none"}}const Jc=24,lv=30*ue,cv=.2;class hv{constructor(t){this.container=t}container;limit=Jc;entries=new Map;shown=[];timer=0;update(t,e,n,s,r){if(this.timer-=t,this.timer<=0){this.timer=cv;const a=new Set(n),o=[],l=Math.max(1,Math.ceil(e.length/400));for(let f=0;f<e.length;f+=l){const m=e[f];if(a.has(m.id))continue;const _=s(m.id);_>=ml&&_<lv&&o.push({star:m,d:_})}o.sort((f,m)=>f.d-m.d||f.star.id.localeCompare(m.star.id));const c=[],u=[];let h=0;for(const{star:f}of o){if(++h>160)break;const m=r(f.id);if(!m||m.x<24||m.y<80||m.x>innerWidth-24||m.y>innerHeight-52)continue;let _=this.entries.get(f.id);const g=_?.width??Math.min(180,Math.max(28,[...f.title].length*12)),p={x:m.x+10,y:m.y-14,w:g+20};if(!c.some(S=>p.x<S.x+S.w+16&&S.x<p.x+p.w+16&&p.y<S.y+30&&S.y<p.y+30)){if(!_){const S=document.createElement("div");S.className="flight-far-label",S.dataset.key=f.id,S.textContent=f.title,S.style.display="none",this.container.appendChild(S),_={id:f.id,el:S,width:g},this.entries.set(f.id,_)}if(c.push(p),u.push(_),u.length>=Jc)break}}const d=new Set(u.map(f=>f.id));for(const f of this.shown)d.has(f.id)||(f.el.style.display="none");for(const f of u)f.el.style.display="";this.shown=u}for(const a of this.shown){const o=r(a.id);if(!o){a.el.style.display="none";continue}a.el.style.transform=`translate3d(${(o.x+10).toFixed(1)}px, ${(o.y-14).toFixed(1)}px, 0)`}}clear(){for(const t of this.shown)t.el.style.display="none";this.shown=[],this.timer=0}}function dv(i){const t=Math.max(12,bh(i)*.32),e=new Map(i.clusters.map(s=>[s.index,s])),n=new Map;for(const s of i.stars){const r=e.get(s.cluster);if(!r){n.set(s.id,0);continue}const a=(Qc(`cluster:${r.index}`)-.5)*t,o=Math.hypot(s.x-r.x,s.y-r.y),l=Math.sqrt(Math.max(0,r.radius*r.radius-o*o)),c=(Qc(`star:${s.id}`)*2-1)*l*.9;n.set(s.id,a+c)}return n}function Qc(i){let t=2166136261;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),16777619)>>>0;return t%1e5/1e5}const gr=-1;function Oa(i,t){return new We({transparent:!0,depthWrite:!1,uniforms:{uColor:{value:new kt(i)},uOpacity:{value:t},uHoleCenter:{value:new R},uHoleRadius:{value:0}},vertexShader:`varying vec3 vWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }`,fragmentShader:`uniform vec3 uColor; uniform float uOpacity; uniform vec3 uHoleCenter; uniform float uHoleRadius;
      varying vec3 vWorld;
      void main() {
        if (uHoleRadius > 0.0 && distance(vWorld, uHoleCenter) < uHoleRadius) discard;
        gl_FragColor = vec4(uColor, uOpacity);
      }`})}const uv=i=>i.uniforms.uOpacity.value;class fv{object=new Ze;entries=new Map;active=null;drawing=null;animated=new Ts(new qt,Oa(15124620,.95));rings=new Ze;ringIds=[];constructor(){this.animated.visible=!1,this.animated.renderOrder=gr,this.rings.renderOrder=gr,this.object.add(this.animated,this.rings)}set(t){for(const e of this.entries.values())this.object.remove(e.line,e.glints),e.line.geometry.dispose(),e.line.material.dispose(),e.glints.geometry.dispose(),e.glints.material.dispose();this.entries.clear();for(const e of t){const n=Th(e.points),s=new Map(e.points.map(h=>[h.id,h])),r=[];for(const h of n){const d=s.get(h.a),f=s.get(h.b);r.push(d.x,.12,-d.y,f.x,.12,-f.y)}const a=new qt;a.setAttribute("position",new Kt(r,3));const o=new Ts(a,Oa(14203e3,.15));o.renderOrder=gr;const l=new qt;l.setAttribute("position",new Kt(e.points.flatMap(h=>[h.x,.14,-h.y]),3));const c=new Yr(l,new Jh({color:15124620,size:2.5,sizeAttenuation:!1,transparent:!0,opacity:.2,depthWrite:!1}));c.renderOrder=gr;const u={data:e,edges:n,line:o,glints:c};this.entries.set(e.id,u),this.object.add(o,c),this.lift>0&&this.applyLift(u),this.applyHole(u)}this.active&&!this.entries.has(this.active)&&(this.active=null),this.style()}select(t){this.active=t,this.style()}flying=!1;hole=null;heightOf=()=>0;lift=0;testOpacity=null;testLine=null;setTestLine(t,e=0){if(this.testLine&&this.object.remove(this.testLine),this.testLine=null,!t)return;const n=[new R(t.x-e*1.4,t.y,t.z),new R(t.x+e*1.4,t.y,t.z)],s=new Zh(new qt().setFromPoints(n),Oa(16777215,1));s.renderOrder=-1,this.applyHoleTo(s.material),this.testLine=s,this.object.add(s)}setTestOpacity(t){this.testOpacity=t,this.style()}setFlight(t){this.flying=t,this.rings.visible=!t,this.style()}setSearchHole(t,e=0){this.hole=t?{center:t.clone(),radius:e}:null;for(const n of this.entries.values())this.applyHole(n);this.applyHoleTo(this.animated.material),this.style()}applyHole(t){this.applyHoleTo(t.line.material)}applyHoleTo(t){t.uniforms.uHoleCenter.value.copy(this.hole?.center??new R),t.uniforms.uHoleRadius.value=this.hole?.radius??0}setLift(t,e){this.heightOf=t,this.lift=e;for(const n of this.entries.values())this.applyLift(n)}applyLift(t){const e=(r,a)=>a+this.heightOf(r)*this.lift,n=t.line.geometry.getAttribute("position");t.edges.forEach((r,a)=>{n.setY(a*2,e(r.a,.12)),n.setY(a*2+1,e(r.b,.12))}),n.needsUpdate=!0;const s=t.glints.geometry.getAttribute("position");t.data.points.forEach((r,a)=>s.setY(a,e(r.id,.14))),s.needsUpdate=!0}segments(){return[...this.entries].flatMap(([t,e])=>{const n=e.line.geometry.getAttribute("position");return e.edges.map((s,r)=>({id:t,a:s.a,b:s.b,az:n.getY(r*2),bz:n.getY(r*2+1)}))})}editMembers(t,e=!0){this.ringIds=t.map(n=>n.id);for(const n of[...this.rings.children])this.rings.remove(n),n.geometry.dispose(),n.material.dispose();for(const n of t){const s=new ye(e?new ai(.34,.52,28):new ai(.36,.44,28),new fn({color:e?15124620:14203e3,transparent:!0,opacity:e?.95:.6,side:Ue,depthWrite:!1}));s.rotation.x=-Math.PI/2,s.position.set(n.x,.16,-n.y),this.rings.add(s)}}moveEditMembers(t,e=1){this.rings.children.forEach((n,s)=>{const r=t(this.ringIds[s]);r&&n.position.set(r.x,.16,-r.y),n.scale.setScalar(e)})}startDrawing(t){this.drawing={id:t,elapsed:0},this.animated.visible=!0,this.animated.geometry.dispose(),this.animated.geometry=new qt,this.style()}update(t){if(!this.drawing)return;const{id:e}=this.drawing,n=this.entries.get(e);if(!n){this.drawing=null,this.animated.visible=!1;return}this.drawing.elapsed+=t;const s=Math.max(0,(this.drawing.elapsed-.95)/.12),r=Math.min(n.edges.length,Math.floor(s)),a=Math.min(1,s-r),o=new Map(n.data.points.map(c=>[c.id,c])),l=[];for(let c=0;c<r+(a>0?1:0);c++){const u=n.edges[c];if(!u)break;const h=o.get(u.a),d=o.get(u.b),f=c<r?1:a;l.push(h.x,.17,-h.y,h.x+(d.x-h.x)*f,.17,-(h.y+(d.y-h.y)*f))}this.animated.geometry.dispose(),this.animated.geometry=new qt,this.animated.geometry.setAttribute("position",new Kt(l,3)),s>=n.edges.length&&(this.drawing=null,this.animated.visible=!1,this.style())}animationState(){const t=this.drawing&&this.entries.get(this.drawing.id);if(!this.drawing||!t)return{phase:"done",edgesDrawn:0,edges:0};const e=(this.drawing.elapsed-.95)/.12;return{phase:e<0?"returning":"drawing",edgesDrawn:Math.max(0,Math.min(t.edges.length,Math.floor(e))),edges:t.edges.length}}geometry(){return[...this.entries].map(([t,e])=>({id:t,members:e.data.points.map(n=>n.id),edges:e.edges,opacity:uv(e.line.material)}))}points(t){return this.entries.get(t)?.data.points??[]}style(){for(const[t,e]of this.entries){const n=t===this.active,s=this.drawing?.id===t,r=!!this.hole;e.line.material.uniforms.uOpacity.value=this.testOpacity??(s?0:r?this.flying?.1:.07:this.flying?.22:n?.85:.15),e.glints.material.opacity=this.flying?.3:s?0:n?.9:.2,e.glints.visible=!r}}}const Ba=.45*ue,pv=.45,mv=4e3,th=50,ka=2.55*1.2,Oi=pe.degToRad(40),eh=pe.degToRad(60),gv=.6,nh=.85,ih=.65,_v=.8,xv=1.1,vv=9,za={KeyW:[0,1],KeyS:[0,-1],KeyA:[-1,0],KeyD:[1,0]};function Ha(){const i=document.activeElement;return!!i&&(i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement||i.isContentEditable)}const Va=.6;function sh(i,t){if(i.length===0)return{minX:-t,maxX:t,minY:-t,maxY:t};let e=1/0,n=-1/0,s=1/0,r=-1/0;for(const a of i)e=Math.min(e,a.x),n=Math.max(n,a.x),s=Math.min(s,a.y),r=Math.max(r,a.y);return{minX:e,maxX:n,minY:s,maxY:r}}class yv{constructor(t,e){this.canvas=t,this.renderer=new k_({canvas:t,antialias:!0,alpha:!1}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.setClearColor(461336,1),this.camera=new $e(50,1,.5,6e3),this.camera.position.set(0,90*Math.cos(Oi),90*Math.sin(Oi)),this.camera.lookAt(0,0,0),this.controls=new lx(this.camera,t),this.controls.enableRotate=!1,this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.screenSpacePanning=!1,this.controls.minDistance=6,this.controls.touches={ONE:cn.PAN,TWO:cn.DOLLY_PAN},this.controls.maxDistance=2e3,this.controls.addEventListener("start",()=>{this.focus=null});for(const a of[t,e])a.addEventListener("pointerdown",this.onTiltStart,!0),a.addEventListener("pointermove",this.onTiltMove,!0),a.addEventListener("pointerup",this.onTiltEnd,!0),a.addEventListener("pointercancel",this.onTiltEnd,!0),a.addEventListener("contextmenu",o=>o.preventDefault());this.backdrop=Ux(),this.scene.add(this.backdrop),this.scene.add(this.nebulae.object),this.scene.add(this.field.object),this.scene.add(this.constellations.object),this.constellationName=document.getElementById("constellation-name");const n=new ye(new ts(2.5,2.5).rotateX(-Math.PI/2),new We({transparent:!0,depthWrite:!1,depthTest:!1,blending:ci,vertexShader:`varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`varying vec2 vUv;
          void main() {
            float r = length((vUv - 0.5) * 2.5);
            float ring = exp(-pow((r - 0.42) / 0.09, 2.0));
            float halo = exp(-pow((r - 0.55) / 0.31, 2.0));
            gl_FragColor = vec4(0.48, 0.65, 1.0, ring * 0.68 + halo * 0.28);
          }`}));n.position.y=.05,n.renderOrder=2,this.blackHole.add(n);const s=new ye(new al(.36,48),new fn({color:4,side:Ue,depthTest:!1}));s.rotation.x=-Math.PI/2,s.position.y=.08,s.renderOrder=3,this.blackHole.add(s);const r=new ye(new ai(.355,.395,64),new fn({color:11060735,transparent:!0,opacity:.95,side:Ue,depthWrite:!1,depthTest:!1}));r.rotation.x=-Math.PI/2,r.position.y=.09,r.renderOrder=4,this.blackHole.add(r);for(const a of[1,1.75,2.55]){const o=new ye(new ai(a-.012,a+.012,96),new fn({color:7903199,transparent:!0,opacity:.23,side:Ue}));o.rotation.x=-Math.PI/2,o.position.y=.03,this.blackHole.add(o)}this.blackHole.visible=!1,this.scene.add(this.blackHole),this.trace.visible=!1,this.trace.geometry.setAttribute("position",new ie(new Float32Array(12),3).setUsage(ea)),this.trace.geometry.setDrawRange(0,0),this.scene.add(this.trace),this.tails.visible=!1,this.tails.geometry.setAttribute("position",new ie(new Float32Array(504),3).setUsage(ea)),this.tails.geometry.setAttribute("aAlpha",new ie(new Float32Array(168),1).setUsage(ea)),this.tails.geometry.setDrawRange(0,0),this.scene.add(this.tails),this.selectedHalo.rotation.x=-Math.PI/2,this.selectedHalo.visible=!1,this.scene.add(this.selectedHalo),this.labels=new yx(e),this.labels.onHover=a=>this.hoverStar(a),this.labels.onClick=a=>this.onStarLabelClick?.(a),this.labels.onClusterClick=a=>this.focusCluster(a),addEventListener("resize",this.resize),this.scene.add(this.ship.group),this.scene.add(this.sky.object),this.scene.add(this.flightNebulae.object),this.scene.add(this.obstacles.object),this.obstacles.object.visible=!1,document.body.classList.remove("flight-boost"),window.addEventListener("mousemove",a=>{this.flight.active&&this.flightMouse.set(a.clientX/innerWidth*2-1,a.clientY/innerHeight*2-1)}),document.addEventListener("mouseleave",()=>this.flightMouse.set(0,0)),addEventListener("keydown",this.onKeyDown),addEventListener("keyup",this.onKeyUp),addEventListener("blur",this.releaseKeys),document.addEventListener("visibilitychange",this.releaseKeys),this.resize()}canvas;renderer;scene=new Gf;camera;controls;clock=new ep;backdrop;field=new Dx;nebulae=new Ex;constellations=new fv;labels;running=!1;extent=60;bounds={minX:-30,maxX:30,minY:-30,maxY:30};fitDistance=90;labelSource={clusters:[],stars:[]};labelsDirty=!0;hoveredMapId=null;lastLabelMotion=0;lastLabelTier=null;lastLabelCamera=new ee;labelCameraKnown=!1;labelDecisions=0;labelPositionUpdates=0;maxLabelPositionMs=0;screenCircles=[];tilt=Oi;tiltTarget=Oi;tiltSpeed=Oi/Va;preferredTilt=Oi;tiltPointer=null;tiltPointerY=0;tiltCapture=null;focus=null;keys=new Set;keyPan=new dt;keyZoom=0;editIds=[];flight=new Xx;flightLook=new R;ship=qx();sky=new $x;flightNebulae=new Zx;obstacles=new Jx;collisionStars=null;bumps=0;boosts=0;lastBump=null;ringCooldown=new Map;shakeLeft=0;boostVisualLeft=0;signs=new ov(document.getElementById("flight-signs")??document.body);windows=new av(document.getElementById("flight-windows")??document.body);farLabels=new hv(document.getElementById("flight-far-labels")??document.body);windowStars=[];dive=null;entryCooldown=new Map;lastEntry=null;flash=document.getElementById("flight-flash");onEnterStar=null;flightMouse=new dt;flightSearch=null;heights=new Map;onFlightChange=null;searchStash=null;emphasisIds=new Set;emphasisMode="none";searchIds=[];searchCenter={x:0,y:0};searchUnit=1;blackHole=new Ze;trace=new Ts(new qt,new rl({color:9550591,transparent:!0,opacity:.32,depthWrite:!1}));tails=new Ts(new qt,new We({transparent:!0,depthWrite:!1,vertexShader:`attribute float aAlpha; varying float vAlpha;
        void main() { vAlpha = aAlpha; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`varying float vAlpha;
        void main() { gl_FragColor = vec4(0.56, 0.73, 1.0, vAlpha); }`}));selectedHalo=new ye(new ai(.35,.47,32),new fn({color:16777215,transparent:!0,opacity:.85,side:Ue}));selectedId=null;hoveredId=null;fullTraceCount=0;maxTailPixels=0;constellationName=null;constellationNameId=null;constellationNameWait=!1;frames=0;onStarLabelClick=null;onKeyDown=t=>{Ha()||t.ctrlKey||t.metaKey||t.altKey||(t.code in za?this.keys.add(t.code):t.code==="Space"?(this.keys.add("Space"),t.preventDefault()):t.key==="Shift"&&this.keys.add("Shift"))};onKeyUp=t=>{t.code in za?this.keys.delete(t.code):t.code==="Space"?(this.keys.delete("Space"),t.preventDefault()):t.key==="Shift"&&this.keys.delete("Shift")};releaseKeys=()=>{this.keys.clear()};applyKeys(t){Ha()&&this.keys.clear();const e=new dt;for(const c of this.keys){const u=za[c];u&&e.add(new dt(u[0],u[1]))}e.lengthSq()>0&&e.normalize();const n=this.camera.position.distanceTo(this.controls.target),s=1-Math.exp(-t*vv);this.keyPan.lerp(e.multiplyScalar(n*_v),s);const r=(this.keys.has("Space")?1:0)-(this.keys.has("Shift")?1:0);this.keyZoom+=(r*xv-this.keyZoom)*s;const a=this.keyPan.length()>n*.002,o=Math.abs(this.keyZoom)>.002;if(a||this.keyPan.set(0,0),o||(this.keyZoom=0),!a&&!o)return;this.focus=null,this.controls.target.x+=this.keyPan.x*t,this.controls.target.z-=this.keyPan.y*t;const l=pe.clamp(n*Math.exp(this.keyZoom*t),this.controls.minDistance,this.controls.maxDistance);this.setDistance(l)}setLayout(t,e,n,s=!0){this.collisionStars=null,this.field.setStars(e),this.field.setEmphasis([...this.emphasisIds],this.emphasisMode),this.heights=dv(t),this.field.setHeights(this.heights),this.extent=bh(t),this.placeFlightClusters(t,n),this.field.setLift(this.flight.lift),this.flight.active&&(s=!1),this.nebulae.set(n.clusters.filter(r=>r.count>0).map(r=>({x:r.x,y:r.y,radius:r.radius,color:Yc(r.index),seed:r.index}))),this.labelSource=n,this.windowStars=n.stars.map(r=>({id:r.id,title:r.title,url:r.url})),this.bounds=sh(e,this.extent),s&&this.frameAll(),this.resize(),this.labelsDirty=!0}setConstellations(t){this.constellations.set(t),this.constellations.setLift(e=>this.heights.get(e)??0,this.flight.lift),this.refreshEmphasis()}setEditMembers(t){this.editIds=t.map(e=>e.id),this.refreshEmphasis()}refreshEmphasis(){const t=this.searchIds.length>0,e=this.constellationNameId&&!t?this.constellations.points(this.constellationNameId):[],n=this.editIds.length?"edit":e.length?"selected":"none";this.constellations.select(t?null:this.constellationNameId),this.constellationName&&!this.constellationNameWait&&this.constellationName.classList.toggle("is-visible",!!this.constellationNameId&&!t);const s=n==="edit"?this.editIds:e.map(r=>r.id);this.emphasisIds=new Set(s),this.emphasisMode=n,this.field.setEmphasis(s,n),this.constellations.editMembers(s.flatMap(r=>{const a=this.field.displayPosition(r);return a?[{id:r,...a}]:[]}),n==="edit"),this.labelsDirty=!0}selectConstellation(t,e=""){this.constellations.select(t),this.constellationNameId=t,this.searchStash=null,this.refreshEmphasis(),this.constellationNameWait=!1,this.constellationName&&(this.constellationName.textContent=e,this.constellationName.classList.toggle("is-visible",!!t))}saveConstellation(t,e,n){this.setTopDown(!0),this.setSearch([]),this.selectSearch(null),this.constellations.select(t),this.constellations.startDrawing(t),this.constellationNameId=t,this.refreshEmphasis(),this.constellationNameWait=!0,this.constellationName&&(this.constellationName.textContent=e,this.constellationName.classList.remove("is-visible")),this.focusPoints(n)}focusPoints(t){if(!t.length)return;const e=this.safeRect(),n=this.renderer.getSize(new dt),s={target:this.controls.target.clone(),position:this.camera.position.clone(),tilt:this.tilt},r=sh(t,this.extent),a=new R((r.minX+r.maxX)/2,0,-(r.minY+r.maxY)/2);let o=Math.max(this.controls.minDistance,(r.maxX-r.minX+r.maxY-r.minY)*1.2+10);const l=new on(new R(0,1,0),0),c=new mc,u=(d,f)=>(c.setFromCamera(new dt(d/n.x*2-1,-(f/n.y)*2+1),this.camera),c.ray.intersectPlane(l,new R)),h=new R;this.tilt=this.tiltTarget;for(let d=0;d<8;d++){this.controls.target.copy(a),this.setDistance(o),this.camera.updateMatrixWorld();let f=1/0,m=-1/0,_=1/0,g=-1/0;for(const v of t){h.set(v.x,0,-v.y).project(this.camera);const C=(h.x*.5+.5)*n.x,w=(-h.y*.5+.5)*n.y;f=Math.min(f,C),m=Math.max(m,C),_=Math.min(_,w),g=Math.max(g,w)}const p=Math.max((m-f+24)/(e.width*.8),(g-_+24)/(e.height*.8),.05),S=u((f+m)/2,(_+g)/2),b=u(e.left+e.width/2,e.top+e.height/2);S&&b&&a.add(S.sub(b)),o=pe.clamp(o*p,this.controls.minDistance,this.controls.maxDistance)}this.controls.target.copy(s.target),this.camera.position.copy(s.position),this.tilt=s.tilt,this.controls.update(),this.focus={from:this.controls.target.clone(),to:a,fromDistance:this.camera.position.distanceTo(this.controls.target),toDistance:o,elapsed:0,duration:ih}}safeRect(){const t=this.renderer.getSize(new dt),e=_=>{const g=document.getElementById(_);if(!g||g.hidden||getComputedStyle(g).display==="none")return null;const p=g.getBoundingClientRect();return p.width>0&&p.height>0?p:null},n=12,s=e("search-box"),r=["constellation-list","constellation-manage"].map(e).filter(_=>!!_),a=["hud","hud-toggle"].map(e).filter(_=>!!_),o=(s?.bottom??0)+n,l=Math.min(t.y,...r.map(_=>_.top))-n,c=Math.max(0,...a.map(_=>_.right))+n,u=Math.max(0,...a.map(_=>_.bottom))+n,h={left:a.length?c:n,top:o,right:t.x-n,bottom:l},d={left:n,top:Math.max(o,a.length?u:0),right:t.x-n,bottom:l},f=_=>Math.max(0,_.right-_.left)*Math.max(0,_.bottom-_.top),m=f(h)>=f(d)?h:d;return{left:m.left,top:m.top,width:Math.max(40,m.right-m.left),height:Math.max(40,m.bottom-m.top)}}constellationAnimationState(){return this.constellations.animationState()}constellationGeometry(){return this.constellations.geometry()}get inFlight(){return this.flight.active}navigationCamera(){return{x:this.controls.target.x,y:-this.controls.target.z,distance:this.flight.active?this.flight.returnDistance:this.camera.position.distanceTo(this.controls.target),tilt:this.flight.active?this.preferredTilt:this.tilt}}restoreNavigationCamera(t){this.focus=null,this.controls.target.set(t.x,0,-t.y),this.tilt=this.tiltTarget=this.preferredTilt=pe.clamp(t.tilt,0,eh),this.setDistance(t.distance),this.labelsDirty=!0}resumeFlight(t){this.enterFlight()&&(this.flight.resume(new R(t.x*ue,t.z*ue,-t.y*ue),t.yaw,t.pitch,t.speed,this.camera,this.flightLook),this.field.setLift(1),this.field.object.scale.setScalar(ue),this.constellations.object.scale.setScalar(ue),this.constellations.setLift(e=>this.heights.get(e)??0,1),this.flightNebulae.setOpacity(1))}enterFlight(){if(this.flight.active)return!1;this.flightSearch=this.searchIds.slice(),this.collisionStars=null,this.searchIds=[],this.field.setSearch([],this.searchCenter,this.searchUnit),this.constellations.setSearchHole(null),this.blackHole.visible=!1,this.trace.visible=!1,this.tails.visible=!1,this.selectedHalo.visible=!1,this.focus=null,this.keys.clear(),this.controls.enabled=!1,this.labels.clear(),this.nebulae.object.visible=!1,this.constellations.setFlight(!0),this.constellationName?.classList.remove("is-visible"),this.setFlightMaterial(!0);const t=this.camera.position.distanceTo(this.controls.target);return this.flightMouse.set(0,0),this.flight.enter(this.camera,this.controls.target.clone(),t,3,this.extent),this.ship.group.visible=!0,this.sky.object.visible=!0,this.flightNebulae.object.visible=!0,this.obstacles.object.visible=!0,this.backdrop.visible=!1,this.onFlightChange?.(!0),!0}exitFlight(){return!this.flight.active||this.flight.phase==="leaving"?!1:(this.endDive(!1),this.flight.leave(this.camera,this.flightLook),!0)}finishFlight(){this.field.object.scale.setScalar(1),this.constellations.object.scale.setScalar(1),this.controls.target.copy(this.flight.mapTarget()),this.tilt=0,this.setDistance(this.flight.returnDistance),this.controls.enabled=!0,this.nebulae.object.visible=!0,this.ship.group.visible=!1,this.sky.object.visible=!1,this.flightNebulae.object.visible=!1,this.obstacles.object.visible=!1,document.body.classList.remove("flight-boost"),this.backdrop.visible=!0,this.windows.clear(),this.farLabels.clear(),this.signs.clear(),this.constellations.setFlight(!1),this.setFlightMaterial(!1);const t=this.flightSearch??[];this.flightSearch=null,this.tiltTarget=t.length?0:this.preferredTilt,this.tiltSpeed=Math.abs(this.tiltTarget-this.tilt)/Va,t.length&&(this.setSearch(t),this.selectSearch(this.selectedId)),this.refreshEmphasis(),this.labelsDirty=!0,this.lastLabelTier=null,this.onFlightChange?.(!1)}setFlightMaterial(t){const e=this.field.object.material;e.uniforms.uMaxSize.value=t?Tx:cd,e.uniforms.uFlight.value=t?1:0,e.uniforms.uSizeScale.value=t?Ax:1}placeFlightClusters(t,e){const n=new Map;for(const a of t.stars){const o=n.get(a.cluster)??{h:0,n:0};o.h+=this.heights.get(a.id)??0,o.n++,n.set(a.cluster,o)}const s=e.clusters.filter(a=>a.count>0),r=a=>{const o=n.get(a.index),l=o&&o.n?o.h/o.n:0;return{x:a.x*ue,y:l*ue,z:-a.y*ue,radius:a.radius*ue}};this.obstacles.set(s.map(a=>({...r(a),radius:a.radius*ue*1.8})),this.extent),this.flightNebulae.set(s.map(a=>({index:a.index,...r(a),color:Yc(a.index)}))),this.signs.set(s.map(a=>({index:a.index,name:a.name,...r(a)})))}setStarAppearance(t){this.field.setAppearance(t)}get spaceScale(){return 1+(ue-1)*this.flight.lift}worldOf(t,e=new R){return this.field.positionWorld(t,e,this.spaceScale)?e:null}flightStars(){const t=this.spaceScale;return this.field.placed.flatMap(e=>{const n=this.field.position3(e.id);return n?[{id:e.id,x:n.x*t,y:n.y*t,z:n.z*t}]:[]})}flightConstellationSegments(){return this.constellations.segments().map(t=>({...t,az:t.az-.12,bz:t.bz-.12}))}flightReset(){this.flight.reset()}flightDebris(t=!1){return t&&this.obstacles.set(this.obstacles.ranges.slice(),this.extent),this.obstacles.debris.map(e=>({...e}))}flightNebulaRanges(){return this.obstacles.ranges.map(t=>({...t}))}flightRings(){return this.obstacles.rings.map(t=>({...t}))}flightPlace(t,e,n,s,r,a){this.flight.place(new R(t,e,n),new R(s,r,a))}flightHeights(){return this.field.placed.map(t=>({id:t.id,z:this.heights.get(t.id)??0}))}entryDistance(){const t=this.lastEntry?this.worldOf(this.lastEntry):null;return t?this.flight.ship.position.distanceTo(t):null}flightState(){const t=this.flight.ship;return{active:this.flight.active,phase:this.flight.phase,transitioning:this.flight.transitioning,lift:this.flight.lift,nearby:this.windows.nearby,windows:this.windows.visibleIds,nebulae:this.flightNebulae.count,diving:!!this.dive,lastEntry:this.lastEntry,entryDistance:this.entryDistance(),scale:ue,searchStashed:this.flightSearch?.length??0,bumps:this.bumps,boosts:this.boosts,boostCap:this.flight.boostCap,maxSpeed:this.flight.normalMaxSpeed,lastBump:this.lastBump,farLabelLimit:this.farLabels.limit,ship:{x:t.position.x/ue,y:-t.position.z/ue,z:t.position.y/ue,speed:t.speed,yaw:t.yaw,pitch:t.pitch}}}setTopDown(t){this.tiltTarget=t?0:this.preferredTilt,this.tiltSpeed=Math.abs(this.tiltTarget-this.tilt)/Va}onTiltStart=t=>{t.button!==2||this.flight.active||(this.focus=null,this.tiltPointer=t.pointerId,this.tiltPointerY=t.clientY,this.tiltCapture=t.currentTarget,this.tiltCapture.setPointerCapture(t.pointerId),t.preventDefault(),t.stopImmediatePropagation())};onTiltMove=t=>{if(t.pointerId!==this.tiltPointer)return;const e=t.clientY-this.tiltPointerY;this.tiltPointerY=t.clientY,this.tilt=pe.clamp(this.tilt+e*.004,0,eh),this.preferredTilt=this.tiltTarget=this.tilt,this.setDistance(this.camera.position.distanceTo(this.controls.target)),t.preventDefault(),t.stopImmediatePropagation()};onTiltEnd=t=>{t.pointerId===this.tiltPointer&&(this.tiltPointer=null,this.tiltCapture?.hasPointerCapture(t.pointerId)&&this.tiltCapture.releasePointerCapture(t.pointerId),this.tiltCapture=null,t.preventDefault(),t.stopImmediatePropagation())};setSearch(t){const e=this.searchIds.length>0,n=t.length>0;!e&&n&&this.constellationNameId?this.searchStash={target:this.controls.target.clone(),distance:this.camera.position.distanceTo(this.controls.target)}:e&&!n&&this.searchStash&&this.constellationNameId&&(this.focus={from:this.controls.target.clone(),to:this.searchStash.target,fromDistance:this.camera.position.distanceTo(this.controls.target),toDistance:this.searchStash.distance,elapsed:0,duration:ih}),n||(this.searchStash=null),this.searchIds=t.slice(0,21);const s=new mc;s.setFromCamera(new dt(0,0),this.camera);const r=new R;s.ray.intersectPlane(new on(new R(0,1,0),0),r),this.searchCenter={x:r.x,y:-r.z};const a=this.camera.position.distanceTo(this.controls.target),o=Math.max(2,a*Math.tan(pe.degToRad(this.camera.fov/2))*.18);this.searchUnit=o,this.field.setSearch(this.searchIds,this.searchCenter,o),this.blackHole.visible=this.searchIds.length>0,this.blackHole.position.set(r.x,0,r.z),this.blackHole.scale.setScalar(o),this.trace.visible=this.searchIds.length>0,this.tails.visible=this.searchIds.length>0,this.constellations.setSearchHole(this.searchIds.length?this.blackHole.position:null,ka*o),this.hoveredId=null,this.labelsDirty=!0,e!==n&&this.refreshEmphasis()}selectSearch(t){this.selectedId=t,this.selectedHalo.visible=!!t}hoverStar(t){this.hoveredId=t&&this.searchIds.includes(t)?t:null;const e=this.searchIds.length?null:t;this.hoveredMapId!==e&&(this.hoveredMapId=e,this.labelsDirty=!0)}traceGeometry(){const t=this.tails.geometry.getAttribute("aAlpha").array;return{tails:this.searchIds.length,fullLines:this.fullTraceCount,maxTailPixels:this.maxTailPixels,startAlpha:t[0]??0,endAlpha:t[7]??0}}searchGeometry(){return{center:this.searchCenter,unit:this.searchUnit,stars:this.searchIds.flatMap(t=>{const e=this.field.displayPosition(t);return e?[{id:t,...e}]:[]})}}searchHole(){if(!this.searchIds.length)return null;this.camera.updateMatrixWorld();const t=this.renderer.getSize(new dt),e=o=>(o.project(this.camera),{x:(o.x*.5+.5)*t.x,y:(-o.y*.5+.5)*t.y}),n=this.blackHole.position,s=e(n.clone()),r=ka*this.searchUnit;let a=1/0;for(let o=0;o<32;o++){const l=o/32*Math.PI*2,c=e(new R(n.x+Math.cos(l)*r,.12,n.z+Math.sin(l)*r));a=Math.min(a,Math.hypot(c.x-s.x,c.y-s.y))}return{...s,r:a-2}}setConstellationLinesVisible(t){this.constellations.object.visible=t}setConstellationTestOpacity(t){this.constellations.setTestOpacity(t)}setConstellationTestLine(t){this.constellations.setTestLine(t&&this.searchIds.length?this.blackHole.position:null,ka*this.searchUnit)}starScreen(t){const e=this.field.displayPosition(t);if(!e)return null;const n=this.renderer.getSize(new dt),s=new R(e.x,0,-e.y).project(this.camera);return{x:(s.x*.5+.5)*n.x,y:(-s.y*.5+.5)*n.y}}starPosition(t){return this.field.displayPosition(t)}starVisual(t){return this.field.visual(t)}cameraTilt(){return pe.radToDeg(this.tilt)}cameraState(){return{x:this.controls.target.x,y:-this.controls.target.z,distance:this.camera.position.distanceTo(this.controls.target),tier:this.zoomTier}}focusCluster(t){if(this.searchIds.length)return;const e=this.labelSource.clusters.find(r=>r.index===t&&r.count>0);if(!e)return;const n=this.camera.position.distanceTo(this.controls.target),s=this.fitDistance*nh;this.focus={from:this.controls.target.clone(),to:new R(e.x,0,-e.y),fromDistance:n,toDistance:this.zoomTier==="far"?s:n,elapsed:0,duration:gv}}resetCamera(){this.focus=null,this.frameAll(),this.labelsDirty=!0}pickStar(t,e){const n=this.renderer.getSize(new dt),s=new R;let r=null,a=196;for(const o of this.field.placed){const l=this.field.displayPosition(o.id);if(!l)continue;s.set(l.x,0,-l.y).project(this.camera);const c=(s.x*.5+.5)*n.x,u=(-s.y*.5+.5)*n.y,h=(c-t)**2+(u-e)**2;h<a&&(a=h,r=o.id)}return r}get zoomTier(){const t=this.camera.position.distanceTo(this.controls.target);return t>this.fitDistance*1.4?"far":t>this.fitDistance*.55?"mid":"near"}setZoomTier(t){const e=t==="far"?1.9:t==="mid"?nh:.3;this.setDistance(this.fitDistance*e)}labelGeometry(){return this.screenCircles}labelStats(){return{frames:this.frames,positionUpdates:this.labelPositionUpdates,decisions:this.labelDecisions,maxPositionMs:this.maxLabelPositionMs}}resetLabelTiming(){this.maxLabelPositionMs=0}start(){this.running||(this.running=!0,this.renderer.setAnimationLoop(this.tick))}frameAll(){const t=this.bounds,e=2;this.controls.target.set((t.minX+t.maxX)/2,0,-(t.minY+t.maxY)/2);const n=Math.tan(pe.degToRad(this.camera.fov/2)),s=n*this.camera.aspect,r=(t.maxX-t.minX)/2+e,a=((t.maxY-t.minY)/2+e)*Math.cos(this.tilt);let o=Math.max(25,Math.max(r/s,a/n)/.8);const l=[[t.minX-e,t.minY-e],[t.maxX+e,t.minY-e],[t.minX-e,t.maxY+e],[t.maxX+e,t.maxY+e]],c=new R;for(let u=0;u<6;u++){this.setDistance(o),this.camera.updateMatrixWorld();let h=0;for(const[f,m]of l)c.set(f,0,-m).project(this.camera),h=Math.max(h,Math.abs(c.x),Math.abs(c.y));if(h<=0)break;const d=o*(h/.8);if(Math.abs(d-o)<o*.005)break;o=d}this.fitDistance=o,this.setDistance(o)}setDistance(t){const e=this.controls.target;this.camera.position.set(e.x,e.y+t*Math.cos(this.tilt),e.z+t*Math.sin(this.tilt)),this.controls.update()}tick=()=>{this.frames++;const t=Math.min(.05,this.clock.getDelta());if(this.flight.active){this.flightTick(t);return}if(this.applyKeys(t),this.focus){const d=this.focus;d.elapsed=Math.min(d.duration,d.elapsed+t);const f=d.elapsed/d.duration,m=f*f*(3-2*f);this.controls.target.lerpVectors(d.from,d.to,m),this.setDistance(pe.lerp(d.fromDistance,d.toDistance,m)),f===1&&(this.focus=null)}if(Math.abs(this.tilt-this.tiltTarget)>1e-4){const d=this.tiltSpeed*t,f=this.tiltTarget-this.tilt;this.tilt+=Math.sign(f)*Math.min(Math.abs(f),d);const m=this.controls.target,_=this.camera.position.distanceTo(m);this.camera.position.set(m.x,m.y+_*Math.cos(this.tilt),m.z+_*Math.sin(this.tilt))}this.field.update(t);const e=Math.max(1,this.camera.position.distanceTo(this.controls.target)*.024);if(this.constellations.moveEditMembers(d=>this.field.displayPosition(d),e),this.constellations.update(t),this.constellationNameWait&&this.constellations.animationState().phase==="done"&&(this.constellationNameWait=!1,this.constellationName?.classList.add("is-visible")),this.searchIds.length){const d=this.tails.geometry.getAttribute("position"),f=this.tails.geometry.getAttribute("aAlpha"),m=d.array,_=f.array,g=this.renderer.getSize(new dt);this.maxTailPixels=0,this.searchIds.forEach((v,C)=>{const w=this.field.placed.find(U=>U.id===v),A=this.field.displayPosition(v);if(!w||!A)return;const D=new R(A.x,0,-A.y).project(this.camera),E=new R(w.x,0,-w.y).project(this.camera),y=Math.hypot((D.x-E.x)*g.x/2,(D.y-E.y)*g.y/2),L=y>0?Math.min(1,40/y):0;this.maxTailPixels=Math.max(this.maxTailPixels,y*L);for(let U=0;U<4;U++)for(let z=0;z<2;z++){const H=(U+z)/4,j=H*L,G=C*8+U*2+z;m.set([A.x+(w.x-A.x)*j,.05,-(A.y+(w.y-A.y)*j)],G*3),_[G]=.48*(1-H)**2}}),d.needsUpdate=!0,f.needsUpdate=!0,this.tails.geometry.setDrawRange(0,this.searchIds.length*8);const p=this.trace.geometry.getAttribute("position"),S=p.array,b=[...new Set([this.selectedId,this.hoveredId])].filter(v=>!!v&&this.searchIds.includes(v));this.fullTraceCount=0;for(const v of b){const C=this.field.placed.find(A=>A.id===v),w=this.field.displayPosition(v);!C||!w||(S.set([C.x,.03,-C.y,w.x,.03,-w.y],this.fullTraceCount*6),this.fullTraceCount++)}p.needsUpdate=!0,this.trace.geometry.setDrawRange(0,this.fullTraceCount*2),this.trace.visible=this.fullTraceCount>0}else this.fullTraceCount=0,this.maxTailPixels=0;if(this.selectedId){const d=this.field.displayPosition(this.selectedId);d&&this.selectedHalo.position.set(d.x,.11,-d.y)}if(this.controls.update(),this.camera.updateMatrixWorld(),this.constellationNameId&&this.constellationName){const d=this.constellations.points(this.constellationNameId);if(d.length){const f=this.renderer.getSize(new dt);let m=1/0,_=-1/0,g=1/0;const p=new R;for(const S of d)p.set(S.x,0,-S.y).project(this.camera),m=Math.min(m,(p.x*.5+.5)*f.x),_=Math.max(_,(p.x*.5+.5)*f.x),g=Math.min(g,(-p.y*.5+.5)*f.y);this.constellationName.style.transform=`translate3d(${(m+_)/2}px, ${Math.max(95,g-12)}px, 0) translate(-50%, -100%)`}}const n=performance.now(),s=this.camera.matrixWorld.elements,r=this.lastLabelCamera.elements,a=!this.labelCameraKnown||s.some((d,f)=>Math.abs(d-r[f])>1e-6),o=a||this.field.isSettling;o&&(this.lastLabelMotion=n,a&&this.lastLabelCamera.copy(this.camera.matrixWorld),this.labelCameraKnown=!0);const l=this.zoomTier;(this.lastLabelTier===null||l!==this.lastLabelTier||!o&&n-this.lastLabelMotion>=150&&(this.labelsDirty||this.lastLabelMotion>0))&&(this.decideLabels(),this.labelsDirty=!1,this.lastLabelTier=l,this.lastLabelMotion=0,this.labelDecisions++);const c=performance.now(),u=this.renderer.getSize(new dt),h=new R;this.labels.updatePositions(d=>{const f=d.searchRank==null?null:this.field.displayPosition(d.key);if(h.set(f?.x??d.x,0,-(f?.y??d.y)).project(this.camera),h.z>1)return null;let m=(h.x*.5+.5)*u.x,_=(-h.y*.5+.5)*u.y;if(d.searchRank!=null){const g=Math.hypot(m-u.x/2,_-u.y/2)||1;m+=(m-u.x/2)/g*10,_+=(_-u.y/2)/g*10}return{sx:m,sy:_}}),this.labelPositionUpdates++,this.maxLabelPositionMs=Math.max(this.maxLabelPositionMs,performance.now()-c),this.renderer.render(this.scene,this.camera)};flightTick(t){Ha()&&this.keys.clear();const e=this.dive?{thrust:0,turn:0,climb:0,mouseX:0,mouseY:0}:{thrust:(this.keys.has("KeyW")?1:0)-(this.keys.has("KeyS")?1:0),turn:(this.keys.has("KeyA")?1:0)-(this.keys.has("KeyD")?1:0),climb:(this.keys.has("Space")?1:0)-(this.keys.has("Shift")?1:0),mouseX:this.flightMouse.x,mouseY:this.flightMouse.y};this.dive&&(this.flight.ship.speed=0);const n=this.flight.ship.position.clone(),{finished:s}=this.flight.update(t,this.camera,this.flightLook,e);if(this.obstacles.update(t),this.boostVisualLeft>0&&(this.boostVisualLeft=Math.max(0,this.boostVisualLeft-t),document.body.classList.toggle("flight-boost",this.boostVisualLeft>0)),this.flight.phase==="flying"&&!this.dive&&this.checkObstacles(n),this.shakeLeft>0&&(this.shakeLeft=Math.max(0,this.shakeLeft-t),this.camera.position.x+=Math.sin(this.shakeLeft*80)*this.shakeLeft*.12),this.field.object.scale.setScalar(this.spaceScale),this.constellations.object.scale.setScalar(this.spaceScale),this.sky.follow(this.camera),this.flightNebulae.setOpacity(this.flight.lift),(this.flight.transitioning||s)&&this.constellations.setLift(a=>this.heights.get(a)??0,this.flight.lift),this.flight.phase==="flying")if(this.dive)this.advanceDive(t);else{const a=this.findStarHit(n,this.flight.ship.position);a&&(this.dive={id:a,elapsed:0})}const r=this.flight.ship;this.ship.group.position.copy(r.position),this.ship.group.rotation.set(r.pitch,r.yaw,0),this.ship.setThrust(this.flight.thrustLevel),this.camera.updateMatrixWorld(),this.flight.phase==="flying"?this.updateWindows(t):this.flight.phase==="leaving"&&(this.windows.clear(),this.farLabels.clear()),this.updateSigns(),this.field.setLift(this.flight.lift),this.field.update(t),this.constellations.update(t),this.camera.updateMatrixWorld(),this.renderer.render(this.scene,this.camera),s==="left"&&this.finishFlight()}checkObstacles(t){const e=this.flight.ship,n=e.position.clone().sub(t),s=n.lengthSq(),r=new R;for(const a of this.obstacles.debris){const o=a.r+2.5+Math.sqrt(s);if(Math.abs(a.x-e.position.x)>o||Math.abs(a.y-e.position.y)>o||Math.abs(a.z-e.position.z)>o)continue;const l=new R(a.x,a.y,a.z),c=s?pe.clamp(l.clone().sub(t).dot(n)/s,0,1):0;r.copy(t).addScaledVector(n,c);const u=a.r+1.2;if(r.distanceTo(l)>=u)continue;const h=e.speed;e.speed*=.6;const d=e.position.clone().sub(l).normalize();d.lengthSq()<.01&&d.set(0,0,1),e.position.copy(l).addScaledVector(d,u+.05),this.lastBump={speedBefore:h,speedAfter:e.speed,distanceAfter:e.position.distanceTo(l),minDistance:u},this.bumps++,this.shakeLeft=.35;break}this.obstacles.rings.forEach((a,o)=>{if((this.ringCooldown.get(o)??0)>performance.now())return;const l=new R(a.nx,a.ny,a.nz),c=new R(a.x,a.y,a.z),u=t.clone().sub(c).dot(l),h=e.position.clone().sub(c).dot(l);u*h>0||Math.abs(u-h)<1e-6||t.clone().lerp(e.position,u/(u-h)).distanceTo(c)>=a.radius||(this.flight.boost(),this.boosts++,this.boostVisualLeft=.65,document.body.classList.add("flight-boost"),this.ringCooldown.set(o,performance.now()+2500))})}findStarHit(t,e){const n=performance.now();if(!this.collisionStars){const u=new R;this.collisionStars=this.field.placed.flatMap(h=>{const d=this.worldOf(h.id,u);return d?[{id:h.id,x:d.x,y:d.y,z:d.z}]:[]})}const s=e.x-t.x,r=e.y-t.y,a=e.z-t.z,o=s*s+r*r+a*a,l=Ba+Math.sqrt(o);let c=null;for(const u of this.collisionStars){if((this.entryCooldown.get(u.id)??0)>n||Math.abs(u.x-e.x)>l||Math.abs(u.y-e.y)>l||Math.abs(u.z-e.z)>l)continue;const h=o>0?pe.clamp(((u.x-t.x)*s+(u.y-t.y)*r+(u.z-t.z)*a)/o,0,1):0,d=u.x-t.x-s*h,f=u.y-t.y-r*h,m=u.z-t.z-a*h;d*d+f*f+m*m<Ba*Ba&&(!c||h<c.t)&&(c={id:u.id,t:h})}return c?.id??null}advanceDive(t){if(!this.dive)return;this.dive.elapsed+=t;const e=Math.min(1,this.dive.elapsed/pv);this.camera.fov=th-16*Math.sin(Math.PI*e),this.camera.updateProjectionMatrix(),this.flash&&(this.flash.style.opacity=String(.85*Math.sin(Math.PI*e))),e>=1&&this.endDive(!0)}endDive(t){const e=this.dive;this.dive=null,this.camera.fov=th,this.camera.updateProjectionMatrix(),this.flash&&(this.flash.style.opacity="0"),!(!e||!t)&&(this.entryCooldown.set(e.id,performance.now()+mv),this.lastEntry=e.id,this.flight.ship.position.addScaledVector(this.flight.forward(),-10),this.flight.ship.speed=0,this.onEnterStar?.(e.id))}updateSigns(){const t=this.renderer.getSize(new dt),e=new R,n=this.flight.ship.position;this.signs.update((s,r,a)=>(e.set(s,r,a).project(this.camera),e.z>1||e.z<-1?null:{x:(e.x*.5+.5)*t.x,y:(-e.y*.5+.5)*t.y}),s=>Math.hypot(s.x-n.x,s.y-n.y,s.z-n.z),this.flight.phase==="leaving"?0:this.flight.lift)}updateWindows(t){const e=this.flight.ship.position,n=this.renderer.getSize(new dt),s=new R,r=new R;this.windows.update(t,this.windowStars,a=>{const o=this.worldOf(a,r);return o?o.distanceTo(e):1/0},a=>{const o=this.worldOf(a,r);if(!o)return null;const l=o.distanceTo(e);return s.copy(o).project(this.camera),s.z>1||s.z<-1?null:{x:(s.x*.5+.5)*n.x,y:(-s.y*.5+.5)*n.y,near:pe.clamp(1-l/ml,0,1)}}),this.farLabels.update(t,this.windowStars,this.windows.visibleIds,a=>this.worldOf(a,r)?.distanceTo(e)??1/0,a=>{const o=this.worldOf(a,r);return!o||(s.copy(o).project(this.camera),s.z>1||s.z<-1)?null:{x:(s.x*.5+.5)*n.x,y:(-s.y*.5+.5)*n.y}})}flightTeleport(t,e){const n=this.worldOf(t),s=this.labelSource.stars.find(u=>u.id===t),r=this.labelSource.clusters.find(u=>u.index===s?.cluster);if(!n||!s||!this.flight.active)return!1;let a=s.x-(r?.x??0),o=s.y-(r?.y??0);const l=Math.hypot(a,o)||1;Math.hypot(a,o)<1e-6&&(a=0,o=-1);const c=n.clone().add(new R(a/l,0,-o/l).multiplyScalar(e));return this.flight.place(c,n),!0}starScreenSize(t){const e=this.worldOf(t),n=this.field.pointSize(t);if(!e||n==null)return null;this.camera.updateMatrixWorld();const s=e.applyMatrix4(this.camera.matrixWorldInverse),r=this.field.object.material,a=n*r.uniforms.uSizeScale.value*r.uniforms.uScale.value/Math.max(-s.z,.001);return pe.clamp(a,2,r.uniforms.uMaxSize.value)}decideLabels(){const t=this.zoomTier,e=this.renderer.getSize(new dt),n=new R;this.camera.updateMatrixWorld();const s=(m,_)=>{if(n.set(m,0,-_).project(this.camera),n.z>1)return null;const g=(n.x*.5+.5)*e.x,p=(-n.y*.5+.5)*e.y;return g<-120||g>e.x+120||p<-40||p>e.y+40?null:{sx:g,sy:p}},r=[],a=[];for(const m of this.labelSource.clusters){if(m.count===0)continue;const _=s(m.x,m.y);if(!_)continue;let g=0,p=0;for(let S=0;S<32;S++){const b=S*Math.PI/16,v=s(m.x+Math.cos(b)*m.radius,m.y+Math.sin(b)*m.radius);v&&(g=Math.max(g,Math.abs(v.sx-_.sx)),p=Math.max(p,Math.abs(v.sy-_.sy)))}g>0&&p>0&&a.push({cluster:m.index,..._,rx:g,ry:p})}this.screenCircles=a;const o=this.labelSource.clusters.filter(m=>m.count>0).map(m=>m.count),l=Math.min(...o),c=Math.max(...o),u=m=>13+(c>l?(m-l)/(c-l):.5)*4;for(const m of this.labelSource.clusters){if(m.count===0)continue;const _=t==="far"?s(m.x,m.y):s(m.x,m.y+m.radius+1.5);_&&r.push({key:`c${m.index}`,text:m.name,x:m.x,y:t==="far"?m.y:m.y+m.radius+1.5,centered:t==="far",sx:_.sx,sy:_.sy,kind:"cluster",cluster:m.index,priority:-1e3+(1e3-m.count),fontSize:Math.round(u(m.count)*(t==="far"?.8:1)*2)/2,dim:this.emphasisMode!=="none"})}const h=this.emphasisIds,d=!this.searchIds.length&&!h.size,f=new Set;if(d&&t==="mid")for(const m of this.labelSource.clusters)this.labelSource.stars.filter(_=>_.cluster===m.index&&ti(_.touched)>.55).sort((_,g)=>ti(g.touched)-ti(_.touched)||_.rank-g.rank||_.id.localeCompare(g.id)).slice(0,2).forEach(_=>f.add(_.id));if(this.searchIds.length||t!=="far"||h.size){const m=new Map(this.searchIds.map((_,g)=>[_,g]));for(const _ of this.labelSource.stars){const g=h.has(_.id);if(!g&&this.searchIds.length&&!m.has(_.id)||!g&&!this.searchIds.length&&(t==="far"||d&&t==="mid"&&!f.has(_.id)&&_.id!==this.hoveredMapId||!d&&t==="mid"&&_.rank>=4))continue;const p=this.searchIds.length?this.field.displayPosition(_.id):null,S=s(p?.x??_.x,p?.y??_.y);if(!S)continue;const b=this.searchIds.length&&Math.hypot(S.sx-e.x/2,S.sy-e.y/2)||1,v=this.labelSource.clusters.find(C=>C.index===_.cluster);r.push({key:_.id,text:_.title,x:_.x,y:_.y,sx:this.searchIds.length?S.sx+(S.sx-e.x/2)/b*10:S.sx,sy:this.searchIds.length?S.sy+(S.sy-e.y/2)/b*10:S.sy,kind:"star",priority:g?-3e3+_.rank:this.searchIds.length?(m.get(_.id)??99)-100:d&&_.id===this.hoveredMapId?-2e3:d?(1-ti(_.touched))*100+_.rank*.01:_.rank,dim:h.size>0&&!g,searchRank:this.searchIds.length?m.get(_.id):void 0,fontSize:d?Math.round((10+2*ti(_.touched))*10)/10:void 0,opacity:d?.4+.6*ti(_.touched):void 0,cluster:_.cluster,side:this.searchIds.length?S.sx>=e.x/2?"right":"left":!v||_.x>=v.x?"right":"left"})}}this.labels.render(this.searchIds.length?r.filter(m=>m.kind==="star"):r,this.searchIds.length||h.size?"near":t,this.searchIds.length?[]:a)}resize=()=>{const t=this.canvas.clientWidth||innerWidth,e=this.canvas.clientHeight||innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.labelsDirty=!0;const n=this.renderer.getDrawingBufferSize(new dt).y/(2*Math.tan(pe.degToRad(this.camera.fov/2)));this.setPointScale(n)};setPointScale(t){this.sky.setScale(t);for(const e of[this.backdrop,this.field.object]){const n=e.material;n?.uniforms?.uScale&&(n.uniforms.uScale.value=t)}}}const Mv={chrome:"Chrome",sample:"サンプル"},Sv=`
  <ul class="hud-help">
    <li><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>・左ドラッグ　移動</li>
    <li><kbd>Space</kbd> 縮小　<kbd>Shift</kbd> 拡大（ホイールでも）</li>
    <li>右ドラッグの上下　傾き</li>
    <li><kbd>/</kbd> 検索欄へ　<kbd>Esc</kbd> 検索を消して抜ける</li>
    <li><kbd>↑</kbd><kbd>↓</kbd> 候補を選ぶ　<kbd>Enter</kbd> 同じタブで開く（<kbd>Ctrl</kbd>/<kbd>⌘</kbd> で新しいタブ）</li>
    <li><kbd>Shift</kbd>+<kbd>Enter</kbd> 検索結果を星座にする</li>
    <li>星団名をクリック　その星団へ移動</li>
    <li>星をクリック　カード（ダブルクリックで開く）</li>
  </ul>`;let As=null,ud=null;function Ev(i,t){As=i,ud=t}const bv={sample:"サンプルの宇宙で試す",chrome:"自分のブックマークに戻る"},fd=i=>i.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);function Fn(i){const t=document.getElementById("hud");if(!t)return;i.phase&&(document.body.dataset.phase=i.phase);const e=i.progress==null?"":`<div class="hud-bar"><i style="width:${Math.round(i.progress*100)}%"></i></div>`;t.innerHTML=`
    <div class="hud-title">ブクスペ</div>
    <div class="hud-line"><span class="hud-key">星</span>${i.count}</div>
    <div class="hud-line"><span class="hud-key">データ源</span>${Mv[i.kind]}</div>
    ${i.status?`<div class="hud-status">${fd(i.status)}</div>${e}`:""}
    ${As?`<button id="source-toggle" class="hud-switch" type="button">${bv[As]}</button>`:""}
    ${Sv}
  `}function Bo(i,t="loading"){const e=document.getElementById("hud");e&&(document.body.dataset.phase=t,e.innerHTML=`<div class="hud-title">ブクスペ</div><div class="hud-status">${fd(i)}</div>`)}let pd=!1;function wv(){if(window.setTimeout(()=>document.getElementById("hint")?.classList.add("is-faded"),1e4),new URLSearchParams(location.search).get("demo")==="1"){document.body.classList.add("is-demo");return}document.getElementById("hud")?.addEventListener("click",i=>{i.target?.id==="source-toggle"&&As&&ud?.(As)}),document.getElementById("hud-toggle")?.addEventListener("click",()=>{pd=!0,document.getElementById("hud")?.classList.toggle("is-collapsed")})}function Tv(){pd||document.getElementById("hud")?.classList.add("is-collapsed")}const ko="mean-vector",Er="layout",Av="generality",q={kind:"sample",items:[],vectors:new Map,mean:null,generality:new Map,layout:null};let An=null,gl=!0,nt=null,xe=[],Nn=0,Gr,Rs=0,_s=null,Je=[],we=null,Zt=null,Wr=!1;const zo="bukusupe:return-state-v1";let _r=!1;function rh(){if(!nt)return;const i=nt.flightState(),t={source:q.kind,flying:i.active,ship:i.active?i.ship:null,camera:nt.navigationCamera(),query:document.getElementById("search-input")?.value??"",constellationId:we};sessionStorage.setItem(zo,JSON.stringify(t))}async function Rv(){if(performance.getEntriesByType("navigation")[0]?.type!=="back_forward")return;const t=sessionStorage.getItem(zo);if(!t||!nt)return;sessionStorage.removeItem(zo);let e;try{e=JSON.parse(t)}catch{return}if(!(e.source!==q.kind||!e.camera)){if(e.constellationId&&Je.some(n=>n.id===e.constellationId)&&await xl(e.constellationId),nt.restoreNavigationCamera(e.camera),e.query){const n=document.getElementById("search-input");n.value=e.query,vs(await Cs(e.query))}e.flying&&e.ship&&nt.resumeFlight(e.ship)}}async function Cv(){const i=document.getElementById("space"),t=document.getElementById("labels");if(!i||!t)throw new Error("画面の土台が見つからない");wv(),nt=new yv(i,t),nt.setStarAppearance(od),nt.onStarLabelClick=_l,Bv(),nt.start(),Bo("ブックマークを読み込んでいる…");const e=await lh();q.kind=e.kind,q.items=e.items,Ev(q.kind==="chrome"?"sample":e.chromeCount>0?"chrome":null,md),Qd(q.kind),tu(()=>Bo("ほかのブクスペのタブを閉じると続きを始める")),Wi(au(q.items),!1),Fn({count:q.items.length,kind:q.kind,status:"星を読み解いている…",phase:"embed"}),document.getElementById("loading")?.remove(),An=new Ud,await _d(),await xd(),Je=await iu(),await yd(),ns(),Ov(i),Nv(),await Rv(),Lv(),kv(),document.getElementById("relayout")?.addEventListener("click",()=>{gd(vd)})}function md(i){Dd(i==="sample");const t=new URL(location.href);i==="chrome"&&t.searchParams.has("sample")?(t.searchParams.delete("sample"),location.replace(t)):location.reload()}const ah="bukusupe:sample-hint-shown",Pv=20;function Lv(){const i=document.getElementById("sample-hint");if(!(!i||q.kind!=="chrome"||q.items.length>=Pv)){try{if(localStorage.getItem(ah))return;localStorage.setItem(ah,"1")}catch{return}i.hidden=!1,document.getElementById("sample-hint-try")?.addEventListener("click",()=>md("sample")),document.getElementById("sample-hint-close")?.addEventListener("click",()=>{i.hidden=!0})}}let Ga=Promise.resolve();function gd(i){return Ga=Ga.then(i).catch(t=>console.error("[ブクスペ] 更新に失敗",t)),Ga}async function _d(){if(!An)return;const i={count:q.items.length,kind:q.kind};try{q.vectors=await ru(q.items,An,t=>{t.phase==="model"?Fn({...i,status:`モデルを取り込んでいる ${t.percent.toFixed(0)}%`,progress:t.percent/100,phase:"model"}):t.phase==="embed"?Fn({...i,status:`星を読み解いている ${t.done} / ${t.total}`,progress:t.done/t.total,phase:"embed"}):Fn({...i,status:"星を並べている…",phase:"layout"})})}catch(t){console.error("[ブクスペ] 埋め込みに失敗",t),Fn({...i,status:"意味の計算に失敗した",phase:"error"})}}async function xd(){if(q.vectors.size===0)return;const{mean:i,recomputed:t}=await Iv();q.mean=i,await Dv();const e=t?void 0:await Xo(Er);let n=null;if(e&&e.version===Pr&&e.stars.length>0){const s=new Set(q.items.map(u=>u.id));n=$d(e,s);const r=new Set(n.stars.map(u=>u.id)),a=q.items.filter(u=>!r.has(u.id)&&q.vectors.has(u.id));for(const u of a)n=Eh(n,u.id,q.vectors.get(u.id),q.mean);const o=new Map(q.items.map(u=>[u.id,u])),l=yh(n.clusters.map(u=>n.stars.filter(h=>h.cluster===u.index).sort((h,d)=>h.rank-d.rank).flatMap(h=>{const d=o.get(h.id);return d?[d]:[]}))),c=n.clusters.some((u,h)=>u.name!==l[h]);c&&(n={...n,clusters:n.clusters.map((u,h)=>({...u,name:l[h]}))}),(c||a.length>0||n.stars.length!==e.stars.length)&&await oi(Er,n)}(!n||n.stars.length===0)&&(n=Lr(q.items,q.vectors,q.mean),await oi(Er,n)),Wi(n),Fn({count:q.items.length,kind:q.kind,status:`${n.clusters.filter(s=>s.count>0).length} つの星団`,phase:"ready"}),Tv()}async function vd(){if(q.vectors.size===0)return;Fn({count:q.items.length,kind:q.kind,status:"並べ直している…",phase:"layout"});const i=Qi([...q.vectors.values()]);q.mean=i,await oi(ko,{source:q.kind,vector:i});const t=Lr(q.items,q.vectors,i);await oi(Er,t),Wi(t),Fn({count:q.items.length,kind:q.kind,status:`${t.clusters.filter(e=>e.count>0).length} つの星団`,phase:"ready"})}async function Dv(){if(!q.mean)return;const i=[],t=[];for(const n of q.items){const s=q.vectors.get(n.id);s&&(i.push(n.id),t.push(s))}const e=mh(ph(t));q.generality=new Map(i.map((n,s)=>[n,e[s]])),await oi(Av,Object.fromEntries(q.generality))}async function Iv(){const i=await Xo(ko);if(i?.source===q.kind&&i.vector?.length>0)return{mean:i.vector,recomputed:!1};const t=Qi([...q.vectors.values()]);return await oi(ko,{source:q.kind,vector:t}),{mean:t,recomputed:!0}}function Wi(i,t=!0){q.layout=i;const e=new Map(q.items.map(n=>[n.id,n]));nt?.setLayout(i,j_(i,e),Y_(i,e),t),ns(),xe.length&&(nt?.setSearch(xe.map(n=>n.id)),nt?.selectSearch(xe[Nn]?.id??null))}function ns(){nt?.setConstellations(Je.map(i=>({id:i.id,name:i.name,points:li(q.layout,i.lastMembers)}))),Zt&&nt?.setEditMembers(li(q.layout,Ji())),kn()}async function yd(){const i=new Set(q.items.map(t=>t.id));for(const t of Je){const e=t.lastMembers.filter(n=>i.has(n));e.length!==t.lastMembers.length&&(t.lastMembers=e,await Xr(t))}ns()}function Ji(){return Zt?Ah(Zt.automatic,[...Zt.pinned],[...Zt.excluded]):[]}function _l(i){Zt?(Ji().includes(i)?(Zt.pinned.delete(i),Zt.excluded.add(i)):(Zt.excluded.delete(i),Zt.pinned.add(i)),nt?.setEditMembers(li(q.layout,Ji()))):Fv(i)}function Md(){const t=document.getElementById("search-input").value.trim();if(!t||!xe.length||Zt)return;Zt={query:t,automatic:xe.slice(0,12).map(n=>n.id),pinned:new Set,excluded:new Set},document.getElementById("constellation-create").hidden=!0,document.getElementById("constellation-editor").hidden=!1;const e=document.getElementById("constellation-name-input");e.value=t,e.focus(),nt?.setEditMembers(li(q.layout,Ji()))}function xs(){Zt=null,nt?.setEditMembers([]),document.getElementById("constellation-editor").hidden=!0;const i=document.getElementById("search-input");document.getElementById("constellation-create").hidden=!i.value.trim()||!xe.length}async function oh(){if(!Zt)return;const i=document.getElementById("constellation-name-input").value.trim()||Zt.query,t=Ji().filter(a=>q.items.some(o=>o.id===a)),e=An&&gl?Array.from((await An.embed([dh(Zt.query)]))[0]):void 0,n={id:crypto.randomUUID(),name:i,source:"search",query:Zt.query,queryVector:e,pinned:[...Zt.pinned],excluded:[...Zt.excluded],lastMembers:t,createdAt:Date.now()};await Xr(n),Je.push(n),xs(),++Rs,clearTimeout(Gr);const s=document.getElementById("search-input");s.value="",s.blur(),document.getElementById("constellation-create").hidden=!0,xe=[],we=n.id,Wr=!0,ns(),nt?.saveConstellation(n.id,n.name,li(q.layout,t)),kn();const r=()=>{nt?.constellationAnimationState().phase==="done"?window.setTimeout(()=>{Wr=!1,we=null,nt?.selectConstellation(null),document.activeElement!==document.getElementById("search-input")&&nt?.setTopDown(!1),kn()},1200):requestAnimationFrame(r)};requestAnimationFrame(r)}let Xi=0;async function xl(i){if(Wr)return;const t=++Xi;if(we===i){we=null,nt?.selectConstellation(null),kn();return}const e=Je.find(o=>o.id===i);if(!e)return;const n=e.query?await Cs(e.query):[];if(t!==Xi)return;const s=(n[0]?.score??0)*jo,r=n.filter(o=>o.score>=s).slice(0,12).map(o=>o.id),a=new Set(q.items.map(o=>o.id));e.lastMembers=Ah(r,e.pinned,e.excluded).filter(o=>a.has(o)),await Xr(e),t===Xi&&(we=i,ns(),nt?.selectConstellation(i,e.name),nt?.focusPoints(li(q.layout,e.lastMembers)))}function kn(){const i=document.getElementById("constellation-list");if(i){document.body.classList.toggle("has-constellations",Je.length>0),zi(),i.replaceChildren();for(const t of Je){const e=document.createElement("button");if(e.textContent=t.name,e.classList.toggle("is-active",t.id===we),e.addEventListener("click",()=>{xl(t.id)}),i.append(e),t.id===we&&!Wr){const n=document.createElement("button");n.id="constellation-more",n.textContent="…",n.title="この星座の操作",n.setAttribute("aria-label",`「${t.name}」の操作`),n.setAttribute("aria-haspopup","menu"),n.setAttribute("aria-expanded","false"),n.addEventListener("click",s=>{s.stopPropagation(),Uv(n)}),i.append(n)}}}}function Uv(i){const t=document.getElementById("constellation-manage");if(!t)return;if(!t.hidden){zi();return}t.hidden=!1,i.setAttribute("aria-expanded","true");const e=i.getBoundingClientRect();t.style.left=`${Math.max(8,Math.min(innerWidth-t.offsetWidth-8,e.left+e.width/2-t.offsetWidth/2))}px`,t.style.bottom=`${innerHeight-e.top+6}px`}function zi(){const i=document.getElementById("constellation-manage");i&&(i.hidden=!0),document.getElementById("constellation-more")?.setAttribute("aria-expanded","false")}function Nv(){document.getElementById("constellation-create")?.addEventListener("click",Md),document.getElementById("constellation-save")?.addEventListener("click",()=>{oh()}),document.getElementById("constellation-cancel")?.addEventListener("click",xs),document.getElementById("constellation-name-input")?.addEventListener("keydown",i=>{i.key==="Enter"&&(i.preventDefault(),oh()),i.key==="Escape"&&(i.preventDefault(),xs())}),document.addEventListener("click",i=>{const t=document.getElementById("constellation-manage");t&&!t.hidden&&!t.contains(i.target)&&zi()}),document.getElementById("constellation-rename")?.addEventListener("click",async()=>{zi();const i=Je.find(e=>e.id===we);if(!i)return;const t=window.prompt("星座の名前",i.name)?.trim();t&&(i.name=t,await Xr(i),nt?.selectConstellation(i.id,t),kn())}),document.getElementById("constellation-delete")?.addEventListener("click",async()=>{if(zi(),!we)return;const i=we;await su(i),Je=Je.filter(t=>t.id!==i),++Xi,we=null,nt?.selectConstellation(null),ns()}),document.addEventListener("keydown",i=>{const t=document.getElementById("constellation-manage");if(i.key==="Escape"&&t&&!t.hidden){zi();return}i.key!=="Escape"||i.target===document.getElementById("search-input")||i.target===document.getElementById("constellation-name-input")||(Zt?xs():we&&(++Xi,we=null,nt?.selectConstellation(null),kn()))}),kn()}async function Cs(i,t=Ir,e=Ur){if(!An||!gl||!q.mean||i.trim().length<2)return Nr(q.items,i);const[n]=await An.embed([dh(i)]),s=hu(n,q.items,q.vectors,q.mean,q.generality,t,q.layout,e);return Nr(q.items,i,s)}function br(i,t=!1){const e=q.items.find(n=>n.id===i);if(e)if(typeof chrome<"u"&&chrome.tabs?.create){if(t){chrome.tabs.create({url:e.url});return}rh(),chrome.tabs.getCurrent().then(n=>{if(n?.id!=null)return chrome.tabs.update(n.id,{url:e.url});location.href=e.url})}else t?window.open(e.url,"_blank","noopener"):(rh(),location.href=e.url)}function Fv(i){const t=q.items.find(n=>n.id===i),e=document.getElementById("star-card");!t||!e||(_s=i,document.getElementById("star-card-title").textContent=t.title,document.getElementById("star-card-url").textContent=t.url,document.getElementById("star-card-folder").textContent=t.folderPath.join(" / ")||"ルート",e.hidden=!1)}function vs(i){const t=(i[0]?.score??0)*jo;xe=i.filter(n=>n.score>=t).slice(0,21),Nn=0,nt?.setSearch(xe.map(n=>n.id)),nt?.selectSearch(xe[0]?.id??null);const e=document.getElementById("constellation-create");e&&(e.hidden=!xe.length||!document.getElementById("search-input").value.trim()||!!Zt)}function Ov(i){const t=document.getElementById("search-input"),e=document.getElementById("star-card");document.addEventListener("keydown",n=>{if(n.key!=="/"||n.ctrlKey||n.metaKey||n.altKey||nt?.inFlight)return;const s=document.activeElement;s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement||(n.preventDefault(),t.focus())}),t.addEventListener("focus",()=>nt?.setTopDown(!0)),t.addEventListener("blur",()=>{t.value.trim()||nt?.setTopDown(!1)}),t.addEventListener("input",()=>{const n=t.value.trim(),s=++Rs;if(clearTimeout(Gr),e.hidden=!0,_s=null,!n){vs([]),document.activeElement!==t&&nt?.setTopDown(!1);return}vs(Nr(q.items,n)),!(n.length<2)&&(Gr=window.setTimeout(async()=>{try{const r=await Cs(n);s===Rs&&vs(r)}catch(r){console.error("[ブクスペ] 検索に失敗",r)}},300))}),t.addEventListener("keydown",n=>{if(n.key==="Enter"&&n.shiftKey)Md(),n.preventDefault();else if(n.key==="Escape"){if(Zt){xs(),n.preventDefault();return}if(we&&!t.value.trim()){++Xi,we=null,nt?.selectConstellation(null),kn(),n.preventDefault();return}t.value="",t.dispatchEvent(new Event("input")),t.blur(),n.preventDefault()}else if(n.key==="ArrowDown"||n.key==="ArrowUp"){if(!xe.length)return;Nn=(Nn+(n.key==="ArrowDown"?1:-1)+xe.length)%xe.length,nt?.selectSearch(xe[Nn].id),n.preventDefault()}else n.key==="Enter"&&xe[Nn]&&(br(xe[Nn].id,n.ctrlKey||n.metaKey),n.preventDefault())}),i.addEventListener("click",n=>{if(nt?.inFlight)return;const s=nt?.pickStar(n.clientX,n.clientY);s?_l(s):e.hidden=!0}),i.addEventListener("mousemove",n=>{nt?.inFlight||nt?.hoverStar(nt.pickStar(n.clientX,n.clientY))}),i.addEventListener("mouseleave",()=>nt?.hoverStar(null)),i.addEventListener("dblclick",n=>{if(nt?.inFlight||Zt)return;const s=nt?.pickStar(n.clientX,n.clientY);s&&br(s,n.ctrlKey||n.metaKey)}),document.getElementById("star-card-open")?.addEventListener("click",n=>{_s&&br(_s,n.ctrlKey||n.metaKey)})}function Bv(){const i=document.getElementById("flight-toggle"),t=()=>{const a=document.activeElement;return a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a?.isContentEditable},e=()=>{!nt||Zt||nt.inFlight||(document.activeElement?.blur?.(),document.getElementById("star-card").hidden=!0,_s=null,nt.enterFlight())},n=()=>{nt?.exitFlight()};nt.onEnterStar=a=>br(a,_r);const s=document.getElementById("flight-help");let r;nt.onFlightChange=a=>{document.body.classList.toggle("is-flying",a),clearTimeout(r),s?.classList.remove("is-compact"),a&&(r=window.setTimeout(()=>s?.classList.add("is-compact"),1e4)),i&&(i.textContent=a?"地図へ戻る":"飛行",i.title=a?"地図へ戻る（Esc）":"星の間を飛ぶ（F）")},i?.addEventListener("click",()=>nt?.inFlight?n():e()),window.addEventListener("keydown",a=>{(a.key==="Control"||a.key==="Meta")&&(_r=!0)},{capture:!0}),window.addEventListener("keyup",a=>{(a.key==="Control"||a.key==="Meta")&&(_r=!1)},{capture:!0}),window.addEventListener("blur",()=>{_r=!1}),window.addEventListener("keydown",a=>{if(!(a.ctrlKey||a.metaKey||a.altKey)){if(nt?.inFlight){a.key==="Escape"&&n(),(a.key==="Escape"||a.key==="/"||a.key==="Enter"||a.key.startsWith("Arrow"))&&(a.preventDefault(),a.stopImmediatePropagation());return}a.code==="KeyF"&&!t()&&(a.preventDefault(),e())}},{capture:!0})}function kv(){if(typeof chrome>"u"||!chrome.bookmarks?.onCreated)return;let i,t=!1;const e=async()=>{t=!1;const s=await lh();if(s.kind!==q.kind){location.reload();return}q.items=s.items,await _d(),await xd(),await yd()},n=()=>{clearTimeout(i),i=setTimeout(()=>{t||(t=!0,gd(e))},500)};chrome.bookmarks.onCreated.addListener(n),chrome.bookmarks.onChanged.addListener(n),chrome.bookmarks.onRemoved.addListener(n),chrome.bookmarks.onMoved.addListener(n)}const Wa=i=>({spacing:i.spacing,stars:i.stars.map(t=>({id:t.id,x:t.x,y:t.y,cluster:t.cluster,rank:t.rank,title:q.items.find(e=>e.id===t.id)?.title??"",folder:q.items.find(e=>e.id===t.id)?.folderPath.join("/")??""})),clusters:i.clusters.map(t=>({index:t.index,name:t.name,x:t.x,y:t.y,radius:t.radius,count:t.count}))});let nn=null;const zv={state:q,frames:()=>nt?.frames??0,layout:()=>q.layout?Wa(q.layout):null,computeAgain(){return q.mean?Wa(Lr(q.items,q.vectors,q.mean)):null},async simulateAdd(i,t,e=[]){if(!An||!q.mean||!q.layout)return null;nn??={items:q.items,vectors:q.vectors,layout:q.layout};const n={id:`sim-${Date.now()}`,title:i,url:t,folderPath:e},[s]=await An.embed([Vo(n)]);q.items=[...q.items,n],q.vectors=new Map(q.vectors).set(n.id,s);const r=Eh(q.layout,n.id,s,q.mean);return Wi(r,!1),Wa(r)},async benchmark(i){if(!q.mean)return null;nn??={items:q.items,vectors:q.vectors,layout:q.layout};const t=nn.items.filter(f=>nn?.vectors.has(f.id)),e=[],n=new Map;let s=12345;const r=()=>(s=Math.imul(s,1664525)+1013904223>>>0)/4294967296-.5;for(let f=0;f<i;f++){const m=t[f%t.length],_={...m,id:`bench-${f}`},g=nn.vectors.get(m.id),p=new Float32Array(g.length);let S=0;for(let v=0;v<g.length;v++)p[v]=g[v]+r()*.06,S+=p[v]*p[v];const b=Math.sqrt(S);for(let v=0;v<g.length;v++)p[v]/=b;e.push(_),n.set(_.id,p)}const a=Qi([...n.values()]),o=performance.now(),l=Lr(e,n,a),c=performance.now()-o;q.items=e,q.vectors=n,Wi(l);const u=nt?.frames??0,h=performance.now();await new Promise(f=>setTimeout(f,1500));const d=((nt?.frames??0)-u)/((performance.now()-h)/1e3);return{n:i,layoutMs:c,fps:d,clusters:l.clusters.map(f=>({name:f.name,count:f.count}))}},restore(){return nn?(q.items=nn.items,q.vectors=nn.vectors,nn.layout&&Wi(nn.layout),nn=null,!0):!1},setZoomTier:i=>nt?.setZoomTier(i),cameraState:()=>nt?.cameraState(),resetCamera:()=>nt?.resetCamera(),labelGeometry:()=>nt?.labelGeometry()??[],setTopDown:i=>nt?.setTopDown(i),enterFlight:()=>nt?.enterFlight(),exitFlight:()=>nt?.exitFlight(),flightState:()=>nt?.flightState(),flightStars:()=>nt?.flightStars(),flightHeights:()=>nt?.flightHeights(),flightReset:()=>nt?.flightReset(),flightDebris:(i=!1)=>nt?.flightDebris(i),flightNebulaRanges:()=>nt?.flightNebulaRanges(),flightRings:()=>nt?.flightRings(),flightPlace:(i,t,e,n,s,r)=>nt?.flightPlace(i,t,e,n,s,r),flightTeleport:(i,t)=>nt?.flightTeleport(i,t),starScreenSize:i=>nt?.starScreenSize(i),flightConstellationSegments:()=>nt?.flightConstellationSegments(),appearanceFor:i=>{const t=od({id:i.id??"",rank:i.rank??0,touched:ul(i)});return{size:t.size,alpha:t.alpha,color:[t.color.r,t.color.g,t.color.b]}},relayout:vd,async search(i,t=5,e=Ir,n=Ur){const s=await Cs(i,e,n),r=new Map(q.items.map(l=>[l.id,l])),a=new Map((q.layout?.stars??[]).map(l=>[l.id,l.cluster])),o=new Map((q.layout?.clusters??[]).map(l=>[l.index,l.name]));return s.slice(0,t).map(l=>({...l,folder:r.get(l.id)?.folderPath.join("/")??"",cluster:o.get(a.get(l.id)??-1)??"(未配置)"}))},searchNow:async i=>{const t=document.getElementById("search-input");if(t.focus(),t.value=i,t.dispatchEvent(new Event("input")),i.length>=2){const e=++Rs;clearTimeout(Gr);const n=await Cs(i);e===Rs&&vs(n)}return xe},searchState:()=>({ids:xe.map(i=>i.id),selected:xe[Nn]?.id??null}),searchCoefficient:Ir,clusterPriorCoefficient:Ur,attractRatio:jo,searchGeometry:()=>nt?.searchGeometry(),searchHole:()=>nt?.searchHole()??null,setConstellationLinesVisible:i=>nt?.setConstellationLinesVisible(i),setConstellationTestOpacity:i=>nt?.setConstellationTestOpacity(i),setConstellationTestLine:i=>nt?.setConstellationTestLine(i),starScreen:i=>nt?.starScreen(i),starPosition:i=>nt?.starPosition(i),starVisual:i=>nt?.starVisual(i),traceGeometry:()=>nt?.traceGeometry(),labelStats:()=>nt?.labelStats(),resetLabelTiming:()=>nt?.resetLabelTiming(),cameraTilt:()=>nt?.cameraTilt(),measureLexical:i=>{const t=performance.now();return Nr(q.items,i),performance.now()-t},constellationState:()=>({rows:Je,active:we,editing:Zt?{query:Zt.query,automatic:Zt.automatic,pinned:[...Zt.pinned],excluded:[...Zt.excluded],members:Ji()}:null,geometry:nt?.constellationGeometry(),animation:nt?.constellationAnimationState()}),toggleEditMember:_l,recallConstellation:xl,mstFor:i=>Th(li(q.layout,i)),exportSampleCache:()=>q.kind==="sample"&&q.layout&&q.mean?Zd(q.items,ch,{vectors:q.vectors,mean:q.mean,generality:q.generality,layout:q.layout}):null,modelReady:()=>gl};new URLSearchParams(location.search).get("debug")==="1"&&(globalThis.__bukusupe=zv);Cv().catch(i=>{console.error(i),Bo("読み込みに失敗した。コンソールを確認する。")});
