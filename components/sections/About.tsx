import Image from "next/image";
import { about, facts } from "@/lib/content";
import Label from "../Label";

export default function About({ hasPhoto }: { hasPhoto: boolean }) {
  const words = about.split(" ");
  return (
    <section className="section about" id="apropos">
      <Label>À propos</Label>
      <div className="about__grid">
        <div>
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
        </div>

        {/* Turns from black and white to colour as the text lights up (--about-p, set by ScrollEffects). */}
        {hasPhoto && (
          <figure className="about__photo" data-reveal>
            <div className="about__frame">
              <Image src="/profile-hd.jpg" alt="Kayumba Omari" fill sizes="(max-width: 960px) 90vw, 440px" />
            </div>
            <figcaption>
              <b>Kayumba Omari</b>
              <span>Ingénieur Full Stack · Tunis</span>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
