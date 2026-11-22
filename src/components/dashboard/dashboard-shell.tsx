"use client";

import { PlusIcon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import {
  DashboardDocumentsHeader,
  DashboardDocumentsPanel,
  type DashboardFilter,
  type DashboardPagination,
  type DashboardShellState,
  type DashboardView,
  dashboardStatusFilterMap,
} from "@/components/dashboard/dashboard-documents-surface";
import { DocumentThumbnail } from "@/components/shared/document-thumbnail";
import { ShellButton } from "@/components/shared/form-shell";
import type { DashboardEnvelopeListItem } from "@/lib/envelopes";
import type { Messages } from "@/lib/i18n/locales/en.ts";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";

type DashboardShellProps = {
  envelopes?: readonly DashboardEnvelopeListItem[];
  /** The search the page was loaded with, run on the server. */
  initialSearch?: string;
  initialState?: DashboardShellState;
  pagination?: DashboardPagination;
  /** For an administrator: their own envelopes, or everyone's. */
  view?: DashboardView;
};

export function DashboardShell({
  envelopes: providedEnvelopes,
  initialSearch = "",
  initialState = "default",
  pagination,
  view,
}: DashboardShellProps) {
  const { messages } = useMessages();
  const copy = messages.dashboard;
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [selectedFilter, setSelectedFilter] = useState<DashboardFilter>("All");

  const envelopes =
    initialState === "empty"
      ? ([] as readonly DashboardEnvelopeListItem[])
      : (providedEnvelopes ?? []);
  const normalizedSearchValue = searchValue.trim().toLowerCase();
  const filteredEnvelopes = envelopes.filter((envelope) => {
    const matchesFilter =
      selectedFilter === "All"
        ? true
        : envelope.status === dashboardStatusFilterMap[selectedFilter];
    const matchesSearch =
      normalizedSearchValue.length === 0 ||
      envelope.title.toLowerCase().includes(normalizedSearchValue) ||
      (envelope.senderLabel?.toLowerCase().includes(normalizedSearchValue) ??
        false) ||
      envelope.searchableEmails.some((email) =>
        email.toLowerCase().includes(normalizedSearchValue),
      );

    return matchesFilter && matchesSearch;
  });
  const isError = initialState === "error";

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function handleFilterChange(filter: DashboardFilter) {
    setSelectedFilter(filter);
  }

  function handleResetFilters() {
    if (initialSearch || pagination?.newerHref) {
      // The list itself was searched, or is a later page: load the start.
      window.location.assign(
        view === "all" ? "/dashboard?view=all" : "/dashboard",
      );
      return;
    }

    setSearchValue("");
    setSelectedFilter("All");
  }

  function handleRetry() {
    window.location.reload();
  }

  return (
    <div className="space-y-5">
      <DashboardDocumentsHeader copy={copy} view={view} />

      {initialState === "empty" ? (
        view === "all" ? (
          <EmptyInstallState copy={copy} />
        ) : (
          <EmptyDashboardState copy={copy} />
        )
      ) : (
        <DashboardDocumentsPanel
          copy={copy}
          envelopes={envelopes}
          filteredEnvelopes={filteredEnvelopes}
          isError={isError}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          onRetry={handleRetry}
          onSearchChange={handleSearchChange}
          pagination={pagination}
          searchValue={searchValue}
          view={view}
          selectedFilter={selectedFilter}
        />
      )}
    </div>
  );
}

function EmptyInstallState({ copy }: { copy: Messages["dashboard"] }) {
  return (
    <section
      className="panel px-6 py-14 text-center sm:py-20"
      data-animate="enter"
      data-animate-delay="1"
    >
      <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-(--fg)">
        {copy.empty.install.title}
      </h2>
      <p className="mt-2 text-[0.9375rem] leading-6 text-(--secondary)">
        {copy.empty.install.description}
      </p>
    </section>
  );
}

function EmptyDashboardState({ copy }: { copy: Messages["dashboard"] }) {
  return (
    <section
      className="panel px-6 py-14 sm:py-20"
      data-animate="enter"
      data-animate-delay="1"
    >
      <div className="mx-auto flex max-w-md flex-col items-center gap-5 text-center">
        <span className="flex h-28 items-center justify-center">
          <DocumentThumbnail title="" />
        </span>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-(--fg)">
            {copy.empty.mine.title}
          </h2>
          <p className="text-[0.9375rem] leading-6 text-(--secondary)">
            {copy.empty.mine.description}
          </p>
        </div>
        <ShellButton href="/envelopes/new">
          <PlusIcon
            aria-hidden="true"
            className="size-[1.125rem]"
            strokeWidth={2.4}
          />
          {copy.header.action}
        </ShellButton>
      </div>
    </section>
  );
}
