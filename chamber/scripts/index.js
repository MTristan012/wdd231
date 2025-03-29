const url = 'data/members.json';

const spotlightsContainer = document.querySelector('.spotlights');

async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displaySpotlights(data.members.slice(0, 3));
    } catch (error) {
        console.error('Error cargando miembros:', error);
        spotlightsContainer.innerHTML = '<p>No se pudieron cargar los miembros destacados.</p>';
    }
}

function displaySpotlights(members) {
    spotlightsContainer.innerHTML = '';
    members.forEach(member => {
        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('business-card');
        spotlightCard.innerHTML = `
            <h4>${member.name}</h4>
            <p>${member.business}</p>
            <p>${member.address}</p>
        `;
        spotlightsContainer.appendChild(spotlightCard);
    });
}

getMembers();