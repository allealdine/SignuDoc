import { NextResponse } from "next/server";

import {
  ContactSubmissionError,
  submitPublicContactMessage,
} from "@/lib/contact";
import { getMessages } from "@/lib/i18n/messages.ts";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_HEADER,
  localeFromAcceptLanguage,
} from "@/lib/i18n/types.ts";
import { rejectBots } from "@/lib/security/botid";
import { logRouteError, logSecurityEvent } from "@/lib/security/logging";
import {
  getClientIpAddress,
  getRequestPathname,
  getRequestUserAgent,
} from "@/lib/security/request";
import {
  applyRateLimit,
  buildRateLimitKey,
} from "@/lib/security/route-controls";
import { isHostedMode } from "@/lib/utils/env";

export async function POST(request: Request) {
  // The public contact form belongs to the hosted service. Other installs
  // have no such page, so there is nothing for this route to accept.
  if (!isHostedMode()) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  // Read the Request directly: the proxy forwards the browser's locale in a
  // private header, and cookie-derived pages send the same value on fetch.
  const forwardedLocale = request.headers.get(LOCALE_HEADER);
  const locale = isLocale(forwardedLocale)
    ? forwardedLocale
    : (localeFromAcceptLanguage(request.headers.get("accept-language")) ??
      DEFAULT_LOCALE);
  const ipAddress = getClientIpAddress(request.headers);
  const userAgent = getRequestUserAgent(request.headers);
  const rateLimitResponse = await applyRateLimit({
    category: "contact_form_submit",
    key: buildRateLimitKey([
      "contact-form",
      ipAddress ?? userAgent ?? "unknown",
    ]),
    limit: 5,
    request,
    windowMs: 60 * 60 * 1000,
  });

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const botResponse = await rejectBots(request);

  if (botResponse) {
    return botResponse;
  }

  const payload = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;

  try {
    const result = await submitPublicContactMessage(
      {
        company:
          typeof payload?.company === "string" ? payload.company : undefined,
        email: String(payload?.email ?? ""),
        message: String(payload?.message ?? ""),
        name: String(payload?.name ?? ""),
      },
      { locale },
    );

    if (result.ignored) {
      logSecurityEvent("info", {
        category: "contact_form_honeypot",
        ipAddress,
        message:
          "Ignored public contact form submission with honeypot content.",
        metadata: {
          userAgent,
        },
        path: getRequestPathname(request),
      });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    if (error instanceof ContactSubmissionError) {
      return NextResponse.json(
        {
          error: error.message,
          fieldErrors: error.fieldErrors,
        },
        { status: error.statusCode },
      );
    }

    logRouteError(error, {
      category: "contact_form_submit_failure",
      ipAddress,
      message: "Unexpected failure while sending a public contact message.",
      metadata: {
        userAgent,
      },
      path: getRequestPathname(request),
    });

    return NextResponse.json(
      {
        error: getMessages(locale).contact.form.errors.generic,
      },
      { status: 500 },
    );
  }
}
