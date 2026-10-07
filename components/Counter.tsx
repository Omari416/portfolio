"use client";

import { useEffect, useRef, useState } from "react";
import { clamp, prefersReducedMotion } from "@/lib/motion";

/** Counts up from 0 to `value` the first time it scrolls into view. */
export default function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (prefersReducedMotion()) return setN(value);
      const start = performance.now();
      const dur = value > 100 ? 1800 : 1100;
      const tick = (now: number) => {
        const p = clamp((now - start) / dur);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{n.toLocaleString("fr-FR")}</span>;
}
