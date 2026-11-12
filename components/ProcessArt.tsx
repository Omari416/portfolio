import type { CSSProperties, ReactNode } from "react";

/*
  The six process illustrations (sources in public/process/*.svg), inlined so
  CSS can animate their parts. Classes, all driven by `.art.is-active`:
    d       stroke draws itself in (needs pathLength="1")
    f       fades / rises in
    glow    accent halo breathing
    march   dashed stroke flowing (--to: one dash period, negative)
  plus a few per-illustration loops (bob, lift, wave, travel, tick, led, flow).
  --d is the entrance delay, --t the loop offset.
  Every id is prefixed with `p` so several copies can live on the page.
*/

type V = CSSProperties & Record<`--${string}`, string | number>;
const at = (d: number, extra: V = {}): V => ({ "--d": `${d}s`, ...extra });
const L = { pathLength: 1 } as const;

function Svg({ p, children, defs }: { p: string; children: ReactNode; defs?: ReactNode }) {
  return (
    // `slice` fills taller frames by trimming the empty side margins (all drawings sit within x 78–575).
    <svg className="art__svg" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={`${p}-grid`} width="24" height="24" x="8" y="12" patternUnits="userSpaceOnUse">
          <path d="M0 0h24M0 0v24" stroke="#fff" strokeOpacity=".03" strokeWidth="1.5" />
        </pattern>
        <radialGradient id={`${p}-glow`}>
          <stop stopColor="#ef4a2b" stopOpacity=".16" />
          <stop offset="1" stopColor="#ef4a2b" stopOpacity="0" />
        </radialGradient>
        {defs}
      </defs>
      <rect width="640" height="360" fill={`url(#${p}-grid)`} />
      <g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{children}</g>
    </svg>
  );
}

