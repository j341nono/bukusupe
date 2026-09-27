(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Xd=32768,wl=4096;function uh(i){if(typeof i!="string"||i.length===0||i.length>Xd)return!1;try{const{protocol:t}=new URL(i);return t==="http:"||t==="https:"}catch{return!1}}const Al=i=>typeof i=="number"&&Number.isFinite(i)&&i>0;function fh(i){if(!i||typeof i!="object")return null;const t=i;if(typeof t.id!="string"||t.id.length===0||t.id.length>256||!uh(t.url))return null;const e=typeof t.title=="string"&&t.title.length>0?t.title:t.url,n=Array.isArray(t.folderPath)?t.folderPath.filter(s=>typeof s=="string"):[];return{id:t.id,title:e.slice(0,wl),url:t.url,folderPath:n.map(s=>s.slice(0,wl)),...Al(t.dateAdded)?{dateAdded:t.dateAdded}:{},...Al(t.dateLastUsed)?{dateLastUsed:t.dateLastUsed}:{}}}function jd(){return typeof chrome<"u"&&!!chrome.bookmarks?.getTree}async function Yd(){const i=await chrome.bookmarks.getTree(),t=[],e=(n,s)=>{if(n.url){const a=fh({id:n.id,title:n.title,url:n.url,folderPath:s,dateAdded:n.dateAdded,dateLastUsed:n.dateLastUsed});a&&t.push(a);return}const r=n.title?[...s,n.title]:s;for(const a of n.children??[])e(a,r)};for(const n of i)e(n,[]);return t}const qd=JSON.parse('[{"id":"s001","title":"React – ユーザインターフェース構築のためのライブラリ","url":"https://ja.react.dev/","folderPath":["開発","フロントエンド"],"dateAdded":1712433993053,"dateLastUsed":1788728955583},{"id":"s002","title":"useEffect の完全ガイド","url":"https://overreacted.io/a-complete-guide-to-useeffect/","folderPath":["開発","フロントエンド"],"dateAdded":1711737307094,"dateLastUsed":1789004884488},{"id":"s003","title":"Vue.js - プログレッシブ JavaScript フレームワーク","url":"https://ja.vuejs.org/guide/introduction.html","folderPath":["開発","フロントエンド"],"dateAdded":1704264265735,"dateLastUsed":1769289474181},{"id":"s004","title":"Svelte • Cybernetically enhanced web apps","url":"https://svelte.dev/","folderPath":["開発","フロントエンド"],"dateAdded":1652648094695,"dateLastUsed":1715994712712},{"id":"s005","title":"Vite | Next Generation Frontend Tooling","url":"https://ja.vite.dev/guide/","folderPath":["開発","フロントエンド"],"dateAdded":1743357949851},{"id":"s006","title":"TypeScript: Handbook - The Basics","url":"https://www.typescriptlang.org/docs/handbook/2/basic-types.html","folderPath":["開発","フロントエンド"],"dateAdded":1765505142764,"dateLastUsed":1789328210530},{"id":"s007","title":"CSS Grid Layout を極める","url":"https://developer.mozilla.org/ja/docs/Web/CSS/CSS_grid_layout","folderPath":["開発","フロントエンド"],"dateAdded":1721939328211,"dateLastUsed":1789254546386},{"id":"s008","title":"Flexbox チートシート","url":"https://css-tricks.com/snippets/css/a-guide-to-flexbox/","folderPath":["開発","フロントエンド"],"dateAdded":1760819256628,"dateLastUsed":1776370499652},{"id":"s009","title":"Web Components の作り方","url":"https://developer.mozilla.org/ja/docs/Web/API/Web_components","folderPath":["開発","フロントエンド"],"dateAdded":1655256559958,"dateLastUsed":1723412774550},{"id":"s010","title":"Tailwind CSS - Rapidly build modern websites","url":"https://tailwindcss.com/docs/installation","folderPath":["開発","フロントエンド"],"dateAdded":1709653786840,"dateLastUsed":1735340405148},{"id":"s011","title":"Can I use... Support tables for HTML5, CSS3","url":"https://caniuse.com/","folderPath":["開発","フロントエンド"],"dateAdded":1714432195963,"dateLastUsed":1782438851723},{"id":"s012","title":"Core Web Vitals とは何か","url":"https://web.dev/articles/vitals?hl=ja","folderPath":["開発","フロントエンド"],"dateAdded":1692298319475,"dateLastUsed":1765141126849},{"id":"s013","title":"Next.js App Router の考え方","url":"https://nextjs.org/docs/app/building-your-application/routing","folderPath":["開発","フロントエンド"],"dateAdded":1691286469815,"dateLastUsed":1768520589465},{"id":"s014","title":"アクセシビリティ入門 - WAI-ARIA の基本","url":"https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA","folderPath":["開発","フロントエンド"],"dateAdded":1719163702280,"dateLastUsed":1789171536181},{"id":"s015","title":"Go by Example","url":"https://gobyexample.com/","folderPath":["開発","バックエンド"],"dateAdded":1768302549651,"dateLastUsed":1772928519293},{"id":"s016","title":"Rust プログラミング言語 日本語版","url":"https://doc.rust-jp.rs/book-ja/","folderPath":["開発","バックエンド"],"dateAdded":1723948878483,"dateLastUsed":1776453784437},{"id":"s017","title":"PostgreSQL 16 ドキュメント","url":"https://www.postgresql.jp/document/16/html/index.html","folderPath":["開発","バックエンド"],"dateAdded":1763064448634,"dateLastUsed":1779842555477},{"id":"s018","title":"Redis のデータ型を理解する","url":"https://redis.io/docs/latest/develop/data-types/","folderPath":["開発","バックエンド"],"dateAdded":1751649241355,"dateLastUsed":1783288724699},{"id":"s019","title":"Docker Compose の書き方","url":"https://docs.docker.com/compose/compose-file/","folderPath":["開発","バックエンド"],"dateAdded":1752976254622,"dateLastUsed":1788998741749},{"id":"s020","title":"Kubernetes の Pod とは","url":"https://kubernetes.io/ja/docs/concepts/workloads/pods/","folderPath":["開発","バックエンド"],"dateAdded":1737317806199,"dateLastUsed":1788997989410},{"id":"s021","title":"gRPC の基礎","url":"https://grpc.io/docs/what-is-grpc/introduction/","folderPath":["開発","バックエンド"],"dateAdded":1679817732956},{"id":"s022","title":"REST API 設計のベストプラクティス","url":"https://qiita.com/NagaokaKenichi/items/0647c30ef596cedf4bf2","folderPath":["開発","バックエンド"],"dateAdded":1737122446720,"dateLastUsed":1771457922252},{"id":"s023","title":"FastAPI - 高速な Python Web フレームワーク","url":"https://fastapi.tiangolo.com/ja/","folderPath":["開発","バックエンド"],"dateAdded":1650201895429,"dateLastUsed":1721616619167},{"id":"s024","title":"SQL アンチパターン まとめ","url":"https://zenn.dev/praha/articles/sql-antipatterns","folderPath":["開発","バックエンド"],"dateAdded":1703244238247,"dateLastUsed":1775357706633},{"id":"s025","title":"分散システムの誤謬 8 つ","url":"https://architecturenotes.co/p/fallacies-of-distributed-systems","folderPath":["開発","バックエンド"],"dateAdded":1756636162985,"dateLastUsed":1771701436598},{"id":"s026","title":"nginx のリバースプロキシ設定","url":"https://nginx.org/en/docs/http/ngx_http_proxy_module.html","folderPath":["開発","バックエンド"],"dateAdded":1755306270069,"dateLastUsed":1768093929761},{"id":"s027","title":"OAuth 2.0 と OpenID Connect の違い","url":"https://www.authlete.com/ja/developers/oauth_and_oidc/","folderPath":["開発","バックエンド"],"dateAdded":1762785706617,"dateLastUsed":1789609161542},{"id":"s028","title":"Pro Git 日本語版","url":"https://git-scm.com/book/ja/v2","folderPath":["開発","ツール"],"dateAdded":1760324230074,"dateLastUsed":1771813313257},{"id":"s029","title":"GitHub Actions のワークフロー構文","url":"https://docs.github.com/ja/actions/using-workflows/workflow-syntax-for-github-actions","folderPath":["開発","ツール"],"dateAdded":1657161314236,"dateLastUsed":1705629305102},{"id":"s030","title":"Vim チートシート","url":"https://vim.rtorr.com/lang/ja","folderPath":["開発","ツール"],"dateAdded":1693311964390,"dateLastUsed":1751497283092},{"id":"s031","title":"VS Code キーボードショートカット","url":"https://code.visualstudio.com/docs/getstarted/keybindings","folderPath":["開発","ツール"],"dateAdded":1682302105050},{"id":"s032","title":"tmux の使い方","url":"https://qiita.com/nmrmsys/items/03f97f5eabec18a3a18b","folderPath":["開発","ツール"],"dateAdded":1741957738806},{"id":"s033","title":"正規表現テスター regex101","url":"https://regex101.com/","folderPath":["開発","ツール"],"dateAdded":1728701506866,"dateLastUsed":1771443278563},{"id":"s034","title":"jq マニュアル","url":"https://jqlang.github.io/jq/manual/","folderPath":["開発","ツール"],"dateAdded":1756695994970,"dateLastUsed":1784596228368},{"id":"s035","title":"ripgrep の使い方","url":"https://github.com/BurntSushi/ripgrep","folderPath":["開発","ツール"],"dateAdded":1715130082264,"dateLastUsed":1789944941893},{"id":"s036","title":"Homebrew — macOS 用パッケージマネージャー","url":"https://brew.sh/ja/","folderPath":["開発","ツール"],"dateAdded":1767818122562,"dateLastUsed":1788551126938},{"id":"s037","title":"Chrome DevTools の便利機能","url":"https://developer.chrome.com/docs/devtools/?hl=ja","folderPath":["開発","ツール"],"dateAdded":1726401795768,"dateLastUsed":1771799513924},{"id":"s038","title":"Chrome 拡張機能 Manifest V3 移行ガイド","url":"https://developer.chrome.com/docs/extensions/develop/migrate?hl=ja","folderPath":["開発","ツール"],"dateAdded":1730767066379,"dateLastUsed":1746223914558},{"id":"s039","title":"chrome.bookmarks API リファレンス","url":"https://developer.chrome.com/docs/extensions/reference/api/bookmarks?hl=ja","folderPath":["開発","ツール"],"dateAdded":1660298595527,"dateLastUsed":1708987253201},{"id":"s040","title":"Attention Is All You Need","url":"https://arxiv.org/abs/1706.03762","folderPath":["AI"],"dateAdded":1685154729968,"dateLastUsed":1721159277381},{"id":"s041","title":"The Illustrated Transformer","url":"https://jalammar.github.io/illustrated-transformer/","folderPath":["AI"],"dateAdded":1738265277677,"dateLastUsed":1789524462635},{"id":"s042","title":"Hugging Face – The AI community building the future","url":"https://huggingface.co/","folderPath":["AI"],"dateAdded":1704568931035},{"id":"s043","title":"transformers.js ドキュメント","url":"https://huggingface.co/docs/transformers.js/index","folderPath":["AI"],"dateAdded":1718756850198,"dateLastUsed":1789613969807},{"id":"s044","title":"multilingual-e5-small モデルカード","url":"https://huggingface.co/intfloat/multilingual-e5-small","folderPath":["AI"],"dateAdded":1778955344821,"dateLastUsed":1790197346489},{"id":"s045","title":"埋め込みベクトルとは何か","url":"https://zenn.dev/microsoft/articles/embedding-introduction","folderPath":["AI"],"dateAdded":1785027869345,"dateLastUsed":1790194451336},{"id":"s046","title":"RAG（検索拡張生成）の基本","url":"https://aws.amazon.com/jp/what-is/retrieval-augmented-generation/","folderPath":["AI"],"dateAdded":1728238560465,"dateLastUsed":1782245954440},{"id":"s047","title":"PyTorch チュートリアル","url":"https://pytorch.org/tutorials/beginner/basics/intro.html","folderPath":["AI"],"dateAdded":1703332978670,"dateLastUsed":1770406352581},{"id":"s048","title":"scikit-learn: machine learning in Python","url":"https://scikit-learn.org/stable/","folderPath":["AI"],"dateAdded":1774293497876,"dateLastUsed":1789153286648},{"id":"s049","title":"t-SNE と UMAP の違いを理解する","url":"https://pair-code.github.io/understanding-umap/","folderPath":["AI"],"dateAdded":1710520354660,"dateLastUsed":1783114670349},{"id":"s050","title":"k-means++ の初期化","url":"https://en.wikipedia.org/wiki/K-means%2B%2B","folderPath":["AI"],"dateAdded":1711525359063,"dateLastUsed":1779139253449},{"id":"s051","title":"ONNX Runtime Web で推論を動かす","url":"https://onnxruntime.ai/docs/tutorials/web/","folderPath":["AI"],"dateAdded":1760884125773},{"id":"s052","title":"プロンプトエンジニアリングガイド","url":"https://www.promptingguide.ai/jp","folderPath":["AI"],"dateAdded":1720787646676,"dateLastUsed":1776642736393},{"id":"s053","title":"Whisper による音声文字起こし","url":"https://github.com/openai/whisper","folderPath":["AI"],"dateAdded":1661881125438,"dateLastUsed":1698622681980},{"id":"s054","title":"拡散モデルの数理","url":"https://lilianweng.github.io/posts/2021-07-11-diffusion-models/","folderPath":["AI"],"dateAdded":1683909474755},{"id":"s055","title":"Figma の基本操作","url":"https://help.figma.com/hc/ja/articles/360039823894","folderPath":["デザイン"],"dateAdded":1730188066098},{"id":"s056","title":"Material Design 3","url":"https://m3.material.io/","folderPath":["デザイン"],"dateAdded":1752201304544},{"id":"s057","title":"Refactoring UI のヒント集","url":"https://www.refactoringui.com/","folderPath":["デザイン"],"dateAdded":1718843138824,"dateLastUsed":1768941735436},{"id":"s058","title":"配色を決めるツール Coolors","url":"https://coolors.co/","folderPath":["デザイン"],"dateAdded":1741292272014,"dateLastUsed":1748134347009},{"id":"s059","title":"Google Fonts 日本語","url":"https://fonts.google.com/?subset=japanese","folderPath":["デザイン"],"dateAdded":1713221182925,"dateLastUsed":1736807227347},{"id":"s060","title":"アイコン集 Lucide","url":"https://lucide.dev/icons/","folderPath":["デザイン"],"dateAdded":1708471138363,"dateLastUsed":1782351250098},{"id":"s061","title":"イージング関数チートシート","url":"https://easings.net/ja","folderPath":["デザイン"],"dateAdded":1765623007359,"dateLastUsed":1790032423147},{"id":"s062","title":"three.js examples","url":"https://threejs.org/examples/","folderPath":["デザイン"],"dateAdded":1716882144123},{"id":"s063","title":"Shadertoy","url":"https://www.shadertoy.com/","folderPath":["デザイン"],"dateAdded":1759058619712,"dateLastUsed":1788641145430},{"id":"s064","title":"The Book of Shaders","url":"https://thebookofshaders.com/?lan=jp","folderPath":["デザイン"],"dateAdded":1722684382425},{"id":"s065","title":"配色のアクセシビリティ判定","url":"https://webaim.org/resources/contrastchecker/","folderPath":["デザイン"],"dateAdded":1768087924095,"dateLastUsed":1788559723409},{"id":"s066","title":"基本の肉じゃがレシピ","url":"https://cookpad.com/jp/recipes/16371745","folderPath":["料理"],"dateAdded":1724876602017,"dateLastUsed":1769993459053},{"id":"s067","title":"失敗しないカルボナーラの作り方","url":"https://www.kurashiru.com/recipes/8e1f4a0d","folderPath":["料理"],"dateAdded":1692783528686},{"id":"s068","title":"土鍋でごはんを炊く","url":"https://delishkitchen.tv/recipes/144033745623975303","folderPath":["料理"],"dateAdded":1715165984819,"dateLastUsed":1769631902222},{"id":"s069","title":"だしの取り方 — 昆布とかつお節","url":"https://www.kikkoman.co.jp/homecook/search/recipe/00001234/","folderPath":["料理"],"dateAdded":1773559802876,"dateLastUsed":1789932202793},{"id":"s070","title":"週末に作りおきできるおかず 10 品","url":"https://www.lettuceclub.net/recipe/","folderPath":["料理"],"dateAdded":1747621079320,"dateLastUsed":1769725406712},{"id":"s071","title":"スパイスから作るチキンカレー","url":"https://www.sbfoods.co.jp/recipe/detail/00003456.html","folderPath":["料理"],"dateAdded":1772224539302},{"id":"s072","title":"パン作りの発酵温度","url":"https://cotta.jp/special/article/?p=12345","folderPath":["料理"],"dateAdded":1752989013646,"dateLastUsed":1789762934481},{"id":"s073","title":"ぬか床の育て方","url":"https://www.hakko-blog.com/nukadoko/","folderPath":["料理"],"dateAdded":1676041620842,"dateLastUsed":1725153684290},{"id":"s074","title":"コーヒーのハンドドリップ入門","url":"https://www.kurasu.kyoto/blogs/journal/hand-drip","folderPath":["料理"],"dateAdded":1768472835979},{"id":"s075","title":"包丁の研ぎ方","url":"https://www.kai-group.com/products/special/knife/sharpen/","folderPath":["料理"],"dateAdded":1767212147765,"dateLastUsed":1778378897279},{"id":"s076","title":"青春18きっぷの使い方","url":"https://www.jr-odekake.net/railroad/ticket/seishun18/","folderPath":["旅行"],"dateAdded":1705282426320,"dateLastUsed":1727903860773},{"id":"s077","title":"屋久島 縄文杉トレッキング","url":"https://yakukan.jp/course/jomonsugi/","folderPath":["旅行"],"dateAdded":1776025079211,"dateLastUsed":1789431649931},{"id":"s078","title":"台北 3 泊 4 日のモデルコース","url":"https://www.taiwan-tourism.jp/model-course/taipei/","folderPath":["旅行"],"dateAdded":1734475601088},{"id":"s079","title":"北海道 道東ドライブ","url":"https://www.visit-eastern-hokkaido.jp/","folderPath":["旅行"],"dateAdded":1674075008033,"dateLastUsed":1699921235264},{"id":"s080","title":"格安航空券の探し方 Skyscanner","url":"https://www.skyscanner.jp/","folderPath":["旅行"],"dateAdded":1758413108018,"dateLastUsed":1790039530794},{"id":"s081","title":"Google マップでマイマップを作る","url":"https://www.google.com/maps/about/mymaps/","folderPath":["旅行"],"dateAdded":1710935416317,"dateLastUsed":1770499220106},{"id":"s082","title":"ヨーロッパ鉄道パス Eurail","url":"https://www.eurail.com/ja","folderPath":["旅行"],"dateAdded":1685627616154,"dateLastUsed":1737577691115},{"id":"s083","title":"御朱印めぐりの作法","url":"https://jinjahoncho.or.jp/goshuin/","folderPath":["旅行"],"dateAdded":1713713288384,"dateLastUsed":1775867553904},{"id":"s084","title":"星がきれいに見える場所 星空指数","url":"https://tenki.jp/indexes/starry_sky/","folderPath":["旅行"],"dateAdded":1721603528792,"dateLastUsed":1766866896912},{"id":"s085","title":"パッキングリストのテンプレート","url":"https://www.notion.so/templates/packing-list","folderPath":["旅行"],"dateAdded":1719107541075,"dateLastUsed":1765148882827},{"id":"s086","title":"Spotify Web Player","url":"https://open.spotify.com/","folderPath":["音楽"],"dateAdded":1723705563099,"dateLastUsed":1779068364058},{"id":"s087","title":"ギターコード辞典","url":"https://www.ufret.jp/","folderPath":["音楽"],"dateAdded":1690379718118,"dateLastUsed":1718826611899},{"id":"s088","title":"音楽理論入門 — ダイアトニックコード","url":"https://soundquest.jp/quest/chord/diatonic/","folderPath":["音楽"],"dateAdded":1693275919209},{"id":"s089","title":"DTM 初心者のためのミックス","url":"https://sleepfreaks-dtm.com/mixing/","folderPath":["音楽"],"dateAdded":1715229353699,"dateLastUsed":1782678851189},{"id":"s090","title":"Ableton Live の使い方","url":"https://www.ableton.com/ja/live/","folderPath":["音楽"],"dateAdded":1745732376883,"dateLastUsed":1778979778655},{"id":"s091","title":"フリー音源 DOVA-SYNDROME","url":"https://dova-s.jp/","folderPath":["音楽"],"dateAdded":1715084183097,"dateLastUsed":1781307889914},{"id":"s092","title":"レコードの手入れと保管","url":"https://www.stereosound.co.jp/analog/care/","folderPath":["音楽"],"dateAdded":1738964154721,"dateLastUsed":1789677835214},{"id":"s093","title":"Bandcamp で音楽を買う","url":"https://bandcamp.com/","folderPath":["音楽"],"dateAdded":1765412918620},{"id":"s094","title":"新NISA の制度をまとめて理解する","url":"https://www.fsa.go.jp/policy/nisa2/about/index.html","folderPath":["お金"],"dateAdded":1745186210651,"dateLastUsed":1785207294300},{"id":"s095","title":"確定申告の手引き（国税庁）","url":"https://www.nta.go.jp/taxes/shiraberu/shinkoku/tebiki/index.htm","folderPath":["お金"],"dateAdded":1737127902293},{"id":"s096","title":"ふるさと納税の仕組み","url":"https://www.furusato-tax.jp/about","folderPath":["お金"],"dateAdded":1714457991196,"dateLastUsed":1790021725686},{"id":"s097","title":"インデックス投資の基本","url":"https://www.rakuten-sec.co.jp/web/learn/index_fund/","folderPath":["お金"],"dateAdded":1764561607640,"dateLastUsed":1772135088567},{"id":"s098","title":"家計簿アプリ マネーフォワード ME","url":"https://moneyforward.com/","folderPath":["お金"],"dateAdded":1660737422045,"dateLastUsed":1724896536998},{"id":"s099","title":"個人事業主の開業届の出し方","url":"https://www.freee.co.jp/kb/kb-kaigyou/kaigyou-todoke/","folderPath":["お金"],"dateAdded":1728162232184,"dateLastUsed":1775684637944},{"id":"s100","title":"住宅ローン 金利の比較","url":"https://www.homes.co.jp/loan/","folderPath":["お金"],"dateAdded":1715885685590,"dateLastUsed":1766976276699},{"id":"s101","title":"年金の受け取り方を考える","url":"https://www.nenkin.go.jp/service/jukyu/","folderPath":["お金"],"dateAdded":1740049317922,"dateLastUsed":1768696952039},{"id":"s102","title":"腰痛を防ぐストレッチ","url":"https://www.tyojyu.or.jp/net/kenkou-tyoju/undou/stretch.html","folderPath":["健康"],"dateAdded":1709165127876,"dateLastUsed":1782787530376},{"id":"s103","title":"睡眠の質を上げる 12 の指針","url":"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000047221.html","folderPath":["健康"],"dateAdded":1726398690219,"dateLastUsed":1783461552313},{"id":"s104","title":"ランニング初心者の走り方","url":"https://runnet.jp/beginner/","folderPath":["健康"],"dateAdded":1700710395447,"dateLastUsed":1771370583911},{"id":"s105","title":"筋トレのメニューの組み方","url":"https://www.myprotein.jp/thezone/training/workout-routine/","folderPath":["健康"],"dateAdded":1771593952775,"dateLastUsed":1789094343214},{"id":"s106","title":"デスクワークの姿勢を直す","url":"https://www.j-ohta.or.jp/posture/","folderPath":["健康"],"dateAdded":1697864626841,"dateLastUsed":1707686179477},{"id":"s107","title":"目の疲れをとる方法","url":"https://www.santen.co.jp/ja/healthcare/eye/eyecare/","folderPath":["健康"],"dateAdded":1767093037573,"dateLastUsed":1789611766394},{"id":"s108","title":"献血の予約","url":"https://www.kenketsu.jp/","folderPath":["健康"],"dateAdded":1720168923124},{"id":"s109","title":"HHKB Professional HYBRID","url":"https://happyhackingkb.com/jp/products/hybrid/","folderPath":["ガジェット"],"dateAdded":1732230831052,"dateLastUsed":1782088244556},{"id":"s110","title":"自作キーボードの始め方","url":"https://salicylic-acid3.hatenablog.com/entry/keyboard-guide","folderPath":["ガジェット"],"dateAdded":1704497925399,"dateLastUsed":1711842096914},{"id":"s111","title":"Raspberry Pi 5 のセットアップ","url":"https://www.raspberrypi.com/documentation/computers/getting-started.html","folderPath":["ガジェット"],"dateAdded":1735941208174,"dateLastUsed":1778355535287},{"id":"s112","title":"M4 MacBook Pro レビュー","url":"https://www.itmedia.co.jp/pcuser/articles/2411/12/news100.html","folderPath":["ガジェット"],"dateAdded":1777504196086},{"id":"s113","title":"電子ペーパー端末の比較","url":"https://www.gizmodo.jp/2024/06/eink-tablet-comparison.html","folderPath":["ガジェット"],"dateAdded":1752854633104,"dateLastUsed":1777417513960},{"id":"s114","title":"モニターアームの選び方","url":"https://www.ergotron.com/ja-jp/monitor-arms","folderPath":["ガジェット"],"dateAdded":1722082190887,"dateLastUsed":1782162900958},{"id":"s115","title":"ノイズキャンセリングイヤホン比較","url":"https://kakaku.com/kaden/earphone/","folderPath":["ガジェット"],"dateAdded":1712714740609,"dateLastUsed":1766703873534},{"id":"s116","title":"Hacker News","url":"https://news.ycombinator.com/","folderPath":["ニュース"],"dateAdded":1785819136672,"dateLastUsed":1790300199277},{"id":"s117","title":"はてなブックマーク - テクノロジー","url":"https://b.hatena.ne.jp/hotentry/it","folderPath":["ニュース"],"dateAdded":1694863742386,"dateLastUsed":1772062559132},{"id":"s118","title":"ITmedia NEWS","url":"https://www.itmedia.co.jp/news/","folderPath":["ニュース"],"dateAdded":1680436793255},{"id":"s119","title":"日経電子版","url":"https://www.nikkei.com/","folderPath":["ニュース"],"dateAdded":1772280280985,"dateLastUsed":1789613826471},{"id":"s120","title":"NHK ニュース","url":"https://www3.nhk.or.jp/news/","folderPath":["ニュース"],"dateAdded":1687989627329,"dateLastUsed":1736976377322},{"id":"s121","title":"TechCrunch","url":"https://techcrunch.com/","folderPath":["ニュース"],"dateAdded":1765842406556,"dateLastUsed":1773087475404},{"id":"s122","title":"宇宙開発ニュース sorae","url":"https://sorae.info/","folderPath":["ニュース"],"dateAdded":1778379249126,"dateLastUsed":1789871758987},{"id":"s123","title":"JAXA | 宇宙航空研究開発機構","url":"https://www.jaxa.jp/","folderPath":["ニュース"],"dateAdded":1723357814732,"dateLastUsed":1781047051637},{"id":"s124","title":"NASA Astronomy Picture of the Day","url":"https://apod.nasa.gov/apod/astropix.html","folderPath":["ニュース"],"dateAdded":1721241214054,"dateLastUsed":1769648932804},{"id":"s125","title":"ゼロから作る Deep Learning のノート","url":"https://zenn.dev/ganariya/articles/deep-learning-from-scratch","folderPath":["あとで読む"],"dateAdded":1736547746932},{"id":"s126","title":"なぜ我々はスタンドアップをするのか","url":"https://martinfowler.com/articles/on-dailies.html","folderPath":["あとで読む"],"dateAdded":1786917329453},{"id":"s127","title":"京都の紅葉の名所 2025","url":"https://kyoto-design.jp/special/momiji","folderPath":["あとで読む"],"dateAdded":1699643721598},{"id":"s128","title":"ブラックホールの写真はどう撮られたか","url":"https://www.natureasia.com/ja-jp/ndigest/v16/n6/","folderPath":["あとで読む"],"dateAdded":1724046709328},{"id":"s129","title":"料理がうまくなる人の共通点","url":"https://note.com/cooking_note/n/n123456789","folderPath":["あとで読む"],"dateAdded":1679520573343},{"id":"s130","title":"個人開発で月 10 万円を目指す","url":"https://zenn.dev/hokuto/articles/indie-dev-revenue","folderPath":["あとで読む"],"dateAdded":1696548214998,"dateLastUsed":1722379536340},{"id":"s131","title":"フェルマー螺旋とひまわりの種","url":"https://ja.wikipedia.org/wiki/%E3%83%95%E3%82%A7%E3%83%AB%E3%83%9E%E3%83%BC%E8%9E%BA%E6%97%8B","folderPath":["あとで読む"],"dateAdded":1678735115749,"dateLastUsed":1699494030031},{"id":"s132","title":"星座の起源と歴史","url":"https://www.nao.ac.jp/astro/basic/constellation.html","folderPath":["あとで読む"],"dateAdded":1743153637265},{"id":"s133","title":"積ん読の心理学","url":"https://gigazine.net/news/20240301-tsundoku/","folderPath":["あとで読む"],"dateAdded":1701911780211,"dateLastUsed":1748219706921},{"id":"s134","title":"英語の多読を続けるコツ","url":"https://note.com/english_reading/n/n987654321","folderPath":["あとで読む"],"dateAdded":1729858609594},{"id":"s135","title":"投資を始める前に読む本 5 冊","url":"https://diamond.jp/articles/-/334455","folderPath":["あとで読む"],"dateAdded":1720091327719},{"id":"s136","title":"ポモドーロ・テクニックの実践","url":"https://francescocirillo.com/products/the-pomodoro-technique","folderPath":["あとで読む"],"dateAdded":1713375467382},{"id":"s137","title":"Google","url":"https://www.google.com/","folderPath":[],"dateAdded":1648541852885,"dateLastUsed":1790206114688},{"id":"s138","title":"GitHub","url":"https://github.com/","folderPath":[],"dateAdded":1597877501338,"dateLastUsed":1790296278422},{"id":"s139","title":"Gmail","url":"https://mail.google.com/","folderPath":[],"dateAdded":1660602816530,"dateLastUsed":1790114715237},{"id":"s140","title":"YouTube","url":"https://www.youtube.com/","folderPath":[],"dateAdded":1608767049047,"dateLastUsed":1790212993279},{"id":"s141","title":"X","url":"https://x.com/home","folderPath":[],"dateAdded":1645655027504,"dateLastUsed":1790194722992},{"id":"s142","title":"Amazon.co.jp","url":"https://www.amazon.co.jp/","folderPath":[],"dateAdded":1672216418193,"dateLastUsed":1790301951233},{"id":"s143","title":"Notion","url":"https://www.notion.so/","folderPath":[],"dateAdded":1624232771658,"dateLastUsed":1790383748816},{"id":"s144","title":"DeepL 翻訳","url":"https://www.deepl.com/ja/translator","folderPath":[],"dateAdded":1679264864901,"dateLastUsed":1790109986482},{"id":"s145","title":"Wikipedia 日本語版","url":"https://ja.wikipedia.org/","folderPath":[],"dateAdded":1635857927466,"dateLastUsed":1790116793780},{"id":"s146","title":"天気予報 - tenki.jp","url":"https://tenki.jp/","folderPath":[],"dateAdded":1633808792236,"dateLastUsed":1790373103842},{"id":"s147","title":"Google カレンダー","url":"https://calendar.google.com/","folderPath":[],"dateAdded":1650576337559,"dateLastUsed":1790028120846},{"id":"s148","title":"乗換案内 - Yahoo!路線情報","url":"https://transit.yahoo.co.jp/","folderPath":[],"dateAdded":1598276267075,"dateLastUsed":1790127361459},{"id":"s149","title":"すばる望遠鏡 - 国立天文台ハワイ観測所","url":"https://subarutelescope.org/jp/","folderPath":["ニュース"],"dateAdded":1712264913059,"dateLastUsed":1771024161630},{"id":"s150","title":"最小全域木（プリム法）の解説","url":"https://qiita.com/drken/items/mst-prim","folderPath":["あとで読む"],"dateAdded":1697113304547},{"id":"s151","title":"ロケット打ち上げ予定 - Next Spaceflight","url":"https://nextspaceflight.com/launches/","folderPath":["ニュース"],"dateAdded":1785827903716},{"id":"s152","title":"今夜の星空 - 国立天文台 ほしぞら情報","url":"https://www.nao.ac.jp/astro/sky/2026/","folderPath":["あとで読む"],"dateAdded":1788142089010,"dateLastUsed":1789427435742},{"id":"s153","title":"プラネタリウム 日本科学未来館","url":"https://www.miraikan.jst.go.jp/exhibitions/dome/","folderPath":["旅行"],"dateAdded":1787126525684,"dateLastUsed":1790119940428},{"id":"s154","title":"星座の見つけ方 - 北斗七星からたどる","url":"https://www.astroarts.co.jp/alacarte/beginner/","folderPath":[],"dateAdded":1788320322172,"dateLastUsed":1788908756913},{"id":"s155","title":"ハッブル宇宙望遠鏡の天体写真ギャラリー","url":"https://hubblesite.org/images/gallery","folderPath":["デザイン"],"dateAdded":1787892121074,"dateLastUsed":1789601124252},{"id":"s156","title":"国際宇宙ステーションの現在位置","url":"https://spotthestation.nasa.gov/","folderPath":[],"dateAdded":1787470263798}]'),Kd=Date.parse("2026-09-26T12:00:00+09:00");function Tl(){return qd.map(fh).filter(i=>i!==null)}function Xo(i){try{return new URL(i).hostname.replace(/^www\./,"")}catch{return""}}const Xa="bukusupe:prefer-sample";function $d(){try{return localStorage.getItem(Xa)==="1"}catch{return!1}}function Zd(i){try{i?localStorage.setItem(Xa,"1"):localStorage.removeItem(Xa)}catch{}}async function ph(){const i=await Jd();if(i)return i;const t=new URLSearchParams(location.search).get("sample")==="1"||$d();if(jd())try{const e=await Yd();return!t&&e.length>0?{kind:"chrome",items:e,chromeCount:e.length}:{kind:"sample",items:Tl(),chromeCount:e.length}}catch(e){console.warn("[ブクスペ] ブックマークを読めなかったのでサンプルに切り替える",e)}return{kind:"sample",items:Tl(),chromeCount:0}}async function Jd(){return null}let mh=Date.now();function Qd(i){mh=i}function gh(){return mh}function tu(){return typeof chrome<"u"&&chrome.runtime?.getURL?chrome.runtime.getURL("ort/"):new URL("./ort/",location.href).href}const eu="Xenova/multilingual-e5-small";class nu{constructor(t={}){this.options=t,this.worker=new Worker(new URL(""+new URL("assets/embed.worker-DYzwD-e2.js",import.meta.url).href,import.meta.url),{type:"module"});let e,n;this.readyPromise=new Promise((s,r)=>{e=s,n=r}),this.worker.onmessage=s=>{const r=s.data;switch(r.type){case"ready":e();break;case"download":this.onDownload?.(r.file,r.progress);break;case"memory":break;case"vectors":{this.waiting.get(r.requestId)?.resolve(r.vectors),this.waiting.delete(r.requestId);break}case"error":{const a=new Error(r.message);r.requestId!=null?(this.waiting.get(r.requestId)?.reject(a),this.waiting.delete(r.requestId)):n(a);break}}},this.worker.onerror=s=>n(new Error(`Worker が落ちた: ${s.message}`)),this.send({type:"init",ortBaseUrl:tu(),model:this.model})}options;model=eu;onDownload;worker;waiting=new Map;memoryWaiting=new Map;nextId=1;readyPromise;ready(){return this.readyPromise}embed(t){if(t.length===0)return Promise.resolve([]);const e=this.nextId++;return new Promise((n,s)=>{this.waiting.set(e,{resolve:n,reject:s}),this.send({type:"embed",requestId:e,texts:t})})}dispose(){this.worker.terminate();for(const{reject:t}of this.waiting.values())t(new Error("Worker を止めた"));this.waiting.clear()}send(t){this.worker.postMessage(t)}}const vs={"qiita.com":"プログラミング 技術記事","zenn.dev":"プログラミング 技術記事","note.com":"ブログ 記事","hatenablog.com":"ブログ 記事","hatena.ne.jp":"ブログ 記事 ブックマーク","b.hatena.ne.jp":"テクノロジー ニュース ブックマーク","github.com":"ソースコード 開発 リポジトリ","gist.github.com":"ソースコード 断片","gitlab.com":"ソースコード 開発","stackoverflow.com":"プログラミング 質問 回答","developer.mozilla.org":"Web 開発 リファレンス","developer.chrome.com":"Chrome 拡張機能 Web 開発","web.dev":"Web 開発 性能","css-tricks.com":"CSS Web デザイン 開発","caniuse.com":"ブラウザ 対応表 Web 開発","npmjs.com":"JavaScript パッケージ 開発","docs.docker.com":"コンテナ 開発 インフラ","kubernetes.io":"コンテナ インフラ 運用","docs.github.com":"開発 ドキュメント","regex101.com":"正規表現 開発ツール","vim.rtorr.com":"エディタ 開発ツール","code.visualstudio.com":"エディタ 開発ツール","git-scm.com":"バージョン管理 開発","brew.sh":"パッケージ管理 macOS 開発","typescriptlang.org":"TypeScript プログラミング言語","developer.apple.com":"Apple 開発","developer.android.com":"Android 開発","rust-lang.org":"Rust プログラミング言語","doc.rust-jp.rs":"Rust プログラミング言語","gobyexample.com":"Go プログラミング言語","go.dev":"Go プログラミング言語","python.org":"Python プログラミング言語","docs.python.org":"Python プログラミング言語","postgresql.org":"データベース SQL","postgresql.jp":"データベース SQL","redis.io":"データベース キャッシュ","nginx.org":"Web サーバー インフラ","grpc.io":"通信 API 開発","fastapi.tiangolo.com":"Python Web フレームワーク","nextjs.org":"React Web フレームワーク","react.dev":"React フロントエンド","ja.react.dev":"React フロントエンド","vuejs.org":"Vue フロントエンド","ja.vuejs.org":"Vue フロントエンド","svelte.dev":"Svelte フロントエンド","vite.dev":"ビルドツール フロントエンド","tailwindcss.com":"CSS フロントエンド","threejs.org":"3D 描画 WebGL","shadertoy.com":"シェーダー 3D 描画","thebookofshaders.com":"シェーダー 3D 描画","onnxruntime.ai":"機械学習 推論","overreacted.io":"React フロントエンド ブログ","martinfowler.com":"ソフトウェア設計 開発","authlete.com":"認証 セキュリティ","huggingface.co":"機械学習 AI モデル","arxiv.org":"論文 研究","paperswithcode.com":"論文 機械学習","openai.com":"AI 人工知能","anthropic.com":"AI 人工知能","claude.ai":"AI 人工知能 対話","pytorch.org":"機械学習 深層学習","tensorflow.org":"機械学習 深層学習","scikit-learn.org":"機械学習 統計","kaggle.com":"データ分析 機械学習","colab.research.google.com":"データ分析 機械学習 ノートブック","lilianweng.github.io":"機械学習 研究 ブログ","jalammar.github.io":"機械学習 解説 ブログ","promptingguide.ai":"AI プロンプト 生成","figma.com":"デザイン UI","dribbble.com":"デザイン 作品","behance.net":"デザイン 作品","m3.material.io":"デザイン UI 指針","fonts.google.com":"フォント デザイン","coolors.co":"配色 デザイン","lucide.dev":"アイコン デザイン","easings.net":"アニメーション デザイン","unsplash.com":"写真 素材","webaim.org":"アクセシビリティ デザイン","news.ycombinator.com":"テクノロジー ニュース 英語","techcrunch.com":"スタートアップ テクノロジー ニュース","itmedia.co.jp":"テクノロジー ニュース","gigazine.net":"テクノロジー ニュース","gizmodo.jp":"ガジェット テクノロジー ニュース","nikkei.com":"経済 ニュース","nhk.or.jp":"ニュース 報道","asahi.com":"ニュース 報道","yomiuri.co.jp":"ニュース 報道","reddit.com":"掲示板 話題","x.com":"SNS 短文投稿","twitter.com":"SNS 短文投稿","facebook.com":"SNS 交流","instagram.com":"SNS 写真","youtube.com":"動画 視聴","nicovideo.jp":"動画 視聴","wikipedia.org":"百科事典 調べもの","ja.wikipedia.org":"百科事典 調べもの","jaxa.jp":"宇宙 科学 研究","nasa.gov":"宇宙 科学 研究","apod.nasa.gov":"宇宙 天体 写真","stellarium.org":"宇宙 星空 天文","spaceweather.com":"宇宙 天体 観測","sorae.info":"宇宙 科学 ニュース","nao.ac.jp":"天文 宇宙 研究","subarutelescope.org":"天文 宇宙 望遠鏡","natureasia.com":"科学 論文 研究","nextspaceflight.com":"宇宙 ロケット 打ち上げ","hubblesite.org":"宇宙 天体 写真 望遠鏡","spotthestation.nasa.gov":"宇宙 宇宙ステーション 観測","astroarts.co.jp":"天文 星空 星座","miraikan.jst.go.jp":"科学館 展示 宇宙","cookpad.com":"料理 レシピ","kurashiru.com":"料理 レシピ 動画","delishkitchen.tv":"料理 レシピ 動画","kikkoman.co.jp":"料理 レシピ 調味料","sbfoods.co.jp":"料理 レシピ 香辛料","lettuceclub.net":"料理 レシピ 暮らし","cotta.jp":"製菓 製パン 料理","kai-group.com":"調理器具 暮らし","jalan.net":"旅行 宿泊","rurubu.travel":"旅行 観光","skyscanner.jp":"旅行 航空券","booking.com":"旅行 宿泊","airbnb.jp":"旅行 宿泊","tabelog.com":"飲食店 グルメ","google.com/maps":"地図 場所","transit.yahoo.co.jp":"乗換 交通","jr-odekake.net":"鉄道 旅行 切符","eurail.com":"鉄道 旅行 ヨーロッパ","tenki.jp":"天気 予報","open.spotify.com":"音楽 配信","spotify.com":"音楽 配信","bandcamp.com":"音楽 購入","soundcloud.com":"音楽 配信","ufret.jp":"音楽 ギター コード","soundquest.jp":"音楽理論 学習","sleepfreaks-dtm.com":"音楽制作 DTM","ableton.com":"音楽制作 DTM","dova-s.jp":"音楽 素材","nta.go.jp":"税金 確定申告 行政","fsa.go.jp":"金融 制度 行政","mhlw.go.jp":"健康 労働 行政","nenkin.go.jp":"年金 行政","furusato-tax.jp":"ふるさと納税 税金","moneyforward.com":"家計簿 お金","freee.co.jp":"会計 確定申告 お金","rakuten-sec.co.jp":"投資 証券 お金","diamond.jp":"経済 ビジネス 記事","runnet.jp":"ランニング 運動","myprotein.jp":"筋力トレーニング 運動","tyojyu.or.jp":"健康 医療","kenketsu.jp":"献血 医療","santen.co.jp":"目 健康 医療","amazon.co.jp":"買い物 通販","rakuten.co.jp":"買い物 通販","kakaku.com":"価格比較 買い物 家電","mercari.com":"買い物 中古 個人売買","raspberrypi.com":"電子工作 小型計算機","happyhackingkb.com":"キーボード 入力機器","ergotron.com":"モニターアーム 作業環境","notion.so":"メモ 文書 仕事","docs.google.com":"文書 表計算 仕事","drive.google.com":"ファイル 保管 仕事","calendar.google.com":"予定 カレンダー 仕事","mail.google.com":"メール 連絡","slack.com":"連絡 チャット 仕事","deepl.com":"翻訳 言語","figma.io":"デザイン UI"};function _h(i){if(vs[i])return vs[i];const t=i.split(".");for(let e=1;e<t.length-1;e++){const n=t.slice(e).join(".");if(vs[n])return vs[n]}return""}function Lr(i){let t;try{t=new URL(i)}catch{return""}let e=t.pathname;try{e=decodeURIComponent(e)}catch{}const n=e.split(/[^\p{L}\p{N}]+/u).filter(s=>s.length>0).filter(s=>!/^\d+$/.test(s)).filter(s=>s.length<=24).filter(s=>!/^[0-9a-f]{12,}$/i.test(s));return[...new Set(n)].slice(0,12).join(" ")}function iu(i){const t=Xo(i.url),e=_h(t),n=[t,e,Lr(i.url)].filter(Boolean).join(" "),s=i.folderPath.join(" / ");return`passage: ${i.title} | ${s} | ${n}`}function xh(i){return`query: ${i}`}function su(i){let t=2166136261;for(let e=0;e<i.length;e++)t^=i.charCodeAt(e),t=Math.imul(t,16777619)>>>0;return t.toString(16)}function vh(i,t){let e=2166136261;for(let r=0;r<i.length;r++)e^=i.charCodeAt(r),e=Math.imul(e,16777619)>>>0;const n=e%3600/3600*Math.PI*2,s=(e>>>12)%1e3/1e3*t*.25;return{dx:Math.cos(n)*s,dy:Math.sin(n)*s}}function ru(i){let t=i>>>0||1;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}const Rl=20260926;function Ns(i){const t=i[0]?.length??0,e=new Float32Array(t);if(i.length===0)return e;for(const n of i)for(let s=0;s<t;s++)e[s]+=n[s];for(let n=0;n<t;n++)e[n]/=i.length;return e}function Dr(i,t){const e=new Float32Array(i.length);let n=0;for(let r=0;r<i.length;r++){const a=i[r]-t[r];e[r]=a,n+=a*a}const s=Math.sqrt(n);if(s<1e-8)return i.slice();for(let r=0;r<e.length;r++)e[r]/=s;return e}function Rn(i,t){let e=0;for(let n=0;n<i.length;n++)e+=i[n]*t[n];return e}function Ir(i){const t=Ns(i);let e=0;for(const s of t)e+=s*s;const n=Math.sqrt(e);if(n>1e-8)for(let s=0;s<t.length;s++)t[s]/=n;return t}function yh(i){if(i.length===0)return[];const t=Ns(i);return i.map(e=>Rn(e,t))}function Mh(i){if(i.length===0)return[];const t=i.reduce((s,r)=>s+r,0)/i.length,e=i.reduce((s,r)=>s+(r-t)**2,0)/i.length,n=Math.sqrt(e);return n<1e-9?i.map(()=>0):i.map(s=>(s-t)/n)}function au(i){return i<12?1:Math.min(20,Math.max(3,Math.round(Math.sqrt(i/2))))}const Jr=(i,t)=>1-Rn(i,t);function Sh(i,t,e,n=50){const s=i.length;if(s===0)return{assignments:[],centroids:[]};if(t<=1||s<=t)return t<=1?{assignments:new Array(s).fill(0),centroids:[Ir(i)]}:{assignments:i.map((l,h)=>h),centroids:i.map(l=>l.slice())};const r=ru(e),a=[i[Math.min(s-1,Math.floor(r()*s))].slice()],o=new Float64Array(s).fill(1/0);for(;a.length<t;){const l=a[a.length-1];let h=0;for(let f=0;f<s;f++){const m=Jr(i[f],l);m<o[f]&&(o[f]=m),h+=o[f]*o[f]}let d=r()*h,u=s-1;for(let f=0;f<s;f++)if(d-=o[f]*o[f],d<=0){u=f;break}a.push(i[u].slice())}const c=new Array(s).fill(-1);for(let l=0;l<n;l++){let h=!1;for(let d=0;d<s;d++){let u=0,f=1/0;for(let m=0;m<a.length;m++){const _=Jr(i[d],a[m]);_<f-1e-12&&(f=_,u=m)}c[d]!==u&&(c[d]=u,h=!0)}for(let d=0;d<a.length;d++){if(c.includes(d))continue;let u=0,f=-1;for(let m=0;m<s;m++){const _=Jr(i[m],a[c[m]]);_>f+1e-12&&(f=_,u=m)}c[u]=d,h=!0}for(let d=0;d<a.length;d++){const u=i.filter((f,m)=>c[m]===d);u.length>0&&(a[d]=Ir(u))}if(!h)break}return{assignments:c,centroids:a}}const Eh={開発:"3D API Android Apple CSS Chrome Go JavaScript Python React Rust SQL Svelte TypeScript Vue Web WebGL macOS インフラ エディタ キャッシュ コンテナ サーバー シェーダー セキュリティ ソフトウェア設計 ソースコード テクノロジー データベース ドキュメント ノートブック バージョン管理 パッケージ パッケージ管理 ビルドツール フレームワーク フロントエンド ブラウザ プログラミング プログラミング言語 リファレンス リポジトリ 推論 拡張機能 描画 正規表現 認証 通信 運用 開発 開発ツール 電子工作 小型計算機 性能 対応表 断片",AI:"AI 人工知能 機械学習 深層学習 プロンプト モデル 生成 データ分析 統計",デザイン:"UI アイコン アクセシビリティ アニメーション デザイン フォント 作品 配色 指針",ニュース:"SNS ガジェット スタートアップ ニュース ビジネス ブックマーク ブログ 交流 写真 動画 報道 掲示板 短文投稿 視聴 記事 話題 百科事典 質問 回答 調べもの 解説 技術記事",宇宙:"ロケット 天体 天文 宇宙 宇宙ステーション 打ち上げ 星空 星座 望遠鏡 観測",科学:"研究 科学 科学館 論文 展示 学習",料理:"グルメ レシピ 料理 製パン 製菓 調味料 調理器具 飲食店 香辛料",旅行:"ヨーロッパ 乗換 交通 地図 場所 宿泊 旅行 切符 航空券 観光 鉄道",音楽:"DTM ギター コード 配信 音楽 音楽制作 音楽理論 購入 素材",お金:"お金 ふるさと納税 会計 価格比較 制度 家計簿 年金 投資 確定申告 税金 経済 行政 証券 金融",健康:"ランニング 健康 労働 医療 献血 目 筋力トレーニング 運動",暮らし:"カレンダー メモ モニターアーム 予報 予定 仕事 作業環境 保管 天気 家電 暮らし 翻訳 英語 言語 連絡",買い物:"中古 個人売買 買い物 通販 キーボード 入力機器",文書:"ファイル 文書 表計算",対話:"チャット メール 対話"},Ur=new Map;for(const[i,t]of Object.entries(Eh))for(const e of t.split(" ")){if(Ur.has(e))throw new Error(`分野語の大分類が重複: ${e}`);Ur.set(e,i)}const bh=[...new Set(Object.keys(Eh))].sort((i,t)=>t.length-i.length||i.localeCompare(t));function ou(i){return Ur.get(i)}for(const i of new Set(Object.values(vs).flatMap(t=>t.split(/\s+/).filter(Boolean))))if(!Ur.has(i))throw new Error(`分野語に大分類がない: ${i}`);const lu=4,cu=2,hu=new Set(["あとで読む","あとでよむ","後で読む","後でよむ","その他","未分類","未整理","雑","ブックマーク バー","ブックマークバー","お気に入り","その他のブックマーク","モバイルのブックマーク","同期したタブ","新しいフォルダ","Bookmarks bar","Bookmarks Bar","Other bookmarks","Other Bookmarks","Mobile bookmarks","Reading list","Read later","Unsorted","Misc","New folder"]);function jo(i){const t=new Map;for(const e of i)e&&t.set(e,(t.get(e)??0)+1);return[...t].map(([e,n])=>({key:e,n})).sort((e,n)=>n.n-e.n||(e.key<n.key?-1:1))}const du=i=>jo(i.map(t=>t.folderPath.at(-1)??"").filter(t=>!hu.has(t)&&bh.includes(t)));function wh(i){const t=_h(Xo(i.url)).split(/\s+/).map(ou).filter(n=>!!n),e=bh.filter(n=>i.title.includes(n));return[...new Set([...t,...e])]}const Cl=i=>jo(i.flatMap(wh));function Ah(i){const t=i.map((n,s)=>{if(n.length===0)return`無名の星団 ${s+1}`;const r=n.slice(0,lu),a=jo(r.flatMap(wh)).filter(d=>d.n>=cu);if(a[0])return a[0].key;const o=du(n),[c,l]=o;if(c){const d=c.n/n.length;if(d>=.5)return c.key;if(l&&l.n>=c.n*.6)return`${c.key}・${l.key}`;if(d>=.3)return c.key}const h=Cl(n)[0];return h?h.key:`無名の星団 ${s+1}`}),e=new Map;t.forEach((n,s)=>{const r=e.get(n);r?r.push(s):e.set(n,[s])});for(const[,n]of e)if(!(n.length<2))for(const s of n){const r=Cl(i[s]).filter(a=>!t[s].includes(a.key));t[s]=r[1]?`${t[s]}・${r[1].key}`:r[0]?`${t[s]}・${r[0].key}`:`${t[s]} ${s+1}`}return t}const Pl=5,Ll=i=>{if(i.length===0)return 0;const t=[...i].sort((n,s)=>n-s),e=t.length>>1;return t.length%2?t[e]:(t[e-1]+t[e])/2},Vs=(i,t)=>{const e=Array.from({length:t},()=>[]);return i.forEach((n,s)=>e[n]?.push(s)),e},uu=(i,t,e)=>i.length===0?1:i.reduce((n,s)=>n+Rn(t[s],e),0)/i.length;function fu(i,t,e){const n=i.length>=12?3:1;let s=[...t.assignments],r=t.centroids.map(l=>new Float32Array(l));{const l=Vs(s,r.length),h=l.map(m=>m.length),d=l.map((m,_)=>uu(m,i,r[_])),u=Ll(h.filter(m=>m>0))*2,f=Ll(d.filter((m,_)=>h[_]>0));l.forEach((m,_)=>{if(m.length<Pl*2||m.length<=u||d[_]>=f)return;const g=Sh(m.map(b=>i[b]),2,e+_*7919),p=r.length;let M=0;m.forEach((b,S)=>{g.assignments[S]===1&&(s[b]=p,M++)}),!(M===0||M===m.length)&&(r.push(g.centroids[1]),r[_]=g.centroids[0])})}for(let l=0;l<50;l++){const d=Vs(s,r.length).map((_,g)=>({c:g,n:_.length})).filter(_=>_.n>0);if(d.length<=Math.max(1,n))break;const u=d.filter(_=>_.n<Pl).sort((_,g)=>_.n-g.n||_.c-g.c)[0];if(!u)break;let f=-1,m=-1/0;for(const _ of d){if(_.c===u.c)continue;const g=Rn(r[u.c],r[_.c]);g>m+1e-12&&(m=g,f=_.c)}if(f<0)break;s=s.map(_=>_===u.c?f:_),r[f]=Ir(Vs(s,r.length)[f].map(_=>i[_]))}const a=[...new Set(s)].sort((l,h)=>l-h),o=new Map(a.map((l,h)=>[l,h]));return s=s.map(l=>o.get(l)),r=Vs(s,a.length).map(l=>Ir(l.map(h=>i[h]))),{assignments:s,centroids:r}}function pu(i,t,e,n=600){const s=i.map(c=>({x:c.x,y:c.y})),r=s.length;if(r<=1)return s.map(()=>({x:0,y:0}));for(let c=0;c<n;c++){let l=0;for(let h=0;h<r;h++)for(let d=h+1;d<r;d++){const u=s[d].x-s[h].x,f=s[d].y-s[h].y;let m=Math.hypot(u,f);const _=t[h]+t[d]+e;if(m>=_)continue;let g,p;if(m<1e-6){const b=(h*97+d*31)%360*(Math.PI/180);g=Math.cos(b),p=Math.sin(b),m=1e-6}else g=u/m,p=f/m;const M=(_-m)/2;s[h].x-=g*M,s[h].y-=p*M,s[d].x+=g*M,s[d].y+=p*M,l+=M}for(const h of s)h.x*=.998,h.y*=.998;if(l<1e-4&&c>50)break}const a=s.reduce((c,l)=>c+l.x,0)/r,o=s.reduce((c,l)=>c+l.y,0)/r;return s.map(c=>({x:c.x-a,y:c.y-o}))}function mu(i){const t=i.length;if(t===0)return[];if(t===1)return[{x:0,y:0}];const e=i[0].length,n=Ns(i),s=i.map(o=>{const c=new Float64Array(e);for(let l=0;l<e;l++)c[l]=o[l]-n[l];return c}),r=Dl(s,e,null),a=Dl(s,e,r);return s.map(o=>({x:Nr(o,r),y:Nr(o,a)}))}const Nr=(i,t)=>{let e=0;for(let n=0;n<i.length;n++)e+=i[n]*t[n];return e};function Dl(i,t,e){let n=new Float64Array(t);for(let r=0;r<t;r++)n[r]=Math.sin(r+1);Il(n);for(let r=0;r<80;r++){const a=new Float64Array(t);for(const o of i){const c=Nr(o,n);for(let l=0;l<t;l++)a[l]+=c*o[l]}if(e){const o=Nr(a,e);for(let c=0;c<t;c++)a[c]-=o*e[c]}if(!Il(a))break;n=a}let s=0;for(let r=1;r<t;r++)Math.abs(n[r])>Math.abs(n[s])&&(s=r);if(n[s]<0)for(let r=0;r<t;r++)n[r]=-n[r];return n}function Il(i){let t=0;for(const n of i)t+=n*n;const e=Math.sqrt(t);if(e<1e-12)return!1;for(let n=0;n<i.length;n++)i[n]/=e;return!0}const Th=Math.PI*(3-Math.sqrt(5));function Yo(i,t){const e=t*Math.sqrt(i+.5),n=i*Th;return{x:Math.cos(n)*e,y:Math.sin(n)*e}}function Rh(i,t){return i<=0?0:t*Math.sqrt(i-.5)}function xn(i,t){return t()}const Fr=3,$e=2,gu=$e*3.2,_u=.3,xu=4,vu=1.5;function Ch(i,t,e){const n=i.filter(A=>t.has(A.id)),s=n.length;if(s===0)return{version:Fr,spacing:$e,stars:[],clusters:[]};const r=xn("center",()=>n.map(A=>Dr(t.get(A.id),e))),a=xn("generality",()=>Mh(yh(n.map(A=>t.get(A.id))))),o=au(s),c=xn("kmeans",()=>Sh(r,o,Rl)),{assignments:l,centroids:h}=xn("refine",()=>fu(r,c,Rl)),d=h.map(()=>[]);l.forEach((A,P)=>d[A].push(P));const u=d.map(A=>$e*Math.sqrt(A.length)*1.1),f=xn("pca",()=>mu(h)),m=Math.max(1e-6,...f.map(A=>Math.hypot(A.x,A.y))),_=1.6*Math.sqrt(u.reduce((A,P)=>A+P*P,0)),g=f.map(A=>({x:A.x/m*_,y:A.y/m*_})),p=xn("pack",()=>pu(g,u,gu)),M=[],b=[],S=xn("order",()=>d.map((A,P)=>T(A,P))),C=xn("names",()=>Ah(S.map(A=>A.map(P=>n[P]))));function T(A,P){const E=D=>{const F=Rn(r[D],h[P]);let k=-1/0;for(let X=0;X<h.length;X++)X!==P&&(k=Math.max(k,Rn(r[D],h[X])));k===-1/0&&(k=0);const H=n[D].title.trim().length<xu||a[D]>vu;return F-k-_u*a[D]-(H?1e3:0)},y=new Map(A.map(D=>[D,E(D)]));return[...A].sort((D,F)=>{const k=y.get(F)-y.get(D);return Math.abs(k)>1e-9?k:n[D].id<n[F].id?-1:1})}return xn("spiral",()=>S.forEach((A,P)=>{A.forEach((E,y)=>{const D=Yo(y,$e),F=vh(n[E].id,$e);M.push({id:n[E].id,x:p[P].x+D.x+F.dx,y:p[P].y+D.y+F.dy,cluster:P,rank:y})}),b.push({index:P,name:C[P],x:p[P].x,y:p[P].y,radius:Math.max(u[P],Rh(A.length,$e)+$e*.5),count:A.length,centroid:h[P],nextIndex:A.length})})),M.sort((A,P)=>A.cluster-P.cluster||A.rank-P.rank),{version:Fr,spacing:$e,stars:M,clusters:b}}function yu(i,t,e,n){if(i.clusters.length===0)return i;const s=Dr(e,n);let r=0,a=-1/0;for(const u of i.clusters){const f=Rn(s,u.centroid);f>a+1e-12&&(a=f,r=u.index)}const o=i.clusters[r],c=o.nextIndex,l=Yo(c,i.spacing),h=vh(t,i.spacing),d={id:t,x:o.x+l.x+h.dx,y:o.y+l.y+h.dy,cluster:r,rank:c};return{...i,stars:[...i.stars,d],clusters:i.clusters.map(u=>u.index===r?{...u,nextIndex:c+1,count:u.count+1,radius:Math.max(u.radius,Math.hypot(l.x,l.y)+i.spacing*.5)}:u)}}function Mu(i,t){const e=i.stars.filter(s=>t.has(s.id));if(e.length===i.stars.length)return i;const n=new Map;for(const s of e)n.set(s.cluster,(n.get(s.cluster)??0)+1);return{...i,stars:e,clusters:i.clusters.map(s=>({...s,count:n.get(s.index)??0}))}}function Ph(i){let t=10;for(const e of i.stars)t=Math.max(t,Math.hypot(e.x,e.y));return t}let Or=null;const Su=2,Gn="embeddings",Ji="meta",Wn="constellations";let Wi=null;function Eu(i,t){const e=`bukusupe-${i}`;if(Wi&&e!==Or)throw new Error("DB を開いた後にデータ源は変えられない");Or=e}function Kn(){if(Wi)return Wi;if(!Or)throw new Error("useDataSource() より先に DB を開こうとした");const i=Or;return Wi=new Promise((t,e)=>{const n=indexedDB.open(i,Su);n.onupgradeneeded=()=>{const s=n.result;s.objectStoreNames.contains(Gn)||s.createObjectStore(Gn,{keyPath:"id"}),s.objectStoreNames.contains(Ji)||s.createObjectStore(Ji,{keyPath:"key"}),s.objectStoreNames.contains(Wn)||s.createObjectStore(Wn,{keyPath:"id"})},n.onblocked=()=>{console.warn("[ブクスペ] 古いタブが DB を開いたままのため、閉じられるのを待っている"),Lh?.()},n.onsuccess=()=>{const s=n.result;s.onversionchange=()=>{s.close(),Wi=null,location.reload()},t(s)},n.onerror=()=>e(n.error)}),Wi}let Lh=null;function bu(i){Lh=i}const Fs=i=>new Promise((t,e)=>{i.oncomplete=()=>t(),i.onerror=()=>e(i.error),i.onabort=()=>e(i.error)});async function wu(){const e=(await Kn()).transaction(Gn,"readonly").objectStore(Gn).getAll(),n=await new Promise((s,r)=>{e.onsuccess=()=>s(e.result),e.onerror=()=>r(e.error)});return new Map(n.map(s=>[s.id,s]))}async function Au(i){if(i.length===0)return;const e=(await Kn()).transaction(Gn,"readwrite"),n=e.objectStore(Gn);for(const s of i)n.put(s);await Fs(e)}async function Ul(i){if(i.length===0)return;const e=(await Kn()).transaction(Gn,"readwrite"),n=e.objectStore(Gn);for(const s of i)n.delete(s);await Fs(e)}async function qo(i){const n=(await Kn()).transaction(Ji,"readonly").objectStore(Ji).get(i);return(await new Promise((r,a)=>{n.onsuccess=()=>r(n.result),n.onerror=()=>a(n.error)}))?.value}async function fi(i,t){const n=(await Kn()).transaction(Ji,"readwrite");n.objectStore(Ji).put({key:i,value:t}),await Fs(n)}async function Tu(){const e=(await Kn()).transaction(Wn,"readonly").objectStore(Wn).getAll();return new Promise((n,s)=>{e.onsuccess=()=>n(e.result),e.onerror=()=>s(e.error)})}async function ss(i){const e=(await Kn()).transaction(Wn,"readwrite");e.objectStore(Wn).put(i),await Fs(e)}async function Ru(i){const e=(await Kn()).transaction(Wn,"readwrite");e.objectStore(Wn).delete(i),await Fs(e)}const Nl=16,Fl="embedding-model";async function Cu(i,t,e){const n=await wu(),s=await qo(Fl);s!==void 0&&s!==t.model&&n.clear();const a=new Map(i.map(f=>[f.id,iu(f)])),o=new Map([...a].map(([f,m])=>[f,su(m)])),c=i.filter(f=>n.get(f.id)?.hash!==o.get(f.id)),l=new Map;for(const f of i){const m=n.get(f.id);m&&m.hash===o.get(f.id)&&l.set(f.id,m.vec)}const h=new Set(i.map(f=>f.id)),d=[...n.keys()].filter(f=>!h.has(f));if(c.length===0)return d.length&&await Ul(d),e({phase:"done",total:l.size}),l;t.onDownload=(f,m)=>e({phase:"model",percent:m,file:f}),await t.ready();let u=0;e({phase:"embed",done:0,total:c.length});for(let f=0;f<c.length;f+=Nl){const m=c.slice(f,f+Nl),_=await t.embed(m.map(p=>a.get(p.id))),g=m.map((p,M)=>({id:p.id,hash:o.get(p.id),vec:_[M]}));await Au(g);for(const p of g)l.set(p.id,p.vec);u+=m.length,e({phase:"embed",done:u,total:c.length})}return d.length&&await Ul(d),await fi(Fl,t.model),e({phase:"done",total:l.size}),l}function Pu(i){const t=new Map;for(const r of i){const a=r.folderPath[0]??Xo(r.url)??"その他",o=t.get(a);o?o.push(r):t.set(a,[r])}const e=[...t.entries()].sort((r,a)=>a[1].length-r[1].length||(r[0]<a[0]?-1:1)),n=[],s=[];return e.forEach(([r,a],o)=>{const c=o*Th,l=o===0?0:13*Math.sqrt(o)+8,h=Math.cos(c)*l,d=Math.sin(c)*l;a.forEach((u,f)=>{const m=Yo(f,$e);n.push({id:u.id,x:h+m.x,y:d+m.y,cluster:o,rank:f})}),s.push({index:o,name:r,x:h,y:d,radius:Rh(a.length,$e)+$e*.5,count:a.length,centroid:new Float32Array(0),nextIndex:a.length})}),{version:Fr,spacing:$e,stars:n,clusters:s}}const kr=2,Lu=200,Du=500,Iu=1e4,Ms=(i,t=Iu)=>Array.isArray(i)&&i.length<=t&&i.every(e=>typeof e=="string"&&e.length>0&&e.length<=256),Dh=i=>typeof i=="number"&&Number.isFinite(i);function Ih(i){if(typeof i.id!="string"||i.id.length===0||i.id.length>256||typeof i.name!="string"||i.name.length===0||i.name.length>Lu||!Dh(i.createdAt)||i.query!==void 0&&(typeof i.query!="string"||i.query.length>Du)||i.folderId!==void 0&&typeof i.folderId!="string")return null;const t=i.queryVector;return t!==void 0&&(!Array.isArray(t)||t.length>4096||!t.every(e=>typeof e=="number"&&Number.isFinite(e)))?null:{id:i.id,name:i.name,createdAt:i.createdAt,...i.query!==void 0?{query:i.query}:{},...t!==void 0?{queryVector:t}:{},...i.folderId!==void 0?{folderId:i.folderId}:{}}}const Uh=i=>i&&typeof i=="object"&&!Array.isArray(i)?i:null;function Uu(i){const t=Uh(i);if(!t||t.format!==kr)return null;const e=Ih(t);return!e||t.source!=="search"&&t.source!=="selection"&&t.source!=="folder"||!Ms(t.members)||!Ms(t.dismissed)||!Dh(t.savedAt)?null:{format:kr,...e,source:t.source,members:[...new Set(t.members)],dismissed:[...new Set(t.dismissed)],savedAt:t.savedAt}}function Nu(i){const t=Uh(i);if(!t||t.format!==void 0)return null;const e=Ih(t);return!e||t.source!=="search"&&t.source!=="folder"||!Ms(t.pinned)||!Ms(t.excluded)||!Ms(t.lastMembers)?null:{...e,source:t.source,pinned:t.pinned,excluded:t.excluded,lastMembers:t.lastMembers}}function Nh(i,t,e){return{format:kr,id:i.id,name:i.name,source:i.source,members:[...new Set(t)],dismissed:[...new Set(i.excluded)],savedAt:e,createdAt:i.createdAt,...i.query!==void 0?{query:i.query}:{},...i.queryVector!==void 0?{queryVector:i.queryVector}:{},...i.folderId!==void 0?{folderId:i.folderId}:{}}}function Fu(i,t,e){return Fh(t,i.pinned,i.excluded).filter(n=>e.has(n))}function Ou(i,t,e){const n=new Set(i.members),s=new Set(i.dismissed);return t.slice(0,12).filter(r=>{const a=e(r);return a!==void 0&&a>i.savedAt&&!n.has(r)&&!s.has(r)})}function ku(i){const t=[...i].sort((s,r)=>s.id.localeCompare(r.id));if(t.length<2)return[];const e=new Set([t[0].id]),n=[];for(;e.size<t.length;){let s=null;for(const r of t)if(e.has(r.id))for(const a of t){if(e.has(a.id))continue;const o=(r.x-a.x)**2+(r.y-a.y)**2;(!s||o<s.distance||o===s.distance&&(r.id<s.a||r.id===s.a&&a.id<s.b))&&(s={a:r.id,b:a.id,distance:o})}if(!s)break;n.push({a:s.a,b:s.b}),e.add(s.b)}return n}function Xn(i,t){const e=new Set(t);return i?.stars.filter(n=>e.has(n.id)).map(({id:n,x:s,y:r})=>({id:n,x:s,y:r})).sort((n,s)=>n.id.localeCompare(s.id))??[]}function Fh(i,t,e){const n=new Set(e);return[...new Set([...t,...i.slice(0,12).filter(s=>!n.has(s))])]}const Oh=.03,kh=.5,Bh=.85;function Bu(i,t){const e=t.trim().toLocaleLowerCase();if(!e)return 0;const n=i.title.toLocaleLowerCase();return n===e?1:n.startsWith(e)?.9:n.includes(e)?.7:i.url.toLocaleLowerCase().includes(e)||i.folderPath.join("/").toLocaleLowerCase().includes(e)?.5:0}function zu(i){return i.title.trim().length<=3&&i.folderPath.length===0&&(!Lr(i.url)||Lr(i.url)==="home")}function Hu(i){const t=Lr(i.url);return i.folderPath.length===0&&(!t||t==="home")}function Vu(i,t,e,n,s,r=Oh,a,o=kh){const c=Dr(i,n),l=new Map(a?.stars.map(m=>[m.id,m.cluster])??[]),h=new Map(a?.clusters.map(m=>[m.index,Rn(c,m.centroid)])??[]),d=t.flatMap(m=>{const _=e.get(m.id);if(!_)return[];const g=Dr(_,n),p=r*Math.max(0,s.get(m.id)??0),M=zu(m)?.2:0,b=Hu(m)?.16:0,S=o*Math.max(0,h.get(l.get(m.id)??-1)??0);return[{id:m.id,value:Rn(c,g)-p-M-b+S}]});if(!d.length)return new Map;const u=d.reduce((m,_)=>m+_.value,0)/d.length,f=Math.sqrt(d.reduce((m,_)=>m+(_.value-u)**2,0)/d.length)||1;return new Map(d.map(({id:m,value:_})=>[m,.89/(1+Math.exp(-(_-u)/f))]))}function ja(i,t,e=new Map){return i.map(n=>{const s=Bu(n,t),r=e.get(n.id)??0;return{id:n.id,title:n.title,score:Math.max(s,r),lexical:s,semantic:r}}).filter(n=>n.score>0).sort((n,s)=>s.score-n.score||s.lexical-n.lexical||n.id.localeCompare(s.id))}function Gu(i,t=gh()){if(!i.dateLastUsed)return .55;const e=(t-i.dateLastUsed)/864e5;return e<=7?1:e>=365?.35:1-.65*((Math.log(e)-Math.log(7))/(Math.log(365)-Math.log(7)))}const Ko="180",wn={ROTATE:0,DOLLY:1,PAN:2},un={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Wu=0,Ol=1,Xu=2,zh=1,ju=2,bn=3,jn=0,Be=1,Le=2,Bn=0,Yi=1,pi=2,kl=3,Bl=4,Yu=5,oi=100,qu=101,Ku=102,$u=103,Zu=104,Ju=200,Qu=201,tf=202,ef=203,Ya=204,qa=205,nf=206,sf=207,rf=208,af=209,of=210,lf=211,cf=212,hf=213,df=214,Ka=0,$a=1,Za=2,Qi=3,Ja=4,Qa=5,to=6,eo=7,Hh=0,uf=1,ff=2,zn=0,pf=1,mf=2,gf=3,_f=4,xf=5,vf=6,yf=7,Vh=300,ts=301,es=302,no=303,io=304,jr=306,so=1e3,di=1001,ro=1002,Xe=1003,Mf=1004,Gs=1005,fn=1006,Qr=1007,ui=1008,Cn=1009,Gh=1010,Wh=1011,ws=1012,$o=1013,mi=1014,pn=1015,Os=1016,Zo=1017,Jo=1018,As=1020,Xh=35902,jh=35899,Yh=1021,qh=1022,an=1023,Ts=1026,Rs=1027,Qo=1028,tl=1029,Kh=1030,el=1031,nl=1033,Er=33776,br=33777,wr=33778,Ar=33779,ao=35840,oo=35841,lo=35842,co=35843,ho=36196,uo=37492,fo=37496,po=37808,mo=37809,go=37810,_o=37811,xo=37812,vo=37813,yo=37814,Mo=37815,So=37816,Eo=37817,bo=37818,wo=37819,Ao=37820,To=37821,Ro=36492,Co=36494,Po=36495,Lo=36283,Do=36284,Io=36285,Uo=36286,Sf=3200,Ef=3201,bf=0,wf=1,On="",Ze="srgb",ns="srgb-linear",Br="linear",Jt="srgb",Ei=7680,zl=519,Af=512,Tf=513,Rf=514,$h=515,Cf=516,Pf=517,Lf=518,Df=519,No=35044,ta=35048,Hl="300 es",mn=2e3,zr=2001;class xi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Vl=1234567;const qi=Math.PI/180,Cs=180/Math.PI;function An(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ce[i&255]+Ce[i>>8&255]+Ce[i>>16&255]+Ce[i>>24&255]+"-"+Ce[t&255]+Ce[t>>8&255]+"-"+Ce[t>>16&15|64]+Ce[t>>24&255]+"-"+Ce[e&63|128]+Ce[e>>8&255]+"-"+Ce[e>>16&255]+Ce[e>>24&255]+Ce[n&255]+Ce[n>>8&255]+Ce[n>>16&255]+Ce[n>>24&255]).toLowerCase()}function zt(i,t,e){return Math.max(t,Math.min(e,i))}function il(i,t){return(i%t+t)%t}function If(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Uf(i,t,e){return i!==t?(e-i)/(t-i):0}function Ss(i,t,e){return(1-e)*i+e*t}function Nf(i,t,e,n){return Ss(i,t,1-Math.exp(-e*n))}function Ff(i,t=1){return t-Math.abs(il(i,t*2)-t)}function Of(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function kf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Bf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function zf(i,t){return i+Math.random()*(t-i)}function Hf(i){return i*(.5-Math.random())}function Vf(i){i!==void 0&&(Vl=i);let t=Vl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Gf(i){return i*qi}function Wf(i){return i*Cs}function Xf(i){return(i&i-1)===0&&i!==0}function jf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Yf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function qf(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),u=a((t-n)/2),f=r((n-t)/2),m=a((n-t)/2);switch(s){case"XYX":i.set(o*h,c*d,c*u,o*l);break;case"YZY":i.set(c*u,o*h,c*d,o*l);break;case"ZXZ":i.set(c*d,c*u,o*h,o*l);break;case"XZX":i.set(o*h,c*m,c*f,o*l);break;case"YXY":i.set(c*f,o*h,c*m,o*l);break;case"ZYZ":i.set(c*m,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function rn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function $t(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const fe={DEG2RAD:qi,RAD2DEG:Cs,generateUUID:An,clamp:zt,euclideanModulo:il,mapLinear:If,inverseLerp:Uf,lerp:Ss,damp:Nf,pingpong:Ff,smoothstep:Of,smootherstep:kf,randInt:Bf,randFloat:zf,randFloatSpread:Hf,seededRandom:Vf,degToRad:Gf,radToDeg:Wf,isPowerOfTwo:Xf,ceilPowerOfTwo:jf,floorPowerOfTwo:Yf,setQuaternionFromProperEuler:qf,normalize:$t,denormalize:rn};class ht{constructor(t=0,e=0){ht.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3];const u=r[a+0],f=r[a+1],m=r[a+2],_=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=u,t[e+1]=f,t[e+2]=m,t[e+3]=_;return}if(d!==_||c!==u||l!==f||h!==m){let g=1-o;const p=c*u+l*f+h*m+d*_,M=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const C=Math.sqrt(b),T=Math.atan2(C,p*M);g=Math.sin(g*T)/C,o=Math.sin(o*T)/C}const S=o*M;if(c=c*g+u*S,l=l*g+f*S,h=h*g+m*S,d=d*g+_*S,g===1-o){const C=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=C,l*=C,h*=C,d*=C}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],m=r[a+3];return t[e]=o*m+h*d+c*f-l*u,t[e+1]=c*m+h*u+l*d-o*f,t[e+2]=l*m+h*f+o*u-c*d,t[e+3]=h*m-o*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(r/2),u=c(n/2),f=c(s/2),m=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*f*m,this._y=l*f*d-u*h*m,this._z=l*h*m+u*f*d,this._w=l*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+l*f*m,this._y=l*f*d-u*h*m,this._z=l*h*m-u*f*d,this._w=l*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-l*f*m,this._y=l*f*d+u*h*m,this._z=l*h*m+u*f*d,this._w=l*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-l*f*m,this._y=l*f*d+u*h*m,this._z=l*h*m-u*f*d,this._w=l*h*d+u*f*m;break;case"YZX":this._x=u*h*d+l*f*m,this._y=l*f*d+u*h*m,this._z=l*h*m-u*f*d,this._w=l*h*d-u*f*m;break;case"XZY":this._x=u*h*d-l*f*m,this._y=l*f*d-u*h*m,this._z=l*h*m+u*f*d,this._w=l*h*d+u*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(zt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),d=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(t=0,e=0,n=0){R.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Gl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Gl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this.z=zt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this.z=zt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ea.copy(this).projectOnVector(t),this.sub(ea)}reflect(t){return this.sub(ea.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ea=new R,Gl=new Yn;class Ft{constructor(t,e,n,s,r,a,o,c,l){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],_=s[0],g=s[3],p=s[6],M=s[1],b=s[4],S=s[7],C=s[2],T=s[5],A=s[8];return r[0]=a*_+o*M+c*C,r[3]=a*g+o*b+c*T,r[6]=a*p+o*S+c*A,r[1]=l*_+h*M+d*C,r[4]=l*g+h*b+d*T,r[7]=l*p+h*S+d*A,r[2]=u*_+f*M+m*C,r[5]=u*g+f*b+m*T,r[8]=u*p+f*S+m*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=h*a-o*l,u=o*c-h*r,f=l*r-a*c,m=e*d+n*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return t[0]=d*_,t[1]=(s*l-h*n)*_,t[2]=(o*n-s*a)*_,t[3]=u*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-o*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(na.makeScale(t,e)),this}rotate(t){return this.premultiply(na.makeRotation(-t)),this}translate(t,e){return this.premultiply(na.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const na=new Ft;function Zh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Hr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Kf(){const i=Hr("canvas");return i.style.display="block",i}const Wl={};function Ps(i){i in Wl||(Wl[i]=!0,console.warn(i))}function $f(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Xl=new Ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jl=new Ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zf(){const i={enabled:!0,workingColorSpace:ns,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Jt&&(s.r=Tn(s.r),s.g=Tn(s.g),s.b=Tn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Jt&&(s.r=Ki(s.r),s.g=Ki(s.g),s.b=Ki(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===On?Br:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ps("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ps("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ns]:{primaries:t,whitePoint:n,transfer:Br,toXYZ:Xl,fromXYZ:jl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ze},outputColorSpaceConfig:{drawingBufferColorSpace:Ze}},[Ze]:{primaries:t,whitePoint:n,transfer:Jt,toXYZ:Xl,fromXYZ:jl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ze}}}),i}const Xt=Zf();function Tn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ki(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let bi;class Jf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{bi===void 0&&(bi=Hr("canvas")),bi.width=t.width,bi.height=t.height;const s=bi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=bi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Hr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Tn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Tn(e[n]/255)*255):e[n]=Tn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Qf=0;class sl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=An(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ia(s[a].image)):r.push(ia(s[a]))}else r=ia(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function ia(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Jf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let tp=0;const sa=new R;class De extends xi{constructor(t=De.DEFAULT_IMAGE,e=De.DEFAULT_MAPPING,n=di,s=di,r=fn,a=ui,o=an,c=Cn,l=De.DEFAULT_ANISOTROPY,h=On){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:tp++}),this.uuid=An(),this.name="",this.source=new sl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ht(0,0),this.repeat=new ht(1,1),this.center=new ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(sa).x}get height(){return this.source.getSize(sa).y}get depth(){return this.source.getSize(sa).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Vh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case so:t.x=t.x-Math.floor(t.x);break;case di:t.x=t.x<0?0:1;break;case ro:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case so:t.y=t.y-Math.floor(t.y);break;case di:t.y=t.y<0?0:1;break;case ro:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}De.DEFAULT_IMAGE=null;De.DEFAULT_MAPPING=Vh;De.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,n=0,s=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,S=(f+1)/2,C=(p+1)/2,T=(h+u)/4,A=(d+_)/4,P=(m+g)/4;return b>S&&b>C?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=T/n,r=A/n):S>C?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=T/s,r=P/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=A/r,s=P/r),this.set(n,s,r,e),this}let M=Math.sqrt((g-m)*(g-m)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(d-_)/M,this.z=(u-h)/M,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this.z=zt(this.z,t.z,e.z),this.w=zt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this.z=zt(this.z,t,e),this.w=zt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ep extends xi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new De(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:fn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new sl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gi extends ep{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Jh extends De{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class np extends De{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vi{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(tn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(tn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=tn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,tn):tn.fromBufferAttribute(r,a),tn.applyMatrix4(t.matrixWorld),this.expandByPoint(tn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ws.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ws.copy(n.boundingBox)),Ws.applyMatrix4(t.matrixWorld),this.union(Ws)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,tn),tn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ls),Xs.subVectors(this.max,ls),wi.subVectors(t.a,ls),Ai.subVectors(t.b,ls),Ti.subVectors(t.c,ls),Ln.subVectors(Ai,wi),Dn.subVectors(Ti,Ai),Qn.subVectors(wi,Ti);let e=[0,-Ln.z,Ln.y,0,-Dn.z,Dn.y,0,-Qn.z,Qn.y,Ln.z,0,-Ln.x,Dn.z,0,-Dn.x,Qn.z,0,-Qn.x,-Ln.y,Ln.x,0,-Dn.y,Dn.x,0,-Qn.y,Qn.x,0];return!ra(e,wi,Ai,Ti,Xs)||(e=[1,0,0,0,1,0,0,0,1],!ra(e,wi,Ai,Ti,Xs))?!1:(js.crossVectors(Ln,Dn),e=[js.x,js.y,js.z],ra(e,wi,Ai,Ti,Xs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,tn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(tn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(vn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const vn=[new R,new R,new R,new R,new R,new R,new R,new R],tn=new R,Ws=new vi,wi=new R,Ai=new R,Ti=new R,Ln=new R,Dn=new R,Qn=new R,ls=new R,Xs=new R,js=new R,ti=new R;function ra(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ti.fromArray(i,r);const o=s.x*Math.abs(ti.x)+s.y*Math.abs(ti.y)+s.z*Math.abs(ti.z),c=t.dot(ti),l=e.dot(ti),h=n.dot(ti);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const ip=new vi,cs=new R,aa=new R;class yi{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ip.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;cs.subVectors(t,this.center);const e=cs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(cs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(aa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(cs.copy(t.center).add(aa)),this.expandByPoint(cs.copy(t.center).sub(aa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const yn=new R,oa=new R,Ys=new R,In=new R,la=new R,qs=new R,ca=new R;class ks{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=yn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yn.copy(this.origin).addScaledVector(this.direction,e),yn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){oa.copy(t).add(e).multiplyScalar(.5),Ys.copy(e).sub(t).normalize(),In.copy(this.origin).sub(oa);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ys),o=In.dot(this.direction),c=-In.dot(Ys),l=In.lengthSq(),h=Math.abs(1-a*a);let d,u,f,m;if(h>0)if(d=a*c-o,u=a*o-c,m=r*h,d>=0)if(u>=-m)if(u<=m){const _=1/h;d*=_,u*=_,f=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u<=-m?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=m?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(oa).addScaledVector(Ys,u),f}intersectSphere(t,e){yn.subVectors(t.center,this.origin);const n=yn.dot(this.direction),s=yn.dot(yn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,yn)!==null}intersectTriangle(t,e,n,s,r){la.subVectors(e,t),qs.subVectors(n,t),ca.crossVectors(la,qs);let a=this.direction.dot(ca),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;In.subVectors(this.origin,t);const c=o*this.direction.dot(qs.crossVectors(In,qs));if(c<0)return null;const l=o*this.direction.dot(la.cross(In));if(l<0||c+l>a)return null;const h=-o*In.dot(ca);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class te{constructor(t,e,n,s,r,a,o,c,l,h,d,u,f,m,_,g){te.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,d,u,f,m,_,g)}set(t,e,n,s,r,a,o,c,l,h,d,u,f,m,_,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new te().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ri.setFromMatrixColumn(t,0).length(),r=1/Ri.setFromMatrixColumn(t,1).length(),a=1/Ri.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,f=a*d,m=o*h,_=o*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+m*l,e[5]=u-_*l,e[9]=-o*c,e[2]=_-u*l,e[6]=m+f*l,e[10]=a*c}else if(t.order==="YXZ"){const u=c*h,f=c*d,m=l*h,_=l*d;e[0]=u+_*o,e[4]=m*o-f,e[8]=a*l,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-m,e[6]=_+u*o,e[10]=a*c}else if(t.order==="ZXY"){const u=c*h,f=c*d,m=l*h,_=l*d;e[0]=u-_*o,e[4]=-a*d,e[8]=m+f*o,e[1]=f+m*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const u=a*h,f=a*d,m=o*h,_=o*d;e[0]=c*h,e[4]=m*l-f,e[8]=u*l+_,e[1]=c*d,e[5]=_*l+u,e[9]=f*l-m,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const u=a*c,f=a*l,m=o*c,_=o*l;e[0]=c*h,e[4]=_-u*d,e[8]=m*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=f*d+m,e[10]=u-_*d}else if(t.order==="XZY"){const u=a*c,f=a*l,m=o*c,_=o*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+_,e[5]=a*h,e[9]=f*d-m,e[2]=m*d-f,e[6]=o*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(sp,t,rp)}lookAt(t,e,n){const s=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),Un.crossVectors(n,Ve),Un.lengthSq()===0&&(Math.abs(n.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),Un.crossVectors(n,Ve)),Un.normalize(),Ks.crossVectors(Ve,Un),s[0]=Un.x,s[4]=Ks.x,s[8]=Ve.x,s[1]=Un.y,s[5]=Ks.y,s[9]=Ve.y,s[2]=Un.z,s[6]=Ks.z,s[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],M=n[3],b=n[7],S=n[11],C=n[15],T=s[0],A=s[4],P=s[8],E=s[12],y=s[1],D=s[5],F=s[9],k=s[13],H=s[2],X=s[6],G=s[10],et=s[14],V=s[3],at=s[7],dt=s[11],wt=s[15];return r[0]=a*T+o*y+c*H+l*V,r[4]=a*A+o*D+c*X+l*at,r[8]=a*P+o*F+c*G+l*dt,r[12]=a*E+o*k+c*et+l*wt,r[1]=h*T+d*y+u*H+f*V,r[5]=h*A+d*D+u*X+f*at,r[9]=h*P+d*F+u*G+f*dt,r[13]=h*E+d*k+u*et+f*wt,r[2]=m*T+_*y+g*H+p*V,r[6]=m*A+_*D+g*X+p*at,r[10]=m*P+_*F+g*G+p*dt,r[14]=m*E+_*k+g*et+p*wt,r[3]=M*T+b*y+S*H+C*V,r[7]=M*A+b*D+S*X+C*at,r[11]=M*P+b*F+S*G+C*dt,r[15]=M*E+b*k+S*et+C*wt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+r*c*d-s*l*d-r*o*u+n*l*u+s*o*f-n*c*f)+_*(+e*c*f-e*l*u+r*a*u-s*a*f+s*l*h-r*c*h)+g*(+e*l*d-e*o*f-r*a*d+n*a*f+r*o*h-n*l*h)+p*(-s*o*h-e*c*d+e*o*u+s*a*d-n*a*u+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],m=t[12],_=t[13],g=t[14],p=t[15],M=d*g*l-_*u*l+_*c*f-o*g*f-d*c*p+o*u*p,b=m*u*l-h*g*l-m*c*f+a*g*f+h*c*p-a*u*p,S=h*_*l-m*d*l+m*o*f-a*_*f-h*o*p+a*d*p,C=m*d*c-h*_*c-m*o*u+a*_*u+h*o*g-a*d*g,T=e*M+n*b+s*S+r*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return t[0]=M*A,t[1]=(_*u*r-d*g*r-_*s*f+n*g*f+d*s*p-n*u*p)*A,t[2]=(o*g*r-_*c*r+_*s*l-n*g*l-o*s*p+n*c*p)*A,t[3]=(d*c*r-o*u*r-d*s*l+n*u*l+o*s*f-n*c*f)*A,t[4]=b*A,t[5]=(h*g*r-m*u*r+m*s*f-e*g*f-h*s*p+e*u*p)*A,t[6]=(m*c*r-a*g*r-m*s*l+e*g*l+a*s*p-e*c*p)*A,t[7]=(a*u*r-h*c*r+h*s*l-e*u*l-a*s*f+e*c*f)*A,t[8]=S*A,t[9]=(m*d*r-h*_*r-m*n*f+e*_*f+h*n*p-e*d*p)*A,t[10]=(a*_*r-m*o*r+m*n*l-e*_*l-a*n*p+e*o*p)*A,t[11]=(h*o*r-a*d*r-h*n*l+e*d*l+a*n*f-e*o*f)*A,t[12]=C*A,t[13]=(h*_*s-m*d*s+m*n*u-e*_*u-h*n*g+e*d*g)*A,t[14]=(m*o*s-a*_*s-m*n*c+e*_*c+a*n*g-e*o*g)*A,t[15]=(a*d*s-h*o*s+h*n*c-e*d*c-a*n*u+e*o*u)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,d=o+o,u=r*l,f=r*h,m=r*d,_=a*h,g=a*d,p=o*d,M=c*l,b=c*h,S=c*d,C=n.x,T=n.y,A=n.z;return s[0]=(1-(_+p))*C,s[1]=(f+S)*C,s[2]=(m-b)*C,s[3]=0,s[4]=(f-S)*T,s[5]=(1-(u+p))*T,s[6]=(g+M)*T,s[7]=0,s[8]=(m+b)*A,s[9]=(g-M)*A,s[10]=(1-(u+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ri.set(s[0],s[1],s[2]).length();const a=Ri.set(s[4],s[5],s[6]).length(),o=Ri.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],en.copy(this);const l=1/r,h=1/a,d=1/o;return en.elements[0]*=l,en.elements[1]*=l,en.elements[2]*=l,en.elements[4]*=h,en.elements[5]*=h,en.elements[6]*=h,en.elements[8]*=d,en.elements[9]*=d,en.elements[10]*=d,e.setFromRotationMatrix(en),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=mn,c=!1){const l=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let m,_;if(c)m=r/(a-r),_=a*r/(a-r);else if(o===mn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===zr)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=mn,c=!1){const l=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s);let m,_;if(c)m=1/(a-r),_=a/(a-r);else if(o===mn)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===zr)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ri=new R,en=new te,sp=new R(0,0,0),rp=new R(1,1,1),Un=new R,Ks=new R,Ve=new R,Yl=new te,ql=new Yn;class Pn{constructor(t=0,e=0,n=0,s=Pn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(zt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-zt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(zt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Yl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ql.setFromEuler(this),this.setFromQuaternion(ql,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pn.DEFAULT_ORDER="XYZ";class rl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ap=0;const Kl=new R,Ci=new Yn,Mn=new te,$s=new R,hs=new R,op=new R,lp=new Yn,$l=new R(1,0,0),Zl=new R(0,1,0),Jl=new R(0,0,1),Ql={type:"added"},cp={type:"removed"},Pi={type:"childadded",child:null},ha={type:"childremoved",child:null};class Ae extends xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ap++}),this.uuid=An(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ae.DEFAULT_UP.clone();const t=new R,e=new Pn,n=new Yn,s=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new te},normalMatrix:{value:new Ft}}),this.matrix=new te,this.matrixWorld=new te,this.matrixAutoUpdate=Ae.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.multiply(Ci),this}rotateOnWorldAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.premultiply(Ci),this}rotateX(t){return this.rotateOnAxis($l,t)}rotateY(t){return this.rotateOnAxis(Zl,t)}rotateZ(t){return this.rotateOnAxis(Jl,t)}translateOnAxis(t,e){return Kl.copy(t).applyQuaternion(this.quaternion),this.position.add(Kl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis($l,t)}translateY(t){return this.translateOnAxis(Zl,t)}translateZ(t){return this.translateOnAxis(Jl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Mn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?$s.copy(t):$s.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),hs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mn.lookAt(hs,$s,this.up):Mn.lookAt($s,hs,this.up),this.quaternion.setFromRotationMatrix(Mn),s&&(Mn.extractRotation(s.matrixWorld),Ci.setFromRotationMatrix(Mn),this.quaternion.premultiply(Ci.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ql),Pi.child=t,this.dispatchEvent(Pi),Pi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(cp),ha.child=t,this.dispatchEvent(ha),ha.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Mn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Mn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Mn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ql),Pi.child=t,this.dispatchEvent(Pi),Pi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hs,t,op),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hs,lp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ae.DEFAULT_UP=new R(0,1,0);Ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const nn=new R,Sn=new R,da=new R,En=new R,Li=new R,Di=new R,tc=new R,ua=new R,fa=new R,pa=new R,ma=new ge,ga=new ge,_a=new ge;class We{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),nn.subVectors(t,e),s.cross(nn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){nn.subVectors(s,e),Sn.subVectors(n,e),da.subVectors(t,e);const a=nn.dot(nn),o=nn.dot(Sn),c=nn.dot(da),l=Sn.dot(Sn),h=Sn.dot(da),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(l*c-o*h)*u,m=(a*h-o*c)*u;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,En)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,En.x),c.addScaledVector(a,En.y),c.addScaledVector(o,En.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return ma.setScalar(0),ga.setScalar(0),_a.setScalar(0),ma.fromBufferAttribute(t,e),ga.fromBufferAttribute(t,n),_a.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(ma,r.x),a.addScaledVector(ga,r.y),a.addScaledVector(_a,r.z),a}static isFrontFacing(t,e,n,s){return nn.subVectors(n,e),Sn.subVectors(t,e),nn.cross(Sn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return nn.subVectors(this.c,this.b),Sn.subVectors(this.a,this.b),nn.cross(Sn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return We.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return We.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return We.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return We.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return We.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Li.subVectors(s,n),Di.subVectors(r,n),ua.subVectors(t,n);const c=Li.dot(ua),l=Di.dot(ua);if(c<=0&&l<=0)return e.copy(n);fa.subVectors(t,s);const h=Li.dot(fa),d=Di.dot(fa);if(h>=0&&d<=h)return e.copy(s);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(Li,a);pa.subVectors(t,r);const f=Li.dot(pa),m=Di.dot(pa);if(m>=0&&f<=m)return e.copy(r);const _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return o=l/(l-m),e.copy(n).addScaledVector(Di,o);const g=h*m-f*d;if(g<=0&&d-h>=0&&f-m>=0)return tc.subVectors(r,s),o=(d-h)/(d-h+(f-m)),e.copy(s).addScaledVector(tc,o);const p=1/(g+_+u);return a=_*p,o=u*p,e.copy(n).addScaledVector(Li,a).addScaledVector(Di,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Qh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},Zs={h:0,s:0,l:0};function xa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Bt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Xt.workingColorSpace){if(t=il(t,1),e=zt(e,0,1),n=zt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=xa(a,r,t+1/3),this.g=xa(a,r,t),this.b=xa(a,r,t-1/3)}return Xt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ze){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ze){const n=Qh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Tn(t.r),this.g=Tn(t.g),this.b=Tn(t.b),this}copyLinearToSRGB(t){return this.r=Ki(t.r),this.g=Ki(t.g),this.b=Ki(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ze){return Xt.workingToColorSpace(Pe.copy(this),t),Math.round(zt(Pe.r*255,0,255))*65536+Math.round(zt(Pe.g*255,0,255))*256+Math.round(zt(Pe.b*255,0,255))}getHexString(t=Ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.workingToColorSpace(Pe.copy(this),e);const n=Pe.r,s=Pe.g,r=Pe.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Xt.workingColorSpace){return Xt.workingToColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=Ze){Xt.workingToColorSpace(Pe.copy(this),t);const e=Pe.r,n=Pe.g,s=Pe.b;return t!==Ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Nn),this.setHSL(Nn.h+t,Nn.s+e,Nn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Nn),t.getHSL(Zs);const n=Ss(Nn.h,Zs.h,e),s=Ss(Nn.s,Zs.s,e),r=Ss(Nn.l,Zs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pe=new Bt;Bt.NAMES=Qh;let hp=0;class Mi extends xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hp++}),this.uuid=An(),this.name="",this.type="Material",this.blending=Yi,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ya,this.blendDst=qa,this.blendEquation=oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=Qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ei,this.stencilZFail=Ei,this.stencilZPass=Ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Yi&&(n.blending=this.blending),this.side!==jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ya&&(n.blendSrc=this.blendSrc),this.blendDst!==qa&&(n.blendDst=this.blendDst),this.blendEquation!==oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Qi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class on extends Mi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=Hh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const xe=new R,Js=new ht;let dp=0;class ne{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:dp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=No,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Js.fromBufferAttribute(this,e),Js.applyMatrix3(t),this.setXY(e,Js.x,Js.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix3(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix4(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyNormalMatrix(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.transformDirection(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=rn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=$t(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=rn(e,this.array)),e}setX(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=rn(e,this.array)),e}setY(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=rn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=rn(e,this.array)),e}setW(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),s=$t(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),s=$t(s,this.array),r=$t(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==No&&(t.usage=this.usage),t}}class td extends ne{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ed extends ne{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Kt extends ne{constructor(t,e,n){super(new Float32Array(t),e,n)}}let up=0;const Ke=new te,va=new Ae,Ii=new R,Ge=new vi,ds=new vi,be=new R;class qt extends xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=An(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Zh(t)?ed:td)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ft().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ke.makeRotationFromQuaternion(t),this.applyMatrix4(Ke),this}rotateX(t){return Ke.makeRotationX(t),this.applyMatrix4(Ke),this}rotateY(t){return Ke.makeRotationY(t),this.applyMatrix4(Ke),this}rotateZ(t){return Ke.makeRotationZ(t),this.applyMatrix4(Ke),this}translate(t,e,n){return Ke.makeTranslation(t,e,n),this.applyMatrix4(Ke),this}scale(t,e,n){return Ke.makeScale(t,e,n),this.applyMatrix4(Ke),this}lookAt(t){return va.lookAt(t),va.updateMatrix(),this.applyMatrix4(va.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ii).negate(),this.translate(Ii.x,Ii.y,Ii.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Kt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ge.setFromBufferAttribute(r),this.morphTargetsRelative?(be.addVectors(this.boundingBox.min,Ge.min),this.boundingBox.expandByPoint(be),be.addVectors(this.boundingBox.max,Ge.max),this.boundingBox.expandByPoint(be)):(this.boundingBox.expandByPoint(Ge.min),this.boundingBox.expandByPoint(Ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){const n=this.boundingSphere.center;if(Ge.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ds.setFromBufferAttribute(o),this.morphTargetsRelative?(be.addVectors(Ge.min,ds.min),Ge.expandByPoint(be),be.addVectors(Ge.max,ds.max),Ge.expandByPoint(be)):(Ge.expandByPoint(ds.min),Ge.expandByPoint(ds.max))}Ge.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(be));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)be.fromBufferAttribute(o,l),c&&(Ii.fromBufferAttribute(t,l),be.add(Ii)),s=Math.max(s,n.distanceToSquared(be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ne(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let P=0;P<n.count;P++)o[P]=new R,c[P]=new R;const l=new R,h=new R,d=new R,u=new ht,f=new ht,m=new ht,_=new R,g=new R;function p(P,E,y){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,E),d.fromBufferAttribute(n,y),u.fromBufferAttribute(r,P),f.fromBufferAttribute(r,E),m.fromBufferAttribute(r,y),h.sub(l),d.sub(l),f.sub(u),m.sub(u);const D=1/(f.x*m.y-m.x*f.y);isFinite(D)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(D),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(D),o[P].add(_),o[E].add(_),o[y].add(_),c[P].add(g),c[E].add(g),c[y].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let P=0,E=M.length;P<E;++P){const y=M[P],D=y.start,F=y.count;for(let k=D,H=D+F;k<H;k+=3)p(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const b=new R,S=new R,C=new R,T=new R;function A(P){C.fromBufferAttribute(s,P),T.copy(C);const E=o[P];b.copy(E),b.sub(C.multiplyScalar(C.dot(E))).normalize(),S.crossVectors(T,E);const D=S.dot(c[P])<0?-1:1;a.setXYZW(P,b.x,b.y,b.z,D)}for(let P=0,E=M.length;P<E;++P){const y=M[P],D=y.start,F=y.count;for(let k=D,H=D+F;k<H;k+=3)A(t.getX(k+0)),A(t.getX(k+1)),A(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ne(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new R,r=new R,a=new R,o=new R,c=new R,l=new R,h=new R,d=new R;if(t)for(let u=0,f=t.count;u<f;u+=3){const m=t.getX(u+0),_=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,g),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)be.fromBufferAttribute(t,e),be.normalize(),t.setXYZ(e,be.x,be.y,be.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let f=0,m=0;for(let _=0,g=c.length;_<g;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let p=0;p<h;p++)u[m++]=l[f++]}return new ne(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new qt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ec=new te,ei=new ks,Qs=new yi,nc=new R,tr=new R,er=new R,nr=new R,ya=new R,ir=new R,ic=new R,sr=new R;class ve extends Ae{constructor(t=new qt,e=new on){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){ir.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],d=r[c];h!==0&&(ya.fromBufferAttribute(d,t),a?ir.addScaledVector(ya,h):ir.addScaledVector(ya.sub(e),h))}e.add(ir)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Qs.copy(n.boundingSphere),Qs.applyMatrix4(r),ei.copy(t.ray).recast(t.near),!(Qs.containsPoint(ei.origin)===!1&&(ei.intersectSphere(Qs,nc)===null||ei.origin.distanceToSquared(nc)>(t.far-t.near)**2))&&(ec.copy(r).invert(),ei.copy(t.ray).applyMatrix4(ec),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ei)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=u.length;m<_;m++){const g=u[m],p=a[g.materialIndex],M=Math.max(g.start,f.start),b=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let S=M,C=b;S<C;S+=3){const T=o.getX(S),A=o.getX(S+1),P=o.getX(S+2);s=rr(this,p,t,n,l,h,d,T,A,P),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const M=o.getX(g),b=o.getX(g+1),S=o.getX(g+2);s=rr(this,a,t,n,l,h,d,M,b,S),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,_=u.length;m<_;m++){const g=u[m],p=a[g.materialIndex],M=Math.max(g.start,f.start),b=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let S=M,C=b;S<C;S+=3){const T=S,A=S+1,P=S+2;s=rr(this,p,t,n,l,h,d,T,A,P),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const M=g,b=g+1,S=g+2;s=rr(this,a,t,n,l,h,d,M,b,S),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function fp(i,t,e,n,s,r,a,o){let c;if(t.side===Be?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===jn,o),c===null)return null;sr.copy(o),sr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(sr);return l<e.near||l>e.far?null:{distance:l,point:sr.clone(),object:i}}function rr(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,tr),i.getVertexPosition(c,er),i.getVertexPosition(l,nr);const h=fp(i,t,e,n,tr,er,nr,ic);if(h){const d=new R;We.getBarycoord(ic,tr,er,nr,d),s&&(h.uv=We.getInterpolatedAttribute(s,o,c,l,d,new ht)),r&&(h.uv1=We.getInterpolatedAttribute(r,o,c,l,d,new ht)),a&&(h.normal=We.getInterpolatedAttribute(a,o,c,l,d,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new R,materialIndex:0};We.getNormal(tr,er,nr,u.normal),h.face=u,h.barycoord=d}return h}class Bs extends qt{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,f=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,s,a,2),m("x","z","y",1,-1,t,n,-e,s,a,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Kt(l,3)),this.setAttribute("normal",new Kt(h,3)),this.setAttribute("uv",new Kt(d,2));function m(_,g,p,M,b,S,C,T,A,P,E){const y=S/A,D=C/P,F=S/2,k=C/2,H=T/2,X=A+1,G=P+1;let et=0,V=0;const at=new R;for(let dt=0;dt<G;dt++){const wt=dt*D-k;for(let Ht=0;Ht<X;Ht++){const ie=Ht*y-F;at[_]=ie*M,at[g]=wt*b,at[p]=H,l.push(at.x,at.y,at.z),at[_]=0,at[g]=0,at[p]=T>0?1:-1,h.push(at.x,at.y,at.z),d.push(Ht/A),d.push(1-dt/P),et+=1}}for(let dt=0;dt<P;dt++)for(let wt=0;wt<A;wt++){const Ht=u+wt+X*dt,ie=u+wt+X*(dt+1),ae=u+(wt+1)+X*(dt+1),jt=u+(wt+1)+X*dt;c.push(Ht,ie,jt),c.push(ie,ae,jt),V+=6}o.addGroup(f,V,E),f+=V,u+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function is(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ne(i){const t={};for(let e=0;e<i.length;e++){const n=is(i[e]);for(const s in n)t[s]=n[s]}return t}function pp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function nd(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}const mp={clone:is,merge:Ne};var gp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_p=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class je extends Mi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gp,this.fragmentShader=_p,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=is(t.uniforms),this.uniformsGroups=pp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class id extends Ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new te,this.projectionMatrix=new te,this.projectionMatrixInverse=new te,this.coordinateSystem=mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Fn=new R,sc=new ht,rc=new ht;class Je extends id{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Cs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(qi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Cs*2*Math.atan(Math.tan(qi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Fn.x,Fn.y).multiplyScalar(-t/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fn.x,Fn.y).multiplyScalar(-t/Fn.z)}getViewSize(t,e){return this.getViewBounds(t,sc,rc),e.subVectors(rc,sc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(qi*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ui=-90,Ni=1;class xp extends Ae{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Je(Ui,Ni,t,e);s.layers=this.layers,this.add(s);const r=new Je(Ui,Ni,t,e);r.layers=this.layers,this.add(r);const a=new Je(Ui,Ni,t,e);a.layers=this.layers,this.add(a);const o=new Je(Ui,Ni,t,e);o.layers=this.layers,this.add(o);const c=new Je(Ui,Ni,t,e);c.layers=this.layers,this.add(c);const l=new Je(Ui,Ni,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===zr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class sd extends De{constructor(t=[],e=ts,n,s,r,a,o,c,l,h){super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class vp extends gi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new sd(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Bs(5,5,5),r=new je({name:"CubemapFromEquirect",uniforms:is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Be,blending:Bn});r.uniforms.tEquirect.value=e;const a=new ve(s,r),o=e.minFilter;return e.minFilter===ui&&(e.minFilter=fn),new xp(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}class ke extends Ae{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yp={type:"move"};class Ma{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;l.inputState.pinching&&u>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(yp)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ke;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Mp extends Ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pn,this.environmentIntensity=1,this.environmentRotation=new Pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Sp{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=No,this.updateRanges=[],this.version=0,this.uuid=An()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=An()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=An()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ue=new R;class Vr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=rn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=$t(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=rn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=rn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=rn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=rn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),s=$t(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),s=$t(s,this.array),r=$t(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new ne(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Vr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class al extends Mi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Bt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Fi;const us=new R,Oi=new R,ki=new R,Bi=new ht,fs=new ht,rd=new te,ar=new R,ps=new R,or=new R,ac=new ht,Sa=new ht,oc=new ht;class ad extends Ae{constructor(t=new al){if(super(),this.isSprite=!0,this.type="Sprite",Fi===void 0){Fi=new qt;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Sp(e,5);Fi.setIndex([0,1,2,0,2,3]),Fi.setAttribute("position",new Vr(n,3,0,!1)),Fi.setAttribute("uv",new Vr(n,2,3,!1))}this.geometry=Fi,this.material=t,this.center=new ht(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Oi.setFromMatrixScale(this.matrixWorld),rd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ki.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Oi.multiplyScalar(-ki.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;lr(ar.set(-.5,-.5,0),ki,a,Oi,s,r),lr(ps.set(.5,-.5,0),ki,a,Oi,s,r),lr(or.set(.5,.5,0),ki,a,Oi,s,r),ac.set(0,0),Sa.set(1,0),oc.set(1,1);let o=t.ray.intersectTriangle(ar,ps,or,!1,us);if(o===null&&(lr(ps.set(-.5,.5,0),ki,a,Oi,s,r),Sa.set(0,1),o=t.ray.intersectTriangle(ar,or,ps,!1,us),o===null))return;const c=t.ray.origin.distanceTo(us);c<t.near||c>t.far||e.push({distance:c,point:us.clone(),uv:We.getInterpolation(us,ar,ps,or,ac,Sa,oc,new ht),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function lr(i,t,e,n,s,r){Bi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(fs.x=r*Bi.x-s*Bi.y,fs.y=s*Bi.x+r*Bi.y):fs.copy(Bi),i.copy(t),i.x+=fs.x,i.y+=fs.y,i.applyMatrix4(rd)}class Ep extends De{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Xe,h=Xe,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gr extends ne{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const zi=new te,lc=new te,cr=[],cc=new vi,bp=new te,ms=new ve,gs=new yi;class od extends ve{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Gr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,bp)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new vi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,zi),cc.copy(t.boundingBox).applyMatrix4(zi),this.boundingBox.union(cc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new yi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,zi),gs.copy(t.boundingSphere).applyMatrix4(zi),this.boundingSphere.union(gs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(ms.geometry=this.geometry,ms.material=this.material,ms.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),gs.copy(this.boundingSphere),gs.applyMatrix4(n),t.ray.intersectsSphere(gs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,zi),lc.multiplyMatrices(n,zi),ms.matrixWorld=lc,ms.raycast(t,cr);for(let a=0,o=cr.length;a<o;a++){const c=cr[a];c.instanceId=r,c.object=this,e.push(c)}cr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Gr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ep(new Float32Array(s*this.count),s,this.count,Qo,pn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ea=new R,wp=new R,Ap=new Ft;class hn{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ea.subVectors(n,e).cross(wp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ea),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ap.getNormalMatrix(t),s=this.coplanarPoint(Ea).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ni=new yi,Tp=new ht(.5,.5),hr=new R;class ld{constructor(t=new hn,e=new hn,n=new hn,s=new hn,r=new hn,a=new hn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=mn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],f=r[7],m=r[8],_=r[9],g=r[10],p=r[11],M=r[12],b=r[13],S=r[14],C=r[15];if(s[0].setComponents(l-a,f-h,p-m,C-M).normalize(),s[1].setComponents(l+a,f+h,p+m,C+M).normalize(),s[2].setComponents(l+o,f+d,p+_,C+b).normalize(),s[3].setComponents(l-o,f-d,p-_,C-b).normalize(),n)s[4].setComponents(c,u,g,S).normalize(),s[5].setComponents(l-c,f-u,p-g,C-S).normalize();else if(s[4].setComponents(l-c,f-u,p-g,C-S).normalize(),e===mn)s[5].setComponents(l+c,f+u,p+g,C+S).normalize();else if(e===zr)s[5].setComponents(c,u,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(t){ni.center.set(0,0,0);const e=Tp.distanceTo(t.center);return ni.radius=.7071067811865476+e,ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(hr.x=s.normal.x>0?t.max.x:t.min.x,hr.y=s.normal.y>0?t.max.y:t.min.y,hr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(hr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ol extends Mi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Bt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Wr=new R,Xr=new R,hc=new te,_s=new ks,dr=new yi,ba=new R,dc=new R;class cd extends Ae{constructor(t=new qt,e=new ol){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Wr.fromBufferAttribute(e,s-1),Xr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Wr.distanceTo(Xr);t.setAttribute("lineDistance",new Kt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),dr.copy(n.boundingSphere),dr.applyMatrix4(s),dr.radius+=r,t.ray.intersectsSphere(dr)===!1)return;hc.copy(s).invert(),_s.copy(t.ray).applyMatrix4(hc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=l){const p=h.getX(_),M=h.getX(_+1),b=ur(this,t,_s,c,p,M,_);b&&e.push(b)}if(this.isLineLoop){const _=h.getX(m-1),g=h.getX(f),p=ur(this,t,_s,c,_,g,m-1);p&&e.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=l){const p=ur(this,t,_s,c,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){const _=ur(this,t,_s,c,m-1,f,m-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ur(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(Wr.fromBufferAttribute(o,s),Xr.fromBufferAttribute(o,r),e.distanceSqToSegment(Wr,Xr,ba,dc)>n)return;ba.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ba);if(!(l<t.near||l>t.far))return{distance:l,point:dc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const uc=new R,fc=new R;class Ls extends cd{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)uc.fromBufferAttribute(e,s),fc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+uc.distanceTo(fc);t.setAttribute("lineDistance",new Kt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class hd extends Mi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Bt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const pc=new te,Fo=new ks,fr=new yi,pr=new R;class Yr extends Ae{constructor(t=new qt,e=new hd){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere),fr.applyMatrix4(s),fr.radius+=r,t.ray.intersectsSphere(fr)===!1)return;pc.copy(s).invert(),Fo.copy(t.ray).applyMatrix4(pc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const u=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let m=u,_=f;m<_;m++){const g=l.getX(m);pr.fromBufferAttribute(d,g),mc(pr,g,c,s,t,e,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let m=u,_=f;m<_;m++)pr.fromBufferAttribute(d,m),mc(pr,m,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function mc(i,t,e,n,s,r,a){const o=Fo.distanceSqToPoint(i);if(o<e){const c=new R;Fo.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class dd extends De{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ud extends De{constructor(t,e,n=mi,s,r,a,o=Xe,c=Xe,l,h=Ts,d=1){if(h!==Ts&&h!==Rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new sl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class fd extends De{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ll extends qt{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new R,h=new ht;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Kt(a,3)),this.setAttribute("normal",new Kt(o,3)),this.setAttribute("uv",new Kt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ll(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class qr extends qt{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let m=0;const _=[],g=n/2;let p=0;M(),a===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new Kt(d,3)),this.setAttribute("normal",new Kt(u,3)),this.setAttribute("uv",new Kt(f,2));function M(){const S=new R,C=new R;let T=0;const A=(e-t)/n;for(let P=0;P<=r;P++){const E=[],y=P/r,D=y*(e-t)+t;for(let F=0;F<=s;F++){const k=F/s,H=k*c+o,X=Math.sin(H),G=Math.cos(H);C.x=D*X,C.y=-y*n+g,C.z=D*G,d.push(C.x,C.y,C.z),S.set(X,A,G).normalize(),u.push(S.x,S.y,S.z),f.push(k,1-y),E.push(m++)}_.push(E)}for(let P=0;P<s;P++)for(let E=0;E<r;E++){const y=_[E][P],D=_[E+1][P],F=_[E+1][P+1],k=_[E][P+1];(t>0||E!==0)&&(h.push(y,D,k),T+=3),(e>0||E!==r-1)&&(h.push(D,F,k),T+=3)}l.addGroup(p,T,0),p+=T}function b(S){const C=m,T=new ht,A=new R;let P=0;const E=S===!0?t:e,y=S===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,g*y,0),u.push(0,y,0),f.push(.5,.5),m++;const D=m;for(let F=0;F<=s;F++){const H=F/s*c+o,X=Math.cos(H),G=Math.sin(H);A.x=E*G,A.y=g*y,A.z=E*X,d.push(A.x,A.y,A.z),u.push(0,y,0),T.x=X*.5+.5,T.y=G*.5*y+.5,f.push(T.x,T.y),m++}for(let F=0;F<s;F++){const k=C+F,H=D+F;S===!0?h.push(H,H+1,k):h.push(H+1,H,k),P+=3}l.addGroup(p,P,S===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qr(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class cl extends qr{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new cl(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class hl extends qt{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),l(n),h(),this.setAttribute("position",new Kt(r,3)),this.setAttribute("normal",new Kt(r.slice(),3)),this.setAttribute("uv",new Kt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const b=new R,S=new R,C=new R;for(let T=0;T<e.length;T+=3)f(e[T+0],b),f(e[T+1],S),f(e[T+2],C),c(b,S,C,M)}function c(M,b,S,C){const T=C+1,A=[];for(let P=0;P<=T;P++){A[P]=[];const E=M.clone().lerp(S,P/T),y=b.clone().lerp(S,P/T),D=T-P;for(let F=0;F<=D;F++)F===0&&P===T?A[P][F]=E:A[P][F]=E.clone().lerp(y,F/D)}for(let P=0;P<T;P++)for(let E=0;E<2*(T-P)-1;E++){const y=Math.floor(E/2);E%2===0?(u(A[P][y+1]),u(A[P+1][y]),u(A[P][y])):(u(A[P][y+1]),u(A[P+1][y+1]),u(A[P+1][y]))}}function l(M){const b=new R;for(let S=0;S<r.length;S+=3)b.x=r[S+0],b.y=r[S+1],b.z=r[S+2],b.normalize().multiplyScalar(M),r[S+0]=b.x,r[S+1]=b.y,r[S+2]=b.z}function h(){const M=new R;for(let b=0;b<r.length;b+=3){M.x=r[b+0],M.y=r[b+1],M.z=r[b+2];const S=g(M)/2/Math.PI+.5,C=p(M)/Math.PI+.5;a.push(S,1-C)}m(),d()}function d(){for(let M=0;M<a.length;M+=6){const b=a[M+0],S=a[M+2],C=a[M+4],T=Math.max(b,S,C),A=Math.min(b,S,C);T>.9&&A<.1&&(b<.2&&(a[M+0]+=1),S<.2&&(a[M+2]+=1),C<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function f(M,b){const S=M*3;b.x=t[S+0],b.y=t[S+1],b.z=t[S+2]}function m(){const M=new R,b=new R,S=new R,C=new R,T=new ht,A=new ht,P=new ht;for(let E=0,y=0;E<r.length;E+=9,y+=6){M.set(r[E+0],r[E+1],r[E+2]),b.set(r[E+3],r[E+4],r[E+5]),S.set(r[E+6],r[E+7],r[E+8]),T.set(a[y+0],a[y+1]),A.set(a[y+2],a[y+3]),P.set(a[y+4],a[y+5]),C.copy(M).add(b).add(S).divideScalar(3);const D=g(C);_(T,y+0,M,D),_(A,y+2,b,D),_(P,y+4,S,D)}}function _(M,b,S,C){C<0&&M.x===1&&(a[b]=M.x-1),S.x===0&&S.z===0&&(a[b]=C/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hl(t.vertices,t.indices,t.radius,t.details)}}const mr=new R,gr=new R,wa=new R,_r=new We;class Rp extends qt{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(qi*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let m=0;m<c;m+=3){a?(l[0]=a.getX(m),l[1]=a.getX(m+1),l[2]=a.getX(m+2)):(l[0]=m,l[1]=m+1,l[2]=m+2);const{a:_,b:g,c:p}=_r;if(_.fromBufferAttribute(o,l[0]),g.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),_r.getNormal(wa),d[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,d[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,d[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let M=0;M<3;M++){const b=(M+1)%3,S=d[M],C=d[b],T=_r[h[M]],A=_r[h[b]],P=`${S}_${C}`,E=`${C}_${S}`;E in u&&u[E]?(wa.dot(u[E].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(A.x,A.y,A.z)),u[E]=null):P in u||(u[P]={index0:l[M],index1:l[b],normal:wa.clone()})}}for(const m in u)if(u[m]){const{index0:_,index1:g}=u[m];mr.fromBufferAttribute(o,_),gr.fromBufferAttribute(o,g),f.push(mr.x,mr.y,mr.z),f.push(gr.x,gr.y,gr.z)}this.setAttribute("position",new Kt(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class dl extends hl{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new dl(t.radius,t.detail)}}class rs extends qt{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=t/o,u=e/c,f=[],m=[],_=[],g=[];for(let p=0;p<h;p++){const M=p*u-a;for(let b=0;b<l;b++){const S=b*d-r;m.push(S,-M,0),_.push(0,0,1),g.push(b/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<o;M++){const b=M+l*p,S=M+l*(p+1),C=M+1+l*(p+1),T=M+1+l*p;f.push(b,S,T),f.push(S,C,T)}this.setIndex(f),this.setAttribute("position",new Kt(m,3)),this.setAttribute("normal",new Kt(_,3)),this.setAttribute("uv",new Kt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rs(t.width,t.height,t.widthSegments,t.heightSegments)}}class Hn extends qt{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],h=[];let d=t;const u=(e-t)/s,f=new R,m=new ht;for(let _=0;_<=s;_++){for(let g=0;g<=n;g++){const p=r+g/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}d+=u}for(let _=0;_<s;_++){const g=_*(n+1);for(let p=0;p<n;p++){const M=p+g,b=M,S=M+n+1,C=M+n+2,T=M+1;o.push(b,S,T),o.push(S,C,T)}}this.setIndex(o),this.setAttribute("position",new Kt(c,3)),this.setAttribute("normal",new Kt(l,3)),this.setAttribute("uv",new Kt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hn(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ul extends qt{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],c=[],l=[],h=new R,d=new R,u=new R;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const _=m/s*r,g=f/n*Math.PI*2;d.x=(t+e*Math.cos(g))*Math.cos(_),d.y=(t+e*Math.cos(g))*Math.sin(_),d.z=e*Math.sin(g),o.push(d.x,d.y,d.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(m/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const _=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,M=(s+1)*f+m;a.push(_,g,M),a.push(g,p,M)}this.setIndex(a),this.setAttribute("position",new Kt(o,3)),this.setAttribute("normal",new Kt(c,3)),this.setAttribute("uv",new Kt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ul(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Cp extends Mi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Sf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Pp extends Mi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Lp extends id{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Dp extends Je{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Ip{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}const gc=new te;class _c{constructor(t,e,n=0,s=1/0){this.ray=new ks(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new rl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return gc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gc),this}intersectObject(t,e=!0,n=[]){return Oo(t,this,n,e),n.sort(xc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Oo(t[s],this,n,e);return n.sort(xc),n}}function xc(i,t){return i.distance-t.distance}function Oo(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Oo(r[a],t,e,!0)}}class vc{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=zt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(zt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Up extends xi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function yc(i,t,e,n){const s=Np(n);switch(e){case Yh:return i*t;case Qo:return i*t/s.components*s.byteLength;case tl:return i*t/s.components*s.byteLength;case Kh:return i*t*2/s.components*s.byteLength;case el:return i*t*2/s.components*s.byteLength;case qh:return i*t*3/s.components*s.byteLength;case an:return i*t*4/s.components*s.byteLength;case nl:return i*t*4/s.components*s.byteLength;case Er:case br:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case wr:case Ar:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case oo:case co:return Math.max(i,16)*Math.max(t,8)/4;case ao:case lo:return Math.max(i,8)*Math.max(t,8)/2;case ho:case uo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case fo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case po:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case mo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case go:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case _o:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case xo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case vo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case yo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Mo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case So:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Eo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case bo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case wo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ao:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case To:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ro:case Co:case Po:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Lo:case Do:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Io:case Uo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Np(i){switch(i){case Cn:case Gh:return{byteLength:1,components:1};case ws:case Wh:case Os:return{byteLength:2,components:1};case Zo:case Jo:return{byteLength:2,components:4};case mi:case $o:case pn:return{byteLength:4,components:1};case Xh:case jh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ko}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ko);function pd(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Fp(i){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const h=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){const m=d[u],_=d[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){const _=d[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Op=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,kp=`#ifdef USE_ALPHAHASH
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
#endif`,Bp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gp=`#ifdef USE_AOMAP
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
#endif`,Wp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xp=`#ifdef USE_BATCHING
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
#endif`,jp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,$p=`#ifdef USE_IRIDESCENCE
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
#endif`,Zp=`#ifdef USE_BUMPMAP
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
#endif`,Jp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,em=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,im=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,sm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,am=`#define PI 3.141592653589793
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
} // validated`,om=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lm=`vec3 transformedNormal = objectNormal;
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
#endif`,cm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,um=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fm="gl_FragColor = linearToOutputTexel( gl_FragColor );",pm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mm=`#ifdef USE_ENVMAP
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
#endif`,gm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_m=`#ifdef USE_ENVMAP
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
#endif`,xm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vm=`#ifdef USE_ENVMAP
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
#endif`,ym=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Em=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bm=`#ifdef USE_GRADIENTMAP
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
}`,wm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Am=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Tm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rm=`uniform bool receiveShadow;
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
#endif`,Cm=`#ifdef USE_ENVMAP
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
#endif`,Pm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Dm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Im=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Um=`PhysicalMaterial material;
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
#endif`,Nm=`struct PhysicalMaterial {
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
}`,Fm=`
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
#endif`,Om=`#if defined( RE_IndirectDiffuse )
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
#endif`,km=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Gm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,jm=`#if defined( USE_POINTS_UV )
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
#endif`,Ym=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Km=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$m=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jm=`#ifdef USE_MORPHTARGETS
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
#endif`,Qm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,eg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ng=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ig=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rg=`#ifdef USE_NORMALMAP
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
#endif`,ag=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,og=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ug=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_g=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Mg=`float getShadowMask() {
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
}`,Sg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Eg=`#ifdef USE_SKINNING
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
#endif`,bg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wg=`#ifdef USE_SKINNING
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
#endif`,Ag=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pg=`#ifdef USE_TRANSMISSION
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
#endif`,Lg=`#ifdef USE_TRANSMISSION
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
#endif`,Dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ug=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ng=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Fg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Og=`uniform sampler2D t2D;
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
}`,kg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vg=`#include <common>
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
}`,Gg=`#if DEPTH_PACKING == 3200
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
}`,Wg=`#define DISTANCE
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
}`,Xg=`#define DISTANCE
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
}`,jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qg=`uniform float scale;
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
}`,Kg=`uniform vec3 diffuse;
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
}`,$g=`#include <common>
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
}`,Zg=`uniform vec3 diffuse;
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
}`,Jg=`#define LAMBERT
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
}`,Qg=`#define LAMBERT
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
}`,t0=`#define MATCAP
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
}`,e0=`#define MATCAP
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
}`,n0=`#define NORMAL
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
}`,i0=`#define NORMAL
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
}`,s0=`#define PHONG
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
}`,r0=`#define PHONG
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
}`,a0=`#define STANDARD
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
}`,o0=`#define STANDARD
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
}`,l0=`#define TOON
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
}`,c0=`#define TOON
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
}`,h0=`uniform float size;
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
}`,d0=`uniform vec3 diffuse;
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
}`,u0=`#include <common>
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
}`,f0=`uniform vec3 color;
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
}`,p0=`uniform float rotation;
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
}`,m0=`uniform vec3 diffuse;
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
}`,kt={alphahash_fragment:Op,alphahash_pars_fragment:kp,alphamap_fragment:Bp,alphamap_pars_fragment:zp,alphatest_fragment:Hp,alphatest_pars_fragment:Vp,aomap_fragment:Gp,aomap_pars_fragment:Wp,batching_pars_vertex:Xp,batching_vertex:jp,begin_vertex:Yp,beginnormal_vertex:qp,bsdfs:Kp,iridescence_fragment:$p,bumpmap_pars_fragment:Zp,clipping_planes_fragment:Jp,clipping_planes_pars_fragment:Qp,clipping_planes_pars_vertex:tm,clipping_planes_vertex:em,color_fragment:nm,color_pars_fragment:im,color_pars_vertex:sm,color_vertex:rm,common:am,cube_uv_reflection_fragment:om,defaultnormal_vertex:lm,displacementmap_pars_vertex:cm,displacementmap_vertex:hm,emissivemap_fragment:dm,emissivemap_pars_fragment:um,colorspace_fragment:fm,colorspace_pars_fragment:pm,envmap_fragment:mm,envmap_common_pars_fragment:gm,envmap_pars_fragment:_m,envmap_pars_vertex:xm,envmap_physical_pars_fragment:Cm,envmap_vertex:vm,fog_vertex:ym,fog_pars_vertex:Mm,fog_fragment:Sm,fog_pars_fragment:Em,gradientmap_pars_fragment:bm,lightmap_pars_fragment:wm,lights_lambert_fragment:Am,lights_lambert_pars_fragment:Tm,lights_pars_begin:Rm,lights_toon_fragment:Pm,lights_toon_pars_fragment:Lm,lights_phong_fragment:Dm,lights_phong_pars_fragment:Im,lights_physical_fragment:Um,lights_physical_pars_fragment:Nm,lights_fragment_begin:Fm,lights_fragment_maps:Om,lights_fragment_end:km,logdepthbuf_fragment:Bm,logdepthbuf_pars_fragment:zm,logdepthbuf_pars_vertex:Hm,logdepthbuf_vertex:Vm,map_fragment:Gm,map_pars_fragment:Wm,map_particle_fragment:Xm,map_particle_pars_fragment:jm,metalnessmap_fragment:Ym,metalnessmap_pars_fragment:qm,morphinstance_vertex:Km,morphcolor_vertex:$m,morphnormal_vertex:Zm,morphtarget_pars_vertex:Jm,morphtarget_vertex:Qm,normal_fragment_begin:tg,normal_fragment_maps:eg,normal_pars_fragment:ng,normal_pars_vertex:ig,normal_vertex:sg,normalmap_pars_fragment:rg,clearcoat_normal_fragment_begin:ag,clearcoat_normal_fragment_maps:og,clearcoat_pars_fragment:lg,iridescence_pars_fragment:cg,opaque_fragment:hg,packing:dg,premultiplied_alpha_fragment:ug,project_vertex:fg,dithering_fragment:pg,dithering_pars_fragment:mg,roughnessmap_fragment:gg,roughnessmap_pars_fragment:_g,shadowmap_pars_fragment:xg,shadowmap_pars_vertex:vg,shadowmap_vertex:yg,shadowmask_pars_fragment:Mg,skinbase_vertex:Sg,skinning_pars_vertex:Eg,skinning_vertex:bg,skinnormal_vertex:wg,specularmap_fragment:Ag,specularmap_pars_fragment:Tg,tonemapping_fragment:Rg,tonemapping_pars_fragment:Cg,transmission_fragment:Pg,transmission_pars_fragment:Lg,uv_pars_fragment:Dg,uv_pars_vertex:Ig,uv_vertex:Ug,worldpos_vertex:Ng,background_vert:Fg,background_frag:Og,backgroundCube_vert:kg,backgroundCube_frag:Bg,cube_vert:zg,cube_frag:Hg,depth_vert:Vg,depth_frag:Gg,distanceRGBA_vert:Wg,distanceRGBA_frag:Xg,equirect_vert:jg,equirect_frag:Yg,linedashed_vert:qg,linedashed_frag:Kg,meshbasic_vert:$g,meshbasic_frag:Zg,meshlambert_vert:Jg,meshlambert_frag:Qg,meshmatcap_vert:t0,meshmatcap_frag:e0,meshnormal_vert:n0,meshnormal_frag:i0,meshphong_vert:s0,meshphong_frag:r0,meshphysical_vert:a0,meshphysical_frag:o0,meshtoon_vert:l0,meshtoon_frag:c0,points_vert:h0,points_frag:d0,shadow_vert:u0,shadow_frag:f0,sprite_vert:p0,sprite_frag:m0},st={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},dn={basic:{uniforms:Ne([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:Ne([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Bt(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:Ne([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:Ne([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:Ne([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new Bt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:Ne([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:Ne([st.points,st.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:Ne([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:Ne([st.common,st.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:Ne([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:Ne([st.sprite,st.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:Ne([st.common,st.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:Ne([st.lights,st.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};dn.physical={uniforms:Ne([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const xr={r:0,b:0,g:0},ii=new Pn,g0=new te;function _0(i,t,e,n,s,r,a){const o=new Bt(0);let c=r===!0?0:1,l,h,d=null,u=0,f=null;function m(b){let S=b.isScene===!0?b.background:null;return S&&S.isTexture&&(S=(b.backgroundBlurriness>0?e:t).get(S)),S}function _(b){let S=!1;const C=m(b);C===null?p(o,c):C&&C.isColor&&(p(C,1),S=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(b,S){const C=m(S);C&&(C.isCubeTexture||C.mapping===jr)?(h===void 0&&(h=new ve(new Bs(1,1,1),new je({name:"BackgroundCubeMaterial",uniforms:is(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Be,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ii.copy(S.backgroundRotation),ii.x*=-1,ii.y*=-1,ii.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(g0.makeRotationFromEuler(ii)),h.material.toneMapped=Xt.getTransfer(C.colorSpace)!==Jt,(d!==C||u!==C.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=C,u=C.version,f=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(l===void 0&&(l=new ve(new rs(2,2),new je({name:"BackgroundMaterial",uniforms:is(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=C,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=Xt.getTransfer(C.colorSpace)!==Jt,C.matrixAutoUpdate===!0&&C.updateMatrix(),l.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||u!==C.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,d=C,u=C.version,f=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,S){b.getRGB(xr,nd(i)),n.buffers.color.setClear(xr.r,xr.g,xr.b,S,a)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,S=1){o.set(b),c=S,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,p(o,c)},render:_,addToRenderList:g,dispose:M}}function x0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(y,D,F,k,H){let X=!1;const G=d(k,F,D);r!==G&&(r=G,l(r.object)),X=f(y,k,F,H),X&&m(y,k,F,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,S(y,D,F,k),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function d(y,D,F){const k=F.wireframe===!0;let H=n[y.id];H===void 0&&(H={},n[y.id]=H);let X=H[D.id];X===void 0&&(X={},H[D.id]=X);let G=X[k];return G===void 0&&(G=u(c()),X[k]=G),G}function u(y){const D=[],F=[],k=[];for(let H=0;H<e;H++)D[H]=0,F[H]=0,k[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:F,attributeDivisors:k,object:y,attributes:{},index:null}}function f(y,D,F,k){const H=r.attributes,X=D.attributes;let G=0;const et=F.getAttributes();for(const V in et)if(et[V].location>=0){const dt=H[V];let wt=X[V];if(wt===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(wt=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(wt=y.instanceColor)),dt===void 0||dt.attribute!==wt||wt&&dt.data!==wt.data)return!0;G++}return r.attributesNum!==G||r.index!==k}function m(y,D,F,k){const H={},X=D.attributes;let G=0;const et=F.getAttributes();for(const V in et)if(et[V].location>=0){let dt=X[V];dt===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(dt=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(dt=y.instanceColor));const wt={};wt.attribute=dt,dt&&dt.data&&(wt.data=dt.data),H[V]=wt,G++}r.attributes=H,r.attributesNum=G,r.index=k}function _(){const y=r.newAttributes;for(let D=0,F=y.length;D<F;D++)y[D]=0}function g(y){p(y,0)}function p(y,D){const F=r.newAttributes,k=r.enabledAttributes,H=r.attributeDivisors;F[y]=1,k[y]===0&&(i.enableVertexAttribArray(y),k[y]=1),H[y]!==D&&(i.vertexAttribDivisor(y,D),H[y]=D)}function M(){const y=r.newAttributes,D=r.enabledAttributes;for(let F=0,k=D.length;F<k;F++)D[F]!==y[F]&&(i.disableVertexAttribArray(F),D[F]=0)}function b(y,D,F,k,H,X,G){G===!0?i.vertexAttribIPointer(y,D,F,H,X):i.vertexAttribPointer(y,D,F,k,H,X)}function S(y,D,F,k){_();const H=k.attributes,X=F.getAttributes(),G=D.defaultAttributeValues;for(const et in X){const V=X[et];if(V.location>=0){let at=H[et];if(at===void 0&&(et==="instanceMatrix"&&y.instanceMatrix&&(at=y.instanceMatrix),et==="instanceColor"&&y.instanceColor&&(at=y.instanceColor)),at!==void 0){const dt=at.normalized,wt=at.itemSize,Ht=t.get(at);if(Ht===void 0)continue;const ie=Ht.buffer,ae=Ht.type,jt=Ht.bytesPerElement,Y=ae===i.INT||ae===i.UNSIGNED_INT||at.gpuType===$o;if(at.isInterleavedBufferAttribute){const $=at.data,pt=$.stride,Dt=at.offset;if($.isInstancedInterleavedBuffer){for(let bt=0;bt<V.locationSize;bt++)p(V.location+bt,$.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let bt=0;bt<V.locationSize;bt++)g(V.location+bt);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let bt=0;bt<V.locationSize;bt++)b(V.location+bt,wt/V.locationSize,ae,dt,pt*jt,(Dt+wt/V.locationSize*bt)*jt,Y)}else{if(at.isInstancedBufferAttribute){for(let $=0;$<V.locationSize;$++)p(V.location+$,at.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let $=0;$<V.locationSize;$++)g(V.location+$);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let $=0;$<V.locationSize;$++)b(V.location+$,wt/V.locationSize,ae,dt,wt*jt,wt/V.locationSize*$*jt,Y)}}else if(G!==void 0){const dt=G[et];if(dt!==void 0)switch(dt.length){case 2:i.vertexAttrib2fv(V.location,dt);break;case 3:i.vertexAttrib3fv(V.location,dt);break;case 4:i.vertexAttrib4fv(V.location,dt);break;default:i.vertexAttrib1fv(V.location,dt)}}}}M()}function C(){P();for(const y in n){const D=n[y];for(const F in D){const k=D[F];for(const H in k)h(k[H].object),delete k[H];delete D[F]}delete n[y]}}function T(y){if(n[y.id]===void 0)return;const D=n[y.id];for(const F in D){const k=D[F];for(const H in k)h(k[H].object),delete k[H];delete D[F]}delete n[y.id]}function A(y){for(const D in n){const F=n[D];if(F[y.id]===void 0)continue;const k=F[y.id];for(const H in k)h(k[H].object),delete k[H];delete F[y.id]}}function P(){E(),a=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:P,resetDefaultState:E,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:g,disableUnusedAttributes:M}}function v0(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function o(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let f=0;for(let m=0;m<d;m++)f+=h[m];e.update(f,n,1)}function c(l,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)a(l[m],h[m],u[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let m=0;for(let _=0;_<d;_++)m+=h[_]*u[_];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function y0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==an&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const P=A===Os&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Cn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==pn&&!P)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=m>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:S,vertexTextures:C,maxSamples:T}}function M0(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new hn,o=new Ft,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const m=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{const M=r?0:n,b=M*4;let S=p.clippingState||null;c.value=S,S=h(m,u,b,f);for(let C=0;C!==b;++C)S[C]=e[C];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,m){const _=d!==null?d.length:0;let g=null;if(_!==0){if(g=c.value,m!==!0||g===null){const p=f+_*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<p)&&(g=new Float32Array(p));for(let b=0,S=f;b!==_;++b,S+=4)a.copy(d[b]).applyMatrix4(M,o),a.normal.toArray(g,S),g[S+3]=a.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function S0(i){let t=new WeakMap;function e(a,o){return o===no?a.mapping=ts:o===io&&(a.mapping=es),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===no||o===io)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new vp(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Xi=4,Mc=[.125,.215,.35,.446,.526,.582],li=20,Aa=new Lp,Sc=new Bt;let Ta=null,Ra=0,Ca=0,Pa=!1;const ri=(1+Math.sqrt(5))/2,Hi=1/ri,Ec=[new R(-ri,Hi,0),new R(ri,Hi,0),new R(-Hi,0,ri),new R(Hi,0,ri),new R(0,ri,-Hi),new R(0,ri,Hi),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],E0=new R;class bc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=E0}=r;Ta=this._renderer.getRenderTarget(),Ra=this._renderer.getActiveCubeFace(),Ca=this._renderer.getActiveMipmapLevel(),Pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ac(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ta,Ra,Ca),this._renderer.xr.enabled=Pa,t.scissorTest=!1,vr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ts||t.mapping===es?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ta=this._renderer.getRenderTarget(),Ra=this._renderer.getActiveCubeFace(),Ca=this._renderer.getActiveMipmapLevel(),Pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:Os,format:an,colorSpace:ns,depthBuffer:!1},s=wc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=b0(r)),this._blurMaterial=w0(r,t,e)}return s}_compileMaterial(t){const e=new ve(this._lodPlanes[0],t);this._renderer.compile(e,Aa)}_sceneToCubeUV(t,e,n,s,r){const c=new Je(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Sc),d.toneMapping=zn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));const _=new on({name:"PMREM.Background",side:Be,depthWrite:!1,depthTest:!1}),g=new ve(new Bs,_);let p=!1;const M=t.background;M?M.isColor&&(_.color.copy(M),t.background=null,p=!0):(_.color.copy(Sc),p=!0);for(let b=0;b<6;b++){const S=b%3;S===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[b],r.y,r.z)):S===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[b]));const C=this._cubeSize;vr(s,S*C,b>2?C:0,C,C),d.setRenderTarget(s),p&&d.render(g,c),d.render(t,c)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=u,t.background=M}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ts||t.mapping===es;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ac());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new ve(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;vr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Aa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Ec[(s-r-1)%Ec.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new ve(this._lodPlanes[s],l),u=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*li-1),_=r/m,g=isFinite(r)?1+Math.floor(h*_):li;g>li&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${li}`);const p=[];let M=0;for(let A=0;A<li;++A){const P=A/_,E=Math.exp(-P*P/2);p.push(E),A===0?M+=E:A<g&&(M+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/M;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:b}=this;u.dTheta.value=m,u.mipInt.value=b-n;const S=this._sizeLods[s],C=3*S*(s>b-Xi?s-b+Xi:0),T=4*(this._cubeSize-S);vr(e,C,T,3*S,2*S),c.setRenderTarget(e),c.render(d,Aa)}}function b0(i){const t=[],e=[],n=[];let s=i;const r=i-Xi+1+Mc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-Xi?c=Mc[a-i+Xi-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,m=6,_=3,g=2,p=1,M=new Float32Array(_*m*f),b=new Float32Array(g*m*f),S=new Float32Array(p*m*f);for(let T=0;T<f;T++){const A=T%3*2/3-1,P=T>2?0:-1,E=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];M.set(E,_*m*T),b.set(u,g*m*T);const y=[T,T,T,T,T,T];S.set(y,p*m*T)}const C=new qt;C.setAttribute("position",new ne(M,_)),C.setAttribute("uv",new ne(b,g)),C.setAttribute("faceIndex",new ne(S,p)),t.push(C),s>Xi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function wc(i,t,e){const n=new gi(i,t,e);return n.texture.mapping=jr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function vr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function w0(i,t,e){const n=new Float32Array(li),s=new R(0,1,0);return new je({name:"SphericalGaussianBlur",defines:{n:li,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:fl(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Ac(){return new je({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fl(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Tc(){return new je({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function fl(){return`

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
	`}function A0(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===no||c===io,h=c===ts||c===es;if(l||h){let d=t.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new bc(i)),d=l?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new bc(i)),d=l?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function T0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ps("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function R0(i,t,e,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const m in u.attributes)t.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const f in u)t.update(u[f],i.ARRAY_BUFFER)}function l(d){const u=[],f=d.index,m=d.attributes.position;let _=0;if(f!==null){const M=f.array;_=f.version;for(let b=0,S=M.length;b<S;b+=3){const C=M[b+0],T=M[b+1],A=M[b+2];u.push(C,T,T,A,A,C)}}else if(m!==void 0){const M=m.array;_=m.version;for(let b=0,S=M.length/3-1;b<S;b+=3){const C=b+0,T=b+1,A=b+2;u.push(C,T,T,A,A,C)}}else return;const g=new(Zh(u)?ed:td)(u,1);g.version=_;const p=r.get(d);p&&t.remove(p),r.set(d,g)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function C0(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*a),e.update(f,n,1)}function l(u,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,u*a,m),e.update(f,n,m))}function h(u,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function d(u,f,m,_){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<u.length;p++)l(u[p]/a,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,_,0,m);let p=0;for(let M=0;M<m;M++)p+=f[M]*_[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function P0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function L0(i,t,e){const n=new WeakMap,s=new ge;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let E=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",E)};u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let b=0;f===!0&&(b=1),m===!0&&(b=2),_===!0&&(b=3);let S=o.attributes.position.count*b,C=1;S>t.maxTextureSize&&(C=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);const T=new Float32Array(S*C*4*d),A=new Jh(T,S,C,d);A.type=pn,A.needsUpdate=!0;const P=b*4;for(let y=0;y<d;y++){const D=g[y],F=p[y],k=M[y],H=S*C*4*y;for(let X=0;X<D.count;X++){const G=X*P;f===!0&&(s.fromBufferAttribute(D,X),T[H+G+0]=s.x,T[H+G+1]=s.y,T[H+G+2]=s.z,T[H+G+3]=0),m===!0&&(s.fromBufferAttribute(F,X),T[H+G+4]=s.x,T[H+G+5]=s.y,T[H+G+6]=s.z,T[H+G+7]=0),_===!0&&(s.fromBufferAttribute(k,X),T[H+G+8]=s.x,T[H+G+9]=s.y,T[H+G+10]=s.z,T[H+G+11]=k.itemSize===4?s.w:1)}}u={count:d,texture:A,size:new ht(S,C)},n.set(o,u),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];const m=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function D0(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,d=t.get(c,h);if(s.get(d)!==l&&(t.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return d}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}const md=new De,Rc=new ud(1,1),gd=new Jh,_d=new np,xd=new sd,Cc=[],Pc=[],Lc=new Float32Array(16),Dc=new Float32Array(9),Ic=new Float32Array(4);function as(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Cc[s];if(r===void 0&&(r=new Float32Array(s),Cc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Me(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Se(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Kr(i,t){let e=Pc[t];e===void 0&&(e=new Int32Array(t),Pc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function I0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function U0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2fv(this.addr,t),Se(e,t)}}function N0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;i.uniform3fv(this.addr,t),Se(e,t)}}function F0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4fv(this.addr,t),Se(e,t)}}function O0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(Me(e,n))return;Ic.set(n),i.uniformMatrix2fv(this.addr,!1,Ic),Se(e,n)}}function k0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(Me(e,n))return;Dc.set(n),i.uniformMatrix3fv(this.addr,!1,Dc),Se(e,n)}}function B0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(Me(e,n))return;Lc.set(n),i.uniformMatrix4fv(this.addr,!1,Lc),Se(e,n)}}function z0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function H0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2iv(this.addr,t),Se(e,t)}}function V0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;i.uniform3iv(this.addr,t),Se(e,t)}}function G0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4iv(this.addr,t),Se(e,t)}}function W0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function X0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2uiv(this.addr,t),Se(e,t)}}function j0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;i.uniform3uiv(this.addr,t),Se(e,t)}}function Y0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4uiv(this.addr,t),Se(e,t)}}function q0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Rc.compareFunction=$h,r=Rc):r=md,e.setTexture2D(t||r,s)}function K0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||_d,s)}function $0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||xd,s)}function Z0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||gd,s)}function J0(i){switch(i){case 5126:return I0;case 35664:return U0;case 35665:return N0;case 35666:return F0;case 35674:return O0;case 35675:return k0;case 35676:return B0;case 5124:case 35670:return z0;case 35667:case 35671:return H0;case 35668:case 35672:return V0;case 35669:case 35673:return G0;case 5125:return W0;case 36294:return X0;case 36295:return j0;case 36296:return Y0;case 35678:case 36198:case 36298:case 36306:case 35682:return q0;case 35679:case 36299:case 36307:return K0;case 35680:case 36300:case 36308:case 36293:return $0;case 36289:case 36303:case 36311:case 36292:return Z0}}function Q0(i,t){i.uniform1fv(this.addr,t)}function t_(i,t){const e=as(t,this.size,2);i.uniform2fv(this.addr,e)}function e_(i,t){const e=as(t,this.size,3);i.uniform3fv(this.addr,e)}function n_(i,t){const e=as(t,this.size,4);i.uniform4fv(this.addr,e)}function i_(i,t){const e=as(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function s_(i,t){const e=as(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function r_(i,t){const e=as(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function a_(i,t){i.uniform1iv(this.addr,t)}function o_(i,t){i.uniform2iv(this.addr,t)}function l_(i,t){i.uniform3iv(this.addr,t)}function c_(i,t){i.uniform4iv(this.addr,t)}function h_(i,t){i.uniform1uiv(this.addr,t)}function d_(i,t){i.uniform2uiv(this.addr,t)}function u_(i,t){i.uniform3uiv(this.addr,t)}function f_(i,t){i.uniform4uiv(this.addr,t)}function p_(i,t,e){const n=this.cache,s=t.length,r=Kr(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||md,r[a])}function m_(i,t,e){const n=this.cache,s=t.length,r=Kr(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||_d,r[a])}function g_(i,t,e){const n=this.cache,s=t.length,r=Kr(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||xd,r[a])}function __(i,t,e){const n=this.cache,s=t.length,r=Kr(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||gd,r[a])}function x_(i){switch(i){case 5126:return Q0;case 35664:return t_;case 35665:return e_;case 35666:return n_;case 35674:return i_;case 35675:return s_;case 35676:return r_;case 5124:case 35670:return a_;case 35667:case 35671:return o_;case 35668:case 35672:return l_;case 35669:case 35673:return c_;case 5125:return h_;case 36294:return d_;case 36295:return u_;case 36296:return f_;case 35678:case 36198:case 36298:case 36306:case 35682:return p_;case 35679:case 36299:case 36307:return m_;case 35680:case 36300:case 36308:case 36293:return g_;case 36289:case 36303:case 36311:case 36292:return __}}class v_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=J0(e.type)}}class y_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=x_(e.type)}}class M_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const La=/(\w+)(\])?(\[|\.)?/g;function Uc(i,t){i.seq.push(t),i.map[t.id]=t}function S_(i,t,e){const n=i.name,s=n.length;for(La.lastIndex=0;;){const r=La.exec(n),a=La.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Uc(e,l===void 0?new v_(o,i,t):new y_(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new M_(o),Uc(e,d)),e=d}}}class Tr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);S_(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Nc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const E_=37297;let b_=0;function w_(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Fc=new Ft;function A_(i){Xt._getMatrix(Fc,Xt.workingColorSpace,i);const t=`mat3( ${Fc.elements.map(e=>e.toFixed(4))} )`;switch(Xt.getTransfer(i)){case Br:return[t,"LinearTransferOETF"];case Jt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Oc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+w_(i.getShaderSource(t),o)}else return r}function T_(i,t){const e=A_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function R_(i,t){let e;switch(t){case pf:e="Linear";break;case mf:e="Reinhard";break;case gf:e="Cineon";break;case _f:e="ACESFilmic";break;case vf:e="AgX";break;case yf:e="Neutral";break;case xf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const yr=new R;function C_(){Xt.getLuminanceCoefficients(yr);const i=yr.x.toFixed(4),t=yr.y.toFixed(4),e=yr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function P_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ys).join(`
`)}function L_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function D_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function ys(i){return i!==""}function kc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Bc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const I_=/^[ \t]*#include +<([\w\d./]+)>/gm;function ko(i){return i.replace(I_,N_)}const U_=new Map;function N_(i,t){let e=kt[t];if(e===void 0){const n=U_.get(t);if(n!==void 0)e=kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ko(e)}const F_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zc(i){return i.replace(F_,O_)}function O_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Hc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function k_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===zh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===ju?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===bn&&(t="SHADOWMAP_TYPE_VSM"),t}function B_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ts:case es:t="ENVMAP_TYPE_CUBE";break;case jr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function z_(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===es&&(t="ENVMAP_MODE_REFRACTION"),t}function H_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Hh:t="ENVMAP_BLENDING_MULTIPLY";break;case uf:t="ENVMAP_BLENDING_MIX";break;case ff:t="ENVMAP_BLENDING_ADD";break}return t}function V_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function G_(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=k_(e),l=B_(e),h=z_(e),d=H_(e),u=V_(e),f=P_(e),m=L_(r),_=s.createProgram();let g,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ys).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ys).join(`
`),p.length>0&&(p+=`
`)):(g=[Hc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ys).join(`
`),p=[Hc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==zn?"#define TONE_MAPPING":"",e.toneMapping!==zn?kt.tonemapping_pars_fragment:"",e.toneMapping!==zn?R_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,T_("linearToOutputTexel",e.outputColorSpace),C_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ys).join(`
`)),a=ko(a),a=kc(a,e),a=Bc(a,e),o=ko(o),o=kc(o,e),o=Bc(o,e),a=zc(a),o=zc(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Hl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Hl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=M+g+a,S=M+p+o,C=Nc(s,s.VERTEX_SHADER,b),T=Nc(s,s.FRAGMENT_SHADER,S);s.attachShader(_,C),s.attachShader(_,T),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(D){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(_)||"",k=s.getShaderInfoLog(C)||"",H=s.getShaderInfoLog(T)||"",X=F.trim(),G=k.trim(),et=H.trim();let V=!0,at=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,C,T);else{const dt=Oc(s,C,"vertex"),wt=Oc(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+X+`
`+dt+`
`+wt)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(G===""||et==="")&&(at=!1);at&&(D.diagnostics={runnable:V,programLog:X,vertexShader:{log:G,prefix:g},fragmentShader:{log:et,prefix:p}})}s.deleteShader(C),s.deleteShader(T),P=new Tr(s,_),E=D_(s,_)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,E_)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=b_++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=T,this}let W_=0;class X_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new j_(t),e.set(t,n)),n}}class j_{constructor(t){this.id=W_++,this.code=t,this.usedTimes=0}}function Y_(i,t,e,n,s,r,a){const o=new rl,c=new X_,l=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function g(E,y,D,F,k){const H=F.fog,X=k.geometry,G=E.isMeshStandardMaterial?F.environment:null,et=(E.isMeshStandardMaterial?e:t).get(E.envMap||G),V=et&&et.mapping===jr?et.image.height:null,at=m[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const dt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,wt=dt!==void 0?dt.length:0;let Ht=0;X.morphAttributes.position!==void 0&&(Ht=1),X.morphAttributes.normal!==void 0&&(Ht=2),X.morphAttributes.color!==void 0&&(Ht=3);let ie,ae,jt,Y;if(at){const Yt=dn[at];ie=Yt.vertexShader,ae=Yt.fragmentShader}else ie=E.vertexShader,ae=E.fragmentShader,c.update(E),jt=c.getVertexShaderID(E),Y=c.getFragmentShaderID(E);const $=i.getRenderTarget(),pt=i.state.buffers.depth.getReversed(),Dt=k.isInstancedMesh===!0,bt=k.isBatchedMesh===!0,Gt=!!E.map,Re=!!E.matcap,L=!!et,oe=!!E.aoMap,Ut=!!E.lightMap,Pt=!!E.bumpMap,_t=!!E.normalMap,le=!!E.displacementMap,xt=!!E.emissiveMap,Ot=!!E.metalnessMap,Ee=!!E.roughnessMap,pe=E.anisotropy>0,w=E.clearcoat>0,x=E.dispersion>0,O=E.iridescence>0,j=E.sheen>0,K=E.transmission>0,W=pe&&!!E.anisotropyMap,Et=w&&!!E.clearcoatMap,nt=w&&!!E.clearcoatNormalMap,vt=w&&!!E.clearcoatRoughnessMap,yt=O&&!!E.iridescenceMap,Q=O&&!!E.iridescenceThicknessMap,ct=j&&!!E.sheenColorMap,Ct=j&&!!E.sheenRoughnessMap,Mt=!!E.specularMap,ot=!!E.specularColorMap,Nt=!!E.specularIntensityMap,I=K&&!!E.transmissionMap,tt=K&&!!E.thicknessMap,it=!!E.gradientMap,ft=!!E.alphaMap,Z=E.alphaTest>0,q=!!E.alphaHash,gt=!!E.extensions;let It=zn;E.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(It=i.toneMapping);const se={shaderID:at,shaderType:E.type,shaderName:E.name,vertexShader:ie,fragmentShader:ae,defines:E.defines,customVertexShaderID:jt,customFragmentShaderID:Y,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:bt,batchingColor:bt&&k._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&k.instanceColor!==null,instancingMorph:Dt&&k.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:$===null?i.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:ns,alphaToCoverage:!!E.alphaToCoverage,map:Gt,matcap:Re,envMap:L,envMapMode:L&&et.mapping,envMapCubeUVHeight:V,aoMap:oe,lightMap:Ut,bumpMap:Pt,normalMap:_t,displacementMap:u&&le,emissiveMap:xt,normalMapObjectSpace:_t&&E.normalMapType===wf,normalMapTangentSpace:_t&&E.normalMapType===bf,metalnessMap:Ot,roughnessMap:Ee,anisotropy:pe,anisotropyMap:W,clearcoat:w,clearcoatMap:Et,clearcoatNormalMap:nt,clearcoatRoughnessMap:vt,dispersion:x,iridescence:O,iridescenceMap:yt,iridescenceThicknessMap:Q,sheen:j,sheenColorMap:ct,sheenRoughnessMap:Ct,specularMap:Mt,specularColorMap:ot,specularIntensityMap:Nt,transmission:K,transmissionMap:I,thicknessMap:tt,gradientMap:it,opaque:E.transparent===!1&&E.blending===Yi&&E.alphaToCoverage===!1,alphaMap:ft,alphaTest:Z,alphaHash:q,combine:E.combine,mapUv:Gt&&_(E.map.channel),aoMapUv:oe&&_(E.aoMap.channel),lightMapUv:Ut&&_(E.lightMap.channel),bumpMapUv:Pt&&_(E.bumpMap.channel),normalMapUv:_t&&_(E.normalMap.channel),displacementMapUv:le&&_(E.displacementMap.channel),emissiveMapUv:xt&&_(E.emissiveMap.channel),metalnessMapUv:Ot&&_(E.metalnessMap.channel),roughnessMapUv:Ee&&_(E.roughnessMap.channel),anisotropyMapUv:W&&_(E.anisotropyMap.channel),clearcoatMapUv:Et&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:nt&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:yt&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:ct&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&_(E.sheenRoughnessMap.channel),specularMapUv:Mt&&_(E.specularMap.channel),specularColorMapUv:ot&&_(E.specularColorMap.channel),specularIntensityMapUv:Nt&&_(E.specularIntensityMap.channel),transmissionMapUv:I&&_(E.transmissionMap.channel),thicknessMapUv:tt&&_(E.thicknessMap.channel),alphaMapUv:ft&&_(E.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(_t||pe),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!X.attributes.uv&&(Gt||ft),fog:!!H,useFog:E.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pt,skinning:k.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:Ht,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:It,decodeVideoTexture:Gt&&E.map.isVideoTexture===!0&&Xt.getTransfer(E.map.colorSpace)===Jt,decodeVideoTextureEmissive:xt&&E.emissiveMap.isVideoTexture===!0&&Xt.getTransfer(E.emissiveMap.colorSpace)===Jt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Le,flipSided:E.side===Be,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:gt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&E.extensions.multiDraw===!0||bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return se.vertexUv1s=l.has(1),se.vertexUv2s=l.has(2),se.vertexUv3s=l.has(3),l.clear(),se}function p(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const D in E.defines)y.push(D),y.push(E.defines[D]);return E.isRawShaderMaterial===!1&&(M(y,E),b(y,E),y.push(i.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function M(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function b(E,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),E.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),E.push(o.mask)}function S(E){const y=m[E.type];let D;if(y){const F=dn[y];D=mp.clone(F.uniforms)}else D=E.uniforms;return D}function C(E,y){let D;for(let F=0,k=h.length;F<k;F++){const H=h[F];if(H.cacheKey===y){D=H,++D.usedTimes;break}}return D===void 0&&(D=new G_(i,y,E,r),h.push(D)),D}function T(E){if(--E.usedTimes===0){const y=h.indexOf(E);h[y]=h[h.length-1],h.pop(),E.destroy()}}function A(E){c.remove(E)}function P(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:S,acquireProgram:C,releaseProgram:T,releaseShaderCache:A,programs:h,dispose:P}}function q_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function K_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Vc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Gc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,u,f,m,_,g){let p=i[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:m,renderOrder:d.renderOrder,z:_,group:g},i[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=m,p.renderOrder=d.renderOrder,p.z=_,p.group=g),t++,p}function o(d,u,f,m,_,g){const p=a(d,u,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(d,u,f,m,_,g){const p=a(d,u,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(d,u){e.length>1&&e.sort(d||K_),n.length>1&&n.sort(u||Vc),s.length>1&&s.sort(u||Vc)}function h(){for(let d=t,u=i.length;d<u;d++){const f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function $_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Gc,i.set(n,[a])):s>=r.length?(a=new Gc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Z_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new Bt};break;case"SpotLight":e={position:new R,direction:new R,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":e={color:new Bt,position:new R,halfWidth:new R,halfHeight:new R};break}return i[t.id]=e,e}}}function J_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Q_=0;function tx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function ex(i){const t=new Z_,e=J_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new R);const s=new R,r=new te,a=new te;function o(l){let h=0,d=0,u=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,M=0,b=0,S=0,C=0,T=0,A=0;l.sort(tx);for(let E=0,y=l.length;E<y;E++){const D=l[E],F=D.color,k=D.intensity,H=D.distance,X=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=F.r*k,d+=F.g*k,u+=F.b*k;else if(D.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(D.sh.coefficients[G],k);A++}else if(D.isDirectionalLight){const G=t.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const et=D.shadow,V=e.get(D);V.shadowIntensity=et.intensity,V.shadowBias=et.bias,V.shadowNormalBias=et.normalBias,V.shadowRadius=et.radius,V.shadowMapSize=et.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=D.shadow.matrix,M++}n.directional[f]=G,f++}else if(D.isSpotLight){const G=t.get(D);G.position.setFromMatrixPosition(D.matrixWorld),G.color.copy(F).multiplyScalar(k),G.distance=H,G.coneCos=Math.cos(D.angle),G.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),G.decay=D.decay,n.spot[_]=G;const et=D.shadow;if(D.map&&(n.spotLightMap[C]=D.map,C++,et.updateMatrices(D),D.castShadow&&T++),n.spotLightMatrix[_]=et.matrix,D.castShadow){const V=e.get(D);V.shadowIntensity=et.intensity,V.shadowBias=et.bias,V.shadowNormalBias=et.normalBias,V.shadowRadius=et.radius,V.shadowMapSize=et.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=X,S++}_++}else if(D.isRectAreaLight){const G=t.get(D);G.color.copy(F).multiplyScalar(k),G.halfWidth.set(D.width*.5,0,0),G.halfHeight.set(0,D.height*.5,0),n.rectArea[g]=G,g++}else if(D.isPointLight){const G=t.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),G.distance=D.distance,G.decay=D.decay,D.castShadow){const et=D.shadow,V=e.get(D);V.shadowIntensity=et.intensity,V.shadowBias=et.bias,V.shadowNormalBias=et.normalBias,V.shadowRadius=et.radius,V.shadowMapSize=et.mapSize,V.shadowCameraNear=et.camera.near,V.shadowCameraFar=et.camera.far,n.pointShadow[m]=V,n.pointShadowMap[m]=X,n.pointShadowMatrix[m]=D.shadow.matrix,b++}n.point[m]=G,m++}else if(D.isHemisphereLight){const G=t.get(D);G.skyColor.copy(D.color).multiplyScalar(k),G.groundColor.copy(D.groundColor).multiplyScalar(k),n.hemi[p]=G,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=st.LTC_FLOAT_1,n.rectAreaLTC2=st.LTC_FLOAT_2):(n.rectAreaLTC1=st.LTC_HALF_1,n.rectAreaLTC2=st.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const P=n.hash;(P.directionalLength!==f||P.pointLength!==m||P.spotLength!==_||P.rectAreaLength!==g||P.hemiLength!==p||P.numDirectionalShadows!==M||P.numPointShadows!==b||P.numSpotShadows!==S||P.numSpotMaps!==C||P.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=S+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,P.directionalLength=f,P.pointLength=m,P.spotLength=_,P.rectAreaLength=g,P.hemiLength=p,P.numDirectionalShadows=M,P.numPointShadows=b,P.numSpotShadows=S,P.numSpotMaps=C,P.numLightProbes=A,n.version=Q_++)}function c(l,h){let d=0,u=0,f=0,m=0,_=0;const g=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const b=l[p];if(b.isDirectionalLight){const S=n.directional[d];S.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),d++}else if(b.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),f++}else if(b.isRectAreaLight){const S=n.rectArea[m];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(g),a.identity(),r.copy(b.matrixWorld),r.premultiply(g),a.extractRotation(r),S.halfWidth.set(b.width*.5,0,0),S.halfHeight.set(0,b.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),m++}else if(b.isPointLight){const S=n.point[u];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(g),u++}else if(b.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(b.matrixWorld),S.direction.transformDirection(g),_++}}}return{setup:o,setupView:c,state:n}}function Wc(i){const t=new ex(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function nx(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Wc(i),t.set(s,[o])):r>=a.length?(o=new Wc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const ix=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sx=`uniform sampler2D shadow_pass;
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
}`;function rx(i,t,e){let n=new ld;const s=new ht,r=new ht,a=new ge,o=new Cp({depthPacking:Ef}),c=new Pp,l={},h=e.maxTextureSize,d={[jn]:Be,[Be]:jn,[Le]:Le},u=new je({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ht},radius:{value:4}},vertexShader:ix,fragmentShader:sx}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const m=new qt;m.setAttribute("position",new ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ve(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zh;let p=this.type;this.render=function(T,A,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;const E=i.getRenderTarget(),y=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Bn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const k=p!==bn&&this.type===bn,H=p===bn&&this.type!==bn;for(let X=0,G=T.length;X<G;X++){const et=T[X],V=et.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const at=V.getFrameExtents();if(s.multiply(at),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/at.x),s.x=r.x*at.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/at.y),s.y=r.y*at.y,V.mapSize.y=r.y)),V.map===null||k===!0||H===!0){const wt=this.type!==bn?{minFilter:Xe,magFilter:Xe}:{};V.map!==null&&V.map.dispose(),V.map=new gi(s.x,s.y,wt),V.map.texture.name=et.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const dt=V.getViewportCount();for(let wt=0;wt<dt;wt++){const Ht=V.getViewport(wt);a.set(r.x*Ht.x,r.y*Ht.y,r.x*Ht.z,r.y*Ht.w),F.viewport(a),V.updateMatrices(et,wt),n=V.getFrustum(),S(A,P,V.camera,et,this.type)}V.isPointLightShadow!==!0&&this.type===bn&&M(V,P),V.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(E,y,D)};function M(T,A){const P=t.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new gi(s.x,s.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,P,u,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,P,f,_,null)}function b(T,A,P,E){let y=null;const D=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)y=D;else if(y=P.isPointLight===!0?c:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const F=y.uuid,k=A.uuid;let H=l[F];H===void 0&&(H={},l[F]=H);let X=H[k];X===void 0&&(X=y.clone(),H[k]=X,A.addEventListener("dispose",C)),y=X}if(y.visible=A.visible,y.wireframe=A.wireframe,E===bn?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:d[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const F=i.properties.get(y);F.light=P}return y}function S(T,A,P,E,y){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===bn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);const k=t.update(T),H=T.material;if(Array.isArray(H)){const X=k.groups;for(let G=0,et=X.length;G<et;G++){const V=X[G],at=H[V.materialIndex];if(at&&at.visible){const dt=b(T,at,E,y);T.onBeforeShadow(i,T,A,P,k,dt,V),i.renderBufferDirect(P,null,k,dt,T,V),T.onAfterShadow(i,T,A,P,k,dt,V)}}}else if(H.visible){const X=b(T,H,E,y);T.onBeforeShadow(i,T,A,P,k,X,null),i.renderBufferDirect(P,null,k,X,T,null),T.onAfterShadow(i,T,A,P,k,X,null)}}const F=T.children;for(let k=0,H=F.length;k<H;k++)S(F[k],A,P,E,y)}function C(T){T.target.removeEventListener("dispose",C);for(const P in l){const E=l[P],y=T.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}const ax={[Ka]:$a,[Za]:to,[Ja]:eo,[Qi]:Qa,[$a]:Ka,[to]:Za,[eo]:Ja,[Qa]:Qi};function ox(i,t){function e(){let I=!1;const tt=new ge;let it=null;const ft=new ge(0,0,0,0);return{setMask:function(Z){it!==Z&&!I&&(i.colorMask(Z,Z,Z,Z),it=Z)},setLocked:function(Z){I=Z},setClear:function(Z,q,gt,It,se){se===!0&&(Z*=It,q*=It,gt*=It),tt.set(Z,q,gt,It),ft.equals(tt)===!1&&(i.clearColor(Z,q,gt,It),ft.copy(tt))},reset:function(){I=!1,it=null,ft.set(-1,0,0,0)}}}function n(){let I=!1,tt=!1,it=null,ft=null,Z=null;return{setReversed:function(q){if(tt!==q){const gt=t.get("EXT_clip_control");q?gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.ZERO_TO_ONE_EXT):gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.NEGATIVE_ONE_TO_ONE_EXT),tt=q;const It=Z;Z=null,this.setClear(It)}},getReversed:function(){return tt},setTest:function(q){q?$(i.DEPTH_TEST):pt(i.DEPTH_TEST)},setMask:function(q){it!==q&&!I&&(i.depthMask(q),it=q)},setFunc:function(q){if(tt&&(q=ax[q]),ft!==q){switch(q){case Ka:i.depthFunc(i.NEVER);break;case $a:i.depthFunc(i.ALWAYS);break;case Za:i.depthFunc(i.LESS);break;case Qi:i.depthFunc(i.LEQUAL);break;case Ja:i.depthFunc(i.EQUAL);break;case Qa:i.depthFunc(i.GEQUAL);break;case to:i.depthFunc(i.GREATER);break;case eo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ft=q}},setLocked:function(q){I=q},setClear:function(q){Z!==q&&(tt&&(q=1-q),i.clearDepth(q),Z=q)},reset:function(){I=!1,it=null,ft=null,Z=null,tt=!1}}}function s(){let I=!1,tt=null,it=null,ft=null,Z=null,q=null,gt=null,It=null,se=null;return{setTest:function(Yt){I||(Yt?$(i.STENCIL_TEST):pt(i.STENCIL_TEST))},setMask:function(Yt){tt!==Yt&&!I&&(i.stencilMask(Yt),tt=Yt)},setFunc:function(Yt,_n,ln){(it!==Yt||ft!==_n||Z!==ln)&&(i.stencilFunc(Yt,_n,ln),it=Yt,ft=_n,Z=ln)},setOp:function(Yt,_n,ln){(q!==Yt||gt!==_n||It!==ln)&&(i.stencilOp(Yt,_n,ln),q=Yt,gt=_n,It=ln)},setLocked:function(Yt){I=Yt},setClear:function(Yt){se!==Yt&&(i.clearStencil(Yt),se=Yt)},reset:function(){I=!1,tt=null,it=null,ft=null,Z=null,q=null,gt=null,It=null,se=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let h={},d={},u=new WeakMap,f=[],m=null,_=!1,g=null,p=null,M=null,b=null,S=null,C=null,T=null,A=new Bt(0,0,0),P=0,E=!1,y=null,D=null,F=null,k=null,H=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,et=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(V)[1]),G=et>=1):V.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),G=et>=2);let at=null,dt={};const wt=i.getParameter(i.SCISSOR_BOX),Ht=i.getParameter(i.VIEWPORT),ie=new ge().fromArray(wt),ae=new ge().fromArray(Ht);function jt(I,tt,it,ft){const Z=new Uint8Array(4),q=i.createTexture();i.bindTexture(I,q),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let gt=0;gt<it;gt++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(tt,0,i.RGBA,1,1,ft,0,i.RGBA,i.UNSIGNED_BYTE,Z):i.texImage2D(tt+gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Z);return q}const Y={};Y[i.TEXTURE_2D]=jt(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=jt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=jt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=jt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(i.DEPTH_TEST),a.setFunc(Qi),Pt(!1),_t(Ol),$(i.CULL_FACE),oe(Bn);function $(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function pt(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Dt(I,tt){return d[I]!==tt?(i.bindFramebuffer(I,tt),d[I]=tt,I===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=tt),I===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=tt),!0):!1}function bt(I,tt){let it=f,ft=!1;if(I){it=u.get(tt),it===void 0&&(it=[],u.set(tt,it));const Z=I.textures;if(it.length!==Z.length||it[0]!==i.COLOR_ATTACHMENT0){for(let q=0,gt=Z.length;q<gt;q++)it[q]=i.COLOR_ATTACHMENT0+q;it.length=Z.length,ft=!0}}else it[0]!==i.BACK&&(it[0]=i.BACK,ft=!0);ft&&i.drawBuffers(it)}function Gt(I){return m!==I?(i.useProgram(I),m=I,!0):!1}const Re={[oi]:i.FUNC_ADD,[qu]:i.FUNC_SUBTRACT,[Ku]:i.FUNC_REVERSE_SUBTRACT};Re[$u]=i.MIN,Re[Zu]=i.MAX;const L={[Ju]:i.ZERO,[Qu]:i.ONE,[tf]:i.SRC_COLOR,[Ya]:i.SRC_ALPHA,[of]:i.SRC_ALPHA_SATURATE,[rf]:i.DST_COLOR,[nf]:i.DST_ALPHA,[ef]:i.ONE_MINUS_SRC_COLOR,[qa]:i.ONE_MINUS_SRC_ALPHA,[af]:i.ONE_MINUS_DST_COLOR,[sf]:i.ONE_MINUS_DST_ALPHA,[lf]:i.CONSTANT_COLOR,[cf]:i.ONE_MINUS_CONSTANT_COLOR,[hf]:i.CONSTANT_ALPHA,[df]:i.ONE_MINUS_CONSTANT_ALPHA};function oe(I,tt,it,ft,Z,q,gt,It,se,Yt){if(I===Bn){_===!0&&(pt(i.BLEND),_=!1);return}if(_===!1&&($(i.BLEND),_=!0),I!==Yu){if(I!==g||Yt!==E){if((p!==oi||S!==oi)&&(i.blendEquation(i.FUNC_ADD),p=oi,S=oi),Yt)switch(I){case Yi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pi:i.blendFunc(i.ONE,i.ONE);break;case kl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Bl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Yi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case kl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Bl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}M=null,b=null,C=null,T=null,A.set(0,0,0),P=0,g=I,E=Yt}return}Z=Z||tt,q=q||it,gt=gt||ft,(tt!==p||Z!==S)&&(i.blendEquationSeparate(Re[tt],Re[Z]),p=tt,S=Z),(it!==M||ft!==b||q!==C||gt!==T)&&(i.blendFuncSeparate(L[it],L[ft],L[q],L[gt]),M=it,b=ft,C=q,T=gt),(It.equals(A)===!1||se!==P)&&(i.blendColor(It.r,It.g,It.b,se),A.copy(It),P=se),g=I,E=!1}function Ut(I,tt){I.side===Le?pt(i.CULL_FACE):$(i.CULL_FACE);let it=I.side===Be;tt&&(it=!it),Pt(it),I.blending===Yi&&I.transparent===!1?oe(Bn):oe(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const ft=I.stencilWrite;o.setTest(ft),ft&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),xt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?$(i.SAMPLE_ALPHA_TO_COVERAGE):pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Pt(I){y!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),y=I)}function _t(I){I!==Wu?($(i.CULL_FACE),I!==D&&(I===Ol?i.cullFace(i.BACK):I===Xu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pt(i.CULL_FACE),D=I}function le(I){I!==F&&(G&&i.lineWidth(I),F=I)}function xt(I,tt,it){I?($(i.POLYGON_OFFSET_FILL),(k!==tt||H!==it)&&(i.polygonOffset(tt,it),k=tt,H=it)):pt(i.POLYGON_OFFSET_FILL)}function Ot(I){I?$(i.SCISSOR_TEST):pt(i.SCISSOR_TEST)}function Ee(I){I===void 0&&(I=i.TEXTURE0+X-1),at!==I&&(i.activeTexture(I),at=I)}function pe(I,tt,it){it===void 0&&(at===null?it=i.TEXTURE0+X-1:it=at);let ft=dt[it];ft===void 0&&(ft={type:void 0,texture:void 0},dt[it]=ft),(ft.type!==I||ft.texture!==tt)&&(at!==it&&(i.activeTexture(it),at=it),i.bindTexture(I,tt||Y[I]),ft.type=I,ft.texture=tt)}function w(){const I=dt[at];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function x(){try{i.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function O(){try{i.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function j(){try{i.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{i.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Et(){try{i.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function nt(){try{i.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function vt(){try{i.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function yt(){try{i.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{i.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ct(I){ie.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),ie.copy(I))}function Ct(I){ae.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),ae.copy(I))}function Mt(I,tt){let it=l.get(tt);it===void 0&&(it=new WeakMap,l.set(tt,it));let ft=it.get(I);ft===void 0&&(ft=i.getUniformBlockIndex(tt,I.name),it.set(I,ft))}function ot(I,tt){const ft=l.get(tt).get(I);c.get(tt)!==ft&&(i.uniformBlockBinding(tt,ft,I.__bindingPointIndex),c.set(tt,ft))}function Nt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},at=null,dt={},d={},u=new WeakMap,f=[],m=null,_=!1,g=null,p=null,M=null,b=null,S=null,C=null,T=null,A=new Bt(0,0,0),P=0,E=!1,y=null,D=null,F=null,k=null,H=null,ie.set(0,0,i.canvas.width,i.canvas.height),ae.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:$,disable:pt,bindFramebuffer:Dt,drawBuffers:bt,useProgram:Gt,setBlending:oe,setMaterial:Ut,setFlipSided:Pt,setCullFace:_t,setLineWidth:le,setPolygonOffset:xt,setScissorTest:Ot,activeTexture:Ee,bindTexture:pe,unbindTexture:w,compressedTexImage2D:x,compressedTexImage3D:O,texImage2D:yt,texImage3D:Q,updateUBOMapping:Mt,uniformBlockBinding:ot,texStorage2D:nt,texStorage3D:vt,texSubImage2D:j,texSubImage3D:K,compressedTexSubImage2D:W,compressedTexSubImage3D:Et,scissor:ct,viewport:Ct,reset:Nt}}function lx(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ht,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(w,x){return f?new OffscreenCanvas(w,x):Hr("canvas")}function _(w,x,O){let j=1;const K=pe(w);if((K.width>O||K.height>O)&&(j=O/Math.max(K.width,K.height)),j<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const W=Math.floor(j*K.width),Et=Math.floor(j*K.height);d===void 0&&(d=m(W,Et));const nt=x?m(W,Et):d;return nt.width=W,nt.height=Et,nt.getContext("2d").drawImage(w,0,0,W,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+W+"x"+Et+")."),nt}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),w;return w}function g(w){return w.generateMipmaps}function p(w){i.generateMipmap(w)}function M(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(w,x,O,j,K=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let W=x;if(x===i.RED&&(O===i.FLOAT&&(W=i.R32F),O===i.HALF_FLOAT&&(W=i.R16F),O===i.UNSIGNED_BYTE&&(W=i.R8)),x===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(W=i.R8UI),O===i.UNSIGNED_SHORT&&(W=i.R16UI),O===i.UNSIGNED_INT&&(W=i.R32UI),O===i.BYTE&&(W=i.R8I),O===i.SHORT&&(W=i.R16I),O===i.INT&&(W=i.R32I)),x===i.RG&&(O===i.FLOAT&&(W=i.RG32F),O===i.HALF_FLOAT&&(W=i.RG16F),O===i.UNSIGNED_BYTE&&(W=i.RG8)),x===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(W=i.RG8UI),O===i.UNSIGNED_SHORT&&(W=i.RG16UI),O===i.UNSIGNED_INT&&(W=i.RG32UI),O===i.BYTE&&(W=i.RG8I),O===i.SHORT&&(W=i.RG16I),O===i.INT&&(W=i.RG32I)),x===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(W=i.RGB8UI),O===i.UNSIGNED_SHORT&&(W=i.RGB16UI),O===i.UNSIGNED_INT&&(W=i.RGB32UI),O===i.BYTE&&(W=i.RGB8I),O===i.SHORT&&(W=i.RGB16I),O===i.INT&&(W=i.RGB32I)),x===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),O===i.UNSIGNED_INT&&(W=i.RGBA32UI),O===i.BYTE&&(W=i.RGBA8I),O===i.SHORT&&(W=i.RGBA16I),O===i.INT&&(W=i.RGBA32I)),x===i.RGB&&(O===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(W=i.R11F_G11F_B10F)),x===i.RGBA){const Et=K?Br:Xt.getTransfer(j);O===i.FLOAT&&(W=i.RGBA32F),O===i.HALF_FLOAT&&(W=i.RGBA16F),O===i.UNSIGNED_BYTE&&(W=Et===Jt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&t.get("EXT_color_buffer_float"),W}function S(w,x){let O;return w?x===null||x===mi||x===As?O=i.DEPTH24_STENCIL8:x===pn?O=i.DEPTH32F_STENCIL8:x===ws&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===mi||x===As?O=i.DEPTH_COMPONENT24:x===pn?O=i.DEPTH_COMPONENT32F:x===ws&&(O=i.DEPTH_COMPONENT16),O}function C(w,x){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==Xe&&w.minFilter!==fn?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function T(w){const x=w.target;x.removeEventListener("dispose",T),P(x),x.isVideoTexture&&h.delete(x)}function A(w){const x=w.target;x.removeEventListener("dispose",A),y(x)}function P(w){const x=n.get(w);if(x.__webglInit===void 0)return;const O=w.source,j=u.get(O);if(j){const K=j[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&E(w),Object.keys(j).length===0&&u.delete(O)}n.remove(w)}function E(w){const x=n.get(w);i.deleteTexture(x.__webglTexture);const O=w.source,j=u.get(O);delete j[x.__cacheKey],a.memory.textures--}function y(w){const x=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(x.__webglFramebuffer[j]))for(let K=0;K<x.__webglFramebuffer[j].length;K++)i.deleteFramebuffer(x.__webglFramebuffer[j][K]);else i.deleteFramebuffer(x.__webglFramebuffer[j]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[j])}else{if(Array.isArray(x.__webglFramebuffer))for(let j=0;j<x.__webglFramebuffer.length;j++)i.deleteFramebuffer(x.__webglFramebuffer[j]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let j=0;j<x.__webglColorRenderbuffer.length;j++)x.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[j]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const O=w.textures;for(let j=0,K=O.length;j<K;j++){const W=n.get(O[j]);W.__webglTexture&&(i.deleteTexture(W.__webglTexture),a.memory.textures--),n.remove(O[j])}n.remove(w)}let D=0;function F(){D=0}function k(){const w=D;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),D+=1,w}function H(w){const x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function X(w,x){const O=n.get(w);if(w.isVideoTexture&&Ot(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&O.__version!==w.version){const j=w.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(O,w,x);return}}else w.isExternalTexture&&(O.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+x)}function G(w,x){const O=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){Y(O,w,x);return}e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+x)}function et(w,x){const O=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){Y(O,w,x);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+x)}function V(w,x){const O=n.get(w);if(w.version>0&&O.__version!==w.version){$(O,w,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+x)}const at={[so]:i.REPEAT,[di]:i.CLAMP_TO_EDGE,[ro]:i.MIRRORED_REPEAT},dt={[Xe]:i.NEAREST,[Mf]:i.NEAREST_MIPMAP_NEAREST,[Gs]:i.NEAREST_MIPMAP_LINEAR,[fn]:i.LINEAR,[Qr]:i.LINEAR_MIPMAP_NEAREST,[ui]:i.LINEAR_MIPMAP_LINEAR},wt={[Af]:i.NEVER,[Df]:i.ALWAYS,[Tf]:i.LESS,[$h]:i.LEQUAL,[Rf]:i.EQUAL,[Lf]:i.GEQUAL,[Cf]:i.GREATER,[Pf]:i.NOTEQUAL};function Ht(w,x){if(x.type===pn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===fn||x.magFilter===Qr||x.magFilter===Gs||x.magFilter===ui||x.minFilter===fn||x.minFilter===Qr||x.minFilter===Gs||x.minFilter===ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,at[x.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,at[x.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,at[x.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,dt[x.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,dt[x.minFilter]),x.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,wt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Xe||x.minFilter!==Gs&&x.minFilter!==ui||x.type===pn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function ie(w,x){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",T));const j=x.source;let K=u.get(j);K===void 0&&(K={},u.set(j,K));const W=H(x);if(W!==w.__cacheKey){K[W]===void 0&&(K[W]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),K[W].usedTimes++;const Et=K[w.__cacheKey];Et!==void 0&&(K[w.__cacheKey].usedTimes--,Et.usedTimes===0&&E(x)),w.__cacheKey=W,w.__webglTexture=K[W].texture}return O}function ae(w,x,O){return Math.floor(Math.floor(w/O)/x)}function jt(w,x,O,j){const W=w.updateRanges;if(W.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,O,j,x.data);else{W.sort((Q,ct)=>Q.start-ct.start);let Et=0;for(let Q=1;Q<W.length;Q++){const ct=W[Et],Ct=W[Q],Mt=ct.start+ct.count,ot=ae(Ct.start,x.width,4),Nt=ae(ct.start,x.width,4);Ct.start<=Mt+1&&ot===Nt&&ae(Ct.start+Ct.count-1,x.width,4)===ot?ct.count=Math.max(ct.count,Ct.start+Ct.count-ct.start):(++Et,W[Et]=Ct)}W.length=Et+1;const nt=i.getParameter(i.UNPACK_ROW_LENGTH),vt=i.getParameter(i.UNPACK_SKIP_PIXELS),yt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Q=0,ct=W.length;Q<ct;Q++){const Ct=W[Q],Mt=Math.floor(Ct.start/4),ot=Math.ceil(Ct.count/4),Nt=Mt%x.width,I=Math.floor(Mt/x.width),tt=ot,it=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Nt),i.pixelStorei(i.UNPACK_SKIP_ROWS,I),e.texSubImage2D(i.TEXTURE_2D,0,Nt,I,tt,it,O,j,x.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,nt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,vt),i.pixelStorei(i.UNPACK_SKIP_ROWS,yt)}}function Y(w,x,O){let j=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(j=i.TEXTURE_3D);const K=ie(w,x),W=x.source;e.bindTexture(j,w.__webglTexture,i.TEXTURE0+O);const Et=n.get(W);if(W.version!==Et.__version||K===!0){e.activeTexture(i.TEXTURE0+O);const nt=Xt.getPrimaries(Xt.workingColorSpace),vt=x.colorSpace===On?null:Xt.getPrimaries(x.colorSpace),yt=x.colorSpace===On||nt===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);let Q=_(x.image,!1,s.maxTextureSize);Q=Ee(x,Q);const ct=r.convert(x.format,x.colorSpace),Ct=r.convert(x.type);let Mt=b(x.internalFormat,ct,Ct,x.colorSpace,x.isVideoTexture);Ht(j,x);let ot;const Nt=x.mipmaps,I=x.isVideoTexture!==!0,tt=Et.__version===void 0||K===!0,it=W.dataReady,ft=C(x,Q);if(x.isDepthTexture)Mt=S(x.format===Rs,x.type),tt&&(I?e.texStorage2D(i.TEXTURE_2D,1,Mt,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,Mt,Q.width,Q.height,0,ct,Ct,null));else if(x.isDataTexture)if(Nt.length>0){I&&tt&&e.texStorage2D(i.TEXTURE_2D,ft,Mt,Nt[0].width,Nt[0].height);for(let Z=0,q=Nt.length;Z<q;Z++)ot=Nt[Z],I?it&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,ot.width,ot.height,ct,Ct,ot.data):e.texImage2D(i.TEXTURE_2D,Z,Mt,ot.width,ot.height,0,ct,Ct,ot.data);x.generateMipmaps=!1}else I?(tt&&e.texStorage2D(i.TEXTURE_2D,ft,Mt,Q.width,Q.height),it&&jt(x,Q,ct,Ct)):e.texImage2D(i.TEXTURE_2D,0,Mt,Q.width,Q.height,0,ct,Ct,Q.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){I&&tt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,Mt,Nt[0].width,Nt[0].height,Q.depth);for(let Z=0,q=Nt.length;Z<q;Z++)if(ot=Nt[Z],x.format!==an)if(ct!==null)if(I){if(it)if(x.layerUpdates.size>0){const gt=yc(ot.width,ot.height,x.format,x.type);for(const It of x.layerUpdates){const se=ot.data.subarray(It*gt/ot.data.BYTES_PER_ELEMENT,(It+1)*gt/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,It,ot.width,ot.height,1,ct,se)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,ot.width,ot.height,Q.depth,ct,ot.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Z,Mt,ot.width,ot.height,Q.depth,0,ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?it&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,ot.width,ot.height,Q.depth,ct,Ct,ot.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Z,Mt,ot.width,ot.height,Q.depth,0,ct,Ct,ot.data)}else{I&&tt&&e.texStorage2D(i.TEXTURE_2D,ft,Mt,Nt[0].width,Nt[0].height);for(let Z=0,q=Nt.length;Z<q;Z++)ot=Nt[Z],x.format!==an?ct!==null?I?it&&e.compressedTexSubImage2D(i.TEXTURE_2D,Z,0,0,ot.width,ot.height,ct,ot.data):e.compressedTexImage2D(i.TEXTURE_2D,Z,Mt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?it&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,ot.width,ot.height,ct,Ct,ot.data):e.texImage2D(i.TEXTURE_2D,Z,Mt,ot.width,ot.height,0,ct,Ct,ot.data)}else if(x.isDataArrayTexture)if(I){if(tt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,Mt,Q.width,Q.height,Q.depth),it)if(x.layerUpdates.size>0){const Z=yc(Q.width,Q.height,x.format,x.type);for(const q of x.layerUpdates){const gt=Q.data.subarray(q*Z/Q.data.BYTES_PER_ELEMENT,(q+1)*Z/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,q,Q.width,Q.height,1,ct,Ct,gt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ct,Ct,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Mt,Q.width,Q.height,Q.depth,0,ct,Ct,Q.data);else if(x.isData3DTexture)I?(tt&&e.texStorage3D(i.TEXTURE_3D,ft,Mt,Q.width,Q.height,Q.depth),it&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ct,Ct,Q.data)):e.texImage3D(i.TEXTURE_3D,0,Mt,Q.width,Q.height,Q.depth,0,ct,Ct,Q.data);else if(x.isFramebufferTexture){if(tt)if(I)e.texStorage2D(i.TEXTURE_2D,ft,Mt,Q.width,Q.height);else{let Z=Q.width,q=Q.height;for(let gt=0;gt<ft;gt++)e.texImage2D(i.TEXTURE_2D,gt,Mt,Z,q,0,ct,Ct,null),Z>>=1,q>>=1}}else if(Nt.length>0){if(I&&tt){const Z=pe(Nt[0]);e.texStorage2D(i.TEXTURE_2D,ft,Mt,Z.width,Z.height)}for(let Z=0,q=Nt.length;Z<q;Z++)ot=Nt[Z],I?it&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,ct,Ct,ot):e.texImage2D(i.TEXTURE_2D,Z,Mt,ct,Ct,ot);x.generateMipmaps=!1}else if(I){if(tt){const Z=pe(Q);e.texStorage2D(i.TEXTURE_2D,ft,Mt,Z.width,Z.height)}it&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ct,Ct,Q)}else e.texImage2D(i.TEXTURE_2D,0,Mt,ct,Ct,Q);g(x)&&p(j),Et.__version=W.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function $(w,x,O){if(x.image.length!==6)return;const j=ie(w,x),K=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+O);const W=n.get(K);if(K.version!==W.__version||j===!0){e.activeTexture(i.TEXTURE0+O);const Et=Xt.getPrimaries(Xt.workingColorSpace),nt=x.colorSpace===On?null:Xt.getPrimaries(x.colorSpace),vt=x.colorSpace===On||Et===nt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);const yt=x.isCompressedTexture||x.image[0].isCompressedTexture,Q=x.image[0]&&x.image[0].isDataTexture,ct=[];for(let q=0;q<6;q++)!yt&&!Q?ct[q]=_(x.image[q],!0,s.maxCubemapSize):ct[q]=Q?x.image[q].image:x.image[q],ct[q]=Ee(x,ct[q]);const Ct=ct[0],Mt=r.convert(x.format,x.colorSpace),ot=r.convert(x.type),Nt=b(x.internalFormat,Mt,ot,x.colorSpace),I=x.isVideoTexture!==!0,tt=W.__version===void 0||j===!0,it=K.dataReady;let ft=C(x,Ct);Ht(i.TEXTURE_CUBE_MAP,x);let Z;if(yt){I&&tt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Nt,Ct.width,Ct.height);for(let q=0;q<6;q++){Z=ct[q].mipmaps;for(let gt=0;gt<Z.length;gt++){const It=Z[gt];x.format!==an?Mt!==null?I?it&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt,0,0,It.width,It.height,Mt,It.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt,Nt,It.width,It.height,0,It.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt,0,0,It.width,It.height,Mt,ot,It.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt,Nt,It.width,It.height,0,Mt,ot,It.data)}}}else{if(Z=x.mipmaps,I&&tt){Z.length>0&&ft++;const q=pe(ct[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Nt,q.width,q.height)}for(let q=0;q<6;q++)if(Q){I?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ct[q].width,ct[q].height,Mt,ot,ct[q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Nt,ct[q].width,ct[q].height,0,Mt,ot,ct[q].data);for(let gt=0;gt<Z.length;gt++){const se=Z[gt].image[q].image;I?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt+1,0,0,se.width,se.height,Mt,ot,se.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt+1,Nt,se.width,se.height,0,Mt,ot,se.data)}}else{I?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Mt,ot,ct[q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Nt,Mt,ot,ct[q]);for(let gt=0;gt<Z.length;gt++){const It=Z[gt];I?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt+1,0,0,Mt,ot,It.image[q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt+1,Nt,Mt,ot,It.image[q])}}}g(x)&&p(i.TEXTURE_CUBE_MAP),W.__version=K.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function pt(w,x,O,j,K,W){const Et=r.convert(O.format,O.colorSpace),nt=r.convert(O.type),vt=b(O.internalFormat,Et,nt,O.colorSpace),yt=n.get(x),Q=n.get(O);if(Q.__renderTarget=x,!yt.__hasExternalTextures){const ct=Math.max(1,x.width>>W),Ct=Math.max(1,x.height>>W);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,W,vt,ct,Ct,x.depth,0,Et,nt,null):e.texImage2D(K,W,vt,ct,Ct,0,Et,nt,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),xt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,K,Q.__webglTexture,0,le(x)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,K,Q.__webglTexture,W),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(w,x,O){if(i.bindRenderbuffer(i.RENDERBUFFER,w),x.depthBuffer){const j=x.depthTexture,K=j&&j.isDepthTexture?j.type:null,W=S(x.stencilBuffer,K),Et=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,nt=le(x);xt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,nt,W,x.width,x.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,nt,W,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,W,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Et,i.RENDERBUFFER,w)}else{const j=x.textures;for(let K=0;K<j.length;K++){const W=j[K],Et=r.convert(W.format,W.colorSpace),nt=r.convert(W.type),vt=b(W.internalFormat,Et,nt,W.colorSpace),yt=le(x);O&&xt(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt,vt,x.width,x.height):xt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt,vt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,vt,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function bt(w,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(x.depthTexture);j.__renderTarget=x,(!j.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),X(x.depthTexture,0);const K=j.__webglTexture,W=le(x);if(x.depthTexture.format===Ts)xt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(x.depthTexture.format===Rs)xt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Gt(w){const x=n.get(w),O=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){const j=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),j){const K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,j.removeEventListener("dispose",K)};j.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=j}if(w.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");const j=w.texture.mipmaps;j&&j.length>0?bt(x.__webglFramebuffer[0],w):bt(x.__webglFramebuffer,w)}else if(O){x.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[j]),x.__webglDepthbuffer[j]===void 0)x.__webglDepthbuffer[j]=i.createRenderbuffer(),Dt(x.__webglDepthbuffer[j],w,!1);else{const K=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=x.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,W)}}else{const j=w.texture.mipmaps;if(j&&j.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Dt(x.__webglDepthbuffer,w,!1);else{const K=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,W)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Re(w,x,O){const j=n.get(w);x!==void 0&&pt(j.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Gt(w)}function L(w){const x=w.texture,O=n.get(w),j=n.get(x);w.addEventListener("dispose",A);const K=w.textures,W=w.isWebGLCubeRenderTarget===!0,Et=K.length>1;if(Et||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=x.version,a.memory.textures++),W){O.__webglFramebuffer=[];for(let nt=0;nt<6;nt++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[nt]=[];for(let vt=0;vt<x.mipmaps.length;vt++)O.__webglFramebuffer[nt][vt]=i.createFramebuffer()}else O.__webglFramebuffer[nt]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let nt=0;nt<x.mipmaps.length;nt++)O.__webglFramebuffer[nt]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(Et)for(let nt=0,vt=K.length;nt<vt;nt++){const yt=n.get(K[nt]);yt.__webglTexture===void 0&&(yt.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&xt(w)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let nt=0;nt<K.length;nt++){const vt=K[nt];O.__webglColorRenderbuffer[nt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[nt]);const yt=r.convert(vt.format,vt.colorSpace),Q=r.convert(vt.type),ct=b(vt.internalFormat,yt,Q,vt.colorSpace,w.isXRRenderTarget===!0),Ct=le(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ct,ct,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+nt,i.RENDERBUFFER,O.__webglColorRenderbuffer[nt])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Dt(O.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(W){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),Ht(i.TEXTURE_CUBE_MAP,x);for(let nt=0;nt<6;nt++)if(x.mipmaps&&x.mipmaps.length>0)for(let vt=0;vt<x.mipmaps.length;vt++)pt(O.__webglFramebuffer[nt][vt],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,vt);else pt(O.__webglFramebuffer[nt],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0);g(x)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let nt=0,vt=K.length;nt<vt;nt++){const yt=K[nt],Q=n.get(yt);let ct=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ct=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,Q.__webglTexture),Ht(ct,yt),pt(O.__webglFramebuffer,w,yt,i.COLOR_ATTACHMENT0+nt,ct,0),g(yt)&&p(ct)}e.unbindTexture()}else{let nt=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(nt=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(nt,j.__webglTexture),Ht(nt,x),x.mipmaps&&x.mipmaps.length>0)for(let vt=0;vt<x.mipmaps.length;vt++)pt(O.__webglFramebuffer[vt],w,x,i.COLOR_ATTACHMENT0,nt,vt);else pt(O.__webglFramebuffer,w,x,i.COLOR_ATTACHMENT0,nt,0);g(x)&&p(nt),e.unbindTexture()}w.depthBuffer&&Gt(w)}function oe(w){const x=w.textures;for(let O=0,j=x.length;O<j;O++){const K=x[O];if(g(K)){const W=M(w),Et=n.get(K).__webglTexture;e.bindTexture(W,Et),p(W),e.unbindTexture()}}}const Ut=[],Pt=[];function _t(w){if(w.samples>0){if(xt(w)===!1){const x=w.textures,O=w.width,j=w.height;let K=i.COLOR_BUFFER_BIT;const W=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Et=n.get(w),nt=x.length>1;if(nt)for(let yt=0;yt<x.length;yt++)e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer);const vt=w.texture.mipmaps;vt&&vt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let yt=0;yt<x.length;yt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),nt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Et.__webglColorRenderbuffer[yt]);const Q=n.get(x[yt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Q,0)}i.blitFramebuffer(0,0,O,j,0,0,O,j,K,i.NEAREST),c===!0&&(Ut.length=0,Pt.length=0,Ut.push(i.COLOR_ATTACHMENT0+yt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Ut.push(W),Pt.push(W),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Pt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ut))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),nt)for(let yt=0;yt<x.length;yt++){e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,Et.__webglColorRenderbuffer[yt]);const Q=n.get(x[yt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,Q,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const x=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function le(w){return Math.min(s.maxSamples,w.samples)}function xt(w){const x=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Ot(w){const x=a.render.frame;h.get(w)!==x&&(h.set(w,x),w.update())}function Ee(w,x){const O=w.colorSpace,j=w.format,K=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||O!==ns&&O!==On&&(Xt.getTransfer(O)===Jt?(j!==an||K!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}function pe(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=F,this.setTexture2D=X,this.setTexture2DArray=G,this.setTexture3D=et,this.setTextureCube=V,this.rebindTextures=Re,this.setupRenderTarget=L,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=_t,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=xt}function cx(i,t){function e(n,s=On){let r;const a=Xt.getTransfer(s);if(n===Cn)return i.UNSIGNED_BYTE;if(n===Zo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Jo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Xh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===jh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Gh)return i.BYTE;if(n===Wh)return i.SHORT;if(n===ws)return i.UNSIGNED_SHORT;if(n===$o)return i.INT;if(n===mi)return i.UNSIGNED_INT;if(n===pn)return i.FLOAT;if(n===Os)return i.HALF_FLOAT;if(n===Yh)return i.ALPHA;if(n===qh)return i.RGB;if(n===an)return i.RGBA;if(n===Ts)return i.DEPTH_COMPONENT;if(n===Rs)return i.DEPTH_STENCIL;if(n===Qo)return i.RED;if(n===tl)return i.RED_INTEGER;if(n===Kh)return i.RG;if(n===el)return i.RG_INTEGER;if(n===nl)return i.RGBA_INTEGER;if(n===Er||n===br||n===wr||n===Ar)if(a===Jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Er)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Er)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ar)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ao||n===oo||n===lo||n===co)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ao)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===oo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===lo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===co)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ho||n===uo||n===fo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ho||n===uo)return a===Jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===fo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===po||n===mo||n===go||n===_o||n===xo||n===vo||n===yo||n===Mo||n===So||n===Eo||n===bo||n===wo||n===Ao||n===To)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===po)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===mo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===go)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_o)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===xo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===vo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===yo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Mo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===So)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Eo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===bo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===wo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ao)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===To)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ro||n===Co||n===Po)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ro)return a===Jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Co)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Po)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Lo||n===Do||n===Io||n===Uo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Lo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Do)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Io)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Uo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===As?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const hx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dx=`
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

}`;class ux{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new fd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new je({vertexShader:hx,fragmentShader:dx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ve(new rs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fx extends xi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,m=null;const _=typeof XRWebGLBinding<"u",g=new ux,p={},M=e.getContextAttributes();let b=null,S=null;const C=[],T=[],A=new ht;let P=null;const E=new Je;E.viewport=new ge;const y=new Je;y.viewport=new ge;const D=[E,y],F=new Dp;let k=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let $=C[Y];return $===void 0&&($=new Ma,C[Y]=$),$.getTargetRaySpace()},this.getControllerGrip=function(Y){let $=C[Y];return $===void 0&&($=new Ma,C[Y]=$),$.getGripSpace()},this.getHand=function(Y){let $=C[Y];return $===void 0&&($=new Ma,C[Y]=$),$.getHandSpace()};function X(Y){const $=T.indexOf(Y.inputSource);if($===-1)return;const pt=C[$];pt!==void 0&&(pt.update(Y.inputSource,Y.frame,l||a),pt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function G(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",et);for(let Y=0;Y<C.length;Y++){const $=T[Y];$!==null&&(T[Y]=null,C[Y].disconnect($))}k=null,H=null,g.reset();for(const Y in p)delete p[Y];t.setRenderTarget(b),f=null,u=null,d=null,s=null,S=null,jt.stop(),n.isPresenting=!1,t.setPixelRatio(P),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",G),s.addEventListener("inputsourceschange",et),M.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Dt=null,bt=null;M.depth&&(bt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=M.stencil?Rs:Ts,Dt=M.stencil?As:mi);const Gt={colorFormat:e.RGBA8,depthFormat:bt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Gt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),S=new gi(u.textureWidth,u.textureHeight,{format:an,type:Cn,depthTexture:new ud(u.textureWidth,u.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const pt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,pt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new gi(f.framebufferWidth,f.framebufferHeight,{format:an,type:Cn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),jt.setContext(s),jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function et(Y){for(let $=0;$<Y.removed.length;$++){const pt=Y.removed[$],Dt=T.indexOf(pt);Dt>=0&&(T[Dt]=null,C[Dt].disconnect(pt))}for(let $=0;$<Y.added.length;$++){const pt=Y.added[$];let Dt=T.indexOf(pt);if(Dt===-1){for(let Gt=0;Gt<C.length;Gt++)if(Gt>=T.length){T.push(pt),Dt=Gt;break}else if(T[Gt]===null){T[Gt]=pt,Dt=Gt;break}if(Dt===-1)break}const bt=C[Dt];bt&&bt.connect(pt)}}const V=new R,at=new R;function dt(Y,$,pt){V.setFromMatrixPosition($.matrixWorld),at.setFromMatrixPosition(pt.matrixWorld);const Dt=V.distanceTo(at),bt=$.projectionMatrix.elements,Gt=pt.projectionMatrix.elements,Re=bt[14]/(bt[10]-1),L=bt[14]/(bt[10]+1),oe=(bt[9]+1)/bt[5],Ut=(bt[9]-1)/bt[5],Pt=(bt[8]-1)/bt[0],_t=(Gt[8]+1)/Gt[0],le=Re*Pt,xt=Re*_t,Ot=Dt/(-Pt+_t),Ee=Ot*-Pt;if($.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ee),Y.translateZ(Ot),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),bt[10]===-1)Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const pe=Re+Ot,w=L+Ot,x=le-Ee,O=xt+(Dt-Ee),j=oe*L/w*pe,K=Ut*L/w*pe;Y.projectionMatrix.makePerspective(x,O,j,K,pe,w),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function wt(Y,$){$===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices($.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let $=Y.near,pt=Y.far;g.texture!==null&&(g.depthNear>0&&($=g.depthNear),g.depthFar>0&&(pt=g.depthFar)),F.near=y.near=E.near=$,F.far=y.far=E.far=pt,(k!==F.near||H!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),k=F.near,H=F.far),F.layers.mask=Y.layers.mask|6,E.layers.mask=F.layers.mask&3,y.layers.mask=F.layers.mask&5;const Dt=Y.parent,bt=F.cameras;wt(F,Dt);for(let Gt=0;Gt<bt.length;Gt++)wt(bt[Gt],Dt);bt.length===2?dt(F,E,y):F.projectionMatrix.copy(E.projectionMatrix),Ht(Y,F,Dt)};function Ht(Y,$,pt){pt===null?Y.matrix.copy($.matrixWorld):(Y.matrix.copy(pt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply($.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Cs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(Y){c=Y,u!==null&&(u.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(Y){return p[Y]};let ie=null;function ae(Y,$){if(h=$.getViewerPose(l||a),m=$,h!==null){const pt=h.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let Dt=!1;pt.length!==F.cameras.length&&(F.cameras.length=0,Dt=!0);for(let L=0;L<pt.length;L++){const oe=pt[L];let Ut=null;if(f!==null)Ut=f.getViewport(oe);else{const _t=d.getViewSubImage(u,oe);Ut=_t.viewport,L===0&&(t.setRenderTargetTextures(S,_t.colorTexture,_t.depthStencilTexture),t.setRenderTarget(S))}let Pt=D[L];Pt===void 0&&(Pt=new Je,Pt.layers.enable(L),Pt.viewport=new ge,D[L]=Pt),Pt.matrix.fromArray(oe.transform.matrix),Pt.matrix.decompose(Pt.position,Pt.quaternion,Pt.scale),Pt.projectionMatrix.fromArray(oe.projectionMatrix),Pt.projectionMatrixInverse.copy(Pt.projectionMatrix).invert(),Pt.viewport.set(Ut.x,Ut.y,Ut.width,Ut.height),L===0&&(F.matrix.copy(Pt.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Dt===!0&&F.cameras.push(Pt)}const bt=s.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=n.getBinding();const L=d.getDepthInformation(pt[0]);L&&L.isValid&&L.texture&&g.init(L,s.renderState)}if(bt&&bt.includes("camera-access")&&_){t.state.unbindTexture(),d=n.getBinding();for(let L=0;L<pt.length;L++){const oe=pt[L].camera;if(oe){let Ut=p[oe];Ut||(Ut=new fd,p[oe]=Ut);const Pt=d.getCameraImage(oe);Ut.sourceTexture=Pt}}}}for(let pt=0;pt<C.length;pt++){const Dt=T[pt],bt=C[pt];Dt!==null&&bt!==void 0&&bt.update(Dt,$,l||a)}ie&&ie(Y,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),m=null}const jt=new pd;jt.setAnimationLoop(ae),this.setAnimationLoop=function(Y){ie=Y},this.dispose=function(){}}}const si=new Pn,px=new te;function mx(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,nd(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,M,b,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,S)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,M,b):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Be&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Be&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const M=t.get(p),b=M.envMap,S=M.envMapRotation;b&&(g.envMap.value=b,si.copy(S),si.x*=-1,si.y*=-1,si.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),g.envMapRotation.value.setFromMatrix4(px.makeRotationFromEuler(si)),g.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,M,b){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*M,g.scale.value=b*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,M){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Be&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const M=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function gx(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,b){const S=b.program;n.uniformBlockBinding(M,S)}function l(M,b){let S=s[M.id];S===void 0&&(m(M),S=h(M),s[M.id]=S,M.addEventListener("dispose",g));const C=b.program;n.updateUBOMapping(M,C);const T=t.render.frame;r[M.id]!==T&&(u(M),r[M.id]=T)}function h(M){const b=d();M.__bindingPointIndex=b;const S=i.createBuffer(),C=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,C,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,S),S}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const b=s[M.id],S=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let T=0,A=S.length;T<A;T++){const P=Array.isArray(S[T])?S[T]:[S[T]];for(let E=0,y=P.length;E<y;E++){const D=P[E];if(f(D,T,E,C)===!0){const F=D.__offset,k=Array.isArray(D.value)?D.value:[D.value];let H=0;for(let X=0;X<k.length;X++){const G=k[X],et=_(G);typeof G=="number"||typeof G=="boolean"?(D.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,F+H,D.__data)):G.isMatrix3?(D.__data[0]=G.elements[0],D.__data[1]=G.elements[1],D.__data[2]=G.elements[2],D.__data[3]=0,D.__data[4]=G.elements[3],D.__data[5]=G.elements[4],D.__data[6]=G.elements[5],D.__data[7]=0,D.__data[8]=G.elements[6],D.__data[9]=G.elements[7],D.__data[10]=G.elements[8],D.__data[11]=0):(G.toArray(D.__data,H),H+=et.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,b,S,C){const T=M.value,A=b+"_"+S;if(C[A]===void 0)return typeof T=="number"||typeof T=="boolean"?C[A]=T:C[A]=T.clone(),!0;{const P=C[A];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return C[A]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function m(M){const b=M.uniforms;let S=0;const C=16;for(let A=0,P=b.length;A<P;A++){const E=Array.isArray(b[A])?b[A]:[b[A]];for(let y=0,D=E.length;y<D;y++){const F=E[y],k=Array.isArray(F.value)?F.value:[F.value];for(let H=0,X=k.length;H<X;H++){const G=k[H],et=_(G),V=S%C,at=V%et.boundary,dt=V+at;S+=at,dt!==0&&C-dt<et.storage&&(S+=C-dt),F.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=S,S+=et.storage}}}const T=S%C;return T>0&&(S+=C-T),M.__size=S,M.__cache={},this}function _(M){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),b}function g(M){const b=M.target;b.removeEventListener("dispose",g);const S=a.indexOf(b.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}class _x{constructor(t={}){const{canvas:e=Kf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const M=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let C=!1;this._outputColorSpace=Ze;let T=0,A=0,P=null,E=-1,y=null;const D=new ge,F=new ge;let k=null;const H=new Bt(0);let X=0,G=e.width,et=e.height,V=1,at=null,dt=null;const wt=new ge(0,0,G,et),Ht=new ge(0,0,G,et);let ie=!1;const ae=new ld;let jt=!1,Y=!1;const $=new te,pt=new R,Dt=new ge,bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function Re(){return P===null?V:1}let L=n;function oe(v,U){return e.getContext(v,U)}try{const v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ko}`),e.addEventListener("webglcontextlost",it,!1),e.addEventListener("webglcontextrestored",ft,!1),e.addEventListener("webglcontextcreationerror",Z,!1),L===null){const U="webgl2";if(L=oe(U,v),L===null)throw oe(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Ut,Pt,_t,le,xt,Ot,Ee,pe,w,x,O,j,K,W,Et,nt,vt,yt,Q,ct,Ct,Mt,ot,Nt;function I(){Ut=new T0(L),Ut.init(),Mt=new cx(L,Ut),Pt=new y0(L,Ut,t,Mt),_t=new ox(L,Ut),Pt.reversedDepthBuffer&&u&&_t.buffers.depth.setReversed(!0),le=new P0(L),xt=new q_,Ot=new lx(L,Ut,_t,xt,Pt,Mt,le),Ee=new S0(S),pe=new A0(S),w=new Fp(L),ot=new x0(L,w),x=new R0(L,w,le,ot),O=new D0(L,x,w,le),Q=new L0(L,Pt,Ot),nt=new M0(xt),j=new Y_(S,Ee,pe,Ut,Pt,ot,nt),K=new mx(S,xt),W=new $_,Et=new nx(Ut),yt=new _0(S,Ee,pe,_t,O,f,c),vt=new rx(S,O,Pt),Nt=new gx(L,le,Pt,_t),ct=new v0(L,Ut,le),Ct=new C0(L,Ut,le),le.programs=j.programs,S.capabilities=Pt,S.extensions=Ut,S.properties=xt,S.renderLists=W,S.shadowMap=vt,S.state=_t,S.info=le}I();const tt=new fx(S,L);this.xr=tt,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const v=Ut.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Ut.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(v){v!==void 0&&(V=v,this.setSize(G,et,!1))},this.getSize=function(v){return v.set(G,et)},this.setSize=function(v,U,B=!0){if(tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=v,et=U,e.width=Math.floor(v*V),e.height=Math.floor(U*V),B===!0&&(e.style.width=v+"px",e.style.height=U+"px"),this.setViewport(0,0,v,U)},this.getDrawingBufferSize=function(v){return v.set(G*V,et*V).floor()},this.setDrawingBufferSize=function(v,U,B){G=v,et=U,V=B,e.width=Math.floor(v*B),e.height=Math.floor(U*B),this.setViewport(0,0,v,U)},this.getCurrentViewport=function(v){return v.copy(D)},this.getViewport=function(v){return v.copy(wt)},this.setViewport=function(v,U,B,z){v.isVector4?wt.set(v.x,v.y,v.z,v.w):wt.set(v,U,B,z),_t.viewport(D.copy(wt).multiplyScalar(V).round())},this.getScissor=function(v){return v.copy(Ht)},this.setScissor=function(v,U,B,z){v.isVector4?Ht.set(v.x,v.y,v.z,v.w):Ht.set(v,U,B,z),_t.scissor(F.copy(Ht).multiplyScalar(V).round())},this.getScissorTest=function(){return ie},this.setScissorTest=function(v){_t.setScissorTest(ie=v)},this.setOpaqueSort=function(v){at=v},this.setTransparentSort=function(v){dt=v},this.getClearColor=function(v){return v.copy(yt.getClearColor())},this.setClearColor=function(){yt.setClearColor(...arguments)},this.getClearAlpha=function(){return yt.getClearAlpha()},this.setClearAlpha=function(){yt.setClearAlpha(...arguments)},this.clear=function(v=!0,U=!0,B=!0){let z=0;if(v){let N=!1;if(P!==null){const J=P.texture.format;N=J===nl||J===el||J===tl}if(N){const J=P.texture.type,lt=J===Cn||J===mi||J===ws||J===As||J===Zo||J===Jo,mt=yt.getClearColor(),ut=yt.getClearAlpha(),Rt=mt.r,Lt=mt.g,At=mt.b;lt?(m[0]=Rt,m[1]=Lt,m[2]=At,m[3]=ut,L.clearBufferuiv(L.COLOR,0,m)):(_[0]=Rt,_[1]=Lt,_[2]=At,_[3]=ut,L.clearBufferiv(L.COLOR,0,_))}else z|=L.COLOR_BUFFER_BIT}U&&(z|=L.DEPTH_BUFFER_BIT),B&&(z|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",it,!1),e.removeEventListener("webglcontextrestored",ft,!1),e.removeEventListener("webglcontextcreationerror",Z,!1),yt.dispose(),W.dispose(),Et.dispose(),xt.dispose(),Ee.dispose(),pe.dispose(),O.dispose(),ot.dispose(),Nt.dispose(),j.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",ln),tt.removeEventListener("sessionend",vl),Zn.stop()};function it(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ft(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const v=le.autoReset,U=vt.enabled,B=vt.autoUpdate,z=vt.needsUpdate,N=vt.type;I(),le.autoReset=v,vt.enabled=U,vt.autoUpdate=B,vt.needsUpdate=z,vt.type=N}function Z(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function q(v){const U=v.target;U.removeEventListener("dispose",q),gt(U)}function gt(v){It(v),xt.remove(v)}function It(v){const U=xt.get(v).programs;U!==void 0&&(U.forEach(function(B){j.releaseProgram(B)}),v.isShaderMaterial&&j.releaseShaderCache(v))}this.renderBufferDirect=function(v,U,B,z,N,J){U===null&&(U=bt);const lt=N.isMesh&&N.matrixWorld.determinant()<0,mt=Bd(v,U,B,z,N);_t.setMaterial(z,lt);let ut=B.index,Rt=1;if(z.wireframe===!0){if(ut=x.getWireframeAttribute(B),ut===void 0)return;Rt=2}const Lt=B.drawRange,At=B.attributes.position;let Vt=Lt.start*Rt,Zt=(Lt.start+Lt.count)*Rt;J!==null&&(Vt=Math.max(Vt,J.start*Rt),Zt=Math.min(Zt,(J.start+J.count)*Rt)),ut!==null?(Vt=Math.max(Vt,0),Zt=Math.min(Zt,ut.count)):At!=null&&(Vt=Math.max(Vt,0),Zt=Math.min(Zt,At.count));const ue=Zt-Vt;if(ue<0||ue===1/0)return;ot.setup(N,z,mt,B,ut);let re,ee=ct;if(ut!==null&&(re=w.get(ut),ee=Ct,ee.setIndex(re)),N.isMesh)z.wireframe===!0?(_t.setLineWidth(z.wireframeLinewidth*Re()),ee.setMode(L.LINES)):ee.setMode(L.TRIANGLES);else if(N.isLine){let Tt=z.linewidth;Tt===void 0&&(Tt=1),_t.setLineWidth(Tt*Re()),N.isLineSegments?ee.setMode(L.LINES):N.isLineLoop?ee.setMode(L.LINE_LOOP):ee.setMode(L.LINE_STRIP)}else N.isPoints?ee.setMode(L.POINTS):N.isSprite&&ee.setMode(L.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Ps("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ee.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Ut.get("WEBGL_multi_draw"))ee.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Tt=N._multiDrawStarts,ce=N._multiDrawCounts,Wt=N._multiDrawCount,ze=ut?w.get(ut).bytesPerElement:1,Si=xt.get(z).currentProgram.getUniforms();for(let He=0;He<Wt;He++)Si.setValue(L,"_gl_DrawID",He),ee.render(Tt[He]/ze,ce[He])}else if(N.isInstancedMesh)ee.renderInstances(Vt,ue,N.count);else if(B.isInstancedBufferGeometry){const Tt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,ce=Math.min(B.instanceCount,Tt);ee.renderInstances(Vt,ue,ce)}else ee.render(Vt,ue)};function se(v,U,B){v.transparent===!0&&v.side===Le&&v.forceSinglePass===!1?(v.side=Be,v.needsUpdate=!0,Hs(v,U,B),v.side=jn,v.needsUpdate=!0,Hs(v,U,B),v.side=Le):Hs(v,U,B)}this.compile=function(v,U,B=null){B===null&&(B=v),p=Et.get(B),p.init(U),b.push(p),B.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),v!==B&&v.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const z=new Set;return v.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const J=N.material;if(J)if(Array.isArray(J))for(let lt=0;lt<J.length;lt++){const mt=J[lt];se(mt,B,N),z.add(mt)}else se(J,B,N),z.add(J)}),p=b.pop(),z},this.compileAsync=function(v,U,B=null){const z=this.compile(v,U,B);return new Promise(N=>{function J(){if(z.forEach(function(lt){xt.get(lt).currentProgram.isReady()&&z.delete(lt)}),z.size===0){N(v);return}setTimeout(J,10)}Ut.get("KHR_parallel_shader_compile")!==null?J():setTimeout(J,10)})};let Yt=null;function _n(v){Yt&&Yt(v)}function ln(){Zn.stop()}function vl(){Zn.start()}const Zn=new pd;Zn.setAnimationLoop(_n),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(v){Yt=v,tt.setAnimationLoop(v),v===null?Zn.stop():Zn.start()},tt.addEventListener("sessionstart",ln),tt.addEventListener("sessionend",vl),this.render=function(v,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(U),U=tt.getCamera()),v.isScene===!0&&v.onBeforeRender(S,v,U,P),p=Et.get(v,b.length),p.init(U),b.push(p),$.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),ae.setFromProjectionMatrix($,mn,U.reversedDepth),Y=this.localClippingEnabled,jt=nt.init(this.clippingPlanes,Y),g=W.get(v,M.length),g.init(),M.push(g),tt.enabled===!0&&tt.isPresenting===!0){const J=S.xr.getDepthSensingMesh();J!==null&&$r(J,U,-1/0,S.sortObjects)}$r(v,U,0,S.sortObjects),g.finish(),S.sortObjects===!0&&g.sort(at,dt),Gt=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,Gt&&yt.addToRenderList(g,v),this.info.render.frame++,jt===!0&&nt.beginShadows();const B=p.state.shadowsArray;vt.render(B,v,U),jt===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=g.opaque,N=g.transmissive;if(p.setupLights(),U.isArrayCamera){const J=U.cameras;if(N.length>0)for(let lt=0,mt=J.length;lt<mt;lt++){const ut=J[lt];Ml(z,N,v,ut)}Gt&&yt.render(v);for(let lt=0,mt=J.length;lt<mt;lt++){const ut=J[lt];yl(g,v,ut,ut.viewport)}}else N.length>0&&Ml(z,N,v,U),Gt&&yt.render(v),yl(g,v,U);P!==null&&A===0&&(Ot.updateMultisampleRenderTarget(P),Ot.updateRenderTargetMipmap(P)),v.isScene===!0&&v.onAfterRender(S,v,U),ot.resetDefaultState(),E=-1,y=null,b.pop(),b.length>0?(p=b[b.length-1],jt===!0&&nt.setGlobalState(S.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function $r(v,U,B,z){if(v.visible===!1)return;if(v.layers.test(U.layers)){if(v.isGroup)B=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(U);else if(v.isLight)p.pushLight(v),v.castShadow&&p.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||ae.intersectsSprite(v)){z&&Dt.setFromMatrixPosition(v.matrixWorld).applyMatrix4($);const lt=O.update(v),mt=v.material;mt.visible&&g.push(v,lt,mt,B,Dt.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||ae.intersectsObject(v))){const lt=O.update(v),mt=v.material;if(z&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Dt.copy(v.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),Dt.copy(lt.boundingSphere.center)),Dt.applyMatrix4(v.matrixWorld).applyMatrix4($)),Array.isArray(mt)){const ut=lt.groups;for(let Rt=0,Lt=ut.length;Rt<Lt;Rt++){const At=ut[Rt],Vt=mt[At.materialIndex];Vt&&Vt.visible&&g.push(v,lt,Vt,B,Dt.z,At)}}else mt.visible&&g.push(v,lt,mt,B,Dt.z,null)}}const J=v.children;for(let lt=0,mt=J.length;lt<mt;lt++)$r(J[lt],U,B,z)}function yl(v,U,B,z){const N=v.opaque,J=v.transmissive,lt=v.transparent;p.setupLightsView(B),jt===!0&&nt.setGlobalState(S.clippingPlanes,B),z&&_t.viewport(D.copy(z)),N.length>0&&zs(N,U,B),J.length>0&&zs(J,U,B),lt.length>0&&zs(lt,U,B),_t.buffers.depth.setTest(!0),_t.buffers.depth.setMask(!0),_t.buffers.color.setMask(!0),_t.setPolygonOffset(!1)}function Ml(v,U,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new gi(1,1,{generateMipmaps:!0,type:Ut.has("EXT_color_buffer_half_float")||Ut.has("EXT_color_buffer_float")?Os:Cn,minFilter:ui,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace}));const J=p.state.transmissionRenderTarget[z.id],lt=z.viewport||D;J.setSize(lt.z*S.transmissionResolutionScale,lt.w*S.transmissionResolutionScale);const mt=S.getRenderTarget(),ut=S.getActiveCubeFace(),Rt=S.getActiveMipmapLevel();S.setRenderTarget(J),S.getClearColor(H),X=S.getClearAlpha(),X<1&&S.setClearColor(16777215,.5),S.clear(),Gt&&yt.render(B);const Lt=S.toneMapping;S.toneMapping=zn;const At=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),jt===!0&&nt.setGlobalState(S.clippingPlanes,z),zs(v,B,z),Ot.updateMultisampleRenderTarget(J),Ot.updateRenderTargetMipmap(J),Ut.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let Zt=0,ue=U.length;Zt<ue;Zt++){const re=U[Zt],ee=re.object,Tt=re.geometry,ce=re.material,Wt=re.group;if(ce.side===Le&&ee.layers.test(z.layers)){const ze=ce.side;ce.side=Be,ce.needsUpdate=!0,Sl(ee,B,z,Tt,ce,Wt),ce.side=ze,ce.needsUpdate=!0,Vt=!0}}Vt===!0&&(Ot.updateMultisampleRenderTarget(J),Ot.updateRenderTargetMipmap(J))}S.setRenderTarget(mt,ut,Rt),S.setClearColor(H,X),At!==void 0&&(z.viewport=At),S.toneMapping=Lt}function zs(v,U,B){const z=U.isScene===!0?U.overrideMaterial:null;for(let N=0,J=v.length;N<J;N++){const lt=v[N],mt=lt.object,ut=lt.geometry,Rt=lt.group;let Lt=lt.material;Lt.allowOverride===!0&&z!==null&&(Lt=z),mt.layers.test(B.layers)&&Sl(mt,U,B,ut,Lt,Rt)}}function Sl(v,U,B,z,N,J){v.onBeforeRender(S,U,B,z,N,J),v.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),N.onBeforeRender(S,U,B,z,v,J),N.transparent===!0&&N.side===Le&&N.forceSinglePass===!1?(N.side=Be,N.needsUpdate=!0,S.renderBufferDirect(B,U,z,N,v,J),N.side=jn,N.needsUpdate=!0,S.renderBufferDirect(B,U,z,N,v,J),N.side=Le):S.renderBufferDirect(B,U,z,N,v,J),v.onAfterRender(S,U,B,z,N,J)}function Hs(v,U,B){U.isScene!==!0&&(U=bt);const z=xt.get(v),N=p.state.lights,J=p.state.shadowsArray,lt=N.state.version,mt=j.getParameters(v,N.state,J,U,B),ut=j.getProgramCacheKey(mt);let Rt=z.programs;z.environment=v.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(v.isMeshStandardMaterial?pe:Ee).get(v.envMap||z.environment),z.envMapRotation=z.environment!==null&&v.envMap===null?U.environmentRotation:v.envMapRotation,Rt===void 0&&(v.addEventListener("dispose",q),Rt=new Map,z.programs=Rt);let Lt=Rt.get(ut);if(Lt!==void 0){if(z.currentProgram===Lt&&z.lightsStateVersion===lt)return bl(v,mt),Lt}else mt.uniforms=j.getUniforms(v),v.onBeforeCompile(mt,S),Lt=j.acquireProgram(mt,ut),Rt.set(ut,Lt),z.uniforms=mt.uniforms;const At=z.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(At.clippingPlanes=nt.uniform),bl(v,mt),z.needsLights=Hd(v),z.lightsStateVersion=lt,z.needsLights&&(At.ambientLightColor.value=N.state.ambient,At.lightProbe.value=N.state.probe,At.directionalLights.value=N.state.directional,At.directionalLightShadows.value=N.state.directionalShadow,At.spotLights.value=N.state.spot,At.spotLightShadows.value=N.state.spotShadow,At.rectAreaLights.value=N.state.rectArea,At.ltc_1.value=N.state.rectAreaLTC1,At.ltc_2.value=N.state.rectAreaLTC2,At.pointLights.value=N.state.point,At.pointLightShadows.value=N.state.pointShadow,At.hemisphereLights.value=N.state.hemi,At.directionalShadowMap.value=N.state.directionalShadowMap,At.directionalShadowMatrix.value=N.state.directionalShadowMatrix,At.spotShadowMap.value=N.state.spotShadowMap,At.spotLightMatrix.value=N.state.spotLightMatrix,At.spotLightMap.value=N.state.spotLightMap,At.pointShadowMap.value=N.state.pointShadowMap,At.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=Lt,z.uniformsList=null,Lt}function El(v){if(v.uniformsList===null){const U=v.currentProgram.getUniforms();v.uniformsList=Tr.seqWithValue(U.seq,v.uniforms)}return v.uniformsList}function bl(v,U){const B=xt.get(v);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function Bd(v,U,B,z,N){U.isScene!==!0&&(U=bt),Ot.resetTextureUnits();const J=U.fog,lt=z.isMeshStandardMaterial?U.environment:null,mt=P===null?S.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:ns,ut=(z.isMeshStandardMaterial?pe:Ee).get(z.envMap||lt),Rt=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Lt=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),At=!!B.morphAttributes.position,Vt=!!B.morphAttributes.normal,Zt=!!B.morphAttributes.color;let ue=zn;z.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ue=S.toneMapping);const re=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ee=re!==void 0?re.length:0,Tt=xt.get(z),ce=p.state.lights;if(jt===!0&&(Y===!0||v!==y)){const Ie=v===y&&z.id===E;nt.setState(z,v,Ie)}let Wt=!1;z.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==ce.state.version||Tt.outputColorSpace!==mt||N.isBatchedMesh&&Tt.batching===!1||!N.isBatchedMesh&&Tt.batching===!0||N.isBatchedMesh&&Tt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Tt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Tt.instancing===!1||!N.isInstancedMesh&&Tt.instancing===!0||N.isSkinnedMesh&&Tt.skinning===!1||!N.isSkinnedMesh&&Tt.skinning===!0||N.isInstancedMesh&&Tt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Tt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Tt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Tt.instancingMorph===!1&&N.morphTexture!==null||Tt.envMap!==ut||z.fog===!0&&Tt.fog!==J||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==nt.numPlanes||Tt.numIntersection!==nt.numIntersection)||Tt.vertexAlphas!==Rt||Tt.vertexTangents!==Lt||Tt.morphTargets!==At||Tt.morphNormals!==Vt||Tt.morphColors!==Zt||Tt.toneMapping!==ue||Tt.morphTargetsCount!==ee)&&(Wt=!0):(Wt=!0,Tt.__version=z.version);let ze=Tt.currentProgram;Wt===!0&&(ze=Hs(z,U,N));let Si=!1,He=!1,os=!1;const he=ze.getUniforms(),Ye=Tt.uniforms;if(_t.useProgram(ze.program)&&(Si=!0,He=!0,os=!0),z.id!==E&&(E=z.id,He=!0),Si||y!==v){_t.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),he.setValue(L,"projectionMatrix",v.projectionMatrix),he.setValue(L,"viewMatrix",v.matrixWorldInverse);const Fe=he.map.cameraPosition;Fe!==void 0&&Fe.setValue(L,pt.setFromMatrixPosition(v.matrixWorld)),Pt.logarithmicDepthBuffer&&he.setValue(L,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&he.setValue(L,"isOrthographic",v.isOrthographicCamera===!0),y!==v&&(y=v,He=!0,os=!0)}if(N.isSkinnedMesh){he.setOptional(L,N,"bindMatrix"),he.setOptional(L,N,"bindMatrixInverse");const Ie=N.skeleton;Ie&&(Ie.boneTexture===null&&Ie.computeBoneTexture(),he.setValue(L,"boneTexture",Ie.boneTexture,Ot))}N.isBatchedMesh&&(he.setOptional(L,N,"batchingTexture"),he.setValue(L,"batchingTexture",N._matricesTexture,Ot),he.setOptional(L,N,"batchingIdTexture"),he.setValue(L,"batchingIdTexture",N._indirectTexture,Ot),he.setOptional(L,N,"batchingColorTexture"),N._colorsTexture!==null&&he.setValue(L,"batchingColorTexture",N._colorsTexture,Ot));const qe=B.morphAttributes;if((qe.position!==void 0||qe.normal!==void 0||qe.color!==void 0)&&Q.update(N,B,ze),(He||Tt.receiveShadow!==N.receiveShadow)&&(Tt.receiveShadow=N.receiveShadow,he.setValue(L,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Ye.envMap.value=ut,Ye.flipEnvMap.value=ut.isCubeTexture&&ut.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&(Ye.envMapIntensity.value=U.environmentIntensity),He&&(he.setValue(L,"toneMappingExposure",S.toneMappingExposure),Tt.needsLights&&zd(Ye,os),J&&z.fog===!0&&K.refreshFogUniforms(Ye,J),K.refreshMaterialUniforms(Ye,z,V,et,p.state.transmissionRenderTarget[v.id]),Tr.upload(L,El(Tt),Ye,Ot)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Tr.upload(L,El(Tt),Ye,Ot),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&he.setValue(L,"center",N.center),he.setValue(L,"modelViewMatrix",N.modelViewMatrix),he.setValue(L,"normalMatrix",N.normalMatrix),he.setValue(L,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Ie=z.uniformsGroups;for(let Fe=0,Zr=Ie.length;Fe<Zr;Fe++){const Jn=Ie[Fe];Nt.update(Jn,ze),Nt.bind(Jn,ze)}}return ze}function zd(v,U){v.ambientLightColor.needsUpdate=U,v.lightProbe.needsUpdate=U,v.directionalLights.needsUpdate=U,v.directionalLightShadows.needsUpdate=U,v.pointLights.needsUpdate=U,v.pointLightShadows.needsUpdate=U,v.spotLights.needsUpdate=U,v.spotLightShadows.needsUpdate=U,v.rectAreaLights.needsUpdate=U,v.hemisphereLights.needsUpdate=U}function Hd(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(v,U,B){const z=xt.get(v);z.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),xt.get(v.texture).__webglTexture=U,xt.get(v.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:B,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,U){const B=xt.get(v);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0};const Vd=L.createFramebuffer();this.setRenderTarget=function(v,U=0,B=0){P=v,T=U,A=B;let z=!0,N=null,J=!1,lt=!1;if(v){const ut=xt.get(v);if(ut.__useDefaultFramebuffer!==void 0)_t.bindFramebuffer(L.FRAMEBUFFER,null),z=!1;else if(ut.__webglFramebuffer===void 0)Ot.setupRenderTarget(v);else if(ut.__hasExternalTextures)Ot.rebindTextures(v,xt.get(v.texture).__webglTexture,xt.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const At=v.depthTexture;if(ut.__boundDepthTexture!==At){if(At!==null&&xt.has(At)&&(v.width!==At.image.width||v.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ot.setupDepthRenderbuffer(v)}}const Rt=v.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(lt=!0);const Lt=xt.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Lt[U])?N=Lt[U][B]:N=Lt[U],J=!0):v.samples>0&&Ot.useMultisampledRTT(v)===!1?N=xt.get(v).__webglMultisampledFramebuffer:Array.isArray(Lt)?N=Lt[B]:N=Lt,D.copy(v.viewport),F.copy(v.scissor),k=v.scissorTest}else D.copy(wt).multiplyScalar(V).floor(),F.copy(Ht).multiplyScalar(V).floor(),k=ie;if(B!==0&&(N=Vd),_t.bindFramebuffer(L.FRAMEBUFFER,N)&&z&&_t.drawBuffers(v,N),_t.viewport(D),_t.scissor(F),_t.setScissorTest(k),J){const ut=xt.get(v.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,ut.__webglTexture,B)}else if(lt){const ut=U;for(let Rt=0;Rt<v.textures.length;Rt++){const Lt=xt.get(v.textures[Rt]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Rt,Lt.__webglTexture,B,ut)}}else if(v!==null&&B!==0){const ut=xt.get(v.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ut.__webglTexture,B)}E=-1},this.readRenderTargetPixels=function(v,U,B,z,N,J,lt,mt=0){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ut=xt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&lt!==void 0&&(ut=ut[lt]),ut){_t.bindFramebuffer(L.FRAMEBUFFER,ut);try{const Rt=v.textures[mt],Lt=Rt.format,At=Rt.type;if(!Pt.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pt.textureTypeReadable(At)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=v.width-z&&B>=0&&B<=v.height-N&&(v.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+mt),L.readPixels(U,B,z,N,Mt.convert(Lt),Mt.convert(At),J))}finally{const Rt=P!==null?xt.get(P).__webglFramebuffer:null;_t.bindFramebuffer(L.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(v,U,B,z,N,J,lt,mt=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ut=xt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&lt!==void 0&&(ut=ut[lt]),ut)if(U>=0&&U<=v.width-z&&B>=0&&B<=v.height-N){_t.bindFramebuffer(L.FRAMEBUFFER,ut);const Rt=v.textures[mt],Lt=Rt.format,At=Rt.type;if(!Pt.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pt.textureTypeReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Vt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Vt),L.bufferData(L.PIXEL_PACK_BUFFER,J.byteLength,L.STREAM_READ),v.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+mt),L.readPixels(U,B,z,N,Mt.convert(Lt),Mt.convert(At),0);const Zt=P!==null?xt.get(P).__webglFramebuffer:null;_t.bindFramebuffer(L.FRAMEBUFFER,Zt);const ue=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await $f(L,ue,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Vt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,J),L.deleteBuffer(Vt),L.deleteSync(ue),J}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,U=null,B=0){const z=Math.pow(2,-B),N=Math.floor(v.image.width*z),J=Math.floor(v.image.height*z),lt=U!==null?U.x:0,mt=U!==null?U.y:0;Ot.setTexture2D(v,0),L.copyTexSubImage2D(L.TEXTURE_2D,B,0,0,lt,mt,N,J),_t.unbindTexture()};const Gd=L.createFramebuffer(),Wd=L.createFramebuffer();this.copyTextureToTexture=function(v,U,B=null,z=null,N=0,J=null){J===null&&(N!==0?(Ps("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),J=N,N=0):J=0);let lt,mt,ut,Rt,Lt,At,Vt,Zt,ue;const re=v.isCompressedTexture?v.mipmaps[J]:v.image;if(B!==null)lt=B.max.x-B.min.x,mt=B.max.y-B.min.y,ut=B.isBox3?B.max.z-B.min.z:1,Rt=B.min.x,Lt=B.min.y,At=B.isBox3?B.min.z:0;else{const qe=Math.pow(2,-N);lt=Math.floor(re.width*qe),mt=Math.floor(re.height*qe),v.isDataArrayTexture?ut=re.depth:v.isData3DTexture?ut=Math.floor(re.depth*qe):ut=1,Rt=0,Lt=0,At=0}z!==null?(Vt=z.x,Zt=z.y,ue=z.z):(Vt=0,Zt=0,ue=0);const ee=Mt.convert(U.format),Tt=Mt.convert(U.type);let ce;U.isData3DTexture?(Ot.setTexture3D(U,0),ce=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ot.setTexture2DArray(U,0),ce=L.TEXTURE_2D_ARRAY):(Ot.setTexture2D(U,0),ce=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const Wt=L.getParameter(L.UNPACK_ROW_LENGTH),ze=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Si=L.getParameter(L.UNPACK_SKIP_PIXELS),He=L.getParameter(L.UNPACK_SKIP_ROWS),os=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,re.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,re.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Rt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Lt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,At);const he=v.isDataArrayTexture||v.isData3DTexture,Ye=U.isDataArrayTexture||U.isData3DTexture;if(v.isDepthTexture){const qe=xt.get(v),Ie=xt.get(U),Fe=xt.get(qe.__renderTarget),Zr=xt.get(Ie.__renderTarget);_t.bindFramebuffer(L.READ_FRAMEBUFFER,Fe.__webglFramebuffer),_t.bindFramebuffer(L.DRAW_FRAMEBUFFER,Zr.__webglFramebuffer);for(let Jn=0;Jn<ut;Jn++)he&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,xt.get(v).__webglTexture,N,At+Jn),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,xt.get(U).__webglTexture,J,ue+Jn)),L.blitFramebuffer(Rt,Lt,lt,mt,Vt,Zt,lt,mt,L.DEPTH_BUFFER_BIT,L.NEAREST);_t.bindFramebuffer(L.READ_FRAMEBUFFER,null),_t.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(N!==0||v.isRenderTargetTexture||xt.has(v)){const qe=xt.get(v),Ie=xt.get(U);_t.bindFramebuffer(L.READ_FRAMEBUFFER,Gd),_t.bindFramebuffer(L.DRAW_FRAMEBUFFER,Wd);for(let Fe=0;Fe<ut;Fe++)he?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,qe.__webglTexture,N,At+Fe):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,qe.__webglTexture,N),Ye?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ie.__webglTexture,J,ue+Fe):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ie.__webglTexture,J),N!==0?L.blitFramebuffer(Rt,Lt,lt,mt,Vt,Zt,lt,mt,L.COLOR_BUFFER_BIT,L.NEAREST):Ye?L.copyTexSubImage3D(ce,J,Vt,Zt,ue+Fe,Rt,Lt,lt,mt):L.copyTexSubImage2D(ce,J,Vt,Zt,Rt,Lt,lt,mt);_t.bindFramebuffer(L.READ_FRAMEBUFFER,null),_t.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Ye?v.isDataTexture||v.isData3DTexture?L.texSubImage3D(ce,J,Vt,Zt,ue,lt,mt,ut,ee,Tt,re.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(ce,J,Vt,Zt,ue,lt,mt,ut,ee,re.data):L.texSubImage3D(ce,J,Vt,Zt,ue,lt,mt,ut,ee,Tt,re):v.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,J,Vt,Zt,lt,mt,ee,Tt,re.data):v.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,J,Vt,Zt,re.width,re.height,ee,re.data):L.texSubImage2D(L.TEXTURE_2D,J,Vt,Zt,lt,mt,ee,Tt,re);L.pixelStorei(L.UNPACK_ROW_LENGTH,Wt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ze),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Si),L.pixelStorei(L.UNPACK_SKIP_ROWS,He),L.pixelStorei(L.UNPACK_SKIP_IMAGES,os),J===0&&U.generateMipmaps&&L.generateMipmap(ce),_t.unbindTexture()},this.initRenderTarget=function(v){xt.get(v).__webglFramebuffer===void 0&&Ot.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Ot.setTextureCube(v,0):v.isData3DTexture?Ot.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Ot.setTexture2DArray(v,0):Ot.setTexture2D(v,0),_t.unbindTexture()},this.resetState=function(){T=0,A=0,P=null,_t.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Xt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Xt._getUnpackColorSpace()}}const xx=864e5,vx=730,yx=new Bt().setHSL(.6,.42,.88),Xc=new Bt().setHSL(.12,.1,.86),Mx=new Bt().setHSL(.075,.45,.7);function vd(i){const t=Math.max(i.dateLastUsed??0,i.dateAdded??0);return t>0?t:void 0}function ai(i,t=gh()){if(i==null)return .5;const e=Math.max(0,(t-i)/xx);return 1-Math.min(1,Math.log(e+1)/Math.log(vx+1))}function Sx(i){return i>=.5?Xc.clone().lerp(yx,(i-.5)*2):Mx.clone().lerp(Xc,i*2)}const Ex=i=>{const t=ai(i.touched),e=.3+.7*t,n=1/(1+i.rank*.5);return{size:(.95+e*1.25)*(1+n*.45),alpha:Math.min(1,(.45+e*.55)*(1+n*.25)),color:Sx(t)}};function bx(i,t){const e=[];for(const n of i.stars){const s=t.get(n.id);s&&e.push({id:n.id,x:n.x,y:n.y,brightness:Gu(s),touched:vd(s),cluster:n.cluster,rank:n.rank})}return e}function wx(i,t){return{clusters:i.clusters.map(e=>({index:e.index,name:e.name,x:e.x,y:e.y,radius:e.radius,count:e.count})),stars:i.stars.flatMap(e=>{const n=t.get(e.id);return n?[{id:e.id,title:n.title,url:n.url,x:e.x,y:e.y,cluster:e.cluster,rank:e.rank,touched:vd(n)}]:[]})}}const jc={type:"change"},pl={type:"start"},yd={type:"end"},Mr=new ks,Yc=new hn,Ax=Math.cos(70*fe.DEG2RAD),ye=new R,Oe=2*Math.PI,Qt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Da=1e-6;class Tx extends Up{constructor(t,e=null){super(t,e),this.state=Qt.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:wn.ROTATE,MIDDLE:wn.DOLLY,RIGHT:wn.PAN},this.touches={ONE:un.ROTATE,TWO:un.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new Yn,this._lastTargetPosition=new R,this._quat=new Yn().setFromUnitVectors(t.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new vc,this._sphericalDelta=new vc,this._scale=1,this._panOffset=new R,this._rotateStart=new ht,this._rotateEnd=new ht,this._rotateDelta=new ht,this._panStart=new ht,this._panEnd=new ht,this._panDelta=new ht,this._dollyStart=new ht,this._dollyEnd=new ht,this._dollyDelta=new ht,this._dollyDirection=new R,this._mouse=new ht,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Cx.bind(this),this._onPointerDown=Rx.bind(this),this._onPointerUp=Px.bind(this),this._onContextMenu=Ox.bind(this),this._onMouseWheel=Ix.bind(this),this._onKeyDown=Ux.bind(this),this._onTouchStart=Nx.bind(this),this._onTouchMove=Fx.bind(this),this._onMouseDown=Lx.bind(this),this._onMouseMove=Dx.bind(this),this._interceptControlDown=kx.bind(this),this._interceptControlUp=Bx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(jc),this.update(),this.state=Qt.NONE}update(t=null){const e=this.object.position;ye.copy(e).sub(this.target),ye.applyQuaternion(this._quat),this._spherical.setFromVector3(ye),this.autoRotate&&this.state===Qt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Oe:n>Math.PI&&(n-=Oe),s<-Math.PI?s+=Oe:s>Math.PI&&(s-=Oe),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(ye.setFromSpherical(this._spherical),ye.applyQuaternion(this._quatInverse),e.copy(this.target).add(ye),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=ye.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new R(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new R(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=ye.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Mr.origin.copy(this.object.position),Mr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Mr.direction))<Ax?this.object.lookAt(this.target):(Yc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Mr.intersectPlane(Yc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Da||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Da||this._lastTargetPosition.distanceToSquared(this.target)>Da?(this.dispatchEvent(jc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Oe/60*this.autoRotateSpeed*t:Oe/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ye.setFromMatrixColumn(e,0),ye.multiplyScalar(-t),this._panOffset.add(ye)}_panUp(t,e){this.screenSpacePanning===!0?ye.setFromMatrixColumn(e,1):(ye.setFromMatrixColumn(e,0),ye.crossVectors(this.object.up,ye)),ye.multiplyScalar(t),this._panOffset.add(ye)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ye.copy(s).sub(this.target);let r=ye.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Oe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Oe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Oe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Oe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ht,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Rx(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Cx(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Px(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(yd),this.state=Qt.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Lx(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case wn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Qt.DOLLY;break;case wn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Qt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Qt.ROTATE}break;case wn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Qt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Qt.PAN}break;default:this.state=Qt.NONE}this.state!==Qt.NONE&&this.dispatchEvent(pl)}function Dx(i){switch(this.state){case Qt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Qt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Qt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Ix(i){this.enabled===!1||this.enableZoom===!1||this.state!==Qt.NONE||(i.preventDefault(),this.dispatchEvent(pl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(yd))}function Ux(i){this.enabled!==!1&&this._handleKeyDown(i)}function Nx(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case un.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Qt.TOUCH_ROTATE;break;case un.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Qt.TOUCH_PAN;break;default:this.state=Qt.NONE}break;case 2:switch(this.touches.TWO){case un.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Qt.TOUCH_DOLLY_PAN;break;case un.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Qt.TOUCH_DOLLY_ROTATE;break;default:this.state=Qt.NONE}break;default:this.state=Qt.NONE}this.state!==Qt.NONE&&this.dispatchEvent(pl)}function Fx(i){switch(this._trackPointer(i),this.state){case Qt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Qt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Qt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Qt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Qt.NONE}}function Ox(i){this.enabled!==!1&&i.preventDefault()}function kx(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Bx(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class zx extends Tx{constructor(t,e){super(t,e),this.screenSpacePanning=!1,this.mouseButtons={LEFT:wn.PAN,MIDDLE:wn.DOLLY,RIGHT:wn.ROTATE},this.touches={ONE:un.PAN,TWO:un.DOLLY_ROTATE}}}const Hx=60,Vx={cluster:13,star:11},Gx={cluster:.28,star:.02},Wx={cluster:"--font-name",star:"--font-text"},Vi=8,Xx=5,jx=11,Yx=18,qx=40,Kx=32,qc=80,$x=i=>!/[ -߿｡-ﾟ]/.test(i);function Kc(i,t){let e=0;for(let n=0;n<i.length;n++)if(e+=$x(i[n])?1:.5,e>t)return i.slice(0,Math.max(1,n))+"…";return i}const $c=i=>i.fontSize??(i.searchRank==null?Vx[i.kind]:i.searchRank<3?14:i.searchRank<9?12:10),Zx=(i,t)=>i.l<t.r&&t.l<i.r&&i.t<t.b&&t.t<i.b;function Jx(i,t){const e=Math.max(i.l,Math.min(t.sx,i.r)),n=Math.max(i.t,Math.min(t.sy,i.b));return((e-t.sx)/t.rx)**2+((n-t.sy)/t.ry)**2<1}class Qx{constructor(t){this.container=t,t.addEventListener("mouseover",this.onOver),t.addEventListener("mouseout",this.onOut),t.addEventListener("click",this.onLabelClick)}container;elements=new Map;active=[];fontFamily={};measure=document.createElement("canvas").getContext("2d");fullText=new Map;hovered=null;onHover=null;onClick=null;onClusterClick=null;render(t,e,n=[]){const s=[],r=[];for(const a of[...t].sort((o,c)=>o.priority-c.priority)){if(r.length>=Hx)break;const o=a.text;this.fullText.set(a.key,o);const c=a.kind!=="star"?1/0:this.hovered===a.key?qc:a.searchRank!=null?Kx:e==="mid"?Yx:qx,l=c===1/0?o:Kc(o,c),h=$c(a),d=this.labelWidth(a,l,h),u=h+6,f=a.sy-u/2,m=a.kind==="cluster"&&e==="far"?{l:a.sx-d/2,t:f,r:a.sx+d/2,b:f+u}:a.kind==="star"&&a.side==="left"?{l:a.sx-Vi-d,t:f,r:a.sx-Vi,b:f+u}:{l:a.sx+Vi,t:f,r:a.sx+Vi+d,b:f+u};if(s.some(g=>Zx(g,m)))continue;const _={l:m.l-20,t:m.t-4,r:m.r+20,b:m.b+4};a.kind==="star"&&a.priority>-3e3&&n.some(g=>g.cluster!==a.cluster&&Jx(_,g))||(s.push(m),r.push({item:a,text:l,box:m}))}return this.paint(r),r.length}clear(){this.paint([])}updatePositions(t){for(const{item:e,width:n,height:s}of this.active){const r=t(e);if(!r)continue;const a=e.centered?r.sx-n/2:e.kind==="star"&&e.side==="left"?r.sx-Vi-n:r.sx+Vi,o=r.sy-s/2;this.elements.get(e.key).style.transform=`translate3d(${a.toFixed(1)}px, ${o.toFixed(1)}px, 0)`}}paint(t){const e=new Set(t.map(({item:n})=>n.key));for(const[n,s]of this.elements)e.has(n)||(s.style.opacity="0",s.style.pointerEvents="none",setTimeout(()=>{this.active.some(({item:r})=>r.key===n)||(s.remove(),this.elements.delete(n))},220));this.active=t.map(({item:n,text:s,box:r})=>({item:n,text:s,baseWidth:r.r-r.l,width:r.r-r.l,height:r.b-r.t})),t.forEach(({item:n,text:s,box:r})=>{let a=this.elements.get(n.key);const o=!a;a||(a=document.createElement("div"),a.className="label",a.style.opacity="0",this.container.appendChild(a),this.elements.set(n.key,a)),a.textContent=s;const c=this.fullText.get(n.key)??s;c!==s?a.title=c:a.removeAttribute("title");const l=n.searchRank==null?"":n.searchRank<3?" label-orbit-inner":n.searchRank<9?" label-orbit-middle":" label-orbit-outer";a.className=`label label-${n.kind}${l}${n.kind==="cluster"?" label-cluster-focus":""}${n.dim?" label-dim":""}`,a.dataset.key=n.key,a.dataset.searchRank=n.searchRank==null?"":String(n.searchRank),a.dataset.cluster=n.cluster==null?"":String(n.cluster),a.dataset.side=n.side??"",a.dataset.kind=n.kind,a.style.textAlign=n.side==="left"?"right":"left",a.style.fontSize=n.fontSize?`${n.fontSize}px`:"",a.style.width=n.searchRank==null?"":`${(r.r-r.l).toFixed(1)}px`,a.style.boxSizing=n.searchRank==null?"":"border-box",a.style.setProperty("--cluster-color",n.color??"transparent"),a.style.pointerEvents="auto",a.style.transform=`translate3d(${r.l.toFixed(1)}px, ${r.t.toFixed(1)}px, 0)`;const h=n.dim?"0.3":this.hovered===n.key?"1":String(n.opacity??1);o?requestAnimationFrame(()=>{this.active.some(({item:d})=>d.key===n.key)&&(a.style.opacity=h)}):a.style.opacity=h})}onOver=t=>{const e=t.target,n=e?.dataset?.key;if(!n)return;this.hovered=n,this.onHover?.(n),e.classList.add("is-hovered"),this.active.find(({item:o})=>o.key===n)?.item.opacity!=null&&(e.style.opacity="1");const r=Kc(this.fullText.get(n)??"",qc);e.textContent=r;const a=this.active.find(({item:o})=>o.key===n);if(a&&a.text!==r){const o=$c(a.item);a.width=this.labelWidth(a.item,r,o)}};onOut=t=>{const e=t.target;e.classList.remove("is-hovered");const n=this.active.find(({item:s})=>s.key===e.dataset?.key);n&&(e.textContent=n.text,n.width=n.baseWidth,e.style.opacity=n.item.dim?"0.3":String(n.item.opacity??1)),this.hovered=null,this.onHover?.(null)};labelWidth(t,e,n){return this.textWidth(e,n,t.kind)+Xx*2+(t.kind==="star"?jx:0)+(t.searchRank==null?0:16)}onLabelClick=t=>{const e=t.target;e?.dataset?.kind==="star"&&e.dataset.key?this.onClick?.(e.dataset.key):e?.dataset?.kind==="cluster"&&e.classList.contains("label-cluster-focus")&&this.onClusterClick?.(Number(e.dataset.cluster))};textWidth(t,e,n){const s=t.length*e*Gx[n];return this.measure?(this.fontFamily[n]??=getComputedStyle(document.documentElement).getPropertyValue(Wx[n]).trim()||getComputedStyle(this.container).fontFamily||"sans-serif",this.measure.font=`${e}px ${this.fontFamily[n]}`,this.measure.measureText(t).width+s):t.length*e*.9+s}}const tv=`
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
`,ev=`
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
`;class nv{object=new ke;mesh=null;geometry=new rs(1,1).rotateX(-Math.PI/2);material=new je({vertexShader:tv,fragmentShader:ev,transparent:!0,depthWrite:!1,blending:pi});set(t){if(this.mesh&&(this.object.remove(this.mesh),this.mesh.dispose(),this.mesh=null),t.length===0)return;const e=new od(this.geometry,this.material,t.length),n=new Float32Array(t.length*3),s=new Float32Array(t.length),r=new Yn,a=new R(0,1,0),o=new te;t.forEach((c,l)=>{const h=c.radius*2.8,d=.8+c.seed*37%10/50;r.setFromAxisAngle(a,c.seed*53%180*Math.PI/180),o.compose(new R(c.x,-.2,-c.y),r,new R(h,1,h*d)),s[l]=c.seed,e.setMatrixAt(l,o),n[l*3]=c.color.r,n[l*3+1]=c.color.g,n[l*3+2]=c.color.b}),e.geometry.setAttribute("aColor",new Gr(n,3)),e.geometry.setAttribute("aSeed",new Gr(s,1)),e.instanceMatrix.needsUpdate=!0,e.frustumCulled=!1,this.mesh=e,this.object.add(e)}}const iv=i=>{const t=1/(1+i.rank*.5);return{size:(.95+i.brightness*1.25)*(1+t*.45),alpha:Math.min(1,(.45+i.brightness*.55)*(1+t*.25)),color:lv(i.id,i.brightness)}},sv=`
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
`,Md=12,rv=64,av=.55,ov=`
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
`;function ml(){return new je({uniforms:{uScale:{value:800},uMaxSize:{value:Md},uFlight:{value:0},uSizeScale:{value:1}},vertexShader:sv,fragmentShader:ov,transparent:!0,depthWrite:!1,blending:pi})}function lv(i,t){let e=2166136261;for(let a=0;a<i.length;a++)e=Math.imul(e^i.charCodeAt(a),16777619)>>>0;const n=e%1e3/1e3,s=n<.5?.11:.6,r=.06+Math.abs(n-.5)*.28;return new Bt().setHSL(s,r,.8+t*.15)}function Zc(i){const t=[.46,.34,.54,.38,.5,.31,.57,.42][i%8];return new Bt().setHSL(.63,.3,t)}const cv=.9,hv=.5;class dv{object;geom=new qt;stars=[];index=new Map;position;alphaAttr;sizeAttr;baseSize=new Float32Array(0);searchSize=new Float32Array(0);from=new Float32Array(0);to=new Float32Array(0);bornAt=new Float32Array(0);targetAlpha=new Float32Array(0);moveT=1;elapsed=0;animating=!0;springX=new Float32Array(0);springY=new Float32Array(0);velocityX=new Float32Array(0);velocityY=new Float32Array(0);searchX=new Float32Array(0);searchY=new Float32Array(0);searchAlpha=new Float32Array(0);searching=!1;settling=!1;colorAttr;appearance=iv;heights=new Float32Array(0);lift=0;liftDirty=!1;setAppearance(t){this.appearance=t;const e=this.sizeAttr?.array,n=this.colorAttr?.array;!e||!n||(this.stars.forEach((s,r)=>{const a=t(s);this.baseSize[r]=a.size,this.targetAlpha[r]=a.alpha,n[r*3]=a.color.r,n[r*3+1]=a.color.g,n[r*3+2]=a.color.b}),this.colorAttr.needsUpdate=!0,this.applyTargets())}setHeights(t){this.heights=new Float32Array(this.stars.length),this.stars.forEach((e,n)=>{this.heights[n]=t.get(e.id)??0}),this.liftDirty=!0}setLift(t){t!==this.lift&&(this.lift=t,this.liftDirty=!0)}position3(t){const e=this.index.get(t);if(e==null)return null;const n=this.position.array;return{x:n[e*3],y:-n[e*3+2],z:n[e*3+1]}}positionWorld(t,e,n){const s=this.index.get(t);if(s==null)return!1;const r=this.position.array;return e.set(r[s*3]*n,r[s*3+1]*n,r[s*3+2]*n),!0}pointSize(t){const e=this.index.get(t);return e==null?null:this.sizeAttr.array[e]}lastSearch={ids:[],center:{x:0,y:0},unit:1};emphasis=new Set;emphasisMode="none";get isSettling(){return this.settling}get isAnimating(){return this.animating}constructor(){this.object=new Yr(this.geom,ml()),this.object.frustumCulled=!1}get count(){return this.stars.length}get placed(){return this.stars}setStars(t,e=!0){const n=this.positionsById(),s=t.length,r=new Float32Array(s*3),a=new Float32Array(s),o=new Float32Array(s*3),c=new Float32Array(s);this.from=new Float32Array(s*2),this.to=new Float32Array(s*2),this.bornAt=new Float32Array(s),this.targetAlpha=new Float32Array(s),this.springX=new Float32Array(s),this.springY=new Float32Array(s),this.velocityX=new Float32Array(s),this.velocityY=new Float32Array(s),this.searchX=new Float32Array(s),this.searchY=new Float32Array(s),this.searchAlpha=new Float32Array(s),this.baseSize=new Float32Array(s),this.searchSize=new Float32Array(s),this.index=new Map;const l=new Bt,h=n.size===0;t.forEach((d,u)=>{this.index.set(d.id,u);const f=n.get(d.id),m=f?f.x:d.x,_=f?f.y:d.y;this.from[u*2]=m,this.from[u*2+1]=_,this.to[u*2]=d.x,this.to[u*2+1]=d.y,this.springX[u]=m,this.springY[u]=_,this.searchX[u]=d.x,this.searchY[u]=d.y,r[u*3]=m,r[u*3+1]=0,r[u*3+2]=-_;const g=this.appearance(d);a[u]=g.size,this.baseSize[u]=this.searchSize[u]=a[u],l.copy(g.color),o[u*3]=l.r,o[u*3+1]=l.g,o[u*3+2]=l.b,this.targetAlpha[u]=g.alpha,this.searchAlpha[u]=this.targetAlpha[u];const p=h?u/Math.max(1,s)*1.6:0;this.bornAt[u]=f?-1:p,c[u]=f?this.targetAlpha[u]:0}),this.stars=t,this.elapsed=0,this.moveT=e&&n.size>0?0:1,this.searching=!1,this.lastSearch={ids:[],center:{x:0,y:0},unit:1},this.geom.dispose(),this.geom=new qt,this.position=new ne(r,3),this.alphaAttr=new ne(c,1),this.sizeAttr=new ne(a,1),this.geom.setAttribute("position",this.position),this.geom.setAttribute("aSize",this.sizeAttr),this.colorAttr=new ne(o,3),this.geom.setAttribute("aColor",this.colorAttr),this.geom.setAttribute("aAlpha",this.alphaAttr),this.heights=new Float32Array(s),this.liftDirty=!0,this.object.geometry=this.geom}setSearch(t,e,n){this.moveT=1,this.lastSearch={ids:t,center:e,unit:n},this.applyTargets()}setEmphasis(t,e){this.emphasis=new Set(e==="none"?[]:t),this.emphasisMode=e,this.applyTargets()}applyTargets(){const{ids:t,center:e,unit:n}=this.lastSearch;this.searching=t.length>0;const s=new Map(t.slice(0,21).map((r,a)=>[r,a]));this.stars.forEach((r,a)=>{const o=s.get(r.id);if(o==null){this.searchX[a]=r.x,this.searchY[a]=r.y,this.searchAlpha[a]=this.searching?this.targetAlpha[a]*.25:this.targetAlpha[a],this.searchSize[a]=this.baseSize[a];return}const c=o<3?0:o<9?1:2,l=[0,3,9][c],h=[3,6,12][c],d=-Math.PI/2+(o-l)/h*Math.PI*2+c*.12,u=[1,1.75,2.55][c]*n;this.searchX[a]=e.x+Math.cos(d)*u,this.searchY[a]=e.y+Math.sin(d)*u,this.searchAlpha[a]=[1,.78,.55][c],this.searchSize[a]=[3.4,2.5,1.7][c]}),this.emphasisMode!=="none"&&this.stars.forEach((r,a)=>{this.emphasis.has(r.id)?(this.searchSize[a]=Math.max(this.searchSize[a],this.baseSize[a])*1.45,this.searchAlpha[a]=Math.min(1,Math.max(this.searchAlpha[a],this.targetAlpha[a])*1.4+.1)):this.emphasisMode==="edit"&&(this.searchAlpha[a]*=.45,this.searchSize[a]*=.85)})}displayPosition(t){const e=this.index.get(t);return e==null?null:{x:this.springX[e],y:this.springY[e]}}visual(t){const e=this.index.get(t);return e==null?null:{size:this.sizeAttr.array[e],alpha:this.alphaAttr.array[e]}}update(t){if(this.stars.length===0){this.animating=!1;return}if(this.elapsed+=t,this.moveT<1){this.moveT=Math.min(1,this.moveT+t/cv);const h=uv(this.moveT),d=this.position.array;for(let u=0;u<this.stars.length;u++){const f=this.from[u*2]+(this.to[u*2]-this.from[u*2])*h,m=this.from[u*2+1]+(this.to[u*2+1]-this.from[u*2+1])*h;d[u*3]=f,d[u*3+2]=-m,this.springX[u]=f,this.springY[u]=m,this.velocityX[u]=0,this.velocityY[u]=0}this.position.needsUpdate=!0}const e=this.alphaAttr.array,n=this.position.array;let s=!1,r=!1;for(let h=0;this.moveT>=1&&h<this.stars.length;h++){if(Math.abs(this.springX[h]-this.searchX[h])<.001&&Math.abs(this.springY[h]-this.searchY[h])<.001&&Math.abs(this.velocityX[h])+Math.abs(this.velocityY[h])<.001)continue;const d=Math.exp(-13*t);this.velocityX[h]=(this.velocityX[h]+(this.searchX[h]-this.springX[h])*90*t)*d,this.velocityY[h]=(this.velocityY[h]+(this.searchY[h]-this.springY[h])*90*t)*d,this.springX[h]+=this.velocityX[h]*t,this.springY[h]+=this.velocityY[h]*t,(Math.abs(this.searchX[h]-this.springX[h])+Math.abs(this.searchY[h]-this.springY[h])>.3||Math.abs(this.velocityX[h])+Math.abs(this.velocityY[h])>1)&&(r=!0),n[h*3]=this.springX[h],n[h*3+2]=-this.springY[h],s=!0}s&&(this.position.needsUpdate=!0),this.settling=r||this.moveT<1;const a=this.stars.some((h,d)=>Math.abs(e[d]-this.searchAlpha[d])>.001);if(this.searching||s||a){for(let h=0;h<this.stars.length;h++)e[h]+=(this.searchAlpha[h]-e[h])*Math.min(1,t*12);this.alphaAttr.needsUpdate=!0}let o=!1;for(let h=0;h<this.stars.length;h++){if(this.bornAt[h]<0)continue;o=!0;const d=(this.elapsed-this.bornAt[h])/hv;if(d>=1)e[h]=this.targetAlpha[h],this.bornAt[h]=-1;else if(d<=0)e[h]=0;else{const u=1+.9*Math.sin(Math.PI*d)*(1-d);e[h]=this.targetAlpha[h]*d*u}}if(o&&(this.alphaAttr.needsUpdate=!0),this.liftDirty){for(let h=0;h<this.stars.length;h++)n[h*3+1]=this.heights[h]*this.lift;this.position.needsUpdate=!0,this.liftDirty=!1}const c=this.sizeAttr.array,l=this.stars.some((h,d)=>Math.abs(c[d]-this.searchSize[d])>.001);if(l){for(let h=0;h<this.stars.length;h++)c[h]+=(this.searchSize[h]-c[h])*Math.min(1,t*12);this.sizeAttr.needsUpdate=!0}this.animating=this.moveT<1||s||a||o||l}positionsById(){const t=new Map;if(this.stars.length===0)return t;const e=this.position.array;return this.stars.forEach((n,s)=>t.set(n.id,{x:e[s*3],y:-e[s*3+2]})),t}}const uv=i=>i<.5?2*i*i:1-(-2*i+2)**2/2;function fv(i=7){const e=new Float32Array(4200),n=new Float32Array(1400),s=new Float32Array(1400*3),r=new Float32Array(1400);let a=i;const o=()=>(a=(a*1664525+1013904223)%4294967296,a/4294967296);for(let h=0;h<1400;h++){const d=420+o()*380,u=o()*Math.PI*2,f=Math.acos(2*o()-1);e[h*3]=d*Math.sin(f)*Math.cos(u),e[h*3+1]=d*Math.cos(f)*.55,e[h*3+2]=d*Math.sin(f)*Math.sin(u),n[h]=.5+o()*1.1;const m=.78+o()*.22,_=o()*.06;s[h*3]=m,s[h*3+1]=m*(.98-_*.3),s[h*3+2]=m*(.96-_),r[h]=.05+o()*.16}const c=new qt;c.setAttribute("position",new ne(e,3)),c.setAttribute("aSize",new ne(n,1)),c.setAttribute("aColor",new ne(s,3)),c.setAttribute("aAlpha",new ne(r,1));const l=new Yr(c,ml());return l.frustumCulled=!1,l}const de=4,pv=1.4,mv=1.2,gv=1.8,_v=12,Jc=1e-4,Qc=1.2,xv=1,vv=1,yv=6,Mv=.5,Sv=4,Ia=.15,Ev=6,th=i=>{const t=Math.abs(i);return t<Ia?0:Math.sign(i)*Math.min(1,(t-Ia)/(1-Ia))};class bv{phase="idle";lift=0;ship={position:new R,yaw:0,pitch:0,speed:0};mapDistance=90;turnVelocity=0;climbVelocity=0;maxSpeed=12;boostLeft=0;boostMultiplier=1.6;bound=120;ceiling=40;startPosition=new R;elapsed=0;fromPosition=new R;fromLook=new R;toPosition=new R;toLook=new R;get active(){return this.phase!=="idle"}get normalMaxSpeed(){return this.maxSpeed}get boostCap(){return this.maxSpeed*this.boostMultiplier}boost(){this.boostLeft=1.5,this.ship.speed=Math.min(this.boostCap,Math.max(this.ship.speed*1.35,this.maxSpeed*1.2))}get transitioning(){return this.phase==="entering"||this.phase==="leaving"}forward(t=new R){const{yaw:e,pitch:n}=this.ship;return t.set(-Math.sin(e)*Math.cos(n),Math.sin(n),-Math.cos(e)*Math.cos(n))}enter(t,e,n,s,r){this.mapDistance=n;const a=r*de;this.maxSpeed=fe.clamp(a*2/30,10,120),this.bound=a*1.5,this.ceiling=Math.max(40,a*.5),this.ship.position.set(e.x*de,s,e.z*de),this.startPosition.copy(this.ship.position),this.reset(),this.fromPosition.copy(t.position),this.fromLook.copy(e),this.chasePose(this.toPosition,this.toLook),this.phase="entering",this.elapsed=0}resume(t,e,n,s,r,a){this.ship.position.copy(t),this.ship.yaw=e,this.ship.pitch=n,this.ship.speed=Math.max(0,Math.min(this.maxSpeed,s)),this.phase="flying",this.lift=1,this.elapsed=0,this.turnVelocity=0,this.climbVelocity=0,this.chasePose(r.position,a),r.lookAt(a)}reset(){this.ship.position.copy(this.startPosition),this.ship.yaw=0,this.ship.pitch=0,this.ship.speed=0,this.turnVelocity=0,this.climbVelocity=0,this.boostLeft=0}place(t,e){this.ship.position.copy(t);const n=e.clone().sub(t).normalize();this.ship.yaw=Math.atan2(-n.x,-n.z),this.ship.pitch=Math.asin(fe.clamp(n.y,-1,1)),this.ship.speed=0,this.turnVelocity=0,this.climbVelocity=0}get thrustLevel(){return this.maxSpeed>0?this.ship.speed/this.maxSpeed:0}steer(t,e){const n=this.ship;this.boostLeft>0&&(this.boostLeft=Math.max(0,this.boostLeft-t));const s=this.boostLeft>0?this.boostCap:this.maxSpeed;e.thrust>0&&(n.speed+=this.maxSpeed*.5*t),e.thrust<0&&(n.speed-=this.maxSpeed*1*t),n.speed=fe.clamp(n.speed,0,s);const r=fe.clamp(e.turn*xv-th(e.mouseX)*vv,-Qc,Qc);this.turnVelocity+=(r-this.turnVelocity)*(1-Math.exp(-t*yv)),n.yaw+=this.turnVelocity*t;const a=-th(e.mouseY)*Mv;n.pitch+=(a-n.pitch)*(1-Math.exp(-t*Sv));const o=Math.max(4,this.maxSpeed*.45);this.climbVelocity+=(e.climb*o-this.climbVelocity)*(1-Math.exp(-t*Ev)),n.position.addScaledVector(this.forward(),n.speed*t),n.position.y+=this.climbVelocity*t;const c=Math.hypot(n.position.x,n.position.z);c>this.bound&&(n.position.x*=this.bound/c,n.position.z*=this.bound/c),n.position.y=fe.clamp(n.position.y,-this.ceiling,this.ceiling)}leave(t,e){if(this.phase==="idle"||this.phase==="leaving")return;this.fromPosition.copy(t.position),this.fromLook.copy(e);const n=this.mapTarget();this.toLook.copy(n),this.toPosition.set(n.x,this.mapDistance*Math.cos(Jc),n.z+this.mapDistance*Math.sin(Jc)),this.phase="leaving",this.elapsed=0}mapTarget(){return new R(this.ship.position.x/de,0,this.ship.position.z/de)}get returnDistance(){return this.mapDistance}update(t,e,n,s){let r=null;if(this.phase==="entering"||this.phase==="leaving"){const a=this.phase==="entering"?pv:mv;this.elapsed=Math.min(a,this.elapsed+t);const o=this.elapsed/a,c=o*o*(3-2*o);return this.phase==="entering"&&this.chasePose(this.toPosition,this.toLook),e.position.lerpVectors(this.fromPosition,this.toPosition,c),n.lerpVectors(this.fromLook,this.toLook,c),e.lookAt(n),this.lift=this.phase==="entering"?c:1-c,o>=1&&(r=this.phase==="entering"?"entered":"left",this.phase=this.phase==="entering"?"flying":"idle"),{finished:r}}return this.phase==="flying"&&(this.steer(t,s),this.chasePose(e.position,n),e.lookAt(n),this.lift=1),{finished:r}}chasePose(t,e){const n=this.forward();t.copy(this.ship.position).addScaledVector(n,-5.5),t.y+=gv,e.copy(this.ship.position).addScaledVector(n,_v)}}const eh=1844034,Ua=2436434,wv=15327692,Av=13623551;function Tv(){const i=new ke,t=d=>new on({color:d,side:Le}),e=new ol({color:wv,transparent:!0,opacity:.9}),n=(d,u)=>{const f=new ve(d,t(u)),m=new Ls(new Rp(d,20),e);i.add(f,m)},s=new cl(.15,1.05,10,1,!0).rotateX(-Math.PI/2).translate(0,0,-.32);n(s,eh);const r=new qr(.15,.12,.42,10,1,!0).rotateX(Math.PI/2).translate(0,0,.41);n(r,eh);const a=d=>{const u=new qt;return u.setAttribute("position",new Kt([d*.1,0,-.05,d*.1,0,.55,d*.92,-.04,.72],3)),u};n(a(1),Ua),n(a(-1),Ua);const o=new qt;o.setAttribute("position",new Kt([0,.1,.25,0,.1,.62,0,.42,.68],3)),n(o,Ua);const c=(()=>{const d=document.createElement("canvas");d.width=d.height=64;const u=d.getContext("2d");if(u){const f=u.createRadialGradient(32,32,0,32,32,32);f.addColorStop(0,"rgba(255,255,255,1)"),f.addColorStop(.35,"rgba(255,255,255,0.45)"),f.addColorStop(1,"rgba(255,255,255,0)"),u.fillStyle=f,u.fillRect(0,0,64,64)}return new dd(d)})(),l=new ad(new al({map:c,color:Av,transparent:!0,blending:pi,depthWrite:!1}));l.position.set(0,0,.7),i.add(l),i.rotation.order="YXZ",i.visible=!1;const h=d=>{const u=fe.clamp(d,0,1);l.scale.setScalar(.35+u*.55),l.material.opacity=.35+u*.6};return h(0),{group:i,setThrust:h}}const Rv=[{count:900,radius:1400,follow:.88,size:3.6,alpha:[.2,.55]},{count:700,radius:2400,follow:.95,size:5.2,alpha:[.12,.4]},{count:600,radius:3800,follow:.99,size:7,alpha:[.08,.28]}];class Cv{object=new ke;layers=[];constructor(t=11){let e=t;const n=()=>(e=Math.imul(e,1664525)+1013904223>>>0)/4294967296;for(const s of Rv){const r=new Float32Array(s.count*3),a=new Float32Array(s.count),o=new Float32Array(s.count*3),c=new Float32Array(s.count);for(let u=0;u<s.count;u++){const f=n()*Math.PI*2,m=Math.acos(2*n()-1),_=s.radius*(.9+n()*.2);r[u*3]=_*Math.sin(m)*Math.cos(f),r[u*3+1]=_*Math.cos(m),r[u*3+2]=_*Math.sin(m)*Math.sin(f),a[u]=s.size*(.5+n());const g=.8+n()*.2,p=n()*.06;o[u*3]=g,o[u*3+1]=g*(.98-p*.3),o[u*3+2]=g*(.96-p),c[u]=s.alpha[0]+n()*(s.alpha[1]-s.alpha[0])}const l=new qt;l.setAttribute("position",new ne(r,3)),l.setAttribute("aSize",new ne(a,1)),l.setAttribute("aColor",new ne(o,3)),l.setAttribute("aAlpha",new ne(c,1));const h=ml();h.uniforms.uMaxSize.value=3;const d=new Yr(l,h);d.frustumCulled=!1,this.layers.push({points:d,follow:s.follow}),this.object.add(d)}this.object.visible=!1}setScale(t){for(const{points:e}of this.layers)e.material.uniforms.uScale.value=t}follow(t){for(const{points:e,follow:n}of this.layers)e.position.copy(t.position).multiplyScalar(n)}}class Pv{object=new ke;texture;sprites=[];count=0;constructor(){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d");if(e){const n=e.createRadialGradient(64,64,0,64,64,64);n.addColorStop(0,"rgba(255,255,255,0.9)"),n.addColorStop(.4,"rgba(255,255,255,0.35)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,128,128)}this.texture=new dd(t),this.object.visible=!1}set(t){for(const e of this.sprites)this.object.remove(e),e.material.dispose();this.sprites=[];for(const e of t)for(let n=0;n<2;n++){const s=e.index*2.39+n*2.6,r=new ad(new al({map:this.texture,color:e.color,transparent:!0,opacity:.2,blending:pi,depthWrite:!1}));r.position.set(e.x+Math.cos(s)*e.radius*.35,e.y+Math.sin(s*1.3)*e.radius*.2,e.z+Math.sin(s)*e.radius*.35),r.scale.setScalar(e.radius*(1.35+.2*((n+e.index)%3))),this.sprites.push(r),this.object.add(r)}this.count=t.length}setOpacity(t){for(const e of this.sprites)e.material.opacity=.2*t}}class Lv{object=new ke;debris=[];rings=[];ranges=[];rocks=null;dummy=new Ae;elapsed=0;set(t,e){this.object.clear(),this.ranges.splice(0,this.ranges.length,...t),this.debris.length=0,this.rings.length=0;let s=t.reduce((d,u)=>Math.imul(d^Math.round(u.x*100+u.z),1664525)>>>0,2166136261);const r=()=>(s=Math.imul(s,1664525)+1013904223>>>0)/4294967296,a=Math.max(100,e*4.6);for(let d=0;d<4e3&&this.debris.length<140;d++){const u={x:(r()*2-1)*a,y:(r()*2-1)*a*.22,z:(r()*2-1)*a,r:.6+r()*1.4};Math.hypot(u.x,u.z+14)>e*4*1.25||t.some(f=>Math.hypot(u.x-f.x,u.y-f.y,u.z-f.z)<f.radius+u.r+8)||this.debris.push(u)}const o=new dl(1,0),c=new on({color:8226206}),l=new od(o,c,this.debris.length);l.frustumCulled=!1,this.debris.forEach((d,u)=>{this.dummy.position.set(d.x,d.y,d.z),this.dummy.scale.setScalar(d.r),this.dummy.rotation.set(r()*6,r()*6,r()*6),this.dummy.updateMatrix(),l.setMatrixAt(u,this.dummy.matrix);const f=.5+r()*.28;l.setColorAt(u,new Bt().setRGB(f*.72,f*.78,f))}),l.instanceMatrix.needsUpdate=!0,this.rocks=l,this.object.add(l);const h=[...t].sort((d,u)=>d.x-u.x||d.z-u.z);for(let d=0;d<h.length-1;d++){const u=h[d],f=h[d+1],m=f.x-u.x,_=f.z-u.z,g=Math.hypot(m,_);if(g<24)continue;const p={x:(u.x+f.x)/2,y:(u.y+f.y)/2,z:(u.z+f.z)/2,nx:m/g,ny:0,nz:_/g,radius:6};this.rings.push(p);const M=new ve(new ul(p.radius,.26,7,44),new on({color:14476788,transparent:!0,opacity:.62,depthWrite:!1}));M.position.set(p.x,p.y,p.z),M.quaternion.setFromUnitVectors(new R(0,0,1),new R(p.nx,0,p.nz)),this.object.add(M)}}update(t){this.elapsed+=t,this.rocks&&(this.rocks.rotation.y=Math.sin(this.elapsed*.08)*.008)}}const gl=8*de,Dv=6,Iv=.12,Uv=i=>{try{return new URL(i).hostname.replace(/^www\./,"")}catch{return""}};function Sd(i,t=32){if(typeof chrome>"u"||!chrome.runtime?.getURL)return null;const e=new URL(chrome.runtime.getURL("/_favicon/"));return e.searchParams.set("pageUrl",i),e.searchParams.set("size",String(t)),e.toString()}const Nv="https://bukusupe-unvisited-page.invalid/",ci=32;let Na=null;function Ed(i){const t=document.createElement("canvas");t.width=t.height=ci;const e=t.getContext("2d",{willReadFrequently:!0});if(!e)return null;e.drawImage(i,0,0,ci,ci);const n=e.getImageData(0,0,ci,ci).data;let s=2166136261;for(let r=0;r<n.length;r++)s=Math.imul(s^n[r],16777619)>>>0;return`${s.toString(16)}:${n.length}`}function Fv(i){return new Promise(t=>{const e=new Image;e.onload=()=>t(e),e.onerror=()=>t(null),e.src=i})}function Ov(){if(!Na){const i=Sd(Nv,ci);Na=i?Fv(i).then(t=>t?Ed(t):null):Promise.resolve(null)}return Na}function kv(i){let t=2166136261;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),16777619)>>>0;return`hsl(${t%360}, 24%, 76%)`}class Bv{constructor(t){this.container=t}container;entries=new Map;shown=[];timer=0;nearby=0;update(t,e,n,s){if(this.timer-=t,this.timer<=0){this.timer=Iv;const r=e.map(o=>({star:o,d:n(o.id)})).filter(o=>o.d<gl).sort((o,c)=>o.d-c.d||(o.star.id<c.star.id?-1:1));this.nearby=r.length;const a=r.slice(0,Dv).map(o=>o.star);this.show(a)}for(const r of this.shown){const a=this.entries.get(r);if(!a)continue;const o=s(r);if(!o){a.el.style.opacity="0";continue}a.el.style.opacity=String(.55+.45*o.near),a.el.style.transform=`translate3d(${(o.x+14).toFixed(1)}px, ${(o.y-34).toFixed(1)}px, 0)`}}clear(){this.show([]),this.nearby=0,this.timer=0}get visibleIds(){return this.shown.slice()}show(t){const e=new Set(t.map(n=>n.id));for(const n of this.shown){if(e.has(n))continue;const s=this.entries.get(n);s&&(s.el.style.display="none")}for(const n of t){let s=this.entries.get(n.id);s||(s={el:this.build(n),star:n},this.entries.set(n.id,s),this.container.appendChild(s.el)),s.el.style.display=""}this.shown=t.map(n=>n.id)}build(t){const e=document.createElement("div");e.className="flight-window",e.dataset.key=t.id;const n=Sd(t.url,ci),s=Uv(t.url),r=document.createElement("span");r.className="flight-window-crest",r.textContent=(s[0]??"?").toUpperCase(),r.style.background=kv(s);const a=()=>{e.dataset.icon="crest",r.style.display="";const h=e.querySelector("img");h&&(h.style.display="none")};if(n){const h=document.createElement("img");h.alt="",h.width=16,h.height=16,h.style.display="none",r.style.display="none",h.onload=async()=>{const[d,u]=[Ed(h),await Ov()];d&&u&&d===u?a():(e.dataset.icon="favicon",h.style.display="")},h.onerror=a,h.src=n,e.append(h,r)}else e.append(r),a();const o=document.createElement("div"),c=document.createElement("div");c.className="flight-window-title",c.textContent=t.title;const l=document.createElement("div");return l.className="flight-window-domain",l.textContent=s,o.append(c,l),e.appendChild(o),e.style.opacity="0",e}}class zv{constructor(t){this.container=t}container;signs=[];set(t){for(const{el:e}of this.signs)e.remove();this.signs=t.map(e=>{const n=document.createElement("div");return n.className="flight-sign",n.dataset.cluster=String(e.index),n.textContent=e.name,n.style.opacity="0",this.container.appendChild(n),{spec:e,el:n}})}update(t,e,n){for(const{spec:s,el:r}of this.signs){const a=t(s.x,s.y+s.radius*.9,s.z);if(!a||n<=0){r.style.display="none";continue}const o=e(s),c=Math.min(1,Math.max(0,(o-s.radius*.4)/(s.radius*1.2)));r.style.display="",r.style.opacity=String((.12+.73*c)*n),r.style.transform=`translate3d(${a.x.toFixed(1)}px, ${a.y.toFixed(1)}px, 0) translate(-50%, -100%)`}}clear(){for(const{el:t}of this.signs)t.style.display="none"}}const nh=24,Hv=30*de,Vv=.2;class Gv{constructor(t){this.container=t}container;limit=nh;entries=new Map;shown=[];timer=0;update(t,e,n,s,r){if(this.timer-=t,this.timer<=0){this.timer=Vv;const a=new Set(n),o=[],c=Math.max(1,Math.ceil(e.length/400));for(let f=0;f<e.length;f+=c){const m=e[f];if(a.has(m.id))continue;const _=s(m.id);_>=gl&&_<Hv&&o.push({star:m,d:_})}o.sort((f,m)=>f.d-m.d||f.star.id.localeCompare(m.star.id));const l=[],h=[];let d=0;for(const{star:f}of o){if(++d>160)break;const m=r(f.id);if(!m||m.x<24||m.y<80||m.x>innerWidth-24||m.y>innerHeight-52)continue;let _=this.entries.get(f.id);const g=_?.width??Math.min(180,Math.max(28,[...f.title].length*12)),p={x:m.x+10,y:m.y-14,w:g+20};if(!l.some(M=>p.x<M.x+M.w+16&&M.x<p.x+p.w+16&&p.y<M.y+30&&M.y<p.y+30)){if(!_){const M=document.createElement("div");M.className="flight-far-label",M.dataset.key=f.id,M.textContent=f.title,M.style.display="none",this.container.appendChild(M),_={id:f.id,el:M,width:g},this.entries.set(f.id,_)}if(l.push(p),h.push(_),h.length>=nh)break}}const u=new Set(h.map(f=>f.id));for(const f of this.shown)u.has(f.id)||(f.el.style.display="none");for(const f of h)f.el.style.display="";this.shown=h}for(const a of this.shown){const o=r(a.id);if(!o){a.el.style.display="none";continue}a.el.style.transform=`translate3d(${(o.x+10).toFixed(1)}px, ${(o.y-14).toFixed(1)}px, 0)`}}clear(){for(const t of this.shown)t.el.style.display="none";this.shown=[],this.timer=0}}function Wv(i){const t=Math.max(12,Ph(i)*.32),e=new Map(i.clusters.map(s=>[s.index,s])),n=new Map;for(const s of i.stars){const r=e.get(s.cluster);if(!r){n.set(s.id,0);continue}const a=(ih(`cluster:${r.index}`)-.5)*t,o=Math.hypot(s.x-r.x,s.y-r.y),c=Math.sqrt(Math.max(0,r.radius*r.radius-o*o)),l=(ih(`star:${s.id}`)*2-1)*c*.9;n.set(s.id,a+l)}return n}function ih(i){let t=2166136261;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),16777619)>>>0;return t%1e5/1e5}const xs=-1;function Fa(i,t){return new je({transparent:!0,depthWrite:!1,uniforms:{uColor:{value:new Bt(i)},uOpacity:{value:t},uHoleCenter:{value:new R},uHoleRadius:{value:0}},vertexShader:`varying vec3 vWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }`,fragmentShader:`uniform vec3 uColor; uniform float uOpacity; uniform vec3 uHoleCenter; uniform float uHoleRadius;
      varying vec3 vWorld;
      void main() {
        if (uHoleRadius > 0.0 && distance(vWorld, uHoleCenter) < uHoleRadius) discard;
        gl_FragColor = vec4(uColor, uOpacity);
      }`})}const Xv=i=>i.uniforms.uOpacity.value;class jv{object=new ke;entries=new Map;active=null;drawing=null;animated=new Ls(new qt,Fa(15124620,.95));rings=new ke;ringIds=[];novae=new ke;novaIds=[];constructor(){this.animated.visible=!1,this.animated.renderOrder=xs,this.rings.renderOrder=xs,this.novae.renderOrder=xs,this.object.add(this.animated,this.rings,this.novae)}set(t){for(const e of this.entries.values())this.object.remove(e.line,e.glints),e.line.geometry.dispose(),e.line.material.dispose(),e.glints.geometry.dispose(),e.glints.material.dispose();this.entries.clear();for(const e of t){const n=ku(e.points),s=new Map(e.points.map(d=>[d.id,d])),r=[];for(const d of n){const u=s.get(d.a),f=s.get(d.b);r.push(u.x,.12,-u.y,f.x,.12,-f.y)}const a=new qt;a.setAttribute("position",new Kt(r,3));const o=new Ls(a,Fa(14203e3,.15));o.renderOrder=xs;const c=new qt;c.setAttribute("position",new Kt(e.points.flatMap(d=>[d.x,.14,-d.y]),3));const l=new Yr(c,new hd({color:15124620,size:2.5,sizeAttenuation:!1,transparent:!0,opacity:.2,depthWrite:!1}));l.renderOrder=xs;const h={data:e,edges:n,line:o,glints:l};this.entries.set(e.id,h),this.object.add(o,l),this.lift>0&&this.applyLift(h),this.applyHole(h)}this.active&&!this.entries.has(this.active)&&(this.active=null),this.style()}select(t){this.active=t,this.style()}flying=!1;hole=null;heightOf=()=>0;lift=0;testOpacity=null;testLine=null;setTestLine(t,e=0){if(this.testLine&&this.object.remove(this.testLine),this.testLine=null,!t)return;const n=[new R(t.x-e*1.4,t.y,t.z),new R(t.x+e*1.4,t.y,t.z)],s=new cd(new qt().setFromPoints(n),Fa(16777215,1));s.renderOrder=-1,this.applyHoleTo(s.material),this.testLine=s,this.object.add(s)}setTestOpacity(t){this.testOpacity=t,this.style()}setFlight(t){this.flying=t,this.rings.visible=!t,this.novae.visible=!t,this.style()}setSearchHole(t,e=0){this.hole=t?{center:t.clone(),radius:e}:null;for(const n of this.entries.values())this.applyHole(n);this.applyHoleTo(this.animated.material),this.style()}applyHole(t){this.applyHoleTo(t.line.material)}applyHoleTo(t){t.uniforms.uHoleCenter.value.copy(this.hole?.center??new R),t.uniforms.uHoleRadius.value=this.hole?.radius??0}setLift(t,e){this.heightOf=t,this.lift=e;for(const n of this.entries.values())this.applyLift(n)}applyLift(t){const e=(r,a)=>a+this.heightOf(r)*this.lift,n=t.line.geometry.getAttribute("position");t.edges.forEach((r,a)=>{n.setY(a*2,e(r.a,.12)),n.setY(a*2+1,e(r.b,.12))}),n.needsUpdate=!0;const s=t.glints.geometry.getAttribute("position");t.data.points.forEach((r,a)=>s.setY(a,e(r.id,.14))),s.needsUpdate=!0}segments(){return[...this.entries].flatMap(([t,e])=>{const n=e.line.geometry.getAttribute("position");return e.edges.map((s,r)=>({id:t,a:s.a,b:s.b,az:n.getY(r*2),bz:n.getY(r*2+1)}))})}editMembers(t,e=!0){this.ringIds=t.map(n=>n.id);for(const n of[...this.rings.children])this.rings.remove(n),n.geometry.dispose(),n.material.dispose();for(const n of t){const s=new ve(e?new Hn(.34,.52,28):new Hn(.36,.44,28),new on({color:e?15124620:14203e3,transparent:!0,opacity:e?.95:.6,side:Le,depthWrite:!1}));s.rotation.x=-Math.PI/2,s.position.set(n.x,.16,-n.y),this.rings.add(s)}}setNovae(t){this.novaIds=t.map(e=>e.id);for(const e of[...this.novae.children]){this.novae.remove(e);for(const n of e.children)n.geometry.dispose(),n.material.dispose()}for(const e of t){const n=new ke;for(const[s,r,a]of[[.34,.38,.85],[.5,.52,.4]]){const o=new ve(new Hn(s,r,32),new on({color:15525590,transparent:!0,opacity:a,side:Le,depthWrite:!1}));o.rotation.x=-Math.PI/2,n.add(o)}n.position.set(e.x,.16,-e.y),this.novae.add(n)}}novaeIds(){return[...this.novaIds]}moveEditMembers(t,e=1){this.rings.children.forEach((n,s)=>{const r=t(this.ringIds[s]);r&&n.position.set(r.x,.16,-r.y),n.scale.setScalar(e)}),this.novae.children.forEach((n,s)=>{const r=t(this.novaIds[s]);r&&n.position.set(r.x,.16,-r.y),n.scale.setScalar(e)})}startDrawing(t){this.drawing={id:t,elapsed:0},this.animated.visible=!0,this.animated.geometry.dispose(),this.animated.geometry=new qt,this.style()}update(t){if(!this.drawing)return;const{id:e}=this.drawing,n=this.entries.get(e);if(!n){this.drawing=null,this.animated.visible=!1;return}this.drawing.elapsed+=t;const s=Math.max(0,(this.drawing.elapsed-.95)/.12),r=Math.min(n.edges.length,Math.floor(s)),a=Math.min(1,s-r),o=new Map(n.data.points.map(l=>[l.id,l])),c=[];for(let l=0;l<r+(a>0?1:0);l++){const h=n.edges[l];if(!h)break;const d=o.get(h.a),u=o.get(h.b),f=l<r?1:a;c.push(d.x,.17,-d.y,d.x+(u.x-d.x)*f,.17,-(d.y+(u.y-d.y)*f))}this.animated.geometry.dispose(),this.animated.geometry=new qt,this.animated.geometry.setAttribute("position",new Kt(c,3)),s>=n.edges.length&&(this.drawing=null,this.animated.visible=!1,this.style())}get isAnimating(){return this.drawing!==null}animationState(){const t=this.drawing&&this.entries.get(this.drawing.id);if(!this.drawing||!t)return{phase:"done",edgesDrawn:0,edges:0};const e=(this.drawing.elapsed-.95)/.12;return{phase:e<0?"returning":"drawing",edgesDrawn:Math.max(0,Math.min(t.edges.length,Math.floor(e))),edges:t.edges.length}}geometry(){return[...this.entries].map(([t,e])=>({id:t,members:e.data.points.map(n=>n.id),edges:e.edges,opacity:Xv(e.line.material)}))}points(t){return this.entries.get(t)?.data.points??[]}style(){for(const[t,e]of this.entries){const n=t===this.active,s=this.drawing?.id===t,r=!!this.hole;e.line.material.uniforms.uOpacity.value=this.testOpacity??(s?0:r?this.flying?.1:.07:this.flying?.22:n?.85:.15),e.glints.material.opacity=this.flying?.3:s?0:n?.9:.2,e.glints.visible=!r}}}const Oa=.45*de,Yv=.45,qv=4e3,sh=50,Kv=12,ka=2.55*1.2,Gi=fe.degToRad(40),rh=fe.degToRad(60),$v=.6,ah=.85,oh=.65,Zv=.8,Jv=1.1,Qv=9,Ba={KeyW:[0,1],KeyS:[0,-1],KeyA:[-1,0],KeyD:[1,0]};function za(){const i=document.activeElement;return!!i&&(i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement||i.isContentEditable)}const Ha=.6;function lh(i,t){if(i.length===0)return{minX:-t,maxX:t,minY:-t,maxY:t};let e=1/0,n=-1/0,s=1/0,r=-1/0;for(const a of i)e=Math.min(e,a.x),n=Math.max(n,a.x),s=Math.min(s,a.y),r=Math.max(r,a.y);return{minX:e,maxX:n,minY:s,maxY:r}}class ty{constructor(t,e){this.canvas=t,this.renderer=new _x({canvas:t,antialias:!0,alpha:!1}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.setClearColor(461336,1),this.camera=new Je(50,1,.5,6e3),this.camera.position.set(0,90*Math.cos(Gi),90*Math.sin(Gi)),this.camera.lookAt(0,0,0),this.controls=new zx(this.camera,t),this.controls.enableRotate=!1,this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.screenSpacePanning=!1,this.controls.minDistance=6,this.controls.touches={ONE:un.PAN,TWO:un.DOLLY_PAN},this.controls.maxDistance=2e3,this.controls.addEventListener("start",()=>{this.focus=null});for(const a of[t,e])a.addEventListener("pointerdown",this.onTiltStart,!0),a.addEventListener("pointermove",this.onTiltMove,!0),a.addEventListener("pointerup",this.onTiltEnd,!0),a.addEventListener("pointercancel",this.onTiltEnd,!0),a.addEventListener("contextmenu",o=>o.preventDefault());this.backdrop=fv(),this.scene.add(this.backdrop),this.scene.add(this.nebulae.object),this.scene.add(this.field.object),this.scene.add(this.constellations.object),this.constellationName=document.getElementById("constellation-name");const n=new ve(new rs(2.5,2.5).rotateX(-Math.PI/2),new je({transparent:!0,depthWrite:!1,depthTest:!1,blending:pi,vertexShader:`varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`varying vec2 vUv;
          void main() {
            float r = length((vUv - 0.5) * 2.5);
            float ring = exp(-pow((r - 0.42) / 0.09, 2.0));
            float halo = exp(-pow((r - 0.55) / 0.31, 2.0));
            gl_FragColor = vec4(0.48, 0.65, 1.0, ring * 0.68 + halo * 0.28);
          }`}));n.position.y=.05,n.renderOrder=2,this.blackHole.add(n);const s=new ve(new ll(.36,48),new on({color:4,side:Le,depthTest:!1}));s.rotation.x=-Math.PI/2,s.position.y=.08,s.renderOrder=3,this.blackHole.add(s);const r=new ve(new Hn(.355,.395,64),new on({color:11060735,transparent:!0,opacity:.95,side:Le,depthWrite:!1,depthTest:!1}));r.rotation.x=-Math.PI/2,r.position.y=.09,r.renderOrder=4,this.blackHole.add(r);for(const a of[1,1.75,2.55]){const o=new ve(new Hn(a-.012,a+.012,96),new on({color:7903199,transparent:!0,opacity:.23,side:Le}));o.rotation.x=-Math.PI/2,o.position.y=.03,this.blackHole.add(o)}this.blackHole.visible=!1,this.scene.add(this.blackHole),this.trace.visible=!1,this.trace.geometry.setAttribute("position",new ne(new Float32Array(12),3).setUsage(ta)),this.trace.geometry.setDrawRange(0,0),this.scene.add(this.trace),this.tails.visible=!1,this.tails.geometry.setAttribute("position",new ne(new Float32Array(504),3).setUsage(ta)),this.tails.geometry.setAttribute("aAlpha",new ne(new Float32Array(168),1).setUsage(ta)),this.tails.geometry.setDrawRange(0,0),this.scene.add(this.tails),this.selectedHalo.rotation.x=-Math.PI/2,this.selectedHalo.visible=!1,this.scene.add(this.selectedHalo),this.labels=new Qx(e),this.labels.onHover=a=>this.hoverStar(a),this.labels.onClick=a=>this.onStarLabelClick?.(a),this.labels.onClusterClick=a=>this.focusCluster(a),addEventListener("resize",this.resize),this.scene.add(this.ship.group),this.scene.add(this.sky.object),this.scene.add(this.flightNebulae.object),this.scene.add(this.obstacles.object),this.obstacles.object.visible=!1,document.body.classList.remove("flight-boost"),window.addEventListener("mousemove",a=>{this.flight.active&&this.flightMouse.set(a.clientX/innerWidth*2-1,a.clientY/innerHeight*2-1)}),document.addEventListener("mouseleave",()=>this.flightMouse.set(0,0)),addEventListener("keydown",this.onKeyDown),addEventListener("keyup",this.onKeyUp);for(const a of["pointerdown","pointermove","pointerup","wheel","keydown","keyup","touchstart","touchmove","touchend"])addEventListener(a,()=>this.wake(),{capture:!0,passive:!0});document.addEventListener("visibilitychange",()=>{document.hidden||this.wake()}),addEventListener("blur",this.releaseKeys),document.addEventListener("visibilitychange",this.releaseKeys),this.resize()}canvas;renderer;scene=new Mp;camera;controls;clock=new Ip;backdrop;field=new dv;nebulae=new nv;constellations=new jv;labels;running=!1;looping=!1;idleFrames=0;rafId=null;loop=()=>{this.rafId=null,this.tick(),this.looping&&this.rafId===null&&(this.rafId=requestAnimationFrame(this.loop))};holds=new Set;continuous=!1;paused=!1;extent=60;bounds={minX:-30,maxX:30,minY:-30,maxY:30};fitDistance=90;labelSource={clusters:[],stars:[]};labelsDirty=!0;hoveredMapId=null;lastLabelMotion=0;lastLabelTier=null;lastLabelCamera=new te;labelCameraKnown=!1;labelDecisions=0;labelPositionUpdates=0;maxLabelPositionMs=0;screenCircles=[];tilt=Gi;tiltTarget=Gi;tiltSpeed=Gi/Ha;preferredTilt=Gi;tiltPointer=null;tiltPointerY=0;tiltCapture=null;focus=null;keys=new Set;keyPan=new ht;keyZoom=0;editIds=[];novaIds=[];flight=new bv;flightLook=new R;ship=Tv();sky=new Cv;flightNebulae=new Pv;obstacles=new Lv;collisionStars=null;bumps=0;boosts=0;lastBump=null;ringCooldown=new Map;shakeLeft=0;boostVisualLeft=0;signs=new zv(document.getElementById("flight-signs")??document.body);windows=new Bv(document.getElementById("flight-windows")??document.body);farLabels=new Gv(document.getElementById("flight-far-labels")??document.body);windowStars=[];dive=null;entryCooldown=new Map;lastEntry=null;flash=document.getElementById("flight-flash");onEnterStar=null;flightMouse=new ht;flightSearch=null;heights=new Map;onFlightChange=null;searchStash=null;emphasisIds=new Set;emphasisMode="none";searchIds=[];searchCenter={x:0,y:0};searchUnit=1;blackHole=new ke;trace=new Ls(new qt,new ol({color:9550591,transparent:!0,opacity:.32,depthWrite:!1}));tails=new Ls(new qt,new je({transparent:!0,depthWrite:!1,vertexShader:`attribute float aAlpha; varying float vAlpha;
        void main() { vAlpha = aAlpha; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`varying float vAlpha;
        void main() { gl_FragColor = vec4(0.56, 0.73, 1.0, vAlpha); }`}));selectedHalo=new ve(new Hn(.35,.47,32),new on({color:16777215,transparent:!0,opacity:.85,side:Le}));selectedId=null;hoveredId=null;fullTraceCount=0;maxTailPixels=0;constellationName=null;constellationNameId=null;constellationNameWait=!1;frames=0;onStarLabelClick=null;onKeyDown=t=>{za()||t.ctrlKey||t.metaKey||t.altKey||(t.code in Ba?this.keys.add(t.code):t.code==="Space"?(this.keys.add("Space"),t.preventDefault()):t.key==="Shift"&&this.keys.add("Shift"))};onKeyUp=t=>{t.code in Ba?this.keys.delete(t.code):t.code==="Space"?(this.keys.delete("Space"),t.preventDefault()):t.key==="Shift"&&this.keys.delete("Shift")};releaseKeys=()=>{this.keys.clear()};applyKeys(t){za()&&this.keys.clear();const e=new ht;for(const l of this.keys){const h=Ba[l];h&&e.add(new ht(h[0],h[1]))}e.lengthSq()>0&&e.normalize();const n=this.camera.position.distanceTo(this.controls.target),s=1-Math.exp(-t*Qv);this.keyPan.lerp(e.multiplyScalar(n*Zv),s);const r=(this.keys.has("Space")?1:0)-(this.keys.has("Shift")?1:0);this.keyZoom+=(r*Jv-this.keyZoom)*s;const a=this.keyPan.length()>n*.002,o=Math.abs(this.keyZoom)>.002;if(a||this.keyPan.set(0,0),o||(this.keyZoom=0),!a&&!o)return;this.focus=null,this.controls.target.x+=this.keyPan.x*t,this.controls.target.z-=this.keyPan.y*t;const c=fe.clamp(n*Math.exp(this.keyZoom*t),this.controls.minDistance,this.controls.maxDistance);this.setDistance(c)}setLayout(t,e,n,s=!0){this.wake(),this.collisionStars=null,this.field.setStars(e),this.field.setEmphasis([...this.emphasisIds],this.emphasisMode),this.heights=Wv(t),this.field.setHeights(this.heights),this.extent=Ph(t),this.placeFlightClusters(t,n),this.field.setLift(this.flight.lift),this.flight.active&&(s=!1),this.nebulae.set(n.clusters.filter(r=>r.count>0).map(r=>({x:r.x,y:r.y,radius:r.radius,color:Zc(r.index),seed:r.index}))),this.labelSource=n,this.windowStars=n.stars.map(r=>({id:r.id,title:r.title,url:r.url})),this.bounds=lh(e,this.extent),s&&this.frameAll(),this.resize(),this.labelsDirty=!0}setConstellations(t){this.wake(),this.constellations.set(t),this.constellations.setLift(e=>this.heights.get(e)??0,this.flight.lift),this.refreshEmphasis()}setNovae(t){this.wake(),this.novaIds=t.map(e=>e.id),this.refreshEmphasis()}novaeShown(){return this.constellations.novaeIds()}setEditMembers(t){this.wake(),this.editIds=t.map(e=>e.id),this.refreshEmphasis()}refreshEmphasis(){const t=this.searchIds.length>0,e=this.constellationNameId&&!t?this.constellations.points(this.constellationNameId):[],n=this.editIds.length?"edit":e.length?"selected":"none";this.constellations.select(t?null:this.constellationNameId),this.constellationName&&!this.constellationNameWait&&this.constellationName.classList.toggle("is-visible",!!this.constellationNameId&&!t);const s=n==="edit"?this.editIds:e.map(c=>c.id),r=n==="selected"?this.novaIds.filter(c=>!s.includes(c)):[],a=[...s,...r];this.emphasisIds=new Set(a),this.emphasisMode=n,this.field.setEmphasis(a,n);const o=c=>c.flatMap(l=>{const h=this.field.displayPosition(l);return h?[{id:l,...h}]:[]});this.constellations.editMembers(o(s),n==="edit"),this.constellations.setNovae(o(r)),this.labelsDirty=!0}selectConstellation(t,e=""){this.wake(),this.constellations.select(t),this.constellationNameId=t,this.searchStash=null,this.refreshEmphasis(),this.constellationNameWait=!1,this.constellationName&&(this.constellationName.textContent=e,this.constellationName.classList.toggle("is-visible",!!t))}saveConstellation(t,e,n){this.wake(),this.setTopDown(!0),this.setSearch([]),this.selectSearch(null),this.constellations.select(t),this.constellations.startDrawing(t),this.constellationNameId=t,this.refreshEmphasis(),this.constellationNameWait=!0,this.constellationName&&(this.constellationName.textContent=e,this.constellationName.classList.remove("is-visible")),this.focusPoints(n)}focusPoints(t){if(this.wake(),!t.length)return;const e=this.safeRect(),n=this.renderer.getSize(new ht),s={target:this.controls.target.clone(),position:this.camera.position.clone(),tilt:this.tilt},r=lh(t,this.extent),a=new R((r.minX+r.maxX)/2,0,-(r.minY+r.maxY)/2);let o=Math.max(this.controls.minDistance,(r.maxX-r.minX+r.maxY-r.minY)*1.2+10);const c=new hn(new R(0,1,0),0),l=new _c,h=(u,f)=>(l.setFromCamera(new ht(u/n.x*2-1,-(f/n.y)*2+1),this.camera),l.ray.intersectPlane(c,new R)),d=new R;this.tilt=this.tiltTarget;for(let u=0;u<8;u++){this.controls.target.copy(a),this.setDistance(o),this.camera.updateMatrixWorld();let f=1/0,m=-1/0,_=1/0,g=-1/0;for(const S of t){d.set(S.x,0,-S.y).project(this.camera);const C=(d.x*.5+.5)*n.x,T=(-d.y*.5+.5)*n.y;f=Math.min(f,C),m=Math.max(m,C),_=Math.min(_,T),g=Math.max(g,T)}const p=Math.max((m-f+24)/(e.width*.8),(g-_+24)/(e.height*.8),.05),M=h((f+m)/2,(_+g)/2),b=h(e.left+e.width/2,e.top+e.height/2);M&&b&&a.add(M.sub(b)),o=fe.clamp(o*p,this.controls.minDistance,this.controls.maxDistance)}this.controls.target.copy(s.target),this.camera.position.copy(s.position),this.tilt=s.tilt,this.controls.update(),this.focus={from:this.controls.target.clone(),to:a,fromDistance:this.camera.position.distanceTo(this.controls.target),toDistance:o,elapsed:0,duration:oh}}safeRect(){const t=this.renderer.getSize(new ht),e=_=>{const g=document.getElementById(_);if(!g||g.hidden||getComputedStyle(g).display==="none")return null;const p=g.getBoundingClientRect();return p.width>0&&p.height>0?p:null},n=12,s=e("search-box"),r=["constellation-list","constellation-manage","constellation-novae"].map(e).filter(_=>!!_),a=["hud","hud-toggle"].map(e).filter(_=>!!_),o=(s?.bottom??0)+n,c=Math.min(t.y,...r.map(_=>_.top))-n,l=Math.max(0,...a.map(_=>_.right))+n,h=Math.max(0,...a.map(_=>_.bottom))+n,d={left:a.length?l:n,top:o,right:t.x-n,bottom:c},u={left:n,top:Math.max(o,a.length?h:0),right:t.x-n,bottom:c},f=_=>Math.max(0,_.right-_.left)*Math.max(0,_.bottom-_.top),m=f(d)>=f(u)?d:u;return{left:m.left,top:m.top,width:Math.max(40,m.right-m.left),height:Math.max(40,m.bottom-m.top)}}constellationAnimationState(){return this.constellations.animationState()}constellationGeometry(){return this.constellations.geometry()}get inFlight(){return this.flight.active}navigationCamera(){return{x:this.controls.target.x,y:-this.controls.target.z,distance:this.flight.active?this.flight.returnDistance:this.camera.position.distanceTo(this.controls.target),tilt:this.flight.active?this.preferredTilt:this.tilt}}restoreNavigationCamera(t){this.wake(),this.focus=null,this.controls.target.set(t.x,0,-t.y),this.tilt=this.tiltTarget=this.preferredTilt=fe.clamp(t.tilt,0,rh),this.setDistance(t.distance),this.labelsDirty=!0}resumeFlight(t){this.wake(),this.enterFlight()&&(this.flight.resume(new R(t.x*de,t.z*de,-t.y*de),t.yaw,t.pitch,t.speed,this.camera,this.flightLook),this.field.setLift(1),this.field.object.scale.setScalar(de),this.constellations.object.scale.setScalar(de),this.constellations.setLift(e=>this.heights.get(e)??0,1),this.flightNebulae.setOpacity(1))}enterFlight(){if(this.wake(),this.flight.active)return!1;this.flightSearch=this.searchIds.slice(),this.collisionStars=null,this.searchIds=[],this.field.setSearch([],this.searchCenter,this.searchUnit),this.constellations.setSearchHole(null),this.blackHole.visible=!1,this.trace.visible=!1,this.tails.visible=!1,this.selectedHalo.visible=!1,this.focus=null,this.keys.clear(),this.controls.enabled=!1,this.labels.clear(),this.nebulae.object.visible=!1,this.constellations.setFlight(!0),this.constellationName?.classList.remove("is-visible"),this.setFlightMaterial(!0);const t=this.camera.position.distanceTo(this.controls.target);return this.flightMouse.set(0,0),this.flight.enter(this.camera,this.controls.target.clone(),t,3,this.extent),this.ship.group.visible=!0,this.sky.object.visible=!0,this.flightNebulae.object.visible=!0,this.obstacles.object.visible=!0,this.backdrop.visible=!1,this.onFlightChange?.(!0),!0}exitFlight(){return this.wake(),!this.flight.active||this.flight.phase==="leaving"?!1:(this.endDive(!1),this.flight.leave(this.camera,this.flightLook),!0)}finishFlight(){this.field.object.scale.setScalar(1),this.constellations.object.scale.setScalar(1),this.controls.target.copy(this.flight.mapTarget()),this.tilt=0,this.setDistance(this.flight.returnDistance),this.controls.enabled=!0,this.nebulae.object.visible=!0,this.ship.group.visible=!1,this.sky.object.visible=!1,this.flightNebulae.object.visible=!1,this.obstacles.object.visible=!1,document.body.classList.remove("flight-boost"),this.backdrop.visible=!0,this.windows.clear(),this.farLabels.clear(),this.signs.clear(),this.constellations.setFlight(!1),this.setFlightMaterial(!1);const t=this.flightSearch??[];this.flightSearch=null,this.tiltTarget=t.length?0:this.preferredTilt,this.tiltSpeed=Math.abs(this.tiltTarget-this.tilt)/Ha,t.length&&(this.setSearch(t),this.selectSearch(this.selectedId)),this.refreshEmphasis(),this.labelsDirty=!0,this.lastLabelTier=null,this.onFlightChange?.(!1)}setFlightMaterial(t){const e=this.field.object.material;e.uniforms.uMaxSize.value=t?rv:Md,e.uniforms.uFlight.value=t?1:0,e.uniforms.uSizeScale.value=t?av:1}placeFlightClusters(t,e){const n=new Map;for(const a of t.stars){const o=n.get(a.cluster)??{h:0,n:0};o.h+=this.heights.get(a.id)??0,o.n++,n.set(a.cluster,o)}const s=e.clusters.filter(a=>a.count>0),r=a=>{const o=n.get(a.index),c=o&&o.n?o.h/o.n:0;return{x:a.x*de,y:c*de,z:-a.y*de,radius:a.radius*de}};this.obstacles.set(s.map(a=>({...r(a),radius:a.radius*de*1.8})),this.extent),this.flightNebulae.set(s.map(a=>({index:a.index,...r(a),color:Zc(a.index)}))),this.signs.set(s.map(a=>({index:a.index,name:a.name,...r(a)})))}setStarAppearance(t){this.wake(),this.field.setAppearance(t)}get spaceScale(){return 1+(de-1)*this.flight.lift}worldOf(t,e=new R){return this.field.positionWorld(t,e,this.spaceScale)?e:null}flightStars(){const t=this.spaceScale;return this.field.placed.flatMap(e=>{const n=this.field.position3(e.id);return n?[{id:e.id,x:n.x*t,y:n.y*t,z:n.z*t}]:[]})}flightConstellationSegments(){return this.constellations.segments().map(t=>({...t,az:t.az-.12,bz:t.bz-.12}))}flightReset(){this.wake(),this.flight.reset()}flightDebris(t=!1){return t&&this.obstacles.set(this.obstacles.ranges.slice(),this.extent),this.obstacles.debris.map(e=>({...e}))}flightNebulaRanges(){return this.obstacles.ranges.map(t=>({...t}))}flightRings(){return this.obstacles.rings.map(t=>({...t}))}flightPlace(t,e,n,s,r,a){this.wake(),this.flight.place(new R(t,e,n),new R(s,r,a))}flightHeights(){return this.field.placed.map(t=>({id:t.id,z:this.heights.get(t.id)??0}))}entryDistance(){const t=this.lastEntry?this.worldOf(this.lastEntry):null;return t?this.flight.ship.position.distanceTo(t):null}flightState(){const t=this.flight.ship;return{active:this.flight.active,phase:this.flight.phase,transitioning:this.flight.transitioning,lift:this.flight.lift,nearby:this.windows.nearby,windows:this.windows.visibleIds,nebulae:this.flightNebulae.count,diving:!!this.dive,lastEntry:this.lastEntry,entryDistance:this.entryDistance(),scale:de,searchStashed:this.flightSearch?.length??0,bumps:this.bumps,boosts:this.boosts,boostCap:this.flight.boostCap,maxSpeed:this.flight.normalMaxSpeed,lastBump:this.lastBump,farLabelLimit:this.farLabels.limit,ship:{x:t.position.x/de,y:-t.position.z/de,z:t.position.y/de,speed:t.speed,yaw:t.yaw,pitch:t.pitch}}}setTopDown(t){this.wake(),this.tiltTarget=t?0:this.preferredTilt,this.tiltSpeed=Math.abs(this.tiltTarget-this.tilt)/Ha}onTiltStart=t=>{t.button!==2||this.flight.active||(this.focus=null,this.tiltPointer=t.pointerId,this.tiltPointerY=t.clientY,this.tiltCapture=t.currentTarget,this.tiltCapture.setPointerCapture(t.pointerId),t.preventDefault(),t.stopImmediatePropagation())};onTiltMove=t=>{if(t.pointerId!==this.tiltPointer)return;const e=t.clientY-this.tiltPointerY;this.tiltPointerY=t.clientY,this.tilt=fe.clamp(this.tilt+e*.004,0,rh),this.preferredTilt=this.tiltTarget=this.tilt,this.setDistance(this.camera.position.distanceTo(this.controls.target)),t.preventDefault(),t.stopImmediatePropagation()};onTiltEnd=t=>{t.pointerId===this.tiltPointer&&(this.tiltPointer=null,this.tiltCapture?.hasPointerCapture(t.pointerId)&&this.tiltCapture.releasePointerCapture(t.pointerId),this.tiltCapture=null,t.preventDefault(),t.stopImmediatePropagation())};setSearch(t){this.wake();const e=this.searchIds.length>0,n=t.length>0;!e&&n&&this.constellationNameId?this.searchStash={target:this.controls.target.clone(),distance:this.camera.position.distanceTo(this.controls.target)}:e&&!n&&this.searchStash&&this.constellationNameId&&(this.focus={from:this.controls.target.clone(),to:this.searchStash.target,fromDistance:this.camera.position.distanceTo(this.controls.target),toDistance:this.searchStash.distance,elapsed:0,duration:oh}),n||(this.searchStash=null),this.searchIds=t.slice(0,21);const s=new _c;s.setFromCamera(new ht(0,0),this.camera);const r=new R;s.ray.intersectPlane(new hn(new R(0,1,0),0),r),this.searchCenter={x:r.x,y:-r.z};const a=this.camera.position.distanceTo(this.controls.target),o=Math.max(2,a*Math.tan(fe.degToRad(this.camera.fov/2))*.18);this.searchUnit=o,this.field.setSearch(this.searchIds,this.searchCenter,o),this.blackHole.visible=this.searchIds.length>0,this.blackHole.position.set(r.x,0,r.z),this.blackHole.scale.setScalar(o),this.trace.visible=this.searchIds.length>0,this.tails.visible=this.searchIds.length>0,this.constellations.setSearchHole(this.searchIds.length?this.blackHole.position:null,ka*o),this.hoveredId=null,this.labelsDirty=!0,e!==n&&this.refreshEmphasis()}selectSearch(t){this.wake(),this.selectedId=t,this.selectedHalo.visible=!!t}hoverStar(t){const e=t&&this.searchIds.includes(t)?t:null,n=this.searchIds.length?null:t;(e!==this.hoveredId||n!==this.hoveredMapId)&&this.wake(),this.hoveredId=e,this.hoveredMapId!==n&&(this.hoveredMapId=n,this.labelsDirty=!0)}traceGeometry(){const t=this.tails.geometry.getAttribute("aAlpha").array;return{tails:this.searchIds.length,fullLines:this.fullTraceCount,maxTailPixels:this.maxTailPixels,startAlpha:t[0]??0,endAlpha:t[7]??0}}searchGeometry(){return{center:this.searchCenter,unit:this.searchUnit,stars:this.searchIds.flatMap(t=>{const e=this.field.displayPosition(t);return e?[{id:t,...e}]:[]})}}searchHole(){if(!this.searchIds.length)return null;this.camera.updateMatrixWorld();const t=this.renderer.getSize(new ht),e=o=>(o.project(this.camera),{x:(o.x*.5+.5)*t.x,y:(-o.y*.5+.5)*t.y}),n=this.blackHole.position,s=e(n.clone()),r=ka*this.searchUnit;let a=1/0;for(let o=0;o<32;o++){const c=o/32*Math.PI*2,l=e(new R(n.x+Math.cos(c)*r,.12,n.z+Math.sin(c)*r));a=Math.min(a,Math.hypot(l.x-s.x,l.y-s.y))}return{...s,r:a-2}}setConstellationLinesVisible(t){this.wake(),this.constellations.object.visible=t}setConstellationTestOpacity(t){this.wake(),this.constellations.setTestOpacity(t)}setConstellationTestLine(t){this.wake(),this.constellations.setTestLine(t&&this.searchIds.length?this.blackHole.position:null,ka*this.searchUnit)}starScreen(t){const e=this.field.displayPosition(t);if(!e)return null;const n=this.renderer.getSize(new ht),s=new R(e.x,0,-e.y).project(this.camera);return{x:(s.x*.5+.5)*n.x,y:(-s.y*.5+.5)*n.y}}starPosition(t){return this.field.displayPosition(t)}starVisual(t){return this.field.visual(t)}cameraTilt(){return fe.radToDeg(this.tilt)}cameraState(){return{x:this.controls.target.x,y:-this.controls.target.z,distance:this.camera.position.distanceTo(this.controls.target),tier:this.zoomTier}}focusCluster(t){if(this.wake(),this.searchIds.length)return;const e=this.labelSource.clusters.find(r=>r.index===t&&r.count>0);if(!e)return;const n=this.camera.position.distanceTo(this.controls.target),s=this.fitDistance*ah;this.focus={from:this.controls.target.clone(),to:new R(e.x,0,-e.y),fromDistance:n,toDistance:this.zoomTier==="far"?s:n,elapsed:0,duration:$v}}resetCamera(){this.wake(),this.focus=null,this.frameAll(),this.labelsDirty=!0}pickStar(t,e){const n=this.renderer.getSize(new ht),s=new R;let r=null,a=196;for(const o of this.field.placed){const c=this.field.displayPosition(o.id);if(!c)continue;s.set(c.x,0,-c.y).project(this.camera);const l=(s.x*.5+.5)*n.x,h=(-s.y*.5+.5)*n.y,d=(l-t)**2+(h-e)**2;d<a&&(a=d,r=o.id)}return r}get zoomTier(){const t=this.camera.position.distanceTo(this.controls.target);return t>this.fitDistance*1.4?"far":t>this.fitDistance*.55?"mid":"near"}setZoomTier(t){this.wake();const e=t==="far"?1.9:t==="mid"?ah:.3;this.setDistance(this.fitDistance*e)}labelGeometry(){return this.screenCircles}labelStats(){return{frames:this.frames,positionUpdates:this.labelPositionUpdates,decisions:this.labelDecisions,maxPositionMs:this.maxLabelPositionMs}}resetLabelTiming(){this.maxLabelPositionMs=0}start(){this.running||(this.running=!0,this.wake())}wake(){this.running&&(this.idleFrames=0,!this.looping&&(this.looping=!0,this.clock.getDelta(),this.rafId===null&&(this.rafId=requestAnimationFrame(this.loop))))}hold(t,e){e?this.holds.add(t):this.holds.delete(t),this.wake()}get isRendering(){return this.looping}sleepLoop(){this.looping=!1,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null)}needsNextFrame(t,e){return this.holds.size>0||this.flight.active||this.dive!==null||this.focus!==null||Math.abs(this.tilt-this.tiltTarget)>1e-4||this.tiltPointer!==null||this.keys.size>0||this.keyPan.lengthSq()>0||this.keyZoom!==0||t||e||this.field.isAnimating||this.constellations.isAnimating||this.constellationNameWait||this.lastLabelTier===null||this.labelsDirty||this.lastLabelMotion>0}settle(t){if(t){this.idleFrames=0;return}++this.idleFrames>=Kv&&this.looping&&this.sleepLoop()}frameAll(){const t=this.bounds,e=2;this.controls.target.set((t.minX+t.maxX)/2,0,-(t.minY+t.maxY)/2);const n=Math.tan(fe.degToRad(this.camera.fov/2)),s=n*this.camera.aspect,r=(t.maxX-t.minX)/2+e,a=((t.maxY-t.minY)/2+e)*Math.cos(this.tilt);let o=Math.max(25,Math.max(r/s,a/n)/.8);const c=[[t.minX-e,t.minY-e],[t.maxX+e,t.minY-e],[t.minX-e,t.maxY+e],[t.maxX+e,t.maxY+e]],l=new R;for(let h=0;h<6;h++){this.setDistance(o),this.camera.updateMatrixWorld();let d=0;for(const[f,m]of c)l.set(f,0,-m).project(this.camera),d=Math.max(d,Math.abs(l.x),Math.abs(l.y));if(d<=0)break;const u=o*(d/.8);if(Math.abs(u-o)<o*.005)break;o=u}this.fitDistance=o,this.setDistance(o)}setDistance(t){const e=this.controls.target;this.camera.position.set(e.x,e.y+t*Math.cos(this.tilt),e.z+t*Math.sin(this.tilt)),this.controls.update()}profile=null;phase(t,e){return e()}tick=()=>{{this.step();return}};step(){this.frames++;const t=Math.min(.05,this.clock.getDelta());if(this.flight.active){this.flightTick(t),this.settle(!0);return}if(this.applyKeys(t),this.focus){const f=this.focus;f.elapsed=Math.min(f.duration,f.elapsed+t);const m=f.elapsed/f.duration,_=m*m*(3-2*m);this.controls.target.lerpVectors(f.from,f.to,_),this.setDistance(fe.lerp(f.fromDistance,f.toDistance,_)),m===1&&(this.focus=null)}if(Math.abs(this.tilt-this.tiltTarget)>1e-4){const f=this.tiltSpeed*t,m=this.tiltTarget-this.tilt;this.tilt+=Math.sign(m)*Math.min(Math.abs(m),f);const _=this.controls.target,g=this.camera.position.distanceTo(_);this.camera.position.set(_.x,_.y+g*Math.cos(this.tilt),_.z+g*Math.sin(this.tilt))}this.field.update(t);const e=Math.max(1,this.camera.position.distanceTo(this.controls.target)*.024);if(this.constellations.moveEditMembers(f=>this.field.displayPosition(f),e),this.constellations.update(t),this.constellationNameWait&&this.constellations.animationState().phase==="done"&&(this.constellationNameWait=!1,this.constellationName?.classList.add("is-visible")),this.searchIds.length){const f=this.tails.geometry.getAttribute("position"),m=this.tails.geometry.getAttribute("aAlpha"),_=f.array,g=m.array,p=this.renderer.getSize(new ht);this.maxTailPixels=0,this.searchIds.forEach((C,T)=>{const A=this.field.placed.find(k=>k.id===C),P=this.field.displayPosition(C);if(!A||!P)return;const E=new R(P.x,0,-P.y).project(this.camera),y=new R(A.x,0,-A.y).project(this.camera),D=Math.hypot((E.x-y.x)*p.x/2,(E.y-y.y)*p.y/2),F=D>0?Math.min(1,40/D):0;this.maxTailPixels=Math.max(this.maxTailPixels,D*F);for(let k=0;k<4;k++)for(let H=0;H<2;H++){const X=(k+H)/4,G=X*F,et=T*8+k*2+H;_.set([P.x+(A.x-P.x)*G,.05,-(P.y+(A.y-P.y)*G)],et*3),g[et]=.48*(1-X)**2}}),f.needsUpdate=!0,m.needsUpdate=!0,this.tails.geometry.setDrawRange(0,this.searchIds.length*8);const M=this.trace.geometry.getAttribute("position"),b=M.array,S=[...new Set([this.selectedId,this.hoveredId])].filter(C=>!!C&&this.searchIds.includes(C));this.fullTraceCount=0;for(const C of S){const T=this.field.placed.find(P=>P.id===C),A=this.field.displayPosition(C);!T||!A||(b.set([T.x,.03,-T.y,A.x,.03,-A.y],this.fullTraceCount*6),this.fullTraceCount++)}M.needsUpdate=!0,this.trace.geometry.setDrawRange(0,this.fullTraceCount*2),this.trace.visible=this.fullTraceCount>0}else this.fullTraceCount=0,this.maxTailPixels=0;if(this.selectedId){const f=this.field.displayPosition(this.selectedId);f&&this.selectedHalo.position.set(f.x,.11,-f.y)}const n=this.controls.update();if(this.camera.updateMatrixWorld(),this.constellationNameId&&this.constellationName){const f=this.constellations.points(this.constellationNameId);if(f.length){const m=this.renderer.getSize(new ht);let _=1/0,g=-1/0,p=1/0;const M=new R;for(const b of f)M.set(b.x,0,-b.y).project(this.camera),_=Math.min(_,(M.x*.5+.5)*m.x),g=Math.max(g,(M.x*.5+.5)*m.x),p=Math.min(p,(-M.y*.5+.5)*m.y);this.constellationName.style.transform=`translate3d(${(_+g)/2}px, ${Math.max(95,p-12)}px, 0) translate(-50%, -100%)`}}const s=performance.now(),r=this.camera.matrixWorld.elements,a=this.lastLabelCamera.elements,o=!this.labelCameraKnown||r.some((f,m)=>Math.abs(f-a[m])>1e-6),c=o||this.field.isSettling;c&&(this.lastLabelMotion=s,o&&this.lastLabelCamera.copy(this.camera.matrixWorld),this.labelCameraKnown=!0);const l=this.zoomTier;(this.lastLabelTier===null||l!==this.lastLabelTier||!c&&s-this.lastLabelMotion>=150&&(this.labelsDirty||this.lastLabelMotion>0))&&(this.phase("overlay",()=>this.decideLabels()),this.labelsDirty=!1,this.lastLabelTier=l,this.lastLabelMotion=0,this.labelDecisions++);const h=performance.now(),d=this.renderer.getSize(new ht),u=new R;this.phase("overlay",()=>this.labels.updatePositions(f=>{const m=f.searchRank==null?null:this.field.displayPosition(f.key);if(u.set(m?.x??f.x,0,-(m?.y??f.y)).project(this.camera),u.z>1)return null;let _=(u.x*.5+.5)*d.x,g=(-u.y*.5+.5)*d.y;if(f.searchRank!=null){const p=Math.hypot(_-d.x/2,g-d.y/2)||1;_+=(_-d.x/2)/p*10,g+=(g-d.y/2)/p*10}return{sx:_,sy:g}})),this.labelPositionUpdates++,this.maxLabelPositionMs=Math.max(this.maxLabelPositionMs,performance.now()-h),this.phase("render",()=>this.renderer.render(this.scene,this.camera)),this.settle(this.needsNextFrame(n,o))}flightTick(t){za()&&this.keys.clear();const e=this.dive?{thrust:0,turn:0,climb:0,mouseX:0,mouseY:0}:{thrust:(this.keys.has("KeyW")?1:0)-(this.keys.has("KeyS")?1:0),turn:(this.keys.has("KeyA")?1:0)-(this.keys.has("KeyD")?1:0),climb:(this.keys.has("Space")?1:0)-(this.keys.has("Shift")?1:0),mouseX:this.flightMouse.x,mouseY:this.flightMouse.y};this.dive&&(this.flight.ship.speed=0);const n=this.flight.ship.position.clone(),{finished:s}=this.flight.update(t,this.camera,this.flightLook,e);if(this.obstacles.update(t),this.boostVisualLeft>0&&(this.boostVisualLeft=Math.max(0,this.boostVisualLeft-t),document.body.classList.toggle("flight-boost",this.boostVisualLeft>0)),this.flight.phase==="flying"&&!this.dive&&this.checkObstacles(n),this.shakeLeft>0&&(this.shakeLeft=Math.max(0,this.shakeLeft-t),this.camera.position.x+=Math.sin(this.shakeLeft*80)*this.shakeLeft*.12),this.field.object.scale.setScalar(this.spaceScale),this.constellations.object.scale.setScalar(this.spaceScale),this.sky.follow(this.camera),this.flightNebulae.setOpacity(this.flight.lift),(this.flight.transitioning||s)&&this.constellations.setLift(a=>this.heights.get(a)??0,this.flight.lift),this.flight.phase==="flying")if(this.dive)this.advanceDive(t);else{const a=this.findStarHit(n,this.flight.ship.position);a&&(this.dive={id:a,elapsed:0})}const r=this.flight.ship;this.ship.group.position.copy(r.position),this.ship.group.rotation.set(r.pitch,r.yaw,0),this.ship.setThrust(this.flight.thrustLevel),this.camera.updateMatrixWorld(),this.phase("overlay",()=>{this.flight.phase==="flying"?this.updateWindows(t):this.flight.phase==="leaving"&&(this.windows.clear(),this.farLabels.clear()),this.updateSigns()}),this.field.setLift(this.flight.lift),this.field.update(t),this.constellations.update(t),this.camera.updateMatrixWorld(),this.phase("render",()=>this.renderer.render(this.scene,this.camera)),s==="left"&&this.finishFlight()}checkObstacles(t){const e=this.flight.ship,n=e.position.clone().sub(t),s=n.lengthSq(),r=new R;for(const a of this.obstacles.debris){const o=a.r+2.5+Math.sqrt(s);if(Math.abs(a.x-e.position.x)>o||Math.abs(a.y-e.position.y)>o||Math.abs(a.z-e.position.z)>o)continue;const c=new R(a.x,a.y,a.z),l=s?fe.clamp(c.clone().sub(t).dot(n)/s,0,1):0;r.copy(t).addScaledVector(n,l);const h=a.r+1.2;if(r.distanceTo(c)>=h)continue;const d=e.speed;e.speed*=.6;const u=e.position.clone().sub(c).normalize();u.lengthSq()<.01&&u.set(0,0,1),e.position.copy(c).addScaledVector(u,h+.05),this.lastBump={speedBefore:d,speedAfter:e.speed,distanceAfter:e.position.distanceTo(c),minDistance:h},this.bumps++,this.shakeLeft=.35;break}this.obstacles.rings.forEach((a,o)=>{if((this.ringCooldown.get(o)??0)>performance.now())return;const c=new R(a.nx,a.ny,a.nz),l=new R(a.x,a.y,a.z),h=t.clone().sub(l).dot(c),d=e.position.clone().sub(l).dot(c);h*d>0||Math.abs(h-d)<1e-6||t.clone().lerp(e.position,h/(h-d)).distanceTo(l)>=a.radius||(this.flight.boost(),this.boosts++,this.boostVisualLeft=.65,document.body.classList.add("flight-boost"),this.ringCooldown.set(o,performance.now()+2500))})}findStarHit(t,e){const n=performance.now();if(!this.collisionStars){const h=new R;this.collisionStars=this.field.placed.flatMap(d=>{const u=this.worldOf(d.id,h);return u?[{id:d.id,x:u.x,y:u.y,z:u.z}]:[]})}const s=e.x-t.x,r=e.y-t.y,a=e.z-t.z,o=s*s+r*r+a*a,c=Oa+Math.sqrt(o);let l=null;for(const h of this.collisionStars){if((this.entryCooldown.get(h.id)??0)>n||Math.abs(h.x-e.x)>c||Math.abs(h.y-e.y)>c||Math.abs(h.z-e.z)>c)continue;const d=o>0?fe.clamp(((h.x-t.x)*s+(h.y-t.y)*r+(h.z-t.z)*a)/o,0,1):0,u=h.x-t.x-s*d,f=h.y-t.y-r*d,m=h.z-t.z-a*d;u*u+f*f+m*m<Oa*Oa&&(!l||d<l.t)&&(l={id:h.id,t:d})}return l?.id??null}advanceDive(t){if(!this.dive)return;this.dive.elapsed+=t;const e=Math.min(1,this.dive.elapsed/Yv);this.camera.fov=sh-16*Math.sin(Math.PI*e),this.camera.updateProjectionMatrix(),this.flash&&(this.flash.style.opacity=String(.85*Math.sin(Math.PI*e))),e>=1&&this.endDive(!0)}endDive(t){const e=this.dive;this.dive=null,this.camera.fov=sh,this.camera.updateProjectionMatrix(),this.flash&&(this.flash.style.opacity="0"),!(!e||!t)&&(this.entryCooldown.set(e.id,performance.now()+qv),this.lastEntry=e.id,this.flight.ship.position.addScaledVector(this.flight.forward(),-10),this.flight.ship.speed=0,this.onEnterStar?.(e.id))}updateSigns(){const t=this.renderer.getSize(new ht),e=new R,n=this.flight.ship.position;this.signs.update((s,r,a)=>(e.set(s,r,a).project(this.camera),e.z>1||e.z<-1?null:{x:(e.x*.5+.5)*t.x,y:(-e.y*.5+.5)*t.y}),s=>Math.hypot(s.x-n.x,s.y-n.y,s.z-n.z),this.flight.phase==="leaving"?0:this.flight.lift)}updateWindows(t){const e=this.flight.ship.position,n=this.renderer.getSize(new ht),s=new R,r=new R;this.windows.update(t,this.windowStars,a=>{const o=this.worldOf(a,r);return o?o.distanceTo(e):1/0},a=>{const o=this.worldOf(a,r);if(!o)return null;const c=o.distanceTo(e);return s.copy(o).project(this.camera),s.z>1||s.z<-1?null:{x:(s.x*.5+.5)*n.x,y:(-s.y*.5+.5)*n.y,near:fe.clamp(1-c/gl,0,1)}}),this.farLabels.update(t,this.windowStars,this.windows.visibleIds,a=>this.worldOf(a,r)?.distanceTo(e)??1/0,a=>{const o=this.worldOf(a,r);return!o||(s.copy(o).project(this.camera),s.z>1||s.z<-1)?null:{x:(s.x*.5+.5)*n.x,y:(-s.y*.5+.5)*n.y}})}flightTeleport(t,e){this.wake();const n=this.worldOf(t),s=this.labelSource.stars.find(h=>h.id===t),r=this.labelSource.clusters.find(h=>h.index===s?.cluster);if(!n||!s||!this.flight.active)return!1;let a=s.x-(r?.x??0),o=s.y-(r?.y??0);const c=Math.hypot(a,o)||1;Math.hypot(a,o)<1e-6&&(a=0,o=-1);const l=n.clone().add(new R(a/c,0,-o/c).multiplyScalar(e));return this.flight.place(l,n),!0}starScreenSize(t){const e=this.worldOf(t),n=this.field.pointSize(t);if(!e||n==null)return null;this.camera.updateMatrixWorld();const s=e.applyMatrix4(this.camera.matrixWorldInverse),r=this.field.object.material,a=n*r.uniforms.uSizeScale.value*r.uniforms.uScale.value/Math.max(-s.z,.001);return fe.clamp(a,2,r.uniforms.uMaxSize.value)}decideLabels(){const t=this.zoomTier,e=this.renderer.getSize(new ht),n=new R;this.camera.updateMatrixWorld();const s=(m,_)=>{if(n.set(m,0,-_).project(this.camera),n.z>1)return null;const g=(n.x*.5+.5)*e.x,p=(-n.y*.5+.5)*e.y;return g<-120||g>e.x+120||p<-40||p>e.y+40?null:{sx:g,sy:p}},r=[],a=[];for(const m of this.labelSource.clusters){if(m.count===0)continue;const _=s(m.x,m.y);if(!_)continue;let g=0,p=0;for(let M=0;M<32;M++){const b=M*Math.PI/16,S=s(m.x+Math.cos(b)*m.radius,m.y+Math.sin(b)*m.radius);S&&(g=Math.max(g,Math.abs(S.sx-_.sx)),p=Math.max(p,Math.abs(S.sy-_.sy)))}g>0&&p>0&&a.push({cluster:m.index,..._,rx:g,ry:p})}this.screenCircles=a;const o=this.labelSource.clusters.filter(m=>m.count>0).map(m=>m.count),c=Math.min(...o),l=Math.max(...o),h=m=>13+(l>c?(m-c)/(l-c):.5)*4;for(const m of this.labelSource.clusters){if(m.count===0)continue;const _=t==="far"?s(m.x,m.y):s(m.x,m.y+m.radius+1.5);_&&r.push({key:`c${m.index}`,text:m.name,x:m.x,y:t==="far"?m.y:m.y+m.radius+1.5,centered:t==="far",sx:_.sx,sy:_.sy,kind:"cluster",cluster:m.index,priority:-1e3+(1e3-m.count),fontSize:Math.round(h(m.count)*(t==="far"?.8:1)*2)/2,dim:this.emphasisMode!=="none"})}const d=this.emphasisIds,u=!this.searchIds.length&&!d.size,f=new Set;if(u&&t==="mid")for(const m of this.labelSource.clusters)this.labelSource.stars.filter(_=>_.cluster===m.index&&ai(_.touched)>.55).sort((_,g)=>ai(g.touched)-ai(_.touched)||_.rank-g.rank||_.id.localeCompare(g.id)).slice(0,2).forEach(_=>f.add(_.id));if(this.searchIds.length||t!=="far"||d.size){const m=new Map(this.searchIds.map((_,g)=>[_,g]));for(const _ of this.labelSource.stars){const g=d.has(_.id);if(!g&&this.searchIds.length&&!m.has(_.id)||!g&&!this.searchIds.length&&(t==="far"||u&&t==="mid"&&!f.has(_.id)&&_.id!==this.hoveredMapId||!u&&t==="mid"&&_.rank>=4))continue;const p=this.searchIds.length?this.field.displayPosition(_.id):null,M=s(p?.x??_.x,p?.y??_.y);if(!M)continue;const b=this.searchIds.length&&Math.hypot(M.sx-e.x/2,M.sy-e.y/2)||1,S=this.labelSource.clusters.find(C=>C.index===_.cluster);r.push({key:_.id,text:_.title,x:_.x,y:_.y,sx:this.searchIds.length?M.sx+(M.sx-e.x/2)/b*10:M.sx,sy:this.searchIds.length?M.sy+(M.sy-e.y/2)/b*10:M.sy,kind:"star",priority:g?-3e3+_.rank:this.searchIds.length?(m.get(_.id)??99)-100:u&&_.id===this.hoveredMapId?-2e3:u?(1-ai(_.touched))*100+_.rank*.01:_.rank,dim:d.size>0&&!g,searchRank:this.searchIds.length?m.get(_.id):void 0,fontSize:u?Math.round((10+2*ai(_.touched))*10)/10:void 0,opacity:u?.4+.6*ai(_.touched):void 0,cluster:_.cluster,side:this.searchIds.length?M.sx>=e.x/2?"right":"left":!S||_.x>=S.x?"right":"left"})}}this.labels.render(this.searchIds.length?r.filter(m=>m.kind==="star"):r,this.searchIds.length||d.size?"near":t,this.searchIds.length?[]:a)}resize=()=>{this.wake();const t=this.canvas.clientWidth||innerWidth,e=this.canvas.clientHeight||innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.labelsDirty=!0;const n=this.renderer.getDrawingBufferSize(new ht).y/(2*Math.tan(fe.degToRad(this.camera.fov/2)));this.setPointScale(n)};setPointScale(t){this.sky.setScale(t);for(const e of[this.backdrop,this.field.object]){const n=e.material;n?.uniforms?.uScale&&(n.uniforms.uScale.value=t)}}}const ey={chrome:"Chrome",sample:"サンプル"},ny=[[{key:"W"},{key:"A"},{key:"S"},{key:"D"},"・左ドラッグ　移動"],[{key:"Space"}," 縮小　",{key:"Shift"}," 拡大（ホイールでも）"],["右ドラッグの上下　傾き"],[{key:"/"}," 検索欄へ　",{key:"Esc"}," 検索を消して抜ける"],[{key:"↑"},{key:"↓"}," 候補を選ぶ　",{key:"Enter"}," 同じタブで開く（",{key:"Ctrl"},"/",{key:"⌘"}," で新しいタブ）"],[{key:"Shift"},"+",{key:"Enter"}," 検索結果を星座にする"],["星団名をクリック　その星団へ移動"],["星をクリック　カード（ダブルクリックで開く）"]];function Qe(i,t="",e=""){const n=document.createElement(i);return t&&(n.className=t),e&&(n.textContent=e),n}function iy(){const i=Qe("ul","hud-help");for(const t of ny){const e=Qe("li");for(const n of t)e.append(typeof n=="string"?n:Qe("kbd","",n.key));i.append(e)}return i}function ch(i,t){const e=Qe("div","hud-line");return e.append(Qe("span","hud-key",i),t),e}let Ds=null,bd=null;function sy(i,t){Ds=i,bd=t}const ry={sample:"サンプルの宇宙で試す",chrome:"自分のブックマークに戻る"};function kn(i){const t=document.getElementById("hud");if(!t)return;i.phase&&(document.body.dataset.phase=i.phase);const e=[Qe("div","hud-title","ブクスペ"),ch("星",String(i.count)),ch("データ源",ey[i.kind])];if(i.status&&(e.push(Qe("div","hud-status",i.status)),i.progress!=null)){const n=Qe("div","hud-bar"),s=Qe("i");s.style.width=`${Math.round(Math.min(1,Math.max(0,i.progress))*100)}%`,n.append(s),e.push(n)}if(Ds){const n=Qe("button","hud-switch",ry[Ds]);n.id="source-toggle",n.type="button",e.push(n)}e.push(iy()),t.replaceChildren(...e)}function Bo(i,t="loading"){const e=document.getElementById("hud");e&&(document.body.dataset.phase=t,e.replaceChildren(Qe("div","hud-title","ブクスペ"),Qe("div","hud-status",i)))}let wd=!1;function ay(){if(window.setTimeout(()=>document.getElementById("hint")?.classList.add("is-faded"),1e4),new URLSearchParams(location.search).get("demo")==="1"){document.body.classList.add("is-demo");return}document.getElementById("hud")?.addEventListener("click",i=>{i.target?.id==="source-toggle"&&Ds&&bd?.(Ds)}),document.getElementById("hud-toggle")?.addEventListener("click",()=>{wd=!0,document.getElementById("hud")?.classList.toggle("is-collapsed")})}function oy(){wd||document.getElementById("hud")?.classList.add("is-collapsed")}function ly(i,{newTab:t=!1,beforeLeave:e}={}){return uh(i)?typeof chrome<"u"&&chrome.tabs?.create?t?(chrome.tabs.create({url:i}),!0):(e?.(),chrome.tabs.getCurrent().then(n=>{if(n?.id!=null)return chrome.tabs.update(n.id,{url:i});location.href=i}),!0):t?(window.open(i,"_blank","noopener"),!0):(e?.(),location.href=i,!0):(console.warn("[ブクスペ] http(s) ではない URL は開かない"),!1)}const zo="bukusupe:return-state",cy=["bukusupe:return-state-v1"],Ho=2,sn=1e6,Ad=500,hy=256,cn=(i,t,e)=>typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e,Va=i=>!!i&&typeof i=="object"&&!Array.isArray(i);function dy(i,t){let e;try{e=JSON.parse(i)}catch{return null}if(!Va(e)||e.version!==Ho||e.source!==t)return null;const{camera:n,ship:s,flying:r,query:a,constellationId:o}=e;return typeof r!="boolean"||!Va(n)||!cn(n.x,-sn,sn)||!cn(n.y,-sn,sn)||!cn(n.distance,1,sn)||!cn(n.tilt,0,Math.PI/2)||s!==null&&(!Va(s)||!cn(s.x,-sn,sn)||!cn(s.y,-sn,sn)||!cn(s.z,-sn,sn)||!cn(s.yaw,-1e4,1e4)||!cn(s.pitch,-Math.PI,Math.PI)||!cn(s.speed,0,1e5))||r&&s===null||typeof a!="string"||a.length>Ad||o!==null&&(typeof o!="string"||o.length>hy)?null:{version:Ho,source:t,flying:r,ship:s===null?null:{x:s.x,y:s.y,z:s.z,yaw:s.yaw,pitch:s.pitch,speed:s.speed},camera:{x:n.x,y:n.y,distance:n.distance,tilt:n.tilt},query:a,constellationId:o}}function uy(){for(const t of cy)sessionStorage.removeItem(t);const i=sessionStorage.getItem(zo);return sessionStorage.removeItem(zo),i}function fy(i){const t={version:Ho,...i,query:i.query.slice(0,Ad)};sessionStorage.setItem(zo,JSON.stringify(t))}const Vo="mean-vector",Rr="layout",py="generality",rt={kind:"sample",items:[],vectors:new Map,mean:null,generality:new Map,layout:null};new URLSearchParams(location.search);const my=i=>{},gy=()=>new nu;let _i=null,Td=!0,St=null,we=[],hi=0,Go,Wo=0,Es=null,Te=[];const $i=new Map;let me=null,qn=[],_e=null,Zi=!1,Sr=!1;function _y(){if(!St)return;const i=St.flightState();fy({source:rt.kind,flying:i.active,ship:i.active?i.ship:null,camera:St.navigationCamera(),query:document.getElementById("search-input")?.value??"",constellationId:me})}async function xy(){const i=performance.getEntriesByType("navigation")[0],t=uy();if(i?.type!=="back_forward"||!t||!St)return;const e=dy(t,rt.kind);if(!e){console.warn("[ブクスペ] 「戻る」用の保存状態が壊れていたので、ふつうに開いた");return}if(e.constellationId&&Te.some(n=>n.id===e.constellationId)&&await Fd(e.constellationId),St.restoreNavigationCamera(e.camera),e.query){const n=document.getElementById("search-input");n.value=e.query,Pr(await xl(e.query))}e.flying&&e.ship&&St.resumeFlight(e.ship)}async function vy(){const i=document.getElementById("space"),t=document.getElementById("labels");if(!i||!t)throw new Error("画面の土台が見つからない");ay(),St=new ty(i,t),St.setStarAppearance(Ex),St.onStarLabelClick=Ud,Fy(),St.start(),Bo("ブックマークを読み込んでいる…");const e=await ph();rt.kind=e.kind,rt.items=e.items,Qd(rt.kind==="sample"?Kd:Date.now()),sy(rt.kind==="chrome"?"sample":e.chromeCount>0?"chrome":null,Rd),Eu(rt.kind,e.bench),bu(()=>Bo("ほかのブクスペのタブを閉じると続きを始める")),_l(Pu(rt.items),!1),kn({count:rt.items.length,kind:rt.kind,status:"星を読み解いている…",phase:"embed"}),document.getElementById("loading")?.remove(),_i=gy(),await Pd(),await Ld(),Te=await wy(),await Id(),$n(),Ny(i),Uy(),await xy(),My(),Oy(),Ty(),document.getElementById("relayout")?.addEventListener("click",()=>{Cd(Sy)})}function Rd(i){Zd(i==="sample");const t=new URL(location.href);i==="chrome"&&t.searchParams.has("sample")?(t.searchParams.delete("sample"),location.replace(t)):location.reload()}const hh="bukusupe:sample-hint-shown",yy=20;function My(){const i=document.getElementById("sample-hint");if(!(!i||rt.kind!=="chrome"||rt.items.length>=yy)){try{if(localStorage.getItem(hh))return;localStorage.setItem(hh,"1")}catch{return}i.hidden=!1,document.getElementById("sample-hint-try")?.addEventListener("click",()=>Rd("sample")),document.getElementById("sample-hint-close")?.addEventListener("click",()=>{i.hidden=!0})}}let Ga=Promise.resolve();function Cd(i){return Ga=Ga.then(i).catch(t=>console.error("[ブクスペ] 更新に失敗",t)),Ga}async function Pd(){if(!_i)return;const i={count:rt.items.length,kind:rt.kind};St?.hold("embedding",!0);try{rt.vectors=await Cu(rt.items,_i,t=>{my(`embed:${t.phase}`),St?.wake(),t.phase==="model"?kn({...i,status:`モデルを取り込んでいる ${t.percent.toFixed(0)}%`,progress:t.percent/100,phase:"model"}):t.phase==="embed"?kn({...i,status:`星を読み解いている ${t.done} / ${t.total}`,progress:t.done/t.total,phase:"embed"}):kn({...i,status:"星を並べている…",phase:"layout"})})}catch(t){console.error("[ブクスペ] 埋め込みに失敗",t),kn({...i,status:"意味の計算に失敗した",phase:"error"})}finally{St?.hold("embedding",!1)}}async function Ld(){if(rt.vectors.size===0)return;const{mean:i,recomputed:t}=await by();rt.mean=i,await Ey();const e=t?void 0:await qo(Rr);let n=null;if(e&&e.version===Fr&&e.stars.length>0){const s=new Set(rt.items.map(h=>h.id));n=Mu(e,s);const r=new Set(n.stars.map(h=>h.id)),a=rt.items.filter(h=>!r.has(h.id)&&rt.vectors.has(h.id));for(const h of a)n=yu(n,h.id,rt.vectors.get(h.id),rt.mean);const o=new Map(rt.items.map(h=>[h.id,h])),c=Ah(n.clusters.map(h=>n.stars.filter(d=>d.cluster===h.index).sort((d,u)=>d.rank-u.rank).flatMap(d=>{const u=o.get(d.id);return u?[u]:[]}))),l=n.clusters.some((h,d)=>h.name!==c[d]);l&&(n={...n,clusters:n.clusters.map((h,d)=>({...h,name:c[d]}))}),(l||a.length>0||n.stars.length!==e.stars.length)&&await fi(Rr,n)}(!n||n.stars.length===0)&&(n=Ch(rt.items,rt.vectors,rt.mean),await fi(Rr,n)),_l(n),kn({count:rt.items.length,kind:rt.kind,status:`${n.clusters.filter(s=>s.count>0).length} つの星団`,phase:"ready"}),oy()}async function Sy(){if(rt.vectors.size===0)return;kn({count:rt.items.length,kind:rt.kind,status:"並べ直している…",phase:"layout"});const i=Ns([...rt.vectors.values()]);rt.mean=i,await fi(Vo,{source:rt.kind,vector:i});const t=Ch(rt.items,rt.vectors,i);await fi(Rr,t),_l(t),kn({count:rt.items.length,kind:rt.kind,status:`${t.clusters.filter(e=>e.count>0).length} つの星団`,phase:"ready"})}async function Ey(){if(!rt.mean)return;const i=[],t=[];for(const n of rt.items){const s=rt.vectors.get(n.id);s&&(i.push(n.id),t.push(s))}const e=Mh(yh(t));rt.generality=new Map(i.map((n,s)=>[n,e[s]])),await fi(py,Object.fromEntries(rt.generality))}async function by(){const i=await qo(Vo);if(i?.source===rt.kind&&i.vector?.length>0)return{mean:i.vector,recomputed:!1};const t=Ns([...rt.vectors.values()]);return await fi(Vo,{source:rt.kind,vector:t}),{mean:t,recomputed:!0}}function _l(i,t=!0){rt.layout=i;const e=new Map(rt.items.map(n=>[n.id,n]));St?.setLayout(i,bx(i,e),wx(i,e),t),$n(),we.length&&(St?.setSearch(we.map(n=>n.id)),St?.selectSearch(we[hi]?.id??null))}function $n(){St?.setConstellations(Te.map(i=>({id:i.id,name:i.name,points:Xn(rt.layout,i.members)}))),_e&&St?.setEditMembers(Xn(rt.layout,Is())),Vn()}async function wy(){const i=await Tu(),t=[];for(const e of i){const n=Uu(e);if(n){t.push(n);continue}const s=Nu(e);s&&($i.set(s.id,s),t.push(Nh(s,s.lastMembers,s.createdAt)))}return t.length<i.length&&console.warn(`[ブクスペ] 形の合わない星座の行を ${i.length-t.length} 件読み飛ばした`),t}const Ay=()=>!0;async function Dd(i){const t=await xl(i),e=(t[0]?.score??0)*Bh;return t.filter(n=>n.score>=e).slice(0,12).map(n=>n.id)}let Wa=null;function Ty(){return Wa??=Ry().catch(i=>console.warn("[ブクスペ] 旧形式の星座を移せなかった",i)).finally(()=>{Wa=null}),Wa}async function Ry(){if(!$i.size)return;const i=new Set(rt.items.map(e=>e.id)),t=Date.now();for(const e of[...$i.values()]){const n=e.query?await Dd(e.query):[],s=Nh(e,Fu(e,n,i),t);await ss(s),$i.delete(e.id);const r=Te.findIndex(a=>a.id===s.id);r>=0&&(Te[r]=s)}if($n(),me){const e=Te.find(n=>n.id===me);e&&St?.focusPoints(Xn(rt.layout,e.members))}}async function Id(){const i=new Set(rt.items.map(t=>t.id));for(const t of Te){const e=t.members.filter(s=>i.has(s)),n=t.dismissed.filter(s=>i.has(s));e.length===t.members.length&&n.length===t.dismissed.length||(t.members=e,t.dismissed=n,$i.has(t.id)||await ss(t))}$n(),qn.some(t=>!i.has(t))&&gn(qn.filter(t=>i.has(t)))}function Is(){return _e?Fh(_e.automatic,[..._e.pinned],[..._e.excluded]):[]}function Ud(i){_e?(Is().includes(i)?(_e.pinned.delete(i),_e.excluded.add(i)):(_e.excluded.delete(i),_e.pinned.add(i)),St?.setEditMembers(Xn(rt.layout,Is()))):kd(i)}function Nd(){const t=document.getElementById("search-input").value.trim();if(!t||!we.length||_e)return;_e={query:t,automatic:we.slice(0,12).map(n=>n.id),pinned:new Set,excluded:new Set},document.getElementById("constellation-create").hidden=!0,document.getElementById("constellation-editor").hidden=!1;const e=document.getElementById("constellation-name-input");e.value=t,e.focus(),St?.setEditMembers(Xn(rt.layout,Is()))}function bs(){_e=null,St?.setEditMembers([]),document.getElementById("constellation-editor").hidden=!0;const i=document.getElementById("search-input");document.getElementById("constellation-create").hidden=!i.value.trim()||!we.length}async function dh(){if(!_e)return;const i=(document.getElementById("constellation-name-input").value.trim()||_e.query).slice(0,80),t=_e.query,e=Is(),n=_i&&Td?Array.from((await _i.embed([xh(t)]))[0]):void 0;bs(),++Wo,clearTimeout(Go);const s=document.getElementById("search-input");s.value="",s.blur(),document.getElementById("constellation-create").hidden=!0,we=[],await Cy(i,e,t!==void 0?{query:t,queryVector:n}:void 0)}async function Cy(i,t,e){const n=new Set(rt.items.map(l=>l.id)),s=[...new Set(t)].filter(l=>n.has(l)),r=i.trim().slice(0,80);if(!s.length||!r||Zi)return null;const a=Date.now(),o={format:kr,id:crypto.randomUUID(),name:r,source:e?"search":"selection",members:s,dismissed:[],savedAt:a,createdAt:a,...e?{query:e.query}:{},...e?.queryVector?{queryVector:e.queryVector}:{}};await ss(o),Te.push(o),me=o.id,Zi=!0,gn([]),$n(),St?.saveConstellation(o.id,o.name,Xn(rt.layout,s)),Vn();const c=()=>{St?.constellationAnimationState().phase==="done"?window.setTimeout(()=>{Zi=!1,me=null,gn([]),St?.selectConstellation(null),document.activeElement!==document.getElementById("search-input")&&St?.setTopDown(!1),Vn()},1200):requestAnimationFrame(c)};return requestAnimationFrame(c),o}let Us=0;async function Fd(i){if(Zi)return;const t=++Us;if(me===i){me=null,gn([]),St?.selectConstellation(null),Vn();return}const e=Te.find(s=>s.id===i);if(!e)return;const n=e.query&&Ay()&&!$i.has(e.id)?Ou(e,await Dd(e.query),Py()):[];t===Us&&(me=i,$n(),gn(n),St?.selectConstellation(i,e.name),St?.focusPoints(Xn(rt.layout,[...e.members,...n])))}function Py(){const i=new Map(rt.items.map(t=>[t.id,t.dateAdded]));return t=>i.get(t)}function gn(i){qn=i,St?.setNovae(Xn(rt.layout,i)),Od()}function Od(){const i=document.getElementById("constellation-novae");if(!i)return;const t=Te.find(o=>o.id===me),e=new Map(rt.items.map(o=>[o.id,o])),n=t?qn.filter(o=>e.has(o)):[];if(i.replaceChildren(),i.hidden=!n.length||Zi||we.length>0,i.hidden||!t)return;const s=document.createElement("p"),r=document.createElement("b");r.textContent="新星",s.append(r,`保存の後に加わり、「${t.query??""}」に合う星`),s.title=s.textContent??"";const a=document.createElement("ul");for(const o of n){const c=document.createElement("li");c.dataset.id=o;const l=document.createElement("span");l.className="nova-title",l.textContent=e.get(o)?.title||e.get(o)?.url||"",l.title=l.textContent,l.addEventListener("click",()=>kd(o));const h=document.createElement("button");h.dataset.action="accept",h.textContent="加える",h.addEventListener("click",()=>{Ly(o)});const d=document.createElement("button");d.dataset.action="dismiss",d.textContent="見送る",d.addEventListener("click",()=>{Dy(o)}),c.append(l,h,d),a.append(c)}i.append(s,a)}async function Ly(i){const t=Te.find(e=>e.id===me);!t||!qn.includes(i)||(t.members.includes(i)||(t.members=[...t.members,i]),await ss(t),$n(),gn(qn.filter(e=>e!==i)))}async function Dy(i){const t=Te.find(e=>e.id===me);!t||!qn.includes(i)||(t.dismissed.includes(i)||(t.dismissed=[...t.dismissed,i]),await ss(t),gn(qn.filter(e=>e!==i)))}function Vn(){const i=document.getElementById("constellation-list");if(i){document.body.classList.toggle("has-constellations",Te.length>0),ji(),i.replaceChildren();for(const t of Te){const e=document.createElement("button");if(e.textContent=t.name,e.title=t.name,e.classList.toggle("is-active",t.id===me),e.addEventListener("click",()=>{Fd(t.id)}),i.append(e),t.id===me&&!Zi){const n=document.createElement("button");n.id="constellation-more",n.textContent="…",n.title="この星座の操作",n.setAttribute("aria-label",`「${t.name}」の操作`),n.setAttribute("aria-haspopup","menu"),n.setAttribute("aria-expanded","false"),n.addEventListener("click",s=>{s.stopPropagation(),Iy(n)}),i.append(n)}}}}function Iy(i){const t=document.getElementById("constellation-manage");if(!t)return;if(!t.hidden){ji();return}t.hidden=!1,i.setAttribute("aria-expanded","true");const e=i.getBoundingClientRect();t.style.left=`${Math.max(8,Math.min(innerWidth-t.offsetWidth-8,e.left+e.width/2-t.offsetWidth/2))}px`,t.style.bottom=`${innerHeight-e.top+6}px`}function ji(){const i=document.getElementById("constellation-manage");i&&(i.hidden=!0),document.getElementById("constellation-more")?.setAttribute("aria-expanded","false")}function Uy(){document.getElementById("constellation-create")?.addEventListener("click",Nd),document.getElementById("constellation-save")?.addEventListener("click",()=>{dh()}),document.getElementById("constellation-cancel")?.addEventListener("click",bs),document.getElementById("constellation-name-input")?.addEventListener("keydown",i=>{i.key==="Enter"&&(i.preventDefault(),dh()),i.key==="Escape"&&(i.preventDefault(),bs())}),document.addEventListener("click",i=>{const t=document.getElementById("constellation-manage");t&&!t.hidden&&!t.contains(i.target)&&ji()}),document.getElementById("constellation-rename")?.addEventListener("click",async()=>{ji();const i=Te.find(e=>e.id===me);if(!i)return;const t=window.prompt("星座の名前",i.name)?.trim().slice(0,80);t&&(i.name=t,await ss(i),St?.selectConstellation(i.id,t),Vn())}),document.getElementById("constellation-delete")?.addEventListener("click",async()=>{if(ji(),!me)return;const i=me;await Ru(i),Te=Te.filter(t=>t.id!==i),++Us,me=null,gn([]),St?.selectConstellation(null),$n()}),document.addEventListener("keydown",i=>{const t=document.getElementById("constellation-manage");if(i.key==="Escape"&&t&&!t.hidden){ji();return}i.key!=="Escape"||i.target===document.getElementById("search-input")||i.target===document.getElementById("constellation-name-input")||(_e?bs():me&&(++Us,me=null,gn([]),St?.selectConstellation(null),Vn()))}),Vn()}async function xl(i,t=Oh,e=kh){if(!_i||!Td||!rt.mean||i.trim().length<2)return ja(rt.items,i);const[n]=await _i.embed([xh(i)]),s=Vu(n,rt.items,rt.vectors,rt.mean,rt.generality,t,rt.layout,e);return ja(rt.items,i,s)}function Cr(i,t=!1){const e=rt.items.find(n=>n.id===i);e&&ly(e.url,{newTab:t,beforeLeave:_y})}function kd(i){const t=rt.items.find(s=>s.id===i),e=document.getElementById("star-card");if(!t||!e)return;Es=i;const n=(s,r)=>{const a=document.getElementById(s);a.textContent=r,a.title=r};n("star-card-title",t.title),n("star-card-url",t.url),n("star-card-folder",t.folderPath.join(" / ")||"ルート"),e.hidden=!1}function Pr(i){const t=(i[0]?.score??0)*Bh;we=i.filter(n=>n.score>=t).slice(0,21),hi=0,St?.setSearch(we.map(n=>n.id)),St?.selectSearch(we[0]?.id??null);const e=document.getElementById("constellation-create");e&&(e.hidden=!we.length||!document.getElementById("search-input").value.trim()||!!_e),Od()}function Ny(i){const t=document.getElementById("search-input"),e=document.getElementById("star-card");document.addEventListener("keydown",n=>{if(n.key!=="/"||n.ctrlKey||n.metaKey||n.altKey||St?.inFlight)return;const s=document.activeElement;s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement||(n.preventDefault(),t.focus())}),t.addEventListener("focus",()=>St?.setTopDown(!0)),t.addEventListener("blur",()=>{t.value.trim()||St?.setTopDown(!1)}),t.addEventListener("input",()=>{const n=t.value.trim(),s=++Wo;if(clearTimeout(Go),e.hidden=!0,Es=null,!n){Pr([]),document.activeElement!==t&&St?.setTopDown(!1);return}Pr(ja(rt.items,n)),!(n.length<2)&&(Go=window.setTimeout(async()=>{try{const r=await xl(n);s===Wo&&Pr(r)}catch(r){console.error("[ブクスペ] 検索に失敗",r)}},300))}),t.addEventListener("keydown",n=>{if(n.key==="Enter"&&n.shiftKey)Nd(),n.preventDefault();else if(n.key==="Escape"){if(_e){bs(),n.preventDefault();return}if(me&&!t.value.trim()){++Us,me=null,gn([]),St?.selectConstellation(null),Vn(),n.preventDefault();return}t.value="",t.dispatchEvent(new Event("input")),t.blur(),n.preventDefault()}else if(n.key==="ArrowDown"||n.key==="ArrowUp"){if(!we.length)return;hi=(hi+(n.key==="ArrowDown"?1:-1)+we.length)%we.length,St?.selectSearch(we[hi].id),n.preventDefault()}else n.key==="Enter"&&we[hi]&&(Cr(we[hi].id,n.ctrlKey||n.metaKey),n.preventDefault())}),i.addEventListener("click",n=>{if(St?.inFlight)return;const s=St?.pickStar(n.clientX,n.clientY);s?Ud(s):e.hidden=!0}),i.addEventListener("mousemove",n=>{St?.inFlight||St?.hoverStar(St.pickStar(n.clientX,n.clientY))}),i.addEventListener("mouseleave",()=>St?.hoverStar(null)),i.addEventListener("dblclick",n=>{if(St?.inFlight||_e)return;const s=St?.pickStar(n.clientX,n.clientY);s&&Cr(s,n.ctrlKey||n.metaKey)}),document.getElementById("star-card-open")?.addEventListener("click",n=>{Es&&Cr(Es,n.ctrlKey||n.metaKey)})}function Fy(){const i=document.getElementById("flight-toggle"),t=()=>{const a=document.activeElement;return a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a?.isContentEditable},e=()=>{!St||_e||St.inFlight||(document.activeElement?.blur?.(),document.getElementById("star-card").hidden=!0,Es=null,St.enterFlight())},n=()=>{St?.exitFlight()};St.onEnterStar=a=>Cr(a,Sr);const s=document.getElementById("flight-help");let r;St.onFlightChange=a=>{document.body.classList.toggle("is-flying",a),clearTimeout(r),s?.classList.remove("is-compact"),a&&(r=window.setTimeout(()=>s?.classList.add("is-compact"),1e4)),i&&(i.textContent=a?"地図へ戻る":"飛行",i.title=a?"地図へ戻る（Esc）":"星の間を飛ぶ（F）")},i?.addEventListener("click",()=>St?.inFlight?n():e()),window.addEventListener("keydown",a=>{(a.key==="Control"||a.key==="Meta")&&(Sr=!0)},{capture:!0}),window.addEventListener("keyup",a=>{(a.key==="Control"||a.key==="Meta")&&(Sr=!1)},{capture:!0}),window.addEventListener("blur",()=>{Sr=!1}),window.addEventListener("keydown",a=>{if(!(a.ctrlKey||a.metaKey||a.altKey)){if(St?.inFlight){a.key==="Escape"&&n(),(a.key==="Escape"||a.key==="/"||a.key==="Enter"||a.key.startsWith("Arrow"))&&(a.preventDefault(),a.stopImmediatePropagation());return}a.code==="KeyF"&&!t()&&(a.preventDefault(),e())}},{capture:!0})}function Oy(){if(typeof chrome>"u"||!chrome.bookmarks?.onCreated)return;let i,t=!1;const e=async()=>{t=!1;const s=await ph();if(s.kind!==rt.kind){location.reload();return}rt.items=s.items,await Pd(),await Ld(),await Id()},n=()=>{clearTimeout(i),i=setTimeout(()=>{t||(t=!0,Cd(e))},500)};chrome.bookmarks.onCreated.addListener(n),chrome.bookmarks.onChanged.addListener(n),chrome.bookmarks.onRemoved.addListener(n),chrome.bookmarks.onMoved.addListener(n)}vy().catch(i=>{console.error(i),Bo("読み込みに失敗した。コンソールを確認する。")});
