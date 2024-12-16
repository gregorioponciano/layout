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


        // funçao para copiar o link de indicaçao 

        function copyText(element) {
            const textToCopy = element.getAttribute('data-text');
            
            // Cria um elemento temporário para copiar o texto
            const tempInput = document.createElement('textarea');
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);
            
            // Seleciona e copia o texto
            tempInput.select();
            document.execCommand('copy');
            
            // Remove o elemento temporário
            document.body.removeChild(tempInput);
            
            // Mostra mensagem de sucesso
            const message = document.getElementById('message');
            message.style.display = 'block';
            setTimeout(() => {
                message.style.display = 'none';
            }, 2000);
        }


        // INPUT RANGE FAQ

        const rangeInput = document.getElementById("range");
        const pessoasSpan = document.getElementById("pessoas");
        const dinheiroSpan = document.getElementById("dinheiro");
    
        // Relação entre número de pessoas e dinheiro
        const dinheiroPorPessoa = 50; // Exemplo: cada pessoa representa 50 unidades de dinheiro
    
        rangeInput.addEventListener("input", () => {
          const pessoas = parseInt(rangeInput.value, 10);
          const dinheiro = pessoas * dinheiroPorPessoa;
    
          // Atualiza os valores na tela
          pessoasSpan.textContent = pessoas;
          dinheiroSpan.textContent = dinheiro.toLocaleString("pt-BR");
        });