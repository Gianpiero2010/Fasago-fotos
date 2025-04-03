// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY", // Reemplaza con tu API Key
    authDomain: "TU_AUTH_DOMAIN", // Reemplaza con tu dominio de autenticación
    projectId: "TU_PROJECT_ID", // Reemplaza con tu ID de proyecto
    storageBucket: "TU_STORAGE_BUCKET", // Reemplaza con tu bucket de almacenamiento
    messagingSenderId: "TU_MESSAGING_SENDER_ID", // Reemplaza con tu ID de mensajería
    appId: "TU_APP_ID" // Reemplaza con tu App ID
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Proveedor de Google
const provider = new firebase.auth.GoogleAuthProvider();

// Función para autenticar con Google
function signInWithGoogle() {
    firebase.auth().signInWithPopup(provider).then((result) => {
        const user = result.user;
        const userEmail = user.email;

        // Mostrar el correo del usuario y el campo para ingresar la contraseña
        document.getElementById("userEmail").textContent = `Correo: ${userEmail}`;
        document.getElementById("googleUserContainer").style.display = "block"; // Mostrar el contenedor con la contraseña
    }).catch((error) => {
        const errorMsg = document.getElementById("errorMsg");
        errorMsg.textContent = "Error en la autenticación: " + error.message;
        errorMsg.style.color = "red";
    });
}

// Verificar la contraseña ingresada
function checkPassword() {
    const passwordInput = document.getElementById("passwordInput").value;
    const errorMsg = document.getElementById("errorMsg");

    if (passwordInput === "fasago") { // Contraseña fija
        window.location.href = "home.html"; // Redirige al home si la contraseña es correcta
    } else {
        errorMsg.textContent = "Contraseña incorrecta. Intenta de nuevo.";
        errorMsg.style.color = "red";
    }
}

// Ejecutar la función de login con Google cuando cargue el documento
document.addEventListener("DOMContentLoaded", function () {
    signInWithGoogle(); // Inicia sesión con Google automáticamente cuando la página carga
});
