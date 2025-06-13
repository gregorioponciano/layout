    const btnTopo = document.getElementById('btnTopo');

    // Mostrar botão quando rolar para baixo mais de 100px
    window.onscroll = function() {
      if (document.documentElement.scrollTop > 100) {
        btnTopo.style.display = 'block';
      } else {
        btnTopo.style.display = 'none';
      }
    };

    // Voltar suavemente ao topo ao clicar
    btnTopo.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });