     // Função para abrir um modal
     function openModal(modalId) {
        closeAllModals();
        document.getElementById(`modal-${modalId}`).classList.add('active');
    }

    // Função para fechar um modal específico
    function closeModal(modalId) {
        document.getElementById(`modal-${modalId}`).classList.remove('active');
    }

    // Função para fechar todos os modais
    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // Função para voltar ao conteúdo principal do body
    function returnToBody() {
        closeAllModals()
    }