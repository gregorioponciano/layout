// Função para voltar para a "home" e abrir a roleta
function returnToBody() {
    // Fecha todos os modais abertos
    closeModal(1); 
    closeModal(2);
    closeModal(3);
    closeModal(4);

    // Exibe a roleta
    openRoleta();
}

// Função para abrir a roleta
function openRoleta() {
    // Torna a roleta visível
    document.getElementById('overlay').style.display = 'flex'; // Usamos 'flex' para centralizar a roleta
}

// Função para fechar a roleta (caso o usuário clique no 'X')
function closeRoleta() {
    document.getElementById('overlay').style.display = 'none'; // Esconde a roleta
}

// Função para abrir o modal (caso necessário)
function openModal(id) {
    document.getElementById('modal' + id).style.display = 'block';
}

// Função para fechar o modal (caso necessário)
function closeModal(id) {
    document.getElementById('modal' + id).style.display = 'none';
}

// Lógica de roleta e spin
let canSpin = true; // Variável para controlar se o usuário pode girar ou não

document.getElementById('spin').addEventListener('click', function() {
    if (!canSpin) return; // Se não pode girar, não faz nada

    // Desabilita o botão para que o usuário não possa clicar novamente
    this.disabled = true;
    canSpin = false;

    // Atualiza a mensagem de status
    document.getElementById('status-message').textContent = "0"; // Atualiza o status durante o giro

    // Gira a roleta
    let roleta = document.querySelector('.roleta');
    let randomDegree = Math.floor(Math.random() * 360) + 3600; // Gira um número aleatório + múltiplos de 360 para dar várias voltas
    roleta.style.transform = `rotate(${randomDegree}deg)`; // Aplica a rotação

    // Espera 5 segundos (duração da rotação) para mostrar o resultado
    setTimeout(function() {
        // Gerar um número aleatório entre 95.00 e 98.15
        let result = 95.00;

        // Exibir o valor inicial
        let resultSpan = document.getElementById('result-value');
        resultSpan.textContent = "Carregando..."; // Mensagem inicial de carregamento
        resultSpan.style.padding = '20px'

        // Aumentar o valor de 3 em 3 até alcançar o valor final
        let finalResult = (Math.random() * (98.15 - 95.00) + 95.00).toFixed(2);

        // Para uma animação de carregamento mais lenta, vamos usar um intervalo maior
        let interval = setInterval(function() {
            if (result >= finalResult) {
                clearInterval(interval); // Para a animação quando atingir o valor final
                resultSpan.textContent = finalResult; // Atualiza o valor exibido
            } else {
                result += 0.27; // Aumenta o valor de 0.05 para um carregamento muito lento
                resultSpan.textContent = result.toFixed(2); // Atualiza o valor exibido
            }
        }, 100); // Aumenta o intervalo para 300ms para um carregamento mais lento
    }, 3000); // 5000ms = 5 segundos, tempo suficiente para a roleta girar
});
