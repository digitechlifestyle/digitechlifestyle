import type { Metadata } from "next";
import { StandardPage } from "@/components/StandardPage";

export const metadata: Metadata = { title: "Disclaimer", alternates: { canonical: "/disclaimer" } };

export default function DisclaimerPage() {
  return (
    <StandardPage eyebrow="Legal" title="Disclaimer" description="What DigiTech Lifestyle content is — and what it is not.">
      <p>DigiTech Lifestyle publishes educational content about crypto, AI, digital tools, online business, and digital lifestyle topics. The information on this website is for general education only and should not be treated as financial, investment, legal, tax, or professional advice.</p>
      <h2>Not financial advice</h2>
      <p>Nothing on this site is a recommendation to buy, sell, or hold any cryptocurrency, token, or other asset. Cryptocurrency involves significant risk, including the loss of your entire investment. Always do your own research and consider speaking to a regulated financial adviser before making decisions.</p>
      <h2>AI tools and reviews</h2>
      <p>AI tools and services change frequently. Features, pricing, and availability described in our articles may be out of date, and AI tools can produce errors. Verify anything important independently before relying on it.</p>
      <h2>Affiliate relationships</h2>
      <p>Some links on this site may be affiliate links. If you sign up or buy through them, DigiTech Lifestyle may earn a commission at no extra cost to you. See our <a href="/affiliate-disclosure/">Affiliate Disclosure</a> for details.</p>
      <h2>No guarantees</h2>
      <p>We make no guarantee of accuracy, completeness, profit, availability, or results. You are responsible for your own decisions and for how you use the information published here.</p>
    </StandardPage>
  );
}