/* 01 · Cadrage — the lens brings the scattered field into focus. */
function Discovery({ p }: { p: string }) {
  const users = [[221, 105], [134, 250], [174, 299], [421, 75], [544, 177], [447, 220]];
  const pins = [[113, 102], [213, 207], [511, 187], [395, 281]];
  return (
    <Svg
      p={p}
      defs={
        <>
          <clipPath id={`${p}-lens`}><circle cx="320" cy="170" r="86" /></clipPath>
          <mask id={`${p}-field`} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="360">
            <path fill="#fff" d="M0 0h640v360H0z" />
            <circle cx="320" cy="170" r="96" fill="#000" />
            <path d="m385 235 64 64" stroke="#000" strokeWidth="23" strokeLinecap="round" />
          </mask>
          <g id={`${p}-card`}>
            <rect width="52" height="34" rx="8" />
            <path d="M10 12h13m-13 9h31" stroke="#3d3d3d" />
          </g>
          <g id={`${p}-user`}><circle r="9" /><circle r="2.5" stroke="#3d3d3d" /></g>
          <g id={`${p}-pin`}>
            <path d="M0 11C-2.5 8-8 2.9-8-2a8 8 0 0 1 16 0C8 2.9 2.5 8 0 11Z" />
            <circle cy="-2" r="2.4" />
          </g>
        </>
      }
    >
      <g mask={`url(#${p}-field)`}>
        <path
          className="f march"
          style={at(0.1, { "--to": "-12px" })}
          stroke="#3d3d3d"
          strokeDasharray="1 5"
          d="m119 111 28 36m28 9 39-41m-24 55 24 34m-71 40 54-27m-61 40 31 34m45-85 74-36m-64-57 52 35m90-29 48-36m18-4 44 28m36 17 30 44m-38-30 11 39m-16 9-50 25m8 14 49 29m-66-43-34-31m-38 30 22 39"
        />
        <g stroke="#2c2c2c" className="f" style={at(0.2)}>
          <use href={`#${p}-card`} x="143" y="139" transform="rotate(-8 169 156)" />
          <use href={`#${p}-card`} x="470" y="104" transform="rotate(7 496 121)" />
          <use href={`#${p}-card`} x="454" y="252" transform="rotate(-6 480 269)" />
        </g>
        <g stroke="#3d3d3d">
          {pins.map(([x, y], k) => (
            <use key={`p${k}`} href={`#${p}-pin`} x={x} y={y} className="f" style={at(0.25 + k * 0.06)} />
          ))}
          {users.map(([x, y], k) => (
            <g key={`u${k}`} className="f" style={at(0.3 + k * 0.05)}>
              <use href={`#${p}-user`} x={x} y={y} className="twinkle" style={{ "--t": `${k * -0.7}s` } as V} />
            </g>
          ))}
        </g>
      </g>

      <g clipPath={`url(#${p}-lens)`}>
        <path className="f" style={at(0.55)} stroke="#2c2c2c" strokeDasharray="1 5" d="M286 116h68m-68 108h68m-34-108v37m0 34v37m-29-54h13m32 0h13" />
        <g stroke="#f2f2f2" className="f" style={at(0.65)}>
          <use href={`#${p}-card`} x="239" y="153" />
          <use href={`#${p}-card`} x="349" y="153" />
        </g>
        <g stroke="#3d3d3d" className="f" style={at(0.7)}>
          <use href={`#${p}-user`} x="276" y="116" />
          <use href={`#${p}-user`} x="364" y="116" />
          <use href={`#${p}-user`} x="276" y="224" />
          <use href={`#${p}-user`} x="364" y="224" />
        </g>
        <circle className="glow" cx="320" cy="170" r="36" fill={`url(#${p}-glow)`} />
        <g className="bob">
          <g stroke="#ef4a2b" transform="translate(320 170)">
            <path {...L} className="d" style={at(0.85)} d="M0 16C-4 11-12 3-12-4a12 12 0 0 1 24 0C12 3 4 11 0 16Z" />
            <circle {...L} className="d" style={at(1.05)} cy="-4" r="3.5" />
          </g>
        </g>
      </g>

      <path {...L} className="d" style={at(0.35)} d="m391 234 63 63a6.5 6.5 0 0 1-9.2 9.2l-63-63" stroke="#f2f2f2" />
      <circle {...L} className="d" style={at(0.05, { "--dur": "1.4s" })} cx="320" cy="170" r="94" stroke="#f2f2f2" />
      <circle {...L} className="d" style={at(0.2, { "--dur": "1.4s" })} cx="320" cy="170" r="86" stroke="#3d3d3d" />
    </Svg>
  );
}

