/**

Copyright (c) 2012 Clint Bellanger

MIT License:

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


Sounds by Brandon Morris (CC-BY 3.0)
Art by Clint Bellanger (CC-BY 3.0)

*/


// FPS (frames per second) define a velocidade de atualização do jogo
var FPS = 60;
setInterval(function() {
  logic(); // Função que processa a lógica do jogo
  render(); // Função que renderiza o gráfico do jogo
}, 1000/FPS);

// html elements
var can;    // canvas (onde o jogo será desenhado)
var ctx;      // context (o contexto para desenhar no canvas)
var log_p;   // log paragraph (parágrafo de log)
var cred_p;  // credits paragraph (parágrafo de créditos)

// Variáveis de controle para carregamento das imagens
var symbols_loaded = false;
var reels_bg_loaded = false;

// Carregando imagens e sons
var symbols = new Image();
var reels_bg = new Image();
var snd_reel_stop = new Array();
var snd_win;

// Carregando fontes e imagens
symbols.src = "images/reddit_icons_small.png"; // Imagem dos símbolos dos rolos
reels_bg.src = "images/reels_bg.png";           // Imagem de fundo dos rolos

// Sons do jogo
snd_win = new Audio("sounds/win.wav"); // Som de vitória
snd_reel_stop[0] = new Audio("sounds/reel_stop.wav");
snd_reel_stop[1] = new Audio("sounds/reel_stop.wav");
snd_reel_stop[2] = new Audio("sounds/reel_stop.wav");

// Estados do jogo
var STATE_REST = 0; // Jogo em repouso
var STATE_SPINUP = 1; // Reels acelerando
var STATE_SPINDOWN = 2; // Reels desacelerando
var STATE_REWARD = 3; // Jogo no estado de recompensa (ganho)

// Configurações do jogo
var reel_count = 3; // Quantidade de rolos
var reel_positions = 32; // Quantidade de posições no rolo
var symbol_size = 32; // Tamanho dos símbolos
var symbol_count = 11; // Quantidade de símbolos
var reel_pixel_length = reel_positions * symbol_size; // Comprimento do rolo em pixels
var row_count = 3; // Quantidade de linhas
var stopping_distance = 528; // Distância de parada dos rolos
var max_reel_speed = 32; // Velocidade máxima dos rolos
var spinup_acceleration = 2; // Aceleração do spinup
var spindown_acceleration = 1; // Aceleração do spindown
var starting_credits = 500; // Créditos iniciais
var reward_delay = 3; // Quantidade de frames entre cada "tick" de recompensa
var reward_delay_grand = 1; // Delay para prêmios grandes
var reward_grand_threshhold = 25; // Limite para recompensas grandes

// Payouts para as combinações de símbolos
var match_payout = new Array(symbol_count);
match_payout[7] = 4; // 3Down
match_payout[6] = 6; // 2Down
match_payout[5] = 8; // 1Down
match_payout[1] = 10; // 1Up
match_payout[2] = 15; // 2Up
match_payout[3] = 20; // 3Up
match_payout[4] = 25; // OrangeRed
match_payout[0] = 50; // AlienHead
match_payout[9] = 75; // Bacon
match_payout[10] = 100; // Narwhal
match_payout[8] = 250; // CakeDay

// Definindo a quantidade de recompensas para combinações de símbolos especiais
var payout_ups = 6; // Qualquer 3 Ups
var payout_downs = 2; // Qualquer 3 Downs

// Definições de área dos rolos
var reel_area_left = 32;
var reel_area_top = 32;
var reel_area_width = 96;
var reel_area_height = 96;

// Inicializando os rolos
var reels = new Array(reel_count);
reels[0] = new Array(2,1,7,1,2,7,6,7,3,10,1,6,1,7,3,4,3,2,4,5,0,6,10,5,6,5,8,3,0,9,5,4);
reels[1] = new Array(6,0,10,3,6,7,9,2,5,2,3,1,5,2,1,10,4,5,8,4,7,6,0,1,7,6,3,1,5,9,7,4);
reels[2] = new Array(1,4,2,7,5,6,4,10,7,5,2,0,6,4,10,1,7,6,3,0,5,7,2,3,9,3,5,6,1,8,1,3);

// Inicializando as posições dos rolos aleatoriamente
var reel_position = new Array(reel_count);
for (var i=0; i<reel_count; i++) {
  reel_position[i] = Math.floor(Math.random() * reel_positions) * symbol_size;
}

var stopping_position = new Array(reel_count);
var start_slowing = new Array(reel_count);

// Inicializando a velocidade dos rolos
var reel_speed = new Array(reel_count);
for (var i=0; i<reel_count; i++) {
  reel_speed[i] = 0;
}

var result = new Array(reel_count);
for (var i=0; i<reel_count; i++) {
  result[i] = new Array(row_count);
}

var game_state = STATE_REST;  // Estado inicial do jogo (repouso)
var credits = starting_credits;  // Créditos iniciais
var payout = 0;                   // Valor de recompensa
var reward_delay_counter = 0;  // Contador de delay para a recompensa
var playing_lines;              // Linhas jogadas no momento

//---- Funções de Renderização ---------------------------------------------

// Função que desenha o símbolo de acordo com o índice e as coordenadas
function draw_symbol(symbol_index, x, y) {
  var symbol_pixel = symbol_index * symbol_size;
  ctx.drawImage(symbols, 0,symbol_pixel,symbol_size,symbol_size, x+reel_area_left,y+reel_area_top,symbol_size,symbol_size);
}

function render_reel() {      // Função que renderiza o rolo (toda a parte gráfica dos rolos)

  ctx.drawImage(reels_bg, reel_area_left, reel_area_top);  // Limpa o rolo

   // Define a área de corte (para não desenhar fora do canvas)
  ctx.beginPath();
  ctx.rect(reel_area_left, reel_area_top, reel_area_width, reel_area_height);
  ctx.clip();

  var reel_index;
  var symbol_offset;
  var symbol_index;
  var x;
  var y;

  // Desenha os símbolos de cada rolo
  for (var i=0; i<reel_count; i++) {
    for (var j=0; j<row_count +1; j++) {

      reel_index = Math.floor(reel_position[i] / symbol_size) + j;
      symbol_offset = reel_position[i] % symbol_size;
 
       // Rolos podem dar a volta (wrapping)
      if (reel_index >= reel_positions) reel_index -= reel_positions;

      // Busca o índice do símbolo
      symbol_index = reels[i][reel_index];

      // Calcula a posição para desenhar o símbolo
      x = i * symbol_size;
      y = j * symbol_size - symbol_offset;

       // Desenha o símbolo na tela
      draw_symbol(symbol_index, x, y);

    }
  }
}

// Função que destaca a linha premiada
function highlight_line(line_num) {

  ctx.strokeStyle = "red";  // Define a cor da borda como laranja
  var ss = symbol_size;  // Obtém o tamanho do símbolo (tamanho de cada "bloco")

  // Desenhando os retângulos para destacar a linha
// Linha superior (top row)
  if (line_num == 2 || line_num == 4) {
    ctx.strokeRect(reel_area_left, reel_area_top, symbol_size-1, symbol_size-1); // top left
  }
  if (line_num == 2) {
    ctx.strokeRect(reel_area_left + ss, reel_area_top, ss-1, ss-1); // top middle
  }
  if (line_num == 2 || line_num == 5) {
    ctx.strokeRect(reel_area_left + ss + ss, reel_area_top, ss-1, ss-1); // top right
  }

  // Linha do meio (middle row
  if (line_num == 1) {
    ctx.strokeRect(reel_area_left, reel_area_top + ss, ss-1, ss-1); // top left
  }
  if (line_num == 1 || line_num == 4 || line_num == 5) {
    ctx.strokeRect(reel_area_left + ss, reel_area_top + ss, ss-1, ss-1); // top middle
  }
  if (line_num == 1) {
    ctx.strokeRect(reel_area_left + ss + ss, reel_area_top + ss, ss-1, ss-1); // top right
  }

  // Linha inferior (bottom row)
  if (line_num == 3 || line_num == 5) {
    ctx.strokeRect(reel_area_left, reel_area_top + ss + ss, ss-1, ss-1); // top left
  }
  if (line_num == 3) {
    ctx.strokeRect(reel_area_left + ss, reel_area_top + ss + ss, ss-1, ss-1); // top middle
  }
  if (line_num == 3 || line_num == 4) {
    ctx.strokeRect(reel_area_left + ss + ss, reel_area_top + ss + ss, ss-1, ss-1); // top right
  }

}

