"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, type FormEvent, useState } from "react";
import {
  describeSsoError,
  SsoButton,
  type SsoOption,
} from "@/components/auth/sso-button";
import { useBranding } from "@/components/layout/branding-provider";
import { FieldShell, ShellButton } from "@/components/shared/form-shell";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth/client";
import { localizePasswordMessage } from "@/lib/i18n/auth-messages.ts";
import { formatMessage } from "@/lib/i18n/format.ts";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";
import {
  describePasswordRefusal,
  newPasswordLengthError,
  PASSWORD_TOO_LONG_MESSAGE,
} from "@/lib/password-messages";
import { forgotPasswordSchema, loginSchema } from "@/lib/schemas/auth";

type AuthErrorLike = {
  code?: string;
  message?: string;
};

type LoginFormValues = {
  email: string;
  password: string;
};

type ForgotPasswordFormValues = {
  email: string;
};

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;
type ForgotPasswordFormErrors = Partial<
  Record<keyof ForgotPasswordFormValues, string>
>;

type LoginShellProps = {
  /** "on", "off", or "fallback": off, but a few addresses may still use one. */
  passwordSignIn?: "fallback" | "off" | "on";
  resetError?: string | null;
  resetToken?: string | null;
  sso?: SsoOption | null;
  /** The ?error= single sign-on came back with. */
  ssoError?: string | null;
};

type ForgotPasswordModel = {
  bannerMessage: string | null;
  errors: ForgotPasswordFormErrors;
  isOpen: boolean;
  isSubmitting: boolean;
  successMessage: string | null;
  values: ForgotPasswordFormValues;
};

function createLoginFormValues(): LoginFormValues {
  return {
    email: "",
    password: "",
  };
}

function createForgotPasswordValues(
  email: string,
  trim = false,
): ForgotPasswordFormValues {
  return {
    email: trim ? email.trim() : email,
  };
}

function createForgotPasswordModel(
  email: string,
  overrides: Partial<Omit<ForgotPasswordModel, "values">> = {},
): ForgotPasswordModel {
  return {
    bannerMessage: null,
    errors: {},
    isOpen: false,
    isSubmitting: false,
    successMessage: null,
    values: createForgotPasswordValues(email),
    ...overrides,
  };
}

function trimLoginValues(values: LoginFormValues): LoginFormValues {
  return {
    email: values.email.trim(),
    password: values.password,
  };
}

function trimForgotPasswordValues(
  values: ForgotPasswordFormValues,
): ForgotPasswordFormValues {
  return createForgotPasswordValues(values.email, true);
}

function normalizeAuthErrorMessage(
  error: AuthErrorLike | null | undefined,
): string {
  return error?.message?.trim().toLowerCase() ?? "";
}

export function LoginShell(props: LoginShellProps) {
  return <LiveLoginShell {...props} />;
}

