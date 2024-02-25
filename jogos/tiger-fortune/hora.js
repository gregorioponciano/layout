// Função para atualizar o relógio
function updateClock() {
    // Obter a hora atual
    const now = new Date();
  
    // Formatar a hora
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
  
    // Exibir a hora no relógio
    document.getElementById("clock").innerText = `${hours}:${minutes}:${seconds}`;
  }
  
  // Atualizar o relógio a cada segundo
  setInterval(updateClock, 1000);
  
  // Salvar a hora atual no localStorage
  window.addEventListener("beforeunload", function() {
    localStorage.setItem("lastClockTime", now.getTime());
  });
  
  // Carregar a última hora salva do localStorage
  window.addEventListener("load", function() {
    const lastClockTime = localStorage.getItem("lastClockTime");
    if (lastClockTime) {
      const now = new Date(lastClockTime);
      updateClock(now);
    }
  });