// Renderiza toda a arte necessária no quadro atual
function render() {

   // Se o estado do jogo for SPINUP ou SPINDOWN, desenha os rolos
  if (game_state == STATE_SPINUP || game_state == STATE_SPINDOWN) {
    render_reel();
  }

}

//---- Funções de Lógica ---------------------------------------------

// Define as posições de parada aleatórias para os rolos
function set_stops() {
  for (var i=0; i<reel_count; i++) {

    start_slowing[i] = false;

    // Posição de parada aleatória para cada rolo
    stop_index = Math.floor(Math.random() * reel_positions);
    stopping_position[i] = stop_index * symbol_size;

    // Ajusta a posição de parada e aplica o deslocamento
    stopping_position[i] += stopping_distance;
    if (stopping_position[i] >= reel_pixel_length) stopping_position[i] -= reel_pixel_length;

     // Armazena as posições vencedoras
    for (var j=0; j<row_count; j++) {
      result[i][j] = stop_index + j;
      if (result[i][j] >= reel_positions) result[i][j] -= reel_positions;

      // Converte as posições dos rolos em símbolos
      result[i][j] = reels[i][result[i][j]];
    }
  }
}

// Move um rolo com base na velocidade
function move_reel(i) {
  reel_position[i] -= reel_speed[i];

  // Se o rolo ultrapassar o limite, reinicia sua posição
  if (reel_position[i] < 0) {
    reel_position[i] += reel_pixel_length;
  }
}

// Lógica para acelerar os rolos até a velocidade máxima
function logic_spinup() {

  for (var i=0; i<reel_count; i++) {

    // Move o rolo na velocidade atual
    move_reel(i);

    // Acelera a velocidade do rolo
    reel_speed[i] += spinup_acceleration;

  }

  // Se os rolos atingiram a velocidade máxima, inicia a desaceleração
  if (reel_speed[0] == max_reel_speed) {

    // calcule os resultados finais agora, para que o spindown esteja pronto
    set_stops();

    game_state = STATE_SPINDOWN;
  }
}

// Lógica para desacelerar os rolos à medida que eles param
function logic_spindown() {

  // Se os rolos pararam, começa a calcular a recompensa
  if (reel_speed[reel_count-1] == 0) {

    calc_reward();
    game_state = STATE_REWARD;
  }

  for (var i=0; i<reel_count; i++) {

    // Move o rolo na velocidade atual
    move_reel(i);

    // Se deve começar a desacelerar este rolo?
    if (start_slowing[i] == false) {

      // Se o rolo anterior já começou a desacelerar, começa a desacelerar o rolo atual
      var check_position = false;
      if (i == 0) check_position = true;
      else if (start_slowing[i-1]) check_position = true;

      if (check_position) {
      
        if (reel_position[i] == stopping_position[i]) {
          start_slowing[i] = true;          
        }
      }
    }
    else {
      if (reel_speed[i] > 0) {
        reel_speed[i] -= spindown_acceleration;

        // Toca o som quando o rolo parar
        if (reel_speed[i] == 0) {
          try {
            snd_reel_stop[i].currentTime = 0;
            snd_reel_stop[i].play();
          } catch(err) {};
        }

      }
    }
  }

}

// Lógica para contar os créditos da recompensa e tocar sons
function logic_reward() {

  // Se não houver pagamento, retorna para o estado REST
  if (payout == 0) {
    game_state = STATE_REST;
    return;
  }

  // Evita que o pagamento seja atualizado rapidamente
  if (reward_delay_counter > 0) {
    reward_delay_counter--;
    return;
  }

  payout--; // Diminui o valor da recompensa
  credits++; // Incrementa os créditos
  cred_p.innerHTML = credits; // Atualiza saldo a exibição dos créditos
  
   // Acelera as grandes recompensas
  if (payout < reward_grand_threshhold) {
    reward_delay_counter = reward_delay;
  }
  else { // speed up big rewards
    reward_delay_counter += reward_delay_grand;
  }

}

