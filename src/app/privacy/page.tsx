import type { Metadata } from "next";
import type { ReactNode } from "react";

import { LegalContactParagraph } from "@/components/layout/legal-contact-paragraph";
import { PublicDocumentShell } from "@/components/layout/public-document-shell";
import { requireHostedMode } from "@/lib/hosted-pages";
import { getMessages } from "@/lib/i18n/messages.ts";
import { getRequestLocale } from "@/lib/i18n/request.ts";
import { formatLegalDate, PRIVACY_EFFECTIVE_DATE } from "@/lib/legal-date.ts";
import { resolvePublicSupportAddress } from "@/lib/public-contact";

// Indonesian-facing draft: written for UU PDP 27/2022, its implementing
// regulation PP 33/2026 (effective 16 January 2027), UU ITE and PP 71/2019.
// Indonesian counsel and a native speaker should review it before release;
// this is product copy, not legal advice. The controller's final legal name
// and address, and the designated privacy contact, must be confirmed then.

const headingClassName =
  "text-xl font-extrabold tracking-[-0.02em] text-(--fg)";

export async function generateMetadata(): Promise<Metadata> {
  const copy = getMessages(await getRequestLocale()).legal.privacy.metadata;

  return {
    description: copy.description,
    title: copy.title,
  };
}

export default async function PrivacyPage() {
  await requireHostedMode();

  const [supportAddress, locale] = await Promise.all([
    resolvePublicSupportAddress(),
    getRequestLocale(),
  ]);
  const messages = getMessages(locale);
  const copy = messages.legal.privacy;
  const sections = copy.sections;

  return (
    <PublicDocumentShell
      description={copy.hero.description}
      lastUpdated={formatLegalDate(PRIVACY_EFFECTIVE_DATE, locale)}
      title={copy.hero.title}
    >
      <Section heading={sections.scope.heading}>
        <Paragraphs items={sections.scope.paragraphs} />
      </Section>

      <Section heading={sections.dataCategories.heading}>
        <p>{sections.dataCategories.intro}</p>
        <Bullets items={sections.dataCategories.items} />
      </Section>

      <Section heading={sections.sources.heading}>
        <p>{sections.sources.intro}</p>
        <Bullets items={sections.sources.items} />
      </Section>

      <Section heading={sections.purposes.heading}>
        <p>{sections.purposes.intro}</p>
        <PurposeRows rows={sections.purposes.rows} />
      </Section>

      <Section heading={sections.recipients.heading}>
        <p>{sections.recipients.intro}</p>
        <Bullets items={sections.recipients.items} />
        <p>{sections.recipients.closing}</p>
      </Section>

      <Section heading={sections.transfers.heading}>
        <Paragraphs items={sections.transfers.paragraphs} />
      </Section>

      <Section heading={sections.retention.heading}>
        <p>{sections.retention.intro}</p>
        <Bullets items={sections.retention.items} />
        <p>{sections.retention.closing}</p>
      </Section>

      <Section heading={sections.cookies.heading}>
        <p>{sections.cookies.intro}</p>
        <Bullets items={sections.cookies.items} />
        <p>{sections.cookies.closing}</p>
      </Section>

      <Section heading={sections.rights.heading}>
        <p>{sections.rights.intro}</p>
        <Bullets items={sections.rights.items} />
        <p>{sections.rights.limitations}</p>
      </Section>

      <Section heading={sections.requests.heading}>
        <LegalContactParagraph
          contactLabel={messages.footer.contact}
          supportAddress={supportAddress}
          template={sections.requests.requestWithSupport}
        />
        <Paragraphs items={sections.requests.paragraphs} />
      </Section>

      <Section heading={sections.incidents.heading}>
        <Paragraphs items={sections.incidents.paragraphs} />
        <Bullets items={sections.incidents.noticeItems} />
        <p>{sections.incidents.publicNotice}</p>
      </Section>

      <Section heading={sections.children.heading}>
        <Paragraphs items={sections.children.paragraphs} />
      </Section>

      <Section heading={sections.changes.heading}>
        <Paragraphs items={sections.changes.paragraphs} />
      </Section>

      <Section heading={sections.contact.heading}>
        <Paragraphs items={sections.contact.paragraphs} />
        <LegalContactParagraph
          contactLabel={messages.footer.contact}
          supportAddress={supportAddress}
          template={sections.contact.contactWithSupport}
        />
      </Section>
    </PublicDocumentShell>
  );
}

function Section({
  children,
  heading,
}: {
  children: ReactNode;
  heading: string;
}) {
  return (
    <section className="space-y-3">
      <h2 className={headingClassName}>{heading}</h2>
      {children}
    </section>
  );
}

function Paragraphs({ items }: { items: readonly string[] }) {
  return items.map((item) => <p key={item}>{item}</p>);
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function PurposeRows({
  rows,
}: {
  rows: readonly { basis: string; purpose: string }[];
}) {
  return (
    <ul className="list-disc space-y-2 pl-6">
      {rows.map((row) => (
        <li key={row.purpose}>
          <strong>{row.purpose}</strong> {row.basis}
        </li>
      ))}
    </ul>
  );
}
