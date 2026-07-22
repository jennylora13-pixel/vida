import { useState, useRef, useEffect, useMemo } from "react";
import { C, serif } from "./data.js";
import {
  criarCerebro, ensinar, reforcar, SUGESTOES_INICIAIS,
} from "./chatBrain.js";

/* Assistente VIDA — chatbot flutuante que aprende com a usuária. */
export default function ChatBot({ aprendidos, reforcos, onAprender, onReforcar, onAbrirBusca }) {
  const [aberto, setAberto] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      de: "bot",
      txt: "Oi! Sou o Assistente VIDA 💛 Posso tirar dúvidas sobre os chás, o jejum, o Apple Day, treinos, suplementos e mais. E se eu não souber, você pode me ensinar!",
    },
  ]);
  const [texto, setTexto] = useState("");
  const [ensinando, setEnsinando] = useState(null); // { pergunta }
  const [respostaEnsino, setRespostaEnsino] = useState("");
  const fimRef = useRef(null);

  const cerebro = useMemo(
    () => criarCerebro(aprendidos, reforcos),
    [aprendidos, reforcos]
  );

  useEffect(() => {
    if (aberto && fimRef.current) fimRef.current.scrollIntoView({ behavior: "smooth" });
  }, [msgs, aberto, ensinando]);

  function enviar(perguntaTexto) {
    const pergunta = (perguntaTexto ?? texto).trim();
    if (!pergunta) return;
    setTexto("");
    const resp = cerebro.responder(pergunta);
    setMsgs((m) => [
      ...m,
      { de: "user", txt: pergunta },
      {
        de: "bot",
        txt: resp.texto,
        chave: resp.chave,
        tipo: resp.tipo,
        pergunta: resp.pergunta,
        achados: resp.achados,
      },
    ]);
    if (resp.tipo === "sem_match") {
      setEnsinando({ pergunta });
    }
  }

  function confirmarEnsino() {
    const r = respostaEnsino.trim();
    if (!r || !ensinando) return;
    onAprender(ensinar(aprendidos, ensinando.pergunta, r));
    setMsgs((m) => [
      ...m,
      {
        de: "bot",
        txt: "Aprendido! 🌟 Da próxima vez que me perguntarem algo parecido, eu respondo isso. Obrigada por me ensinar!",
      },
    ]);
    setEnsinando(null);
    setRespostaEnsino("");
  }

  function marcarUtil(chave) {
    if (!chave) return;
    onReforcar(reforcar(reforcos, chave));
    setMsgs((m) => [...m, { de: "bot", txt: "Que bom que ajudou! 💛 Vou lembrar disso." }]);
  }

  return (
    <>
      {/* botão flutuante */}
      <button
        onClick={() => setAberto((a) => !a)}
        aria-label="Abrir o assistente"
        className="fixed z-50 rounded-full flex items-center justify-center animate-floaty"
        style={{
          right: 16, bottom: 18, width: 58, height: 58,
          background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`,
          color: "#fff", fontSize: 26, boxShadow: "0 8px 24px rgba(183,110,121,0.4)",
        }}
      >
        {aberto ? "✕" : "💬"}
      </button>

      {aberto && (
        <div
          className="fixed z-50 flex flex-col animate-fadeInUp"
          style={{
            right: 12, bottom: 84, width: "min(92vw, 380px)", height: "min(70vh, 560px)",
            background: C.card, border: `1px solid ${C.line}`, borderRadius: 20,
            boxShadow: "0 12px 40px rgba(74,59,62,0.25)", overflow: "hidden",
          }}
        >
          {/* cabeçalho */}
          <div className="px-4 py-3 flex items-center gap-2"
            style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, color: "#fff" }}>
            <span style={{ fontSize: 22 }}>🤍</span>
            <div>
              <div className="font-bold text-sm" style={{ fontFamily: serif }}>Assistente VIDA</div>
              <div className="text-xs" style={{ opacity: 0.9 }}>Tira dúvidas e aprende com você</div>
            </div>
          </div>

          {/* mensagens */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2" style={{ background: C.paper }}>
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.de === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="rounded-2xl px-3 py-2 text-sm animate-fadeInUp"
                  style={{
                    maxWidth: "85%", whiteSpace: "pre-line", lineHeight: 1.5,
                    background: m.de === "user" ? C.rose : C.card,
                    color: m.de === "user" ? "#fff" : C.ink,
                    border: m.de === "user" ? "none" : `1px solid ${C.line}`,
                    borderBottomRightRadius: m.de === "user" ? 4 : 16,
                    borderBottomLeftRadius: m.de === "user" ? 16 : 4,
                  }}
                >
                  {m.txt}
                  {m.de === "bot" && m.tipo === "busca" && m.achados && (
                    <button onClick={() => { onAbrirBusca(m.pergunta); setAberto(false); }}
                      className="block mt-2 rounded-full px-3 py-1 text-xs font-bold"
                      style={{ background: C.indigoSoft, color: C.indigo }}>
                      🔎 Abrir no Buscador
                    </button>
                  )}
                  {m.de === "bot" && (m.tipo === "faq" || m.tipo === "aprendido") && m.chave && (
                    <button onClick={() => marcarUtil(m.chave)}
                      className="block mt-2 text-xs" style={{ color: C.gold, fontWeight: 700 }}>
                      👍 Isso me ajudou
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* fluxo de ensino */}
            {ensinando && (
              <div className="rounded-2xl px-3 py-3 animate-fadeInUp" style={{ background: C.goldSoft, border: `1px solid ${C.gold}` }}>
                <div className="text-xs font-bold mb-2" style={{ color: "#7A5B12" }}>
                  ✍️ Me ensine a responder: “{ensinando.pergunta}”
                </div>
                <textarea
                  value={respostaEnsino}
                  onChange={(e) => setRespostaEnsino(e.target.value)}
                  placeholder="Escreva aqui a resposta certa…"
                  rows={3}
                  className="w-full rounded-xl px-3 py-2 text-sm mb-2"
                  style={{ border: `1px solid ${C.line}`, background: "#fff", color: C.ink }}
                />
                <div className="flex gap-2">
                  <button onClick={confirmarEnsino} disabled={!respostaEnsino.trim()}
                    className="flex-1 rounded-xl py-2 text-xs font-bold"
                    style={{ background: respostaEnsino.trim() ? C.rose : "#E7D3D5", color: "#fff" }}>
                    Ensinar o assistente
                  </button>
                  <button onClick={() => { setEnsinando(null); setRespostaEnsino(""); }}
                    className="rounded-xl py-2 px-3 text-xs font-bold" style={{ background: "#fff", border: `1px solid ${C.line}`, color: C.inkSoft }}>
                    Agora não
                  </button>
                </div>
              </div>
            )}

            <div ref={fimRef} />
          </div>

          {/* sugestões */}
          {msgs.length <= 1 && (
            <div className="px-3 py-2 flex gap-2 overflow-x-auto no-scrollbar" style={{ background: C.paper }}>
              {SUGESTOES_INICIAIS.map((s) => (
                <button key={s} onClick={() => enviar(s)}
                  className="shrink-0 rounded-full px-3 py-1.5 text-xs"
                  style={{ background: C.roseSoft, color: C.ink, border: `1px solid ${C.line}` }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* entrada */}
          <form onSubmit={(e) => { e.preventDefault(); enviar(); }}
            className="p-2 flex gap-2" style={{ background: C.card, borderTop: `1px solid ${C.line}` }}>
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escreva a sua dúvida…"
              className="flex-1 rounded-full px-4 py-2.5 text-sm"
              style={{ background: C.roseSoft, border: `1px solid ${C.line}`, color: C.ink }}
            />
            <button type="submit" aria-label="Enviar"
              className="rounded-full shrink-0 flex items-center justify-center"
              style={{ width: 42, height: 42, background: C.rose, color: "#fff", fontSize: 18 }}>
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
