import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About DigiTech Lifestyle — Independent UK Crypto & AI Writing",
  description: "DigiTech Lifestyle is an independent UK publication covering crypto, AI tools, digital lifestyle, and honest product reviews. Founded by Joe Robertson, crypto investor since 2017, writing since 2017.",
  alternates: { canonical: "/about" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://digitechlifestyle.com/about/#joe-robertson",
  name: "Joe Robertson",
  url: "https://digitechlifestyle.com/about/",
  image: "https://digitechlifestyle.com/images/joe-robertson-author.webp",
  jobTitle: "Independent Crypto and AI Writer",
  description: "UK-based independent writer covering cryptocurrency, artificial intelligence and digital tools since 2017.",
  knowsAbout: ["Cryptocurrency", "Bitcoin", "Crypto security", "Artificial intelligence", "Digital tools", "UK crypto regulation"],
  sameAs: ["https://x.com/joedigitals", "https://www.linkedin.com/in/smartincome/"],
  worksFor: {
    "@type": "Organization",
    name: "DigiTech Lifestyle",
    url: "https://digitechlifestyle.com/",
  },
};

export default function AboutPage() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 20px 80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "12px" }}>
        Independent · UK-focused · Since 2017
      </p>
      <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, color: "var(--fg)", lineHeight: 1.1, margin: "0 0 20px" }}>
        About DigiTech Lifestyle
      </h1>
      <p style={{ fontSize: "17px", color: "var(--muted)", lineHeight: 1.8, maxWidth: "640px", margin: "0 0 48px" }}>
        DigiTech Lifestyle is an independent UK publication covering cryptocurrency, artificial intelligence, digital tools, and honest product reviews. Everything is written in plain English — no jargon, no hype, no guaranteed returns.
      </p>

      <div style={{ display: "grid", gap: "20px" }}>

        <div style={{ padding: "24px 28px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "14px" }}>
          <h2 style={{ fontSize: "17px", fontWeight: 800, color: "var(--fg)", margin: "0 0 14px" }}>Who Is Behind This Site</h2>
          <img src="/images/joe-robertson-author.webp" alt="Joe Robertson, founder and writer at DigiTech Lifestyle" width="180" height="180" style={{ width: "180px", height: "180px", objectFit: "cover", borderRadius: "18px", border: "1px solid var(--line)", margin: "2px 0 18px" }} />
          <p style={{ display: "flex", gap: "14px", flexWrap: "wrap", margin: "0 0 18px", fontSize: "13px" }}>
            <a href="https://x.com/joedigitals" target="_blank" rel="me noopener noreferrer" style={{ color: "var(--amber)", fontWeight: 700 }}>Follow Joe on X</a>
            <a href="https://www.linkedin.com/in/smartincome/" target="_blank" rel="me noopener noreferrer" style={{ color: "var(--amber)", fontWeight: 700 }}>Connect on LinkedIn</a>
          </p>
          <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 12px" }}>
            My name is Joe Robertson. I have written about cryptocurrency and digital technology since 2017. I have experienced two bull runs, major crashes and the collapse of FTX. Those years taught me to question bold promises, check the details and explain the risks as clearly as the opportunities.
          </p>
          <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 12px" }}>
            I created DigiTech Lifestyle because UK readers deserve crypto and AI coverage without the noise. I test platforms and digital tools, follow regulation, study scams and turn the complicated parts into plain English — usually with a strong cup of tea nearby.
          </p>
          <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8, margin: 0 }}>
            I am not a financial adviser. I do not give financial advice. What I do is explain how things work, review products honestly, warn about the scams I see, and help UK readers make sense of a fast-moving space. Questions or corrections: contact@digitechlifestyle.com — a real person replies, usually within two working days.
          </p>
        </div>

        <div style={{ padding: "24px 28px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "14px" }}>
          <h2 style={{ fontSize: "17px", fontWeight: 800, color: "var(--fg)", margin: "0 0 14px" }}>What DigiTech Lifestyle Covers</h2>
          <div style={{ display: "grid", gap: "12px" }}>
            {[
              { label: "Cryptocurrency", text: "Bitcoin, Ethereum, XRP, DeFi, staking, wallets, exchanges, UK tax rules, HMRC guidance, and security. Written for beginners and intermediate investors alike." },
              { label: "Artificial Intelligence", text: "AI tools, ChatGPT, Claude, Gemini, automation platforms, AI video, image generation, and what AI means for UK workers, creators, and small businesses." },
              { label: "Honest Reviews", text: "Independent reviews of crypto exchanges, hardware wallets, AI writing tools, crypto tax software, and digital services. Pros, cons, fees, and who each product is actually best for." },
              { label: "News", text: "Breaking crypto and AI news relevant to UK readers — regulation updates, FCA announcements, market moves, exchange news, and security alerts." },
              { label: "Free Resources", text: "Checklists, guides, and toolkits to help beginners get started safely — covering wallet security, UK tax reminders, scam warnings, and AI starter packs." },
            ].map((item) => (
              <div key={item.label} style={{ borderLeft: "3px solid var(--amber)", paddingLeft: "14px" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--fg)", margin: "0 0 4px" }}>{item.label}</p>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "24px 28px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "14px" }}>
          <h2 style={{ fontSize: "17px", fontWeight: 800, color: "var(--fg)", margin: "0 0 14px" }}>Editorial Standards</h2>
          <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 12px" }}>
            DigiTech Lifestyle does not accept paid editorial placements or sponsored reviews disguised as independent content. When we recommend a product, it is because we believe it is genuinely useful — not because someone paid us to say so.
          </p>
          <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 12px" }}>
            Some articles and pages contain affiliate links. If you click one and make a qualifying purchase, we may earn a commission at no extra cost to you. This never influences our verdict. We will tell you clearly when a product has weaknesses, high fees, or is not right for beginners — even when we have an affiliate relationship with that product.
          </p>
          <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8, margin: 0 }}>
            Every important claim is based on publicly available information, official sources such as the FCA and HMRC, or direct product research. If something changes, we update it.
          </p>
        </div>

        <div style={{ padding: "24px 28px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "14px" }}>
          <h2 style={{ fontSize: "17px", fontWeight: 800, color: "var(--fg)", margin: "0 0 14px" }}>Who This Site Is For</h2>
          <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 12px" }}>
            DigiTech Lifestyle is written primarily for UK readers who are curious about crypto and AI but do not want to wade through technical whitepapers or American-focused content that ignores UK tax rules, FCA regulation, and GBP pricing.
          </p>
          <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8, margin: 0 }}>
            Whether you are completely new to crypto, an experienced holder looking for honest exchange reviews, or a small business owner trying to understand which AI tools are actually worth paying for — DigiTech Lifestyle is designed to help you make informed decisions, not to pressure you into buying anything.
          </p>
        </div>

        <div style={{ padding: "24px 28px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "14px" }}>
          <h2 style={{ fontSize: "17px", fontWeight: 800, color: "var(--fg)", margin: "0 0 14px" }}>Important Disclaimer</h2>
          <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 12px" }}>
            Nothing on DigiTech Lifestyle constitutes financial advice, investment advice, legal advice, or tax advice. Cryptocurrency is a high-risk asset. You can lose money. Always do your own research and speak to a qualified, FCA-authorised financial adviser before making investment decisions.
          </p>
          <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8, margin: 0 }}>
            For full legal information, see our <Link href="/legal" style={{ color: "var(--amber)" }}>Legal page</Link>, <Link href="/privacy-policy" style={{ color: "var(--amber)" }}>Privacy Policy</Link>, and <Link href="/affiliate-disclosure" style={{ color: "var(--amber)" }}>Affiliate Disclosure</Link>.
          </p>
        </div>

      </div>

      <div style={{ marginTop: "48px", padding: "28px 32px", background: "oklch(73% 0.17 78 / 0.08)", border: "1px solid oklch(73% 0.17 78 / 0.3)", borderRadius: "14px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", margin: "0 0 10px" }}>Get in touch</p>
        <h2 style={{ fontSize: "18px", fontWeight: 800, color: "var(--fg)", margin: "0 0 10px" }}>Questions or feedback?</h2>
        <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.7, margin: "0 0 16px" }}>
          If you have spotted an error, want to suggest a topic, or have a question about the site, get in touch. I read every message.
        </p>
        <Link href="/contact" style={{
          display: "inline-block", padding: "11px 24px",
          background: "var(--amber)", color: "var(--bg)",
          borderRadius: "8px", fontWeight: 700, fontSize: "14px", textDecoration: "none",
        }}>
          Contact Joe →
        </Link>
      </div>

    </main>
  );
}
