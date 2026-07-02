import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ToolCard } from "@/components/ToolCard";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "AI & Crypto Tool Directory — DigiTech Lifestyle",
  description: "Curated directory of the best AI, crypto, automation, and creator tools for UK users. Reviewed, rated, and recommended by DigiTech Lifestyle.",
  alternates: { canonical: "/tool-directory" },
};

export default function ToolDirectoryPage() {
  return (
    <main className="container py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Curated stack</p>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">Tool Directory</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            A curated directory of AI tools, crypto exchanges, wallets, automation platforms, and creator tools — reviewed and recommended for UK users. No fake ratings. No paid placements.
          </p>
          <Link href="/free-tools" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "24px", marginBottom: "8px", padding: "10px 18px", background: "oklch(73% 0.17 78 / 0.12)", border: "1px solid oklch(73% 0.17 78 / 0.35)", borderRadius: "8px", fontSize: "14px", fontWeight: 700, color: "var(--amber)", textDecoration: "none" }}>
            🔓 Unlock 7 free AI tools — enter your email for instant access →
          </Link>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {tools.map((tool) => <ToolCard key={tool.name} tool={tool} />)}
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
