"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, type CSSProperties, useRef, useState } from "react";

import { BrandLogo } from "@/components/layout/brand";
import {
  brandPaletteVariables,
  buildBrandPalette,
  DEFAULT_BRAND_COLOR,
  DEFAULT_BRAND_PALETTE,
  normalizeBrandColor,
} from "@/lib/brand-color";
import { LOGO_CONTENT_TYPES, MAX_LOGO_BYTES } from "@/lib/branding";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";

// The install's own logo and color, on the Organization tab in Settings.
//
// The logo is saved as soon as it is chosen. The color is part of the form
// around this panel and is saved with it.

type BrandingPanelProps = {
  brandColor: string;
  brandColorError?: string;
  disabled: boolean;
  logoUrl: string | null;
  onBrandColorChange: (value: string) => void;
  onLogoChange: (logoUrl: string | null) => void;
};

type LogoResponse = { error?: string; logoUrl?: string | null } | null;

export function BrandingPanel({
  brandColor,
  brandColorError,
  disabled,
  logoUrl,
  onBrandColorChange,
  onLogoChange,
}: BrandingPanelProps) {
  const router = useRouter();
  const copy = useMessages().messages.settings.branding;
  const fileInput = useRef<HTMLInputElement>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [logoBusy, setLogoBusy] = useState<"removing" | "uploading" | null>(
    null,
  );

  const typedColor = normalizeBrandColor(brandColor);
  const palette =
    (typedColor ? buildBrandPalette(typedColor) : null) ??
    DEFAULT_BRAND_PALETTE;
  const darkened = typedColor !== null && palette.accent !== typedColor;

  async function sendLogo(file: File | null) {
    setLogoError(null);
    setLogoBusy(file ? "uploading" : "removing");

    try {
      const response = await fetch("/api/admin/logo", {
        body: file,
        headers: file ? { "content-type": "application/octet-stream" } : {},
        method: file ? "PUT" : "DELETE",
      });
      const payload = (await response.json().catch(() => null)) as LogoResponse;

      if (!response.ok || !payload || payload.logoUrl === undefined) {
        setLogoError(payload?.error ?? copy.genericError);
        return;
      }

      onLogoChange(payload.logoUrl);
      // The header above this page shows the logo too.
      router.refresh();
    } catch {
      setLogoError(copy.genericError);
    } finally {
      setLogoBusy(null);
    }
  }

  function handleFileChosen(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    // So choosing the same file again, after an error, is still a change.
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!(LOGO_CONTENT_TYPES as readonly string[]).includes(file.type)) {
      setLogoError(copy.logo.invalidType);
      return;
    }

    if (file.size > MAX_LOGO_BYTES) {
      setLogoError(copy.logo.tooLarge);
      return;
    }

    void sendLogo(file);
  }

  const busy = disabled || logoBusy !== null;

  return (
    <div className="space-y-5 border-t border-(--border) pt-8">
      <div className="space-y-2">
        <h3 className="text-lg font-extrabold tracking-[-0.02em] text-(--fg)">
          {copy.logo.title}
        </h3>
        <p className="max-w-2xl text-sm leading-6 text-(--secondary)">
          {copy.description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="well space-y-4 p-4">
          <p className="text-[0.8125rem] font-semibold text-(--secondary)">
            {copy.logo.subtitle}
          </p>
          <div className="flex min-h-16 items-center rounded-xl bg-(--paper) px-4 py-3">
            {logoUrl ? (
              <BrandLogo src={logoUrl} />
            ) : (
              <span className="text-sm leading-6 text-(--tertiary)">
                {copy.logo.empty}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              accept={LOGO_CONTENT_TYPES.join(",")}
              aria-label={copy.logo.ariaLabel}
              className="hidden"
              disabled={busy}
              onChange={handleFileChosen}
              ref={fileInput}
              tabIndex={-1}
              type="file"
            />
            <button
              className="btn-quiet"
              disabled={busy}
              onClick={() => fileInput.current?.click()}
              type="button"
            >
              {logoBusy === "uploading"
                ? copy.logo.uploading
                : logoUrl
                  ? copy.logo.replace
                  : copy.logo.upload}
            </button>
            {logoUrl ? (
              <button
                className="btn-quiet btn-quiet-danger"
                disabled={busy}
                onClick={() => void sendLogo(null)}
                type="button"
              >
                {logoBusy === "removing"
                  ? copy.logo.removing
                  : copy.logo.remove}
              </button>
            ) : null}
          </div>
          {logoError ? (
            <p className="text-xs font-semibold text-(--danger)" role="alert">
              {logoError}
            </p>
          ) : (
            <p className="text-xs leading-5 text-(--tertiary)">
              {copy.logo.fileHelper}
            </p>
          )}
        </div>

        <div className="well space-y-4 p-4">
          <label
            className="block text-[0.8125rem] font-semibold text-(--secondary)"
            htmlFor="brand-color"
          >
            {copy.color.label}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              aria-label={copy.color.pickerAriaLabel}
              className="size-12 shrink-0 cursor-pointer rounded-xl border-[1.5px] border-(--border-strong) bg-(--paper) p-1 disabled:cursor-not-allowed"
              disabled={disabled}
              onChange={(event) => onBrandColorChange(event.target.value)}
              type="color"
              value={typedColor ?? DEFAULT_BRAND_COLOR}
            />
            <input
              aria-describedby="brand-color-description"
              aria-invalid={brandColorError ? true : undefined}
              autoCapitalize="none"
              autoComplete="off"
              className="field-input w-36 font-mono"
              disabled={disabled}
              id="brand-color"
              maxLength={16}
              name="brand-color"
              onChange={(event) => onBrandColorChange(event.target.value)}
              placeholder={DEFAULT_BRAND_COLOR}
              spellCheck={false}
              value={brandColor}
            />
            {brandColor ? (
              <button
                className="btn-quiet"
                disabled={disabled}
                onClick={() => onBrandColorChange("")}
                type="button"
              >
                {copy.color.default}
              </button>
            ) : null}
          </div>
          {/* What the color will look like, before it is saved. */}
          <div
            aria-hidden="true"
            className="flex flex-wrap items-center gap-3 rounded-xl bg-(--paper) px-4 py-3"
            style={brandPaletteVariables(palette) as CSSProperties}
          >
            <span className="inline-flex min-h-9 items-center rounded-[0.75rem] bg-(--accent) px-3.5 text-[0.8125rem] font-bold text-white">
              {copy.preview.button}
            </span>
            <span className="pill pill-accent">{copy.preview.status}</span>
            <span className="text-[0.8125rem] font-semibold text-(--accent-ink) underline decoration-[rgb(var(--accent-rgb)/0.35)] underline-offset-4">
              {copy.preview.link}
            </span>
          </div>
          {brandColorError ? (
            <p
              className="text-xs font-semibold text-(--danger)"
              id="brand-color-description"
              role="alert"
            >
              {brandColorError}
            </p>
          ) : (
            <p
              className="text-xs leading-5 text-(--tertiary)"
              id="brand-color-description"
            >
              {darkened ? copy.color.lightWarning : copy.color.helper}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
