"use client";

import { useEffect, useState } from "react";

import type { ApiKeySummary } from "@/lib/api-keys";
import { formatMessage } from "@/lib/i18n/format.ts";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";
import { intlLocales } from "@/lib/i18n/types.ts";

// API keys for the public API (/api/v1). Administrators only. A new key is
// shown once, right after it is made, and never again.

const API_DOCS_URL =
  "https://github.com/NYLLON-SOFTWARE/SignuDoc/blob/main/docs/api.md";

function formatDate(seconds: number | null, locale: "en" | "id") {
  if (seconds === null) {
    return null;
  }

  return new Intl.DateTimeFormat(intlLocales[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(seconds * 1000));
}

// The same checks the server makes when a key is used, so that a key the
// API turns away never shows as active. Only a key that could still be
// used, or one stopped only by its owner's closing account, can be revoked.
type KeyStatus = "active" | "expired" | "revoked" | "stopped";

function keyState(
  key: ApiKeySummary,
  now: number,
): { status: KeyStatus; revocable: boolean; tone: string } {
  if (key.revokedAt !== null) {
    return { status: "revoked", revocable: false, tone: "pill-neutral" };
  }

  if (key.expiresAt !== null && key.expiresAt <= now) {
    return { status: "expired", revocable: false, tone: "pill-warning" };
  }

  if (key.ownerClosing) {
    return { status: "stopped", revocable: true, tone: "pill-warning" };
  }

  return { status: "active", revocable: true, tone: "pill-success" };
}

export function ApiKeysPanel() {
  const { locale, messages } = useMessages();
  const copy = messages.settings.apiKeys;
  const [keys, setKeys] = useState<ApiKeySummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Why the list did not load, kept apart from the errors of a change so
  // that making or revoking a key does not hide it, with a way to retry.
  const [listError, setListError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [scope, setScope] = useState<"read" | "write">("write");
  const [expiry, setExpiry] = useState("365");
  const [isCreating, setIsCreating] = useState(false);
  const [newKey, setNewKey] = useState<{ key: string; name: string } | null>(
    null,
  );
  const [copied, setCopied] = useState(false);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);
  // When the list was last read, for telling which keys have expired.
  const [now, setNow] = useState(0);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const response = await fetch("/api/admin/api-keys", {
          cache: "no-store",
        });
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
          keys?: ApiKeySummary[];
        } | null;

        if (cancelled) {
          return;
        }

        if (!response.ok || !payload?.keys) {
          setListError(payload?.error ?? copy.genericError);
          return;
        }

        setNow(Math.floor(Date.now() / 1000));
        setKeys(payload.keys);
        setListError(null);
      } catch {
        if (!cancelled) {
          setListError(copy.genericError);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [revision]);

  async function createKey() {
    // A key on screen stays until Done, so its one-time secret is never lost
    // to a second key that then fails to be made.
    if (newKey) {
      return;
    }

    setIsCreating(true);
    setError(null);
    setCopied(false);

    try {
      const response = await fetch("/api/admin/api-keys", {
        body: JSON.stringify({
          expiresInDays: expiry === "never" ? null : Number(expiry),
          name,
          scope,
        }),
        headers: { "content-type": "application/json" },
        method: "POST",
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        key?: string;
        summary?: ApiKeySummary;
      } | null;

      if (!response.ok || !payload?.key || !payload.summary) {
        setError(payload?.error ?? copy.genericError);
        return;
      }

      const created = payload.summary;

      setNewKey({ key: payload.key, name: created.name });
      setName("");
      // Shown at once, in case reading the list again fails.
      setKeys((current) => (current ? [created, ...current] : current));
      setRevision((value) => value + 1);
    } catch {
      setError(copy.genericError);
    } finally {
      setIsCreating(false);
    }
  }

  async function revokeKey(key: ApiKeySummary) {
    setPendingId(key.id);
    setError(null);

    try {
      const response = await fetch(
        `/api/admin/api-keys/${encodeURIComponent(key.id)}`,
        { method: "DELETE" },
      );
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        key?: ApiKeySummary;
      } | null;

      if (!response.ok) {
        setError(payload?.error ?? copy.genericError);
        return;
      }

      const revoked = payload?.key;

      setRevokingId(null);

      // Shown as revoked at once, in case reading the list again fails.
      if (revoked) {
        setKeys((current) =>
          current
            ? current.map((listed) =>
                listed.id === revoked.id ? revoked : listed,
              )
            : current,
        );
      }

      setRevision((value) => value + 1);
    } catch {
      setError(copy.genericError);
    } finally {
      setPendingId(null);
    }
  }

  async function copyKey() {
    if (!newKey) {
      return;
    }

    try {
      await navigator.clipboard.writeText(newKey.key);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const trimmedName = name.trim();

  return (
    <div className="space-y-5 border-t border-(--border) pt-8">
      <div className="space-y-2">
        <h3 className="text-lg font-extrabold tracking-[-0.02em] text-(--fg)">
          {copy.header.title}
        </h3>
        <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
          {copy.header.descriptionBefore}{" "}
          <a
            className="font-semibold text-(--accent) underline-offset-4 hover:underline"
            href={API_DOCS_URL}
            rel="noreferrer"
            target="_blank"
          >
            {copy.header.docsLink}
          </a>
          {copy.header.descriptionAfter}
        </p>
      </div>

      <div className="grid max-w-xl gap-4 sm:grid-cols-3">
        <label className="grid gap-1.5 sm:col-span-3">
          <span className="text-[0.8125rem] font-semibold text-(--secondary)">
            {copy.form.name}
          </span>
          <input
            autoComplete="off"
            className="field-input"
            disabled={isCreating}
            maxLength={80}
            name="api-key-name"
            onChange={(event) => setName(event.target.value)}
            placeholder={copy.form.namePlaceholder}
            value={name}
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-[0.8125rem] font-semibold text-(--secondary)">
            {copy.form.access}
          </span>
          <select
            className="field-input"
            disabled={isCreating}
            name="api-key-scope"
            onChange={(event) =>
              setScope(event.target.value === "read" ? "read" : "write")
            }
            value={scope}
          >
            <option value="write">{copy.form.scopeWrite}</option>
            <option value="read">{copy.form.scopeRead}</option>
          </select>
        </label>
        <label className="grid gap-1.5">
          <span className="text-[0.8125rem] font-semibold text-(--secondary)">
            {copy.form.expires}
          </span>
          <select
            className="field-input"
            disabled={isCreating}
            name="api-key-expiry"
            onChange={(event) => setExpiry(event.target.value)}
            value={expiry}
          >
            <option value="30">{copy.form.expiry30}</option>
            <option value="90">{copy.form.expiry90}</option>
            <option value="365">{copy.form.expiryYear}</option>
            <option value="never">{copy.form.expiryNever}</option>
          </select>
        </label>
        <div className="flex items-end">
          <button
            className="btn-quiet min-h-12 w-full px-5 text-sm"
            disabled={isCreating || newKey !== null || trimmedName.length === 0}
            onClick={() => void createKey()}
            type="button"
          >
            {isCreating ? copy.form.creating : copy.form.create}
          </button>
        </div>
      </div>

      {newKey ? (
        <div
          className="well grid max-w-2xl gap-3 p-4"
          data-testid="new-api-key"
          role="status"
        >
          <p className="text-sm font-semibold text-(--fg)">
            {formatMessage(copy.newKeyNotice, { name: newKey.name })}
          </p>
          <code className="block overflow-x-auto rounded-lg border border-(--border) bg-(--paper) px-3 py-2 font-mono text-sm break-all text-(--fg)">
            {newKey.key}
          </code>
          <div className="flex flex-wrap gap-2">
            <button
              className="btn-quiet"
              onClick={() => void copyKey()}
              type="button"
            >
              {copied ? copy.copied : copy.copy}
            </button>
            <button
              className="btn-quiet"
              onClick={() => setNewKey(null)}
              type="button"
            >
              {copy.done}
            </button>
          </div>
        </div>
      ) : null}

      {error ? (
        <p className="notice notice-danger max-w-2xl" role="alert">
          {error}
        </p>
      ) : null}

      {listError ? (
        <div
          className="notice notice-danger flex max-w-2xl flex-wrap items-center justify-between gap-2"
          role="alert"
        >
          <span>
            {keys === null
              ? formatMessage(copy.list.loadError, { error: listError })
              : formatMessage(copy.list.staleError, { error: listError })}
          </span>
          <button
            className="btn-quiet"
            onClick={() => setRevision((value) => value + 1)}
            type="button"
          >
            {copy.list.retry}
          </button>
        </div>
      ) : null}

      {keys === null ? null : keys.length === 0 ? (
        <p className="text-sm text-(--secondary)">{copy.list.empty}</p>
      ) : (
        <ul aria-label={copy.list.ariaLabel} className="grid max-w-2xl gap-3">
          {keys.map((key) => {
            const state = keyState(key, now);
            const lastUsed = formatDate(key.lastUsedAt, locale);
            const expires = formatDate(key.expiresAt, locale);

            return (
              <li className="well grid gap-2 p-4" key={key.id}>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[0.9375rem] font-bold text-(--fg)">
                    {key.name}
                  </p>
                  <span className={`pill ${state.tone}`}>
                    {copy.status[state.status]}
                  </span>
                  <span className="pill pill-neutral">
                    {key.scope === "write"
                      ? copy.list.scopeWrite
                      : copy.list.scopeRead}
                  </span>
                </div>
                <p className="font-mono text-sm text-(--secondary)">
                  {key.prefix}…
                </p>
                <p className="text-sm text-(--secondary)">
                  {formatMessage(copy.list.meta.madeBy, {
                    ownerName: key.ownerName,
                    date: formatDate(key.createdAt, locale) ?? "",
                  })}{" "}
                  {lastUsed
                    ? formatMessage(copy.list.meta.lastUsed, { date: lastUsed })
                    : copy.list.meta.notUsed}
                  {key.revokedAt === null && expires
                    ? formatMessage(copy.list.meta.expires, { date: expires })
                    : ""}
                </p>
                {state.status === "stopped" ? (
                  <p className="text-sm text-(--secondary)">
                    {formatMessage(copy.list.ownerClosing, {
                      ownerName: key.ownerName,
                    })}
                  </p>
                ) : null}
                {state.revocable ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {revokingId === key.id ? (
                      <>
                        <span className="text-sm text-(--secondary)">
                          {state.status === "stopped"
                            ? copy.revoke.stoppedConfirm
                            : copy.revoke.confirm}
                        </span>
                        <button
                          className="btn-quiet btn-quiet-danger"
                          disabled={pendingId !== null}
                          onClick={() => void revokeKey(key)}
                          type="button"
                        >
                          {pendingId === key.id
                            ? copy.revoke.revoking
                            : copy.revoke.label}
                        </button>
                        <button
                          className="btn-quiet"
                          disabled={pendingId !== null}
                          onClick={() => setRevokingId(null)}
                          type="button"
                        >
                          {copy.revoke.cancel}
                        </button>
                      </>
                    ) : (
                      <button
                        aria-label={formatMessage(copy.revoke.ariaLabel, {
                          name: key.name,
                        })}
                        className="btn-quiet btn-quiet-danger"
                        disabled={pendingId !== null}
                        onClick={() => setRevokingId(key.id)}
                        type="button"
                      >
                        {copy.revoke.label}
                      </button>
                    )}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
