"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// AdSense display ad units (dashboard names: digitech1/2/3)
const AD_CLIENT = "ca-pub-7177380383874452";
const AD_SLOTS: Record<string, string> = {
  header: "6421146100",
  sidebar: "2719528644",
  middle: "4210785275",
};

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
  const containerRef = useRef<HTMLDivElement>(null);

  const excluded = EXCLUDED.some((p) => pathname === p || pathname === `${p}/`);
  const slot = AD_SLOTS[position];

  useEffect(() => {
    if (excluded || !slot || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* adsbygoogle not loaded yet — Auto ads still cover the page */
    }

    // AdSense marks the <ins> data-ad-status="unfilled" when there's no ad to
    // show. Without this, the container keeps its reserved height (up to
    // ~280px) and leaves a large blank gap on every page until Google starts
    // filling the slot. Collapse the container the moment that status appears.
    const el = containerRef.current;
    if (!el) return;
    const ins = el.querySelector("ins.adsbygoogle");
    if (!ins) return;
    const observer = new MutationObserver(() => {
      if (ins.getAttribute("data-ad-status") === "unfilled") {
        el.style.display = "none";
      } else if (ins.getAttribute("data-ad-status") === "filled") {
        el.style.display = "";
      }
    });
    observer.observe(ins, { attributes: true, attributeFilter: ["data-ad-status"] });
    return () => observer.disconnect();
  }, [excluded, slot]);

  if (excluded || !slot) return null;

  const style: React.CSSProperties =
    position === "sidebar"
      ? { display: "block", minHeight: 250 }
      : { display: "block", minHeight: 90 };

  return (
    <div
      ref={containerRef}
      className={`google-ad google-ad-${position}`}
      style={{ margin: position === "sidebar" ? "0 0 16px" : "16px auto", maxWidth: "1200px", padding: position === "sidebar" ? 0 : "0 20px" }}
    >
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
