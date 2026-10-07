"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/*
  Hero intro timeline (reproduces the reference video):
  p1  window fades in, card carousel slides
  p2  carousel settles, main card grows, "hello" cursor arrives
  p3  portrait reveals inside the main card
  p4  light beam, stage rises, role cursor flies in
  p5  headline words appear (grey -> white)
  p6  nav, subtitle, CTAs, marquee
*/
const PHASE_TIMES = [80, 1150, 2050, 3300, 3850, 4700];

export default function IntroShell({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    setLive(true);
    const timers: ReturnType<typeof setTimeout>[] = [];
    const events = ["wheel", "keydown", "touchstart"] as const;

    const finish = () => {
      timers.forEach(clearTimeout);
      events.forEach((e) => removeEventListener(e, finish));
      setPhase(PHASE_TIMES.length);
      document.body.style.overflow = "";
    };

    if (prefersReducedMotion() || (location.hash && location.hash !== "#accueil")) {
      finish();
      return;
    }

    // Centre the stage vertically while the rest of the hero is still hidden.
    const stage = document.getElementById("stage");
    if (stage) {
      stage.style.setProperty("--intro-y", "0px"); // measure from the resting position
      const r = stage.getBoundingClientRect();
      const offset = innerHeight / 2 - (r.top + r.height / 2);
      stage.style.setProperty("--intro-y", `${Math.max(0, offset)}px`);
    }

    document.body.style.overflow = "hidden";
    PHASE_TIMES.forEach((t, i) => timers.push(setTimeout(() => setPhase(i + 1), t)));
    timers.push(setTimeout(finish, PHASE_TIMES[PHASE_TIMES.length - 1]));

    // Let impatient visitors skip.
    timers.push(
      setTimeout(() => events.forEach((e) => addEventListener(e, finish, { once: true, passive: true })), 600)
    );

    return () => {
      timers.forEach(clearTimeout);
      events.forEach((e) => removeEventListener(e, finish));
      document.body.style.overflow = "";
    };
  }, []);

  const classes = ["site", live && "is-live", ...PHASE_TIMES.slice(0, phase).map((_, i) => `p${i + 1}`)];
  return <div className={classes.filter(Boolean).join(" ")}>{children}</div>;
}
