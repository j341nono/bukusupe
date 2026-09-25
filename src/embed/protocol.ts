/** 画面と埋め込み Worker のやりとり。 */
export type EmbedRequest =
  | { type: "init"; ortBaseUrl: string; model: string }
  | { type: "embed"; requestId: number; texts: string[] };

export type EmbedResponse =
  | { type: "ready"; model: string }
  | { type: "download"; file: string; progress: number }
  | { type: "vectors"; requestId: number; vectors: Float32Array[] }
  | { type: "error"; requestId?: number; message: string };
