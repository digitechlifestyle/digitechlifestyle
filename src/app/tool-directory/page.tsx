import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ToolCard } from "@/components/ToolCard";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Tool Directory",
  description: "Curated directory of the best AI, crypto, automation, and creator tools for UK users. Reviewed, rated, and recommended by DigiTech Lifestyle.",
  alternates: { canonical: "/tool-directory" },
};

const CRYPTO_CATEGORIES = new Set([
  "Crypto Exchange",
  "Crypto Wallet",
  "Hardware Wallet",
  "Crypto Tax",
]);

export default function ToolDirectoryPage() {
  const aiTools = tools.filter((t) => !CRYPTO_CATEGORIES.has(t.category));
  const cryptoTools = tools.filter((t) => CRYPTO_CATEGORIES.has(t.category));

  return (
    <main className="container py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Curated stack</p>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">Tool Directory</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            A curated directory of AI tools, crypto exchanges, wallets, automation platforms, and creator tools — reviewed and recommended for UK users. No fake ratings. No paid placements.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "20px" }}>
            <a href="#ai-tools" style={{ fontSize: "13px", fontWeight: 700, padding: "8px 16px", borderRadius: "20px", background: "var(--bg-card)", border: "1px solid var(--line)", color: "var(--fg)", textDecoration: "none" }}>🤖 AI &amp; Digital Tools ({aiTools.length})</a>
            <a href="#crypto-tools" style={{ fontSize: "13px", fontWeight: 700, padding: "8px 16px", borderRadius: "20px", background: "var(--bg-card)", border: "1px solid var(--line)", color: "var(--fg)", textDecoration: "none" }}>₿ Crypto Tools ({cryptoTools.length})</a>
          </div>
          <Link href="/free-tools" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "20px", marginBottom: "8px", padding: "10px 18px", background: "oklch(73% 0.17 78 / 0.12)", border: "1px solid oklch(73% 0.17 78 / 0.35)", borderRadius: "8px", fontSize: "14px", fontWeight: 700, color: "var(--amber)", textDecoration: "none" }}>
            Get the free list: 7 AI tools most people pay for →
          </Link>

          <h2 id="ai-tools" style={{ scrollMarginTop: "90px", fontSize: "26px", fontWeight: 900, marginTop: "40px", color: "var(--fg)" }}>AI &amp; Digital Tools</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px", margin: "6px 0 0" }}>
            AI assistants, writing platforms, coding tools, automation, and creator software.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {aiTools.map((tool) => <ToolCard key={tool.name} tool={tool} />)}
          </div>

          <h2 id="crypto-tools" style={{ scrollMarginTop: "90px", fontSize: "26px", fontWeight: 900, marginTop: "48px", color: "var(--fg)" }}>Crypto Tools</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px", margin: "6px 0 0" }}>
            Exchanges, hardware wallets, and crypto tax software for UK users.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {cryptoTools.map((tool) => <ToolCard key={tool.name} tool={tool} />)}
          </div>
        </div>
        <aside className="grid content-start gap-4">
          <AdSlot label="right sidebar" className="min-h-72" />
          <NewsletterForm compact />
        </aside>
      </div>
    </main>
  );
}
