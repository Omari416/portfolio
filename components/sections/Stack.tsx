import { dailyTools, stackRows } from "@/lib/content";
import Label from "../Label";
import Marquee from "../Marquee";

export default function Stack() {
  return (
    <>
      <section className="section stack-section" id="stack">
        <Label>Stack</Label>
        <h2 className="section__title" data-reveal>
          Les outils avec lesquels
          <br />
          <em>je livre.</em>
        </h2>
      </section>
      {stackRows.map((row, i) => (
        <Marquee key={i} items={row} big reverse={i % 2 === 1} />
      ))}
      <section className="section daily">
        <p className="daily__label" data-reveal>Au quotidien</p>
        <ul className="daily__list" data-reveal>
          {dailyTools.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </section>
    </>
  );
}
