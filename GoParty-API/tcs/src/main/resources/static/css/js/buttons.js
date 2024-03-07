// Função para aparecer os comentarios 
function toggleComentarios(button) {
    // Encontre o elemento pai que contém o botão e os comentários
    const parent = button.closest('.evento-bloco');

    // Encontre a div de comentários dentro do elemento pai
    const comentariosDiv = parent.querySelector('.comentarios');

    // Alternar a classe hidden nas divs de comentários
    if (comentariosDiv.classList.contains('hidden')) {
        comentariosDiv.classList.remove('hidden');
    } else {
        comentariosDiv.classList.add('hidden');
    }
}



window.onclick = function (event) {
    var modal = document.getElementById("modalNotificacao");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Função para abrir modal das Configuração
function openModalConfiguracao() {
    var modal = document.getElementById("modalConfiguracao");
    modal.style.display = "flex";
}

// Função para abrir modal das Configuração
function openModalDevs() {
    var modal = document.getElementById("modalDevs");
    modal.style.display = "flex";
}

function openModalChat(){
    var modal = document.getElementById("modalChat");
    modal.style.display = "flex";
}

function fecharModalConfiguracao() {
    var modal = document.getElementById("modalConfiguracao");
    modal.style.display = "none";
}

function fecharModalChats() {
    var modal = document.getElementById("modalChat");
    modal.style.display = "none";
}

function fecharModalDevs() {
    var modal = document.getElementById("modalDevs");
    modal.style.display = "none";
}

window.onclick = function (event) {
    var modal = document.getElementById("modalConfiguracao");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Função para abrir edições
function abrirEdicao() {
    var blocoEdicao = document.getElementById('blocoEdicao');
            if (blocoEdicao.style.display === 'none' || blocoEdicao.style.display === '') {
                blocoEdicao.style.display = 'flex';
            } else {
                blocoEdicao.style.display = 'none';
            }
}

// Função para abrir Temas
function abrirTemas() {
    var blocoTemas = document.getElementById('blocoTemas');
            if (blocoTemas.style.display === 'none' || blocoTemas.style.display === '') {
                blocoTemas.style.display = 'block';
            } else {
                blocoTemas.style.display = 'none';
            }
}

function darkMode() {
    var body = document.body;
    body.style.background = "#040b26";
    localStorage.setItem('theme', 'dark');
}
  
  function lightMode() {
    var body = document.body;
    body.style.background = "#bdbdbd";
    localStorage.setItem('theme', 'light');
  }
  
  // Verificar a preferência de tema ao carregar a página
  window.addEventListener('load', function () {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      darkMode();
    } else {
      lightMode();
    }
  });
  

// Função para abrir Excluir Conta
function abrirExcluir() {
    var blocoExcluir = document.getElementById('blocoExcluir');
            if (blocoExcluir.style.display === 'none' || blocoExcluir.style.display === '') {
                blocoExcluir.style.display = 'flex';
            } else {
                blocoExcluir.style.display = 'none';
            }
}

//Função Abrir Bloco de Comprar Ingresso
function abrirCompra(btn) {
    // Encontrar o bloco de compra associado a este botão
    const eventoBloco = btn.closest('.evento-bloco');
    const blocoCompra = eventoBloco.querySelector('.bloco-evento-compra');

    // Verificar se o bloco de compra está visível ou não
    const estaVisivel = getComputedStyle(blocoCompra).display !== 'none';

    // Alternar a exibição do bloco de compra
    if (estaVisivel) {
        blocoCompra.style.display = 'none';
    } else {
        // Ocultar todos os blocos de compra
        const blocosCompra = document.querySelectorAll('.bloco-evento-compra');
        blocosCompra.forEach((bloco) => {
            bloco.style.display = 'none';
        });

        // Exibir apenas o bloco de compra associado a este botão
        blocoCompra.style.display = 'block';
    }
}

function abrirConfirmados(btn) {
    const eventoBloco = btn.closest('.evento-bloco');
    const blocoConfirmados = eventoBloco.querySelector('.bloco-evento-confirmados');
    const estaVisivel = getComputedStyle(blocoConfirmados).display !== 'none';

    
    if (estaVisivel) {
        blocoConfirmados.style.display = 'none';
    } else {
        const blocosConfirmados = document.querySelectorAll('.bloco-evento-confirmados');
        blocosConfirmados.forEach((bloco) => {
            bloco.style.display = 'none';
        });

        blocoConfirmados.style.display = 'block';
    }
}

//Requisição de curtida
function checkboxChanged(checkbox) {
    const eventoId = checkbox.getAttribute('data-evento-id');
    if (checkbox.checked) {
        curtirEvento(eventoId);
        
    } else {
        descurtirEvento(eventoId);
    }
}

// JavaScript
function curtirEvento(eventoId) {
    const url = `/curtirEvento/${eventoId}`;

    // O objeto de opções da solicitação, incluindo o método POST
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Se você estiver enviando dados no corpo da solicitação
        },
        // Adicione um corpo se estiver enviando dados
        // body: JSON.stringify({ chave: valor }),
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            // Trate a resposta aqui, se necessário
            console.log('Evento curtido com sucesso');
            
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
}

