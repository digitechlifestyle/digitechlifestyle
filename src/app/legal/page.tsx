import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal Information — DigiTech Lifestyle",
  description: "Legal information, disclaimers, affiliate disclosure, risk warnings, and policies for DigiTech Lifestyle — an independent UK crypto and AI publication.",
  alternates: { canonical: "/legal" },
};

const LEGAL_PAGES = [
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
    description: "How DigiTech Lifestyle collects, stores, processes, and protects your personal data when you visit, subscribe, or contact us.",
  },
  {
    title: "Affiliate Disclosure",
    href: "/affiliate-disclosure",
    description: "A full explanation of how DigiTech Lifestyle uses affiliate links, which products we earn commissions from, and how this affects our editorial independence.",
  },
  {
    title: "Terms of Use",
    href: "/terms",
    description: "The terms and conditions that govern your use of this website, including intellectual property, limitations of liability, and acceptable use.",
  },
];

export default function LegalPage() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 20px 80px" }}>

      {/* Header */}
      <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "12px" }}>
        DigiTech Lifestyle
      </p>
      <h1 style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 900, color: "var(--fg)", lineHeight: 1.1, margin: "0 0 16px" }}>
        Legal Information
      </h1>
      <p style={{ fontSize: "16px", color: "var(--muted)", lineHeight: 1.75, maxWidth: "600px", margin: "0 0 48px" }}>
        DigiTech Lifestyle is an independent UK publication. This page sets out the important legal information, disclaimers, and policies that apply to this website and all content published here. Please read these carefully.
      </p>

      {/* Policy pages */}
      <h2 style={{ fontSize: "18px", fontWeight: 800, color: "var(--fg)", margin: "0 0 16px" }}>Policies</h2>
      <div style={{ display: "grid", gap: "12px", marginBottom: "48px" }}>
        {LEGAL_PAGES.map((page) => (
          <Link key={page.href} href={page.href} style={{ textDecoration: "none" }}>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px", padding: "20px 24px", transition: "border-color 0.15s" }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--amber)", margin: "0 0 6px" }}>{page.title} →</p>
              <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0, lineHeight: 1.65 }}>{page.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Disclaimers */}
      <h2 style={{ fontSize: "18px", fontWeight: 800, color: "var(--fg)", margin: "0 0 16px" }}>Disclaimers</h2>
      <div style={{ display: "grid", gap: "16px", marginBottom: "48px" }}>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>Not Financial Advice</p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            All content published on DigiTech Lifestyle is for educational and informational purposes only. Nothing on this website constitutes financial advice, investment advice, legal advice, or tax advice of any kind. DigiTech Lifestyle is not a regulated financial adviser and is not authorised by the Financial Conduct Authority (FCA) to give financial advice.
          </p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: "10px 0 0" }}>
            Before making any investment, financial, or tax decision, you should consult a qualified independent financial adviser who is authorised and regulated by the FCA. Always do your own research. Past performance of any asset is not a reliable indicator of future performance.
          </p>
        </div>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>Cryptocurrency Risk Warning</p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            Cryptocurrency is a highly speculative and volatile asset class. The value of crypto assets can fall as well as rise, sometimes dramatically and without warning. You may lose some or all of the money you invest. Crypto assets are generally not protected by the Financial Services Compensation Scheme (FSCS) or covered by the Financial Ombudsman Service.
          </p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: "10px 0 0" }}>
            DigiTech Lifestyle does not recommend specific investment strategies, does not make predictions about price movements, and does not guarantee any financial outcome. Content that discusses price history or market events is factual reporting, not a recommendation to buy or sell.
          </p>
        </div>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>Affiliate Disclosure Summary</p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            DigiTech Lifestyle participates in affiliate marketing programmes. This means that when you click certain links on this website and subsequently make a purchase, sign up for a service, or take another qualifying action, DigiTech Lifestyle may receive a commission or referral fee from the company concerned. This comes at no additional cost to you.
          </p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: "10px 0 0" }}>
            Affiliate relationships do not influence our editorial opinions, reviews, scores, or recommendations. We only recommend products and services we believe are genuinely useful to our readers. Pages and articles that include affiliate links are clearly marked or include an affiliate disclosure notice. For full details, see our{" "}
            <Link href="/affiliate-disclosure" style={{ color: "var(--amber)" }}>Affiliate Disclosure</Link>.
          </p>
        </div>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>AI Tool Limitations</p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            Some articles and resource content on DigiTech Lifestyle have been researched or drafted with AI assistance. All AI-assisted content is reviewed, edited, and fact-checked by the DigiTech Lifestyle editorial team before publication. AI tools can produce inaccurate, outdated, or misleading output — we take steps to minimise this but cannot guarantee perfection.
          </p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: "10px 0 0" }}>
            When reviewing AI tools, our assessments are based on testing and publicly available information at the time of writing. AI tools change rapidly. Features, pricing, and capabilities may have changed since the review was published. Always check the official product website for the most current information.
          </p>
        </div>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>Accuracy and Content Currency</p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            DigiTech Lifestyle makes every reasonable effort to ensure that content is accurate at the time of publication. However, the crypto and AI industries move quickly. Regulations, product features, exchange policies, pricing, and market conditions can change rapidly. Information that was accurate when published may become outdated.
          </p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: "10px 0 0" }}>
            News articles include publication dates. Evergreen guides may not reflect the most recent regulatory or product changes. Always verify important information against primary sources — such as the FCA website, HMRC guidance, or the official websites of exchanges and tools — before acting on it.
          </p>
        </div>

        <div style={{ padding: "22px 24px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--fg)", margin: "0 0 10px" }}>No Guaranteed Income or Returns</p>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
            DigiTech Lifestyle does not make any claims of guaranteed income, guaranteed investment returns, or guaranteed business results from any product, tool, strategy, or affiliate programme discussed on this website. Any income figures, examples, or estimates mentioned in content are illustrative only and should not be taken as a promise or guarantee of earnings. Individual results will vary based on many factors outside our control.
          </p>
        </div>

      </div>

      {/* Contact */}
      <div style={{ padding: "24px", background: "oklch(73% 0.17 78 / 0.08)", border: "1px solid var(--tint-amber-border)", borderRadius: "12px" }}>
        <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--fg)", margin: "0 0 8px" }}>Questions?</p>
        <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.7, margin: "0 0 12px" }}>
          If you have questions about any of the above, want to report inaccurate content, or need to raise a data or legal query, please get in touch.
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
