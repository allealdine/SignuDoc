"use client";

import { useEffect, useRef, useState } from "react";

import { DocumentThumbnail } from "@/components/shared/document-thumbnail";
import { ShellButton } from "@/components/shared/form-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatusPanel } from "@/components/shared/status-panel";
import { StepIndicator } from "@/components/shared/step-indicator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ReviewEnvelopeData } from "@/lib/envelopes";
import { formatMessage } from "@/lib/i18n/format.ts";
import type { Messages } from "@/lib/i18n/locales/en.ts";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";
import { formatReminderIntervalMessage } from "@/lib/i18n/reminder-labels.ts";
import { PERMITTED_USE_PATH } from "@/lib/permitted-uses";
import {
  DEFAULT_ENVELOPE_DEADLINE_DAYS,
  DEFAULT_ENVELOPE_REMINDER_DAYS,
  ENVELOPE_DEADLINE_DAY_OPTIONS,
  ENVELOPE_REMINDER_DAY_OPTIONS,
} from "@/lib/types/domain";
import { getSignerPalette } from "./signer-palette";

const redirectDelayMs = 1200;

type ReviewCopy = Messages["envelope"]["review"];
type SignatureCopy = ReviewCopy["signature"];

type ReviewShellProps = {
  envelopeId: string;
  initialState?: "error";
  record?: ReviewEnvelopeData;
};

type ReviewRecordView = {
  copyRecipients: readonly { email: string; id: string; name: string }[];
  filename: string;
  pageCount: number;
  signers: readonly ReviewSigner[];
  sizeLabel: string;
  title: string;
};

type ReviewFieldSummaryLabel =
  | "Dropdown"
  | "Number"
  | "Radio group"
  | "Checkbox"
  | "Date"
  | "Initials"
  | "Name"
  | "Signature"
  | "Text";

type ReviewSigner = {
  color?: string;
  email: string;
  fieldSummaries: readonly ReviewFieldSummaryLabel[];
  id: string;
  name: string;
  order: number;
  /** Signers who share a step sign at the same time. */
  step?: number;
  tint?: string;
};

type SendPhase = "error" | "idle" | "sending";

type SignatureLevel = "advanced" | "qualified" | "simple";

function describeSignatureLevel(
  level: SignatureLevel,
  providerName: string,
  copy: SignatureCopy,
) {
  switch (level) {
    case "advanced":
      return formatMessage(copy.advanced, { providerName });
    case "qualified":
      return formatMessage(copy.qualified, { providerName });
    default:
      return copy.simple;
  }
}

function buildSuccessMessage(firstSignerName: string, copy: ReviewCopy) {
  return formatMessage(copy.notice.sent, { name: firstSignerName });
}

