export interface Bookmark {
  id: string;
  title: string;
  url: string;
  hostname: string;
  dateAdded: number;
  folderPath: string;
  parentId?: string;
}

export interface LaidOutBookmark extends Bookmark {
  vector: number[];
  ringIndex: number;
  angle: number;
  /** Flat XZ-plane position (Y=0). View applies Saturn tilt. */
  position3d: [number, number, number];
  /** Top-down 2D scaled position (pixels-ish). */
  position2d: [number, number];
}

export interface RingSpec {
  index: number;
  name: string;
  radius: number;
  count: number;
  cssColor: string;
}

export interface PlanetLayout {
  rings: RingSpec[];
  /** Saturn-style ring tilt around X-axis, radians. */
  tilt: number;
  bookmarks: LaidOutBookmark[];
}

export type SwMessage =
  | { type: 'bookmark:created'; id: string; bookmark: chrome.bookmarks.BookmarkTreeNode }
  | { type: 'bookmark:changed'; id: string; info: chrome.bookmarks.BookmarkChangeInfo }
  | { type: 'bookmark:removed'; id: string; info: chrome.bookmarks.BookmarkRemoveInfo }
  | { type: 'bookmark:moved'; id: string; info: chrome.bookmarks.BookmarkMoveInfo };

export type WorkerRequest =
  | { type: 'init'; modelId: string; wasmBase: string }
  | { type: 'embed'; jobId: string; texts: string[] };

export type WorkerResponse =
  | { type: 'ready' }
  | { type: 'embed:done'; jobId: string; vectors: number[][] }
  | { type: 'progress'; jobId: string; done: number; total: number }
  | { type: 'error'; jobId?: string; message: string };

export interface PickResult {
  bookmark: LaidOutBookmark;
  clientX: number;
  clientY: number;
}

export interface View {
  onActivate(): void;
  replaceAll(layout: PlanetLayout): void;
  removeBookmark(id: string): void;
  search(query: string): void;
  pick(clientX: number, clientY: number): PickResult | null;
}
