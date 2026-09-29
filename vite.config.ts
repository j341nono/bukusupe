import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";

/**
 * onnxruntime-web の束には .wasm への参照が埋まっているため、Vite が
 * assets/ にもう一つ 27MB を書き出す。実行時に読むのは同梱した ort/ の方なので、
 * 重複を捨てる（配布物を無駄に重くしない）。
 */
function dropDuplicateOrtWasm(): Plugin {
  return {
    name: "drop-duplicate-ort-wasm",
    generateBundle(_options, bundle) {
      for (const name of Object.keys(bundle)) {
        if (/^assets\/ort-wasm.*\.wasm$/.test(name)) delete bundle[name];
      }
    },
  };
}

/**
 * Web のデモ（`--mode web`）には拡張機能のマニフェストを置かない（public/ から写されたものを消す）。
 */
function dropManifest(outDir: string): Plugin {
  return {
    name: "drop-extension-manifest",
    apply: "build",
    closeBundle() {
      rmSync(resolve(outDir, "manifest.json"), { force: true });
    },
  };
}

/**
 * 版の番号をそろえる（docs/RELEASE.md「版の番号の決まり」）：manifest の version と package.json の version が違えば、
 * 配布用のビルドを失敗させる。確認（scripts/check-release.mjs）のために、package.json の版を環境変数で差し替えられる
 * （BUKUSUPE_TEST_PACKAGE_VERSION。ビルドの道具の中だけで使い、配布物には入らない）。
 */
function checkVersion(): Plugin {
  return {
    name: "check-version",
    apply: "build",
    buildStart() {
      const manifest = JSON.parse(readFileSync(resolve("public/manifest.json"), "utf8")).version;
      const pkg = process.env.BUKUSUPE_TEST_PACKAGE_VERSION ?? JSON.parse(readFileSync(resolve("package.json"), "utf8")).version;
      if (manifest !== pkg) {
        this.error(`版の番号がそろっていない：public/manifest.json は ${manifest}、package.json は ${pkg}（docs/RELEASE.md「版の番号の決まり」）`);
      }
    },
  };
}

/**
 * 確認用のビルドの manifest：確認用の注入（chrome.storage.local）のための storage 権限を足し、名前に「（確認用）」を付ける。
 * 配布用の manifest（public/manifest.json そのまま）には、確認用だけに使う権限を入れない。
 */
function debugManifest(outDir: string): Plugin {
  return {
    name: "debug-manifest",
    apply: "build",
    closeBundle() {
      const path = resolve(outDir, "manifest.json");
      const manifest = JSON.parse(readFileSync(path, "utf8"));
      // 名前は _locales から引く（__MSG_extName__）ので、確認用は固定の名前にする
      manifest.name = "ブクスペ（確認用）";
      manifest.permissions = [...new Set([...(manifest.permissions ?? []), "storage"])];
      writeFileSync(path, JSON.stringify(manifest, null, 2) + "\n");
    },
  };
}

/**
 * Web のデモ（`--mode web`）の CSP（docs/SECURITY.md）。拡張機能は manifest の CSP で守られるが、GitHub Pages には無いので、
 * index.html に meta で入れる。許すのは、Web 版が動くのに必要なものだけ：
 * - script-src：同じ場所のスクリプト（本体・計算済みのサンプル・同梱の ONNX Runtime の .mjs）と、WebAssembly のコンパイル
 * - worker-src：埋め込みの Worker（同じ場所）
 * - connect-src：同じ場所（ONNX Runtime の .wasm）と、モデルの重みの取得先（Hugging Face と、その配信の転送先 *.hf.co）
 * - style-src：index.html の中の <style>（'unsafe-inline'。スクリプトには許さない）
 * - img-src：同じ場所の画像と、canvas から作る data: の画像
 * 外部のスクリプト・フォーム・フレーム・プラグインは許さない。
 */
export const WEB_CSP = [
  "default-src 'self'",
  "script-src 'self' 'wasm-unsafe-eval'",
  "worker-src 'self'",
  "connect-src 'self' https://huggingface.co https://*.huggingface.co https://*.hf.co",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join("; ");

function webCsp(): Plugin {
  return {
    name: "web-content-security-policy",
    apply: "build",
    transformIndexHtml(html) {
      return html.replace(/(<meta charset="utf-8" \/>)/, `$1\n    <meta http-equiv="Content-Security-Policy" content="${WEB_CSP}" />`);
    },
  };
}

// 素の Vite で MV3 を組む。プラグインを使わないのは、CSP と
// ONNX Runtime の補助ファイル（M1 で同梱）の配置を自分で握るため。
//
// ビルドは 4 種類（docs/RELEASE.md 段階 2）：
// - 配布用（既定。`npm run build`）→ dist/。確認用の仕組み（__DEBUG__ の中）はビルドの時点で取り除く。リポジトリに含め、ストアに出す
// - 確認用（`--mode debug`。`npm run build:debug`）→ dist-debug/。check:ext と bench が使う（?debug=1 の確認用の窓口など）
// - Web のデモ（`--mode web`。`npm run build:web`）→ dist-web/。公開するのはこれ
// - Web のデモの確認用（`--mode web-debug`。`npm run build:web:debug`）→ dist-web-debug/。check-web と bench が使う
export default defineConfig(({ mode }) => {
  const web = mode === "web" || mode === "web-debug";
  const debug = mode === "debug" || mode === "web-debug";
  const outDir = { debug: "dist-debug", web: "dist-web", "web-debug": "dist-web-debug" }[mode] ?? "dist";
  const plugins = [dropDuplicateOrtWasm()];
  if (web) plugins.push(dropManifest(outDir), webCsp());
  else if (debug) plugins.push(debugManifest(outDir));
  else plugins.push(checkVersion());
  return {
    base: "./",
    plugins,
    // 確認用の仕組みを囲む定数。配布用では false になり、囲んだコードは丸ごと消える
    define: { __DEBUG__: JSON.stringify(debug), __WEB__: JSON.stringify(web) },
    build: {
      target: "es2022",
      outDir,
      emptyOutDir: true,
      rollupOptions: {
        // パスは root（プロジェクト直下）からの相対
        // Web のデモには、プライバシーポリシー（/bukusupe/privacy-policy.html）と、旧 URL（/bukusupe/privacy/）からの転送のページも入れる。拡張機能には入れない
        input: web ? { index: "index.html", privacy: "privacy/index.html", "privacy-policy": "privacy-policy.html" } as Record<string, string> : {
          index: "index.html",
          background: "src/background.ts",
        },
        output: {
          // manifest.json から参照するため、background だけは固定名にする。
          entryFileNames: "[name].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
        },
      },
    },
    worker: {
      // MV3 では classic worker が使えないので ES モジュールで出す（M1 で使う）。
      format: "es" as const,
    },
  };
});
