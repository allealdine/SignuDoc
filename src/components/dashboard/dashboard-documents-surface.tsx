import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import type { ChangeEventHandler, ReactNode } from "react";
import {
  DocumentThumbnail,
  SampleDocumentPage,
} from "@/components/shared/document-thumbnail";
import { ShellButton, StaticShellButton } from "@/components/shared/form-shell";
import { PageHeader } from "@/components/shared/page-header";
import { cn } from "@/lib/cn";
import type { DashboardEnvelopeListItem } from "@/lib/envelopes";
import { formatMessage } from "@/lib/i18n/format.ts";
import type { Messages } from "@/lib/i18n/locales/en.ts";

type DashboardCopy = Messages["dashboard"];

export type DashboardShellState = "default" | "empty" | "error";

/** An administrator's dashboard: their own envelopes, or everyone's. */
export type DashboardView = "all" | "mine";

/** Links to the pages before and after this one, when there are any. */
export type DashboardPagination = {
  newerHref?: string;
  olderHref?: string;
};

export type DashboardFilter =
  | "All"
  | "Draft"
  | "Sent"
  | "Completed"
  | "Declined"
  | "Voided";

type EnvelopeStatus = "draft" | "sent" | "completed" | "declined" | "voided";

export const filterOptions: readonly DashboardFilter[] = [
  "All",
  "Draft",
  "Sent",
  "Completed",
  "Declined",
  "Voided",
];

export const dashboardStatusFilterMap: Record<
  Exclude<DashboardFilter, "All">,
  EnvelopeStatus
> = {
  Completed: "completed",
  Declined: "declined",
  Draft: "draft",
  Sent: "sent",
  Voided: "voided",
};

const statusPillClasses: Record<EnvelopeStatus, string> = {
  completed: "pill-success",
  declined: "pill-danger",
  draft: "pill-neutral",
  sent: "pill-accent",
  voided: "pill-neutral",
};

type DashboardDocumentsHeaderProps = {
  copy: DashboardCopy;
  interactive?: boolean;
  /** Shown to administrators only. */
  view?: DashboardView;
};

type DashboardDocumentsPanelProps = {
  copy: DashboardCopy;
  envelopes: readonly DashboardEnvelopeListItem[];
  filteredEnvelopes: readonly DashboardEnvelopeListItem[];
  interactive?: boolean;
  isError?: boolean;
  onFilterChange?: (filter: DashboardFilter) => void;
  onReset?: () => void;
  onRetry?: () => void;
  onSearchChange?: ChangeEventHandler<HTMLInputElement>;
  pagination?: DashboardPagination;
  searchValue: string;
  selectedFilter: DashboardFilter;
  view?: DashboardView;
};

type EnvelopeGridProps = {
  copy: DashboardCopy;
  envelopes: readonly DashboardEnvelopeListItem[];
  interactive: boolean;
};

type NoResultsStateProps = {
  copy: DashboardCopy;
  interactive: boolean;
  onReset?: () => void;
};

type ErrorBannerProps = {
  copy: DashboardCopy;
  interactive: boolean;
  onRetry?: () => void;
};

export function DashboardDocumentsHeader({
  copy,
  interactive = true,
  view,
}: DashboardDocumentsHeaderProps) {
  const label = (
    <>
      <PlusIcon
        aria-hidden="true"
        className="size-[1.125rem]"
        strokeWidth={2.4}
      />
      {copy.header.action}
    </>
  );

  return (
    <>
      <PageHeader
        action={
          interactive ? (
            <ShellButton href="/envelopes/new">{label}</ShellButton>
          ) : (
            <StaticShellButton>{label}</StaticShellButton>
          )
        }
        description={
          view === "all" ? copy.header.allDescription : copy.header.description
        }
        title={view === "all" ? copy.header.allTitle : copy.header.title}
      />
      {view && interactive ? (
        <nav
          aria-label={copy.header.viewLabel}
          className="segmented self-start"
        >
          <Link
            aria-current={view === "mine" ? "page" : undefined}
            className="segmented-item"
            data-active={view === "mine"}
            href="/dashboard"
          >
            {copy.header.viewMine}
          </Link>
          <Link
            aria-current={view === "all" ? "page" : undefined}
            className="segmented-item"
            data-active={view === "all"}
            href="/dashboard?view=all"
          >
            {copy.header.viewEveryone}
          </Link>
        </nav>
      ) : null}
    </>
  );
}

