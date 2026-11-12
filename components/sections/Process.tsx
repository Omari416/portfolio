import { processLead, processPhases, steps } from "@/lib/content";
import Label from "../Label";
import { processArts } from "../ProcessArt";
import StepList from "../StepList";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Process() {
  const phases = processPhases.map((name, p) => {
    const idx = steps.flatMap((s, i) => (s.phase === p ? [i] : []));
    return { name, from: idx[0], to: idx[idx.length - 1] };
  });

  return (
    <section className="section process" id="process">
      <Label>De l&apos;idée au produit déployé</Label>
      <h2 className="section__title" data-reveal>
        Un seul interlocuteur,
        <br />
        <em>du cadrage à la prod.</em>
      </h2>
      <p className="process__lead" data-reveal>{processLead}</p>

      <div className="process__grid">
        {/* Sticky stage: shows the illustration of the step being read (ScrollEffects drives it). */}
        <aside className="process__aside" data-reveal>
          <div className="stage" data-glow data-tilt aria-hidden="true">
            <div className="stage__bar">
              <span className="stage__n">
                <b id="stepsNow">01</b> / {pad(steps.length)}
              </span>
              <span className="stage__title" id="stepsNowTitle">{steps[0].title}</span>
              <span className="stage__phase" id="stepsNowPhase">{processPhases[steps[0].phase]}</span>
            </div>
            <div className="stage__art">
              {processArts.map((Art, i) => (
                <div className={`art${i === 0 ? " is-active" : ""}`} data-art key={i}>
                  <Art p={`stage${i}`} />
                </div>
              ))}
            </div>
            <div className="stage__progress">
              {steps.map((s) => <i key={s.title} data-seg />)}
            </div>
          </div>
          <ol className="phases">
            {phases.map((ph) => (
              <li key={ph.name} data-phase={ph.from}>
                {ph.name}
                <span>{pad(ph.from + 1)} – {pad(ph.to + 1)}</span>
              </li>
            ))}
          </ol>
        </aside>

        <StepList />
      </div>
    </section>
  );
}
