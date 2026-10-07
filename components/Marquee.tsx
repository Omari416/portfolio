"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Props = { items: string[]; big?: boolean; reverse?: boolean; label?: string };

/** Infinite marquee: one half is repeated until it fills the screen, then doubled for a seamless loop. */
export default function Marquee({ items, big, reverse, label }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(1);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    if (half < innerWidth * 1.2) {
      setCopies((c) => c + 1);
      return;
    }
    track.style.setProperty("--dur", `${half / 45}s`);
  }, [copies]);

  const half = Array.from({ length: copies }, () => items).flat();
  const classes = ["marquee", big && "marquee--big", reverse && "marquee--reverse"].filter(Boolean).join(" ");

  return (
    <div className={classes} aria-label={label}>
      <div className="marquee__track" ref={trackRef}>
        {[...half, ...half].map((item, i) => (
          <span key={i} aria-hidden={i >= items.length || undefined}>{item}</span>
        ))}
      </div>
    </div>
  );
}
