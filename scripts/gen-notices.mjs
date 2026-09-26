/**
 * THIRD_PARTY_NOTICES を作る（M6）。  node scripts/gen-notices.mjs
 *
 * 載せるのは、dist/・dist-web/ に実際に同梱されるもの（ビルドの sourcemap で確かめた）と、実行時に取得して使うモデル。
 * ライセンス文は node_modules の各パッケージの LICENSE から写す。onnxruntime-web / onnxruntime-common は
 * パッケージに LICENSE を含まないので、同梱している版のコミット（node_modules/onnxruntime-web/__commit.txt）の
 * LICENSE と ThirdPartyNotices.txt を licenses/ に置いてある（WASM には ONNX Runtime 本体と、それが静的に取り込む
 * ライブラリが入っているため、その表示は ThirdPartyNotices.txt に従う）。依存を足したり版を上げたら作り直す。
 */
import { readFileSync, writeFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8").trim();
const version = (name) => JSON.parse(read(`node_modules/${name}/package.json`)).version;
const ortCommit = read("node_modules/onnxruntime-web/__commit.txt");
const viteLicense = read("node_modules/vite/LICENSE.md").split("\n").slice(4, 24).join("\n");

const MIT_E5 = `MIT License

Copyright (c) the authors of intfloat/multilingual-e5-small
(Liang Wang, Nan Yang, Xiaolong Huang, Linjun Yang, Rangan Majumder, Furu Wei.
 "Multilingual E5 Text Embeddings: A Technical Report", arXiv:2402.05672, 2024)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

const entries = [
  {
    title: `three.js ${version("three")}`,
    note: "3D 描画。dist/index.js に同梱。https://github.com/mrdoob/three.js",
    license: "MIT",
    text: read("node_modules/three/LICENSE"),
  },
  {
    title: `Transformers.js（@huggingface/transformers）${version("@huggingface/transformers")}`,
    note: "埋め込みの計算。dist/assets/embed.worker-*.js に同梱。Copyright Hugging Face. https://github.com/huggingface/transformers.js",
    license: "Apache License 2.0",
    text: read("node_modules/@huggingface/transformers/LICENSE"),
  },
  {
    title: `@huggingface/tokenizers ${version("@huggingface/tokenizers")}`,
    note: "Transformers.js の束に取り込まれている（トークナイザー）。Copyright Hugging Face. https://github.com/huggingface/tokenizers.js",
    license: "Apache License 2.0",
    text: read("node_modules/@huggingface/tokenizers/LICENSE"),
  },
  {
    title: `@huggingface/jinja ${version("@huggingface/jinja")}`,
    note: "Transformers.js の束に取り込まれている（テンプレート）。https://github.com/huggingface/huggingface.js",
    license: "MIT",
    text: read("node_modules/@huggingface/jinja/LICENSE"),
  },
  {
    title: `ONNX Runtime Web（onnxruntime-web ${version("onnxruntime-web")}、onnxruntime-common ${version("onnxruntime-common")}）`,
    note: `推論の実行。dist/assets/embed.worker-*.js と dist/ort/（.mjs・.wasm）に同梱。コミット ${ortCommit}。` +
      "\nWASM には ONNX Runtime 本体と、それが静的に取り込むライブラリが含まれる。それらの著作権表示とライセンス文は" +
      "\nlicenses/onnxruntime-ThirdPartyNotices.txt（上のコミットの ThirdPartyNotices.txt）にある。https://github.com/microsoft/onnxruntime",
    license: "MIT",
    text: read("licenses/onnxruntime-LICENSE.txt"),
  },
  {
    title: `Vite ${version("vite")}（ビルドが差し込む小さな補助コード）`,
    note: "dist/index.js に、モジュールの先読みの補助（modulepreload polyfill）が入る。https://github.com/vitejs/vite",
    license: "MIT",
    text: viteLicense,
  },
  {
    title: "multilingual-e5-small（intfloat/multilingual-e5-small）",
    note: "埋め込みのモデル。同梱はしない。初回に Hugging Face から重みを取得し、ブラウザの中だけで使う。" +
      "\nhttps://huggingface.co/intfloat/multilingual-e5-small（モデルカードに license: mit）",
    license: "MIT",
    text: MIT_E5,
  },
  {
    title: "Xenova/multilingual-e5-small（上のモデルの ONNX 変換版。実際に取得するのはこちらの onnx/model_quantized.onnx）",
    note: "https://huggingface.co/Xenova/multilingual-e5-small（base_model: intfloat/multilingual-e5-small）。" +
      "\n変換版のリポジトリには別のライセンスの指定が無く、元のモデルの MIT License（上の文）に従う。",
    license: "MIT（元のモデルに従う）",
    text: "（上の multilingual-e5-small の MIT License を参照）",
  },
];

const rule = "=".repeat(78);
const body = [
  "THIRD_PARTY_NOTICES — ブクスペ（Bookmark Space）",
  "",
  "ブクスペは次の第三者のソフトウェアとモデルを同梱・利用している。それぞれの著作権表示とライセンス文を以下に示す。",
  "このファイルは scripts/gen-notices.mjs で作る（依存を足したり版を上げたら作り直す）。",
  "",
  ...entries.flatMap((e) => [rule, e.title, `ライセンス: ${e.license}`, e.note, rule, "", e.text, ""]),
].join("\n");
writeFileSync("THIRD_PARTY_NOTICES", body + "\n");
console.log(`THIRD_PARTY_NOTICES（${entries.length} 件）`);
