"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/*
  Container transform shared by the project and lesson dialogs: the panel is
  laid out at its final size, clipped down to the clicked card's rect, then
  un-clipped to full size. Content tagged [data-stagger] fades in once the
  surface has grown. Closing runs it backwards.
*/
const EASE_IO = "cubic-bezier(.7, 0, .2, 1)";
const EASE_OUT = "cubic-bezier(.16, 1, .3, 1)";
const FULL = "inset(0px 0px 0px 0px round 24px)";
const CONTENT_DELAY = 380;

const clipTo = (card: DOMRect, panel: DOMRect) =>
  `inset(${card.top - panel.top}px ${panel.right - card.right}px ${panel.bottom - card.bottom}px ${card.left - panel.left}px round 22px)`;

function lockScroll(on: boolean) {
  const root = document.documentElement;
  document.body.style.paddingRight = on ? `${innerWidth - root.clientWidth}px` : "";
  root.style.overflow = on ? "hidden" : "";
}

function staggerIn(panel: HTMLElement, delay: number) {
  panel.querySelectorAll("[data-stagger]").forEach((el, k) =>
    el.animate(
      [{ opacity: 0, transform: "translateY(26px)" }, { opacity: 1, transform: "none" }],
      { duration: 800, delay: delay + k * 70, easing: EASE_OUT, fill: "backwards" }
    )
  );
}

function fadeOut(panel: HTMLElement) {
  return Promise.all(
    [...panel.querySelectorAll("[data-stagger]")].map(
      (el) => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: "ease", fill: "forwards" }).finished
    )
  );
}

/**
 * @param count   number of cards the dialog can page through
 * @param onShown called once the panel content for the current item is in place,
 *                with the delay (ms) before that content starts appearing
 */
export function useMorphDialog(count: number, onShown?: (panel: HTMLElement, delay: number) => void) {
  const [open, setOpen] = useState<number | null>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const mode = useRef<"opening" | "switching" | null>(null);
  const busy = useRef(false);
  const shown = useRef(onShown);
  shown.current = onShown;

  useLayoutEffect(() => {
    const d = dialog.current;
    const p = panel.current;
    if (open === null || !d || !p || !mode.current) return;
    const how = mode.current;
    mode.current = null;
    const reduced = prefersReducedMotion();

    // Toggle classes by hand: React owns className, ScrollEffects adds `is-in`.
    cards.current.forEach((c, i) => c?.classList.toggle("is-source", i === open));

    if (how === "switching") {
      p.scrollTop = 0;
      if (!reduced) staggerIn(p, 0);
      shown.current?.(p, 0);
      busy.current = false;
      return;
    }

    lockScroll(true);
    d.showModal();
    p.scrollTop = 0;
    if (reduced) {
      shown.current?.(p, 0);
      busy.current = false;
      return;
    }
    const card = cards.current[open]!.getBoundingClientRect();
    const grow = p.animate([{ clipPath: clipTo(card, p.getBoundingClientRect()) }, { clipPath: FULL }], {
      duration: 760,
      easing: EASE_IO,
    });
    scrim.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 520, easing: "ease" });
    staggerIn(p, CONTENT_DELAY);
    shown.current?.(p, CONTENT_DELAY);
    grow.finished.then(() => (busy.current = false), () => (busy.current = false));
  }, [open]);

  const show = (i: number) => {
    if (busy.current) return;
    busy.current = true;
    mode.current = "opening";
    setOpen(i);
  };

  const go = async (step: number) => {
    if (open === null || busy.current || count < 2) return;
    busy.current = true;
    if (panel.current && !prefersReducedMotion()) await fadeOut(panel.current);
    mode.current = "switching";
    setOpen((open + step + count) % count);
  };

  const close = async () => {
    const d = dialog.current;
    const p = panel.current;
    if (open === null || busy.current || !d || !p) return;
    busy.current = true;
    const card = cards.current[open]!;

    if (!prefersReducedMotion()) {
      const r = card.getBoundingClientRect();
      const onScreen = r.bottom > 0 && r.top < innerHeight;
      fadeOut(p);
      scrim.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 620, easing: "ease", fill: "forwards" });
      const shrink = onScreen
        ? p.animate([{ clipPath: FULL }, { clipPath: clipTo(r, p.getBoundingClientRect()) }], {
            duration: 620,
            delay: 80,
            easing: EASE_IO,
            fill: "forwards",
          })
        : p.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "scale(.97)" }], {
            duration: 320,
            easing: "ease",
            fill: "forwards",
          });
      await shrink.finished;
    }

    card.classList.remove("is-source");
    d.close();
    lockScroll(false);
    [p, scrim.current].forEach((el) => el?.getAnimations({ subtree: true }).forEach((a) => a.cancel()));
    card.querySelector<HTMLButtonElement>("[data-open]")?.focus({ preventScroll: true });
    busy.current = false;
    setOpen(null);
  };

  const dialogProps = {
    ref: dialog,
    onCancel: (e: React.SyntheticEvent) => {
      e.preventDefault();
      close();
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    },
  };

  return { open, cards, panel, scrim, show, go, close, dialogProps };
}
