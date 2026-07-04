"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// AdSense display ad slot ID — from AdSense dashboard: Ads → By ad unit → Display ad.
// One slot ID works for every placement below.
const AD_CLIENT = "ca-pub-7177380383874452";
const AD_SLOT = "";

// No ads on these pages
const EXCLUDED = ["/about", "/contact"];

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function GoogleAd({ position }: { position: "header" | "sidebar" | "middle" }) {
  const pathname = usePathname();
  const pushed = useRef(false);

  const excluded = EXCLUDED.some((p) => pathname === p || pathname === `${p}/`);

  useEffect(() => {
    if (excluded || !AD_SLOT || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* adsbygoogle not loaded yet — Auto ads still cover the page */
    }
  }, [excluded]);

  if (excluded || !AD_SLOT) return null;

  const style: React.CSSProperties =
    position === "sidebar"
      ? { display: "block", minHeight: 250 }
      : { display: "block", minHeight: 90 };

  return (
    <div className={`google-ad google-ad-${position}`} style={{ margin: position === "sidebar" ? "0 0 16px" : "16px auto", maxWidth: "1200px", padding: position === "sidebar" ? 0 : "0 20px" }}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
