import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explore DigiTech Lifestyle — Crypto, AI, Reviews & Resources",
  description: "Browse everything on DigiTech Lifestyle — crypto guides, AI tools, honest reviews, free resources, and breaking news for UK readers.",
  alternates: { canonical: "/explore" },
};

const CATEGORIES = [
  {
    emoji: "₿",
    label: "Crypto",
    href: "/blog?category=Crypto",
    tag: "Guides & Education",
    description:
      "Everything you need to understand cryptocurrency as a UK investor. Bitcoin, Ethereum, XRP, DeFi, staking, wallets, exchanges, HMRC tax rules, and security. Written in plain English — no jargon, no hype.",
    links: [
      { label: "Best Crypto Exchanges for UK Beginners", href: "/blog/best-crypto-exchanges-uk" },
      { label: "How to Pay Crypto Tax in the UK", href: "/blog/crypto-tax-uk" },
      { label: "Bitcoin vs Ethereum: Which Should UK Investors Hold?", href: "/blog/bitcoin-vs-ethereum-which-should-uk-investors-hold-in-2026" },
    ],
  },
  {
    emoji: "🤖",
    label: "AI Tools",
    href: "/blog?category=AI",
    tag: "Tools & Education",
    description:
      "Artificial intelligence is changing how we work, write, research, and create content. DigiTech covers the tools that actually matter — ChatGPT, Claude, Gemini, automation platforms, AI video, and what it all means for UK workers and businesses.",
    links: [
      { label: "7 Free AI Tools You Should Be Using", href: "/free-tools" },
      { label: "How AI Is Changing the UK Job Market", href: "/blog/how-ai-is-changing-the-uk-job-market-in-2026" },
      { label: "AI Tool Directory", href: "/tool-directory" },
    ],
  },
  {
    emoji: "⭐",
    label: "Reviews",
    href: "/reviews",
    tag: "Independent Reviews",
    description:
      "Honest, independent reviews of crypto exchanges, hardware wallets, AI writing tools, tax software, and digital services. Every review is written from hands-on research. No paid placements. No fake scores. Affiliate links disclosed clearly.",
    links: [
      { label: "All Reviews", href: "/reviews" },
      { label: "Crypto Exchange Reviews", href: "/reviews?type=exchange" },
      { label: "Hardware Wallet Reviews", href: "/reviews?type=wallet" },
    ],
  },
  {
    emoji: "📰",
    label: "News",
    href: "/news",
    tag: "Breaking & Analysis",
    description:
      "Fast-moving crypto and AI news explained for UK readers. Market moves, regulation updates, FCA announcements, new AI model releases, exchange news, and security warnings. Published within 48 hours of major events.",
    links: [
      { label: "Latest Crypto News", href: "/news" },
      { label: "UK Crypto Regulation Updates", href: "/news" },
    ],
  },
  {
    emoji: "📦",
    label: "Free Resources",
    href: "/resources",
    tag: "Checklists & Guides",
    description:
      "Free downloadable checklists, guides, and toolkits for crypto beginners and AI users. Covers wallet safety, UK tax reminders, scam warnings, AI starter packs, and more. No paywall — enter your email and download instantly.",
    links: [
      { label: "All Free Resources", href: "/resources" },
      { label: "Crypto Wallet Safety Checklist", href: "/resources" },
      { label: "UK Crypto Tax Checklist", href: "/resources" },
    ],
  },
  {
    emoji: "🔓",
    label: "Free AI Tools",
    href: "/free-tools",
    tag: "No Paid Plans Needed",
    description:
      "Seven free AI tools that replace expensive subscriptions — tested and used by DigiTech Lifestyle readers. Covers AI chat, image generation, video creation, search, and comparison. Unlock the full list with your email.",
    links: [
      { label: "Unlock the Free AI Tools List", href: "/free-tools" },
    ],
  },
  {
    emoji: "🗂️",
    label: "Tool Directory",
    href: "/tool-directory",
    tag: "Curated Stack",
    description:
      "A curated directory of the best crypto, AI, automation, security, and creator tools available today. Includes pricing notes, best-for guidance, and links to full reviews where available. Updated regularly.",
    links: [
      { label: "Browse the Full Directory", href: "/tool-directory" },
    ],
  },
  {
    emoji: "✍️",
    label: "Blog",
    href: "/blog",
    tag: "All Articles",
    description:
      "Over 700 articles covering crypto investing, AI tools, digital lifestyle, UK regulation, security, DeFi, NFTs, stablecoins, and more. Evergreen guides written to stay accurate long-term. Searchable by category.",
    links: [
      { label: "All Articles", href: "/blog" },
      { label: "Crypto Articles", href: "/blog?category=Crypto" },
      { label: "AI Articles", href: "/blog?category=AI" },
    ],
  },
];

