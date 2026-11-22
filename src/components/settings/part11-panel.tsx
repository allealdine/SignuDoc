"use client";

import { useState } from "react";

import { useMessages } from "@/lib/i18n/messages-provider.tsx";

// Part 11 mode. Administrators only. The install's audit trail is in the
// security panel.

export function Part11Panel({ initialEnabled }: { initialEnabled: boolean }) {
  const copy = useMessages().messages.settings.part11;
  const enabled = initialEnabled;
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function changeMode(next: boolean) {
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/part11", {
        body: JSON.stringify({ enabled: next }),
        headers: { "content-type": "application/json" },
        method: "PUT",
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        part11Mode?: boolean;
      } | null;

      if (!response.ok || typeof payload?.part11Mode !== "boolean") {
        setError(payload?.error ?? copy.genericError);
        return;
      }

      // The People list and the retention field depend on the mode.
      window.location.reload();
    } catch {
      setError(copy.genericError);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-5 border-t border-(--border) pt-8" id="part11">
      <div className="space-y-2">
        <h3 className="text-lg font-extrabold tracking-[-0.02em] text-(--fg)">
          {copy.title}
        </h3>
        <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
          {copy.description}
        </p>
        <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
          {copy.disclaimer}
        </p>
      </div>

      {error ? (
        <div className="notice notice-danger" role="alert">
          {error}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <span className={`pill ${enabled ? "pill-success" : "pill-neutral"}`}>
          {enabled ? copy.on : copy.off}
        </span>
        <button
          className={enabled ? "btn-quiet btn-quiet-danger" : "btn-quiet"}
          disabled={isSaving}
          onClick={() => void changeMode(!enabled)}
          type="button"
        >
          {isSaving ? copy.saving : enabled ? copy.turnOff : copy.turnOn}
        </button>
      </div>
    </div>
  );
}
