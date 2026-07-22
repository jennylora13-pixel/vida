import React, { useEffect, useMemo, useState } from "react";
import { storage } from "./storage.js";
import { useLembretes, pedirPermissaoLembretes, apertadorDoDia } from "./lembretes.js";
import {
  VERSICULOS_DIA,
  TEMAS_BIBLIA,
  PLANO_LEITURA,
  AUTORES,
  AFIRMACOES,
  DISCIPLINAS,
  FINANCAS_PRINCIPIOS,
  FINANCAS_ORCAMENTO,
  ENCORAJAMENTOS,
  LEMBRETES_PADRAO,
} from "./appData.js";

/* ==========================================================
   FIRMES — Vida com Deus
   App evangélico com a Bíblia como base, autores clássicos,
   afirmações (co-criações) das promessas em 1ª pessoa,
   disciplinas espirituais, finanças bíblicas, rotinas e
   apertadores contra a paralisia e a procrastinação.
   ========================================================== */

const ABAS = [
  { id: "inicio", nome: "Início", emoji: "🏠" },
  { id: "biblia", nome: "Bíblia", emoji: "📖" },
  { id: "afirmacoes", nome: "Afirmações", emoji: "👑" },
  { id: "disciplinas", nome: "Disciplinas", emoji: "🌿" },
  { id: "autores", nome: "Autores", emoji: "📚" },
  { id: "financas", nome: "Finanças", emoji: "💰" },
  { id: "rotina", nome: "Rotina", emoji: "🔔" },
];

/* util: índice estável pelo dia (rotação diária) */
function idxDoDia(tamanho) {
  const d = new Date();
  return (d.getFullYear() + d.getMonth() * 31 + d.getDate()) % tamanho;
}
function hojeStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/* ---------- Ilustração simples (coroa + ramo) ---------- */
function Coroa({ className = "" }) {
  return (
    <svg viewBox="0 0 40 28" className={className} aria-hidden="true">
      <path d="M4 22 L4 8 L12 14 L20 4 L28 14 L36 8 L36 22 Z" fill="#C9A34A" />
      <rect x="4" y="22" width="32" height="3.5" rx="1.5" fill="#B76E79" />
    </svg>
  );
}

