"use client";

import Image from "next/image";
import { projects } from "@/lib/content";
import { useMorphDialog } from "./useMorphDialog";

const pad = (n: number) => String(n).padStart(2, "0");

export default function ProjectGrid() {
  const { open, cards, panel, scrim, show, go, close, dialogProps } = useMorphDialog(projects.length);

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
            {proj.shots && proj.device === "phone" ? (
              <div className="project__visual project__phones">
                {proj.shots.slice(0, 3).map((s) => (
                  <div className="device" key={s.src}>
                    <Image src={s.src} alt={s.alt} fill sizes="140px" />
                  </div>
                ))}
              </div>
            ) : proj.shots ? (
              <div className="project__visual project__shot">
                <Image src={proj.shots[0].src} alt={proj.shots[0].alt} fill sizes="(max-width: 960px) 100vw, 560px" />
              </div>
            ) : null}
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
              {p.shots && p.device === "phone" ? (
                <div className="case__phones">
                  {p.shots.map((s) => (
                    <figure key={s.src} className="device" data-stagger>
                      <Image src={s.src} alt={s.alt} fill sizes="260px" />
                    </figure>
                  ))}
                </div>
              ) : p.shots ? (
                <div className="case__shots">
                  {p.shots.map((s) => (
                    <figure key={s.src} className="case__shot" data-stagger>
                      <Image src={s.src} alt={s.alt} width={1600} height={800} sizes="(max-width: 1100px) 100vw, 1040px" />
                    </figure>
                  ))}
                </div>
              ) : null}
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
                  {p.visit && (
                    <a className="case__link" href={p.visit} target="_blank" rel="noreferrer">
                      Visiter {p.url} ↗
                    </a>
                  )}
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
