/**
 * ビルドの定数（vite.config.ts の define）。確認用のビルド（`--mode debug` / `web-debug`）だけ true。
 * 配布用のビルドでは false になり、`if (__DEBUG__) { … }` の中は丸ごと取り除かれる（docs/RELEASE.md 段階 2、規則 11）。
 */
declare const __DEBUG__: boolean;
/** Web のデモのビルド（`--mode web` / `web-debug`）なら true。vite.config.ts の define */
declare const __WEB__: boolean;
