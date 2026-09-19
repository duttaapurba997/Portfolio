"use client";

import { useEffect, useRef } from "react";

const BAYER = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5,
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export type DitherProps = {
  waveColor?: [number, number, number];
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
  colorNum?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  waveSpeed?: number;
  backgroundColor?: [number, number, number];
  className?: string;
  style?: React.CSSProperties;
};

export function Dither({
  waveColor = [0, 0.32, 0.42],
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 0.25,
  colorNum = 24,
  waveAmplitude = 0.18,
  waveFrequency = 2,
  waveSpeed = 0.05,
  backgroundColor = [0.14, 0.15, 0.17],
  className,
  style,
}: DitherProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, active: false });
  const visible = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pattern = document.createElement("canvas");
    const pctx = pattern.getContext("2d", { willReadFrequently: true });
    if (!pctx) return;

    let raf = 0;
    let cw = 0;
    let ch = 0;
    let pw = 0;
    let ph = 0;
    const scale = 4;
    const levels = Math.max(2, colorNum);
    const [br, bg, bb] = backgroundColor;
    const [wr, wg, wb] = waveColor;

    let dst: ImageData;
    let dstData: Uint8ClampedArray;
    let intensity: Float32Array;

    const buildBuffers = () => {
      dst = pctx.createImageData(pw, ph);
      dstData = dst.data;
      intensity = new Float32Array(pw * ph);
    };

    const resize = () => {
      const w = wrap.clientWidth || 1;
      const h = wrap.clientHeight || 1;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cw = Math.max(1, Math.round(w * dpr));
      ch = Math.max(1, Math.round(h * dpr));
      canvas.width = cw;
      canvas.height = ch;
      pw = Math.max(8, Math.round(cw / scale));
      ph = Math.max(8, Math.round(ch / scale));
      pattern.width = pw;
      pattern.height = ph;
      buildBuffers();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      (entries) => {
        visible.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = (e.clientY - rect.top) / rect.height;
      mouse.current.active = true;
    };
    const onLeave = () => {
      mouse.current.active = false;
    };
    if (enableMouseInteraction) {
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);
    }

    const t0 = performance.now();

    const frame = (now: number) => {
      if (!visible.current) {
        raf = requestAnimationFrame(frame);
        return;
      }
      const dt = (now - t0) / 1000;
      const t = disableAnimation ? 0 : dt;
      const twoPi = Math.PI * 2;

      const mxx = mouse.current.x * pw;
      const myy = mouse.current.y * ph;
      const rad = mouseRadius * Math.min(pw, ph) + 1;

      for (let y = 0; y < ph; y++) {
        const ny = y / ph;
        const freq = ny * twoPi * waveFrequency;
        const rowShift = waveAmplitude * Math.sin(freq + t * waveSpeed * 12);
        const rowOff = Math.round(rowShift * pw * 0.5);
        for (let x = 0; x < pw; x++) {
          let sx = x + rowOff;
          if (sx < 0 || sx >= pw) sx = ((sx % pw) + pw) % pw;
          const base = 0.3 + ny * 0.46;
          const shimmer =
            0.55 +
            (Math.sin(ny * twoPi * 3 + sx * 0.35 + t * waveSpeed * 30) +
              Math.cos(freq + t * waveSpeed * 10)) /
              4;
          const v = base + shimmer * 0.18;
          intensity[y * pw + x] = v < 0 ? 0 : v > 1 ? 1 : v;
        }
      }

      for (let y = 0; y < ph; y++) {
        const yBayer = y & 3;
        for (let x = 0; x < pw; x++) {
          const vi = y * pw + x;
          let v = intensity[vi];
          if (mouse.current.active) {
            const dx = x - mxx;
            const dy = y - myy;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < rad) {
              const k = 1 - d / rad;
              const zoom = 1 - 0.42 * k * k;
              const sy = Math.min(ph - 1, Math.max(0, Math.round(myy + (y - myy) * zoom)));
              const sx = Math.min(pw - 1, Math.max(0, Math.round(mxx + (x - mxx) * zoom)));
              v = intensity[sy * pw + sx];
            }
          }
          const step = v * levels;
          const lo = Math.floor(step);
          const frac = step - lo;
          const tresh = (BAYER[(x & 3) * 4 + yBayer] + 0.5) / 16;
          const lvl = tresh < frac ? Math.min(lo + 1, levels) : lo;
          const k = lvl / levels;
          const i = vi * 4;
          dstData[i] = lerp(br, wr, k) * 255;
          dstData[i + 1] = lerp(bg, wg, k) * 255;
          dstData[i + 2] = lerp(bb, wb, k) * 255;
          dstData[i + 3] = 255;
        }
      }

      pctx.putImageData(dst, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(pattern, 0, 0, cw, ch);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      if (enableMouseInteraction) {
        wrap.removeEventListener("pointermove", onMove);
        wrap.removeEventListener("pointerleave", onLeave);
      }
    };
  }, [waveColor, disableAnimation, enableMouseInteraction, mouseRadius, colorNum, waveAmplitude, waveFrequency, waveSpeed, backgroundColor]);

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