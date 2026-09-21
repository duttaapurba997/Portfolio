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
  const glareX = useTransform(sx, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(sy, [-0.5, 0.5], [15, 85]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.20), transparent 62%)`;
  const smallX = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const smallY = useTransform(sy, [-0.5, 0.5], [16, -16]);
  const noteX = useTransform(sx, [-0.5, 0.5], [14, -14]);

  const festive = projects[3];
  const ui = projects[0];

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

      <motion.div
        style={reduce ? { y: yUp } : { y: yUp, rotateX, rotateY }}
        className="relative mt-[26%] w-[84%] -rotate-2 shadow-2xl shadow-black/50 transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:rotate-0"
      >
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
          <Link href={`/projects/${festive.id}`} className="block">
          <div className="overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={festive.cover}
              alt={festive.title}
              referrerPolicy="no-referrer"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          </div>
        </Link>
        </BorderGlow>
        <motion.span
          aria-hidden
          style={{ background: glare, transform: "translateZ(70px)" }}
          className="pointer-events-none absolute inset-0 rounded-2xl"
        />
        <span
          style={{ transform: "translateZ(70px)" }}
          className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-night/70 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-volt backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-volt" />
          {festive.category}
        </span>
        <span
          style={{ transform: "translateZ(50px)" }}
          className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-night/95 via-night/40 to-transparent px-5 pb-4 pt-16"
        >
          <span className="font-serif text-base italic text-white/95 md:text-lg">
            {festive.title}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
            № {festive.id}
          </span>
        </span>
      </motion.div>

      {/* paper note */}
      <motion.div
        style={reduce ? { y: yDown } : { y: yDown, x: noteX }}
        className="absolute right-0 top-0 w-[48%]"
      >
        <div className="relative rotate-[5deg] rounded-lg bg-[#F2EFE6] p-4 text-ink shadow-xl shadow-black/40 transition-transform duration-500 ease-out group-hover:rotate-[8deg] group-hover:-translate-y-1.5 md:p-5">
          <span aria-hidden className="absolute -top-2 left-8 h-5 w-16 -rotate-3 rounded-sm bg-volt/70" />
          <p className="font-serif text-lg italic leading-snug md:text-xl">
            Ideas
            <br />
            Systems
            <br />
            Experiences
          </p>
          <span aria-hidden className="absolute bottom-2 right-3 font-serif text-xl italic leading-none text-ink/30">
            ✳
          </span>
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

      {/* front UI card */}
      <motion.div
        style={{ y: yDown }}
        className="absolute -bottom-8 left-0 w-[52%]"
      >
      <motion.div style={reduce ? {} : { x: smallX, y: smallY }}>
        <Link href={`/projects/${ui.id}`} className="relative block">
          <div className="rotate-[3deg] overflow-hidden rounded-2xl border border-white/15 shadow-xl shadow-black/50 transition-transform duration-500 ease-out group-hover:rotate-[1deg] group-hover:-translate-y-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ui.cover}
              alt={ui.title}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          </div>
          <span className="absolute bottom-3 left-3 rounded-full bg-volt px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-night">
            {ui.category}
          </span>
        </Link>
      </motion.div>
      </motion.div>

      <motion.a
        href={socials[0].href}
        target="_blank"
        rel="noopener noreferrer"
        animate={reduce ? undefined : { y: [0, -8, 0], rotate: [-3, -1.5, -3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[4%] right-0 rounded-xl border border-white/10 bg-night/85 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm transition-colors hover:border-volt hover:text-volt"
      >
        12 stories on Behance
      </motion.a>
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
      <span
        aria-hidden
        className="pointer-events-none absolute -top-8 right-0 select-none font-serif text-[13rem] italic leading-none text-stroke text-ink/10 md:text-[18rem]"
      >
        01
      </span>
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
  const float = (duration: number, dy = -7) =>
    reduce ? undefined : { y: [0, dy, 0] };
  const timing = (duration: number) => ({
    duration,
    repeat: Infinity,
    ease: "easeInOut" as const,
  });
  return (
    <div className="relative mx-auto w-full max-w-sm text-volt">
      <svg
        viewBox="0 0 400 440"
        role="img"
        aria-label="From user needs to prototype"
        className="h-auto w-full overflow-visible"
      >
        <defs>
          <marker
            id="craft-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0L10 5L0 10z" fill="currentColor" opacity="0.7" />
          </marker>
        </defs>
        {/* connector arrows */}
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          opacity="0.55"
        >
          <path d="M118 96 C 140 110, 150 128, 158 148" markerEnd="url(#craft-arrow)" />
          <path d="M282 96 C 260 110, 250 128, 242 148" markerEnd="url(#craft-arrow)" />
          <path d="M112 300 C 132 316, 148 322, 168 326" markerEnd="url(#craft-arrow)" />
          <path d="M288 300 C 268 316, 252 322, 232 326" markerEnd="url(#craft-arrow)" />
          <path d="M96 356 C 130 384, 200 392, 262 378" markerEnd="url(#craft-arrow)" />
        </g>
        {/* phone wireframe */}
        <g
          fill="rgba(255,255,255,0.03)"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="140" y="128" width="120" height="208" rx="20" />
          <rect x="156" y="150" width="88" height="64" rx="8" fill="none" opacity="0.7" />
          <circle cx="176" cy="168" r="6" fill="none" opacity="0.7" />
          <path
            d="M156 206 L182 184 L198 198 L212 186 L244 206 Z"
            fill="none"
            opacity="0.7"
          />
          <line x1="156" y1="230" x2="244" y2="230" opacity="0.5" />
          <line x1="156" y1="244" x2="216" y2="244" opacity="0.35" />
          <line x1="156" y1="258" x2="228" y2="258" opacity="0.35" />
          <rect x="156" y="276" width="88" height="26" rx="13" fill="none" opacity="0.7" />
          <rect x="182" y="312" width="36" height="5" rx="2.5" fill="currentColor" opacity="0.6" stroke="none" />
        </g>
        {/* sticky notes */}
        <motion.g animate={float(5)} transition={timing(5)}>
          <g transform="rotate(-8 70 70)">
            <rect x="18" y="44" width="104" height="52" rx="6" fill="rgba(202,255,255,0.08)" stroke="currentColor" strokeWidth="1.5" />
            <text x="70" y="66" textAnchor="middle" fontSize="12" letterSpacing="1.5" fill="currentColor" fontFamily="ui-monospace, monospace">USER</text>
            <text x="70" y="82" textAnchor="middle" fontSize="12" letterSpacing="1.5" fill="currentColor" fontFamily="ui-monospace, monospace">NEEDS</text>
          </g>
        </motion.g>
        <motion.g animate={float(6.5)} transition={timing(6.5)}>
          <g transform="rotate(5 330 70)">
            <rect x="278" y="44" width="104" height="52" rx="6" fill="rgba(202,255,255,0.08)" stroke="currentColor" strokeWidth="1.5" />
            <text x="330" y="66" textAnchor="middle" fontSize="12" letterSpacing="1.5" fill="currentColor" fontFamily="ui-monospace, monospace">UI</text>
            <text x="330" y="82" textAnchor="middle" fontSize="12" letterSpacing="1.5" fill="currentColor" fontFamily="ui-monospace, monospace">DESIGN</text>
          </g>
        </motion.g>
        <motion.g animate={float(6)} transition={timing(6)}>
          <g transform="rotate(4 66 300)">
            <rect x="14" y="274" width="104" height="52" rx="6" fill="rgba(202,255,255,0.08)" stroke="currentColor" strokeWidth="1.5" />
            <text x="66" y="296" textAnchor="middle" fontSize="11" letterSpacing="1.2" fill="currentColor" fontFamily="ui-monospace, monospace">WIRE-</text>
            <text x="66" y="312" textAnchor="middle" fontSize="11" letterSpacing="1.2" fill="currentColor" fontFamily="ui-monospace, monospace">FRAMES</text>
          </g>
        </motion.g>
        <motion.g animate={float(5.5)} transition={timing(5.5)}>
          <g transform="rotate(-5 334 300)">
            <rect x="282" y="274" width="104" height="52" rx="6" fill="rgba(202,255,255,0.08)" stroke="currentColor" strokeWidth="1.5" />
            <text x="334" y="296" textAnchor="middle" fontSize="11" letterSpacing="1.2" fill="currentColor" fontFamily="ui-monospace, monospace">PROTO-</text>
            <text x="334" y="312" textAnchor="middle" fontSize="11" letterSpacing="1.2" fill="currentColor" fontFamily="ui-monospace, monospace">TYPE</text>
          </g>
        </motion.g>
        {/* user badge */}
        <motion.g animate={float(7)} transition={timing(7)}>
          <circle cx="330" cy="180" r="26" fill="rgba(202,255,255,0.06)" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="330" cy="173" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M318 192 C 320 184, 340 184, 342 192" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </motion.g>
      </svg>
      {/* Drop a transparent craft-process.png in /public to use it instead */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/craft-process.png"
        alt=""
        aria-hidden
        onError={(e) => e.currentTarget.remove()}
        className="absolute inset-0 h-full w-full object-contain"
      />
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
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
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
        edgeSensitivity={14}
        glowColor="40 80 80"
        backgroundColor="transparent"
        borderRadius={22}
        glowRadius={59}
        glowIntensity={0.6}
        coneSpread={20}
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
              {p.category}
            </span>
            <h3 className="mt-3 font-sans text-xl font-bold leading-[1.15] tracking-tight text-white md:text-2xl">
              {p.title}
            </h3>
          </div>
          <div className="relative w-[38%] shrink-0">
            <span
              aria-hidden
              className="absolute inset-0 translate-x-2 translate-y-2 rotate-3 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-transform duration-500 ease-out group-hover:translate-x-3.5 group-hover:translate-y-3.5 group-hover:rotate-6"
            />
            <span
              aria-hidden
              className="absolute inset-0 -rotate-2 rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:-rotate-4"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.cover}
              alt={p.title}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="relative aspect-[3/4] w-full rounded-xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </Link>
      </BorderGlow>
      <motion.span
        aria-hidden
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 rounded-[22px]"
      />
      </motion.div>
    </div>
  );
}

function TitleMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-nightscreen/60 py-3.5">
      <Ticker speed={70}>
        {projects.map((p) => (
          <span
            key={p.id}
            className="mx-6 flex items-center gap-5 font-serif text-xl italic text-white/65 md:text-2xl"
          >
            {p.title}
            <span className="font-mono text-[10px] not-italic tracking-[0.2em] text-volt">
              №{p.id}
            </span>
          </span>
        ))}
      </Ticker>
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
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-32 select-none font-serif text-[15rem] italic leading-none text-stroke text-volt/15"
      >
        03
      </span>
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <ChapterHead kicker="Chapter 03 — The Work" dark />
        <div className="mt-14 flex flex-wrap items-end justify-between gap-6">
          <StoryTitle text="The proof, framed." accentWords={["framed."]} dark />
          <Reveal className="pb-3">
            <a
              href={socials[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60 transition-colors hover:text-volt"
            >
              Full archive on Behance
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.08} className="mt-9">
          <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-white/40">
            Twelve pieces — hover to tilt, click to open.
          </p>
        </Reveal>
        <TitleMarquee />
        <div className="mt-16 grid gap-5 md:grid-cols-2 md:gap-6">
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
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <ChapterHead kicker="Chapter 04 — The Road" dark />
        <div className="mt-14">
          <StoryTitle
            text="The road so far."
            accentWords={["so", "far."]}
            chapter="A short chronology"
            dark
          />
        </div>
        <div className="relative mt-16 border-l border-white/15 pl-10 md:pl-14">
          {experience.map((e, i) => (
            <Reveal key={e.company}>
              <div className={cn("relative", i < experience.length - 1 && "pb-14")}>
                <span className="absolute -left-[16px] top-2 h-2.5 w-2.5 rounded-full bg-volt ring-4 ring-night" />
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-volt">
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
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 select-none font-serif text-[13rem] italic leading-none text-stroke text-ink/[0.07]"
      >
        05
      </span>
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