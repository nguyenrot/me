"use client";

import { useRef } from "react";
import { usePrefs } from "./Providers";
import { t } from "@/lib/i18n";
import type { HeroContent } from "@/lib/defaults";

export default function Hero({ content }: { content: HeroContent }) {
  const { lang } = usePrefs();
  const heroRef = useRef<HTMLElement | null>(null);

  const onMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--sx", `${x}%`);
    el.style.setProperty("--sy", `${y}%`);
  };

  const onEnter = () => heroRef.current?.classList.add("is-active");
  const onLeave = () => heroRef.current?.classList.remove("is-active");

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
    <section
      ref={heroRef}
      className="hero"
      id="hero"
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="hero__year" aria-hidden>
        {content.year}
      </div>
      <div className="hero__spotlight" aria-hidden />

      <div className="container">
        <div className="hero__status">
          <span className="badge">
            <span className="badge__dot" />
            <span>{t(content.status_badge, lang)}</span>
          </span>
          <span className="rule" />
          <span className="hero__meta">{t(content.status_meta, lang)}</span>
        </div>

        <div className="hero__grid">
          <div className="hero__main">
            <p className="kicker">
              <span className="dim">{content.kicker_prefix}</span>
              <span>{t(content.kicker, lang)}</span>
            </p>
            <h1 className="hero__name">
              <span className="hero__name-line">{content.name_first}</span>
              <br />
              <span className="hero__name-line">{content.name_last}</span>
              <span className="hero__name-cursor" aria-hidden>
                _
              </span>
            </h1>
            <div
              className="hero__role"
              aria-label={`role: ${content.role_value} at ${content.at_value}`}
            >
              <div className="hero__role-row">
                <span className="hero__role-key">{content.role_label}</span>
                <span className="hero__role-eq">=</span>
                <span className="hero__role-val">
                  &ldquo;{content.role_value}&rdquo;
                  <span className="hero__role-punc">,</span>
                </span>
              </div>
              <div className="hero__role-row">
                <span className="hero__role-key">{content.at_label}</span>
                <span className="hero__role-eq">=</span>
                <span className="hero__role-val">&ldquo;{content.at_value}&rdquo;</span>
              </div>
            </div>

            <p className="hero__lede">{t(content.lede, lang)}</p>

            <div className="hero__ctas">
              <a className="btn btn--primary" href="#projects" onClick={handleAnchor}>
                <span>{t(content.cta_primary, lang)}</span>
                <span aria-hidden className="btn__arrow">
                  →
                </span>
              </a>
              <a className="btn btn--ghost" href="#about" onClick={handleAnchor}>
                <span>{t(content.cta_ghost, lang)}</span>
                <span aria-hidden className="btn__arrow">
                  ↓
                </span>
              </a>
            </div>
          </div>

          <aside className="hero__side">
            <figure className="portrait">
              <div className="portrait__frame">
                <img className="portrait__img" src="/portrait.jpg" alt="Phạm Kỷ Nguyên" />
                <div className="portrait__crosshair" aria-hidden>
                  <span className="ch ch-tl" />
                  <span className="ch ch-tr" />
                  <span className="ch ch-bl" />
                  <span className="ch ch-br" />
                </div>
              </div>
              <figcaption className="portrait__caption">
                <div>
                  <span className="dim">{t(content.portrait.subject_label, lang)}&nbsp;</span>
                  {content.portrait.subject_value}
                </div>
                <div>
                  <span className="dim">{t(content.portrait.captured_label, lang)}&nbsp;</span>
                  {content.portrait.captured_value}
                </div>
              </figcaption>
            </figure>

            <dl className="datasheet">
              {content.datasheet.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>
                    {row.ok ? <span className="ok">●</span> : null}
                    {row.ok ? " " : null}
                    {t(row.value, lang)}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div className="hero__foot">
          <span>{t(content.foot, lang)}</span>
          <span className="rule" />
          <span className="dim">{content.foot_dim}</span>
        </div>
      </div>
    </section>
  );
}
