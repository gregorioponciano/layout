        // Função para exibir o conteúdo correspondente
        function exibirConteudoAfiliados(conteudoId, isPainel = false) {
            // Oculta todos os conteúdos, exceto o Painel caso seja o padrão inicial
            document.querySelectorAll('.conteudo-afiliados > div').forEach(div => {
                if (div.id !== 'conteudo-painel' || !isPainel) {
                    div.style.display = 'none';
                }
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