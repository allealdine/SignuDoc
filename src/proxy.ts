import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ANALYTICS_PATH_HEADER } from "@/lib/analytics.ts";
import { frameAncestorsFor } from "@/lib/embed-origin";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE_SECONDS,
  LOCALE_HEADER,
  type Locale,
  localeFromAcceptLanguage,
} from "@/lib/i18n/types.ts";
import { supportsDirectUploads } from "@/lib/services/storage/driver";

function resolveLocale(request: NextRequest): Locale {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value;

  if (isLocale(fromCookie)) {
    return fromCookie;
  }

  return (
    localeFromAcceptLanguage(request.headers.get("accept-language")) ??
    DEFAULT_LOCALE
  );
}

const DEFAULT_PERMISSIONS_POLICY = [
  "accelerometer=()",
  "camera=()",
  "geolocation=()",
  "gyroscope=()",
  "microphone=()",
  "payment=()",
  "publickey-credentials-get=()",
  "serial=()",
  "usb=()",
].join(", ");

function isProductionEnvironment() {
  return process.env.NODE_ENV === "production";
}

// The comments toolbar that Vercel adds to preview deployments loads from
// these hosts. They are allowed on previews only, never in production.
// https://vercel.com/docs/vercel-toolbar/managing-toolbar
function isVercelPreview() {
  return process.env.VERCEL === "1" && process.env.VERCEL_ENV === "preview";
}

// With Vercel Blob the upload page sends the PDF straight to the Blob API,
// so the browser must be allowed to connect to it. The address is the one
// the Blob SDK uses, including its override for a stand-in API.
// https://vercel.com/docs/vercel-blob/vercel-signed-urls#presigned-uploads
const DEFAULT_BLOB_API_URL = "https://vercel.com/api/blob";

// GTM loads its container from googletagmanager.com; GA4 sends measurements to
// google-analytics.com and its regional endpoint. No other Google origin is
// needed, and the noscript iframe stays blocked by frame-src 'none'.
const GTM_SCRIPT_SOURCE = "https://www.googletagmanager.com";
const ANALYTICS_REQUEST_SOURCES =
  "https://www.google-analytics.com https://region1.google-analytics.com";

function resolveBlobUploadSource() {
  try {
    if (!supportsDirectUploads()) {
      return false;
    }
  } catch {
    return false;
  }

  const apiUrl =
    process.env.NEXT_PUBLIC_VERCEL_BLOB_API_URL?.trim() || DEFAULT_BLOB_API_URL;

  // The trailing slash limits the allowance to this path and below.
  return `${apiUrl.replace(/\/+$/, "")}/`;
}

function buildContentSecurityPolicy(frameAncestors: string) {
  const preview = isVercelPreview();
  const botProtection = process.env.NEXT_PUBLIC_BOTID === "1";
  const directives: Array<[name: string, sources: Array<string | false>]> = [
    ["default-src", ["'self'"]],
    ["base-uri", ["'self'"]],
    ["frame-ancestors", [frameAncestors]],
    ["form-action", ["'self'"]],
    ["object-src", ["'none'"]],
    [
      "img-src",
      [
        "'self'",
        "data:",
        "blob:",
        ANALYTICS_REQUEST_SOURCES,
        preview && "https://vercel.live https://vercel.com",
      ],
    ],
    [
      "font-src",
      [
        "'self'",
        "data:",
        preview && "https://vercel.live https://assets.vercel.com",
      ],
    ],
    [
      "connect-src",
      [
        "'self'",
        // The field editor reads the just-uploaded PDF back from a blob: URL.
        "blob:",
        resolveBlobUploadSource(),
        ANALYTICS_REQUEST_SOURCES,
        preview && "https://vercel.live wss://ws-us3.pusher.com",
      ],
    ],
    [
      "frame-src",
      [
        preview && "https://vercel.live",
        // BotID's deeper check runs in a hidden frame on this same site.
        // Not yet confirmed against a live deployment; see the note on
        // BotID in docs/self-hosting.md.
        botProtection && "'self'",
        !preview && !botProtection && "'none'",
      ],
    ],
    ["worker-src", ["'self'", "blob:"]],
    [
      "style-src",
      ["'self'", "'unsafe-inline'", preview && "https://vercel.live"],
    ],
    [
      "script-src",
      [
        "'self'",
        "'unsafe-inline'",
        GTM_SCRIPT_SOURCE,
        !isProductionEnvironment() && "'unsafe-eval'",
        preview && "https://vercel.live",
      ],
    ],
  ];

  return directives
    .map(
      ([name, sources]) =>
        `${name} ${sources.filter((source) => source !== false).join(" ")}`,
    )
    .join("; ");
}

function applySecurityHeaders(
  response: NextResponse,
  pathname: string,
  searchParams: URLSearchParams,
) {
  // Only an embedded signing page may be framed, and only by the site its
  // link names (see src/lib/embed-origin.ts). Everything else, never.
  const frameAncestors = frameAncestorsFor(pathname, searchParams);

  response.headers.set(
    "Content-Security-Policy",
    buildContentSecurityPolicy(frameAncestors),
  );
  response.headers.set("Permissions-Policy", DEFAULT_PERMISSIONS_POLICY);
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Content-Type-Options", "nosniff");

  if (frameAncestors === "'none'") {
    response.headers.set("X-Frame-Options", "DENY");
  }

  if (isProductionEnvironment()) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
    );
  }

  if (
    !pathname.startsWith("/sign/") &&
    !pathname.startsWith("/embed/sign/") &&
    !pathname.startsWith("/api/signing/") &&
    !pathname.startsWith("/api/download/") &&
    !pathname.startsWith("/download/")
  ) {
    return response;
  }

  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  if (!response.headers.has("Cache-Control")) {
    response.headers.set("Cache-Control", "private, no-store");
  }

  return response;
}

// The sign-in and sign-up pages send someone already signed in on to their
// documents themselves (redirectIfSignedIn), after asking the auth server.
// This proxy does not: the cookie cache can still vouch for a session for a
// few minutes after it was ended or passed the install's session limits,
// and trusting it here would bounce that visitor between /login and
// /dashboard until it ran out.

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = resolveLocale(request);
  const requestHeaders = new Headers(request.headers);

  // Forwarded upstream only: Client Components cannot read these headers, and
  // no request detail is sent back to the browser with them. The pathname lets
  // the root layout keep analytics away from private routes during SSR.
  requestHeaders.set(LOCALE_HEADER, locale);
  requestHeaders.set(ANALYTICS_PATH_HEADER, pathname);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // API calls from other systems should not acquire a locale cookie. Pages
  // get one so a later request does not depend on the browser header.
  if (!pathname.startsWith("/api/") && !request.cookies.get(LOCALE_COOKIE)) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      httpOnly: false,
      maxAge: LOCALE_COOKIE_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax",
      secure: isProductionEnvironment(),
    });
  }

  return applySecurityHeaders(response, pathname, request.nextUrl.searchParams);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
