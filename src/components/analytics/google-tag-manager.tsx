import Script from "next/script";

import { GTM_CONTAINER_ID } from "@/lib/analytics.ts";

/**
 * Loads the Sakta GTM container. The caller decides whether the current route
 * is public. The container holds the GA4 tag; the application never pushes
 * document, envelope, or signer data to dataLayer.
 */
export function GoogleTagManager() {
  const bootstrap = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${JSON.stringify(GTM_CONTAINER_ID)});`;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {bootstrap}
    </Script>
  );
}
