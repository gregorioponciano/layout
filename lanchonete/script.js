
var selectedItemPrice = 0;

function showMenu(item, price) {
    document.getElementById('selectedItem').textContent = item; //seleciona o item "produto"
    selectedItemPrice = price;  //seleciona o valor do produto
    document.getElementById('menuOverlay').style.display = 'block'; //abre o modal de compra "carrinho"
}

function addToCart() {
    var selectedItem = document.getElementById('selectedItem').textContent;
    var quantity = parseInt(document.getElementById('quantity').value);
    var total = selectedItemPrice * quantity;

    if (!selectedItem || selectedItem === 'Item selecionado') {
        alert('Selecione um item antes de adicionar ao carrinho!');
        return;
    }

    if (!quantity || quantity < 1) {
        alert('Insira uma quantidade válida!');
        return;
    }

    var cartItems = document.getElementById('cartItems');
    var li = document.createElement('li');
    li.textContent = selectedItem + ' - Quantidade: ' + quantity + ' - Total: R$ ' + total.toFixed(2); // toFixed(2) 3.14126535 retornará "3.14"
    cartItems.appendChild(li);

    updateTotal(total); //soma todos os produtos no resultado final
    closeMenu();    // fecha o carrinho de compra quando clicar para add no carrinho
}

function updateTotal(price) {
    var totalElement = document.getElementById('total');
    var currentTotal = parseFloat(totalElement.textContent.replace('R$ ', ''));
    totalElement.textContent = 'R$ ' + (currentTotal + price).toFixed(2);
}
            // diminui a quantidade de um produto
function decrementQuantity() {
    var quantityInput = document.getElementById('quantity');
    var currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
    }
}
            // aumenta a quantidade de um produto
function incrementQuantity() {
    var quantityInput = document.getElementById('quantity');
    var currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
}

function closeMenu() {
    document.getElementById('menuOverlay').style.display = 'none';  // fechar carrinho de compra
}
