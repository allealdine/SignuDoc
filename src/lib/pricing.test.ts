import assert from "node:assert/strict";
import { test } from "node:test";

import { formatIdr, pricingPlans } from "./pricing.ts";

test("the plans have unique ids and a free entry point", () => {
  const ids = pricingPlans.map((plan) => plan.id);

  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.includes("free"));
  assert.equal(pricingPlans.find((plan) => plan.id === "free")?.monthlyIdr, 0);
});

test("a yearly plan costs less than twelve monthly payments", () => {
  for (const plan of pricingPlans.filter((plan) => plan.monthlyIdr > 0)) {
    assert.ok(
      plan.annualIdr < plan.monthlyIdr * 12,
      `${plan.id} should discount the yearly plan`,
    );
  }
});

test("rupiah amounts use the active language", () => {
  assert.match(formatIdr(29_000, "id"), /29\.000/);
  assert.match(formatIdr(29_000, "en"), /29,000/);
  assert.match(formatIdr(0, "id"), /0/);
});