/* ---------- Cartão base ---------- */
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-rose-100/70 p-4 ${className}`}>
      {children}
    </div>
  );
}

function SecaoTitulo({ emoji, children, sub }) {
  return (
    <div className="mb-3">
      <h2 className="text-lg font-bold text-stone-800 flex items-center gap-2">
        <span>{emoji}</span> {children}
      </h2>
      {sub && <p className="text-sm text-stone-500 mt-0.5">{sub}</p>}
    </div>
  );
}

/* ==================== INÍCIO ==================== */
function TelaInicio({ irPara, marcados, alternarDisciplina }) {
  const vers = VERSICULOS_DIA[idxDoDia(VERSICULOS_DIA.length)];
  const encoraja = ENCORAJAMENTOS[idxDoDia(ENCORAJAMENTOS.length)];
  const apertador = apertadorDoDia();
  const afirmacao = AFIRMACOES[idxDoDia(AFIRMACOES.length)];
  const decl = afirmacao.lista[idxDoDia(afirmacao.lista.length)];

  const totalDisc = DISCIPLINAS.length;
  const feitas = DISCIPLINAS.filter((d) => marcados[d.id]).length;

  return (
    <div className="space-y-4">
      {/* Versículo do dia */}
      <Card className="bg-gradient-to-br from-rose-50 to-amber-50 text-center">
        <p className="text-xs uppercase tracking-wide text-rose-400 font-semibold mb-2">
          Palavra de hoje
        </p>
        <p className="text-lg text-stone-800 leading-relaxed">“{vers.texto}”</p>
        <p className="text-sm text-amber-700 font-semibold mt-2">{vers.ref}</p>
      </Card>

      {/* Apertador — urgência de hoje */}
      <Card className="border-l-4 border-l-rose-400 bg-rose-50/50">
        <p className="text-xs uppercase tracking-wide text-rose-500 font-semibold mb-1">
          ⏰ Não deixe para amanhã
        </p>
        <p className="text-sm text-stone-700 leading-relaxed">{apertador}</p>
      </Card>

      {/* Declaração do dia */}
      <Card>
        <p className="text-xs uppercase tracking-wide text-amber-500 font-semibold mb-1">
          👑 Declare (co-criação)
        </p>
        <p className="text-stone-800 leading-relaxed italic">“{decl.texto}”</p>
        <p className="text-xs text-stone-500 mt-1">{decl.ref}</p>
        <button
          onClick={() => irPara("afirmacoes")}
          className="mt-3 text-sm text-rose-600 font-semibold"
        >
          Ver todas as afirmações →
        </button>
      </Card>

      {/* Foco: uma coisa hoje */}
      <Card>
        <SecaoTitulo emoji="🎯" sub="Contra a procrastinação: não resolva tudo, resolva o próximo passo.">
          Uma coisa hoje
        </SecaoTitulo>
        <FocoHoje />
      </Card>

      {/* Disciplinas de hoje (resumo) */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <SecaoTitulo emoji="🌿">Disciplinas de hoje</SecaoTitulo>
          <span className="text-sm font-bold text-emerald-600">
            {feitas}/{totalDisc}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {DISCIPLINAS.slice(0, 6).map((d) => (
            <button
              key={d.id}
              onClick={() => alternarDisciplina(d.id)}
              className={`flex items-center gap-2 text-left text-sm rounded-xl px-3 py-2 border transition ${
                marcados[d.id]
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-white border-stone-200 text-stone-600"
              }`}
            >
              <span className={marcados[d.id] ? "animate-pop" : ""}>
                {marcados[d.id] ? "✅" : d.emoji}
              </span>
              {d.nome}
            </button>
          ))}
        </div>
        <button
          onClick={() => irPara("disciplinas")}
          className="mt-3 text-sm text-emerald-700 font-semibold"
        >
          Abrir disciplinas →
        </button>
      </Card>

      <p className="text-center text-sm text-stone-500 italic px-4">“{encoraja}”</p>
    </div>
  );
}

/* Foco do dia — persiste no storage */
function FocoHoje() {
  const [texto, setTexto] = useState("");
  const [feito, setFeito] = useState(false);
  const chave = `firmes:foco:${hojeStr()}`;

  useEffect(() => {
    let vivo = true;
    storage.get(chave).then((r) => {
      if (!vivo || !r) return;
      try {
        const o = JSON.parse(r.value);
        setTexto(o.texto || "");
        setFeito(!!o.feito);
      } catch (e) {}
    });
    return () => {
      vivo = false;
    };
  }, [chave]);

  function salvar(t, f) {
    setTexto(t);
    setFeito(f);
    storage.set(chave, JSON.stringify({ texto: t, feito: f }));
  }

  return (
    <div>
      <input
        value={texto}
        onChange={(e) => salvar(e.target.value, feito)}
        placeholder="Ex.: escrever 1 parágrafo, ligar para alguém, orar 10 min..."
        className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-rose-300"
      />
      <button
        onClick={() => salvar(texto, !feito)}
        disabled={!texto.trim()}
        className={`mt-2 w-full rounded-xl py-2 text-sm font-semibold transition disabled:opacity-40 ${
          feito ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
        }`}
      >
        {feito ? "✅ Feito! Deus honra a sua obediência" : "Marcar como feito"}
      </button>
    </div>
  );
}

/* ==================== BÍBLIA ==================== */
function TelaBiblia() {
  const [aberto, setAberto] = useState("paralisia");
  const [diaPlano, setDiaPlano] = useState(0);

  useEffect(() => {
    let vivo = true;
    storage.get("firmes:diaPlano").then((r) => {
      if (vivo && r) setDiaPlano(Number(r.value) || 0);
    });
    return () => {
      vivo = false;
    };
  }, []);

  function marcarDia(i) {
    const novo = i + 1;
    setDiaPlano(novo);
    storage.set("firmes:diaPlano", String(novo));
  }

  return (
    <div className="space-y-4">
      <SecaoTitulo emoji="📖" sub="A Palavra é a base de tudo. Escolha um tema para a sua batalha de hoje.">
        Bíblia por temas
      </SecaoTitulo>

      {TEMAS_BIBLIA.map((t) => (
        <Card key={t.id}>
          <button
            onClick={() => setAberto(aberto === t.id ? "" : t.id)}
            className="w-full flex items-center justify-between text-left"
          >
            <span className="flex items-center gap-2 font-semibold text-stone-800">
              <span className="text-xl">{t.emoji}</span> {t.titulo}
            </span>
            <span className="text-stone-400">{aberto === t.id ? "−" : "+"}</span>
          </button>
          {aberto === t.id && (
            <div className="mt-3 space-y-3 animate-fadeInUp">
              <p className="text-sm text-stone-500 italic">{t.resumo}</p>
              {t.versiculos.map((v, i) => (
                <div key={i} className="border-l-2 border-rose-200 pl-3">
                  <p className="text-sm text-stone-700 leading-relaxed">“{v.texto}”</p>
                  <p className="text-xs text-amber-700 font-semibold mt-0.5">{v.ref}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}

      {/* Plano de leitura */}
      <Card className="bg-gradient-to-br from-amber-50 to-rose-50">
        <SecaoTitulo emoji="🗓️" sub="30 dias começando pelos Evangelhos e Salmos.">
          Plano de leitura
        </SecaoTitulo>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-stone-600">
            Progresso: <b>{diaPlano}</b> / {PLANO_LEITURA.length} dias
          </span>
          <div className="h-2 w-28 bg-white rounded-full overflow-hidden border border-amber-200">
            <div
              className="h-full bg-emerald-400 transition-all"
              style={{ width: `${(diaPlano / PLANO_LEITURA.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="space-y-1.5 max-h-72 overflow-y-auto no-scrollbar">
          {PLANO_LEITURA.map((leitura, i) => {
            const lido = i < diaPlano;
            const atual = i === diaPlano;
            return (
              <button
                key={i}
                onClick={() => marcarDia(i)}
                className={`w-full flex items-center gap-2 text-left text-sm rounded-lg px-3 py-2 border transition ${
                  lido
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 line-through"
                    : atual
                    ? "bg-white border-rose-300 text-stone-800 font-semibold"
                    : "bg-white/60 border-stone-200 text-stone-500"
                }`}
              >
                <span>{lido ? "✅" : `Dia ${i + 1}`}</span>
                <span className="flex-1">{leitura}</span>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

/* ==================== AFIRMAÇÕES ==================== */
function TelaAfirmacoes() {
  return (
    <div className="space-y-4">
      <SecaoTitulo
        emoji="👑"
        sub="Promessas de Deus oradas em 1ª pessoa. Deus já disse — você concorda e declara com fé (co-criação). Ore em voz alta."
      >
        Afirmações & Co-criações
      </SecaoTitulo>

      {AFIRMACOES.map((cat) => (
        <Card key={cat.id}>
          <h3 className="font-semibold text-stone-800 flex items-center gap-2 mb-3">
            <span className="text-xl">{cat.emoji}</span> {cat.titulo}
          </h3>
          <div className="space-y-3">
            {cat.lista.map((a, i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-amber-50 to-transparent rounded-xl p-3 border-l-2 border-amber-300"
              >
                <p className="text-stone-800 leading-relaxed">“{a.texto}”</p>
                <p className="text-xs text-amber-700 font-semibold mt-1">{a.ref}</p>
              </div>
            ))}
          </div>
        </Card>
      ))}

      <Card className="bg-rose-50/60 text-center">
        <p className="text-sm text-stone-600 leading-relaxed">
          💡 <b>Como usar:</b> escolha 1 afirmação, coloque a mão no peito e declare em voz
          alta 3 vezes. Não é positividade vazia — é concordar com o que Deus já falou sobre você.
        </p>
      </Card>
    </div>
  );
}

/* ==================== DISCIPLINAS ==================== */
function TelaDisciplinas({ marcados, alternarDisciplina }) {
  const feitas = DISCIPLINAS.filter((d) => marcados[d.id]).length;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SecaoTitulo emoji="🌿" sub="O caminho prático para sair da paralisia: pequenos passos diários com Deus.">
          Disciplinas espirituais
        </SecaoTitulo>
      </div>

      <Card className="bg-gradient-to-br from-emerald-50 to-amber-50 text-center">
        <p className="text-sm text-stone-600">Hoje você já praticou</p>
        <p className="text-3xl font-bold text-emerald-600 my-1">
          {feitas}
          <span className="text-lg text-stone-400"> / {DISCIPLINAS.length}</span>
        </p>
        <p className="text-xs text-stone-500">
          {feitas === 0
            ? "Comece por uma. Um passo já é obediência."
            : feitas === DISCIPLINAS.length
            ? "🎉 Dia cheio de Deus! Que Ele te guarde."
            : "Continue — a fidelidade no pouco abre portas."}
        </p>
      </Card>

      {DISCIPLINAS.map((d) => (
        <Card key={d.id} className={marcados[d.id] ? "ring-2 ring-emerald-200" : ""}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-semibold text-stone-800 flex items-center gap-2">
                <span className="text-xl">{d.emoji}</span> {d.nome}
              </h3>
              <p className="text-xs text-amber-700 font-medium mt-1">{d.base}</p>
              <p className="text-sm text-stone-600 mt-2">{d.porque}</p>
              <div className="mt-2 bg-emerald-50 rounded-lg px-3 py-2">
                <p className="text-xs text-emerald-800">
                  <b>Comece hoje:</b> {d.comecar}
                </p>
              </div>
            </div>
            <button
              onClick={() => alternarDisciplina(d.id)}
              className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-lg transition ${
                marcados[d.id]
                  ? "bg-emerald-500 text-white animate-pop"
                  : "bg-stone-100 text-stone-400"
              }`}
              aria-label="marcar disciplina"
            >
              {marcados[d.id] ? "✓" : "○"}
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ==================== AUTORES ==================== */
function TelaAutores() {
  const [aberto, setAberto] = useState(null);
  return (
    <div className="space-y-4">
      <SecaoTitulo
        emoji="📚"
        sub="Os maiores mestres da fé de todos os tempos. Cada um com uma palavra para o seu momento."
      >
        Grandes autores cristãos
      </SecaoTitulo>

      {AUTORES.map((a, i) => (
        <Card key={i}>
          <button
            onClick={() => setAberto(aberto === i ? null : i)}
            className="w-full text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-stone-800">{a.nome}</h3>
                <p className="text-xs text-stone-500">{a.epoca}</p>
              </div>
              <span className="text-xs bg-rose-50 text-rose-600 rounded-full px-2 py-1 whitespace-nowrap">
                {a.tema}
              </span>
            </div>
            <p className="text-sm text-amber-700 mt-1">{a.titulo}</p>
          </button>

          <div className="mt-3 bg-gradient-to-r from-amber-50 to-transparent rounded-xl p-3 border-l-2 border-amber-300">
            <p className="text-stone-800 italic leading-relaxed">“{a.frase}”</p>
          </div>

          {aberto === i && (
            <div className="mt-3 animate-fadeInUp">
              <p className="text-sm text-stone-600 leading-relaxed">{a.sobre}</p>
              <p className="text-xs font-semibold text-stone-500 mt-3 mb-1">
                📕 Leituras recomendadas:
              </p>
              <ul className="space-y-1">
                {a.livros.map((l, j) => (
                  <li key={j} className="text-sm text-stone-700 flex gap-2">
                    <span className="text-rose-400">•</span> {l}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={() => setAberto(aberto === i ? null : i)}
            className="mt-2 text-sm text-rose-600 font-semibold"
          >
            {aberto === i ? "Fechar" : "Ver bio e livros →"}
          </button>
        </Card>
      ))}
    </div>
  );
}

/* ==================== FINANÇAS ==================== */
function TelaFinancas() {
  const [renda, setRenda] = useState("");

  useEffect(() => {
    let vivo = true;
    storage.get("firmes:renda").then((r) => {
      if (vivo && r) setRenda(r.value || "");
    });
    return () => {
      vivo = false;
    };
  }, []);

  function salvarRenda(v) {
    setRenda(v);
    storage.set("firmes:renda", v);
  }

  const rendaNum = Number(String(renda).replace(/[^\d.,]/g, "").replace(",", ".")) || 0;

  return (
    <div className="space-y-4">
      <SecaoTitulo
        emoji="💰"
        sub="Jesus falou muito de dinheiro — porque onde está seu tesouro, ali está seu coração. Finanças à luz da Bíblia."
      >
        Finanças com Deus
      </SecaoTitulo>

      {/* Orçamento sugerido */}
      <Card className="bg-gradient-to-br from-amber-50 to-emerald-50">
        <SecaoTitulo emoji="🧮">Orçamento de mordomia</SecaoTitulo>
        <p className="text-xs text-stone-500 mb-3">{FINANCAS_ORCAMENTO.intro}</p>
        <label className="text-sm text-stone-600">Sua renda mensal (opcional):</label>
        <div className="flex items-center gap-2 mt-1 mb-3">
          <span className="text-stone-500">R$</span>
          <input
            value={renda}
            onChange={(e) => salvarRenda(e.target.value)}
            inputMode="decimal"
            placeholder="0,00"
            className="flex-1 rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-300"
          />
        </div>
        <div className="space-y-2">
          {FINANCAS_ORCAMENTO.faixas.map((f, i) => (
            <div key={i}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-700">{f.nome}</span>
                <span className="font-semibold text-stone-800">
                  {f.pct}%
                  {rendaNum > 0 && (
                    <span className="text-stone-500 font-normal">
                      {" "}
                      · R$ {((rendaNum * f.pct) / 100).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  )}
                </span>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden mt-1 border border-stone-100">
                <div className="h-full rounded-full" style={{ width: `${f.pct}%`, background: f.cor }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Princípios */}
      <SecaoTitulo emoji="📜">Princípios bíblicos do dinheiro</SecaoTitulo>
      {FINANCAS_PRINCIPIOS.map((p, i) => (
        <Card key={i}>
          <h3 className="font-semibold text-stone-800 text-sm">
            {i + 1}. {p.titulo}
          </h3>
          <p className="text-sm text-stone-600 mt-1 leading-relaxed">{p.texto}</p>
          <p className="text-xs text-amber-700 font-semibold mt-2">{p.ref}</p>
        </Card>
      ))}
    </div>
  );
}

/* ==================== ROTINA / LEMBRETES ==================== */
function TelaRotina({ ativos, alternarLembrete, ligados, setLigados, avisar }) {
  const [permissao, setPermissao] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "indisponivel"
  );

  async function ativarNotificacoes() {
    const r = await pedirPermissaoLembretes();
    setPermissao(r);
    if (r === "granted") {
      setLigados(true);
      avisar({ emoji: "🔔", titulo: "Lembretes ativados", corpo: "Você receberá os avisos nos horários." });
    }
  }

  return (
    <div className="space-y-4">
      <SecaoTitulo
        emoji="🔔"
        sub="Rotina espiritual com lembretes e apertadores nos horários — para você não esquecer e não adiar."
      >
        Rotina & Lembretes
      </SecaoTitulo>

      <Card className="bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-stone-800">Lembretes no navegador</p>
            <p className="text-xs text-stone-500">
              {permissao === "granted"
                ? "Permitido ✓ — chegam mesmo com a aba em segundo plano."
                : permissao === "denied"
                ? "Bloqueado no navegador. Libere nas configurações do site."
                : "Ative para receber avisos do sistema."}
            </p>
          </div>
          {permissao !== "granted" && (
            <button
              onClick={ativarNotificacoes}
              className="shrink-0 rounded-xl bg-rose-500 text-white px-4 py-2 text-sm font-semibold"
            >
              Ativar
            </button>
          )}
        </div>
        <label className="flex items-center gap-2 mt-3 text-sm text-stone-700">
          <input
            type="checkbox"
            checked={ligados}
            onChange={(e) => setLigados(e.target.checked)}
            className="w-4 h-4 accent-rose-500"
          />
          Rodar lembretes enquanto o app estiver aberto
        </label>
        <button
          onClick={() =>
            avisar({
              emoji: "⏰",
              titulo: "Apertador de agora",
              corpo: apertadorDoDia(),
            })
          }
          className="mt-3 w-full rounded-xl border border-rose-300 text-rose-600 py-2 text-sm font-semibold"
        >
          Testar um apertador agora
        </button>
      </Card>

      <SecaoTitulo emoji="🗓️">Horários da rotina</SecaoTitulo>
      {LEMBRETES_PADRAO.map((lb) => {
        const ligado = ativos[lb.id] !== false;
        return (
          <Card key={lb.id}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{lb.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-800">{lb.titulo}</span>
                  <span className="text-xs bg-stone-100 text-stone-500 rounded px-1.5 py-0.5">
                    {lb.hora}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">{lb.corpo}</p>
              </div>
              <button
                onClick={() => alternarLembrete(lb.id)}
                className={`shrink-0 w-12 h-7 rounded-full transition relative ${
                  ligado ? "bg-emerald-400" : "bg-stone-300"
                }`}
                aria-label="ligar/desligar"
              >
                <span
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all ${
                    ligado ? "left-6" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </Card>
        );
      })}

      <Card className="bg-stone-50 text-center">
        <p className="text-xs text-stone-500 leading-relaxed">
          Dica: para lembretes fixos mesmo com o celular guardado, deixe este app aberto numa aba
          e permita as notificações. Assim os apertadores chegam no horário certo.
        </p>
      </Card>
    </div>
  );
}

/* ==================== APP ==================== */
export default function App() {
  const [aba, setAba] = useState("inicio");
  const [entrou, setEntrou] = useState(false);

  // estado persistido
  const [disciplinasFeitas, setDiscFeitas] = useState({});
  const [lembretesAtivos, setLembretesAtivos] = useState({});
  const [lembretesLigados, setLembretesLigados] = useState(false);
  const [toast, setToast] = useState(null);

  // carregar estado
  useEffect(() => {
    let vivo = true;
    const diaChave = `firmes:disc:${hojeStr()}`;
    storage.get(diaChave).then((r) => {
      if (vivo && r) {
        try {
          setDiscFeitas(JSON.parse(r.value));
        } catch (e) {}
      }
    });
    storage.get("firmes:lembretesAtivos").then((r) => {
      if (vivo && r) {
        try {
          setLembretesAtivos(JSON.parse(r.value));
        } catch (e) {}
      }
    });
    storage.get("firmes:lembretesLigados").then((r) => {
      if (vivo && r) setLembretesLigados(r.value === "1");
    });
    return () => {
      vivo = false;
    };
  }, []);

  function alternarDisciplina(id) {
    setDiscFeitas((prev) => {
      const novo = { ...prev, [id]: !prev[id] };
      storage.set(`firmes:disc:${hojeStr()}`, JSON.stringify(novo));
      return novo;
    });
  }

  function alternarLembrete(id) {
    setLembretesAtivos((prev) => {
      const atual = prev[id] !== false;
      const novo = { ...prev, [id]: !atual };
      storage.set("firmes:lembretesAtivos", JSON.stringify(novo));
      return novo;
    });
  }

  function setLigados(v) {
    setLembretesLigados(v);
    storage.set("firmes:lembretesLigados", v ? "1" : "0");
  }

  function avisar(lb) {
    setToast(lb);
    setTimeout(() => setToast(null), 8000);
  }

  useLembretes({ ativo: lembretesLigados, itens: lembretesAtivos, onDisparo: avisar });

  // Tela de entrada
  if (!entrou) {
    const vers = VERSICULOS_DIA[idxDoDia(VERSICULOS_DIA.length)];
    return (
      <div className="min-h-full flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-rose-50 via-amber-50 to-white">
        <Coroa className="w-20 h-14 mb-4 animate-floaty" />
        <h1 className="text-3xl font-bold text-stone-800">FIRMES</h1>
        <p className="text-rose-500 font-medium mt-1">Vida com Deus</p>
        <p className="text-sm text-stone-500 mt-4 max-w-xs leading-relaxed">
          Saia da paralisia e da procrastinação. Enraíze-se na Palavra, declare as promessas de
          Deus e viva HOJE o que Ele chamou você a fazer.
        </p>
        <Card className="mt-6 max-w-xs">
          <p className="text-sm text-stone-700 italic">“{vers.texto}”</p>
          <p className="text-xs text-amber-700 font-semibold mt-2">{vers.ref}</p>
        </Card>
        <button
          onClick={() => setEntrou(true)}
          className="mt-8 rounded-full bg-rose-500 text-white px-8 py-3 font-semibold shadow-lg shadow-rose-200 active:scale-95 transition"
        >
          Começar hoje
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col bg-[#fbf3f1] max-w-lg mx-auto">
      {/* Cabeçalho */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-rose-100 px-4 py-3 flex items-center gap-2">
        <Coroa className="w-8 h-6" />
        <div>
          <h1 className="font-bold text-stone-800 leading-none">FIRMES</h1>
          <p className="text-[11px] text-rose-400 leading-none mt-0.5">Vida com Deus</p>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 px-4 py-4 pb-24">
        {aba === "inicio" && (
          <TelaInicio
            irPara={setAba}
            marcados={disciplinasFeitas}
            alternarDisciplina={alternarDisciplina}
          />
        )}
        {aba === "biblia" && <TelaBiblia />}
        {aba === "afirmacoes" && <TelaAfirmacoes />}
        {aba === "disciplinas" && (
          <TelaDisciplinas marcados={disciplinasFeitas} alternarDisciplina={alternarDisciplina} />
        )}
        {aba === "autores" && <TelaAutores />}
        {aba === "financas" && <TelaFinancas />}
        {aba === "rotina" && (
          <TelaRotina
            ativos={lembretesAtivos}
            alternarLembrete={alternarLembrete}
            ligados={lembretesLigados}
            setLigados={setLigados}
            avisar={avisar}
          />
        )}
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md animate-slideInRight">
          <div className="bg-stone-800 text-white rounded-2xl shadow-xl px-4 py-3 flex gap-3">
            <span className="text-2xl">{toast.emoji}</span>
            <div className="flex-1">
              <p className="font-semibold text-sm">{toast.titulo}</p>
              <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">{toast.corpo}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-stone-400 text-lg leading-none">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Navegação inferior */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white/95 backdrop-blur border-t border-rose-100 z-40">
        <div className="flex overflow-x-auto no-scrollbar">
          {ABAS.map((a) => (
            <button
              key={a.id}
              onClick={() => setAba(a.id)}
              className={`flex-1 min-w-[64px] flex flex-col items-center gap-0.5 py-2 text-[11px] transition ${
                aba === a.id ? "text-rose-600" : "text-stone-400"
              }`}
            >
              <span className={`text-lg ${aba === a.id ? "animate-pop" : ""}`}>{a.emoji}</span>
              {a.nome}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
