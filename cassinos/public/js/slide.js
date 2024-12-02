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