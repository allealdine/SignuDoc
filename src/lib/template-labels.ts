import { formatMessage } from "./i18n/format.ts";
import { getMessages } from "./i18n/messages.ts";
import { DEFAULT_LOCALE, intlLocales, type Locale } from "./i18n/types.ts";

export type TemplateCountKind = "field" | "page";

/** The short date shown on a template card, in the reader's language. */
export function formatTemplateDate(
  timestamp: number,
  locale: Locale = DEFAULT_LOCALE,
): string {
  return new Intl.DateTimeFormat(intlLocales[locale], {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(timestamp * 1000));
}

/** The field and page counts on template cards and in template forms. */
export function buildTemplateCountLabel(
  count: number,
  kind: TemplateCountKind,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const copy = getMessages(locale).templates.counts;
  const message =
    kind === "field"
      ? count === 1
        ? copy.field
        : copy.fields
      : count === 1
        ? copy.page
        : copy.pages;

  return formatMessage(message, { count });
}
