import { defineConfig, type Plugin } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.config';
import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

// transformers.js v3 dynamically imports the ONNX Runtime JSEP loader (.mjs)
// from a hardcoded jsDelivr URL, which Chrome MV3's CSP blocks. Copy the
// runtime files into dist/ort/ so the worker can load them from the
// extension's own origin via env.backends.onnx.wasm.wasmPaths.
const copyOrtRuntime = (): Plugin => ({
  name: 'copy-ort-runtime',
  apply: 'build',
  async closeBundle() {
    const src = resolve(
      here,
      'node_modules/@huggingface/transformers/dist',
    );
    const dest = resolve(here, 'dist/ort');
    await mkdir(dest, { recursive: true });
    const files = await readdir(src);
    for (const file of files) {
      if (/^ort-.*\.(mjs|wasm)$/.test(file)) {
        await copyFile(resolve(src, file), resolve(dest, file));
      }
    }
  },
});

export default defineConfig({
  plugins: [crx({ manifest }), copyOrtRuntime()],
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        universe: 'universe.html',
      },
    },
  },
  worker: {
    format: 'es',
  },
});
