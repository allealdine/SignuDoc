"use client";

import { type ChangeEvent, useRef, useState } from "react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/layout/nav-items";
import { ShellButton } from "@/components/shared/form-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatusPanel } from "@/components/shared/status-panel";
import { StepIndicator } from "@/components/shared/step-indicator";
import type { DraftSignerStepData } from "@/lib/envelopes";
import { formatMessage } from "@/lib/i18n/format.ts";
import type { Messages } from "@/lib/i18n/locales/en.ts";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";
import type { ReplaceSignersResponse } from "@/lib/schemas/signer";
import { moveListedSigner, removeListedSigner } from "@/lib/signing-steps";
import {
  DEFAULT_MAX_SIGNERS_PER_ENVELOPE,
  MAX_COPY_RECIPIENTS_PER_ENVELOPE,
  type SignatureMeaning,
  signatureMeanings,
} from "@/lib/types/domain";
import { getSignerPalette } from "./signer-palette";

const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SignersCopy = Messages["envelope"]["signers"];
type SignerValidationCopy = SignersCopy["validation"];

type SignersShellProps = {
  envelopeId: string;
  initialState?: "error";
  record?: DraftSignerStepData;
};

type SignerField = "email" | "name";

type SignerChecks = {
  /** A new code typed by the sender. Empty means "no change". */
  accessCode: string;
  /** A code is saved on the server. */
  hasAccessCode: boolean;
  removeAccessCode: boolean;
  requireEmailCode: boolean;
  /** The sender picked "access code" (a saved code or one being typed). */
  wantsAccessCode: boolean;
  /** Part 11 mode: what this signature means (21 CFR 11.50). */
  signatureMeaning: SignatureMeaning | null;
};

type ShellSigner = SignerChecks & {
  email: string;
  localId: string;
  name: string;
  signerId?: string;
  touched: Record<SignerField, boolean>;
  /**
   * Signs at the same time as the signer above, in the same step of the
   * signing order. Ignored for the first signer, and in Part 11 mode.
   */
  withPrevious: boolean;
};

type SignerErrors = {
  accessCode?: string;
  email?: string;
  name?: string;
};

/** Someone who gets the finished document without signing it. */
type ShellCopyRecipient = {
  email: string;
  localId: string;
  name: string;
  recipientId?: string;
  touched: Record<SignerField, boolean>;
};

type InitialModel = {
  copyRecipients: ShellCopyRecipient[];
  showAllErrors: boolean;
  signers: ShellSigner[];
};

function createSigner(
  localId: string,
  overrides?: Partial<Omit<ShellSigner, "localId" | "touched">> & {
    touched?: Partial<Record<SignerField, boolean>>;
  },
): ShellSigner {
  return {
    accessCode: "",
    email: overrides?.email ?? "",
    hasAccessCode: overrides?.hasAccessCode ?? false,
    localId,
    removeAccessCode: false,
    requireEmailCode: overrides?.requireEmailCode ?? false,
    wantsAccessCode: overrides?.hasAccessCode ?? false,
    name: overrides?.name ?? "",
    signatureMeaning: overrides?.signatureMeaning ?? null,
    signerId: overrides?.signerId,
    touched: {
      email: overrides?.touched?.email ?? false,
      name: overrides?.touched?.name ?? false,
    },
    withPrevious: overrides?.withPrevious ?? false,
  };
}

/**
 * Each signer's step of the signing order, from the list and its "at the
 * same time as the signer above" choices. In Part 11 mode every signer has
 * a step of their own.
 */
function computeSigningSteps(
  signers: readonly Pick<ShellSigner, "withPrevious">[],
  part11Mode: boolean,
): number[] {
  const steps: number[] = [];

  for (const [index, signer] of signers.entries()) {
    const previous = steps[index - 1];

    steps.push(
      previous === undefined
        ? 1
        : signer.withPrevious && !part11Mode
          ? previous
          : previous + 1,
    );
  }

  return steps;
}

// One check per signer. The server still honours both at once (the signer
// must then pass both), which older envelopes and API callers may have set.
// Labels live in the dictionary; these values are the wire/internal values.
const SIGNER_CHECK_VALUES = ["none", "email_code", "access_code"] as const;

type SignerCheckChoice = (typeof SIGNER_CHECK_VALUES)[number];

const signerCheckCopyKeys = {
  access_code: "accessCode",
  email_code: "emailCode",
  none: "none",
} as const;

