// Dados do Cardápio
const cardapio = {
    lanches: [
        { 
            id: 1, 
            nome: "X-Salada", 
            descricao: "Pão, hambúrguer, presunto, queijo, batata palha, alface e tomate", 
            preco: 18.00, 
            imagem: "imagens/lanche.jpg",
            adicionais: [
                { nome: "Bacon", preco: 3.00 },
                { nome: "Ovo", preco: 2.00 }
            ]
        },
        { 
            id: 2, 
            nome: "X-Burger", 
            descricao: "Pão, hambúrguer, presunto, queijo, batata palha, alface e tomate", 
            preco: 20.00, 
            imagem: "imagens/lanche.jpg",
            adicionais: [
                { nome: "Ovo", preco: 3.00 },
                { nome: "Salsicha", preco: 2.00 },
                { nome: "Queijo Extra", preco: 4.00 }
            ]
        },
        { 
            id: 3, 
            nome: "X-Frango", 
            descricao: "Pão, Frango, presunto, queijo, batata palha, alface e tomate", 
            preco: 20.00, 
            imagem: "imagens/lanche.jpg",
            adicionais: [
                { nome: "Cebola Caramelizada", preco: 2.50 },
                { nome: "Queijo Extra", preco: 4.00 }
            ]
        },
        { 
            id: 4, 
            nome: "X-Bacon", 
            descricao: "Pão, hambúrguer, presunto, queijo, batata palha, bacon, alface e tomate", 
            preco: 20.00, 
            imagem: "imagens/lanche.jpg",
            adicionais: [
                { nome: "Cebola Caramelizada", preco: 2.50 },
                { nome: "Queijo Extra", preco: 4.00 }
            ]
        },
        { 
            id: 5, 
            nome: "X-Alcatra", 
            descricao: "Pão, alcatra, presunto, queijo, batata palha, alface e tomate", 
            preco: 20.00, 
            imagem: "imagens/lanche.jpg",
            adicionais: [
                { nome: "Cebola Caramelizada", preco: 2.50 },
                { nome: "Queijo Extra", preco: 4.00 }
            ]
        },
        {
            id: 6, 
            nome: "X-Tudo", 
            descricao: "Pão, hambúrguer, presunto, queijo, bacon e molho especial", 
            preco: 25.00, 
            imagem: "imagens/lanche.jpg",
            adicionais: [
                { nome: "Cebola Caramelizada", preco: 2.50 },
                { nome: "Queijo Extra", preco: 4.00 }
            ]
        }
    ],
    bebidas: [
        { 
            id: 10, 
            nome: "Refri Lata", 
            descricao: "350ml - Escolha o sabor", 
            preco: 6.00, 
            imagem: "imagens/coca-lata.png",
            adicionais: []
        },
        { 
            id: 11, 
            nome: "Suco Natural", 
            descricao: "500ml - Laranja, Abacaxi ou Maracujá", 
            preco: 8.00, 
            imagem: "imagens/suco.jpg",
            adicionais: []
        }
    ],
    porcoes: [
        { 
            id: 20, 
            nome: "Batata Frita", 
            descricao: "Porção grande com cheddar e bacon", 
            preco: 25.00, 
            imagem: "imagens/batata.jpg",
            adicionais: [
                { nome: "Cheddar Extra", preco: 5.00 },
                { nome: "Bacon Extra", preco: 6.00 }
            ]
        },
        { 
            id: 21, 
            nome: "Porção de Trilapia", 
            descricao: "Porção grande com cheddar e bacon", 
            preco: 25.00, 
            imagem: "imagens/peixe.jpg",
            adicionais: [
                { nome: "Cheddar Extra", preco: 5.00 },
                { nome: "Bacon Extra", preco: 6.00 }
            ]
        }
    ],
    promocoes: [
        { 
            id: 30, 
            nome: "Combo Família", 
            descricao: "2 X-Burger + 1 Batata Grande + 2 Refris", 
            preco: 55.00, 
            imagem: "imagens/combo.jpg",
            adicionais: []
        }
    ]
};

