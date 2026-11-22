"use client";

import Link from "next/link";
import {
  type ChangeEvent,
  type ChangeEventHandler,
  type FormEvent,
  useState,
} from "react";

import { SsoButton, type SsoOption } from "@/components/auth/sso-button";
import { FieldShell, ShellButton } from "@/components/shared/form-shell";
import { authClient } from "@/lib/auth/client";
import {
  localizePasswordMessage,
  localizeSignupMessage,
} from "@/lib/i18n/auth-messages.ts";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";
import {
  describePasswordRefusal,
  newPasswordLengthError,
} from "@/lib/password-messages";
import { signUpSchema } from "@/lib/schemas/auth";

type AuthErrorLike = {
  code?: string;
  message?: string;
};

// Codes the server answers with when this install's sign-up rule turns an
// address away. The message that comes with them says what the rule is.
const SIGNUP_RULE_ERROR_CODES = new Set([
  "setup_required",
  "signup_closed",
  "signup_domain_not_allowed",
]);

type SignupShellProps = {
  /** False when the install has no email provider to send with. */
  emailConnected?: boolean;
  /** False when password sign-in is turned off, so accounts come from SSO. */
  passwordSignIn?: boolean;
  /** Single sign-on, when the install has it (lib/auth/sso.ts). */
  sso?: SsoOption | null;
  /** False when this install is not taking new accounts at all. */
  signupAvailable?: boolean;
  /** One sentence on who can create an account, or null when anyone can. */
  signupRule?: string | null;
};

type SignupFormValues = {
  email: string;
  fullName: string;
  password: string;
};

type SignupFormErrors = Partial<Record<keyof SignupFormValues, string>>;

function createSignupFormValues(): SignupFormValues {
  return {
    email: "",
    fullName: "",
    password: "",
  };
}

function trimFormValues(values: SignupFormValues): SignupFormValues {
  return {
    email: values.email.trim(),
    fullName: values.fullName.trim(),
    password: values.password,
  };
}

function normalizeAuthErrorMessage(
  error: AuthErrorLike | null | undefined,
): string {
  return error?.message?.trim().toLowerCase() ?? "";
}

