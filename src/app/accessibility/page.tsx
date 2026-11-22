import type { Metadata } from "next";
import type { ReactNode } from "react";

import { LegalContactParagraph } from "@/components/layout/legal-contact-paragraph";
import { PublicDocumentShell } from "@/components/layout/public-document-shell";
import { requireHostedMode } from "@/lib/hosted-pages";
import { getMessages } from "@/lib/i18n/messages.ts";
import { getRequestLocale } from "@/lib/i18n/request.ts";
import {
  ACCESSIBILITY_EFFECTIVE_DATE,
  formatLegalDate,
} from "@/lib/legal-date.ts";
import { resolvePublicSupportAddress } from "@/lib/public-contact";

// Indonesian-facing draft. The statement describes the product honestly
// rather than claiming WCAG conformance; it references UU No. 8 of 2016 on
// persons with disabilities. Indonesian counsel and a native speaker should
// review it before release. This is product copy, not legal advice.

const headingClassName =
  "text-xl font-extrabold tracking-[-0.02em] text-(--fg)";

export async function generateMetadata(): Promise<Metadata> {
  const copy = getMessages(await getRequestLocale()).legal.accessibility
    .metadata;

  return {
    description: copy.description,
    title: copy.title,
  };
}

export default async function AccessibilityPage() {
  await requireHostedMode();

  const [supportAddress, locale] = await Promise.all([
    resolvePublicSupportAddress(),
    getRequestLocale(),
  ]);
  const messages = getMessages(locale);
  const copy = messages.legal.accessibility;
  const sections = copy.sections;

  return (
    <PublicDocumentShell
      description={copy.hero.description}
      lastUpdated={formatLegalDate(ACCESSIBILITY_EFFECTIVE_DATE, locale)}
      title={copy.hero.title}
    >
      <Section heading={sections.commitment.heading}>
        <Paragraphs items={sections.commitment.paragraphs} />
      </Section>

      <Section heading={sections.works.heading}>
        <Bullets items={sections.works.items} />
      </Section>

      <Section heading={sections.limitations.heading}>
        <Bullets items={sections.limitations.items} />
      </Section>

      <Section heading={sections.assistance.heading}>
        <LegalContactParagraph
          contactLabel={messages.footer.contact}
          supportAddress={supportAddress}
          template={sections.assistance.requestWithSupport}
        />
        <Paragraphs items={sections.assistance.paragraphs} />
      </Section>

      <Section heading={sections.standards.heading}>
        <Paragraphs items={sections.standards.paragraphs} />
      </Section>

      <Section heading={sections.feedback.heading}>
        <LegalContactParagraph
          contactLabel={messages.footer.contact}
          supportAddress={supportAddress}
          template={sections.feedback.contactWithSupport}
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
