"use client";

import { usePrefs } from "./Providers";
import { t } from "@/lib/i18n";
import type { AboutContent } from "@/lib/defaults";

export default function About({ content }: { content: AboutContent }) {
  const { lang } = usePrefs();
  return (
    <section className="section" id="about">
      <div className="container">
        <header className="section__head">
          <span className="section__num">{t(content.section_num, lang)}</span>
          <h2
            className="section__title"
            dangerouslySetInnerHTML={{ __html: t(content.title_html, lang) }}
          />
        </header>

        <div className="about__grid">
          <div className="about__prose">
            {content.paragraphs_html.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: t(p, lang) }} />
            ))}

            <blockquote className="quote">
              <span className="quote__mark" aria-hidden>
                {"/*"}
              </span>
              <p dangerouslySetInnerHTML={{ __html: t(content.quote_html, lang) }} />
              <span className="quote__mark quote__mark--end" aria-hidden>
                {"*/"}
              </span>
            </blockquote>

            <p className="about__sig">
              — KN, <span className="dim">{t(content.sig_prefix, lang)}</span>
              <time dateTime={content.sig_year}>{content.sig_year}</time>
            </p>
          </div>

          <aside className="about__card">
            <header className="card__head">
              <span className="card__label">{content.card_label}</span>
              <span className="card__dot" aria-hidden />
            </header>
            <dl className="about__meta">
              {content.card_meta.map((row, i) => (
                <div key={i}>
                  <dt>{t(row.key, lang)}</dt>
                  <dd>{t(row.value, lang)}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
