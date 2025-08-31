document.addEventListener('DOMContentLoaded', () => {

    const menuItems = document.querySelectorAll('.li-menu-inferior');
    const allModals = document.querySelectorAll('.modal');

    // Funções de utilidade para gerenciar a visibilidade e as imagens
    function closeAllModalsAndResetMenu() {
        allModals.forEach(modal => {
            modal.classList.remove('active');
        });
        menuItems.forEach(item => {
            item.classList.remove('active-menu');
            const imgElement = item.querySelector('.img-menu-inferior');
            if (imgElement && imgElement.dataset.normalSrc) {
                imgElement.src = imgElement.dataset.normalSrc;
            }
        });
    }

    // Adiciona o evento de clique a cada item do menu
    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            closeAllModalsAndResetMenu();

            const modalId = item.dataset.modalId;

            // Lógica para o botão "Home" (não abre modal)
            if (modalId === 'home') {
                item.classList.add('active-menu');
                const imgElement = item.querySelector('.img-menu-inferior');
                if (imgElement && imgElement.dataset.activeSrc) {
                    imgElement.src = imgElement.dataset.activeSrc;
                }
                return; // Encerra a função, pois não há modal para abrir
            }

            // Lógica para os outros itens (abrem modal)
            const modal = document.getElementById(`modal-${modalId}`);
            if (modal) {
                modal.classList.add('active');
                item.classList.add('active-menu');
                const imgElement = item.querySelector('.img-menu-inferior');
                if (imgElement && imgElement.dataset.activeSrc) {
                    imgElement.src = imgElement.dataset.activeSrc;
                }
            }
        });
    });

    // Inicia a página com o item "Home" ativado
    const homeItem = document.querySelector('.li-menu-inferior[data-modal-id="home"]');
    if (homeItem) {
        homeItem.classList.add('active-menu');
        const imgElement = homeItem.querySelector('.img-menu-inferior');
        if (imgElement && imgElement.dataset.activeSrc) {
            imgElement.src = imgElement.dataset.activeSrc;
        }
    }
});