const container = document.querySelector('#pokemon-container');

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(`Error fetching Pokémon ID ${id}:`, err);
    }
};

const displayPokemon = async () => {
    for (let i = 1; i <= 151; i++) {
        const pokemon = await getPokemon(i);
        createCard(pokemon);
    }
};

const createCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const types = poke.types.map(t => t.type.name).join(', ');
    card.innerHTML = `
    <h3>${capitalize(poke.name)}</h3>
    <img src="${poke.sprites.front_default}" alt="${poke.name}" loading="lazy" />
    <p>ID: #${poke.id}</p>
    <p class="pokemon-type">Type: ${types}</p>
    <p>Height: ${poke.height} dm</p>
    <p>Weight: ${poke.weight} hg</p>
  `;

    card.addEventListener('click', () => showModal(poke));

    container.appendChild(card);
};

displayPokemon();

const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalDetails = document.getElementById('modal-details');

const showModal = (poke) => {
    modal.classList.remove('hidden');
    const abilities = poke.abilities.map(ab => ab.ability.name).join(', ');
    modalDetails.innerHTML = `
    <h2>${capitalize(poke.name)}</h2>
    <img src="${poke.sprites.other['official-artwork'].front_default}" alt="${poke.name}" />
    <p><strong>Base Experience:</strong> ${poke.base_experience}</p>
    <p><strong>Abilities:</strong> ${abilities}</p>
    <p><strong>Type:</strong> ${poke.types.map(t => t.type.name).join(', ')}</p>
    <p><strong>Height:</strong> ${poke.height}</p>
    <p><strong>Weight:</strong> ${poke.weight}</p>
  `;
};

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);