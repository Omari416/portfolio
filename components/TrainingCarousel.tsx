"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { trainingSlides } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/motion";
import Counter from "./Counter";

/*
  Scroll-snap carousel: swipe / trackpad / keyboard work natively. The progress
  bar is the autoplay timer: when its CSS animation ends, the next slide comes
  in. It pauses on hover, on focus, off screen and when the tab is hidden.
*/
const INTERVAL = 6000;
const pad = (n: number) => String(n).padStart(2, "0");

export default function TrainingCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [auto, setAuto] = useState(false);
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const gliding = useRef(false);
  const glideEnd = useRef<ReturnType<typeof setTimeout>>(undefined);
  const count = trainingSlides.length;

  useEffect(() => {
    setAuto(!prefersReducedMotion());
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    const onVis = () => setVisible(!document.hidden && el.getBoundingClientRect().top < innerHeight);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const goTo = (i: number) => {
    const t = track.current;
    if (!t) return;
    const next = (i + count) % count;
    gliding.current = true;
    clearTimeout(glideEnd.current);
    glideEnd.current = setTimeout(() => (gliding.current = false), 800);
    t.scrollTo({ left: next * t.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    setIndex(next);
  };

  // Keep the index in sync when the visitor swipes or scrolls the track
  // (ignored while our own smooth scroll is gliding past intermediate positions).
  const onScroll = () => {
    const t = track.current;
    if (t && !gliding.current) setIndex(Math.round(t.scrollLeft / t.clientWidth));
  };

  const running = auto && visible && !paused;

  return (
    <article
      ref={root}
      className="bootcamp tcarousel"
      data-reveal
      data-glow
      aria-roledescription="carrousel"
      aria-label="Mes formations"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") goTo(index + 1);
        if (e.key === "ArrowLeft") goTo(index - 1);
      }}
    >
      <div className="tcarousel__track" ref={track} onScroll={onScroll}>
        {trainingSlides.map((s, i) => (
          <div
            className="tcarousel__slide"
            key={s.title}
            role="group"
            aria-roledescription="diapositive"
            aria-label={`${i + 1} sur ${count} : ${s.title}`}
            aria-hidden={i !== index}
          >
            <p className="project__kind">{s.kicker}</p>
            <div className={s.value !== undefined ? "bootcamp__big" : "bootcamp__big is-text"}>
              {s.value !== undefined ? <Counter value={s.value} /> : <span>{s.big}</span>}
              {s.unit && <small>{s.unit}</small>}
            </div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>

      <div className="tcarousel__foot">
        {/* Autoplay timer: restarts on every slide (key), its end moves to the next one. */}
        <div className="bootcamp__bar tcarousel__timer">
          <i
            key={index}
            className={auto ? "is-timed" : undefined}
            style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: running ? "running" : "paused" } as CSSProperties}
            onAnimationEnd={() => goTo(index + 1)}
          />
        </div>
        <div className="tcarousel__nav">
          <span className="tcarousel__count">
            <b>{pad(index + 1)}</b> / {pad(count)}
          </span>
          <div className="tcarousel__dots">
            {trainingSlides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-label={`Aller à : ${s.title}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button className="tcarousel__arrow" type="button" aria-label="Précédent" onClick={() => goTo(index - 1)}>
            ←
          </button>
          <button className="tcarousel__arrow" type="button" aria-label="Suivant" onClick={() => goTo(index + 1)}>
            →
          </button>
        </div>
      </div>
    </article>
  );
}
