"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { ApiKeysPanel } from "@/components/settings/api-keys-panel";
import { BrandingPanel } from "@/components/settings/branding-panel";
import { EmbeddingPanel } from "@/components/settings/embedding-panel";
import { Part11Panel } from "@/components/settings/part11-panel";
import { PeoplePanel } from "@/components/settings/people-panel";
import { SecurityPanel } from "@/components/settings/security-panel";
import { SignerDataPanel } from "@/components/settings/signer-data-panel";
import { WebhooksPanel } from "@/components/settings/webhooks-panel";
import { FieldShell, ShellButton } from "@/components/shared/form-shell";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
  CUSTOM_DISCLOSURE_LEGAL_NOTE,
  CUSTOM_DISCLOSURE_NOTICE,
  tidyDisclosureText,
} from "@/lib/consent-disclosure-notice";
import type { EmailDnsRecord, EmailStatus } from "@/lib/email-status";
import { formatMessage } from "@/lib/i18n/format.ts";
import type { Messages } from "@/lib/i18n/locales/en.ts";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";
import type {
  OrganizationSettingsField,
  OrganizationSettingsView,
} from "@/lib/organization-settings";
import type { SignupMode } from "@/lib/signup-policy";

// The administrator's part of Settings: what the install is called, who can
// sign up, where email comes from, and whether email works yet.

const RESEND_DOMAINS_URL = "https://resend.com/domains";
const RESEND_MARKETPLACE_URL = "https://vercel.com/marketplace/resend";

type OrganizationCopy = Messages["settings"]["organization"];

type OrganizationSettingsProps = {
  initialSettings: OrganizationSettingsView;
};

type FormErrors = Partial<Record<OrganizationSettingsField, string>>;

type Feedback = {
  message: string;
  tone: "error" | "success";
} | null;

type SettingsResponse = {
  error?: string;
  fieldErrors?: FormErrors;
  settings?: OrganizationSettingsView;
} | null;

type EmailResponse = {
  error?: string;
  status?: EmailStatus;
  test?: { sent: true; to: string } | { sent: false; message: string };
} | null;

type EmailAction = "add_domain" | "recheck" | "send_test";

function signupModeOptions(
  copy: OrganizationCopy["signup"]["options"],
): Array<{ description: string; label: string; value: SignupMode }> {
  return [
    {
      description: copy.domains.description,
      label: copy.domains.label,
      value: "domains",
    },
    {
      description: copy.closed.description,
      label: copy.closed.label,
      value: "closed",
    },
    {
      description: copy.open.description,
      label: copy.open.label,
      value: "open",
    },
  ];
}

