"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export type LiquidEtherProps = {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  resolution?: number;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
  color0?: string;
  color1?: string;
  color2?: string;
  className?: string;
  style?: React.CSSProperties;
};

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  color: number;
  energy: number;
  seed: number;
};

export function LiquidEther({
  colors = ["#5227FF", "#FF9FFC", "#B497CF"],
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  resolution = 0.5,
  isBounce = false,
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 3000,
  autoRampDuration = 0.6,
  color0 = "#216c94",
  color1 = "#7aa6a6",
  color2 = "#2b9993",
  className,
  style,
}: LiquidEtherProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pointer = useRef({ x: 0, y: 0, vx: 0, vy: 0, active: false, last: 0 });
  const visible = useRef(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = [...colors, color0, color1, color2].map(hexToRgb);
    const mainCount = Math.max(1, colors.length);
    const sprites = palette.map(([r, g, b]) => {
      const s = document.createElement("canvas");
      s.width = 64;
      s.height = 64;
      const c = s.getContext("2d");
      if (c) {
        const grad = c.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
        grad.addColorStop(0.35, `rgba(${r},${g},${b},0.55)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        c.fillStyle = grad;
        c.fillRect(0, 0, 64, 64);
      }
      return s;
    });

    let raf = 0;
    let w = 0;
    let h = 0;
    let scale = 1;
    let particles: Particle[] = [];
    let colorCursor = 0;

    const seed = (p: Particle, scatter: boolean) => {
      if (scatter) {
        p.x = Math.random() * w;
        p.y = Math.random() * h;
      }
      p.vx = 0;
      p.vy = 0;
      p.life = 0.6 + Math.random() * 0.4;
      p.decay = 0.0016 + Math.random() * 0.0022;
      const m = Math.min(w, h);
      p.size = (9 + Math.random() * 20) * (m / 760) * (0.55 + resolution);
      colorCursor += 1;
      p.color =
        colorCursor % 4 === 3
          ? mainCount + (colorCursor % 3)
          : colorCursor % mainCount;
      p.energy = 0.35;
      p.seed = Math.random() * 1000;
    };

    const reset = () => {
      const cw = wrap.clientWidth || 1;
      const ch = wrap.clientHeight || 1;
      const prevW = w;
      const prevH = h;
      scale = Math.min(window.devicePixelRatio || 1, 1.5) * resolution;
      w = Math.max(2, Math.round(cw * scale));
      h = Math.max(2, Math.round(ch * scale));
      canvas.width = w;
      canvas.height = h;
      const target = Math.max(
        220,
        Math.min(1500, Math.round(((cw * ch) / 8500) * (0.45 + resolution)))
      );
      if (particles.length === 0) {
        particles = Array.from({ length: target }, () => {
          const p = {} as Particle;
          seed(p, true);
          p.life = Math.random();
          return p;
        });
      } else {
        const sx = prevW > 0 ? w / prevW : 1;
        const sy = prevH > 0 ? h / prevH : 1;
        for (const p of particles) {
          p.x *= sx;
          p.y *= sy;
        }
        while (particles.length < target) {
          const p = {} as Particle;
          seed(p, true);
          particles.push(p);
        }
        if (particles.length > target) particles.length = target;
      }
    };
    reset();

    const ro = new ResizeObserver(reset);
    ro.observe(wrap);
    const io = new IntersectionObserver(
      (entries) => {
        visible.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(wrap);

    const host = wrap.parentElement ?? wrap;
    const toLocal = (clientX: number, clientY: number) => {
      const rect = wrap.getBoundingClientRect();
      return {
        x: (clientX - rect.left) * scale,
        y: (clientY - rect.top) * scale,
      };
    };
    const onMove = (e: PointerEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      const pt = pointer.current;
      pt.vx = p.x - pt.x;
      pt.vy = p.y - pt.y;
      pt.x = p.x;
      pt.y = p.y;
      pt.active = true;
      pt.last = performance.now();
    };
    const onLeave = () => {
      pointer.current.active = false;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerdown", onMove);
    host.addEventListener("pointerleave", onLeave);

    const damp = isViscous
      ? Math.max(0.86, 0.955 - Math.min(viscous, 60) / 1200)
      : 0.955;
    const substeps = iterationsViscous >= 32 && iterationsPoisson >= 32 ? 2 : 1;
    const fade = 0.12;
    const flowStrength = (isViscous ? 0.55 : 1) * 0.55;

    let autoBlend = 1;
    let autoX = w / 2;
    let autoY = h / 2;
    let autoPX = autoX;
    let autoPY = autoY;
    const t0 = performance.now();
    let lastT = t0;

    const paint = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        const a =
          (0.2 + 0.8 * Math.min(1, p.life * 1.6)) *
          (0.4 + 0.6 * Math.min(1, p.energy));
        ctx.globalAlpha = Math.max(0, Math.min(1, a)) * 0.75;
        const sp = sprites[p.color % sprites.length];
        const s = p.size * (0.8 + 0.4 * p.energy);
        ctx.drawImage(sp, p.x - s / 2, p.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      if (!visible.current) {
        raf = requestAnimationFrame(frame);
        return;
      }
      const dtms = now - lastT;
      lastT = now;
      const k = Math.max(0.25, Math.min(2, dtms / 16.666));
      const t = (now - t0) / 1000;
      const pt = pointer.current;
      const r = Math.max(8, cursorSize * scale);
      const rAuto = r * 1.25;

      const userHold =
        pt.active || now - pt.last < autoResumeDelay;
      const target = autoDemo && !userHold ? 1 : 0;
      const ramp =
        dtms / 1000 / (target === 1 ? Math.max(0.01, autoRampDuration) : Math.max(0.01, takeoverDuration));
      autoBlend += Math.max(-ramp, Math.min(ramp, target - autoBlend));

      autoPX = autoX;
      autoPY = autoY;
      autoX = w * (0.5 + 0.36 * Math.sin(t * autoSpeed * 0.9 + 1.3));
      autoY = h * (0.5 + 0.3 * Math.sin(t * autoSpeed * 1.27));
      const avx = autoX - autoPX;
      const avy = autoY - autoPY;

      for (let s = 0; s < substeps; s++) {
        for (const p of particles) {
          const fx = p.x * 0.0016;
          const fy = p.y * 0.0016;
          const ang =
            (Math.sin(fx * 1.7 + t * 0.32 + p.seed * 0.001) +
              Math.cos(fy * 2.2 - t * 0.27)) *
            Math.PI;
          p.vx += Math.cos(ang) * flowStrength;
          p.vy += Math.sin(ang) * flowStrength;

          if (pt.active) {
            const dx = p.x - pt.x;
            const dy = p.y - pt.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < r * r) {
              const d = Math.sqrt(d2) || 1;
              const fall = 1 - d / r;
              const push = mouseForce * 0.09 * fall * fall;
              p.vx += (pt.vx * 0.55 + (dx / d) * 1.4) * push;
              p.vy += (pt.vy * 0.55 + (dy / d) * 1.4) * push;
              p.energy = Math.min(1.4, p.energy + 0.06 * fall);
            }
          }

          if (autoBlend > 0.01) {
            const dx = p.x - autoX;
            const dy = p.y - autoY;
            const d2 = dx * dx + dy * dy;
            if (d2 < rAuto * rAuto) {
              const d = Math.sqrt(d2) || 1;
              const fall = 1 - d / rAuto;
              const push = autoIntensity * 0.06 * fall * fall * autoBlend;
              p.vx += (avx * 0.8 + (dx / d) * 1.1) * push;
              p.vy += (avy * 0.8 + (dy / d) * 1.1) * push;
              p.energy = Math.min(1.4, p.energy + 0.05 * fall * autoBlend);
            }
          }

          p.vx *= damp;
          p.vy *= damp;
          p.x += p.vx * k;
          p.y += p.vy * k;
          p.life -= p.decay * k;
          p.energy = Math.max(0.25, p.energy - 0.008 * k);

          if (p.life <= 0) {
            const useAuto = autoBlend > 0.5 || !pt.active;
            const ex = useAuto ? autoX : pt.x;
            const ey = useAuto ? autoY : pt.y;
            const rr =
              (useAuto ? rAuto : r) * (0.3 + Math.random() * 0.7);
            const th = Math.random() * Math.PI * 2;
            p.x = ex + Math.cos(th) * rr * Math.random();
            p.y = ey + Math.sin(th) * rr * Math.random();
            seed(p, false);
          }

          if (isBounce) {
            if (p.x < 0) {
              p.x = 0;
              p.vx = Math.abs(p.vx);
            } else if (p.x > w) {
              p.x = w;
              p.vx = -Math.abs(p.vx);
            }
            if (p.y < 0) {
              p.y = 0;
              p.vy = Math.abs(p.vy);
            } else if (p.y > h) {
              p.y = h;
              p.vy = -Math.abs(p.vy);
            }
          } else {
            if (p.x < -20) p.x = w + 20;
            else if (p.x > w + 20) p.x = -20;
            if (p.y < -20) p.y = h + 20;
            else if (p.y > h + 20) p.y = -20;
          }
        }
      }

      paint();
      raf = requestAnimationFrame(frame);
    };

    if (reduce) {
      paint();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [
    colors,
    mouseForce,
    cursorSize,
    isViscous,
    viscous,
    iterationsViscous,
    iterationsPoisson,
    resolution,
    isBounce,
    autoDemo,
    autoSpeed,
    autoIntensity,
    takeoverDuration,
    autoResumeDelay,
    autoRampDuration,
    color0,
    color1,
    color2,
    reduce,
  ]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ position: "absolute", inset: 0, overflow: "hidden", ...style }}
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}