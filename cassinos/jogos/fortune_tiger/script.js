
// som do jogo
const audio = document.getElementById('audio');
const playButtons = document.querySelectorAll('.playButton');
const muteButton = document.querySelector('.muteButton');

playButtons.forEach(button => {
    button.addEventListener('click', () => {
        audio.play();
    });
});

// Função para alternar o estado de mudo do áudio
muteButton.addEventListener('click', () => {
    if (audio.muted) {
        audio.muted = false;
        muteButton.innerHTML = '<i class="fas fa-volume-up"></i>'; // Ícone de som
    } else {
        audio.muted = true;
        muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Ícone de mudo
    }
});

// Lista de símbolos
const simbolos = [
    "imagens/Symbols/fortune-dragon_h1_coins.png",
    "imagens/Symbols/fortune-dragon_h2_ribbon.png",
    "imagens/Symbols/fortune-dragon_h3_firecracker.png",
    "imagens/Symbols/fortune-dragon_h4_lantern.png",
    "imagens/Symbols/fortune-dragon_h5_angbao.png",
    "imagens/Symbols/fortune-dragon_h6_ingot.png",
    "imagens/Symbols/fortune-dragon_s_wild.png"
];

// Função para gerar um símbolo aleatório
function getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * simbolos.length);
    return simbolos[randomIndex];
}

// Função para gerar uma quantidade definida de símbolos aleatórios
function generateRandomSymbols(columnId, numberOfSymbols) {
    const column = document.getElementById(columnId);

    for (let i = 0; i < numberOfSymbols; i++) {
        const img = document.createElement("img");
        img.src = getRandomSymbol();
        img.classList.add("hidden"); // Imagens aleatórias começam escondidas
        column.appendChild(img);
    }
}

// Função para iniciar o jogo e revelar as imagens aleatórias
function startGame() {
    const loadingScreen = document.getElementById('loading-screen');
    const numberOfSymbols = 2; // Ajuste a quantidade de imagens aleatórias aqui

    // Gerar imagens aleatórias nas colunas
    generateRandomSymbols("coluna1", numberOfSymbols);
    generateRandomSymbols("coluna2", numberOfSymbols);
    generateRandomSymbols("coluna3", numberOfSymbols);

    // Esconder a tela de carregamento
    loadingScreen.style.display = 'none';

    // Mostrar imagens aleatórias (revelar as que estavam escondidas)
    const hiddenImages = document.querySelectorAll('.hidden');
    hiddenImages.forEach(img => {
        img.style.display = 'block';
    });
}

// Aguardando o clique no botão para iniciar
document.getElementById('start-button').addEventListener('click', startGame);