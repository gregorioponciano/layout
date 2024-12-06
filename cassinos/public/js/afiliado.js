        // Função para exibir o conteúdo correspondente e destacar o botão ativo
        function exibirConteudoAfiliados(conteudoId) {
            // Oculta todos os conteúdos
            document.querySelectorAll('.conteudo-afiliados > div').forEach(div => {
                div.style.display = 'none';
            });

            // Remove a classe 'active' de todos os botões
            document.querySelectorAll('.menu-afiliados button').forEach(button => {
                button.classList.remove('active');
            });

            // Exibe apenas o conteúdo correspondente
            document.getElementById(`conteudo-${conteudoId}`).style.display = 'block';

            // Adiciona a classe 'active' ao botão correspondente
            document.getElementById(`btn-${conteudoId}`).classList.add('active');
        }