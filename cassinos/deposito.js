const input = document.getElementById('valueInput');
const button = document.getElementById('submitButton');
const errorMessage = document.getElementById('errorMessage');
const newModal = document.getElementById('newModal');

// Define valor no input quando botão é clicado
function setValue(value) {
  input.value = value;
  updateButtonState();
}

// Atualiza o estado do botão com base no valor
function updateButtonState() {
  const value = parseInt(input.value, 10);
  if (value >= 10) {
    button.classList.add('enabled');
  } else {
    button.classList.remove('enabled');
  }
}

// Habilita ou desabilita o botão conforme o valor do input
input.addEventListener('input', updateButtonState);

// Clique no botão
button.addEventListener('click', () => {
  const value = parseInt(input.value, 10);

  if (value < 10 && value >= 1) {
    // Exibe mensagem de erro
    errorMessage.style.display = 'block';
  } else if (value >= 10) {
    // Abre novo modal
    openNewModal();
  }
});

// Fecha a mensagem de erro ou modal ao clicar fora
window.addEventListener('click', (e) => {
  // Certifica-se de que o clique não foi dentro do modal ou da mensagem de erro
  if (!errorMessage.contains(e.target) && !newModal.contains(e.target)) {
    errorMessage.style.display = 'none';
    newModal.style.display = 'none';
  }
});

// Função para abrir o novo modal
function openNewModal() {
  newModal.style.display = 'block';
}

// Função para fechar o novo modal
function closeNewModal() {
  newModal.style.display = 'none';
}