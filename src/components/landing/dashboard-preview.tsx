import {
  DashboardDocumentsHeader,
  DashboardDocumentsPanel,
  type DashboardFilter,
} from "@/components/dashboard/dashboard-documents-surface";
import { Brand } from "@/components/layout/brand";
import { getPrimaryNavItems } from "@/components/layout/nav-items";
import { cn } from "@/lib/cn";
import { formatDashboardDate } from "@/lib/dashboard-labels.ts";
import type { DashboardEnvelopeListItem } from "@/lib/envelopes";
import { formatMessage } from "@/lib/i18n/format.ts";
import type { Messages } from "@/lib/i18n/locales/en.ts";
import { getMessages } from "@/lib/i18n/messages.ts";
import { getRequestLocale } from "@/lib/i18n/request.ts";
import type { Locale } from "@/lib/i18n/types.ts";

type DashboardCopy = Messages["dashboard"];

const previewUser = {
  initials: "AR",
} as const;

const previewFilter: DashboardFilter = "All";

function buildPreviewEnvelopes(
  copy: DashboardCopy,
  locale: Locale,
): readonly DashboardEnvelopeListItem[] {
  const date = (month: number, day: number) =>
    formatDashboardDate(Date.UTC(2026, month, day) / 1000, locale);
  const context = copy.card.context;
  const statuses = copy.card.statuses;

  return [
    {
      contextLine: [
        formatMessage(context.draftSignersPlural, { count: 2 }),
        formatMessage(context.draftFieldsPlural, { count: 6 }),
      ].join(" · "),
      createdAtLabel: date(2, 15),
      id: "preview-draft",
      searchableEmails: ["ops@northline.example", "legal@riverbank.example"],
      status: "draft",
      statusLabel: statuses.draft,
      title: "Master Services Agreement",
    },
    {
      contextLine: formatMessage(context.completed, {
        emails: "counsel@oakline.example, finance@aster.example",
      }),
      createdAtLabel: date(2, 10),
      id: "preview-completed",
      searchableEmails: ["counsel@oakline.example", "finance@aster.example"],
      status: "completed",
      statusLabel: statuses.completed,
      title: "Independent Contractor Agreement",
    },
    {
      contextLine: formatMessage(context.sentWaiting, {
        emails: "team@harbor.example",
      }),
      createdAtLabel: date(2, 8),
      id: "preview-sent",
      searchableEmails: ["team@harbor.example"],
      status: "sent",
      statusLabel: formatMessage(statuses.signedProgress, {
        signed: 1,
        total: 2,
      }),
      title: "NDA - Product Demo",
    },
    {
      contextLine: formatMessage(context.voided, { date: date(2, 10) }),
      createdAtLabel: date(2, 8),
      id: "preview-voided",
      searchableEmails: ["legal@atlas.example"],
      status: "voided",
      statusLabel: statuses.voided,
      title: "Supplier Terms - Atlas",
    },
    {
      contextLine: formatMessage(context.declined, {
        email: "arivera@samplemail.example",
      }),
      createdAtLabel: date(1, 27),
      id: "preview-declined",
      searchableEmails: ["arivera@samplemail.example"],
      status: "declined",
      statusLabel: statuses.declined,
      title: "Offer Letter - A. Rivera",
    },
  ];
}

export async function LandingDashboardPreview() {
  const locale = await getRequestLocale();
  const messages = getMessages(locale);
  const copy = messages.dashboard;
  const previewNavItems = getPrimaryNavItems(messages.shell.nav);
  const previewEnvelopes = buildPreviewEnvelopes(copy, locale);

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-[1.75rem] bg-(--page) shadow-(--shadow-soft) ring-1 ring-[rgba(28,29,43,0.06)]"
    >
      <div className="max-h-[46rem] overflow-hidden px-4 pb-6 sm:px-7">
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="flex min-w-0 items-center gap-7">
            <Brand href="/" />
            <div className="hidden items-center gap-1 md:flex">
              {previewNavItems.map((item) => (
                <span
                  className={cn(
                    "inline-flex min-h-9 items-center rounded-[0.625rem] px-3.5 text-sm",
                    item.href === "/dashboard"
                      ? "bg-white font-bold text-(--fg) shadow-(--shadow-xs)"
                      : "font-semibold text-(--secondary)",
                  )}
                  key={item.href}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#ffd9c2] text-[0.8125rem] font-bold text-[#7a3412]">
            {previewUser.initials}
          </span>
        </div>

        <div className="space-y-5">
          <DashboardDocumentsHeader copy={copy} interactive={false} />
          <DashboardDocumentsPanel
            copy={copy}
            envelopes={previewEnvelopes}
            filteredEnvelopes={previewEnvelopes}
            interactive={false}
            searchValue=""
            selectedFilter={previewFilter}
          />
        </div>
      </div>
    </div>
  );
}
