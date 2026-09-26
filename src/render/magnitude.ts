import * as THREE from "three";
import type { AppearanceFn, RenderStar } from "./stars";

/**
 * 星の見え方を「最後に触れた日」で決める（段階 2 の一部を先に。`StarField.setAppearance()` で差し込む）。
 *
 * 最後に触れた日＝最終利用日と追加日の新しいほう。どちらも無ければ分からない（中間）。
 * 最近触れた星ほど明るく大きく青白く、長く触れていない星ほど暗く、淡い橙へ冷えていく（本物の星の色温度に倣う）。
 * 色の変化は上品な範囲にとどめる（彩度は低め）。星団ごとの色分けはしない。金は使わない（人が名付けたもの専用）。
 * id には依存しない：最終利用日も追加日も同じ星なら、同じ見た目になる。地図と飛行モードの両方に効く。
 */
const DAY = 86_400_000;
/** これ以上前は、いちばん冷えた色（約 2 年） */
const COLDEST_DAYS = 730;

const RECENT = new THREE.Color().setHSL(0.6, 0.42, 0.88);   // 青白
const MIDDLE = new THREE.Color().setHSL(0.12, 0.1, 0.86);   // 生成り（分からないときもこれ）
const OLD = new THREE.Color().setHSL(0.075, 0.45, 0.7);     // 淡い橙

/** ページを開いた時点を「いま」とする（開いている間に見え方が揺れないように） */
const OPENED_AT = Date.now();

export function lastTouched(item: { dateLastUsed?: number; dateAdded?: number }): number | undefined {
  const t = Math.max(item.dateLastUsed ?? 0, item.dateAdded ?? 0);
  return t > 0 ? t : undefined;
}

/** 新しさ（1：いま触れた 〜 0：約 2 年以上前）。分からないときは 0.5。日数の対数で測る（最近の差を細かく）。 */
export function recency(touched: number | undefined, now = OPENED_AT): number {
  if (touched == null) return 0.5;
  const days = Math.max(0, (now - touched) / DAY);
  return 1 - Math.min(1, Math.log(days + 1) / Math.log(COLDEST_DAYS + 1));
}

export function touchColor(r: number): THREE.Color {
  return r >= 0.5 ? MIDDLE.clone().lerp(RECENT, (r - 0.5) * 2) : OLD.clone().lerp(MIDDLE, r * 2);
}

/** 見え方の関数（`AppearanceFn`）。螺旋の内側（代表）ほど少し大きく明るくするのは、これまでどおり。 */
export const touchAppearance: AppearanceFn = (star: RenderStar) => {
  const r = recency(star.touched);
  const b = 0.3 + 0.7 * r;
  const lead = 1 / (1 + star.rank * 0.5);
  return {
    size: (0.95 + b * 1.25) * (1 + lead * 0.45),
    alpha: Math.min(1, (0.45 + b * 0.55) * (1 + lead * 0.25)),
    color: touchColor(r),
  };
};
