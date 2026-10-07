"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const COUNT = 13;

/** Narrat's 13 modules lighting up one after another. */
export default function NarratModules() {
  const [on, setOn] = useState<boolean[]>(() => Array(COUNT).fill(false));
  const [accent, setAccent] = useState(-1);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setOn(Array.from({ length: COUNT }, (_, i) => i < 7));
      return;
    }
    let n = 0;
    const id = setInterval(() => {
      const i = n % COUNT;
      setOn((prev) => prev.map((v, j) => (j === i ? !v : v)));
      setAccent((n * 5 + 3) % COUNT);
      n++;
    }, 420);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="modules">
      {on.map((isOn, i) => (
        <i key={i} className={i === accent ? "is-accent" : isOn ? "is-on" : undefined} />
      ))}
    </div>
  );
}