function signerCheckChoice(
  signer: Pick<SignerChecks, "requireEmailCode" | "wantsAccessCode">,
): SignerCheckChoice | "both" {
  if (signer.requireEmailCode && signer.wantsAccessCode) {
    return "both";
  }

  return signer.requireEmailCode
    ? "email_code"
    : signer.wantsAccessCode
      ? "access_code"
      : "none";
}

function buildInitialModel(record?: DraftSignerStepData): InitialModel {
  const sorted =
    record?.signers.slice().sort((left, right) => left.order - right.order) ??
    [];
  const signers = sorted.map((signer, index) =>
    createSigner(signer.id, {
      email: signer.email,
      hasAccessCode: signer.hasAccessCode,
      name: signer.name,
      requireEmailCode: signer.requireEmailCode,
      signatureMeaning: signer.signatureMeaning ?? null,
      signerId: signer.id,
      touched: { email: true, name: true },
      withPrevious: index > 0 && sorted[index - 1]?.step === signer.step,
    }),
  );

  return {
    copyRecipients: (record?.copyRecipients ?? []).map((recipient) => ({
      email: recipient.email,
      localId: recipient.id,
      name: recipient.name,
      recipientId: recipient.id,
      touched: { email: true, name: true },
    })),
    showAllErrors: false,
    signers: signers.length > 0 ? signers : [createSigner("signer-1")],
  };
}

function buildCopyRecipientErrors(
  copyRecipients: readonly ShellCopyRecipient[],
  signers: readonly ShellSigner[],
  copy: SignerValidationCopy,
) {
  const errorsByLocalId: Record<string, SignerErrors> = {};
  const taken = new Set(
    signers
      .map((signer) => signer.email.trim().toLowerCase())
      .filter((email) => email.length > 0),
  );

  for (const recipient of copyRecipients) {
    const errors: SignerErrors = {};
    const normalizedEmail = recipient.email.trim().toLowerCase();

    if (recipient.name.trim().length === 0) {
      errors.name = copy.nameRequired;
    }

    if (
      normalizedEmail.length === 0 ||
      !validEmailPattern.test(normalizedEmail)
    ) {
      errors.email = copy.emailInvalid;
    } else if (taken.has(normalizedEmail)) {
      errors.email = copy.duplicateCopy;
    }

    taken.add(normalizedEmail);
    errorsByLocalId[recipient.localId] = errors;
  }

  return errorsByLocalId;
}

function buildSignerErrors(
  signers: readonly ShellSigner[],
  copy: SignerValidationCopy,
) {
  const errorsBySignerId: Record<string, SignerErrors> = {};
  const emailCounts = signers.reduce<Record<string, number>>(
    (counts, signer) => {
      const normalizedEmail = signer.email.trim().toLowerCase();

      if (normalizedEmail.length > 0) {
        counts[normalizedEmail] = (counts[normalizedEmail] ?? 0) + 1;
      }

      return counts;
    },
    {},
  );

  for (const signer of signers) {
    const signerErrors: SignerErrors = {};
    const normalizedName = signer.name.trim();
    const normalizedEmail = signer.email.trim().toLowerCase();

    if (normalizedName.length === 0) {
      signerErrors.name = copy.nameRequired;
    }

    if (
      normalizedEmail.length === 0 ||
      !validEmailPattern.test(normalizedEmail)
    ) {
      signerErrors.email = copy.emailInvalid;
    } else if (emailCounts[normalizedEmail] > 1) {
      signerErrors.email = copy.duplicateSigner;
    }

    const accessCode = signer.accessCode.trim();
    const keepsSavedCode = signer.hasAccessCode && !signer.removeAccessCode;

    if (signer.wantsAccessCode && accessCode.length === 0 && !keepsSavedCode) {
      signerErrors.accessCode = copy.accessCodeRequired;
    } else if (
      accessCode.length > 0 &&
      (accessCode.length < 4 || accessCode.length > 64)
    ) {
      signerErrors.accessCode = copy.accessCodeLength;
    }

    errorsBySignerId[signer.localId] = signerErrors;
  }

  return errorsBySignerId;
}

function hasSignerErrors(errors: SignerErrors) {
  return Boolean(errors.name || errors.email || errors.accessCode);
}

function reorderSigners(
  signers: ShellSigner[],
  signerLocalId: string,
  direction: "earlier" | "later",
) {
  const signerIndex = signers.findIndex(
    (signer) => signer.localId === signerLocalId,
  );

  return moveListedSigner(signers, signerIndex, direction);
}

