 // elemento <a> com a classe "links"
 var meuLink = document.getElementById("meuLink");
 var homeLink = document.getElementById("home-link");
 var notificLink = document.getElementById("notificacoes-link");
 var usuariosLink = document.getElementById("usuarios-link");


 //as seções
 var feedSection = document.getElementById("feed-section");
 var criarEventoSection = document.getElementById("criar-evento-section");
 var notiSection = document.getElementById("secaoNotificacoes");
 var usuariosSection = document.getElementById("usuarios-section");

 // BARS
 var leftSideBarUsuario = document.getElementById("left-side-bar-id");
 

 // Adiciona um ouvinte de evento de clique ao link
 meuLink.addEventListener("click", function() {

    var botoes = document.querySelectorAll(".icon");
    botoes.forEach(function(item) {
        item.classList.remove("active-button");
    });

     // Altera o estilo das seções para ocultar/exibir
     feedSection.style.display = "none";
     notiSection.style.display = "none";
     usuariosSection.style.display = "none";
     criarEventoSection.style.display = "flex";
     iconeBotao.classList.add("active-button");

     window.location.href = '/evento';
     
 });
 
  //ouvinte de evento de clique ao link
  homeLink.addEventListener("click", function() {

    var botoes = document.querySelectorAll(".icon");
    botoes.forEach(function(item) {
        item.classList.remove("active-button");
    });
    // Altera o estilo das seções para ocultar/exibir
    criarEventoSection.style.display = "none";
    notiSection.style.display = "none";
    usuariosSection.style.display = "none";
    feedSection.style.display = "";
    iconeBotaoHome.classList.add("active-button");

    window.location.href = '/home';
});

 //ouvinte de evento de clique ao link
 usuariosLink.addEventListener("click", function() {

    var botoes = document.querySelectorAll(".icon");
    botoes.forEach(function(item) {
        item.classList.remove("active-button");
    });
    // Altera o estilo das seções para ocultar/exibir
    criarEventoSection.style.display = "none";
    notiSection.style.display = "none";
    feedSection.style.display = "none";
    leftSideBarUsuario.style.display = "none";
    usuariosSection.style.display = "";

    iconeBotaoUsuarios.classList.add("active-button");

    window.location.href = '/usuarios';

});


// TESTE

$(document).ready(function() {
    $('#notificacoes-link').click(function() {
        // Faça uma solicitação AJAX para a URL /notificacoes
        $.get('/notificacoes', function(data) {
            // Manipule a resposta JSON para atualizar a página
            // Exemplo: atualize a seção de notificações
            $('#secaoNotificacoes').html('<pre>' + JSON.stringify(data, null, 2) + '</pre>');
            $('#secaoNotificacoes').show();
        });
    });
});

 console.log("funcionou!")

 