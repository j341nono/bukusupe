import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  manifest_version: 3,
  name: 'ブクスペ',
  version: '0.1.0',
  description: 'ブックマークを意味ベクトルで宇宙地図にする',
  permissions: ['bookmarks', 'storage', 'tabs', 'favicon'],
  background: {
    service_worker: 'src/background/service-worker.ts',
    type: 'module',
  },
  action: {
    default_title: 'ブクスペを開く',
  },
  content_security_policy: {
    extension_pages:
      "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'",
  },
});
