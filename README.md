# Apurba Dutta — Designer Portfolio

An aesthetic portfolio for **Apurba Dutta (Eden)**, Senior Graphic Designer at
Swiggy. Built with **Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer
Motion** and **shadcn/ui**.

The site ships with **three design directions plus a design-system docs
page**, each on its own route so you can open them side by side (or with
cmd/ctrl + click) and compare them "altogether". A tiny "Looks" pill in the
bottom corner links between them.

| Route | Look | Vibe |
| --- | --- | --- |
| `/` | **Story** | Preloader → volt-on-night hero, chaptered narrative (Designer → Craft → Work → Road → Epilogue), parallax Behance cards, paper/dark section rhythm |
| `/dark` | **Dark Gallery** | Near-black canvas, electric volt accent, cinematic hover grid, scroll progress |
| `/concept` | **Concept Spec** | Monochrome "designer spec sheet" with stamps, checkboxes, ledger-style work log |
| `/design-system` | **Design System** | Geist-style docs: principles, color, typography, grid & materials, component library, tokens |
| `/projects/[id]` | **Project stories** | 12 interactive pages (01–12) with animated Dither background; full case opens on Behance |

All three render the same real content from `src/lib/data.ts`, so switching
themes never splits your content.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Making it yours

- **Content** lives in one place: `src/lib/data.ts` (profile, projects,
  experience, skills, FAQ, socials). Update your email, project links and blurbs
  here.
- **Pick a final look**: once you decide on a direction, point the root
  `/` page (`src/app/page.tsx`) at that theme and delete the other two folders
  (`src/app/dark/`, `src/app/concept/`, `src/themes/theme-b.tsx` /
  `theme-c.tsx`). Remove `LookNav` from `src/app/layout.tsx` if you drop the
  others.
- **Project covers** currently hot-link from Behance (with `referrerPolicy`
  set). Replace them with your own images in `data.ts` whenever ready.

## Scripts

| Command | Action |
| --- | --- |
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Tech

- Next.js App Router + Turbopack
- Framer Motion (`src/lib/anim.tsx` — Reveal, Marquee, Magnetic, stagger)
- shadcn/ui (Base UI) — Tabs, Accordion, Input, Textarea, Button
- Tailwind CSS v4 with CSS-first `@theme` config in `src/app/globals.css`