export const locales = ["en", "id"] as const;

export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_HEADER = "x-signudoc-locale";
export const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

/** The locale identifiers used by Intl for each supported locale. */
export const intlLocales: Record<Locale, string> = {
  en: "en-US",
  id: "id-ID",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "id";
}

/**
 * Picks the first supported language from an Accept-Language header. Region
 * tags such as id-ID and en-GB are accepted; q-values are ignored because the
 * header is already ordered by preference.
 */
export function localeFromAcceptLanguage(
  value: string | null | undefined,
): Locale | null {
  if (!value) {
    return null;
  }

  for (const entry of value.split(",")) {
    const tag = entry.split(";")[0]?.trim().toLowerCase() ?? "";

    if (tag === "id" || tag.startsWith("id-")) {
      return "id";
    }

    if (tag === "en" || tag.startsWith("en-")) {
      return "en";
    }
  }

  return null;
}
