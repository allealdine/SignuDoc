"use client";

import { useEffect, useState } from "react";
import { formatMessage } from "@/lib/i18n/format.ts";
import type { Messages } from "@/lib/i18n/locales/en.ts";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";
import type { SystemAuditEvent } from "@/lib/services/system-audit";
import {
  SESSION_IDLE_CHOICES,
  SESSION_MAX_HOURS_CHOICES,
} from "@/lib/session-choices";

type SecurityCopy = Messages["settings"]["security"];
type AuditCopy = SecurityCopy["audit"];

// Sign-in security and the install's own audit trail. Administrators only.

type AuditResponse = {
  chain?:
    | { events: number; ok: true }
    | { brokenAtSequence: number; events: number; ok: false };
  error?: string;
  events?: SystemAuditEvent[];
} | null;

const AUDIT_EVENT_KEYS: Record<
  SystemAuditEvent["event"],
  keyof AuditCopy["eventLabels"]
> = {
  account_closure_requested: "accountClosureRequested",
  account_deleted: "accountDeleted",
  api_key_created: "apiKeyCreated",
  api_key_revoked: "apiKeyRevoked",
  email_domain_changed: "emailDomainChanged",
  embed_origin_added: "embedOriginAdded",
  embed_origin_removed: "embedOriginRemoved",
  envelope_deleted: "envelopeDeleted",
  envelope_deletion_cancelled: "envelopeDeletionCancelled",
  envelope_deletion_scheduled: "envelopeDeletionScheduled",
  envelope_file_downloaded: "envelopeFileDownloaded",
  identity_verification_revoked: "identityVerificationRevoked",
  identity_verified: "identityVerified",
  logo_changed: "logoChanged",
  part11_mode_changed: "part11ModeChanged",
  password_changed: "passwordChanged",
  password_reset: "passwordReset",
  reauthentication_failed: "reauthenticationFailed",
  role_changed: "roleChanged",
  settings_changed: "settingsChanged",
  sign_in_failed: "signInFailed",
  sign_in_locked: "signInLocked",
  sign_in_succeeded: "signInSucceeded",
  sessions_revoked: "sessionsRevoked",
  signed_out: "signedOut",
  signing_locked: "signingLocked",
  signing_unlocked: "signingUnlocked",
  two_factor_backup_codes_regenerated: "twoFactorBackupCodesRegenerated",
  two_factor_disabled: "twoFactorDisabled",
  two_factor_enabled: "twoFactorEnabled",
  two_factor_requirement_changed: "twoFactorRequirementChanged",
  two_factor_reset: "twoFactorReset",
  webhook_endpoint_changed: "webhookEndpointChanged",
  webhook_endpoint_created: "webhookEndpointCreated",
  webhook_endpoint_deleted: "webhookEndpointDeleted",
};

const SIGN_IN_FAILURE_KEYS: Record<string, keyof AuditCopy["failureReasons"]> =
  {
    ACCOUNT_TEMPORARILY_LOCKED: "accountTemporarilyLocked",
    EMAIL_NOT_VERIFIED: "emailNotVerified",
    INVALID_BACKUP_CODE: "invalidBackupCode",
    INVALID_CODE: "invalidCode",
    INVALID_EMAIL_OR_PASSWORD: "invalidEmailOrPassword",
    TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: "tooManyAttempts",
  };

