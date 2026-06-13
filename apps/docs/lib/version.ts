/**
 * The current site version. Bump this whenever you ship a user-facing update.
 * The running client embeds this value at build time; /api/version returns the
 * value from the live deployment. When they differ, a new version has shipped
 * and the UpdateNotifier prompts the visitor to reload.
 */
export const SITE_VERSION = "0.1.28"
