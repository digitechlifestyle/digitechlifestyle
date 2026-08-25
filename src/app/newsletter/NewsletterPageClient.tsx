'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { NewsletterForm } from '@/components/NewsletterForm';
import { ResourceDownloadGate } from './ResourceDownloadGate';

function NewsletterContent() {
  const searchParams = useSearchParams();
  const resource = searchParams.get('resource');

  if (resource) {
    return (
      <main className="container py-16">
        <div style={{ display: "grid", gap: "40px", maxWidth: "520px", margin: "0 auto" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "12px" }}>
              Free Download
            </p>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(26px, 5vw, 42px)", fontWeight: 900, color: "#fff", marginBottom: "10px", lineHeight: 1.1 }}>
              Your free guide is ready
            </h1>
            <p style={{ fontSize: "15px", color: "var(--muted)" }}>
              Enter your email — download opens instantly.
            </p>
          </div>
          <ResourceDownloadGate />
        </div>
      </main>
    );
  }

  return (
    <main className="container py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_460px] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Free weekly newsletter</p>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">Stay Ahead of Crypto & AI</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            Join 5,000+ readers across YouTube, X & Facebook for a plain-English weekly briefing on crypto, AI, scams and useful digital tools. No hype. No financial advice. Just clarity.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Weekly crypto & AI news", href: "/news" },
              { label: "UK tax & regulation guides", href: "/blog?category=guides" },
              { label: "Honest exchange reviews", href: "/reviews" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="surface rounded-lg p-4 text-sm font-semibold text-white" style={{ textDecoration: "none", display: "block" }}>
                {item.label} <span style={{ color: "var(--amber)" }}>→</span>
              </a>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-bold text-white">Recent issue examples</h2>
            <ul className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
              <li>• Crypto Airdrops This Week — UK Edition</li>
              <li>• Meme Coin News: What Moved and What to Avoid</li>
              <li>• AI Agents vs Chatbots: What Is Actually Different?</li>
            </ul>
          </div>
        </div>
        <NewsletterForm />
      </div>
    </main>
  );
}

export function NewsletterPageClient() {
  return (
    <Suspense fallback={
      <main className="container py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_460px] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Inbox advantage</p>
            <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">Stay Ahead of Crypto & AI</h1>
          </div>
          <NewsletterForm />
        </div>
      </main>
    }>
      <NewsletterContent />
    </Suspense>
  );
}
