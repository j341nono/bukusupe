/**
 * 星の新しさ（明るさ・色・ラベルの目立ち方）を測る基準の「今日」。
 * ページを開いた時点を既定にする（開いている間に見え方が揺れないように）。
 * サンプルのデータ源（Web のデモを含む）では、サンプルの日時を作った基準日に固定する（main が起動時に決める）。
 * 固定しないと、実際の日付が進むほどサンプルの星が暗くなり、中距離のタイトルも出なくなる。
 */
let today = Date.now();

export function setToday(ms: number): void {
  today = ms;
}

export function getToday(): number {
  return today;
}
