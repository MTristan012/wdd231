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
});