export function DashboardDocumentsPanel({
  copy,
  envelopes,
  filteredEnvelopes,
  interactive = true,
  isError = false,
  onFilterChange,
  onReset,
  onRetry,
  onSearchChange,
  pagination,
  searchValue,
  selectedFilter,
  view,
}: DashboardDocumentsPanelProps) {
  const hasSeededEnvelopes = envelopes.length > 0;

  return (
    <section className="space-y-4" data-animate="enter" data-animate-delay="1">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div
          aria-label={copy.filters.label}
          className="segmented self-start"
          role="group"
        >
          {filterOptions.map((filter) => {
            const isActive = filter === selectedFilter;

            if (!interactive) {
              return (
                <span
                  className="segmented-item"
                  data-active={isActive}
                  key={filter}
                >
                  {copy.filters[filter]}
                </span>
              );
            }

            return (
              <button
                aria-pressed={isActive}
                className="segmented-item"
                key={filter}
                onClick={() => onFilterChange?.(filter)}
                type="button"
              >
                {copy.filters[filter]}
              </button>
            );
          })}
        </div>

        {/* Typing narrows what is shown; Enter searches every envelope,
            not only this page. */}
        <SearchForm interactive={interactive}>
          {view === "all" ? (
            <input name="view" type="hidden" value="all" />
          ) : null}
          <label className="flex min-h-[2.625rem] w-full items-center gap-2.5 rounded-xl bg-white px-3.5 text-(--tertiary) transition focus-within:ring-3 focus-within:ring-ring/50">
            <SearchIcon aria-hidden="true" className="size-4 shrink-0" />
            <input
              aria-label={copy.search}
              className="min-w-0 flex-1 bg-transparent py-2 text-sm text-(--fg) outline-none placeholder:text-(--placeholder)"
              name="q"
              onChange={interactive ? onSearchChange : undefined}
              placeholder={copy.search}
              readOnly={!interactive}
              tabIndex={interactive ? undefined : -1}
              type="search"
              value={searchValue}
            />
          </label>
        </SearchForm>
      </div>

      {isError ? (
        <ErrorBanner copy={copy} interactive={interactive} onRetry={onRetry} />
      ) : null}

      {filteredEnvelopes.length > 0 ? (
        <EnvelopeGrid
          copy={copy}
          envelopes={filteredEnvelopes}
          interactive={interactive}
        />
      ) : hasSeededEnvelopes || searchValue || pagination?.newerHref ? (
        <NoResultsState
          copy={copy}
          interactive={interactive}
          onReset={onReset}
        />
      ) : null}

      {!isError && (hasSeededEnvelopes || pagination?.newerHref) ? (
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <p className="text-[0.8125rem] text-(--tertiary)">
            {formatMessage(
              pagination?.newerHref || pagination?.olderHref
                ? copy.showingOnPage
                : copy.showing,
              {
                shown: filteredEnvelopes.length,
                total: envelopes.length,
              },
            )}
          </p>
          {interactive && (pagination?.newerHref || pagination?.olderHref) ? (
            <nav
              aria-label={copy.pagination.label}
              className="flex items-center gap-2"
            >
              {pagination.newerHref ? (
                <ShellButton href={pagination.newerHref} variant="secondary">
                  {copy.pagination.newer}
                </ShellButton>
              ) : null}
              {pagination.olderHref ? (
                <ShellButton href={pagination.olderHref} variant="secondary">
                  {copy.pagination.older}
                </ShellButton>
              ) : null}
            </nav>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

/** A real form on the dashboard; in the landing page's picture, a box. */
function SearchForm({
  children,
  interactive,
}: {
  children: ReactNode;
  interactive: boolean;
}) {
  const className = "w-full lg:w-[19rem]";

  if (!interactive) {
    return <div className={className}>{children}</div>;
  }

  return (
    <form action="/dashboard" className={className} method="get" role="search">
      {children}
    </form>
  );
}

function ErrorBanner({ copy, interactive, onRetry }: ErrorBannerProps) {
  return (
    <div
      className="flex flex-col gap-4 rounded-2xl bg-(--danger-soft) px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
      role="alert"
    >
      <p className="text-sm font-semibold text-(--danger)">
        {copy.error.message}
      </p>
      {interactive ? (
        <ShellButton onClick={onRetry} variant="secondary">
          {copy.error.retry}
        </ShellButton>
      ) : (
        <StaticShellButton variant="secondary">
          {copy.error.retry}
        </StaticShellButton>
      )}
    </div>
  );
}

function EnvelopeGrid({ copy, envelopes, interactive }: EnvelopeGridProps) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
      {envelopes.map((envelope) => (
        <li className="min-w-0" key={envelope.id}>
          <EnvelopeCard
            copy={copy}
            envelope={envelope}
            interactive={interactive}
          />
        </li>
      ))}
      <li className="min-w-0">
        <UploadCard copy={copy} interactive={interactive} />
      </li>
    </ul>
  );
}

function EnvelopeCard({
  copy,
  envelope,
  interactive,
}: {
  copy: DashboardCopy;
  envelope: DashboardEnvelopeListItem;
  interactive: boolean;
}) {
  const status = envelope.expired
    ? copy.card.statuses.expired
    : copy.card.statuses[envelope.status];
  const content = (
    <>
      <span className="flex h-52 items-center justify-center rounded-2xl bg-(--surface) p-3.5 transition group-hover:bg-[#f0f0f6]">
        {interactive ? (
          <DocumentThumbnail envelopeId={envelope.id} title={envelope.title} />
        ) : (
          <SampleDocumentPage seed={envelope.id} />
        )}
      </span>

      <span className="block min-w-0 space-y-1 px-1">
        <span
          className={cn(
            "block truncate text-[0.9375rem] font-bold leading-snug",
            envelope.status === "voided" ? "text-(--tertiary)" : "text-(--fg)",
          )}
          role="heading"
          aria-level={2}
        >
          {envelope.title}
        </span>
        {envelope.senderLabel ? (
          <span className="block truncate text-[0.8125rem] text-(--secondary)">
            <span className="sr-only">{copy.card.sentBy}</span>{" "}
            {envelope.senderLabel}
          </span>
        ) : null}
        <span className="block truncate text-[0.8125rem] text-(--tertiary)">
          {envelope.contextLine}
        </span>
      </span>

      <span className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 px-1 pb-0.5">
        <span
          aria-label={formatMessage(copy.card.status, { status })}
          className={cn(
            "pill",
            envelope.expired
              ? "pill-danger"
              : statusPillClasses[envelope.status],
          )}
        >
          {envelope.statusLabel}
        </span>
        <span className="text-xs text-(--tertiary)">
          <span className="sr-only">{copy.card.created}</span>{" "}
          {envelope.createdAtLabel}
        </span>
      </span>
    </>
  );
  const className =
    "group panel flex h-full flex-col gap-3.5 rounded-[1.25rem] p-3.5";

  if (!interactive) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link
      className={cn(
        className,
        "transition hover:-translate-y-0.5 hover:shadow-(--shadow-lift)",
      )}
      href={`/envelopes/${envelope.id}`}
    >
      {content}
    </Link>
  );
}

/** The last tile in the grid: the way to add the next document. */
function UploadCard({
  copy,
  interactive,
}: {
  copy: DashboardCopy;
  interactive: boolean;
}) {
  const content = (
    <>
      <span className="inline-flex size-11 items-center justify-center rounded-[0.875rem] bg-(--accent-soft) text-(--accent)">
        <PlusIcon aria-hidden="true" className="size-5" strokeWidth={2.4} />
      </span>
      {copy.upload}
    </>
  );
  const className =
    "flex h-full min-h-[17.5rem] flex-col items-center justify-center gap-2.5 rounded-[1.25rem] border-2 border-dashed border-(--border-strong) text-sm font-bold text-(--secondary)";

  if (!interactive) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link
      className={cn(
        className,
        "transition hover:border-(--accent) hover:bg-(--accent-softer) hover:text-(--accent-ink)",
      )}
      href="/envelopes/new"
    >
      {content}
    </Link>
  );
}

function NoResultsState({ copy, interactive, onReset }: NoResultsStateProps) {
  return (
    <div className="panel px-6 py-12 text-center">
      <div className="mx-auto max-w-md space-y-3">
        <h2 className="text-xl font-extrabold tracking-[-0.02em] text-(--fg)">
          {copy.empty.results.title}
        </h2>
        <p className="text-sm leading-6 text-(--secondary)">
          {copy.empty.results.description}
        </p>
        <div className="flex justify-center pt-2">
          {interactive ? (
            <ShellButton onClick={onReset} variant="secondary">
              {copy.empty.results.reset}
            </ShellButton>
          ) : (
            <StaticShellButton variant="secondary">
              {copy.empty.results.reset}
            </StaticShellButton>
          )}
        </div>
      </div>
    </div>
  );
}
