import assert from "node:assert/strict";
import { test } from "node:test";

import type { Branding } from "./branding.ts";
import { buildReminderEmail } from "./reminders.ts";

const branding: Branding = {
  brandColor: null,
  contactUrl: null,
  emailLogoUrl: null,
  hosted: false,
  logoUrl: null,
  organizationName: null,
  privacyUrl: null,
  productName: "TandaTangan",
  signupAvailable: true,
  supportAddress: null,
  termsUrl: null,
};

const input = {
  branding,
  envelopeId: "envelope-1",
  envelopeTitle: "Kontrak",
  kind: "automatic" as const,
  senderName: "Sari",
  signerEmail: "budi@example.com",
  signerName: "Budi",
  signingUrl: "https://example.com/sign/token",
};

test("an automatic reminder stays in English by default", () => {
  const message = buildReminderEmail(input);

  assert.equal(
    message.subject,
    'Reminder: Sari is waiting for your signature on "Kontrak"',
  );
  assert.match(message.textBody, /^Hi Budi,/);
  assert.equal(message.template, "automatic_reminder");
});

test("an automatic reminder can be written in Indonesian", () => {
  const message = buildReminderEmail({ ...input, locale: "id" });

  assert.equal(
    message.subject,
    'Pengingat: Sari masih menunggu tanda tangan Anda atas "Kontrak"',
  );
  assert.match(message.textBody, /^Hai Budi,/);
  assert.match(message.textBody, /Tinjau dan tanda tangani dokumen:/);
  assert.match(message.textBody, /tidak perlu akun TandaTangan/);
  assert.equal(message.template, "automatic_reminder");
});

test("a manual nudge has its own localized subject", () => {
  const message = buildReminderEmail({
    ...input,
    kind: "manual",
    locale: "id",
  });

  assert.equal(
    message.subject,
    'Sari mengirimi Anda pengingat untuk menandatangani "Kontrak"',
  );
  assert.equal(message.template, "manual_nudge");
});
