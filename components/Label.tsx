import CursorIcon from "./CursorIcon";

/** Section label: a small pill with the same cursor as the hero tags. */
export default function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="label" data-reveal>
      <CursorIcon />
      <span>{children}</span>
    </div>
  );
}
