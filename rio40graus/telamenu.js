var burg = document.querySelector('#burg')
var fechar = document.querySelector('#fechar')

function clickMenu() { 

             itens.style.display = 'block'
             burg.style.display = 'none'
             fechar.style.display = 'block'   
}
function closeMenu() {
    itens.style.display = "none"
    fechar.style.display = 'none'
    burg.style.display = 'block'
   
}

function mudouTamanho() {
            if (window.innerWidth >= 600) {
                itens.style.display = 'inline-block'
            } else {
                itens.style.display = 'none'
            }
        }
     