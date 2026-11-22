"use client";

import { useState } from "react";

import { ShellButton } from "@/components/shared/form-shell";
import { formatMessage } from "@/lib/i18n/format.ts";
import { getMessages } from "@/lib/i18n/messages.ts";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/types.ts";

// "Continue with <provider>": hands the visitor to the organization's
// identity provider (lib/auth/sso.ts). Better Auth sends them back to
// /api/auth/callback/sso, and from there to the dashboard, or to the sign-in
// page with ?error= when it did not work.

export type SsoOption = { name: string };

/** What the sign-in page says for an ?error= the provider callback sent. */
export function describeSsoError(
  code: string,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const errors = getMessages(locale).auth.sso.errors;

  switch (code) {
    case "signup_closed":
    case "signup_domain_not_allowed":
      return errors.notAllowed;
    case "access_denied":
      return errors.cancelled;
    case "email_not_found":
      return errors.emailNotFound;
    case "unable_to_link_account":
    case "email_not_verified":
      return errors.needsVerification;
    case "account_already_linked_to_different_user":
      return errors.linkedElsewhere;
    default:
      return errors.generic;
  }
}

export function SsoButton({
  label,
  onError,
  sso,
  variant = "primary",
}: {
  label?: string;
  onError: (message: string) => void;
  sso: SsoOption;
  variant?: "primary" | "secondary";
}) {
  const { locale, messages } = useMessages();
  const [isBusy, setIsBusy] = useState(false);

  async function start() {
    if (isBusy) {
      return;
    }

    setIsBusy(true);

    try {
      const origin = window.location.origin;
      const response = await fetch("/api/auth/sign-in/social", {
        body: JSON.stringify({
          callbackURL: `${origin}/dashboard`,
          errorCallbackURL: `${origin}/login`,
          newUserCallbackURL: `${origin}/dashboard`,
          provider: "sso",
        }),
        headers: { "content-type": "application/json" },
        method: "POST",
      });
      const payload = (await response.json().catch(() => null)) as {
        url?: string;
      } | null;

      if (!response.ok || !payload?.url) {
        onError(describeSsoError("", locale));
        setIsBusy(false);
        return;
      }

      window.location.assign(payload.url);
    } catch {
      onError(describeSsoError("", locale));
      setIsBusy(false);
    }
  }

  return (
    <ShellButton
      className="w-full"
      loading={isBusy}
      onClick={() => void start()}
      type="button"
      variant={variant}
    >
      {label ??
        formatMessage(messages.auth.sso.continueWith, { provider: sso.name })}
    </ShellButton>
  );
}
