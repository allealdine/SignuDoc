import type { Metadata } from "next";

import { PublicDocumentShell } from "@/components/layout/public-document-shell";
import { VerifyForm } from "@/components/verify/verify-form";
import { getMessages } from "@/lib/i18n/messages.ts";
import { getRequestLocale } from "@/lib/i18n/request.ts";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = getMessages(locale).verify.metadata;

  return {
    description: copy.description,
    title: copy.title,
  };
}

export default async function VerifyPage() {
  const locale = await getRequestLocale();
  const copy = getMessages(locale).verify.page;

  return (
    <PublicDocumentShell description={copy.description} title={copy.title}>
      <div className="mx-auto w-full max-w-[52rem] space-y-8">
        <VerifyForm locale={locale} />
        <section className="space-y-3">
          <h2 className="text-xl font-extrabold tracking-[-0.02em] text-(--fg)">
            {copy.sealHeading}
          </h2>
          <p>{copy.sealBody}</p>
        </section>
      </div>
    </PublicDocumentShell>
  );
}
