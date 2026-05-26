# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Nuxt 4 (migrated from Next.js 16)

This app was migrated from Next.js 16 to **Nuxt 4** on 2026-05-26 as the pilot for the wider X106 ecosystem migration. Don't reach for Next.js conventions here — no `app/page.tsx`, no Server Actions, no `proxy.ts`/`middleware.ts`. When in doubt, check `node_modules/nuxt/dist/` or refer to the sibling Nuxt apps (`ledger`, `quotes`).

## Commands

```bash
npm run dev       # Dev server on port 3001
npm run build     # Production build (.output/)
npm run preview   # Preview the production build
npm run typecheck # vue-tsc
```

No test suite is configured.

## Architecture

Single-page portfolio (`me.kynguyen.cc`). All sections live in one scrollable page with anchor-based navigation (`#hero`, `#about`, `#skills`, `#experience`, `#projects`, `#elsewhere`).

**SSR + Nitro (universal mode).** ISR is wired on `/` via `routeRules: { '/': { isr: 300 } }` in `nuxt.config.ts` — mirrors the `next: { revalidate: 300 }` content cache the previous Next.js setup had.

### File layout

```
app/
  app.vue                          # Root — usePrefs() composable + <NuxtPage/>
  assets/css/main.css              # Tailwind v4 @import + design tokens + keyframes
  pages/index.vue                  # The only page — Promise.all 7 fetchContent() calls
  components/
    Marquee.vue                    # Top ticker (mobile pill via CSS)
    Nav.vue                        # Sticky nav + theme/lang/accent toggles + mobile dock
    Scrollbar.vue                  # Right-rail scroll progress (desktop only via CSS)
    Hero.vue                       # Spotlight, portrait, datasheet
    About.vue                      # Prose + whoami card (uses v-html for rich content)
    Skills.vue                     # 8-skill grid w/ progress bars
    Experience.vue                 # Timeline entries
    Projects.vue                   # Project cards (mobile carousel via CSS scroll-snap)
    Elsewhere.vue                  # Social links — inline SVG icon set
    Footer.vue                     # 3-col footer w/ back-to-top
  composables/
    useContent.ts                  # fetchContent(app, section, fallback) — useAsyncData wrapper
    usePrefs.ts                    # theme/lang/accent/density refs backed by useCookie
    useI18n.ts                     # t() helper + UI_STRINGS table; calls usePrefs() for lang
  lib/
    defaults.ts                    # Typed interfaces + fallback content for all 7 sections
public/
  kn-mark.svg, portrait.jpg, icon.svg
nuxt.config.ts                     # SSR + ISR + inline preboot script + JetBrains Mono link
```

Auto-imports are on (Nuxt default) — components from `app/components/` and composables from `app/composables/` don't need explicit imports inside `<script setup>`.

### Content fetching

`composables/useContent.ts` exports `fetchContent<T>(app, section, fallback)` — a `useAsyncData` wrapper around `$fetch('${apiBase}/api/v1/content/${app}/${section}')`. The 5-min revalidation comes from the Nitro route rule, not the composable. Returns the typed payload (or `fallback` if the API is unreachable).

Sections: `me/marquee`, `me/hero`, `me/about`, `me/skills`, `me/experience`, `me/projects`, `me/elsewhere`.

If the API is unreachable, fallbacks from `lib/defaults.ts` are used with zero visual regression.

### Theme / lang / accent / density

Preferences live in cookies (`kn:theme`, `kn:lang`, `kn:accent`, `kn:density`), read by `usePrefs()` via Nuxt's `useCookie`. An inline preboot script in `nuxt.config.ts → app.head.script` reads the same cookies and sets the `data-*` attributes on `<html>` BEFORE Vue hydrates — without this, system-mode users would see a one-frame flash on load. Keep both code paths in sync when adding a new preference.

`resolveTheme('system')` collapses to `'dark'` on the server and is corrected to the OS preference by the preboot script on the client.

### Styling

Tailwind CSS v4 via `@tailwindcss/vite` (no PostCSS config). Design tokens, theme overrides, accent palette, and shared component classes (`.hero`, `.section`, `.skill`, `.proj`, `.marquee`, etc.) all live in `app/assets/css/main.css`. The visual language is hand-CSS — utility chains in templates are deliberately rare.

Fonts: JetBrains Mono (latin + latin-ext + vietnamese subsets) loaded via `<link>` in `nuxt.config.ts → app.head.link`. The CSS variable `--font-jetbrains-mono` is defined in `main.css` for parity with the previous `next/font/google` setup.

## Deploy

`git push` to `main` triggers `.github/workflows/deploy.yml`:

1. Ubuntu runner: Node 22, `npm install` + `npm run build` with `NUXT_PUBLIC_API_BASE=https://api.kynguyen.cc`.
2. Tars `.output/` + `deploy.sh` → SCPs to `/tmp/me-deploy.tar.gz` on the VPS.
3. VPS: extracts into `/var/www/me`, recreates PM2 process `me-pkn` running `node .output/server/index.mjs` on port 3001, curls both `http://127.0.0.1:3001/` and `https://me.kynguyen.cc/`.

End-to-end ~90-180s. The workflow preserves `/var/www/me/.env*` across deploys.

Re-trigger / rollback to a branch or tag: `cd /Users/kynguyenpham/X106 && ./deploy.sh me [ref]`. SHA-direct rollback isn't supported by `gh workflow run` — tag the commit first.

`./deploy.sh` (this repo's local file, deployed to `/var/www/me/deploy.sh`) is a manual fallback — it expects the tar at `/tmp/me-deploy.tar.gz` and just extracts + recreates pm2.

Live at `me.kynguyen.cc`, port 3001, PM2 process `me-pkn`, VPS path `/var/www/me`. Watch deploys at `https://github.com/nguyenrot/me/actions`.

## Verification cleanup (mandatory)

After verifying changes with chrome-devtools-mcp or a local `npm run dev` server, ALWAYS clean up before ending the turn:

1. Close every chrome-devtools page you opened: `mcp__chrome-devtools__list_pages` then `mcp__chrome-devtools__close_page` each one. Do not leave a page sitting at `http://localhost:3001`.
2. If you started `npm run dev` in the background, stop it: `pkill -f "nuxt dev"`.
3. Remove any throwaway artifacts you wrote during verification (e.g. `.tmp-screens/`, `/tmp/*.png` from screenshots).

Why: prior sessions left a Chrome DevTools tab + dev server running for ~40 minutes, holding ports and a browser process. The rule applies even when you think the user might want to look at the page — the user will reopen it themselves when needed. Do not skip this step on partial / failed verification either.
