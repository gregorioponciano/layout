function toggleMobileMenu() {
  const nav = document.querySelector(".navigation-header");

  // se não existir o botão de fechar, cria
  if (!nav.querySelector(".close-btn")) {
    const closeItem = document.createElement("li");
    closeItem.classList.add("close-btn");
    closeItem.innerHTML = "&times;"; // X estilizado
    closeItem.onclick = () => nav.classList.remove("open");
    nav.prepend(closeItem);
  }

  nav.classList.toggle("open");
}

// Fecha menu se clicar fora
document.addEventListener("click", (e) => {
  const nav = document.querySelector(".navigation-header");
  const logo = document.querySelector(".nav-logo span");

  if (
    nav.classList.contains("open") &&
    !nav.contains(e.target) &&
    e.target !== logo
  ) {
    nav.classList.remove("open");
  }
});
