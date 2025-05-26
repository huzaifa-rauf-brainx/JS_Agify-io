document.addEventListener("DOMContentLoaded", () => {
    const checkBtn = document.getElementById("checkBtn");
    const toast = document.getElementById("toast");
    checkBtn.addEventListener("click", async () => {
        const name = document.getElementById("nameInput").value.trim();
        const countryCode = document.getElementById("countryCode").value;
        if (!name || !countryCode) {
            showToast("Please fill in all fields!", "danger");
            return;
        }
        const response = await fetch(`https://api.agify.io?name=${name}&country_id=${countryCode}`);
        const data = await response.json();
        if (data.age === null) {
            showToast(`Access denied. ${name} is unknown`, "danger");
        } else {
            if (data.age > 18) {
                showToast(`Access granted. Predicted age: ${data.age}`, "success");
            } else {
                showToast(`Access denied. Predicted age: ${data.age}`, "danger");
            }
        }
    });
    function showToast(message, type = "info") {
        toast.textContent = message;
        toast.className = `alert alert-${type} mt-3`;
        toast.classList.remove("d-none");
        setTimeout(() => {
            toast.classList.add("d-none");
        }, 3000);
    }
});