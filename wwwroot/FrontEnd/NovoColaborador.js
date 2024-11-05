const apiUrl = 'https://localhost:7103/api/colaboradores';

function salvarNovoColaborador() {
    const nome = document.getElementById('colaborador-nome').value.trim();

    if (nome) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome }),
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = 'colaboradores.html'; // Redireciona para a lista de colaboradores
                } else {
                    alert('Erro ao cadastrar colaborador.');
                }
            })
            .catch(error => console.error('Erro ao salvar colaborador:', error));
    } else {
        alert('Por favor, preencha o campo de nome.');
    }
}
