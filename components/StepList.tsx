"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { processPhases, steps } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

export default function StepList() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="steps" id="steps">
      <div className="steps__line"><i /></div>
      {steps.map((s, i) => {
        const isOpen = open === i;
        return (
          // `data-open`, not className: ScrollEffects toggles is-lit / is-current on these.
          <article
            className="step"
            key={s.title}
            data-title={s.title}
            data-open={isOpen || undefined}
            onTransitionEnd={(e) => {
              // Heights changed: let the scroll-driven line catch up.
              if (e.propertyName === "grid-template-rows") dispatchEvent(new Event("scroll"));
            }}
          >
            <div className="step__head">
              <span className="step__n">{pad(i + 1)}</span>
              <span className="step__phase">{processPhases[s.phase]}</span>
              <button
                className="step__toggle"
                type="button"
                aria-expanded={isOpen}
                aria-controls={`step-more-${i}`}
                aria-label={`${isOpen ? "Masquer" : "Afficher"} le détail : ${s.title}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <i aria-hidden="true" />
              </button>
            </div>
            <h3>{s.title}</h3>
            <p className="step__lead">{s.lead}</p>
            <p>{s.text}</p>
            <div className="step__more" id={`step-more-${i}`} aria-hidden={!isOpen}>
              <div>
                <h4>Concrètement</h4>
                <ul>
                  {s.details.map((d, k) => (
                    <li key={d} style={{ "--i": k } as CSSProperties}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="step__foot">
              <ul className="step__deliverables" aria-label="Livrables">
                {s.deliverables.map((d) => <li key={d}>{d}</li>)}
              </ul>
              <span className="step__gate">Jalon : {s.gate}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
