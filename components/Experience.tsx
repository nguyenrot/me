"use client";

import { usePrefs } from "./Providers";
import { t } from "@/lib/i18n";
import type { ExperienceContent, ExperienceEntry } from "@/lib/defaults";

function entryClass(e: ExperienceEntry) {
  if (e.variant === "current") return "entry entry--current";
  if (e.variant === "edu") return "entry entry--edu";
  return "entry";
}

export default function Experience({ content }: { content: ExperienceContent }) {
  const { lang } = usePrefs();
  return (
    <section className="section" id="experience">
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

        <ol className="timeline">
          {content.entries.map((e, i) => (
            <li key={i} className={entryClass(e)}>
              <div className="entry__year">
                <span>{e.year_start}</span>
                {e.year_end != null ? (
                  <>
                    <span className="dim">—</span>
                    <span>{t(e.year_end, lang)}</span>
                  </>
                ) : null}
              </div>
              <div className="entry__body">
                <div className="entry__title">
                  <h3>{t(e.title, lang)}</h3>
                  {e.tag ? <span className="tag">{t(e.tag, lang)}</span> : null}
                </div>
                <p className="entry__org">
                  {e.org} <span className="dim">· {e.location}</span>
                </p>
                <p className="entry__desc">{t(e.desc, lang)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
