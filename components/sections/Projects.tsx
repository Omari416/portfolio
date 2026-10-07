import type { CSSProperties } from "react";
import { projects, type ProjectVisual } from "@/lib/content";
import Counter from "../Counter";
import Label from "../Label";
import NarratModules from "../NarratModules";

function Visual({ type }: { type: ProjectVisual }) {
  switch (type) {
    case "siye":
      return (
        <div className="project__visual visual-siye" aria-hidden="true">
          <div className="phone">
            <div className="phone__notch" />
            <div className="phone__row"><b /><span /></div>
            <div className="phone__row"><b /><span /></div>
            <div className="phone__pay">Payer 25 000 FC</div>
          </div>
          <span className="pay pay--om">Orange Money</span>
          <span className="pay pay--mp">M-Pesa</span>
          <span className="pay pay--am">Airtel Money</span>
        </div>
      );
    case "kontakly":
      return (
        <div className="project__visual visual-kontakly" aria-hidden="true">
          <div className="mail">
            <div className="mail__head"><span className="spark">✦</span> Email généré par IA</div>
            {["92%", "78%", "85%", "54%"].map((w) => (
              <div className="mail__line" key={w} style={{ "--w": w } as CSSProperties} />
            ))}
          </div>
          <div className="leads">
            <span>Leads trouvés</span>
            <strong><Counter value={1284} /></strong>
          </div>
        </div>
      );
    case "narrat":
      return (
        <div className="project__visual visual-narrat" aria-hidden="true">
          <NarratModules />
          <div className="narrat-stats">
            <span><strong>13</strong> modules</span>
            <span><strong>60+</strong> modèles</span>
            <span><strong>29</strong> écrans</span>
          </div>
        </div>
      );
    case "hub":
      return (
        <div className="project__visual visual-hub" aria-hidden="true">
          {[
            ["Bases du web", "100%"],
            ["JavaScript", "72%"],
            ["IA & prompts", "45%"],
            ["Mobile", "18%"],
          ].map(([name, p]) => (
            <div className="course" key={name}>
              <span>{name}</span>
              <i style={{ "--p": p } as CSSProperties} />
            </div>
          ))}
        </div>
      );
  }
}

export default function Projects() {
  return (
    <section className="section projects" id="projets">
      <Label>Ce que je construis</Label>
      <h2 className="section__title" data-reveal>
        Des produits qui partent
        <br />
        <em>d&apos;un besoin concret.</em>
      </h2>

      <div className="grid">
        {projects.map((p) => (
          <article className="project" data-reveal data-glow key={p.name}>
            <div className="project__chrome"><i /><i /><i /><span>{p.url}</span></div>
            <Visual type={p.visual} />
            <div className="project__body">
              <p className="project__kind">{p.kind}</p>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <ul className="stack">
                {p.stack.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
