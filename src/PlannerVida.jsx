import { useState, useEffect, useMemo, useRef } from "react";
import {
  C, serif, REFEICOES, SEMANA1, SEMANA2, ROTINA, CARDAPIO, TREINO, PREP,
  MARIDO, RECEITAS, CHAS, COMPRAS, HABITOS, EMOCOES, TROCAS, TEMAS, AVISOS_PADRAO, FORCA,
} from "./data.js";
import { storage } from "./storage.js";
import { construirIndice, buscar } from "./searchIndex.js";
import { useAvisos, pedirPermissaoAvisos, proximoAviso } from "./avisos.js";
import { RamoRosa, OliveiraFaixa, Coroa } from "./Ilustracoes.jsx";
import ChatBot from "./ChatBot.jsx";

/* ==========================================================
   PLANNER VIDA — 4 SEMANAS  (v2: assistente, buscador, avisos,
   animações e ilustrações)
   ========================================================== */

const PREFIXO = "plannerVida:v2";
function apelido(nome) {
  return nome.trim().toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 24);
}
function chaveDe(nome, codigo) {
  return `${PREFIXO}:${apelido(nome)}:${codigo}`;
}
const META_COPOS = 8;
const META_PROTEINA_PADRAO = 110; // g/dia — meta padrão (editável). Base: ganho muscular ~1,6 g/kg.
// Alimentos ricos em proteína. por100 = g de proteína por 100g do alimento (já preparado);
// porcao = porção sugerida em g. A proteína é calculada: por100 * gramas / 100.
const PROTEINA_ALIMENTOS = [
  { nome: "Frango grelhado", emoji: "🍗", por100: 31, porcao: 120 },
  { nome: "Peixe (tilápia)", emoji: "🐟", por100: 26, porcao: 120 },
  { nome: "Carne magra (patinho)", emoji: "🥩", por100: 31, porcao: 120 },
  { nome: "Ovo", emoji: "🥚", por100: 13, porcao: 50 },
  { nome: "Whey (pó)", emoji: "🥤", por100: 80, porcao: 30 },
  { nome: "Atum (em água)", emoji: "🥫", por100: 25, porcao: 120 },
  { nome: "Iogurte grego", emoji: "🥛", por100: 9, porcao: 170 },
  { nome: "Queijo cottage", emoji: "🧀", por100: 11, porcao: 100 },
  { nome: "Feijão cozido", emoji: "🫘", por100: 5, porcao: 130 },
  { nome: "Lentilha cozida", emoji: "🥣", por100: 9, porcao: 100 },
  { nome: "Grão de bico cozido", emoji: "🥣", por100: 9, porcao: 100 },
  { nome: "Tofu", emoji: "🧈", por100: 8, porcao: 100 },
];
const proteinaDe = (por100, gramas) => Math.round((por100 * gramas) / 100);
const PEDRAS_POR_COROA = 50;
const DIAS_PT = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
const MESES_PT = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

const ABAS = [
  ["semanas", "📅 4 Semanas", C.rose, C.roseSoft],
  ["buscar", "🔎 Buscar", C.aqua, C.blueSoft],
  ["temas", "📚 Temas", C.indigo, C.indigoSoft],
  ["emocoes", "💗 Emoções", C.rose, C.roseSoft],
  ["proteina", "🥩 Proteína", C.green, C.greenSoft],
  ["forca", "🏋️ Força", C.green, C.greenSoft],
  ["treino", "💪 Treino", C.green, C.greenSoft],
  ["prep", "🍲 Domingo", C.gold, C.goldSoft],
  ["marido", "🥪 Marido", C.blue, C.blueSoft],
  ["receitas", "🍳 Receitas", C.rose, C.roseSoft],
  ["chas", "🍵 Chás", C.green, C.greenSoft],
  ["compras", "🛒 Compras", C.gold, C.goldSoft],
  ["habitos", "🌅 Hábitos", C.indigo, C.indigoSoft],
  ["avisos", "🔔 Avisos", C.blue, C.blueSoft],
];

/* Confete simples ao completar 100% */
function Confete() {
  const pecas = useMemo(
    () =>
      Array.from({ length: 46 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        dur: 2.2 + Math.random() * 1.6,
        cor: [C.rose, C.gold, C.green, C.aqua, C.indigo][Math.floor(Math.random() * 5)],
        rot: Math.random() * 360,
      })),
    []
  );
  return (
    <>
      {pecas.map((p, i) => (
        <span key={i} className="confete"
          style={{ left: `${p.left}vw`, background: p.cor, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, transform: `rotate(${p.rot}deg)` }} />
      ))}
    </>
  );
}

