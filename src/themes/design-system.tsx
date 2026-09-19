"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Box,
  Braces,
  CircleDot,
  Command,
  Grid3x3,
  Layers,
  MousePointer2,
  MoveHorizontal,
  Palette,
  Type,
} from "lucide-react";
import Link from "next/link";
import { Marquee } from "@/lib/anim";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const NAV = [
  {
    group: "Foundations",
    links: [
      { href: "#overview", label: "Overview", icon: CircleDot },
      { href: "#principles", label: "Principles", icon: Layers },
      { href: "#color", label: "Color", icon: Palette },
      { href: "#typography", label: "Typography", icon: Type },
      { href: "#grid", label: "Grid & Materials", icon: Grid3x3 },
    ],
  },
  {
    group: "Components",
    links: [
      { href: "#buttons", label: "Buttons", icon: MousePointer2 },
      { href: "#badges", label: "Badges & Chips", icon: Box },
      { href: "#tabs", label: "Tabs", icon: Layers },
      { href: "#accordion", label: "Accordion", icon: Braces },
      { href: "#forms", label: "Forms", icon: Type },
      { href: "#ticker", label: "Ticker", icon: MoveHorizontal },
      { href: "#cards", label: "Cards", icon: Box },
    ],
  },
  {
    group: "Resources",
    links: [
      { href: "#usage", label: "Usage", icon: Braces },
      { href: "#tokens", label: "Token Map", icon: Braces },
    ],
  },
] as const;

function Mark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
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
      <span className="font-serif text-base tracking-tight">Eden</span>
    </span>
  );
}

