"use client";

import { usePrefs } from "./Providers";
import { t, UI_STRINGS } from "@/lib/i18n";
import type { ProjectsContent } from "@/lib/defaults";

const SWIPE_HINT = { en: "Swipe", vi: "Vuốt" } as const;

export default function Projects({ content }: { content: ProjectsContent }) {
  const { lang } = usePrefs();
  return (
    <section className="section section--alt" id="projects">
      <div className="container">
        <header className="section__head section__head--row">
          <div>
            <span className="section__num">{t(content.section_num, lang)}</span>
            <h2 className="section__title">{t(content.title, lang)}</h2>
          </div>
          <div className="section__aside">
            <span className="dim">{t(content.aside_label, lang)}</span>
            <span className="bignum">{String(content.aside_count).padStart(2, "0")}</span>
            <span className="projects__hint" aria-hidden>
              {t(SWIPE_HINT, lang)}
              <span className="projects__hint-arrow">→</span>
            </span>
          </div>
        </header>

        <div className="projects" role="list" aria-label={t(UI_STRINGS.nav.projects, lang)}>
          {content.items.map((p) => (
            <a
              key={p.idx}
              className="proj"
              href={p.url}
              target="_blank"
              rel="noopener"
              role="listitem"
              style={{ "--proj-tone": p.tone } as React.CSSProperties}
            >
              <header className="proj__head">
                <span className="proj__idx">{p.idx}</span>
                <span className="proj__ext" aria-hidden>
                  ↗
                </span>
              </header>
              <h3 className="proj__name">{t(p.name, lang)}</h3>
              <p className="proj__desc">{t(p.desc, lang)}</p>
              <footer className="proj__foot">
                <span className="proj__url">{p.url_label}</span>
                <span className="proj__stack">{p.stack}</span>
              </footer>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
