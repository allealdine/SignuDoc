import type { Branding } from "../branding.ts";
import { formatDeadline } from "../envelope-deadline.ts";
import { formatMessage } from "../i18n/format.ts";
import { getMessages } from "../i18n/messages.ts";
import type { Locale } from "../i18n/types.ts";
import { escapeHtml } from "../utils/html.ts";
import type { TransactionalEmailMessage } from "./email.ts";
import { withUserEmailLegalFooter } from "./email-legal-footer.ts";

type SigningInvitationEmailInput = {
  branding: Branding;
  envelopeTitle: string;
  /** The envelope's deadline, when it has one. */
  expiresAt?: number | null;
  /** Language of the invitation and of the signing page it links to. */
  locale?: Locale;
  senderName: string;
  signerEmail: string;
  signerName: string;
  signingUrl: string;
};

/** "This request expires on …", or nothing for an envelope with no deadline. */
export function buildDeadlineLine(
  expiresAt: number | null | undefined,
  locale: Locale = "en",
): string | null {
  return typeof expiresAt === "number"
    ? formatMessage(getMessages(locale).email.signingInvitation.deadline, {
        deadline: formatDeadline(expiresAt, locale),
      })
    : null;
}

export function buildSigningInvitationEmail(
  input: SigningInvitationEmailInput,
): TransactionalEmailMessage {
  const locale = input.locale ?? "en";
  const copy = getMessages(locale).email.signingInvitation;
  const { productName } = input.branding;
  const subject = formatMessage(copy.subject, {
    envelopeTitle: input.envelopeTitle,
    senderName: input.senderName,
  });
  const deadlineLine = buildDeadlineLine(input.expiresAt, locale);
  const textBody = [
    formatMessage(copy.greeting, { signerName: input.signerName }),
    "",
    formatMessage(copy.sent, {
      envelopeTitle: input.envelopeTitle,
      productName,
      senderName: input.senderName,
    }),
    "",
    `${copy.cta}:`,
    input.signingUrl,
    ...(deadlineLine ? ["", deadlineLine] : []),
    "",
    formatMessage(copy.noAccount, { productName }),
    copy.newestLink,
  ].join("\n");
  const htmlBody = [
    `<p>${escapeHtml(formatMessage(copy.greeting, { signerName: input.signerName }))}</p>`,
    `<p>${escapeHtml(
      formatMessage(copy.sent, {
        envelopeTitle: input.envelopeTitle,
        productName,
        senderName: input.senderName,
      }),
    )}</p>`,
    `<p><a href="${escapeHtml(input.signingUrl)}">${escapeHtml(copy.cta)}</a></p>`,
    deadlineLine ? `<p>${escapeHtml(deadlineLine)}</p>` : "",
    `<p>${escapeHtml(formatMessage(copy.noAccount, { productName }))}</p>`,
    `<p>${escapeHtml(copy.newestLink)}</p>`,
  ].join("");
  const legalFooter = withUserEmailLegalFooter(
    {
      htmlBody,
      textBody,
    },
    input.branding,
    process.env,
    locale,
  );

  return {
    htmlBody: legalFooter.htmlBody,
    subject,
    template: "signing_invitation",
    textBody: legalFooter.textBody,
    to: input.signerEmail,
  };
}
