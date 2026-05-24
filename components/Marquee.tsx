import { Fragment } from "react";
import type { MarqueeContent } from "@/lib/defaults";

export default function Marquee({ content }: { content: MarqueeContent }) {
  // Duplicate the item list so a -50% translate produces a seamless loop.
  const items = [...content.items, ...content.items];

  // Mobile pill — show one curated item (prefer the dotted "status" entry,
  // otherwise just the first). Keeps the bar quiet on small screens.
  const pillItem =
    content.items.find((it) => it.dot) ?? content.items[0] ?? { text: "", dot: false };

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
      <div className="marquee__pill">
        <span className="marquee__item">
          {pillItem.dot ? <span className="marquee__dot" /> : null}
          {pillItem.text}
        </span>
      </div>
    </div>
  );
}
