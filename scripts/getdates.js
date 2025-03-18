document.addEventListener("DOMContentLoaded", () => {
    const lastModifiedElement = document.querySelector("#lastModified");
    if (lastModifiedElement) {
        const lastModifiedDate = document.lastModified;
        lastModifiedElement.textContent = lastModifiedDate;
    }
    const yearElement = document.querySelector("#currentyear");
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
    document.querySelector('.menu-toggle').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('show');
    });
    document.querySelector('.close-menu').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('show');
    });
    document.querySelectorAll("nav a").forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
});