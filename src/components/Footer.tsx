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
  { label: "Privacy Policy",      href: "/privacy-policy" },
  { label: "Affiliate Disclosure",href: "/affiliate-disclosure" },
  { label: "Terms",               href: "/terms" },
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
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6, maxWidth: "320px", margin: 0 }}>
              {site.description}
            </p>
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
          <span>© 2026 DigiTech Lifestyle. Informational content only. Not financial advice.</span>
          <div className="footer-links">
            <a href="https://x.com/DigiTechLife" target="_blank" rel="noopener">Twitter / X</a>
            <a href="https://www.youtube.com/@digitechlifestyle" target="_blank" rel="noopener">YouTube</a>
            <a href="https://www.facebook.com/digitechlifestyle" target="_blank" rel="noopener">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