function describeEvent(event: SystemAuditEvent, copy: AuditCopy): string {
  const metadata = event.metadata ?? {};
  const target =
    typeof metadata.targetName === "string"
      ? `${metadata.targetName}${typeof metadata.targetEmail === "string" ? ` <${metadata.targetEmail}>` : ""}`
      : null;

  switch (event.event) {
    case "part11_mode_changed":
    case "two_factor_requirement_changed":
      return metadata.to === true
        ? copy.details.turnedOnShort
        : copy.details.turnedOffShort;
    case "role_changed":
      return formatMessage(copy.details.roleChange, {
        target: target ?? copy.details.account,
        from: String(metadata.from),
        to: String(metadata.to),
      });
    case "settings_changed":
      return typeof metadata.changes === "object" && metadata.changes
        ? Object.keys(metadata.changes).join(", ")
        : "";
    case "identity_verified":
      return `${target ?? ""}${typeof metadata.note === "string" ? `: ${metadata.note}` : ""}`;
    case "reauthentication_failed":
    case "signing_locked":
      return typeof metadata.failedAttempts === "number"
        ? formatMessage(copy.failedAttempts, {
            count: metadata.failedAttempts,
          })
        : "";
    case "sign_in_failed":
      return typeof metadata.reason === "string"
        ? (copy.failureReasons[SIGN_IN_FAILURE_KEYS[metadata.reason]] ??
            metadata.reason)
        : "";
    case "sign_in_succeeded":
      return metadata.secondStep === "backup_code"
        ? copy.signInMethods.backupCode
        : metadata.secondStep === "authenticator"
          ? copy.signInMethods.authenticator
          : "";
    case "logo_changed":
      return metadata.action === "removed"
        ? copy.details.logoRemoved
        : copy.details.logoReplaced;
    case "email_domain_changed":
      return typeof metadata.domain === "string" ? metadata.domain : "";
    case "api_key_created":
    case "api_key_revoked":
      return [
        typeof metadata.name === "string" ? metadata.name : null,
        typeof metadata.prefix === "string" ? `${metadata.prefix}…` : null,
        metadata.reason === "role_removed"
          ? copy.details.ownerNoLongerAdmin
          : null,
      ]
        .filter(Boolean)
        .join(", ");
    case "embed_origin_added":
    case "embed_origin_removed":
      return typeof metadata.origin === "string" ? metadata.origin : "";
    case "webhook_endpoint_created":
    case "webhook_endpoint_changed":
    case "webhook_endpoint_deleted":
      return [
        typeof metadata.url === "string" ? metadata.url : null,
        Array.isArray(metadata.events)
          ? formatMessage(copy.eventsPrefix, {
              events: metadata.events
                .filter((type) => typeof type === "string")
                .join(", "),
            })
          : null,
        metadata.secretRotated === true ? copy.details.newSecret : null,
        metadata.enabled === false
          ? copy.details.turnedOff
          : metadata.enabled === true
            ? copy.details.turnedOn
            : null,
      ]
        .filter(Boolean)
        .join(", ");
    case "envelope_deleted":
      return [
        typeof metadata.title === "string" ? `"${metadata.title}"` : null,
        typeof metadata.status === "string" ? metadata.status : null,
        typeof metadata.reason === "string" ? metadata.reason : null,
        typeof metadata.ownerEmail === "string"
          ? formatMessage(copy.sentBy, { email: metadata.ownerEmail })
          : null,
      ]
        .filter(Boolean)
        .join(", ");
    case "envelope_deletion_scheduled":
    case "envelope_deletion_cancelled":
      return [
        typeof metadata.title === "string" ? `"${metadata.title}"` : null,
        typeof metadata.deleteAfter === "number"
          ? formatMessage(
              event.event === "envelope_deletion_scheduled"
                ? copy.deletion.scheduled
                : copy.deletion.cancelled,
              {
                date: new Date(metadata.deleteAfter * 1000)
                  .toISOString()
                  .slice(0, 10),
              },
            )
          : null,
        typeof metadata.reason === "string" ? metadata.reason : null,
        typeof metadata.ownerEmail === "string"
          ? formatMessage(copy.sentBy, { email: metadata.ownerEmail })
          : null,
      ]
        .filter(Boolean)
        .join(", ");
    case "envelope_file_downloaded":
      return [
        typeof metadata.file === "string"
          ? (copy.downloadFiles[DOWNLOADED_FILE_KEYS[metadata.file]] ??
            metadata.file)
          : null,
        typeof metadata.ownerEmail === "string"
          ? formatMessage(copy.sentBy, { email: metadata.ownerEmail })
          : null,
      ]
        .filter(Boolean)
        .join(", ");
    default:
      return target ?? "";
  }
}

const DOWNLOADED_FILE_KEYS: Record<string, keyof AuditCopy["downloadFiles"]> = {
  audit_trail: "auditTrail",
  evidence: "certificate",
  original: "documentAsSent",
  signed: "signedPdf",
};

function describeMinutes(
  minutes: number,
  copy: SecurityCopy["durations"],
): string {
  return minutes < 60
    ? formatMessage(copy.minutes, { count: minutes })
    : minutes === 60
      ? copy.hour
      : formatMessage(copy.hours, { count: minutes / 60 });
}

