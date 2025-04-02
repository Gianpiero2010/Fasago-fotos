function logout() {
    localStorage.removeItem("isLoggedIn"); // Eliminar el estado de sesión
    window.location.href = "login.html"; // Redirigir al login
}
