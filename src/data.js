/* ==========================================================
   PLANNER VIDA — DADOS
   Semanas 1 e 2 → Dieta VIDA (Unidas com Propósito)
   Semanas 3 e 4 → Planner da Jen (rotina, treino, marido)
   ========================================================== */

export const C = {
  rose: "#B76E79",
  roseSoft: "#F7E8EA",
  paper: "#FBF3F1",
  card: "#FFFFFF",
  gold: "#C9A34A",
  goldSoft: "#F3E8CF",
  ink: "#4A3B3E",
  inkSoft: "#8A7377",
  green: "#5B7B5A",
  greenSoft: "#EAF1EA",
  blue: "#5A6E8C",
  blueSoft: "#E9EDF4",
  indigo: "#3F3A6E",
  indigoSoft: "#E7E5F2",
  line: "#EDD9DC",
  aqua: "#6FA8B8",
};

export const serif = "Georgia, 'Times New Roman', serif";

/* ---------------- SEMANAS 1 e 2 — DIETA VIDA ---------------- */

export const REFEICOES = [
  ["cafe", "☕ Café da manhã"],
  ["lancheManha", "🍏 Lanche da manhã"],
  ["almoco", "🥗 Almoço"],
  ["lanche", "🥜 Lanche"],
  ["jantar", "🍽️ Jantar"],
  ["ceia", "🌙 Ceia"],
];

