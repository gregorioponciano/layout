function setupSearch() {
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        let foundItems = false;

        // Remove mensagem anterior se existir
        const oldMessage = document.querySelector('.no-results-message');
        if (oldMessage) oldMessage.remove();

        // Mostra todos os itens primeiro
        document.querySelectorAll('.menu-item').forEach(item => {
            item.style.display = 'block';
        });

        // Se campo vazio, não faz nada
        if (searchTerm.trim() === '') return;

        // Filtra os itens
        document.querySelectorAll('.menu-item').forEach(item => {
            const name = item.querySelector('h3').textContent.toLowerCase();
            const desc = item.querySelector('p').textContent.toLowerCase();

            if (name.includes(searchTerm) || desc.includes(searchTerm)) {
                foundItems = true;
            } else {
                item.style.display = 'none';
            }
        });

        // Mostra mensagem se não encontrar nada
        if (!foundItems) {
            const menuSections = document.querySelector('.menu-sections');
            const message = document.createElement('div');
            message.className = 'no-results-message';
            message.textContent = 'Nenhum item encontrado com "' + searchTerm + '"';
            menuSections.appendChild(message);
        }
    });
}function setupSearch() {
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        let foundItems = false;

        // Remove mensagem anterior se existir
        const oldMessage = document.querySelector('.no-results-message');
        if (oldMessage) oldMessage.remove();

        // Mostra todos os itens primeiro
        document.querySelectorAll('.menu-item').forEach(item => {
            item.style.display = 'block';
        });

        // Se campo vazio, não faz nada
        if (searchTerm.trim() === '') return;

        // Filtra os itens
        document.querySelectorAll('.menu-item').forEach(item => {
            const name = item.querySelector('h3').textContent.toLowerCase();
            const desc = item.querySelector('p').textContent.toLowerCase();

            if (name.includes(searchTerm) || desc.includes(searchTerm)) {
                foundItems = true;
            } else {
                item.style.display = 'none';
            }
        });

        // Mostra mensagem se não encontrar nada
        if (!foundItems) {
            const menuSections = document.querySelector('.menu-sections');
            const message = document.createElement('div');
            message.className = 'no-results-message';
            message.textContent = 'Nenhum item encontrado com "' + searchTerm + '"';
            menuSections.appendChild(message);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // ... todo o seu código existente ...
    
    setupSearch(); // ADICIONE ESTA LINHA
});