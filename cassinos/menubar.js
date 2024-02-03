var header = document.getElementById('header');
var navigationHeader = document.getElementById('navigation_header');
var content = document.getElementById('content');
var showSidebar = false;

function toggleSidebar() 
{
    showSidebar = !showSidebar;
    if(showSidebar) 
    {
        navigationHeader.style.marginLeft = '-10vw';
        navigationHeader.style.animationName = 'showSidebar';    // animaçao abrir o menu devagar ligado a @keyframe na css
       // content.style.filter = 'blur(2px)';                      // embassa com filtro embassado
    }
    else 
    {
        navigationHeader.style.marginLeft = '-100vw';
        navigationHeader.style.animationName = '';              // remove animaçao abrir o menu devagar ligado a @keyframe na css
        content.style.filter = '';                              // remove o filtro embassado
    }
} 

    //para fechar o menu clicando fora 

function closeSidebar() {
    if(showSidebar) {

    }
    toggleSidebar();
}

     // mudou tamanho da tela tira o filtro da tela grnade

window.addEventListener('resize', function(event) {
    if(window.innerWidth > 768 && showSidebar) {
        toggleSidebar();
    }
});