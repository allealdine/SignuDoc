import { CheckIcon, XIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PublicDocumentShell } from "@/components/layout/public-document-shell";
import { PricingPlans } from "@/components/pricing/pricing-plans";
import { buttonVariants } from "@/components/ui/button";
import { requireHostedMode } from "@/lib/hosted-pages";
import type { Messages } from "@/lib/i18n/locales/en.ts";
import { getMessages } from "@/lib/i18n/messages.ts";
import { getRequestLocale } from "@/lib/i18n/request.ts";

export async function generateMetadata(): Promise<Metadata> {
  const copy = getMessages(await getRequestLocale()).pricingPage.metadata;

  return {
    description: copy.description,
    title: copy.title,
  };
}

export default async function PricingPage() {
  await requireHostedMode();

  const locale = await getRequestLocale();
  const copy = getMessages(locale).pricingPage;

  return (
    <PublicDocumentShell description={copy.hero.lead} title={copy.hero.title}>
      <p className="section-eyebrow">{copy.hero.eyebrow}</p>

      <PricingPlans copy={copy} locale={locale} />

      <p className="mt-5 text-center text-sm text-(--tertiary)">
        {copy.hero.note}
      </p>

      <section className="space-y-4 pt-6">
        <div>
          <h2 className="text-xl font-extrabold tracking-[-0.02em] text-(--fg)">
            {copy.comparison.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-(--secondary)">
            {copy.comparison.lead}
          </p>
        </div>

        <div className="panel overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr>
                <th className="w-[40%] px-5 py-4 font-semibold text-(--tertiary)">
                  {copy.comparison.feature}
                </th>
                <th className="px-4 py-4 text-center font-bold text-(--fg)">
                  {copy.cards.free.name}
                </th>
                <th className="px-4 py-4 text-center font-bold text-(--fg)">
                  {copy.cards.standard.name}
                </th>
                <th className="px-4 py-4 text-center font-bold text-(--fg)">
                  {copy.cards.business.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {copy.comparison.rows.map((row) => (
                <tr key={row.label}>
                  <th
                    className="border-t border-(--border) px-5 py-4 font-semibold text-(--fg)"
                    scope="row"
                  >
                    {row.label}
                  </th>
                  {[row.free, row.standard, row.business].map(
                    (value, index) => (
                      <td
                        className="border-t border-(--border) px-4 py-4 text-center text-(--secondary)"
                        key={`${row.label}-${index}`}
                      >
                        <ComparisonValue copy={copy} value={value} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="well mt-8 p-6 text-center sm:p-8">
        <h2 className="text-lg font-extrabold tracking-[-0.02em] text-(--fg)">
          {copy.bottom.title}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-(--secondary)">
          {copy.bottom.body}
        </p>
        <Link
          className={`${buttonVariants({ variant: "outline" })} mt-5`}
          href="/contact"
        >
          {copy.bottom.cta}
        </Link>
      </section>
    </PublicDocumentShell>
  );
}

type PricingCopy = Messages["pricingPage"];

function ComparisonValue({
  copy,
  value,
}: {
  copy: PricingCopy;
  value: string;
}) {
  if (value === copy.included) {
    return (
      <span className="inline-flex items-center gap-1.5 text-(--success)">
        <CheckIcon aria-hidden="true" className="size-4 shrink-0" />
        <span className="sr-only">{value}</span>
      </span>
    );
  }

  if (value === copy.notIncluded) {
    return (
      <span className="inline-flex items-center gap-1.5 text-(--tertiary)">
        <XIcon aria-hidden="true" className="size-4 shrink-0" />
        <span className="sr-only">{value}</span>
      </span>
    );
  }

  return <span>{value}</span>;
}
