import { useEffect, useRef } from "react";
import { LEMBRETES_PADRAO, APERTADORES } from "./appData.js";

/* ==========================================================
   Lembretes e "apertadores" — dispara nos horários definidos.
   - toast dentro do app (sempre)
   - Notification do navegador (se permitido)
   Evita repetir o mesmo aviso no mesmo dia.
   ========================================================== */

const CHAVE_DISPAROS = "firmes:lembretesDisparados";

function hojeStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function lerDisparos() {
  try {
    const raw = window.localStorage.getItem(CHAVE_DISPAROS);
    const obj = raw ? JSON.parse(raw) : {};
    if (obj.dia !== hojeStr()) return { dia: hojeStr(), ids: [] };
    return obj;
  } catch (e) {
    return { dia: hojeStr(), ids: [] };
  }
}

function salvarDisparos(obj) {
  try {
    window.localStorage.setItem(CHAVE_DISPAROS, JSON.stringify(obj));
  } catch (e) {
    /* sem persistência — tudo bem */
  }
}

export async function pedirPermissaoLembretes() {
  if (typeof Notification === "undefined") return "indisponivel";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  try {
    return await Notification.requestPermission();
  } catch (e) {
    return "denied";
  }
}

/* Escolhe um apertador do dia (varia por data, estável no mesmo dia) */
export function apertadorDoDia() {
  const d = new Date();
  const idx = (d.getFullYear() + d.getMonth() * 31 + d.getDate()) % APERTADORES.length;
  return APERTADORES[idx];
}

/* Hook: dispara os lembretes nos horários. `itens` liga/desliga cada id. */
export function useLembretes({ ativo, itens, onDisparo }) {
  const ref = useRef({ ativo, itens, onDisparo });
  ref.current = { ativo, itens, onDisparo };

  useEffect(() => {
    function checar() {
      const { ativo, itens, onDisparo } = ref.current;
      if (!ativo) return;
      const agora = new Date();
      const hhmm = `${String(agora.getHours()).padStart(2, "0")}:${String(
        agora.getMinutes()
      ).padStart(2, "0")}`;

      const disparos = lerDisparos();
      LEMBRETES_PADRAO.forEach((lb) => {
        const ligado = itens ? itens[lb.id] !== false : true;
        if (!ligado) return;
        if (lb.hora !== hhmm) return;
        if (disparos.ids.includes(lb.id)) return;

        disparos.ids.push(lb.id);
        salvarDisparos(disparos);

        const corpo = lb.id.startsWith("apertador") ? apertadorDoDia() : lb.corpo;

        if (typeof Notification !== "undefined" && Notification.permission === "granted") {
          try {
            new Notification(`${lb.emoji} ${lb.titulo}`, {
              body: corpo,
              tag: `firmes-${lb.id}`,
            });
          } catch (e) {
            /* cai no toast */
          }
        }
        if (onDisparo) onDisparo({ ...lb, corpo });
      });
    }

    checar();
    const t = setInterval(checar, 20000);
    return () => clearInterval(t);
  }, []);
}
