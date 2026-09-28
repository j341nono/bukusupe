import { CATEGORY_BY_ID } from "../embed/topic-categories";
import { lang, t } from ".";

/** 保存した星団名の形（src/layout/names.ts）：`{dev}`・`{dev}+{ai}`・`{dev}#3`・`{unnamed}#3`・`{other}` */
const FORM = /^((?:\{[a-z]+\})(?:\+\{[a-z]+\})*)(?:#(\d+))?$/;

/**
 * 星団名を画面の言語で書く（SPEC 7 章・14 章）。大分類は画面の言語の名前にする。
 * 形に合わないもの（仮の配置のフォルダ名やドメインなど、利用者のデータから来た名前）は、そのまま出す。
 */
export function clusterLabel(name: string): string {
  const match = FORM.exec(name);
  if (!match) return name;
  const ids = [...match[1].matchAll(/\{([a-z]+)\}/g)].map((m) => m[1]);
  const n = match[2] ? Number(match[2]) : undefined;
  if (ids.length === 1 && ids[0] === "unnamed") return t("cluster.unnamed", { n: n ?? 1 });
  if (ids.length === 1 && ids[0] === "other") return t("cluster.other");
  const categories = ids.map((id) => CATEGORY_BY_ID.get(id));
  if (categories.some((c) => !c)) return name;
  const joined = categories.map((c) => c![lang()]).join(t("cluster.join"));
  return n === undefined ? joined : t("cluster.numbered", { name: joined, n });
}
