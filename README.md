# FIRMES · Vida com Deus 👑

App cristão evangélico com a **Bíblia como base**. Foi feito para **tirar a pessoa
da paralisia espiritual e da procrastinação**, ajudando a viver *hoje* aquilo que
Deus chamou você a fazer — com fundamento na Palavra.

> _"Ensina-nos a contar os nossos dias, para que alcancemos coração sábio."_ — Salmo 90:12

## O que a app tem

- **📖 Bíblia por temas** — versículos-chave contra a paralisia, a procrastinação,
  o medo, sobre dinheiro, fé e identidade em Cristo. Inclui um **plano de leitura
  de 30 dias** (Evangelhos + Salmos) com progresso salvo.
- **👑 Afirmações (co-criações)** — as **promessas de Deus oradas em 1ª pessoa**
  ("Eu sou...", "O meu Deus supre..."). Concordar em voz alta com o que Deus já
  disse sobre você, sempre com a referência bíblica.
- **🌿 Disciplinas espirituais (prático)** — oração, Palavra, meditação, jejum,
  adoração, serviço, silêncio, generosidade e diário. Cada uma com a base bíblica,
  o *porquê* e um passo "**comece hoje**". Marcação diária de progresso.
- **📚 Grandes autores de todos os tempos** — Spurgeon, John Piper, A. W. Tozer,
  C. S. Lewis, John Bunyan, Jonathan Edwards, Oswald Chambers, Andrew Murray,
  Dietrich Bonhoeffer, Elisabeth Elliot, George Müller, Timothy Keller, Agostinho
  e Tomás de Kempis — com bio, uma frase marcante e livros recomendados.
- **💰 Finanças com Deus** — "Jesus falou muito de dinheiro". Princípios bíblicos
  de mordomia (dízimo, fuga das dívidas, contentamento, generosidade) e um
  **orçamento sugerido** que calcula as faixas a partir da sua renda.
- **🔔 Rotina, lembretes e "apertadores"** — cria uma rotina espiritual com avisos
  nos horários (devocional, declarar a promessa, disciplina, diário). Os
  **apertadores** são mensagens que despertam para a urgência de viver hoje
  (memento mori bíblico), para você não adiar o que importa. Funcionam como toast
  no app e, com permissão, como notificação do sistema.

Tudo funciona **offline** — nenhum conteúdo depende da internet. O progresso é
salvo no próprio dispositivo.

## Rodar localmente

```bash
npm install
npm run dev      # abre em http://localhost:5173
npm run build    # gera a versão de produção em dist/
npm run preview  # serve o build
```

## Estrutura

| Arquivo | O quê |
| --- | --- |
| `src/App.jsx` | App principal e todas as telas |
| `src/appData.js` | Todo o conteúdo (versículos, temas, autores, afirmações, disciplinas, finanças, apertadores) |
| `src/lembretes.js` | Sistema de lembretes/apertadores nos horários |
| `src/storage.js` | Persistência (localStorage ou storage do ambiente) |
| `src/main.jsx` | Ponto de entrada React |

> Aviso pastoral: as afirmações e apertadores servem para nos alinhar à Palavra e
> à obediência — não são fórmula mágica nem "positividade" vazia. A base é sempre
> o que Deus já disse na Bíblia. As frases dos autores são atribuições conhecidas;
> confira sempre nas fontes originais.
