/**
 * Public GTM container for Sakta. The ID is visible in the HTML by design, so
 * it is safe as a default; the environment variable lets another deployment
 * use its own container.
 */
export const GTM_CONTAINER_ID =
  process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-5JQ7KGLB";

/** Internal request header: the proxy forwards the pathname to the layout. */
export const ANALYTICS_PATH_HEADER = "x-signudoc-pathname";

// These routes hold documents, account data, or authentication state. Analytics
// must never observe them, not even an aggregate page view.
const PRIVATE_PATH_PREFIXES = [
  "/api/",
  "/dashboard",
  "/envelopes/",
  "/templates",
  "/settings",
  "/sign/",
  "/embed/",
  "/download/",
  "/setup",
  "/two-step-setup",
] as const;

export function isAnalyticsPath(pathname: string): boolean {
  return !PRIVATE_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix),
  );
}
