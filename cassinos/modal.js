                                //modal login e cadastro

const modalCadastro = document.getElementById("modalCadastro");
const modalEntrar = document.getElementById("modalEntrar");

const abrirCadastro = document.getElementById("abrirCadastro");
const abrirEntrar = document.getElementById("abrirEntrar");
const abrirEntrarDireto = document.getElementById("abrirEntrarDireto");

const fecharCadastro = document.getElementById("fecharCadastro");
const fecharEntrar = document.getElementById("fecharEntrar");

const voltarParaCadastro = document.getElementById("voltarParaCadastro");

abrirCadastro.onclick = function() {
    modalCadastro.style.display = "block";
};

abrirEntrar.onclick = function() {
    modalEntrar.style.display = "block";
};

abrirEntrarDireto.onclick = function() {
    modalEntrar.style.display = "block";
    modalCadastro.style.display = "none"; // Garante que o modal Cadastro não está aberto
};

fecharCadastro.onclick = function() {
    fecharAmbosOsModais();
};

fecharEntrar.onclick = function() {
    fecharAmbosOsModais();
};

voltarParaCadastro.onclick = function() {
    modalEntrar.style.display = "none";
    modalCadastro.style.display = "block";
};

function fecharAmbosOsModais() {
    modalCadastro.style.display = "none";
    modalEntrar.style.display = "none";
}

// Previne fechamento dos modais ao clicar fora deles
window.onclick = function(event) {
    if (event.target == modalCadastro || event.target == modalEntrar) {
        fecharAmbosOsModais();
    }
};
                        
                        //modal Perfil
function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

                        //modal fullscreen afiliado

        function openFullscreenModal() {
            const modalScreen = document.getElementById('fullscreenModal');
            modalScreen.style.display = 'block';
            setTimeout(() => {
                modalScreen.classList.add('show');
            }, 10); // Delay necessário para acionar a transição
        }

        function closeFullscreenModal() {
            const modalScreen = document.getElementById('fullscreenModal');
            modalScreen.classList.remove('show');
            setTimeout(() => {
                modalScreen.style.display = 'none';
            }, 500); // Tempo deve coincidir com o da transição
        }

        window.onclick = function(event) {
            const modalScreen = document.getElementById('fullscreenModal');
            if (event.target == modalScreen) {
                closeFullscreenModal();
            }
        }

        //modal fullscreen deposito

        function openGrayModal() {
            const modalDeposito = document.getElementById('grayModal');
            modalDeposito.style.display = 'block';
            setTimeout(() => {
                modalDeposito.classList.add('show');
            }, 10); // Delay necessário para acionar a transição
        }

        function closeGrayModal() {
            const modalDeposito = document.getElementById('grayModal');
            modalDeposito.classList.remove('show');
            setTimeout(() => {
                modalDeposito.style.display = 'none';
            }, 500); // Tempo deve coincidir com o da transição
        }

        window.onclick = function(event) {
            const modalDeposito = document.getElementById('grayModal');
            if (event.target == modalDeposito) {
                closeGrayModal();
            }
        }