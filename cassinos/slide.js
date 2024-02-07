let currentSlide = 0;

setInterval(() => {
    if (currentSlide === 2) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    updateSlide();
}, 5000);

function slidePrev() {
    if (currentSlide === 0) {
        currentSlide = 2;
    } else {
        currentSlide--;
    }
    updateSlide();
}

function slideNext() {
    if (currentSlide === 2) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    updateSlide();
}

function updateSlide() {
    let slider = document.querySelector(".slider");
    let imgs = slider.querySelectorAll("img");

    // Desativar a imagem anterior
    if (currentSlide !== 0) {
        imgs[currentSlide - 1].classList.remove("active");
    }

    // Ativar a imagem atual
    imgs[currentSlide].classList.add("active");

    // Desativar a próxima imagem
    if (currentSlide !== imgs.length - 1) {
        imgs[currentSlide + 1].classList.remove("active");
    }
}