// Variáveis globais
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notification-message');

// Renderizar o Cardápio
function renderizarCardapio() {
    for (const categoria in cardapio) {
        const section = document.getElementById(categoria);
        section.innerHTML = '';
        
        cardapio[categoria].forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}">
                <div class="item-info">
                    <h3>${item.nome}</h3>
                    <p>${item.descricao}</p>
                    <div class="item-price">R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
                    <button class="btn add-to-cart" data-item-id="${item.id}">Adicionar</button>
                </div>
            `;
            
            // Modal de Adicionais
            const modalElement = document.createElement('div');
            modalElement.className = 'addons-modal';
            modalElement.id = `addons-modal-${item.id}`;
            
            let addonsHTML = '';
            if (item.adicionais && item.adicionais.length > 0) {
                addonsHTML = item.adicionais.map((addon, index) => `
                    <div class="addon-item">
                        <input type="checkbox" id="addon-${item.id}-${index}" data-price="${addon.preco}">
                        <label for="addon-${item.id}-${index}">${addon.nome} (+R$ ${addon.preco.toFixed(2).replace('.', ',')})</label>
                    </div>
                `).join('');
            } else {
                addonsHTML = '<p>Nenhum adicional disponível para este item.</p>';
            }
            
            modalElement.innerHTML = `
                <div class="modal-content">
                    <span class="close-addons">&times;</span>
                    <h3>${item.nome} - Adicionais</h3>
                    <div class="addons-list">
                        ${addonsHTML}
                    </div>
                    <div class="quantity-control">
                        <button class="qty-minus">-</button>
                        <input type="number" value="1" min="1" class="qty-input">
                        <button class="qty-plus">+</button>
                    </div>
                    <button class="btn btn-primary confirm-addons">Confirmar</button>
                </div>
            `;
            
            section.appendChild(itemElement);
            section.appendChild(modalElement);
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




// Configurar eventos dos botões "Adicionar" com validação
function setupAddToCartButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const itemId = e.target.getAttribute('data-item-id');
            const itemCard = e.target.closest('.menu-item');
            const itemName = itemCard.querySelector('h3').textContent;
            const priceText = itemCard.querySelector('.item-price').textContent;
            const basePrice = parseFloat(priceText.replace('R$ ', '').replace(',', '.'));
            
            if (isNaN(basePrice)) {
                alert('Erro: Preço do item inválido!');
                return;
            }

            const addonsModal = document.getElementById(`addons-modal-${itemId}`);
            addonsModal.style.display = 'flex';
            
            const confirmBtn = addonsModal.querySelector('.confirm-addons');
            
            confirmBtn.onclick = function() {
                const addOns = [];
                const checkboxes = addonsModal.querySelectorAll('.addon-item input:checked');
                
                checkboxes.forEach(checkbox => {
                    const name = checkbox.nextElementSibling.textContent
                        .replace(/\(\+R\$\s\d+,\d+\)/, '')
                        .trim();
                    
                    const price = parseFloat(checkbox.dataset.price);
                    
                    if (name && !isNaN(price)) {
                        addOns.push({ name, price });
                    }
                });
                
                const quantityInput = addonsModal.querySelector('.qty-input');
                const quantity = parseInt(quantityInput.value) || 1;
                
                if (quantity < 1) {
                    alert('Quantidade deve ser pelo menos 1');
                    return;
                }

                addToCart(itemId, itemName, basePrice, addOns, quantity);
                addonsModal.style.display = 'none';
            };
        }
    });
}

// Fechar modais de adicionais
function setupCloseAddonsModals() {
    document.querySelectorAll('.close-addons').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.addons-modal').style.display = 'none';
        });
    });
}



// Inicialização
document.addEventListener('DOMContentLoaded', function() {
      
    renderizarCardapio();
    setupCategoryFilters();
    setupAddToCartButtons();
    setupCloseAddonsModals();
    setupQuantityControls();
    setupCartSidebar();
    setupAccountModal();
    setupInputMasks();
    setupLogout();
    setupCheckout();
    
    updateCartDisplay();
    updateCartCount();
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