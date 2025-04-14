document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const openLogin = document.getElementById('open-login');
    const openRegister = document.getElementById('open-register');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const closeModals = document.querySelectorAll('.close-modal');
    
    // Função para abrir modal
    function openModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Impede rolagem da página
    }
    
    // Função para fechar modal
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura rolagem
    }
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            closeModal(loginModal);
        }
        if (event.target === registerModal) {
            closeModal(registerModal);
        }
    });
    
    // Abrir modais
    openLogin.addEventListener('click', function() {
        closeModal(registerModal); // Fecha cadastro se aberto
        openModal(loginModal);
    });
    
    openRegister.addEventListener('click', function() {
        closeModal(loginModal); // Fecha login se aberto
        openModal(registerModal);
    });
    
    // Alternar entre modais
    switchToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });
    
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });
    
    // Fechar modais com o botão X
    closeModals.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
});document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const openLogin = document.getElementById('open-login');
    const openRegister = document.getElementById('open-register');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const closeModals = document.querySelectorAll('.close-modal');
    
    // Função para abrir modal
    function openModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Impede rolagem da página
    }
    
    // Função para fechar modal
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura rolagem
    }
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            closeModal(loginModal);
        }
        if (event.target === registerModal) {
            closeModal(registerModal);
        }
    });
    
    // Abrir modais
    openLogin.addEventListener('click', function() {
        closeModal(registerModal); // Fecha cadastro se aberto
        openModal(loginModal);
    });
    
    openRegister.addEventListener('click', function() {
        closeModal(loginModal); // Fecha login se aberto
        openModal(registerModal);
    });
    
    // Alternar entre modais
    switchToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });
    
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });
    
    // Fechar modais com o botão X
    closeModals.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
});