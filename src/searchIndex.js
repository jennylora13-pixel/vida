/* ==========================================================
   Índice de busca — achata todo o conteúdo do app em itens
   pesquisáveis. Usado pelo Buscador e pelo Assistente VIDA.
   ========================================================== */
import {
  RECEITAS, CHAS, TEMAS, HABITOS, COMPRAS, ROTINA,
  SEMANA1, SEMANA2, CARDAPIO, REFEICOES,
} from "./data.js";

export function semAcento(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/* Constrói uma lista de { aba, titulo, texto, tags } */
export function construirIndice() {
  const itens = [];

  RECEITAS.forEach((r) => {
    itens.push({
      aba: "receitas",
      icone: "🍳",
      categoria: "Receita",
      titulo: r.n,
      texto: `${r.i.join(", ")}. ${r.m}`,
    });
  });

  CHAS.forEach((c) => {
    itens.push({
      aba: "chas",
      icone: "🍵",
      categoria: "Chá",
      titulo: c.n,
      texto: c.d,
    });
  });

  TEMAS.forEach((t) => {
    const corpo = t.blocos
      .map((b) => `${b.t}: ${b.l.join(" ")}`)
      .join(" ");
    itens.push({
      aba: "temas",
      icone: "📚",
      categoria: "Tema",
      titulo: t.n,
      texto: corpo,
    });
  });

  HABITOS.forEach((h, i) => {
    itens.push({
      aba: "habitos",
      icone: "🌅",
      categoria: "Hábito",
      titulo: `Hábito ${i + 1}`,
      texto: h,
    });
  });

  COMPRAS.forEach((c) => {
    itens.push({
      aba: "compras",
      icone: "🛒",
      categoria: "Compras",
      titulo: c.c,
      texto: c.it.join(", "),
    });
  });

  // Refeições das semanas 1 e 2
  [...SEMANA1, ...SEMANA2].forEach((d) => {
    const p = d.padrao;
    const linhas = REFEICOES.filter((r) => p[r[0]])
      .map((r) => `${r[1]}: ${p[r[0]]}`)
      .join(" • ");
    itens.push({
      aba: "semanas",
      icone: "📅",
      categoria: "Dieta VIDA",
      titulo: d.n,
      texto: linhas,
      semana: d.k.startsWith("s1") ? 1 : 2,
    });
  });

  // Cardápio das semanas 3 e 4
  ["s3", "s4"].forEach((sk) => {
    CARDAPIO[sk].forEach((dia) => {
      itens.push({
        aba: "semanas",
        icone: "📅",
        categoria: "Planner da Jen",
        titulo: `${dia.n} (semana ${sk === "s3" ? 3 : 4})`,
        texto: `Café: ${dia.cafe}. Almoço: ${dia.almoco}. Lanche: ${dia.lanche}. Jantar: ${dia.jantar}.`,
        semana: sk === "s3" ? 3 : 4,
      });
    });
  });

  ROTINA.forEach((r) => {
    itens.push({
      aba: "semanas",
      icone: "⏰",
      categoria: "Rotina",
      titulo: `${r.hora} — rotina`,
      texto: r.txt,
    });
  });

  // pré-computa versão sem acento para busca rápida
  itens.forEach((it) => {
    it._busca = semAcento(`${it.titulo} ${it.texto} ${it.categoria}`);
  });

  return itens;
}

/* Busca simples por palavras — pontua por número de termos encontrados */
export function buscar(indice, consulta) {
  const q = semAcento(consulta).trim();
  if (!q) return [];
  const termos = q.split(/\s+/).filter((t) => t.length > 1);
  if (termos.length === 0) return [];

  const resultados = [];
  indice.forEach((it) => {
    let pontos = 0;
    termos.forEach((termo) => {
      if (it._busca.includes(termo)) {
        pontos += 1;
        // bônus se o termo aparece no título
        if (semAcento(it.titulo).includes(termo)) pontos += 2;
      }
    });
    if (pontos > 0) resultados.push({ ...it, pontos });
  });

  return resultados.sort((a, b) => b.pontos - a.pontos).slice(0, 30);
}
