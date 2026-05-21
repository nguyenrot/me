import { Fragment } from "react";
import type { MarqueeContent } from "@/lib/defaults";

export default function Marquee({ content }: { content: MarqueeContent }) {
  // Duplicate the item list so a -50% translate produces a seamless loop.
  const items = [...content.items, ...content.items];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {items.map((item, i) => (
          <Fragment key={i}>
            <span className="marquee__item">
              {item.dot ? <span className="marquee__dot" /> : null}
              {item.text}
            </span>
            <span className="marquee__sep">✦</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
