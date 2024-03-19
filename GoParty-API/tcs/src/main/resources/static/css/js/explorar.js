const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('input-pesquisar');
const suggestionsModal = document.getElementById('suggestionsModal');
const suggestionsList = document.getElementById('suggestionsList');
const btnPesquisa = document.getElementById("btn-explorar");
const noResultsMessage = document.getElementById('noResultsMessage');

searchInput.addEventListener('input', function() {
    const query = searchInput.value;
    
    // Faça uma requisição AJAX para buscar resultados
    // e preencher as sugestões na lista de sugestões
    if (query.length > 2) { // Opcional: defina um limite mínimo de caracteres para a pesquisa
        fetch('/pesquisar?query=' + query)
            .then(response => response.json())
            .then(data => {
                suggestionsList.innerHTML = '';
                data.forEach(result => {
                    const listItem = document.createElement('li');
                    listItem.textContent = '@'+result.username; // Substitua por seu modelo de dados
                    suggestionsList.appendChild(listItem);
                });
                suggestionsModal.style.display = 'block';
                noResultsMessage.style.display = 'none';
                
            });
    } else {
        suggestionsList.innerHTML = '';
        suggestionsModal.style.display = 'none';
    }
});