/* 02 · Cahier des charges — checks tick, out-of-scope gets struck, then the signature. */
function Scope({ p }: { p: string }) {
  const checks = [123, 156, 189];
  return (
    <Svg p={p}>
      <rect className="f march" style={at(0, { "--to": "-22px" })} x="195" y="34" width="250" height="292" rx="16" stroke="#3d3d3d" strokeDasharray="5 6" />

      <g className="drift" style={{ "--x": "-5px" } as V}>
        <g className="f" style={at(0.2)}>
          <rect x="101" y="112" width="72" height="42" rx="9" stroke="#2c2c2c" />
          <path d="M115 127h22m-22 10h34" stroke="#3d3d3d" />
        </g>
        <path {...L} className="d" style={at(1.1, { "--dur": ".5s" })} d="M109 145l56-24" stroke="#3d3d3d" />
      </g>
      <g className="drift" style={{ "--x": "5px", "--t": "-2s" } as V}>
        <g className="f" style={at(0.25)}>
          <rect x="467" y="203" width="72" height="42" rx="9" stroke="#2c2c2c" />
          <path d="M481 218h20m-20 10h37" stroke="#3d3d3d" />
        </g>
        <path {...L} className="d" style={at(1.25, { "--dur": ".5s" })} d="M475 236l56-24" stroke="#3d3d3d" />
      </g>

      <rect {...L} className="d" style={at(0.05, { "--dur": "1.3s" })} x="219" y="57" width="202" height="246" rx="12" stroke="#f2f2f2" />
      <path {...L} className="d" style={at(0.3)} d="M247 84h58m-58 11h90" stroke="#3d3d3d" />
      <path {...L} className="d" style={at(0.4)} d="M247 109h146m-146 116h146" stroke="#2c2c2c" />

      {checks.map((y, k) => (
        <g key={y}>
          <rect className="f" style={at(0.5 + k * 0.12)} x="247" y={y} width="16" height="16" rx="4" stroke="#3d3d3d" />
          <path {...L} className="d" style={at(0.75 + k * 0.15, { "--dur": ".35s" })} d={`M251.5 ${y + 8}l2.5 2.5 4.5-5`} stroke="#f2f2f2" />
        </g>
      ))}
      <g stroke="#3d3d3d">
        <path {...L} className="d" style={at(0.55)} d="M276 128h97m-97 7h57" />
        <path {...L} className="d" style={at(0.67)} d="M276 161h76m-76 7h49" />
        <path {...L} className="d" style={at(0.79)} d="M276 194h91m-91 7h64" />
        <path {...L} className="d" style={at(0.95)} d="M247 279h146" />
      </g>

      <ellipse className="glow" style={at(1.5)} cx="316" cy="257" rx="78" ry="29" fill={`url(#${p}-glow)`} />
      <path
        {...L}
        className="d"
        style={at(1.35, { "--dur": "1.8s", "--ease": "cubic-bezier(.45,.05,.35,1)" })}
        d="M252 269C266 267 288 249 287 240C286 232 272 247 269 260C264 277 284 266 299 253C291 268 297 272 311 259C317 253 321 249 323 251C326 254 316 263 322 264C331 266 339 257 348 256C358 255 367 261 385 251"
        stroke="#ef4a2b"
      />
    </Svg>
  );
}

/* 03 · Backlog — cards settle into columns, the MVP line flows, the top card lifts. */
function Slice({ p }: { p: string }) {
  const card = (x: number, y: number, stroke: string, d: number) => (
    <g key={`${x}-${y}`} className="f rise" style={at(d)} stroke={stroke}>
      <rect x={x} y={y} width="92" height="36" rx="8" />
      <path d={`M${x + 11} ${y + 12}h37`} stroke="#3d3d3d" />
    </g>
  );
  const prio = (x: number, y: number, n: number, d: number) => (
    <path key={`p${x}-${y}`} className="f" style={at(d)} stroke="#3d3d3d" d={Array.from({ length: n }, (_, k) => `M${x + k * 12} ${y}h8`).join("")} />
  );
  return (
    <Svg p={p}>
      {[127, 262, 397].map((x, k) => (
        <rect {...L} key={x} className="d" style={at(k * 0.1, { "--dur": "1.2s" })} x={x} y="55" width="116" height="252" rx="14" stroke="#2c2c2c" />
      ))}
      <path {...L} className="d" style={at(0.3)} d="M141 70h22m113 0h22m113 0h22" stroke="#3d3d3d" />

      {card(139, 132, "#f2f2f2", 0.45)}
      {card(274, 86, "#f2f2f2", 0.35)}
      {card(274, 132, "#f2f2f2", 0.5)}
      {card(409, 86, "#f2f2f2", 0.4)}
      {card(139, 202, "#3d3d3d", 0.6)}
      {card(139, 248, "#3d3d3d", 0.7)}
      {card(274, 202, "#3d3d3d", 0.65)}
      {card(409, 202, "#3d3d3d", 0.62)}
      {card(409, 248, "#3d3d3d", 0.75)}
      {prio(150, 156, 2, 0.8)}
      {prio(285, 110, 3, 0.8)}
      {prio(285, 156, 1, 0.85)}
      {prio(420, 110, 2, 0.85)}
      {prio(150, 226, 1, 0.9)}
      {prio(150, 272, 2, 0.9)}
      {prio(285, 226, 1, 0.95)}
      {prio(420, 226, 3, 0.95)}
      {prio(420, 272, 1, 1)}

      <path className="f march" style={at(1, { "--to": "-20px" })} d="M103 184h433" stroke="#f2f2f2" strokeOpacity=".55" strokeDasharray="4 6" />
      <g className="wave">
        <path {...L} className="d" style={at(1.15, { "--dur": ".6s" })} d="M540 184v-24h18l-5 6 5 6h-18" stroke="#f2f2f2" />
      </g>
      <circle className="f" style={at(1.1)} cx="540" cy="184" r="2" fill="#f2f2f2" />

      <rect className="f" style={at(0.9)} x="139" y="86" width="92" height="36" rx="8" stroke="#2c2c2c" strokeDasharray="3 5" />
      <g className="lift">
        <g transform="rotate(-7 173 91)">
          <ellipse className="glow" cx="173" cy="91" rx="68" ry="43" fill={`url(#${p}-glow)`} />
          <g className="f" style={at(1.2)}>
            <rect x="127" y="73" width="92" height="36" rx="8" stroke="#ef4a2b" />
            <path d="M138 85h37" stroke="#3d3d3d" />
            <path d="M138 97h8m4 0h8m4 0h8" stroke="#3d3d3d" />
          </g>
        </g>
      </g>
    </Svg>
  );
}

