import { existsSync } from "node:fs";
import path from "node:path";
import Hero from "@/components/Hero";
import IntroShell from "@/components/IntroShell";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import ScrollEffects from "@/components/ScrollEffects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Novel from "@/components/sections/Novel";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import Trainer from "@/components/sections/Trainer";
import { skills } from "@/lib/content";

// Portrait at public/profile.jpg (600px wide is plenty); the "KO" monogram shows if it is missing.
const hasPhoto = existsSync(path.join(process.cwd(), "public", "profile.jpg"));

export default function Home() {
  return (
    <IntroShell>
      <Nav hasPhoto={hasPhoto} />
      <main>
        <Hero hasPhoto={hasPhoto} />
        <Marquee items={skills} label="Compétences" />
        <About hasPhoto={hasPhoto} />
        <Process />
        <Projects />
        <Trainer />
        <Stack />
        <Novel />
        <Contact />
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Kayumba Omari</span>
        <span>Ingénieur Full Stack web &amp; mobile · Tunis</span>
      </footer>
      <ScrollEffects />
    </IntroShell>
  );
}
