import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use — DigiTech Lifestyle",
  description: "Terms and conditions governing your use of DigiTech Lifestyle — an independent UK crypto and AI publication.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 20px 80px" }}>

      <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "12px" }}>
        DigiTech Lifestyle
      </p>
      <h1 style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 900, color: "var(--fg)", lineHeight: 1.1, margin: "0 0 16px" }}>
        Terms of Use
      </h1>
      <p style={{ fontSize: "16px", color: "var(--muted)", lineHeight: 1.75, maxWidth: "600px", margin: "0 0 48px" }}>
        These terms govern your use of the DigiTech Lifestyle website. By using this site, you agree to these terms. Please read them carefully. If you do not agree, please stop using the site.
      </p>

      <div style={{ display: "grid", gap: "20px" }}>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>1. About This Website</h2>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            DigiTech Lifestyle is an independent UK publication operated by Joe Robertson. The website is located at digitechlifestyle.com and covers cryptocurrency, artificial intelligence, digital tools, and related topics for a UK audience. The site is not regulated by the Financial Conduct Authority (FCA) and does not provide regulated financial services.
          </p>
        </div>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>2. Educational Content Only</h2>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            All content published on DigiTech Lifestyle — including articles, guides, reviews, news, checklists, resource downloads, and tool recommendations — is provided for educational and informational purposes only. Nothing on this website constitutes financial advice, investment advice, legal advice, tax advice, or any other form of professional advice.
          </p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: "10px 0 0" }}>
            You must not rely on any content on this website as a substitute for professional advice. Before making any financial, investment, or legal decisions, consult a qualified professional who is appropriately regulated and authorised for your jurisdiction.
          </p>
        </div>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>3. No Guarantees or Warranties</h2>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            DigiTech Lifestyle makes every reasonable effort to ensure content is accurate and up to date at the time of publication. However, we make no guarantees, representations, or warranties — express or implied — regarding the accuracy, completeness, reliability, suitability, or availability of any content, product, service, or related information on this website.
          </p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: "10px 0 0" }}>
            The crypto and AI industries change rapidly. Information that was accurate when published may become outdated. You use the content on this website entirely at your own risk.
          </p>
        </div>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>4. Affiliate Links and Commercial Relationships</h2>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            DigiTech Lifestyle participates in affiliate marketing programmes. Some links on this website are affiliate links. If you click an affiliate link and make a qualifying purchase or sign-up, we may receive a commission. This does not affect the price you pay and does not influence our editorial opinions or recommendations.
          </p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: "10px 0 0" }}>
            We do not accept paid editorial placements, sponsored reviews disguised as independent reviews, or payment in exchange for positive coverage. For full details, see our <Link href="/affiliate-disclosure" style={{ color: "var(--amber)" }}>Affiliate Disclosure</Link>.
          </p>
        </div>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>5. Intellectual Property</h2>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            All original content on DigiTech Lifestyle — including articles, guides, reviews, graphics, and branding — is the intellectual property of DigiTech Lifestyle and Joe Robertson unless otherwise stated. You may not copy, reproduce, republish, distribute, or commercially exploit any content from this website without prior written permission.
          </p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: "10px 0 0" }}>
            You may share links to content on this website freely. Short quotes with clear attribution and a link back to the original source are permitted under fair use principles.
          </p>
        </div>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>6. External Links</h2>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            This website contains links to third-party websites, products, and services. These links are provided for your convenience and information. DigiTech Lifestyle has no control over the content, pricing, availability, policies, or practices of any third-party website and accepts no responsibility for them. The inclusion of a link does not constitute an endorsement of the linked website or its operator.
          </p>
        </div>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>7. Free Resources and Downloads</h2>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            Free resources, checklists, guides, and downloads made available on DigiTech Lifestyle are provided for personal, non-commercial use only. They are provided as-is, without warranty of any kind. You may not resell, redistribute, or present them as your own work. Resource content is educational — it does not constitute financial, legal, or tax advice.
          </p>
        </div>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>8. Limitation of Liability</h2>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            To the fullest extent permitted by law, DigiTech Lifestyle and Joe Robertson shall not be liable for any direct, indirect, incidental, consequential, or special loss or damage arising from your use of this website or its content, including but not limited to financial losses, investment losses, loss of data, or loss of profit.
          </p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: "10px 0 0" }}>
            This includes losses resulting from reliance on any content published on this site, from affiliate products or services you purchase via links on this site, or from any temporary unavailability of the website.
          </p>
        </div>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>9. Privacy</h2>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            Your use of this website is also governed by our <Link href="/privacy-policy" style={{ color: "var(--amber)" }}>Privacy Policy</Link>, which explains how we collect and use your personal data. By using this website, you consent to the data practices described in our Privacy Policy.
          </p>
        </div>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>10. Changes to These Terms</h2>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            DigiTech Lifestyle reserves the right to update or amend these terms at any time. Changes take effect immediately upon publication on this page. Your continued use of the website after any changes constitutes your acceptance of the updated terms. We recommend checking this page periodically.
          </p>
        </div>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>11. Governing Law</h2>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            These terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>
        </div>

      </div>

      <div style={{ marginTop: "40px", padding: "20px 24px", background: "oklch(73% 0.17 78 / 0.08)", border: "1px solid var(--tint-amber-border)", borderRadius: "12px" }}>
        <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.7, margin: "0 0 10px" }}>
          Questions about these terms? Get in touch.
        </p>
        <Link href="/contact" style={{ fontSize: "13px", fontWeight: 700, color: "var(--amber)" }}>
          Contact DigiTech Lifestyle →
        </Link>
      </div>

      <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "32px", lineHeight: 1.6, opacity: 0.6 }}>
        Last updated: June 2026. DigiTech Lifestyle is an independent UK publication operated by Joe Robertson.
      </p>
    </main>
  );
}
