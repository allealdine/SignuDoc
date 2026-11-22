import type { LucideIcon } from "lucide-react";
import {
  CheckIcon,
  ClipboardCheck,
  Globe,
  Link2,
  ShieldCheck,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { LandingDashboardPreview } from "@/components/landing/dashboard-preview";
import {
  LandingSessionLoginAction,
  LandingSessionPrimaryAction,
} from "@/components/landing/landing-session-actions";
import { Brand, BrandMark } from "@/components/layout/brand";
import { PublicLegalFooter } from "@/components/layout/public-legal-links";
import { PublicSessionMenu } from "@/components/layout/public-session-menu";
import { buttonVariants } from "@/components/ui/button";
import { SIGNUDOC_NAME } from "@/lib/branding.ts";
import { cn } from "@/lib/cn";
import type { Messages } from "@/lib/i18n/locales/en.ts";
import { getMessages } from "@/lib/i18n/messages.ts";
import { getRequestLocale } from "@/lib/i18n/request.ts";

type ComparisonCopy = Messages["landing"]["comparison"];

type ComparisonRow = {
  feature: string;
  signudoc: string | boolean;
  perSeat: string | boolean;
};

type SecurityPillar = {
  body: string;
  icon: LucideIcon;
  title: string;
};

// The copy comes from the active dictionary; only the icons stay with the UI.
const securityIcons = [ShieldCheck, ClipboardCheck, Link2, Globe] as const;

const sectionHeadingClassName =
  "text-[clamp(1.875rem,4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-(--fg)";
const sectionLeadClassName =
  "mx-auto mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-(--secondary)";

export async function LandingShell() {
  const landing = getMessages(await getRequestLocale()).landing;
  const workflowSteps = landing.workflow.steps;
  const faqItems = landing.faq.items;
  const comparisonRows: readonly ComparisonRow[] = [
    {
      feature: landing.comparison.rows.price.feature,
      perSeat: landing.comparison.rows.price.perSeat,
      signudoc: landing.comparison.rows.price.signudoc,
    },
    {
      feature: landing.comparison.rows.envelopes.feature,
      perSeat: landing.comparison.rows.envelopes.perSeat,
      signudoc: landing.comparison.rows.envelopes.signudoc,
    },
    {
      feature: landing.comparison.rows.signers.feature,
      perSeat: landing.comparison.rows.signers.perSeat,
      signudoc: landing.comparison.rows.signers.signudoc,
    },
    {
      feature: landing.comparison.rows.reminders.feature,
      perSeat: landing.comparison.rows.reminders.perSeat,
      signudoc: true,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col text-(--fg)">
      <header className="sticky top-0 z-30 bg-[rgba(243,244,248,0.86)] backdrop-blur-md">
        <div className="page-width flex items-center justify-between gap-3 py-3 sm:py-4">
          <Brand href="/" />

          <PublicSessionMenu>
            <nav
              aria-label={landing.nav.ariaLabel}
              className="flex items-center gap-1 sm:gap-2"
            >
              <Link
                className={cn(
                  buttonVariants({ size: "sm", variant: "ghost" }),
                  "px-3 sm:px-4",
                )}
                href="/login"
                prefetch
              >
                {landing.actions.logIn}
              </Link>
              <Link
                className={buttonVariants({ size: "sm" })}
                href="/signup"
                prefetch
              >
                {landing.actions.startFree}
              </Link>
            </nav>
          </PublicSessionMenu>
        </div>
      </header>

      <main className="flex-1">
        <section className="page-width pb-14 pt-12 sm:pt-16 lg:pb-20 lg:pt-20">
          <div
            className="mx-auto max-w-[52rem] text-center"
            data-animate="enter"
          >
            <SectionMarker>{landing.hero.marker}</SectionMarker>

            <h1 className="mx-auto max-w-[18ch] text-[clamp(2.375rem,6vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-(--fg)">
              {landing.hero.headline}{" "}
              <span className="text-(--accent)">
                {landing.hero.headlineAccent}
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-(--secondary) sm:text-[1.1875rem]">
              {landing.hero.lead}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <LandingSessionPrimaryAction />
              <Link
                className={buttonVariants({ size: "lg", variant: "outline" })}
                href="#workflow"
              >
                {landing.hero.seeHowItWorks}
              </Link>
            </div>
          </div>

          <div
            className="mt-12 sm:mt-16"
            data-animate="enter"
            data-animate-delay="1"
          >
            <LandingDashboardPreview />
          </div>
        </section>

        <section className="scroll-mt-20 py-14 lg:py-20" id="workflow">
          <div className="page-width">
            <div className="mx-auto max-w-[40rem] text-center">
              <SectionMarker>{landing.workflow.marker}</SectionMarker>
              <h2 className={sectionHeadingClassName}>
                {landing.workflow.title}
              </h2>
              <p className={sectionLeadClassName}>{landing.workflow.lead}</p>
            </div>

            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {workflowSteps.map((step, index) => (
                <li className="panel p-6" key={step.title}>
                  <span
                    aria-hidden="true"
                    className="inline-flex size-10 items-center justify-center rounded-xl bg-(--accent-soft) text-[0.9375rem] font-extrabold text-(--accent-ink)"
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold leading-tight tracking-[-0.02em] text-(--fg)">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-(--secondary)">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="page-width">
            <div className="mx-auto max-w-[40rem] text-center">
              <SectionMarker>{landing.security.marker}</SectionMarker>
              <h2 className={sectionHeadingClassName}>
                {landing.security.title}
              </h2>
              <p className={sectionLeadClassName}>{landing.security.lead}</p>
            </div>

            <div className="mx-auto mt-10 grid max-w-[60rem] gap-4 sm:grid-cols-2">
              {landing.security.pillars.map((pillar, index) => (
                <SecurityPillarCard
                  body={pillar.body}
                  icon={securityIcons[index] ?? Globe}
                  key={pillar.title}
                  title={pillar.title}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="page-width">
            <div className="mx-auto max-w-[40rem] text-center">
              <SectionMarker>{landing.pricing.marker}</SectionMarker>
              <h2 className={sectionHeadingClassName}>
                {landing.pricing.title}
              </h2>
              <p className={sectionLeadClassName}>{landing.pricing.lead}</p>
            </div>

            <div className="mx-auto mt-10 max-w-[60rem]">
              <ComparisonTable
                copy={landing.comparison}
                rows={comparisonRows}
              />
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              <LandingSessionPrimaryAction />
              <p className="text-sm text-(--tertiary)">
                {landing.pricing.signersNote}
              </p>
              <Link
                className="text-sm font-semibold text-(--accent-ink) underline decoration-[rgb(var(--accent-rgb)/0.35)] underline-offset-4"
                href="/pricing"
              >
                {landing.pricing.allPlans}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="page-width">
            <div className="mx-auto max-w-[48rem]">
              <div className="text-center">
                <SectionMarker>{landing.faq.marker}</SectionMarker>
                <h2 className={sectionHeadingClassName}>{landing.faq.title}</h2>
              </div>
              <div className="mt-8 space-y-3">
                {faqItems.map((item) => (
                  <article
                    className="panel px-6 py-5 sm:px-7"
                    key={item.question}
                  >
                    <h3 className="text-lg font-extrabold leading-snug tracking-[-0.02em] text-(--fg)">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-(--secondary)">
                      {item.answer}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="page-width pb-10 pt-6 lg:pb-14">
          <div className="rounded-[2rem] bg-(--accent) px-6 py-14 text-center sm:px-10 lg:py-20">
            <div className="mx-auto max-w-[44rem]">
              <p className="text-sm font-semibold text-white/80">
                {landing.actions.startFree}
              </p>
              <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-white">
                {landing.closing.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-white/85">
                {landing.closing.body}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <LandingSessionPrimaryAction tone="inverse" />
                <LandingSessionLoginAction tone="inverse" />
              </div>

              <p className="mt-7 text-sm text-white/75">
                {landing.closing.note}
              </p>
            </div>
          </div>
        </section>
      </main>

      <PublicLegalFooter />
    </div>
  );
}

function SectionMarker({ children }: { children: string }) {
  return (
    <p className="mb-5 flex justify-center">
      <span className="pill pill-accent px-3.5 py-1 text-[0.8125rem]">
        {children}
      </span>
    </p>
  );
}

function SecurityPillarCard({ body, icon: Icon, title }: SecurityPillar) {
  return (
    <div className="panel flex gap-4 p-6">
      <span
        aria-hidden="true"
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-(--accent-soft) text-(--accent)"
      >
        <Icon className="size-5" strokeWidth={2} />
      </span>
      <div>
        <h3 className="text-[1.0625rem] font-extrabold leading-tight tracking-[-0.02em] text-(--fg)">
          {title}
        </h3>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-(--secondary)">
          {body}
        </p>
      </div>
    </div>
  );
}

function ComparisonTable({
  copy,
  rows,
}: {
  copy: ComparisonCopy;
  rows: readonly ComparisonRow[];
}) {
  return (
    <div className="panel overflow-hidden">
      {/* Desktop table */}
      <div className="hidden p-3 sm:block">
        <table className="w-full border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              <th className="w-[36%] px-5 py-4 text-[0.8125rem] font-semibold text-(--tertiary)">
                {copy.feature}
              </th>
              <th className="w-[32%] rounded-t-2xl bg-(--accent-softer) px-5 py-4 text-center">
                <span className="inline-flex items-center gap-2 text-[1.0625rem] font-extrabold tracking-[-0.02em] text-(--fg)">
                  <BrandMark className="size-6 rounded-[0.5rem]" />
                  {SIGNUDOC_NAME}
                </span>
              </th>
              <th className="w-[32%] px-5 py-4 text-center">
                <span className="text-[1.0625rem] font-bold tracking-[-0.02em] text-(--tertiary)">
                  {copy.perSeatPlans}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.feature}>
                <td className="border-t border-(--border) px-5 py-4 text-[0.9375rem] font-semibold text-(--fg)">
                  {row.feature}
                </td>
                <td
                  className={cn(
                    "border-t border-[rgb(var(--accent-rgb)/0.12)] bg-(--accent-softer) px-5 py-4 text-center",
                    index === rows.length - 1 && "rounded-b-2xl",
                  )}
                >
                  <ComparisonValue advantage copy={copy} value={row.signudoc} />
                </td>
                <td className="border-t border-(--border) px-5 py-4 text-center text-(--secondary)">
                  <ComparisonValue copy={copy} value={row.perSeat} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked layout */}
      <div className="space-y-3 p-4 sm:hidden">
        {rows.map((row) => (
          <div className="well overflow-hidden" key={row.feature}>
            <p className="px-4 pb-2 pt-3.5 text-[0.8125rem] font-semibold text-(--tertiary)">
              {row.feature}
            </p>
            <ComparisonMobileRow
              advantage
              copy={copy}
              label={SIGNUDOC_NAME}
              value={row.signudoc}
            />
            <ComparisonMobileRow
              copy={copy}
              label={copy.perSeatPlans}
              value={row.perSeat}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonMobileRow({
  advantage = false,
  copy,
  label,
  value,
}: {
  advantage?: boolean;
  copy: ComparisonCopy;
  label: string;
  value: string | boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-4 py-3",
        advantage ? "bg-(--accent-softer)" : "text-(--secondary)",
      )}
    >
      <span
        className={cn(
          "text-sm",
          advantage ? "font-extrabold text-(--fg)" : "font-semibold",
        )}
      >
        {label}
      </span>
      <span className="max-w-[58%] text-right">
        <ComparisonValue advantage={advantage} copy={copy} value={value} />
      </span>
    </div>
  );
}

function ComparisonValue({
  advantage = false,
  copy,
  value,
}: {
  advantage?: boolean;
  copy: ComparisonCopy;
  value: string | boolean;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-(--success-soft) text-(--success)">
        <CheckIcon aria-hidden="true" className="size-4" strokeWidth={3} />
        <span className="sr-only">{copy.included}</span>
      </span>
    ) : (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-(--danger-soft) text-(--danger)">
        <XIcon aria-hidden="true" className="size-4" strokeWidth={3} />
        <span className="sr-only">{copy.notIncluded}</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "text-[0.9375rem] leading-relaxed",
        advantage && "font-extrabold text-(--accent-ink)",
      )}
    >
      {value}
    </span>
  );
}
