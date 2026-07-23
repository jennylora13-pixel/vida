import React, { useEffect, useState } from "react";
import { storage } from "./storage.js";
import Launcher from "./Launcher.jsx";

/* ==========================================================
   Lock — tela de entrada com nome e senha (trava LOCAL).
   Observação honesta: é uma trava de privacidade no aparelho,
   não segurança de banco. A senha não é guardada em texto —
   guardamos só um "resumo" (hash). Fica tudo no dispositivo.
   ========================================================== */

const CHAVE = "auth:v1";

/* gera um hash da senha (SHA-256 quando disponível; senão, fallback simples) */
async function hashSenha(nome, senha) {
  const txt = `firmes-vida::${String(nome).trim().toLowerCase()}::${senha}`;
  try {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(txt));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch (e) {
    let h = 0;
    for (let i = 0; i < txt.length; i++) h = (h * 31 + txt.charCodeAt(i)) | 0;
    return "f" + (h >>> 0).toString(16);
  }
}

function Coroa({ className = "" }) {
  return (
    <svg viewBox="0 0 40 28" className={className} aria-hidden="true">
      <path d="M4 22 L4 8 L12 14 L20 4 L28 14 L36 8 L36 22 Z" fill="#C9A34A" />
      <rect x="4" y="22" width="32" height="3.5" rx="1.5" fill="#B76E79" />
    </svg>
  );
}

function Moldura({ children }) {
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-10 bg-gradient-to-b from-rose-50 via-amber-50 to-white">
      <Coroa className="w-16 h-12 mb-3 animate-floaty" />
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 bg-white";
const btnCls =
  "w-full rounded-xl bg-rose-500 text-white py-2.5 text-sm font-semibold active:scale-[0.98] transition disabled:opacity-40";

export default function Lock() {
  const [estado, setEstado] = useState("carregando"); // carregando | setup | login | aberto
  const [creds, setCreds] = useState(null); // { nome, hash }

  // campos
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [erro, setErro] = useState("");
  const [ocupado, setOcupado] = useState(false);

  useEffect(() => {
    let vivo = true;
    storage.get(CHAVE).then((r) => {
      if (!vivo) return;
      if (r && r.value) {
        try {
          const c = JSON.parse(r.value);
          setCreds(c);
          setEstado("login");
          return;
        } catch (e) {}
      }
      setEstado("setup");
    });
    return () => {
      vivo = false;
    };
  }, []);

  async function criar(e) {
    e.preventDefault();
    setErro("");
    if (nome.trim().length < 2) return setErro("Digite o seu nome.");
    if (senha.length < 4) return setErro("A senha precisa ter ao menos 4 caracteres.");
    if (senha !== confirma) return setErro("As senhas não são iguais.");
    setOcupado(true);
    const hash = await hashSenha(nome, senha);
    const c = { nome: nome.trim(), hash };
    await storage.set(CHAVE, JSON.stringify(c));
    setCreds(c);
    setSenha("");
    setConfirma("");
    setOcupado(false);
    setEstado("aberto");
  }

  async function entrar(e) {
    e.preventDefault();
    setErro("");
    setOcupado(true);
    const hash = await hashSenha(creds.nome, senha);
    setOcupado(false);
    if (hash === creds.hash) {
      setSenha("");
      setEstado("aberto");
    } else {
      setErro("Senha incorreta. Tente de novo.");
    }
  }

  async function resetar() {
    // Remove só a trava (os avanços das apps continuam salvos).
    await storage.set(CHAVE, "");
    setCreds(null);
    setNome("");
    setSenha("");
    setConfirma("");
    setErro("");
    setEstado("setup");
  }

  function bloquear() {
    setSenha("");
    setErro("");
    setEstado(creds ? "login" : "setup");
  }

  if (estado === "carregando") {
    return <div className="min-h-full bg-[#fbf3f1]" />;
  }

  if (estado === "aberto") {
    return <Launcher onSair={bloquear} usuario={creds?.nome} />;
  }

  if (estado === "setup") {
    return (
      <Moldura>
        <h1 className="text-2xl font-bold text-stone-800 text-center">Criar acesso</h1>
        <p className="text-sm text-stone-500 mt-2 text-center">
          Defina seu nome e uma senha para proteger o app neste aparelho.
        </p>
        <form onSubmit={criar} className="mt-6 space-y-3">
          <input
            className={inputCls}
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoComplete="name"
          />
          <input
            className={inputCls}
            type="password"
            placeholder="Criar senha (mín. 4)"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="new-password"
          />
          <input
            className={inputCls}
            type="password"
            placeholder="Repetir a senha"
            value={confirma}
            onChange={(e) => setConfirma(e.target.value)}
            autoComplete="new-password"
          />
          {erro && <p className="text-sm text-rose-600">{erro}</p>}
          <button className={btnCls} disabled={ocupado}>
            {ocupado ? "Salvando..." : "Criar e entrar"}
          </button>
        </form>
        <p className="text-[11px] text-stone-400 mt-4 text-center leading-relaxed">
          Trava de privacidade local (fica só neste aparelho). Não é possível recuperar a senha por
          e-mail — se esquecer, será preciso recomeçar o acesso.
        </p>
      </Moldura>
    );
  }

  // login
  return (
    <Moldura>
      <h1 className="text-2xl font-bold text-stone-800 text-center">
        Olá, {creds?.nome} 🌹
      </h1>
      <p className="text-sm text-stone-500 mt-2 text-center">Digite a sua senha para entrar.</p>
      <form onSubmit={entrar} className="mt-6 space-y-3">
        <input
          className={inputCls}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="current-password"
          autoFocus
        />
        {erro && <p className="text-sm text-rose-600">{erro}</p>}
        <button className={btnCls} disabled={ocupado}>
          {ocupado ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <button
        onClick={() => {
          if (
            typeof window !== "undefined" &&
            window.confirm(
              "Esqueceu a senha? Você pode recomeçar o acesso criando uma nova senha. Seus avanços salvos no app não serão apagados. Deseja continuar?"
            )
          ) {
            resetar();
          }
        }}
        className="w-full text-center text-xs text-stone-400 mt-4 underline"
      >
        Esqueci a senha
      </button>
    </Moldura>
  );
}
