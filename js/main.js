/* =========================================================
   Kayumba Omari · Portfolio
   ========================================================= */
(() => {
  const body = document.body;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

  /* ---------- Split text into word spans ---------- */
  function splitWords(el, { accentFrom = Infinity } = {}) {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.className = "w" + (i >= words.length - accentFrom ? " w--accent" : "");
      span.style.setProperty("--i", i);
      span.textContent = word;
      el.append(span, i < words.length - 1 ? " " : "");
    });
    return el.querySelectorAll(".w");
  }

  /* =========================================================
     1. HERO INTRO TIMELINE (reproduces the reference video)
        p1  window fades in, card carousel slides
        p2  carousel settles, main card grows, "hello" cursor arrives
        p3  portrait reveals inside the main card
        p4  light beam, stage rises, role cursor flies in
        p5  headline words appear (grey -> white)
        p6  nav, subtitle, CTAs, marquee
     ========================================================= */
  const stage = document.getElementById("stage");
  const heroTitle = document.getElementById("heroTitle");
  splitWords(heroTitle, { accentFrom: 4 });

  const phases = [
    ["p1", 80],
    ["p2", 1150],
    ["p3", 2050],
    ["p4", 3300],
    ["p5", 3850],
    ["p6", 4700],
  ];
  const timers = [];

  function finishIntro() {
    timers.forEach(clearTimeout);
    phases.forEach(([cls]) => body.classList.add(cls));
    body.classList.remove("is-intro");
  }

  function startIntro() {
    // Centre the stage vertically while the rest of the hero is still hidden.
    const r = stage.getBoundingClientRect();
    const offset = innerHeight / 2 - (r.top + r.height / 2);
    stage.style.setProperty("--intro-y", `${Math.max(0, offset)}px`);

    phases.forEach(([cls, t]) => timers.push(setTimeout(() => body.classList.add(cls), t)));
    timers.push(setTimeout(() => body.classList.remove("is-intro"), 4700));

    // Let impatient visitors skip.
    const skip = () => {
      finishIntro();
      removeEventListener("wheel", skip);
      removeEventListener("keydown", skip);
      removeEventListener("touchstart", skip);
    };
    setTimeout(() => {
      addEventListener("wheel", skip, { once: true, passive: true });
      addEventListener("keydown", skip, { once: true });
      addEventListener("touchstart", skip, { once: true, passive: true });
    }, 600);
  }

  if (reduceMotion || (location.hash && location.hash !== "#accueil")) finishIntro();
  else startIntro();

  /* =========================================================
     2. DUST PARTICLES IN THE LIGHT BEAM
     ========================================================= */
  const dust = document.getElementById("dust");
  if (dust && !reduceMotion) {
    const ctx = dust.getContext("2d");
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w, h, particles, running = false;

    const coneHalf = (y) => (0.1 + 0.4 * (y / h)) * w;
    const spawn = (anywhere) => {
      const y = anywhere ? Math.random() * h * 0.85 : -5;
      return {
        y,
        x: w / 2 + (Math.random() * 2 - 1) * coneHalf(Math.max(y, 0)),
        r: Math.random() * 1.3 + 0.3,
        vy: Math.random() * 0.18 + 0.04,
        vx: (Math.random() - 0.5) * 0.12,
        t: Math.random() * Math.PI * 2,
      };
    };

    function resize() {
      w = dust.offsetWidth;
      h = dust.offsetHeight;
      dust.width = w * dpr;
      dust.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: 80 }, () => spawn(true));
    }

    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx + Math.sin((p.t += 0.01)) * 0.08;
        if (p.y > h * 0.85) Object.assign(p, spawn(false));
        const a = (1 - p.y / (h * 0.85)) * (0.45 + 0.4 * Math.sin(p.t * 3));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${clamp(a)})`;
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }

    resize();
    addEventListener("resize", resize);
    new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      if (running) requestAnimationFrame(frame);
    }).observe(document.querySelector(".hero"));
  }

  /* =========================================================
     3. HERO PARALLAX (cursor tags + window tilt)
     ========================================================= */
  if (finePointer && !reduceMotion) {
    const hero = document.querySelector(".hero");
    const tags = hero.querySelectorAll("[data-depth]");
    const win = hero.querySelector(".window");
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;

    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      tags.forEach((t) => {
        const d = +t.dataset.depth;
        t.style.transform = `translate(${cx * d}px, ${cy * d}px)`;
      });
      win.style.transform = `perspective(900px) rotateY(${cx * 6}deg) rotateX(${-cy * 6}deg)`;
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(loop) : 0;
    };

    hero.addEventListener("pointermove", (e) => {
      tx = e.clientX / innerWidth - 0.5;
      ty = e.clientY / innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    hero.addEventListener("pointerleave", () => {
      tx = ty = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    });
  }

  /* =========================================================
     4. MARQUEES (seamless loop)
     ========================================================= */
  document.querySelectorAll("[data-marquee]").forEach((track) => {
    const original = track.innerHTML;
    while (track.scrollWidth < innerWidth * 1.2) track.innerHTML += original;
    track.innerHTML += track.innerHTML;
    track.querySelectorAll("span").forEach((s, i) => i >= track.children.length / 2 && s.setAttribute("aria-hidden", "true"));
    track.style.setProperty("--dur", `${track.scrollWidth / 2 / 45}s`);
  });

  /* =========================================================
     5. SCROLL REVEALS + COUNTERS + TYPEWRITER
     ========================================================= */
  document.querySelectorAll(".pills li").forEach((li, i) => li.style.setProperty("--i", i));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        e.target.querySelectorAll("[data-count]").forEach(countUp);
        revealObserver.unobserve(e.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

  function countUp(el) {
    const target = +el.dataset.count;
    if (reduceMotion) return (el.textContent = target.toLocaleString("fr-FR"));
    const start = performance.now();
    const dur = target > 100 ? 1800 : 1100;
    const tick = (now) => {
      const p = clamp((now - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString("fr-FR");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const typewriter = document.getElementById("typewriter");
  if (typewriter) {
    const text = typewriter.dataset.text;
    new IntersectionObserver(([e], obs) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      if (reduceMotion) return (typewriter.textContent = text);
      let i = 0;
      const type = () => {
        typewriter.textContent = text.slice(0, ++i);
        if (i < text.length) setTimeout(type, text[i - 1] === "." ? 380 : 26);
      };
      setTimeout(type, 500);
    }, { threshold: 0.5 }).observe(typewriter);
  }

  /* =========================================================
     6. SCROLL-DRIVEN: about words, process line, nav state
     ========================================================= */
  const aboutText = document.getElementById("aboutText");
  const aboutWords = splitWords(aboutText);
  const steps = document.getElementById("steps");
  const stepEls = steps.querySelectorAll(".step");
  const nav = document.getElementById("nav");
  const navLinks = [...document.querySelectorAll(".nav__links a")];
  const navTargets = navLinks.map((a) => document.querySelector(a.getAttribute("href")));

  function onScroll() {
    const vh = innerHeight;

    // About: words light up as you read.
    const ar = aboutText.getBoundingClientRect();
    const ap = clamp((vh * 0.85 - ar.top) / (ar.height + vh * 0.3));
    const lit = Math.floor(ap * aboutWords.length);
    aboutWords.forEach((w, i) => w.classList.toggle("is-lit", i < lit));

    // Process: line fills, steps light up in sequence.
    const sr = steps.getBoundingClientRect();
    const sp = clamp((vh * 0.78 - sr.top) / (sr.height + vh * 0.15));
    steps.style.setProperty("--progress", sp.toFixed(3));
    stepEls.forEach((s, i) => s.classList.toggle("is-lit", sp >= i / stepEls.length + 0.04));

    // Nav: highlight current section.
    nav.classList.toggle("is-scrolled", scrollY > 40);
    let current = 0;
    navTargets.forEach((t, i) => t && t.getBoundingClientRect().top < vh * 0.45 && (current = i));
    navLinks.forEach((a, i) => a.classList.toggle("is-active", i === current));
  }

  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  /* =========================================================
     7. CARDS: pointer glow + magnetic buttons
     ========================================================= */
  document.querySelectorAll("[data-glow]").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  if (finePointer && !reduceMotion) {
    document.querySelectorAll("[data-magnetic]").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`;
      });
      btn.addEventListener("pointerleave", () => (btn.style.transform = ""));
    });
  }

  /* =========================================================
     8. NARRAT: 13 modules lighting up
     ========================================================= */
  const modules = document.getElementById("modules");
  if (modules) {
    const cells = Array.from({ length: 13 }, () => modules.appendChild(document.createElement("i")));
    let n = 0;
    const step = () => {
      cells.forEach((c) => c.classList.remove("is-accent"));
      const c = cells[n % cells.length];
      c.classList.toggle("is-on");
      cells[(n * 5 + 3) % cells.length].classList.add("is-accent");
      n++;
    };
    if (!reduceMotion) setInterval(step, 420);
    else cells.slice(0, 7).forEach((c) => c.classList.add("is-on"));
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
