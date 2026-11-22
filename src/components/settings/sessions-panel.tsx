"use client";

import { useState } from "react";

import { ShellButton } from "@/components/shared/form-shell";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";

// Ends every session this account has, on every device, this one included.
export function SessionsPanel() {
  const copy = useMessages().messages.settings.sessions;
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signOutEverywhere() {
    setIsBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/revoke-sessions", {
        body: "{}",
        headers: { "content-type": "application/json" },
        method: "POST",
      });

      if (!response.ok) {
        setError(copy.genericError);
        return;
      }

      window.location.assign("/login");
    } catch {
      setError(copy.genericError);
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <div className="panel p-6 sm:p-8">
      <div className="space-y-5">
        <h2 className="text-xl font-extrabold tracking-[-0.02em] text-(--fg)">
          {copy.title}
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
          {copy.description}
        </p>
        {error ? (
          <p className="notice notice-danger" role="alert">
            {error}
          </p>
        ) : null}
        <ShellButton
          className="w-fit"
          loading={isBusy}
          onClick={() => void signOutEverywhere()}
          variant="secondary"
        >
          {isBusy ? copy.signingOut : copy.signOut}
        </ShellButton>
      </div>
    </div>
  );
}
