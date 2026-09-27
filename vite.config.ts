import { rmSync } from "node:fs";
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
function dropManifest(): Plugin {
  return {
    name: "drop-extension-manifest",
    apply: "build",
    closeBundle() {
      rmSync(resolve("dist-web/manifest.json"), { force: true });
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
// `--mode web` は Web のデモ（M6）：サンプルだけで動く版を dist-web/ に出す（service worker もマニフェストも無い）。
export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: mode === "web" ? [dropDuplicateOrtWasm(), dropManifest(), webCsp()] : [dropDuplicateOrtWasm()],
  build: {
    target: "es2022",
    outDir: mode === "web" ? "dist-web" : "dist",
    emptyOutDir: true,
    rollupOptions: {
      // パスは root（プロジェクト直下）からの相対
      input: mode === "web" ? { index: "index.html" } as Record<string, string> : {
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
    format: "es",
  },
}));