function descurtirEvento(eventoId) {
    const url = `/descurtiEvento/${eventoId}`;

    // O objeto de opções da solicitação, incluindo o método POST
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Se você estiver enviando dados no corpo da solicitação
        },
        // Adicione um corpo se estiver enviando dados
        // body: JSON.stringify({ chave: valor }),
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            // Trate a resposta aqui, se necessário
            console.log('Evento descurtido com sucesso');
            
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
}

//MODAL DE PERFIL DO USUARIO
function encontrarUsuarioPorId(usuarioId) {
    // URL da sua API para buscar um usuário por ID
    const apiUrl = `/acharUsuario/${usuarioId}`; // Substitua pela URL correta

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(usuario => {

            document.getElementById("modal-usuario-nome").textContent = "Nome: " + usuario.nome;
           
            if (usuario.descricao) {
                document.getElementById("modal-usuario-email").textContent = "Biografia: " + usuario.descricao;
            } 
             // Verifique se a URL da foto do usuário existe
             if (usuario.urlFoto) {
                document.getElementById("fotoUsuario").src = usuario.fotoPerfil;
            } else {
                // Caso não exista uma foto, defina uma foto padrão
                document.getElementById("fotoUsuario").src = "/css/img/fotoPerfil.jpg"; 
            }

            return usuario;
        })
        .catch(error => {
            console.error("Erro na requisição:", error);
            return null;
        });
}

