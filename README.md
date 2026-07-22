# Planner VIDA · 4 semanas 🌹

App de acompanhamento de dieta, rotina, treino e cuidado com corpo e espírito —
_Vestidas de Intimidade com Deus para Amar_. Quatro semanas: as duas primeiras da
Dieta VIDA (com Apple Day) e as duas últimas do Planner da Jen (manutenção, treino
e marmita do marido).

## O que há de novo (v2)

- **🎉 Animações** — checagens com "pop", cartões que aparecem suaves, coroa que
  brilha ao completar, confete quando uma seção chega a 100% e toasts deslizando.
- **🖼️ Ilustrações** — ramo de rosa, faixa de oliveira e coroa em SVG (sem
  depender de internet), no topo, no rodapé e na tela de entrada.
- **💬 Assistente VIDA** — chatbot flutuante que tira dúvidas sobre chás, jejum,
  Apple Day, treino e suplementos usando o conteúdo do próprio app. **Aprende com
  você**: quando não sabe algo, você ensina a resposta e ele guarda para a próxima.
  Também reforça as respostas marcadas como úteis.
- **🔎 Buscador** — uma aba (e um atalho no topo) que procura em receitas, chás,
  temas, refeições, hábitos e lista de compras, com atalho direto para cada item.
- **🔔 Avisos** — lembretes nos horários das refeições e tarefas (café 7h30,
  almoço 12h, lanche 16h, jantar 19h, chá + magnésio 20h30, telas 21h30…). Aparecem
  na tela com o app aberto e, se o navegador permitir, como notificação do sistema.
  Cada horário pode ser ligado/desligado.

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
| `src/PlannerVida.jsx` | Componente principal e todas as telas |
| `src/data.js` | Todo o conteúdo (dias, receitas, chás, temas, horários) |
| `src/ChatBot.jsx` | Assistente VIDA (interface do chat) |
| `src/chatBrain.js` | Cérebro do assistente: FAQ, busca e aprendizado |
| `src/searchIndex.js` | Índice e busca usados pelo Buscador e pelo assistente |
| `src/avisos.js` | Agendamento e disparo dos lembretes |
| `src/Ilustracoes.jsx` | Ilustrações SVG |
| `src/storage.js` | Armazenamento (usa `window.storage` ou `localStorage`) |

## Privacidade

Tudo é guardado **no próprio aparelho** (via `window.storage` no ambiente Artifact
ou `localStorage` no navegador). O assistente e a busca funcionam localmente — nada
é enviado para fora. O código de acesso apenas separa progressos diferentes; não é
segurança de verdade, então não use senha de banco ou e-mail.

> Este app é educativo e não substitui o acompanhamento de médico e nutricionista —
> principalmente em gestação, amamentação, uso de medicação ou doença crônica.
