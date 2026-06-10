import type { Metadata } from "next";
import { SidebarAds } from "@/components/SidebarAds";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch DigiTech Lifestyle videos — crypto guides, AI tool reviews, and digital wealth tutorials for UK readers.",
  alternates: { canonical: "/videos" },
};

const CHANNEL_URL = "https://www.youtube.com/@digitechlifestyle";

const PLAYLISTS = [
  {
    title: "Crypto Guides",
    description: "Bitcoin, Ethereum, XRP and more — explained for UK investors.",
    url: `${CHANNEL_URL}/playlists`,
  },
  {
    title: "AI Tools",
    description: "Reviews and walkthroughs of the best AI tools available right now.",
    url: `${CHANNEL_URL}/playlists`,
  },
  {
    title: "Digital Wealth",
    description: "Making money online, passive income and digital lifestyle strategies.",
    url: `${CHANNEL_URL}/playlists`,
  },
];

export default function VideosPage() {
  return (
    <main className="container py-12">
      <div style={{ display: "grid", gap: "32px", gridTemplateColumns: "1fr", alignItems: "start" }} className="blog-two-col">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Watch</p>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">Videos</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            Crypto, AI, and digital wealth — video guides for UK readers. Subscribe on YouTube for new content every week.
          </p>

          {/* Channel CTA */}
          <div style={{
            marginTop: "32px",
            background: "linear-gradient(135deg, #1a0808 0%, #2e0f0f 100%)",
            border: "1px solid #ff000033",
            borderRadius: "14px",
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap",
          }}>
            <div style={{
              width: "60px", height: "60px", borderRadius: "50%",
              background: "#ff0000", display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0,
            }}>
              <span style={{ fontSize: "28px" }}>▶</span>
            </div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>
                DigiTech Lifestyle on YouTube
              </div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                Crypto guides, AI tool reviews and digital wealth strategies — new videos weekly.
              </div>
            </div>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#ff0000",
                color: "#fff",
                fontWeight: 700,
                fontSize: "15px",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe →
            </a>
          </div>

          {/* Topics */}
          <div style={{ marginTop: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "20px" }}>
              What we cover
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              {PLAYLISTS.map((p) => (
                <a
                  key={p.title}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                    padding: "20px",
                    textDecoration: "none",
                    display: "block",
                    transition: "border-color 0.2s",
                  }}
                >
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>{p.title}</div>
                  <div style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>{p.description}</div>
                  <div style={{ fontSize: "12px", color: "var(--accent)", marginTop: "12px", fontWeight: 600 }}>Watch on YouTube →</div>
                </a>
              ))}
            </div>
          </div>

          {/* Latest video embed placeholder */}
          <div style={{ marginTop: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "16px" }}>Latest video</h2>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: "12px", overflow: "hidden", background: "var(--bg-card)", border: "1px solid var(--line)" }}>
              <iframe
                src="https://www.youtube.com/embed?listType=user_uploads&list=digitechlifestyle&index=1"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Latest DigiTech Lifestyle video"
              />
            </div>
          </div>
        </div>

        <aside style={{ position: "sticky", top: "80px", display: "grid", gap: "16px", alignContent: "start" }}>
          <SidebarAds />
          <NewsletterForm compact />
        </aside>
      </div>
    </main>
  );
}
