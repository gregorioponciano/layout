function toggleMobileMenu() {
  const nav = document.querySelector(".navigation-header");
  nav.classList.toggle("open");
}

// Fecha menu se clicar fora
document.addEventListener("click", (e) => {
  const nav = document.querySelector(".navigation-header");
  const logo = document.querySelector(".nav-logo i");

  if (
    nav.classList.contains("open") &&
    !nav.contains(e.target) &&
    e.target !== logo
  ) {
    nav.classList.remove("open");
  }
});
