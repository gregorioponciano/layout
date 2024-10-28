 // Variáveis globais para armazenar itens do carrinho
 let cart = [];
 let total = 0;

 // Função para abrir o modal do carrinho
 function openModal(modalId) {
     document.getElementById(modalId).style.display = 'flex';
     document.getElementById(modalId).classList.add('fade-in');
 }

 // Função para fechar o modal do carrinho
 function closeModalCarrinho(modalId) {
     document.getElementById(modalId).style.display = 'none';
 }

 // Função para confirmar a adição ao carrinho
 function confirmAddToCart(name, price) {
     const confirmed = confirm(`Você deseja adicionar ${name} ao carrinho por R$${price.toFixed(2)}?`);
     if (confirmed) {
         addToCart(name, price);
     }
 }

 // Função para adicionar item ao carrinho
 function addToCart(name, price) {
     cart.push({ name, price });
     total += price;

     // Atualiza o carrinho na interface
     updateCart();
 }

 // Função para remover item do carrinho
 function removeFromCart(index) {
     total -= cart[index].price; // Remove o preço do total
     cart.splice(index, 1); // Remove o item do carrinho
     updateCart(); // Atualiza o carrinho na interface
 }

 // Função para atualizar a visualização do carrinho
 function updateCart() {
     const cartItems = document.getElementById('cartItems');
     cartItems.innerHTML = ''; // Limpa itens atuais

     if (cart.length === 0) {
         cartItems.innerHTML = '<p>Seu carrinho está vazio.</p>';
     } else {
         cart.forEach((item, index) => {
             const itemElement = document.createElement('div');
             itemElement.innerHTML = `${item.name} - R$${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remover</button>`;
             cartItems.appendChild(itemElement);
         });
     }

     // Atualiza o total
     document.getElementById('totalPrice').innerHTML = `<h3>Total: R$${total.toFixed(2)}</h3>`;
 }

 // Função para finalizar o pedido
 function checkout() {
     alert('Pedido finalizado! Total: R$' + total.toFixed(2));
     // Reseta o carrinho
     cart = [];
     total = 0;
     updateCart();
     closeModalCarrinho('cartModal');
 }