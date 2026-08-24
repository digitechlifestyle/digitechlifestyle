"use client";

import { useState } from "react";
import Link from "next/link";
import { GoogleAd } from "@/components/GoogleAd";

type Partner = {
  id: string;
  brand: string;
  initial: string;
  tagline: string;
  accent: string;
  url: string;
};

type Category = {
  label: string;
  partners: Partner[];
};

const CATEGORIES: Category[] = [
  {
    label: "Best for beginners",
    partners: [
      { id: "coinbase", brand: "Coinbase UK", initial: "C", tagline: "Easiest for UK beginners, but simple-buy fees are higher than Kraken.", accent: "#0052ff", url: "https://www.coinbase.com/join/jrobertson_1A8sYA" },
    ],
  },
  {
    label: "Best for lower fees",
    partners: [
      { id: "kraken", brand: "Kraken", initial: "K", tagline: "Better value for regular trading, but the interface takes more learning.", accent: "#7c3aed", url: "https://kraken.app.link/PzxrgWP7Qzb" },
    ],
  },
  {
    label: "Best Bitcoin-only platform",
    partners: [
      { id: "swan", brand: "Swan Bitcoin", initial: "S", tagline: "Simple recurring Bitcoin buys, but it offers no altcoins and standard fees are 1%.", accent: "#f7931a", url: "https://www.swanbitcoin.com/digicoindigitalassetsinvestor" },
    ],
  },
  {
    label: "Best all-in-one crypto app",
    partners: [
      { id: "cryptocom", brand: "Crypto.com", initial: "C", tagline: "Convenient app with broad features, but spreads and fees can be difficult to compare.", accent: "#1199fa", url: "https://crypto.com/app/hwa7p9m8yh" },
    ],
  },
  {
    label: "Best hardware wallets",
    partners: [
      { id: "ledger", brand: "Ledger", initial: "L", tagline: "Excellent coin support and usability, but its firmware is not fully open-source.", accent: "#f59e0b", url: "https://shop.ledger.com/?referral_code=FN50B8J0VZNVR" },
      { id: "trezor", brand: "Trezor", initial: "T", tagline: "Strong open-source security, but native asset support is narrower than Ledger's.", accent: "#22c55e", url: "https://trezor.io" },
      { id: "dcent", brand: "D'CENT", initial: "D", tagline: "Handy biometric security and broad network support, but its ecosystem is smaller.", accent: "#3b82f6", url: "https://store.dcentwallet.com/" },
    ],
  },
  {
    label: "Best for UK crypto tax",
    partners: [
      { id: "koinly", brand: "Koinly", initial: "K", tagline: "Strong HMRC-ready reporting, but complex DeFi imports may need manual corrections.", accent: "#10b981", url: "https://koinly.io/?via=digitechlifestyle" },
    ],
  },
  {
    label: "Best AI writing tool",
    partners: [
      { id: "writesonic", brand: "Writesonic", initial: "W", tagline: "Fast for SEO drafts, but every output still needs fact-checking and human editing.", accent: "#8b5cf6", url: "https://writesonic.com/botsonic?fpr=joe52" },
    ],
  },
  {
    label: "Best budget web hosting",
    partners: [
      { id: "hostinger", brand: "Hostinger", initial: "H", tagline: "Good value for a first site, but renewal prices are higher than introductory rates.", accent: "#673de6", url: "https://hostinger.co.uk?REFERRALCODE=1JOE975" },
    ],
  },
];

const TOTAL = CATEGORIES.reduce((sum, cat) => sum + cat.partners.length, 0);

