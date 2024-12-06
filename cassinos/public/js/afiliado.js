        // Função para alterar o conteúdo do painel
        function alterarConteudoAfiliados(modalId) {
            // Fecha todos os conteúdos
            document.querySelectorAll('.conteudo-afiliados').forEach(conteudo => {
                conteudo.classList.remove('active');
            });

            // Mostra o conteúdo correspondente
            document.getElementById(`conteudo-${modalId}`).classList.add('active');
        }