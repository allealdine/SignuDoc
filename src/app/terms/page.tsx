import type { Metadata } from "next";
import type { ReactNode } from "react";

import { LegalContactParagraph } from "@/components/layout/legal-contact-paragraph";
import { PublicDocumentShell } from "@/components/layout/public-document-shell";
import { requireHostedMode } from "@/lib/hosted-pages";
import { getMessages } from "@/lib/i18n/messages.ts";
import { getRequestLocale } from "@/lib/i18n/request.ts";
import { formatLegalDate, TERMS_EFFECTIVE_DATE } from "@/lib/legal-date.ts";
import { resolvePublicSupportAddress } from "@/lib/public-contact";

// Indonesian-facing draft: it refers to UU ITE, PP 71/2019, UU PDP 27/2022
// and the Consumer Protection Law. Indonesian counsel should review it before
// release; this is product copy, not a legal opinion.

const headingClassName =
  "text-xl font-extrabold tracking-[-0.02em] text-(--fg)";

export async function generateMetadata(): Promise<Metadata> {
  const copy = getMessages(await getRequestLocale()).legal.terms.metadata;

  return {
    description: copy.description,
    title: copy.title,
  };
}

export default async function TermsPage() {
  await requireHostedMode();

  const [supportAddress, locale] = await Promise.all([
    resolvePublicSupportAddress(),
    getRequestLocale(),
  ]);
  const messages = getMessages(locale);
  const copy = messages.legal.terms;
  const sections = copy.sections;

  return (
    <PublicDocumentShell
      description={copy.hero.description}
      lastUpdated={formatLegalDate(TERMS_EFFECTIVE_DATE, locale)}
      title={copy.hero.title}
    >
      <Section heading={sections.overview.heading}>
        <Paragraphs items={sections.overview.paragraphs} />
      </Section>

      <Section heading={sections.eligibility.heading}>
        <Paragraphs items={sections.eligibility.paragraphs} />
      </Section>

      <Section heading={sections.permittedUse.heading}>
        <Paragraphs items={sections.permittedUse.paragraphs} />
        <p>{sections.permittedUse.excludedIntro}</p>
        <ul className="list-disc space-y-2 pl-6">
          {sections.permittedUse.excluded.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{sections.permittedUse.closing}</p>
      </Section>

      <Section heading={sections.sender.heading}>
        <Paragraphs items={sections.sender.paragraphs} />
      </Section>

      <Section heading={sections.electronicSignatures.heading}>
        <Paragraphs items={sections.electronicSignatures.paragraphs} />
      </Section>

      <Section heading={sections.acceptableUse.heading}>
        <Paragraphs items={sections.acceptableUse.paragraphs} />
      </Section>

      <Section heading={sections.serviceChanges.heading}>
        <Paragraphs items={sections.serviceChanges.paragraphs} />
      </Section>

      <Section heading={sections.intellectualProperty.heading}>
        <Paragraphs items={sections.intellectualProperty.paragraphs} />
      </Section>

      <Section heading={sections.suspension.heading}>
        <Paragraphs items={sections.suspension.paragraphs} />
        <LegalContactParagraph
          contactLabel={messages.footer.contact}
          supportAddress={supportAddress}
          template={sections.suspension.closureWithSupport}
        />
      </Section>

      <Section heading={sections.disclaimers.heading}>
        <Paragraphs items={sections.disclaimers.paragraphs} />
      </Section>

      <Section heading={sections.liability.heading}>
        <Paragraphs items={sections.liability.paragraphs} />
      </Section>

      <Section heading={sections.indemnification.heading}>
        <Paragraphs items={sections.indemnification.paragraphs} />
      </Section>

      <Section heading={sections.governingLaw.heading}>
        <Paragraphs items={sections.governingLaw.paragraphs} />
      </Section>

      <Section heading={sections.contact.heading}>
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