export function SidebarAds() {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          width: "100%",
          background: "var(--bg-card)",
          border: "1px solid var(--line)",
          borderRadius: "10px",
          padding: "12px 16px",
          color: "var(--muted)",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        Partner Picks ({TOTAL}) ↓
      </button>
    );
  }

  return (
    <div>
      <GoogleAd position="sidebar" />
      {/* Promo image card — Automation Playbook */}
      <Link
        href="/newsletter?resource=automation-playbook"
        style={{ display: "block", textDecoration: "none", marginBottom: "12px" }}
      >
        <div style={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 0 0 1px rgba(245,158,11,0.35), 0 4px 20px rgba(245,158,11,0.15)",
          transition: "box-shadow 0.2s ease",
        }}>
          <img
            src="/images/automation-playbook.png"
            alt="DigiTech Lifestyle Automation Playbook — free no-code workflow guide"
            loading="lazy"
            decoding="async"
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </Link>

      {/* Promo image card — Secure Your Crypto */}
      <a
        href="https://shop.ledger.com/?referral_code=FN50B8J0VZNVR"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", textDecoration: "none", marginBottom: "12px" }}
      >
        <div style={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 0 0 1px rgba(59,130,246,0.35), 0 4px 20px rgba(59,130,246,0.15)",
        }}>
          <img
            src="/images/generated/secure_your_crypto_future.png"
            alt="Secure Your Crypto — top hardware wallets and security tools"
            loading="lazy"
            decoding="async"
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </a>

      {/* Promo image card — Trade Smarter */}
      <a
        href="/newsletter?resource=trade-smarter"
        style={{ display: "block", textDecoration: "none", marginBottom: "12px" }}
      >
        <div style={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 0 0 1px rgba(245,158,11,0.35), 0 4px 20px rgba(245,158,11,0.15)",
        }}>
          <img
            src="/images/generated/smarter_trading_with_digi_tech.png"
            alt="Trade Smarter — compare crypto exchanges and trading platforms"
            loading="lazy"
            decoding="async"
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </a>

    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--line)",
      borderRadius: "12px",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 14px",
        borderBottom: "1px solid var(--line)",
      }}>
        <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
          Partner Picks
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "11px", color: "var(--muted)", opacity: 0.5 }}>
            {TOTAL} partners
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close partner picks"
            style={{
              background: "none",
              border: "none",
              color: "var(--muted)",
              fontSize: "16px",
              lineHeight: 1,
              cursor: "pointer",
              padding: "2px 4px",
              opacity: 0.6,
            }}
          >✕</button>
        </div>
      </div>

      {/* Disclosure — above the links, not buried below */}
      <p style={{ fontSize: "10px", color: "var(--muted)", opacity: 0.78, padding: "9px 14px", margin: 0, borderBottom: "1px solid var(--line)", lineHeight: 1.55 }}>
        Joe prioritises products he has used or reviewed directly. Where hands-on testing is not possible, picks are based on documented features, UK suitability and clear limitations. Some links are affiliate links; commission never buys a ranking. <a href="/affiliate-disclosure/" style={{ color: "var(--muted)", textDecoration: "underline" }}>How recommendations work</a>
      </p>

      {/* Partner list with category separators */}
      <div style={{ maxHeight: "680px", overflowY: "auto" }}>
        {CATEGORIES.map((cat, ci) => (
          <div key={cat.label}>
            {/* Category separator */}
            <div style={{
              padding: "6px 14px 4px",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent)",
              background: "rgba(255,255,255,0.02)",
              borderTop: ci > 0 ? "1px solid var(--line)" : undefined,
            }}>
              {cat.label}
            </div>
            {cat.partners.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="sponsored noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 14px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{
                  width: "28px", height: "28px", borderRadius: "6px",
                  background: p.accent,
                  color: "#000",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: 900, flexShrink: 0,
                }}>
                  {p.initial}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--fg)", margin: 0, letterSpacing: "0.02em" }}>
                    {p.brand}
                  </p>
                  <p style={{ fontSize: "11px", color: "var(--muted)", margin: "2px 0 0", opacity: 0.78, lineHeight: 1.4 }}>
                    {p.tagline}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <p style={{ fontSize: "10px", color: "var(--muted)", opacity: 0.4, padding: "8px 14px", margin: 0 }}>
        Curated for usefulness, not commission size. Crypto involves risk.
      </p>
    </div>

    {/* Social Follow Widget */}
    <div style={{ marginTop: "16px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden" }}>
      <div style={{ padding: "12px 14px 8px", borderBottom: "1px solid var(--line)" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "var(--muted)", textTransform: "uppercase" }}>Follow Us</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--line)" }}>
        {[
          { label: "Twitter / X",  count: "812",   href: "https://x.com/joedigitals",                        color: "#000",    icon: "𝕏" },
          { label: "Facebook",     count: "872",   href: "https://www.facebook.com/digitechlifestyle/",       color: "#1877f2", icon: "f" },
          { label: "YouTube",      count: "198",   href: "https://www.youtube.com/@digitechlifestyle",        color: "#ff0000", icon: "▶" },
          { label: "Instagram",    count: "2.6K",  href: "https://www.instagram.com/joedigitals/",           color: "#e1306c", icon: "📷" },
          { label: "LinkedIn",     count: "3K",    href: "https://www.linkedin.com/in/smartincome/",          color: "#0077b5", icon: "in" },
          { label: "Pinterest",    count: "",      href: "https://uk.pinterest.com/digitechlifestyle/",       color: "#e60023", icon: "P" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: "12px 8px", background: "var(--bg-card)", textDecoration: "none", gap: "4px",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--bg-card)")}
          >
            <span style={{ fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "8px", background: s.color, color: "#fff", fontWeight: 900 }}>{s.icon}</span>
            {s.count && <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--fg)" }}>{s.count}</span>}
            <span style={{ fontSize: "10px", color: "var(--muted)", textAlign: "center" }}>{s.label}</span>
          </a>
        ))}
      </div>
    </div>
    </div>
  );
}
