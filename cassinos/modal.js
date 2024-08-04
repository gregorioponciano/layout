function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

//modal fullscreen afiliado

        function openFullscreenModal() {
            const modalScreen = document.getElementById('fullscreenModal');
            modalScreen.style.display = 'block';
            setTimeout(() => {
                modalScreen.classList.add('show');
            }, 10); // Delay necessário para acionar a transição
        }

        function closeFullscreenModal() {
            const modalScreen = document.getElementById('fullscreenModal');
            modalScreen.classList.remove('show');
            setTimeout(() => {
                modalScreen.style.display = 'none';
            }, 500); // Tempo deve coincidir com o da transição
        }

        window.onclick = function(event) {
            const modalScreen = document.getElementById('fullscreenModal');
            if (event.target == modalScreen) {
                closeFullscreenModal();
            }
        }