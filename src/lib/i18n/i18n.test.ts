import assert from "node:assert/strict";
import { test } from "node:test";

import { formatDeadline } from "../envelope-deadline.ts";
import {
  PASSWORD_TOO_LONG_MESSAGE,
  PASSWORD_TOO_SHORT_MESSAGE,
} from "../password-messages.ts";
import {
  localizePasswordMessage,
  localizeSignupMessage,
} from "./auth-messages.ts";
import { formatMessage } from "./format.ts";
import { enMessages } from "./locales/en.ts";
import { idMessages } from "./locales/id.ts";
import { getMessages } from "./messages.ts";
import { formatReminderIntervalMessage } from "./reminder-labels.ts";
import { isLocale, localeFromAcceptLanguage } from "./types.ts";

function messageKeys(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    messageKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

test("Accept-Language picks the first supported language", () => {
  assert.equal(localeFromAcceptLanguage("id-ID,id;q=0.9,en;q=0.8"), "id");
  assert.equal(localeFromAcceptLanguage("en-GB,en;q=0.9"), "en");
  assert.equal(localeFromAcceptLanguage("fr-FR,fr;q=0.9"), null);
  assert.equal(localeFromAcceptLanguage(null), null);
});

test("only en and id are locales", () => {
  assert.equal(isLocale("en"), true);
  assert.equal(isLocale("id"), true);
  assert.equal(isLocale("en-US"), false);
  assert.equal(isLocale(undefined), false);
});

test("the Indonesian dictionary has the same keys as English", () => {
  assert.deepEqual(
    messageKeys(idMessages).sort(),
    messageKeys(enMessages).sort(),
  );
});

test("no dictionary message is left empty", () => {
  for (const [locale, dictionary] of [
    ["en", enMessages],
    ["id", idMessages],
  ] as const) {
    for (const key of messageKeys(dictionary)) {
      const value = key
        .split(".")
        .reduce<unknown>(
          (current, part) =>
            typeof current === "object" && current !== null
              ? (current as Record<string, unknown>)[part]
              : undefined,
          dictionary,
        );

      assert.equal(typeof value, "string", `missing ${locale} message ${key}`);
      assert.notEqual(value, "", `empty ${locale} message ${key}`);
    }
  }
});

test("the active locale selects its dictionary", () => {
  assert.equal(getMessages("en"), enMessages);
  assert.equal(getMessages("id"), idMessages);
  assert.equal(getMessages(), enMessages);
});

test("deadlines are formatted in the active language, always in UTC", () => {
  assert.match(formatDeadline(1_800_000_000), /January/);
  assert.match(formatDeadline(1_800_000_000, "id"), /Januari/);
  assert.match(formatDeadline(1_800_000_000, "id"), /UTC$/);
});

test("formatMessage replaces named placeholders", () => {
  assert.equal(
    formatMessage("Hi {name}, you have {count} messages.", {
      count: 2,
      name: "Rina",
    }),
    "Hi Rina, you have 2 messages.",
  );
  assert.equal(
    formatMessage("Keep {unknown} visible."),
    "Keep {unknown} visible.",
  );
});

test("the privacy notice uses Indonesian law and names its processors", () => {
  const en = enMessages.legal.privacy.sections;
  const id = idMessages.legal.privacy.sections;

  assert.match(en.recipients.items.join(" "), /Resend/);
  assert.match(id.recipients.items.join(" "), /Resend/);
  assert.match(en.incidents.paragraphs.join(" "), /3 × 24 hours/);
  assert.match(id.incidents.paragraphs.join(" "), /3 × 24 jam/);
  assert.match(en.rights.intro, /PDP Law/);
  assert.match(id.rights.intro, /UU PDP/);
  assert.match(en.requests.paragraphs.join(" "), /30 days/);
  assert.match(id.requests.paragraphs.join(" "), /30 hari/);
  assert.match(en.children.paragraphs.join(" "), /18 years/);
  assert.match(id.children.paragraphs.join(" "), /18 \(delapan belas\) tahun/);
  assert.match(en.cookies.intro, /optional analytics/);
  assert.match(id.cookies.intro, /analitik opsional/);
  assert.match(en.recipients.items.join(" "), /Google Analytics/);
  assert.match(id.recipients.items.join(" "), /Google Analytics/);
  assert.doesNotMatch(en.recipients.closing, /have not configured/);
  assert.doesNotMatch(
    id.recipients.closing,
    /tidak mengonfigurasi SMS atau analitik/,
  );
});

test("the accessibility statement stays candid and cites Indonesian law", () => {
  const en = enMessages.legal.accessibility.sections;
  const id = idMessages.legal.accessibility.sections;

  assert.match(en.standards.paragraphs.join(" "), /UU No\. 8 of 2016/);
  assert.match(id.standards.paragraphs.join(" "), /UU Nomor 8 Tahun 2016/);
  assert.match(en.standards.paragraphs.join(" "), /do not claim/);
  assert.match(id.standards.paragraphs.join(" "), /tidak menyatakan/);
  assert.match(en.limitations.items.join(" "), /canvas/);
  assert.match(id.limitations.items.join(" "), /canvas/);
});

test("the contact form and its errors are available in both languages", () => {
  const en = enMessages.contact.form;
  const id = idMessages.contact.form;

  assert.match(en.submit, /Send message/);
  assert.match(id.submit, /Kirim pesan/);
  assert.match(en.success, /\{email\}/);
  assert.match(id.success, /\{email\}/);
  assert.match(en.errors.reviewFields, /highlighted fields/);
  assert.match(id.errors.reviewFields, /kolom yang ditandai/);
});

test("the auth screens have translated copy in both languages", () => {
  const en = enMessages.auth;
  const id = idMessages.auth;

  assert.equal(en.login.title, "Welcome back");
  assert.equal(id.login.title, "Selamat datang kembali");
  assert.equal(en.signup.submit, "Sign up");
  assert.equal(id.signup.submit, "Daftar");
  assert.equal(en.secondStep.eyebrow, "Two-step sign-in");
  assert.equal(id.secondStep.eyebrow, "Masuk dua langkah");

  for (const copy of [en, id]) {
    assert.match(copy.sso.continueWith, /\{provider\}/);
    assert.match(copy.signup.rules.domains, /\{domains\}/);
  }
});

test("canonical auth messages are localized only at the screen", () => {
  assert.equal(
    localizePasswordMessage(PASSWORD_TOO_SHORT_MESSAGE, idMessages.auth),
    idMessages.auth.password.tooShort,
  );
  assert.equal(
    localizePasswordMessage(PASSWORD_TOO_LONG_MESSAGE, idMessages.auth),
    idMessages.auth.password.tooLong,
  );
  assert.equal(
    localizePasswordMessage("Unrelated failure", idMessages.auth),
    "Unrelated failure",
  );
  assert.equal(
    localizeSignupMessage(
      "Accounts can be created with an email address at @a.com or @b.com.",
      idMessages.auth,
    ),
    "Akun dapat dibuat dengan alamat email di @a.com atau @b.com.",
  );
  assert.equal(
    localizeSignupMessage(
      "This site has not been set up yet.",
      idMessages.auth,
    ),
    idMessages.auth.signup.rules.setup,
  );
});

test("the dashboard has translated copy in both languages", () => {
  const en = enMessages.dashboard;
  const id = idMessages.dashboard;

  assert.equal(en.header.title, "Documents");
  assert.equal(id.header.title, "Dokumen");
  assert.equal(en.filters.All, "All");
  assert.equal(id.filters.All, "Semua");
  assert.equal(en.upload, "Upload a PDF");
  assert.equal(id.upload, "Unggah PDF");
  assert.match(en.showing, /\{shown\}.*\{total\}/);
  assert.match(id.showing, /\{shown\}.*\{total\}/);

  for (const copy of [en, id]) {
    assert.match(copy.search, /\.\.\.$/);
    assert.equal(Object.keys(copy.card.statuses).length, 7);
    assert.match(copy.card.status, /\{status\}/);
  }
});

test("the templates surface has translated copy in both languages", () => {
  const en = enMessages.templates;
  const id = idMessages.templates;

  assert.equal(en.header.title, "Templates");
  assert.equal(id.header.title, "Template");
  assert.equal(en.delete.confirm, "Delete template");
  assert.equal(id.delete.confirm, "Hapus template");
  assert.equal(en.sendToMany, "Send to many");
  assert.equal(id.sendToMany, "Kirim massal");

  for (const copy of [en, id]) {
    assert.match(copy.card.meta, /\{pageCount\}.*\{fieldCount\}.*\{saved\}/);
    assert.match(copy.card.roleAriaLabel, /\{templateName\}/);
    assert.match(copy.delete.description.removed, /\{templateName\}/);
    assert.match(copy.delete.triggerAriaLabel, /\{templateName\}/);
  }
});

test("the settings panels have translated copy in both languages", () => {
  const en = enMessages.settings;
  const id = idMessages.settings;

  assert.equal(en.organization.header.title, "Organization");
  assert.equal(id.organization.header.title, "Organisasi");
  assert.equal(en.apiKeys.header.title, "API keys");
  assert.equal(id.apiKeys.header.title, "Kunci API");
  assert.equal(en.webhooks.title, "Webhooks");
  assert.equal(id.webhooks.title, "Webhook");
  assert.equal(en.twoFactor.title, "Two-step sign-in");
  assert.equal(id.twoFactor.title, "Masuk dua langkah");
  assert.equal(en.people.title, "People");
  assert.equal(id.people.title, "Orang");
  assert.equal(en.updates.howTo.title, "How to update");
  assert.equal(id.updates.howTo.title, "Cara memperbarui");

  for (const copy of [en, id]) {
    assert.equal(Object.keys(copy.apiKeys.status).length, 4);
    assert.match(copy.apiKeys.list.loadError, /\{error\}/);
    assert.match(copy.apiKeys.list.meta.madeBy, /\{ownerName\}.*\{date\}/);
    assert.match(copy.apiKeys.revoke.ariaLabel, /\{name\}/);
    assert.match(copy.webhooks.log.attempts, /\{count\}/);
    assert.match(copy.webhooks.newSecretNotice, /\{url\}/);
    assert.match(copy.twoFactor.backupCodes.fileTitle, /\{productName\}/);
    assert.match(copy.people.confirmIdentity.ariaLabel, /\{name\}/);
    assert.match(copy.people.pagination, /\{shown\}.*\{total\}/);
    assert.match(copy.updates.latest, /\{current\}/);
    assert.match(copy.updates.upToDate, /\{version\}/);
  }

  for (const event of Object.keys(en.webhooks.eventLabels)) {
    assert.ok(
      event in id.webhooks.eventLabels,
      `missing ${event} in Indonesian`,
    );
  }
});

test("the app shell and account menus have translated copy", () => {
  const en = enMessages.shell;
  const id = idMessages.shell;

  assert.equal(en.nav.documents, "Documents");
  assert.equal(id.nav.documents, "Dokumen");
  assert.equal(en.sessionMenu.logOut, "Log out");
  assert.equal(id.sessionMenu.logOut, "Keluar");
  assert.equal(en.twoStepSetup.eyebrow, "One more step");
  assert.equal(id.twoStepSetup.eyebrow, "Satu langkah lagi");

  for (const copy of [en, id]) {
    assert.match(copy.accountMenuAriaLabel, /\{name\}/);
    assert.match(copy.twoStepSetup.description, /\{productName\}.*\{email\}/);
    assert.equal(Object.keys(copy.nav).length, 4);
  }
});

test("the envelope editor has translated copy in both languages", () => {
  const en = enMessages.envelope;
  const id = idMessages.envelope;

  assert.equal(en.steps.length, 4);
  assert.equal(id.steps.length, 4);
  assert.equal(en.upload.header.title, "New envelope");
  assert.equal(id.upload.header.title, "Amplop baru");
  assert.equal(en.pdfPage.error.title, "We couldn't render this PDF page.");
  assert.match(id.pdfPage.error.title, /tidak dapat dirender/);
  assert.equal(en.review.actions.send, "Send envelope");
  assert.equal(id.review.actions.send, "Kirim amplop");
  assert.equal(
    en.signers.intro.title,
    "Signers will receive the document in this order.",
  );
  assert.match(id.signers.intro.title, /urutan ini/);
  assert.equal(en.detail.dialogs.void.title, "Void this envelope?");
  assert.match(id.detail.dialogs.void.title, /Batalkan amplop/);
  assert.equal(en.reminderIntervals.everyDay, "Every day");
  assert.equal(id.reminderIntervals.everyDay, "Setiap hari");
  assert.equal(en.prepare.step, "Step 3 of 4");
  assert.equal(id.prepare.step, "Langkah 3 dari 4");
  assert.equal(en.prepare.actions.next, "Next →");
  assert.equal(id.prepare.actions.next, "Lanjut →");
  assert.equal(en.prepare.error.loadTitle, "Couldn't load this document");
  assert.match(id.prepare.error.loadTitle, /tidak dapat dimuat/);
  assert.equal(en.prepare.fieldTools.signature.placeholderLabel, "Sign");
  assert.equal(
    id.prepare.fieldTools.signature.placeholderLabel,
    "Tanda tangan",
  );
  assert.equal(en.prepare.signers.signatureReady, "Signature ready");
  assert.equal(id.prepare.signers.signatureReady, "Tanda tangan siap");

  for (const copy of [en, id]) {
    assert.match(copy.prepare.choiceProblems.dropdown_options, /\{signer\}/);
    assert.match(copy.prepare.choiceProblems.radio_group_size, /\{signer\}/);
    assert.match(copy.prepare.fieldSettings.choicesReady, /\{count\}.*\{max\}/);
    assert.match(copy.prepare.fieldSettings.radioReady, /\{count\}/);
    assert.match(copy.prepare.fields.placedMany, /\{count\}/);
    assert.match(copy.prepare.inspector.placeHint, /\{field\}.*\{signer\}/);
    assert.match(copy.prepare.inspector.toolReady, /\{field\}/);
    assert.match(copy.prepare.optionLabel, /\{number\}/);
    assert.match(copy.prepare.page.label, /\{page\}.*\{count\}/);
    assert.match(copy.prepare.placedRadioLabel, /\{label\}/);
    assert.match(copy.prepare.placement.ariaPlace, /\{field\}.*\{page\}/);
    assert.match(copy.prepare.signerPanel.placing, /\{field\}/);
    assert.match(copy.prepare.signers.fieldsMany, /\{count\}/);
    assert.equal(Object.keys(copy.prepare.fieldTools).length, 9);
    assert.match(copy.placedField.ariaLabel, /\{name\}.*\{label\}/);
    assert.match(copy.placedField.resizeAriaLabel, /\{label\}.*\{corner\}/);
    assert.equal(Object.keys(copy.placedField.corners).length, 4);
    assert.equal(Object.keys(copy.upload.error).length, 5);
    assert.match(copy.pdfPage.ariaLabel, /\{page\}/);
    assert.match(
      copy.review.dialog.summary,
      /\{title\}.*\{signerCount\}.*\{deadlineDays\}/,
    );
    assert.match(
      copy.review.signature.providerDescription,
      /\{providerName\}.*\{qualifiedNote\}/,
    );
    assert.match(
      copy.signers.header.description,
      /Step 2 of 4|Langkah 2 dari 4/,
    );
    assert.match(copy.signers.intro.limit, /\{maxSigners\}/);
    assert.match(copy.signers.route.parallel, /\{previous\}.*\{finishVerb\}/);
    assert.equal(Object.keys(copy.signers.signatureMeaning.options).length, 4);
    assert.equal(Object.keys(copy.signers.checks.options).length, 3);
    assert.equal(Object.keys(copy.signers.fields).length, 2);
    assert.match(copy.detail.deadline.reminderCooldown, /\{date\}/);
    assert.equal(copy.detail.dialogs.deleteFinished.description.length, 3);
    assert.match(copy.detail.viewDocumentAria, /\{title\}/);
    assert.match(copy.reminderIntervals.everyDays, /\{days\}/);
  }
});

test("reminder options follow the active dictionary", () => {
  const en = enMessages.envelope.reminderIntervals;
  const id = idMessages.envelope.reminderIntervals;

  assert.equal(formatReminderIntervalMessage(null, en), "Off");
  assert.equal(formatReminderIntervalMessage(1, id), "Setiap hari");
  assert.equal(formatReminderIntervalMessage(3, id), "Setiap 3 hari");
  assert.equal(formatReminderIntervalMessage(7, en), "Every week");
});

test("the permitted-use page uses the current name and covers Indonesia", () => {
  const en = enMessages.permittedUse;
  const id = idMessages.permittedUse;

  for (const copy of [en, id]) {
    const text = JSON.stringify(copy);

    assert.doesNotMatch(text, /Signudoc/i);
    assert.match(copy.hero.description, /\{platformName\}/);
    assert.match(copy.sections.whatItIsNot.heading, /\{platformName\}/);
  }

  assert.match(en.sections.indonesia.paragraphs.join(" "), /UU ITE/);
  assert.match(id.sections.indonesia.paragraphs.join(" "), /UU ITE/);
  assert.match(
    id.sections.indonesia.paragraphs.join(" "),
    /Penyelenggara Sertifikat Elektronik/,
  );
  assert.match(id.sections.whatItIsNot.items.join(" "), /terkualifikasi/);
});