type SignupFormCardProps = {
  bannerMessage: string | null;
  errors: SignupFormErrors;
  formLocked: boolean;
  isResendingVerification?: boolean;
  isSubmitting: boolean;
  onEmailChange: ChangeEventHandler<HTMLInputElement>;
  onFullNameChange: ChangeEventHandler<HTMLInputElement>;
  onPasswordChange: ChangeEventHandler<HTMLInputElement>;
  onResendVerification?: () => void | Promise<void>;
  onSsoError: (message: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  passwordSignIn: boolean;
  showSuccess: boolean;
  signupRule: string | null;
  sso: SsoOption | null;
  successMessage: string | null;
  values: SignupFormValues;
};

function SignupFormCard({
  bannerMessage,
  errors,
  formLocked,
  isResendingVerification = false,
  isSubmitting,
  onEmailChange,
  onFullNameChange,
  onPasswordChange,
  onResendVerification,
  onSsoError,
  onSubmit,
  passwordSignIn,
  showSuccess,
  signupRule,
  sso,
  successMessage,
  values,
}: SignupFormCardProps) {
  const { messages } = useMessages();
  const copy = messages.auth;

  return (
    <section className="panel w-full max-w-[460px] p-8 sm:p-10">
      <div className="space-y-7">
        <div className="space-y-2">
          <p className="section-eyebrow">{copy.signup.eyebrow}</p>
          <h1 className="text-[clamp(1.875rem,4.5vw,2.375rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-(--fg)">
            {copy.signup.title}
          </h1>
          {signupRule ? (
            <p className="pt-1 text-sm leading-6 text-muted-foreground">
              {signupRule}
            </p>
          ) : null}
        </div>

        {bannerMessage ? (
          <p className="notice notice-danger" role="alert">
            {bannerMessage}
          </p>
        ) : null}

        {showSuccess ? (
          <div aria-live="polite" className="notice notice-success">
            <p>{successMessage ?? copy.signup.success.checkEmail}</p>
          </div>
        ) : null}

        {sso ? (
          <SsoButton
            onError={onSsoError}
            sso={sso}
            variant={passwordSignIn ? "secondary" : "primary"}
          />
        ) : null}

        {sso && passwordSignIn ? (
          <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-(--secondary)">
            {copy.common.or}
          </p>
        ) : null}

        {passwordSignIn ? (
          <form className="space-y-5" noValidate onSubmit={onSubmit}>
            <FieldShell
              autoComplete="name"
              disabled={formLocked}
              error={errors.fullName}
              label={copy.signup.fullName}
              name="signup-full-name"
              onChange={onFullNameChange}
              placeholder={copy.signup.fullNamePlaceholder}
              readOnly={formLocked}
              value={values.fullName}
            />
            <FieldShell
              autoComplete="email"
              disabled={formLocked}
              error={errors.email}
              label={copy.common.email}
              name="signup-email"
              onChange={onEmailChange}
              placeholder={copy.common.emailPlaceholder}
              readOnly={formLocked}
              type="email"
              value={values.email}
            />
            <FieldShell
              autoComplete="new-password"
              disabled={formLocked}
              error={errors.password}
              helper={copy.common.passwordHelper}
              label={copy.common.password}
              name="signup-password"
              onChange={onPasswordChange}
              placeholder={copy.signup.passwordPlaceholder}
              readOnly={formLocked}
              type="password"
              value={values.password}
            />

            {showSuccess ? (
              <div className="flex flex-col gap-3">
                <ShellButton className="w-full" href="/login" variant="primary">
                  {copy.signup.goToLogIn}
                </ShellButton>
                {onResendVerification ? (
                  <ShellButton
                    className="w-full"
                    disabled={formLocked}
                    loading={isResendingVerification}
                    onClick={onResendVerification}
                    type="button"
                    variant="secondary"
                  >
                    {isResendingVerification
                      ? copy.common.sending
                      : copy.login.resendVerification}
                  </ShellButton>
                ) : null}
              </div>
            ) : (
              <ShellButton
                className="w-full"
                disabled={formLocked}
                loading={isSubmitting}
                type="submit"
                variant="primary"
              >
                {isSubmitting ? copy.signup.creating : copy.signup.submit}
              </ShellButton>
            )}
          </form>
        ) : null}

        <div className="border-t border-(--border) pt-5 text-sm text-(--secondary)">
          {copy.signup.haveAccount}{" "}
          <Link
            className="font-bold text-(--accent-ink) underline-offset-4 hover:underline"
            href="/login"
          >
            {copy.common.logIn}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SignupShell({
  emailConnected = true,
  passwordSignIn = true,
  signupAvailable = true,
  signupRule = null,
  sso = null,
}: SignupShellProps) {
  if (!signupAvailable) {
    return <SignupClosedCard />;
  }

  return (
    <LiveSignupShell
      emailConnected={emailConnected}
      passwordSignIn={passwordSignIn || !sso}
      signupRule={signupRule}
      sso={sso}
    />
  );
}

function SignupClosedCard() {
  const { messages } = useMessages();
  const copy = messages.auth.signup;

  return (
    <section className="panel w-full max-w-[460px] p-8 sm:p-10">
      <div className="space-y-7">
        <div className="space-y-2">
          <p className="section-eyebrow">{copy.eyebrow}</p>
          <h1 className="text-[clamp(1.875rem,4.5vw,2.375rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-(--fg)">
            {copy.closed.title}
          </h1>
          <p className="pt-1 text-sm leading-6 text-muted-foreground">
            {copy.closed.description}
          </p>
        </div>
        <ShellButton className="w-full" href="/login" variant="primary">
          {copy.goToLogIn}
        </ShellButton>
      </div>
    </section>
  );
}

function LiveSignupShell({
  emailConnected,
  passwordSignIn,
  signupRule,
  sso,
}: {
  emailConnected: boolean;
  passwordSignIn: boolean;
  signupRule: string | null;
  sso: SsoOption | null;
}) {
  const { messages } = useMessages();
  const copy = messages.auth;
  const [values, setValues] = useState<SignupFormValues>(
    createSignupFormValues(),
  );
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successEmail, setSuccessEmail] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleChange(field: keyof SignupFormValues) {
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
      setShowSuccess(false);
      setSuccessMessage(null);
    };
  }

  async function handleResendVerification() {
    if (!successEmail || isResendingVerification) {
      return;
    }

    setBannerMessage(null);
    setIsResendingVerification(true);

    try {
      const response = await fetch("/api/auth/send-verification-email", {
        body: JSON.stringify({
          callbackURL: `${window.location.origin}/dashboard`,
          email: successEmail,
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

      setSuccessMessage(copy.login.resendSuccess);
    } catch {
      setBannerMessage(copy.login.resendFailed);
    } finally {
      setIsResendingVerification(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting || isResendingVerification) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const trimmedValues = trimFormValues({
      email: String(formData.get("signup-email") ?? values.email),
      fullName: String(formData.get("signup-full-name") ?? values.fullName),
      password: String(formData.get("signup-password") ?? values.password),
    });
    const validationResult = signUpSchema.safeParse(trimmedValues);

    if (!validationResult.success) {
      const nextErrors: SignupFormErrors = {};

      for (const issue of validationResult.error.issues) {
        const field = issue.path[0];

        if (field === "email") {
          nextErrors.email = copy.signup.errors.email;
        }

        if (field === "fullName") {
          nextErrors.fullName = copy.signup.errors.fullName;
        }

        if (field === "password") {
          nextErrors.password =
            localizePasswordMessage(
              newPasswordLengthError(trimmedValues.password),
              copy,
            ) ?? copy.password.tooShort;
        }
      }

      setValues(trimmedValues);
      setErrors(nextErrors);
      setBannerMessage(null);
      setShowSuccess(false);
      setSuccessMessage(null);
      return;
    }

    setValues(validationResult.data);
    setErrors({});
    setBannerMessage(null);
    setShowSuccess(false);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const result = await authClient.signUp.email({
      callbackURL: `${window.location.origin}/dashboard`,
      email: validationResult.data.email,
      name: validationResult.data.fullName,
      password: validationResult.data.password,
    });

    if (result.error) {
      const normalizedErrorMessage = normalizeAuthErrorMessage(result.error);

      if (SIGNUP_RULE_ERROR_CODES.has(result.error.code ?? "")) {
        setBannerMessage(
          localizeSignupMessage(result.error.message, copy) ??
            copy.signup.rules.closed,
        );
      } else if (
        normalizedErrorMessage.includes("user already exists") ||
        normalizedErrorMessage.includes("use another email")
      ) {
        setErrors({
          email: copy.signup.errors.emailRegistered,
        });
      } else if (describePasswordRefusal(result.error)) {
        setErrors({
          password:
            localizePasswordMessage(
              describePasswordRefusal(result.error),
              copy,
            ) ?? copy.common.somethingWrong,
        });
      } else {
        setBannerMessage(copy.common.somethingWrong);
      }

      setIsSubmitting(false);
      return;
    }

    setSuccessEmail(validationResult.data.email);
    // With no email provider the confirmation email cannot have gone, so
    // the sender is not told to wait for it (issue #95).
    setSuccessMessage(
      emailConnected
        ? copy.signup.success.checkEmail
        : copy.signup.success.emailNotConnected,
    );
    setShowSuccess(true);
    setIsSubmitting(false);
  }

  return (
    <SignupFormCard
      bannerMessage={bannerMessage}
      errors={errors}
      formLocked={isSubmitting || isResendingVerification}
      isResendingVerification={isResendingVerification}
      isSubmitting={isSubmitting}
      onEmailChange={handleChange("email")}
      onFullNameChange={handleChange("fullName")}
      onPasswordChange={handleChange("password")}
      onResendVerification={
        emailConnected ? handleResendVerification : undefined
      }
      onSsoError={setBannerMessage}
      onSubmit={handleSubmit}
      passwordSignIn={passwordSignIn}
      showSuccess={showSuccess}
      signupRule={localizeSignupMessage(signupRule, copy)}
      sso={sso}
      successMessage={successMessage}
      values={values}
    />
  );
}
