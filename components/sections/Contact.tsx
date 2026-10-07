import { contact } from "@/lib/content";

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="beam beam--contact" aria-hidden="true"><div className="beam__light" /></div>
      <p className="contact__kicker" data-reveal>Un projet, une formation, une collaboration ?</p>
      <h2 className="contact__title" data-reveal>Écrivons-nous.</h2>
      <div className="hero__cta" data-reveal>
        <a href={`mailto:${contact.email}`} className="btn btn--light" data-magnetic>{contact.email}</a>
        <a href={contact.linkedin} className="btn btn--dark" target="_blank" rel="noopener" data-magnetic>
          LinkedIn
        </a>
      </div>
    </section>
  );
}