function DocHead({ id, kicker, title, edge }: { id: string; kicker: string; title: string; edge?: string }) {
  return (
    <div id={`${id}-title`} className="scroll-mt-28 border-t border-white/10 pt-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-volt">
        {kicker}
      </p>
      <div className="mt-2 flex items-end justify-between gap-6">
        <h2 className="font-serif text-4xl leading-tight tracking-tight text-white md:text-5xl">
          {title}
        </h2>
        {edge && (
          <span className="hidden shrink-0 pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 md:block">
            {edge}
          </span>
        )}
      </div>
    </div>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60">{children}</p>;
}

function Line() {
  return <div className="my-14 h-px w-full bg-white/10" />;
}

export function DesignSystemDocs() {
  return (
    <div className="min-h-screen bg-night font-sans text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-night/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3.5 md:px-8">
          <a href="#overview" className="flex items-center gap-3 text-white">
            <Mark />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-white/50 sm:block">
              Design System
            </span>
          </a>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
              v1.0 · 2026
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-volt px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-night transition-transform hover:scale-[1.03]"
            >
              Portfolio <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-10 md:px-8 lg:grid-cols-[210px_1fr] lg:gap-14">
        <aside className="hidden lg:block">
          <nav className="sticky top-[72px] space-y-7">
            {NAV.map((g) => (
              <div key={g.group}>
                <p className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.26em] text-white/40">
                  {g.group}
                </p>
                <ul className="space-y-0.5 border-l border-white/10">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="-ml-px flex items-center gap-2.5 border-l border-transparent py-1.5 pl-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55 transition-colors hover:border-volt hover:text-volt"
                      >
                        <l.icon className="h-3 w-3" />
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <section id="overview" className="scroll-mt-28">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
              Introduction
            </p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">
              The system behind{" "}
              <span className="italic text-volt">stories</span>.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/65">
              A single, opinionated design language for Apurba Dutta&apos;s
              portfolio — the colors, type, materials, motion and components
              that make the work feel like an editorial, not a template.
            </p>
            <div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
              {[
                ["01", "Foundations", "Color · Type · Grid · Motion"],
                ["02", "Components", "Buttons · Tabs · Forms · Ticker"],
                ["03", "Tokens", "CSS-first @theme, Tailwind v4"],
              ].map(([n, t, d]) => (
                <div key={n} className="bg-night p-6">
                  <p className="font-mono text-[10px] text-volt">{n}</p>
                  <h3 className="mt-2 font-serif text-xl">{t}</h3>
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
                    {d}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="principles" className="mt-20 scroll-mt-28">
            <DocHead id="principles" kicker="Foundations" title="Principles" edge="Five rules" />
            <Lead>
              Every decision in the system traces back to five ideas. They keep
              the work visual, editorial and unpretentious.
            </Lead>
            <div className="mt-10 space-y-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {[
                ["01", "Stories hit harder", "Copy leads, decoration follows. Every layout asks: what is the message actually saying."],
                ["02", "Intentional detail", "Hairlines, hovers, 4ms easing curves — nothing is left to chance."],
                ["03", "Light leads the eye", "Volt on night, ember on paper. One accent per surface, used sparingly."],
                ["04", "Type is the interface", "Serif voices the story; mono carries metadata. Stripe the two and hierarchy appears."],
                ["05", "Character over chrome", "Texture comes from grids, outlines and motion — not gradients and shadows-on-shadows."],
              ].map(([n, t, d], i) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="group grid gap-2 bg-night p-6 transition-colors hover:bg-nightscreen md:grid-cols-[56px_1fr_2fr] md:gap-8"
                >
                  <span className="font-serif text-3xl italic leading-none text-white/20 transition-colors group-hover:text-volt">
                    {n}
                  </span>
                  <h3 className="font-serif text-xl text-white md:text-2xl">{t}</h3>
                  <p className="text-sm leading-relaxed text-white/55">{d}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <Line />

          <section id="color" className="scroll-mt-28">
            <DocHead id="color" kicker="Foundations" title="Color" edge="13 tokens" />
            <Lead>
              Two working palettes — one warm and printed, one cold and
              cinematic. Every token names a job, not just a shade.
            </Lead>

            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 md:grid-cols-3">
              {[
                ["paper", "#F6F1E5", "Light canvas", "bg-[#F6F1E5]", "dark"],
                ["paperdeep", "#EFE6D3", "Raised surface on light", "bg-[#EFE6D3]", "dark"],
                ["ink", "#191511", "Primary text on light", "bg-[#191511]", "light"],
                ["inksoft", "#4D463C", "Secondary text on light", "bg-[#4D463C]", "light"],
                ["ember", "#C96F4A", "Editorial accent on light", "bg-[#C96F4A]", "light"],
                ["emberhot", "#FF5C1F", "High-energy accent", "bg-[#FF5C1F]", "light"],
                ["moss", "#34402F", "Status / quiet green", "bg-[#34402F]", "light"],
                ["volt", "#D8FF3F", "Signal accent on dark", "bg-[#D8FF3F]", "light"],
                ["night", "#0A0A0C", "Dark canvas", "bg-[#0A0A0C]", "none"],
                ["nightscreen", "#121216", "Raised surface on dark", "bg-[#121216]", "light"],
                ["spec", "#F4F3ED", "Spec-sheet surface", "bg-[#F4F3ED]", "dark"],
                ["specink", "#161616", "Spec-sheet text", "bg-[#161616]", "light"],
                ["stamp", "#D1382C", "Errors / stamp accent", "bg-[#D1382C]", "light"],
              ].map(([name, hex, role, bg, text]) => (
                <div key={name} className="bg-night p-6">
                  <div
                    className={cn(
                      "flex h-24 items-end justify-between rounded-xl border border-white/10 p-3",
                      bg
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[9px] uppercase tracking-[0.18em]",
                        text === "none" ? "text-white/40" : text === "dark" ? "text-ink" : "text-white"
                      )}
                    >
                      {name}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[9px]",
                        text === "none" ? "text-white/40" : text === "dark" ? "text-ink/60" : "text-white/60"
                      )}
                    >
                      {hex}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-white/70">{role}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="typography" className="mt-16 scroll-mt-28">
            <DocHead id="typography" kicker="Foundations" title="Typography" edge="3 families" />
            <Lead>
              Serif sings, sans works, mono annotates. Three utilitarian stacks
              — no webfont paywall, maximum editorial signal.
            </Lead>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Serif", "Georgia, Times New Roman, ui-serif, serif", "Display headings · pull quotes · the voice"],
                ["Sans", "Helvetica Neue, Helvetica, Arial, sans-serif", "UI · navigation · reading paragraphs"],
                ["Mono", "ui-monospace, Cascadia Mono, SF Mono, Consolas, monospace", "Labels · indices · metadata · code"],
              ].map(([name, stack, use]) => (
                <div key={name} className="rounded-2xl border border-white/10 bg-nightscreen p-6">
                  <p className="font-serif text-2xl italic text-volt">{name}</p>
                  <p className="mt-3 font-mono text-[10px] leading-relaxed text-white/45">{stack}</p>
                  <p className="mt-4 text-sm text-white/65">{use}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-night">
              {[
                ["Display", "font-serif text-6xl md:text-7xl tracking-tight", "Turn it on.", "Hero titles"],
                ["Headline", "font-serif text-4xl md:text-5xl tracking-tight", "Stories hit harder.", "Section edges"],
                ["Title", "font-serif text-2xl md:text-3xl", "Trained in fashion, built for pixels.", "Card titles"],
                ["Body", "font-sans text-[15px] leading-relaxed text-white/60", "Five and a half years making consumer platforms speak — strategy, storytelling and intentional design.", "Paragraphs"],
                ["Label · mono", "font-mono text-[10px] uppercase tracking-[0.24em] text-volt", "Chapter 02 — The Craft", "Eyebrows, indices"],
                ["Code", "font-mono text-xs text-white/70", 'export const EASE = [0.22, 1, 0.36, 1]', "Samples, tokens"],
              ].map(([label, cls, sample, use]) => (
                <div key={label} className="grid gap-2 p-6 md:grid-cols-3 md:gap-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">{label}</p>
                  <p className={cn("md:col-span-2", cls)}>{sample}</p>
                  <p className="hidden justify-self-end font-mono text-[9px] uppercase tracking-[0.16em] text-white/35 md:block">
                    {use}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="grid" className="mt-16 scroll-mt-28">
            <DocHead id="grid" kicker="Foundations" title="Grid & Materials" edge="Utilities" />
            <Lead>
              Texture is drawn, not downloaded. Hairlines, outline numerals
              and two grid textures carry the whole aesthetic.
            </Lead>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <div className="bg-grid-volt flex h-44 items-center justify-center [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-volt">
                    bg-grid-volt · 44px
                  </span>
                </div>
                <div className="bg-night p-6">
                  <p className="text-sm text-white/70">Dark grid — hero and section backdrops on <span className="font-mono">night</span>.</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <div className="bg-[#F6F1E5] bg-grid-faint flex h-44 items-center justify-center [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink">
                    bg-grid-faint · 28px
                  </span>
                </div>
                <div className="bg-night p-6">
                  <p className="text-sm text-white/70">Faint grid — printed, editorial surfaces like Chapter 01.</p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                ["Radii", "rounded-none for stamps", "rounded-lg for controls", "rounded-2xl for cards"],
                ["Hairlines", "border-white/10 on dark", "border-ink/10 on paper", "divide-y for stacked rows"],
                ["Layout", "12-col implied grid", "8–10px side gutters", "max-w-[1200px] docs"],
              ].map(([t, a, b, c]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-nightscreen p-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-volt">{t}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-white/60">
                    <li>— {a}</li>
                    <li>— {b}</li>
                    <li>— {c}</li>
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <Line />

          <section id="buttons" className="scroll-mt-28">
            <DocHead id="buttons" kicker="Components" title="Buttons" edge="4 variants" />
            <Lead>
              One rectangle, four voices. Research the semantic, not the
              decoration — volt is loud, ink is firm, hairlines whisper.
            </Lead>
            <div className="mt-8 flex flex-wrap items-center gap-8">
              {[
                [<Button key="v" className="bg-volt text-night hover:bg-volt/90">Primary · volt</Button>, "Primary call-to-action"],
                [<Button key="o" variant="outline" className="border-white/15 text-white hover:bg-white/5">Outline · hairline</Button>, "Secondary action"],
                [<Button key="g" variant="ghost" className="text-white hover:bg-white/5">Ghost · quiet</Button>, "Tertiary action"],
                [<Button key="b" className="bg-white text-night hover:bg-white/85">Light · on grid</Button>, "Spec surfaces"],
              ].map(([el, note], i) => (
                <div key={i} className="flex flex-col items-start gap-2.5">
                  {el}
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">{note}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="badges" className="mt-16 scroll-mt-28">
            <DocHead id="badges" kicker="Components" title="Badges & Chips" edge="Labeled" />
            <Lead>
              Metadata wears a tick label. Outline stays quiet in rows;
              volt jumps when the signal matters.
            </Lead>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {["Behance", "Figma", "2026", "Deployed"].map((t) => (
                <Badge key={t} variant="outline" className="gap-1.5 rounded-full border-white/15 bg-white/0 py-1.5 text-[11px] font-normal text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {t}
                </Badge>
              ))}
              <Badge className="gap-1.5 rounded-full bg-volt py-1.5 text-[11px] font-semibold text-night">
                Live
              </Badge>
              <Badge className="gap-1.5 rounded-full bg-white py-1.5 text-[11px] font-semibold text-night">
                Case study
              </Badge>
            </div>
          </section>

          <section id="tabs" className="mt-16 scroll-mt-28">
            <DocHead id="tabs" kicker="Components" title="Tabs" edge="Base UI" />
            <Lead>
              Used to filter the work stream without leaving the page.
            </Lead>
            <div className="mt-8 rounded-2xl border border-white/10 bg-nightscreen p-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList variant="line" className="flex w-full flex-wrap gap-1 md:w-auto">
                  {["all", "food", "fashion"].map((c) => (
                    <TabsTrigger key={c} value={c} className="px-3 py-1 uppercase font-mono text-[10px] tracking-[0.16em]">
                      {c}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="all" className="mt-6 pt-4 text-sm text-white/60">
                  The full stream — 12 projects across food, fashion and entertainment retail.
                </TabsContent>
                <TabsContent value="food" className="mt-6 pt-4 text-sm text-white/60">
                  Food-led stories: Festive Carousel, Subway Digital, Chinese Wok campaigns.
                </TabsContent>
                <TabsContent value="fashion" className="mt-6 pt-4 text-sm text-white/60">
                  Fashion-led stories: Rebranding Electronic, Tribal Threads packaging.
                </TabsContent>
              </Tabs>
            </div>
          </section>

          <section id="accordion" className="mt-16 scroll-mt-28">
            <DocHead id="accordion" kicker="Components" title="Accordion" edge="Base UI" />
            <Lead>
              FAQs and long-form Q&amp;A collapse into quiet rows with hairlines.
            </Lead>
            <div className="mt-8 rounded-2xl border border-white/10 bg-nightscreen p-6">
              <Accordion className="border-t border-white/10">
                {[
                  ["What is the system for?", "One design language for all four portfolio looks — Story, Dark, Concept and the docs you are reading."],
                  ["Where do tokens live?", "globals.css, as Tailwind v4 @theme inline custom properties. One file, both palettes."],
                  ["Can it ship outside this site?", "Yes — the primitives are plain React + Base UI; the accent tokens are just hex values."],
                ].map(([q, a]) => (
                  <AccordionItem key={q} value={q} className="border-b border-white/10">
                    <AccordionTrigger className="gap-4 py-4 text-left text-sm text-white/80 hover:text-volt">
                      {q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-white/55">{a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          <section id="forms" className="mt-16 scroll-mt-28">
            <DocHead id="forms" kicker="Components" title="Forms" edge="Base UI" />
            <Lead>
              Two flat fields and one action — the contact pattern used in the
              story theme&apos;s memoir page.
            </Lead>
            <div className="mt-8 rounded-2xl border border-white/10 bg-nightscreen p-6 md:p-8">
              <div className="grid gap-5 md:grid-cols-[1fr_240px]">
                <div className="grid gap-3">
                  <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45" htmlFor="ds-name">
                    Name
                  </label>
                  <Input id="ds-name" placeholder="Sheetal Mehta" className="rounded-lg border-white/15 bg-night text-white placeholder:text-white/30" />
                  <label className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/45" htmlFor="ds-msg">
                    Message
                  </label>
                  <Textarea id="ds-msg" placeholder="Tell me about the brief…" className="min-h-24 rounded-lg border-white/15 bg-night text-white placeholder:text-white/30" />
                </div>
                <div className="flex items-end">
                  <Button className="w-full gap-2 bg-volt text-night hover:bg-volt/90">
                    Send it <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section id="ticker" className="mt-16 scroll-mt-28">
            <DocHead id="ticker" kicker="Components" title="Ticker" edge="framer-motion" />
            <Lead>
              The signature auto-scroll ribbon — a framer-motion
              <span className={cn("font-mono", "text-volt")}> motionValue</span> track looping seamlessly at half
              its width. Pauses on hover, fades at the edges, respects reduced
              motion.
            </Lead>
            <div className="mt-8 overflow-hidden rounded-2xl border border-volt/30 bg-night py-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
              <Marquee duration={30}>
                <span className="flex items-center gap-8 px-8 font-serif text-2xl italic text-white">
                  Stories hit harder
                  <span className="font-sans text-volt">✦</span>
                  Intentional detail
                  <span className="font-sans text-volt">✦</span>
                  Light leads the eye
                  <span className="font-sans text-volt">✦</span>
                  Type is the interface
                  <span className="font-sans text-volt">✦</span>
                  Character over chrome
                  <span className="font-sans text-volt">✦</span>
                </span>
              </Marquee>
            </div>
            <p className="mt-4 font-mono text-[10px] text-white/40">
              Same loop powers the story theme: DividerMarquee, tools row, work titles, footer.
            </p>
          </section>

          <section id="cards" className="mt-16 scroll-mt-28">
            <DocHead id="cards" kicker="Components" title="Cards" edge="Work pattern" />
            <Lead>
              Work sits in hairline frames with a volt index — title up top,
              category below, hover tells the rest.
            </Lead>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                ["07", "Indian Festive Campaign", "Festive Carousel", "Image felt · Motion"],
                ["08", "Banner Projects", "Octane Render", "Keyvisual · Market"],
              ].map(([id, title, tool, cat]) => (
                <div key={id} className="group rounded-2xl border border-white/10 bg-nightscreen p-7 transition-colors hover:border-volt/40">
                  <div className="flex items-start justify-between">
                    <span className="font-serif text-5xl italic leading-none text-white/15 transition-colors group-hover:text-volt">
                      №{id}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                      {cat}
                    </span>
                  </div>
                  <h3 className="mt-8 font-serif text-2xl text-white">{title}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                    {tool}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <Line />

          <section id="usage" className="scroll-mt-28">
            <DocHead id="usage" kicker="Resources" title="Usage" edge="How it ships" />
            <Lead>
              The system is a folder, not a framework — nothing blocks using
              one section on its own.
            </Lead>
            <div className="mt-8 space-y-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {[
                ["Tokens", "src/app/globals.css — Tailwind v4 @theme inline custom properties. Both palettes live here."],
                ["Utilities", "bg-grid-volt, bg-grid-faint, text-stroke-volt, cursor-blink — hand-rolled classes in globals.css."],
                ["Data", "src/lib/data.ts — the resume is the single source of truth; every theme reads from it."],
                ["Motion", "src/lib/anim.tsx — EASE, Reveal, Magnetic, Marquee. Ticker lives inside the story theme."],
                ["Primitives", "src/components/ui — Base UI + shadcn; Button, Badge, Tabs, Accordion, Input, Textarea."],
              ].map(([t, d]) => (
                <div key={t} className="grid gap-2 bg-night p-6 md:grid-cols-[180px_1fr] md:gap-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-volt">{t}</p>
                  <p className="text-sm leading-relaxed text-white/60">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="tokens" className="mt-16 scroll-mt-28">
            <DocHead id="tokens" kicker="Resources" title="Token Map" edge="globals.css" />
            <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-nightscreen">
              <table className="w-full min-w-[560px] text-left font-mono text-[11px]">
                <thead>
                  <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.2em] text-white/40">
                    <th className="px-6 py-4 font-medium">Token</th>
                    <th className="px-6 py-4 font-medium">Value</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/65">
                  {[
                    ["--background", "#0A0A0C", "night canvas"],
                    ["--foreground", "#FFFFFF", "primary text on dark"],
                    ["--muted", "#121216", "raised dark surface"],
                    ["--primary", "#D8FF3F", "volt signal"],
                    ["--accent-ember", "#C96F4A", "editorial accent"],
                    ["--card", "#121216", "card surface"],
                    ["--border", "rgba(255,255,255,0.10)", "hairline"],
                    ["--ring", "#D8FF3F", "focus ring"],
                    ["--radius", "0.5rem", "control radius"],
                  ].map(([t, v, r]) => (
                    <tr key={t} className="transition-colors hover:bg-white/[0.03]">
                      <td className="px-6 py-3.5 text-volt">{t}</td>
                      <td className="px-6 py-3.5">{v}</td>
                      <td className="px-6 py-3.5 text-white/45">{r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-nightscreen p-6 md:p-8">
              <div>
                <p className="font-serif text-2xl italic text-white">Built with the story first.</p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                  Design System v1.0 · Apurba Dutta · 2026
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-full bg-volt px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-night transition-transform hover:scale-[1.03]"
              >
                <Command className="h-3 w-3" /> Back to portfolio <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}