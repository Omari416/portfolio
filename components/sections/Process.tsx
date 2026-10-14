import { processLead, processPhases, steps } from "@/lib/content";
import Label from "../Label";
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

      <div className="process__grid">
        <aside className="process__aside" data-reveal>
          <p className="process__lead">{processLead}</p>
          <div className="process__now" aria-hidden="true">
            <span className="process__now-n">
              <b id="stepsNow">01</b>
              <small>/ {pad(steps.length)}</small>
            </span>
            <span className="process__now-title" id="stepsNowTitle">{steps[0].title}</span>
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
