"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefs } from "./Providers";
import { t, UI_STRINGS } from "@/lib/i18n";
import { ACCENT_SWATCHES, type Accent } from "@/lib/prefs";

const NAV_LINKS: { id: string; idx: string; key: keyof typeof UI_STRINGS.nav }[] = [
  { id: "about", idx: "01", key: "about" },
  { id: "skills", idx: "02", key: "skills" },
  { id: "experience", idx: "03", key: "experience" },
  { id: "projects", idx: "04", key: "projects" },
  { id: "elsewhere", idx: "05", key: "elsewhere" },
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
    const href = e.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    const navH = document.querySelector<HTMLElement>(".nav")?.offsetHeight ?? 0;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
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

          <button
            type="button"
            className="iconbtn"
            aria-label={t(UI_STRINGS.ariaToggleTheme, lang)}
            title={t(UI_STRINGS.ariaToggleTheme, lang)}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <svg
              className="ico ico-sun"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.4 1.4M11.55 11.55l1.4 1.4M3.05 12.95l1.4-1.4M11.55 4.45l1.4-1.4" />
            </svg>
            <svg
              className="ico ico-moon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M13 9.5A5.5 5.5 0 1 1 6.5 3a4.5 4.5 0 0 0 6.5 6.5z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
