"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { lessonThemes, type LessonTheme, lessons } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/motion";
import { useMorphDialog } from "./useMorphDialog";

export type Lesson = (typeof lessons)[number] & { hasVideo: boolean };

const ALL = "Tout" as const;
type Filter = typeof ALL | LessonTheme;

const src = (id: string) => `/formations/${id}.mp4`;
const poster = (id: string) => `/formations/${id}.jpg`;
const pad = (n: number) => String(n).padStart(2, "0");

function startAudible(panel: HTMLElement, delay: number) {
  const v = panel.querySelector<HTMLVideoElement>(".lesson-player video");
  if (!v) return;
  setTimeout(() => v.play().catch(() => {}), delay);
}

function Media({ lesson, player = false }: { lesson: Lesson; player?: boolean }) {
  if (!lesson.hasVideo) {
    return (
      <div className="lesson__placeholder" aria-hidden="true">
        <span>{lesson.theme}</span>
        <small>Extrait en préparation</small>
      </div>
    );
  }
  return player ? (
    <video src={src(lesson.id)} poster={poster(lesson.id)} controls playsInline preload="metadata" />
  ) : (
    // Cards stay muted and only load once they come near the viewport.
    <video data-src={src(lesson.id)} poster={poster(lesson.id)} muted loop playsInline preload="none" aria-hidden="true" />
  );
}

export default function ClassroomGrid({ items }: { items: Lesson[] }) {
  const [filter, setFilter] = useState<Filter>(ALL);
  const shown = filter === ALL ? items : items.filter((l) => l.theme === filter);
  const { open, cards, panel, scrim, show, go, close, dialogProps } = useMorphDialog(shown.length, startAudible);

  // Sliding pill under the active filter.
  const tabs = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const active = tabs.current?.querySelector<HTMLElement>("[aria-pressed='true']");
    if (!active || !tabs.current) return;
    tabs.current.style.setProperty("--x", `${active.offsetLeft}px`);
    tabs.current.style.setProperty("--w", `${active.offsetWidth}px`);
  }, [filter]);

  // Card clips play while on screen, pause otherwise.
  const grid = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion() || !grid.current) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(({ target, isIntersecting }) => {
          const v = target as HTMLVideoElement;
          if (isIntersecting) {
            if (!v.src && v.dataset.src) v.src = v.dataset.src;
            v.play().catch(() => {});
          } else v.pause();
        }),
      { threshold: 0.45 }
    );
    grid.current.querySelectorAll("video[data-src]").forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [filter]);

  const pick = (f: Filter) => {
    if (f === filter) return;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (!doc.startViewTransition || prefersReducedMotion()) return setFilter(f);
    doc.startViewTransition(() => flushSync(() => setFilter(f)));
  };

  const lesson = open === null ? null : shown[open];
  const prev = open === null ? null : shown[(open - 1 + shown.length) % shown.length];
  const next = open === null ? null : shown[(open + 1) % shown.length];

  return (
    <>
      <div className="classroom__tabs" ref={tabs} role="group" aria-label="Filtrer par thème">
        <i aria-hidden="true" />
        {([ALL, ...lessonThemes] as Filter[]).map((t) => (
          <button key={t} type="button" aria-pressed={filter === t} onClick={() => pick(t)}>
            {t}
            <small>{t === ALL ? items.length : items.filter((l) => l.theme === t).length}</small>
          </button>
        ))}
      </div>

      <div className="classroom__grid" ref={grid}>
        {shown.map((l, i) => (
          <article
            className="lesson"
            data-glow
            key={l.id}
            style={{ viewTransitionName: `lesson-${l.id}` }}
            ref={(el) => {
              cards.current[i] = el;
            }}
          >
            <div className="lesson__media">
              <Media lesson={l} />
              <span className="lesson__live" aria-hidden="true"><b />Session réelle</span>
            </div>
            <div className="lesson__body">
              <p className="project__kind">{l.theme}</p>
              <h3>{l.title}</h3>
              <button className="lesson__open" type="button" data-open aria-haspopup="dialog" onClick={() => show(i)}>
                Regarder l&apos;extrait
                <i aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <dialog {...dialogProps} className="case" aria-labelledby="lesson-title">
        <div className="case__scrim" ref={scrim} onClick={close} />
        <div className="case__panel" ref={panel}>
          {lesson && prev && next && (
            <div className="case__content" key={lesson.id}>
              <div className="project__chrome case__chrome">
                <i /><i /><i /><span>Formation · {lesson.theme}</span>
                <button className="case__close" type="button" onClick={close} aria-label="Fermer l'extrait">
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="lesson-player" data-stagger>
                <Media lesson={lesson} player />
              </div>
              <div className="case__body">
                <header className="case__head" data-stagger>
                  <p className="project__kind">{lesson.theme}</p>
                  <h3 id="lesson-title">{lesson.title}</h3>
                  <p className="case__desc">{lesson.summary}</p>
                </header>
                <div className="case__cols case__cols--2">
                  <section data-stagger>
                    <h4>Ce qu&apos;on travaille</h4>
                    <ul>{lesson.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  </section>
                  <section data-stagger>
                    <h4>Le format</h4>
                    <p>Une vraie session enregistrée en visio : on part d&apos;un cas concret, l&apos;apprenant pratique sur son écran et je corrige en direct.</p>
                  </section>
                </div>
                <div className="case__foot" data-stagger>
                  <span className="lesson__note">Extrait diffusé avec l&apos;accord des participants.</span>
                  <a
                    className="case__link"
                    href="#contact"
                    onClick={async (e) => {
                      // Scrolling is locked while the dialog is open: close first, then go.
                      e.preventDefault();
                      await close();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Organiser une formation
                  </a>
                </div>
                {shown.length > 1 && (
                  <nav className="case__nav" data-stagger aria-label="Autres extraits">
                    <button type="button" onClick={() => go(-1)}>← {prev.title}</button>
                    <span>{pad(open! + 1)} / {pad(shown.length)}</span>
                    <button type="button" onClick={() => go(1)}>{next.title} →</button>
                  </nav>
                )}
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