export function ReviewShell({
  envelopeId,
  initialState,
  record,
}: ReviewShellProps) {
  const [deadlineDays, setDeadlineDays] = useState<number>(
    DEFAULT_ENVELOPE_DEADLINE_DAYS,
  );
  const [reminderDays, setReminderDays] = useState<number | null>(
    DEFAULT_ENVELOPE_REMINDER_DAYS,
  );
  const [signatureLevel, setSignatureLevel] =
    useState<SignatureLevel>("simple");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [sendPhase, setSendPhase] = useState<SendPhase>("idle");
  const [sendError, setSendError] = useState<string | null>(null);
  const sendTimeoutRef = useRef<number | null>(null);
  const { messages } = useMessages();
  const copy = messages.envelope.review;

  useEffect(() => {
    return () => {
      if (sendTimeoutRef.current) {
        window.clearTimeout(sendTimeoutRef.current);
      }
    };
  }, []);

  function closeConfirmation() {
    if (sendPhase === "sending") {
      return;
    }

    setSendPhase("idle");
    setIsConfirmationOpen(false);
  }

  function openConfirmation() {
    setNotice(null);
    setSendError(null);
    setSendPhase("idle");
    setIsConfirmationOpen(true);
  }

  async function handleConfirmSend() {
    if (sendPhase === "sending") {
      return;
    }

    if (sendTimeoutRef.current) {
      window.clearTimeout(sendTimeoutRef.current);
      sendTimeoutRef.current = null;
    }

    setSendError(null);
    setSendPhase("sending");

    try {
      const response = await fetch(`/api/envelopes/${envelopeId}/send`, {
        body: JSON.stringify({
          expiresInDays: deadlineDays,
          permittedUseConfirmed: true,
          reminderIntervalDays: reminderDays,
          ...(record?.signingProvider ? { signatureLevel } : {}),
        }),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        notifiedSignerName?: string;
        redirectPath?: string;
      } | null;

      if (!response.ok) {
        setSendError(payload?.error ?? copy.error.sendFailed);
        setSendPhase("error");
        return;
      }

      const notifiedSignerName =
        payload?.notifiedSignerName?.trim() ||
        firstSigner?.name ||
        formatMessage(copy.signingOrder.signer, { order: 1 });
      const redirectPath = payload?.redirectPath || `/envelopes/${envelopeId}`;

      setIsConfirmationOpen(false);
      setNotice(buildSuccessMessage(notifiedSignerName, copy));
      setSendPhase("idle");
      sendTimeoutRef.current = window.setTimeout(() => {
        window.location.assign(redirectPath);
      }, redirectDelayMs);
    } catch {
      setSendError(copy.error.sendFailed);
      setSendPhase("error");
    }
  }

  if (initialState === "error") {
    return (
      <div className="space-y-5">
        <PageHeader
          description={copy.header.description}
          title={copy.header.title}
        />
        <StepIndicator current={4} steps={messages.envelope.steps} />
        <StatusPanel
          footer={
            <ShellButton
              onClick={() => window.location.reload()}
              variant="secondary"
            >
              {copy.error.retry}
            </ShellButton>
          }
          description={copy.error.description}
          title={copy.error.title}
          tone="error"
        />
      </div>
    );
  }

  if (!record || record.isEmpty) {
    return (
      <div className="space-y-5">
        <PageHeader
          description={copy.header.description}
          title={copy.header.title}
        />
        <StepIndicator current={4} steps={messages.envelope.steps} />
        <StatusPanel
          action={{
            href: `/envelopes/${envelopeId}/prepare`,
            label: copy.empty.action,
          }}
          description={copy.empty.description}
          eyebrow={copy.empty.eyebrow}
          title={copy.empty.title}
        />
      </div>
    );
  }

  const activeRecord: ReviewRecordView = {
    copyRecipients: record.copyRecipients ?? [],
    filename: record.filename,
    pageCount: record.pageCount,
    signers: record.signers.map((signer) => ({ ...signer })),
    sizeLabel: record.sizeLabel,
    title: record.title,
  };
  const disabledReason = record.disabledReason ?? null;
  const firstSigner = activeRecord.signers[0];
  const stepOf = (signer: ReviewSigner) => signer.step ?? signer.order;
  const firstStep = firstSigner ? stepOf(firstSigner) : 1;
  // Everyone in the first step is invited when the envelope is sent.
  const firstStepNames = activeRecord.signers
    .filter((signer) => stepOf(signer) === firstStep)
    .map((signer) => signer.name);
  const signsAtTheSameTime =
    new Set(activeRecord.signers.map(stepOf)).size <
    activeRecord.signers.length;
  // A signature in a signer's own name goes on top of the one before it, so
  // those signers cannot sign at the same time.
  const providerLevelBlocked =
    signsAtTheSameTime && signatureLevel !== "simple";
  const canSend = Boolean(record.canSend) && !providerLevelBlocked;

  return (
    <div className="space-y-5">
      <PageHeader
        description={copy.header.description}
        title={copy.header.title}
      />

      <StepIndicator current={4} steps={messages.envelope.steps} />

      {notice ? (
        <section className="notice notice-success" role="status">
          <p>{notice}</p>
          <p className="mt-0.5 font-medium text-(--secondary)">
            {copy.notice.opening}
          </p>
        </section>
      ) : null}

      <section
        className="panel p-5 sm:p-8"
        data-animate="enter"
        data-animate-delay="2"
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)]">
          <article className="well flex flex-col gap-5 p-5 sm:p-6">
            <p className="section-eyebrow">{copy.document.eyebrow}</p>
            <div className="flex h-56 items-center justify-center">
              <DocumentThumbnail
                envelopeId={envelopeId}
                title={activeRecord.title}
              />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-[1.375rem] font-extrabold leading-tight text-(--fg)">
                {activeRecord.title}
              </h2>
              <p className="text-sm leading-6 text-(--secondary)">
                {formatMessage(copy.document.meta, {
                  filename: activeRecord.filename,
                  pageCount:
                    activeRecord.pageCount === 1
                      ? copy.document.pageOne
                      : formatMessage(copy.document.page, {
                          count: activeRecord.pageCount,
                        }),
                  sizeLabel: activeRecord.sizeLabel,
                })}
              </p>
            </div>
          </article>

          <article className="min-w-0">
            <div className="flex items-center justify-between gap-3 px-1">
              <h2 className="text-lg font-extrabold text-(--fg)">
                {copy.signingOrder.title}
              </h2>
              <span className="pill pill-neutral">
                {formatMessage(
                  activeRecord.signers.length === 1
                    ? copy.signingOrder.signerOne
                    : copy.signingOrder.signers,
                  { count: activeRecord.signers.length },
                )}
              </span>
            </div>

            <ol className="mt-4 space-y-3">
              {activeRecord.signers.map((signer, index) => {
                const palette =
                  signer.color && signer.tint
                    ? { color: signer.color, tint: signer.tint }
                    : getSignerPalette(index);

                return (
                  <li className="well p-4" key={signer.id}>
                    <div className="flex items-start gap-3.5">
                      <span
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
                          <span
                            className="pill w-fit"
                            style={{
                              backgroundColor: palette.tint,
                              color: palette.color,
                            }}
                          >
                            <span
                              aria-hidden="true"
                              className="size-2 rounded-full"
                              style={{ backgroundColor: palette.color }}
                            />
                            {formatMessage(copy.signingOrder.signer, {
                              order: signer.order,
                            })}
                          </span>
                        </div>

                        <p
                          className={`mt-2 text-sm leading-6 ${
                            signer.fieldSummaries.includes("Signature")
                              ? "text-(--tertiary)"
                              : "font-semibold text-(--danger)"
                          }`}
                        >
                          {formatSignerFieldSummary(
                            signer.fieldSummaries,
                            copy.fields,
                          )}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {activeRecord.copyRecipients.length > 0 ? (
              <div className="well mt-3 p-4">
                <p className="text-[0.9375rem] font-bold text-(--fg)">
                  {copy.signingOrder.copies}
                </p>
                <ul className="mt-2 space-y-1 text-sm leading-6 text-(--secondary)">
                  {activeRecord.copyRecipients.map((recipient) => (
                    <li className="truncate" key={recipient.id}>
                      {recipient.name} · {recipient.email}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <p className="notice notice-accent mt-4 font-medium">
              {signsAtTheSameTime
                ? copy.signingOrder.parallel
                : copy.signingOrder.sequential}
            </p>

            <div className="well mt-4 p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5">
                  <span className="text-[0.8125rem] font-semibold text-(--secondary)">
                    {copy.settings.deadline}
                  </span>
                  <select
                    className="field-input"
                    disabled={sendPhase === "sending" || Boolean(notice)}
                    onChange={(event) =>
                      setDeadlineDays(Number(event.target.value))
                    }
                    value={deadlineDays}
                  >
                    {ENVELOPE_DEADLINE_DAY_OPTIONS.map((days) => (
                      <option key={days} value={days}>
                        {formatMessage(copy.settings.deadlineOption, { days })}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1.5">
                  <span className="text-[0.8125rem] font-semibold text-(--secondary)">
                    {copy.settings.reminders}
                  </span>
                  <select
                    className="field-input"
                    disabled={sendPhase === "sending" || Boolean(notice)}
                    onChange={(event) =>
                      setReminderDays(
                        event.target.value === "off"
                          ? null
                          : Number(event.target.value),
                      )
                    }
                    value={reminderDays ?? "off"}
                  >
                    <option value="off">
                      {formatReminderIntervalMessage(
                        null,
                        messages.envelope.reminderIntervals,
                      )}
                    </option>
                    {ENVELOPE_REMINDER_DAY_OPTIONS.map((days) => (
                      <option key={days} value={days}>
                        {formatReminderIntervalMessage(
                          days,
                          messages.envelope.reminderIntervals,
                        )}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <p className="mt-3 text-sm leading-6 text-(--secondary)">
                {copy.settings.explanation}
              </p>
            </div>

            {record.signingProvider ? (
              <div className="well mt-4 p-4">
                <label className="grid gap-1.5">
                  <span className="text-[0.8125rem] font-semibold text-(--secondary)">
                    {copy.settings.signatureType}
                  </span>
                  <select
                    className="field-input"
                    disabled={sendPhase === "sending" || Boolean(notice)}
                    onChange={(event) =>
                      setSignatureLevel(event.target.value as SignatureLevel)
                    }
                    value={signatureLevel}
                  >
                    {(["simple", "advanced", "qualified"] as const).map(
                      (level) => (
                        <option key={level} value={level}>
                          {describeSignatureLevel(
                            level,
                            record.signingProvider!.name,
                            copy.signature,
                          )}
                        </option>
                      ),
                    )}
                  </select>
                </label>
                <p className="mt-3 text-sm leading-6 text-(--secondary)">
                  {signatureLevel === "simple"
                    ? copy.signature.simpleDescription
                    : formatMessage(copy.signature.providerDescription, {
                        providerName: record.signingProvider.name,
                        qualifiedNote:
                          signatureLevel === "qualified"
                            ? copy.signature.qualifiedNote
                            : "",
                      })}
                </p>
                {providerLevelBlocked ? (
                  <p className="notice notice-danger mt-3" role="alert">
                    {copy.signature.parallelBlocked}
                  </p>
                ) : null}
              </div>
            ) : null}
          </article>
        </div>

        {disabledReason ? (
          <div className="notice notice-danger mt-5" role="alert">
            <p>{disabledReason}</p>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <ShellButton
            href={`/envelopes/${envelopeId}/prepare`}
            variant="secondary"
          >
            {copy.actions.back}
          </ShellButton>
          <ShellButton disabled={!canSend} onClick={openConfirmation}>
            {copy.actions.send}
          </ShellButton>
        </div>
      </section>

      {isConfirmationOpen ? (
        <SendConfirmationDialog
          deadlineDays={deadlineDays}
          errorMessage={sendPhase === "error" ? sendError : null}
          firstSignerName={
            firstStepNames.length > 1
              ? `${firstStepNames.slice(0, -1).join(", ")} ${messages.common.and} ${firstStepNames[firstStepNames.length - 1]}`
              : (firstSigner?.name ??
                formatMessage(copy.signingOrder.signer, { order: 1 }))
          }
          firstStepSize={firstStepNames.length}
          isSending={sendPhase === "sending"}
          onCancel={closeConfirmation}
          onConfirm={handleConfirmSend}
          signatureType={
            record.signingProvider && signatureLevel !== "simple"
              ? describeSignatureLevel(
                  signatureLevel,
                  record.signingProvider.name,
                  copy.signature,
                )
              : null
          }
          signerCount={activeRecord.signers.length}
          title={activeRecord.title}
        />
      ) : null}
    </div>
  );
}

type SendConfirmationDialogProps = {
  deadlineDays: number;
  errorMessage: string | null;
  firstSignerName: string;
  /** How many signers are invited at once when it is sent. */
  firstStepSize: number;
  isSending: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  /** Set when signers sign through the install's signing provider. */
  signatureType: string | null;
  signerCount: number;
  title: string;
};

function SendConfirmationDialog({
  deadlineDays,
  errorMessage,
  firstSignerName,
  firstStepSize,
  isSending,
  onCancel,
  onConfirm,
  signatureType,
  signerCount,
  title,
}: SendConfirmationDialogProps) {
  const [isPermittedUseConfirmed, setIsPermittedUseConfirmed] = useState(false);
  const { messages } = useMessages();
  const copy = messages.envelope.review;

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !isSending) {
          onCancel();
        }
      }}
    >
      <DialogContent className="max-w-md sm:p-8" showCloseButton={false}>
        <div className="space-y-4">
          <DialogHeader className="space-y-3">
            <DialogTitle>{copy.dialog.title}</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-3 text-sm leading-6 text-(--secondary)">
                <p>
                  {formatMessage(copy.dialog.summary, {
                    title,
                    signerCount,
                    signerLabel:
                      signerCount === 1
                        ? copy.dialog.signerOne
                        : copy.dialog.signers,
                    firstSignerNotice:
                      signerCount === 1
                        ? formatMessage(copy.dialog.notifiedImmediate, {
                            name: firstSignerName,
                          })
                        : firstStepSize > 1
                          ? formatMessage(copy.dialog.notifiedParallel, {
                              name: firstSignerName,
                            })
                          : formatMessage(copy.dialog.notifiedFirst, {
                              name: firstSignerName,
                            }),
                    deadlineDays,
                  })}
                </p>
                {signatureType ? (
                  <p>
                    {formatMessage(copy.dialog.signatureType, {
                      type: signatureType,
                    })}
                  </p>
                ) : null}
              </div>
            </DialogDescription>
          </DialogHeader>

          <label className="well block px-4 py-4">
            <span className="flex items-start gap-3">
              <Checkbox
                autoFocus
                checked={isPermittedUseConfirmed}
                className="mt-1"
                disabled={isSending}
                onCheckedChange={(checked) =>
                  setIsPermittedUseConfirmed(checked === true)
                }
              />
              <span className="text-sm leading-6 text-(--secondary)">
                {copy.dialog.permittedUseBefore}
                <a
                  className="font-semibold text-(--accent-ink) underline decoration-[rgb(var(--accent-rgb)/0.35)] underline-offset-4"
                  href={PERMITTED_USE_PATH}
                  rel="noreferrer"
                  target="_blank"
                >
                  {copy.dialog.permittedUseLink}
                </a>
                {copy.dialog.permittedUseAfter}
              </span>
            </span>
          </label>

          {errorMessage ? (
            <div className="notice notice-danger" role="alert">
              <p>{errorMessage}</p>
            </div>
          ) : null}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <ShellButton
              disabled={isSending}
              onClick={onCancel}
              variant="secondary"
            >
              {copy.actions.cancel}
            </ShellButton>
            <ShellButton
              disabled={!isPermittedUseConfirmed}
              loading={isSending}
              onClick={onConfirm}
            >
              {isSending ? copy.actions.sending : copy.actions.sendNow}
            </ShellButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function formatSignerFieldSummary(
  fields: readonly ReviewFieldSummaryLabel[],
  copy: ReviewCopy["fields"],
) {
  const fieldCount = fields.length;

  if (fieldCount === 0) {
    return copy.none;
  }

  return formatMessage(fieldCount === 1 ? copy.countOne : copy.countMany, {
    count: fieldCount,
  });
}
