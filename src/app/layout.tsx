import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SIGNUDOC_NAME } from "@/lib/branding.ts";
import { getMessages } from "@/lib/i18n/messages.ts";
import { MessagesProvider } from "@/lib/i18n/messages-provider.tsx";
import { getRequestLocale } from "@/lib/i18n/request.ts";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-ui",
  weight: ["400", "500", "600", "700", "800"],
});

// A high-contrast serif reserved for headings: formal and a little more
// decorative than the interface sans, without touching body copy or controls.
const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: SIGNUDOC_NAME,
  description:
    "Free e-signature software for small businesses. Upload, send, sign — no enterprise circus required.",
  icons: {
    icon: "/icon.svg",
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
        className={`${plusJakartaSans.variable} ${playfairDisplay.variable} antialiased`}
      >
        <MessagesProvider locale={locale} messages={messages}>
          <TooltipProvider>{children}</TooltipProvider>
        </MessagesProvider>
      </body>
    </html>
  );
}
