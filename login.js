// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener("DOMContentLoaded", function () {
    // Verificar si ya hay un usuario autenticado
    if (auth.currentUser) {
        window.location.href = "home.html"; // Si el usuario ya está autenticado, redirigirlo
    }
});

// Manejo de la autenticación con Google
function checkPassword() {
    const passwordInput = document.getElementById("passwordInput").value;
    const errorMsg = document.getElementById("errorMsg");

    // Esto ya no es necesario, ya que la autenticación es con Google
    if (passwordInput === "fasago") { // Contraseña fija
        localStorage.setItem("authenticated", "true");
        window.location.href = "home.html"; // Redirige al home si la contraseña es correcta
    } else {
        errorMsg.textContent = "Contraseña incorrecta. Intenta de nuevo.";
        errorMsg.style.color = "red";
    }
}