function describeHours(hours: number, copy: SecurityCopy["durations"]): string {
  return hours % 24 === 0
    ? hours === 24
      ? copy.day
      : formatMessage(copy.days, { count: hours / 24 })
    : formatMessage(copy.hours, { count: hours });
}

export function SecurityPanel({
  initialRequireTwoFactor,
  initialSessionIdleMinutes,
  initialSessionMaxHours,
}: {
  initialRequireTwoFactor: boolean;
  initialSessionIdleMinutes: number | null;
  initialSessionMaxHours: number | null;
}) {
  const copy = useMessages().messages.settings.security;
  const [requireTwoFactor, setRequireTwoFactor] = useState(
    initialRequireTwoFactor,
  );
  const [savedLimits, setSavedLimits] = useState({
    sessionIdleMinutes: initialSessionIdleMinutes,
    sessionMaxHours: initialSessionMaxHours,
  });
  const [limits, setLimits] = useState(savedLimits);
  const [limitsMessage, setLimitsMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [audit, setAudit] = useState<AuditResponse>(null);
  const [auditRevision, setAuditRevision] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/admin/audit", { signal: controller.signal })
      .then(async (response) => {
        const payload = (await response
          .json()
          .catch(() => null)) as AuditResponse;

        setAudit(
          response.ok
            ? payload
            : { error: payload?.error ?? copy.genericError },
        );
      })
      .catch((loadError: unknown) => {
        if (
          !(
            loadError instanceof DOMException && loadError.name === "AbortError"
          )
        ) {
          setAudit({ error: copy.genericError });
        }
      });

    return () => controller.abort();
  }, [auditRevision]);

  async function changeRequirement(next: boolean) {
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/security", {
        body: JSON.stringify({ requireTwoFactor: next }),
        headers: { "content-type": "application/json" },
        method: "PUT",
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        requireTwoFactor?: boolean;
      } | null;

      if (!response.ok || typeof payload?.requireTwoFactor !== "boolean") {
        setError(payload?.error ?? copy.genericError);
        return;
      }

      setRequireTwoFactor(payload.requireTwoFactor);
      setAuditRevision((value) => value + 1);
    } catch {
      setError(copy.genericError);
    } finally {
      setIsSaving(false);
    }
  }

  async function saveLimits() {
    setIsSaving(true);
    setError(null);
    setLimitsMessage(null);

    try {
      const response = await fetch("/api/admin/security", {
        body: JSON.stringify(limits),
        headers: { "content-type": "application/json" },
        method: "PUT",
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        sessionIdleMinutes?: number | null;
        sessionMaxHours?: number | null;
      } | null;

      if (!response.ok || payload?.sessionIdleMinutes === undefined) {
        setError(payload?.error ?? copy.genericError);
        return;
      }

      const saved = {
        sessionIdleMinutes: payload.sessionIdleMinutes,
        sessionMaxHours: payload.sessionMaxHours ?? null,
      };

      setSavedLimits(saved);
      setLimits(saved);
      setLimitsMessage(copy.success);
      setAuditRevision((value) => value + 1);
    } catch {
      setError(copy.genericError);
    } finally {
      setIsSaving(false);
    }
  }

  const limitsChanged =
    limits.sessionIdleMinutes !== savedLimits.sessionIdleMinutes ||
    limits.sessionMaxHours !== savedLimits.sessionMaxHours;

  return (
    <div className="space-y-5 border-t border-(--border) pt-8" id="security">
      <div className="space-y-2">
        <h3 className="text-lg font-extrabold tracking-[-0.02em] text-(--fg)">
          {copy.title}
        </h3>
        <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
          {copy.description}
        </p>
      </div>

      {error ? (
        <div className="notice notice-danger" role="alert">
          {error}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`pill ${requireTwoFactor ? "pill-success" : "pill-neutral"}`}
        >
          {requireTwoFactor ? copy.required : copy.optional}
        </span>
        <button
          className={
            requireTwoFactor ? "btn-quiet btn-quiet-danger" : "btn-quiet"
          }
          disabled={isSaving}
          onClick={() => void changeRequirement(!requireTwoFactor)}
          type="button"
        >
          {isSaving
            ? copy.saving
            : requireTwoFactor
              ? copy.stopRequiring
              : copy.require}
        </button>
      </div>

      <div className="space-y-3">
        <h4 className="text-[0.9375rem] font-bold text-(--fg)">
          {copy.sessions.title}
        </h4>
        <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
          {copy.sessions.description}
        </p>
        <div className="grid max-w-xl gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5">
            <span className="text-[0.8125rem] font-semibold text-(--secondary)">
              {copy.sessions.idleLabel}
            </span>
            <select
              className="field-input"
              disabled={isSaving}
              onChange={(event) => {
                setLimitsMessage(null);
                setLimits((current) => ({
                  ...current,
                  sessionIdleMinutes:
                    event.target.value === ""
                      ? null
                      : Number(event.target.value),
                }));
              }}
              value={limits.sessionIdleMinutes ?? ""}
            >
              <option value="">{copy.sessions.never}</option>
              {SESSION_IDLE_CHOICES.map((minutes) => (
                <option key={minutes} value={minutes}>
                  {describeMinutes(minutes, copy.durations)}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5">
            <span className="text-[0.8125rem] font-semibold text-(--secondary)">
              {copy.sessions.maxLabel}
            </span>
            <select
              className="field-input"
              disabled={isSaving}
              onChange={(event) => {
                setLimitsMessage(null);
                setLimits((current) => ({
                  ...current,
                  sessionMaxHours:
                    event.target.value === ""
                      ? null
                      : Number(event.target.value),
                }));
              }}
              value={limits.sessionMaxHours ?? ""}
            >
              <option value="">{copy.sessions.weekDefault}</option>
              {SESSION_MAX_HOURS_CHOICES.filter((hours) => hours !== 168).map(
                (hours) => (
                  <option key={hours} value={hours}>
                    {describeHours(hours, copy.durations)}
                  </option>
                ),
              )}
            </select>
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            className="btn-quiet"
            disabled={isSaving || !limitsChanged}
            onClick={() => void saveLimits()}
            type="button"
          >
            {isSaving ? copy.sessions.saving : copy.sessions.save}
          </button>
          {limitsMessage ? (
            <span className="text-sm text-(--secondary)" role="status">
              {limitsMessage}
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="text-[0.9375rem] font-bold text-(--fg)">
            {copy.audit.title}
          </h4>
          <div className="flex flex-wrap gap-2">
            <button
              className="btn-quiet"
              onClick={() => setAuditRevision((value) => value + 1)}
              type="button"
            >
              {copy.audit.refresh}
            </button>
            <a className="btn-quiet" href="/api/admin/audit?format=csv">
              {copy.audit.csv}
            </a>
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
          {copy.audit.description}
        </p>

        {audit?.error ? (
          <div className="notice notice-danger" role="alert">
            {audit.error}
          </div>
        ) : null}

        {audit?.chain ? (
          <p
            className={`notice ${audit.chain.ok ? "notice-success" : "notice-danger"}`}
            role="status"
          >
            {audit.chain.ok
              ? formatMessage(copy.audit.intact, { count: audit.chain.events })
              : formatMessage(copy.audit.broken, {
                  sequence: audit.chain.brokenAtSequence,
                })}
          </p>
        ) : null}

        {audit?.events ? (
          audit.events.length === 0 ? (
            <p className="text-sm text-(--secondary)">{copy.audit.empty}</p>
          ) : (
            <ul aria-label={copy.audit.chainAriaLabel} className="space-y-2">
              {audit.events.map((event) => (
                <li className="well p-3 text-sm" key={event.id}>
                  <p className="font-semibold text-(--fg)">
                    {copy.audit.eventLabels[AUDIT_EVENT_KEYS[event.event]] ??
                      event.event}
                    <span className="font-normal text-(--secondary)">
                      {" "}
                      {describeEvent(event, copy.audit)}
                    </span>
                  </p>
                  <p className="text-xs text-(--tertiary)">
                    {new Date(event.createdAt * 1000)
                      .toISOString()
                      .replace("T", " ")
                      .replace(/\.\d{3}Z$/, " UTC")}
                    {event.actorEmail ? ` · ${event.actorEmail}` : ""}
                    {event.ipAddress ? ` · ${event.ipAddress}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          )
        ) : null}
      </div>
    </div>
  );
}
