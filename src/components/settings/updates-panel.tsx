"use client";

import { useState } from "react";

import { ShellButton } from "@/components/shared/form-shell";
import { formatMessage } from "@/lib/i18n/format.ts";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";
import type { UpdateStatus } from "@/lib/software-update";

// The Sakta section of Settings, for the administrator: the version this
// install runs, a button that asks GitHub whether a newer one is out, and
// how to take it. Updating happens in the install's own GitHub repository,
// not here: a workflow there opens a pull request, and Vercel deploys it.

const linkClassName =
  "font-semibold text-(--accent-ink) underline decoration-[rgb(var(--accent-rgb)/0.35)] underline-offset-4";

export function UpdatesPanel({
  initialStatus,
}: {
  initialStatus: UpdateStatus;
}) {
  const copy = useMessages().messages.settings.updates;
  const [status, setStatus] = useState(initialStatus);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const check = status.check;

  async function checkNow() {
    setIsChecking(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/updates", { method: "POST" });
      const payload = (await response.json().catch(() => null)) as
        | (UpdateStatus & { error?: undefined })
        | { error: string }
        | null;

      if (!response.ok || !payload || "error" in payload) {
        setError(
          (payload && "error" in payload && payload.error) || copy.checkError,
        );
        return;
      }

      setStatus(payload);
    } catch {
      setError(copy.checkError);
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <section
      className="panel scroll-mt-6 p-6 sm:p-8"
      data-animate="enter"
      data-animate-delay="2"
      id="signudoc"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="section-eyebrow">{copy.eyebrow}</p>
          <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-(--fg)">
            Sakta
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
            {copy.versionBefore}
            <span
              className="font-bold text-(--fg)"
              data-testid="running-version"
            >
              {status.current}
            </span>
            {status.commit ? (
              <>
                {copy.versionBetween}
                <code className="text-(--fg)">{status.commit}</code>
              </>
            ) : null}
            {copy.versionAfter}
            <a
              className={linkClassName}
              href={status.releasesUrl}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        <ShellButton
          className="w-fit"
          loading={isChecking}
          onClick={checkNow}
          variant="secondary"
        >
          {isChecking ? copy.checking : copy.check}
        </ShellButton>

        {error ? (
          <p className="notice notice-danger" role="alert">
            {error}
          </p>
        ) : null}

        {check && !error ? (
          check.ok ? (
            check.updateAvailable ? (
              <div className="space-y-4" role="status">
                <p className="notice notice-accent">
                  <strong>{check.latest.name}</strong>
                  {formatMessage(copy.latest, { current: check.current })}
                </p>
                {check.latest.notes ? (
                  <div className="space-y-2">
                    <h3 className="text-base font-extrabold text-(--fg)">
                      {copy.whatsNew}
                    </h3>
                    <div className="max-h-80 space-y-1 overflow-y-auto rounded-2xl bg-(--surface) px-5 py-4 text-sm leading-6 text-(--secondary)">
                      <ReleaseNotes notes={check.latest.notes} />
                    </div>
                  </div>
                ) : null}
                <a
                  className={linkClassName}
                  href={check.latest.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {copy.releaseLink}
                </a>
              </div>
            ) : (
              <p className="notice notice-success" role="status">
                {formatMessage(copy.upToDate, {
                  version: check.latest.version,
                })}
              </p>
            )
          ) : (
            <p className="notice notice-warning" role="status">
              {check.error}
              {copy.errorSuffix}
              <a
                className={linkClassName}
                href={status.releasesUrl}
                rel="noreferrer"
                target="_blank"
              >
                {copy.releasesLink}
              </a>
            </p>
          )
        ) : null}

        <HowToUpdate status={status} />
      </div>
    </section>
  );
}

/**
 * Release notes are Markdown. They are shown as plain text, with headings
 * and list items picked out and the rest of the markup dropped: nothing in
 * them becomes HTML or a link.
 */
function ReleaseNotes({ notes }: { notes: string }) {
  const clean = (text: string) =>
    text
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]{1,3}([^*_`]+)[*_`]{1,3}/g, "$1");

  return notes.split(/\r?\n/).map((line, index) => {
    const heading = /^#{1,6}\s+(.*)$/.exec(line);
    const item = /^\s*[-*+]\s+(.*)$/.exec(line);

    if (heading) {
      return (
        <p className="pt-2 font-bold text-(--fg) first:pt-0" key={index}>
          {clean(heading[1])}
        </p>
      );
    }

    if (item) {
      return (
        <p className="flex gap-2 pl-1" key={index}>
          <span aria-hidden="true">•</span>
          <span>{clean(item[1])}</span>
        </p>
      );
    }

    return line.trim() ? <p key={index}>{clean(line)}</p> : null;
  });
}

function HowToUpdate({ status }: { status: UpdateStatus }) {
  const copy = useMessages().messages.settings.updates;
  const repository = status.repository;

  return (
    <div className="space-y-3 border-t border-(--border) pt-6">
      <h3 className="text-lg font-extrabold tracking-[-0.02em] text-(--fg)">
        {copy.howTo.title}
      </h3>
      {repository && !repository.isUpstream ? (
        <>
          <ol className="max-w-2xl list-decimal space-y-2 pl-5 text-sm leading-6 text-(--secondary)">
            <li>
              {copy.howTo.runWorkflowBefore}
              <a
                className={linkClassName}
                href={repository.url}
                rel="noreferrer"
                target="_blank"
              >
                {repository.owner}/{repository.slug}
              </a>
              {copy.howTo.runWorkflowMiddle}
              <strong className="text-(--fg)">
                {copy.howTo.runWorkflowButton}
              </strong>
              {copy.howTo.runWorkflowAfter}
            </li>
            <li>{copy.howTo.pullRequest}</li>
            <li>{copy.howTo.merge}</li>
          </ol>
          <a
            className="btn-quiet min-h-12 w-fit px-5 text-sm"
            href={repository.actionsUrl}
            rel="noreferrer"
            target="_blank"
          >
            {copy.openWorkflow}
          </a>
          <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
            {copy.docs.noWorkflow}{" "}
            <a
              className={linkClassName}
              href={repository.addWorkflowUrl}
              rel="noreferrer"
              target="_blank"
            >
              {copy.docs.createFile}
            </a>{" "}
            {copy.docs.inRepository}{" "}
            <a
              className={linkClassName}
              href={status.workflowSourceUrl}
              rel="noreferrer"
              target="_blank"
            >
              {copy.docs.itsContents}
            </a>
            . {copy.docs.beforeTheLink}{" "}
            <a
              className={linkClassName}
              href={status.docsUrl}
              rel="noreferrer"
              target="_blank"
            >
              {copy.docs.guideLink}
            </a>{" "}
            {copy.docs.details}
          </p>
        </>
      ) : (
        <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
          {copy.docs.newReleaseBefore}
          <a
            className={linkClassName}
            href={status.docsUrl}
            rel="noreferrer"
            target="_blank"
          >
            {copy.docs.guideLink}
          </a>
          {copy.docs.newReleaseAfter}
        </p>
      )}
    </div>
  );
}
