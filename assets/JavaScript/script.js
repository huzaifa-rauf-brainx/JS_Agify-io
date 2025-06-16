document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://api.agify.io";
    const TOAST_DISPLAY_DURATION = 3000;
    const form = document.getElementById("ageForm");
    const nameInput = document.getElementById("nameInput");
    const countryCodeInput = document.getElementById("countryCode");
    const toast = document.getElementById("toast");
    const loading = document.getElementById("loading");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }
        const name = nameInput.value.trim();
        const countryCode = countryCodeInput.value.trim().toUpperCase();
        showLoading(true);
        try {
            const data = await predictAge(name, countryCode);
            if (data.age === null) {
                showToast(`Access denied. ${name} is unknown`, "danger");
            } else if (data.age > 18) {
                showToast(`Access granted. Predicted age: ${data.age}`, "success");
            } else {
                showToast(`Access denied. Predicted age: ${data.age}`, "danger");
            }
        } catch (error) {
            showToast(`Error: ${error.message}`, "danger");
        } finally {
            showLoading(false);
        }
    });
    async function predictAge(name, countryCode) {
        const response = await fetch(`${API_URL}?name=${encodeURIComponent(name)}&country_id=${encodeURIComponent(countryCode)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    }
    function showToast(message, type = "info") {
        toast.textContent = message;
        toast.className = `alert alert-${type} mt-3`;
        toast.classList.remove("d-none");
        setTimeout(() => {
            toast.classList.add("d-none");
        }, TOAST_DISPLAY_DURATION);
    }
    function showLoading(show) {
        loading.classList.toggle("d-none", !show);
    }
});