function buildSignerRequest(
  signers: readonly ShellSigner[],
  copyRecipients: readonly ShellCopyRecipient[],
  part11Mode: boolean,
) {
  const steps = computeSigningSteps(signers, part11Mode);

  return {
    copyRecipients: copyRecipients.map((recipient) => ({
      email: recipient.email,
      id: recipient.recipientId,
      name: recipient.name,
    })),
    signers: signers.map((signer, index) => ({
      accessCode:
        signer.wantsAccessCode && signer.accessCode.trim().length > 0
          ? signer.accessCode.trim()
          : signer.hasAccessCode &&
              (signer.removeAccessCode || !signer.wantsAccessCode)
            ? null
            : undefined,
      email: signer.email,
      id: signer.signerId,
      name: signer.name,
      requireEmailCode: signer.requireEmailCode,
      signatureMeaning: signer.signatureMeaning,
      signOrder: index + 1,
      signingStep: steps[index],
    })),
  };
}

async function parseJsonResponse<T>(
  response: Response,
  fallbackError: string,
): Promise<{ data: T | null; error: string | null }> {
  const payload = (await response.json().catch(() => null)) as
    | { error?: string }
    | T
    | null;

  if (!response.ok) {
    return {
      data: null,
      error:
        payload &&
        typeof payload === "object" &&
        "error" in payload &&
        typeof payload.error === "string"
          ? payload.error
          : fallbackError,
    };
  }

  return {
    data: payload as T | null,
    error: null,
  };
}