/* 04 · Architecture — the system wires itself up, the lock closes, data starts flowing. */
function Decisions({ p }: { p: string }) {
  return (
    <Svg p={p}>
      <g stroke="#f2f2f2">
        <ellipse {...L} className="d" style={at(0.05)} cx="135" cy="144" rx="38" ry="12" />
        <path {...L} className="d" style={at(0.15)} d="M97 144v53c0 6.6 17 12 38 12s38-5.4 38-12v-53" />
      </g>
      <path {...L} className="d" style={at(0.3)} d="M97 162c0 6.6 17 12 38 12s38-5.4 38-12m-76 18c0 6.6 17 12 38 12s38-5.4 38-12" stroke="#3d3d3d" />

      <path {...L} className="d" style={at(0.25, { "--dur": "1.3s" })} d="M259 170l22-36q3-5 9-5h42q6 0 9 5l22 36q3 5 0 10l-22 36q-3 5-9 5h-42q-6 0-9-5l-22-36q-3-5 0-10Z" stroke="#f2f2f2" />
      <path {...L} className="d" style={at(0.45)} d="M272 175l18-32h42l18 32-18 32h-42z" stroke="#2c2c2c" />
      <g stroke="#f2f2f2">
        <rect className="f" style={at(0.7)} x="299" y="170" width="24" height="19" rx="5" />
        <path className="f shackle" style={at(0.75)} d="M304 170v-6a7 7 0 0 1 14 0v6" />
        <path className="f" style={at(0.8)} d="M311 178v4" />
      </g>

      <path {...L} className="d" style={at(0.6, { "--dur": "1.3s" })} d="M365 175h50m0-4v-51q0-8 8-8h46m-54 67v51q0 8 8 8h46" stroke="#3d3d3d" />
      <g stroke="#3d3d3d">
        <circle className="f" style={at(0.75)} cx="415" cy="175" r="4" />
        <circle className="f" style={at(0.95)} cx="472" cy="112" r="3" />
        <circle className="f" style={at(0.95)} cx="472" cy="238" r="3" />
      </g>
      <g stroke="#f2f2f2">
        <rect {...L} className="d" style={at(0.85)} x="475" y="64" width="50" height="96" rx="10" />
        <rect {...L} className="d" style={at(0.9)} x="475" y="200" width="100" height="76" rx="10" />
      </g>
      <g stroke="#3d3d3d" className="f" style={at(1.1)}>
        <path d="M496 73h8m-11 77h14M475 219h100m-88 39h42m-42 8h28" />
        <rect x="486" y="88" width="28" height="30" rx="8" />
        <path d="M488 130h24m-24 7h16" />
        <rect x="487" y="228" width="76" height="22" rx="8" stroke="#2c2c2c" />
        <path d="M497 239h27m9 0h19" />
        <circle cx="487" cy="210" r="1.5" />
        <circle cx="494" cy="210" r="1.5" />
        <circle cx="501" cy="210" r="1.5" />
      </g>

      <g stroke="#3d3d3d" className="f" style={at(0.5)}>
        <path d="M97 244h24l16 16v30a8 8 0 0 1-8 8H97a8 8 0 0 1-8-8v-38a8 8 0 0 1 8-8Z" />
        <path d="M121 244v10a6 6 0 0 0 6 6h10m-38 8h26m-26 8h22m-22 8h16" />
      </g>

      <ellipse className="glow" style={at(1.2)} cx="215" cy="175" rx="58" ry="20" fill={`url(#${p}-glow)`} />
      <path {...L} className="d" style={at(1.15, { "--dur": ".6s" })} d="M173 175h84" stroke="#ef4a2b" />
      <g className="f" style={at(1.5)}>
        <circle className="travel" cx="215" cy="175" r="3.5" fill="#ef4a2b" />
      </g>
    </Svg>
  );
}

