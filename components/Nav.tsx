"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const targets = navLinks.map((l) => document.querySelector(l.href));
    const onScroll = () => {
      setScrolled(scrollY > 40);
      let current = 0;
      targets.forEach((t, i) => {
        if (t && t.getBoundingClientRect().top < innerHeight * 0.45) current = i;
      });
      setActive(current);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className={scrolled ? "nav is-scrolled" : "nav"}>
      <a href="#accueil" className="nav__logo" aria-label="Accueil">KO</a>
      <nav className="nav__links" aria-label="Navigation principale">
        {navLinks.map((l, i) => (
          <a key={l.href} href={l.href} className={i === active ? "is-active" : undefined}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
