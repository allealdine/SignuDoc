import { enMessages, type Messages } from "./locales/en.ts";
import { idMessages } from "./locales/id.ts";
import { DEFAULT_LOCALE, type Locale } from "./types.ts";

const dictionaries: Record<Locale, Messages> = {
  en: enMessages,
  id: idMessages,
};

export function getMessages(locale: Locale = DEFAULT_LOCALE): Messages {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}
