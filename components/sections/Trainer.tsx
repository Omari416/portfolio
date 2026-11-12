import { existsSync } from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import { lessons, trainings } from "@/lib/content";
import ClassroomGrid from "../ClassroomGrid";
import Counter from "../Counter";
import Label from "../Label";

const hasFile = (id: string) => existsSync(path.join(process.cwd(), "public", "formations", `${id}.mp4`));

export default function Trainer() {
  const items = lessons.map((l) => ({ ...l, hasVideo: hasFile(l.id) }));

  return (
    <section className="section trainer" id="formateur">
      <Label>Formateur</Label>
      <h2 className="section__title" data-reveal>
        Transmettre fait partie
        <br />
        <em>de mon métier.</em>
      </h2>
      <p className="classroom__intro" data-reveal>
        Des extraits de vraies sessions, enregistrées en visio avec mes apprenants. Pas de mise en scène :
        un cas concret, de la pratique, et des corrections en direct.
      </p>

      <div className="classroom" data-reveal>
        <ClassroomGrid items={items} />
      </div>

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
