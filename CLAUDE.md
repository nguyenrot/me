# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Next.js Version

This project uses **Next.js 16** which has breaking changes from earlier versions. Before writing any Next.js-specific code, consult `node_modules/next/dist/docs/` — APIs and conventions may differ from training data.

## Commands

```bash
npm run dev      # Dev server on port 3001
npm run build    # Production build
npm run start    # Production server on port 3001
npm run lint     # ESLint
```

No test suite is configured.

## Architecture

Single-page portfolio built with Next.js App Router. All content lives in one scrollable page with anchor-based navigation (`#hero`, `#about`, `#skills`, `#journey`, `#links`, `#social`).

**`app/page.tsx`** is an **async Server Component** that fetches all 6 sections from the API in `Promise.all` and passes data as props to each section component. Section components are pure presentational — no data fetching inside them.

**Section components** (`components/`):
- `Hero3D` — receives `content: HeroContent`
- `AboutSection` — receives `about: AboutContent`
- `SkillsSection` — receives `skills: Skill[]`
- `ExperienceSection` — receives `journey: JourneyItem[]`
- `LinksSection` — receives `links: LinkItem[]`
- `SocialSection` — receives `socials: SocialItem[]`; keeps `ICON_MAP: Record<string, ReactNode>` (6 inline SVGs) hardcoded — only `{ name, handle, link, accent, iconType }` come from the API

**3D scene components** (`components/3d/`) — Three.js/R3F canvases. Always imported with `dynamic(..., { ssr: false })`.

**Motion utilities** (`components/motion/heroEffects.ts`) — shared Framer Motion variants used by all section components.

## Content Fetching

```
lib/content.ts    # getContent<T>(app, section, fallback) — ISR fetch (revalidate: 300s)
lib/defaults.ts   # Typed interfaces + fallback defaults for all 6 sections
```

Sections: `me/hero`, `me/about`, `me/skills`, `me/experience`, `me/links`, `me/social`.

If the API is unreachable, fallbacks from `lib/defaults.ts` are used with zero visual regression.

## Animation Stack (Three Layers)

1. **Framer Motion** — UI entrance/stagger (`heroEffects.ts` variants)
2. **CSS keyframes** (`app/globals.css`) — ambient effects: `rune-float`, `holo-shift`, `scanline-sweep`
3. **Three.js / @react-three/fiber** — WebGL particle systems in `components/3d/`

Scroll parallax is driven by vanilla `scroll` event listeners.

## Styling

Tailwind CSS v4 with `@theme` definitions in `app/globals.css`. No `tailwind.config.js`.

Design tokens: background `#020208`, gold `#ffd700`, cyan `#00f5ff`, magenta `#ff00aa`, violet `#aa00ff`.

**Known issue:** Tailwind v4 Preflight + LightningCSS occasionally renders a light background despite `background-color: #020208 !important`. Cosmetic only; documented in `X106/TAILWIND_V4_ISSUE.md`.

## Deploy

Deploy is git-pull on the VPS, orchestrated from the parent repo:

```bash
# from X106/
./deploy.sh me              # deploy origin/main
./deploy.sh me <commit_sha> # deploy/rollback to a specific ref
```

The orchestrator SSHs into the VPS and runs `/var/www/me/deploy.sh` (this repo's `deploy.sh`), which `git fetch`/`reset --hard`s the ref, reinstalls deps only when `package.json`/`package-lock.json` hashes change (stamped at `node_modules/.x106_install_stamp`), wipes `.next`, builds, and `pm2 restart me-pkn`.

Health check after restart curls `https://me.pkn.io.vn/` and greps for Vietnamese-mojibake markers (e.g. `Pháº`, `Ká»`, `NguyÃ`) — deploy fails if any are found. If you touch fonts or text encoding, verify Vietnamese diacritics render correctly before deploying.

Live at `me.pkn.io.vn`, port 3001, PM2 process `me-pkn`, VPS path `/var/www/me`.
