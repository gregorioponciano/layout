
var navigationHeader = document.getElementById('blibliotecas');
var showSidebar = false;

function toggleSidebar() 
{
    showSidebar = !showSidebar;
    if(showSidebar) 
    {
        navigationHeader.style.marginLeft = '-0vw';
        navigationHeader.style.animationName = 'showSidebar';    // animaçao abrir o menu devagar ligado a @keyframe na css
       // content.style.filter = 'blur(2px)';                      // embassa com filtro embassado
    }
    else 
    {
        navigationHeader.style.marginLeft = '-150vw';
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