function SignerCard({
  canMoveEarlier,
  canMoveLater,
  canRemove,
  disabled = false,
  emailError,
  index,
  nameError,
  onChange,
  onBlur,
  onChecksChange,
  onMove,
  onRemove,
  onTogetherChange,
  accessCodeError,
  copy,
  part11Mode = false,
  previousStepIsPlural,
  previousStepLabel,
  showStep,
  signer,
  step,
  stepSize,
}: {
  accessCodeError?: string;
  copy: SignersCopy;
  part11Mode?: boolean;
  /** Who signs in the step before this signer's, as "Signer 2". */
  previousStepLabel: string | null;
  /** Keeps English "finish"/"finishes" correct without parsing the label. */
  previousStepIsPlural: boolean;
  /** Some signers share a step, so every card says which step it is in. */
  showStep: boolean;
  /** This signer's step of the signing order. */
  step: number;
  /** How many signers are in that step. */
  stepSize: number;
  onTogetherChange: (together: boolean) => void;
  onChecksChange: (patch: Partial<SignerChecks>) => void;
  canMoveEarlier: boolean;
  canMoveLater: boolean;
  canRemove: boolean;
  disabled?: boolean;
  emailError?: string;
  index: number;
  nameError?: string;
  onChange: (field: SignerField, value: string) => void;
  onBlur: (field: SignerField) => void;
  onMove: (direction: "earlier" | "later") => void;
  onRemove: () => void;
  signer: ShellSigner;
}) {
  const keepsSavedCode = signer.hasAccessCode && !signer.removeAccessCode;
  const checkChoice = signerCheckChoice(signer);
  const checkChoices = SIGNER_CHECK_VALUES.map((value) => ({
    label: copy.checks.options[signerCheckCopyKeys[value]],
    value,
  }));
  const choosePatch = (choice: SignerCheckChoice): Partial<SignerChecks> =>
    choice === "access_code"
      ? {
          removeAccessCode: false,
          requireEmailCode: false,
          wantsAccessCode: true,
        }
      : {
          accessCode: "",
          removeAccessCode: signer.hasAccessCode,
          requireEmailCode: choice === "email_code",
          wantsAccessCode: false,
        };
  const palette = getSignerPalette(index);
  const order = index + 1;
  const together = index > 0 && signer.withPrevious && !part11Mode;
  const previous =
    previousStepLabel ?? formatMessage(copy.signer.label, { order: order - 1 });
  const finishVerb = previousStepIsPlural
    ? copy.route.finishPlural
    : copy.route.finishSingular;
  let routeLabel: string;

  if (step === 1) {
    routeLabel =
      stepSize > 1 ? copy.route.firstParallel : copy.route.firstImmediate;
  } else if (together) {
    routeLabel = formatMessage(copy.route.parallel, {
      previous,
      finishVerb,
    });
  } else {
    routeLabel = formatMessage(copy.route.sequential, {
      previous,
      finishVerb,
    });
  }

  return (
    <li className="well p-4 sm:p-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <span
              className="pill"
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
              {formatMessage(copy.signer.label, { order })}
              {showStep ? formatMessage(copy.signer.step, { step }) : ""}
            </span>
            <p className="text-[0.8125rem] leading-5 text-(--secondary)">
              {routeLabel}
            </p>
            {index > 0 && !part11Mode ? (
              <label className="flex items-center gap-2 text-[0.8125rem] font-semibold text-(--secondary)">
                <input
                  checked={signer.withPrevious}
                  className="size-4 shrink-0 cursor-pointer accent-(--accent)"
                  disabled={disabled}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    onTogetherChange(event.target.checked)
                  }
                  type="checkbox"
                />
                {formatMessage(copy.signer.together, { order: order - 1 })}
              </label>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              aria-label={formatMessage(copy.signer.aria.moveEarlier, {
                order,
              })}
              className="btn-quiet"
              disabled={disabled || !canMoveEarlier}
              onClick={() => onMove("earlier")}
              type="button"
            >
              <ChevronLeftIcon aria-hidden="true" className="-ml-1 size-4" />
              {copy.signer.moveEarlier}
            </button>
            <button
              aria-label={formatMessage(copy.signer.aria.moveLater, { order })}
              className="btn-quiet"
              disabled={disabled || !canMoveLater}
              onClick={() => onMove("later")}
              type="button"
            >
              {copy.signer.moveLater}
              <ChevronRightIcon aria-hidden="true" className="-mr-1 size-4" />
            </button>
            <button
              aria-label={formatMessage(copy.signer.aria.remove, { order })}
              className="btn-quiet btn-quiet-danger"
              disabled={disabled || !canRemove}
              onClick={onRemove}
              type="button"
            >
              {copy.actions.remove}
            </button>
          </div>
        </div>

        <div className="grid gap-x-4 gap-y-1 md:grid-cols-2">
          <label className="grid auto-rows-min gap-1.5">
            <span className="text-[0.8125rem] font-semibold text-(--secondary)">
              {copy.fields.name}
            </span>
            <input
              aria-invalid={nameError ? true : undefined}
              aria-label={formatMessage(copy.signer.aria.name, { order })}
              className="field-input"
              disabled={disabled}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange("name", event.target.value)
              }
              onBlur={() => onBlur("name")}
              placeholder="Jane Smith"
              type="text"
              value={signer.name}
            />
            <span
              aria-live="polite"
              className={`min-h-4 text-xs font-semibold text-(--danger) ${
                nameError ? "" : "invisible"
              }`}
              role={nameError ? "alert" : undefined}
            >
              {nameError ?? " "}
            </span>
          </label>

          <label className="grid auto-rows-min gap-1.5">
            <span className="text-[0.8125rem] font-semibold text-(--secondary)">
              {copy.fields.email}
            </span>
            <input
              aria-invalid={emailError ? true : undefined}
              aria-label={formatMessage(copy.signer.aria.email, { order })}
              className="field-input"
              disabled={disabled}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange("email", event.target.value)
              }
              onBlur={() => onBlur("email")}
              placeholder="jane@company.com"
              type="email"
              value={signer.email}
            />
            <span
              aria-live="polite"
              className={`min-h-4 text-xs font-semibold text-(--danger) ${
                emailError ? "" : "invisible"
              }`}
              role={emailError ? "alert" : undefined}
            >
              {emailError ?? " "}
            </span>
          </label>
        </div>

        {part11Mode ? (
          <label className="grid gap-2 rounded-2xl bg-white p-4 text-sm text-(--fg) sm:p-5">
            <span className="font-bold text-(--fg)">
              {copy.signatureMeaning.title}
            </span>
            <span className="text-[0.8125rem] leading-5 text-(--secondary)">
              {copy.signatureMeaning.description}
            </span>
            <select
              aria-invalid={!signer.signatureMeaning ? true : undefined}
              aria-label={formatMessage(copy.signer.aria.meaning, { order })}
              className="field-input"
              disabled={disabled}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                onChecksChange({
                  signatureMeaning: (
                    signatureMeanings as readonly string[]
                  ).includes(event.target.value)
                    ? (event.target.value as SignatureMeaning)
                    : null,
                })
              }
              value={signer.signatureMeaning ?? ""}
            >
              <option value="">{copy.signatureMeaning.choose}</option>
              {signatureMeanings.map((meaning) => (
                <option key={meaning} value={meaning}>
                  {copy.signatureMeaning.options[meaning].label}
                </option>
              ))}
            </select>
            {signer.signatureMeaning ? (
              <span className="text-[0.8125rem] leading-5 text-(--secondary)">
                {
                  copy.signatureMeaning.options[signer.signatureMeaning]
                    .statement
                }
              </span>
            ) : null}
          </label>
        ) : null}

        <fieldset className="grid gap-3 rounded-2xl bg-white p-4 text-sm text-(--fg) sm:p-5">
          <legend className="sr-only">{copy.checks.legend}</legend>
          <p className="font-bold text-(--fg)">
            {copy.checks.title}{" "}
            <span className="font-normal text-(--secondary)">
              {copy.checks.optional}
            </span>
          </p>
          <p className="text-[0.8125rem] leading-5 text-(--secondary)">
            {copy.checks.description}
          </p>
          {checkChoice === "both" ? (
            <p className="text-[0.8125rem] leading-5 text-(--secondary)">
              {copy.checks.bothNotice}
            </p>
          ) : null}
          <div className="grid gap-2" role="radiogroup">
            {checkChoices.map((choice) => (
              <label className="flex items-start gap-3" key={choice.value}>
                <input
                  aria-label={formatMessage(copy.signer.aria.check, {
                    order,
                    label: choice.label,
                  })}
                  checked={checkChoice === choice.value}
                  className="mt-0.5 size-4.5 shrink-0 cursor-pointer accent-(--accent)"
                  disabled={disabled}
                  name={`signer-${signer.localId}-check`}
                  onChange={() => onChecksChange(choosePatch(choice.value))}
                  type="radio"
                  value={choice.value}
                />
                <span>{choice.label}</span>
              </label>
            ))}
          </div>
          {signer.wantsAccessCode ? (
            <label className="grid gap-2">
              <span className="text-[0.8125rem] font-semibold text-(--secondary)">
                {copy.checks.accessCode.label}
                {keepsSavedCode ? copy.checks.accessCode.hint : ""}
              </span>
              <input
                aria-invalid={accessCodeError ? true : undefined}
                aria-label={formatMessage(copy.signer.aria.accessCode, {
                  order,
                })}
                autoComplete="off"
                className="field-input"
                disabled={disabled}
                maxLength={64}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onChecksChange({ accessCode: event.target.value })
                }
                placeholder={
                  keepsSavedCode
                    ? copy.checks.accessCode.placeholderSaved
                    : copy.checks.accessCode.placeholder
                }
                type="text"
                value={signer.accessCode}
              />
              {accessCodeError ? (
                <span
                  className="text-xs font-semibold text-(--danger)"
                  role="alert"
                >
                  {accessCodeError}
                </span>
              ) : null}
            </label>
          ) : null}
        </fieldset>
      </div>
    </li>
  );
}

