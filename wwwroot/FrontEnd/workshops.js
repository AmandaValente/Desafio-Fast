
function voltarPagina() {
    window.location.href = 'index.html'; // Redireciona para a página inicial
}

// Função para listar todos os workshops
function listarTodosWorkshops() {
    fetch('api/workshops')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#workshops-table tbody');
            tableBody.innerHTML = '';

            data.forEach(workshop => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${workshop.id}</td>
                    <td>${workshop.nome}</td>
                    <td>${workshop.descricao}</td>
                    <td>
                        <button onclick="editarWorkshop(${workshop.id})">Editar</button>
                        <button onclick="deletarWorkshop(${workshop.id})">Deletar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            // Exibe a tabela
            document.getElementById('workshops-table').style.display = 'table';
        })
        .catch(error => console.error('Erro ao listar workshops:', error));
}

// Função para pesquisar workshop por ID
function pesquisarWorkshopPorId() {
    const id = document.getElementById('workshop-id').value;

    if (!id) {
        alert('Por favor, insira um ID para pesquisar.');
        return;
    }

    fetch(`api/workshops/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Workshop não encontrado');
            }
            return response.json();
        })
        .then(workshop => {
            const tableBody = document.querySelector('#workshops-table tbody');
            tableBody.innerHTML = ''; // Limpa a tabela

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${workshop.id}</td>
                <td>${workshop.nome}</td>
                <td>${workshop.descricao}</td>
                <td>
                    <button onclick="editarWorkshop(${workshop.id})">Editar</button>
                    <button onclick="deletarWorkshop(${workshop.id})">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);

            // Exibe a tabela
            document.getElementById('workshops-table').style.display = 'table';
        })
        .catch(error => {
            alert(error.message);
            console.error('Erro ao pesquisar workshop:', error);
        });
}

// Função para editar um workshop
function editarWorkshop(id) {
    window.location.href = `editarWorkshop.html?id=${id}`; // Redireciona para a página de edição
}

// Função para deletar um workshop
function deletarWorkshop(id) {
    fetch(`api/workshops/${id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao deletar workshop');
            }
            alert('Workshop deletado com sucesso!');
            listarTodosWorkshops(); // Atualiza a lista
        })
        .catch(error => {
            alert(error.message);
            console.error('Erro ao deletar workshop:', error);
        });
}
