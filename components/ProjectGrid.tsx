"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { projects } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/motion";
import ProjectVisual from "./ProjectVisual";

/*
  Container transform: the case-study panel is laid out at its final size,
  then clipped down to the clicked card's rect and un-clipped to full size.
  Content staggers in once the surface has grown. Closing runs it backwards.
*/
const EASE_IO = "cubic-bezier(.7, 0, .2, 1)";
const EASE_OUT = "cubic-bezier(.16, 1, .3, 1)";
const FULL = "inset(0px 0px 0px 0px round 24px)";

const clipTo = (card: DOMRect, panel: DOMRect) =>
  `inset(${card.top - panel.top}px ${panel.right - card.right}px ${panel.bottom - card.bottom}px ${card.left - panel.left}px round 22px)`;

const pad = (n: number) => String(n).padStart(2, "0");

function lockScroll(on: boolean) {
  const root = document.documentElement;
  if (on) document.body.style.paddingRight = `${innerWidth - root.clientWidth}px`;
  else document.body.style.paddingRight = "";
  root.style.overflow = on ? "hidden" : "";
}

function staggerIn(panel: HTMLElement, delay: number) {
  panel.querySelectorAll("[data-stagger]").forEach((el, k) =>
    el.animate(
      [{ opacity: 0, transform: "translateY(26px)" }, { opacity: 1, transform: "none" }],
      { duration: 800, delay: delay + k * 70, easing: EASE_OUT, fill: "backwards" }
    )
  );
  // Let the visual's own CSS transitions (bars, mail lines) play once it is shown.
  const visual = panel.querySelector(".case__visual");
  visual?.classList.remove("is-in");
  setTimeout(() => visual?.classList.add("is-in"), delay + 120);
}

function fadeOut(panel: HTMLElement) {
  return Promise.all(
    [...panel.querySelectorAll("[data-stagger]")].map(
      (el) => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: "ease", fill: "forwards" }).finished
    )
  );
}

export default function ProjectGrid() {
  const [open, setOpen] = useState<number | null>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const mode = useRef<"opening" | "switching" | null>(null);
  const busy = useRef(false);

  useLayoutEffect(() => {
    const d = dialog.current;
    const p = panel.current;
    if (open === null || !d || !p || !mode.current) return;
    const how = mode.current;
    mode.current = null;
    const reduced = prefersReducedMotion();

    // Toggle classes by hand: React owns className, ScrollEffects adds `is-in`.
    cards.current.forEach((c, i) => c?.classList.toggle("is-source", i === open));

    if (how === "switching") {
      p.scrollTop = 0;
      if (!reduced) staggerIn(p, 0);
      busy.current = false;
      return;
    }

    lockScroll(true);
    d.showModal();
    p.scrollTop = 0;
    if (reduced) {
      p.querySelector(".case__visual")?.classList.add("is-in");
      busy.current = false;
      return;
    }
    const card = cards.current[open]!.getBoundingClientRect();
    const grow = p.animate([{ clipPath: clipTo(card, p.getBoundingClientRect()) }, { clipPath: FULL }], {
      duration: 760,
      easing: EASE_IO,
    });
    scrim.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 520, easing: "ease" });
    staggerIn(p, 380);
    grow.finished.then(() => (busy.current = false), () => (busy.current = false));
  }, [open]);

  const show = (i: number) => {
    if (busy.current) return;
    busy.current = true;
    mode.current = "opening";
    setOpen(i);
  };

  const go = async (step: number) => {
    if (open === null || busy.current) return;
    busy.current = true;
    if (panel.current && !prefersReducedMotion()) await fadeOut(panel.current);
    mode.current = "switching";
    setOpen((open + step + projects.length) % projects.length);
  };

  const close = async () => {
    const d = dialog.current;
    const p = panel.current;
    if (open === null || busy.current || !d || !p) return;
    busy.current = true;
    const card = cards.current[open]!;

    if (!prefersReducedMotion()) {
      const r = card.getBoundingClientRect();
      const onScreen = r.bottom > 0 && r.top < innerHeight;
      fadeOut(p);
      scrim.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 620, easing: "ease", fill: "forwards" });
      const shrink = onScreen
        ? p.animate([{ clipPath: FULL }, { clipPath: clipTo(r, p.getBoundingClientRect()) }], {
            duration: 620,
            delay: 80,
            easing: EASE_IO,
            fill: "forwards",
          })
        : p.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "scale(.97)" }], {
            duration: 320,
            easing: "ease",
            fill: "forwards",
          });
      await shrink.finished;
    }

    card.classList.remove("is-source");
    d.close();
    lockScroll(false);
    [p, scrim.current].forEach((el) => el?.getAnimations({ subtree: true }).forEach((a) => a.cancel()));
    card.querySelector<HTMLButtonElement>(".project__open")?.focus({ preventScroll: true });
    busy.current = false;
    setOpen(null);
  };

  const p = open === null ? null : projects[open];
  const prev = open === null ? null : projects[(open - 1 + projects.length) % projects.length];
  const next = open === null ? null : projects[(open + 1) % projects.length];

  return (
    <>
      <div className="grid">
        {projects.map((proj, i) => (
          <article
            className="project"
            data-reveal
            data-glow
            key={proj.name}
            ref={(el) => {
              cards.current[i] = el;
            }}
          >
            <div className="project__chrome"><i /><i /><i /><span>{proj.url}</span></div>
            <ProjectVisual type={proj.visual} />
            <div className="project__body">
              <p className="project__kind">{proj.kind}</p>
              <h3>{proj.name}</h3>
              <p>{proj.description}</p>
              <ul className="stack">
                {proj.stack.map((s) => <li key={s}>{s}</li>)}
              </ul>
              <button className="project__open" type="button" aria-haspopup="dialog" onClick={() => show(i)}>
                Voir l&apos;étude de cas
                <i aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <dialog
        ref={dialog}
        className="case"
        aria-labelledby="case-title"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        <div className="case__scrim" ref={scrim} onClick={close} />
        <div className="case__panel" ref={panel}>
          {p && prev && next && (
            <div className="case__content" key={p.name}>
              <div className="project__chrome case__chrome">
                <i /><i /><i /><span>{p.url}</span>
                <button className="case__close" type="button" onClick={close} aria-label="Fermer l'étude de cas">
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="case__visual" data-stagger>
                <ProjectVisual type={p.visual} />
              </div>
              <div className="case__body">
                <header className="case__head" data-stagger>
                  <p className="project__kind">{p.kind}</p>
                  <h3 id="case-title">{p.name}</h3>
                  <p className="case__desc">{p.description}</p>
                </header>
                <div className="case__cols">
                  <section data-stagger>
                    <h4>Le défi</h4>
                    <p>{p.challenge}</p>
                  </section>
                  <section data-stagger>
                    <h4>Ce que j&apos;ai construit</h4>
                    <ul>{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
                  </section>
                  <section data-stagger>
                    <h4>Sous le capot</h4>
                    <ul>{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
                  </section>
                </div>
                <div className="case__foot" data-stagger>
                  <ul className="stack">
                    {p.stack.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                  <a className="case__link" href={`https://${p.url}`} target="_blank" rel="noreferrer">
                    Visiter {p.url} ↗
                  </a>
                </div>
                <nav className="case__nav" data-stagger aria-label="Autres projets">
                  <button type="button" onClick={() => go(-1)}>← {prev.name}</button>
                  <span>{pad(open! + 1)} / {pad(projects.length)}</span>
                  <button type="button" onClick={() => go(1)}>{next.name} →</button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
