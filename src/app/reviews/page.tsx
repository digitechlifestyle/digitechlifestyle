import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/articles";
import type { Article } from "@/lib/articles";
import { SidebarAds } from "@/components/SidebarAds";

export const metadata: Metadata = {
  title: "Reviews — Crypto Exchanges, AI Tools & Wallets",
  description: "Honest, independent reviews of crypto exchanges, AI tools, hardware wallets, and digital services — UK-focused, no hype.",
  alternates: { canonical: "/reviews" },
};

const REVIEW_CATEGORIES = [
  { label: "All Reviews",     href: "/reviews" },
  { label: "Exchanges",       href: "/reviews?type=exchange" },
  { label: "AI Tools",        href: "/reviews?type=ai" },
  { label: "Wallets",         href: "/reviews?type=wallet" },
];

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function ReviewCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--line)",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "border-color 0.15s",
      }}>
        {article.image && (
          <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
            <img
              src={article.image}
              alt={article.title}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        )}
        <div style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span className="tag tag-review">Review</span>
            <span className="meta-date">{fmtDate(article.date)}</span>
          </div>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--fg)", lineHeight: 1.3, margin: "0 0 8px" }}>
            {article.title}
          </h3>
          <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.55, margin: "0 0 14px" }}>
            {article.description}
          </p>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--amber)" }}>
            Read review →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function ReviewsPage() {
  const all = await getArticles();
  const reviews = all.filter((a) =>
    a.category === "Reviews" ||
    a.category === "Exchange Reviews" ||
    a.slug.includes("review") ||
    a.title.toLowerCase().includes("review")
  );

  return (
    <main style={{ paddingBottom: "48px" }}>
      <div className="wrap" style={{ paddingTop: "32px" }}>

        {/* Page header */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--amber)", margin: "0 0 10px" }}>
            Independent · UK-focused · No bias
          </p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, color: "var(--fg)", lineHeight: 1.1, margin: "0 0 12px" }}>
            Reviews
          </h1>
          <p style={{ fontSize: "16px", color: "var(--muted)", lineHeight: 1.6, maxWidth: "600px", margin: 0 }}>
            Honest reviews of crypto exchanges, AI tools, hardware wallets, and digital services. Written by Joe Robertson — no sponsored content, no affiliate pressure.
          </p>
        </div>

        <div className="content-grid">
          {/* Main column */}
          <div>
            <div style={{ marginBottom: "24px" }}>
              <p style={{ fontSize: "12px", color: "var(--muted)", margin: 0 }}>
                {reviews.length} reviews published
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}>
              {reviews.map((article) => (
                <ReviewCard key={article.slug} article={article} />
              ))}
            </div>

            {reviews.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted)" }}>
                <p>No reviews found.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="sidebar">
            <div className="disclaimer-box">
              <div className="disclaimer-box-header">🔒 Editorial independence</div>
              <p>
                All reviews are independent. Some products use affiliate links — this never influences our verdict or score. We only recommend what we&apos;d use ourselves.
              </p>
            </div>

            <div className="sidebar-widget">
              <div className="section-title" style={{ marginBottom: "8px" }}>Categories</div>
              <div className="explore-list">
                {REVIEW_CATEGORIES.map((item) => (
                  <Link key={item.href} href={item.href} className="explore-link">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-widget">
              <SidebarAds />
            </div>

            <p className="sidebar-disclaimer">
              Some links are affiliate links. We may earn a commission at no extra cost to you. This never influences our editorial stance.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
