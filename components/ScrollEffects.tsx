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
    const stepsNowPhase = document.getElementById("stepsNowPhase");
    const phaseEls = [...document.querySelectorAll<HTMLElement>("[data-phase]")];
    const stageArts = [...document.querySelectorAll<HTMLElement>("[data-art]")];
    const stageSegs = [...document.querySelectorAll<HTMLElement>("[data-seg]")];

    // Replace a label's text with a short rise-in, only when it actually changes.
    const swap = (el: HTMLElement | null, text: string) => {
      if (!el || el.textContent === text) return;
      el.textContent = text;
      if (!prefersReducedMotion())
        el.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], {
          duration: 450,
          easing: "cubic-bezier(.16, 1, .3, 1)",
        });
    };

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
          // Narrow screens: each step's own illustration plays once the step is reached.
          s.querySelector(".art")?.classList.toggle("is-active", lit);
          if (lit) current = i;
        });
        stepEls.forEach((s, i) => s.classList.toggle("is-current", i === current));
        const shown = Math.max(current, 0);
        swap(stepsNow, String(shown + 1).padStart(2, "0"));
        swap(stepsNowTitle, stepEls[shown]?.dataset.title ?? "");
        swap(stepsNowPhase, stepEls[shown]?.dataset.phaseName ?? "");
        stageArts.forEach((a, i) => a.classList.toggle("is-active", i === shown));
        stageSegs.forEach((g, i) => {
          g.classList.toggle("is-lit", i < shown);
          g.classList.toggle("is-current", i === shown);
        });
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

    // Subtle 3D tilt toward the pointer.
    if (hasFinePointer() && !prefersReducedMotion()) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 6}deg`);
          el.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -6}deg`);
        };
        const leave = () => {
          el.style.removeProperty("--rx");
          el.style.removeProperty("--ry");
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

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