function mostrarFiltros() {
    var filtrosDiv = document.querySelector('.filtros-evento');

    if (filtrosDiv.style.display === 'none' || filtrosDiv.style.display === '') {
        filtrosDiv.style.display = 'flex';
    } else {
        filtrosDiv.style.display = 'none';
    }
}

    function mostrarModal(botao) {
        // Obter o ID do usuário a partir do atributo data-usuario-id
        const usuarioId = botao.getAttribute("data-usuario-id");
        const usuario = encontrarUsuarioPorId(usuarioId);

        // Mostrar o modal
        document.getElementById("modal-perfil-usuario").style.display = "block";
    }

    function fecharModal() {
        // Fechar o modal
        document.getElementById("modal-perfil-usuario").style.display = "none";
    }

    // API DE CEP  

    document.addEventListener("DOMContentLoaded", function () {
        const cepInput = document.getElementById("cep");
        const cidadeInput = document.getElementById("cidade");
        const bairroInput = document.getElementById("bairro");
    
        cepInput.addEventListener("input", function (e) {
          // Remove caracteres não numéricos
          const cleanedValue = e.target.value.replace(/\D/g, "");
    
          // Formata o CEP como "XXXXX-XXX"
          if (cleanedValue.length > 5) {
            e.target.value = cleanedValue.slice(0, 5) + "-" + cleanedValue.slice(5, 8);
          } else {
            e.target.value = cleanedValue;
          }
        });

        cepInput.addEventListener("blur", function () {
            const cep = cepInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos
        
            if (cep.length === 8) {
              // Faz uma solicitação para a API do ViaCEP
              fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => response.json())
                .then((data) => {
                  if (!data.erro) {
                    // Preenche os campos de cidade e bairro com os dados da API
                    cidadeInput.value = data.localidade;
                    bairroInput.value = data.bairro;

                    // Seleciona automaticamente a opção do estado com base no estado retornado
                    const estadoSelect = document.getElementById("estado");
                    const estadoSelecionado = data.uf.toLowerCase();
                    estadoSelect.value = estadoSelecionado;
                  }
                })
                .catch((error) => {
                  console.error("Erro na solicitação ViaCEP: " + error);
                });
            }
          });
      });

    //NOVO TESTE 
    function followUser(button) {

    const usuarioId = button.getAttribute('data-usuario-id');
    const popUp = document.getElementById("popUp-seguiu");
    var strongElement = button.querySelector('strong');
    const btnChat = document.getElementById("btn-iconchat");
    const loading = document.getElementById("loading");

    if (strongElement.innerText === "Seguir") {
      // Fazer a primeira requisição ao servidor
      // Substitua a URL e os parâmetros conforme necessário
      loading.style.display = "flex";
      fetch(`/follow/${usuarioId}`, {
        method: "POST",
    })
    .then(response => {
        if (response.ok) {
            // A requisição foi bem-sucedida
            loading.style.display = "none";
            strongElement.innerText = "Seguindo";
            console.log("Usuário seguido com sucesso.");
            popUp.style.display = "flex";
            btnChat.style.display = "block";
            
            
        } else {
            // A requisição falhou
            console.error("Falha ao seguir o usuário.");
            loading.style.display = "none";
        }
    })
    .catch(error => {
        // Lidar com erros de rede ou outros erros inesperados.
        loading.style.display = "none";
        console.error("Erro inesperado: " + error);
    });
} else if (strongElement.innerText === "Seguindo") {

      loading.style.display = "flex";
      fetch(`/unfollow/${usuarioId}`, {
        method: "POST",
    })
    .then(response => {
        if (response.ok) {
            // A requisição foi bem-sucedida
            loading.style.display = "none";
            console.log("Usuário deixado de seguir com sucesso.");
            strongElement.innerText = "Seguir";
            btnChat.style.display = "none";
            
            
        } else {
            // A requisição falhou
            console.error("Falha ao deixar de seguir o usuário.");
            loading.style.display = "none";
        }
    })
    .catch(error => {
        // Lidar com erros de rede ou outros erros inesperados.
        loading.style.display = "none";
        console.error("Erro inesperado: " + error);
    });

    }
  }

  /// MOSTRAR CHAT INDIVIDUAL
    function mostrarChat(){
        var chatContainer = document.getElementById("chat-container");

        console.log("Funcionou função!!!!!")

        chatContainer.style.display == "flex"

        if (chatContainer.style.display == "none"){
            chatContainer.style.display == "flex"
        }else{
            chatContainer.style.display == "none"
        }

    }

   
    function enviarMensagem(div) {
        // Obtenha o conteúdo digitado no input
        const input = document.querySelector('.send-input');
        const mensagem = document.querySelector('.send-input').value;
        const messageDiv = document.querySelector('.message.one');
        const usuarioIdReceiver = div.getAttribute('data-usuario-id');

        //console.log(usuarioIdReceiver);
    
        if (mensagem.trim() !== '') {
            
            const newParagraph = document.createElement('p');
            newParagraph.textContent = mensagem;

            // Adicionando o texto à div desejada
            messageDiv.appendChild(newParagraph);

            // Limpando o input após adicionar o texto
            input.value = '';
            
        } else{
            return;
        }

        fetch(`/enviarMensagem/${usuarioIdReceiver}/${mensagem}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mensagem: mensagem }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao enviar a mensagem');
                }
                return response.json();
            })
            .then(data => {
              
                
            })
            .catch(error => {
               
            });
    };

    //BOTAO DE FECHAR CHAT

    // Obtendo referências aos elementos
    const closeChatButton = document.getElementById('close-chat');
    const chatContainer = document.getElementById('chat-container');

    // Adicionando um evento de clique ao botão de fechar chat
    closeChatButton.addEventListener('click', function() {
        // Tornando o contêiner de chat invisível ao clicar no botão
        chatContainer.style.display = 'none';
    });

    




