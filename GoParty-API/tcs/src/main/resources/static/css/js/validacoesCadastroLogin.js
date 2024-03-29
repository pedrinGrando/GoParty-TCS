console.log("Funcionou");

//Username com mais de 12 caracteres
document.addEventListener("DOMContentLoaded", function() {
    const usernameInput = document.getElementById("nomeUsuario");
    const usernameInvalidoDiv = document.querySelector(".dadoInvalido");
    const submitButton = document.getElementById("btn-cadastrar-space");

    usernameInput.addEventListener("input", function() {
        const usernameValue = usernameInput.value;

        if (usernameValue.length < 10) {
            usernameInvalidoDiv.style.display = "none";
            submitButton.disabled = false;
        } else {
            usernameInvalidoDiv.style.display = "block";
            submitButton.disabled = true;
        }
    });
    
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-invalido');
    
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.toLowerCase();
        if (!isValidEmail(email)) {
            emailError.style.display = "block";
            submitButton.disabled = true;
        } else {
            emailError.style.display = "none";
            submitButton.disabled = false;
        }
    });

    function isValidEmail(email) {
        const validDomains = ['gmail.com', 'hotmail.com', 'outlook.com']; // Adicione os domínios desejados aqui
        const emailParts = email.split('@');
        if (emailParts.length === 2) {
            const domain = emailParts[1].toLowerCase();
            return validDomains.includes(domain);
        }
        return false;
    }

    const senhaInput = document.getElementById('senhaTrocaCadastro');
    const senhaConfirmInput = document.getElementById('senhaConfimCadastro');
    const senhaConfirmMsg = document.getElementById('senhaConfirmacaoMsg');

    senhaConfirmInput.addEventListener('input', function() {
        const senha = senhaInput.value;
        const senhaConfirm = senhaConfirmInput.value;

        if (senha === senhaConfirm) {
            submitButton.disabled = false;
            senhaConfirmMsg.style.display = "none"
        } else {
            submitButton.disabled = true;
            senhaConfirmMsg.style.display = "block"
        }
    });



// USERNAME DISPONIVEL OU NAO 

usernameInput.addEventListener('input', function() {

    console.log("Checando!")
    const username = usernameInput.value;
    const erroExiste = document.getElementById("usernameExiste");

    fetch(`/check-username/${username}`)
        .then(response => {
            if (response.ok) {
                
                response.json().then(data => {
                    if (data.exists) {
                        // Se o usuário existir, troca a cor para vermelho
                       
                        usernameInput.style.borderColor = 'red';
                        erroExiste.style.display = "flex";
                        console.log("Existe!")
                        
                    } else {
                        // Se o usuário não existir, troca a cor para verde
                       
                        usernameInput.style.borderColor = 'green';
                        erroExiste.style.display = "none";
                        console.log("Não existe!")
                       
                    }
                });
            } else {
                
                console.error('Erro ao verificar o nome de usuário.');
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
   });

});

