        var detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
    
        detailsModal._element.addEventListener('show.bs.modal', 
function (event) {
        var button = event.relatedTarget;
        var title = button.getAttribute('data-title');
        var content = button.getAttribute('data-content');
        
        var modalTitle = document.getElementById('detailsModalLabel');
        var modalContent = document.getElementById('modal-content');
    
        modalTitle.textContent = title;
        modalContent.textContent = content;
    });