"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/data";
import { EASE } from "@/lib/anim";
import Particles from "@/components/Particles";
import { BorderGlow } from "@/components/BorderGlow";

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-white/10 py-3">
      <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/40">{label}</p>
      <p className="mt-1.5 font-serif text-lg text-white">{value}</p>
    </div>
  );
}

export function ProjectDetail({ project, projects }: { project: Project; projects: Project[] }) {
  const index = projects.findIndex((p) => p.id === project.id);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="relative min-h-screen bg-night font-sans text-white">
      <div className="absolute inset-0">
        <Particles
          particleColors={["#518686"]}
          particleCount={300}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-transparent to-night" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 py-6 md:px-8">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-xl tracking-tight text-white transition-colors hover:text-volt"
          >
            Eden<span className="text-volt">.</span>
          </Link>
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-volt"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All work
          </Link>
        </header>

        <main className="mt-14 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-volt">
              The Work — №{project.id}
            </p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
              <h1 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
                {project.title}
              </h1>
              <span className="mb-1 hidden font-serif text-7xl italic leading-none text-white/10 md:block">
                /{project.id}
              </span>
            </div>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/65">
              {project.blurb}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="mt-12"
          >
            <BorderGlow
              edgeSensitivity={42}
              glowColor="40 80 80"
              backgroundColor="#050506"
              borderRadius={23}
              glowRadius={48}
              glowIntensity={0.8}
              coneSpread={23}
              animated
              colors={["#c084fc", "#f472b6", "#38bdf8"]}
            >
              <div className="relative flex min-h-[72vh] items-center justify-center overflow-hidden bg-[#050506] p-6 md:p-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.cover}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-[30px]"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.cover}
                  alt={project.title}
                  className="relative z-10 max-h-[66vh] w-auto max-w-full object-contain drop-shadow-2xl"
                />
              </div>
            </BorderGlow>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-[1fr_280px]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
                The work
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">
                {project.blurb} Presented full-frame above, at native
                resolution — no crops, no thumbnails. Hover the edges of the
                frame to light it up.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/#work"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md transition-colors hover:border-volt hover:bg-white/15 hover:text-volt"
                >
                  Back to all work
                </Link>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 underline-offset-4 transition-colors hover:text-volt hover:underline"
                >
                  Full case · Behance <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <div className="space-y-0">
              <Meta label="Category" value={project.category} />
              <Meta label="Project №" value={project.id} />
              <Meta label="Archive" value="Behance · 2026" />
            </div>
          </div>

          <nav className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            <Link
              href={`/projects/${prev.id}`}
              className="group flex flex-col justify-between gap-6 bg-night p-7 transition-colors hover:bg-nightscreen"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40 group-hover:text-volt">
                ← Previous · №{prev.id}
              </span>
              <span className="font-serif text-2xl text-white transition-colors group-hover:text-volt">
                {prev.title}
              </span>
            </Link>
            <Link
              href={`/projects/${next.id}`}
              className="group flex flex-col justify-between gap-6 border-t border-white/10 bg-night p-7 text-right transition-colors hover:bg-nightscreen sm:border-l sm:border-t-0"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40 group-hover:text-volt">
                Next · №{next.id} →
              </span>
              <span className="font-serif text-2xl text-white transition-colors group-hover:text-volt">
                {next.title}
              </span>
            </Link>
          </nav>
        </main>

        <footer className="flex items-center justify-between border-t border-white/10 py-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
            {projects.length} stories · {project.id}/{projects.length}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-volt"
          >
            <ArrowRight className="h-3.5 w-3.5" /> Home
          </Link>
        </footer>
      </div>
    </div>
  );
}