const apiUrl = 'https://localhost:7103/api/workshops';

function obterWorkshop(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Workshop não encontrado');
            }
            return response.json();
        })
        .then(workshop => {
            document.getElementById('workshop-id').value = workshop.id;
            document.getElementById('workshop-nome').value = workshop.nome;
            document.getElementById('workshop-data').value = workshop.dataDeRealizacao.slice(0, 16);
            document.getElementById('workshop-descricao').value = workshop.descricao;
        })
        .catch(error => {
            console.error('Erro ao obter workshop:', error);
            alert('Erro ao carregar os dados do workshop.');
        });
}

function atualizarWorkshop() {
    const id = document.getElementById('workshop-id').value;
    const nome = document.getElementById('workshop-nome').value.trim();
    const dataDeRealizacao = document.getElementById('workshop-data').value;
    const descricao = document.getElementById('workshop-descricao').value.trim();

    if (nome && dataDeRealizacao && descricao) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: parseInt(id), nome, dataDeRealizacao, descricao }),
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = 'workshops.html'; // Redireciona para a lista de workshops
                } else {
                    alert('Erro ao atualizar workshop.');
                }
            })
            .catch(error => console.error('Erro ao atualizar workshop:', error));
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Obtém o ID do workshop da URL e chama a função para carregá-lo
const urlParams = new URLSearchParams(window.location.search);
const workshopId = urlParams.get('id');
if (workshopId) {
    obterWorkshop(workshopId);
}

