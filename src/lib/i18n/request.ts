import { cookies, headers } from "next/headers";

import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  type Locale,
  localeFromAcceptLanguage,
} from "./types.ts";

/**
 * Resolves the locale for the current request. The Proxy forwards its choice
 * in a private request header, so the first request already uses the browser's
 * language; the cookie it sets keeps later requests stable.
 */
export async function getRequestLocale(): Promise<Locale> {
  const requestHeaders = await headers();
  const fromProxy = requestHeaders.get(LOCALE_HEADER);

  if (isLocale(fromProxy)) {
    return fromProxy;
  }

  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value;

  if (isLocale(fromCookie)) {
    return fromCookie;
  }

  return (
    localeFromAcceptLanguage(requestHeaders.get("accept-language")) ??
    DEFAULT_LOCALE
  );
}
