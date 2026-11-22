import assert from "node:assert/strict";
import { test } from "node:test";

import { PERMITTED_USE_PATH, PERMITTED_USE_VERSION } from "./permitted-uses.ts";

test("the permitted-use record keeps a stable path and an ISO version", () => {
  assert.equal(PERMITTED_USE_PATH, "/electronic-signatures");
  assert.match(PERMITTED_USE_VERSION, /^\d{4}-\d{2}-\d{2}$/);
});