export default function PlannerVida({ usuario, onVoltar }) {
  const [aba, setAba] = useState("semanas");
  const [semana, setSemana] = useState(1);
  const [versao, setVersao] = useState("padrao");
  const [blocoTreino, setBlocoTreino] = useState("A");
  const [checks, setChecks] = useState({});
  const [copos, setCopos] = useState({});
  const [proteinaMeta, setProteinaMeta] = useState(META_PROTEINA_PADRAO);
  const [proteinaDia, setProteinaDia] = useState({}); // { "2026-7-23": [{nome,g}] }
  const [protAlimIdx, setProtAlimIdx] = useState(0);   // alimento escolhido no peso personalizado
  const [protGramas, setProtGramas] = useState("");     // gramas digitados
  const [mostrarTabelaProt, setMostrarTabelaProt] = useState(false);
  const [diario, setDiario] = useState([]);
  const [aberto, setAberto] = useState("s1d1");
  const [recAberta, setRecAberta] = useState(-1);
  const [temaAberto, setTemaAberto] = useState(-1);
  const [emoSel, setEmoSel] = useState(null);
  const [nota, setNota] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erroSalvar, setErroSalvar] = useState(false);
  const [sessao, setSessao] = useState(null);
  const [nomeInput, setNomeInput] = useState("");
  const [codigoInput, setCodigoInput] = useState("");
  const [erroEntrada, setErroEntrada] = useState("");
  const [mimo, setMimo] = useState("");
  const [gravidez, setGravidez] = useState(false);

  // novos estados: assistente, buscador, avisos, toasts, confete
  const [aprendidos, setAprendidos] = useState([]);
  const [reforcos, setReforcos] = useState({});
  const [buscaConsulta, setBuscaConsulta] = useState("");
  const [avisosAtivo, setAvisosAtivo] = useState(false);
  const [avisosItens, setAvisosItens] = useState({});
  const [permissaoAvisos, setPermissaoAvisos] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "indisponivel"
  );
  const [toasts, setToasts] = useState([]);
  const [confeteKey, setConfeteKey] = useState(null);
  const pctAnterior = useRef({});

  const indice = useMemo(() => construirIndice(), []);

  const hoje = new Date();
  const chaveHoje = `${hoje.getFullYear()}-${hoje.getMonth() + 1}-${hoje.getDate()}`;
  const diaSemanaIdx = hoje.getDay();
  const dataBonita = `${DIAS_PT[hoje.getDay()]}, ${hoje.getDate()} de ${MESES_PT[hoje.getMonth()]}`;

  /* ---------- avisos (hook sempre montado) ---------- */
  function empurrarToast(av) {
    const id = `${av.id}-${Date.now()}`;
    setToasts((t) => [...t, { ...av, key: id }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.key !== id)), 9000);
  }
  useAvisos({ ativo: avisosAtivo, itens: avisosItens, onDisparo: empurrarToast });

  useEffect(() => {
    if (!sessao) return;
    let ativo = true;
    setCarregando(true);
    (async () => {
      try {
        const r = await storage.get(sessao.chave);
        if (r && r.value && ativo) {
          const s = JSON.parse(r.value);
          setChecks(s.checks || {});
          setCopos(s.copos || {});
          setProteinaMeta(s.proteinaMeta || META_PROTEINA_PADRAO);
          setProteinaDia(s.proteinaDia || {});
          setDiario(s.diario || []);
          setVersao(s.versao || "padrao");
          setSemana(s.semana || 1);
          setMimo(s.mimo || "");
          setGravidez(!!s.gravidez);
          setAprendidos(s.aprendidos || []);
          setReforcos(s.reforcos || {});
          setAvisosAtivo(!!s.avisosAtivo);
          setAvisosItens(s.avisosItens || {});
        }
      } catch (e) {
        // primeira abertura — começa do zero
      }
      if (ativo) setCarregando(false);
    })();
    return () => { ativo = false; };
  }, [sessao]);

  /* Entra automaticamente com o nome do login inicial — sem pedir de novo. */
  useEffect(() => {
    if (usuario && !sessao) {
      setSessao({ nome: usuario, chave: chaveDe(usuario, "acesso") });
    }
  }, [usuario, sessao]);

  async function salvar(parcial) {
    if (!sessao) return;
    const estado = {
      checks, copos, proteinaMeta, proteinaDia, diario, versao, semana, mimo, gravidez,
      aprendidos, reforcos, avisosAtivo, avisosItens, ...parcial,
    };
    try {
      const r = await storage.set(sessao.chave, JSON.stringify(estado));
      setErroSalvar(!r);
    } catch (e) {
      setErroSalvar(true);
    }
  }

  function entrar() {
    const nome = nomeInput.trim();
    const codigo = codigoInput.trim();
    if (nome.length < 2 || !apelido(nome)) {
      setErroEntrada("Escreva o seu nome para criar ou abrir o seu espaço.");
      return;
    }
    if (!/^[0-9]{4,8}$/.test(codigo)) {
      setErroEntrada("O código precisa ter de 4 a 8 números.");
      return;
    }
    setErroEntrada("");
    setChecks({}); setCopos({}); setDiario([]); setMimo(""); setGravidez(false);
    setAprendidos([]); setReforcos({}); setAvisosAtivo(false); setAvisosItens({});
    setVersao("padrao"); setSemana(1); setAberto("s1d1"); setAba("semanas");
    setSessao({ nome, chave: chaveDe(nome, codigo) });
  }

  function sair() {
    setSessao(null);
    setCodigoInput("");
    setChecks({}); setCopos({}); setDiario([]); setMimo(""); setGravidez(false);
    setAprendidos([]); setReforcos({});
  }

  function TelaEntrada() {
    return (
      <div style={{ minHeight: "100vh", background: C.paper, color: C.ink, fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <div className="mx-auto px-5 pb-16" style={{ maxWidth: 460 }}>
          <header className="pt-14 pb-6 text-center">
            <div className="flex justify-center mb-2 animate-floaty">
              <RamoRosa width={140} />
            </div>
            <div style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 700, fontSize: 42, color: C.rose, lineHeight: 1.05 }}>
              Meu Plano
            </div>
            <div className="text-xs uppercase mt-2" style={{ color: C.gold, letterSpacing: "0.22em", fontWeight: 700 }}>
              4 semanas · corpo e espírito
            </div>
          </header>

          <div className="rounded-3xl px-5 py-6 animate-fadeInUp" style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: "0 6px 24px rgba(183,110,121,0.10)" }}>
            <label htmlFor="campo-nome" className="block text-base font-bold mb-2">Seu nome</label>
            <input id="campo-nome" type="text" value={nomeInput} autoComplete="off"
              onChange={(ev) => setNomeInput(ev.target.value)}
              placeholder="ex: Jen"
              className="w-full rounded-2xl px-4 py-3.5 text-base mb-4"
              style={{ background: C.roseSoft, border: `1px solid ${C.line}`, color: C.ink }} />

            <label htmlFor="campo-codigo" className="block text-base font-bold mb-2">Seu código (4 a 8 números)</label>
            <input id="campo-codigo" type="password" inputMode="numeric" autoComplete="off"
              value={codigoInput}
              onChange={(ev) => setCodigoInput(ev.target.value.replace(/[^0-9]/g, "").slice(0, 8))}
              placeholder="••••"
              className="w-full rounded-2xl px-4 py-3.5 text-base mb-4"
              style={{ background: C.roseSoft, border: `1px solid ${C.line}`, color: C.ink, letterSpacing: "0.3em" }} />

            {erroEntrada && (
              <div className="rounded-xl px-3 py-2 mb-3 text-sm" style={{ background: "#FBEAEA", color: "#8C3B3B", border: "1px solid #E8C9C9" }}>
                {erroEntrada}
              </div>
            )}

            <button onClick={entrar}
              className="w-full rounded-2xl py-4 text-lg font-bold transition-transform active:scale-95"
              style={{ background: C.rose, color: "#fff" }}>
              Entrar no meu plano
            </button>

            <p className="text-sm mt-4" style={{ color: C.inkSoft, lineHeight: 1.6 }}>
              Na primeira vez, escolha um nome e um código — eles criam o seu espaço. Depois, digite os mesmos para reencontrar tudo que já marcou.
            </p>
            <p className="text-sm mt-3" style={{ color: C.inkSoft, lineHeight: 1.6 }}>
              <b style={{ color: C.rose }}>Atenção:</b> esse código separa o seu progresso do de outras pessoas, mas não é segurança de verdade. Não use a senha do banco nem do e-mail.
            </p>
          </div>

          <div className="flex justify-center mt-6"><OliveiraFaixa width={240} /></div>
          <p className="text-center text-xs mt-3" style={{ fontFamily: serif, fontStyle: "italic", color: C.gold }}>
            “Tudo posso naquele que me fortalece.” — Fp 4:13
          </p>
        </div>
      </div>
    );
  }

  function marcar(id) {
    const novo = { ...checks, [id]: !checks[id] };
    setChecks(novo);
    salvar({ checks: novo });
  }

  function marcarCopo(n) {
    const atual = copos[chaveHoje] || 0;
    const novo = { ...copos, [chaveHoje]: n === atual ? n - 1 : n };
    setCopos(novo);
    salvar({ copos: novo });
  }

  function addProteina(item) {
    const lista = proteinaDia[chaveHoje] || [];
    const novo = { ...proteinaDia, [chaveHoje]: [...lista, { nome: item.nome, g: item.g }] };
    setProteinaDia(novo);
    salvar({ proteinaDia: novo });
  }
  function removerProteina(idx) {
    const lista = proteinaDia[chaveHoje] || [];
    const nova = lista.filter((_, i) => i !== idx);
    const novo = { ...proteinaDia, [chaveHoje]: nova };
    setProteinaDia(novo);
    salvar({ proteinaDia: novo });
  }
  function alterarMetaProteina(v) {
    const n = Math.max(0, Math.min(400, Number(v) || 0));
    setProteinaMeta(n);
    salvar({ proteinaMeta: n });
  }

  function trocarVersao(v) { setVersao(v); salvar({ versao: v }); }
  function trocarSemana(n) {
    setSemana(n);
    setAberto(n === 1 ? "s1d1" : n === 2 ? "s2d1" : n === 3 ? "s3d0" : "s4d0");
    setBlocoTreino(n === 4 ? "B" : "A");
    salvar({ semana: n });
  }

  function registrarEmocao() {
    if (!emoSel) return;
    const d = new Date();
    const novo = [{
      emocao: emoSel,
      nota: nota.trim(),
      data: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      hora: d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    }, ...diario].slice(0, 80);
    setDiario(novo);
    setEmoSel(null);
    setNota("");
    salvar({ diario: novo });
  }

  function apagarEmocao(i) {
    const novo = diario.filter((_, j) => j !== i);
    setDiario(novo);
    salvar({ diario: novo });
  }

  function limparSemana() {
    const prefixo = `s${semana}`;
    const novo = { ...checks };
    Object.keys(novo).forEach((k) => { if (k.indexOf(prefixo) === 0) delete novo[k]; });
    setChecks(novo);
    salvar({ checks: novo });
  }

  /* ---------- aprendizado do assistente ---------- */
  function aoAprender(novos) { setAprendidos(novos); salvar({ aprendidos: novos }); }
  function aoReforcar(novos) { setReforcos(novos); salvar({ reforcos: novos }); }
  function abrirBusca(consulta) { setBuscaConsulta(consulta); setAba("buscar"); }

  /* ---------- avisos ---------- */
  async function alternarAvisos() {
    if (!avisosAtivo) {
      const perm = await pedirPermissaoAvisos();
      setPermissaoAvisos(perm);
    }
    const novo = !avisosAtivo;
    setAvisosAtivo(novo);
    salvar({ avisosAtivo: novo });
  }
  function alternarItemAviso(id) {
    const atual = avisosItens[id] !== false;
    const novo = { ...avisosItens, [id]: !atual };
    setAvisosItens(novo);
    salvar({ avisosItens: novo });
  }

  /* ---------- navegar para um resultado da busca ---------- */
  function irParaResultado(item) {
    if (item.aba === "receitas") {
      const i = RECEITAS.findIndex((r) => r.n === item.titulo);
      if (i >= 0) setRecAberta(i);
    } else if (item.aba === "temas") {
      const i = TEMAS.findIndex((t) => t.n === item.titulo);
      if (i >= 0) setTemaAberto(i);
    } else if (item.aba === "semanas" && item.semana) {
      trocarSemana(item.semana);
    }
    setAba(item.aba);
  }

  const abaInfo = ABAS.find((a) => a[0] === aba);
  const accent = abaInfo[2], soft = abaInfo[3];

  /* ---------- progresso da aba ativa ---------- */
  const progresso = useMemo(() => {
    let ids = [];
    if (aba === "semanas") {
      if (semana <= 2) {
        const dias = semana === 1 ? SEMANA1 : SEMANA2;
        dias.forEach((d) => REFEICOES.forEach((r) => { if (d[versao][r[0]]) ids.push(d.k + versao + r[0]); }));
      } else {
        const menus = semana === 3 ? CARDAPIO.s3 : CARDAPIO.s4;
        menus.forEach((_, i) => ROTINA.forEach((r) => ids.push(`s${semana}d${i}-${r.id}`)));
      }
    } else if (aba === "treino") {
      ids = TREINO[blocoTreino].map((t) => `tr-${blocoTreino}-${t.id}`);
    } else if (aba === "prep") {
      ids = PREP[blocoTreino].map((p) => `pr-${blocoTreino}-${p.id}`);
    } else if (aba === "marido") {
      ids = MARIDO[blocoTreino].map((m) => `md-${blocoTreino}-${m.id}`);
    } else if (aba === "compras") {
      COMPRAS.forEach((c, i) => c.it.forEach((_, j) => ids.push(`c${i}-${j}`)));
    } else if (aba === "habitos") {
      ids = HABITOS.map((_, i) => `h${i}`);
    }
    const feitos = ids.filter((i) => checks[i]).length;
    return { feitos, total: ids.length, pct: ids.length ? feitos / ids.length : 0 };
  }, [aba, semana, versao, blocoTreino, checks]);

  /* dispara confete quando uma seção chega a 100% */
  useEffect(() => {
    const chave = `${aba}-${semana}-${blocoTreino}`;
    const antes = pctAnterior.current[chave] ?? 0;
    if (progresso.total > 0 && progresso.pct === 1 && antes < 1) {
      setConfeteKey(Date.now());
      setTimeout(() => setConfeteKey(null), 4200);
    }
    pctAnterior.current[chave] = progresso.pct;
  }, [progresso.pct, progresso.total, aba, semana, blocoTreino]);

  const R = 30, CIRC = 2 * Math.PI * R;

  /* ---------- adaptação para tentando engravidar ---------- */
  function adaptar(txt) {
    if (!gravidez || !txt) return txt;
    let t = txt;
    if (t.indexOf("chá de hibisco") !== -1)
      t = t.replace("chá de hibisco", "chá de gengibre 🤍 (troca do hibisco)");
    else if (t.indexOf("chá verde") !== -1)
      t = t.replace("chá verde", "chá verde 🤍 (só 1 xícara, longe das refeições)");
    if (t.indexOf("chá Tira Fome") !== -1)
      t = t + " 🤍 sem hibisco — só maçã, canela e gengibre";
    return t;
  }

  /* ---------- pedras da coroa ---------- */
  const pedras = useMemo(() => {
    const marcados = Object.values(checks).filter(Boolean).length;
    const diasDeAgua = Object.values(copos).filter((v) => v >= META_COPOS).length;
    return marcados + diasDeAgua;
  }, [checks, copos]);

  const coroaCheia = pedras > 0 && pedras % PEDRAS_POR_COROA === 0;
  const naCoroa = coroaCheia ? PEDRAS_POR_COROA : pedras % PEDRAS_POR_COROA;
  const coroasProntas = Math.floor(pedras / PEDRAS_POR_COROA);
  const gemasAcesas = Math.floor(naCoroa / (PEDRAS_POR_COROA / 10));

  /* ---------- componentes internos ---------- */
  const estiloCartao = { background: C.card, border: `1px solid ${C.line}`, padding: 16 };
  const estiloTitulo = { fontFamily: serif, fontStyle: "italic", fontSize: 22, color: C.rose };

  const Item = ({ id, texto, sub, destaque, estrela }) => {
    const on = !!checks[id];
    return (
      <button onClick={() => marcar(id)} aria-pressed={on}
        className="w-full flex items-start gap-3 rounded-2xl px-3 py-3 text-left mb-2 transition-all active:scale-[0.99]"
        style={{ background: on ? soft : C.card, border: `1px solid ${destaque && !on ? accent : C.line}`, opacity: on ? 0.85 : 1 }}>
        <span aria-hidden="true" className={`flex items-center justify-center rounded-full shrink-0 ${on ? "animate-pop" : ""}`}
          style={{ width: 26, height: 26, marginTop: 1, background: on ? accent : "transparent", border: `2px solid ${on ? accent : C.line}`, color: "#fff", fontSize: 14, fontWeight: 700 }}>
          {on ? "✓" : ""}
        </span>
        <span className="flex-1">
          <span className="block text-sm" style={{ lineHeight: 1.5, textDecoration: on ? "line-through" : "none", color: on ? C.inkSoft : C.ink, fontWeight: estrela ? 700 : 500 }}>
            {texto}{estrela ? " ★" : ""}
          </span>
          {sub && (
            <span className="block text-xs mt-1" style={{ color: destaque ? accent : C.inkSoft, fontWeight: destaque ? 700 : 400 }}>
              {sub}{destaque ? " · hoje" : ""}
            </span>
          )}
        </span>
      </button>
    );
  };

  /* ---------- telas ---------- */

  function TelaSemanas() {
    const ehVida = semana <= 2;
    return (
      <>
        <div className="flex gap-2 mb-3">
          {[1, 2, 3, 4].map((n) => {
            const sel = n === semana;
            const cor = n <= 2 ? C.rose : C.indigo;
            return (
              <button key={n} onClick={() => trocarSemana(n)}
                className="flex-1 rounded-2xl py-2 text-center transition-transform active:scale-95"
                style={{ background: sel ? cor : C.card, color: sel ? "#fff" : C.ink, border: `1px solid ${sel ? cor : C.line}` }}>
                <span className="block text-xs" style={{ opacity: 0.8 }}>Semana</span>
                <span className="block font-bold" style={{ fontSize: 17, fontFamily: serif }}>{n}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl px-4 py-3 mb-3 animate-fadeInUp" style={{ background: ehVida ? C.roseSoft : C.indigoSoft }}>
          <div className="text-xs uppercase" style={{ letterSpacing: "0.16em", color: ehVida ? C.rose : C.indigo, fontWeight: 700 }}>
            {ehVida ? "Bloco 1 · Dieta VIDA" : "Bloco 2 · Planner da Jen"}
          </div>
          <div className="text-sm mt-1" style={{ color: C.ink, lineHeight: 1.5 }}>
            {ehVida
              ? "Vestidas de Intimidade com Deus para Amar — desinflamação e eliminação de peso, com Apple Day no meio da semana."
              : "Rotina do dia, treino, preparo de domingo e marmita do marido — o ritmo de manutenção, com proteína em todas as refeições."}
          </div>
        </div>

        <button onClick={() => { const v = !gravidez; setGravidez(v); salvar({ gravidez: v }); }}
          className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 mb-3 text-left"
          style={{ background: gravidez ? "#F3E9F0" : C.card, border: `1px solid ${gravidez ? "#C99BB8" : C.line}` }}>
          <span aria-hidden="true" className="flex items-center justify-center rounded-full shrink-0"
            style={{ width: 26, height: 26, background: gravidez ? "#B5769B" : "transparent", border: `2px solid ${gravidez ? "#B5769B" : C.line}`, color: "#fff", fontSize: 14 }}>
            {gravidez ? "✓" : ""}
          </span>
          <span className="flex-1">
            <span className="block text-sm font-bold" style={{ color: gravidez ? "#8A4E72" : C.ink }}>
              🤍 Estou tentando engravidar (ou já estou grávida)
            </span>
            <span className="block text-xs mt-0.5" style={{ color: C.inkSoft, lineHeight: 1.45 }}>
              {gravidez
                ? "Ativado: os chás de risco já aparecem trocados nos dias. Evite o Apple Day e confirme tudo com o seu médico."
                : "Ative para trocar automaticamente o hibisco e ajustar os chás em todos os dias."}
            </span>
          </span>
        </button>

        {gravidez && (
          <div className="rounded-xl px-3 py-2 mb-3 text-xs" style={{ background: "#F3E9F0", border: "1px solid #D9BBCD", color: "#7A4463", lineHeight: 1.5 }}>
            🤍 Modo tentando engravidar ativo. Pule os dias de Apple Day e os mais restritos e prefira as semanas 3 e 4. Veja o tema “Preparação para engravidar”.
          </div>
        )}

        {ehVida ? (
          <>
            <div className="text-xs font-bold mb-2" style={{ color: C.indigo, letterSpacing: "0.08em" }}>ESCOLHA O SEU PLANO:</div>
            <div className="flex gap-2 rounded-2xl p-1.5 mb-3" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              {[["padrao", "Desinflamação + Eliminação de Peso", C.rose], ["proteina", "Somente Desinflamação (com proteína)", C.indigo]].map(([v, rot, cor]) => (
                <button key={v} onClick={() => trocarVersao(v)} className="flex-1 rounded-xl py-2 px-2 text-xs font-bold"
                  style={{ background: versao === v ? cor : "transparent", color: versao === v ? "#fff" : C.inkSoft, lineHeight: 1.3 }}>
                  {rot}
                </button>
              ))}
            </div>
            {versao === "proteina" && (
              <div className="rounded-xl px-3 py-2 mb-3 text-xs" style={{ background: C.greenSoft, border: `1px solid ${C.green}`, color: "#2C5A2C", lineHeight: 1.5 }}>
                💪 Versão reforçada para ganho de músculo: <b>frango ou peixe 150g</b> no almoço e <b>2 ovos ou 1 shake de whey</b> no jantar. Acompanhe o total na aba <b>🥩 Proteína</b> (meta ~110g/dia).
              </div>
            )}
            <div className="rounded-xl px-3 py-2 mb-3 text-xs" style={{ background: C.goldSoft, border: `1px solid ${C.gold}`, color: "#7A5B12", lineHeight: 1.5 }}>
              💧 Todos os dias: em jejum, beber 500ml de água &nbsp;•&nbsp; 🚫 Sem carboidrato no jantar
            </div>
            <div className="rounded-xl px-3 py-2 mb-3 text-xs" style={{ background: "#FBEAEA", border: "1px solid #E8C9C9", color: "#8C3B3B", lineHeight: 1.5 }}>
              🤍 Grávida, amamentando ou tentando engravidar? Pule o Apple Day e os dias mais restritos e use as semanas 3 e 4. Veja o tema “Preparação para engravidar”.
            </div>
            {(semana === 1 ? SEMANA1 : SEMANA2).map((d) => {
              const p = d[versao];
              const lista = REFEICOES.filter((r) => p[r[0]]);
              const feitos = lista.filter((r) => checks[d.k + versao + r[0]]).length;
              const abertoAgora = aberto === d.k;
              return (
                <div key={d.k} className="rounded-2xl mb-2 overflow-hidden" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                  <button onClick={() => setAberto(abertoAgora ? null : d.k)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left">
                    <span className="font-bold text-sm" style={{ color: d.apple ? "#B3261E" : C.indigo }}>{d.n}{d.apple && gravidez ? " · pule 🤍" : ""}</span>
                    <span className="text-xs" style={{ color: feitos === lista.length ? C.green : C.inkSoft }}>
                      {feitos}/{lista.length}{feitos === lista.length ? " 🎉" : ""} {abertoAgora ? "▲" : "▼"}
                    </span>
                  </button>
                  {abertoAgora && (
                    <div className="px-3 pb-3 animate-fadeInUp">
                      {lista.map((r) => {
                        const id = d.k + versao + r[0];
                        const on = !!checks[id];
                        return (
                          <button key={id} onClick={() => marcar(id)} aria-pressed={on}
                            className="w-full flex items-start gap-3 rounded-xl px-3 py-2.5 text-left mb-1.5 active:scale-[0.99] transition-transform"
                            style={{ background: on ? C.greenSoft : C.roseSoft }}>
                            <span aria-hidden="true" className={`flex items-center justify-center rounded-full shrink-0 ${on ? "animate-pop" : ""}`}
                              style={{ width: 22, height: 22, marginTop: 2, background: on ? C.green : "transparent", border: `2px solid ${on ? C.green : C.line}`, color: "#fff", fontSize: 12 }}>
                              {on ? "✓" : ""}
                            </span>
                            <span>
                              <span className="block text-xs font-bold mb-0.5" style={{ color: C.indigo }}>{r[1]}</span>
                              <span className="block text-sm" style={{ lineHeight: 1.45, color: on ? C.inkSoft : C.ink, textDecoration: on ? "line-through" : "none" }}>{adaptar(p[r[0]])}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <>
            <div className="rounded-xl px-3 py-2 mb-3 text-xs" style={{ background: C.blueSoft, border: `1px solid ${C.blue}30`, color: C.blue, lineHeight: 1.5 }}>
              🕐 Janela de 12h: jantar até 19h30, café da manhã às 7h30. Proteína em todas as refeições.
            </div>
            {(semana === 3 ? CARDAPIO.s3 : CARDAPIO.s4).map((dia, i) => {
              const chave = `s${semana}d${i}`;
              const abertoAgora = aberto === chave;
              const feitos = ROTINA.filter((r) => checks[`${chave}-${r.id}`]).length;
              const ehHoje = i === (diaSemanaIdx === 0 ? 6 : diaSemanaIdx - 1);
              return (
                <div key={chave} className="rounded-2xl mb-2 overflow-hidden" style={{ background: C.card, border: `1px solid ${ehHoje ? C.indigo : C.line}` }}>
                  <button onClick={() => setAberto(abertoAgora ? null : chave)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left">
                    <span className="font-bold text-sm" style={{ color: C.indigo }}>{dia.n}{ehHoje ? " · hoje" : ""}</span>
                    <span className="text-xs" style={{ color: feitos === ROTINA.length ? C.green : C.inkSoft }}>
                      {feitos}/{ROTINA.length}{feitos === ROTINA.length ? " 🎉" : ""} {abertoAgora ? "▲" : "▼"}
                    </span>
                  </button>
                  {abertoAgora && (
                    <div className="px-3 pb-3 animate-fadeInUp">
                      <div className="rounded-xl px-3 py-2.5 mb-2" style={{ background: C.roseSoft }}>
                        <div className="text-xs font-bold mb-1" style={{ color: C.rose, letterSpacing: "0.08em" }}>CARDÁPIO DO DIA</div>
                        <div className="text-sm" style={{ lineHeight: 1.6, color: C.ink }}>
                          <b>Café:</b> {adaptar(dia.cafe)}<br />
                          <b>Almoço:</b> {adaptar(dia.almoco)}<br />
                          <b>Lanche:</b> {adaptar(dia.lanche)}<br />
                          <b>Jantar:</b> {adaptar(dia.jantar)}
                        </div>
                      </div>
                      <div className="text-xs font-bold mb-2" style={{ color: C.indigo, letterSpacing: "0.08em" }}>ROTINA</div>
                      {ROTINA.map((r) => {
                        const id = `${chave}-${r.id}`;
                        const on = !!checks[id];
                        return (
                          <button key={id} onClick={() => marcar(id)} aria-pressed={on}
                            className="w-full flex items-start gap-3 rounded-xl px-3 py-2 text-left mb-1.5 active:scale-[0.99] transition-transform"
                            style={{ background: on ? C.greenSoft : "#FAF7F7" }}>
                            <span aria-hidden="true" className={`flex items-center justify-center rounded-full shrink-0 ${on ? "animate-pop" : ""}`}
                              style={{ width: 22, height: 22, marginTop: 1, background: on ? C.green : "transparent", border: `2px solid ${on ? C.green : C.line}`, color: "#fff", fontSize: 12 }}>
                              {on ? "✓" : ""}
                            </span>
                            <span className="flex-1">
                              <span className="block text-sm" style={{ color: on ? C.inkSoft : C.ink, textDecoration: on ? "line-through" : "none", fontWeight: r.star ? 700 : 500 }}>
                                {r.txt}{r.star ? " ★" : ""}
                              </span>
                              <span className="block text-xs mt-0.5" style={{ color: C.inkSoft }}>{r.hora}</span>
                            </span>
                          </button>
                        );
                      })}
                      {ehHoje && ContadorAgua()}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        <button onClick={limparSemana} className="w-full rounded-2xl py-3 text-xs font-bold mt-2"
          style={{ background: C.card, border: `1px solid ${C.line}`, color: C.inkSoft }}>
          🔄 Recomeçar a semana {semana} (limpar as marcações)
        </button>
      </>
    );
  }

  function ContadorAgua() {
    const atual = copos[chaveHoje] || 0;
    const ok = atual >= META_COPOS;
    return (
      <div className="rounded-xl px-3 py-3 mt-2" style={{ background: ok ? C.blueSoft : "#FAF7F7", border: `1px solid ${C.line}` }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold" style={{ color: ok ? C.aqua : C.ink }}>
            Água de hoje {ok ? "— meta batida! 💧" : ""}
          </span>
          <span className="text-xs" style={{ color: C.inkSoft }}>
            {atual}/{META_COPOS} copos (~{(atual * 0.25).toFixed(2).replace(".", ",")}L de 2L)
          </span>
        </div>
        <div className="flex gap-1.5" role="group" aria-label="Copos de água">
          {Array.from({ length: META_COPOS }, (_, i) => i + 1).map((n) => {
            const cheio = n <= atual;
            return (
              <button key={n} onClick={() => marcarCopo(n)} aria-label={`${n}º copo`} aria-pressed={cheio}
                className={`flex-1 rounded-lg transition-transform active:scale-90 ${cheio ? "animate-pop" : ""}`}
                style={{ height: 34, background: cheio ? C.aqua : "transparent", border: `2px solid ${cheio ? C.aqua : C.line}`, color: cheio ? "#fff" : C.inkSoft, fontSize: 13 }}>
                {cheio ? "💧" : n}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function ListaBloco({ dados, prefixo, titulo, legenda }) {
    return (
      <>
        <h2 className="mb-3" style={estiloTitulo}>{titulo}</h2>
        <div className="flex gap-2 mb-3">
          {[["A", "Semana A (1 e 3)"], ["B", "Semana B (2 e 4)"]].map(([b, rot]) => (
            <button key={b} onClick={() => setBlocoTreino(b)} className="flex-1 rounded-full py-2 text-xs font-bold"
              style={{ background: blocoTreino === b ? accent : C.card, color: blocoTreino === b ? "#fff" : C.ink, border: `1px solid ${blocoTreino === b ? accent : C.line}` }}>
              {rot}
            </button>
          ))}
        </div>
        <p className="text-xs mb-3" style={{ color: C.inkSoft, lineHeight: 1.5 }}>{legenda}</p>
        {dados[blocoTreino].map((item) => (
          <Item key={item.id} id={`${prefixo}-${blocoTreino}-${item.id}`} texto={item.txt} sub={item.dia}
            destaque={item.diaIdx !== undefined && item.diaIdx === diaSemanaIdx} />
        ))}
      </>
    );
  }

  function TelaTemas() {
    return (
      <>
        <h2 className="mb-3" style={estiloTitulo}>Temas do programa</h2>
        <p className="text-sm mb-4" style={{ color: C.inkSoft, lineHeight: 1.6 }}>
          O conteúdo que sustenta o plano. Leia um por semana e aplique um hábito de cada vez.
        </p>
        {TEMAS.map((t, i) => (
          <div key={t.n} className="rounded-2xl mb-2 overflow-hidden" style={{ background: C.card, border: `1px solid ${C.line}` }}>
            <button onClick={() => setTemaAberto(temaAberto === i ? -1 : i)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-left">
              <span className="text-sm font-bold" style={{ color: C.indigo }}>{t.n}</span>
              <span style={{ color: C.rose }}>{temaAberto === i ? "▲" : "▼"}</span>
            </button>
            {temaAberto === i && (
              <div className="px-4 pb-4 animate-fadeInUp">
                {t.blocos.map((b) => (
                  <div key={b.t} className="mb-3">
                    <div className="text-xs font-bold mb-1.5" style={{ color: C.rose, letterSpacing: "0.06em", textTransform: "uppercase" }}>{b.t}</div>
                    <ul className="space-y-1">
                      {b.l.map((linha, j) => (
                        <li key={j} className="text-sm flex gap-2" style={{ color: C.ink, lineHeight: 1.55 }}>
                          <span style={{ color: C.gold }}>•</span><span>{linha}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="rounded-2xl px-4 py-3 text-sm" style={{ background: C.indigoSoft, color: C.indigo, lineHeight: 1.55 }}>
          💛 Estes textos são educativos e não substituem o acompanhamento de médico e nutricionista — principalmente em gestação, amamentação, uso de medicação ou doença crônica.
        </div>
      </>
    );
  }

  function TelaBuscar() {
    const resultados = buscar(indice, buscaConsulta);
    return (
      <>
        <h2 className="mb-1" style={estiloTitulo}>Buscador</h2>
        <p className="text-sm mb-3" style={{ color: C.inkSoft, lineHeight: 1.6 }}>
          Procure em tudo: receitas, chás, temas, refeições, hábitos e compras.
        </p>
        <div className="rounded-2xl flex items-center gap-2 px-4 py-3 mb-4" style={{ background: C.card, border: `1px solid ${C.aqua}` }}>
          <span style={{ fontSize: 18 }}>🔎</span>
          <input autoFocus value={buscaConsulta} onChange={(e) => setBuscaConsulta(e.target.value)}
            placeholder="ex: couve-flor, hibisco, cortisol, magnésio…"
            className="flex-1 text-base" style={{ background: "transparent", border: "none", outline: "none", color: C.ink }} />
          {buscaConsulta && (
            <button onClick={() => setBuscaConsulta("")} aria-label="Limpar" style={{ color: C.inkSoft, fontSize: 18 }}>✕</button>
          )}
        </div>

        {!buscaConsulta.trim() ? (
          <div className="flex flex-wrap gap-2">
            {["Apple Day", "hibisco", "couve-flor", "cortisol", "magnésio", "assoalho pélvico", "creatina", "chá para dormir"].map((s) => (
              <button key={s} onClick={() => setBuscaConsulta(s)}
                className="rounded-full px-3 py-2 text-sm" style={{ background: C.blueSoft, color: C.blue, border: `1px solid ${C.line}` }}>
                {s}
              </button>
            ))}
          </div>
        ) : resultados.length === 0 ? (
          <div className="rounded-2xl px-4 py-6 text-center text-sm animate-fadeInUp" style={{ background: C.card, border: `1px solid ${C.line}`, color: C.inkSoft }}>
            Nada encontrado para “{buscaConsulta}”. Tente outra palavra — ou pergunte ao assistente 💬 no canto da tela.
          </div>
        ) : (
          <>
            <div className="text-xs mb-2" style={{ color: C.inkSoft }}>{resultados.length} resultado(s)</div>
            {resultados.map((it, i) => (
              <button key={i} onClick={() => irParaResultado(it)}
                className="w-full text-left rounded-2xl px-4 py-3 mb-2 animate-fadeInUp active:scale-[0.99] transition-transform"
                style={{ background: C.card, border: `1px solid ${C.line}` }}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span>{it.icone}</span>
                  <span className="text-sm font-bold" style={{ color: C.ink }}>{it.titulo}</span>
                  <span className="text-xs rounded-full px-2 py-0.5" style={{ background: C.roseSoft, color: C.rose }}>{it.categoria}</span>
                </div>
                <div className="text-xs" style={{ color: C.inkSoft, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {it.texto}
                </div>
              </button>
            ))}
          </>
        )}
      </>
    );
  }

  function TelaAvisos() {
    const px = proximoAviso();
    return (
      <>
        <h2 className="mb-1" style={estiloTitulo}>Avisos dos horários</h2>
        <p className="text-sm mb-3" style={{ color: C.inkSoft, lineHeight: 1.6 }}>
          O app te lembra nas horas das refeições e das tarefas. Com o app aberto, aparece um aviso na tela; se o navegador permitir, também chega como notificação.
        </p>

        <button onClick={alternarAvisos}
          className="w-full flex items-center gap-3 rounded-2xl px-4 py-4 mb-3 text-left transition-transform active:scale-[0.99]"
          style={{ background: avisosAtivo ? `linear-gradient(135deg, ${C.blue}, ${C.aqua})` : C.card, border: `1px solid ${avisosAtivo ? C.blue : C.line}` }}>
          <span style={{ fontSize: 26 }} className={avisosAtivo ? "animate-floaty" : ""}>{avisosAtivo ? "🔔" : "🔕"}</span>
          <span className="flex-1">
            <span className="block text-sm font-bold" style={{ color: avisosAtivo ? "#fff" : C.ink }}>
              {avisosAtivo ? "Avisos ativados" : "Ativar os avisos"}
            </span>
            <span className="block text-xs mt-0.5" style={{ color: avisosAtivo ? "#EAF1F4" : C.inkSoft }}>
              {avisosAtivo ? "Toque para desligar." : "Toque para ligar os lembretes dos horários."}
            </span>
          </span>
          <span className="rounded-full px-3 py-1 text-xs font-bold"
            style={{ background: avisosAtivo ? "#FFFFFF" : C.blueSoft, color: avisosAtivo ? C.blue : C.inkSoft }}>
            {avisosAtivo ? "ON" : "OFF"}
          </span>
        </button>

        {avisosAtivo && permissaoAvisos === "denied" && (
          <div className="rounded-xl px-3 py-2 mb-3 text-xs" style={{ background: "#FBEAEA", border: "1px solid #E8C9C9", color: "#8C3B3B", lineHeight: 1.5 }}>
            As notificações do navegador estão bloqueadas — os avisos ainda aparecem na tela com o app aberto. Para receber notificações, libere nas configurações do navegador.
          </div>
        )}
        {avisosAtivo && permissaoAvisos === "granted" && (
          <div className="rounded-xl px-3 py-2 mb-3 text-xs" style={{ background: C.greenSoft, border: `1px solid ${C.green}40`, color: C.green, lineHeight: 1.5 }}>
            ✅ Notificações liberadas. Deixe uma aba do app aberta para receber os lembretes no horário.
          </div>
        )}

        <div className="text-xs font-bold mb-2" style={{ color: C.blue, letterSpacing: "0.08em" }}>HORÁRIOS</div>
        {AVISOS_PADRAO.map((av) => {
          const on = avisosItens[av.id] !== false;
          return (
            <button key={av.id} onClick={() => alternarItemAviso(av.id)} disabled={!avisosAtivo}
              className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 mb-2 text-left"
              style={{ background: C.card, border: `1px solid ${C.line}`, opacity: avisosAtivo ? 1 : 0.55 }}>
              <span style={{ fontSize: 22 }}>{av.emoji}</span>
              <span className="flex-1">
                <span className="block text-sm font-bold" style={{ color: C.ink }}>
                  {av.hora.replace(":", "h")} · {av.titulo}
                </span>
                <span className="block text-xs mt-0.5" style={{ color: C.inkSoft, lineHeight: 1.4 }}>{av.corpo}</span>
              </span>
              <span className="rounded-full shrink-0" style={{ width: 44, height: 26, background: on && avisosAtivo ? C.blue : C.line, position: "relative", transition: "background 0.2s" }}>
                <span className="rounded-full" style={{ position: "absolute", top: 3, left: on ? 21 : 3, width: 20, height: 20, background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
              </span>
            </button>
          );
        })}

        <button onClick={() => empurrarToast({ ...px, id: `teste-${px.id}` })}
          className="w-full rounded-2xl py-3 text-sm font-bold mt-2"
          style={{ background: C.blueSoft, color: C.blue, border: `1px solid ${C.line}` }}>
          👀 Ver como fica um aviso (próximo: {px.hora.replace(":", "h")} — {px.titulo})
        </button>
      </>
    );
  }

  function TelaEmocoes() {
    return (
      <>
        <h2 className="mb-3" style={estiloTitulo}>Emoções e alimentação</h2>
        <p className="text-sm mb-4" style={{ color: C.inkSoft, lineHeight: 1.6 }}>
          Muitas vezes o “maior inimigo” não é a comida — é o que estamos sentindo na hora de comer. Este espaço é para se conhecer melhor, sem culpa.
        </p>

        <div className="rounded-2xl mb-3" style={estiloCartao}>
          <b className="text-sm">📝 Check-in de agora</b>
          <p className="text-xs mt-1 mb-3" style={{ color: C.inkSoft }}>Antes de comer (ou quando bater aquela vontade), registre como você está:</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {EMOCOES.map((e) => (
              <button key={e} onClick={() => setEmoSel(emoSel === e ? null : e)}
                className="rounded-full px-3 py-2 text-sm transition-transform active:scale-95"
                style={{ background: emoSel === e ? C.rose : C.roseSoft, color: emoSel === e ? "#fff" : C.ink, border: `1px solid ${emoSel === e ? C.rose : C.line}` }}>
                {e}
              </button>
            ))}
          </div>
          <input type="text" value={nota} onChange={(ev) => setNota(ev.target.value)}
            placeholder="O que aconteceu hoje? (opcional)"
            className="w-full rounded-xl px-3 py-2.5 text-sm mb-2"
            style={{ border: `1px solid ${C.line}`, background: "#FFF", color: C.ink }} />
          <button onClick={registrarEmocao} disabled={!emoSel}
            className="w-full rounded-xl py-3 text-sm font-bold"
            style={{ background: emoSel ? C.rose : "#F1E7E8", color: emoSel ? "#fff" : C.inkSoft }}>
            Registrar 💗
          </button>
        </div>

        <div className="rounded-2xl mb-3" style={estiloCartao}>
          <b className="text-sm">🤔 É fome física ou emocional?</b>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="rounded-xl p-3" style={{ background: C.greenSoft }}>
              <div className="text-xs font-bold mb-1.5" style={{ color: C.green }}>FOME FÍSICA</div>
              <ul className="text-xs space-y-1" style={{ color: C.ink, lineHeight: 1.5 }}>
                <li>• Vem aos poucos</li><li>• Qualquer comida resolve</li><li>• Consegue esperar</li><li>• Para quando satisfeita</li><li>• Sem culpa depois</li>
              </ul>
            </div>
            <div className="rounded-xl p-3" style={{ background: C.goldSoft }}>
              <div className="text-xs font-bold mb-1.5" style={{ color: "#8A6A18" }}>FOME EMOCIONAL</div>
              <ul className="text-xs space-y-1" style={{ color: C.ink, lineHeight: 1.5 }}>
                <li>• Vem de repente</li><li>• Vontade específica</li><li>• Parece urgente</li><li>• Continua mesmo cheia</li><li>• Vem com culpa</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-2xl mb-3" style={estiloCartao}>
          <b className="text-sm">⏸️ A pausa dos 5 minutos</b>
          <p className="text-xs mt-1 mb-2" style={{ color: C.inkSoft }}>Quando bater a vontade fora de hora, tente antes:</p>
          <ol className="text-sm space-y-1.5" style={{ color: C.ink, lineHeight: 1.5 }}>
            <li>1️⃣ Beba um copo de água</li>
            <li>2️⃣ Respire fundo 3 vezes, bem devagar</li>
            <li>3️⃣ Pergunte: “o que estou sentindo agora?”</li>
            <li>4️⃣ Registre no check-in aqui em cima</li>
            <li>5️⃣ Espere 5 minutos. Se for fome física, coma com calma e sem culpa 💛</li>
          </ol>
        </div>

        <div className="rounded-2xl mb-3" style={estiloCartao}>
          <b className="text-sm">🌿 Em vez de descontar na comida, experimente:</b>
          <div className="flex flex-wrap gap-2 mt-3">
            {TROCAS.map((a) => (
              <span key={a} className="rounded-full px-3 py-1.5 text-xs" style={{ background: C.roseSoft, color: C.ink, border: `1px solid ${C.line}` }}>{a}</span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl px-4 py-3 mb-4 text-sm" style={{ background: C.indigoSoft, color: C.indigo, lineHeight: 1.55 }}>
          💛 Quando a relação com a comida tem a ver com as emoções, buscar um psicólogo ou terapeuta é sim um passo de coragem e autocuidado — não de fraqueza.
        </div>

        <b className="text-sm">📖 Seu diário emocional</b>
        <div className="mt-2">
          {diario.length === 0 ? (
            <div className="rounded-2xl px-4 py-5 text-center text-sm" style={{ background: C.card, border: `1px solid ${C.line}`, color: C.inkSoft }}>
              Nenhum registro ainda. Comece com o check-in acima ☝️
            </div>
          ) : diario.map((e, i) => (
            <div key={i} className="rounded-2xl px-4 py-3 mb-2 flex justify-between gap-2 animate-fadeInUp" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <div>
                <div className="text-sm font-semibold">{e.emocao}</div>
                {e.nota && <div className="text-sm mt-0.5" style={{ color: C.inkSoft }}>{e.nota}</div>}
                <div className="text-xs mt-1" style={{ color: C.inkSoft }}>{e.data} às {e.hora}</div>
              </div>
              <button onClick={() => apagarEmocao(i)} aria-label="Apagar registro" style={{ color: C.line, fontSize: 16 }}>✕</button>
            </div>
          ))}
        </div>
      </>
    );
  }

  function TelaReceitas() {
    return (
      <>
        <h2 className="mb-3" style={estiloTitulo}>Caderno de receitas</h2>
        {RECEITAS.map((r, i) => (
          <div key={r.n} className="rounded-2xl mb-2 overflow-hidden" style={{ background: C.card, border: `1px solid ${recAberta === i ? C.rose : C.line}` }}>
            <button onClick={() => setRecAberta(recAberta === i ? -1 : i)} className="w-full flex items-center justify-between px-4 py-3.5 text-left">
              <span className="text-sm font-semibold" style={{ color: C.ink }}>{r.n}</span>
              <span style={{ color: C.rose }}>{recAberta === i ? "▲" : "▼"}</span>
            </button>
            {recAberta === i && (
              <div className="px-4 pb-4 animate-fadeInUp">
                <div className="text-xs font-bold mb-1" style={{ color: C.rose }}>INGREDIENTES</div>
                <div className="text-sm mb-3" style={{ color: C.ink, lineHeight: 1.6 }}>{r.i.map((x) => <div key={x}>• {x}</div>)}</div>
                <div className="text-xs font-bold mb-1" style={{ color: C.rose }}>MODO DE PREPARO</div>
                <div className="text-sm" style={{ color: C.ink, lineHeight: 1.6 }}>{r.m}</div>
              </div>
            )}
          </div>
        ))}
      </>
    );
  }

  function TelaChas() {
    return (
      <>
        <h2 className="mb-3" style={estiloTitulo}>Chás do programa</h2>
        {CHAS.map((c) => (
          <div key={c.n} className="rounded-2xl mb-3 animate-fadeInUp" style={estiloCartao}>
            <b className="text-sm">{c.n}</b>
            <p className="text-sm mt-1" style={{ color: C.inkSoft, lineHeight: 1.6 }}>{c.d}</p>
          </div>
        ))}
      </>
    );
  }

  function TelaForca() {
    return (
      <>
        <h2 className="mb-3" style={estiloTitulo}>Treino de força</h2>
        <div className="rounded-2xl px-4 py-3 mb-3 text-sm" style={{ background: C.greenSoft, border: `1px solid ${C.green}`, color: "#2C5A2C", lineHeight: 1.55 }}>
          {FORCA.intro}
        </div>

        {FORCA.treinos.map((t) => {
          const ids = t.exercicios.map((_, i) => `forca-${t.id}-${i}`);
          const feitos = ids.filter((id) => checks[id]).length;
          return (
            <div key={t.id} className="rounded-2xl mb-3" style={estiloCartao}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold" style={{ color: C.ink, fontSize: 16 }}>{t.emoji} {t.nome}</h3>
                <span className="text-xs font-bold" style={{ color: feitos === ids.length && feitos > 0 ? C.green : C.inkSoft }}>{feitos}/{ids.length}</span>
              </div>
              <div className="text-xs mb-3" style={{ color: C.inkSoft }}>{t.foco} · {t.freq}</div>
              {t.exercicios.map((ex, i) => {
                const id = `forca-${t.id}-${i}`;
                const on = !!checks[id];
                return (
                  <button key={id} onClick={() => marcar(id)} className="w-full flex gap-3 py-2 text-left" style={{ borderTop: i > 0 ? `1px solid ${C.line}` : "none" }}>
                    <span aria-hidden="true" className={`flex items-center justify-center rounded-md shrink-0 mt-0.5 ${on ? "animate-pop" : ""}`}
                      style={{ width: 20, height: 20, background: on ? C.green : "transparent", border: `2px solid ${on ? C.green : C.line}`, color: "#fff", fontSize: 12 }}>
                      {on ? "✓" : ""}
                    </span>
                    <span className="flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-bold" style={{ color: on ? C.inkSoft : C.ink, textDecoration: on ? "line-through" : "none" }}>{ex.nome}</span>
                        <span className="text-xs font-bold shrink-0" style={{ color: C.green }}>{ex.series}</span>
                      </span>
                      <span className="block text-xs mt-0.5" style={{ color: C.inkSoft, lineHeight: 1.45 }}>{ex.como}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}

        <div className="rounded-2xl mb-3" style={estiloCartao}>
          <div className="text-xs font-bold mb-2" style={{ color: C.indigo, letterSpacing: "0.12em", textTransform: "uppercase" }}>📈 Como evoluir</div>
          {FORCA.progressao.map((p, i) => (
            <div key={i} className="flex gap-2 py-1 text-sm" style={{ color: C.ink, lineHeight: 1.5 }}>
              <span style={{ color: C.green }}>•</span><span>{p}</span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl px-4 py-3 text-sm" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, color: "#fff", lineHeight: 1.6 }}>
          💛 Você não precisa ser forte hoje — só um pouco mais forte que ontem. Um treino de cada vez. "Tudo posso naquele que me fortalece." (Fp 4:13)
        </div>
      </>
    );
  }

  function TelaProteina() {
    const lista = proteinaDia[chaveHoje] || [];
    const total = lista.reduce((s, x) => s + (x.g || 0), 0);
    const pct = proteinaMeta > 0 ? Math.min(100, Math.round((total / proteinaMeta) * 100)) : 0;
    const falta = Math.max(0, proteinaMeta - total);
    const bateu = total >= proteinaMeta && proteinaMeta > 0;
    return (
      <>
        <h2 className="mb-3" style={estiloTitulo}>Proteína do dia</h2>

        {/* Progresso */}
        <div className="rounded-2xl mb-3" style={estiloCartao}>
          <div className="flex items-end justify-between mb-2">
            <div>
              <div className="text-3xl font-bold" style={{ color: bateu ? C.green : C.ink }}>
                {total}<span className="text-lg" style={{ color: C.inkSoft }}> / {proteinaMeta} g</span>
              </div>
              <div className="text-xs mt-0.5" style={{ color: C.inkSoft }}>
                {bateu ? "🎉 Meta batida! Muito bem, Maravilhosa!" : `Faltam ${falta}g para a meta de hoje`}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <label className="text-xs" style={{ color: C.inkSoft }}>Meta</label>
              <input type="number" inputMode="numeric" value={proteinaMeta}
                onChange={(e) => alterarMetaProteina(e.target.value)}
                className="w-16 rounded-lg px-2 py-1 text-sm text-center"
                style={{ border: `1px solid ${C.line}`, background: "#fff", color: C.ink }} />
              <span className="text-xs" style={{ color: C.inkSoft }}>g</span>
            </div>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: C.line }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: bateu ? C.green : C.rose }} />
          </div>
        </div>

        {/* Peso personalizado (usando a balança) */}
        <div className="rounded-2xl mb-3" style={estiloCartao}>
          <div className="text-xs font-bold mb-2" style={{ color: C.green, letterSpacing: "0.12em", textTransform: "uppercase" }}>⚖️ Pesou na balança? Calcule aqui</div>
          <div className="flex items-center gap-2">
            <select value={protAlimIdx} onChange={(e) => setProtAlimIdx(Number(e.target.value))}
              className="flex-1 rounded-lg px-2 py-2 text-sm" style={{ border: `1px solid ${C.line}`, background: "#fff", color: C.ink }}>
              {PROTEINA_ALIMENTOS.map((a, i) => (
                <option key={i} value={i}>{a.emoji} {a.nome}</option>
              ))}
            </select>
            <input type="number" inputMode="numeric" value={protGramas}
              onChange={(e) => setProtGramas(e.target.value)} placeholder="gramas"
              className="w-20 rounded-lg px-2 py-2 text-sm text-center" style={{ border: `1px solid ${C.line}`, background: "#fff", color: C.ink }} />
            <span className="text-xs" style={{ color: C.inkSoft }}>g</span>
          </div>
          {Number(protGramas) > 0 && (
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm" style={{ color: C.inkSoft }}>
                {protGramas}g de {PROTEINA_ALIMENTOS[protAlimIdx].nome} ={" "}
                <b style={{ color: C.green }}>{proteinaDe(PROTEINA_ALIMENTOS[protAlimIdx].por100, Number(protGramas))}g</b> de proteína
              </span>
              <button onClick={() => {
                  const al = PROTEINA_ALIMENTOS[protAlimIdx];
                  const gr = Number(protGramas);
                  addProteina({ nome: `${al.nome} ${gr}g`, g: proteinaDe(al.por100, gr) });
                  setProtGramas("");
                }}
                className="rounded-lg px-3 py-1.5 text-sm font-bold" style={{ background: C.green, color: "#fff" }}>
                + Somar
              </button>
            </div>
          )}
        </div>

        {/* Botões rápidos (porção sugerida) */}
        <div className="text-xs font-bold mb-2" style={{ color: C.green, letterSpacing: "0.12em", textTransform: "uppercase" }}>Toque para somar a porção</div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {PROTEINA_ALIMENTOS.map((p, i) => {
            const g = proteinaDe(p.por100, p.porcao);
            return (
              <button key={i} onClick={() => addProteina({ nome: `${p.nome} ${p.porcao}g`, g })}
                className="flex items-center gap-2 text-left rounded-xl px-3 py-2 active:scale-95 transition"
                style={{ background: C.card, border: `1px solid ${C.line}` }}>
                <span className="text-lg">{p.emoji}</span>
                <span className="flex-1 text-xs" style={{ color: C.ink, lineHeight: 1.2 }}>{p.nome} <span style={{ color: C.inkSoft }}>{p.porcao}g</span></span>
                <span className="text-xs font-bold" style={{ color: C.green }}>+{g}g</span>
              </button>
            );
          })}
        </div>

        {/* Tabela de referência */}
        <button onClick={() => setMostrarTabelaProt(!mostrarTabelaProt)}
          className="w-full flex items-center justify-between rounded-xl px-3 py-2 mb-2"
          style={{ background: C.indigoSoft, color: C.indigo, border: `1px solid ${C.line}` }}>
          <span className="text-sm font-bold">📋 Tabela: alimento × proteína</span>
          <span>{mostrarTabelaProt ? "−" : "+"}</span>
        </button>
        {mostrarTabelaProt && (
          <div className="rounded-2xl mb-3 overflow-hidden" style={estiloCartao}>
            <div className="grid grid-cols-3 text-xs font-bold pb-2 mb-1" style={{ color: C.inkSoft, borderBottom: `1px solid ${C.line}` }}>
              <span>Alimento</span>
              <span className="text-center">Por 100g</span>
              <span className="text-right">Porção</span>
            </div>
            {PROTEINA_ALIMENTOS.map((a, i) => (
              <div key={i} className="grid grid-cols-3 text-sm py-1.5 items-center" style={{ borderBottom: i < PROTEINA_ALIMENTOS.length - 1 ? `1px solid ${C.line}` : "none" }}>
                <span style={{ color: C.ink }}>{a.emoji} {a.nome}</span>
                <span className="text-center font-bold" style={{ color: C.green }}>{a.por100}g</span>
                <span className="text-right" style={{ color: C.inkSoft }}>{a.porcao}g ≈ <b style={{ color: C.green }}>{proteinaDe(a.por100, a.porcao)}g</b></span>
              </div>
            ))}
            <div className="text-xs mt-2" style={{ color: C.inkSoft, lineHeight: 1.5 }}>
              Ex.: 120g de frango ≈ 37g de proteína. "Por 100g" é o que costuma aparecer na embalagem/balança. Valores aproximados (alimento já preparado).
            </div>
          </div>
        )}

        {/* Registro de hoje */}
        {lista.length > 0 && (
          <div className="rounded-2xl mb-3" style={estiloCartao}>
            <div className="text-xs font-bold mb-2" style={{ color: C.rose, letterSpacing: "0.12em", textTransform: "uppercase" }}>Comido hoje</div>
            {lista.map((x, i) => (
              <div key={i} className="flex items-center justify-between py-1.5">
                <span className="text-sm" style={{ color: C.ink }}>{x.nome}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold" style={{ color: C.green }}>{x.g}g</span>
                  <button onClick={() => removerProteina(i)} aria-label="remover"
                    className="rounded-full flex items-center justify-center"
                    style={{ width: 22, height: 22, background: C.roseSoft, color: C.rose, fontSize: 14 }}>×</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="rounded-2xl px-4 py-4 text-sm" style={{ background: `linear-gradient(135deg, ${C.green}, ${C.aqua})`, color: "#fff", lineHeight: 1.6 }}>
          <b>💪 Para ganhar músculo:</b> distribua a proteína ao longo do dia (café, almoço, lanche e jantar) e combine com treino de força. Os valores são aproximados — ajuste com seu(sua) nutricionista.
        </div>
      </>
    );
  }

  function TelaCompras() {
    return (
      <>
        <h2 className="mb-3" style={estiloTitulo}>Lista de compras</h2>
        {COMPRAS.map((c, i) => (
          <div key={c.c} className="rounded-2xl mb-3" style={estiloCartao}>
            <div className="text-xs font-bold mb-2" style={{ color: C.rose, letterSpacing: "0.12em", textTransform: "uppercase" }}>{c.c}</div>
            {c.it.map((it, j) => {
              const id = `c${i}-${j}`;
              const on = !!checks[id];
              return (
                <button key={id} onClick={() => marcar(id)} aria-pressed={on} className="w-full flex items-center gap-3 py-1.5 text-left">
                  <span aria-hidden="true" className={`flex items-center justify-center rounded-md shrink-0 ${on ? "animate-pop" : ""}`}
                    style={{ width: 20, height: 20, background: on ? C.gold : "transparent", border: `2px solid ${on ? C.gold : C.line}`, color: "#fff", fontSize: 12 }}>
                    {on ? "✓" : ""}
                  </span>
                  <span className="text-sm" style={{ color: on ? C.inkSoft : C.ink, textDecoration: on ? "line-through" : "none" }}>{it}</span>
                </button>
              );
            })}
          </div>
        ))}
      </>
    );
  }

  function TelaHabitos() {
    return (
      <>
        <h2 className="mb-3" style={estiloTitulo}>Hábitos do programa</h2>
        {HABITOS.map((x, i) => <Item key={i} id={`h${i}`} texto={x} />)}
        <div className="rounded-2xl px-4 py-4 mt-3 text-sm" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, color: "#fff", lineHeight: 1.6 }}>
          <b>✍️ Importante:</b><br />Escreva por que você NÃO vai desistir! Você consegue, Maravilhosa! 💖
        </div>
      </>
    );
  }

  /* ---------- render ---------- */
  if (!sessao) {
    // Com login unificado, entra sozinho — mostra um vazio enquanto carrega.
    if (usuario) return <div style={{ minHeight: "100vh", background: C.paper }} />;
    return TelaEntrada();
  }

  return (
    <div style={{ minHeight: "100vh", background: C.paper, color: C.ink, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {confeteKey && <Confete key={confeteKey} />}

      {/* pilha de toasts dos avisos */}
      <div className="fixed z-50 flex flex-col gap-2" style={{ top: 12, left: 0, right: 0, alignItems: "center", pointerEvents: "none" }}>
        {toasts.map((t) => (
          <div key={t.key} className="animate-slideInRight rounded-2xl px-4 py-3 flex items-center gap-3"
            style={{ pointerEvents: "auto", maxWidth: "92vw", width: 380, background: C.card, border: `1px solid ${C.blue}`, boxShadow: "0 8px 24px rgba(74,59,62,0.2)" }}>
            <span style={{ fontSize: 24 }}>{t.emoji}</span>
            <div className="flex-1">
              <div className="text-sm font-bold" style={{ color: C.blue }}>{t.titulo}</div>
              <div className="text-xs" style={{ color: C.inkSoft, lineHeight: 1.4 }}>{t.corpo}</div>
            </div>
            <button onClick={() => setToasts((x) => x.filter((y) => y.key !== t.key))} aria-label="Fechar" style={{ color: C.inkSoft, fontSize: 16 }}>✕</button>
          </div>
        ))}
      </div>

      <div className="mx-auto px-4 pb-24" style={{ maxWidth: 520 }}>

        <div className="flex items-center justify-between pt-4">
          <span className="text-xs" style={{ color: C.inkSoft }}>Plano de <b style={{ color: C.rose }}>{sessao.nome}</b></span>
          <div className="flex items-center gap-2">
            <button onClick={() => setAba("buscar")} aria-label="Buscar"
              className="rounded-full flex items-center justify-center" style={{ width: 34, height: 34, background: aba === "buscar" ? C.aqua : C.card, color: aba === "buscar" ? "#fff" : C.inkSoft, border: `1px solid ${C.line}` }}>🔎</button>
            <button onClick={() => setAba("avisos")} aria-label="Avisos"
              className={`rounded-full flex items-center justify-center ${avisosAtivo ? "animate-floaty" : ""}`} style={{ width: 34, height: 34, background: aba === "avisos" ? C.blue : C.card, color: aba === "avisos" ? "#fff" : C.inkSoft, border: `1px solid ${C.line}` }}>{avisosAtivo ? "🔔" : "🔕"}</button>
            <button onClick={() => (onVoltar ? onVoltar() : sair())} className="rounded-full px-3 py-1.5 text-xs font-semibold"
              style={{ background: C.card, border: `1px solid ${C.line}`, color: C.inkSoft }}>
              {onVoltar ? "Trocar app" : "Sair"}
            </button>
          </div>
        </div>

        <header className="pt-4 pb-3 text-center">
          <div className="flex justify-center mb-1"><RamoRosa width={110} /></div>
          <div className="text-xs uppercase" style={{ color: C.gold, letterSpacing: "0.2em", fontWeight: 700 }}>
            ✨ Unidas com Propósito 🏺
          </div>
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 30, color: C.rose, lineHeight: 1.15, marginTop: 4 }}>
            Planner VIDA · 4 semanas
          </div>
          <div className="text-xs mt-1" style={{ color: C.inkSoft }}>
            <b style={{ color: C.gold }}>V</b>estidas de <b style={{ color: C.gold }}>I</b>ntimidade com <b style={{ color: C.gold }}>D</b>eus para <b style={{ color: C.gold }}>A</b>mar 💛
          </div>
          <div className="text-xs mt-1" style={{ color: C.inkSoft }}>{dataBonita}</div>
        </header>

        <div className={`rounded-2xl px-4 py-4 mb-3 ${coroaCheia ? "shimmer animate-shimmer" : ""}`}
          style={{ background: coroaCheia ? `linear-gradient(135deg, ${C.rose}, ${C.gold})` : C.card, border: `1px solid ${coroaCheia ? C.gold : C.line}` }}>
          <div className="flex items-center gap-3">
            <span className={coroaCheia ? "animate-floaty" : ""}><Coroa ativa={coroaCheia} width={58} /></span>
            <div className="flex-1">
              <div className="text-sm font-bold" style={{ color: coroaCheia ? "#fff" : C.ink }}>
                {coroaCheia ? "Coroa completa! 🏺" : `${naCoroa} de ${PEDRAS_POR_COROA} pedras`}
              </div>
              <div className="text-xs mt-0.5" style={{ color: coroaCheia ? "#FFF3F4" : C.inkSoft }}>
                {coroaCheia
                  ? (mimo ? `O seu mimo: ${mimo}` : "Escolha agora o seu mimo — e vá buscá-lo.")
                  : "Cada quadradinho marcado vale 1 pedra."}
              </div>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} aria-hidden="true" className="flex-1 rounded-full transition-all"
                    style={{ height: 8, background: i < gemasAcesas ? (coroaCheia ? "#FFFFFF" : C.rose) : (coroaCheia ? "#FFFFFF60" : C.line) }} />
                ))}
              </div>
            </div>
          </div>

          {coroasProntas > 0 && !coroaCheia && (
            <div className="text-xs mt-2" style={{ color: C.gold, fontWeight: 700 }}>
              {coroasProntas} {coroasProntas === 1 ? "coroa completa" : "coroas completas"} até aqui 👑
            </div>
          )}

          <input type="text" value={mimo}
            onChange={(ev) => { setMimo(ev.target.value); salvar({ mimo: ev.target.value }); }}
            placeholder="Meu mimo ao completar esta coroa (não vale comida)"
            className="w-full rounded-xl px-3 py-2 text-xs mt-3"
            style={{ background: coroaCheia ? "#FFFFFF" : C.roseSoft, border: `1px solid ${C.line}`, color: C.ink }} />
        </div>

        {progresso.total > 0 && (
          <div className="flex items-center gap-4 rounded-2xl p-4 mb-3"
            style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: "0 2px 10px rgba(183,110,121,0.08)" }}>
            <svg width="76" height="76" viewBox="0 0 76 76" role="img" aria-label={`Progresso: ${progresso.feitos} de ${progresso.total}`}>
              <circle cx="38" cy="38" r={R} fill="none" stroke={soft} strokeWidth="8" />
              <circle cx="38" cy="38" r={R} fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round"
                strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - progresso.pct)}
                transform="rotate(-90 38 38)" style={{ transition: "stroke-dashoffset 0.45s ease" }} />
              <text x="38" y="43" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.ink}>
                {progresso.feitos}/{progresso.total}
              </text>
            </svg>
            <div className="flex-1">
              <div className="font-semibold text-sm">
                {progresso.pct === 1 ? "Maravilhosa! Tudo feito 🌹"
                  : progresso.pct >= 0.5 ? "Mais da metade — continue!"
                  : progresso.feitos > 0 ? "Bom começo, um passo de cada vez"
                  : "Marque o que já fez"}
              </div>
              <div className="text-xs mt-1" style={{ color: C.inkSoft }}>
                {aba === "semanas" && `Semana ${semana} de 4 · ${semana <= 2 ? "Dieta VIDA" : "Planner da Jen"}`}
                {aba === "treino" && "Treino da semana — reinicia quando você limpar."}
                {aba === "prep" && "Preparo de domingo — 1x por semana."}
                {aba === "marido" && "Sanduíche montado = coração ganho."}
                {aba === "compras" && "Marque o que já está no carrinho."}
                {aba === "habitos" && "Os hábitos valem para as 4 semanas."}
              </div>
            </div>
          </div>
        )}

        <nav className="flex gap-2 mb-4 overflow-x-auto pb-1 no-scrollbar" role="tablist" aria-label="Seções">
          {ABAS.map(([k, rot, cor]) => {
            const sel = k === aba;
            return (
              <button key={k} role="tab" aria-selected={sel} onClick={() => setAba(k)}
                className="rounded-full px-4 py-2 text-sm font-semibold shrink-0 transition-transform active:scale-95"
                style={{ background: sel ? cor : C.card, color: sel ? "#fff" : C.ink, border: `1px solid ${sel ? cor : C.line}` }}>
                {rot}
              </button>
            );
          })}
        </nav>

        {erroSalvar && (
          <div className="rounded-xl px-3 py-2 mb-3 text-xs" style={{ background: "#FBEAEA", color: "#8C3B3B", border: "1px solid #E8C9C9" }}>
            Não consegui salvar a última marcação. Toque no item de novo para tentar outra vez.
          </div>
        )}

        {carregando ? (
          <div className="text-center py-10 text-sm" style={{ color: C.inkSoft }}>Abrindo seu planner…</div>
        ) : (
          <div key={aba} className="animate-fadeInUp">
            {aba === "semanas" && TelaSemanas()}
            {aba === "buscar" && TelaBuscar()}
            {aba === "temas" && TelaTemas()}
            {aba === "emocoes" && TelaEmocoes()}
            {aba === "proteina" && TelaProteina()}
            {aba === "forca" && TelaForca()}
            {aba === "treino" && ListaBloco({
              dados: TREINO, prefixo: "tr", titulo: "Treino da semana",
              legenda: "Semanas 1 e 3 usam o bloco A; semanas 2 e 4 usam o bloco B. Os cinco pilares estão no tema “Exercícios inegociáveis para mulheres”.",
            })}
            {aba === "prep" && ListaBloco({
              dados: PREP, prefixo: "pr", titulo: "Preparo de domingo",
              legenda: "Duas versões de preparo, uma para cada semana do bloco. Feito o domingo, a semana anda sozinha.",
            })}
            {aba === "marido" && ListaBloco({
              dados: MARIDO, prefixo: "md", titulo: "Marmita do marido",
              legenda: "Duas semanas de sanduíches para a obra, montados a partir do preparo de domingo.",
            })}
            {aba === "receitas" && TelaReceitas()}
            {aba === "chas" && TelaChas()}
            {aba === "compras" && TelaCompras()}
            {aba === "habitos" && TelaHabitos()}
            {aba === "avisos" && TelaAvisos()}
          </div>
        )}

        <footer className="text-center mt-8 text-xs" style={{ color: C.inkSoft }}>
          <div className="flex justify-center mb-2"><OliveiraFaixa width={200} /></div>
          <span style={{ fontFamily: serif, fontStyle: "italic", color: C.gold }}>
            “Tudo posso naquele que me fortalece.” — Fp 4:13
          </span>
          <div className="mt-2">★ = não pode esquecer · tudo é salvo automaticamente</div>
        </footer>
      </div>

      {/* Assistente VIDA — chatbot que aprende */}
      <ChatBot
        aprendidos={aprendidos}
        reforcos={reforcos}
        onAprender={aoAprender}
        onReforcar={aoReforcar}
        onAbrirBusca={abrirBusca}
      />
    </div>
  );
}
