"use client";

import { useEffect, useState } from "react";

const DISMISSED_KEY = "dtl_free_popup_dismissed";

const TOOLS = [
  { emoji: "🌐", name: "ComfyCloud", desc: "free AI image generation" },
  { emoji: "💬", name: "Z.ai", desc: "free Claude and GPT access" },
  { emoji: "🧠", name: "Qwen AI", desc: "free reasoning model" },
  { emoji: "🎬", name: "HunyuanVideo", desc: "free AI video" },
  { emoji: "✂️", name: "Vider AI", desc: "free video editor" },
  { emoji: "⚔️", name: "Arena AI", desc: "compare any AI free" },
  { emoji: "🔍", name: "Perplexity AI", desc: "free AI search" },
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

    // Trigger bundle download
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
        background: "rgba(0,0,0,0.6)", padding: "16px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div style={{
        background: "#f5a623",
        borderRadius: "12px",
        padding: "28px 28px 22px",
        width: "100%",
        maxWidth: "380px",
        position: "relative",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}>
        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: "absolute", top: "12px", right: "14px",
            background: "none", border: "none",
            color: "rgba(0,0,0,0.5)", fontSize: "20px",
            lineHeight: 1, cursor: "pointer", padding: "4px 8px",
            fontWeight: 700,
          }}
        >×</button>

        {!done ? (
          <>
            {/* Badge */}
            <p style={{
              fontSize: "10px", fontWeight: 800,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(0,0,0,0.55)", margin: "0 0 8px",
            }}>
              Free for DigiTech Readers
            </p>

            {/* Heading */}
            <h2 style={{
              fontSize: "22px", fontWeight: 900,
              color: "#000", lineHeight: 1.15, margin: "0 0 14px",
            }}>
              7 Free AI Tools<br />You Should Be Using
            </h2>

            {/* Tool list */}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "grid", gap: "5px" }}>
              {TOOLS.map((t) => (
                <li key={t.name} style={{ fontSize: "13px", color: "rgba(0,0,0,0.85)", lineHeight: 1.4 }}>
                  {t.emoji} <strong>{t.name}</strong> – {t.desc}
                </li>
              ))}
            </ul>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "8px" }}>
              <input
                type="text" name="name" placeholder="Your first name"
                style={{
                  height: "42px", borderRadius: "6px",
                  border: "none", padding: "0 14px",
                  fontSize: "14px", color: "#111",
                  fontFamily: "inherit", outline: "none",
                  background: "#fff",
                }}
              />
              <input
                type="email" name="email" required placeholder="your@email.com"
                style={{
                  height: "42px", borderRadius: "6px",
                  border: "none", padding: "0 14px",
                  fontSize: "14px", color: "#111",
                  fontFamily: "inherit", outline: "none",
                  background: "#fff",
                }}
              />
              <button
                type="submit" disabled={loading}
                style={{
                  height: "44px", borderRadius: "6px",
                  background: "#f5a623",
                  border: "2px solid rgba(0,0,0,0.2)",
                  color: "#000", fontSize: "14px", fontWeight: 800,
                  fontFamily: "inherit", cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  boxShadow: "0 2px 0 rgba(0,0,0,0.15)",
                }}
              >
                {loading ? "One moment…" : "Send me the free list →"}
              </button>
            </form>

            <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.5)", textAlign: "center", margin: "10px 0 4px" }}>
              No spam. Unsubscribe any time.
            </p>
            <p style={{ textAlign: "center", margin: 0 }}>
              <button onClick={dismiss} style={{
                background: "none", border: "none",
                fontSize: "12px", color: "rgba(0,0,0,0.45)",
                cursor: "pointer", textDecoration: "underline",
                fontFamily: "inherit",
              }}>
                No thanks
              </button>
            </p>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎉</div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#000", margin: "0 0 8px" }}>
              Download starting!
            </h2>
            <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.65)", lineHeight: 1.5 }}>
              Check your downloads for <strong>7-Free-AI-Tools-DigiTech.html</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
