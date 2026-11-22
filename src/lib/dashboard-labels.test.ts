import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildDashboardContextLine,
  buildDashboardStatusLabel,
  formatDashboardDate,
} from "./dashboard-labels.ts";

const now = 1_800_000_000;

function envelope(
  status: "completed" | "declined" | "draft" | "sent" | "voided",
  overrides: Record<string, unknown> = {},
) {
  return {
    expiresAt: null,
    status,
    updatedAt: now,
    voidedAt: null,
    ...overrides,
  };
}

function signer(email: string, status = "pending") {
  return { email, status };
}

test("dashboard dates follow the reader's language", () => {
  const timestamp = Date.UTC(2026, 2, 15) / 1000;

  assert.equal(formatDashboardDate(timestamp), "Mar 15, 2026");
  assert.equal(formatDashboardDate(timestamp, "id"), "15 Mar 2026");
});

test("draft card context is localized without English plurals", () => {
  const draft = envelope("draft");

  assert.equal(
    buildDashboardContextLine(draft, [signer("a@x"), signer("b@x")], 6),
    "2 signers · 6 fields placed",
  );
  assert.equal(
    buildDashboardContextLine(draft, [signer("a@x")], 1, "id"),
    "1 penandatangan · 1 kolom dipasang",
  );
});

test("sent, completed, declined and voided context lines are localized", () => {
  assert.equal(
    buildDashboardContextLine(
      envelope("completed"),
      [signer("a@x"), signer("b@x")],
      0,
      "id",
    ),
    "Dikirim ke: a@x, b@x",
  );
  assert.equal(
    buildDashboardContextLine(envelope("sent"), [signer("a@x")], 0, "id"),
    "Menunggu: a@x",
  );
  assert.equal(
    buildDashboardContextLine(
      envelope("declined"),
      [signer("a@x", "declined")],
      0,
    ),
    "Declined by: a@x",
  );
  assert.equal(
    buildDashboardContextLine(
      envelope("voided", { voidedAt: Date.UTC(2026, 2, 10) / 1000 }),
      [],
      0,
      "id",
    ),
    "Dibatalkan pada 10 Mar 2026",
  );
});

test("an expired envelope says so in the reader's language", () => {
  const expired = envelope("sent", { expiresAt: 1_600_000_000 });

  assert.match(
    buildDashboardContextLine(expired, [signer("a@x")], 0),
    /^Expired .*was waiting on: a@x$/,
  );
  assert.match(
    buildDashboardContextLine(expired, [signer("a@x")], 0, "id"),
    /^Kedaluwarsa .*sebelumnya menunggu: a@x$/,
  );
  assert.equal(buildDashboardStatusLabel(expired, [], "id"), "Kedaluwarsa");
});

test("status pills are localized, including signing progress", () => {
  const sent = envelope("sent");
  const signers = [signer("a@x", "signed"), signer("b@x")];

  assert.equal(buildDashboardStatusLabel(sent, signers), "1 of 2 signed");
  assert.equal(
    buildDashboardStatusLabel(sent, signers, "id"),
    "1 dari 2 sudah menandatangani",
  );
  assert.equal(buildDashboardStatusLabel(envelope("draft"), []), "Draft");
  assert.equal(buildDashboardStatusLabel(envelope("draft"), [], "id"), "Draf");
});
