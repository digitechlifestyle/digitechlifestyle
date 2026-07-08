import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FreeToolsModal } from "@/components/FreeToolsModal";
import { CleanUrl } from "@/components/CleanUrl";
import { GoogleAd } from "@/components/GoogleAd";
import { site } from "@/lib/site";

const metaDescription =
  "Plain-English crypto, AI, wallet safety, exchange reviews, scam warnings, and digital lifestyle guides for UK readers.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Crypto, AI & Digital Lifestyle Guides`,
    template: `%s | ${site.name}`,
  },
  description: metaDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.name,
    description: metaDescription,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [{ url: `${site.url}/images/resource-hub-hero.png`, width: 1672, height: 941, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: metaDescription,
    images: [`${site.url}/images/resource-hub-hero.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    logo: `${site.url}/favicon.svg`,
    sameAs: [
      "https://x.com/joedigitals",
      "https://www.facebook.com/digitechlifestyle",
      "https://www.youtube.com/@digitechlifestyle",
    ],
    founder: {
      "@type": "Person",
      name: "Joe Robertson",
      url: `${site.url}/about`,
      description: "Independent UK crypto and AI writer since 2017. Educational content only — no financial advice.",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      {/* AdSense's own loader inserts additional <script> tags directly into
          <head> outside React (an internal "show_ads_impl" file it fetches),
          which shifts sibling positions and trips React's head-diffing even
          though our own scripts are unaffected. suppressHydrationWarning is
          the documented escape hatch for DOM nodes mutated by third-party
          scripts outside React's control. */}
      <head suppressHydrationWarning>
        {/* Inline script prevents flash of wrong theme on load — must run
            synchronously before paint, so it stays a raw script tag. It
            mutates <html> outside React's control by design; suppressHydrationWarning
            on <html> above tells React not to warn about that specific, expected diff. */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: `(function(){try{var h=new Date().getHours();if(h>=7&&h<20){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();` }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        {/* Third-party scripts load after hydration (next/script "afterInteractive")
            instead of raw <script> tags in <head> — AdSense/GA were injecting their
            own script elements into <head> before React finished hydrating, which
            shifted sibling positions and triggered a second, unrelated hydration
            mismatch on the theme/GA script slots. */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-M5KCLHJ9JH" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-M5KCLHJ9JH');`}
        </Script>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7177380383874452"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Header />
        <GoogleAd position="header" />
        {children}
        <Footer />
        <FreeToolsModal />
        <CleanUrl />
      </body>
    </html>
  );
}
