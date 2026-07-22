/* ==========================================================
   Assistente VIDA — cérebro do chatbot
   - Base de conhecimento curada (perguntas frequentes)
   - Índice de conteúdo do app (receitas, chás, temas...)
   - Aprendizado: guarda pares pergunta→resposta ensinados
     pela usuária e reforça as respostas marcadas como úteis.
   Tudo local, sem enviar nada para fora.
   ========================================================== */
import { construirIndice, buscar, semAcento } from "./searchIndex.js";

/* Perguntas frequentes com palavras-chave (gatilhos) */
const FAQ = [
  {
    g: ["apple day", "dia da maca", "dia de maca"],
    r: "O Apple Day acontece no 4º e no 11º dia. Você come só maçã ao longo do dia com o chá Tira Fome e a bariátrica natural, bebendo muita água. ⚠️ Se estiver grávida, amamentando ou tentando engravidar, PULE o Apple Day e use as semanas 3 e 4.",
  },
  {
    g: ["hibisco gravida", "hibisco gestante", "posso tomar hibisco", "hibisco tentando"],
    r: "Grávidas, lactantes, hipertensas e quem está tentando engravidar devem evitar o hibisco (é tradicionalmente emenagogo). Troque por chá de gengibre, espinheira santa ou camomila. Ativando o modo 🤍 nas Semanas, o app já faz essa troca sozinho.",
  },
  {
    g: ["cha para dormir", "cha da noite", "cha para o sono", "insonia", "dormir"],
    r: "Para a noite: erva doce, camomila, erva cidreira, valeriana (infusão de 10 min) ou mulungu e casca de laranja (fervendo 5 min). Tome 1h antes de dormir, junto com o magnésio às 20h30.",
  },
  {
    g: ["quebrar o jejum", "primeira refeicao", "cafe da manha proteina"],
    r: "Quebre o jejum assim: água primeiro (400–500ml), depois o shot/chá, e a primeira refeição SEMPRE com proteína (ovos, peixe, frango ou iogurte sem lactose). Começar por carboidrato sozinho derruba a energia no meio da manhã.",
  },
  {
    g: ["shot", "shot da imunidade", "como fazer o shot"],
    r: "Shot da Imunidade: 35ml de água + 1 colher de chá de gengibre + 1 colher de café de cúrcuma + 1 colher de sopa de vinagre de maçã + 15 gotas de própolis + 1 pitada de pimenta caiena. Tome em jejum, depois de beber 500ml de água.",
  },
  {
    g: ["quanto de agua", "meta de agua", "quantos copos"],
    r: "A meta é ~2L por dia (8 copos de 250ml). E todo dia, em jejum, beba 500ml antes do shot. Você tem um contador de copos no dia de hoje, dentro das Semanas 3 e 4.",
  },
  {
    g: ["creatina", "quando tomar creatina"],
    r: "Creatina 3–5g por dia com água — no plano fica às 16h, junto do lanche. Pode tomar todos os dias; ajuda músculo, osso e memória.",
  },
  {
    g: ["magnesio", "quando tomar magnesio"],
    r: "Magnésio (de preferência glicinato ou dimalato) à noite, às 20h30, junto com o Inositol e o chá calmante. Faz parte da estratégia de baixar o cortisol e dormir melhor.",
  },
  {
    g: ["jejum", "janela", "12 horas", "intermitente"],
    r: "A janela é de 12h: jantar até 19h30 e café às 7h30. Para mulheres, 12–14h já bastam — jejuns longos demais sobem o cortisol e podem bagunçar o ciclo. Veja o tema 'Jejum intermitente com sabedoria feminina'.",
  },
  {
    g: ["cortisol", "estresse", "ansiedade"],
    r: "Para baixar o cortisol: sol nos olhos nos primeiros 30 min do dia, proteína no café, café só depois de comer e nunca após as 12h, força no lugar de cardio exagerado, respiração 4-6, dormir 7–9h e magnésio à noite. Se a semana estiver pesada, mantenha comida e sono e alivie o treino.",
  },
  {
    g: ["carboidrato jantar", "carbo a noite", "pode comer carboidrato"],
    r: "Sem carboidrato no jantar 🚫. O jantar leva salada + proteína + legumes, fechando a janela de 12h até 19h30.",
  },
  {
    g: ["marido", "marmita", "sanduiche"],
    r: "A marmita do marido é montada a partir do preparo de domingo: frango grelhado, prego, atum, lombo, burrito... Veja a aba 🥪 Marido, com duas semanas de sanduíches para a obra.",
  },
  {
    g: ["treino", "exercicio", "musculacao", "forca"],
    r: "Os 5 pilares: força 2–3x/semana, cardio zona 2 (150 min/semana), impacto leve 3x, assoalho pélvico 5 min/dia e mobilidade. A força vem primeiro. Veja a aba 💪 Treino e o tema 'Exercícios inegociáveis'.",
  },
  {
    g: ["engravidar", "gravidez", "gestante", "tentando"],
    r: "Ative o modo 🤍 na aba Semanas: os chás de risco (hibisco) já aparecem trocados e o app avisa para pular o Apple Day. Prefira as semanas 3 e 4, estáveis e com proteína. Veja o tema 'Preparação para engravidar' e sempre confirme com o seu médico.",
  },
  {
    g: ["emocao", "vontade de comer", "fome emocional", "compulsao", "descontar"],
    r: "Antes de comer fora de hora, faça a pausa dos 5 minutos: beba água, respire fundo 3x, pergunte 'o que estou sentindo?', registre na aba 💗 Emoções e espere 5 min. Se for fome física, coma com calma e sem culpa 💛.",
  },
  {
    g: ["coroa", "pedras", "mimo", "recompensa"],
    r: "Cada quadradinho que você marca vale 1 pedra 💎. A cada 50 pedras a coroa fica completa e você ganha o seu mimo (que não vale comida!). Escreva o mimo lá no topo do app.",
  },
  {
    g: ["avisos", "notificacao", "lembrete", "alarme"],
    r: "Toque no sino 🔔 no topo para ativar os Avisos. O app te lembra nos horários das refeições e tarefas (café 7h30, almoço 12h, lanche 16h, jantar 19h, chá+magnésio 20h30, telas 21h30). Funciona com o app aberto; se o navegador permitir, também manda notificação.",
  },
];

