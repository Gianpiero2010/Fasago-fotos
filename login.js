document.addEventListener("DOMContentLoaded", function () {
    // Si ya está autenticado, redirigir a la página principal.
    if (localStorage.getItem("authenticated") === "true") {
        window.location.href = "home.html";
    }
});

function checkPassword() {
    const passwordInput = document.getElementById("passwordInput").value;
    const errorMsg = document.getElementById("errorMsg");

    if (passwordInput === "fasago") {  // Cambia la contraseña aquí si lo necesitas
        localStorage.setItem("authenticated", "true");  // Guardar estado de autenticación
        window.location.href = "home.html";  // Redirigir al home
    } else {
        errorMsg.textContent = "Contraseña incorrecta. Intenta de nuevo.";
        errorMsg.style.color = "red";
    }
}
