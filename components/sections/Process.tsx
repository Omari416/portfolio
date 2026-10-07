import { steps } from "@/lib/content";
import Label from "../Label";

export default function Process() {
  return (
    <section className="section process" id="process">
      <Label>De l&apos;idée au produit déployé</Label>
      <h2 className="section__title" data-reveal>
        Un seul interlocuteur,
        <br />
        <em>du cadrage à la prod.</em>
      </h2>
      <div className="steps" id="steps">
        <div className="steps__line"><i /></div>
        {steps.map((s, i) => (
          <article className="step" key={s.title}>
            <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
