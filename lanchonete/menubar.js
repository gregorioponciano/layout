function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}


// abre as categoria Porções, Pizza, Lanches, Bebidas etc
function toggleOptions(category) {
    var options = document.getElementById(category);
    if (options.style.display === 'none') {
    options.style.display = 'block';
    } else {
    options.style.display = 'none';
}
}
