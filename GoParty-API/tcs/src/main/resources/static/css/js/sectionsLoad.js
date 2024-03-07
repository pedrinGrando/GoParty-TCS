//SECTIONS
const feed = document.getElementById("feed-section");
const explorar = document.getElementById("usuarios-section");
const postar = document.getElementById("criar-evento-section");

//LINKS
const linkHome = document.getElementById("linkHome");

document.addEventListener('DOMContentLoaded', function() {
    // Obtenha todos os links de navegação
    var navLinks = document.querySelectorAll('.nav-link');

    // Função para carregar a seção
    function loadSection(event) {
        event.preventDefault();

        // Obtenha o identificador da seção e a rota do controlador
        var sectionId = this.getAttribute('href');
        var rota = this.getAttribute('data-rota');

        // Oculte a seção atual
        var sections = document.querySelectorAll('.section');
        sections.forEach(function(section) {
            section.style.display = 'none';
        });

        // Faça uma requisição AJAX para obter o conteúdo da seção do controlador
        var xhr = new XMLHttpRequest();
        xhr.open('GET', rota, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Exiba o conteúdo da seção com uma animação suave
                var section = document.querySelector(sectionId);
                section.innerHTML = xhr.responseText;
                section.style.display = 'block';
            }
        };
        xhr.send();
    }

    // Associe a função loadSection ao clique em cada link de navegação
    navLinks.forEach(function(navLink) {
        navLink.addEventListener('click', loadSection);
    });

    // Adicione um ouvinte de evento de clique ao link
      linkHome.addEventListener('click', function(event) {
        event.preventDefault(); // Não recarrega a página

        // Oculte o elemento "linkHome" definindo seu estilo display como 'none'
        explorar.style.display = 'none';
        postar.style.display = 'none';
        feed.style.display = 'block';

        console.log("Funcionou Função!")
     });

});