/* 05 · Développement — code types itself, the branch merges, tests go green. */
function Handoff({ p }: { p: string }) {
  const code = [
    "M158 127h54m10 0h40",
    "M173 146h88m10 0h29",
    "M189 165h44m10 0h74",
    "M189 184h100",
    "M173 203h31",
    "M158 222h69",
    "M173 241h54m10 0h66",
    "M158 260h36",
  ];
  const tests = [219, 243, 267, 291];
  return (
    <Svg
      p={p}
      defs={
        <mask id={`${p}-track`} maskUnits="userSpaceOnUse" x="408" y="55" width="139" height="145">
          <rect x="408" y="55" width="139" height="145" fill="#fff" />
          <g fill="#000">
            <circle cx="450" cy="75" r="4" />
            <circle cx="450" cy="98" r="4" />
            <circle cx="503" cy="130" r="4" />
            <circle cx="450" cy="169" r="5" />
            <circle cx="450" cy="193" r="4" />
          </g>
        </mask>
      }
    >
      <rect {...L} className="d" style={at(0, { "--dur": "1.3s" })} x="92" y="68" width="295" height="224" rx="14" stroke="#f2f2f2" />
      <path {...L} className="d" style={at(0.25)} d="M92 101h295m-247 0v191" stroke="#2c2c2c" />
      <g stroke="#3d3d3d" className="f" style={at(0.3)}>
        <circle cx="109" cy="85" r="2" />
        <circle cx="120" cy="85" r="2" />
        <circle cx="131" cy="85" r="2" />
        <path d="M111 127h10m-10 19h10m-10 19h10m-10 19h10m-10 19h10m-10 19h10m-10 19h10m-10 19h10" stroke="#2c2c2c" />
      </g>
      <g stroke="#3d3d3d">
        {code.map((d, k) => (
          <path key={d} className="type" style={at(0.45 + k * 0.09)} d={d} />
        ))}
      </g>
      <path className="caret" d="M201 254v12" stroke="#f2f2f2" />
      <path className="f" style={at(0.6)} d="M162 141v66m16-47v30m-16 46v11" stroke="#2c2c2c" />

      <g mask={`url(#${p}-track)`}>
        <path {...L} className="d" style={at(0.5, { "--dur": "1.2s" })} d="M450 75v118" stroke="#f2f2f2" />
        <path {...L} className="d" style={at(0.8, { "--dur": "1.2s" })} d="M450 98h15c21 0 38 10 38 29v13c0 18-17 29-38 29h-15" stroke="#3d3d3d" />
      </g>
      <g stroke="#f2f2f2">
        <circle className="f" style={at(0.55)} cx="450" cy="75" r="4" />
        <circle className="f" style={at(0.75)} cx="450" cy="98" r="4" />
        <circle className="f" style={at(1.6)} cx="450" cy="193" r="4" />
      </g>
      <circle className="f" style={at(1.2)} cx="503" cy="130" r="4" stroke="#3d3d3d" />
      <circle className="glow" style={at(1.7)} cx="450" cy="169" r="28" fill={`url(#${p}-glow)`} />
      <circle {...L} className="d" style={at(1.6, { "--dur": ".5s" })} cx="450" cy="169" r="5" stroke="#ef4a2b" />

      {tests.map((y, k) => (
        <g key={y}>
          <circle className="f" style={at(1.5 + k * 0.1)} cx="450" cy={y} r="6.5" stroke="#3d3d3d" />
          <g className="tick" style={{ "--t": `${k * 0.35}s` } as V}>
            <path {...L} className="d" style={at(1.8 + k * 0.18, { "--dur": ".3s" })} d={`M447.5 ${y}l1.6 1.7 3.4-3.5`} stroke="#f2f2f2" />
          </g>
        </g>
      ))}
      <path className="f" style={at(1.55)} d="M468 219h60m-60 24h48m-48 24h66m-66 24h53" stroke="#3d3d3d" />
    </Svg>
  );
}

