/* ==========================================================
   FIRMES — Vida com Deus
   Conteúdo do app: Bíblia por temas, autores, afirmações
   (co-criações das promessas de Deus em 1ª pessoa),
   disciplinas espirituais, finanças bíblicas, rotinas e
   "apertadores" (lembretes que despertam para a urgência de
   viver hoje o que Deus chamou — contra a procrastinação).
   Todo o conteúdo é offline (nada depende da internet).
   ========================================================== */

/* ---------- Versículo + promessa do dia (rotativo) ---------- */
export const VERSICULOS_DIA = [
  { texto: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4:13" },
  { texto: "Porque para Deus nada é impossível.", ref: "Lucas 1:37" },
  { texto: "O Senhor é a minha luz e a minha salvação; a quem temerei?", ref: "Salmo 27:1" },
  { texto: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.", ref: "Provérbios 3:5" },
  { texto: "Buscai primeiro o Reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas.", ref: "Mateus 6:33" },
  { texto: "Aquietai-vos e sabei que eu sou Deus.", ref: "Salmo 46:10" },
  { texto: "Os que esperam no Senhor renovam as suas forças; correm e não se cansam.", ref: "Isaías 40:31" },
  { texto: "Sê forte e corajoso; não temas, porque o Senhor, teu Deus, é contigo.", ref: "Josué 1:9" },
  { texto: "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.", ref: "Salmo 119:105" },
  { texto: "Deleita-te no Senhor, e ele satisfará os desejos do teu coração.", ref: "Salmo 37:4" },
  { texto: "Entrega o teu caminho ao Senhor, confia nele, e ele tudo fará.", ref: "Salmo 37:5" },
  { texto: "Eu sei os planos que tenho a vosso respeito, planos de paz e não de mal.", ref: "Jeremias 29:11" },
  { texto: "Não andeis ansiosos por coisa alguma; em tudo, com oração, apresentai as vossas petições a Deus.", ref: "Filipenses 4:6" },
  { texto: "Bem-aventurado o homem que confia no Senhor: será como a árvore plantada junto às águas.", ref: "Jeremias 17:7-8" },
  { texto: "O que semeia com lágrimas com alegria ceifará.", ref: "Salmo 126:5" },
  { texto: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo.", ref: "Salmo 23:4" },
  { texto: "A tua palavra é a verdade.", ref: "João 17:17" },
  { texto: "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.", ref: "Mateus 11:28" },
  { texto: "Se Deus é por nós, quem será contra nós?", ref: "Romanos 8:31" },
  { texto: "A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.", ref: "2 Coríntios 12:9" },
  { texto: "Regozijai-vos sempre no Senhor; outra vez digo: regozijai-vos.", ref: "Filipenses 4:4" },
  { texto: "O Senhor é o meu pastor; nada me faltará.", ref: "Salmo 23:1" },
  { texto: "Grandes são as tuas misericórdias; renovam-se cada manhã.", ref: "Lamentações 3:22-23" },
  { texto: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.", ref: "Salmo 46:1" },
  { texto: "Fostes chamados para a liberdade; servi-vos uns aos outros pelo amor.", ref: "Gálatas 5:13" },
  { texto: "Combati o bom combate, completei a carreira, guardei a fé.", ref: "2 Timóteo 4:7" },
  { texto: "Onde está o vosso tesouro, aí estará também o vosso coração.", ref: "Mateus 6:21" },
  { texto: "Ensina-nos a contar os nossos dias, para que alcancemos coração sábio.", ref: "Salmo 90:12" },
  { texto: "Portanto, quer comais, quer bebais ou façais outra coisa qualquer, fazei tudo para a glória de Deus.", ref: "1 Coríntios 10:31" },
  { texto: "Lança o teu pão sobre as águas, porque depois de muitos dias o acharás.", ref: "Eclesiastes 11:1" },
];

/* ---------- Bíblia por temas (versículos-chave, offline) ---------- */
export const TEMAS_BIBLIA = [
  {
    id: "paralisia",
    titulo: "Contra a paralisia espiritual",
    emoji: "🔥",
    resumo: "Deus não te deu espírito de covardia. Levanta, o socorro está com Ele.",
    versiculos: [
      { texto: "Porque Deus não nos deu espírito de covardia, mas de poder, de amor e de moderação.", ref: "2 Timóteo 1:7" },
      { texto: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a minha destra fiel.", ref: "Isaías 41:10" },
      { texto: "Levanta-te, resplandece, porque vem a tua luz, e a glória do Senhor nasce sobre ti.", ref: "Isaías 60:1" },
      { texto: "Assim como o corpo sem espírito é morto, assim também a fé sem obras é morta.", ref: "Tiago 2:26" },
      { texto: "Desperta, tu que dormes, levanta-te dentre os mortos, e Cristo te iluminará.", ref: "Efésios 5:14" },
      { texto: "Corramos, com perseverança, a carreira que nos está proposta, olhando firmemente para Jesus.", ref: "Hebreus 12:1-2" },
    ],
  },
  {
    id: "procrastinacao",
    titulo: "Contra a procrastinação",
    emoji: "⏰",
    resumo: "O hoje é o tempo de Deus. Amanhã pode nunca chegar — faça a próxima coisa.",
    versiculos: [
      { texto: "Portanto, não vos inquieteis pelo dia de amanhã, pois o amanhã trará os seus cuidados; basta a cada dia o seu mal.", ref: "Mateus 6:34" },
      { texto: "Não sabeis o que sucederá amanhã. Que é a vossa vida? Sois como o vapor que aparece por um pouco e depois se desvanece.", ref: "Tiago 4:14" },
      { texto: "O preguiçoso deseja e nada consegue, mas o desejo do diligente será satisfeito.", ref: "Provérbios 13:4" },
      { texto: "Vai ter com a formiga, ó preguiçoso; considera os seus caminhos e sê sábio.", ref: "Provérbios 6:6" },
      { texto: "Tudo quanto te vier à mão para fazer, faze-o conforme as tuas forças.", ref: "Eclesiastes 9:10" },
      { texto: "Remindo o tempo, porque os dias são maus.", ref: "Efésios 5:16" },
      { texto: "Eis agora o tempo aceitável, eis agora o dia da salvação.", ref: "2 Coríntios 6:2" },
    ],
  },
  {
    id: "medo",
    titulo: "Contra o medo e a ansiedade",
    emoji: "🕊️",
    resumo: "Entregue tudo a Deus. A paz que excede o entendimento guardará o seu coração.",
    versiculos: [
      { texto: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.", ref: "1 Pedro 5:7" },
      { texto: "No amor não há medo; antes, o perfeito amor lança fora o medo.", ref: "1 João 4:18" },
      { texto: "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá.", ref: "João 14:27" },
      { texto: "Quando o temor me assaltava, era em ti que eu confiava.", ref: "Salmo 56:3" },
      { texto: "A paz de Deus, que excede todo o entendimento, guardará o vosso coração e a vossa mente em Cristo Jesus.", ref: "Filipenses 4:7" },
    ],
  },
  {
    id: "financas",
    titulo: "Sobre dinheiro e provisão",
    emoji: "💰",
    resumo: "Jesus falou muito de dinheiro. Deus é o dono de tudo — você é mordomo.",
    versiculos: [
      { texto: "Ninguém pode servir a dois senhores... Não podeis servir a Deus e às riquezas.", ref: "Mateus 6:24" },
      { texto: "Dai, e ser-vos-á dado; boa medida, recalcada, sacudida e transbordante vos darão.", ref: "Lucas 6:38" },
      { texto: "O meu Deus, segundo a sua riqueza em glória, suprirá todas as vossas necessidades em Cristo Jesus.", ref: "Filipenses 4:19" },
      { texto: "Trazei todos os dízimos à casa do tesouro... e provai-me nisto, diz o Senhor.", ref: "Malaquias 3:10" },
      { texto: "Porque o amor ao dinheiro é a raiz de todos os males.", ref: "1 Timóteo 6:10" },
      { texto: "Melhor é o pouco com o temor do Senhor do que grande tesouro onde há inquietação.", ref: "Provérbios 15:16" },
      { texto: "Honra ao Senhor com os teus bens e com as primícias de toda a tua renda.", ref: "Provérbios 3:9" },
      { texto: "O rico domina sobre o pobre, e o que toma emprestado é servo do que empresta.", ref: "Provérbios 22:7" },
    ],
  },
  {
    id: "fe",
    titulo: "Fé e confiança",
    emoji: "⚓",
    resumo: "A fé é o firme fundamento das coisas que se esperam.",
    versiculos: [
      { texto: "Ora, a fé é o firme fundamento das coisas que se esperam e a prova das coisas que se não veem.", ref: "Hebreus 11:1" },
      { texto: "Se podes crer, tudo é possível ao que crê.", ref: "Marcos 9:23" },
      { texto: "Andamos por fé e não por vista.", ref: "2 Coríntios 5:7" },
      { texto: "Sem fé é impossível agradar a Deus.", ref: "Hebreus 11:6" },
      { texto: "A vossa fé não se apoiasse em sabedoria humana, e sim no poder de Deus.", ref: "1 Coríntios 2:5" },
    ],
  },
  {
    id: "identidade",
    titulo: "Quem você é em Cristo",
    emoji: "👑",
    resumo: "Nova criatura, filho amado, mais que vencedor.",
    versiculos: [
      { texto: "Se alguém está em Cristo, é nova criatura; as coisas antigas já passaram.", ref: "2 Coríntios 5:17" },
      { texto: "Em todas estas coisas somos mais que vencedores, por meio daquele que nos amou.", ref: "Romanos 8:37" },
      { texto: "Vós, porém, sois raça eleita, sacerdócio real, nação santa, povo de propriedade exclusiva de Deus.", ref: "1 Pedro 2:9" },
      { texto: "Vede que grande amor nos tem concedido o Pai, a ponto de sermos chamados filhos de Deus.", ref: "1 João 3:1" },
      { texto: "Estou crucificado com Cristo; e já não sou eu quem vive, mas Cristo vive em mim.", ref: "Gálatas 2:20" },
    ],
  },
];

/* ---------- Plano de leitura (30 dias, começando pelos Evangelhos + Salmos) ---------- */
export const PLANO_LEITURA = [
  "João 1 · Salmo 1", "João 2 · Salmo 2", "João 3 · Salmo 3", "João 4 · Salmo 8",
  "João 5 · Salmo 19", "João 6 · Salmo 23", "João 7 · Salmo 27", "João 8 · Salmo 34",
  "João 9 · Salmo 37", "João 10 · Salmo 42", "João 11 · Salmo 46", "João 12 · Salmo 51",
  "João 13 · Salmo 62", "João 14 · Salmo 63", "João 15 · Salmo 84", "João 16 · Salmo 90",
  "João 17 · Salmo 91", "João 18 · Salmo 100", "João 19 · Salmo 103", "João 20 · Salmo 116",
  "João 21 · Salmo 119:1-40", "Filipenses 1 · Salmo 119:41-80", "Filipenses 2 · Salmo 119:81-120",
  "Filipenses 3 · Salmo 119:121-176", "Filipenses 4 · Salmo 121", "Tiago 1 · Salmo 127",
  "Tiago 2 · Salmo 130", "Tiago 3 · Salmo 138", "Tiago 4 · Salmo 139", "Tiago 5 · Salmo 145-150",
];

/* ---------- Autores cristãos de todos os tempos ---------- */
export const AUTORES = [
  {
    nome: "Charles Spurgeon",
    epoca: "1834–1892 · Inglaterra",
    titulo: 'O "Príncipe dos Pregadores"',
    sobre: "Pastor batista de Londres que pregava a milhares. Prático, cheio de graça e de coragem, ótimo para quem está desanimado.",
    frase: "Pela perseverança, o caracol chegou à arca.",
    livros: ["Manhã e Noite (devocional diário)", "Sermões", "Discursos aos Meus Estudantes"],
    tema: "perseverança",
  },
  {
    nome: "John Piper",
    epoca: "1946– · EUA",
    titulo: "Pastor e teólogo do prazer em Deus",
    sobre: "Criador do 'hedonismo cristão': viver para a alegria em Deus. Excelente contra a mediocridade espiritual.",
    frase: "Deus é mais glorificado em nós quando estamos mais satisfeitos Nele.",
    livros: ["Alegria em Deus (Desiring God)", "Não Desperdice Sua Vida", "Sede de Deus"],
    tema: "propósito",
  },
  {
    nome: "A. W. Tozer",
    epoca: "1897–1963 · EUA",
    titulo: "Profeta da vida interior",
    sobre: "Pastor autodidata que chamava a igreja de volta à intimidade real com Deus. Direto e profundo.",
    frase: "O que nos vem à mente quando pensamos em Deus é a coisa mais importante a nosso respeito.",
    livros: ["A Busca de Deus", "O Conhecimento do Santo"],
    tema: "intimidade",
  },
  {
    nome: "C. S. Lewis",
    epoca: "1898–1963 · Inglaterra",
    titulo: "Apologista e escritor",
    sobre: "Ex-ateu que se tornou o defensor mais lido da fé cristã no século XX. Racional e imaginativo.",
    frase: "Mire no Céu e você ganhará a terra de brinde; mire na terra e não ganhará nenhum dos dois.",
    livros: ["Cristianismo Puro e Simples", "As Crônicas de Nárnia", "Cartas de um Diabo a seu Aprendiz"],
    tema: "razão da fé",
  },
  {
    nome: "John Bunyan",
    epoca: "1628–1688 · Inglaterra",
    titulo: "Autor de O Peregrino",
    sobre: "Escreveu na prisão a maior alegoria cristã da história — a jornada da alma rumo ao Céu.",
    frase: "Você pode fazer mais do que orar depois de ter orado; mas não pode fazer mais do que orar até ter orado.",
    livros: ["O Peregrino", "Graça Abundante ao Principal dos Pecadores"],
    tema: "jornada",
  },
  {
    nome: "Jonathan Edwards",
    epoca: "1703–1758 · EUA",
    titulo: "Teólogo do Grande Avivamento",
    sobre: "Fez aos 19 anos 70 'Resoluções' para viver cada instante para Deus. Referência contra o desperdício de tempo.",
    frase: "Resolvido: nunca perder um só momento de tempo, mas aproveitá-lo do modo mais proveitoso que eu puder.",
    livros: ["As Resoluções", "Afetos Religiosos", "A Vida de David Brainerd"],
    tema: "uso do tempo",
  },
  {
    nome: "Oswald Chambers",
    epoca: "1874–1917 · Escócia",
    titulo: "Autor do devocional mais lido do mundo",
    sobre: "Seu 'No Melhor de Deus para Nós' é lido diariamente há um século. Desafia à entrega total.",
    frase: "A fé nunca sabe para onde está sendo conduzida, mas ama e conhece Aquele que a conduz.",
    livros: ["No Melhor de Deus para Nós (My Utmost for His Highest)"],
    tema: "entrega",
  },
  {
    nome: "Andrew Murray",
    epoca: "1828–1917 · África do Sul",
    titulo: "Mestre da humildade e da oração",
    sobre: "Pastor e missionário. Seus livros sobre humildade e permanecer em Cristo são clássicos devocionais.",
    frase: "A humildade é a única solo em que crescem as graças; a ausência dela basta para explicar toda falha.",
    livros: ["Humildade", "Permanecendo em Cristo", "A Escola da Oração"],
    tema: "humildade",
  },
  {
    nome: "Dietrich Bonhoeffer",
    epoca: "1906–1945 · Alemanha",
    titulo: "Mártir que enfrentou o nazismo",
    sobre: "Pastor executado por resistir a Hitler. Escreveu sobre o custo real de seguir Jesus — sem 'graça barata'.",
    frase: "Quando Cristo chama um homem, convida-o a vir e morrer.",
    livros: ["O Discipulado (O Preço da Graça)", "Vida em Comunhão"],
    tema: "discipulado",
  },
  {
    nome: "Elisabeth Elliot",
    epoca: "1926–2015 · EUA",
    titulo: "Missionária e escritora",
    sobre: "Viúva de um mártir que voltou a evangelizar o povo que matou seu marido. Sabedoria prática para os dias difíceis.",
    frase: "Faça a próxima coisa. (Do the next thing.)",
    livros: ["Portais de Esplendor", "Que Sou Eu, Senhor?", "Paixão e Pureza"],
    tema: "obediência prática",
  },
  {
    nome: "George Müller",
    epoca: "1805–1898 · Alemanha/Inglaterra",
    titulo: "O homem que viveu de fé",
    sobre: "Sustentou milhares de órfãos apenas por oração, sem pedir dinheiro a ninguém. Referência em fé e finanças.",
    frase: "O começo da ansiedade é o fim da fé; e o começo da verdadeira fé é o fim da ansiedade.",
    livros: ["A Narrativa (autobiografia)", "Um Homem de Fé e Milagres"],
    tema: "fé e provisão",
  },
  {
    nome: "Timothy Keller",
    epoca: "1950–2023 · EUA",
    titulo: "Pastor da cidade, mestre em ídolos do coração",
    sobre: "Falou como poucos sobre dinheiro, trabalho e os 'deuses falsos' que prometem o que só Deus dá.",
    frase: "Somos mais pecadores e falhos do que ousávamos crer, e mais amados e aceitos em Cristo do que ousávamos esperar.",
    livros: ["Deuses Falsos (Counterfeit Gods)", "A Cruz do Rei", "Oração"],
    tema: "dinheiro e ídolos",
  },
  {
    nome: "Agostinho de Hipona",
    epoca: "354–430 · Norte da África",
    titulo: "O maior teólogo da igreja antiga",
    sobre: "Viveu no pecado até se render a Cristo. Suas 'Confissões' abrem o coração inquieto que só Deus aquieta.",
    frase: "Fizeste-nos para ti, Senhor, e o nosso coração está inquieto enquanto não repousa em ti.",
    livros: ["Confissões", "A Cidade de Deus"],
    tema: "conversão",
  },
  {
    nome: "Tomás de Kempis",
    epoca: "1380–1471 · Países Baixos",
    titulo: "Autor de A Imitação de Cristo",
    sobre: "Escreveu o livro devocional mais publicado depois da Bíblia. Chama à vida simples e humilde com Jesus.",
    frase: "O homem propõe, mas Deus dispõe.",
    livros: ["A Imitação de Cristo"],
    tema: "vida devocional",
  },
];

/* ---------- Afirmações: co-criações das promessas de Deus (1ª pessoa) ---------- */
export const AFIRMACOES = [
  {
    id: "identidade",
    titulo: "Minha identidade",
    emoji: "👑",
    lista: [
      { texto: "Eu sou uma nova criatura em Cristo. As coisas velhas já passaram e tudo se fez novo em mim.", ref: "2 Coríntios 5:17" },
      { texto: "Eu sou filho(a) amado(a) de Deus, e nada me separará do amor Dele.", ref: "Romanos 8:38-39" },
      { texto: "Eu sou mais que vencedor(a) por meio daquele que me amou.", ref: "Romanos 8:37" },
      { texto: "Eu sou obra-prima de Deus, criado(a) para boas obras que Ele preparou para mim.", ref: "Efésios 2:10" },
    ],
  },
  {
    id: "coragem",
    titulo: "Coragem para agir hoje",
    emoji: "🔥",
    lista: [
      { texto: "Eu não recebi espírito de covardia, mas de poder, de amor e de moderação. Por isso, ajo hoje.", ref: "2 Timóteo 1:7" },
      { texto: "Sou forte e corajoso(a); não temo, porque o Senhor meu Deus está comigo por onde eu for.", ref: "Josué 1:9" },
      { texto: "Tudo posso naquele que me fortalece; começo agora o que Deus pôs no meu coração.", ref: "Filipenses 4:13" },
      { texto: "O Senhor é a minha luz e a minha salvação; não temerei o que precisa ser feito.", ref: "Salmo 27:1" },
    ],
  },
  {
    id: "provisao",
    titulo: "Provisão e finanças",
    emoji: "💰",
    lista: [
      { texto: "O meu Deus supre todas as minhas necessidades segundo as Suas riquezas em glória.", ref: "Filipenses 4:19" },
      { texto: "Eu honro ao Senhor com os meus bens; Ele abençoa o trabalho das minhas mãos.", ref: "Provérbios 3:9-10" },
      { texto: "Eu sou generoso(a) e, ao dar, recebo boa medida, recalcada, sacudida e transbordante.", ref: "Lucas 6:38" },
      { texto: "Aprendo a viver contente em toda e qualquer situação, pois a minha suficiência vem de Deus.", ref: "Filipenses 4:11-12" },
    ],
  },
  {
    id: "paz",
    titulo: "Paz sobre a ansiedade",
    emoji: "🕊️",
    lista: [
      { texto: "Eu não ando ansioso(a) por coisa alguma; entrego tudo a Deus, e a Sua paz guarda o meu coração.", ref: "Filipenses 4:6-7" },
      { texto: "Lanço sobre Ele toda a minha ansiedade, porque Ele tem cuidado de mim.", ref: "1 Pedro 5:7" },
      { texto: "Eu descanso, porque o Senhor é o meu pastor e nada me faltará.", ref: "Salmo 23:1" },
    ],
  },
  {
    id: "proposito",
    titulo: "Propósito e futuro",
    emoji: "🎯",
    lista: [
      { texto: "Deus tem planos de paz para mim, para me dar futuro e esperança.", ref: "Jeremias 29:11" },
      { texto: "Aquele que começou a boa obra em mim há de completá-la.", ref: "Filipenses 1:6" },
      { texto: "Entrego o meu caminho ao Senhor; confio Nele, e Ele agirá.", ref: "Salmo 37:5" },
      { texto: "Sou como a árvore plantada junto às águas: dou fruto no tempo certo e não murcho.", ref: "Salmo 1:3" },
    ],
  },
];

/* ---------- Disciplinas espirituais (prático) ---------- */
export const DISCIPLINAS = [
  {
    id: "oracao",
    nome: "Oração",
    emoji: "🙏",
    base: "Orai sem cessar. — 1 Tessalonicenses 5:17",
    porque: "Conversar com Deus é o oxigênio da alma. Onde há oração, a paralisia se quebra.",
    comecar: "Reserve 5 minutos. Use o roteiro ACAG: Adoração, Confissão, Ação de graças, Gratidão/pedidos.",
  },
  {
    id: "palavra",
    nome: "Leitura da Palavra",
    emoji: "📖",
    base: "Lâmpada para os meus pés é a tua palavra. — Salmo 119:105",
    porque: "A fé vem pelo ouvir a Palavra. Sem ela, andamos no escuro.",
    comecar: "Leia 1 capítulo por dia (comece por João). Sublinhe 1 versículo e escreva o que Deus falou.",
  },
  {
    id: "meditacao",
    nome: "Meditação",
    emoji: "🧠",
    base: "Neste livro medita de dia e de noite. — Josué 1:8",
    porque: "Meditar é ruminar a Palavra até ela virar convicção e ação.",
    comecar: "Pegue 1 versículo do dia e repita-o devagar 3x, trocando a ênfase de palavra a cada vez.",
  },
  {
    id: "jejum",
    nome: "Jejum",
    emoji: "🍃",
    base: "Quando jejuardes... — Mateus 6:16 (Jesus assume que jejuaremos)",
    porque: "Abrir mão do bom (comida, telas) para buscar o melhor (Deus). Afia o foco espiritual.",
    comecar: "Comece com um jejum de 1 refeição ou de redes sociais por 1 dia. Use o tempo para orar.",
  },
  {
    id: "adoracao",
    nome: "Adoração",
    emoji: "🎵",
    base: "Entrai por suas portas com ações de graças. — Salmo 100:4",
    porque: "Adorar tira os olhos do problema e os coloca em Deus. A gratidão derrota o desânimo.",
    comecar: "Ouça 2 louvores hoje de coração aberto, ou faça uma lista de 5 gratidões.",
  },
  {
    id: "servico",
    nome: "Serviço",
    emoji: "🤝",
    base: "Servi uns aos outros pelo amor. — Gálatas 5:13",
    porque: "Sair de si e servir é remédio contra a autopiedade e a paralisia.",
    comecar: "Faça hoje 1 gesto concreto de bondade a alguém, sem esperar retorno.",
  },
  {
    id: "silencio",
    nome: "Silêncio e descanso",
    emoji: "🌿",
    base: "Aquietai-vos e sabei que eu sou Deus. — Salmo 46:10",
    porque: "No silêncio ouvimos a voz mansa e delicada de Deus, longe do barulho.",
    comecar: "Fique 3 minutos em silêncio, sem celular, só respirando e entregando o dia a Deus.",
  },
  {
    id: "generosidade",
    nome: "Generosidade",
    emoji: "🎁",
    base: "Mais bem-aventurada coisa é dar do que receber. — Atos 20:35",
    porque: "Dar quebra o poder do dinheiro sobre o coração e abre canais de bênção.",
    comecar: "Separe hoje algo para dar: dízimo, oferta, ou ajudar alguém em necessidade.",
  },
  {
    id: "diario",
    nome: "Diário espiritual",
    emoji: "✍️",
    base: "Escreve a visão e torna-a bem legível. — Habacuque 2:2",
    porque: "Registrar o que Deus fala e faz fortalece a fé e mostra o crescimento.",
    comecar: "Escreva 3 linhas ao fim do dia: o que Deus falou, o que agradeço, o que peço.",
  },
];

/* ---------- Finanças bíblicas ---------- */
export const FINANCAS_PRINCIPIOS = [
  {
    titulo: "Deus é o dono; você é mordomo",
    texto: "Do Senhor é a terra e a sua plenitude. Você administra o que é Dele — isso muda tudo.",
    ref: "Salmo 24:1",
  },
  {
    titulo: "Honre a Deus primeiro (dízimos e ofertas)",
    texto: "Dê a Deus as primícias, não as sobras. É um ato de fé e de gratidão, não de troca.",
    ref: "Provérbios 3:9 · Malaquias 3:10",
  },
  {
    titulo: "Fuja das dívidas",
    texto: "Quem toma emprestado é servo de quem empresta. Liberdade financeira começa saindo do vermelho.",
    ref: "Provérbios 22:7",
  },
  {
    titulo: "Guarde e planeje",
    texto: "O sábio ajunta com prudência; o insensato gasta tudo. Poupe com propósito, não por ganância.",
    ref: "Provérbios 21:20",
  },
  {
    titulo: "Trabalhe com excelência",
    texto: "As mãos diligentes enriquecem. Seu trabalho é para o Senhor, feito com esmero.",
    ref: "Provérbios 10:4 · Colossenses 3:23",
  },
  {
    titulo: "Contentamento é riqueza",
    texto: "Grande fonte de lucro é a piedade com contentamento. Basta ter o sustento e com que nos vestir.",
    ref: "1 Timóteo 6:6-8",
  },
  {
    titulo: "Seja generoso e semeie",
    texto: "Quem semeia com fartura, com fartura ceifará. Dê com alegria — Deus ama quem dá com alegria.",
    ref: "2 Coríntios 9:6-7",
  },
  {
    titulo: "Não sirva ao dinheiro",
    texto: "Você não pode servir a Deus e às riquezas. O dinheiro é ótimo servo e péssimo senhor.",
    ref: "Mateus 6:24",
  },
];

/* Guia prático de orçamento sugerido (base cristã de mordomia) */
export const FINANCAS_ORCAMENTO = {
  intro: "Um ponto de partida bíblico e simples. Ajuste à sua realidade — o importante é dar a Deus o primeiro lugar, viver com margem e evitar dívidas.",
  faixas: [
    { nome: "Dízimo / oferta ao Senhor", pct: 10, cor: "#C9A34A" },
    { nome: "Poupança / reserva", pct: 10, cor: "#7BA05B" },
    { nome: "Essenciais (casa, comida, contas)", pct: 55, cor: "#B76E79" },
    { nome: "Transporte / saúde", pct: 15, cor: "#6E8CB7" },
    { nome: "Lazer / outros", pct: 10, cor: "#9B7BB7" },
  ],
};

/* ---------- "Apertadores": lembretes que despertam para a urgência de viver hoje ---------- */
/* Memento mori bíblico: a vida é breve — não adie o que Deus chamou você a fazer HOJE. */
export const APERTADORES = [
  "Enquanto você lê isto, a vida de muitos se apaga em leitos de hospital pelo mundo. Você recebeu o dom de HOJE. O que Deus pediu e você está adiando?",
  "\"Ensina-nos a contar os nossos dias\" (Sl 90:12). Seus dias são contados — não desperdice este.",
  "A vida é como o vapor que aparece e logo se desvanece (Tg 4:14). O amanhã não é promessa. Faça a próxima coisa certa agora.",
  "Milhares hoje dariam tudo por mais um dia saudável. Você o tem. Levante e faça o que importa.",
  "\"Eis agora o tempo aceitável\" (2 Co 6:2). Não existe momento mais espiritual do que a obediência de agora.",
  "A procrastinação é o ladrão silencioso dos sonhos que Deus plantou em você. Recupere 1 hora hoje.",
  "Você não vai lembrar dos vídeos que assistiu, mas vai colher o que plantou. Semeie algo eterno hoje.",
  "Se hoje fosse seu último dia útil na Terra, o que você não deixaria por fazer? Comece por aí.",
  "\"Remindo o tempo, porque os dias são maus\" (Ef 5:16). Resgate o tempo — ele não volta.",
  "Deus não te deu espírito de covardia (2 Tm 1:7). O medo de começar é mentira. Dê o primeiro passo pequeno.",
  "Pela perseverança, o caracol chegou à arca (Spurgeon). Devagar, mas hoje. Um passo já é vitória.",
  "\"Faça a próxima coisa\" (Elisabeth Elliot). Não resolva a vida inteira — resolva o próximo passo.",
];

/* Frases de encorajamento suave (rotativas na home) */
export const ENCORAJAMENTOS = [
  "Deus não terminou a obra em você. Respire e continue.",
  "Um passo pequeno hoje vale mais que um plano perfeito amanhã.",
  "A graça de Deus se renova a cada manhã — inclusive nesta.",
  "Você não precisa de força para o mês inteiro, só para hoje.",
  "O que você planta na oração, colhe na vida.",
];

/* ---------- Lembretes/rotina padrão (horários) ---------- */
export const LEMBRETES_PADRAO = [
  { id: "devocional_manha", hora: "07:00", emoji: "📖", titulo: "Devocional da manhã", corpo: "Comece o dia com Deus: 1 versículo + 5 minutos de oração." },
  { id: "afirmacao", hora: "09:00", emoji: "👑", titulo: "Declare a promessa", corpo: "Ore uma afirmação em 1ª pessoa. Deus já disse — declare com fé." },
  { id: "apertador_tarde", hora: "14:00", emoji: "⏰", titulo: "Apertador do dia", corpo: "O tempo passa. Qual a próxima coisa certa que você pode fazer agora?" },
  { id: "disciplina", hora: "18:00", emoji: "🌿", titulo: "Disciplina espiritual", corpo: "Escolha 1 disciplina de hoje: oração, Palavra, silêncio ou generosidade." },
  { id: "gratidao_noite", hora: "21:30", emoji: "✍️", titulo: "Diário e gratidão", corpo: "Escreva 3 linhas: o que Deus falou, o que agradeço, o que entrego." },
];
