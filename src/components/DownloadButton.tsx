"use client";

import { useState } from "react";

type Props = {
  title: string;
  downloadUrl: string;
  accent: "purple" | "amber";
};

export function DownloadButton({ title, downloadUrl, accent }: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const color = accent === "purple" ? "var(--purple)" : "var(--amber)";
  const textColor = "oklch(8% 0.015 60)";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNWU2ZjhjZmIwNDU1NDcyYzJkNjMxODE1NzU0ZTQwZTQ2YmNhYTk5NjNiNjJlNWU3ZGY5OWNhZGYxOTcxZDA4NDllMzU1NDcwNjYzNDk5YmYiLCJpYXQiOjE3NzkxODEyNjguMTc0NzcyLCJuYmYiOjE3NzkxODEyNjguMTc0Nzc1LCJleHAiOjQ5MzQ4NTQ4NjguMTcwNzUyLCJzdWIiOiIyMzc5NjUxIiwic2NvcGVzIjpbXX0.UMu5u9Pe7rJjKxoqZ2mSgMewxPsDlSVctk4-Wz2oQ2uASkfbzbJWQqFBo7ni7mIr5VXLrkAX2Ye9O0l40yG2IpgPMmXyVceNWad_H0wtb9uRTw4ju-DpDjFjCSeK_S746do5fl2DFPZ3jffRudw7vqWuK74r7hyZ4YmxKxbvaLlYv3-qrEBHt5qiSAvvnZz4clx9phZ0_0X5Gpi_MWHCnZoP461kdqlc-3yVqWBmRZWJp3CTLEfhxUubbvoYe6Uk3O8tkxh6hlwC-A5bygf4vIxRbXDDGb7Lp2ixl_hR-0c9qN3bHFVQauPl7wP06oEOqu-YUGYeV8BjRx0WiAimVthwv_-aTV3Vd5UscTnnR54_St5Ez2ukvNOyhTFV0C-9qC8FJu74eNVxLb72gSqAu4BX1cZTxrhYxvYGHsdesHuLDekRhT3ss4z3GfdJnzEq7OzS7J9u6UQMQ96QOL7ISb-HNaEKQ0J_cfAtdzqs36FJmETP1OArpgaWZWp3sVmr96ZXAEEu5pLzGhAWdcCZMmYgZ2NNYmhOylRHynWQGFPWpK3FMqpVSSp7-cCK7gdSb1kZBKVZtmg6UmOuzf7RznWTQUKZETKFREqhm9ca_PePgRfzvhE--7rhSFL_F8szXozFzb3H_Ig8aCBvHu-rGY2QS05SAcy9FyH2LV6LbZo",
        },
        body: JSON.stringify({ email, status: "active", groups: ["187885228086265198"] }),
      });
      // 200/201 = subscribed, 422 = already exists — all get the download
      if (res.ok || res.status === 201 || res.status === 422) {
        window.location.href = downloadUrl;
        setOpen(false);
      } else {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      // Network error — still give the download
      window.location.href = downloadUrl;
      setOpen(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: "inline-block",
          background: color,
          color: textColor,
          fontWeight: 800,
          fontSize: "12px",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          marginTop: "4px",
          alignSelf: "flex-start",
        }}
      >
        Get it free →
      </button>

      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          style={{
            position: "fixed",
            inset: 0,
            background: "oklch(0% 0 0 / 0.65)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--line)",
            borderRadius: "16px",
            padding: "32px",
            width: "100%",
            maxWidth: "440px",
            position: "relative",
          }}>
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                background: "none",
                border: "none",
                color: "var(--muted)",
                fontSize: "20px",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ×
            </button>

            <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: color, margin: "0 0 10px" }}>
              Free Download
            </p>
            <h2 style={{ fontSize: "20px", fontWeight: 900, color: "var(--fg)", margin: "0 0 8px", lineHeight: 1.25, fontFamily: "'Sora', sans-serif" }}>
              {title}
            </h2>
            <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0 0 20px", lineHeight: 1.55 }}>
              Enter your email and your download opens instantly. We'll also send you our weekly digest — AI, crypto, and digital wealth insights. No spam. Unsubscribe any time.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  height: "46px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--bg-panel)",
                  color: "var(--fg)",
                  padding: "0 14px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  height: "46px",
                  borderRadius: "8px",
                  background: loading ? "var(--line)" : color,
                  color: loading ? "var(--muted)" : textColor,
                  fontWeight: 800,
                  fontSize: "14px",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Opening download…" : `Download ${title} →`}
              </button>
              {error && <p style={{ fontSize: "12px", color: "oklch(62% 0.20 25)", margin: 0 }}>{error}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
