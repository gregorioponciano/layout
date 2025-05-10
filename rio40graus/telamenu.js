var burg = document.querySelector('#burg');
var fechar = document.querySelector('#fechar');
var aparecer = document.querySelector('#section-menu');

function clickMenu() {
            
    if ( aparecer.style.display == 'block') {
        aparecer.style.display = 'none'
    } else {
        aparecer.style.display = 'block'
    }
}

// Ajustar menu ao redimensionar a tela
function mudouTamanho() {
    if (window.innerWidth >= 768) {
        aparecer.style.display = 'block'; // Mostrar o menu em telas maiores
        burg.style.display = 'none'; // Esconder o ícone do menu burger      
    } else {
        aparecer.style.display = 'none'; // Esconder o menu em telas menores
        burg.style.display = 'block'; // Mostrar o ícone do menu burger    
    }
}

// Adicionar listener ao redimensionar a janela
window.addEventListener('resize', mudouTamanho);

// Garantir que o estado inicial esteja correto
mudouTamanho();
