'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const RESOURCES: Record<string, { title: string; desc: string; downloadUrl: string; badge: string }> = {
  'ai-business-toolkit': {
    title: 'AI Business Toolkit',
    desc: '30+ AI workflow templates, SOPs, and prompts for digital entrepreneurs.',
    downloadUrl: '/downloads/ai-business-toolkit.pdf',
    badge: 'Free PDF',
  },
  'automation-checklist': {
    title: 'Automation Audit Checklist',
    desc: '8-step audit to map repetitive tasks and find no-code automation wins.',
    downloadUrl: '/downloads/automation-checklist.pdf',
    badge: 'Free PDF Checklist',
  },
  'automation-playbook': {
    title: 'Automation Playbook',
    desc: 'Build no-code workflows for email, content, admin, and social.',
    downloadUrl: '/downloads/automation-playbook.html',
    badge: 'Free Guide',
  },
  'affiliate-launch-planner': {
    title: 'Affiliate Launch Planner',
    desc: 'Choose a niche, pick affiliate offers, map content clusters, and set up email capture.',
    downloadUrl: '/downloads/affiliate-launch-planner.html',
    badge: 'Free Guide',
  },
  'digital-wealth-tracker': {
    title: 'Digital Wealth Tracker',
    desc: 'Track crypto wallets, subscriptions, assets, and affiliate income in one place.',
    downloadUrl: '/downloads/digital-wealth-tracker.html',
    badge: 'Free Tracker',
  },
  'secure-your-crypto': {
    title: 'Secure Your Crypto',
    desc: 'Wallet types, seed phrase protection, scam prevention, and a 4-week security setup plan.',
    downloadUrl: '/downloads/secure-your-crypto.pdf',
    badge: 'Free Security Guide',
  },
  'trade-smarter': {
    title: 'Trade Smarter',
    desc: 'AI trading principles, bot types, exchange API basics, and a 30-day beginner setup plan.',
    downloadUrl: '/downloads/trade-smarter-guide.pdf',
    badge: 'Free AI Trading Guide',
  },
};

function Gate() {
  const searchParams = useSearchParams();
  const resource = searchParams.get('resource') ?? '';
  const info = RESOURCES[resource];
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!info) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok || res.status === 422) {
        // 422 = already subscribed — still give them the download
        window.location.href = info.downloadUrl;
      } else {
        const data = await res.json().catch(() => ({})) as { error?: string };
        setError(data.error ?? 'Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div style={{
      background: 'oklch(8% 0.018 270)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '32px',
      maxWidth: '480px',
    }}>
      <div style={{
        display: 'inline-block',
        background: 'rgba(245,158,11,0.15)',
        border: '1px solid rgba(245,158,11,0.3)',
        borderRadius: '20px',
        padding: '4px 12px',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#f59e0b',
        marginBottom: '16px',
      }}>
        {info.badge}
      </div>

      <h2 style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: '24px',
        fontWeight: 900,
        color: '#fff',
        marginBottom: '10px',
        lineHeight: 1.2,
      }}>
        {info.title}
      </h2>

      <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px', lineHeight: 1.6 }}>
        {info.desc}
      </p>

      <p style={{
        fontSize: '13px',
        color: '#64748b',
        marginBottom: '16px',
        padding: '12px 14px',
        background: 'rgba(245,158,11,0.05)',
        border: '1px solid rgba(245,158,11,0.15)',
        borderRadius: '8px',
      }}>
        📬 Enter your email and we&apos;ll open your download instantly — plus send you our weekly newsletter with AI, crypto, and digital business insights.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            height: '48px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.3)',
            color: '#fff',
            padding: '0 16px',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            height: '48px',
            borderRadius: '8px',
            background: loading ? '#475569' : '#f59e0b',
            color: loading ? '#94a3b8' : '#0a0a0f',
            fontWeight: 800,
            fontSize: '14px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            letterSpacing: '0.02em',
          }}
        >
          {loading ? 'Opening your download…' : `Get ${info.title} →`}
        </button>
        {error && (
          <p style={{ fontSize: '12px', color: '#ef4444', margin: 0 }}>{error}</p>
        )}
      </form>

      <p style={{ fontSize: '11px', color: '#334155', marginTop: '12px', textAlign: 'center' }}>
        Free forever. No spam. Unsubscribe any time.
      </p>
    </div>
  );
}

export { Gate as ResourceDownloadGate };
