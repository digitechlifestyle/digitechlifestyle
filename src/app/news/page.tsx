import type { Metadata } from "next";
import Link from "next/link";
import { SidebarAds } from "@/components/SidebarAds";
import { ArticleCard } from "@/components/ArticleCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Crypto & AI News — DigiTech Lifestyle",
  description: "Latest cryptocurrency and AI news for UK readers. Regulation updates, market moves, FCA announcements, and tech developments — plain English, no hype.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const all = await getArticles();
  // Show news-category articles; fallback: exclude evergreen/review categories so time-sensitive pieces show
  const excluded = new Set(["Reviews", "Exchange Reviews", "Crypto Guides", "UK Crypto Tax", "Wallet Safety"]);
  const articles = all.filter((a) => !excluded.has(a.category)).slice(0, 60);

  return (
    <main className="container py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          {/* Cross-site nav */}
          <nav aria-label="Site sections" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
            {[
              { label: "← All Blog Posts", href: "/blog" },
              { label: "Reviews",          href: "/reviews" },
              { label: "Resources",        href: "/resources" },
              { label: "Free AI Tools",    href: "/free-tools" },
              { label: "Crypto Guides",    href: "/blog?category=guides" },
              { label: "AI & Tech",        href: "/blog?category=AI" },
            ].map((l) => (
              <Link key={l.label} href={l.href} style={{
                fontSize: "12px", fontWeight: 600, padding: "6px 13px", borderRadius: "20px",
                border: "1px solid var(--line)", color: "var(--muted)", textDecoration: "none",
                background: "var(--bg-card)",
              }}>{l.label}</Link>
            ))}
          </nav>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Latest</p>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">News</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            Crypto and AI news for UK readers — honest, independent, no hype.
          </p>
          <p style={{ marginTop: "8px", fontSize: "12px", color: "var(--muted)" }}>{articles.length} articles</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
        <aside className="grid content-start gap-4">
          <SidebarAds />
          <NewsletterForm compact />
        </aside>
      </div>
    </main>
  );
}
