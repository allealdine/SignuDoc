import { cookies, headers } from "next/headers";

import { SigningShell } from "@/components/signing/signing-shell";
import { getDb } from "@/lib/db/connection";
import { getMessages } from "@/lib/i18n/messages.ts";
import { MessagesProvider } from "@/lib/i18n/messages-provider.tsx";
import { getRequestLocale } from "@/lib/i18n/request.ts";
import type { SigningVerificationState } from "@/lib/schemas/signing";
import {
  getClientIpAddress,
  getRequestUserAgent,
} from "@/lib/security/request";
import { verifiedMethodsFromCookies } from "@/lib/signer-checks";
import {
  getSigningPayloadForToken,
  SigningAccessError,
  SigningVerificationRequiredError,
} from "@/lib/signing";

type SignPageProps = {
  params: Promise<{
    token: string;
  }>;
  searchParams: Promise<{ signatureProblem?: string | string[] }>;
};

const SIGNATURE_PROBLEMS = ["cancelled", "expired", "failed", "name"] as const;

export default async function SignPage({
  params,
  searchParams,
}: SignPageProps) {
  const { token } = await params;
  const { signatureProblem: problemParam } = await searchParams;
  const signatureProblem =
    SIGNATURE_PROBLEMS.find((problem) => problem === problemParam) ?? null;
  let initialState:
    | "already-signed"
    | "completed"
    | "declined"
    | "error"
    | "expired"
    | "voided"
    | undefined;
  let record: Awaited<ReturnType<typeof getSigningPayloadForToken>> | null =
    null;
  let verification: SigningVerificationState | null = null;

  try {
    const requestHeaders = await headers();
    const cookieStore = await cookies();

    record = await getSigningPayloadForToken(token, {
      database: getDb(),
      requestMeta: {
        ipAddress: getClientIpAddress(requestHeaders),
        userAgent: getRequestUserAgent(requestHeaders),
      },
      verifiedMethods: verifiedMethodsFromCookies(
        token,
        (name) => cookieStore.get(name)?.value,
      ),
    });
  } catch (error) {
    if (error instanceof SigningVerificationRequiredError) {
      verification = error.details;
    } else if (error instanceof SigningAccessError) {
      initialState = error.state;
    } else {
      initialState = "error";
    }
  }

  // The envelope's language wins over the browser's: it is the language of
  // the invitation, the disclosure and the consent the signer records.
  const requestLocale = await getRequestLocale();
  const locale = record?.locale ?? requestLocale;
  const messages = getMessages(locale);

  return (
    <MessagesProvider locale={locale} messages={messages}>
      <SigningShell
        initialState={initialState}
        key={token}
        record={record ?? undefined}
        signatureProblem={signatureProblem}
        token={token}
        verification={verification ?? undefined}
      />
    </MessagesProvider>
  );
}
