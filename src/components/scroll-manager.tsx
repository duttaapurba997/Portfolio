"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Pin every hashless route arrival to the very top — pushes, pops,
 * and router-cache revisits (which don't remount the page).
 *
 * A mount-time scrollTo alone loses: page effects run before Next's
 * scroll restoration, and cache revisits skip page effects entirely.
 * Keying on the pathname re-fires on every arrival, and the deferred
 * re-assert lands after late restoration settles — but never fights
 * an actual user scroll.
 */
export function ScrollManager() {
  const pathname = usePathname();

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
  }, [pathname]);

  return null;
}
