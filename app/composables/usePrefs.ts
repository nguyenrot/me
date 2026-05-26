export type Theme = 'dark' | 'light' | 'system'
export type ThemeResolved = 'dark' | 'light'
export type Lang = 'en' | 'vi'
export type Accent = 'lime' | 'amber' | 'cyan' | 'rose' | 'violet'
export type Density = 'compact' | 'cozy' | 'roomy'

export type Prefs = {
  theme: Theme
  lang: Lang
  accent: Accent
  density: Density
}

export const PREF_DEFAULTS: Prefs = {
  theme: 'system',
  lang: 'en',
  accent: 'lime',
  density: 'cozy',
}

export const COOKIE_KEYS = {
  theme: 'kn:theme',
  lang: 'kn:lang',
  accent: 'kn:accent',
  density: 'kn:density',
} as const

const THEMES: Theme[] = ['dark', 'light', 'system']
const LANGS: Lang[] = ['en', 'vi']
const ACCENTS: Accent[] = ['lime', 'amber', 'cyan', 'rose', 'violet']
const DENSITIES: Density[] = ['compact', 'cozy', 'roomy']

function pick<T extends string>(value: string | null | undefined, allowed: T[], fallback: T): T {
  return value && (allowed as string[]).includes(value) ? (value as T) : fallback
}

/** Map preference to the concrete theme CSS will see. SSR cannot know the
 *  client OS preference, so `system` collapses to `dark` until the inline
 *  preboot script (see nuxt.config.ts → app.head.script) replaces it on
 *  the client. */
export function resolveTheme(pref: Theme): ThemeResolved {
  if (pref === 'dark' || pref === 'light') return pref
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const ACCENT_SWATCHES: { value: Accent; color: string }[] = [
  { value: 'lime', color: '#b5e853' },
  { value: 'amber', color: '#f0a04b' },
  { value: 'cyan', color: '#62d9ff' },
  { value: 'rose', color: '#ff7aa1' },
  { value: 'violet', color: '#b39bff' },
]

const COOKIE_OPTS = {
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax' as const,
  path: '/',
}

export const usePrefs = () => {
  const themeCookie = useCookie<Theme>(COOKIE_KEYS.theme, {
    ...COOKIE_OPTS,
    default: () => PREF_DEFAULTS.theme,
  })
  const langCookie = useCookie<Lang>(COOKIE_KEYS.lang, {
    ...COOKIE_OPTS,
    default: () => PREF_DEFAULTS.lang,
  })
  const accentCookie = useCookie<Accent>(COOKIE_KEYS.accent, {
    ...COOKIE_OPTS,
    default: () => PREF_DEFAULTS.accent,
  })
  const densityCookie = useCookie<Density>(COOKIE_KEYS.density, {
    ...COOKIE_OPTS,
    default: () => PREF_DEFAULTS.density,
  })

  const theme = computed<Theme>({
    get: () => pick(themeCookie.value, THEMES, PREF_DEFAULTS.theme),
    set: (v) => {
      themeCookie.value = v
    },
  })
  const lang = computed<Lang>({
    get: () => pick(langCookie.value, LANGS, PREF_DEFAULTS.lang),
    set: (v) => {
      langCookie.value = v
    },
  })
  const accent = computed<Accent>({
    get: () => pick(accentCookie.value, ACCENTS, PREF_DEFAULTS.accent),
    set: (v) => {
      accentCookie.value = v
    },
  })
  const density = computed<Density>({
    get: () => pick(densityCookie.value, DENSITIES, PREF_DEFAULTS.density),
    set: (v) => {
      densityCookie.value = v
    },
  })

  const applyToRoot = () => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.setAttribute('data-theme', resolveTheme(theme.value))
    root.setAttribute('data-theme-pref', theme.value)
    root.setAttribute('data-accent', accent.value)
    root.setAttribute('data-density', density.value)
    root.setAttribute('lang', lang.value)
  }

  if (import.meta.client) {
    onMounted(() => {
      applyToRoot()
      watch([theme, lang, accent, density], applyToRoot)
      if (theme.value === 'system') {
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = () => {
          if (theme.value === 'system') applyToRoot()
        }
        mq.addEventListener('change', handler)
      }
    })
  }

  return {
    theme,
    lang,
    accent,
    density,
    setTheme: (v: Theme) => {
      theme.value = v
    },
    setLang: (v: Lang) => {
      lang.value = v
    },
    setAccent: (v: Accent) => {
      accent.value = v
    },
    setDensity: (v: Density) => {
      density.value = v
    },
  }
}
