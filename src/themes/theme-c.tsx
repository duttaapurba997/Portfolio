"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Printer,
  Send,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { Marquee, Magnetic, Reveal } from "@/lib/anim";
import { cn } from "@/lib/utils";
import {
  nav,
  profile,
  projects,
  experience,
  skills,
  socials,
  type Project,
} from "@/lib/data";

const priceFaq = [
  {
    q: "What do you actually do?",
    a: "Graphic design, UI/UX, campaigns and brand systems — I make things look like they mean it.",
  },
  {
    q: "Are you available for freelance?",
    a: "Yes — select projects alongside my current role at Swiggy.",
  },
  {
    q: "How do you price projects?",
    a: "It depends on scope. I will give you a clear number after a quick call.",
  },
  {
    q: "What tools do you use?",
    a: "Figma, Photoshop, Illustrator, InDesign, Premiere Pro and Framer — whatever gets the best result.",
  },
];
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function Corners() {
  const pos = ["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"];
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {pos.map((p) => (
        <span
          key={p}
          className={cn(
            "absolute font-mono text-sm font-bold leading-none text-stamp/70",
            p
          )}
        >
          +
        </span>
      ))}
    </span>
  );
}

function Dotted() {
  return <span aria-hidden className="mx-2.5 flex-1 border-b border-dotted border-specink/30" />;
}

function Stamp({
  children,
  className,
  delay = 0,
  rotate = 8,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  rotate?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 1.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15, delay }}
      style={{ rotate }}
      className={cn(
        "inline-block rounded-[3px] border-2 border-stamp px-2.5 py-1 font-mono text-[9px] font-black uppercase tracking-[0.24em] text-stamp [box-shadow:0_0_0_2px_var(--color-spec)]",
        className
      )}
    >
      {children}
    </motion.span>
  );
}

function HeaderBar() {
  return (
    <div className="sticky top-0 z-40 border-b border-specink/20 bg-spec/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <a href="#top" className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
          <span className="text-stamp">▚</span>
          apurba_dutta.desp
          <span className="cursor-blink text-stamp">▌</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-mono text-[9px] uppercase tracking-[0.24em] text-specink/60 transition-colors hover:text-stamp"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded border border-specink/30 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors hover:border-stamp hover:text-stamp"
        >
          [ transmit ]
        </a>
      </div>
    </div>
  );
}

function Boot() {
  return (
    <div className="border-b border-specink/20 bg-specink text-spec">
      <div className="mx-auto max-w-6xl px-5 py-4 font-mono text-[10px] leading-relaxed tracking-wide">
        <p>&gt; INITIALIZING APURBA_DUTTA.PORTFOLIO...</p>
        <p>
          &gt; SCANNING FOR: BRANDING, CAMPAIGNS, UI/UX, ILLUSTRATION{" "}
          <span className="text-volt">✓ 0 ERRORS</span>
        </p>
        <p>
          &gt; STATUS:{" "}
          <span className="text-volt">OPEN FOR FREELANCE &amp; FULL-TIME</span>
          <span className="cursor-blink text-volt"> ▌</span>
        </p>
      </div>
    </div>
  );
}

