
// ADICIONAR ATIVO AO CLIQUE
var menuItem = document.querySelectorAll('.item-menu');

function selectLink(){
    menuItem.forEach((item) =>
       item.classList.remove('ativo')
    )
    this.classList.add('ativo')
}

menuItem.forEach((item)=>
 item.addEventListener('click', selectLink)
)

var btnExp = document.querySelector('#btn-exp');
var navBar = document.querySelector('.menu-lateral')

btnExp.addEventListener('click', function(){
    navBar.classList.toggle('expandir')
})

document.addEventListener('DOMContentLoaded', function() {
    const btnNotificacoes = document.getElementById('modal-notificacoes');

    btnNotificacoes.addEventListener('click', function() {
        // Realize a requisição AJAX para a rota /notificacoes no servidor
        fetch('/notificacoes', {
            method: 'GET'
            // Adicione outras opções de requisição, como cabeçalhos, conforme necessário
        })
        .then(response => {
            // Lógica para lidar com a resposta do servidor
            if (response.status === 200) {
                // A resposta foi bem-sucedida (status 200)
                // Você pode adicionar aqui a lógica para processar a resposta, se necessário.
            } else {
                // Lidar com possíveis erros de resposta
                console.error('Erro na requisição: ' + response.statusText);
            }
        })
        .catch(error => {
            // Lidar com erros de rede ou outras exceções
            console.error('Erro na requisição: ' + error);
        });
    });
});



   
  