"use client";

import Link from "next/link";

import { useBranding } from "@/components/layout/branding-provider";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { SIGNUDOC_NAME, SIGNUDOC_URL } from "@/lib/branding";
import { cn } from "@/lib/cn";
import { formatMessage } from "@/lib/i18n/format.ts";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";
import { PUBLIC_COPYRIGHT_YEAR, publicFooterLinks } from "@/lib/legal";
import { PERMITTED_USE_PATH } from "@/lib/permitted-uses";

type PublicLegalFooterProps = {
  className?: string;
  contentClassName?: string;
  labelVariant?: "long" | "short";
  linkClassName?: string;
};

type FooterLink = {
  external: boolean;
  href: string;
  label: string;
};

export function PublicLegalFooter({
  className = "",
  contentClassName = "",
  labelVariant = "short",
  linkClassName,
}: PublicLegalFooterProps) {
  const branding = useBranding();
  const { messages } = useMessages();
  const footer = messages.footer;
  const resolvedLinkClassName =
    linkClassName ??
    "text-[0.8125rem] font-medium text-(--tertiary) transition-colors hover:text-(--accent-ink)";
  // The hosted service links to its own pages. Any other install links to
  // whatever terms and privacy policy its organization has published.
  const links: FooterLink[] = branding.hosted
    ? publicFooterLinks.map((link) => {
        const labels =
          link.href === "/terms"
            ? { long: footer.termsLong, short: footer.termsShort }
            : link.href === "/privacy"
              ? { long: footer.privacyLong, short: footer.privacyShort }
              : link.href === "/contact"
                ? { long: footer.contact, short: footer.contact }
                : {
                    long: footer.accessibilityLong,
                    short: footer.accessibilityShort,
                  };

        return {
          external: false,
          href: link.href,
          label: labelVariant === "long" ? labels.long : labels.short,
        };
      })
    : [
        ...(branding.termsUrl
          ? [
              {
                external: true,
                href: branding.termsUrl,
                label:
                  labelVariant === "long"
                    ? footer.termsLong
                    : footer.termsShort,
              },
            ]
          : []),
        // Without the organization's own policy, signers still get a
        // notice, built from the install's settings.
        branding.privacyUrl
          ? {
              external: true,
              href: branding.privacyUrl,
              label:
                labelVariant === "long"
                  ? footer.privacyLong
                  : footer.privacyShort,
            }
          : {
              external: false,
              href: "/signer-privacy",
              label:
                labelVariant === "long"
                  ? footer.privacyNotice
                  : footer.privacyShort,
            },
      ];

  // Which documents may be signed here: on every install.
  links.push({
    external: false,
    href: PERMITTED_USE_PATH,
    label:
      labelVariant === "long"
        ? footer.permittedUseLong
        : footer.permittedUseShort,
  });

  return (
    <footer className={cn("relative z-10", className)}>
      <div className={cn("page-width py-7", contentClassName)}>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[0.8125rem] text-(--tertiary)">
            © {PUBLIC_COPYRIGHT_YEAR} {branding.productName}
          </p>

          {links.length > 0 ? (
            <nav
              aria-label={footer.ariaLabel}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            >
              {links.map((link) =>
                link.external ? (
                  <a
                    className={resolvedLinkClassName}
                    href={link.href}
                    key={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    className={resolvedLinkClassName}
                    href={link.href}
                    key={link.href}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          ) : null}

          <LocaleSwitcher className="justify-center" />

          {branding.hosted ? null : (
            <a
              className={resolvedLinkClassName}
              href={SIGNUDOC_URL}
              rel="noreferrer"
              target="_blank"
            >
              {formatMessage(footer.poweredBy, { productName: SIGNUDOC_NAME })}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
