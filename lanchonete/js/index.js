// Dados do Cardápio
const cardapio = {
    lanches: [
        { 
            id: 1, 
            nome: "X-Salada", 
            descricao: "Pão, hambúrguer, presunto, queijo, batata palha, alface e tomate", 
            preco: 18.00, 
            imagem: "imagens/lanche.jpg",
        },
        { 
            id: 2, 
            nome: "X-Burger", 
            descricao: "Pão, hambúrguer, presunto, queijo, batata palha, alface e tomate", 
            preco: 20.00, 
            imagem: "imagens/lanche.jpg",
        },
        { 
            id: 3, 
            nome: "X-Frango", 
            descricao: "Pão, Frango, presunto, queijo, batata palha, alface e tomate", 
            preco: 20.00, 
            imagem: "imagens/lanche.jpg",
        },
        { 
            id: 4, 
            nome: "X-Bacon", 
            descricao: "Pão, hambúrguer, presunto, queijo, batata palha, bacon, alface e tomate", 
            preco: 20.00, 
            imagem: "imagens/lanche.jpg",
        },
        { 
            id: 5, 
            nome: "X-Alcatra", 
            descricao: "Pão, alcatra, presunto, queijo, batata palha, alface e tomate", 
            preco: 20.00, 
            imagem: "imagens/lanche.jpg",
        },
        {
            id: 6, 
            nome: "X-Tudo", 
            descricao: "Pão, hambúrguer, presunto, queijo, bacon e molho especial", 
            preco: 25.00, 
            imagem: "imagens/lanche.jpg",
        }
    ],
    bebidas: [
        { 
            id: 10, 
            nome: "Refri Lata", 
            descricao: "350ml - Escolha o sabor", 
            preco: 6.00, 
            imagem: "imagens/coca-lata.png",
        },
        { 
            id: 11, 
            nome: "Suco Natural", 
            descricao: "500ml - Laranja, Abacaxi ou Maracujá", 
            preco: 8.00, 
            imagem: "imagens/suco.jpg",
        }
    ],
    porcoes: [
        { 
            id: 20, 
            nome: "Batata Frita", 
            descricao: "Porção grande com cheddar e bacon", 
            preco: 25.00, 
            imagem: "imagens/batata.jpg",

        },
        { 
            id: 21, 
            nome: "Porção de Tilapia", 
            descricao: "Porção grande com cheddar e bacon", 
            preco: 25.00, 
            imagem: "imagens/peixe.jpg",
        }
    ],
    promocoes: [
        { 
            id: 30, 
            nome: "Combo Família", 
            descricao: "2 X-Burger + 1 Batata Grande + 2 Refris", 
            preco: 55.00, 
            imagem: "imagens/combo.jpg",
        }
    ]
};

// Renderizar o Cardápio
function renderizarCardapio() {
    for (const categoria in cardapio) {
        const section = document.getElementById(categoria);
        
        cardapio[categoria].forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}">
                <div class="item-info">
                    <h3>${item.nome}</h3>
                    <p>${item.descricao}</p>
                    <div class="item-price">R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
                    <button class="btn add-to-cart" data-item-id="">Adicionar</button>
                </div>
            `;
            
            section.appendChild(itemElement);
       });
    }
}

// Sistema de Filtros
function setupCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.menu-section').forEach(section => {
                section.classList.remove('active');
            });
            
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
      
    renderizarCardapio();
    setupCategoryFilters();

});


document.addEventListener('DOMContentLoaded', function() {
    // Elementos dos modais e links
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginLink = document.querySelector('a.active');
    const registerLink = document.getElementById('account-settings');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Função para alternar entre modais e atualizar links ativos
    function toggleModals(hideModal, showModal, activateLink, deactivateLink) {
        hideModal.style.display = 'none';
        showModal.style.display = 'block';
        activateLink.classList.add('active');
        deactivateLink.classList.remove('active');
    }
    
    // Abrir modal de login
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        toggleModals(registerModal, loginModal, loginLink, registerLink);
    });
    
    // Abrir modal de cadastro
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        toggleModals(loginModal, registerModal, registerLink, loginLink);
    });
    
    // Fechar modais e resetar links ativos
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            // Volta ao estado original (Entrar ativo)
            loginLink.classList.add('active');
            registerLink.classList.remove('active');
        });
    });
    
    // Fechar ao clicar fora do modal
    window.addEventListener('click', function(e) {
        if (e.target === loginModal || e.target === registerModal) {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            // Volta ao estado original (Entrar ativo)
            loginLink.classList.add('active');
            registerLink.classList.remove('active');
        }
    });
    
    // Adicionando links para alternar entre modais
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Link "Cadastre-se" no modal de login
    const registerLinkInLogin = document.createElement('p');
    registerLinkInLogin.innerHTML = 'Não tem uma conta? <a href="#" id="goToRegister">Cadastre-se</a>';
    loginForm.appendChild(registerLinkInLogin);
    
    // Link "Entrar" no modal de cadastro
    const loginLinkInRegister = document.createElement('p');
    loginLinkInRegister.innerHTML = 'Já tem uma conta? <a href="#" id="goToLogin">Entrar</a>';
    registerForm.appendChild(loginLinkInRegister);
    
    // Eventos para alternar entre modais
    document.getElementById('goToRegister').addEventListener('click', function(e) {
        e.preventDefault();
        toggleModals(loginModal, registerModal, registerLink, loginLink);
    });
    
    document.getElementById('goToLogin').addEventListener('click', function(e) {
        e.preventDefault();
        toggleModals(registerModal, loginModal, loginLink, registerLink);
    });
    
    // Validação dos formulários (mantido igual)
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        console.log('Login attempt:', { email, password });
        alert('Login realizado com sucesso!');
        loginModal.style.display = 'none';
        loginLink.classList.add('active');
        registerLink.classList.remove('active');
    });
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        
        console.log('Registration attempt:', { name, email, password });
        alert('Cadastro realizado com sucesso!');
        registerModal.style.display = 'none';
        loginLink.classList.add('active');
        registerLink.classList.remove('active');
    });
});