import { useEffect, useRef } from "react";
import { AVISOS_PADRAO } from "./data.js";

/* ==========================================================
   Sistema de avisos — dispara lembretes nos horários das
   refeições e tarefas. Enquanto o app estiver aberto:
   - toast dentro do app (sempre)
   - Notification do navegador (se a permissão for concedida)
   Evita repetir o mesmo aviso no mesmo dia (marca em localStorage).
   ========================================================== */

const CHAVE_DISPAROS = "plannerVida:avisosDisparados";

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
    /* sem persistência — tudo bem, evita só dentro da sessão */
  }
}

export async function pedirPermissaoAvisos() {
  if (typeof Notification === "undefined") return "indisponivel";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  try {
    return await Notification.requestPermission();
  } catch (e) {
    return "denied";
  }
}

/* Hook: recebe a config e um callback para o toast no app. */
export function useAvisos({ ativo, itens, onDisparo }) {
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
      AVISOS_PADRAO.forEach((av) => {
        const ligado = itens ? itens[av.id] !== false : true; // padrão: ligado
        if (!ligado) return;
        if (av.hora !== hhmm) return;
        if (disparos.ids.includes(av.id)) return;

        // marca como disparado hoje
        disparos.ids.push(av.id);
        salvarDisparos(disparos);

        // notificação do navegador
        if (typeof Notification !== "undefined" && Notification.permission === "granted") {
          try {
            new Notification(`${av.emoji} ${av.titulo}`, {
              body: av.corpo,
              tag: `vida-${av.id}`,
              silent: false,
            });
          } catch (e) {
            /* alguns navegadores exigem service worker — cai no toast */
          }
        }
        // toast no app
        if (onDisparo) onDisparo(av);
      });
    }

    checar();
    const t = setInterval(checar, 20000); // a cada 20s
    return () => clearInterval(t);
  }, []);
}

/* Para o botão "testar" — dispara o próximo aviso do dia como exemplo */
export function proximoAviso() {
  const agora = new Date();
  const minutosAgora = agora.getHours() * 60 + agora.getMinutes();
  const futuros = AVISOS_PADRAO.map((a) => {
    const [h, m] = a.hora.split(":").map(Number);
    return { ...a, min: h * 60 + m };
  })
    .filter((a) => a.min >= minutosAgora)
    .sort((a, b) => a.min - b.min);
  return futuros[0] || AVISOS_PADRAO[0];
}