function CertHero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-12">
      <Reveal>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-specink/50">
          file: designer_spec_001 — rev 2026
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="relative mt-5 border-2 border-specink bg-spec p-6 md:p-10">
          <Corners />
          <div className="relative flex flex-wrap items-baseline justify-between gap-2 border-b border-specink pb-3">
            <h1 className="font-mono text-lg font-black uppercase tracking-tight md:text-2xl">
              Designer Specification Sheet
            </h1>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-specink/50">
              [ subject: {profile.name} ]
            </span>
          </div>

          <div className="relative mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["name", "Apurba Dutta (Eden)"],
              ["role", "Senior Graphic Designer"],
              ["employer", "Swiggy — Bengaluru, India"],
              ["experience", "3+ years"],
              ["focus", "Branding · UI/UX · Illustration"],
              ["member since", "May 2019"],
            ].map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="flex items-baseline font-mono text-[11px] uppercase tracking-[0.08em]"
              >
                <span className="text-specink/50">{k}</span>
                <Dotted />
                <span className="font-bold">{v}</span>
              </motion.div>
            ))}
          </div>

          <div className="relative mt-6 flex items-baseline gap-2 border-t border-specink pt-5 font-mono text-[11px] uppercase tracking-[0.08em]">
            <span className="text-specink/50">status</span>
            <Dotted />
            <span className="grid place-items-center border-2 border-specink px-1 text-[10px] leading-none">
              ✓
            </span>
            <span className="font-bold">Available — freelance &amp; full-time</span>
          </div>

          <p className="relative mt-8 border-t-2 border-dashed border-specink/40 pt-6 font-mono text-[11px] leading-relaxed uppercase tracking-[0.08em] text-specink">
            This document certifies that the under-signed is a certified senior
            graphic designer who cares too much about grids, gutters and good
            kerning. Detail-oriented. Organized. Meticulous. Fast.
          </p>
          <span className="relative mt-6 block text-right font-mono text-sm font-black uppercase tracking-[0.2em]">
            — Eden <span className="text-stamp">✦</span>
          </span>

          <span className="absolute right-6 top-16">
            <Stamp delay={0.5} rotate={10}>
              Verified
            </Stamp>
          </span>
          <span className="absolute left-6 top-24">
            <Stamp delay={0.65} rotate={-8}>
              Est. 2019
            </Stamp>
          </span>
          <span className="absolute bottom-6 left-6">
            <Stamp delay={0.8} rotate={7}>
              Open for work
            </Stamp>
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-6 grid grid-cols-2 gap-px border-2 border-specink bg-specink/20 font-mono md:grid-cols-4">
          {[
            ["12", "shipped works"],
            ["45", "appreciations"],
            ["3+", "years of craft"],
            ["1", "obsession: detail"],
          ].map(([n, l]) => (
            <div key={l} className="flex items-baseline gap-2 bg-spec px-4 py-4 text-[11px] uppercase tracking-[0.1em]">
              <span className="font-black">{n}</span>
              <span className="text-specink/55">{l}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function TickTape() {
  return (
    <div className="border-y-2 border-specink bg-spec py-2.5 text-specink">
      <Marquee duration={26}>
        <span className="mx-6 flex items-center gap-6 font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
          [ design × detail × code ] <span className="text-stamp">✦</span> pay
          what it&apos;s worth <span className="text-stamp">✦</span> just say hi{" "}
          <span className="text-stamp">✦</span> response &lt; 24h{" "}
          <span className="text-stamp">✦</span> no boring briefs
        </span>
      </Marquee>
    </div>
  );
}

const CATS = ["all", "ui/ux", "branding", "campaign", "packaging", "social · ads"] as const;

function LedgerRow({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.id}`}
      className="group grid grid-cols-[2.6rem_1fr_auto] items-center gap-3 border-b border-specink/15 px-2 py-3 transition-colors hover:bg-specink hover:text-spec"
    >
      <span className="font-mono text-[10px] text-specink/45 group-hover:text-spec/60">
        [{p.id}]
      </span>
      <span className="min-w-0">
        <span className="block truncate font-mono text-[12px] font-bold uppercase tracking-[0.1em]">
          {p.title}
        </span>
        <span className="block truncate font-mono text-[9px] uppercase tracking-[0.2em] text-specink/45 group-hover:text-spec/60 md:hidden">
          {p.category}
        </span>
      </span>
      <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-specink/45 group-hover:text-spec/60 md:block">
        {p.category}
      </span>
      <ArrowUpRight className="h-4 w-4 text-specink/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-spec" />
    </Link>
  );
}

function Work() {
  const filter = (v: (typeof CATS)[number]) =>
    v === "all" ? projects : projects.filter((p) => p.category.toLowerCase() === v);

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-specink/50">
          #02 — project archive (ledger)
        </p>
        <h2 className="mt-3 font-mono text-2xl font-black uppercase tracking-tight md:text-4xl">
          Work log<span className="text-stamp">.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <Tabs defaultValue="all">
          <TabsList variant="line" className="flex w-full flex-wrap gap-1 md:w-auto">
            {CATS.map((c) => (
              <TabsTrigger
                key={c}
                value={c}
                className="font-mono text-[9px] uppercase tracking-[0.2em]"
              >
                {c === "all" ? "● all" : c}
              </TabsTrigger>
            ))}
          </TabsList>
          {CATS.map((c) => (
            <TabsContent key={c} value={c}>
              <div className="mt-6 border-t-2 border-specink/60 pt-2">
                {filter(c).map((p) => (
                  <LedgerRow key={p.id} p={p} />
                ))}
                <div className="flex items-baseline justify-between gap-4 px-2 pt-4 font-mono text-[10px] uppercase tracking-[0.2em]">
                  <span>total: {filter(c).length} item(s)</span>
                  <span className="text-specink/45">
                    {c === "all" ? "all verified ▚" : `type: ${c}`}
                  </span>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Reveal>

      <Reveal delay={0.15} className="mt-8 text-center">
        <a
          href={socials[0].href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-specink px-5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] transition-colors hover:bg-specink hover:text-spec"
        >
          View full archive on behance
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </Reveal>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="border-y border-specink/40 bg-paperdeep/40">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-specink/50">
            #03 — employment log
          </p>
          <h2 className="mt-3 font-mono text-2xl font-black uppercase tracking-tight md:text-4xl">
            Places on the record<span className="text-stamp">.</span>
          </h2>
        </Reveal>
        <div className="mt-10">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={0.05 * i}>
              <div className="group grid gap-4 border-t border-specink/30 py-7 md:grid-cols-[0.6fr_1.4fr_1fr] md:gap-6">
                <SField label="period" value={e.period} />
                <div>
                  <SField label="company · role" value={`${e.company} — ${e.role}`} />
                  <ul className="mt-3 space-y-1.5">
                    {e.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex gap-2.5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-specink/70"
                      >
                        <span className="text-stamp">›</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <SField label="notes" value={i === 0 ? "currently here" : "left on good terms"} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SField({ label, value }: { label: string; value: string }) {
  return (
    <div className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em]">
      <span className="text-specink/45">{label}: </span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function SkillsCheck() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-specink/50">
          #04 — certified skills
        </p>
        <h2 className="mt-3 font-mono text-2xl font-black uppercase tracking-tight md:text-4xl">
          Checked. All checked<span className="text-stamp">.</span>
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-px border-2 border-specink/70 bg-specink/30 sm:grid-cols-2">
        {skills.map((s, i) => (
          <div
            key={s}
            className="flex items-center gap-3 bg-spec px-4 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em]"
          >
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.03 * i }}
              className="grid h-4 w-4 shrink-0 place-items-center bg-specink text-[9px] leading-none text-spec"
            >
              ✓
            </motion.span>
            {s}
          </div>
        ))}
      </div>
      <Reveal delay={0.1} className="mt-8">
        <div className="flex flex-wrap items-center gap-4 border-2 border-specink bg-specink px-5 py-4 text-spec">
          <ShieldCheck className="h-5 w-5 text-volt" />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em]">
            quality assurance: passed — every deliverable reviewed twice, once
            with fresh eyes
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="border-y border-specink/40 bg-paperdeep/40">
      <div className="mx-auto max-w-4xl px-5 py-20">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-specink/50">
            #05 — frequently asked
          </p>
          <h2 className="mt-3 font-mono text-2xl font-black uppercase tracking-tight md:text-4xl">
            Frequently asked nothing<span className="text-stamp">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <Accordion className="border-t border-specink/40">
            {priceFaq.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="gap-4 py-4 font-mono text-[12px] font-bold uppercase tracking-[0.08em]">
                  <span className="pr-2 text-stamp">▸</span>
                  {f.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pl-7 pr-6 pb-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-specink/75">
                    {f.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry — ${name || "hello"}`);
    const body = encodeURIComponent(`${note}\n\n— ${name}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-specink/50">
          #06 — transmit
        </p>
        <h2 className="mt-3 font-mono text-2xl font-black uppercase tracking-tight md:text-4xl">
          Contact card — tear &amp; send<span className="text-stamp">.</span>
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <Reveal>
          <form
            onSubmit={submit}
            className="border-2 border-specink bg-spec p-6 md:p-8"
          >
            <Corners />
            <div className="relative flex flex-col gap-5">
              <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-specink/55">
                your name
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="mt-2 h-11 rounded-none border-specink/50 bg-transparent font-mono text-[12px] uppercase tracking-wide placeholder:text-specink/30 focus-visible:border-specink"
                />
              </label>
              <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-specink/55">
                the brief
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="We need a brand that doesn't blend in…"
                  className="mt-2 min-h-28 rounded-none border-specink/50 bg-transparent font-mono text-[12px] uppercase tracking-wide placeholder:text-specink/30 focus-visible:border-specink"
                />
              </label>
              <Magnetic>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-none border-2 border-specink bg-specink font-mono text-[10px] font-black uppercase tracking-[0.24em] text-spec hover:bg-specink/90"
                >
                  <Send className="size-3.5" />
                  Transmit brief
                </Button>
              </Magnetic>
              <p className="text-center font-mono text-[9px] uppercase tracking-[0.18em] text-specink/45">
                opens your mail client — no forms were captured in the making
                of this portfolio
              </p>
            </div>
          </form>
        </Reveal>
        <div className="flex flex-col justify-between gap-8">
          <Reveal delay={0.08}>
            <div className="flex flex-col gap-5 border-2 border-dashed border-specink/60 p-6 font-mono md:p-8">
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em]">
                <Terminal className="size-4 text-stamp" /> direct line
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="text-lg font-black uppercase tracking-tight underline decoration-stamp decoration-2 underline-offset-4 transition-colors hover:text-stamp"
              >
                {profile.email}
              </a>
              <div className="flex flex-wrap gap-3 pt-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 border border-specink/60 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-specink hover:text-spec"
                  >
                    {s.label}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="grid grid-cols-3 border-t-2 border-b-2 border-specink py-4 text-center font-mono text-[10px] uppercase tracking-[0.18em]">
              <span>response: &lt;24h</span>
              <span className="text-stamp">▚</span>
              <span className="flex items-center justify-center gap-2">
                <Printer className="size-3.5" /> print me
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ThemeC() {
  return (
    <div className="min-h-screen bg-spec font-mono text-specink">
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-faint" />
      <div className="relative z-10">
        <HeaderBar />
        <Boot />
        <CertHero />
        <TickTape />
        <Work />
        <Experience />
        <SkillsCheck />
        <Faq />
        <Contact />
        <footer className="border-t border-specink/60 px-5 py-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-specink/55">
            <span>
              doc generated — © 2026 {profile.name} · all rights strangely
              reserved
            </span>
            <span className="flex items-center gap-4">
              <a href="#top" className="transition-colors hover:text-stamp">
                back to top ↑
              </a>
              <Link href={socials[1].href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-stamp">
                linkedin
              </Link>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}