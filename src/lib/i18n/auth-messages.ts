import {
  PASSWORD_BREACHED_MESSAGE,
  PASSWORD_TOO_LONG_MESSAGE,
  PASSWORD_TOO_SHORT_MESSAGE,
} from "../password-messages.ts";
import { formatMessage } from "./format.ts";
import type { Messages } from "./locales/en.ts";

type AuthCopy = Messages["auth"];

/**
 * Better Auth keeps answering in its canonical English. Only the words shown
 * on screen are swapped, so codes, payloads and audit messages stay intact.
 */
export function localizePasswordMessage(
  message: string | null | undefined,
  copy: AuthCopy,
): string | null {
  switch (message) {
    case PASSWORD_TOO_SHORT_MESSAGE:
      return copy.password.tooShort;
    case PASSWORD_TOO_LONG_MESSAGE:
      return copy.password.tooLong;
    case PASSWORD_BREACHED_MESSAGE:
      return copy.password.breached;
    default:
      return message ?? null;
  }
}

/** Localizes the sentences returned by describeSignupPolicy and its siblings. */
export function localizeSignupMessage(
  message: string | null | undefined,
  copy: AuthCopy,
): string | null {
  if (!message) {
    return null;
  }

  if (message === "New accounts are not being accepted.") {
    return copy.signup.rules.closed;
  }

  if (message === "This site has not been set up yet.") {
    return copy.signup.rules.setup;
  }

  if (message === "Anyone can create an account.") {
    return copy.signup.rules.open;
  }

  const domains = message.match(
    /^Accounts can be created with an email address at (.+)\.$/,
  )?.[1];

  if (domains) {
    const localizedDomains = domains.replaceAll(
      " or ",
      ` ${copy.signup.rules.or} `,
    );

    return formatMessage(copy.signup.rules.domains, {
      domains: localizedDomains,
    });
  }

  return message;
}
