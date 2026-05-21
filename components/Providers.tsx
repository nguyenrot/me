"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { COOKIE_KEYS, type Accent, type Density, type Lang, type Prefs, type Theme } from "@/lib/prefs";

type PrefsContextValue = Prefs & {
  setTheme: (v: Theme) => void;
  setLang: (v: Lang) => void;
  setAccent: (v: Accent) => void;
  setDensity: (v: Density) => void;
};

const PrefsContext = createContext<PrefsContextValue | null>(null);

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

function persist(key: keyof typeof COOKIE_KEYS, value: string) {
  try {
    writeCookie(COOKIE_KEYS[key], value);
    localStorage.setItem(COOKIE_KEYS[key], value);
  } catch {
    /* ignore */
  }
}

export function PrefsProvider({ initial, children }: { initial: Prefs; children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(initial.theme);
  const [lang, setLangState] = useState<Lang>(initial.lang);
  const [accent, setAccentState] = useState<Accent>(initial.accent);
  const [density, setDensityState] = useState<Density>(initial.density);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
  }, [theme]);
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-accent", accent);
  }, [accent]);
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-density", density);
  }, [density]);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setTheme = useCallback((v: Theme) => {
    setThemeState(v);
    persist("theme", v);
  }, []);
  const setLang = useCallback((v: Lang) => {
    setLangState(v);
    persist("lang", v);
  }, []);
  const setAccent = useCallback((v: Accent) => {
    setAccentState(v);
    persist("accent", v);
  }, []);
  const setDensity = useCallback((v: Density) => {
    setDensityState(v);
    persist("density", v);
  }, []);

  const value = useMemo<PrefsContextValue>(
    () => ({ theme, lang, accent, density, setTheme, setLang, setAccent, setDensity }),
    [theme, lang, accent, density, setTheme, setLang, setAccent, setDensity],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs(): PrefsContextValue {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside <PrefsProvider>");
  return ctx;
}
