document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("authenticated") === "true") {
        window.location.href = "home.html";
    }
});

function checkPassword() {
    const passwordInput = document.getElementById("passwordInput").value;
    const errorMsg = document.getElementById("errorMsg");

    if (passwordInput === "fasago") { // Contraseña fija
        localStorage.setItem("authenticated", "true");
        window.location.href = "home.html"; // Redirige al home si la contraseña es correcta
    } else {
        errorMsg.textContent = "Contraseña incorrecta. Intenta de nuevo.";
        errorMsg.style.color = "red";
    }
}
