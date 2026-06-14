"use client";

import { useEffect, useState, useCallback } from "react";

// Separate key from /free-tools page unlock — just tracks whether modal was dismissed this session
const DISMISSED_KEY = "dtl_modal_dismissed";

export function FreeToolsModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Auto-show after 5 seconds on first visit (any page)
  useEffect(() => {
    if (sessionStorage.getItem(DISMISSED_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    sessionStorage.setItem(DISMISSED_KEY, "1");
    setOpen(false);
  }, []);

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
    } catch { /* unlock regardless */ }

    // Mark as dismissed so modal won't re-show this session
    sessionStorage.setItem(DISMISSED_KEY, "1");
    setLoading(false);
    setDone(true);

    // Trigger download of the bundle
    const link = document.createElement("a");
    link.href = "/downloads/7-free-ai-tools-bundle.html";
    link.download = "7-Free-AI-Tools-DigiTech.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // After 2.2s close and navigate to the tools page
    setTimeout(() => {
      setOpen(false);
      window.location.href = "/free-tools";
    }, 2200);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Unlock free AI tools"
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        display: "grid", placeItems: "center",
        background: "oklch(0% 0 0 / 0.84)", padding: "20px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div style={{
        background: "var(--bg-panel)",
        border: "1px solid oklch(73% 0.17 78 / 0.4)",
        borderRadius: "16px", padding: "36px 32px",
        width: "100%", maxWidth: "440px", position: "relative",
      }}>
        {/* Amber top bar */}
        <div style={{
          position: "absolute", top: 0, left: "32px", right: "32px",
          height: "3px", background: "var(--amber)", borderRadius: "0 0 3px 3px",
        }} />

        {/* Close */}
        <button
          onClick={close}
          aria-label="Close"
          style={{
            position: "absolute", top: "14px", right: "14px",
            background: "none", border: "none", color: "var(--muted)",
            fontSize: "20px", lineHeight: 1, cursor: "pointer", padding: "4px 8px",
          }}
        >✕</button>

        {!done ? (
          <>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--amber)", margin: "0 0 14px" }}>
              🔓 Free download
            </p>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--fg)", lineHeight: 1.15, margin: "0 0 10px" }}>
              Get the free AI tools bundle
            </h2>
            <p style={{ fontSize: "14px", lineHeight: 1.65, color: "var(--muted)", margin: "0 0 24px" }}>
              Enter your email and download instantly — 7 free AI tools that replace paid subscriptions. No credit card, no catch.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
              <input
                type="text" name="name" placeholder="Your first name (optional)"
                style={{ height: "44px", borderRadius: "8px", border: "1px solid var(--line)", background: "var(--bg)", padding: "0 14px", fontSize: "14px", color: "var(--fg)", fontFamily: "inherit", outline: "none" }}
              />
              <input
                type="email" name="email" required placeholder="your@email.com"
                style={{ height: "44px", borderRadius: "8px", border: "1px solid var(--line)", background: "var(--bg)", padding: "0 14px", fontSize: "14px", color: "var(--fg)", fontFamily: "inherit", outline: "none" }}
              />
              <button
                type="submit" disabled={loading}
                style={{
                  height: "46px", borderRadius: "8px", background: "var(--amber)",
                  color: "var(--bg)", border: "none", fontSize: "15px", fontWeight: 700,
                  fontFamily: "inherit", cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1, transition: "opacity 0.12s",
                }}
              >
                {loading ? "One moment…" : "Download free bundle →"}
              </button>
            </form>
            <p style={{ fontSize: "11px", color: "var(--muted)", textAlign: "center", margin: "14px 0 0" }}>
              Free forever · No spam · Unsubscribe anytime
            </p>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--fg)", margin: "0 0 10px" }}>
              Your download is starting!
            </h2>
            <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.65 }}>
              Check your downloads folder for <strong style={{ color: "var(--fg)" }}>7-Free-AI-Tools-DigiTech.html</strong>.<br />
              Taking you to the tools page now…
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
