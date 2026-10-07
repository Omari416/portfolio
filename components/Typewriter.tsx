"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Types `text` out once it scrolls into view, pausing a little after each sentence. */
export default function Typewriter({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (prefersReducedMotion()) return setCount(text.length);
      let i = 0;
      const type = () => {
        setCount(++i);
        if (i < text.length) timer = setTimeout(type, text[i - 1] === "." ? 380 : 26);
      };
      timer = setTimeout(type, 500);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <p ref={ref} aria-label={text}>
      {text.slice(0, count)}
    </p>
  );
}
