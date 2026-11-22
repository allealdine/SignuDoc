import { type Branding, SIGNUDOC_NAME } from "../branding.ts";
import { formatMessage } from "../i18n/format.ts";
import { getMessages } from "../i18n/messages.ts";
import type { Locale } from "../i18n/types.ts";
import { type EnvSource, getEnv } from "../utils/env.ts";
import { escapeHtml } from "../utils/html.ts";
import { requireConfigValue } from "./service-config.ts";

type EmailBodyContent = {
  htmlBody: string;
  textBody: string;
};

type FooterLink = {
  label: string;
  url: string;
};

// Links may be pages on this site ("/terms") or the organization's own
// absolute URLs. Either way the email gets an absolute URL.
function buildFooterLinks(
  branding: Branding,
  env: EnvSource,
  locale: Locale,
): FooterLink[] {
  const labels = getMessages(locale).email.legalFooter;
  const candidates: Array<[label: string, url: string | null]> = [
    [labels.terms, branding.termsUrl],
    // Without the organization's own policy, the notice built from the
    // install's settings.
    branding.privacyUrl || branding.hosted
      ? [labels.privacyPolicy, branding.privacyUrl]
      : [labels.privacyNotice, getEnv(env).appUrl ? "/signer-privacy" : null],
    [labels.contact, branding.contactUrl],
  ];
  const links = candidates.filter((candidate): candidate is [string, string] =>
    Boolean(candidate[1]),
  );

  if (links.length === 0) {
    return [];
  }

  const appUrl = requireConfigValue("app", "APP_URL", getEnv(env).appUrl);

  return links.map(([label, url]) => ({
    label,
    url: new URL(url, appUrl).toString(),
  }));
}

/**
 * The install's logo for the top of an email, or nothing when it has none.
 * Email programs fetch it from this site, so it needs the site's address;
 * many hide pictures until asked, which is why the name is the alt text.
 * The hosted service supplies a PNG here while its web header uses SVG.
 */
function buildLogoHeader(branding: Branding, env: EnvSource): string {
  const appUrl = getEnv(env).appUrl;

  if (!branding.logoUrl || !appUrl) {
    return "";
  }

  const source = new URL(
    branding.emailLogoUrl ?? branding.logoUrl,
    appUrl,
  ).toString();

  return [
    '<p style="margin:0 0 24px;">',
    `<img src="${escapeHtml(source)}" alt="${escapeHtml(branding.productName)}" height="40" `,
    'style="display:block;height:40px;width:auto;max-width:240px;border:0;" />',
    "</p>",
  ].join("");
}

/**
 * Appends the footer every email to a person carries: the install's terms,
 * privacy and contact links, where it has them. On a neutral install the
 * footer also names the organization's support address and says the message
 * was sent with SignuDoc, and the organization's logo, when it has one,
 * goes at the top.
 */
export function withUserEmailLegalFooter(
  input: EmailBodyContent,
  branding: Branding,
  env: EnvSource = process.env,
  locale: Locale = "en",
): EmailBodyContent {
  const labels = getMessages(locale).email.legalFooter;
  const links = buildFooterLinks(branding, env, locale);
  const logoHeader = buildLogoHeader(branding, env);
  const textLines: string[] = [];
  const htmlLines: string[] = [];

  for (const link of links) {
    textLines.push("", `${link.label}:`, link.url);
    htmlLines.push(`<a href="${escapeHtml(link.url)}">${link.label}</a>`);
  }

  if (!branding.hosted) {
    if (branding.supportAddress) {
      textLines.push(
        "",
        formatMessage(labels.questions, {
          supportAddress: branding.supportAddress,
        }),
      );
      const questions = formatMessage(labels.questions, {
        supportAddress: `<a href="mailto:${escapeHtml(branding.supportAddress)}">${escapeHtml(branding.supportAddress)}</a>`,
      });
      htmlLines.push(questions);
    }

    const sentBy = formatMessage(
      branding.organizationName ? labels.sentByOrganization : labels.sentBy,
      {
        organizationName: branding.organizationName ?? "",
        productName: SIGNUDOC_NAME,
      },
    );

    textLines.push("", sentBy);
    htmlLines.push(escapeHtml(sentBy));
  }

  if (htmlLines.length === 0) {
    return logoHeader
      ? { htmlBody: `${logoHeader}${input.htmlBody}`, textBody: input.textBody }
      : input;
  }

  const htmlFooter = [
    '<hr style="margin:24px 0;border:none;border-top:1px solid #e2e2e2;" />',
    `<p>${htmlLines.join("<br />")}</p>`,
  ].join("");

  return {
    htmlBody: `${logoHeader}${input.htmlBody}${htmlFooter}`,
    // Each entry starts with an empty line; one more newline puts that
    // empty line between the message and the footer.
    textBody: `${input.textBody}\n${textLines.join("\n")}`,
  };
}
