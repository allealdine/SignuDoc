"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";

import { useBranding } from "@/components/layout/branding-provider";
import { SessionsPanel } from "@/components/settings/sessions-panel";
import { TwoFactorPanel } from "@/components/settings/two-factor-panel";
import { FieldShell, ShellButton } from "@/components/shared/form-shell";
import { PageHeader } from "@/components/shared/page-header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatMessage } from "@/lib/i18n/format.ts";
import type { Messages } from "@/lib/i18n/locales/en.ts";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";

const CLOSURE_CONFIRMATION_PHRASE = "close my account";

type AccountCopy = Messages["settings"]["account"];

type SettingsShellProps = {
  /** Why this account cannot be closed; shown in place of the button. */
  closureBlockedReason?: string | null;
  initialProfile?: ProfileValues;
  twoFactor?: { enabled: boolean; required: boolean };
};

type FeedbackTone = "error" | "success";

type FeedbackMessage = {
  message: string;
  tone: FeedbackTone;
} | null;

type ProfileValues = {
  email: string;
  fullName: string;
};

type PasswordValues = {
  currentPassword: string;
  newPassword: string;
};

type ProfileErrors = Partial<Record<keyof ProfileValues, string>>;
type PasswordErrors = Partial<Record<keyof PasswordValues, string>>;

type PendingAction = "closure" | "password" | "profile" | "reset" | null;

type ApiErrorPayload = {
  error?:
    | string
    | {
        message?: string;
      };
  fieldErrors?: Partial<Record<string, string>>;
  message?: string;
} | null;

const defaultProfileValues: ProfileValues = {
  email: "",
  fullName: "",
};

const defaultPasswordValues: PasswordValues = {
  currentPassword: "",
  newPassword: "",
};

function trimProfileValues(values: ProfileValues): ProfileValues {
  return {
    email: values.email.trim(),
    fullName: values.fullName.trim(),
  };
}

function validateProfileValues(
  values: ProfileValues,
  copy: AccountCopy["profile"],
): ProfileErrors {
  const errors: ProfileErrors = {};

  if (values.fullName.length === 0) {
    errors.fullName = copy.fullNameRequired;
  }

  if (values.email.length === 0 || !values.email.includes("@")) {
    errors.email = copy.emailInvalid;
  }

  return errors;
}

function validatePasswordValues(
  values: PasswordValues,
  copy: AccountCopy["password"],
): PasswordErrors {
  const errors: PasswordErrors = {};

  if (values.currentPassword.length === 0) {
    errors.currentPassword = copy.currentRequired;
  }

  if (values.newPassword.trim().length < 15) {
    errors.newPassword = copy.tooShort;
  }

  return errors;
}

async function readApiPayload(response: Response): Promise<ApiErrorPayload> {
  return (await response.json().catch(() => null)) as ApiErrorPayload;
}

function extractApiErrorMessage(
  payload: ApiErrorPayload,
  fallback: string,
): string {
  if (!payload) {
    return fallback;
  }

  if (typeof payload.error === "string" && payload.error.trim()) {
    return payload.error;
  }

  if (
    payload.error &&
    typeof payload.error === "object" &&
    typeof payload.error.message === "string" &&
    payload.error.message.trim()
  ) {
    return payload.error.message;
  }

  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message;
  }

  return fallback;
}

function isDuplicateEmailMessage(message: string) {
  const normalizedMessage = message.toLowerCase();

  return (
    normalizedMessage.includes("already registered") ||
    normalizedMessage.includes("already in use")
  );
}

function isInvalidPasswordMessage(message: string) {
  return message.toLowerCase().includes("invalid password");
}

function isPasswordTooShortMessage(message: string) {
  return message.toLowerCase().includes("password too short");
}

function isCompromisedPasswordMessage(message: string) {
  return message.toLowerCase().includes("compromised");
}

function isNoOpEmailChangeMessage(message: string) {
  const normalizedMessage = message.toLowerCase();

  return (
    normalizedMessage.includes("email is the same") ||
    normalizedMessage.includes("already verified")
  );
}

