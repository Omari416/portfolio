import { about, facts } from "@/lib/content";
import Label from "../Label";

export default function About() {
  const words = about.split(" ");
  return (
    <section className="section about" id="apropos">
      <Label>À propos</Label>
      <p className="about__text" id="aboutText">
        {words.map((w, i) => (
          <span key={i}>
            <span className="w">{w}</span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </p>
      <ul className="facts" data-reveal>
        {facts.map((f) => (
          <li key={f.title}>
            <strong>{f.title}</strong>
            <span>{f.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
