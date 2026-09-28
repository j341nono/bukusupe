import type { BookmarkItem } from "../bookmarks/types";
import type { Layout } from "../layout";
import { brightnessOf } from "../layout/brightness";
import { clusterLabel } from "../i18n/cluster";
import { lastTouched } from "./magnitude";
import type { LabelSource } from "./scene";
import type { RenderStar } from "./stars";

/** 配置とブックマークを、描画に必要な形に合わせる。 */
export function toRenderStars(layout: Layout, byId: Map<string, BookmarkItem>): RenderStar[] {
  const stars: RenderStar[] = [];
  for (const s of layout.stars) {
    const item = byId.get(s.id);
    if (!item) continue;
    stars.push({ id: s.id, x: s.x, y: s.y, brightness: brightnessOf(item), touched: lastTouched(item),
      cluster: s.cluster, rank: s.rank });
  }
  return stars;
}

export function toLabelSource(layout: Layout, byId: Map<string, BookmarkItem>): LabelSource {
  return {
    clusters: layout.clusters.map((c) => ({
      index: c.index,
      // 保存した名前を、画面の言語の名前に直す
      name: clusterLabel(c.name),
      x: c.x,
      y: c.y,
      radius: c.radius,
      count: c.count,
    })),
    stars: layout.stars.flatMap((s) => {
      const item = byId.get(s.id);
      return item ? [{ id: s.id, title: item.title, url: item.url, x: s.x, y: s.y,
        cluster: s.cluster, rank: s.rank, touched: lastTouched(item) }] : [];
    }),
  };
}
