import type { Metadata } from "next";
import { connection } from "next/server";

import { PublicDocumentShell } from "@/components/layout/public-document-shell";
import { SIGNUDOC_NAME } from "@/lib/branding.ts";
import { formatMessage } from "@/lib/i18n/format.ts";
import { getMessages } from "@/lib/i18n/messages.ts";
import { getRequestLocale } from "@/lib/i18n/request.ts";
import { formatLegalDate } from "@/lib/legal-date.ts";
import { PERMITTED_USE_VERSION } from "@/lib/permitted-uses";
import { getBranding } from "@/lib/settings";

const headingClassName =
  "text-xl font-extrabold tracking-[-0.02em] text-(--fg)";

export async function generateMetadata(): Promise<Metadata> {
  const copy = getMessages(await getRequestLocale()).permittedUse.metadata;

  return {
    description: copy.description,
    title: copy.title,
  };
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

// On every install, hosted or not: senders confirm this list before each
// send, and signers can read it.
export default async function ElectronicSignaturesPage() {
  await connection();

  const [branding, locale] = await Promise.all([
    getBranding(),
    getRequestLocale(),
  ]);
  const copy = getMessages(locale).permittedUse;
  const sections = copy.sections;
  const formatCopy = (template: string) =>
    formatMessage(template, {
      platformName: SIGNUDOC_NAME,
      productName: branding.productName,
    });
  const list = (items: string[]) => items.map(formatCopy);

  return (
    <PublicDocumentShell
      description={formatCopy(copy.hero.description)}
      lastUpdated={formatLegalDate(PERMITTED_USE_VERSION, locale)}
      title={copy.hero.title}
    >
      <section className="space-y-3">
        <h2 className={headingClassName}>
          {formatCopy(sections.whatItIs.heading)}
        </h2>
        <List items={list(sections.whatItIs.items)} />
      </section>

      <section className="space-y-3">
        <h2 className={headingClassName}>{sections.indonesia.heading}</h2>
        {sections.indonesia.paragraphs.map((paragraph) => (
          <p key={paragraph}>{formatCopy(paragraph)}</p>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className={headingClassName}>
          {formatCopy(sections.whatItIsNot.heading)}
        </h2>
        <List items={list(sections.whatItIsNot.items)} />
      </section>

      <section className="space-y-3">
        <h2 className={headingClassName}>{sections.usExcluded.heading}</h2>
        <p>{sections.usExcluded.intro}</p>
        <List items={list(sections.usExcluded.items)} />
      </section>

      <section className="space-y-3">
        <h2 className={headingClassName}>{sections.euLimits.heading}</h2>
        <p>{sections.euLimits.intro}</p>
        <List items={list(sections.euLimits.items)} />
      </section>

      <section className="space-y-3">
        <h2 className={headingClassName}>{sections.whoDecides.heading}</h2>
        {sections.whoDecides.paragraphs.map((paragraph) => (
          <p key={paragraph}>{formatCopy(paragraph)}</p>
        ))}
      </section>
    </PublicDocumentShell>
  );
}
