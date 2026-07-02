import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FreeToolsModal } from "@/components/FreeToolsModal";
import { CleanUrl } from "@/components/CleanUrl";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Digital Living, Wealth, AI & Automation`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [{ url: `${site.url}/images/resource-hub-hero.png`, width: 1672, height: 941, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
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
      "https://x.com/DigiTechLife",
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
    <html lang="en">
      <head>
        {/* Inline script prevents flash of wrong theme on load */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var h=new Date().getHours();if(h>=7&&h<20){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();` }} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-M5KCLHJ9JH" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-M5KCLHJ9JH');` }} />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7177380383874452" crossOrigin="anonymous" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <Header />
        {children}
        <Footer />
        <FreeToolsModal />
        <CleanUrl />
      </body>
    </html>
  );
}
