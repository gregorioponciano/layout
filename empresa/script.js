function verificarStatusFuncionamento() {
    const agora = new Date();
    const diaSemana = agora.getDay(); // Obtém o dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
    const hora = agora.getHours();

    // Verifica se é sábado ou domingo
    if (diaSemana === 0 || diaSemana === 6) { 
      if (hora >= 7 && hora < 12) {  // De sabado e domingo
      } else {
        return 'Fechado';
      } 
    } else if (hora >= 7 && hora < 17) { // De segunda a sexta
      return 'Aberta';
    } else {
      return 'Fechado';
    }
  }

  const status = verificarStatusFuncionamento();
  const statusElement = document.getElementById('status');
  statusElement.textContent = `${status}`;

  if (status === 'Aberta') {
  statusElement.textContent = 'Aberta';
  statusElement.style.color = 'green';
} else {
  statusElement.textContent = 'Fechado';
  statusElement.style.color = 'red';
}



// Esse código abre e fecha o menu lateral para a lateral esquerda

const menuLateral = document.querySelector(".menu-lateral");

const toggleButton = document.querySelector(".toggle-menu");

toggleButton.addEventListener("click", () => {
  menuLateral.classList.toggle("is-open");
  if (menuLateral.classList.contains("is-open")) {
    menuLateral.style.left = "0";
  } else {
    menuLateral.style.left = "-100%";
  }
});
