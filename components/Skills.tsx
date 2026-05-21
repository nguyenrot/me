"use client";

import { usePrefs } from "./Providers";
import { t } from "@/lib/i18n";
import type { SkillsContent } from "@/lib/defaults";

export default function Skills({ content }: { content: SkillsContent }) {
  const { lang } = usePrefs();
  return (
    <section className="section section--alt" id="skills">
      <div className="container">
        <header className="section__head section__head--row">
          <div>
            <span className="section__num">{t(content.section_num, lang)}</span>
            <h2 className="section__title">{t(content.title, lang)}</h2>
          </div>
          <div className="section__aside">
            <span className="dim">{t(content.aside_label, lang)}</span>
            <span className="bignum">{String(content.aside_count).padStart(2, "0")}</span>
          </div>
        </header>

        <div className="skills">
          {content.items.map((s) => (
            <article
              key={s.idx}
              className="skill"
              style={{ "--pct": s.pct } as React.CSSProperties}
            >
              <header className="skill__head">
                <span className="skill__idx">{s.idx}</span>
                <h3 className="skill__name">{t(s.name, lang)}</h3>
                <span className="skill__pct">
                  <span className="pct__num">{s.pct}</span>
                  <span className="pct__unit">/100</span>
                </span>
              </header>
              <div className="skill__bar" aria-hidden>
                <span className="skill__bar-fill" />
              </div>
              <p className="skill__desc">{t(s.desc, lang)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
