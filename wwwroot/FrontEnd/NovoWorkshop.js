const apiUrl = 'https://localhost:7103/api/workshops';

function salvarNovoWorkshop() {
    const nome = document.getElementById('workshop-nome').value.trim();
    const dataDeRealizacao = document.getElementById('workshop-data').value;
    const descricao = document.getElementById('workshop-descricao').value.trim();

    if (nome && dataDeRealizacao && descricao) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, dataDeRealizacao, descricao }),
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = 'workshops.html'; // Redireciona para a lista de workshops
                } else {
                    alert('Erro ao cadastrar workshop.');
                }
            })
            .catch(error => console.error('Erro ao salvar workshop:', error));
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}
