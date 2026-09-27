/**
 * 利用者に見せる連絡先（docs/RELEASE.md「決めたこと」の 7：GitHub の Issues とメール）。
 * メールアドレスは、使う人から受け取るまで仮の値（`.invalid` は実在しない予約済みのドメイン）。
 * 仮の値のままでは `npm run package`（ストアに出す zip を作る）が失敗する（scripts/package.mjs）。
 */
export const SUPPORT_EMAIL = "bukusupe-support@example.invalid";
export const ISSUES_URL = "https://github.com/j341nono/bukusupe/issues";
