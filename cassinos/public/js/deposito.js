// Função para verificar se o valor do input é válido
function checkInputValue() {
  const value = parseFloat(document.getElementById('valueInput').value);  // Pegando o valor inserido
  const submitButton = document.getElementById('submitButton');
  const errorMessage = document.getElementById('error-message');
  
  // Verificar se o valor é numérico e habilitar o botão se o valor for maior que 0
  if (!isNaN(value) && value > 0) {
      submitButton.disabled = false;
      submitButton.classList.add('enabled');
  } else {
      submitButton.disabled = true;
      submitButton.classList.remove('enabled');
  }

  // Ocultar a mensagem de erro enquanto o botão não for clicado
  errorMessage.style.display = 'none';
}

// Função para definir um valor fixo no input
function setValue(amount) {
  document.getElementById('valueInput').value = amount;
  checkInputValue(); // Revalida o valor ao clicar nos botões de valor fixo
}

// Função específica para abrir o modal 5 com validação
function openModal5() {
  const value = parseFloat(document.getElementById('valueInput').value);
  const errorMessage = document.getElementById('error-message');
  
  // Verificar se o valor está entre 10 e 10000
  if (value >= 10 && value <= 10000) {
      // Atualiza o valor no modal 5
      document.getElementById('selectedValue').textContent = `Total R$ ${value.toFixed(2)}`;
      document.getElementById('selectedValue').style.textAlign = 'center'
      // Chama a função para abrir o modal 5
      openModal(5); 
      const audioElement = document.getElementById('audioPix');
      audioElement.play(); // Toca o áudio
      errorMessage.style.display = 'none'; // Esconde a mensagem de erro se o valor for válido
  } else {
      // Exibe a mensagem de erro se o valor for inválido
      errorMessage.style.display = 'block';
  }
}

// Função para abrir um modal
function openModal(modalId) {
  // Não fecha o Modal 1 quando outro modal for aberto
  closeAllModals(); // Fecha todos os modais exceto o Modal 1
  document.getElementById(`modal-${modalId}`).classList.add('active');
}

// Função para fechar um modal específico
function closeModal(modalId) {
  document.getElementById(`modal-${modalId}`).classList.remove('active');
}

// Função para fechar todos os modais exceto o Modal 1
function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    if (!modal.classList.contains('modal-1')) {  // Não fecha o modal 1
      modal.classList.remove('active');
    }
  });
}

// Adicionar o evento 'input' no campo de valor
document.getElementById('valueInput').addEventListener('input', checkInputValue);
