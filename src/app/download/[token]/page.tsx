import type { Metadata } from "next";
import { RenewDownloadButton } from "@/components/downloads/renew-download-button";
import { PublicDocumentShell } from "@/components/layout/public-document-shell";

export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: "Download link expired",
};

type ExpiredDownloadPageProps = {
  params: Promise<{ token: string }>;
};

export default async function ExpiredDownloadPage({
  params,
}: ExpiredDownloadPageProps) {
  const { token } = await params;

  return (
    <PublicDocumentShell
      description="Download links work for a limited time. You can have new ones sent to the email address this document was sent to."
      title="This download link has expired"
    >
      <div className="mx-auto w-full max-w-[52rem]">
        <RenewDownloadButton token={token} />
      </div>
    </PublicDocumentShell>
  );
}