const SAUDACOES = ["oi", "ola", "olá", "bom dia", "boa tarde", "boa noite", "ei", "hey"];
const AGRADECIMENTOS = ["obrigada", "obrigado", "valeu", "amei", "perfeito", "otimo", "ótimo"];

const RESPOSTA_SEM_MATCH =
  "Ainda não sei responder isso 🤔. Você pode me ensinar: escreva a resposta e toque em “Ensinar o assistente”. Assim eu aprendo e da próxima vez respondo certinho 💛";

/* ---------- aprendizado ---------- */
// aprendidos: [{ p, r, gatilhos:[..] }]
// reforcos: { chaveResposta: contagem }

export function normalizarPergunta(txt) {
  return semAcento(txt).replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function pontuarGatilhos(consultaNorm, gatilhos) {
  let pontos = 0;
  gatilhos.forEach((g) => {
    const gn = normalizarPergunta(g);
    if (!gn) return;
    if (consultaNorm.includes(gn)) {
      pontos += gn.split(" ").length * 2; // frase inteira vale mais
    } else {
      // palavras soltas do gatilho
      gn.split(" ").forEach((palavra) => {
        if (palavra.length > 2 && consultaNorm.includes(palavra)) pontos += 1;
      });
    }
  });
  return pontos;
}

/* Cria o cérebro. `aprendidos` e `reforcos` vêm do estado salvo. */
export function criarCerebro(aprendidos = [], reforcos = {}) {
  const indice = construirIndice();

  function responder(perguntaOriginal) {
    const consulta = normalizarPergunta(perguntaOriginal);
    if (!consulta) {
      return { tipo: "vazio", texto: "Pode escrever a sua dúvida que eu ajudo 💬" };
    }

    // saudações e agradecimentos
    if (SAUDACOES.some((s) => consulta === normalizarPergunta(s))) {
      return {
        tipo: "saudacao",
        texto:
          "Oi, Maravilhosa! 💛 Sou o Assistente VIDA. Posso explicar os chás, o Apple Day, o jejum, os treinos, os suplementos… Sobre o que você quer saber?",
      };
    }
    if (AGRADECIMENTOS.some((s) => consulta.includes(normalizarPergunta(s)))) {
      return { tipo: "agradecimento", texto: "Fico feliz em ajudar! Tô aqui sempre que precisar 🌹" };
    }

    // 1) respostas aprendidas com a usuária (prioridade alta)
    let melhorAprendido = null;
    let melhorPontosAprendido = 0;
    aprendidos.forEach((a) => {
      const p = pontuarGatilhos(consulta, a.gatilhos && a.gatilhos.length ? a.gatilhos : [a.p]);
      if (p > melhorPontosAprendido) {
        melhorPontosAprendido = p;
        melhorAprendido = a;
      }
    });
    if (melhorAprendido && melhorPontosAprendido >= 2) {
      return {
        tipo: "aprendido",
        texto: melhorAprendido.r,
        chave: `aprendido:${melhorAprendido.p}`,
        pergunta: perguntaOriginal,
      };
    }

    // 2) FAQ curada
    let melhorFaq = null;
    let melhorPontosFaq = 0;
    FAQ.forEach((f) => {
      let p = pontuarGatilhos(consulta, f.g);
      // reforço se essa resposta já foi marcada como útil
      const chave = `faq:${f.g[0]}`;
      if (reforcos[chave]) p += Math.min(reforcos[chave], 3);
      if (p > melhorPontosFaq) {
        melhorPontosFaq = p;
        melhorFaq = { ...f, chave };
      }
    });
    if (melhorFaq && melhorPontosFaq >= 2) {
      return {
        tipo: "faq",
        texto: melhorFaq.r,
        chave: melhorFaq.chave,
        pergunta: perguntaOriginal,
      };
    }

    // 3) busca no conteúdo do app
    const achados = buscar(indice, perguntaOriginal);
    if (achados.length > 0) {
      const top = achados.slice(0, 3);
      const linhas = top
        .map((a) => `• ${a.titulo} (${a.categoria})`)
        .join("\n");
      return {
        tipo: "busca",
        texto:
          `Encontrei isso no seu plano que pode responder:\n${linhas}\n\nAbra o Buscador 🔎 e toque no item para ver o conteúdo completo.`,
        achados: top,
        pergunta: perguntaOriginal,
      };
    }

    // 4) nada encontrado — oferece aprender
    return {
      tipo: "sem_match",
      texto: RESPOSTA_SEM_MATCH,
      pergunta: perguntaOriginal,
    };
  }

  return { responder, indice };
}

/* Registra uma resposta ensinada pela usuária */
export function ensinar(aprendidos, pergunta, resposta) {
  const p = normalizarPergunta(pergunta);
  const gatilhos = [p, ...p.split(" ").filter((w) => w.length > 3)];
  const semDuplicar = aprendidos.filter((a) => a.p !== p);
  return [{ p, r: resposta.trim(), gatilhos }, ...semDuplicar].slice(0, 200);
}

/* Reforça (marca como útil) uma resposta */
export function reforcar(reforcos, chave) {
  if (!chave) return reforcos;
  return { ...reforcos, [chave]: (reforcos[chave] || 0) + 1 };
}

export const SUGESTOES_INICIAIS = [
  "O que é o Apple Day?",
  "Posso tomar hibisco grávida?",
  "Qual chá para dormir?",
  "Como faço o shot?",
  "Quanto de água por dia?",
];
