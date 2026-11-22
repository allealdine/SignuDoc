import { isEnvelopeExpired } from "./envelope-deadline.ts";
import { formatMessage } from "./i18n/format.ts";
import { getMessages } from "./i18n/messages.ts";
import { DEFAULT_LOCALE, type Locale } from "./i18n/types.ts";

type DashboardEnvelopeStatus =
  | "completed"
  | "declined"
  | "draft"
  | "sent"
  | "voided";

type LabelEnvelope = {
  expiresAt?: number | null;
  status: DashboardEnvelopeStatus;
  updatedAt: number;
  voidedAt?: number | null;
};

type LabelSigner = {
  email: string;
  status: string;
};

const intlLocales: Record<Locale, string> = {
  en: "en-US",
  id: "id-ID",
};

/** The short date shown on dashboard cards, in the reader's language. */
export function formatDashboardDate(
  timestamp: number,
  locale: Locale = DEFAULT_LOCALE,
): string {
  return new Intl.DateTimeFormat(intlLocales[locale], {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(timestamp * 1000));
}

/** The second line of a dashboard card: who or what the envelope awaits. */
export function buildDashboardContextLine(
  envelope: LabelEnvelope,
  signers: readonly LabelSigner[],
  fieldCount: number,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const copy = getMessages(locale).dashboard.card.context;

  if (envelope.status === "completed") {
    const sentTo = signers.map((signer) => signer.email).join(", ");
    return sentTo
      ? formatMessage(copy.completed, { emails: sentTo })
      : copy.completedEmpty;
  }

  if (envelope.status === "sent") {
    // Everyone whose turn it is: one signer, or all of a step that signs
    // at the same time.
    const waiting = signers.filter((signer) => signer.status === "notified");
    const currentSigners =
      waiting.length > 0
        ? waiting
        : signers.filter((signer) => signer.status === "pending").slice(0, 1);
    const waitingOn =
      currentSigners.length > 0
        ? currentSigners.map((signer) => signer.email).join(", ")
        : "—";

    if (isEnvelopeExpired(envelope, Math.floor(Date.now() / 1000))) {
      return formatMessage(copy.expiredWaiting, {
        date: formatDashboardDate(envelope.expiresAt!, locale),
        emails: waitingOn,
      });
    }

    return formatMessage(copy.sentWaiting, { emails: waitingOn });
  }

  if (envelope.status === "declined") {
    const declinedSigner = signers.find(
      (signer) => signer.status === "declined",
    );
    return formatMessage(copy.declined, {
      email: declinedSigner?.email ?? "—",
    });
  }

  if (envelope.status === "voided") {
    return formatMessage(copy.voided, {
      date: formatDashboardDate(
        envelope.voidedAt ?? envelope.updatedAt,
        locale,
      ),
    });
  }

  return [
    formatMessage(
      signers.length === 1 ? copy.draftSigners : copy.draftSignersPlural,
      { count: signers.length },
    ),
    formatMessage(
      fieldCount === 1 ? copy.draftFields : copy.draftFieldsPlural,
      { count: fieldCount },
    ),
  ].join(" · ");
}

/** The text of a dashboard card's status pill. */
export function buildDashboardStatusLabel(
  envelope: LabelEnvelope,
  signers: readonly LabelSigner[],
  locale: Locale = DEFAULT_LOCALE,
): string {
  const copy = getMessages(locale).dashboard.card.statuses;

  if (isEnvelopeExpired(envelope, Math.floor(Date.now() / 1000))) {
    return copy.expired;
  }

  // With one signer "Sent" says it all. With several, say how many are done.
  if (envelope.status === "sent" && signers.length > 1) {
    const signedCount = signers.filter(
      (signer) => signer.status === "signed",
    ).length;

    return formatMessage(copy.signedProgress, {
      signed: signedCount,
      total: signers.length,
    });
  }

  return copy[envelope.status];
}
