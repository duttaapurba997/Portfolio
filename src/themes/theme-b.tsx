"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ClipboardList,
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

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-volt"
    />
  );
}

function Nav({ theme }: { theme: string }) {
  return (
    <div className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 bg-nightscreen/80 px-5 py-3 backdrop-blur-md md:px-7">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-sans text-lg font-black uppercase leading-none tracking-tight text-volt">
            {profile.alias}
          </span>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.24em] text-white/40 sm:inline">
            {profile.name}
          </span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 transition-colors hover:text-volt"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-full bg-volt px-4 py-2 font-sans text-[11px] font-bold uppercase tracking-wide text-night transition-transform hover:scale-[1.04]"
        >
          Hire me
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
      <span className="sr-only">{theme}</span>
    </div>
  );
}

function Ticker() {
  const words = [
    "Available for freelance",
    "Full-time open",
    "Senior graphic designer @ Swiggy",
    "Branding · campaigns · UI/UX · illustration",
  ];
  return (
    <div className="border-b border-white/10 bg-night py-2.5">
      <Marquee duration={28}>
        {words.map((w) => (
          <span
            key={w}
            className="mx-6 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
          >
            {w}
            <span className="text-volt">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid-volt" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[-10%] h-[420px] w-[520px] rounded-full bg-emberhot/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-36 text-center md:pt-44">
        <Reveal>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-volt/30 bg-volt/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-volt">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-volt" />
            </span>
            Available — freelance & full-time
          </div>
        </Reveal>
        <h1 className="mt-8 font-sans font-black uppercase leading-[0.88] tracking-tighter">
          <motion.span
            className="block text-[17vw] text-white md:text-[13vw]"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Apurba
          </motion.span>
          <motion.span
            className="block text-stroke-volt text-[17vw] md:text-[13vw]"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            Dutta
            <span className="text-volt">*</span>
          </motion.span>
        </h1>
        <Reveal delay={0.25}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/60">
            Senior graphic designer blending{" "}
            <span className="text-white">branding, campaigns, UI/UX and illustration</span>{" "}
            into work people actually remember. Fast, detailed, obsessive.
          </p>
        </Reveal>
        <Reveal delay={0.32}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:border-volt hover:text-volt"
            >
              Scroll to work
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-wide text-night transition-transform hover:scale-[1.03]"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {[
              ["3+", "Years of craft"],
              ["12", "Featured works"],
              ["45", "Behance appreciations"],
              ["2019", "Since"],
            ].map(([n, l]) => (
              <div
                key={l}
                className="flex flex-col items-center gap-1 bg-night py-5"
              >
                <span className="font-sans text-3xl font-black text-volt">
                  {n}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                  {l}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VoltMarquee() {
  return (
    <div className="rotate-0 bg-volt py-3.5 text-night">
      <Marquee duration={22}>
        <span className="mx-5 flex items-center gap-5 font-sans text-sm font-black uppercase tracking-tight">
          Available for freelance
          <span>✦</span>
          Full-time open
          <span>✦</span>
          Senior graphic designer @ Swiggy
          <span>✦</span>
          Let&apos;s make something unforgettable
          <span>✦</span>
        </span>
      </Marquee>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-volt">
              ( 01 ) — Selected work
            </p>
            <h2 className="mt-4 font-sans text-5xl font-black uppercase leading-none tracking-tighter text-white md:text-7xl">
              The portfolio<span className="text-volt">.</span>
            </h2>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            [ {projects.length} projects — open on Behance ]
          </span>
        </div>
      </Reveal>
      <StaggerGroup className="mt-16 grid gap-10 md:grid-cols-2 md:gap-12">
        {projects.map((p, i) => (
          <StaggerItem key={p.id}>
            <Link
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <motion.div
                whileHover={{ rotate: i % 2 === 0 ? -0.8 : 0.8 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 transition-colors group-hover:border-volt/50"
              >
                <span className="pointer-events-none absolute -left-1 -top-6 z-10 select-none font-sans text-[7rem] font-black leading-none text-white/5 transition-colors group-hover:text-volt/15">
                  {p.id}
                </span>
                <div className="aspect-[16/11] overflow-hidden bg-nightscreen">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.cover}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 saturate-[0.85] transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-100 group-hover:saturate-100"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-night/90 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-volt">
                    Open case →
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-white" />
                </div>
              </motion.div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-sans text-xl font-bold uppercase tracking-tight text-white transition-colors group-hover:text-volt">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">{p.blurb}</p>
                </div>
                <span className="shrink-0 rounded-full border border-white/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60 transition-colors group-hover:border-volt/50 group-hover:text-volt">
                  {p.category}
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      className="border-y border-white/10 bg-nightscreen/60"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-28">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-volt">
            ( 02 ) — Experience
          </p>
          <h2 className="mt-4 font-sans text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
            Roster<span className="text-volt">.</span>
          </h2>
        </Reveal>
        <div className="mt-14">
          {experience.map((e) => (
            <motion.div
              key={e.company}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="group relative grid gap-2 border-t border-white/10 py-8 transition-colors last:border-b hover:bg-white/[0.03] md:grid-cols-[0.7fr_1.6fr_1fr] md:items-center md:gap-8"
            >
              <span className="absolute left-0 top-0 h-full w-[3px] scale-y-0 bg-volt transition-transform duration-300 group-hover:scale-y-100" />
              <span className="pl-6 font-mono text-[11px] uppercase tracking-[0.24em] text-white/40 md:pl-8">
                {e.period}
              </span>
              <div className="pl-6 md:pl-0">
                <h3 className="font-sans text-2xl font-black uppercase tracking-tight text-white">
                  {e.company}
                </h3>
                <p className="mt-1 text-sm font-medium text-volt">{e.role}</p>
                <ul className="mt-3 space-y-1.5">
                  {e.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex gap-2.5 text-sm leading-relaxed text-white/55"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 bg-white/40" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="hidden pl-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 md:block">
                {e.place}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-28">
      <Reveal>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-volt">
          ( 03 ) — Toolkit
        </p>
        <h2 className="mt-4 font-sans text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
          Weapons of choice<span className="text-volt">.</span>
        </h2>
      </Reveal>
      <div className="mt-10 flex flex-wrap gap-3">
        {skills.map((s, i) => (
          <motion.span
            key={s}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.03 * i }}
            className="cursor-default rounded-full border border-white/15 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70 transition-colors hover:border-volt hover:bg-volt hover:text-night"
          >
            {s}
          </motion.span>
        ))}
      </div>
      <Reveal className="mt-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-nightscreen/60 p-7">
            <ClipboardList className="h-6 w-6 text-volt" />
            <h3 className="mt-4 font-sans text-lg font-bold uppercase tracking-tight text-white">
              What I bring
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              An organized eye, a fast pace, custom artwork and an innovative
              approach to concept development — a team player who cares about
              the project&apos;s ultimate success.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-nightscreen/60 p-7">
            <ArrowUpRight className="h-6 w-6 text-volt" />
            <h3 className="mt-4 font-sans text-lg font-bold uppercase tracking-tight text-white">
              Where I&apos;ve worked
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Swiggy (Senior Graphic Designer, 2024–now), BuyMore (websites,
              social, banners, email, GIFs, logos — 2022–24), AI Probably
              (ed-tech visuals — 2021–22).
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-nightscreen/60 p-7">
            <ArrowUpRight className="h-6 w-6 rotate-45 text-volt" />
            <h3 className="mt-4 font-sans text-lg font-bold uppercase tracking-tight text-white">
              Availability
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Freelance and full-time, Bengaluru or remote. Currently open and
              enjoying the good kind of busy.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-volt/10 blur-[130px]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-28 text-center md:py-36">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-volt">
            ( 04 ) — Contact
          </p>
          <h2 className="mt-6 font-sans font-black uppercase leading-[0.9] tracking-tighter text-white">
            <span className="block text-5xl md:text-8xl">Have a project</span>
            <span className="block text-stroke-volt text-5xl md:text-8xl">
              worth remembering?
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-white/60">
            I take on freelance work alongside my role at Swiggy, and I&apos;m
            open to the right full-time conversations.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-volt px-7 py-3.5 font-sans text-[12px] font-bold uppercase tracking-wide text-night transition-transform hover:scale-[1.04]"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </a>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-volt hover:text-volt"
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

export function ThemeB() {
  return (
    <div className="min-h-screen bg-night font-sans text-white">
      <ScrollProgress />
      <Nav theme="n" />
      <Ticker />
      <Hero />
      <VoltMarquee />
      <Work />
      <Experience />
      <Skills />
      <Contact />
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
          <span>© 2026 {profile.name} — built loud, on purpose</span>
          <a href="#top" className="transition-colors hover:text-volt">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}