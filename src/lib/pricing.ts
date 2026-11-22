import { intlLocales, type Locale } from "./i18n/types.ts";

export type PlanId = "free" | "standard" | "business";

export type PricingPlan = {
  /** Matches the keys in `messages.pricingPage.cards`. */
  id: PlanId;
  monthlyIdr: number;
  annualIdr: number;
  href: string;
  featured?: boolean;
};

/**
 * Proposed prices for the hosted Sakta service, in Indonesian rupiah.
 * There is no billing flow yet: the paid plans link to signup or to Contact.
 * These numbers, and which features sit in each tier, are a commercial
 * decision — the software itself includes every feature in every install.
 */
export const pricingPlans: readonly PricingPlan[] = [
  { annualIdr: 0, href: "/signup", id: "free", monthlyIdr: 0 },
  {
    annualIdr: 290_000,
    featured: true,
    href: "/signup",
    id: "standard",
    monthlyIdr: 29_000,
  },
  {
    annualIdr: 690_000,
    href: "/contact",
    id: "business",
    monthlyIdr: 69_000,
  },
] as const;

/** Formats an amount as Indonesian rupiah in the active language. */
export function formatIdr(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocales[locale], {
    currency: "IDR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);
}
