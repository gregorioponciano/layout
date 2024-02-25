

const image = document.getElementById('image');
const clickSound = document.getElementById('click-sound');

image.addEventListener('click', () => {
  image.classList.add('rotate-fast');
  clickSound.play();
  // Após 3 segundos, volta à rotação normal
  setTimeout(() => {
    image.classList.remove('rotate-fast');
  }, 2000);
});