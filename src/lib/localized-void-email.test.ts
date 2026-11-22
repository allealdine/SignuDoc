import assert from "node:assert/strict";
import { test } from "node:test";

import type { Branding } from "./branding.ts";
import { buildVoidNotificationEmail } from "./envelopes.ts";

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
  senderName: "Sari",
  signerEmail: "budi@example.com",
  signerName: "Budi",
  signerSigned: true,
};

test("a void notification stays in English by default", () => {
  const message = buildVoidNotificationEmail({ ...input, locale: "en" });

  assert.equal(message.subject, '"Kontrak" was voided by Sari');
  assert.equal(message.template, "void_notification");
  assert.match(message.textBody, /^Hi Budi,/);
  assert.match(
    message.textBody,
    /has been canceled, so the document you signed/,
  );
});

test("a void notification can be written in Indonesian", () => {
  const message = buildVoidNotificationEmail({ ...input, locale: "id" });

  assert.equal(message.subject, '"Kontrak" dibatalkan oleh Sari');
  assert.equal(message.template, "void_notification");
  assert.match(message.textBody, /^Hai Budi,/);
  assert.match(message.textBody, /Proses penandatanganan dibatalkan/);
  assert.match(message.textBody, /dokumen yang Anda tandatangani/);
});

test("a signer who had not signed gets the shorter outcome", () => {
  const message = buildVoidNotificationEmail({
    ...input,
    locale: "id",
    signerSigned: false,
  });

  assert.doesNotMatch(message.textBody, /dokumen yang Anda tandatangani/);
});
