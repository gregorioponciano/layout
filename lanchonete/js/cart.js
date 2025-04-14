document.addEventListener('DOMContentLoaded', function() {
    // Variáveis globais
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
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
    
    // Adicionar item ao carrinho
    function addToCart(itemId, itemName, basePrice, addOns, quantity) {
        // Verificar se já existe um item igual no carrinho
        const existingItemIndex = cart.findIndex(item => 
            item.itemId === itemId && 
            JSON.stringify(item.addOns) === JSON.stringify(addOns)
        );
        
        if (existingItemIndex !== -1) {
            // Se já existe, apenas aumenta a quantidade
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Se não existe, adiciona novo item
            cart.push({
                itemId,
                itemName,
                basePrice,
                addOns,
                quantity
            });
        }
        
        // Atualizar localStorage e interface
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
        
        // Mostrar notificação
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
            cartTotal.textContent = 'R$ 5,00'; // Taxa de entrega mínima
            return;
        }
        
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            
            // Calcular preço do item com adicionais
            const addOnsPrice = item.addOns.reduce((total, addOn) => total + addOn.price, 0);
            const itemTotalPrice = (item.basePrice + addOnsPrice) * item.quantity;
            subtotal += itemTotalPrice;
            
            // Criar string de adicionais
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
            
            // Adicionar evento de remover item
            cartItemElement.querySelector('.cart-item-remove').addEventListener('click', () => {
                removeFromCart(index);
            });
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Atualizar totais
        const deliveryFee = 5.00;
        const total = subtotal + deliveryFee;
        
        cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
    
    // Finalizar pedido
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
        
        // Formatando a mensagem para o WhatsApp
        let message = `*NOVO PEDIDO - LANCHONETE DELÍCIA*%0A%0A`;
        message += `*Cliente:*%0A`;
        message += `Nome: ${user.name}%0A`;
        message += `Telefone: ${user.phone}%0A`;
        message += `Endereço: ${user.address}%0A`;
        if (user.cpf) {
            message += `CPF: ${user.cpf}%0A`;
        }
        
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
    
    // Event listeners para botões "Adicionar"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-item-id');
            const itemCard = this.closest('.menu-item');
            const itemName = itemCard.querySelector('h3').textContent;
            const basePrice = parseFloat(itemCard.querySelector('.item-price').textContent.replace('R$ ', '').replace(',', '.'));
            
            // Abrir modal de adicionais
            const addonsModal = itemCard.querySelector('.addons-modal');
            addonsModal.style.display = 'flex';
            
            // Configurar botão de confirmar no modal
            const confirmBtn = addonsModal.querySelector('.confirm-addons');
            
            confirmBtn.onclick = function() {
                // Obter adicionais selecionados
                const addOns = [];
                const checkboxes = addonsModal.querySelectorAll('.addon-item input:checked');
                checkboxes.forEach(checkbox => {
                    addOns.push({
                        name: checkbox.nextElementSibling.textContent.replace(' (+R$ ', '').replace(',00)', ''),
                        price: parseFloat(checkbox.dataset.price)
                    });
                });
                
                // Obter quantidade
                const quantity = parseInt(addonsModal.querySelector('.qty-input').value);
                
                // Adicionar ao carrinho
                addToCart(itemId, itemName, basePrice, addOns, quantity);
                
                // Fechar modal
                addonsModal.style.display = 'none';
            };
        });
    });
    
    // Fechar modais de adicionais
    document.querySelectorAll('.close-addons').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.addons-modal').style.display = 'none';
        });
    });
    
    // Controles de quantidade nos modais
    document.querySelectorAll('.qty-minus').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.nextElementSibling;
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });
    
    document.querySelectorAll('.qty-plus').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            input.value = parseInt(input.value) + 1;
        });
    });
    
    // Inicializar carrinho
    updateCartDisplay();
    updateCartCount();
});