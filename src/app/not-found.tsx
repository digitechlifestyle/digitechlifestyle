import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — DigiTech Lifestyle",
  description: "This page doesn't exist. Head back to DigiTech Lifestyle for crypto, AI, and digital lifestyle guides.",
};

export default function NotFound() {
  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "80px 20px", textAlign: "center" }}>
      <p style={{ fontSize: "80px", margin: "0 0 16px", lineHeight: 1 }}>404</p>
      <h1 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 900, color: "var(--fg)", margin: "0 0 12px" }}>
        Page Not Found
      </h1>
      <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.7, margin: "0 0 32px" }}>
        This page doesn't exist or has moved. Try one of the links below.
      </p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/" style={{ fontSize: "14px", fontWeight: 800, color: "oklch(8% 0.015 60)", background: "var(--amber)", textDecoration: "none", padding: "10px 20px", borderRadius: "8px" }}>
          Home
        </Link>
        <Link href="/blog" style={{ fontSize: "14px", fontWeight: 700, color: "var(--fg)", textDecoration: "none", padding: "10px 20px", borderRadius: "8px", border: "1px solid var(--line)" }}>
          Blog
        </Link>
        <Link href="/reviews" style={{ fontSize: "14px", fontWeight: 700, color: "var(--fg)", textDecoration: "none", padding: "10px 20px", borderRadius: "8px", border: "1px solid var(--line)" }}>
          Reviews
        </Link>
        <Link href="/free-tools" style={{ fontSize: "14px", fontWeight: 700, color: "var(--fg)", textDecoration: "none", padding: "10px 20px", borderRadius: "8px", border: "1px solid var(--line)" }}>
          Free AI Tools
        </Link>
      </div>
    </main>
  );
}
