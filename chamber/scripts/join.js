document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("membership-form");

    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const memberData = {
            firstName: form.firstName.value.trim(),
            lastName: form.lastName.value.trim(),
            orgTitle: form.orgTitle.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            organization: form.organization.value.trim(),
            membership: form.membership.value,
            description: form.description.value.trim(),
            timestamp: form.timestamp.value.trim(),
            dateSubmitted: new Date().toISOString()
        };

        if (!memberData.firstName || !memberData.lastName || !memberData.email || !memberData.membership) {
            alert("Please complete all required fields.");
            return;
        }

        const storedMembers = JSON.parse(localStorage.getItem("chamberApplications")) || [];
        storedMembers.push(memberData);
        localStorage.setItem("chamberApplications", JSON.stringify(storedMembers));

        window.location.href = "thankyou.html?" + new URLSearchParams(memberData).toString();
    });

});