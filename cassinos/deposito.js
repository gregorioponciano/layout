  const input = document.getElementById('valueInput');
  const button = document.getElementById('submitButton');
  const errorMessage = document.getElementById('errorMessage');
  const backdrop = document.getElementById('backdrop');
  const newModal = document.getElementById('newModal');

  // Habilita ou desabilita o botão conforme o valor do input
  input.addEventListener('input', () => {
    const value = parseInt(input.value, 10);
    if (value >= 10) {
      button.classList.add('enabled');
    } else {
      button.classList.remove('enabled');
    }
  });

  // Clique no botão
  button.addEventListener('click', () => {
    const value = parseInt(input.value, 10);

    if (value < 10 && value >= 1) {
      // Exibe mensagem de erro
      errorMessage.style.display = 'block';
      backdrop.style.display = 'block';
    } else if (value >= 10) {
      // Abre novo modal
      openNewModal();
    }
  });

  // Fechar mensagem de erro ao clicar fora
  backdrop.addEventListener('click', () => {
    errorMessage.style.display = 'none';
    backdrop.style.display = 'none';
    newModal.style.display = 'none'; // Fechar modal também
  });

  // Função para abrir o novo modal
  function openNewModal() {
    newModal.style.display = 'block';
    backdrop.style.display = 'block';
  }

  // Função para fechar o novo modal
  function closeNewModal() {
    newModal.style.display = 'none';
    backdrop.style.display = 'none';
  }