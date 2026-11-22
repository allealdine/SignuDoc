import assert from "node:assert/strict";
import test from "node:test";

import { GTM_CONTAINER_ID, isAnalyticsPath } from "./analytics.ts";

test("the Sakta container is a valid public GTM id", () => {
  assert.match(GTM_CONTAINER_ID, /^GTM-[A-Z0-9]+$/);
});

test("analytics is limited to public pages", () => {
  for (const pathname of ["/", "/pricing", "/login", "/signup", "/verify"]) {
    assert.equal(isAnalyticsPath(pathname), true, pathname);
  }

  for (const pathname of [
    "/sign/token",
    "/embed/sign/token",
    "/download/token",
    "/dashboard",
    "/settings",
    "/templates",
    "/envelopes/1",
    "/api/auth/callback/sso",
    "/setup",
    "/two-step-setup",
  ]) {
    assert.equal(isAnalyticsPath(pathname), false, pathname);
  }
});