// Função lógica principal que executa diferentes etapas do jogo
function logic() {

  // REST to SPINUP happens on an input event

  if (game_state == STATE_SPINUP) {
    logic_spinup(); // Acelera os rolos
  }
  else if (game_state == STATE_SPINDOWN) {
    logic_spindown(); // Desacelera os rolos
  }
  else if (game_state == STATE_REWARD) {
    logic_reward(); // Calcula a recompensa
  }
  
}

// Função que calcula o pagamento baseado na linha de símbolos
function calc_line(s1, s2, s3) {

    // Se houver uma correspondência perfeita
  if (s1 == s2 && s2 == s3) {
    return match_payout[s1];
  }

  // Casos especiais, como as combinações de ups e downs
  // Aqui você pode definir lógicas extras, como as tripletas e wildcards.
  if ((s1 == 1 || s1 == 2 || s1 == 3) &&
      (s2 == 1 || s2 == 2 || s2 == 3) &&
      (s3 == 1 || s3 == 2 || s3 == 3)) {
    return payout_ups;
  }

  // Recompensas em outras combinações
  if ((s1 == 5 || s1 == 6 || s1 == 7) &&
      (s2 == 5 || s2 == 6 || s2 == 7) &&
      (s3 == 5 || s3 == 6 || s3 == 7)) {
    return payout_downs;
  }

  // Verifica o "wild" que pode ser combinado com qualquer coisa
  if (s1 == 9) {
    if (s2 == s3) return match_payout[s2];

    // wildcard trip ups
    if ((s2 == 1 || s2 == 2 || s2 == 3) &&
        (s3 == 1 || s3 == 2 || s3 == 3)) return payout_ups;

    // wildcard trip downs
    if ((s2 == 5 || s2 == 6 || s2 == 7) &&
        (s3 == 5 || s3 == 6 || s3 == 7)) return payout_downs;
  
  }
  if (s2 == 9) {
    if (s1 == s3) return match_payout[s1];

    // wildcard trip ups
    if ((s1 == 1 || s1 == 2 || s1 == 3) &&
        (s3 == 1 || s3 == 2 || s3 == 3)) return payout_ups;

    // wildcard trip downs
    if ((s1 == 5 || s1 == 6 || s1 == 7) &&
        (s3 == 5 || s3 == 6 || s3 == 7)) return payout_downs;

  }
  if (s3 == 9) {
    if (s1 == s2) return match_payout[s1];

    // wildcard trip ups
    if ((s1 == 1 || s1 == 2 || s1 == 3) &&
        (s2 == 1 || s2 == 2 || s2 == 3)) return payout_ups;

    // wildcard trip downs
    if ((s1 == 5 || s1 == 6 || s1 == 7) &&
        (s2 == 5 || s2 == 6 || s2 == 7)) return payout_downs;
  }

  // check double-wild
  if (s2 == 9 && s3 == 9) return match_payout[s1];
  if (s1 == 9 && s3 == 9) return match_payout[s2];
  if (s1 == 9 && s2 == 9) return match_payout[s3];

  // no reward
  return 0;
}

