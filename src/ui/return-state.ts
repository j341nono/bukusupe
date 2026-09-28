import type { BookmarkSourceKind } from "../bookmarks/types";

/**
 * 「戻る」で再開するための状態（ページへ移る直前に sessionStorage に保存し、「戻る」で開いたときだけ使う）。
 * 読み込んだ値は必ず確かめる（docs/SECURITY.md）。一つでも合わなければ丸ごと捨てて、ふつうに開く。
 * 形を変えたら RETURN_STATE_VERSION を上げる（版が違う保存状態は捨てる）。
 */
export const RETURN_STATE_KEY = "bukusupe:return-state";
/** 版の番号を持たなかった頃の保存場所（見つけたら消す） */
const LEGACY_KEYS = ["bukusupe:return-state-v1"];
export const RETURN_STATE_VERSION = 2;

export type ReturnState = {
  version: number;
  source: BookmarkSourceKind;
  flying: boolean;
  /** 宇宙船の位置と向き（yaw・pitch・roll は YXZ の順の角度。roll は 2026-09-28 から。無ければ 0） */
  ship: { x: number; y: number; z: number; yaw: number; pitch: number; roll: number; speed: number } | null;
  camera: { x: number; y: number; distance: number; tilt: number };
  query: string;
  constellationId: string | null;
};

/** 妥当な範囲（地図の座標・宇宙船の位置は十分に広く取る。これを超えるものは壊れた値とみなす） */
const COORD = 1e6;
const QUERY_MAX = 500;
const ID_MAX = 256;

const inRange = (v: unknown, min: number, max: number): v is number => typeof v === "number" && Number.isFinite(v) && v >= min && v <= max;
const isObject = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

/** 保存した文字列を確かめて読む。合わなければ null（source は、いまのデータ源と一致することも確かめる） */
export function parseReturnState(raw: string, source: BookmarkSourceKind): ReturnState | null {
  let value: unknown;
  try { value = JSON.parse(raw); } catch { return null; }
  if (!isObject(value) || value.version !== RETURN_STATE_VERSION || value.source !== source) return null;
  const { camera, ship, flying, query, constellationId } = value;
  if (typeof flying !== "boolean") return null;
  if (!isObject(camera) || !inRange(camera.x, -COORD, COORD) || !inRange(camera.y, -COORD, COORD) ||
    !inRange(camera.distance, 1, COORD) || !inRange(camera.tilt, 0, Math.PI / 2)) return null;
  if (ship !== null && (!isObject(ship) || !inRange(ship.x, -COORD, COORD) || !inRange(ship.y, -COORD, COORD) ||
    !inRange(ship.z, -COORD, COORD) || !inRange(ship.yaw, -1e4, 1e4) || !inRange(ship.pitch, -Math.PI, Math.PI) ||
    !inRange(ship.speed, 0, 1e5) || (ship.roll !== undefined && !inRange(ship.roll, -Math.PI, Math.PI)))) return null;
  if (flying && ship === null) return null;
  if (typeof query !== "string" || query.length > QUERY_MAX) return null;
  if (constellationId !== null && (typeof constellationId !== "string" || constellationId.length > ID_MAX)) return null;
  return {
    version: RETURN_STATE_VERSION, source, flying,
    ship: ship === null ? null : { x: ship.x as number, y: ship.y as number, z: ship.z as number, yaw: ship.yaw as number,
      pitch: ship.pitch as number, roll: (ship.roll as number | undefined) ?? 0, speed: ship.speed as number },
    camera: { x: camera.x as number, y: camera.y as number, distance: camera.distance as number, tilt: camera.tilt as number },
    query, constellationId: constellationId as string | null,
  };
}

/** 保存状態を取り出して消す（一度だけ使う）。古い保存場所も消す */
export function takeReturnState(): string | null {
  for (const key of LEGACY_KEYS) sessionStorage.removeItem(key);
  const raw = sessionStorage.getItem(RETURN_STATE_KEY);
  sessionStorage.removeItem(RETURN_STATE_KEY);
  return raw;
}

export function storeReturnState(value: Omit<ReturnState, "version">): void {
  const state: ReturnState = { version: RETURN_STATE_VERSION, ...value, query: value.query.slice(0, QUERY_MAX) };
  sessionStorage.setItem(RETURN_STATE_KEY, JSON.stringify(state));
}
