// login.js

document.getElementById("login").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Aquí puedes agregar la validación con tus credenciales

    if (username === "usuario" && password === "contraseña") { // Ejemplo básico
        localStorage.setItem("userLoggedIn", true); // Guardar que el usuario ha iniciado sesión
        window.location.href = "home.html"; // Redirigir al home después de login exitoso
    } else {
        alert("Credenciales incorrectas. Intenta nuevamente.");
    }
});
