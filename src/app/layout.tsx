import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SIGNUDOC_NAME } from "@/lib/branding.ts";
import { getMessages } from "@/lib/i18n/messages.ts";
import { MessagesProvider } from "@/lib/i18n/messages-provider.tsx";
import { getRequestLocale } from "@/lib/i18n/request.ts";
import { SITE_URL } from "@/lib/site-url.ts";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-ui",
  weight: ["400", "500", "600"],
});

// A high-contrast serif reserved for headings: formal and a little more
// decorative than the interface sans, without touching body copy or controls.
const inter = Inter({
  display: "swap",
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
});

const siteUrl = new URL(SITE_URL);
const siteDescription =
  "Free e-signature software for small businesses. Upload, send, sign — no enterprise circus required.";
const shareImage = {
  url: new URL("/img/og.png", siteUrl),
  width: 1200,
  height: 630,
  alt: SIGNUDOC_NAME,
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: SIGNUDOC_NAME,
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: SIGNUDOC_NAME,
    title: SIGNUDOC_NAME,
    description: siteDescription,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImage],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const messages = getMessages(locale);

  return (
    <html lang={locale}>
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} antialiased`}
      >
        <MessagesProvider locale={locale} messages={messages}>
          <TooltipProvider>{children}</TooltipProvider>
        </MessagesProvider>
      </body>
    </html>
  );
}
