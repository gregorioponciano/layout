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
            ],
            ingredientesPadrao: ["Queijo", "Tomate", "Alface", "Cebola"]
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
            ],
            ingredientesPadrao: ["Queijo", "Tomate", "Alface", "Cebola"]
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
            ],
            ingredientesPadrao: ["Queijo", "Tomate", "Alface", "Cebola"]
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
            ],
            ingredientesPadrao: ["Queijo", "Tomate", "Alface", "Cebola"]
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
            ],
            ingredientesPadrao: ["Queijo", "Tomate", "Alface", "Cebola"]
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
            ],
            ingredientesPadrao: ["Queijo", "Tomate", "Alface", "Cebola"]
        }
    ],
    bebidas: [        { 
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
let selectedPaymentMethod = null;
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notification-message');

// Função para formatar valor monetário
function formatMoney(value) {
    return value.toFixed(2).replace('.', ',');
}

// Renderizar o Cardápio (mantido igual)
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
                    <div class="item-price">R$ ${formatMoney(item.preco)}</div>
                    <button class="btn add-to-cart" data-item-id="${item.id}">Adicionar</button>
                </div>
            `;
            
            // Modal de Adicionais e Remoção
            const modalElement = document.createElement('div');
            modalElement.className = 'addons-modal';
            modalElement.id = `addons-modal-${item.id}`;
            
            let addonsHTML = '';
            if (item.adicionais && item.adicionais.length > 0) {
                addonsHTML = item.adicionais.map((addon, index) => `
                    <div class="addon-item">
                        <input type="checkbox" id="addon-${item.id}-${index}" data-price="${addon.preco}">
                        <label for="addon-${item.id}-${index}">${addon.nome} (+R$ ${formatMoney(addon.preco)})</label>
                    </div>
                `).join('');
            } else {
                addonsHTML = '<p>Nenhum adicional disponível para este item.</p>';
            }
            
            let removeOptionsHTML = '';
            if (item.ingredientesPadrao && item.ingredientesPadrao.length > 0) {
                removeOptionsHTML = `
                    <div class="remove-ingredients">
                        <div class="remove-title">Remover ingredientes:</div>
                        ${item.ingredientesPadrao.map((ingrediente, index) => `
                            <div class="remove-option">
                                <input type="checkbox" id="remove-${item.id}-${index}">
                                <label for="remove-${item.id}-${index}">${ingrediente}</label>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            
            modalElement.innerHTML = `
                <div class="modal-content">
                    <span class="close-addons">&times;</span>
                    <h3>${item.nome} - Personalizar</h3>
                    <div class="addons-list">
                        <h4>Adicionais:</h4>
                        ${addonsHTML}
                    </div>
                    ${removeOptionsHTML}
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

// Sistema de Filtros (mantido igual)
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

// Sistema de Busca (mantido igual)
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        document.querySelectorAll('.menu-section').forEach(section => {
            section.classList.add('active');
        });
        
        if (searchTerm === '') {
            document.querySelector('.category-btn.active').click();
            return;
        }
        
        let foundItems = false;
        document.querySelectorAll('.menu-item').forEach(item => {
            const name = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
                foundItems = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        if (!foundItems) {
            const menuSections = document.querySelector('.menu-sections');
            if (!menuSections.querySelector('.no-results')) {
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.textContent = 'Nenhum item encontrado. Tente outro termo.';
                menuSections.appendChild(noResults);
            }
        } else {
            const noResults = document.querySelector('.no-results');
            if (noResults) noResults.remove();
        }
    });
}

// Atualizar contador do carrinho (mantido igual)
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Mostrar notificação (mantido igual)
function showNotification(message) {
    notificationMessage.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Adicionar item ao carrinho (mantido igual)
function addToCart(itemId, itemName, basePrice, addOns, quantity, removedItems = []) {
    const validatedAddOns = addOns.filter(addon => 
        addon && addon.name && addon.name.trim() !== "" && !isNaN(addon.price)
    );

    const existingItemIndex = cart.findIndex(item => 
        item.itemId === itemId && 
        JSON.stringify(item.addOns) === JSON.stringify(validatedAddOns) &&
        JSON.stringify(item.removedItems) === JSON.stringify(removedItems)
    );
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            itemId,
            itemName,
            basePrice,
            addOns: validatedAddOns,
            removedItems,
            quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
    showNotification(`${quantity}x ${itemName} adicionado(s) ao carrinho!`);
}

// Remover item do carrinho (mantido igual)
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

// Atualizar exibição do carrinho (mantido igual)
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
        
        let removedText = '';
        if (item.removedItems && item.removedItems.length > 0) {
            removedText = item.removedItems.map(item => `Sem ${item}`).join(', ');
        }
        
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.quantity}x ${item.itemName}</div>
                ${addOnsText ? `<div class="cart-item-addons">Adicionais: ${addOnsText}</div>` : ''}
                ${removedText ? `<div class="cart-item-removed">${removedText}</div>` : ''}
            </div>
            <div class="cart-item-price">R$ ${formatMoney(itemTotalPrice)}</div>
            <div class="cart-item-remove"><i class="fas fa-trash"></i></div>
        `;
        
        cartItemElement.querySelector('.cart-item-remove').addEventListener('click', () => {
            removeFromCart(index);
        });
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    const deliveryFee = 5.00;
    const total = subtotal + deliveryFee;
    
    cartSubtotal.textContent = `R$ ${formatMoney(subtotal)}`;
    cartTotal.textContent = `R$ ${formatMoney(total)}`;
}

// Configurar eventos dos botões "Adicionar" (mantido igual)
function setupAddToCartButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const itemId = parseInt(e.target.getAttribute('data-item-id'));
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
                
                const removedItems = [];
                const removeCheckboxes = addonsModal.querySelectorAll('.remove-option input:checked');
                
                removeCheckboxes.forEach(checkbox => {
                    const name = checkbox.nextElementSibling.textContent.trim();
                    removedItems.push(name);
                });
                
                const quantityInput = addonsModal.querySelector('.qty-input');
                const quantity = parseInt(quantityInput.value) || 1;
                
                if (quantity < 1) {
                    alert('Quantidade deve ser pelo menos 1');
                    return;
                }

                addToCart(itemId, itemName, basePrice, addOns, quantity, removedItems);
                addonsModal.style.display = 'none';
            };
        }
    });
}

// Fechar modais de adicionais (mantido igual)
function setupCloseAddonsModals() {
    document.querySelectorAll('.close-addons').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.addons-modal').style.display = 'none';
        });
    });
}

// Controles de quantidade nos modais (mantido igual)
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

// Configurações da Conta (mantido igual)
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
        
        user.name = document.getElementById('account-name').value;
        user.phone = document.getElementById('account-phone').value;
        user.address = document.getElementById('account-address').value;
        user.cpf = document.getElementById('account-cpf').value;
        
        if (newPassword) user.password = newPassword;
        
        localStorage.setItem('user', JSON.stringify(user));
        alert('Dados atualizados com sucesso!');
        accountModal.style.display = 'none';
    });
}

// Sistema de Pagamento (MODIFICADO para enviar todos os dados)
function setupPaymentModal() {
    const paymentModal = document.getElementById('payment-modal');
    const closePayment = document.querySelector('.close-payment');
    const paymentOptions = document.querySelectorAll('.payment-option');
    const paymentDetails = document.getElementById('payment-details');
    const confirmPaymentBtn = document.querySelector('.confirm-payment');
    const checkoutBtn = document.getElementById('checkout-btn');

    checkoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        paymentModal.style.display = 'flex';
    });

    closePayment.addEventListener('click', function() {
        paymentModal.style.display = 'none';
    });

    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedPaymentMethod = this.getAttribute('data-type');
            
            paymentDetails.style.display = 'block';
            switch(selectedPaymentMethod) {
                case 'pix':
                    paymentDetails.innerHTML = `
                        <p>Você receberá um QR Code para pagamento via PIX</p>
                        <p><strong>Vantagens:</strong> Pagamento instantâneo e sem taxas</p>
                    `;
                    break;
                case 'credit':
                    paymentDetails.innerHTML = `
                        <p>Será redirecionado para um ambiente seguro de pagamento</p>
                        <p><strong>Taxa:</strong> 2,99% por parcela</p>
                    `;
                    break;
                case 'debit':
                    paymentDetails.innerHTML = `
                        <p>Será redirecionado para um ambiente seguro de pagamento</p>
                        <p><strong>Taxa:</strong> R$ 1,50 por pedido</p>
                    `;
                    break;
                case 'cash':
                    paymentDetails.innerHTML = `
                        <p>Pagamento na entrega com troco para:</p>
                        <input type="text" id="cash-change" placeholder="Valor para troco (opcional)">
                    `;
                    break;
            }
        });
    });

    confirmPaymentBtn.addEventListener('click', function() {
        if (!selectedPaymentMethod) {
            alert('Por favor, selecione uma forma de pagamento');
            return;
        }

        // Obter dados do usuário
        const user = JSON.parse(localStorage.getItem('user')) || {};
        const { name, phone, address, cpf } = user;

        // Construir mensagem dos itens do carrinho
        let cartMessage = '';
        let subtotal = 0;
        
        cart.forEach((item) => {
            const addOnsPrice = item.addOns.reduce((total, addOn) => total + addOn.price, 0);
            const itemTotalPrice = (item.basePrice + addOnsPrice) * item.quantity;
            subtotal += itemTotalPrice;
            
            let addOnsText = item.addOns.map(addOn => addOn.name).join(', ');
            let removedText = item.removedItems ? item.removedItems.map(item => `Sem ${item}`).join(', ') : '';
            
            cartMessage += `*${item.quantity}x ${item.itemName}* - R$ ${formatMoney(itemTotalPrice)}%0A`;
            if (addOnsText) cartMessage += `Adicionais: ${addOnsText}%0A`;
            if (removedText) cartMessage += `Remoções: ${removedText}%0A`;
            cartMessage += `%0A`;
        });

        const deliveryFee = 5.00;
        const total = subtotal + deliveryFee;

        // Construir mensagem completa para WhatsApp
 let message = `*NOVO PEDIDO*\n\n`;
message += `*DADOS DO CLIENTE*\n`;
message += `Nome: ${name || 'Não informado'}\n`;
message += `Telefone: ${phone || 'Não informado'}\n`;
message += `CPF: ${cpf || 'Não informado'}\n`;
message += `Endereço: ${address || 'Não informado'}\n\n`;

message += `*ITENS DO PEDIDO*\n`;
message += cartMessage;

message += `*TOTAL DO PEDIDO*\n`;
message += `Subtotal: R$ ${formatMoney(subtotal)}\n`;
message += `Taxa de entrega: R$ ${formatMoney(deliveryFee)}\n`;
message += `Total: R$ ${formatMoney(total)}\n\n`;

message += `*FORMA DE PAGAMENTO*\n`;
message += `Método: ${selectedPaymentMethod.toUpperCase()}\n`;

if (selectedPaymentMethod === 'cash') {
    const changeFor = document.getElementById('cash-change').value;
    if (changeFor) message += `Troco para: ${changeFor}\n`;
}

// abrir WhatsApp
const whatsappNumber = '5514991761256';
window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
        
        paymentModal.style.display = 'none';
    });
}

// Máscaras para os campos (mantido igual)
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

// Logout (mantido igual)
function setupLogout() {
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('user');
        window.location.href = 'inicio.html';
    });
}

// Carrinho Sidebar (mantido igual)
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

// Inicialização (mantido igual)
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify({
            name: "Nome do Cliente",
            phone: "(14) 99999-9999",
            address: "Bairro e rua",
            cpf: "123.456.789-00"
        }));
    }
    
    renderizarCardapio();
    setupCategoryFilters();
    setupSearch();
    setupAddToCartButtons();
    setupCloseAddonsModals();
    setupQuantityControls();
    setupCartSidebar();
    setupAccountModal();
    setupPaymentModal();
    setupInputMasks();
    setupLogout();
    
    updateCartDisplay();
    updateCartCount();
});