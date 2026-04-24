# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Next.js Version

This project uses **Next.js 16** which has breaking changes from earlier versions. Before writing any Next.js-specific code, consult `node_modules/next/dist/docs/` — APIs, conventions, and file structure may differ from training data.

## Commands

```bash
npm run dev      # Dev server on port 3001
npm run build    # Production build
npm run start    # Production server on port 3001
npm run lint     # ESLint
```

No test suite is configured.

## Architecture

Single-page portfolio (SPA) built with Next.js App Router. All content lives in one scrollable page with anchor-based navigation (`#hero`, `#about`, `#skills`, `#journey`, `#links`).

**Entry points:**
- `app/page.tsx` — composes all sections into the page
- `app/layout.tsx` — fonts, metadata, dark theme enforcement, global styles

**Component layers:**

1. **Section components** (`components/`) — `Hero3D`, `AboutSection`, `SkillsSection`, `ExperienceSection`, `LinksSection`, `Footer`, `PageBackground`, `SparkleOverlay`. Each section owns its own static data arrays (e.g., `SKILLS`, `JOURNEY`).

2. **3D scene components** (`components/3d/`) — Three.js/R3F canvases: `HeroSectionScene`, `AboutScene`, `ExperienceScene`, `SkillsScene`, `FooterScene`, `LinksScene`. Always imported with `dynamic(..., { ssr: false })` because WebGL can't render server-side.

3. **Motion utilities** (`components/motion/heroEffects.ts`) — Framer Motion animation variants.

**Animation stack (three separate layers):**
- **Framer Motion** — UI element entrance/stagger animations
- **CSS keyframes** (`app/globals.css`) — ambient effects (`rune-float`, `holo-shift`, `scanline-sweep`)
- **Three.js / @react-three/fiber** — WebGL particle systems and 3D scenes

**State:** No global state library. Components use local `useState`/`useRef`/`useEffect`. Scroll position is tracked via vanilla event listeners for parallax triggers.

## Styling

Tailwind CSS v4 with custom `@theme` definitions in `app/globals.css`.

Custom design tokens:
- Colors: `void` (#020208), `gold` (#aa44ff), `cyan` (#00ccff), `magenta` (#ff00aa)
- Fonts: Inter (body), Orbitron (headings), Space Mono (code/accents)

Hard-coded dark theme — no light mode. The aesthetic is an immersive "immortal cultivator" / sci-fi theme with Asian-inspired rune motifs.

## Deploy

After every code change, deploy to VPS:

```bash
cd /Users/kynguyenpham/X106/me
npm run build
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' ./ root@103.90.224.186:/var/www/me/
ssh root@103.90.224.186 "cd /var/www/me && rm -rf .next && npm run build && pm2 restart me-pkn"
```

Live at `me.pkn.io.vn` (port 3001, PM2 process `me-pkn`, VPS path `/var/www/me`).

Infrastructure: Cloudflare → Nginx reverse proxy → Node.js. VPS IP: `103.90.224.186`.

## Key Patterns

- **3D imports must disable SSR:** `dynamic(() => import('./3d/SomeScene'), { ssr: false })`
- **Static data co-located with sections:** section components define their own data arrays rather than fetching or importing from a separate data layer
- **No API routes** — pure static frontend with no backend
