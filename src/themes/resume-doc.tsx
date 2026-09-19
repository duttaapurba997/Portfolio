"use client";

import { useEffect } from "react";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import {
  education,
  experience,
  interests,
  languages,
  profile,
  skillGroups,
  socials,
  tools,
} from "@/lib/data";

function SectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3 border-b-2 border-neutral-900 pb-1.5">
      <span className="font-serif text-xl italic text-neutral-400">{index}</span>
      <h2 className="font-serif text-lg tracking-tight text-neutral-900">{title}</h2>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-neutral-300 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.06em] text-neutral-700">
      {children}
    </span>
  );
}

export function ResumeDoc({ autoPrint = false }: { autoPrint?: boolean }) {
  useEffect(() => {
    if (!autoPrint) return;
    const id = window.setTimeout(() => window.print(), 400);
    return () => window.clearTimeout(id);
  }, [autoPrint]);

  return (
    <div className="min-h-screen bg-night bg-grid-volt text-white">
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-night/85 px-5 py-3 backdrop-blur-md print:hidden md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-volt"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Portfolio
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-white/40 sm:block">
            Save the PDF
          </span>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full bg-volt px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-night transition-transform hover:scale-[1.03]"
          >
            <Download className="h-3.5 w-3.5" /> Download
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[860px] px-4 py-8 print:px-0 print:py-0 md:px-6">
        <article className="bg-white px-7 py-9 text-neutral-800 shadow-2xl shadow-black/50 print:shadow-none md:px-12 md:py-11">
          <header className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-neutral-900 pb-5">
            <div>
              <h1 className="font-serif text-4xl tracking-tight text-neutral-900 md:text-5xl">
                {profile.name}
              </h1>
              <p className="mt-1.5 font-serif text-lg italic text-neutral-600">
                {profile.title}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                {profile.status}
              </p>
            </div>
            <div className="font-mono text-[10px] leading-relaxed tracking-[0.06em] text-neutral-600 md:text-right">
              <p>{profile.email}</p>
              <p>{profile.location}</p>
              <p>{socials[1].href.replace("https://", "")}</p>
              <p>{socials[0].href.replace("https://", "")}</p>
            </div>
          </header>

          <section className="mt-6">
            <SectionTitle index="01" title="Profile" />
            <p className="mt-3 text-[12.5px] leading-relaxed text-neutral-700 print:text-[11.5px]">
              {profile.summary}
            </p>
          </section>

          <section className="mt-7">
            <SectionTitle index="02" title="Experience" />
            <div className="mt-3 space-y-5">
              {experience.map((r) => (
                <div key={r.company}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5">
                    <h3 className="font-serif text-base font-semibold text-neutral-900">
                      {r.role}
                    </h3>
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-neutral-500">
                      {r.period}
                    </p>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-600">
                    {r.company} — {r.place}
                  </p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[11.5px] leading-snug text-neutral-600 print:text-[10.5px]">
                    {r.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-7">
            <SectionTitle index="03" title="Education" />
            <div className="mt-3 space-y-1.5">
              {education.map((e) => (
                <div
                  key={e.school}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 border-b border-neutral-100 py-1.5"
                >
                  <div>
                    <p className="text-[12px] font-semibold text-neutral-800">{e.school}</p>
                    <p className="text-[11px] text-neutral-500">{e.degree}</p>
                  </div>
                  <p className="font-mono text-[9.5px] tracking-[0.14em] text-neutral-500">
                    {e.period}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-7">
            <SectionTitle index="04" title="Capabilities" />
            <div className="mt-3 grid gap-4 md:grid-cols-3">
              {skillGroups.map((g) => (
                <div key={g.index}>
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-neutral-500">
                    {g.title}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-7">
            <SectionTitle index="05" title="Tools & More" />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tools.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
              {languages.map((l) => (
                <Chip key={l}>{l}</Chip>
              ))}
              {interests.map((i) => (
                <Chip key={i}>{i}</Chip>
              ))}
            </div>
          </section>

          <footer className="mt-8 border-t border-neutral-200 pt-3 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400 print:hidden">
            Save this page as a PDF to download the resume
          </footer>
        </article>
      </div>
    </div>
  );
}