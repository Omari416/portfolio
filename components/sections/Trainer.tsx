import { existsSync } from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import { lessons, trainerStats, trainerVideo, trainings } from "@/lib/content";
import ClassroomGrid from "../ClassroomGrid";
import Counter from "../Counter";
import Label from "../Label";
import TrainerVideo from "../TrainerVideo";
import TrainingCarousel from "../TrainingCarousel";

const hasFile = (file: string) => existsSync(path.join(process.cwd(), "public", "formations", file));

export default function Trainer() {
  const items = lessons.map((l) => ({ ...l, hasVideo: hasFile(`${l.id}.mp4`) }));
  const hasPresentation = hasFile("presentation-720.mp4");

  return (
    <section className="section trainer" id="formateur">
      <Label>Formateur</Label>
      <h2 className="section__title" data-reveal>
        Transmettre fait partie
        <br />
        <em>de mon métier.</em>
      </h2>
      <p className="classroom__intro" data-reveal>
        Des sessions réelles, en visio, avec mes apprenants. Pas de mise en scène : un cas concret, de la pratique,
        et des corrections en direct.
      </p>

      <ul className="tstats" data-reveal>
        {trainerStats.map((s) => (
          <li key={s.label}>
            <strong>
              <Counter value={s.value} />
              {s.suffix && <em>{s.suffix}</em>}
            </strong>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>

      {hasPresentation && (
        <div className="tvideo-wrap" data-reveal>
          <TrainerVideo lqip={trainerVideo.lqip} />
        </div>
      )}

      {/* Short extracts by theme: shown once at least one extract file exists. */}
      {items.some((l) => l.hasVideo) && (
        <div className="classroom" data-reveal>
          <ClassroomGrid items={items} />
        </div>
      )}

      <div className="trainer__grid">
        <TrainingCarousel />
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
