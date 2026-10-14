"use client";

import { useEffect } from "react";
import { clamp, hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Page-wide effects on server-rendered markup:
 * scroll reveals, about words lighting up, process line, card glow, magnetic buttons.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    // Reveal on scroll.
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }),
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // Scroll-driven: about words, process steps.
    const aboutText = document.getElementById("aboutText");
    const aboutWords = aboutText ? [...aboutText.querySelectorAll(".w")] : [];
    const steps = document.getElementById("steps");
    const stepEls = steps ? [...steps.querySelectorAll<HTMLElement>(".step")] : [];
    const stepsNow = document.getElementById("stepsNow");
    const stepsNowTitle = document.getElementById("stepsNowTitle");
    const phaseEls = [...document.querySelectorAll<HTMLElement>("[data-phase]")];

    const onScroll = () => {
      const vh = innerHeight;
      if (aboutText) {
        const r = aboutText.getBoundingClientRect();
        const lit = Math.floor(clamp((vh * 0.85 - r.top) / (r.height + vh * 0.3)) * aboutWords.length);
        aboutWords.forEach((w, i) => w.classList.toggle("is-lit", i < lit));
      }
      if (steps) {
        // A step lights up once its top crosses 60% of the viewport.
        const mark = vh * 0.6;
        const r = steps.getBoundingClientRect();
        steps.style.setProperty("--progress", clamp((mark - r.top) / r.height).toFixed(3));
        let current = -1;
        stepEls.forEach((s, i) => {
          const lit = s.getBoundingClientRect().top < mark;
          s.classList.toggle("is-lit", lit);
          if (lit) current = i;
        });
        stepEls.forEach((s, i) => s.classList.toggle("is-current", i === current));
        const shown = Math.max(current, 0);
        if (stepsNow) stepsNow.textContent = String(shown + 1).padStart(2, "0");
        if (stepsNowTitle) stepsNowTitle.textContent = stepEls[shown]?.dataset.title ?? "";
        phaseEls.forEach((ph, i) => {
          const from = Number(ph.dataset.phase);
          const next = phaseEls[i + 1] ? Number(phaseEls[i + 1].dataset.phase) : Infinity;
          ph.classList.toggle("is-lit", current >= from);
          ph.classList.toggle("is-current", current >= from && current < next);
        });
      }
    };
    let ticking = false;
    const onScrollRaf = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { onScroll(); ticking = false; });
    };
    onScroll();
    addEventListener("scroll", onScrollRaf, { passive: true });
    addEventListener("resize", onScroll);
    cleanups.push(() => {
      removeEventListener("scroll", onScrollRaf);
      removeEventListener("resize", onScroll);
    });

    // Card glow follows the pointer.
    document.querySelectorAll<HTMLElement>("[data-glow]").forEach((card) => {
      const move = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      card.addEventListener("pointermove", move);
      cleanups.push(() => card.removeEventListener("pointermove", move));
    });

    // Magnetic buttons.
    if (hasFinePointer() && !prefersReducedMotion()) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((btn) => {
        const move = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          btn.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`;
        };
        const leave = () => (btn.style.transform = "");
        btn.addEventListener("pointermove", move);
        btn.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          btn.removeEventListener("pointermove", move);
          btn.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
