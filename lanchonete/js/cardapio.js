document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.menu-btn');
    const sections = document.querySelectorAll('.menu-section');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe active de todos os botões e seções
            buttons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado
            this.classList.add('active');
            
            // Mostra a seção correspondente
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
});