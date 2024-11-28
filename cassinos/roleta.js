let chances = 1; // Variável que controla o número de chances para rodar a roleta
let roletaFechada = false; // Variável para verificar se a roleta foi fechada

// Função para fechar a roleta
function closeRoleta() {
    roletaFechada = true; // Marca que a roleta foi fechada
    document.getElementById('overlay').classList.add('hidden'); // Esconde o modal da roleta
}

// Função para abrir a roleta novamente
function openRoleta() {
    roletaFechada = false; // Marca que a roleta não foi fechada
    const spinBtn = document.getElementById('spinBtn');

    if (chances <= 0) { // Se o usuário já tiver rodado a roleta
        spinBtn.textContent = `Rodar (0)`; // Atualiza o texto do botão para "Rodar (0)"
        spinBtn.classList.add('disabled'); // Adiciona a classe "disabled" para desativar o botão
        spinBtn.disabled = true; // Desabilita o botão para garantir que não pode ser clicado
    } else {
        spinBtn.textContent = `Rodar (${chances})`; // Atualiza o texto do botão com as chances restantes
    }

    document.getElementById('roleta').style.transform = 'rotate(0deg)';  // Reseta a rotação da roleta
    document.getElementById('resultado').textContent = '';  // Limpa o resultado anterior

    document.getElementById('overlay').classList.remove('hidden'); // Mostra a roleta
}

// Função para rodar a roleta
function spin() {
    if (chances > 0) {
        const roleta = document.getElementById('roleta');
        const randomDegree = Math.floor(Math.random() * 1); // Gera um ângulo aleatório para rodar
        roleta.style.transform = `rotate(${randomDegree + 3600}deg)`; // Adiciona rotações extras para mais efeito
        
        chances--; // Diminui a chance
        const spinBtn = document.getElementById('spinBtn');
        spinBtn.textContent = `Rodar (${chances})`; // Atualiza o botão com o número de chances
        spinBtn.classList.add('disabled'); // Desabilita o botão após o uso
        spinBtn.disabled = true;

        // Definindo os prêmios
        const premios = ["Prêmio 1", "Prêmio 2", "Prêmio 3", "Prêmio 4", "Prêmio 5", "Prêmio 6", "Prêmio 7"];
        const premioIndex = Math.floor(randomDegree / (360 / premios.length)); // Calcula qual prêmio foi ganho com base no ângulo

        setTimeout(() => {
            document.getElementById('resultado').textContent = `Você ganhou: ${premios[premioIndex]}`; // Exibe o prêmio
        }, 4000); // Exibe o resultado após a rotação parar
    }
}