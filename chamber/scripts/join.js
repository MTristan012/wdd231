document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("membership-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const memberData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            level: form.level.value,
            comments: form.comments.value.trim(),
            dateSubmitted: new Date().toISOString()
        };

        if (!memberData.name || !memberData.email || !memberData.level) {
            alert("Por favor completa todos los campos obligatorios.");
            return;
        }

        const storedMembers = JSON.parse(localStorage.getItem("chamberApplications")) || [];
        storedMembers.push(memberData);
        localStorage.setItem("chamberApplications", JSON.stringify(storedMembers));

        form.reset();
        alert("¡Gracias por tu solicitud! Nos pondremos en contacto pronto.");
    });
});