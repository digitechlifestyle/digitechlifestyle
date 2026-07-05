import Link from "next/link";
import { site } from "@/lib/site";

const NAV = [
  { label: "Blog",           href: "/blog" },
  { label: "Free AI Tools",  href: "/free-tools" },
  { label: "News",           href: "/news" },
  { label: "Reviews",        href: "/reviews" },
  { label: "About",          href: "/about" },
  { label: "Contact",        href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy",       href: "/privacy-policy" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Editorial Policy",     href: "/editorial-policy" },
  { label: "Review Methodology",   href: "/review-methodology" },
  { label: "Corrections",          href: "/corrections" },
  { label: "Terms",                href: "/terms" },
  { label: "Disclaimer",           href: "/disclaimer" },
];

const SOCIALS = [
  { label: "Twitter / X",  count: "812",   href: "https://x.com/joedigitals",                          color: "#000", icon: "𝕏" },
  { label: "Facebook",     count: "872",   href: "https://www.facebook.com/digitechlifestyle/",         color: "#1877f2", icon: "f" },
  { label: "YouTube",      count: "198",   href: "https://www.youtube.com/@digitechlifestyle",          color: "#ff0000", icon: "▶" },
  { label: "Instagram",    count: "2.6K",  href: "https://www.instagram.com/joedigitals/",             color: "#e1306c", icon: "📷" },
  { label: "LinkedIn",     count: "3K",    href: "https://www.linkedin.com/in/smartincome/",            color: "#0077b5", icon: "in" },
  { label: "Pinterest",    count: "",      href: "https://uk.pinterest.com/digitechlifestyle/",         color: "#e60023", icon: "P" },
];

const REVIEWS = [
  { label: "Best Crypto Exchanges UK",        href: "/reviews/best-crypto-exchanges-uk" },
  { label: "Ledger Wallet Review",            href: "/reviews/ledger-wallet-review" },
  { label: "Koinly UK Review",                href: "/reviews/koinly-uk-review" },
  { label: "Best AI Tools for Bloggers",      href: "/reviews/best-ai-tools-bloggers" },
  { label: "Best AI Tools — Small Business",  href: "/reviews/best-ai-tools-small-business" },
  { label: "Crypto Resources for Beginners",  href: "/reviews/best-crypto-resources-beginners" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "32px", marginBottom: "24px" }}>
          <div>
            <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 900, fontSize: "17px", letterSpacing: "-0.02em", marginBottom: "10px" }}>
              Digi<span style={{ color: "var(--blue)" }}>Tech</span> Lifestyle
            </div>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6, maxWidth: "320px", margin: "0 0 16px" }}>
              {site.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.count ? `${s.label} — ${s.count} followers` : s.label}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    fontSize: "11px", fontWeight: 700, padding: "4px 10px",
                    borderRadius: "20px", textDecoration: "none",
                    background: s.color, color: "#fff",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span>{s.icon}</span>
                  {s.count && <span>{s.count}</span>}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="section-title" style={{ marginBottom: "12px" }}>Explore</div>
            <div style={{ display: "grid", gap: "6px" }}>
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} style={{ fontSize: "13px", color: "var(--muted)" }}
                  className="hover:text-white transition-colors">{item.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div className="section-title" style={{ marginBottom: "12px" }}>Legal</div>
            <div style={{ display: "grid", gap: "6px" }}>
              {LEGAL.map((item) => (
                <Link key={item.href} href={item.href} style={{ fontSize: "13px", color: "var(--muted)" }}
                  className="hover:text-white transition-colors">{item.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div className="section-title" style={{ marginBottom: "12px" }}>Top Reviews</div>
            <div style={{ display: "grid", gap: "6px" }}>
              {REVIEWS.map((item) => (
                <Link key={item.href} href={item.href} style={{ fontSize: "13px", color: "var(--muted)" }}
                  className="hover:text-white transition-colors">{item.label}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-inner" style={{ paddingTop: "16px", borderTop: "1px solid var(--line)" }}>
          <span>© 2026 DigiTech Lifestyle. Informational content only. Not financial advice. Crypto involves risk.</span>
          <div className="footer-links">
            <a href="https://x.com/joedigitals" target="_blank" rel="noopener">Twitter / X</a>
            <a href="https://www.youtube.com/@digitechlifestyle" target="_blank" rel="noopener">YouTube</a>
            <a href="https://www.facebook.com/digitechlifestyle/" target="_blank" rel="noopener">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
