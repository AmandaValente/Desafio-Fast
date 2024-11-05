const apiUrl = 'https://localhost:7103/api/colaboradores';

function listarTodosColaboradores() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(colaboradores => {
            exibirColaboradoresNaTabela(colaboradores);
        })
        .catch(error => console.error('Erro ao buscar todos os colaboradores:', error));
}

function pesquisarColaboradorPorId() {
    const colaboradorId = document.getElementById('colaborador-id').value;

    if (colaboradorId) {
        fetch(`${apiUrl}/${colaboradorId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Colaborador não encontrado');
                }
                return response.json();
            })
            .then(colaborador => {
                exibirColaboradoresNaTabela([colaborador]); // Passa o colaborador como array para exibir na tabela
            })
            .catch(error => {
                console.error('Erro ao buscar colaborador:', error);
                alert('Colaborador não encontrado.');
                limparTabela();
            });
    } else {
        alert('Por favor, insira o ID do colaborador.');
    }
}

function exibirColaboradoresNaTabela(colaboradores) {
    const tabela = document.getElementById('colaboradores-table');
    const tbody = tabela.querySelector('tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de exibir novos dados

    colaboradores.forEach(colaborador => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${colaborador.id}</td>
            <td>${colaborador.nome}</td>
            <td>
                <button onclick="window.location.href='editarColaborador.html?id=${colaborador.id}'">Editar</button>
                <button onclick="deletarColaborador(${colaborador.id})">Excluir</button>
            </td>
        `;

        tbody.appendChild(row);
    });

    tabela.style.display = 'table'; // Exibe a tabela
}

function limparTabela() {
    const tabela = document.getElementById('colaboradores-table');
    tabela.style.display = 'none';
    tabela.querySelector('tbody').innerHTML = ''; // Limpa o conteúdo da tabela
}

function deletarColaborador(id) {
    if (confirm('Tem certeza que deseja excluir este colaborador?')) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    alert('Colaborador excluído com sucesso.');
                    listarTodosColaboradores(); // Atualiza a lista após exclusão
                } else {
                    alert('Erro ao excluir colaborador.');
                }
            })
            .catch(error => console.error('Erro ao excluir colaborador:', error));
    }



}
