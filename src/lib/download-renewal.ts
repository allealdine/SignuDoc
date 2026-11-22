import { type DbExecutor, getDb } from "./db/connection.ts";
import {
  type RenewedDownloadLinks,
  renewRecipientDownloadLinks,
} from "./downloads.ts";
import { formatMessage } from "./i18n/format.ts";
import { getMessages } from "./i18n/messages.ts";
import { DEFAULT_LOCALE, isLocale } from "./i18n/types.ts";
import { recordEmailSent } from "./services/audit.ts";
import { createEmailService, type EmailService } from "./services/email.ts";
import { withUserEmailLegalFooter } from "./services/email-legal-footer.ts";
import { getBranding } from "./settings.ts";
import { RECIPIENT_DOWNLOAD_LINK_TTL_SECONDS } from "./types/domain.ts";
import { escapeHtml } from "./utils/html.ts";

const TTL_DAYS = RECIPIENT_DOWNLOAD_LINK_TTL_SECONDS / (24 * 60 * 60);

/** Sends fresh download links to the signer an expired link belonged to. */
export async function sendFreshDownloadLinks(
  token: string,
  {
    database = getDb(),
    emailService = createEmailService(),
  }: { database?: DbExecutor; emailService?: EmailService } = {},
): Promise<RenewedDownloadLinks> {
  const branding = await getBranding();

  return renewRecipientDownloadLinks(token, {
    database,
    async sendLinks({ envelope, evidenceUrl, signedUrl, signer }) {
      const locale = isLocale(signer.locale) ? signer.locale : DEFAULT_LOCALE;
      const copy = getMessages(locale).email.downloadLinks;
      const values = {
        days: String(TTL_DAYS),
        productName: branding.productName,
        title: envelope.title,
      };
      const greeting = formatMessage(copy.greeting, {
        signerName: signer.name,
      });
      const subject = formatMessage(copy.subject, values);
      const textBody = [
        greeting,
        "",
        formatMessage(copy.intro, values),
        "",
        ...(signedUrl
          ? [formatMessage(copy.signedPdf, { url: signedUrl })]
          : []),
        formatMessage(copy.certificate, { url: evidenceUrl }),
        "",
        copy.keep,
      ].join("\n");
      const htmlBody = [
        `<p>${escapeHtml(greeting)}</p>`,
        `<p>${escapeHtml(formatMessage(copy.intro, values))}</p>`,
        "<p>",
        signedUrl
          ? `<a href="${escapeHtml(signedUrl)}">${escapeHtml(copy.ctaSigned)}</a><br />`
          : "",
        `<a href="${escapeHtml(evidenceUrl)}">${escapeHtml(copy.ctaCertificate)}</a></p>`,
        `<p>${escapeHtml(copy.keep)}</p>`,
      ].join("");
      const body = withUserEmailLegalFooter(
        { htmlBody, textBody },
        branding,
        process.env,
        locale,
      );
      const delivery = await emailService.send({
        htmlBody: body.htmlBody,
        subject,
        template: "download_links",
        textBody: body.textBody,
        to: signer.email,
      });

      await recordEmailSent(
        {
          envelopeId: envelope.id,
          messageId: delivery.messageId,
          recipient: signer.email,
          signerId: signer.id,
          template: "download_links",
        },
        database,
      );
    },
  });
}
