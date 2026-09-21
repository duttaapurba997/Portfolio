"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { EASE, Magnetic, Reveal } from "@/lib/anim";
import {
  heroSticky,
  nav,
  profile,
  projects,
  experience,
  education,
  skillGroups,
  tools,
  languages,
  interests,
  socials,
  type Project,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import Particles from "@/components/Particles";
import { BorderGlow } from "@/components/BorderGlow";

function WordReveal({
  text,
  accentWords = [],
  className,
  delay = 0,
  accentClassName = "italic text-volt",
}: {
  text: string;
  accentWords?: string[];
  className?: string;
  delay?: number;
  accentClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => {
        const accent = accentWords.includes(w.replace(/[^a-zA-Z]/g, ""));
  return (
          <span key={w + i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={`inline-block will-change-transform ${accent ? accentClassName : ""}`}
              initial={{ y: "112%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: delay + i * 0.05, ease: EASE }}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 14"
      className={`w-full ${className}`}
      fill="none"
      aria-hidden
    >
      <path
        d="M3 9 Q60 2 118 8 T237 6"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-volt"
    />
  );
}

function QrMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${className}`} fill="none" aria-hidden>
      <path
        d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect x="15" y="15" width="5" height="2.4" fill="currentColor" />
      <rect x="15" y="19" width="2.4" height="2.4" fill="currentColor" />
      <rect x="19" y="13" width="2.4" height="2.4" fill="currentColor" />
      <rect x="6" y="6" width="3" height="3" fill="currentColor" />
    </svg>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-300 ${
        scrolled ? "border-b border-white/10 bg-night/75 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="flex items-center gap-2 font-serif text-lg tracking-tight text-white">
          <QrMark className="text-volt" />
          <span>Eden</span>
          <span className="text-white/40">&mdash; Apurba Dutta</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60 transition-colors hover:text-volt"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <Link
          href="/resume?download=1"
          className="inline-flex items-center gap-2 rounded-full bg-volt px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-night transition-transform hover:scale-[1.03]"
        >
          <Download className="h-3.5 w-3.5" />
          Resume
        </Link>
      </div>
    </motion.header>
  );
}

function HeroCollage({ d }: { d: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yUp = useTransform(scrollYProgress, [0, 1], [60, -50]);
  const yDown = useTransform(scrollYProgress, [0, 1], [-30, 70]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 16, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 16, mass: 0.4 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-11, 11]);
  const smallX = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const smallY = useTransform(sy, [-0.5, 0.5], [16, -16]);
  const noteX = useTransform(sx, [-0.5, 0.5], [14, -14]);

  const onMove = (e: { clientX: number; clientY: number; currentTarget: HTMLDivElement }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };
  const [art, setArt] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (el.complete && el.naturalWidth === 0) setArt(false);
  }, [art]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: d + 0.45, ease: EASE }}
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : onLeave}
      className="group relative mx-auto w-full max-w-md [perspective:1400px] lg:max-w-lg"
    >
      <span
        aria-hidden
        className="absolute right-0 top-0 hidden h-40 w-40 -translate-y-1/3 translate-x-1/4 rounded-full border border-dashed border-volt/40 md:block"
      />
      <span
        aria-hidden
        className="absolute -left-40 bottom-10 hidden h-24 w-24 rotate-12 rounded-lg border border-white/10 lg:block"
      />

      {art ? (
        <motion.div
          style={reduce ? {} : { rotateX, rotateY }}
          className="relative -mt-2 [transform-style:preserve-3d] lg:-mt-10"
        >
          <motion.img
            ref={imgRef}
            src="/hero-collage.png"
            alt="Design process collage — wireframes, laptop, notes and pen"
            onError={() => setArt(false)}
            className="relative h-auto w-full shadow-2xl shadow-black/50 transition-transform duration-500 ease-out group-hover:scale-[1.01]"
          />
          {/* curved arrow */}
          <motion.span
            aria-hidden
            animate={reduce ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-2 -top-9 w-12 text-volt/70 md:-left-6 md:w-14"
          >
            <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M8 40 C 24 36, 36 28, 48 12" />
              <path d="M40 12 L49 10 L47 19" />
            </svg>
          </motion.span>
          {/* approval check */}
          <motion.span
            aria-hidden
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-1 top-[6%] w-10 text-volt/70 md:-right-3 md:w-12"
          >
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="24" cy="24" r="16" />
              <path d="M17 24 l6 6 9 -12" />
            </svg>
          </motion.span>
          {/* spark burst */}
          <motion.span
            aria-hidden
            animate={reduce ? undefined : { scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -bottom-5 left-[10%] w-9 text-volt/70"
          >
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M20 5 v8 M20 27 v8 M5 20 h8 M27 20 h8" />
            </svg>
          </motion.span>
          {/* underline squiggle */}
          <motion.span
            aria-hidden
            animate={reduce ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -bottom-6 right-[8%] w-16 text-white/50"
          >
            <svg viewBox="0 0 72 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M4 12 C 16 4, 28 18, 40 10 S 60 12, 68 8" />
            </svg>
          </motion.span>
        </motion.div>
      ) : (
        <>
      <motion.div
        style={reduce ? {} : { rotateX, rotateY }}
        className="relative mt-[10%] [transform-style:preserve-3d]"
      >
        {/* back vintage sheet */}
        <motion.div
          style={{ y: yDown }}
          aria-hidden
          className="absolute inset-x-[4%] bottom-[2%] top-[6%] -rotate-6 rounded-lg bg-[#E4DCC9] shadow-xl shadow-black/40 transition-transform duration-500 ease-out group-hover:-rotate-9 group-hover:-translate-x-2"
        >
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[7rem] italic leading-none text-[#0A1E23]/10">
            ✳
          </span>
          <span className="absolute inset-x-8 top-8 h-px bg-[#0A1E23]/15" />
          <span className="absolute inset-x-12 top-12 h-px bg-[#0A1E23]/10" />
        </motion.div>

        {/* front note */}
        <motion.div
          style={reduce ? { y: yUp } : { y: yUp, x: noteX }}
          className="relative ml-[10%] w-[74%]"
        >
          <div className="relative rotate-[3deg] rounded-lg bg-[#F2EFE6] p-5 text-ink shadow-2xl shadow-black/45 transition-transform duration-500 ease-out group-hover:rotate-[5deg] group-hover:-translate-y-1.5 md:p-6">
            <span aria-hidden className="absolute -top-2 left-8 h-5 w-16 -rotate-3 rounded-sm bg-volt/70" />
            <p className="font-serif text-xl italic leading-snug md:text-2xl">
              Colour
              <br />
              Typography
              <br />
              Layout
              <br />
              Composition
            </p>
            <div aria-hidden className="mt-4 flex gap-1.5">
              {["#123B3B", "#2A7F7F", "#5EC8C8"].map((c) => (
                <span
                  key={c}
                  className="h-7 w-7 rounded-sm border border-ink/10"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <span aria-hidden className="absolute bottom-2 right-3 font-serif text-xl italic leading-none text-ink/30">
              ✳
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* pen */}
      <motion.div
        style={reduce ? {} : { x: smallX, y: smallY }}
        aria-hidden
        className="absolute bottom-[4%] left-[2%] w-36 md:w-44"
      >
        <div className="rotate-[24deg] transition-transform duration-500 ease-out group-hover:rotate-[32deg] group-hover:translate-x-1">
          <div className="relative h-2.5 rounded-full bg-gradient-to-r from-[#0C2429] via-volt to-white shadow-lg shadow-black/40">
            <span className="absolute -left-1 top-1/2 h-4 w-2 -translate-y-1/2 rounded-sm bg-[#0C2429]" />
            <span className="absolute -right-1.5 top-1/2 h-0 w-0 -translate-y-1/2 border-y-4 border-l-8 border-y-transparent border-l-volt" />
          </div>
          <span className="absolute left-6 top-0 h-1 w-8 -translate-y-full rounded-sm bg-white/25" />
        </div>
      </motion.div>

      {/* palette strip */}
      <div
        aria-hidden
        className="absolute left-[2%] top-[5%] flex -rotate-6 gap-1 rounded-md border border-white/15 bg-night/70 p-1.5 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:rotate-0"
      >
        {["#CAFFFF", "#5EC8C8", "#2A7F7F", "#123B3B"].map((c) => (
          <span key={c} className="h-6 w-6 rounded-sm" style={{ backgroundColor: c }} />
        ))}
      </div>

      {/* arrow doodle */}
      <svg
        aria-hidden
        viewBox="0 0 60 40"
        className="absolute left-[38%] top-[2%] w-12 -scale-x-100 text-volt/60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M6 34 C 22 30, 38 22, 50 8" strokeDasharray="1 5" />
        <path d="M42 8 L51 7 L49 16" />
      </svg>

      {/* scribble star */}
      <motion.span
        aria-hidden
        animate={reduce ? undefined : { y: [0, -8, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[24%] right-[2%] font-serif text-3xl italic leading-none text-volt/50"
      >
        ✳
      </motion.span>
        </>
      )}
    </motion.div>
  );
}

function Hero() {
  const d = 0.15;
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-white"
    >
      <div className="absolute inset-0 -z-10 opacity-30">
        <Particles
          particleColors={["#caffff"]}
          particleCount={300}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-[9] bg-gradient-to-b from-transparent via-transparent to-night/60" />
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-16 px-6 pb-16 pt-32 md:px-10 lg:grid-cols-[1.15fr_0.9fr] lg:gap-8 lg:pt-40">
        <div>
          <h1 className="mt-7 font-serif text-[13.5vw] leading-[0.95] tracking-tight sm:text-6xl md:text-8xl lg:text-[6.6rem]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: d + 0.08, ease: EASE }}
              >
                {heroSticky.headlineLead}
              </motion.span>
            </span>
            <span className="mt-2 block overflow-hidden">
              <motion.span
                className="relative inline-block text-volt"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: d + 0.16, ease: EASE }}
              >
                {heroSticky.headlineAccent}
                <Squiggle className="absolute -bottom-3 left-0 text-volt" />
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: d + 0.34, ease: EASE }}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            {heroSticky.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: d + 0.6, ease: EASE }}
            className="mt-11 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#designer"
                className="group inline-flex items-center gap-2 rounded-full bg-volt px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-night transition-transform hover:scale-[1.03]"
              >
                Begin the story
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-md transition-colors hover:border-volt hover:bg-white/15 hover:text-volt"
            >
              Jump to the work
            </a>
          </motion.div>
        </div>
        <HeroCollage d={d} />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: d + 0.7, ease: EASE }}
        className="border-t border-white/10"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 border-b border-white/10 font-mono text-[10px] uppercase tracking-[0.18em] md:grid-cols-3">
          {[
            [profile.experience, "experience"],
            [profile.location, "based in"],
            ["2019", "the start"],
          ].map(([v, k]) => (
            <div key={k} className="px-6 py-5">
              <p className="text-volt">{v}</p>
              <p className="mt-1 text-white/40">{k}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ChapterHead({ kicker, dark = false }: { kicker: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className={cn(
          "font-mono text-[10px] uppercase tracking-[0.3em]",
          dark ? "text-volt" : "text-ember"
        )}
      >
        {kicker}
      </span>
      <span className={cn("h-px flex-1", dark ? "bg-white/15" : "bg-ink/15")} />
      <span
        className={cn(
          "font-serif text-3xl italic leading-none",
          dark ? "text-white/20" : "text-ink/20"
        )}
      >
        ✳
      </span>
    </div>
  );
}

function StoryTitle({
  chapter,
  text,
  accentWords = [],
  className,
  dark = false,
}: {
  chapter?: string;
  text: string;
  accentWords?: string[];
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={className}>
      {chapter && (
        <p
          className={cn(
            "mb-5 font-mono text-[10px] uppercase tracking-[0.28em]",
            dark ? "text-white/40" : "text-ink/40"
          )}
        >
          {chapter}
        </p>
      )}
      <h2
        className={cn(
          "max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl",
          dark ? "text-white" : "text-ink"
        )}
      >
        <WordReveal
          text={text}
          accentWords={accentWords}
          accentClassName={dark ? "italic text-volt" : "italic text-ember"}
        />
      </h2>
    </div>
  );
}

const TICKER_COPIES = ["a", "b", "c", "d", "e", "f", "g", "h"];

function Ticker({
  children,
  className,
  speed = 70,
  reverse = false,
  repeat = 3,
  pauseOnHover = true,
  fade = true,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
  repeat?: number;
  pauseOnHover?: boolean;
  fade?: boolean;
}) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const reduce = useReducedMotion();
  const dir = reverse ? 1 : -1;

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current) return;
    const el = trackRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (!half) return;
    let next = x.get() + (dir * speed * delta) / 1000;
    if (next <= -half) next += half;
    else if (next > 0) next -= half;
    x.set(next);
  });

  return (
    <div
      className={cn(
        "relative flex w-full select-none overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className
      )}
      onMouseEnter={() => {
        if (pauseOnHover) paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex w-max will-change-transform"
      >
        {[{ id: "first" }, { id: "second" }].map(({ id }, h) => (
          <div
            key={id}
            aria-hidden={h === 1}
            className="flex shrink-0 items-center"
          >
            {TICKER_COPIES.slice(0, repeat).map((c) => (
              <Fragment key={c}>{children}</Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function DividerMarquee({ volt = false }: { volt?: boolean }) {
  const items = [
    "Storytelling",
    "Strategy",
    "Intentional design",
    "Visual systems",
    "Brand work",
    "UI/UX",
    "Campaigns",
    "Illustration",
  ];
  return (
    <div
      className={cn(
        "overflow-hidden py-3.5",
        volt ? "bg-volt text-night" : "bg-ember text-paper"
      )}
    >
      <Ticker speed={80}>
        {items.map((t) => (
          <span
            key={t}
            className="mx-5 flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.24em]"
          >
            {t}
            <Sparkles className="h-3 w-3" />
          </span>
        ))}
      </Ticker>
    </div>
  );
}

function SectionDesigner() {
  return (
    <section
      id="designer"
      className="relative overflow-hidden bg-paper bg-grid-faint text-ink"
    >
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <ChapterHead kicker="Chapter 01 — The Designer" />
        <div className="mt-14 grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div className="md:sticky md:top-28 md:self-start">
            <Reveal>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-ink/10 transition-transform duration-500 ease-out hover:-rotate-1">
                <div className="absolute inset-0 bg-gradient-to-br from-ember/60 via-paperdeep to-moss/50" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="select-none font-serif text-[11rem] italic leading-none text-ink/15 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                    AD
                  </span>
                </span>
                <span className="absolute left-5 top-5 -rotate-3 rounded-md bg-ink px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-paper">
                  Senior Graphic Designer
                </span>
                <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-paper/85 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-moss" />
                  Est. 2019 — Bengaluru
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="mt-6">
              <dl className="grid grid-cols-2 divide-x divide-ink/10 border-y border-ink/10">
                {[
                  ["Based", profile.location],
                  ["Since", "2019"],
                ].map(([k, v]) => (
                  <div key={k} className="px-4 py-4 first:pl-0 last:pr-0">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45">
                      {k}
                    </dt>
                    <dd className="mt-1.5 truncate font-serif text-[15px]">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <div>
            <StoryTitle
              text="Trained in fashion, built for pixels."
              accentWords={["pixels."]}
            />
            <Reveal delay={0.05}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80">
                Fashion school taught me taste. Five and a half years at
                India&apos;s fastest consumer platforms turned it into a weapon —
                campaigns, brand systems and interfaces people stop on.
              </p>
              <p className="mt-6 flex max-w-2xl gap-3 text-sm leading-relaxed text-ink/55">
                <span className="shrink-0 select-none font-serif text-lg italic leading-none text-ember">
                  &ldquo;
                </span>
                <span>{profile.summary}</span>
              </p>
            </Reveal>
            <Reveal delay={0.12} className="mt-12">
              <blockquote className="relative rounded-r-2xl border-l-2 border-ember bg-paperdeep/70 py-6 pl-8 pr-6">
                <p className="font-serif text-xl italic leading-snug text-ink md:text-2xl">
                  &ldquo;Detail-oriented, organized and meticulous. Creative,
                  with a talent for developing unique custom artwork — and an
                  innovative approach to ideas and concept development.&rdquo;
                </p>
                <footer className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50">
                  — Apurba Dutta
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolMark({ name }: { name: string }) {
  if (name === "Figma") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#F24E1E" role="img" aria-label="Figma">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
      </svg>
    );
  }
  if (name === "Framer") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0055FF" role="img" aria-label="Framer">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    );
  }
  const tiles: Record<string, [string, string, string]> = {
    Photoshop: ["#001E36", "#31A8FF", "Ps"],
    Illustrator: ["#330000", "#FF9A00", "Ai"],
    InDesign: ["#49021F", "#FF3366", "Id"],
  };
  const [bg, fg, mono] = tiles[name] ?? ["#141414", "#FFFFFF", name.slice(0, 2)];
  return (
    <span
      role="img"
      aria-label={name}
      className="flex h-full w-full items-center justify-center font-sans text-[13px] font-bold tracking-tight"
      style={{ backgroundColor: bg, color: fg }}
    >
      {mono}
    </span>
  );
}

function CraftProcessArt() {
  const reduce = useReducedMotion();
  return (
    <div className="group relative mx-auto w-full max-w-sm text-volt">
      {/* faint doodles drifting around the visual */}
      <motion.span
        aria-hidden
        animate={reduce ? undefined : { y: [0, -9, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-4 top-16 w-14 opacity-40 md:-left-8"
      >
        <svg viewBox="0 0 56 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 24 C 16 8, 30 28, 52 10" strokeDasharray="1 6" />
        </svg>
      </motion.span>
      <motion.span
        aria-hidden
        animate={reduce ? undefined : { y: [0, 8, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-2 top-6 font-serif text-2xl italic leading-none opacity-40 md:-right-6"
      >
        ✳
      </motion.span>
      <motion.span
        aria-hidden
        animate={reduce ? undefined : { scale: [1, 1.25, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-1 bottom-16 text-lg leading-none opacity-40 md:left-2"
      >
        +
      </motion.span>
      <motion.span
        aria-hidden
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-2 right-10 w-16 opacity-40"
      >
        <svg viewBox="0 0 64 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 12 C 18 4, 30 18, 45 10 S 58 12, 61 8" />
        </svg>
      </motion.span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/craft-visual.png"
        alt="Design craft at work — typography, color, layout and motion"
        className="h-auto w-full"
      />
      {/* orbit ring — dashes crawl around it, brightens on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-5 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      >
        <motion.svg
          viewBox="0 0 400 280"
          className="h-full w-full overflow-visible"
          animate={reduce ? undefined : { rotate: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <motion.ellipse
            cx="200"
            cy="140"
            rx="196"
            ry="122"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="5 9"
            transform="rotate(-10 200 140)"
            animate={reduce ? undefined : { strokeDashoffset: [0, -56] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
        </motion.svg>
      </div>
      {/* sparkles — twinkle always, flare up on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-[6%] top-[20%] text-xl leading-none text-volt/70 transition-all duration-300 group-hover:scale-125 group-hover:text-white"
      >
        <motion.span
          className="block"
          animate={reduce ? undefined : { scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.span>
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[14%] right-[4%] text-2xl leading-none text-volt/70 transition-all duration-300 group-hover:scale-125 group-hover:text-white"
      >
        <motion.span
          className="block"
          animate={reduce ? undefined : { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        >
          ✦
        </motion.span>
      </span>
    </div>
  );
}

function SectionCraft() {
  return (
    <section id="craft" className="relative isolate bg-night text-white">
      <div className="absolute inset-0 -z-10 opacity-25">
        <Particles
          particleColors={["#caffff"]}
          particleCount={300}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 md:px-10 md:pb-24 md:pt-36">
        <ChapterHead kicker="Chapter 02 — The Craft" dark />
        <div className="mt-16 grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <CraftProcessArt />
          </div>
          <div>
            {skillGroups.map((g, i) => (
              <motion.div
                key={g.index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                className={cn(
                  "group border-t border-white/10 py-11 lg:py-14",
                  i === 0 && "border-t-0 lg:pt-0"
                )}
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-[10px] text-volt">{g.index}</span>
                  <h3 className="font-serif text-3xl tracking-tight transition-colors duration-300 group-hover:text-volt md:text-5xl">
                    {g.title}
                  </h3>
                  <span className="ml-auto font-serif text-4xl italic text-white/15 transition-colors duration-300 group-hover:text-volt/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-6 max-w-2xl font-mono text-[11px] uppercase leading-[2.2] tracking-[0.06em] text-white/50">
                  {g.items.map((it, idx) => (
                    <span key={it}>
                      {it}
                      {idx < g.items.length - 1 && (
                        <span className="mx-2 text-volt/50">—</span>
                      )}
                    </span>
                  ))}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-20 border-t border-white/10 pt-9">
          <Ticker speed={55}>
            {tools.map((t) => (
              <span
                key={t}
                className="mx-3 inline-flex shrink-0 items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] py-2 pl-2 pr-6 backdrop-blur-md"
              >
                <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white/[0.06]">
                  <ToolMark name={t} />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/85">
                  {t}
                </span>
              </span>
            ))}
          </Ticker>
        </div>
      </div>
    </section>
  );
}

function CardArt({ id }: { id: string }) {
  const cls = "h-auto w-[72%]";
  const svgProps = {
    viewBox: "0 0 120 120",
    className: cls,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;
  switch (id) {
    case "01":
      return (
        <svg {...svgProps}>
          <rect x="18" y="28" width="84" height="64" rx="8" fill="rgba(255,255,255,0.05)" />
          <circle cx="28" cy="38" r="2" fill="currentColor" stroke="none" />
          <circle cx="36" cy="38" r="2" fill="currentColor" stroke="none" opacity="0.5" />
          <rect x="18" y="46" width="22" height="46" fill="currentColor" opacity="0.15" stroke="none" />
          <rect x="48" y="68" width="11" height="16" rx="2" fill="#F0B45A" stroke="none" />
          <rect x="63" y="58" width="11" height="26" rx="2" fill="currentColor" stroke="none" opacity="0.75" />
          <rect x="78" y="64" width="11" height="20" rx="2" fill="currentColor" stroke="none" opacity="0.4" />
        </svg>
      );
    case "02":
      return (
        <svg {...svgProps}>
          <rect x="26" y="38" width="68" height="44" rx="6" fill="rgba(255,255,255,0.05)" />
          <path d="M64 48 L52 66 h9 l-3 12 14 -20 h-9 z" fill="#F0B45A" stroke="none" />
          <path d="M38 94 h44 l8 10 H30 Z" fill="currentColor" opacity="0.2" />
        </svg>
      );
    case "03":
      return (
        <svg {...svgProps}>
          <path d="M40 52 h40 l-5 42 a6 6 0 0 1 -6 5 h-28 a6 6 0 0 1 -6 -5 Z" fill="rgba(255,255,255,0.05)" />
          <path d="M49 52 v-5 a11 11 0 0 1 22 0 v5" />
          <circle cx="76" cy="72" r="9" fill="#F0B45A" stroke="none" />
          <path d="M72 72 h8 M76 68 v8" stroke="#0A1E23" />
        </svg>
      );
    case "04":
      return (
        <svg {...svgProps}>
          <circle cx="52" cy="46" r="8" />
          <circle cx="68" cy="46" r="8" />
          <rect x="32" y="56" width="56" height="40" rx="5" fill="rgba(255,255,255,0.05)" />
          <line x1="60" y1="56" x2="60" y2="96" stroke="#F0B45A" />
          <line x1="32" y1="70" x2="88" y2="70" stroke="#F0B45A" />
          <rect x="54" y="64" width="12" height="12" rx="2" fill="#F0B45A" stroke="none" />
        </svg>
      );
    case "05":
      return (
        <svg {...svgProps}>
          <path
            d="M60 96 C55 86 35 73 35 57 C35 48 42 43 49 43 C54 43 58 46 60 50 C62 46 66 43 71 43 C78 43 85 48 85 57 C85 73 65 86 60 96 Z"
            fill="#F0B45A"
            stroke="none"
          />
          <circle cx="88" cy="34" r="5" />
          <circle cx="99" cy="42" r="5" />
          <circle cx="95" cy="55" r="5" />
          <circle cx="82" cy="53" r="5" />
          <circle cx="77" cy="42" r="5" />
          <circle cx="88" cy="44" r="3.5" fill="#0A1E23" stroke="none" />
        </svg>
      );
    case "06":
      return (
        <svg {...svgProps}>
          <path d="M52 26 h16 l-3 12 h-10 Z" fill="currentColor" opacity="0.35" />
          <path d="M55 38 h10 l7 48 -12 12 -12 -12 Z" fill="rgba(255,255,255,0.05)" />
          <path d="M52 60 h16" stroke="#F0B45A" />
        </svg>
      );
    case "07":
      return (
        <svg {...svgProps}>
          <circle cx="60" cy="52" r="14" fill="#F0B45A" opacity="0.15" stroke="none" />
          <path d="M60 58 C66 48 66 40 60 32 C54 40 54 48 60 58 Z" fill="#F0B45A" stroke="none" />
          <line x1="60" y1="58" x2="60" y2="66" />
          <path d="M28 72 h64 c0 14 -14 24 -32 24 s-32 -10 -32 -24 Z" fill="rgba(255,255,255,0.05)" />
          <line x1="28" y1="72" x2="92" y2="72" stroke="#F0B45A" />
        </svg>
      );
    case "08":
      return (
        <svg {...svgProps}>
          <rect x="22" y="34" width="76" height="15" rx="3" fill="#F0B45A" stroke="none" opacity="0.9" />
          <rect x="22" y="55" width="76" height="15" rx="3" fill="currentColor" stroke="none" opacity="0.45" />
          <rect x="22" y="76" width="52" height="15" rx="3" fill="currentColor" stroke="none" opacity="0.25" />
          <path d="M74 76 h24 v15 h-24" fill="none" opacity="0.6" />
        </svg>
      );
    case "09":
      return (
        <svg {...svgProps}>
          <path d="M28 58 L74 40 v44 L28 66 Z" fill="rgba(255,255,255,0.05)" />
          <line x1="28" y1="66" x2="28" y2="88" />
          <rect x="22" y="88" width="14" height="8" rx="3" fill="currentColor" stroke="none" opacity="0.6" />
          <path d="M84 52 a16 16 0 0 1 0 20" stroke="#F0B45A" />
          <path d="M92 46 a26 26 0 0 1 0 32" opacity="0.5" />
        </svg>
      );
    case "10":
      return (
        <svg {...svgProps}>
          <rect x="30" y="36" width="46" height="56" rx="7" transform="rotate(-8 53 64)" fill="rgba(255,255,255,0.05)" />
          <rect x="46" y="32" width="46" height="56" rx="7" transform="rotate(7 69 60)" fill="rgba(255,255,255,0.08)" />
          <circle cx="62" cy="52" r="5" fill="#F0B45A" stroke="none" />
          <line x1="54" y1="66" x2="76" y2="66" opacity="0.6" />
          <line x1="54" y1="74" x2="70" y2="74" opacity="0.4" />
          <path d="M34 100 h52" strokeDasharray="2 6" />
        </svg>
      );
    case "11":
      return (
        <svg {...svgProps}>
          <rect x="52" y="22" width="16" height="10" rx="2" fill="currentColor" stroke="none" opacity="0.6" />
          <rect x="55" y="32" width="10" height="12" />
          <rect x="43" y="44" width="34" height="52" rx="7" fill="rgba(255,255,255,0.05)" />
          <rect x="49" y="58" width="22" height="18" rx="3" fill="#F0B45A" stroke="none" opacity="0.85" />
          <path d="M84 88 c3 5 3 9 0 12 c-3 -3 -3 -7 0 -12" fill="#F0B45A" stroke="none" />
        </svg>
      );
    default:
      return (
        <svg {...svgProps}>
          <path d="M60 22 C74 42 80 58 60 88 C40 58 46 42 60 22 Z" fill="rgba(255,255,255,0.05)" />
          <circle cx="60" cy="62" r="6" />
          <line x1="60" y1="68" x2="60" y2="88" />
          <circle cx="88" cy="34" r="10" stroke="#F0B45A" />
          <path d="M84 34 h8 M88 30 v8" stroke="#F0B45A" />
        </svg>
      );
  }
}

function ProjectCard({ p }: { p: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 16, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 16, mass: 0.4 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-11, 11]);
  const glareX = useTransform(sx, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(sy, [-0.5, 0.5], [15, 85]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.20), transparent 62%)`;

  const onMove = (e: { clientX: number; clientY: number; currentTarget: HTMLDivElement }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : onLeave}
      className="group [perspective:1400px]"
    >
      <motion.div
        style={reduce ? {} : { rotateX, rotateY }}
        className="relative [transform-style:preserve-3d]"
      >
      <BorderGlow
        edgeSensitivity={30}
        glowColor="40 80 80"
        backgroundColor="#120F17"
        borderRadius={28}
        glowRadius={29}
        glowIntensity={1.0}
        coneSpread={25}
        animated={false}
        colors={["#c084fc", "#f472b6", "#38bdf8"]}
      >
        <Link
          href={`/projects/${p.id}`}
          className="relative flex items-center gap-4 overflow-hidden rounded-[22px] border border-white/10 bg-[#0A1E23]/70 p-5 backdrop-blur-md transition-colors duration-500 hover:border-volt/40 hover:bg-[#0C2429]/80 md:gap-6 md:p-6"
        >
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-volt">
              <span className="h-1.5 w-1.5 rounded-full bg-volt" />
              {p.tag}
            </span>
            <h3 className="mt-3 font-sans text-xl font-bold leading-[1.15] tracking-tight text-white md:text-2xl">
              {p.title}
            </h3>
          </div>
            <div className="relative w-[38%] shrink-0 -rotate-2 transition-transform duration-500 ease-out group-hover:rotate-0">
              <span
                aria-hidden
                className="absolute inset-0 translate-x-2 translate-y-2 rotate-3 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-transform duration-500 ease-out group-hover:translate-x-3.5 group-hover:translate-y-3.5 group-hover:rotate-6"
              />
              <span
                aria-hidden
                className="absolute inset-0 -rotate-2 rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:-rotate-4"
              />
              <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#164449] via-[#0C2429] to-[#071315] text-volt transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                <CardArt id={p.id} />
                <span aria-hidden className="absolute left-[16%] top-[14%] animate-pulse text-[13px] leading-none text-volt/90">
                  ✦
                </span>
                <span aria-hidden className="absolute bottom-[18%] right-[14%] animate-pulse text-[11px] leading-none text-white/70 [animation-delay:0.9s]">
                  ✦
                </span>
                <span aria-hidden className="absolute right-[22%] top-[8%] animate-pulse text-[9px] leading-none text-volt/60 [animation-delay:1.6s]">
                  ✦
                </span>
              </div>
            </div>
        </Link>
      </BorderGlow>
      <motion.span
        aria-hidden
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 rounded-[28px]"
      />
      </motion.div>
    </div>
  );
}

function FeaturedWork() {
  return (
    <section id="work" className="relative isolate overflow-hidden bg-night text-white">
      <div className="absolute inset-0 -z-10 opacity-45">
        <Particles
          particleColors={["#caffff"]}
          particleCount={300}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <ChapterHead kicker="Chapter 03 — The Work" dark />
        <div className="mt-14 flex flex-wrap items-end justify-between gap-6">
          <StoryTitle text="The proof, framed." accentWords={["framed."]} dark />
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionRoad() {
  return (
    <section id="road" className="relative isolate bg-night text-white">
      <div className="absolute inset-0 -z-10 opacity-25">
        <Particles
          particleColors={["#caffff"]}
          particleCount={300}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:px-10 md:pb-36 md:pt-24">
        <ChapterHead kicker="Chapter 04 — The Road" dark />
        <div className="mt-14">
          <StoryTitle
            text="The road so far."
            accentWords={["so", "far."]}
            dark
          />
        </div>
        <div className="relative mt-10 border-l border-white/15 pl-10 md:pl-14">
          {experience.map((e, i) => (
            <Reveal key={e.company}>
              <div className={cn("relative", i < experience.length - 1 && "pb-14")}>
                <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-volt">
                  <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-volt" />
                  {e.period}
                </p>
                <div className="mt-3 grid gap-4 md:grid-cols-[1fr_1.7fr] md:gap-10">
                  <div>
                    <h3 className="font-serif text-3xl tracking-tight text-white">
                      {e.company}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                      {e.role} · {e.place}
                    </p>
                  </div>
                  <p className="mt-0.5 max-w-2xl text-sm leading-[1.9] text-white/55">
                    {e.points.join("  ·  ")}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-20">
<BorderGlow
            edgeSensitivity={42}
            glowColor="40 80 80"
            backgroundColor="#121216"
            borderRadius={16}
            glowRadius={48}
            glowIntensity={0.8}
            coneSpread={23}
            animated
            colors={["#c084fc", "#f472b6", "#38bdf8"]}
          >
            <div className="p-8 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-volt">
                Origins of the craft
              </p>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {education.map((ed) => (
                  <div key={ed.school} className="border-t border-white/10 pt-4">
                    <p className="font-mono text-[10px] text-white/40">{ed.period}</p>
                    <h4 className="mt-2 font-serif text-lg text-white">
                      {ed.school}
                    </h4>
                    <p className="mt-1 text-sm text-white/60">{ed.degree}</p>
                  </div>
                ))}
              </div>
            </div>
          </BorderGlow>
        </Reveal>
      </div>
    </section>
  );
}

function Epilogue() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-paper bg-grid-faint text-ink"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <ChapterHead kicker="Chapter 05 — Epilogue" />
        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <StoryTitle text="Your story starts with hello." accentWords={["hello."]} />
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink/70">
                {profile.status}. If that sounds like your team — tell me what
                you&apos;re building and I&apos;ll bring the story to it.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Magnetic>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-transform hover:scale-[1.03]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {profile.email}
                  </a>
                </Magnetic>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ember hover:text-ember"
                  >
                    {s.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div className="rounded-2xl border border-ink/10 p-8 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/40">
                Off the clock
              </p>
              <div className="mt-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
                  Languages
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {languages.map((l) => (
                    <span
                      key={l}
                      className="rounded-full border border-ink/15 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em]"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
                  Interests
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {interests.map((it) => (
                    <span
                      key={it}
                      className="rounded-full bg-paperdeep px-4 py-1.5 font-serif text-sm italic"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-night">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 md:px-10">
        <span>© 2026 Apurba Dutta — designed with obsession</span>
        <a
          href={`mailto:${profile.email}`}
          className="transition-colors hover:text-volt"
        >
          {profile.email}
        </a>
        <a href="#top" className="transition-colors hover:text-volt">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

export function ThemeStory() {
  return (
    <div className="min-h-screen bg-night font-sans">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <DividerMarquee volt />
        <SectionDesigner />
        <SectionCraft />
        <FeaturedWork />
        <SectionRoad />
        <Epilogue />
      </main>
      <Footer />
    </div>
  );
}