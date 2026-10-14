import Label from "../Label";
import ProjectGrid from "../ProjectGrid";

export default function Projects() {
  return (
    <section className="section projects" id="projets">
      <Label>Ce que je construis</Label>
      <h2 className="section__title" data-reveal>
        Des produits qui partent
        <br />
        <em>d&apos;un besoin concret.</em>
      </h2>
      <ProjectGrid />
    </section>
  );
}
