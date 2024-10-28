// Função para abrir um modal específico
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

// Função para alternar entre os modais
function toggleModal(modalId) {
    closeModal(); // Fecha o modal atual
    openModal(modalId); // Abre o novo modal
}

// Função para fechar qualquer modal aberto
function closeModal() {
    document.getElementById("login-modal").style.display = "none";
    document.getElementById("cadastro-modal").style.display = "none";
}

// Adiciona evento para fechar o modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target.classList.contains("modal")) {
        closeModal();
    }
}

// Event listeners para os links
document.getElementById("login-link").onclick = () => openModal("login-modal");
document.getElementById("cadastro-link").onclick = () => openModal("cadastro-modal");
