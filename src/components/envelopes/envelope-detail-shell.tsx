"use client";

import {
  CheckIcon,
  ClockIcon,
  DownloadIcon,
  FileTextIcon,
  type LucideIcon,
  MinusIcon,
  PencilIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { type ReactNode, useState } from "react";

import { DocumentThumbnail } from "@/components/shared/document-thumbnail";
import { ShellButton } from "@/components/shared/form-shell";
import { StatusPanel } from "@/components/shared/status-panel";
import { SaveTemplateDialog } from "@/components/templates/save-template-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import type {
  EnvelopeDetailData,
  EnvelopeDetailTimelineItem,
} from "@/lib/envelopes";
import { formatMessage } from "@/lib/i18n/format.ts";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";
import { formatReminderIntervalMessage } from "@/lib/i18n/reminder-labels.ts";
import {
  DEFAULT_ENVELOPE_DEADLINE_DAYS,
  ENVELOPE_DEADLINE_DAY_OPTIONS,
  ENVELOPE_REMINDER_DAY_OPTIONS,
} from "@/lib/types/domain";
import { getSignerPalette } from "./signer-palette";

/** A finished envelope an administrator has scheduled to be deleted. */
export type EnvelopeDeletionNotice = {
  deleteOnLabel: string;
  /** Shown to administrators only. */
  reason: string | null;
  requestedByEmail: string;
};

type EnvelopeDetailShellProps = {
  /** An administrator may delete a finished envelope. */
  canDeleteFinished?: boolean;
  envelopeId: string;
  initialState?: "error" | "not-found";
  /**
   * Who sent it, when an administrator is looking at another member's
   * envelope. They can read it, download its files and delete it once it
   * is finished; the rest stays with its sender.
   */
  ownerLabel?: string;
  record?: EnvelopeDetailData;
  scheduledDeletion?: EnvelopeDeletionNotice;
};

type EnvelopeStatus = "draft" | "sent" | "completed" | "declined" | "voided";

type SignerStatus = "signed" | "waiting" | "declined" | "pending";

type TimelineTone = "accent" | "danger" | "neutral" | "success";
type DownloadFileType = "evidence" | "signed";

type EnvelopeDetailSigner = {
  color?: string;
  email: string;
  id: string;
  metaLabel: string;
  name: string;
  order: number;
  status: SignerStatus;
  statusDateLabel?: string;
  /** Signers who share a step sign at the same time. */
  step?: number;
  tint?: string;
};

type EnvelopeDetailRecord = {
  createdAtLabel: string;
  signers: readonly EnvelopeDetailSigner[];
  status: EnvelopeStatus;
  timeline: readonly EnvelopeDetailTimelineItem[];
  title: string;
};

type ModalState =
  | "change-deadline"
  | "change-reminders"
  | "copy-draft"
  | "correct-signer"
  | "cancel-deletion"
  | "delete-draft"
  | "delete-finished"
  | "save-template"
  | "void-envelope"
  | null;

const statusPillClasses: Record<EnvelopeStatus, string> = {
  completed: "pill-success",
  declined: "pill-danger",
  draft: "pill-neutral",
  sent: "pill-accent",
  voided: "pill-neutral",
};

const signerStatusPillClasses: Record<SignerStatus, string> = {
  declined: "pill-danger",
  pending: "pill-neutral",
  signed: "pill-success",
  waiting: "pill-accent",
};

const signerStatusIcons: Record<SignerStatus, LucideIcon> = {
  declined: XIcon,
  pending: MinusIcon,
  signed: CheckIcon,
  waiting: ClockIcon,
};

const timelineToneClasses: Record<TimelineTone, string> = {
  accent: "bg-(--accent)",
  danger: "bg-(--danger)",
  neutral: "bg-(--border-strong)",
  success: "bg-(--success)",
};

