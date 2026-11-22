import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildTemplateCountLabel,
  formatTemplateDate,
} from "./template-labels.ts";

test("template dates follow the reader's language", () => {
  const timestamp = Date.UTC(2026, 4, 15) / 1000;

  assert.equal(formatTemplateDate(timestamp), "May 15, 2026");
  assert.equal(formatTemplateDate(timestamp, "id"), "15 Mei 2026");
});

test("template counts use localized labels", () => {
  assert.equal(buildTemplateCountLabel(1, "field"), "1 field");
  assert.equal(buildTemplateCountLabel(2, "field"), "2 fields");
  assert.equal(buildTemplateCountLabel(1, "page"), "1 page");
  assert.equal(buildTemplateCountLabel(2, "page"), "2 pages");

  assert.equal(buildTemplateCountLabel(1, "field", "id"), "1 kolom");
  assert.equal(buildTemplateCountLabel(2, "field", "id"), "2 kolom");
  assert.equal(buildTemplateCountLabel(1, "page", "id"), "1 halaman");
  assert.equal(buildTemplateCountLabel(2, "page", "id"), "2 halaman");
});
