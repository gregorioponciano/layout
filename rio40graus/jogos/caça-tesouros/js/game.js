// Função para gerar uma posição aleatória para o tesouro
function getRandomNumber(size) {
    return Math.floor(Math.random() * size);
}

// Função para calcular a distância entre o clique e o tesouro
function getDistance(event, target) {
    const diffX = event.offsetX - target.x;
    const diffY = event.offsetY - target.y;
    return Math.sqrt((diffX * diffX) + (diffY * diffY));
}

// Função para dar dicas ao jogador sobre o quão perto ele está
function getDistanceHint(distance) {
    if (distance < 20) {
        return "Muito quente!";
    } else if (distance < 40) {
        return "Quente!";
    } else if (distance < 80) {
        return "Morno";
    } else if (distance < 160) {
        return "Frio";
    } else {
        return "Muito frio!";
    }
}

// Definir o tamanho do mapa
const WIDTH = 600;
const HEIGHT = 400;

// Gerar posição aleatória do tesouro
let target = {
    x: getRandomNumber(WIDTH),
    y: getRandomNumber(HEIGHT)
};

// Contador de cliques
let clicks = 0;

const map = document.getElementById('gameMap');
const message = document.getElementById('message');
const clickCount = document.getElementById('clickCount');

// Evento de clique no mapa
map.addEventListener('click', function(event) {
    clicks++;
    let distance = getDistance(event, target);
    let distanceHint = getDistanceHint(distance);
    message.textContent = distanceHint;
    clickCount.textContent = clicks;

    // Se o jogador encontrou o tesouro
    if (distance < 20) {
        message.textContent = "Você encontrou o tesouro em " + clicks + " cliques!";
        map.removeEventListener('click', arguments.callee); // Desativar novos cliques
    }
});

// Botão para voltar à página inicial
document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});