function CopyRecipientCard({
  copy,
  disabled = false,
  emailError,
  index,
  nameError,
  onBlur,
  onChange,
  onRemove,
  recipient,
}: {
  copy: SignersCopy;
  disabled?: boolean;
  emailError?: string;
  index: number;
  nameError?: string;
  onBlur: (field: SignerField) => void;
  onChange: (field: SignerField, value: string) => void;
  onRemove: () => void;
  recipient: ShellCopyRecipient;
}) {
  const position = index + 1;

  return (
    <li className="well p-4 sm:p-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <span className="pill pill-neutral">
            {formatMessage(copy.copyRecipient.label, { position })}
          </span>
          <button
            aria-label={formatMessage(copy.copyRecipient.aria.remove, {
              position,
            })}
            className="btn-quiet btn-quiet-danger"
            disabled={disabled}
            onClick={onRemove}
            type="button"
          >
            {copy.actions.remove}
          </button>
        </div>

        <div className="grid gap-x-4 gap-y-1 md:grid-cols-2">
          <label className="grid auto-rows-min gap-1.5">
            <span className="text-[0.8125rem] font-semibold text-(--secondary)">
              {copy.fields.name}
            </span>
            <input
              aria-invalid={nameError ? true : undefined}
              aria-label={formatMessage(copy.copyRecipient.aria.name, {
                position,
              })}
              className="field-input"
              disabled={disabled}
              onBlur={() => onBlur("name")}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange("name", event.target.value)
              }
              placeholder={copy.copyRecipient.namePlaceholder}
              type="text"
              value={recipient.name}
            />
            <span
              aria-live="polite"
              className={`min-h-4 text-xs font-semibold text-(--danger) ${
                nameError ? "" : "invisible"
              }`}
              role={nameError ? "alert" : undefined}
            >
              {nameError ?? " "}
            </span>
          </label>

          <label className="grid auto-rows-min gap-1.5">
            <span className="text-[0.8125rem] font-semibold text-(--secondary)">
              {copy.fields.email}
            </span>
            <input
              aria-invalid={emailError ? true : undefined}
              aria-label={formatMessage(copy.copyRecipient.aria.email, {
                position,
              })}
              className="field-input"
              disabled={disabled}
              onBlur={() => onBlur("email")}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange("email", event.target.value)
              }
              placeholder={copy.copyRecipient.emailPlaceholder}
              type="email"
              value={recipient.email}
            />
            <span
              aria-live="polite"
              className={`min-h-4 text-xs font-semibold text-(--danger) ${
                emailError ? "" : "invisible"
              }`}
              role={emailError ? "alert" : undefined}
            >
              {emailError ?? " "}
            </span>
          </label>
        </div>
      </div>
    </li>
  );
}

