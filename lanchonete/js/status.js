function verificarStatusFuncionamento() {
    const agora = new Date();
    const diaSemana = agora.getDay(); // Obtém o dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
    const hora = agora.getHours();

    // Verifica se é sábado ou domingo
    if (diaSemana === 0 || diaSemana === 6) { 
      if (hora >= 7 && hora < 23) {  // De sabado e domingo
        return 'Aberta';
      } else {
        return 'Fechado';
      }
    } else if (hora >= 18 && hora < 23) { // De segunda a sexta
      return 'Aberta';
    } else {
      return 'Fechado';
    }
  }

  const status = verificarStatusFuncionamento();
  const statusElement = document.getElementById('status');
  statusElement.textContent = `${status}`;

  if (status === 'Aberta') {
  statusElement.textContent = '(Aberto)';
  statusElement.style.color = '#00ff00';
  statusElement.style.textDecoration = 'underline';
} else {
  statusElement.textContent = 'Fechado';
  statusElement.style.color = 'red';
  statusElement.style.backgroundColor = '#7e93aa';
  statusElement.style.textDecoration = 'underline';
}


        // Função para abrir o modal
        document.getElementById("ver-mais-status").onclick = function() {
          document.getElementById("modal-horario").style.display = "flex";
      }

      // Função para fechar o modal
      function fecharModal() {
          document.getElementById("modal-horario").style.display = "none";
      }

      // Fecha o modal se o usuário clicar fora do conteúdo
      window.onclick = function(event) {
          if (event.target == document.getElementById("modal-horario")) {
              fecharModal();
          }
      }