"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  Sparkles,
} from "lucide-react";
import { Marquee, Reveal, StaggerGroup, StaggerItem } from "@/lib/anim";
import {
  nav,
  profile,
  projects,
  experience,
  skills,
  socials,
} from "@/lib/data";
import Link from "next/link";

function Mark() {
  return (
    <span aria-hidden className="mr-1 inline-block text-ember">
      ✳
    </span>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="font-serif text-lg tracking-tight">
          <Mark />
          Apurba Dutta
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-inksoft transition-colors hover:text-ember"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${profile.email}`}
          className="hidden items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:border-ink hover:bg-ink hover:text-paper lg:flex"
        >
          <Mail className="h-3 w-3" />
          Say hello
        </a>
      </div>
    </header>
  );
}

function FloatingArt() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.span
        className="absolute right-[8%] top-16 hidden h-28 w-28 rounded-full bg-ember/20 md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute inset-2 rounded-full border border-dashed border-ember/50" />
      </motion.span>
      <motion.span
        className="absolute right-[26%] top-40 hidden h-14 w-14 rounded-full bg-moss/10 blur-[1px] md:block"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="absolute inset-0 rounded-full border-2 border-dashed border-moss/40" />
      </motion.span>
      <motion.span
        className="absolute left-[4%] top-32 hidden md:block"
        animate={{ rotate: [0, 14, 0], y: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 96 96" className="h-16 w-16 -scale-x-100" fill="none">
          <path
            d="M20 56 Q34 22 52 48 Q66 68 82 40"
            stroke="var(--color-ember)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path d="M82 40l8 4M80 48l10-1" stroke="var(--color-ember)" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </motion.span>
      <motion.span
        className="absolute bottom-[12%] left-[12%] hidden md:block"
        animate={{ rotate: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="12" stroke="var(--color-moss)" strokeWidth="3" transform="rotate(18 24 24)" />
          <circle cx="24" cy="24" r="5" fill="var(--color-moss)" />
        </svg>
      </motion.span>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative">
      <FloatingArt />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-20 md:grid-cols-[1.6fr_1fr] md:px-10 md:pt-28">
        <div>
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-ink/15 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-moss" />
              </span>
              {profile.status}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-serif text-5xl leading-[1.04] tracking-tight sm:text-6xl md:text-7xl">
              Design that makes people{" "}
              <em className="relative inline-block font-serif italic text-ember">
                stop scrolling
                <svg
                  viewBox="0 0 220 14"
                  className="absolute -bottom-2 left-0 w-full"
                  aria-hidden
                  fill="none"
                >
                  <path
                    d="M3 10 Q60 2 110 8 T217 7"
                    stroke="var(--color-ember)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </em>
              , then{" "}
              <em className="italic">start remembering</em>.
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-inksoft">
              I&apos;m {profile.name} — a Senior Graphic Designer at Swiggy,
              working across branding, campaigns, UI/UX and illustration.
              Detail-obsessed, fast-paced, and allergic to boring.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-transform hover:scale-[1.02]"
              >
                See the work
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ember hover:text-ember"
              >
                Tell me about a project
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="mt-4 md:mt-24">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 font-mono text-[11px] lowercase">
            {[
              ["current", profile.company],
              ["based", profile.location],
              ["craft", "3+ years"],
              ["since", "2019"],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 bg-paper px-5 py-4">
                <span className="text-[9px] uppercase tracking-[0.2em] text-inksoft/70">
                  {k}
                </span>
                <span className="truncate text-ink">{v}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-inksoft/70">
            Mumbai · Bengaluru · remote friendly
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Ticker() {
  const items = [
    "Brand identity",
    "Campaigns",
    "UI/UX",
    "Illustration",
    "Packaging",
    "Logo design",
    "Social content",
    "Motion · GIF",
  ];
  return (
    <div className="bg-ember py-3 text-paper">
      <Marquee duration={30}>
        {items.map((t) => (
          <span
            key={t}
            className="mx-4 flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.24em]"
          >
            {t}
            <Sparkles className="h-3 w-3" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-inksoft/70">
          — Selected work
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-4xl tracking-tight md:text-6xl">
            Work that earns the pause
          </h2>
          <span className="font-mono text-xs text-inksoft">
            ({projects.length.toString().padStart(2, "0")} pieces)
          </span>
        </div>
      </Reveal>
      <StaggerGroup className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2">
        {projects.map((p) => (
          <StaggerItem key={p.id}>
            <Link
              href={`/projects/${p.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl border border-ink/10 bg-paperdeep">
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.cover}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-paper/85 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink backdrop-blur-sm">
                  {p.category}
                </span>
                <span className="absolute right-4 top-4 font-serif text-3xl italic text-ink/15 transition-colors group-hover:text-ember/50">
                  {p.id}
                </span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl leading-snug transition-colors group-hover:text-ember">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-inksoft">{p.blurb}</p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 -translate-x-1 translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <Reveal className="mt-16 text-center">
        <a
          href={socials[0].href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-ember hover:text-ember"
        >
          Full archive on Behance
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </Reveal>
    </section>
  );
}

function Manifesto() {
  const columns = [
    {
      n: "01",
      t: "Branding",
      d: "Identities and logos that give companies a personality worth remembering.",
    },
    {
      n: "02",
      t: "Campaigns",
      d: "Festive and social campaigns — from Christmas to Diwali to Father's Day — that carry real emotion.",
    },
    {
      n: "03",
      t: "UI/UX",
      d: "Websites, e-commerce and product interfaces designed to feel obvious and calm.",
    },
    {
      n: "04",
      t: "Illustration",
      d: "Custom artwork that makes a brand unmistakably its own.",
    },
  ];
  return (
    <section className="border-y border-ink/10 bg-paperdeep/50">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
        <Reveal>
          <span className="font-serif text-7xl italic leading-none text-ember">
            &ldquo;
          </span>
          <blockquote className="mx-auto -mt-6 max-w-3xl font-serif text-2xl italic leading-relaxed text-ink md:text-4xl">
            Detail-oriented, organized and meticulous. Creative, with a talent
            for developing unique custom artwork — and an innovative approach to
            ideas and concept development.
          </blockquote>
          <figcaption className="mt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-inksoft/70">
            — {profile.name}, aka “Eden”
          </figcaption>
        </Reveal>
        <StaggerGroup className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 text-left sm:grid-cols-2">
          {columns.map((c) => (
            <StaggerItem key={c.n} className="bg-paper p-7">
              <span className="font-mono text-[10px] text-ember">{c.n}</span>
              <h3 className="mt-3 font-serif text-xl">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-inksoft">
                {c.d}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function About() {
  const facts = [
    ["Currently", `${profile.title} @ ${profile.company}`],
    ["Based in", profile.location],
    ["Experience", "3+ years across product & brand"],
    ["Open to", "Freelance & full-time"],
    ["Est.", "2019, one sticker at a time"],
  ];
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-14 md:grid-cols-2 md:gap-20">
        <div>
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-inksoft/70">
              — About
            </p>
            <div className="relative mt-6 aspect-[4/5] overflow-hidden rounded-2xl border border-ink/10">
              <div className="absolute inset-0 bg-gradient-to-br from-ember/70 via-paperdeep to-moss/50" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="select-none font-serif text-[9rem] italic leading-none text-paper/80 mix-blend-overlay">
                  AD
                </span>
              </span>
              <span className="absolute left-5 top-5 rotate-[-4deg] rounded-md bg-paper px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink shadow-sm">
                Senior
              </span>
              <span className="absolute right-5 top-12 rotate-[3deg] rounded-md bg-ink px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-paper shadow-sm">
                aka “Eden”
              </span>
              <span className="absolute bottom-5 left-5 rounded-full bg-paper/80 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm">
                Photo soon — custom art meanwhile
              </span>
            </div>
          </Reveal>
        </div>
        <div>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-4xl leading-[1.1] tracking-tight md:text-5xl">
              A designer who sweats the details — so the client doesn&apos;t
              have to.
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 text-[15px] leading-relaxed text-inksoft">
              I&apos;ve spent 3+ years designing at Swiggy, BuyMore and AI
              Probably — shipping brand systems, festive campaigns, e-commerce
              interfaces, packaging and illustration. I work at a fast pace
              with detailed eyes, and I care about the project&apos;s ultimate
              success more than my own screenshot.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-inksoft">
              Enthusiastic team player, genuinely curious, and happiest when the
              work makes people stop and look twice.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {facts.map(([k, v]) => (
                <li key={k} className="flex items-baseline justify-between gap-6 py-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-inksoft/70">
                    {k}
                  </span>
                  <span className="text-right font-serif text-[15px]">{v}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      className="border-y border-ink/10 bg-paperdeep/50"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-28">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-inksoft/70">
            — Experience
          </p>
          <h2 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
            Places I&apos;ve made things happen
          </h2>
        </Reveal>
        <Reveal className="mt-12">
          {experience.map((e) => (
            <div
              key={e.company}
              className="group grid gap-3 border-t border-ink/10 py-8 transition-colors last:border-b hover:bg-paperdeep md:grid-cols-[1.1fr_1.4fr_1fr] md:gap-8"
            >
              <div>
                <h3 className="font-serif text-2xl">{e.company}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-inksoft/70">
                  {e.period} · {e.place}
                </p>
              </div>
              <div>
                <p className="text-[15px] font-semibold">{e.role}</p>
                <ul className="mt-3 space-y-1.5">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-inksoft">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ember" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-28">
      <Reveal>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-inksoft/70">
          — Toolkit
        </p>
        <h2 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
          What&apos;s in the kit
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <Reveal key={s} delay={0.03 * i} className="bg-paper">
            <div className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-paperdeep">
              <span className="font-serif text-lg">{s}</span>
              <span className="font-mono text-[10px] text-ember">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden rounded-t-[2rem] bg-ink text-paper"
    >
      <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/50">
            — Contact
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-[1.08] tracking-tight md:text-6xl">
            Have a project that deserves{" "}
            <em className="italic text-ember">better design?</em>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-paper/70">
            I take on freelance work alongside my role at Swiggy, and I&apos;m
            open to the right full-time conversations. Tell me what you&apos;re
            building.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-transform hover:scale-[1.03]"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-ember hover:text-ember"
              >
                {s.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ThemeA() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Nav />
      <Hero />
      <Ticker />
      <Work />
      <Manifesto />
      <About />
      <Experience />
      <Skills />
      <Contact />
      <footer className="border-t border-ink/10 bg-paper px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-inksoft/70">
          <span>
            © 2026 {profile.name} — designed with obsession
          </span>
          <a href="#top" className="transition-colors hover:text-ember">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}