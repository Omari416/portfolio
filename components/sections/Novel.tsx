import { novel } from "@/lib/content";
import Label from "../Label";
import Typewriter from "../Typewriter";

export default function Novel() {
  return (
    <section className="section novel" id="roman">
      <Label>En dehors du code</Label>
      <blockquote className="novel__quote" data-reveal>
        <Typewriter text={novel} />
      </blockquote>
    </section>
  );
}
