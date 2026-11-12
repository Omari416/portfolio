"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { EASE_IO, EASE_OUT, lockScroll } from "./useMorphDialog";

/*
  Hero portrait that opens full size. The large photo is laid out at its final
  place, then scaled and clipped back onto the small card (which crops it with
  object-position 50% 22%), and released: it grows out of the card and turns
  from black and white to colour on the way.
*/
const FOCUS_Y = 0.22; // keep in sync with `.card__photo img { object-position }`
const RATIO = 2448 / 3696;

function fromCard(card: DOMRect, big: DOMRect) {
  const s = card.width / big.width;
  const excess = big.height * s - card.height; // vertical overflow once scaled to the card's width
  const top = (excess * FOCUS_Y) / s;
  const bottom = (excess * (1 - FOCUS_Y)) / s;
  return {
    transform: `translate(${card.left - big.left}px, ${card.top - excess * FOCUS_Y - big.top}px) scale(${s})`,
    clipPath: `inset(${top}px 0px ${bottom}px 0px round ${14 / s}px)`,
    filter: "grayscale(1) contrast(1.05)",
  };
}
const AT_REST = { transform: "none", clipPath: "inset(0px 0px 0px 0px round 20px)", filter: "grayscale(0) contrast(1)" };

export default function PortraitZoom({ hasPhoto }: { hasPhoto: boolean }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLElement>(null);
  const busy = useRef(false);

  useLayoutEffect(() => {
    const d = dialog.current;
    const p = photo.current;
    const b = button.current;
    if (!open || !d || !p || !b) return;
    lockScroll(true);
    d.showModal();
    if (prefersReducedMotion()) {
      busy.current = false;
      return;
    }
    b.style.visibility = "hidden";
    const grow = p.animate([fromCard(b.getBoundingClientRect(), p.getBoundingClientRect()), AT_REST], {
      duration: 900,
      easing: EASE_IO,
    });
    scrim.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, easing: "ease" });
    caption.current?.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], {
      duration: 700,
      delay: 650,
      easing: EASE_OUT,
      fill: "backwards",
    });
    grow.finished.then(() => (busy.current = false), () => (busy.current = false));
  }, [open]);

  const show = () => {
    if (!hasPhoto || busy.current) return;
    busy.current = true;
    setOpen(true);
  };

  const close = async () => {
    const d = dialog.current;
    const p = photo.current;
    const b = button.current;
    if (!open || busy.current || !d || !p || !b) return;
    busy.current = true;
    if (!prefersReducedMotion()) {
      caption.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: "forwards" });
      scrim.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, easing: "ease", fill: "forwards" });
      await p.animate([AT_REST, fromCard(b.getBoundingClientRect(), p.getBoundingClientRect())], {
        duration: 750,
        easing: EASE_IO,
        fill: "forwards",
      }).finished;
    }
    b.style.visibility = "";
    d.close();
    lockScroll(false);
    b.focus({ preventScroll: true });
    busy.current = false;
    setOpen(false);
  };

  // Warm the large file up as soon as the visitor shows intent.
  const preload = () => {
    if (hasPhoto) new window.Image().src = "/profile-hd.jpg";
  };

  return (
    <>
      <button
        ref={button}
        type="button"
        className="card__photo"
        aria-label="Voir la photo de Kayumba Omari en grand"
        aria-haspopup="dialog"
        disabled={!hasPhoto}
        onClick={show}
        onPointerEnter={preload}
        onFocus={preload}
      >
        <span className="card__mono">KO</span>
        {hasPhoto && <Image src="/profile.jpg" alt="" fill sizes="96px" priority />}
      </button>

      {hasPhoto && (
        <dialog
          ref={dialog}
          className="portrait"
          aria-label="Photo de Kayumba Omari"
          onCancel={(e) => {
            e.preventDefault();
            close();
          }}
        >
          <div className="case__scrim" ref={scrim} onClick={close} />
          {open && (
            <figure className="portrait__fig">
              <div className="portrait__photo" ref={photo} style={{ aspectRatio: RATIO }} onClick={close}>
                {/* Plain img: the file is already sized for this view, no need for the optimizer round-trip. */}
                <img src="/profile-hd.jpg" alt="Kayumba Omari" />
              </div>
              <figcaption ref={caption} className="portrait__cap">
                <b>Kayumba Omari</b> · Ingénieur Full Stack · Tunis
              </figcaption>
            </figure>
          )}
          <button className="case__close portrait__close" type="button" onClick={close} aria-label="Fermer la photo">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </dialog>
      )}
    </>
  );
}
