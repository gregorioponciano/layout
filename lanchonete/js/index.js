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

// Renderizar o Cardápio mostra o cardapio na tela
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

// Sistema de Filtros modal lanches bebidas
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


