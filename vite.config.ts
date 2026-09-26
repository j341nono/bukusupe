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

// 素の Vite で MV3 を組む。プラグインを使わないのは、CSP と
// ONNX Runtime の補助ファイル（M1 で同梱）の配置を自分で握るため。
// `--mode web` は Web のデモ（M6）：サンプルだけで動く版を dist-web/ に出す（service worker もマニフェストも無い）。
export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: mode === "web" ? [dropDuplicateOrtWasm(), dropManifest()] : [dropDuplicateOrtWasm()],
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
