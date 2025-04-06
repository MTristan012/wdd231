document.addEventListener("DOMContentLoaded", () => {
    fetch("./data/discover.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("card-container");
            data.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
          <h2>${item.name}</h2>
          <figure>
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;
                container.appendChild(card);
            });
        });
});

const msgDiv = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    msgDiv.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (diffDays < 1) {
        msgDiv.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
        msgDiv.textContent = "You last visited 1 day ago.";
    } else {
        msgDiv.textContent = `You last visited ${diffDays} days ago.`;
    }
}

localStorage.setItem("lastVisit", now);