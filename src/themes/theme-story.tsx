"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
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
import { Dither } from "@/components/Dither";
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

function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-night px-6 py-6 md:px-12"
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
            <span className="flex items-center gap-2">
              <QrMark className="text-volt" /> Eden &mdash; est. 2019
            </span>
            <span>Bengaluru, India</span>
          </div>
          <div className="mx-auto max-w-3xl">
            <p className="font-serif text-lg italic text-white/60">Once upon a grid,</p>
            <p className="mt-2 font-serif text-4xl leading-tight tracking-tight text-white md:text-6xl">
              a designer decided{" "}
              <span className="font-serif italic text-volt">stories</span> come
              first.
            </p>
          </div>
          <div>
            <div className="h-[3px] w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-volt"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
            <p className="mt-3 text-right font-mono text-[9px] uppercase tracking-[0.24em] text-white/40">
              A. Dutta
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
      transition={{ duration: 0.7, delay: 2.15, ease: EASE }}
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yUp = useTransform(scrollYProgress, [0, 1], [60, -50]);
  const yDown = useTransform(scrollYProgress, [0, 1], [-30, 70]);

  const big = projects[1];
  const small = projects[8];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: d + 0.45, ease: EASE }}
      className="relative mx-auto w-full max-w-md lg:max-w-lg"
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
        style={{ y: yUp }}
        className="group relative w-[82%] -rotate-2 rounded-2xl border border-white/10 bg-nightscreen shadow-2xl shadow-black/50 transition-transform duration-500 ease-out hover:rotate-0"
      >
        <Link href={`/projects/${big.id}`} className="block">
          <div className="overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={big.cover}
              alt={big.title}
              referrerPolicy="no-referrer"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          </div>
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-night/70 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-volt backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-volt" />
            {big.category}
          </span>
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-night/95 via-night/40 to-transparent px-5 pb-4 pt-16">
            <span className="font-serif text-base italic text-white/95 md:text-lg">
              {big.title}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
              № {big.id}
            </span>
          </span>
        </Link>
      </motion.div>

      <motion.div
        style={{ y: yDown }}
        className="group relative -mt-[24%] ml-auto w-[52%] rotate-3 rounded-2xl border border-white/10 bg-nightscreen shadow-xl shadow-black/50 transition-transform duration-500 ease-out hover:rotate-1"
      >
        <Link href={`/projects/${small.id}`} className="block">
          <div className="overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={small.cover}
              alt={small.title}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            />
          </div>
          <span className="absolute bottom-3 left-3 rounded-full bg-volt px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-night">
            {small.category}
          </span>
        </Link>
      </motion.div>

      <motion.span
        style={{ y: yUp }}
        className="absolute -left-3 top-[58%] -rotate-3 rounded-xl border border-white/10 bg-night/85 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm"
      >
        12 stories on Behance
      </motion.span>

      <span className="absolute -left-10 top-1/2 hidden -translate-y-1/2 -rotate-90 font-mono text-[9px] uppercase tracking-[0.34em] text-white/35 lg:block">
        Scroll to begin
      </span>
    </motion.div>
  );
}