export function OrganizationSettings({
  initialSettings,
}: OrganizationSettingsProps) {
  const router = useRouter();
  const copy = useMessages().messages.settings.organization;
  const [values, setValues] = useState(initialSettings);
  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSaving, setIsSaving] = useState(false);
  // Bumped after a save, so the email panel looks again: a new sender
  // address means a different domain to check.
  const [emailRevision, setEmailRevision] = useState(0);
  // The disclosure as last saved, to tell whether a save changes it.
  const [savedConsentDisclosure, setSavedConsentDisclosure] = useState(
    initialSettings.consentDisclosure,
  );
  const [isDisclosureNoticeOpen, setIsDisclosureNoticeOpen] = useState(false);

  function handleChange(field: OrganizationSettingsField) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;

      setValues((currentValues) => ({ ...currentValues, [field]: nextValue }));
      setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
      setFeedback(null);
    };
  }

  function setConsentDisclosure(consentDisclosure: string) {
    setValues((currentValues) => ({ ...currentValues, consentDisclosure }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      consentDisclosure: undefined,
    }));
    setFeedback(null);
  }

  function handleBrandColorChange(brandColor: string) {
    setValues((currentValues) => ({ ...currentValues, brandColor }));
    setErrors((currentErrors) => ({ ...currentErrors, brandColor: undefined }));
    setFeedback(null);
  }

  function handleSignupModeChange(signupMode: SignupMode) {
    setValues((currentValues) => ({ ...currentValues, signupMode }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      allowedEmailDomains: undefined,
      signupMode: undefined,
    }));
    setFeedback(null);
  }

  /**
   * Whether saving puts the administrator's own words in place of what
   * signers read now, which needs them to agree to the notice first. Going
   * back to the standard text, or saving the same words again, does not.
   */
  function savingChangesToOwnDisclosure(): boolean {
    const next = tidyDisclosureText(values.consentDisclosure);

    return (
      !values.hosted &&
      next.length > 0 &&
      next !== tidyDisclosureText(values.defaultConsentDisclosure) &&
      next !== tidyDisclosureText(savedConsentDisclosure)
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    if (savingChangesToOwnDisclosure()) {
      setIsDisclosureNoticeOpen(true);
      return;
    }

    void saveSettings(false);
  }

  async function saveSettings(disclosureNoticeAgreed: boolean) {
    setIsDisclosureNoticeOpen(false);
    setErrors({});
    setFeedback(null);
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/settings", {
        body: JSON.stringify({
          allowedEmailDomains: values.allowedEmailDomains,
          brandColor: values.brandColor,
          consentDisclosure: values.consentDisclosure,
          consentDisclosureAcknowledged: disclosureNoticeAgreed,
          organizationName: values.organizationName,
          privacyUrl: values.privacyUrl,
          retentionDays: values.retentionDays,
          senderAddress: values.senderAddress,
          signupMode: values.signupMode,
          supportAddress: values.supportAddress,
          termsUrl: values.termsUrl,
        }),
        headers: { "content-type": "application/json" },
        method: "PUT",
      });
      const payload = (await response
        .json()
        .catch(() => null)) as SettingsResponse;

      if (!response.ok || !payload?.settings) {
        setErrors(payload?.fieldErrors ?? {});
        setFeedback({
          message: payload?.error ?? copy.genericError,
          tone: "error",
        });
        return;
      }

      setValues(payload.settings);
      setSavedConsentDisclosure(payload.settings.consentDisclosure);
      setEmailRevision((revision) => revision + 1);
      setFeedback({ message: copy.saved, tone: "success" });
      // The header and the accent color come from the layout around this
      // page, which only looks them up again when asked to.
      router.refresh();
    } catch {
      setFeedback({ message: copy.genericError, tone: "error" });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section
      className="panel scroll-mt-6 p-6 sm:p-8"
      data-animate="enter"
      data-animate-delay="2"
      id="organization"
    >
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="section-eyebrow">{copy.header.eyebrow}</p>
          <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-(--fg)">
            {copy.header.title}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
            {copy.header.description}
          </p>
        </div>

        {feedback ? (
          <p
            className={`notice ${
              feedback.tone === "success" ? "notice-success" : "notice-danger"
            }`}
            role={feedback.tone === "error" ? "alert" : "status"}
          >
            {feedback.message}
          </p>
        ) : null}

        <form className="space-y-8" noValidate onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldShell
              disabled={isSaving}
              error={errors.organizationName}
              helper={copy.name.helper}
              label={copy.name.label}
              name="organization-name"
              onChange={handleChange("organizationName")}
              readOnly={false}
              value={values.organizationName}
            />
          </div>

          {/* The hosted service runs under its own name, mark and color. */}
          {!values.hosted ? (
            <BrandingPanel
              brandColor={values.brandColor}
              brandColorError={errors.brandColor}
              disabled={isSaving}
              logoUrl={values.logoUrl}
              onBrandColorChange={handleBrandColorChange}
              onLogoChange={(logoUrl) =>
                setValues((currentValues) => ({ ...currentValues, logoUrl }))
              }
            />
          ) : null}

          <fieldset className="space-y-4 border-t border-(--border) pt-8">
            <legend className="float-left mb-4 w-full text-lg font-extrabold tracking-[-0.02em] text-(--fg)">
              {copy.signup.legend}
            </legend>
            <p className="clear-both max-w-2xl text-sm leading-6 text-(--secondary)">
              {values.part11Mode ? copy.signup.part11Note : copy.signup.note}
            </p>
            <div className="space-y-3">
              {signupModeOptions(copy.signup.options).map((option) => (
                <label
                  className="flex cursor-pointer items-start gap-3 rounded-2xl bg-(--surface) px-4 py-3.5 ring-2 ring-transparent transition has-[:checked]:bg-(--accent-softer) has-[:checked]:ring-(--accent)"
                  key={option.value}
                >
                  <input
                    checked={values.signupMode === option.value}
                    className="mt-1 size-4 accent-(--accent)"
                    disabled={isSaving}
                    name="signup-mode"
                    onChange={() => handleSignupModeChange(option.value)}
                    type="radio"
                    value={option.value}
                  />
                  <span className="space-y-1">
                    <span className="block text-sm font-bold text-(--fg)">
                      {option.label}
                    </span>
                    <span className="block text-sm leading-6 text-(--secondary)">
                      {option.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            {values.signupMode === "domains" || errors.allowedEmailDomains ? (
              <div className="max-w-xl">
                <FieldShell
                  disabled={isSaving}
                  error={errors.allowedEmailDomains}
                  helper={copy.signup.domains.helper}
                  label={copy.signup.domains.label}
                  name="allowed-email-domains"
                  onChange={handleChange("allowedEmailDomains")}
                  placeholder={copy.signup.domains.placeholder}
                  readOnly={false}
                  value={values.allowedEmailDomains}
                />
              </div>
            ) : null}
          </fieldset>

          <div className="space-y-5 border-t border-(--border) pt-8">
            <h3 className="text-lg font-extrabold tracking-[-0.02em] text-(--fg)">
              {copy.addresses.title}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <FieldShell
                disabled={isSaving || values.senderAddressFromEnv}
                error={errors.senderAddress}
                helper={
                  values.senderAddressFromEnv
                    ? copy.addresses.sender.envHelper
                    : copy.addresses.sender.helper
                }
                label={copy.addresses.sender.label}
                name="sender-address"
                onChange={handleChange("senderAddress")}
                placeholder={copy.addresses.sender.placeholder}
                readOnly={values.senderAddressFromEnv}
                type="email"
                value={values.senderAddress}
              />
              <FieldShell
                disabled={isSaving || values.supportAddressFromEnv}
                error={errors.supportAddress}
                helper={
                  values.supportAddressFromEnv
                    ? copy.addresses.support.envHelper
                    : copy.addresses.support.helper
                }
                label={copy.addresses.support.label}
                name="support-address"
                onChange={handleChange("supportAddress")}
                placeholder={copy.addresses.support.placeholder}
                readOnly={values.supportAddressFromEnv}
                type="email"
                value={values.supportAddress}
              />
            </div>
          </div>

          {!values.hosted ? (
            <div className="space-y-5 border-t border-(--border) pt-8">
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold tracking-[-0.02em] text-(--fg)">
                  {copy.legalLinks.title}
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
                  {copy.legalLinks.description}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldShell
                  disabled={isSaving}
                  error={errors.termsUrl}
                  label={copy.legalLinks.terms.label}
                  name="terms-url"
                  onChange={handleChange("termsUrl")}
                  placeholder={copy.legalLinks.terms.placeholder}
                  readOnly={false}
                  value={values.termsUrl}
                />
                <FieldShell
                  disabled={isSaving}
                  error={errors.privacyUrl}
                  label={copy.legalLinks.privacy.label}
                  name="privacy-url"
                  onChange={handleChange("privacyUrl")}
                  placeholder={copy.legalLinks.privacy.placeholder}
                  readOnly={false}
                  value={values.privacyUrl}
                />
              </div>
              <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
                {copy.legalLinks.notice.before}
                <a
                  className="font-semibold text-(--accent-ink) underline decoration-[rgb(var(--accent-rgb)/0.35)] underline-offset-4"
                  href="/signer-privacy"
                  target="_blank"
                  rel="noopener"
                >
                  {copy.legalLinks.notice.link}
                </a>
                {copy.legalLinks.notice.after}
              </p>
            </div>
          ) : null}

          {!values.hosted ? (
            <div className="space-y-5 border-t border-(--border) pt-8">
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold tracking-[-0.02em] text-(--fg)">
                  {copy.disclosure.title}
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
                  {copy.disclosure.description}
                </p>
              </div>
              <Field className="gap-2 text-sm">
                <FieldLabel
                  className="text-[0.8125rem] font-semibold text-(--secondary)"
                  htmlFor="consent-disclosure"
                >
                  {copy.disclosure.label}
                </FieldLabel>
                <Textarea
                  aria-describedby="consent-disclosure-description"
                  aria-invalid={errors.consentDisclosure ? true : undefined}
                  className={
                    errors.consentDisclosure
                      ? "min-h-48 border-(--danger)"
                      : "min-h-48"
                  }
                  disabled={isSaving}
                  id="consent-disclosure"
                  maxLength={6000}
                  name="consent-disclosure"
                  onChange={(event) => setConsentDisclosure(event.target.value)}
                  placeholder={copy.disclosure.placeholder}
                  value={values.consentDisclosure}
                />
                {errors.consentDisclosure ? (
                  <FieldError
                    className="text-xs font-semibold text-(--danger)"
                    id="consent-disclosure-description"
                  >
                    {errors.consentDisclosure}
                  </FieldError>
                ) : (
                  <FieldDescription
                    className="text-xs leading-5 text-(--tertiary)"
                    id="consent-disclosure-description"
                  >
                    {copy.disclosure.formatHelp}
                  </FieldDescription>
                )}
                <p className="text-xs leading-5 text-(--secondary)">
                  {CUSTOM_DISCLOSURE_LEGAL_NOTE}
                </p>
              </Field>
              <div className="flex flex-wrap gap-3">
                <ShellButton
                  disabled={isSaving}
                  onClick={() =>
                    setConsentDisclosure(values.defaultConsentDisclosure)
                  }
                  variant="secondary"
                >
                  {copy.disclosure.startFromStandard}
                </ShellButton>
                {values.consentDisclosure.length > 0 ? (
                  <ShellButton
                    disabled={isSaving}
                    onClick={() => setConsentDisclosure("")}
                    variant="ghost"
                  >
                    {copy.disclosure.useStandard}
                  </ShellButton>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="space-y-5 border-t border-(--border) pt-8">
            <div className="space-y-2">
              <h3 className="text-lg font-extrabold tracking-[-0.02em] text-(--fg)">
                {copy.retention.title}
              </h3>
              <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
                {copy.retention.description}
              </p>
            </div>
            <div className="max-w-xs">
              <FieldShell
                disabled={isSaving || values.part11Mode}
                error={errors.retentionDays}
                helper={
                  values.part11Mode ? copy.retention.part11Helper : undefined
                }
                label={copy.retention.label}
                name="retention-days"
                onChange={handleChange("retentionDays")}
                placeholder={copy.retention.placeholder}
                readOnly={false}
                value={values.retentionDays}
              />
            </div>
          </div>

          <ShellButton className="w-fit" loading={isSaving} type="submit">
            {isSaving ? copy.save.saving : copy.save.label}
          </ShellButton>
        </form>

        {isDisclosureNoticeOpen ? (
          <Dialog
            open
            onOpenChange={(open) => {
              if (!open) {
                setIsDisclosureNoticeOpen(false);
              }
            }}
          >
            <DialogContent
              className="max-h-[calc(100dvh-2rem)] max-w-lg overflow-y-auto sm:p-8"
              showCloseButton={false}
            >
              <DialogHeader className="space-y-3">
                <DialogTitle>{CUSTOM_DISCLOSURE_NOTICE.title}</DialogTitle>
                <DialogDescription asChild>
                  <div className="space-y-3 text-sm leading-6 text-(--secondary)">
                    {CUSTOM_DISCLOSURE_NOTICE.paragraphs.map((paragraph) => (
                      <p key={paragraph.text}>
                        {paragraph.lead ? (
                          <strong className="font-bold text-(--fg)">
                            {paragraph.lead}{" "}
                          </strong>
                        ) : null}
                        {paragraph.text}
                      </p>
                    ))}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-3 sm:justify-end">
                <ShellButton
                  onClick={() => setIsDisclosureNoticeOpen(false)}
                  variant="secondary"
                >
                  {copy.disclosure.cancel}
                </ShellButton>
                <ShellButton onClick={() => void saveSettings(true)}>
                  {CUSTOM_DISCLOSURE_NOTICE.agree}
                </ShellButton>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : null}

        <EmailSetupPanel key={emailRevision} />

        {/* The hosted service's accounts are strangers to each other, not
            one organization, so it has no list of them here. */}
        {!values.hosted ? <PeoplePanel part11Mode={values.part11Mode} /> : null}

        {!values.hosted ? (
          <SecurityPanel
            initialRequireTwoFactor={values.requireTwoFactor}
            initialSessionIdleMinutes={values.sessionIdleMinutes}
            initialSessionMaxHours={values.sessionMaxHours}
          />
        ) : null}

        {!values.hosted ? (
          <Part11Panel initialEnabled={values.part11Mode} />
        ) : null}

        {!values.hosted ? <ApiKeysPanel /> : null}

        {!values.hosted ? <WebhooksPanel /> : null}

        {!values.hosted ? <EmbeddingPanel /> : null}

        <SignerDataPanel />
      </div>
    </section>
  );
}

async function fetchEmailStatus(
  signal: AbortSignal,
  fallback: string,
): Promise<{ error: string; status: null } | { status: EmailStatus }> {
  const response = await fetch("/api/admin/email", { signal });
  const payload = (await response.json().catch(() => null)) as EmailResponse;

  if (!response.ok || !payload?.status) {
    return { error: payload?.error ?? fallback, status: null };
  }

  return { status: payload.status };
}

function EmailSetupPanel() {
  const organizationCopy = useMessages().messages.settings.organization;
  const copy = organizationCopy.email;
  const [status, setStatus] = useState<EmailStatus | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<EmailAction | null>(null);
  const [testResult, setTestResult] = useState<Feedback>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchEmailStatus(controller.signal, organizationCopy.genericError)
      .then((result) => {
        if (result.status) {
          setLoadError(null);
          setStatus(result.status);
        } else {
          setLoadError(result.error);
        }
      })
      .catch((error: unknown) => {
        // Leaving the page cancels the request; that is not a failure.
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setLoadError(organizationCopy.genericError);
        }
      });

    return () => controller.abort();
  }, []);

  async function runAction(action: EmailAction) {
    if (pendingAction) {
      return;
    }

    setPendingAction(action);
    setTestResult(null);

    try {
      const response = await fetch("/api/admin/email", {
        body: JSON.stringify({ action }),
        headers: { "content-type": "application/json" },
        method: "POST",
      });
      const payload = (await response
        .json()
        .catch(() => null)) as EmailResponse;

      if (payload?.status) {
        setLoadError(null);
        setStatus(payload.status);
      }

      if (payload?.test) {
        setTestResult(
          payload.test.sent
            ? {
                message: formatMessage(copy.testSent, { to: payload.test.to }),
                tone: "success",
              }
            : { message: payload.test.message, tone: "error" },
        );
      } else if (!response.ok) {
        setLoadError(payload?.error ?? organizationCopy.genericError);
      }
    } catch {
      setLoadError(organizationCopy.genericError);
    } finally {
      setPendingAction(null);
    }
  }

  const summary = status ? describeEmailStatus(status, copy) : null;
  const canSendTest =
    status !== null &&
    status.state !== "missing_key" &&
    status.state !== "capture";

  return (
    <div className="space-y-5 border-t border-(--border) pt-8" id="email-setup">
      <h3 className="text-lg font-extrabold tracking-[-0.02em] text-(--fg)">
        {copy.title}
      </h3>

      {loadError ? (
        <p className="notice notice-danger" role="alert">
          {loadError}
        </p>
      ) : null}

      {!summary ? (
        loadError ? null : (
          <p className="text-sm text-(--secondary)">{copy.checkingEmail}</p>
        )
      ) : (
        <div
          className={`space-y-2 rounded-2xl px-5 py-4 ${
            summary.ready ? "bg-(--success-soft)" : "bg-(--surface)"
          }`}
          data-email-state={status?.state}
        >
          <p className="text-sm font-bold text-(--fg)">{summary.title}</p>
          {summary.lines.map((line) => (
            <p className="text-sm leading-6 text-(--secondary)" key={line}>
              {line}
            </p>
          ))}
          {summary.steps ? (
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-(--secondary) marker:font-semibold marker:text-(--fg)">
              {summary.steps.map((step) => (
                <li key={step.text}>
                  {step.text}
                  {step.link ? (
                    <>
                      {" "}
                      <a
                        className="font-semibold text-(--accent-ink) underline underline-offset-4"
                        href={step.link.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {step.link.label}
                      </a>
                    </>
                  ) : null}
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      )}

      {status?.state === "domain_pending" ? (
        <DnsRecordsTable domain={status.domain} records={status.records} />
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {status?.state === "domain_missing" ? (
          <ShellButton
            disabled={pendingAction !== null}
            loading={pendingAction === "add_domain"}
            onClick={() => void runAction("add_domain")}
          >
            {pendingAction === "add_domain"
              ? copy.adding
              : formatMessage(copy.setUp, { domain: status.domain })}
          </ShellButton>
        ) : null}
        {status?.state === "domain_pending" ? (
          <ShellButton
            disabled={pendingAction !== null}
            loading={pendingAction === "recheck"}
            onClick={() => void runAction("recheck")}
          >
            {pendingAction === "recheck" ? copy.checking : copy.checkRecords}
          </ShellButton>
        ) : null}
        {canSendTest ? (
          <ShellButton
            disabled={pendingAction !== null}
            loading={pendingAction === "send_test"}
            onClick={() => void runAction("send_test")}
            variant="secondary"
          >
            {pendingAction === "send_test" ? copy.sending : copy.sendTest}
          </ShellButton>
        ) : null}
        {status?.state === "restricted_key" ||
        status?.state === "error" ||
        status?.state === "test_sender" ? (
          <ShellButton href={RESEND_DOMAINS_URL} variant="ghost">
            {copy.openResend}
          </ShellButton>
        ) : null}
      </div>

      {testResult ? (
        <p
          className={`notice ${
            testResult.tone === "success" ? "notice-success" : "notice-danger"
          }`}
          role={testResult.tone === "error" ? "alert" : "status"}
        >
          {testResult.message}
        </p>
      ) : null}
    </div>
  );
}

type EmailStep = {
  link?: { href: string; label: string };
  text: string;
};

function describeEmailStatus(
  status: EmailStatus,
  copy: OrganizationCopy["email"],
): {
  lines: string[];
  ready: boolean;
  steps?: EmailStep[];
  title: string;
} {
  switch (status.state) {
    case "capture":
      return {
        lines: [copy.states.capture.line],
        ready: true,
        title: copy.states.capture.title,
      };
    case "missing_key":
      return status.onVercel
        ? {
            lines: [copy.states.missingKey.line],
            ready: false,
            steps: [
              {
                link: {
                  href: RESEND_MARKETPLACE_URL,
                  label: copy.states.missingKey.steps.marketplace.label,
                },
                text: copy.states.missingKey.steps.marketplace.text,
              },
              {
                text: copy.states.missingKey.steps.variable,
              },
              {
                text: copy.states.missingKey.steps.redeploy,
              },
              {
                text: copy.states.missingKey.steps.reload,
              },
            ],
            title: copy.states.missingKey.title,
          }
        : {
            lines: [copy.states.missingKey.line],
            ready: false,
            steps: [
              {
                link: {
                  href: "https://resend.com/api-keys",
                  label: copy.states.missingKey.steps.resendKeys.label,
                },
                text: copy.states.missingKey.steps.resendKeys.text,
              },
              {
                text: copy.states.missingKey.steps.variableNonVercel,
              },
              { text: copy.states.missingKey.steps.restart },
            ],
            title: copy.states.missingKey.title,
          };
    case "test_sender":
      return {
        lines: [
          formatMessage(copy.states.testSender.firstLine, {
            senderAddress: status.senderAddress,
          }),
          copy.states.testSender.secondLine,
        ],
        ready: false,
        title: copy.states.testSender.title,
      };
    case "domain_missing":
      return {
        lines: [
          formatMessage(copy.states.domainMissing.line, {
            domain: status.domain,
          }),
        ],
        ready: false,
        title: formatMessage(copy.states.domainMissing.title, {
          domain: status.domain,
        }),
      };
    case "domain_pending":
      return {
        lines: [
          formatMessage(copy.states.domainPending.line, {
            domain: status.domain,
          }),
          ...(status.mayAlreadySend
            ? [copy.states.domainPending.mayAlreadySend]
            : []),
        ],
        ready: false,
        title: formatMessage(copy.states.domainPending.title, {
          domain: status.domain,
        }),
      };
    case "restricted_key":
      return {
        lines: [
          formatMessage(copy.states.restrictedKey.line, {
            domain: status.domain,
          }),
          copy.states.restrictedKey.secondLine,
        ],
        ready: false,
        title: copy.states.restrictedKey.title,
      };
    case "ready":
      return {
        lines: [
          formatMessage(copy.states.ready.line, {
            senderAddress: status.senderAddress,
            domain: status.domain,
          }),
        ],
        ready: true,
        title: copy.states.ready.title,
      };
    case "error":
      return {
        lines: [
          formatMessage(copy.states.error.line, { message: status.message }),
        ],
        ready: false,
        title: copy.states.error.title,
      };
  }
}

function DnsRecordsTable({
  domain,
  records,
}: {
  domain: string;
  records: readonly EmailDnsRecord[];
}) {
  const copy = useMessages().messages.settings.organization.email.dns;

  if (records.length === 0) {
    return (
      <p className="text-sm leading-6 text-(--secondary)">
        {formatMessage(copy.empty, { domain })}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-(--border)">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="sr-only">
          {formatMessage(copy.caption, { domain })}
        </caption>
        <thead>
          <tr className="border-b border-(--border) bg-(--surface) text-xs text-(--tertiary)">
            <th className="px-4 py-3 font-semibold" scope="col">
              {copy.type}
            </th>
            <th className="px-4 py-3 font-semibold" scope="col">
              {copy.name}
            </th>
            <th className="px-4 py-3 font-semibold" scope="col">
              {copy.value}
            </th>
            <th className="px-4 py-3 font-semibold" scope="col">
              {copy.status}
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr
              className="border-b border-(--border) align-top last:border-b-0"
              key={`${record.type}-${record.name}-${record.value}`}
            >
              <td className="px-4 py-3 font-semibold text-(--fg)">
                {record.type}
                {record.priority !== null ? (
                  <span className="block text-xs font-normal text-(--tertiary)">
                    {formatMessage(copy.priority, {
                      priority: record.priority,
                    })}
                  </span>
                ) : null}
              </td>
              <td className="px-4 py-3 font-mono text-[0.8rem] break-all text-(--fg)">
                {record.name}
              </td>
              <td className="px-4 py-3 font-mono text-[0.8rem] break-all text-(--fg)">
                {record.value}
              </td>
              <td className="px-4 py-3 text-(--secondary)">
                {record.status === "verified" ? copy.found : copy.notFound}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
