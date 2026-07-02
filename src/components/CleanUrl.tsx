"use client";
import { useEffect } from "react";

export function CleanUrl() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("_r=")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("_r");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);
  return null;
}