// Função que calcula o total da recompensa
function calc_reward() {
  payout = 0; // Reinicia o pagamento
  
  var partial_payout;

  // Calcula as recompensas para cada linha
  // Cada linha é verificada com base na configuração de símbolos (resultados dos rolos)
  partial_payout = calc_line(result[0][1], result[1][1], result[2][1]);
  if (partial_payout > 0) {
    log_p.innerHTML += "Line 1 pays " + partial_payout + "<br />\n"; // Exibe no log a recompensa da linha 1
    payout += partial_payout;
    highlight_line(1);
  }
  else (
    log_p.innerHTML = 'R$0,00' // se nao tiver ganho na linha 1 resultado R$0,00 eu que fiz esse
  );

   // Se houver mais de uma linha ativa para jogar (playing_lines > 1), calcula as linhas adicionais
  if (playing_lines > 1) {

    // Linha 2: Verifica a recompensa da segunda linha (coluna esquerda)
    partial_payout = calc_line(result[0][0], result[1][0], result[2][0]);
    if (partial_payout > 0) {
      log_p.innerHTML += "Line 2 pays " + partial_payout + "<br />\n";  // Exibe no log a recompensa da linha 2
      payout += partial_payout;
      highlight_line(2);
    }

    // Linha 3: Verifica a recompensa da terceira linha (coluna direita)
    partial_payout = calc_line(result[0][2], result[1][2], result[2][2]);
    if (partial_payout > 0) {
      log_p.innerHTML += "Line 3 pays " + partial_payout + "<br />\n"; // Exibe no log a recompensa da linha 3
      payout += partial_payout;
      highlight_line(3);
    }
  }

  // Se houver mais de 3 linhas ativas para jogar (playing_lines > 3), calcula as linhas diagonais
  if (playing_lines > 3) {

     // Linha 4: Verifica a recompensa da linha diagonal (da esquerda superior à direita inferior)
    partial_payout = calc_line(result[0][0], result[1][1], result[2][2]);
    if (partial_payout > 0) {
      log_p.innerHTML += "Line 4 pays " + partial_payout + "<br />\n"; // Exibe no log a recompensa da linha 4
      payout += partial_payout;
      highlight_line(4);
    }

    // Line 5
    partial_payout = calc_line(result[0][2], result[1][1], result[2][0]);
    if (partial_payout > 0) {
      log_p.innerHTML += "Line 5 pays " + partial_payout + "<br />\n"; // Exibe no log a recompensa da linha 5
      payout += partial_payout;
      highlight_line(5);
    }
  }

  // Se houver algum pagamento (payout > 0), toca o som de vitória
  if (payout > 0) {
    try {
      snd_win.currentTime = 0; // Reinicia o som de vitória
      snd_win.play(); // Toca o som de vitória
    }
    catch(err) {}; // Em caso de erro ao tentar tocar o som (ex: não há som disponível), ignora
  }

}

//---- Input Functions ---------------------------------------------

// Função que lida com a tecla pressionada (no caso, a barra de espaço)
function handleKey(evt) {
  if (evt.keyCode == 32) { // Se a tecla pressionada for a barra de espaço (código 32)
    if (game_state != STATE_REST) return; // Se o estado do jogo não for "repouso", não faz nada

    // Se o jogador tiver créditos suficientes, faz a rotação com a quantidade de linhas escolhidas
    if (credits >= 5) spin(5); // Se tiver pelo menos 5 créditos, aposta em 5 linhas
    else if (credits >= 3) spin(3);
    else if (credits >= 1) spin(1);

  }
}

// Função para rodar os rolos com a quantidade de linhas escolhidas
function spin(line_choice) {
  
  if (game_state != STATE_REST) return; // Se o estado do jogo não for "repouso", não faz nada
  if (credits < line_choice) return; // Se o jogador não tiver créditos suficientes, não faz nada

  credits -= line_choice;  // Deduz os créditos da aposta
  playing_lines = line_choice; // Define o número de linhas ativas para a rotação

  cred_p.innerHTML =  credits; // Atualiza saldo a exibição dos créditos
  log_p.innerHTML = ""; // Limpa o log de mensagens

  game_state = STATE_SPINUP; // Define o estado do jogo como "spinup", que indica que os rolos estão girando

}

//---- Init Functions -----------------------------------------------

// Função de inicialização que configura o canvas, contexto, e os elementos necessários
function init() {
  can = document.getElementById("slots"); // Obtém o elemento canvas onde os rolos serão desenhados
  ctx = can.getContext("2d"); // Obtém o contexto de desenho 2D do canvas
  log_p = document.getElementById("resultado"); // Obtém o elemento de log para mensagens
  cred_p = document.getElementById("credits"); // Obtém o elemento de créditos

  cred_p.innerHTML =  credits;// Exibe os saldo créditos iniciais

  window.addEventListener('keydown', handleKey, true); // Adiciona um ouvinte de eventos para a tecla pressionada

  // Função para carregar as imagens dos símbolos
  symbols.onload = function() {
    symbols_loaded = true; // Marca que os símbolos foram carregados
    if (symbols_loaded && reels_bg_loaded) render_reel(); // Se as imagens dos símbolos e fundo estiverem carregadas, desenha os rolos
  };

  // Função para carregar o fundo dos rolos
  reels_bg.onload = function() {
    reels_bg_loaded = true; // Marca que o fundo dos rolos foi carregado
    if (symbols_loaded && reels_bg_loaded) render_reel(); // Se as imagens dos símbolos e fundo estiverem carregadas, desenha os rolos
  };

}


