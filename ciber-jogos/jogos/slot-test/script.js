// Array contendo apenas 7 ícones que serão usados nas slots
const ICONS = [
    'ball',  'diamante-azul', 'diamante-vermelho', 'sapatos', 'malabares', 'violao', 'palhaco', 'bonus',
];

/**
 * @type {number} A duração mínima do giro em segundos
 */
const BASE_SPINNING_DURATION = 0.50;

/**
 * @type {number} A duração adicional para cada coluna (em segundos).
 * Isso cria o efeito típico de que a primeira coluna termina, depois a segunda, e assim por diante.
 */
const COLUMN_SPINNING_DURATION = 0.50;

var cols; // Variável para armazenar as colunas (elementos da interface)

/**
 * Evento disparado quando o conteúdo da página é carregado.
 * Inicializa as colunas e configura os itens iniciais nas slots.
 */
window.addEventListener('DOMContentLoaded', function(event) {
    cols = document.querySelectorAll('.col'); // Seleciona todas as colunas na interface

    setInitialItems(); // Define os itens iniciais nas colunas
});

/**
 * Função que configura os itens iniciais nas colunas.
 * Preenche cada coluna com um número variável de itens, começando com ícones aleatórios.
 */
function setInitialItems() {
    let baseItemAmount = 40; // Número inicial de itens para cada coluna

    // Itera sobre todas as colunas e preenche com os itens
    for (let i = 0; i < cols.length; ++i) {
        let col = cols[i];
        let amountOfItems = baseItemAmount + (i * 3); // Incrementa a quantidade de itens para cada coluna
        let elms = ''; // Variável para armazenar os itens HTML
        let firstThreeElms = ''; // Variável para armazenar os primeiros 3 itens de backup

        // Preenche a coluna com os itens
        for (let x = 0; x < amountOfItems; x++) {
            let icon = getRandomIcon(); // Obtém um ícone aleatório
            let item = '<div class="icon" data-item="' + icon + '"><img src="imagens/simbolos/' + icon + '.png"></div>';
            elms += item; // Adiciona o item ao HTML da coluna

            if (x < 3) firstThreeElms += item; // Faz backup dos 3 primeiros itens (serão usados no final)
        }
        col.innerHTML = elms + firstThreeElms; // Coloca os itens na coluna, incluindo o backup
    }
}

/**
 * Função chamada quando o botão de giro (spin) é pressionado.
 * Inicia o giro das colunas e define as animações.
 *
 * @param elem O botão que foi pressionado
 */
function spin(elem) {
    // Duração total do giro, combinando a duração base com um valor aleatório adicional
    let duration = BASE_SPINNING_DURATION + randomDuration();

    // Aplica a duração de animação a cada coluna
    for (let col of cols) {
        duration += COLUMN_SPINNING_DURATION + randomDuration(); // Adiciona a duração extra para cada coluna
        col.style.animationDuration = duration + "s"; // Define a duração da animação para cada coluna
    }

    // Desativa o botão enquanto o giro estiver em andamento
    elem.setAttribute('disabled', true);

    // Adiciona a classe de spinning ao container, iniciando a animação CSS
    document.getElementById('container').classList.add('spinning');

    // Define o resultado das slots após meio do tempo de duração base
    window.setTimeout(setResult, BASE_SPINNING_DURATION * 1000 / 2);

    // Após o giro, remove a classe de spinning e habilita o botão novamente
    window.setTimeout(function () {
        document.getElementById('container').classList.remove('spinning');
        elem.removeAttribute('disabled');
    }.bind(elem), duration * 1000);
}

/**
 * Função que define os itens exibidos no resultado (início e final) de cada coluna.
 * Substitui os ícones no topo e no final da coluna com novos ícones aleatórios.
 */
function setResult() {
    for (let col of cols) {

        // Gera 3 ícones aleatórios para o resultado
        let results = [
            getRandomIcon(),
            getRandomIcon(),
            getRandomIcon()
        ];

        let icons = col.querySelectorAll('.icon img'); // Seleciona todas as imagens de ícones da coluna
        // Substitui os primeiros e últimos três ícones da coluna pelos ícones gerados
        for (let x = 0; x < 3; x++) {
            icons[x].setAttribute('src', 'imagens/simbolos/' + results[x] + '.png');
            icons[(icons.length - 3) + x].setAttribute('src', 'imagens/simbolos/' + results[x] + '.png');
        }
    }
}

/**
 * Função que retorna um ícone aleatório do array ICONS.
 * @returns {string} Um ícone aleatório.
 */
function getRandomIcon() {
    return ICONS[Math.floor(Math.random() * ICONS.length)];
}

/**
 * Função que gera um número aleatório para a duração adicional do giro.
 * @returns {number} Valor aleatório entre 0.00 e 0.09 (inclusive).
 */
function randomDuration() {
    return Math.floor(Math.random() * 10) / 100;
}




// Valores fixos de aposta
const betValues = [.40, .80, 1.20, 2.00, 4.00, 8.00, 15.00, 25.00, 50.00, 100.00, 200.00, 400.00];

// Índice inicial no array de valores
let currentIndex = 0;

// controles
const currentBetElement = document.getElementById("current-bet");
const decreaseBetButton = document.getElementById("decrease-bet");
const increaseBetButton = document.getElementById("increase-bet");

// Atualiza o valor exibido na interface
function updateBetDisplay() {
  currentBetElement.textContent = betValues[currentIndex].toFixed(2);
}

// Adiciona eventos aos botões
decreaseBetButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateBetDisplay();
  }
});

increaseBetButton.addEventListener("click", () => {
  if (currentIndex < betValues.length - 1) {
    currentIndex++;
    updateBetDisplay();
  }
});

// Inicializa o valor exibido
updateBetDisplay();
