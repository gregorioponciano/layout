var burg = document.querySelector('#burg');
var fechar = document.querySelector('#fechar');
var aparecer = document.querySelector('#section-menu');

// Abrir o menu
function clickMenu() {
    aparecer.style.display = 'block';
    burg.style.display = 'none';
    fechar.style.display = 'block';
}

// Fechar o menu
function closeMenu() {
    aparecer.style.display = 'none';
    fechar.style.display = 'none';
    burg.style.display = 'block';
}

// Ajustar menu ao redimensionar a tela
function mudouTamanho() {
    if (window.innerWidth >= 768) {
        aparecer.style.display = 'block'; // Mostrar o menu em telas maiores
        burg.style.display = 'none'; // Esconder o ícone do menu burger
        fechar.style.display = 'none'; // Esconder o ícone de fechar
    } else {
        aparecer.style.display = 'none'; // Esconder o menu em telas menores
        burg.style.display = 'block'; // Mostrar o ícone do menu burger
        fechar.style.display = 'none'; // Esconder o ícone de fechar
    }
}

// Adicionar listener ao redimensionar a janela
window.addEventListener('resize', mudouTamanho);

// Garantir que o estado inicial esteja correto
mudouTamanho();
