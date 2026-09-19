"use client";

import { useEffect } from "react";

/**
 * Pin hashless arrivals to the very top.
 *
 * A plain mount-time scrollTo loses to Next.js scroll restoration on
 * back/forward navigations (framework effects run after page effects),
 * so re-assert a moment later — but never fight an actual user scroll.
 */
export function useTopOnArrive(dep: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    const toTop = () => window.scrollTo(0, 0);
    toTop();

    let touched = false;
    const onTouch = () => {
      touched = true;
    };
    const timers = [60, 250].map((ms) =>
      window.setTimeout(() => {
        if (!touched) toTop();
      }, ms)
    );

    window.addEventListener("wheel", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("keydown", onTouch);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("wheel", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("keydown", onTouch);
    };
  }, [dep]);
}
