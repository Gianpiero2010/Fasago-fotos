// Configuración Firebase
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

// Autenticación
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!['Wilson', 'Sandra', 'Piero', 'Dhanya'].includes(username)) {
    document.getElementById('error').textContent = 'Usuario no válido';
    return;
  }

  if (password === 'fasago') {
    localStorage.setItem('galleryUser', username);
    window.location.href = 'gallery.html';
  } else {
    document.getElementById('error').textContent = 'Contraseña incorrecta. Usa "fasago"';
  }
});