function LiveLoginShell({
  passwordSignIn = "on",
  resetError = null,
  resetToken = null,
  sso = null,
  ssoError = null,
}: LoginShellProps) {
  const router = useRouter();
  const { signupAvailable } = useBranding();
  const { locale, messages } = useMessages();
  const copy = messages.auth;
  const [values, setValues] = useState<LoginFormValues>(
    createLoginFormValues(),
  );
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [bannerMessage, setBannerMessage] = useState<string | null>(
    resetError === "INVALID_TOKEN"
      ? copy.resetPassword.errors.invalidLink
      : ssoError
        ? describeSsoError(ssoError, locale)
        : null,
  );
  // With password sign-in off, the form is only shown on request, for the
  // few addresses that keep a password for when single sign-on is down.
  const [showPasswordForm, setShowPasswordForm] = useState(
    passwordSignIn === "on",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotPassword, setForgotPassword] = useState<ForgotPasswordModel>(
    createForgotPasswordModel(""),
  );
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  // The password was right and the account uses two-step sign-in.
  const [needsSecondStep, setNeedsSecondStep] = useState(false);

  function handleChange(field: keyof LoginFormValues) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;

      setValues((currentValues) => ({
        ...currentValues,
        [field]: nextValue,
      }));
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }));
      setBannerMessage(null);
      setShowResendVerification(false);
    };
  }

  function openForgotPasswordModal() {
    setForgotPassword(
      createForgotPasswordModel(values.email.trim(), { isOpen: true }),
    );
  }

  function closeForgotPasswordModal() {
    if (forgotPassword.isSubmitting) {
      return;
    }

    setForgotPassword(createForgotPasswordModel(values.email.trim()));
  }

  function handleForgotPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value;

    setForgotPassword((currentForgotPassword) => ({
      ...currentForgotPassword,
      bannerMessage: null,
      errors: {
        ...currentForgotPassword.errors,
        email: undefined,
      },
      successMessage: null,
      values: createForgotPasswordValues(nextValue),
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const trimmedValues = trimLoginValues({
      email: String(formData.get("login-email") ?? values.email),
      password: String(formData.get("login-password") ?? values.password),
    });
    const validationResult = loginSchema.safeParse(trimmedValues);

    if (!validationResult.success) {
      const nextErrors: LoginFormErrors = {};

      for (const issue of validationResult.error.issues) {
        const field = issue.path[0];

        if (field === "email") {
          nextErrors.email = copy.login.errors.email;
        }

        if (field === "password") {
          nextErrors.password = copy.login.errors.password;
        }
      }

      setValues(trimmedValues);
      setErrors(nextErrors);
      setBannerMessage(null);
      return;
    }

    setValues(validationResult.data);
    setErrors({});
    setBannerMessage(null);
    setShowResendVerification(false);
    setIsSubmitting(true);

    const result = await authClient.signIn.email({
      email: validationResult.data.email,
      password: validationResult.data.password,
    });

    if (result.error) {
      const normalizedErrorMessage = normalizeAuthErrorMessage(result.error);

      const errorCode = (result.error as AuthErrorLike).code;

      if (errorCode === "SIGN_IN_LOCKED") {
        setBannerMessage(copy.login.errors.signInLocked);
      } else if (errorCode === "PASSWORD_SIGN_IN_OFF") {
        const provider =
          result.error.message?.match(/Continue with (.+) instead\./)?.[1] ??
          sso?.name;
        setBannerMessage(
          provider
            ? formatMessage(copy.login.errors.passwordSignInOff, { provider })
            : copy.login.errors.passwordSignInOffGeneric,
        );
      } else if (normalizedErrorMessage.includes("email not verified")) {
        setBannerMessage(copy.login.errors.emailNotVerified);
        setShowResendVerification(true);
      } else if (
        describePasswordRefusal(result.error) === PASSWORD_TOO_LONG_MESSAGE
      ) {
        // No account has a password this long, so it cannot be right. Say
        // why instead of "Something went wrong" (issue #57).
        setErrors({
          password:
            localizePasswordMessage(PASSWORD_TOO_LONG_MESSAGE, copy) ??
            copy.password.tooLong,
        });
      } else {
        setBannerMessage(
          normalizedErrorMessage.includes("invalid email or password")
            ? copy.login.errors.invalidCredentials
            : copy.common.somethingWrong,
        );
      }
      setIsSubmitting(false);
      return;
    }

    if (
      result.data &&
      typeof result.data === "object" &&
      "twoFactorRedirect" in result.data
    ) {
      setNeedsSecondStep(true);
      setIsSubmitting(false);
      return;
    }

    router.replace("/dashboard");
  }

  async function handleForgotPasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (forgotPassword.isSubmitting) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const trimmedValues = trimForgotPasswordValues({
      email: String(
        formData.get("forgot-password-email") ?? forgotPassword.values.email,
      ),
    });
    const validationResult = forgotPasswordSchema.safeParse(trimmedValues);

    if (!validationResult.success) {
      setForgotPassword((currentForgotPassword) => ({
        ...currentForgotPassword,
        bannerMessage: null,
        errors: {
          email: copy.forgotPassword.errors.email,
        },
        successMessage: null,
        values: trimmedValues,
      }));
      return;
    }

    setForgotPassword((currentForgotPassword) => ({
      ...currentForgotPassword,
      bannerMessage: null,
      errors: {},
      isSubmitting: true,
      successMessage: null,
      values: validationResult.data,
    }));

    const result = await authClient.requestPasswordReset({
      email: validationResult.data.email,
      redirectTo: `${window.location.origin}/login`,
    });

    setForgotPassword((currentForgotPassword) => ({
      ...currentForgotPassword,
      bannerMessage: result.error ? copy.forgotPassword.errors.failed : null,
      errors: {},
      isSubmitting: false,
      successMessage: result.error ? null : copy.forgotPassword.success,
    }));
  }

  async function handleResendVerification() {
    const email = values.email.trim();

    if (!email || isResendingVerification) {
      return;
    }

    setIsResendingVerification(true);

    try {
      const response = await fetch("/api/auth/send-verification-email", {
        body: JSON.stringify({
          callbackURL: `${window.location.origin}/dashboard`,
          email,
        }),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        setBannerMessage(copy.login.resendFailed);
        return;
      }

      setBannerMessage(copy.login.resendSuccess);
    } catch {
      setBannerMessage(copy.login.resendFailed);
    } finally {
      setIsResendingVerification(false);
    }
  }

  if (resetToken) {
    return <ResetPasswordCard resetToken={resetToken} />;
  }

  if (needsSecondStep) {
    return (
      <SecondStepCard
        onRestart={(message) => {
          setNeedsSecondStep(false);
          setValues((currentValues) => ({ ...currentValues, password: "" }));
          setBannerMessage(message);
        }}
        onSignedIn={() => router.replace("/dashboard")}
      />
    );
  }

  const formLocked = isSubmitting;
  const forgotPasswordLocked = forgotPassword.isSubmitting;

  return (
    <>
      <section className="panel w-full max-w-[460px] p-8 sm:p-10">
        <div className="space-y-7">
          <div className="space-y-2">
            <p className="section-eyebrow">{copy.login.eyebrow}</p>
            <h1 className="text-[clamp(1.875rem,4.5vw,2.375rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-(--fg)">
              {copy.login.title}
            </h1>
          </div>

          {bannerMessage ? (
            <p className="notice notice-danger" role="alert">
              {bannerMessage}
            </p>
          ) : null}

          {sso ? (
            <SsoButton
              onError={setBannerMessage}
              sso={sso}
              variant={showPasswordForm ? "secondary" : "primary"}
            />
          ) : null}

          {sso && showPasswordForm ? (
            <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-(--secondary)">
              {copy.common.or}
            </p>
          ) : null}

          {showPasswordForm ? (
            <form className="space-y-5" noValidate onSubmit={handleSubmit}>
              <FieldShell
                autoComplete="email"
                disabled={formLocked}
                error={errors.email}
                label={copy.common.email}
                name="login-email"
                onChange={handleChange("email")}
                placeholder={copy.common.emailPlaceholder}
                readOnly={formLocked}
                type="email"
                value={values.email}
              />
              <FieldShell
                autoComplete="current-password"
                disabled={formLocked}
                error={errors.password}
                label={copy.common.password}
                name="login-password"
                onChange={handleChange("password")}
                readOnly={formLocked}
                type="password"
                value={values.password}
              />
              <ShellButton
                className="w-full"
                disabled={formLocked}
                loading={isSubmitting}
                type="submit"
              >
                {isSubmitting ? copy.common.loggingIn : copy.common.logIn}
              </ShellButton>
              {showResendVerification ? (
                <ShellButton
                  className="w-full"
                  disabled={formLocked}
                  loading={isResendingVerification}
                  onClick={handleResendVerification}
                  type="button"
                  variant="secondary"
                >
                  {isResendingVerification
                    ? copy.common.sending
                    : copy.login.resendVerification}
                </ShellButton>
              ) : null}
            </form>
          ) : passwordSignIn === "fallback" ? (
            <button
              className="w-fit p-0 text-left text-sm font-bold text-(--accent-ink) underline-offset-4 hover:underline"
              onClick={() => setShowPasswordForm(true)}
              type="button"
            >
              {copy.login.passwordInstead}
            </button>
          ) : null}

          <div className="flex flex-col gap-3 border-t border-(--border) pt-5 text-sm text-(--secondary)">
            {showPasswordForm ? (
              <button
                className="w-fit p-0 text-left font-bold text-(--accent-ink) underline-offset-4 hover:underline"
                onClick={openForgotPasswordModal}
                type="button"
              >
                {copy.login.forgotPassword}
              </button>
            ) : null}
            {signupAvailable ? (
              <p>
                {copy.login.noAccount}{" "}
                <Link
                  className="font-bold text-(--accent-ink) underline-offset-4 hover:underline"
                  href="/signup"
                >
                  {copy.signup.submit}
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <ForgotPasswordDialog
        bannerMessage={forgotPassword.bannerMessage}
        email={forgotPassword.values.email}
        emailError={forgotPassword.errors.email}
        isOpen={forgotPassword.isOpen}
        isSubmitting={forgotPasswordLocked}
        onClose={closeForgotPasswordModal}
        onEmailChange={handleForgotPasswordChange}
        onSubmit={handleForgotPasswordSubmit}
        successMessage={forgotPassword.successMessage}
      />
    </>
  );
}

type ForgotPasswordDialogProps = {
  bannerMessage: string | null;
  email: string;
  emailError?: string;
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  successMessage: string | null;
};

function ForgotPasswordDialog({
  bannerMessage,
  email,
  emailError,
  isOpen,
  isSubmitting,
  onClose,
  onEmailChange,
  onSubmit,
  successMessage,
}: ForgotPasswordDialogProps) {
  const { messages } = useMessages();
  const copy = messages.auth;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isSubmitting) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-[560px] sm:p-8" showCloseButton={false}>
        <div className="space-y-6">
          <DialogHeader className="space-y-3">
            <DialogTitle>{copy.forgotPassword.title}</DialogTitle>
            <DialogDescription className="max-w-[40ch]">
              {copy.forgotPassword.description}
            </DialogDescription>
          </DialogHeader>

          {bannerMessage ? (
            <p className="notice notice-danger" role="alert">
              {bannerMessage}
            </p>
          ) : null}

          {successMessage ? (
            <p className="notice notice-success" role="status">
              {successMessage}
            </p>
          ) : null}

          <form className="space-y-6" noValidate onSubmit={onSubmit}>
            <FieldShell
              autoComplete="email"
              disabled={isSubmitting}
              error={emailError}
              label={copy.common.email}
              name="forgot-password-email"
              onChange={onEmailChange}
              placeholder={copy.common.emailPlaceholder}
              readOnly={isSubmitting}
              type="email"
              value={email}
            />

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <ShellButton
                disabled={isSubmitting}
                onClick={onClose}
                type="button"
                variant="secondary"
              >
                {copy.common.cancel}
              </ShellButton>
              <ShellButton
                disabled={isSubmitting}
                loading={isSubmitting}
                type="submit"
              >
                {isSubmitting
                  ? copy.common.sending
                  : copy.forgotPassword.action}
              </ShellButton>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ResetPasswordCard({ resetToken }: { resetToken: string }) {
  const { messages } = useMessages();
  const copy = messages.auth;
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const trimmedPassword = String(
      formData.get("reset-password") ?? password,
    ).trim();

    const lengthError = newPasswordLengthError(trimmedPassword);

    if (lengthError) {
      setError(localizePasswordMessage(lengthError, copy));
      setSuccessMessage(null);
      return;
    }

    setPassword(trimmedPassword);
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const result = await authClient.resetPassword({
      newPassword: trimmedPassword,
      token: resetToken,
    });

    if (result.error) {
      const normalizedErrorMessage = normalizeAuthErrorMessage(result.error);

      setError(
        normalizedErrorMessage.includes("invalid token")
          ? copy.resetPassword.errors.invalidLink
          : (localizePasswordMessage(
              describePasswordRefusal(result.error),
              copy,
            ) ?? copy.common.somethingWrong),
      );
      setIsSubmitting(false);
      return;
    }

    setSuccessMessage(copy.resetPassword.success);
    setIsSubmitting(false);
  }

  const formLocked = isSubmitting;

  return (
    <section className="panel w-full max-w-[440px] p-8 sm:p-10">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="section-eyebrow">{copy.resetPassword.eyebrow}</p>
          <h1 className="text-[clamp(1.875rem,4.5vw,2.375rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-(--fg)">
            {copy.resetPassword.title}
          </h1>
        </div>

        {error ? (
          <p className="notice notice-danger" role="alert">
            {error}
          </p>
        ) : null}

        {successMessage ? (
          <p className="notice notice-success" role="status">
            {successMessage}
          </p>
        ) : null}

        <form className="space-y-5" noValidate onSubmit={handleSubmit}>
          <FieldShell
            autoComplete="new-password"
            disabled={formLocked}
            error={error ?? undefined}
            helper={copy.common.passwordHelper}
            label={copy.resetPassword.label}
            name="reset-password"
            onChange={(event) => {
              setPassword(event.target.value);
              setError(null);
              setSuccessMessage(null);
            }}
            readOnly={formLocked}
            type="password"
            value={password}
          />
          <ShellButton
            className="w-full"
            disabled={formLocked}
            loading={isSubmitting}
            type="submit"
          >
            {isSubmitting
              ? copy.resetPassword.submitting
              : copy.resetPassword.submit}
          </ShellButton>
        </form>
      </div>
    </section>
  );
}

type SecondStepCardProps = {
  /** Back to the password, with a reason to show there. */
  onRestart: (message: string) => void;
  onSignedIn: () => void;
};

function SecondStepCard({ onRestart, onSignedIn }: SecondStepCardProps) {
  const { messages } = useMessages();
  const copy = messages.auth.secondStep;
  const [code, setCode] = useState("");
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const trimmed = code.replace(/\s+/g, "");

    if (!useBackupCode && !/^\d{6}$/.test(trimmed)) {
      setError(copy.errors.code);
      return;
    }

    if (useBackupCode && trimmed.length === 0) {
      setError(copy.errors.backupCode);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(
        useBackupCode
          ? "/api/auth/two-factor/verify-backup-code"
          : "/api/auth/two-factor/verify-totp",
        {
          body: JSON.stringify({ code: trimmed }),
          headers: { "content-type": "application/json" },
          method: "POST",
        },
      );

      if (response.ok) {
        onSignedIn();
        return;
      }

      const payload = (await response.json().catch(() => null)) as {
        code?: string;
        message?: string;
      } | null;

      switch (payload?.code) {
        case "INVALID_CODE":
          setError(copy.errors.codeInvalid);
          break;
        case "INVALID_BACKUP_CODE":
          setError(copy.errors.backupInvalid);
          break;
        case "ACCOUNT_TEMPORARILY_LOCKED":
          setError(copy.errors.locked);
          break;
        case "TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE":
          onRestart(copy.errors.restart);
          return;
        case "INVALID_TWO_FACTOR_COOKIE":
          onRestart(copy.errors.timedOut);
          return;
        default:
          setError(messages.auth.common.somethingWrong);
      }
    } catch {
      setError(messages.auth.common.somethingWrong);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="panel w-full max-w-[460px] p-8 sm:p-10">
      <div className="space-y-7">
        <div className="space-y-2">
          <p className="section-eyebrow">{copy.eyebrow}</p>
          <h1 className="text-[clamp(1.875rem,4.5vw,2.375rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-(--fg)">
            {useBackupCode ? copy.titleBackup : copy.titleCode}
          </h1>
          <p className="text-sm leading-6 text-(--secondary)">
            {useBackupCode ? copy.descriptionBackup : copy.descriptionCode}
          </p>
        </div>

        {error ? (
          <p className="notice notice-danger" role="alert">
            {error}
          </p>
        ) : null}

        <form className="space-y-5" noValidate onSubmit={handleSubmit}>
          <FieldShell
            autoComplete="one-time-code"
            disabled={isSubmitting}
            label={useBackupCode ? copy.labelBackup : copy.labelCode}
            name="second-step-code"
            onChange={(event) => {
              setCode(event.target.value);
              setError(null);
            }}
            readOnly={isSubmitting}
            value={code}
          />
          <ShellButton
            className="w-full"
            disabled={isSubmitting}
            loading={isSubmitting}
            type="submit"
          >
            {isSubmitting ? copy.checking : messages.auth.common.continue}
          </ShellButton>
        </form>

        <div className="border-t border-(--border) pt-5 text-sm">
          <button
            className="w-fit p-0 text-left font-bold text-(--accent-ink) underline-offset-4 hover:underline"
            onClick={() => {
              setUseBackupCode((current) => !current);
              setCode("");
              setError(null);
            }}
            type="button"
          >
            {useBackupCode ? copy.useApp : copy.useBackup}
          </button>
        </div>
      </div>
    </section>
  );
}
