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

// Atualizar contador do carrinho
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Mostrar notificação
function showNotification(message) {
    notificationMessage.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Adicionar item ao carrinho com validação de adicionais
function addToCart(itemId, itemName, basePrice, addOns, quantity) {
    // Validar adicionais
    const validatedAddOns = addOns.filter(addon => 
        addon && addon.name && addon.name.trim() !== "" && !isNaN(addon.price)
    );

    // Verificar se já existe um item igual no carrinho
    const existingItemIndex = cart.findIndex(item => 
        item.itemId === itemId && 
        JSON.stringify(item.addOns) === JSON.stringify(validatedAddOns)
    );
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            itemId,
            itemName,
            basePrice,
            addOns: validatedAddOns,
            quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
    showNotification(`${quantity}x ${itemName} adicionado(s) ao carrinho!`);
}

// Remover item do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

// Atualizar exibição do carrinho
function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio</p>';
        cartSubtotal.textContent = 'R$ 0,00';
        cartTotal.textContent = 'R$ 5,00';
        return;
    }
    
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        
        const addOnsPrice = item.addOns.reduce((total, addOn) => total + addOn.price, 0);
        const itemTotalPrice = (item.basePrice + addOnsPrice) * item.quantity;
        subtotal += itemTotalPrice;
        
        let addOnsText = '';
        if (item.addOns.length > 0) {
            addOnsText = item.addOns.map(addOn => addOn.name).join(', ');
        }
        
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.quantity}x ${item.itemName}</div>
                ${addOnsText ? `<div class="cart-item-addons">${addOnsText}</div>` : ''}
            </div>
            <div class="cart-item-price">R$ ${itemTotalPrice.toFixed(2).replace('.', ',')}</div>
            <div class="cart-item-remove"><i class="fas fa-trash"></i></div>
        `;
        
        cartItemElement.querySelector('.cart-item-remove').addEventListener('click', () => {
            removeFromCart(index);
        });
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    const deliveryFee = 5.00;
    const total = subtotal + deliveryFee;
    
    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Finalizar pedido com validação completa
function setupCheckout() {
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Você precisa estar logado para finalizar o pedido!');
            return;
        }

        // Validar todos os itens do carrinho
        const hasInvalidItems = cart.some(item => {
            return !item.itemId || !item.itemName || isNaN(item.basePrice) || 
                   !Array.isArray(item.addOns) || item.addOns.some(addon => 
                       !addon.name || isNaN(addon.price)
                   );
        });

        if (hasInvalidItems) {
            alert('Erro: Alguns itens do carrinho estão inválidos. Por favor, revise seu pedido.');
            return;
        }

        // Formatando a mensagem para o WhatsApp
        let message = `*NOVO PEDIDO - LANCHONETE DELÍCIA*%0A%0A`;
        message += `*Cliente:*%0A`;
        message += `Nome: ${user.name}%0A`;
        message += `Telefone: ${user.phone}%0A`;
        message += `Endereço: ${user.address}%0A`;
        if (user.cpf) message += `CPF: ${user.cpf}%0A`;
        
        message += `%0A*Itens do Pedido:*%0A%0A`;
        
        let total = 0;
        
        cart.forEach(item => {
            const addOnsPrice = item.addOns.reduce((sum, addOn) => sum + addOn.price, 0);
            const itemPrice = (item.basePrice + addOnsPrice) * item.quantity;
            total += itemPrice;
            
            message += `${item.quantity}x ${item.itemName}`;
            
            if (item.addOns.length > 0) {
                message += `%0A`;
                item.addOns.forEach(addOn => {
                    message += `  - ${addOn.name}%0A`;
                });
            }
            
            message += `  Total: R$ ${itemPrice.toFixed(2).replace('.', ',')}%0A%0A`;
        });
        
        message += `*Subtotal:* R$ ${total.toFixed(2).replace('.', ',')}%0A`;
        message += `*Taxa de Entrega:* R$ 5,00%0A`;
        message += `*Total do Pedido:* R$ ${(total + 5).toFixed(2).replace('.', ',')}%0A%0A`;
        message += `*Obrigado pelo seu pedido!*`;
        
        // Limpar carrinho
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
        
        // Abrir WhatsApp
        const phone = user.phone.replace(/\D/g, '');
        window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
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

// Controles de quantidade nos modais
function setupQuantityControls() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('qty-minus')) {
            const input = e.target.nextElementSibling;
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        }
        
        if (e.target.classList.contains('qty-plus')) {
            const input = e.target.previousElementSibling;
            input.value = parseInt(input.value) + 1;
        }
    });
}

// Configurações da Conta
function setupAccountModal() {
    const accountSettings = document.getElementById('account-settings');
    const accountModal = document.getElementById('account-modal');
    const closeAccount = document.querySelector('.close-account');
    
    accountSettings.addEventListener('click', function(e) {
        e.preventDefault();
        accountModal.style.display = 'flex';
        loadAccountData();
    });
    
    closeAccount.addEventListener('click', function() {
        accountModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === accountModal) {
            accountModal.style.display = 'none';
        }
    });
    
    function loadAccountData() {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        document.getElementById('account-name').value = user.name || '';
        document.getElementById('account-phone').value = user.phone || '';
        document.getElementById('account-address').value = user.address || '';
        document.getElementById('account-cpf').value = user.cpf || '';
    }
    
    document.getElementById('account-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const user = JSON.parse(localStorage.getItem('user')) || {};
        const newPassword = document.getElementById('account-password').value;
        const confirmPassword = document.getElementById('account-confirm-password').value;
        
        if (newPassword && newPassword !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        
        user.phone = document.getElementById('account-phone').value;
        user.address = document.getElementById('account-address').value;
        user.cpf = document.getElementById('account-cpf').value;
        
        if (newPassword) user.password = newPassword;
        
        localStorage.setItem('user', JSON.stringify(user));
        alert('Dados atualizados com sucesso!');
        accountModal.style.display = 'none';
    });
}

// Máscaras para os campos
function setupInputMasks() {
    const phoneInputs = document.querySelectorAll('input[type="text"][id*="phone"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            
            if (value.length > 0) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.length > 10 
                    ? value.replace(/(\d)(\d{4})$/, '$1-$2')
                    : value.replace(/(\d)(\d{3})$/, '$1-$2');
            }
            
            e.target.value = value;
        });
    });
    
    const cpfInputs = document.querySelectorAll('input[type="text"][id*="cpf"]');
    cpfInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            
            if (value.length > 0) {
                value = value.replace(/^(\d{3})(\d)/, '$1.$2');
                value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
                value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
            }
            
            e.target.value = value;
        });
    });
}

// Logout
function setupLogout() {
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });
}

// Carrinho Sidebar
function setupCartSidebar() {
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    
    cartIcon.addEventListener('click', function() {
        cartSidebar.classList.add('open');
    });
    
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('open');
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify({
            name: "Cliente Teste",
            phone: "(11) 99999-9999",
            address: "Rua Exemplo, 123",
            cpf: "123.456.789-00"
        }));
    }
    
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