function Hero() {
  const d = 2.15;
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night bg-grid-volt text-white"
    >
      <Dither
        waveColor={[0.05, 0.3, 0.34]}
        disableAnimation={false}
        enableMouseInteraction={true}
        mouseRadius={0.25}
        colorNum={26}
        waveAmplitude={0.06}
        waveFrequency={4}
        waveSpeed={0.04}
        backgroundColor={[0.03, 0.03, 0.04]}
        className="-z-10 opacity-30"
      />
      <div className="pointer-events-none absolute inset-0 -z-[9] bg-gradient-to-b from-transparent via-transparent to-night/60" />
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-16 px-6 pb-16 pt-32 md:px-10 lg:grid-cols-[1.15fr_0.9fr] lg:gap-8 lg:pt-40">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: d, ease: EASE }}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.26em] text-white/50"
          >
            <span className={cn("h-2 w-2 rounded-full bg-volt", "cursor-blink")} />
            {heroSticky.kicker}
          </motion.p>
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
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: d + 0.48, ease: EASE }}
            className="mt-4 max-w-2xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-white/40"
          >
            {heroSticky.personality}
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
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-volt hover:text-volt"
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
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 border-b border-white/10 font-mono text-[10px] uppercase tracking-[0.18em] md:grid-cols-4">
          {[
            [profile.experience, "experience"],
            ["Swiggy", "currently"],
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
              <dl className="grid grid-cols-3 divide-x divide-ink/10 border-y border-ink/10">
                {[
                  ["Currently", profile.company],
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

function SectionCraft() {
  return (
    <section id="craft" className="relative bg-night bg-grid-volt text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <ChapterHead kicker="Chapter 02 — The Craft" dark />
        <div className="mt-16 grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <StoryTitle
              text="Any message. Delivered so it lands."
              accentWords={["lands."]}
              chapter="The toolkit"
              dark
            />
            <Reveal delay={0.05}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/60">
                Performance marketing, brand partnerships, product design — the
                message changes, the delivery doesn&apos;t.
              </p>
            </Reveal>
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
                className="mx-3 inline-flex shrink-0 items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] py-2 pl-2 pr-6"
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

function ProjectCard({
  p,
  flip = false,
  ratio,
}: {
  p: Project;
  flip?: boolean;
  ratio: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={cn("group", flip && "md:mt-28")}>
      <BorderGlow
        edgeSensitivity={42}
        glowColor="40 80 80"
        backgroundColor="#000000"
        borderRadius={23}
        glowRadius={48}
        glowIntensity={0.8}
        coneSpread={23}
        animated
        colors={["#c084fc", "#f472b6", "#38bdf8"]}
      >
        <Link href={`/projects/${p.id}`} className="block">
          <div className={cn("relative overflow-hidden", ratio)}>
            <motion.img
              src={p.cover}
              alt={p.title}
              referrerPolicy="no-referrer"
              loading="lazy"
              style={{ y }}
              className="h-full w-full scale-[1.18] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.28]"
            />
            <span className="absolute left-4 top-4 rounded-full bg-night/80 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-volt backdrop-blur-sm">
              {p.category}
            </span>
            <span className="absolute right-4 top-4 font-serif text-3xl italic text-white/25 transition-colors group-hover:text-volt">
              {p.id}
            </span>
            <span className="absolute inset-x-0 bottom-0 translate-y-full bg-night/90 px-5 py-4 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:translate-y-0">
              <span className="block text-sm leading-snug text-white/85">
                {p.blurb}
              </span>
              <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-volt">
                Open the story
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </span>
          </div>
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 px-1 pt-4">
            <h3 className="font-serif text-2xl leading-tight text-white transition-colors group-hover:text-volt md:text-[1.65rem]">
              {p.title}
            </h3>
            <ArrowUpRight className="h-5 w-5 shrink-0 -translate-x-1 translate-y-1 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
          </div>
        </Link>
      </BorderGlow>
    </div>
  );
}

const RATIOS = ["aspect-[4/3]", "aspect-square", "aspect-[4/5]", "aspect-[4/3]"];

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
    <section id="work" className="relative overflow-hidden bg-night bg-grid-volt text-white">
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
            Twelve pieces — hover the frames for the story, click to open.
          </p>
        </Reveal>
        <TitleMarquee />
        <div className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-2 md:gap-y-28">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              p={p}
              flip={i % 2 === 1}
              ratio={RATIOS[i % RATIOS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionRoad() {
  return (
    <section id="road" className="relative bg-night bg-grid-volt text-white">
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
          <div className="rounded-2xl border border-white/10 p-8 md:p-10">
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
      <Preloader />
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