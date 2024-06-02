document.addEventListener('DOMContentLoaded', (event) => {
    const cardContainer = document.querySelector('.card-container-visualise');
    const filterInput = document.getElementById('filterInput');

    // Função para criar um card com base nos dados do Local Storage
    function createCard(shipData) {
        const card = document.createElement('div');
        card.classList.add('card-visualise');
        card.setAttribute('data-id', shipData.id);

        const title = document.createElement('h3');
        title.textContent = `Ship Name: ${shipData.nome}`;
        card.appendChild(title);

        const leavingDate = document.createElement('div');
        leavingDate.classList.add('card-item');
        leavingDate.innerHTML = `<span class="card-label">Leaving Date:</span><span class="card-value">${shipData.leavingDate}</span>`;
        card.appendChild(leavingDate);

        const arrivingDate = document.createElement('div');
        arrivingDate.classList.add('card-item');
        arrivingDate.innerHTML = `<span class="card-label">Arriving Date:</span><span class="card-value">${shipData.arrivingDate}</span>`;
        card.appendChild(arrivingDate);

        const oceanTarget = document.createElement('div');
        oceanTarget.classList.add('card-item');
        oceanTarget.innerHTML = `<span class="card-label">Ocean target:</span><span class="card-value">${shipData.oceanTarget}</span>`;
        card.appendChild(oceanTarget);

        const crewNumber = document.createElement('div');
        crewNumber.classList.add('card-item');
        crewNumber.innerHTML = `<span class="card-label">Crew Number:</span><span class="card-value">${shipData.crewNumber}</span>`;
        card.appendChild(crewNumber);

        const func = document.createElement('div');
        func.classList.add('card-item');
        func.innerHTML = `<span class="card-label">Function:</span><span class="card-value">${shipData.function}</span>`;
        card.appendChild(func);

        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'assets/images/excluir.png'; // Caminho para a imagem do ícone de exclusão
        deleteIcon.alt = 'Delete';
        deleteIcon.classList.add('delete-icon');
        deleteIcon.addEventListener('click', function() {
            deleteCard(shipData.id);
        });
        card.appendChild(deleteIcon);

        return card;
    }

    // Função para excluir um card e remover os dados do Local Storage
    function deleteCard(id) {
        localStorage.removeItem(id);
        const card = document.querySelector(`[data-id='${id}']`);
        if (card) {
            card.remove();
        }
    }

    // Função para filtrar os cards
    function filterCards(filterValue) {
        const cards = cardContainer.querySelectorAll('.card-visualise');
        cards.forEach(card => {
            const shipName = card.querySelector('h3').textContent.toLowerCase();
            if (shipName.includes(filterValue.toLowerCase())) {
                card.style.display = 'block'; // Exibe o card se o nome do navio corresponder ao filtro
            } else {
                card.style.display = 'none'; // Oculta o card se o nome do navio não corresponder ao filtro
            }
        });
    }

    // Carregar e exibir os dados do Local Storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const shipData = JSON.parse(localStorage.getItem(key));
        const card = createCard(shipData);
        cardContainer.appendChild(card);
    }

    // Adicionar um ouvinte de eventos para o campo de filtro
    filterInput.addEventListener('input', function() {
        filterCards(this.value); // Chama a função de filtragem ao digitar no campo de filtro
    });
});
