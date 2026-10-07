"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { hero } from "@/lib/content";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import CursorIcon from "./CursorIcon";
import Dust from "./Dust";

const SIDE_CARDS = 4;

export default function Hero({ hasPhoto }: { hasPhoto: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<HTMLDivElement>(null);

  // Parallax: cursor tags drift with the pointer, the window tilts.
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl || !hasFinePointer() || prefersReducedMotion()) return;

    const tags = [
      { el: roleRef.current, depth: 18 },
      { el: helloRef.current, depth: -14 },
    ];
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;

    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      tags.forEach(({ el, depth }) => {
        if (el) el.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
      });
      if (windowRef.current) {
        windowRef.current.style.transform = `perspective(900px) rotateY(${cx * 6}deg) rotateX(${-cy * 6}deg)`;
      }
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX / innerWidth - 0.5;
      ty = e.clientY / innerHeight - 0.5;
      kick();
    };
    const onLeave = () => { tx = ty = 0; kick(); };

    heroEl.addEventListener("pointermove", onMove);
    heroEl.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      heroEl.removeEventListener("pointermove", onMove);
      heroEl.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const words = hero.title.split(" ");
  const sideCards = Array.from({ length: SIDE_CARDS }, (_, i) => (
    <div className="card" key={i}><b /></div>
  ));

  return (
    <section className="hero" id="accueil" ref={heroRef}>
      <div className="beam" aria-hidden="true">
        <div className="beam__light" />
        <Dust />
      </div>

      <div className="stage" id="stage">
        <div className="window" ref={windowRef} aria-hidden="true">
          <div className="window__bar"><i /><i /><i /></div>
          <div className="window__view">
            <div className="track">
              {sideCards}
              <div className="card card--main">
                <b />
                <div className="card__photo">
                  <span className="card__mono">KO</span>
                  {hasPhoto && <Image src="/omari.jpg" alt="" fill sizes="96px" priority />}
                </div>
              </div>
              {sideCards}
            </div>
          </div>
        </div>

        <div className="tag tag--role" ref={roleRef}>
          <CursorIcon />
          <span>{hero.role}</span>
        </div>
        <div className="tag tag--hello" ref={helloRef}>
          <CursorIcon />
          <span>{hero.hello}</span>
        </div>
      </div>

      <div className="hero__copy">
        <h1 className="hero__title">
          {words.map((word, i) => (
            <span key={i}>
              <span
                className={i >= words.length - hero.accentWords ? "w w--accent" : "w"}
                style={{ "--i": i } as CSSProperties}
              >
                {word}
              </span>
              {i < words.length - 1 && " "}
            </span>
          ))}
        </h1>
        <p className="hero__sub">
          En tant qu&apos;<span className="chip">Ingénieur Full Stack</span>, je construis des produits
          pensés pour les réalités de l&apos;Afrique francophone, de l&apos;idée au produit déployé.
        </p>
        <div className="hero__cta">
          <a href="#contact" className="btn btn--light" data-magnetic>Écrivons-nous</a>
          <a href="#projets" className="btn btn--dark" data-magnetic>Voir mes projets</a>
        </div>
      </div>
    </section>
  );
}
