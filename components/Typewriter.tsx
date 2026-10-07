"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const TYPE_MS = 26;
const SENTENCE_PAUSE_MS = 380;
const ERASE_MS = 12;
const HOLD_MS = 2600;
const NEXT_MS = 450;

/**
 * Types each text, holds it, erases it, then moves to the next one, forever.
 * Starts when scrolled into view and pauses while off screen.
 */
export default function Typewriter({ texts }: { texts: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setReduced(true);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let visible = false;
    let started = false;
    let i = 0; // current text
    let n = 0; // typed characters

    // Wait while off screen, then resume where we left off.
    const schedule = (fn: () => void, ms: number) => {
      timer = setTimeout(() => (visible ? fn() : schedule(fn, 300)), ms);
    };

    const type = () => {
      const text = texts[i];
      setCount(++n);
      if (n < text.length) schedule(type, text[n - 1] === "." ? SENTENCE_PAUSE_MS : TYPE_MS);
      else schedule(erase, HOLD_MS + text.length * 8);
    };

    const erase = () => {
      setCount(--n);
      if (n > 0) schedule(erase, ERASE_MS);
      else schedule(next, NEXT_MS);
    };

    const next = () => {
      i = (i + 1) % texts.length;
      setIndex(i);
      schedule(type, 0);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !started) {
        started = true;
        schedule(type, 500);
      }
    }, { threshold: 0.5 });
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [texts]);

  const longest = texts.reduce((a, b) => (b.length > a.length ? b : a), "");

  if (reduced) {
    return (
      <p ref={ref} className="typewriter typewriter--static">
        {texts.join(" ")}
      </p>
    );
  }

  return (
    <p ref={ref} className="typewriter" aria-label={texts.join(" ")}>
      {/* Invisible copy of the longest text keeps the height stable while typing/erasing. */}
      <span className="typewriter__ghost" aria-hidden="true">{longest}</span>
      <span className="typewriter__text" aria-hidden="true">{texts[index].slice(0, count)}</span>
    </p>
  );
}
