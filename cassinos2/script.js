const menu = document.getElementById('menu');
const content = document.getElementById('content');
const toggleMenu = document.querySelector('.spam');

toggleMenu.addEventListener('click', function() {
    if (menu.style.left === '-250px') {
        // Abre o menu empurrando o conteúdo
        menu.style.left = '0';
        content.style.marginLeft = '250px'; // Adiciona margem para o conteúdo
    } else {
        // Fecha o menu trazendo o conteúdo
        menu.style.left = '-250px';
        content.style.marginLeft = '0'; // Remove a margem do conteúdo
    }
});

document.addEventListener('click', function(event) {
    // Fecha o menu se o clique for fora do menu
    if (!menu.contains(event.target) && menu.style.left === '0') {
        menu.style.left = '-250px';
        content.style.marginLeft = '0'; // Remove a margem do conteúdo
    }
});

let currentIndex = 0;
let intervalId;

function moveCarousel(direction) {
    const carouselImages = document.querySelector('.carousel-images');
    const totalImages = carouselImages.children.length;
    const imageWidth = carouselImages.children[0].offsetWidth;
    const moveAmount = imageWidth * direction;

    currentIndex = (currentIndex + totalImages + direction) % totalImages;

    carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

function startAutoScroll() {
    intervalId = setInterval(() => {
        moveCarousel(1);
    }, 3000); // 3 segundos
}

function stopAutoScroll() {
    clearInterval(intervalId);
}

document.addEventListener('DOMContentLoaded', () => {
    startAutoScroll();
});

document.querySelector('.carousel').addEventListener('mouseenter', () => {
    stopAutoScroll();
});

document.querySelector('.carousel').addEventListener('mouseleave', () => {
    startAutoScroll();
});