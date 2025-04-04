// Configuración Firebase (usando tus datos)
const firebaseConfig = {
  apiKey: "AIzaSyCkNgikdUByZmfAIAMcvBiw5t9hKewtFPQ",
  authDomain: "fasago-fotos-4a5fd.firebaseapp.com",
  projectId: "fasago-fotos-4a5fd",
  storageBucket: "fasago-fotos-4a5fd.appspot.com",
  messagingSenderId: "271898420621",
  appId: "1:271898420621:web:6010ea98a75b2ec257c9c4"
};

// Inicialización
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Función para manejar el logout (ahora es GLOBAL)
function setupLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      firebase.auth().signOut()
        .then(() => {
          window.location.href = "index.html";
        })
        .catch(error => {
          console.error("Error al cerrar sesión:", error);
        });
    });
  }
}

// Ejecutar al cargar la página (para todas las páginas)
document.addEventListener('DOMContentLoaded', setupLogout);

// También ejecutar si el DOM ya está cargado (por si acaso)
if (document.readyState !== 'loading') {
  setupLogout();
}

// Protección de rutas (opcional, pero recomendado)
const protectedPages = ['home.html', 'gallery.html', 'upload.html'];
if (protectedPages.some(page => window.location.pathname.includes(page))) {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) window.location.href = "index.html";
  });
}
