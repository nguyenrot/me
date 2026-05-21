export type Theme = "dark" | "light";
export type Lang = "en" | "vi";
export type Accent = "lime" | "amber" | "cyan" | "rose" | "violet";
export type Density = "compact" | "cozy" | "roomy";

export type Prefs = {
  theme: Theme;
  lang: Lang;
  accent: Accent;
  density: Density;
};

export const PREF_DEFAULTS: Prefs = {
  theme: "dark",
  lang: "en",
  accent: "lime",
  density: "cozy",
};

export const COOKIE_KEYS: Record<keyof Prefs, string> = {
  theme: "kn:theme",
  lang: "kn:lang",
  accent: "kn:accent",
  density: "kn:density",
};

const THEMES: Theme[] = ["dark", "light"];
const LANGS: Lang[] = ["en", "vi"];
const ACCENTS: Accent[] = ["lime", "amber", "cyan", "rose", "violet"];
const DENSITIES: Density[] = ["compact", "cozy", "roomy"];

function pick<T extends string>(value: string | undefined, allowed: T[], fallback: T): T {
  return value && (allowed as string[]).includes(value) ? (value as T) : fallback;
}

export function parsePrefs(cookieJar: { get: (key: string) => { value?: string } | undefined }): Prefs {
  return {
    theme: pick(cookieJar.get(COOKIE_KEYS.theme)?.value, THEMES, PREF_DEFAULTS.theme),
    lang: pick(cookieJar.get(COOKIE_KEYS.lang)?.value, LANGS, PREF_DEFAULTS.lang),
    accent: pick(cookieJar.get(COOKIE_KEYS.accent)?.value, ACCENTS, PREF_DEFAULTS.accent),
    density: pick(cookieJar.get(COOKIE_KEYS.density)?.value, DENSITIES, PREF_DEFAULTS.density),
  };
}

export const ACCENT_SWATCHES: { value: Accent; color: string }[] = [
  { value: "lime", color: "#b5e853" },
  { value: "amber", color: "#f0a04b" },
  { value: "cyan", color: "#62d9ff" },
  { value: "rose", color: "#ff7aa1" },
  { value: "violet", color: "#b39bff" },
];