export function SignersShell({
  envelopeId,
  initialState,
  record,
}: SignersShellProps) {
  const initialModel = buildInitialModel(record);
  const [signers, setSigners] = useState(initialModel.signers);
  const [copyRecipients, setCopyRecipients] = useState(
    initialModel.copyRecipients,
  );
  const nextCopyRecipientNumberRef = useRef(
    initialModel.copyRecipients.length + 1,
  );
  const [showAllErrors, setShowAllErrors] = useState(
    initialModel.showAllErrors,
  );
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nextSignerNumberRef = useRef(initialModel.signers.length + 1);
  const { messages } = useMessages();
  const copy = messages.envelope.signers;

  const errorsBySignerId = buildSignerErrors(signers, copy.validation);
  const errorsByCopyRecipientId = buildCopyRecipientErrors(
    copyRecipients,
    signers,
    copy.validation,
  );
  const maxSigners = record?.maxSigners ?? DEFAULT_MAX_SIGNERS_PER_ENVELOPE;
  const part11Mode = record?.part11Mode ?? false;
  const canAddSigner = signers.length < maxSigners;
  const signingSteps = computeSigningSteps(signers, part11Mode);
  const hasSharedStep = new Set(signingSteps).size < signingSteps.length;

  /** "Signer 2", or "Signers 2 and 3", for the signers of one step. */
  function describeStep(
    step: number,
  ): { label: string; isPlural: boolean } | null {
    const places = signingSteps.flatMap((entry, index) =>
      entry === step ? [String(index + 1)] : [],
    );

    if (places.length === 0) {
      return null;
    }

    if (places.length === 1) {
      return {
        label: formatMessage(copy.signer.stepLabelOne, { order: places[0] }),
        isPlural: false,
      };
    }

    const orders = `${places.slice(0, -1).join(", ")} ${messages.common.and} ${places[places.length - 1]}`;

    return {
      label: formatMessage(copy.signer.stepLabelMany, { orders }),
      isPlural: true,
    };
  }
  const canAddCopyRecipient =
    copyRecipients.length < MAX_COPY_RECIPIENTS_PER_ENVELOPE;
  const canContinue =
    signers.length > 0 &&
    signers.every(
      (signer) => !hasSignerErrors(errorsBySignerId[signer.localId] ?? {}),
    ) &&
    copyRecipients.every(
      (recipient) =>
        !hasSignerErrors(errorsByCopyRecipientId[recipient.localId] ?? {}),
    ) &&
    (!record?.part11Mode ||
      signers.every((signer) => signer.signatureMeaning !== null));

  function clearSubmitError() {
    setSubmissionError(null);
  }

  function handleSignerChange(
    signerLocalId: string,
    field: SignerField,
    value: string,
  ) {
    clearSubmitError();
    setShowAllErrors(false);
    setSigners((currentSigners) =>
      currentSigners.map((signer) =>
        signer.localId === signerLocalId
          ? {
              ...signer,
              [field]: value,
            }
          : signer,
      ),
    );
  }

  function handleSignerChecksChange(
    signerLocalId: string,
    patch: Partial<SignerChecks>,
  ) {
    clearSubmitError();
    setSigners((currentSigners) =>
      currentSigners.map((signer) =>
        signer.localId === signerLocalId ? { ...signer, ...patch } : signer,
      ),
    );
  }

  function handleSignerTogetherChange(
    signerLocalId: string,
    together: boolean,
  ) {
    clearSubmitError();
    setSigners((currentSigners) =>
      currentSigners.map((signer) =>
        signer.localId === signerLocalId
          ? { ...signer, withPrevious: together }
          : signer,
      ),
    );
  }

  function handleSignerBlur(signerLocalId: string, field: SignerField) {
    setSigners((currentSigners) =>
      currentSigners.map((signer) =>
        signer.localId === signerLocalId
          ? {
              ...signer,
              touched: {
                ...signer.touched,
                [field]: true,
              },
            }
          : signer,
      ),
    );
  }

  function handleAddCopyRecipient() {
    if (!canAddCopyRecipient || isSubmitting) {
      return;
    }

    clearSubmitError();
    const number = nextCopyRecipientNumberRef.current;
    nextCopyRecipientNumberRef.current += 1;
    setCopyRecipients((current) => [
      ...current,
      {
        email: "",
        localId: `copy-${number}`,
        name: "",
        touched: { email: false, name: false },
      },
    ]);
  }

  function handleCopyRecipientChange(
    localId: string,
    patch: Partial<Pick<ShellCopyRecipient, "email" | "name">>,
  ) {
    clearSubmitError();
    setShowAllErrors(false);
    setCopyRecipients((current) =>
      current.map((recipient) =>
        recipient.localId === localId ? { ...recipient, ...patch } : recipient,
      ),
    );
  }

  function handleCopyRecipientBlur(localId: string, field: SignerField) {
    setCopyRecipients((current) =>
      current.map((recipient) =>
        recipient.localId === localId
          ? { ...recipient, touched: { ...recipient.touched, [field]: true } }
          : recipient,
      ),
    );
  }

  function handleRemoveCopyRecipient(localId: string) {
    if (isSubmitting) {
      return;
    }

    clearSubmitError();
    setCopyRecipients((current) =>
      current.filter((recipient) => recipient.localId !== localId),
    );
  }

  function handleAddSigner() {
    if (!canAddSigner || isSubmitting) {
      return;
    }

    clearSubmitError();
    const nextSignerNumber = nextSignerNumberRef.current;
    nextSignerNumberRef.current += 1;
    setSigners((currentSigners) => [
      ...currentSigners,
      createSigner(`signer-${nextSignerNumber}`),
    ]);
  }

  function handleRemoveSigner(signerLocalId: string) {
    if (isSubmitting) {
      return;
    }

    clearSubmitError();
    setSigners((currentSigners) =>
      currentSigners.length === 1
        ? currentSigners
        : removeListedSigner(
            currentSigners,
            currentSigners.findIndex(
              (signer) => signer.localId === signerLocalId,
            ),
          ),
    );
  }

  function handleMoveSigner(
    signerLocalId: string,
    direction: "earlier" | "later",
  ) {
    if (isSubmitting) {
      return;
    }

    clearSubmitError();
    setSigners((currentSigners) =>
      reorderSigners(currentSigners, signerLocalId, direction),
    );
  }

  async function handleContinue() {
    setShowAllErrors(true);

    if (!canContinue || isSubmitting) {
      return;
    }

    clearSubmitError();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/envelopes/${envelopeId}/signers`, {
        body: JSON.stringify(
          buildSignerRequest(signers, copyRecipients, part11Mode),
        ),
        headers: {
          "content-type": "application/json",
        },
        method: "PUT",
      });
      const payload = await parseJsonResponse<ReplaceSignersResponse>(
        response,
        copy.validation.generic,
      );

      if (payload.error) {
        setSubmissionError(payload.error);
        return;
      }

      window.location.assign(
        payload.data?.redirectPath ?? `/envelopes/${envelopeId}/prepare`,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (initialState === "error") {
    return (
      <div className="space-y-5">
        <PageHeader
          description={copy.header.description}
          title={copy.header.title}
        />
        <StepIndicator current={2} steps={messages.envelope.steps} />
        <StatusPanel
          action={{
            href: `/envelopes/${envelopeId}/signers`,
            label: copy.error.retry,
          }}
          description={copy.error.description}
          title={copy.error.title}
          tone="error"
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <PageHeader
        description={copy.header.description}
        title={copy.header.title}
      />

      <StepIndicator current={2} steps={messages.envelope.steps} />

      <section
        className="panel p-5 sm:p-8"
        data-animate="enter"
        data-animate-delay="2"
      >
        <div className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-lg font-extrabold text-(--fg)">
              {copy.intro.title}
            </h2>
            <p className="text-sm leading-6 text-(--secondary)">
              {formatMessage(copy.intro.limit, { maxSigners })}{" "}
              {part11Mode ? copy.intro.part11 : copy.intro.parallel}
            </p>
          </div>

          {submissionError ? (
            <div className="notice notice-danger" role="alert">
              <p>{submissionError}</p>
            </div>
          ) : null}

          <ol className="space-y-3">
            {signers.map((signer, index) => {
              const signerErrors = errorsBySignerId[signer.localId] ?? {};
              const nameError =
                showAllErrors || signer.touched.name
                  ? signerErrors.name
                  : undefined;
              const emailError =
                showAllErrors || signer.touched.email
                  ? signerErrors.email
                  : undefined;
              const previousStep = describeStep((signingSteps[index] ?? 1) - 1);

              return (
                <SignerCard
                  canMoveEarlier={index > 0}
                  canMoveLater={index < signers.length - 1}
                  canRemove={signers.length > 1}
                  copy={copy}
                  disabled={isSubmitting}
                  emailError={emailError}
                  index={index}
                  key={signer.localId}
                  nameError={nameError}
                  onChange={(field, value) =>
                    handleSignerChange(signer.localId, field, value)
                  }
                  onBlur={(field) => handleSignerBlur(signer.localId, field)}
                  accessCodeError={errorsBySignerId[signer.localId]?.accessCode}
                  onChecksChange={(patch) =>
                    handleSignerChecksChange(signer.localId, patch)
                  }
                  onMove={(direction) =>
                    handleMoveSigner(signer.localId, direction)
                  }
                  onRemove={() => handleRemoveSigner(signer.localId)}
                  onTogetherChange={(together) =>
                    handleSignerTogetherChange(signer.localId, together)
                  }
                  part11Mode={part11Mode}
                  previousStepIsPlural={previousStep?.isPlural ?? false}
                  previousStepLabel={previousStep?.label ?? null}
                  showStep={hasSharedStep}
                  signer={signer}
                  step={signingSteps[index] ?? index + 1}
                  stepSize={
                    signingSteps.filter(
                      (step) => step === (signingSteps[index] ?? index + 1),
                    ).length
                  }
                />
              );
            })}
          </ol>

          <div className="flex flex-wrap items-center gap-3">
            <button
              className="inline-flex min-h-11 items-center justify-center rounded-[0.875rem] bg-(--accent-soft) px-4.5 text-sm font-bold text-(--accent-ink) transition hover:bg-(--accent-soft-hover) disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!canAddSigner || isSubmitting}
              onClick={handleAddSigner}
              type="button"
            >
              {copy.actions.addSigner}
            </button>
            {!canAddSigner ? (
              <p className="text-[0.8125rem] font-semibold text-(--tertiary)">
                {copy.actions.maximumReached}
              </p>
            ) : null}
          </div>

          <div className="space-y-3 pt-3">
            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-(--fg)">
                {copy.copyIntro.title}{" "}
                <span className="text-sm font-normal text-(--secondary)">
                  {copy.copyIntro.optional}
                </span>
              </h2>
              <p className="text-sm leading-6 text-(--secondary)">
                {copy.copyIntro.description}
              </p>
            </div>

            {copyRecipients.length > 0 ? (
              <ol className="space-y-3">
                {copyRecipients.map((recipient, index) => {
                  const errors =
                    errorsByCopyRecipientId[recipient.localId] ?? {};

                  return (
                    <CopyRecipientCard
                      copy={copy}
                      disabled={isSubmitting}
                      emailError={
                        showAllErrors || recipient.touched.email
                          ? errors.email
                          : undefined
                      }
                      index={index}
                      key={recipient.localId}
                      nameError={
                        showAllErrors || recipient.touched.name
                          ? errors.name
                          : undefined
                      }
                      onBlur={(field) =>
                        handleCopyRecipientBlur(recipient.localId, field)
                      }
                      onChange={(field, value) =>
                        handleCopyRecipientChange(recipient.localId, {
                          [field]: value,
                        })
                      }
                      onRemove={() =>
                        handleRemoveCopyRecipient(recipient.localId)
                      }
                      recipient={recipient}
                    />
                  );
                })}
              </ol>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <button
                className="btn-quiet min-h-11 px-4.5"
                disabled={!canAddCopyRecipient || isSubmitting}
                onClick={handleAddCopyRecipient}
                type="button"
              >
                {copy.actions.addCopy}
              </button>
              {!canAddCopyRecipient ? (
                <p className="text-[0.8125rem] font-semibold text-(--tertiary)">
                  {copy.actions.maximumReached}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            {/* The document is part of the draft and is not uploaded again,
                so Back goes to this draft's own page, where it can be
                continued or deleted, not to a blank upload form. */}
            <ShellButton href={`/envelopes/${envelopeId}`} variant="secondary">
              {copy.actions.back}
            </ShellButton>
            <ShellButton
              disabled={!canContinue}
              loading={isSubmitting}
              onClick={handleContinue}
            >
              {copy.actions.next}
            </ShellButton>
          </div>
        </div>
      </section>
    </div>
  );
}
