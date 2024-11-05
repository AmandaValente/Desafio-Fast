const apiUrl = 'https://localhost:7103/api/colaboradores';

function obterColaborador(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Colaborador não encontrado');
            }
            return response.json();
        })
        .then(colaborador => {
            document.getElementById('colaborador-id').value = colaborador.id;
            document.getElementById('colaborador-nome').value = colaborador.nome;
        })
        .catch(error => {
            console.error('Erro ao obter colaborador:', error);
            alert('Erro ao carregar os dados do colaborador.');
        });
}

function atualizarColaborador() {
    const id = document.getElementById('colaborador-id').value;
    const nome = document.getElementById('colaborador-nome').value.trim();

    if (nome) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: parseInt(id), nome }),
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = 'colaboradores.html'; 
                } else {
                    alert('Erro ao atualizar colaborador.');
                }
            })
            .catch(error => console.error('Erro ao atualizar colaborador:', error));
    } else {
        alert('Por favor, preencha o campo de nome.');
    }
}


const urlParams = new URLSearchParams(window.location.search);
const colaboradorId = urlParams.get('id');
if (colaboradorId) {
    obterColaborador(colaboradorId);
}