export function SettingsShell({
  closureBlockedReason = null,
  initialProfile = defaultProfileValues,
  twoFactor = { enabled: false, required: false },
}: SettingsShellProps) {
  const copy = useMessages().messages.settings.account;
  const closureCopy = useClosureCopy(copy.closure);
  const [profileValues, setProfileValues] = useState(initialProfile);
  const [savedProfileValues, setSavedProfileValues] = useState(initialProfile);
  const [profileErrors, setProfileErrors] = useState<ProfileErrors>({});
  const [passwordValues, setPasswordValues] = useState(defaultPasswordValues);
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});
  const [feedback, setFeedback] = useState<FeedbackMessage>(null);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [isClosureDialogOpen, setIsClosureDialogOpen] = useState(false);
  const [closureConfirmation, setClosureConfirmation] = useState("");

  const isBusy = pendingAction !== null;
  const isClosureConfirmationValid =
    closureConfirmation.trim().toLowerCase() === CLOSURE_CONFIRMATION_PHRASE;

  function handleProfileChange(field: keyof ProfileValues) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;

      setProfileValues((currentValues) => ({
        ...currentValues,
        [field]: nextValue,
      }));
      setProfileErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }));
      setFeedback(null);
    };
  }

  function handlePasswordChange(field: keyof PasswordValues) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;

      setPasswordValues((currentValues) => ({
        ...currentValues,
        [field]: nextValue,
      }));
      setPasswordErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }));
      setFeedback(null);
    };
  }

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isBusy) {
      return;
    }

    const trimmedValues = trimProfileValues(profileValues);
    const nextErrors = validateProfileValues(trimmedValues, copy.profile);

    if (Object.keys(nextErrors).length > 0) {
      setProfileValues(trimmedValues);
      setProfileErrors(nextErrors);
      setFeedback(null);
      return;
    }

    setProfileValues(trimmedValues);
    setProfileErrors({});
    setFeedback(null);
    setPendingAction("profile");

    try {
      const nameChanged =
        trimmedValues.fullName !== savedProfileValues.fullName;
      const emailChanged =
        trimmedValues.email.trim().toLowerCase() !==
        savedProfileValues.email.trim().toLowerCase();
      let nextSavedProfile = savedProfileValues;

      if (nameChanged) {
        const response = await fetch("/api/account/profile", {
          body: JSON.stringify({
            email: savedProfileValues.email,
            fullName: trimmedValues.fullName,
          }),
          headers: {
            "content-type": "application/json",
          },
          method: "PATCH",
        });
        const payload = await readApiPayload(response);

        if (!response.ok) {
          const fieldErrors = payload?.fieldErrors ?? {};
          const errorMessage = extractApiErrorMessage(
            payload,
            copy.genericError,
          );

          setProfileErrors({
            email:
              typeof fieldErrors.email === "string"
                ? fieldErrors.email
                : isDuplicateEmailMessage(errorMessage)
                  ? copy.profile.emailRegistered
                  : undefined,
            fullName:
              typeof fieldErrors.fullName === "string"
                ? fieldErrors.fullName
                : undefined,
          });
          setFeedback({
            message:
              typeof fieldErrors.email === "string" ||
              typeof fieldErrors.fullName === "string"
                ? copy.profile.correctFields
                : errorMessage,
            tone: "error",
          });
          return;
        }

        nextSavedProfile = {
          email: savedProfileValues.email,
          fullName: trimmedValues.fullName,
        };
        setSavedProfileValues(nextSavedProfile);
      }

      if (emailChanged) {
        const response = await fetch("/api/auth/change-email", {
          body: JSON.stringify({
            callbackURL: `${window.location.origin}/settings`,
            newEmail: trimmedValues.email,
          }),
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
        });
        const payload = await readApiPayload(response);

        if (!response.ok) {
          const errorMessage = extractApiErrorMessage(
            payload,
            copy.genericError,
          );

          setProfileErrors({
            email: isDuplicateEmailMessage(errorMessage)
              ? copy.profile.emailRegistered
              : isNoOpEmailChangeMessage(errorMessage)
                ? copy.profile.emailDifferent
                : undefined,
            fullName: undefined,
          });
          setProfileValues({
            email: trimmedValues.email,
            fullName: nextSavedProfile.fullName,
          });
          setFeedback({
            message:
              isDuplicateEmailMessage(errorMessage) ||
              isNoOpEmailChangeMessage(errorMessage)
                ? copy.password.correctFields
                : errorMessage,
            tone: "error",
          });
          return;
        }

        setProfileValues(nextSavedProfile);
        setProfileErrors({});
        setFeedback({
          message: nameChanged
            ? copy.profile.success.updatedWithEmailSteps
            : copy.profile.success.emailSteps,
          tone: "success",
        });
        return;
      }

      setProfileValues(nextSavedProfile);
      setProfileErrors({});
      setFeedback({
        message: copy.profile.success.updated,
        tone: "success",
      });
    } catch {
      setFeedback({
        message: copy.genericError,
        tone: "error",
      });
    } finally {
      setPendingAction(null);
    }
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isBusy) {
      return;
    }

    const nextErrors = validatePasswordValues(passwordValues, copy.password);

    if (Object.keys(nextErrors).length > 0) {
      setPasswordErrors(nextErrors);
      setFeedback(null);
      return;
    }

    setPasswordErrors({});
    setFeedback(null);
    setPendingAction("password");

    try {
      const response = await fetch("/api/auth/change-password", {
        body: JSON.stringify({
          ...passwordValues,
          revokeOtherSessions: true,
        }),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });
      const payload = await readApiPayload(response);

      if (!response.ok) {
        const errorMessage = extractApiErrorMessage(payload, copy.genericError);

        setPasswordErrors({
          currentPassword: isInvalidPasswordMessage(errorMessage)
            ? copy.password.currentIncorrect
            : undefined,
          newPassword: isPasswordTooShortMessage(errorMessage)
            ? copy.password.tooShort
            : isCompromisedPasswordMessage(errorMessage)
              ? copy.password.breached
              : undefined,
        });
        setFeedback({
          message:
            isInvalidPasswordMessage(errorMessage) ||
            isPasswordTooShortMessage(errorMessage) ||
            isCompromisedPasswordMessage(errorMessage)
              ? copy.password.correctFields
              : errorMessage,
          tone: "error",
        });
        return;
      }

      setPasswordValues(defaultPasswordValues);
      setPasswordErrors({});
      setFeedback({
        message: copy.password.success.updated,
        tone: "success",
      });
    } catch {
      setFeedback({
        message: copy.genericError,
        tone: "error",
      });
    } finally {
      setPendingAction(null);
    }
  }

  async function handleResetPasswordLink() {
    if (isBusy) {
      return;
    }

    const trimmedProfileValues = trimProfileValues(profileValues);
    const nextErrors = validateProfileValues(
      trimmedProfileValues,
      copy.profile,
    );

    if (nextErrors.email) {
      setProfileValues(trimmedProfileValues);
      setProfileErrors((currentErrors) => ({
        ...currentErrors,
        email: nextErrors.email,
      }));
      setFeedback(null);
      return;
    }

    setProfileValues(trimmedProfileValues);
    setProfileErrors((currentErrors) => ({
      ...currentErrors,
      email: undefined,
    }));
    setFeedback(null);
    setPendingAction("reset");

    try {
      const response = await fetch("/api/auth/request-password-reset", {
        body: JSON.stringify({
          email: trimmedProfileValues.email,
          redirectTo: `${window.location.origin}/login`,
        }),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });
      const payload = await readApiPayload(response);

      if (!response.ok) {
        setFeedback({
          message: extractApiErrorMessage(payload, copy.genericError),
          tone: "error",
        });
        return;
      }

      setFeedback({
        message: copy.password.success.resetSent,
        tone: "success",
      });
    } catch {
      setFeedback({
        message: copy.genericError,
        tone: "error",
      });
    } finally {
      setPendingAction(null);
    }
  }

  function openClosureDialog() {
    if (isBusy) {
      return;
    }

    setClosureConfirmation("");
    setFeedback(null);
    setIsClosureDialogOpen(true);
  }

  function closeClosureDialog() {
    if (pendingAction === "closure") {
      return;
    }

    setClosureConfirmation("");
    setIsClosureDialogOpen(false);
  }

  async function handleClosureSubmit() {
    if (pendingAction === "closure" || !isClosureConfirmationValid) {
      return;
    }

    setFeedback(null);
    setPendingAction("closure");

    try {
      const response = await fetch("/api/account/closure-request", {
        body: JSON.stringify({
          confirmation: CLOSURE_CONFIRMATION_PHRASE,
        }),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });
      const payload = await readApiPayload(response);

      if (!response.ok) {
        setFeedback({
          message: extractApiErrorMessage(payload, copy.genericError),
          tone: "error",
        });
        return;
      }

      setClosureConfirmation("");
      setIsClosureDialogOpen(false);
      setFeedback({
        message: copy.closure.success,
        tone: "success",
      });
    } catch {
      setFeedback({
        message: copy.genericError,
        tone: "error",
      });
    } finally {
      setPendingAction(null);
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        description={copy.header.description}
        title={copy.header.title}
      />

      {feedback ? <SettingsFeedback feedback={feedback} /> : null}

      <section data-animate="enter" data-animate-delay="1">
        <div className="space-y-5">
          <div className="panel space-y-5 p-6 sm:p-8">
            <SectionHeading title={copy.profile.title} />

            <form className="space-y-5" onSubmit={handleProfileSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldShell
                  disabled={isBusy}
                  error={profileErrors.fullName}
                  label={copy.profile.labelFullName}
                  name="fullName"
                  onChange={handleProfileChange("fullName")}
                  readOnly={false}
                  value={profileValues.fullName}
                />
                <FieldShell
                  disabled={isBusy}
                  error={profileErrors.email}
                  label={copy.profile.labelEmail}
                  name="email"
                  onChange={handleProfileChange("email")}
                  readOnly={false}
                  type="email"
                  value={profileValues.email}
                />
              </div>
              <p className="text-sm leading-6 text-(--secondary)">
                Email changes are verified through your current inbox first,
                then the new inbox.
              </p>

              <ShellButton
                className="w-fit"
                loading={pendingAction === "profile"}
                type="submit"
              >
                {pendingAction === "profile"
                  ? copy.profile.saving
                  : copy.profile.save}
              </ShellButton>
            </form>
          </div>

          <div className="panel p-6 sm:p-8">
            <div className="space-y-5">
              <SectionHeading title={copy.password.title} />

              <form className="space-y-5" onSubmit={handlePasswordSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FieldShell
                    disabled={isBusy}
                    error={passwordErrors.currentPassword}
                    label={copy.password.labelCurrent}
                    name="currentPassword"
                    onChange={handlePasswordChange("currentPassword")}
                    placeholder="••••••••••"
                    readOnly={false}
                    type="password"
                    value={passwordValues.currentPassword}
                  />
                  <FieldShell
                    disabled={isBusy}
                    error={passwordErrors.newPassword}
                    helper={copy.password.helper}
                    label={copy.password.labelNew}
                    name="newPassword"
                    onChange={handlePasswordChange("newPassword")}
                    placeholder="•••••••••••••••"
                    readOnly={false}
                    type="password"
                    value={passwordValues.newPassword}
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ShellButton
                    className="w-fit"
                    loading={pendingAction === "password"}
                    type="submit"
                  >
                    {pendingAction === "password"
                      ? copy.password.updating
                      : copy.password.update}
                  </ShellButton>
                  <ShellButton
                    disabled={isBusy}
                    loading={pendingAction === "reset"}
                    onClick={handleResetPasswordLink}
                    variant="secondary"
                  >
                    {pendingAction === "reset"
                      ? copy.password.sending
                      : copy.password.emailResetLink}
                  </ShellButton>
                </div>
              </form>
            </div>
          </div>

          <TwoFactorPanel
            enabled={twoFactor.enabled}
            required={twoFactor.required}
          />

          <SessionsPanel />

          <div className="panel p-6 sm:p-8">
            <div className="space-y-5">
              <SectionHeading title={copy.closure.dangerZone} />
              <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
                {closureCopy}
              </p>
              {closureBlockedReason ? (
                <p className="notice notice-warning max-w-2xl" role="status">
                  {closureBlockedReason}
                </p>
              ) : (
                <ShellButton
                  className="w-fit border-[rgba(180,35,24,0.35)] text-(--danger) hover:border-(--danger) hover:bg-(--danger-soft) hover:text-(--danger)"
                  disabled={isBusy}
                  onClick={openClosureDialog}
                  variant="secondary"
                >
                  {copy.closure.request}
                </ShellButton>
              )}
            </div>
          </div>
        </div>
      </section>

      {isClosureDialogOpen ? (
        <AccountClosureDialog
          confirmationValue={closureConfirmation}
          isReady={isClosureConfirmationValid}
          isSubmitting={pendingAction === "closure"}
          onCancel={closeClosureDialog}
          onChange={setClosureConfirmation}
          onConfirm={handleClosureSubmit}
        />
      ) : null}
    </div>
  );
}

function SectionHeading({ title }: Readonly<{ title: string }>) {
  return (
    <h2 className="text-xl font-extrabold tracking-[-0.02em] text-(--fg)">
      {title}
    </h2>
  );
}

function SettingsFeedback({
  feedback,
}: Readonly<{
  feedback: Exclude<FeedbackMessage, null>;
}>) {
  return (
    <section
      className={`notice ${
        feedback.tone === "success" ? "notice-success" : "notice-danger"
      }`}
      role={feedback.tone === "error" ? "alert" : "status"}
    >
      <p>{feedback.message}</p>
    </section>
  );
}

type AccountClosureDialogProps = {
  confirmationValue: string;
  isReady: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onChange: (value: string) => void;
  onConfirm: () => void;
};

function useClosureCopy(copy: AccountCopy["closure"]): string {
  const { hosted, productName } = useBranding();

  return hosted
    ? formatMessage(copy.hostedCopy, { productName })
    : formatMessage(copy.selfHostedCopy, { productName });
}

function AccountClosureDialog({
  confirmationValue,
  isReady,
  isSubmitting,
  onCancel,
  onChange,
  onConfirm,
}: AccountClosureDialogProps) {
  const copy = useMessages().messages.settings.account;
  const closureCopy = useClosureCopy(copy.closure);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !isSubmitting) {
          onCancel();
        }
      }}
    >
      <DialogContent className="max-w-lg sm:p-8" showCloseButton={false}>
        <div className="space-y-5">
          <DialogHeader className="space-y-3">
            <DialogTitle>{copy.closure.title}</DialogTitle>
            <DialogDescription className="text-sm leading-6 text-(--secondary)">
              {closureCopy}
            </DialogDescription>
          </DialogHeader>

          <Field className="gap-2 text-sm">
            <FieldLabel
              className="text-[0.8125rem] font-semibold text-(--secondary)"
              htmlFor="close-account-confirmation"
            >
              {formatMessage(copy.closure.confirmationLabel, {
                phrase: CLOSURE_CONFIRMATION_PHRASE,
              })}
            </FieldLabel>
            <Input
              aria-label={formatMessage(copy.closure.confirmationLabel, {
                phrase: CLOSURE_CONFIRMATION_PHRASE,
              })}
              disabled={isSubmitting}
              id="close-account-confirmation"
              onChange={(event) => onChange(event.target.value)}
              type="text"
              value={confirmationValue}
            />
          </Field>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <ShellButton
              disabled={isSubmitting}
              onClick={onCancel}
              variant="secondary"
            >
              {copy.closure.cancel}
            </ShellButton>
            <ShellButton
              disabled={!isReady}
              loading={isSubmitting}
              onClick={onConfirm}
              variant="danger"
            >
              {isSubmitting ? copy.closure.requesting : copy.closure.confirm}
            </ShellButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
