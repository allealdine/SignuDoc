import Link from "next/link";

import { formatMessage } from "@/lib/i18n/format.ts";

const linkClassName =
  "font-semibold text-(--accent-ink) underline decoration-[rgb(var(--accent-rgb)/0.35)] underline-offset-4";

/**
 * Keeps the two links as anchors while the surrounding sentence comes from
 * the dictionary. `formatMessage` fills the placeholders first, so a missing
 * value stays visible in review instead of becoming an empty link.
 */
export function LegalContactParagraph({
  contactLabel,
  supportAddress,
  template,
}: {
  contactLabel: string;
  supportAddress: string;
  template: string;
}) {
  const rendered = formatMessage(template, {
    contactLink: contactLabel,
    supportAddress,
  });
  const [beforeSupport, rest = ""] = rendered.split(supportAddress);
  const hasContactLink = rendered.includes(contactLabel);
  const [middle, after = ""] = hasContactLink
    ? rest.split(contactLabel)
    : [rest, ""];

  return (
    <p>
      {beforeSupport}
      <Link className={linkClassName} href={`mailto:${supportAddress}`}>
        {supportAddress}
      </Link>
      {middle}
      {hasContactLink ? (
        <Link className={linkClassName} href="/contact">
          {contactLabel}
        </Link>
      ) : null}
      {after}
    </p>
  );
}
