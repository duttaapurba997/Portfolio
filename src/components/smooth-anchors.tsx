"use client";

import { useEffect } from "react";

/**
 * Keeps in-page anchor taps gliding smoothly while route changes
 * reset instantly (global CSS scroll-behavior is `auto` so a
 * navigation scroll can never strand users mid-page).
 */
export function SmoothAnchors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      window.history.replaceState(null, "", hash);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
