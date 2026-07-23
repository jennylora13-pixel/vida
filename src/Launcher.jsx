import React, { useEffect, useState } from "react";
import { storage } from "./storage.js";
import App from "./App.jsx";
import PlannerVida from "./PlannerVida.jsx";

/* ==========================================================
   Launcher — tela inicial que deixa escolher entre as duas
   apps publicadas no mesmo site:
   - FIRMES (Vida com Deus)
   - Planner VIDA (4 semanas: dieta, rotina, treino)
   A escolha fica salva; o botão "Trocar app" volta para cá.
   ========================================================== */

const CHAVE = "launcher:escolha";

function Coroa({ className = "" }) {
  return (
    <svg viewBox="0 0 40 28" className={className} aria-hidden="true">
      <path d="M4 22 L4 8 L12 14 L20 4 L28 14 L36 8 L36 22 Z" fill="#C9A34A" />
      <rect x="4" y="22" width="32" height="3.5" rx="1.5" fill="#B76E79" />
    </svg>
  );
}

/* Botão flutuante para voltar à escolha (fica por cima das apps) */
function BotaoTrocar({ onTrocar }) {
  return (
    <button
      onClick={onTrocar}
      className="fixed top-2 right-2 z-[60] bg-white/90 backdrop-blur border border-rose-200 text-rose-600 text-xs font-semibold rounded-full px-3 py-1.5 shadow-md active:scale-95 transition"
      aria-label="Trocar de app"
      title="Trocar de app"
    >
      ⇄ Trocar app
    </button>
  );
}

export default function Launcher() {
  const [escolha, setEscolha] = useState(undefined); // undefined = carregando

  useEffect(() => {
    let vivo = true;
    storage.get(CHAVE).then((r) => {
      if (!vivo) return;
      setEscolha(r && r.value ? r.value : null);
    });
    return () => {
      vivo = false;
    };
  }, []);

  function escolher(qual) {
    setEscolha(qual);
    storage.set(CHAVE, qual);
  }
  function trocar() {
    setEscolha(null);
    storage.set(CHAVE, "");
  }

  if (escolha === undefined) {
    return <div className="min-h-full bg-[#fbf3f1]" />;
  }

  if (escolha === "firmes") {
    return (
      <>
        <BotaoTrocar onTrocar={trocar} />
        <App />
      </>
    );
  }
  if (escolha === "planner") {
    return (
      <>
        <BotaoTrocar onTrocar={trocar} />
        <PlannerVida />
      </>
    );
  }

  // Tela de escolha
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-10 bg-gradient-to-b from-rose-50 via-amber-50 to-white">
      <Coroa className="w-16 h-12 mb-3 animate-floaty" />
      <h1 className="text-2xl font-bold text-stone-800">Bem-vinda 🌹</h1>
      <p className="text-sm text-stone-500 mt-2 text-center max-w-xs">
        Escolha por onde começar hoje. Você pode trocar quando quiser.
      </p>

      <div className="w-full max-w-sm mt-8 space-y-4">
        {/* FIRMES */}
        <button
          onClick={() => escolher("firmes")}
          className="w-full text-left bg-white rounded-2xl shadow-sm border border-rose-100 p-5 active:scale-[0.98] transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">👑</span>
            <div>
              <h2 className="font-bold text-stone-800">FIRMES · Vida com Deus</h2>
              <p className="text-xs text-rose-500">Espiritual · Bíblia e disciplinas</p>
            </div>
          </div>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            Bíblia por temas, afirmações das promessas de Deus, disciplinas espirituais,
            grandes autores, finanças e lembretes. Sai da paralisia e da procrastinação.
          </p>
          <p className="text-sm font-semibold text-rose-600 mt-3">Abrir FIRMES →</p>
        </button>

        {/* Planner VIDA */}
        <button
          onClick={() => escolher("planner")}
          className="w-full text-left bg-white rounded-2xl shadow-sm border border-emerald-100 p-5 active:scale-[0.98] transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌷</span>
            <div>
              <h2 className="font-bold text-stone-800">Planner VIDA · 4 semanas</h2>
              <p className="text-xs text-emerald-600">Corpo · Dieta, rotina e treino</p>
            </div>
          </div>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            Acompanhamento de dieta, rotina, treino e cuidado com o corpo — com assistente,
            buscador e avisos nos horários.
          </p>
          <p className="text-sm font-semibold text-emerald-600 mt-3">Abrir Planner VIDA →</p>
        </button>
      </div>

      <p className="text-xs text-stone-400 mt-8 text-center max-w-xs">
        Dica: no botão “⇄ Trocar app” (canto superior) você volta para esta tela.
      </p>
    </div>
  );
}
