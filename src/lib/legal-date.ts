import { intlLocales, type Locale } from "./i18n/types.ts";

/** Effective dates for the hosted legal pages, kept per document. */
export const TERMS_EFFECTIVE_DATE = "2026-03-21";
export const PRIVACY_EFFECTIVE_DATE = "2026-03-25";
export const ACCESSIBILITY_EFFECTIVE_DATE = "2026-03-25";

/**
 * Formats an ISO date for a legal page in the active language, always in UTC
 * so a reader in any timezone sees the same day.
 */
export function formatLegalDate(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocales[locale], {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
