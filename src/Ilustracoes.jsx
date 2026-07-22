import { C } from "./data.js";

/* Ilustrações vetoriais leves — imagens sem depender de rede. */

export function RamoRosa({ width = 120, className = "" }) {
  return (
    <svg viewBox="0 0 120 60" width={width} className={className} aria-hidden="true">
      <g fill="none" stroke={C.green} strokeWidth="1.6" strokeLinecap="round">
        <path d="M60 55 C60 40 55 30 45 24" />
        <path d="M60 45 C68 42 74 44 80 40" />
        <path d="M60 38 C52 36 46 38 40 34" />
      </g>
      <g fill={C.greenSoft} stroke={C.green} strokeWidth="1.2">
        <path d="M80 40 c6 -6 14 -5 18 0 c-6 6 -14 5 -18 0Z" />
        <path d="M40 34 c-6 -6 -14 -5 -18 0 c6 6 14 5 18 0Z" />
      </g>
      {/* rosa */}
      <g transform="translate(45,18)">
        <circle r="13" fill={C.roseSoft} />
        <path d="M0 -9 C6 -9 9 -4 9 0 C9 5 5 9 0 9 C-5 9 -9 5 -9 0 C-9 -4 -6 -9 0 -9Z" fill={C.rose} opacity="0.9" />
        <path d="M0 -5 C3 -5 5 -2 5 0 C5 3 3 5 0 5 C-3 5 -5 3 -5 0 C-5 -2 -3 -5 0 -5Z" fill="#fff" opacity="0.55" />
      </g>
      {/* botão dourado */}
      <circle cx="98" cy="40" r="4" fill={C.gold} />
      <circle cx="22" cy="34" r="3" fill={C.gold} />
    </svg>
  );
}

export function OliveiraFaixa({ width = 260, className = "" }) {
  const folha = (x, r) => (
    <path
      key={x + "" + r}
      d={`M${x} 12 c4 -6 12 -6 16 0 c-4 6 -12 6 -16 0Z`}
      transform={`rotate(${r} ${x + 8} 12)`}
      fill={C.greenSoft}
      stroke={C.green}
      strokeWidth="1"
    />
  );
  return (
    <svg viewBox="0 0 260 24" width={width} className={className} aria-hidden="true">
      <line x1="10" y1="12" x2="250" y2="12" stroke={C.green} strokeWidth="1.4" strokeLinecap="round" />
      {[30, 70, 110, 150, 190, 226].map((x, i) => folha(x, i % 2 ? 18 : -18))}
      {[52, 92, 132, 172, 208].map((x, i) => (
        <circle key={i} cx={x} cy="12" r="2.6" fill={C.gold} />
      ))}
    </svg>
  );
}

export function Coroa({ ativa = false, width = 58 }) {
  return (
    <svg width={width} height={(width * 42) / 58} viewBox="0 0 40 28" role="img" aria-label="Coroa">
      <path
        d="M4 22 L4 8 L12 14 L20 4 L28 14 L36 8 L36 22 Z"
        fill={ativa ? "#FFFFFF" : C.goldSoft}
        stroke={ativa ? "#FFFFFF" : C.gold}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect x="4" y="22" width="32" height="3.5" rx="1.5" fill={ativa ? "#FFFFFF" : C.gold} />
      <circle cx="20" cy="4" r="2" fill={ativa ? "#FFF" : C.rose} />
      <circle cx="12" cy="14" r="1.5" fill={ativa ? "#FFF" : C.rose} />
      <circle cx="28" cy="14" r="1.5" fill={ativa ? "#FFF" : C.rose} />
    </svg>
  );
}

export function GotaAgua({ width = 22, cheia = false }) {
  return (
    <svg width={width} height={width} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2 C12 2 5 10 5 15 a7 7 0 0 0 14 0 C19 10 12 2 12 2Z"
        fill={cheia ? C.aqua : "none"}
        stroke={C.aqua}
        strokeWidth="1.6"
      />
      {cheia && <path d="M9 14 a3 3 0 0 0 3 3" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" />}
    </svg>
  );
}
