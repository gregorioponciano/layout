function showSection(sectionNumber) {
    // Oculta todas as seções
    var sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
      section.style.display = 'none';
    });
    // Exibe a seção desejada
    var sectionToShow = document.getElementById('section' + sectionNumber);
    sectionToShow.style.display = 'flex';
    sectionToShow.classList.add('active');
    // Remove a classe 'active' de todas as seções, exceto da seção atual
    sections.forEach(function(section) {
      if (section !== sectionToShow) {
        section.classList.remove('active');
      }
    });
  }


  
  