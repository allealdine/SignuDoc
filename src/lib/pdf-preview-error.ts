// Why a PDF could not be shown in the editor, in words a sender can act on.
// Kept apart from the upload page so it can be tested without a browser.

export const LOCKED_PDF_MESSAGE =
  "This PDF is password-protected or encrypted. Please upload an unlocked PDF.";

export const PREVIEW_UNAVAILABLE_MESSAGE =
  "We couldn't render this PDF in the editor. Please export it as a standard PDF and try again.";

/**
 * PDF.js refuses a file that needs a password to open with a
 * PasswordException before anything is uploaded. That is the same refusal
 * the server gives an encrypted file, so it gets the same message, not the
 * render failure every other preview error gets (issue #54).
 */
/** Lets callers pick a translated message without duplicating this check. */
export function isLockedPdfFailure(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { name?: unknown }).name === "PasswordException"
  );
}

export function describePdfPreviewFailure(error: unknown): string {
  return isLockedPdfFailure(error)
    ? LOCKED_PDF_MESSAGE
    : PREVIEW_UNAVAILABLE_MESSAGE;
}
