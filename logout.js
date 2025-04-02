// logout.js

function logout() {
    // Elimina los datos de la sesión, si se está utilizando algo como localStorage o sessionStorage
    localStorage.removeItem("userLoggedIn"); // Asegúrate de que esta clave se use en tu sistema de inicio de sesión

    // Redirige a la página de login
    window.location.href = "login.html";
}
