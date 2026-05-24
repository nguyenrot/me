"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefs } from "./Providers";
import { t, UI_STRINGS } from "@/lib/i18n";
import { ACCENT_SWATCHES, type Accent } from "@/lib/prefs";

type NavLink = {
  id: string;
  idx: string;
  key: keyof typeof UI_STRINGS.nav;
  icon: ReactNode;
};

// Minimal stroke-only icons drawn at 22x22 — match the "engineering logbook"
// tone of the rest of the site. NEVER swap for emojis or platform glyphs.
const ICON_ABOUT = (
  <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="8" r="3.2" />
    <path d="M4.5 18c.7-3 3.4-4.8 6.5-4.8s5.8 1.8 6.5 4.8" />
  </svg>
);
const ICON_SKILLS = (
  <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 16.5h15" />
    <path d="M5 13l3-4 3 2 5-6" />
    <circle cx="5" cy="13" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="8" cy="9" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="11" cy="11" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);
const ICON_EXPERIENCE = (
  <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="5.5" width="15" height="12" rx="1.6" />
    <path d="M8 5.5V4.2c0-.5.4-.9.9-.9h4.2c.5 0 .9.4.9.9v1.3" />
    <path d="M3.5 10.5h15" />
  </svg>
);
const ICON_PROJECTS = (
  <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.2" />
    <rect x="12" y="3.5" width="6.5" height="6.5" rx="1.2" />
    <rect x="3.5" y="12" width="6.5" height="6.5" rx="1.2" />
    <rect x="12" y="12" width="6.5" height="6.5" rx="1.2" />
  </svg>
);
const ICON_ELSEWHERE = (
  <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.2 12.8l3.6-3.6" />
    <path d="M13 6l1.6-1.6a3.2 3.2 0 0 1 4.5 4.5L17.5 10.5" />
    <path d="M9 11.5l-1.6 1.6a3.2 3.2 0 0 0 4.5 4.5L13.5 16" />
  </svg>
);

const NAV_LINKS: NavLink[] = [
  { id: "about", idx: "01", key: "about", icon: ICON_ABOUT },
  { id: "skills", idx: "02", key: "skills", icon: ICON_SKILLS },
  { id: "experience", idx: "03", key: "experience", icon: ICON_EXPERIENCE },
  { id: "projects", idx: "04", key: "projects", icon: ICON_PROJECTS },
  { id: "elsewhere", idx: "05", key: "elsewhere", icon: ICON_ELSEWHERE },
];

function useScrollSpy(ids: string[]) {
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return current;
}

function useClock() {
  const [text, setText] = useState("--:--:-- ICT");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
      const ict = new Date(utcMs + 7 * 3600000);
      const pad = (n: number) => String(n).padStart(2, "0");
      setText(`${pad(ict.getHours())}:${pad(ict.getMinutes())}:${pad(ict.getSeconds())} ICT`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return text;
}

function scrollToAnchor(href: string | null) {
  if (!href?.startsWith("#")) return;
  const id = href.slice(1);
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const target = document.getElementById(id);
  if (!target) return;
  const navH = document.querySelector<HTMLElement>(".nav")?.offsetHeight ?? 0;
  const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Nav() {
  const { lang, theme, accent, setLang, setTheme, setAccent } = usePrefs();
  const clock = useClock();
  const current = useScrollSpy(NAV_LINKS.map((l) => l.id));
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!pickerOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!pickerRef.current?.contains(e.target as Node)) setPickerOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [pickerOpen]);

  const handleAnchor: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    scrollToAnchor(e.currentTarget.getAttribute("href"));
  };

  return (
    <>
      <header className="nav" id="top">
        <div className="nav__inner">
          <a href="#top" className="nav__brand" aria-label="Home" onClick={handleAnchor}>
            <span className="nav__brand-mark" aria-hidden />
            <span className="nav__brand-text">
              kynguyen<span className="dim">.cc</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Sections">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={current === l.id ? "is-current" : undefined}
                onClick={handleAnchor}
              >
                <span className="dim">{l.idx}</span>&nbsp;
                <span>{t(UI_STRINGS.nav[l.key], lang)}</span>
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <span className="clock" aria-label="Đà Nẵng local time">
              {clock}
            </span>

            <div
              className="langtoggle"
              role="group"
              aria-label={t(UI_STRINGS.ariaLanguage, lang)}
            >
              <button
                type="button"
                className={lang === "en" ? "is-active" : undefined}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={lang === "vi" ? "is-active" : undefined}
                onClick={() => setLang("vi")}
              >
                VI
              </button>
            </div>

            <div className="accent-picker" ref={pickerRef}>
              <button
                type="button"
                className="iconbtn"
                aria-label={t(UI_STRINGS.ariaAccent, lang)}
                onClick={() => setPickerOpen((v) => !v)}
              >
                <span className="accent-picker__swatch" aria-hidden />
              </button>
              <div className="accent-picker__pop" hidden={!pickerOpen} role="menu">
                {ACCENT_SWATCHES.map((sw) => (
                  <button
                    key={sw.value}
                    type="button"
                    aria-label={sw.value}
                    className={accent === sw.value ? "is-active" : undefined}
                    style={{ "--sw": sw.color } as React.CSSProperties}
                    onClick={() => {
                      setAccent(sw.value as Accent);
                      setPickerOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              className="themetoggle"
              role="radiogroup"
              aria-label={t(UI_STRINGS.ariaToggleTheme, lang)}
            >
              <button
                type="button"
                role="radio"
                aria-checked={theme === "light"}
                aria-label={t(UI_STRINGS.themeLight, lang)}
                title={t(UI_STRINGS.themeLight, lang)}
                className={theme === "light" ? "is-active" : undefined}
                onClick={() => setTheme("light")}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="8" cy="8" r="3" />
                  <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.4 1.4M11.55 11.55l1.4 1.4M3.05 12.95l1.4-1.4M11.55 4.45l1.4-1.4" />
                </svg>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={theme === "system"}
                aria-label={t(UI_STRINGS.themeSystem, lang)}
                title={t(UI_STRINGS.themeSystem, lang)}
                className={theme === "system" ? "is-active" : undefined}
                onClick={() => setTheme("system")}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1.75" y="2.75" width="12.5" height="8.5" rx="0.8" />
                  <line x1="5" y1="13.75" x2="11" y2="13.75" />
                  <line x1="8" y1="11.25" x2="8" y2="13.75" />
                </svg>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={theme === "dark"}
                aria-label={t(UI_STRINGS.themeDark, lang)}
                title={t(UI_STRINGS.themeDark, lang)}
                className={theme === "dark" ? "is-active" : undefined}
                onClick={() => setTheme("dark")}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 9.5A5.5 5.5 0 1 1 6.5 3a4.5 4.5 0 0 0 6.5 6.5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom dock — only visible on mobile via CSS. Lives outside <main>
          so scroll-position math (.nav offsetHeight) keeps working. */}
      <nav className="dock" aria-label="Sections (mobile)">
        <div className="dock__inner">
          {NAV_LINKS.map((l) => {
            const isActive = current === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={handleAnchor}
                className={isActive ? "dock__item is-current" : "dock__item"}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="dock__icon" aria-hidden>
                  {l.icon}
                </span>
                <span className="dock__label">
                  <span className="dock__idx">{l.idx}</span>
                  {t(UI_STRINGS.nav[l.key], lang)}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
