// logout.js

function logout() {
    // Eliminar cualquier dato de sesión que hayas guardado
    localStorage.removeItem("userData");  // Si has guardado datos del usuario en localStorage
    sessionStorage.clear();  // Limpiar sessionStorage si se usa

    // Redirigir al usuario a la página principal (o a la página de login)
    alert("Has cerrado sesión.");
    window.location.href = "login.html";  // Puedes cambiar esta ruta si deseas redirigir a otra página
}
