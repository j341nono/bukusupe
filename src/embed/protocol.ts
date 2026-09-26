/** 画面と埋め込み Worker のやりとり。 */
export type EmbedRequest =
  /** dtype は測定（?debug=1&dtype=…）のときだけ渡す。無ければ q8（int8） */
  | { type: "init"; ortBaseUrl: string; model: string; dtype?: EmbedDtype }
  | { type: "embed"; requestId: number; texts: string[] }
  /** 測定用：ONNX Runtime の WebAssembly のメモリの大きさ（debug の Worker だけが答える） */
  | { type: "memory"; requestId: number };

export type EmbedDtype = "q8" | "fp16" | "fp32";

export type EmbedResponse =
  | { type: "ready"; model: string }
  | { type: "download"; file: string; progress: number }
  | { type: "vectors"; requestId: number; vectors: Float32Array[] }
  | { type: "memory"; requestId: number; bytes: number; memories: number }
  | { type: "error"; requestId?: number; message: string };
