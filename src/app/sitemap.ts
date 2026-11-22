import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site-url.ts";

// Bump this when public copy changes. A build-time date would move on every
// deploy even when the pages visitors and searchers see stay the same.
const publicContentUpdatedAt = new Date("2026-11-22T00:00:00.000Z");

const publicPages = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/verify", changeFrequency: "monthly", priority: 0.6 },
  { path: "/electronic-signatures", changeFrequency: "yearly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/accessibility", changeFrequency: "yearly", priority: 0.3 },
  { path: "/signer-privacy", changeFrequency: "yearly", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: publicContentUpdatedAt,
    changeFrequency,
    priority,
  }));
}
