"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { trainerVideo } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/motion";
import { useMorphDialog } from "./useMorphDialog";

/*
  Progressive loading, cheapest first:
  1. a ~600-byte blurred placeholder inlined in the HTML (instant),
  2. the poster image, faded in once decoded,
  3. a 10 s muted teaser loop, fetched only while the card is on screen
     (skipped with Save-Data or reduced motion),
  4. the full video, only after a click. Both renditions are encoded with
     faststart, so playback starts at once and only what is watched downloads.
*/
const DIR = "/formations/presentation";

type NetworkInfo = { saveData?: boolean; effectiveType?: string };
const network = () => (navigator as Navigator & { connection?: NetworkInfo }).connection;

// 1080p only for wide, dense screens on a decent connection; 720p otherwise.
function pickRendition() {
  const c = network();
  const slow = c?.saveData || /(^|-)(2g|3g)$/.test(c?.effectiveType ?? "");
  return !slow && screen.width * devicePixelRatio >= 1600 ? 1080 : 720;
}

export default function TrainerVideo({ lqip }: { lqip: string }) {
  const [posterReady, setPosterReady] = useState(false);
  const [teaserPlaying, setTeaserPlaying] = useState(false);
  const [rendition, setRendition] = useState(720);
  const teaser = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);

  const { open, cards, panel, scrim, show, close, dialogProps } = useMorphDialog(
    1,
    (p, delay) => {
      teaser.current?.pause();
      const v = p.querySelector<HTMLVideoElement>("video");
      setTimeout(() => v?.play().catch(() => {}), delay);
    },
    (p) => p.querySelector<HTMLVideoElement>("video")?.pause()
  );

  // Teaser: load and play only while visible.
  useEffect(() => {
    const v = teaser.current;
    if (!v || prefersReducedMotion() || network()?.saveData) return;
    const io = new IntersectionObserver(
      ([e]) => {
        inView.current = e.isIntersecting;
        if (e.isIntersecting) {
          if (!v.src) v.src = `${DIR}-teaser.mp4`;
          v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Resume the teaser once the dialog is closed, if the card is still on screen.
  useEffect(() => {
    if (open === null && inView.current && teaser.current?.src) teaser.current.play().catch(() => {});
  }, [open]);

  const openVideo = () => {
    setRendition(pickRendition());
    show(0);
  };

  const ratio = { aspectRatio: trainerVideo.ratio } as CSSProperties;

  return (
    <>
      <figure
        className="tvideo"
        data-glow
        ref={(el) => {
          cards.current[0] = el;
        }}
      >
        <div className="tvideo__media" style={ratio}>
          <div className="tvideo__lqip" style={{ backgroundImage: `url(${lqip})` }} aria-hidden="true" />
          <Image
            className={posterReady ? "tvideo__poster is-ready" : "tvideo__poster"}
            src={`${DIR}-poster.jpg`}
            alt=""
            fill
            sizes="(max-width: 1160px) 100vw, 1112px"
            onLoad={() => setPosterReady(true)}
          />
          <video
            ref={teaser}
            className={teaserPlaying ? "tvideo__teaser is-playing" : "tvideo__teaser"}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onPlaying={() => setTeaserPlaying(true)}
          />
          <span className="lesson__live" aria-hidden="true"><b />Sessions réelles</span>
          <button className="tvideo__play" type="button" data-open aria-haspopup="dialog" onClick={openVideo}>
            <span className="tvideo__ring" aria-hidden="true"><i /></span>
            <span className="tvideo__label">
              Voir la vidéo
              <small>{trainerVideo.duration}</small>
            </span>
          </button>
        </div>
        <figcaption className="tvideo__cap">
          <b>{trainerVideo.title}</b>
          <span>{trainerVideo.summary}</span>
        </figcaption>
      </figure>

      <dialog {...dialogProps} className="case" aria-labelledby="tvideo-title">
        <div className="case__scrim" ref={scrim} onClick={close} />
        <div className="case__panel case__panel--wide" ref={panel}>
          {open !== null && (
            <div className="case__content">
              <div className="project__chrome case__chrome">
                <i /><i /><i /><span>Formations · {trainerVideo.duration}</span>
                <button className="case__close" type="button" onClick={close} aria-label="Fermer la vidéo">
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="lesson-player" style={ratio} data-stagger>
                <video
                  src={`${DIR}-${rendition}.mp4`}
                  poster={`${DIR}-poster.jpg`}
                  controls
                  playsInline
                  preload="auto"
                />
              </div>
              <div className="case__body">
                <header className="case__head" data-stagger>
                  <p className="project__kind">Formateur</p>
                  <h3 id="tvideo-title">{trainerVideo.title}</h3>
                  <p className="case__desc">{trainerVideo.summary}</p>
                </header>
                <div className="case__foot" data-stagger>
                  <span className="lesson__note">Visages des participants floutés.</span>
                  <a
                    className="case__link"
                    href="#contact"
                    onClick={async (e) => {
                      // Scrolling is locked while the dialog is open: close first, then go.
                      e.preventDefault();
                      await close();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Organiser une formation
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
