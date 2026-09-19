"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgba(rgb: [number, number, number], a: number) {
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
}

function mixRgb(aC: [number, number, number], bC: [number, number, number], t: number): [number, number, number] {
  return [aC[0] + (bC[0] - aC[0]) * t, aC[1] + (bC[1] - aC[1]) * t, aC[2] + (bC[2] - aC[2]) * t];
}

function parseRgb(s: string): [number, number, number] {
  return s.split(" ").map(Number) as [number, number, number];
}

export type BorderGlowProps = {
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export function BorderGlow({
  edgeSensitivity = 44,
  glowColor = "40 80 80",
  backgroundColor = "#000000",
  borderRadius = 20,
  glowRadius = 46,
  glowIntensity = 0.8,
  coneSpread = 24,
  animated = false,
  colors = [],
  className,
  style,
  children,
}: BorderGlowProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const glow = glowRef.current;
    if (!wrap || !glow) return;

    const apply = (gx: number, gy: number, angle: number, edgeT: number) => {
      const bw = glowRadius * (0.7 + coneSpread / 90);
      const bh = glowRadius * (0.55 + coneSpread / 110);
      glow.style.width = `${bw}px`;
      glow.style.height = `${bh}px`;
      glow.style.left = `${gx}px`;
      glow.style.top = `${gy}px`;
      glow.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      glow.style.opacity = `${edgeT * glowIntensity}`;
    };

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const dTop = py;
      const dRight = rect.width - px;
      const dBottom = rect.height - py;
      const dLeft = px;
      const min = Math.min(dTop, dRight, dBottom, dLeft);
      const edgeT = Math.max(0, Math.min(1, 1 - min / edgeSensitivity));
      if (dTop === min) apply(px, 0, 0, edgeT);
      else if (dRight === min) apply(rect.width, py, 90, edgeT);
      else if (dBottom === min) apply(px, rect.height, 180, edgeT);
      else apply(0, py, 270, edgeT);
    };
    const onLeave = () => {
      if (glow) glow.style.opacity = "0";
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [edgeSensitivity, glowRadius, glowIntensity, coneSpread]);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    if (!animated) {
      const rgb = parseRgb(glowColor);
      glow.style.background = `radial-gradient(ellipse at 50% 100%, ${rgba(rgb, 1)} 0%, ${rgba(rgb, 0.9)} 24%, transparent 68%)`;
      return;
    }

    const palette = (colors.length > 0 ? colors : [glowColor]).map((c) =>
      c.includes(",") && !c.includes("#") ? (c.split(",").map(Number) as [number, number, number]) : hexToRgb(c)
    );
    const t0 = performance.now();
    const period = 1800;
    let raf = 0;

    const loop = (now: number) => {
      const t = now - t0;
      const idx = Math.floor(t / period) % palette.length;
      const p = (t % period) / period;
      const mix = mixRgb(palette[idx], palette[(idx + 1) % palette.length], p);
      glow.style.background = `radial-gradient(ellipse at 50% 100%, ${rgba(mix, 1)} 0%, ${rgba(mix, 0.85)} 24%, transparent 68%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [animated, colors, glowColor]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative overflow-hidden", className)}
      style={{ backgroundColor, borderRadius, ...style }}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 z-[3] opacity-0 transition-opacity duration-300 will-change-transform"
      />
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}