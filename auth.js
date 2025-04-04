// Configuración Firebase (TUS DATOS)
const firebaseConfig = {
  apiKey: "AIzaSyCkNgikdUByZmfAIAMcvBiw5t9hKewtFPQ",
  authDomain: "fasago-fotos-4a5fd.firebaseapp.com",
  projectId: "fasago-fotos-4a5fd",
  storageBucket: "fasago-fotos-4a5fd.firebasestorage.app",
  messagingSenderId: "271898420621",
  appId: "1:271898420621:web:6010ea98a75b2ec257c9c4",
  measurementId: "G-K1SKTWWNGG"
};

// Inicialización Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Función para mostrar errores
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  setTimeout(() => errorElement.textContent = '', 3000);
}

// Login
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        window.location.href = "home.html";
      } catch (error) {
        showError('error', error.message);
      }
    });
  }

  // Registro (para register.html)
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        alert("¡Cuenta creada con éxito!");
        window.location.href = "index.html";
      } catch (error) {
        showError('error', error.message);
      }
    });
  }

  // Logout (para home.html, gallery.html, upload.html)
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      firebase.auth().signOut()
        .then(() => window.location.href = "index.html")
        .catch(error => console.error("Error al cerrar sesión:", error));
    });
  }

  // Protección de rutas
  const protectedPages = ['home.html', 'gallery.html', 'upload.html'];
  if (protectedPages.some(page => window.location.pathname.includes(page))) {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) window.location.href = "index.html";
    });
  }
});