export function EnvelopeDetailShell({
  canDeleteFinished = false,
  envelopeId,
  initialState,
  ownerLabel,
  record,
  scheduledDeletion,
}: EnvelopeDetailShellProps) {
  const isOwnEnvelope = ownerLabel === undefined;
  const [activeModal, setActiveModal] = useState<ModalState>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isChangingDeadline, setIsChangingDeadline] = useState(false);
  const [isChangingReminders, setIsChangingReminders] = useState(false);
  const [isCopyingDraft, setIsCopyingDraft] = useState(false);
  const [isCorrectingSigner, setIsCorrectingSigner] = useState(false);
  const [isDeletingDraft, setIsDeletingDraft] = useState(false);
  const [isDeletingFinished, setIsDeletingFinished] = useState(false);
  const [isCancellingDeletion, setIsCancellingDeletion] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [isSendingReminder, setIsSendingReminder] = useState(false);
  const [isVoidingEnvelope, setIsVoidingEnvelope] = useState(false);
  const [correctingSigner, setCorrectingSigner] =
    useState<EnvelopeDetailSigner | null>(null);
  const [voidReason, setVoidReason] = useState("");
  const [savedTemplateName, setSavedTemplateName] = useState<string | null>(
    null,
  );
  const { messages } = useMessages();
  const copy = messages.envelope.detail;

  function handleRetry() {
    window.location.reload();
  }

  if (initialState === "error") {
    return (
      <StatusPanel
        description={copy.error.loadDescription}
        footer={
          <ShellButton onClick={handleRetry} variant="secondary">
            {copy.error.retry}
          </ShellButton>
        }
        title={copy.error.load}
        tone="error"
      />
    );
  }

  if (initialState === "not-found") {
    return (
      <StatusPanel
        action={{ href: "/dashboard", label: copy.error.backToDocuments }}
        description={copy.error.notFoundDescription}
        eyebrow={copy.error.notFoundEyebrow}
        title={copy.error.notFound}
        tone="error"
      />
    );
  }

  if (!record) {
    return (
      <StatusPanel
        description={copy.error.loadDescription}
        footer={
          <ShellButton onClick={handleRetry} variant="secondary">
            {copy.error.retry}
          </ShellButton>
        }
        title={copy.error.load}
        tone="error"
      />
    );
  }

  const activeRecord: EnvelopeDetailRecord = {
    createdAtLabel: record.createdAtLabel,
    signers: record.signers,
    status: record.status,
    timeline: record.timeline,
    title: record.title,
  };
  const deadline = activeRecord.status === "sent" ? record.deadline : null;
  const isExpired = Boolean(deadline?.expired);
  const manualReminderState = record.manualReminder ?? null;
  const reminderLimited =
    activeRecord.status === "sent" &&
    manualReminderState !== null &&
    !manualReminderState.canSend;
  const reminderHelperText =
    activeRecord.status === "sent" && manualReminderState?.nextAvailableAtLabel
      ? formatMessage(copy.deadline.reminderCooldown, {
          date: manualReminderState.nextAvailableAtLabel,
        })
      : null;
  const deadlineText = !deadline
    ? null
    : isExpired
      ? formatMessage(copy.deadline.expired, {
          date: deadline.expiresAtLabel ?? "—",
        })
      : deadline.expiresAtLabel
        ? formatMessage(copy.deadline.expires, {
            date: deadline.expiresAtLabel,
          })
        : copy.deadline.noDeadline;
  const reminderIntervalDays = record.reminderIntervalDays ?? null;
  const remindersText =
    reminderIntervalDays === null
      ? copy.deadline.remindersOff
      : formatMessage(copy.deadline.remindersOn, {
          interval: formatReminderIntervalMessage(
            reminderIntervalDays,
            messages.envelope.reminderIntervals,
          ).toLowerCase(),
        });
  // The document as it was sent, before anyone signed: while it is out for
  // signature, and once it was declined or voided. A completed envelope
  // has its signed PDF instead.
  const documentUrl =
    activeRecord.status === "sent" ||
    activeRecord.status === "declined" ||
    activeRecord.status === "voided"
      ? `/api/envelopes/${encodeURIComponent(envelopeId)}/document`
      : null;
  const activeSigner =
    activeRecord.status === "sent"
      ? activeRecord.signers.find((signer) => signer.status === "waiting")
      : null;
  const stepOf = (signer: EnvelopeDetailSigner) => signer.step ?? signer.order;
  const signsAtTheSameTime =
    new Set(activeRecord.signers.map(stepOf)).size <
    activeRecord.signers.length;

  function handleDownload(fileType: DownloadFileType) {
    // This starts a file download from an API route, not a page navigation.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.assign(
      `/api/envelopes/${encodeURIComponent(envelopeId)}/download?type=${fileType}`,
    );
  }

  async function handleSendReminder() {
    if (!activeSigner) {
      return;
    }

    setActionError(null);
    setIsSendingReminder(true);

    try {
      const response = await fetch(`/api/envelopes/${envelopeId}/nudge`, {
        method: "POST",
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (
        response.ok ||
        response.status === 404 ||
        response.status === 409 ||
        response.status === 429
      ) {
        window.location.reload();
        return;
      }

      setActionError(payload?.error ?? copy.error.nudge);
    } finally {
      setIsSendingReminder(false);
    }
  }

  async function handleConfirmChangeDeadline(expiresInDays: number) {
    setActionError(null);
    setIsChangingDeadline(true);

    try {
      const response = await fetch(`/api/envelopes/${envelopeId}/deadline`, {
        body: JSON.stringify({ expiresInDays }),
        headers: { "content-type": "application/json" },
        method: "POST",
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (response.ok || response.status === 404 || response.status === 409) {
        window.location.reload();
        return;
      }

      setActionError(payload?.error ?? copy.error.deadline);
    } catch {
      setActionError(copy.error.deadline);
    } finally {
      setIsChangingDeadline(false);
    }
  }

  async function handleConfirmCorrectSigner(next: {
    email: string;
    name: string;
  }) {
    if (!correctingSigner) {
      return;
    }

    setActionError(null);
    setIsCorrectingSigner(true);

    try {
      const response = await fetch(
        `/api/envelopes/${encodeURIComponent(envelopeId)}/signers/${encodeURIComponent(correctingSigner.id)}`,
        {
          body: JSON.stringify(next),
          headers: { "content-type": "application/json" },
          method: "PATCH",
        },
      );
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (response.ok) {
        window.location.reload();
        return;
      }

      setActionError(payload?.error ?? copy.error.correctSigner);
    } catch {
      setActionError(copy.error.correctSigner);
    } finally {
      setIsCorrectingSigner(false);
    }
  }

  async function handleConfirmChangeReminders(intervalDays: number | null) {
    setActionError(null);
    setIsChangingReminders(true);

    try {
      const response = await fetch(`/api/envelopes/${envelopeId}/reminders`, {
        body: JSON.stringify({ reminderIntervalDays: intervalDays }),
        headers: { "content-type": "application/json" },
        method: "POST",
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (response.ok || response.status === 404 || response.status === 409) {
        window.location.reload();
        return;
      }

      setActionError(payload?.error ?? copy.error.reminders);
    } catch {
      setActionError(copy.error.reminders);
    } finally {
      setIsChangingReminders(false);
    }
  }

  async function handleConfirmCopyDraft() {
    setActionError(null);
    setIsCopyingDraft(true);

    try {
      const response = await fetch(`/api/envelopes/${envelopeId}/copy`, {
        method: "POST",
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        id?: string;
      } | null;

      if (response.ok && typeof payload?.id === "string") {
        // A full page load so the new draft is fetched from the server.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.assign(`/envelopes/${encodeURIComponent(payload.id)}`);
        return;
      }

      if (response.status === 404) {
        window.location.reload();
        return;
      }

      setActionError(payload?.error ?? copy.error.copy);
    } catch {
      setActionError(copy.error.copy);
    } finally {
      setIsCopyingDraft(false);
    }
  }

  async function handleConfirmDeleteDraft() {
    setActionError(null);
    setIsDeletingDraft(true);

    try {
      const response = await fetch(`/api/envelopes/${envelopeId}`, {
        method: "DELETE",
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        redirectPath?: string;
      } | null;

      if (!response.ok) {
        setActionError(payload?.error ?? copy.error.deleteDraft);
        return;
      }

      window.location.assign(payload?.redirectPath ?? "/dashboard");
    } finally {
      setIsDeletingDraft(false);
    }
  }

  async function handleConfirmDeleteFinished() {
    setActionError(null);
    setIsDeletingFinished(true);

    try {
      const response = await fetch(`/api/envelopes/${envelopeId}/deletion`, {
        body: JSON.stringify({ reason: deleteReason }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setActionError(payload?.error ?? copy.error.scheduleDeletion);
        return;
      }

      // The page shows when it will go, and lets it be cancelled.
      window.location.reload();
    } catch {
      // The request may or may not have reached the server.
      setActionError(copy.error.scheduleDeletionNetwork);
    } finally {
      setIsDeletingFinished(false);
    }
  }

  async function handleConfirmCancelDeletion() {
    setActionError(null);
    setIsCancellingDeletion(true);

    try {
      const response = await fetch(`/api/envelopes/${envelopeId}/deletion`, {
        method: "DELETE",
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setActionError(payload?.error ?? copy.error.cancelDeletion);
        return;
      }

      window.location.reload();
    } catch {
      setActionError(copy.error.cancelDeletionNetwork);
    } finally {
      setIsCancellingDeletion(false);
    }
  }

  async function handleConfirmVoidEnvelope() {
    setActionError(null);
    setIsVoidingEnvelope(true);

    try {
      const response = await fetch(`/api/envelopes/${envelopeId}/void`, {
        body: JSON.stringify({ reason: voidReason }),
        headers: { "content-type": "application/json" },
        method: "POST",
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        redirectPath?: string;
      } | null;

      if (response.ok) {
        window.location.assign(
          payload?.redirectPath ??
            `/envelopes/${encodeURIComponent(envelopeId)}`,
        );
        return;
      }

      if (response.status === 404 || response.status === 409) {
        window.location.reload();
        return;
      }

      setActionError(payload?.error ?? copy.error.void);
    } finally {
      setIsVoidingEnvelope(false);
    }
  }

  return (
    <div className="space-y-5">
      <section className="panel p-5 sm:p-8" data-animate="enter">
        <Link
          className="inline-flex items-center text-sm font-semibold text-(--secondary) transition hover:text-(--accent-ink)"
          href={isOwnEnvelope ? "/dashboard" : "/dashboard?view=all"}
        >
          {isOwnEnvelope ? copy.back.own : copy.back.all}
        </Link>

        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-5">
            {documentUrl ? (
              <a
                aria-label={formatMessage(copy.viewDocumentAria, {
                  title: activeRecord.title,
                })}
                className="hidden h-28 shrink-0 items-center justify-center rounded-2xl bg-(--surface) px-4 py-3 outline-none transition hover:bg-(--surface-strong) focus-visible:ring-3 focus-visible:ring-ring/50 sm:flex"
                href={documentUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <DocumentThumbnail
                  envelopeId={envelopeId}
                  title={activeRecord.title}
                />
              </a>
            ) : (
              <span className="hidden h-28 shrink-0 items-center justify-center rounded-2xl bg-(--surface) px-4 py-3 sm:flex">
                <DocumentThumbnail
                  envelopeId={envelopeId}
                  title={activeRecord.title}
                />
              </span>
            )}
            <div className="min-w-0 space-y-2.5">
              <h1
                className={`text-[clamp(1.5rem,3vw,1.875rem)] font-extrabold leading-tight tracking-[-0.03em] wrap-break-word ${
                  activeRecord.status === "voided"
                    ? "text-(--tertiary)"
                    : "text-(--fg)"
                }`}
              >
                {activeRecord.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span
                  className={`pill ${
                    isExpired
                      ? "pill-danger"
                      : statusPillClasses[activeRecord.status]
                  }`}
                >
                  {isExpired
                    ? copy.status.expired
                    : copy.status.envelope[activeRecord.status]}
                </span>
                <p className="text-sm text-(--secondary)">
                  {formatMessage(copy.created, {
                    date: activeRecord.createdAtLabel,
                  })}
                </p>
                {ownerLabel ? (
                  <p className="text-sm text-(--secondary)">
                    {formatMessage(copy.sentBy, { name: ownerLabel })}
                  </p>
                ) : null}
                {record.signatureTypeLabel ? (
                  <span className="pill pill-neutral">
                    {record.signatureTypeLabel}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            {documentUrl ? (
              <ShellButton href={documentUrl} inNewTab variant="secondary">
                <FileTextIcon
                  aria-hidden="true"
                  className="size-[1.125rem]"
                  strokeWidth={2.2}
                />
                {copy.actions.viewDocument}
              </ShellButton>
            ) : null}

            {isOwnEnvelope && activeRecord.status === "draft" ? (
              <>
                <ShellButton
                  onClick={() => setActiveModal("delete-draft")}
                  variant="secondary"
                >
                  {copy.actions.deleteDraft}
                </ShellButton>
                <ShellButton href={`/envelopes/${envelopeId}/prepare`}>
                  {copy.actions.continueEditing}
                </ShellButton>
              </>
            ) : null}

            {isOwnEnvelope && activeRecord.status === "sent" ? (
              <>
                <ShellButton
                  onClick={() => setActiveModal("void-envelope")}
                  variant="secondary"
                >
                  {copy.actions.voidEnvelope}
                </ShellButton>
                <ShellButton
                  disabled={!activeSigner || reminderLimited}
                  loading={isSendingReminder}
                  onClick={handleSendReminder}
                >
                  {copy.actions.sendReminder}
                </ShellButton>
              </>
            ) : null}

            {activeRecord.status === "completed" ? (
              <>
                <ShellButton
                  onClick={() => handleDownload("evidence")}
                  variant="secondary"
                >
                  {copy.actions.downloadCertificate}
                </ShellButton>
                <ShellButton onClick={() => handleDownload("signed")}>
                  <DownloadIcon
                    aria-hidden="true"
                    className="size-[1.125rem]"
                    strokeWidth={2.2}
                  />
                  {copy.actions.downloadSignedPdf}
                </ShellButton>
              </>
            ) : null}

            {activeRecord.status === "declined" ||
            activeRecord.status === "voided" ? (
              <ShellButton
                onClick={() => handleDownload("evidence")}
                variant="secondary"
              >
                {copy.actions.downloadCertificate}
              </ShellButton>
            ) : null}

            {activeRecord.status !== "draft" ? (
              <>
                {isOwnEnvelope ? (
                  <ShellButton
                    onClick={() => {
                      setActionError(null);
                      setActiveModal("copy-draft");
                    }}
                    variant="secondary"
                  >
                    {copy.actions.copyToDraft}
                  </ShellButton>
                ) : null}
                <ShellButton
                  onClick={() =>
                    // A file download from an API route, not a page navigation.
                    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
                    window.location.assign(
                      `/api/envelopes/${encodeURIComponent(envelopeId)}/audit`,
                    )
                  }
                  variant="secondary"
                >
                  {copy.actions.exportAudit}
                </ShellButton>
              </>
            ) : null}

            {canDeleteFinished && scheduledDeletion ? (
              <ShellButton
                onClick={() => {
                  setActionError(null);
                  setActiveModal("cancel-deletion");
                }}
                variant="secondary"
              >
                {copy.actions.cancelDeletion}
              </ShellButton>
            ) : null}

            {canDeleteFinished &&
            !scheduledDeletion &&
            (activeRecord.status === "completed" ||
              activeRecord.status === "declined" ||
              activeRecord.status === "voided") ? (
              <ShellButton
                onClick={() => {
                  setActionError(null);
                  setActiveModal("delete-finished");
                }}
                variant="secondary"
              >
                {copy.actions.deleteEnvelope}
              </ShellButton>
            ) : null}
          </div>
        </div>

        {scheduledDeletion ? (
          <div
            className="mt-4 rounded-xl border border-(--border) bg-(--danger-soft) px-4 py-3 text-sm leading-6 text-(--fg)"
            role="status"
          >
            <p className="font-semibold">
              {formatMessage(copy.deletion.scheduled, {
                date: scheduledDeletion.deleteOnLabel,
              })}
            </p>
            <p className="text-(--secondary)">
              {canDeleteFinished
                ? formatMessage(copy.deletion.askedByAdmin, {
                    email: scheduledDeletion.requestedByEmail,
                  })
                : formatMessage(copy.deletion.askedByOther, {
                    email: scheduledDeletion.requestedByEmail,
                  })}
            </p>
            {scheduledDeletion.reason ? (
              <p className="text-(--secondary)">
                {formatMessage(copy.deletion.reason, {
                  reason: scheduledDeletion.reason,
                })}
              </p>
            ) : null}
          </div>
        ) : null}

        {reminderHelperText ? (
          <p className="mt-4 text-sm leading-6 text-(--secondary) lg:text-right">
            {reminderHelperText}
          </p>
        ) : null}

        {deadlineText ? (
          <div
            className={`mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${
              isExpired ? "notice notice-danger" : "well px-5 py-3.5"
            }`}
          >
            <p
              className={
                isExpired ? undefined : "text-sm leading-6 text-(--secondary)"
              }
            >
              {deadlineText}
            </p>
            {isOwnEnvelope ? (
              <button
                className="btn-quiet shrink-0"
                onClick={() => {
                  setActionError(null);
                  setActiveModal("change-deadline");
                }}
                type="button"
              >
                {isExpired ? copy.deadline.setNew : copy.deadline.change}
              </button>
            ) : null}
          </div>
        ) : null}

        {deadline ? (
          <div className="well mt-3 flex flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-(--secondary)">
              {remindersText}
            </p>
            {isOwnEnvelope ? (
              <button
                className="btn-quiet shrink-0"
                onClick={() => {
                  setActionError(null);
                  setActiveModal("change-reminders");
                }}
                type="button"
              >
                {copy.deadline.changeReminders}
              </button>
            ) : null}
          </div>
        ) : null}

        {savedTemplateName ? (
          <div
            className={`notice notice-success flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between ${
              deadlineText || deadline ? "mt-3" : "mt-5"
            }`}
            role="status"
          >
            <p>
              {formatMessage(copy.savedTemplate, { name: savedTemplateName })}
            </p>
            <Link
              className="shrink-0 underline underline-offset-4"
              href="/templates"
            >
              {copy.actions.viewTemplates}
            </Link>
          </div>
        ) : isOwnEnvelope && activeRecord.signers.length > 0 ? (
          <div
            className={`well flex flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between ${
              deadlineText || deadline ? "mt-3" : "mt-5"
            }`}
          >
            <p className="text-sm leading-6 text-(--secondary)">
              {copy.templatePrompt}
            </p>
            <button
              className="btn-quiet shrink-0"
              onClick={() => {
                setActionError(null);
                setActiveModal("save-template");
              }}
              type="button"
            >
              {copy.actions.saveTemplate}
            </button>
          </div>
        ) : null}

        {actionError ? (
          <div className="notice notice-danger mt-5" role="alert">
            {actionError}
          </div>
        ) : null}
      </section>

      <section
        className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]"
        data-animate="enter"
        data-animate-delay="1"
      >
        <article className="panel p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-(--fg)">
              {copy.signers.title}
            </h2>
            <span className="pill pill-neutral">
              {formatMessage(copy.signers.total, {
                count: activeRecord.signers.length,
              })}
            </span>
          </div>

          <ol className="mt-4 space-y-3">
            {activeRecord.signers.map((signer, index) => {
              const palette =
                signer.color && signer.tint
                  ? { color: signer.color, tint: signer.tint }
                  : getSignerPalette(index);
              const StatusIcon = signerStatusIcons[signer.status];

              return (
                <li className="well p-4" key={signer.id}>
                  <div className="flex items-start gap-3.5">
                    <span
                      aria-hidden="true"
                      className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                      style={{
                        backgroundColor: palette.tint,
                        color: palette.color,
                      }}
                    >
                      {signsAtTheSameTime ? stepOf(signer) : signer.order}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="truncate text-[0.9375rem] font-bold text-(--fg)">
                            {signer.name}
                          </p>
                          <p className="truncate text-sm text-(--secondary)">
                            {signer.email}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-1.5">
                          <span
                            className={`pill ${signerStatusPillClasses[signer.status]}`}
                          >
                            <StatusIcon
                              aria-hidden="true"
                              className="size-3.5"
                              strokeWidth={2.6}
                            />
                            {copy.status.signer[signer.status]}
                          </span>
                          {signer.statusDateLabel ? (
                            <p className="text-xs text-(--tertiary)">
                              {signer.statusDateLabel}
                            </p>
                          ) : null}
                          {isOwnEnvelope &&
                          activeRecord.status === "sent" &&
                          !record.part11 &&
                          (signer.status === "waiting" ||
                            signer.status === "pending") ? (
                            <button
                              className="btn-quiet inline-flex items-center gap-1.5"
                              onClick={() => {
                                setActionError(null);
                                setCorrectingSigner(signer);
                                setActiveModal("correct-signer");
                              }}
                              type="button"
                            >
                              <PencilIcon
                                aria-hidden="true"
                                className="size-3.5"
                                strokeWidth={2.4}
                              />
                              {copy.actions.change}
                            </button>
                          ) : null}
                        </div>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-(--secondary)">
                        {signer.metaLabel}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {record.copyRecipients && record.copyRecipients.length > 0 ? (
            <div className="mt-6">
              <h3 className="text-[0.9375rem] font-extrabold text-(--fg)">
                {copy.copyRecipients.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-(--secondary)">
                {activeRecord.status === "completed"
                  ? copy.copyRecipients.completed
                  : copy.copyRecipients.pending}
              </p>
              <ul className="mt-3 space-y-2">
                {record.copyRecipients.map((recipient) => (
                  <li className="well px-4 py-3" key={recipient.id}>
                    <p className="truncate text-[0.9375rem] font-bold text-(--fg)">
                      {recipient.name}
                    </p>
                    <p className="truncate text-sm text-(--secondary)">
                      {recipient.email}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>

        <article className="panel p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-(--fg)">
              {copy.timeline.title}
            </h2>
            <span className="pill pill-neutral">
              {formatMessage(copy.timeline.events, {
                count: activeRecord.timeline.length,
              })}
            </span>
          </div>

          <ol className="mt-5 space-y-5">
            {activeRecord.timeline.map((event, index) => (
              <li className="relative pl-7" key={event.id}>
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1.5 size-3 rounded-full ring-4 ring-white ${timelineToneClasses[event.tone]}`}
                />
                {index < activeRecord.timeline.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-[5.5px] top-5 h-[calc(100%+0.5rem)] w-px bg-(--border)"
                  />
                ) : null}
                <p className="text-[0.8125rem] font-semibold text-(--tertiary)">
                  {event.timestamp}
                </p>
                <p className="mt-0.5 text-sm leading-6 text-(--fg)">
                  {event.description}
                </p>
              </li>
            ))}
          </ol>
        </article>
      </section>

      {activeModal === "change-deadline" ? (
        <DeadlineDialog
          errorMessage={actionError}
          expired={isExpired}
          onCancel={() => setActiveModal(null)}
          onConfirm={handleConfirmChangeDeadline}
          processing={isChangingDeadline}
        />
      ) : null}

      {activeModal === "change-reminders" ? (
        <RemindersDialog
          errorMessage={actionError}
          initialIntervalDays={reminderIntervalDays}
          onCancel={() => setActiveModal(null)}
          onConfirm={handleConfirmChangeReminders}
          processing={isChangingReminders}
        />
      ) : null}

      {activeModal === "copy-draft" ? (
        <CopyDraftDialog
          errorMessage={actionError}
          onCancel={() => setActiveModal(null)}
          onConfirm={handleConfirmCopyDraft}
          processing={isCopyingDraft}
        />
      ) : null}

      {activeModal === "correct-signer" && correctingSigner ? (
        <CorrectSignerDialog
          email={correctingSigner.email}
          errorMessage={actionError}
          name={correctingSigner.name}
          onCancel={() => {
            setActiveModal(null);
            setCorrectingSigner(null);
          }}
          onConfirm={handleConfirmCorrectSigner}
          processing={isCorrectingSigner}
        />
      ) : null}

      {activeModal === "save-template" ? (
        <SaveTemplateDialog
          envelopeId={envelopeId}
          initialName={activeRecord.title}
          onCancel={() => setActiveModal(null)}
          onSaved={(templateName) => {
            setActiveModal(null);
            setSavedTemplateName(templateName);
          }}
          signers={[...activeRecord.signers]
            .sort((left, right) => left.order - right.order)
            .map((signer) => ({ id: signer.id, name: signer.name }))}
        />
      ) : null}

      {activeModal === "delete-draft" ? (
        <ConfirmationDialog
          confirmLabel={copy.dialogs.deleteDraft.confirm}
          description={copy.dialogs.deleteDraft.description}
          errorMessage={actionError}
          onCancel={() => setActiveModal(null)}
          onConfirm={handleConfirmDeleteDraft}
          processing={isDeletingDraft}
          title={copy.dialogs.deleteDraft.title}
        />
      ) : null}

      {activeModal === "delete-finished" ? (
        <ConfirmationDialog
          confirmDisabled={record.part11 && deleteReason.trim().length === 0}
          confirmLabel={copy.dialogs.deleteFinished.confirm}
          description={[
            copy.dialogs.deleteFinished.description[0]!,
            ...(isOwnEnvelope
              ? []
              : [copy.dialogs.deleteFinished.description[1]!]),
            copy.dialogs.deleteFinished.description[2]!,
          ]}
          errorMessage={actionError}
          onCancel={() => setActiveModal(null)}
          onConfirm={handleConfirmDeleteFinished}
          processing={isDeletingFinished}
          title={copy.dialogs.deleteFinished.title}
        >
          <label className="grid gap-2 text-sm">
            <span className="text-[0.8125rem] font-semibold text-(--secondary)">
              {record.part11
                ? copy.dialogs.reason.required
                : copy.dialogs.reason.optional}
            </span>
            <Textarea
              disabled={isDeletingFinished}
              maxLength={1000}
              onChange={(event) => setDeleteReason(event.target.value)}
              rows={3}
              value={deleteReason}
            />
            <span className="text-xs leading-5 text-(--tertiary)">
              {copy.dialogs.reason.auditInstall}
            </span>
          </label>
        </ConfirmationDialog>
      ) : null}

      {activeModal === "cancel-deletion" ? (
        <ConfirmationDialog
          confirmLabel={copy.dialogs.cancelDeletion.confirm}
          description={[
            copy.dialogs.cancelDeletion.description[0]!,
            ...(isOwnEnvelope
              ? []
              : [copy.dialogs.cancelDeletion.description[1]!]),
          ]}
          errorMessage={actionError}
          onCancel={() => setActiveModal(null)}
          onConfirm={handleConfirmCancelDeletion}
          processing={isCancellingDeletion}
          title={copy.dialogs.cancelDeletion.title}
        />
      ) : null}

      {activeModal === "void-envelope" ? (
        <ConfirmationDialog
          confirmLabel={copy.dialogs.void.confirm}
          description={copy.dialogs.void.description}
          confirmDisabled={record.part11 && voidReason.trim().length === 0}
          errorMessage={actionError}
          onCancel={() => setActiveModal(null)}
          onConfirm={handleConfirmVoidEnvelope}
          processing={isVoidingEnvelope}
          title={copy.dialogs.void.title}
        >
          <label className="grid gap-2 text-sm">
            <span className="text-[0.8125rem] font-semibold text-(--secondary)">
              {record.part11
                ? copy.dialogs.reason.required
                : copy.dialogs.reason.optional}
            </span>
            <Textarea
              disabled={isVoidingEnvelope}
              maxLength={1000}
              onChange={(event) => setVoidReason(event.target.value)}
              rows={3}
              value={voidReason}
            />
            <span className="text-xs leading-5 text-(--tertiary)">
              {copy.dialogs.reason.auditEnvelope}
            </span>
          </label>
        </ConfirmationDialog>
      ) : null}
    </div>
  );
}

type CopyDraftDialogProps = {
  errorMessage?: string | null;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
  processing?: boolean;
};

function CopyDraftDialog({
  errorMessage,
  onCancel,
  onConfirm,
  processing = false,
}: CopyDraftDialogProps) {
  const detail = useMessages().messages.envelope.detail;
  const copy = detail.dialogs.copy;

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !processing) {
          onCancel();
        }
      }}
    >
      <DialogContent className="max-w-md sm:p-8" showCloseButton={false}>
        <div className="space-y-4">
          <DialogHeader className="space-y-3">
            <DialogTitle>{copy.title}</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-2 text-sm leading-6 text-(--secondary)">
                {copy.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>

          {errorMessage ? (
            <div className="notice notice-danger" role="alert">
              <p>{errorMessage}</p>
            </div>
          ) : null}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <ShellButton
              disabled={processing}
              onClick={onCancel}
              variant="secondary"
            >
              {detail.actions.cancel}
            </ShellButton>
            <ShellButton loading={processing} onClick={onConfirm}>
              {processing ? copy.copying : copy.confirm}
            </ShellButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type DeadlineDialogProps = {
  errorMessage?: string | null;
  expired: boolean;
  onCancel: () => void;
  onConfirm: (expiresInDays: number) => void | Promise<void>;
  processing?: boolean;
};

function DeadlineDialog({
  errorMessage,
  expired,
  onCancel,
  onConfirm,
  processing = false,
}: DeadlineDialogProps) {
  const [days, setDays] = useState<number>(DEFAULT_ENVELOPE_DEADLINE_DAYS);
  const detail = useMessages().messages.envelope.detail;
  const copy = detail.dialogs.deadline;

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !processing) {
          onCancel();
        }
      }}
    >
      <DialogContent className="max-w-md sm:p-8" showCloseButton={false}>
        <div className="space-y-4">
          <DialogHeader className="space-y-3">
            <DialogTitle>
              {expired ? copy.titleExpired : copy.title}
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-2 text-sm leading-6 text-(--secondary)">
                <p>
                  {copy.explanation}{" "}
                  {expired ? copy.expiredHint : copy.activeHint}
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>

          <label className="grid gap-1.5">
            <span className="text-[0.8125rem] font-semibold text-(--secondary)">
              {copy.label}
            </span>
            <select
              autoFocus
              className="field-input"
              disabled={processing}
              onChange={(event) => setDays(Number(event.target.value))}
              value={days}
            >
              {ENVELOPE_DEADLINE_DAY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {formatMessage(copy.option, { days: option })}
                </option>
              ))}
            </select>
          </label>

          {errorMessage ? (
            <div className="notice notice-danger" role="alert">
              <p>{errorMessage}</p>
            </div>
          ) : null}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <ShellButton
              disabled={processing}
              onClick={onCancel}
              variant="secondary"
            >
              {detail.actions.cancel}
            </ShellButton>
            <ShellButton loading={processing} onClick={() => onConfirm(days)}>
              {processing ? detail.actions.saving : copy.save}
            </ShellButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type RemindersDialogProps = {
  errorMessage?: string | null;
  initialIntervalDays: number | null;
  onCancel: () => void;
  onConfirm: (intervalDays: number | null) => void | Promise<void>;
  processing?: boolean;
};

function RemindersDialog({
  errorMessage,
  initialIntervalDays,
  onCancel,
  onConfirm,
  processing = false,
}: RemindersDialogProps) {
  const [intervalDays, setIntervalDays] = useState<number | null>(
    initialIntervalDays,
  );
  const { messages } = useMessages();
  const detail = messages.envelope.detail;
  const copy = detail.dialogs.reminders;
  // An interval set some other way than these choices is still offered.
  const options = [
    ...new Set([
      ...ENVELOPE_REMINDER_DAY_OPTIONS,
      ...(initialIntervalDays === null ? [] : [initialIntervalDays]),
    ]),
  ].sort((left, right) => left - right);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !processing) {
          onCancel();
        }
      }}
    >
      <DialogContent className="max-w-md sm:p-8" showCloseButton={false}>
        <div className="space-y-4">
          <DialogHeader className="space-y-3">
            <DialogTitle>{copy.title}</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-2 text-sm leading-6 text-(--secondary)">
                <p>{copy.description}</p>
              </div>
            </DialogDescription>
          </DialogHeader>

          <label className="grid gap-1.5">
            <span className="text-[0.8125rem] font-semibold text-(--secondary)">
              {copy.label}
            </span>
            <select
              autoFocus
              className="field-input"
              disabled={processing}
              onChange={(event) =>
                setIntervalDays(
                  event.target.value === "off"
                    ? null
                    : Number(event.target.value),
                )
              }
              value={intervalDays ?? "off"}
            >
              <option value="off">
                {formatReminderIntervalMessage(
                  null,
                  messages.envelope.reminderIntervals,
                )}
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {formatReminderIntervalMessage(
                    option,
                    messages.envelope.reminderIntervals,
                  )}
                </option>
              ))}
            </select>
          </label>

          {errorMessage ? (
            <div className="notice notice-danger" role="alert">
              <p>{errorMessage}</p>
            </div>
          ) : null}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <ShellButton
              disabled={processing}
              onClick={onCancel}
              variant="secondary"
            >
              {detail.actions.cancel}
            </ShellButton>
            <ShellButton
              loading={processing}
              onClick={() => onConfirm(intervalDays)}
            >
              {processing ? detail.actions.saving : copy.save}
            </ShellButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type CorrectSignerDialogProps = {
  email: string;
  errorMessage?: string | null;
  name: string;
  onCancel: () => void;
  onConfirm: (next: { email: string; name: string }) => void | Promise<void>;
  processing?: boolean;
};

function CorrectSignerDialog({
  email,
  errorMessage,
  name,
  onCancel,
  onConfirm,
  processing = false,
}: CorrectSignerDialogProps) {
  const [nextName, setNextName] = useState(name);
  const [nextEmail, setNextEmail] = useState(email);
  const detail = useMessages().messages.envelope.detail;
  const copy = detail.dialogs.signer;

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !processing) {
          onCancel();
        }
      }}
    >
      <DialogContent className="max-w-md sm:p-8" showCloseButton={false}>
        <div className="space-y-4">
          <DialogHeader className="space-y-3">
            <DialogTitle>{copy.title}</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-2 text-sm leading-6 text-(--secondary)">
                <p>{copy.description}</p>
              </div>
            </DialogDescription>
          </DialogHeader>

          <label className="grid gap-1.5">
            <span className="text-[0.8125rem] font-semibold text-(--secondary)">
              {copy.name}
            </span>
            <input
              autoFocus
              className="field-input"
              disabled={processing}
              onChange={(event) => setNextName(event.target.value)}
              value={nextName}
            />
          </label>

          <label className="grid gap-1.5">
            <span className="text-[0.8125rem] font-semibold text-(--secondary)">
              {copy.email}
            </span>
            <input
              className="field-input"
              disabled={processing}
              onChange={(event) => setNextEmail(event.target.value)}
              type="email"
              value={nextEmail}
            />
          </label>

          {errorMessage ? (
            <div className="notice notice-danger" role="alert">
              <p>{errorMessage}</p>
            </div>
          ) : null}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <ShellButton
              disabled={processing}
              onClick={onCancel}
              variant="secondary"
            >
              {detail.actions.cancel}
            </ShellButton>
            <ShellButton
              loading={processing}
              onClick={() => onConfirm({ email: nextEmail, name: nextName })}
            >
              {processing ? detail.actions.saving : detail.actions.save}
            </ShellButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type ConfirmationDialogProps = {
  children?: ReactNode;
  confirmDisabled?: boolean;
  confirmLabel: string;
  description: readonly string[];
  errorMessage?: string | null;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
  processing?: boolean;
  title: string;
};

function ConfirmationDialog({
  children,
  confirmDisabled = false,
  confirmLabel,
  description,
  errorMessage,
  onCancel,
  onConfirm,
  processing = false,
  title,
}: ConfirmationDialogProps) {
  const cancelLabel = useMessages().messages.envelope.detail.actions.cancel;

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !processing) {
          onCancel();
        }
      }}
    >
      <DialogContent className="max-w-md sm:p-8" showCloseButton={false}>
        <div className="space-y-4">
          <DialogHeader className="space-y-3">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-2 text-sm leading-6 text-(--secondary)">
                {description.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>

          {children}

          {errorMessage ? (
            <div className="notice notice-danger" role="alert">
              <p>{errorMessage}</p>
            </div>
          ) : null}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <ShellButton
              disabled={processing}
              onClick={onCancel}
              variant="secondary"
            >
              {cancelLabel}
            </ShellButton>
            <ShellButton
              disabled={confirmDisabled}
              loading={processing}
              onClick={onConfirm}
              variant="danger"
            >
              {processing ? `${confirmLabel}...` : confirmLabel}
            </ShellButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
