"use client";

import { useEffect, useState } from "react";

const DISMISSED_KEY = "dtl_free_popup_dismissed";

const TOOLS = [
  { emoji: "🌐", name: "ComfyCloud", desc: "AI image gen" },
  { emoji: "💬", name: "Z.ai", desc: "Free Claude & GPT" },
  { emoji: "🧠", name: "Qwen AI", desc: "Reasoning model" },
  { emoji: "🎬", name: "HunyuanVideo", desc: "AI video" },
  { emoji: "✂️", name: "Vider AI", desc: "Video editor" },
  { emoji: "⚔️", name: "Arena AI", desc: "Compare any AI" },
  { emoji: "🔍", name: "Perplexity", desc: "AI search" },
];

export function FreeToolsModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISSED_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    sessionStorage.setItem(DISMISSED_KEY, "1");
    setOpen(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await fetch("/.netlify/functions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fd.get("email"), name: fd.get("name") }),
      });
    } catch { /* subscribe regardless */ }

    const link = document.createElement("a");
    link.href = "/downloads/7-free-ai-tools-bundle.html";
    link.download = "7-Free-AI-Tools-DigiTech.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    sessionStorage.setItem(DISMISSED_KEY, "1");
    setLoading(false);
    setDone(true);
    setTimeout(dismiss, 2500);
  }

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        display: "grid", placeItems: "center",
        background: "rgba(0,0,0,0.75)", padding: "16px",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div style={{
        background: "linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 100%)",
        borderRadius: "16px",
        padding: "24px 24px 20px",
        width: "100%",
        maxWidth: "420px",
        position: "relative",
        boxShadow: "0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.07)",
      }}>

        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: "absolute", top: "14px", right: "16px",
            background: "rgba(255,255,255,0.08)", border: "none",
            color: "rgba(255,255,255,0.5)", fontSize: "16px",
            lineHeight: 1, cursor: "pointer", padding: "5px 9px",
            fontWeight: 700, borderRadius: "6px",
          }}
        >×</button>

        {!done ? (
          <>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "rgba(245,166,35,0.15)",
              border: "1px solid rgba(245,166,35,0.35)",
              borderRadius: "20px", padding: "3px 10px",
              marginBottom: "12px",
            }}>
              <span style={{ fontSize: "8px", color: "#f5a623" }}>⚡</span>
              <span style={{
                fontSize: "10px", fontWeight: 800,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#f5a623",
              }}>Free for DigiTech Readers</span>
            </div>

            {/* Heading */}
            <h2 style={{
              fontSize: "24px", fontWeight: 900,
              color: "#fff", lineHeight: 1.15, margin: "0 0 6px",
            }}>
              7 Free AI Tools
            </h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", margin: "0 0 16px" }}>
              Tools most people are paying for — all free.
            </p>

            {/* Tool grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "7px",
              marginBottom: "16px",
            }}>
              {TOOLS.slice(0, 6).map((t) => (
                <div key={t.name} style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "10px 12px",
                  display: "flex", alignItems: "center", gap: "9px",
                }}>
                  <span style={{ fontSize: "20px", lineHeight: 1 }}>{t.emoji}</span>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{t.name}</div>
                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", lineHeight: 1.3 }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 7th tool — full width */}
            <div style={{
              background: "rgba(245,166,35,0.08)",
              border: "1px solid rgba(245,166,35,0.2)",
              borderRadius: "10px",
              padding: "10px 12px",
              display: "flex", alignItems: "center", gap: "9px",
              marginBottom: "16px",
            }}>
              <span style={{ fontSize: "20px", lineHeight: 1 }}>{TOOLS[6].emoji}</span>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{TOOLS[6].name}</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", lineHeight: 1.3 }}>{TOOLS[6].desc}</div>
              </div>
              <span style={{
                marginLeft: "auto", fontSize: "9px", fontWeight: 800,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#f5a623", background: "rgba(245,166,35,0.15)",
                padding: "2px 7px", borderRadius: "10px",
              }}>Best pick</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "8px" }}>
              <input
                type="text" name="name" placeholder="Your first name"
                style={{
                  height: "42px", borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.12)", padding: "0 14px",
                  fontSize: "14px", color: "#111",
                  fontFamily: "inherit", outline: "none",
                  background: "#fff",
                }}
              />
              <input
                type="email" name="email" required placeholder="your@email.com"
                style={{
                  height: "42px", borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.12)", padding: "0 14px",
                  fontSize: "14px", color: "#111",
                  fontFamily: "inherit", outline: "none",
                  background: "#fff",
                }}
              />
              <button
                type="submit" disabled={loading}
                style={{
                  height: "46px", borderRadius: "8px",
                  background: loading ? "#c47d10" : "#f5a623",
                  border: "none",
                  color: "#000", fontSize: "14px", fontWeight: 800,
                  fontFamily: "inherit", cursor: loading ? "not-allowed" : "pointer",
                  letterSpacing: "0.01em",
                  transition: "background 0.15s",
                }}
              >
                {loading ? "One moment…" : "Get the free list →"}
              </button>
            </form>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", margin: 0 }}>
                🔒 No spam. Unsubscribe any time.
              </p>
              <button onClick={dismiss} style={{
                background: "none", border: "none",
                fontSize: "11px", color: "rgba(255,255,255,0.25)",
                cursor: "pointer", textDecoration: "underline",
                fontFamily: "inherit", padding: 0,
              }}>
                No thanks
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "14px" }}>🎉</div>
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>
              Download starting!
            </h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>
              Check your downloads for<br />
              <strong style={{ color: "#f5a623" }}>7-Free-AI-Tools-DigiTech.html</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
