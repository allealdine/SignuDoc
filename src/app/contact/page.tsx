import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { PublicDocumentShell } from "@/components/layout/public-document-shell";
import { requireHostedMode } from "@/lib/hosted-pages";
import { getMessages } from "@/lib/i18n/messages.ts";
import { getRequestLocale } from "@/lib/i18n/request.ts";

export async function generateMetadata(): Promise<Metadata> {
  const copy = getMessages(await getRequestLocale()).contact.metadata;

  return {
    description: copy.description,
    title: copy.title,
  };
}

export default async function ContactPage() {
  await requireHostedMode();

  const copy = getMessages(await getRequestLocale()).contact.hero;

  return (
    <PublicDocumentShell description={copy.description} title={copy.title}>
      <div className="mx-auto w-full max-w-[52rem]">
        <ContactForm />
      </div>
    </PublicDocumentShell>
  );
}
