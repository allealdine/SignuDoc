"use client";

import Link from "next/link";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { Messages } from "@/lib/i18n/locales/en.ts";
import type { Locale } from "@/lib/i18n/types.ts";
import { formatIdr, pricingPlans } from "@/lib/pricing.ts";

type PricingCopy = Messages["pricingPage"];

export function PricingPlans({
  copy,
  locale,
}: {
  copy: PricingCopy;
  locale: Locale;
}) {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      <div
        aria-label={copy.cycle.label}
        className="well mx-auto flex w-fit gap-1 p-1"
        role="group"
      >
        <button
          aria-pressed={!yearly}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
            !yearly
              ? "bg-(--paper) text-(--fg) shadow-sm"
              : "text-(--secondary) hover:text-(--fg)",
          )}
          onClick={() => setYearly(false)}
          type="button"
        >
          {copy.cycle.monthly}
        </button>
        <button
          aria-pressed={yearly}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
            yearly
              ? "bg-(--paper) text-(--fg) shadow-sm"
              : "text-(--secondary) hover:text-(--fg)",
          )}
          onClick={() => setYearly(true)}
          type="button"
        >
          {copy.cycle.annual}
          <span className="ml-2 text-xs text-(--accent-ink)">
            {copy.cycle.save}
          </span>
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {pricingPlans.map((plan) => {
          const card = copy.cards[plan.id];
          const amount = yearly ? plan.annualIdr : plan.monthlyIdr;

          return (
            <article
              className={cn(
                "panel flex flex-col p-6",
                plan.featured && "panel-raised border-2 border-(--accent)",
              )}
              key={plan.id}
            >
              {plan.featured ? (
                <span className="pill pill-accent mb-3 self-start">
                  {copy.featured}
                </span>
              ) : null}
              <h3 className="text-lg font-extrabold tracking-[-0.02em] text-(--fg)">
                {card.name}
              </h3>
              <p className="mt-2 min-h-10 text-sm leading-6 text-(--secondary)">
                {card.tagline}
              </p>

              <p className="mt-6 text-[clamp(1.75rem,4vw,2.25rem)] font-extrabold tracking-[-0.04em] text-(--fg)">
                {plan.id === "free"
                  ? copy.cycle.free
                  : formatIdr(amount, locale)}
              </p>
              {plan.id === "free" ? null : (
                <p className="section-eyebrow mt-1">
                  {copy.cycle.perUser}{" "}
                  {yearly ? copy.cycle.perYear : copy.cycle.perMonth}
                </p>
              )}

              <Link
                className={cn(
                  buttonVariants({
                    variant: plan.featured ? "default" : "outline",
                  }),
                  "mt-6 w-full",
                )}
                href={plan.href}
              >
                {card.cta}
              </Link>
              <p className="mt-3 text-center text-xs text-(--tertiary)">
                {card.footnote}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
