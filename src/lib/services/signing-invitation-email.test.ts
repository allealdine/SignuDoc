import assert from "node:assert/strict";
import { test } from "node:test";

import type { Branding } from "../branding.ts";
import {
  buildDeadlineLine,
  buildSigningInvitationEmail,
} from "./signing-invitation-email.ts";

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
  envelopeTitle: "Kontrak",
  senderName: "Sari",
  signerEmail: "budi@example.com",
  signerName: "Budi",
  signingUrl: "https://example.com/sign/token",
};

test("the invitation stays in English by default", () => {
  const message = buildSigningInvitationEmail(input);

  assert.equal(message.subject, 'Sari requested your signature on "Kontrak"');
  assert.match(message.textBody, /^Hi Budi,/);
  assert.match(message.textBody, /Review and sign the document:/);
});

test("the deadline line follows the invitation's language", () => {
  assert.match(
    buildDeadlineLine(1_800_000_000) ?? "",
    /^This request expires on/,
  );
  assert.match(
    buildDeadlineLine(1_800_000_000, "id") ?? "",
    /^Permintaan ini kedaluwarsa pada/,
  );
  assert.equal(buildDeadlineLine(null, "id"), null);
});

test("the invitation can be written in Indonesian", () => {
  const message = buildSigningInvitationEmail({ ...input, locale: "id" });

  assert.equal(
    message.subject,
    "Sari meminta tanda tangan Anda atas “Kontrak”",
  );
  assert.match(message.textBody, /^Hai Budi,/);
  assert.match(message.textBody, /Tinjau dan tanda tangani dokumen:/);
  assert.match(message.textBody, /tidak perlu akun TandaTangan/);
  assert.match(message.htmlBody ?? "", /Tinjau dan tanda tangani dokumen/);
  assert.equal(message.template, "signing_invitation");
});
