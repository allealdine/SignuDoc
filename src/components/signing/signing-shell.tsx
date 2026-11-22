"use client";

import { useMessages } from "@/lib/i18n/messages-provider.tsx";
import type {
  SigningPayload,
  SigningVerificationState,
} from "@/lib/schemas/signing";
import { EmbedParentMessage } from "./embed-parent-message";
import { SignerVerificationScreen } from "./signer-verification-screen";
import {
  type ProviderSignatureProblem,
  SigningLiveShell,
} from "./signing-live-shell";
import { SigningStateScreen } from "./signing-state-screen";

type SigningUnavailableState =
  | "already-signed"
  | "completed"
  | "declined"
  | "error"
  | "expired"
  | "voided";

type SigningShellProps = {
  /**
   * Set on an embedded signing page: the site framing it, which is told
   * when the signer signs or declines, or why the page cannot be used.
   */
  embedOrigin?: string | null;
  initialState?: SigningUnavailableState;
  record?: SigningPayload;
  /** Set when the signer came back from a signing provider without signing. */
  signatureProblem?: ProviderSignatureProblem | null;
  token: string;
  verification?: SigningVerificationState;
};

export function SigningShell({
  embedOrigin = null,
  initialState,
  record,
  signatureProblem,
  token,
  verification,
}: SigningShellProps) {
  const { messages } = useMessages();

  if (record) {
    return (
      <SigningLiveShell
        embedOrigin={embedOrigin}
        record={record}
        signatureProblem={signatureProblem}
      />
    );
  }

  if (verification) {
    return <SignerVerificationScreen state={verification} token={token} />;
  }

  const state = initialState ?? "error";
  const tokenState = messages.signing.states[state];

  return (
    <>
      {embedOrigin ? (
        <EmbedParentMessage
          message={{ state, type: "signudoc:error" }}
          origin={embedOrigin}
        />
      ) : null}
      <SigningStateScreen
        description={
          embedOrigin && state === "expired"
            ? messages.signing.states.embeddedExpiredDescription
            : tokenState.description
        }
        title={tokenState.title}
      />
    </>
  );
}
