import type { CSSProperties } from "react";
import { trainings } from "@/lib/content";
import Counter from "../Counter";
import Label from "../Label";

export default function Trainer() {
  return (
    <section className="section trainer" id="formateur">
      <Label>Formateur</Label>
      <h2 className="section__title" data-reveal>
        Transmettre fait partie
        <br />
        <em>de mon métier.</em>
      </h2>

      <div className="trainer__grid">
        <article className="bootcamp" data-reveal data-glow>
          <p className="project__kind">Bootcamp</p>
          <div className="bootcamp__big">
            <Counter value={4} />
            <small>mois</small>
          </div>
          <h3>Bootcamp MERN</h3>
          <p>MongoDB, Express, React et Node, avec les outils d&apos;IA intégrés au quotidien du développeur.</p>
          <div className="bootcamp__bar"><i /></div>
        </article>
        <div className="courses" data-reveal>
          <p className="courses__intro">Je conçois aussi des formations complètes :</p>
          <ul className="pills">
            {trainings.map((t, i) => (
              <li key={t} style={{ "--i": i } as CSSProperties}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