export const SEMANA1 = [
  { n: "1º Dia", k: "s1d1",
    padrao: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas (alface, rúcula, acelga, espinafre, agrião à vontade) • 1 concha de feijão (65g) • 150g de brócolis e tomate • 80g de batata doce no vapor", lanche: "1 banana + 4 castanhas de caju", jantar: "Salada de folhas à vontade • 150g de couve-flor e chuchu • 3 colheres de sopa de lentilha OU 3 conchas de sopa", ceia: "Chás para dormir" },
    proteina: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas à vontade • 1 concha de feijão (65g) • Brócolis e tomate à vontade • 80g de batata doce no vapor • Peixe ou frango 150g", lanche: "1 banana + 4 castanhas de caju", jantar: "Salada de folhas à vontade • Couve-flor e chuchu à vontade • 3 colheres de lentilha OU 3 conchas de sopa • 2 ovos OU 1 shake de whey (24g)", ceia: "Chás para dormir" } },
  { n: "2º Dia", k: "s1d2",
    padrao: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas à vontade • Concha de lentilha (65g) • 150g de couve-flor e chuchu • 80g de mandioca", lanche: "1 pera + 2 castanhas do Pará", jantar: "Salada de folhas à vontade • 150g de brócolis e tomate • 1 concha de feijão (65g) OU 3 conchas de sopa", ceia: "Chás para dormir" },
    proteina: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas à vontade • Concha de lentilha (65g) • Couve-flor e chuchu à vontade • 80g de mandioca • Peixe ou frango 150g", lanche: "1 pera + 2 castanhas do Pará", jantar: "Salada de folhas à vontade • Brócolis e tomate • 1 concha de feijão (65g) OU 3 conchas de sopa • 2 ovos OU 1 shake de whey (24g)", ceia: "Chás para dormir" } },
  { n: "3º Dia", k: "s1d3",
    padrao: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas à vontade • 1 ovo • 150g de repolho e abobrinha • 80g de inhame", lanche: "1 kiwi + 8 amêndoas", jantar: "Salada de folhas à vontade • 150g de beringela com pimentão • 3 colheres de grão de bico (65g) OU 3 conchas de sopa", ceia: "Chás para dormir" },
    proteina: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas à vontade • Repolho e abobrinha à vontade • 80g de inhame • Peixe ou frango 150g", lanche: "1 kiwi + 8 amêndoas", jantar: "Salada de folhas à vontade • Beringela com pimentão • 3 colheres de grão de bico (65g) OU 3 conchas de sopa • 2 ovos OU 1 shake de whey (24g)", ceia: "Chás para dormir" } },
  { n: "4º Dia — Apple Day 🍎", k: "s1d4", apple: true,
    padrao: { cafe: "1 maçã + chá Tira Fome", lancheManha: "1 dose de bariátrica natural (beber muita água) + chá de hortelã", almoco: "2 maçãs + chá Tira Fome", lanche: "1 maçã + chá Tira Fome + 1 dose de bariátrica natural", jantar: "2 maçãs + chás sem cafeína", ceia: "Chás para dormir" },
    proteina: { cafe: "2 maçãs + chá Tira Fome", lancheManha: "1 dose de bariátrica natural (beber muita água) + chá de hortelã", almoco: "3 maçãs + chá Tira Fome", lanche: "2 maçãs + chá Tira Fome + 1 dose de bariátrica natural", jantar: "2 maçãs + chás sem cafeína", ceia: "Chás para dormir" } },
  { n: "5º Dia", k: "s1d5",
    padrao: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas à vontade • 1 ovo • 150g de repolho e abobrinha • 80g de mandioca", lanche: "1 kiwi + 5 castanhas de caju", jantar: "Salada de folhas • 150g de couve-flor e chuchu • 1 concha de feijão (65g) OU 3 conchas de sopa", ceia: "Chás para dormir" },
    proteina: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas à vontade • 1 ovo • 150g de repolho e abobrinha • 80g de mandioca • Peixe ou frango 150g", lanche: "1 kiwi + 5 castanhas de caju", jantar: "Salada de folhas • 150g de couve-flor e chuchu • 1 concha de feijão (65g) OU 3 conchas de sopa • 2 ovos OU 1 shake de whey (24g)", ceia: "Chás para dormir" } },
  { n: "6º Dia", k: "s1d6",
    padrao: { cafe: "Shot + suco • Meio da manhã: chá verde", almoco: "Salada de folhas à vontade • Concha de feijão (65g) • 150g de couve-flor e chuchu • 80g de quinoa", lanche: "1 pera + 2 castanhas do Pará", jantar: "Salada de folhas • 150g de brócolis com tomate • 1 concha de feijão (65g) OU 3 conchas de sopa", ceia: "Chás para dormir" },
    proteina: { cafe: "Shot + suco • Meio da manhã: chá verde", almoco: "Salada de folhas à vontade • Concha de feijão (65g) • Couve-flor e chuchu à vontade • 80g de quinoa • Peixe ou frango 150g", lanche: "1 pera + 2 castanhas do Pará", jantar: "Salada de folhas • Brócolis com tomate à vontade • 3 conchas de sopa • 2 ovos OU 1 shake de whey (24g)", ceia: "Chás para dormir" } },
  { n: "7º Dia", k: "s1d7",
    padrao: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas à vontade • 1 ovo • 150g de repolho e abobrinha • 80g de inhame", lanche: "1 kiwi + 8 amêndoas", jantar: "Salada de folhas • 150g de beringela com pimentão • Concha de grão de bico (65g) OU 3 conchas de sopa", ceia: "Chás para dormir" },
    proteina: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas à vontade • Repolho e abobrinha à vontade • 80g de inhame • Peixe ou frango 150g", lanche: "1 kiwi + 8 amêndoas", jantar: "Salada de folhas • Beringela com pimentão • Concha de grão de bico (65g) OU 3 conchas de sopa • 2 ovos OU 1 shake de whey (24g)", ceia: "Chás para dormir" } },
];

export const SEMANA2 = [
  { n: "8º Dia", k: "s2d1",
    padrao: { cafe: "Shot + suco • Meio da manhã: chá detox de louro e cravo", almoco: "Salada de folhas à vontade • 1 concha de grão de bico (65g) • 150g de abobrinha e cenoura • 80g de batata doce", lanche: "1 maçã + 4 castanhas de caju", jantar: "Salada de folhas • 150g de couve refogada com tomate • 3 colheres de feijão (65g) OU 3 conchas de sopa", ceia: "Chás para dormir" },
    proteina: { cafe: "Shot + suco • Meio da manhã: chá detox de louro e cravo", almoco: "Salada de folhas à vontade • 1 concha de grão de bico (65g) • Abobrinha e cenoura à vontade • 80g de batata doce • Peixe ou frango 150g", lanche: "1 maçã + 4 castanhas de caju", jantar: "Salada de folhas • Couve refogada com tomate • 3 colheres de feijão OU 3 conchas de sopa • 2 ovos OU 1 shake de whey (24g)", ceia: "Chás para dormir" } },
  { n: "9º Dia", k: "s2d2",
    padrao: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas à vontade • 1 concha de feijão (65g) • 150g de repolho e cenoura • 80g de inhame", lanche: "1 pera + 2 castanhas do Pará", jantar: "Salada de folhas • 150g de brócolis grelhado no alho • 3 colheres de lentilha (65g) OU 3 conchas de sopa", ceia: "Chás para dormir" },
    proteina: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas à vontade • 1 concha de feijão (65g) • Repolho e cenoura à vontade • 80g de inhame • Peixe ou frango 150g", lanche: "1 pera + 2 castanhas do Pará", jantar: "Salada de folhas • Brócolis grelhado no alho • 3 colheres de lentilha OU 3 conchas de sopa • 2 ovos OU 1 shake de whey (24g)", ceia: "Chás para dormir" } },
  { n: "10º Dia", k: "s2d3",
    padrao: { cafe: "Shot + suco • Meio da manhã: chá verde", almoco: "Salada de folhas à vontade • 1 ovo • 150g de beringela com pimentão • 80g de quinoa", lanche: "1 kiwi + 8 amêndoas", jantar: "Salada de folhas • 150g de couve-flor assada • Concha de grão de bico (65g) OU 3 conchas de sopa", ceia: "Chás para dormir" },
    proteina: { cafe: "Shot + suco • Meio da manhã: chá verde", almoco: "Salada de folhas à vontade • Beringela com pimentão à vontade • 80g de quinoa • Peixe ou frango 150g", lanche: "1 kiwi + 8 amêndoas", jantar: "Salada de folhas • Couve-flor assada • Concha de grão de bico OU 3 conchas de sopa • 2 ovos OU 1 shake de whey (24g)", ceia: "Chás para dormir" } },
  { n: "11º Dia — Apple Day 🍎", k: "s2d4", apple: true,
    padrao: { cafe: "1 maçã + chá Tira Fome", lancheManha: "1 dose de bariátrica natural (beber muita água) + chá de hortelã", almoco: "2 maçãs + chá Tira Fome", lanche: "1 maçã + chá Tira Fome + 1 dose de bariátrica natural", jantar: "2 maçãs + chás sem cafeína", ceia: "Chás para dormir" },
    proteina: { cafe: "2 maçãs + chá Tira Fome", lancheManha: "1 dose de bariátrica natural (beber muita água) + chá de hortelã", almoco: "3 maçãs + chá Tira Fome", lanche: "2 maçãs + chá Tira Fome + 1 dose de bariátrica natural", jantar: "2 maçãs + chás sem cafeína", ceia: "Chás para dormir" } },
  { n: "12º Dia", k: "s2d5",
    padrao: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas à vontade • Concha de lentilha (65g) • 150g de chuchu salteado no alho • 80g de mandioca", lanche: "1 maçã + 5 castanhas de caju", jantar: "Salada de folhas • 150g de abobrinha grelhada • 1 concha de feijão (65g) OU 3 conchas de sopa", ceia: "Chás para dormir" },
    proteina: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas à vontade • Concha de lentilha (65g) • Chuchu salteado no alho à vontade • 80g de mandioca • Peixe ou frango 150g", lanche: "1 maçã + 5 castanhas de caju", jantar: "Salada de folhas • Abobrinha grelhada • 1 concha de feijão OU 3 conchas de sopa • 2 ovos OU 1 shake de whey (24g)", ceia: "Chás para dormir" } },
  { n: "13º Dia", k: "s2d6",
    padrao: { cafe: "Shot + suco • Meio da manhã: chá de cavalinha", almoco: "Salada de folhas à vontade • Concha de feijão (65g) • 150g de brócolis e tomate cereja assados • 80g de batata doce", lanche: "1 pera + 2 castanhas do Pará", jantar: "Salada de folhas • 150g de repolho refogado • 3 colheres de lentilha (65g) OU 3 conchas de sopa", ceia: "Chás para dormir" },
    proteina: { cafe: "Shot + suco • Meio da manhã: chá de cavalinha", almoco: "Salada de folhas à vontade • Concha de feijão (65g) • Brócolis e tomate cereja assados à vontade • 80g de batata doce • Peixe ou frango 150g", lanche: "1 pera + 2 castanhas do Pará", jantar: "Salada de folhas • Repolho refogado • 3 colheres de lentilha OU 3 conchas de sopa • 2 ovos OU 1 shake de whey (24g)", ceia: "Chás para dormir" } },
  { n: "14º Dia — Celebração 🌹", k: "s2d7",
    padrao: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas à vontade • 1 ovo • 150g de couve-flor e chuchu • 80g de inhame", lanche: "1 kiwi + 8 amêndoas", jantar: "Salada de folhas • Arroz de couve-flor • Concha de grão de bico (65g) OU 3 conchas de sopa", ceia: "Chás para dormir • Pesar, fotografar e escrever o que mudou nestas 2 semanas 💛" },
    proteina: { cafe: "Shot + suco • Meio da manhã: chá de hibisco", almoco: "Salada de folhas à vontade • Couve-flor e chuchu à vontade • 80g de inhame • Peixe ou frango 150g", lanche: "1 kiwi + 8 amêndoas", jantar: "Salada de folhas • Arroz de couve-flor • Concha de grão de bico OU 3 conchas de sopa • 2 ovos OU 1 shake de whey (24g)", ceia: "Chás para dormir • Pesar, fotografar e escrever o que mudou nestas 2 semanas 💛" } },
];

/* ---------------- SEMANAS 3 e 4 — PLANNER DA JEN ---------------- */

export const ROTINA = [
  { id: "agua-jejum", hora: "7h00", txt: "Acordar + 400ml de água (pode ser com chia)" },
  { id: "cafe-manha", hora: "7h30", txt: "Café da manhã com proteína (quebra o jejum de 12h)" },
  { id: "prenatal", hora: "7h30", txt: "Pré-natal junto com a comida", star: true },
  { id: "colageno", hora: "7h30", txt: "Colágeno marinho na bebida" },
  { id: "cafe", hora: "até 12h", txt: "Café — máx. 2 xícaras, longe do pré-natal" },
  { id: "almoco", hora: "12h–13h", txt: "Almoço completo (salada + proteína + carbo)" },
  { id: "lanche", hora: "16h", txt: "Lanche: 1 fruta + castanhas" },
  { id: "creatina", hora: "16h", txt: "Creatina 3–5g com água" },
  { id: "jantar", hora: "até 19h30", txt: "Jantar (fecha a janela de jejum de 12h)" },
  { id: "cha", hora: "20h30", txt: "Chá calmante (camomila / erva-doce)" },
  { id: "magnesio", hora: "20h30", txt: "Magnésio + Inositol (NOW)", star: true },
  { id: "telas", hora: "21h30", txt: "Desligar telas / modo noturno" },
];

export const CARDAPIO = {
  s3: [
    { n: "Segunda", cafe: "Omelete de 2 ovos com espinafre + 1 fruta + café", almoco: "Salada + frango grelhado 150g + arroz de couve-flor + feijão", lanche: "1 maçã + 4 castanhas de caju", jantar: "Sopa de legumes + 1 ovo cozido" },
    { n: "Terça", cafe: "Iogurte sem lactose com chia e frutas vermelhas", almoco: "Salada + peixe assado com limão + batata doce + brócolis", lanche: "1 pera + 2 castanhas do Pará", jantar: "Salada morna de grão de bico + abobrinha grelhada" },
    { n: "Quarta", cafe: "Ovos mexidos + abacate + chá verde", almoco: "Salada + carne magra 120g + mandioca + couve refogada", lanche: "1 kiwi + 8 amêndoas", jantar: "Creme de abóbora + omelete de forno com espinafre" },
    { n: "Quinta", cafe: "Panqueca de banana com ovo (sem glúten) + café", almoco: "Salada + frango desfiado + quinoa + couve-flor assada", lanche: "1 maçã + pasta de amendoim (1 colher)", jantar: "Sopa base + lentilha temperada" },
    { n: "Sexta", cafe: "Omelete de 2 ovos com tomate + 1 fruta", almoco: "Salada + peixe grelhado + inhame + beringela assada", lanche: "1 pera + 5 castanhas de caju", jantar: "Salada de folhas + atum + ovo cozido" },
    { n: "Sábado", cafe: "Tapioca com ovo e queijo sem lactose + café", almoco: "Almoço em família: proteína + salada colorida + carbo da casa", lanche: "Frutas + castanhas", jantar: "Sopa de legumes + torradinha sem glúten" },
    { n: "Domingo", cafe: "Ovos + fruta + chá", almoco: "Refeição livre consciente (proteína + salada primeiro)", lanche: "1 fruta + castanhas", jantar: "Leve: sopa ou salada com ovos — e preparo da semana" },
  ],
  s4: [
    { n: "Segunda", cafe: "Ovos mexidos com couve + 1 fruta + café", almoco: "Salada + frango grelhado + feijão + batata doce", lanche: "1 banana + 4 castanhas de caju", jantar: "Sopa base + grão de bico temperado" },
    { n: "Terça", cafe: "Smoothie de frutas vermelhas com colágeno e chia", almoco: "Salada + peixe assado + quinoa + brócolis no alho", lanche: "1 kiwi + 8 amêndoas", jantar: "Omelete de forno com espinafre + salada" },
    { n: "Quarta", cafe: "Omelete de 2 ovos com cogumelos + chá verde", almoco: "Salada + carne magra + mandioca + repolho refogado", lanche: "1 maçã + 2 castanhas do Pará", jantar: "Creme de abobrinha + ovos cozidos" },
    { n: "Quinta", cafe: "Iogurte sem lactose + granola sem glúten + fruta", almoco: "Salada + frango + arroz de couve-flor + lentilha", lanche: "1 pera + castanhas", jantar: "Sopa base + peixe desfiado" },
    { n: "Sexta", cafe: "Ovos + abacate + café", almoco: "Salada + atum + inhame + couve-flor assada", lanche: "1 fruta + pasta de amendoim", jantar: "Salada completa com grão de bico e ovo" },
    { n: "Sábado", cafe: "Panqueca de banana + chá", almoco: "Almoço em família: proteína + salada + carbo da casa", lanche: "Frutas + castanhas", jantar: "Sopa + salada verde" },
    { n: "Domingo", cafe: "Ovos + fruta + café", almoco: "Refeição livre consciente", lanche: "1 fruta + castanhas", jantar: "Leve + preparo da semana + pesar e anotar 🌹" },
  ],
};

export const TREINO = {
  A: [
    { id: "tA-seg", dia: "Seg", diaIdx: 1, txt: "Força: pernas + glúteos (halteres)" },
    { id: "tA-ter", dia: "Ter", diaIdx: 2, txt: "Bicicleta 20–30 min + core/cintura" },
    { id: "tA-qua", dia: "Qua", diaIdx: 3, txt: "Pilates/Yoga + hipopressivos + preparo p/ parto" },
    { id: "tA-qui", dia: "Qui", diaIdx: 4, txt: "Força: pernas + glúteos (halteres)" },
    { id: "tA-sex", dia: "Sex", diaIdx: 5, txt: "Corda intervalada (ou bike) + core" },
    { id: "tA-sab", dia: "Sáb", diaIdx: 6, txt: "Yoga restaurativa + mobilidade de quadril" },
    { id: "tA-dom", dia: "Dom", diaIdx: 0, txt: "Descanso ativo: caminhada leve" },
  ],
  B: [
    { id: "tB-seg", dia: "Seg", diaIdx: 1, txt: "Força: costas, ombros e braços (halteres + elástico)" },
    { id: "tB-ter", dia: "Ter", diaIdx: 2, txt: "Caminhada zona 2 de 40 min + assoalho pélvico" },
    { id: "tB-qua", dia: "Qua", diaIdx: 3, txt: "Pilates/Yoga + hipopressivos + respiração diafragmática" },
    { id: "tB-qui", dia: "Qui", diaIdx: 4, txt: "Força: pernas completas (agachamento, avanço, ponte)" },
    { id: "tB-sex", dia: "Sex", diaIdx: 5, txt: "Bike intervalada 20 min + core anti-rotação" },
    { id: "tB-sab", dia: "Sáb", diaIdx: 6, txt: "Mobilidade de quadril e ombro + alongamento longo" },
    { id: "tB-dom", dia: "Dom", diaIdx: 0, txt: "Descanso ativo: caminhada leve ao sol" },
  ],
};

export const PREP = {
  A: [
    { id: "pA-feijao", txt: "Cozinhar o feijão da semana" },
    { id: "pA-carbo", txt: "Cozinhar o carboidrato (batata-doce / inhame / mandioca)" },
    { id: "pA-sopa", txt: "Fazer a sopa de legumes" },
    { id: "pA-frango-jen", txt: "Grelhar 500g de frango (para a Jen)" },
    { id: "pA-ovos", txt: "Cozinhar 6 ovos" },
    { id: "pA-frango-fatiado", txt: "Marido: frango grelhado fatiado (600g)" },
    { id: "pA-frango-cenoura", txt: "Marido: frango desfiado com cenoura" },
    { id: "pA-bife", txt: "Marido: bife acebolado (base do prego)" },
    { id: "pA-lombo", txt: "Marido: bifinhos de lombo de porco" },
    { id: "pA-atum", txt: "Marido: atum temperado" },
    { id: "pA-carne-moida", txt: "Marido: carne moída p/ burrito" },
    { id: "pA-maionese", txt: "Maionese de abacate" },
    { id: "pA-compras", txt: "Conferir a lista de compras da semana" },
  ],
  B: [
    { id: "pB-lentilha", txt: "Cozinhar a lentilha e o grão de bico da semana" },
    { id: "pB-carbo", txt: "Cozinhar o carboidrato (quinoa / batata-doce / inhame)" },
    { id: "pB-sopa", txt: "Fazer o creme de abóbora ou abobrinha" },
    { id: "pB-peixe", txt: "Temperar e porcionar o peixe (para a Jen)" },
    { id: "pB-ovos", txt: "Cozinhar 6 ovos + 1 omelete de forno" },
    { id: "pB-legumes", txt: "Assar a bandeja de legumes da semana" },
    { id: "pB-frango-marido", txt: "Marido: frango grelhado fatiado (600g)" },
    { id: "pB-almondega", txt: "Marido: almôndegas de carne moída" },
    { id: "pB-lombo", txt: "Marido: bifinhos de lombo de porco" },
    { id: "pB-atum", txt: "Marido: atum temperado" },
    { id: "pB-salada", txt: "Lavar e guardar as folhas em pote com papel toalha" },
    { id: "pB-molho", txt: "Molho de limão e azeite + maionese de abacate" },
    { id: "pB-compras", txt: "Conferir a lista de compras da semana" },
  ],
};

export const MARIDO = {
  A: [
    { id: "mA-seg", dia: "Seg", diaIdx: 1, txt: "Clássico de frango grelhado + fruta e castanhas" },
    { id: "mA-ter", dia: "Ter", diaIdx: 2, txt: "Prego no pão português + fruta" },
    { id: "mA-qua", dia: "Qua", diaIdx: 3, txt: "Frango desfiado com cenoura + fruta" },
    { id: "mA-qui", dia: "Qui", diaIdx: 4, txt: "Bifinhos de lombo de porco + fruta" },
    { id: "mA-sex", dia: "Sex", diaIdx: 5, txt: "Atum completo com ovo + fruta" },
    { id: "mA-sab", dia: "Sáb", diaIdx: 6, txt: "Burrito (carne ou frango c/ abacate)" },
  ],
  B: [
    { id: "mB-seg", dia: "Seg", diaIdx: 1, txt: "Frango grelhado com maionese de abacate + fruta" },
    { id: "mB-ter", dia: "Ter", diaIdx: 2, txt: "Almôndegas no pão com tomate + fruta e castanhas" },
    { id: "mB-qua", dia: "Qua", diaIdx: 3, txt: "Wrap de frango com salada + fruta" },
    { id: "mB-qui", dia: "Qui", diaIdx: 4, txt: "Lombo de porco com cenoura ralada + fruta" },
    { id: "mB-sex", dia: "Sex", diaIdx: 5, txt: "Atum com ovo e alface + fruta" },
    { id: "mB-sab", dia: "Sáb", diaIdx: 6, txt: "Burrito de carne moída com abacate" },
  ],
};

/* ---------------- RECEITAS, CHÁS, COMPRAS, HÁBITOS ---------------- */

export const RECEITAS = [
  { n: "Shot da Imunidade", i: ["35ml de água", "Gengibre: 1 colher de chá", "Cúrcuma: 1 colher de café", "Vinagre de maçã: 1 colher de sopa (pref. orgânico)", "Própolis: 15 gotas", "Pimenta caiena: 1 pitada"], m: "Tomar em jejum, depois de beber 500ml de água." },
  { n: "Suco Detox Verde", i: ["1/2 maçã", "Suco de 1 limão", "Coentro: 1 galho", "Couve: 1/2 folha", "1 colher (sobremesa) de chia", "1 colher (café) de óleo de coco", "250ml de água (gelo opcional)"], m: "Bater bem e beber imediatamente, sem coar." },
  { n: "Sopa (receita base)", i: ["1/2 repolho", "1 abobrinha", "1 chuchu ou cenoura", "1 cebola"], m: "Cozinhar tudo e bater no liquidificador ou mixer. Em outra panela, derreter 1 colher de sopa de óleo de coco ou azeite, refogar meia cebola + um tomate e acrescentar o caldo. Temperos a gosto (salsinha, cebolinha, coentro)." },
  { n: "Bariátrica Natural", i: ["250g de chia", "250g de linhaça", "250g de psyllium"], m: "Misturar tudo e tomar 1 colher de sobremesa cheia com 300ml de água." },
  { n: "Arroz de Couve-flor", i: ["3 xícaras de couve-flor triturada crua", "1/2 pimentão vermelho picado", "1/2 cebola pequena picada", "2 dentes de alho", "Sal, pimenta do reino, açafrão ou cúrcuma", "Gengibre ralado (opcional)", "Salsinha ou coentro para finalizar"], m: "Fritar alho, cebola e pimentões num fio de azeite. Adicionar a couve-flor e refogar, colocando água aos poucos. Temperar, ajustar o sal e mexer até o ponto desejado. Substitui o arroz normal!" },
  { n: "Salada de Grão de Bico", i: ["1 xícara de grão de bico cozido", "1 tomate picado", "1 pepino picado", "1/4 cebola roxa", "Salsinha, cebolinha e coentro a gosto", "Suco de 1 limão", "Orégano, sal e azeite de oliva"], m: "Misturar tudo em uma tigela e levar à geladeira até a hora de servir." },
  { n: "Brócolis com Tomates Cereja Assados", i: ["1 cabeça de brócolis", "300g de tomates cereja", "1 colher (sopa) de azeite", "Sal, pimenta do reino e orégano", "Tomilho fresco a gosto", "3-4 dentes de alho amassados"], m: "Juntar tudo numa tigela e descansar 30 min. Forno a 200°C: assar 15 min, mexer e assar mais 15 min ou até os tomates começarem a estourar. Servir quente!" },
  { n: "Couve-flor Assada", i: ["1 couve-flor grande", "2 colheres de sopa de páprica defumada", "1 colher de sopa de alho em pó", "1 colher de sopa de cebola em pó", "1 colher de chá de sal", "1 colher de sopa de azeite", "Suco de 1 limão", "Salsa ou coentro picado"], m: "Forno a 180°C. Misturar temperos, azeite e limão formando uma pasta e esfregar na couve-flor inteira. Assadeira 23x23cm, cobrir com alumínio e assar 1h. Retirar o alumínio e assar mais 20 min até dourar." },
  { n: "Beringela Assada com Pimentão", i: ["1 beringela", "1/2 pimentão", "1 tomate", "1/2 cebola", "3-4 dentes de alho", "Sal, pimenta e tomilho fresco", "Orégano e manjericão", "Azeite (1 colher de sobremesa)"], m: "Picar tudo e misturar bem. Dispor numa forma ou pirex e levar ao forno pré-aquecido a 180°C por 30-40 minutos." },
  { n: "Brócolis Grelhado na Frigideira", i: ["1 cabeça de brócolis", "Sal e pimenta preta", "1 fio de azeite", "Gergelim ou semente de abóbora"], m: "Cortar os floretes, lavar e cortar ao meio. Frigideira bem quente: colocar os brócolis e deixar cozinhar e tostar ao mesmo tempo. Temperar, regar com azeite e pingar água quando necessário. Polvilhar gergelim. Melhor al dente e bem tostado!" },
  { n: "Chuchu Salteado no Alho", i: ["2 chuchus", "Sal e pimenta preta moída", "1 colher de chá de azeite", "Alho picado", "1/2 ramo de coentro fresco"], m: "Descascar e cortar em cubos. Cozinhar em água com sal até cozidos mas firmes. Escorrer e esfriar. Aquecer azeite com alho e saltear os cubos até dourarem levemente. Polvilhar coentro e servir." },
  { n: "Omelete de Forno com Espinafre", i: ["6 ovos", "2 punhados de espinafre", "1 tomate picado", "1/2 cebola", "Sal, pimenta e orégano", "1 fio de azeite"], m: "Refogar cebola, tomate e espinafre. Bater os ovos com sal e pimenta, misturar o refogado e levar em forma untada ao forno a 180°C por 25 min. Rende 3 porções — ótima para o preparo de domingo." },
  { n: "Peixe Assado com Limão e Ervas", i: ["500g de filé de peixe branco", "Suco de 1 limão", "3 dentes de alho amassados", "Sal, pimenta, páprica e tomilho", "1 colher de sopa de azeite", "Rodelas de limão e tomate"], m: "Temperar o peixe e deixar 20 min. Dispor em assadeira com as rodelas por cima, regar com azeite e assar a 200°C por 20–25 min." },
  { n: "Maionese de Abacate", i: ["1 abacate maduro", "Suco de 1 limão", "1 dente de alho", "Sal e pimenta", "Salsinha e cebolinha", "1 colher de sopa de azeite"], m: "Bater tudo até virar creme. Guardar em pote fechado com o caroço dentro para durar mais. Vai bem no sanduíche do marido e nas saladas." },
  { n: "Creme de Abóbora", i: ["500g de abóbora em cubos", "1 cebola", "2 dentes de alho", "1 colher de chá de gengibre ralado", "Sal, pimenta e cúrcuma", "1 fio de azeite"], m: "Refogar cebola, alho e gengibre, juntar a abóbora e cobrir com água. Cozinhar até ficar macia e bater. Ajustar o sal e finalizar com azeite e sementes de abóbora." },
];

export const CHAS = [
  { n: "Chá Tira Fome (Apple Day)", d: "Em 1,5L de água, ferver 1 maçã com casca (sem sementes) + canela em pau + 1 colher de sopa de gengibre. Desligar, acrescentar 2 colheres de sopa de hibisco e deixar 10 min em infusão. Tomar ao longo do Apple Day. ⚠️ Grávidas, lactantes e quem está tentando engravidar não devem fazer o Apple Day; se usar o chá em outro dia, preparar SEM o hibisco (só maçã, canela e gengibre)." },
  { n: "Chá Diário — Hibisco com Canela", d: "Ferver 1L de água com 2 paus de canela por 5 min. Desligar, acrescentar 2 colheres (sopa) de hibisco e descansar 10 min. Pode tomar gelado. ⚠️ Hipertensas, grávidas, lactantes e quem está tentando engravidar devem evitar — o hibisco é tradicionalmente usado como emenagogo. Trocar por chá de gengibre, espinheira santa ou camomila." },
  { n: "Chás para a Noite", d: "250ml de água + 1 colher de chá do chá preferido (ou 1 sachê), 1h antes de dormir. Infusão de 10 min: erva doce, camomila, erva cidreira, valeriana. Ferver junto com a água por 5 min: mulungu e casca de laranja." },
  { n: "Chá Detox (Louro e Cravo)", d: "3 folhas de louro + 5 cravos da índia + 500ml de água. Ferver 5 min e deixar em infusão mais 5 min. Beber de manhã em jejum e ao longo do dia. Ajuda na digestão e na distensão abdominal, com leve ação diurética." },
  { n: "Chá Verde — como usar", d: "Água a 80°C (não fervendo) sobre 1 colher de chá das folhas, 3 min de infusão. Tomar até as 14h por causa da cafeína. Rico em EGCG, entra também no tema dos alimentos protetores." },
  { n: "Chá de Gengibre (troca do hibisco)", d: "Ferver 300ml de água com 3 a 4 rodelas finas de gengibre por 5 min. Desligar e descansar 5 min. Opcional: raspas de limão ou 1 pau de canela. É a troca segura do hibisco no meio da manhã para quem está tentando engravidar ou grávida — ajuda na digestão e no enjoo. Evitar exagero: até 2 xícaras por dia." },
  { n: "Água de Chia", d: "1 colher de sopa de chia em 300ml de água, descansar 15 min. Ajuda na saciedade e no intestino. Beber de manhã ou antes do almoço, sempre com bastante água ao longo do dia." },
];

export const COMPRAS = [
  { c: "Termogênicos", it: ["Canela em pó ou pau", "Cúrcuma", "Gengibre em pó ou raiz"] },
  { c: "Chás", it: ["Hibisco", "Gengibre (raiz ou em rodelas)", "Camomila", "Cavalinha", "Espinheira santa", "Chá verde", "Para o sono (escolher): erva doce, camomila, erva cidreira, valeriana, mulungu"] },
  { c: "Importantes", it: ["Vinagre de maçã", "Chia", "Linhaça", "Psyllium", "Própolis verde", "Óleo de coco", "Azeite extra virgem", "Coentro"] },
  { c: "Saladas", it: ["Alface", "Rúcula", "Agrião", "Acelga (pode escolher)", "Espinafre"] },
  { c: "Legumes, hortaliças e frutas", it: ["Limão", "Maçã", "Kiwi", "Pera", "Banana", "Abacate", "Frutas vermelhas", "Couve", "Brócolis", "Tomate", "Tomate cereja", "Couve-flor", "Chuchu", "Repolho", "Abobrinha", "Abóbora", "Cenoura", "Mandioca", "Batata doce", "Inhame", "Quinoa", "Pimentão", "Beringela", "Cogumelos", "Cebola", "Cebola roxa", "Alho", "Salsa e cebolinha"] },
  { c: "Oleaginosas", it: ["Castanha de caju", "Castanha do Pará", "Amêndoas", "Pasta de amendoim", "Gergelim", "Semente de abóbora"] },
  { c: "Proteínas", it: ["Feijão", "Lentilha", "Ovos", "Grão de bico", "Frango", "Peixe branco", "Atum", "Carne magra", "Lombo de porco", "Carne moída"] },
  { c: "Semanas 3 e 4 (casa e marmita)", it: ["Iogurte sem lactose", "Queijo sem lactose", "Pão sem glúten / pão português (marido)", "Tortilhas para burrito e wrap", "Tapioca", "Granola sem glúten", "Colágeno marinho", "Creatina"] },
];

export const HABITOS = [
  "🌅 Ao acordar: fazer xixi, pesar sem roupas e tirar uma foto do peso na balança. Logo depois, tomar 300–500ml de água.",
  "🥗 Almoço: 12:00 à 13:00 — montar o prato ou marmita bem bonito, tirar foto e enviar no grupo.",
  "🍽️ Jantar: 18:00 às 20:00 — montar o prato, tirar foto e enviar.",
  "📓 Ter um caderninho ou agenda para anotar as atividades do programa. Se não fizer na hora, anotar e fazer no final do dia.",
  "💧 Em jejum: beber 500ml de água todos os dias antes do shot.",
  "🚫 Não consumir carboidratos no jantar.",
  "✍️ Escrever: por que você NÃO vai desistir!",
  "🌞 Tomar sol nos olhos e na pele nos primeiros 30 minutos do dia (tema cortisol).",
  "🕐 Fechar a janela alimentar em 12h: jantar até 19h30, café às 7h30 (tema jejum).",
  "💪 Cumprir os treinos inegociáveis da semana (força, caminhada e assoalho pélvico).",
];

export const EMOCOES = ["😊 Bem", "😔 Triste", "😰 Ansiosa", "😤 Estressada", "😴 Cansada", "😑 Entediada", "🙏 Grata"];

export const TROCAS = ["🚶‍♀️ Caminhar 10 min", "🍵 Um chá da lista", "🙏 Orar / respirar", "💬 Mandar mensagem no grupo", "✍️ Escrever aqui no diário", "🎵 Uma música que acalma", "🚿 Um banho morno"];

/* ---------------- TEMAS ---------------- */

export const TEMAS = [
  {
    n: "🕐 Jejum intermitente com sabedoria feminina",
    blocos: [
      { t: "O que é, na prática", l: ["Janela de alimentação: no plano, 12h comendo e 12h descansando — jantar até 19h30, café da manhã às 7h30.", "Não é ficar sem comer o dia todo: é dar uma pausa digestiva à noite.", "Durante a pausa: água, chá sem açúcar e chá verde até as 14h."] },
      { t: "Por que 12h para mulheres", l: ["O corpo feminino é sensível a jejuns longos: eles sobem o cortisol e podem bagunçar o ciclo.", "12 a 14 horas já melhoram sensibilidade à insulina, digestão e sono, sem esse custo.", "Jejum de 16h ou mais só de vez em quando, e nunca em semana de muito estresse ou treino pesado."] },
      { t: "Como quebrar o jejum", l: ["Água primeiro (400–500ml).", "Shot e/ou chá.", "Primeira refeição com proteína — ovos, peixe, frango ou iogurte sem lactose. Começar com carboidrato sozinho derruba a energia no meio da manhã."] },
      { t: "Sinais de que está longo demais", l: ["Sono ruim e acordar de madrugada.", "Ciclo irregular, TPM pior, queda de cabelo.", "Irritabilidade, tontura e compulsão à noite.", "Se aparecerem: encurtar a janela e comer mais proteína no café."] },
      { t: "Quem não deve fazer", l: ["Grávidas e lactantes.", "Quem está tentando engravidar (ver o tema de preparação).", "Histórico de transtorno alimentar.", "Diabetes ou uso de medicação que baixa a glicemia — só com acompanhamento médico."] },
    ],
  },
  {
    n: "🌪️ Cortisol — o hormônio que sabota o resultado",
    blocos: [
      { t: "O ritmo certo", l: ["O cortisol deveria estar alto de manhã (para acordar) e baixo à noite (para dormir).", "Quando inverte, vem o clássico: cansaço ao acordar e agitação às 22h."] },
      { t: "Sinais de desregulação", l: ["Gordura concentrada na barriga mesmo comendo bem.", "Vontade de doce entre 15h e 17h.", "Sono leve, acordar às 3h da manhã.", "Retenção de líquido e inchaço.", "Ansiedade e pavio curto."] },
      { t: "Os 7 hábitos que baixam o cortisol", l: ["Luz do sol nos olhos nos primeiros 30 minutos do dia.", "Café só depois de comer, e nunca depois das 12h.", "Proteína no café da manhã — estabiliza a glicemia do dia inteiro.", "Força 2–3x por semana no lugar de cardio exagerado.", "Respiração 4-6 (inspira 4s, expira 6s) por 3 minutos, 2x ao dia.", "Dormir 7–9h com telas desligadas 1h antes.", "Magnésio à noite e chá calmante."] },
      { t: "Onde isso aparece no plano", l: ["Os chás da noite, o magnésio às 20h30 e o 'telas off' às 21h30 são estratégia de cortisol, não enfeite.", "Se a semana estiver muito estressante: manter a comida e o sono, e aliviar o treino — nunca o contrário."] },
    ],
  },
  {
    n: "🛡️ Alimentos protetores (anticancerígenos)",
    blocos: [
      { t: "Como ler este tema", l: ["Nenhum alimento cura ou impede câncer sozinho. O que a ciência mostra é um padrão alimentar que reduz risco — e ele já está dentro deste plano."] },
      { t: "Os campeões", l: ["Crucíferos: brócolis, couve-flor, repolho, couve, rúcula, agrião (sulforafano).", "Alho e cebola — deixe descansar 10 min depois de picar antes de aquecer.", "Cúrcuma sempre com pimenta do reino e um pouco de azeite.", "Frutas vermelhas, uva escura e romã.", "Chá verde e hibisco.", "Azeite extra virgem cru por cima da comida.", "Tomate cozido com azeite (licopeno).", "Linhaça e chia moídas na hora (lignanas — saúde da mama).", "Folhas verde-escuras, ricas em folato.", "Cogumelos e leguminosas."] },
      { t: "Truques de preparo", l: ["Brócolis e couve-flor: picar e esperar 10 minutos antes de cozinhar.", "Preferir vapor rápido ou grelhado a fervura longa.", "Evitar partes queimadas de churrasco e frituras repetidas."] },
      { t: "O que reduzir", l: ["Ultraprocessados e embutidos (presunto, salsicha, bacon).", "Excesso de açúcar e de álcool.", "Refrigerante e sucos industrializados."] },
    ],
  },
  {
    n: "🫒 Alimentos da época de Jesus",
    blocos: [
      { t: "A mesa da Galileia", l: ["Azeite de oliva e azeitonas — gordura principal da mesa.", "Pão de trigo e cevada (aqui, versão sem glúten: trigo sarraceno, grão de bico).", "Peixe do Mar da Galileia (Lc 24:42).", "Lentilha e grão de bico (Gn 25:34).", "Figo, uva, romã e tâmara.", "Amêndoas e nozes (Gn 43:11).", "Mel (Pv 24:13).", "Ervas amargas e verduras do campo (Êx 12:8).", "Coalhada e leite de cabra — aqui, versões sem lactose."] },
      { t: "As sete espécies da Terra Prometida", l: ["Trigo, cevada, uva, figo, romã, azeite e mel — Deuteronômio 8:8.", "Um cardápio inteiro cabe nessas sete: simples, sazonal, local e pouco processado."] },
      { t: "Como aplicar hoje", l: ["Comer o alimento inteiro, como ele sai da terra.", "Azeite cru no lugar de molhos prontos.", "Fruta fresca no lugar do doce industrializado.", "Refeição como comunhão: sentar, agradecer, comer devagar, sem tela.", "'Portanto, quer comais, quer bebais ou façais outra coisa qualquer, fazei tudo para a glória de Deus.' — 1 Co 10:31"] },
    ],
  },
  {
    n: "💊 Suplementos para mulheres",
    blocos: [
      { t: "Antes de tudo", l: ["Suplemento não substitui comida nem prescrição. O ideal é dosar no sangue antes: vitamina D, ferritina, B12 e TSH.", "Comece um de cada vez, para saber o que fez efeito."] },
      { t: "A base da maioria das mulheres", l: ["Vitamina D (idealmente com K2), tomada junto com gordura.", "Ômega 3 (EPA e DHA) — inflamação, humor e ciclo.", "Magnésio, de preferência glicinato ou dimalato, à noite.", "B12 — essencial para quem come pouca carne.", "Ferro só com exame de ferritina; nunca junto com café ou cálcio.", "Iodo e selênio — tireoide (2 castanhas do Pará já ajudam no selênio).", "Colágeno + vitamina C.", "Creatina 3–5g por dia: músculo, osso e também memória.", "Probióticos em fases de intestino desregulado.", "Inositol — muito usado em ciclo irregular e SOP."] },
      { t: "Fase de tentar engravidar", l: ["Metilfolato ou ácido fólico começando 3 meses antes.", "Pré-natal completo, vitamina D, ômega 3, iodo e colina.", "Sempre com orientação do médico ou nutricionista que acompanha você."] },
      { t: "Regras de ouro", l: ["Vitamina D e ômega 3: junto da refeição com gordura.", "Ferro: longe de café, chá e cálcio.", "Magnésio: à noite.", "Cafeína e pré-natal em horários diferentes.", "Marca com selo de qualidade e dose conferida com quem te acompanha."] },
    ],
  },
  {
    n: "💪 Exercícios inegociáveis para mulheres",
    blocos: [
      { t: "Os 5 pilares", l: ["Força 2–3x por semana: massa muscular, densidade óssea e sensibilidade à insulina.", "Cardio zona 2 (conversar sem ofegar): 150 min por semana, caminhada ou bike.", "Impacto leve 5 min, 3x por semana: pular corda ou saltos — osso agradece (com assoalho pélvico preparado).", "Assoalho pélvico + hipopressivos: 5 min por dia.", "Mobilidade de quadril e ombro + alongamento."] },
      { t: "Por que a força vem primeiro", l: ["A partir dos 30 anos perdemos massa muscular e óssea todos os anos.", "Músculo é onde a glicose é guardada — mais músculo, menos gordura abdominal.", "Peso do halter que faz sentido: as duas últimas repetições precisam ser difíceis."] },
      { t: "Respeitando o ciclo", l: ["Fase folicular (depois da menstruação): mais carga, mais intensidade.", "Fase lútea e menstruação: força mais leve, caminhada, yoga, mobilidade.", "Isso não é fraqueza — é treinar a favor da fisiologia."] },
      { t: "Erros comuns", l: ["Só cardio, nunca força.", "Treinar em jejum longo e sem proteína depois.", "Pular o assoalho pélvico e depois sofrer com perdas de urina.", "Não descansar: o resultado acontece no descanso, não no treino."] },
    ],
  },
  {
    n: "🤍 Preparação para engravidar",
    blocos: [
      { t: "A janela dos 90 dias", l: ["O óvulo que vai ovular daqui a 3 meses está amadurecendo agora — e o espermatozoide também leva cerca de 90 dias.", "Tudo o que se faz nesses 3 meses (comida, sono, cortisol, suplementos) entra nessa conta."] },
      { t: "Conversar com o médico sobre", l: ["Hemograma e ferritina.", "Vitamina D.", "TSH e T4 livre (tireoide).", "Glicemia e insulina.", "Sorologias e Papanicolau.", "Suspensão de medicamentos que não combinam com gestação."] },
      { t: "Nutrientes-chave", l: ["Metilfolato ou ácido fólico, começando antes da concepção.", "Vitamina D, ômega 3 (DHA), ferro, iodo e colina.", "Proteína suficiente em todas as refeições.", "Gorduras boas: azeite, abacate, castanhas, peixe."] },
      { t: "Importante sobre restrição", l: ["Nesta fase, estabilidade vale mais que emagrecer rápido.", "Apple Day, jejum prolongado e semanas muito restritivas não combinam com quem está tentando engravidar ou já está grávida — nesse período, use as semanas 3 e 4 do app.", "Ciclo irregular, TPM forte ou perda de menstruação são sinais de que o corpo pediu mais comida e menos estresse."] },
      { t: "Chás: o que trocar nesta fase", l: ["Hibisco: evitar — é tradicionalmente emenagogo. No meio da manhã, trocar por chá de gengibre, espinheira santa ou camomila.", "Chá Tira Fome do Apple Day leva hibisco: preparar sem ele (só maçã, canela e gengibre) ou pular.", "Chá verde: no máximo 1 xícara por dia e longe das refeições — em excesso atrapalha a absorção de folato, que é justamente o nutriente-chave agora.", "Seguros e bem-vindos: gengibre (ajuda no enjoo), camomila leve, espinheira santa.", "Na dúvida sobre qualquer erva, confirmar com o médico ou nutricionista que acompanha você."] },
      { t: "Além da comida", l: ["Acompanhar o ciclo: muco cervical e temperatura para achar a janela fértil.", "Sono de 7–9h e manejo do cortisol.", "Reduzir álcool, cigarro, plástico aquecido no micro-ondas.", "O parceiro também entra nos 90 dias: zinco, menos álcool, menos calor na região.", "'Herança do Senhor são os filhos.' — Sl 127:3"] },
    ],
  },
];

/* ---------------- HORÁRIOS DE AVISO (refeições e tarefas) ---------------- */
/* Base dos lembretes. hora em "HH:MM" (24h). tipo: refeicao | tarefa */
export const AVISOS_PADRAO = [
  { id: "av-agua", hora: "07:00", tipo: "tarefa", emoji: "💧", titulo: "Água em jejum", corpo: "Beba 400–500ml de água antes do shot. Bom dia, Maravilhosa!" },
  { id: "av-cafe", hora: "07:30", tipo: "refeicao", emoji: "☕", titulo: "Café da manhã", corpo: "Hora do café com proteína — e não esqueça o pré-natal ★" },
  { id: "av-lanche-manha", hora: "10:00", tipo: "refeicao", emoji: "🍏", titulo: "Lanche da manhã", corpo: "Um chá e, se for dia disso, o lanche da manhã." },
  { id: "av-almoco", hora: "12:00", tipo: "refeicao", emoji: "🥗", titulo: "Almoço", corpo: "Monte o prato bonito, tire foto e mande no grupo 💛" },
  { id: "av-lanche", hora: "16:00", tipo: "refeicao", emoji: "🥜", titulo: "Lanche da tarde", corpo: "1 fruta + castanhas. Nas semanas 3 e 4, creatina com água." },
  { id: "av-jantar", hora: "19:00", tipo: "refeicao", emoji: "🍽️", titulo: "Jantar", corpo: "Jantar até 19h30 para fechar a janela de 12h. Sem carbo à noite." },
  { id: "av-cha", hora: "20:30", tipo: "tarefa", emoji: "🍵", titulo: "Chá da noite + magnésio", corpo: "Chá calmante e magnésio ★ — preparando o corpo para dormir." },
  { id: "av-telas", hora: "21:30", tipo: "tarefa", emoji: "🌙", titulo: "Desligar as telas", corpo: "Modo noturno. Sono de qualidade também emagrece 💤" },
  // Lembretes de emoções ao longo do dia
  { id: "av-emocao-manha", hora: "10:30", tipo: "emocao", emoji: "💗", titulo: "Como está seu coração?", corpo: "Pare 1 minuto: que emoção você sente agora? Nomeie e entregue a Deus. 'Lança sobre Ele a tua ansiedade' (1Pe 5:7)." },
  { id: "av-emocao-tarde", hora: "15:30", tipo: "emocao", emoji: "🫶", titulo: "Check-in das emoções", corpo: "Ansiosa, cansada ou estressada? Escolha uma troca saudável (chá, caminhar, orar) e anote no diário." },
  { id: "av-gratidao-noite", hora: "21:00", tipo: "emocao", emoji: "🙏", titulo: "Momento de gratidão", corpo: "Antes de dormir, escreva 3 coisas boas de hoje. A gratidão acalma o coração." },
];