export default function ExplorePage() {
  return (
    <main style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 20px 80px" }}>

      {/* Header */}
      <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "12px" }}>
        DigiTech Lifestyle
      </p>
      <h1 style={{ fontSize: "clamp(32px,5vw,54px)", fontWeight: 900, color: "var(--fg)", lineHeight: 1.1, margin: "0 0 16px" }}>
        Explore Everything
      </h1>
      <p style={{ fontSize: "17px", color: "var(--muted)", lineHeight: 1.75, maxWidth: "640px", margin: "0 0 16px" }}>
        DigiTech Lifestyle is an independent UK publication covering crypto, artificial intelligence, and digital tools. Everything here is written in plain English — no hype, no financial advice, no guaranteed returns.
      </p>
      <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.7, maxWidth: "640px", margin: "0 0 56px" }}>
        Founded by Joe Robertson, a crypto investor since 2017, publishing since 2025. Over 700 articles published. Independent writing — no sponsored content hidden as editorial.
      </p>

      {/* Category sections */}
      <div style={{ display: "grid", gap: "32px" }}>
        {CATEGORIES.map((cat) => (
          <div key={cat.href} style={{ background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "14px", padding: "28px 32px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "14px" }}>
              <span style={{ fontSize: "32px", lineHeight: 1 }}>{cat.emoji}</span>
              <div>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--amber)", margin: "0 0 4px" }}>{cat.tag}</p>
                <Link href={cat.href} style={{ textDecoration: "none" }}>
                  <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--fg)", margin: 0, lineHeight: 1.2 }}>{cat.label}</h2>
                </Link>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.75, margin: "0 0 18px" }}>
              {cat.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {cat.links.map((link) => (
                <Link key={link.href} href={link.href} style={{
                  fontSize: "12px", fontWeight: 700, color: "var(--amber)",
                  background: "oklch(73% 0.17 78 / 0.08)",
                  border: "1px solid var(--tint-amber-border)",
                  borderRadius: "6px", padding: "6px 12px", textDecoration: "none",
                }}>
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter CTA */}
      <div style={{ marginTop: "56px", padding: "32px", background: "oklch(73% 0.17 78 / 0.08)", border: "1px solid oklch(73% 0.17 78 / 0.3)", borderRadius: "14px", textAlign: "center" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", margin: "0 0 10px" }}>Free newsletter</p>
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--fg)", margin: "0 0 10px" }}>Stay ahead of the market</h2>
        <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.7, margin: "0 0 20px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>
          Weekly roundup of the most important crypto and AI news for UK readers. Plain English. No spam. Unsubscribe any time.
        </p>
        <Link href="/newsletter" style={{
          display: "inline-block", padding: "12px 28px",
          background: "var(--amber)", color: "var(--bg)",
          borderRadius: "8px", fontWeight: 700, fontSize: "14px", textDecoration: "none",
        }}>
          Subscribe free →
        </Link>
      </div>

      {/* Disclaimer */}
      <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "40px", lineHeight: 1.6, opacity: 0.7 }}>
        DigiTech Lifestyle is an independent UK publication. Content is for educational purposes only and does not constitute financial advice. Some links are affiliate links — we may earn a commission at no extra cost to you. See our{" "}
        <Link href="/affiliate-disclosure" style={{ color: "var(--amber)" }}>Affiliate Disclosure</Link> and{" "}
        <Link href="/legal" style={{ color: "var(--amber)" }}>Legal</Link> pages.
      </p>
    </main>
  );
}
