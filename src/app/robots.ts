import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site-url.ts";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard",
        "/settings",
        "/templates",
        "/envelopes/",
        "/sign/",
        "/embed/",
        "/download/",
        "/setup",
        "/two-step-setup",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
