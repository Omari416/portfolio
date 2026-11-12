"use client";

import { projects } from "@/lib/content";
import ProjectVisual from "./ProjectVisual";
import { useMorphDialog } from "./useMorphDialog";

const pad = (n: number) => String(n).padStart(2, "0");

// Let the visual's own CSS transitions (bars, mail lines) play once it is shown.
function replayVisual(panel: HTMLElement, delay: number) {
  const visual = panel.querySelector(".case__visual");
  visual?.classList.remove("is-in");
  setTimeout(() => visual?.classList.add("is-in"), delay + 120);
}

export default function ProjectGrid() {
  const { open, cards, panel, scrim, show, go, close, dialogProps } = useMorphDialog(projects.length, replayVisual);

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
              <button className="project__open" type="button" data-open aria-haspopup="dialog" onClick={() => show(i)}>
                Voir l&apos;étude de cas
                <i aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <dialog {...dialogProps} className="case" aria-labelledby="case-title">
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
