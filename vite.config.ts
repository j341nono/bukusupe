import { defineConfig } from "vite";

// 素の Vite で MV3 を組む。プラグインを使わないのは、CSP と
// ONNX Runtime の補助ファイル（M1 で同梱）の配置を自分で握るため。
export default defineConfig({
  base: "./",
  build: {
    target: "es2022",
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      // パスは root（プロジェクト直下）からの相対
      input: {
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
});
