// Variáveis do Estado do Jogo
let fase = "MENU"; // MENU, JOGO, VITORIA, DERROTA_ECO, DERROTA_FIN
let rodada = 1;

// Variáveis de Status (Fatores do Agrinho)
let dinheiro = 1000;
let meioAmbiente = 100;
let produtividade = 100;

// Textos das Perguntas e Consequências
let perguntas = [
  {
    texto: "Rodada 1: Controle de pragas na lavoura. O que fazer?",
    optA: "A) Usar agrotóxico comum (R$-100, Produtividade +20%, Meio Amb. -30%)",
    optB: "B) Usar controle biológico natural (R$-200, Produtividade +10%, Meio Amb. +15%)"
  },
  {
    texto: "Rodada 2: Proteção das margens do rio (Área de Preservação).",
    optA: "A) Desmatar para plantar mais grãos (R$+400, Meio Amb. -40%)",
    optB: "B) Reflorestar a mata ciliar (R$-150, Meio Amb. +30%)"
  },
  {
    texto: "Rodada 3: Qual fonte de energia instalar na fazenda?",
    optA: "A) Gerador a diesel comum (R$-50, Meio Amb. -15%)",
    optB: "B) Placas de energia solar (R$-500, Meio Amb. +25%)"
  }
];

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
}

function draw() {
  if (fase === "MENU") {
    desenharMenu();
  } else if (fase === "JOGO") {
    desenharJogo();
  } else {
    desenharFimJogo();
  }
}

function desenharMenu() {
  background(34, 139, 34); // Verde Floresta
  fill(255);
  textSize(28);
  text("EcoAgro Sim", width / 2, 100);
  textSize(16);
  text("Equilibre a produção (Agro Forte) com o Meio Ambiente.", width / 2, 160);
  text("Chegue à Rodada 4 com saldo positivo e ecologia acima de 40%.", width / 2, 190);
  
  // Botão Iniciar
  fill(255, 215, 0); // Dourado
  rect(225, 260, 150, 40, 10);
  fill(0);
  text("Pressione ENTER", width / 2, 280);
}

function desenharJogo() {
  background(220, 245, 220); // Verde claro de fundo
  
  // Painel de Status
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text(`Rodada: ${rodada} / 3`, 20, 30);
  text(`Dinheiro: R$ ${dinheiro}`, 20, 60);
  text(`Meio Ambiente: ${meioAmbiente}%`, 20, 90);
  text(`Produtividade Solo: ${produtividade}%`, 20, 120);
  
  // Caixa da Pergunta
  textAlign(CENTER);
  fill(255);
  stroke(0);
  rect(30, 160, 540, 80, 5);
  
  fill(0);
  noStroke();
  textSize(14);
  text(perguntas[rodada - 1].texto, width / 2, 200);
  
  // Opções de Teclado
  textSize(12);
  textAlign(LEFT);
  text("Pressione [ A ] para a primeira opção", 40, 280);
  text("Pressione [ B ] para a segunda opção", 40, 310);
}

function desenharFimJogo() {
  if (fase === "VITORIA") {
    background(0, 128, 0);
    fill(255);
    textSize(24);
    text("Vitória Sustentável! 🎉", width / 2, 150);
    textSize(14);
    text("Sua fazenda deu lucro preservando a natureza. Parabéns!", width / 2, 200);
  } else if (fase === "DERROTA_ECO") {
    background(139, 69, 19); // Marrom terra seca
    fill(255);
    textSize(24);
    text("Falta de Sustentabilidade! ❌", width / 2, 150);
    textSize(14);
    text("O meio ambiente colapsou e a terra ficou infértil.", width / 2, 200);
  } else if (fase === "DERROTA_FIN") {
    background(178, 34, 34); // Vermelho
    fill(255);
    textSize(24);
    text("Falência Financeira! ❌", width / 2, 150);
    textSize(14);
    text("Seu caixa ficou zerado. O Agro precisa ser forte economicamente.", width / 2, 200);
  }
  
  fill(255);
  textSize(12);
  text("Pressione ESC para voltar ao menu", width / 2, 320);
}

function keyPressed() {
  if (fase === "MENU" && keyCode === ENTER) {
    // Reinicia os valores ao começar
    dinheiro = 1000;
    meioAmbiente = 100;
    produtividade = 100;
    rodada = 1;
    fase = "JOGO";
  }
  
  else if (fase === "JOGO") {
    if (key === 'a' || key === 'A') {
      processarDecisao('A');
    } else if (key === 'b' || key === 'B') {
      processarDecisao('B');
    }
  }
  
  else if (keyCode === ESCAPE) {
    fase = "MENU";
  }
}

function processarDecisao(opcao) {
  if (rodada === 1) {
    if (opcao === 'A') {
      dinheiro -= 100;
      produtividade += 20;
      meioAmbiente -= 30;
    } else {
      dinheiro -= 200;
      produtividade += 10;
      meioAmbiente += 15;
    }
  } else if (rodada === 2) {
    if (opcao === 'A') {
      dinheiro += 400;
      meioAmbiente -= 40;
    } else {
      dinheiro -= 150;
      meioAmbiente += 30;
    }
  } else if (rodada === 3) {
    if (opcao === 'A') {
      dinheiro -= 50;
      meioAmbiente -= 15;
    } else {
      dinheiro -= 500;
      meioAmbiente += 25;
    }
  }
  
  // Limitar o teto do Meio Ambiente em 100%
  if (meioAmbiente > 100) meioAmbiente = 100;

  // Verificar regras de derrota imediatas
  if (meioAmbiente < 40) {
    fase = "DERROTA_ECO";
    return;
  }
  if (dinheiro < 0) {
    fase = "DERROTA_FIN";
    return;
  }
  
  // Passar de rodada ou vencer
  if (rodada < 3) {
    rodada++;
  } else {
    fase = "VITORIA";
  }
}
