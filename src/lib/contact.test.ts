import assert from "node:assert/strict";
import { test } from "node:test";

import {
  ContactSubmissionError,
  submitPublicContactMessage,
} from "./contact.ts";

test("contact validation errors follow the request locale", async () => {
  const input = {
    company: "",
    email: "not-an-email",
    message: "",
    name: "",
  };

  for (const [locale, expectedEmail, expectedName] of [
    ["en", "Enter a valid email address", "Enter your name"],
    ["id", "Masukkan alamat surel yang valid", "Masukkan nama Anda"],
  ] as const) {
    await assert.rejects(
      submitPublicContactMessage(input, { locale }),
      (error: unknown) => {
        assert.ok(error instanceof ContactSubmissionError);
        assert.equal(error.fieldErrors.email, expectedEmail);
        assert.equal(error.fieldErrors.name, expectedName);
        return true;
      },
    );
  }
});

test("a filled honeypot is ignored before any message is sent", async () => {
  const result = await submitPublicContactMessage(
    {
      company: "Acme",
      email: "rina@example.com",
      message: "Hello",
      name: "Rina",
    },
    { locale: "id" },
  );

  assert.deepEqual(result, { ignored: true });
});
