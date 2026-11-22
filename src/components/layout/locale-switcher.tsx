"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

import { IDFlagRound } from "@/components/flags/IDFlagRound";
import { USFlagRound } from "@/components/flags/USFlagRound";
import { cn } from "@/lib/cn";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";
import { setLocale } from "@/lib/i18n/set-locale.ts";
import { isLocale } from "@/lib/i18n/types.ts";

type LocaleSwitcherProps = {
  className?: string;
};

/** Changes the cookie only: signing links keep their original URLs. */
export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, messages } = useMessages();
  const [isPending, startTransition] = useTransition();

  // On a signing page the envelope's language wins: it is the language of the
  // invitation, the disclosure and the consent the signer records.
  if (pathname.startsWith("/sign/") || pathname.startsWith("/embed/sign/")) {
    return null;
  }

  function changeLocale(value: string) {
    if (!isLocale(value) || value === locale) {
      return;
    }

    startTransition(async () => {
      await setLocale(value);
      router.refresh();
    });
  }

  return (
    <div className={cn("flex shrink-0 items-center gap-2", className)}>
      <span className="flex shrink-0 items-center" data-testid="locale-flag">
        {locale === "id" ? (
          <IDFlagRound height="18px" width="18px" />
        ) : (
          <USFlagRound height="18px" width="18px" />
        )}
      </span>
      <select
        aria-label={messages.footer.languageAriaLabel}
        className="max-w-full min-w-[10rem] shrink-0 rounded-md border border-(--border) bg-(--paper) px-2 py-1 text-[0.8125rem] font-medium text-(--tertiary) outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
        disabled={isPending}
        onChange={(event) => changeLocale(event.target.value)}
        value={locale}
      >
        <option value="en">{messages.footer.english}</option>
        <option value="id">{messages.footer.indonesian}</option>
      </select>
    </div>
  );
}
