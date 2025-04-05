// Función para cerrar sesión
function logout() {
    // Eliminar la clave "authenticated" del localStorage
    localStorage.removeItem("authenticated");

    // Redirigir al login
    window.location.href = "login.html";
}
