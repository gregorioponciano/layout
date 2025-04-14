document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const accountSettings = document.getElementById('account-settings');
    const accountModal = document.getElementById('account-modal');
    const closeAccount = document.querySelector('.close-account');
    const logoutBtn = document.getElementById('logout');
    
    // Abrir/fechar carrinho
    cartIcon.addEventListener('click', function() {
        cartSidebar.classList.add('open');
    });
    
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('open');
    });
    
    // Abrir/fechar modal de conta
    accountSettings.addEventListener('click', function(e) {
        e.preventDefault();
        accountModal.style.display = 'flex';
        loadAccountData();
    });
    
    closeAccount.addEventListener('click', function() {
        accountModal.style.display = 'none';
    });
    
    // Logout
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });
    
    // Fechar modais ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target === accountModal) {
            accountModal.style.display = 'none';
        }
    });
    
    // Carregar dados da conta
    function loadAccountData() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            document.getElementById('account-name').value = user.name || '';
            document.getElementById('account-phone').value = user.phone || '';
            document.getElementById('account-address').value = user.address || '';
            document.getElementById('account-cpf').value = user.cpf || '';
        }
    }
    
    // Salvar dados da conta
    document.getElementById('account-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const user = JSON.parse(localStorage.getItem('user')) || {};
        const newPassword = document.getElementById('account-password').value;
        const confirmPassword = document.getElementById('account-confirm-password').value;
        
        if (newPassword && newPassword !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        
        // Atualizar dados do usuário
        user.phone = document.getElementById('account-phone').value;
        user.address = document.getElementById('account-address').value;
        user.cpf = document.getElementById('account-cpf').value;
        
        if (newPassword) {
            user.password = newPassword;
        }
        
        // Simular atualização no banco de dados
        localStorage.setItem('user', JSON.stringify(user));
        
        alert('Dados atualizados com sucesso!');
        accountModal.style.display = 'none';
    });
    
    // Máscaras para os campos
    const phoneInputs = document.querySelectorAll('input[type="text"][id*="phone"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            
            if (value.length > 0) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                if (value.length > 10) {
                    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                } else {
                    value = value.replace(/(\d)(\d{3})$/, '$1-$2');
                }
            }
            
            e.target.value = value;
        });
    });
    
    const cpfInputs = document.querySelectorAll('input[type="text"][id*="cpf"]');
    cpfInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            
            if (value.length > 0) {
                value = value.replace(/^(\d{3})(\d)/, '$1.$2');
                value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
                value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
            }
            
            e.target.value = value;
        });
    });
});