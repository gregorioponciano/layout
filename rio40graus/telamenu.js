var burg = document.querySelector('#burg')
var fechar = document.querySelector('#fechar')
var aparecer = document.querySelector('#section-menu')

function clickMenu() { 

             aparecer.style.display = 'block'
             burg.style.display = 'none'
             fechar.style.display = 'block'   
}
function closeMenu() {
            aparecer.style.display = "none"
            fechar.style.display = 'none'
            burg.style.display = 'block'
   
}


     