/* 06 · Mise en production — the chart draws, the pipeline flows, servers blink, the loop restarts. */
function Launch({ p }: { p: string }) {
  const stages = [78, 201, 324];
  const blades = [188.5, 217.5, 246.5];
  return (
    <Svg p={p}>
      <rect {...L} className="d" style={at(0, { "--dur": "1.3s" })} x="171" y="49" width="310" height="114" rx="14" stroke="#f2f2f2" />
      <path {...L} className="d" style={at(0.25)} d="M171 76h310m-289-13h37" stroke="#3d3d3d" />
      <path className="f" style={at(0.3)} d="M194 96v47h264m-264-14h264m-264-16h264m-219-17v47m44-47v47m44-47v47m44-47v47m44-47v47" stroke="#2c2c2c" />
      <path {...L} className="d" style={at(0.45, { "--dur": "1.6s" })} d="m194 127 23-4 20 2 24-7 21 2 22-6 22 3 22-7 21 2 23-6 20 3 22-5 22-3" stroke="#f2f2f2" />
      <circle className="glow pulse" style={at(1.9)} cx="456" cy="101" r="24" fill={`url(#${p}-glow)`} />
      <circle className="f" style={at(1.9)} cx="456" cy="101" r="4" fill="#ef4a2b" />

      {stages.map((x, k) => (
        <g key={x} className="f rise" style={at(0.6 + k * 0.12)}>
          <rect x={x} y="201" width="80" height="56" rx="12" stroke="#f2f2f2" />
        </g>
      ))}
      <path className="f" style={at(0.9)} d="M95 223h45m-45 12h27m96-12h34m-34 12h45m78-12h42m-42 12h23" stroke="#3d3d3d" />
      {[168, 291, 414].map((x, k) => (
        <g key={x} className="f" style={at(0.95)}>
          <path className="flow" style={{ "--t": `${k * 0.4}s` } as V} d={`M${x} 229h22m-5-5 5 5-5 5`} stroke="#3d3d3d" />
        </g>
      ))}

      {blades.map((y, k) => (
        <g key={y} className="f rise" style={at(1 + k * 0.1)}>
          <rect x="447" y={y} width="106" height="23" rx="8" stroke="#f2f2f2" />
          <path d={`M459 ${y + 11.5}h26m6 0h8`} stroke="#3d3d3d" />
          <circle cx="526" cy={y + 11.5} r="1.8" stroke="#3d3d3d" />
          <circle className="led" style={{ "--t": `${k * -0.55}s` } as V} cx="538" cy={y + 11.5} r="1.8" fill="#f2f2f2" />
        </g>
      ))}

      <path className="f march" style={at(1.3, { "--to": "-20px" })} d="M500 277c0 30-44 40-90 40H219c-55 0-89-14-101-53" stroke="#3d3d3d" strokeDasharray="4 6" />
      <path className="f" style={at(1.5)} d="m114 271 4-7 7 4" stroke="#3d3d3d" />
    </Svg>
  );
}

// Same order as `steps` in lib/content.ts.
export const processArts = [Discovery, Scope, Slice, Decisions, Handoff, Launch];
