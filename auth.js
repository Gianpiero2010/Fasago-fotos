// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCkNgikdUByZmfAIAMcvBiw5t9hKewtFPQ",
  authDomain: "fasago-fotos-4a5fd.firebaseapp.com",
  projectId: "fasago-fotos-4a5fd",
  storageBucket: "fasago-fotos-4a5fd.firebasestorage.app",
  messagingSenderId: "271898420621",
  appId: "1:271898420621:web:6010ea98a75b2ec257c9c4"
};

// Inicialización
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Login
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => window.location.href = "home.html")
      .catch(error => {
        let message = error.message;
        if (error.code === 'auth/user-not-found') {
          message = "Usuario no registrado. ¿Quieres crear una cuenta?";
        }
        document.getElementById('error').textContent = message;
      });
  });
}

// Registro
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("¡Cuenta creada con éxito!");
        window.location.href = "index.html";
      })
      .catch(error => {
        document.getElementById('error').textContent = error.message;
      });
  });
}

// Logout
if (document.getElementById('logoutBtn')) {
  document.getElementById('logoutBtn').addEventListener('click', () => {
    firebase.auth().signOut()
      .then(() => window.location.href = "index.html");
  });
}

// Verificar autenticación en páginas protegidas
const protectedPages = ['home.html', 'gallery.html', 'upload.html'];
if (protectedPages.some(page => window.location.pathname.includes(page))) {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) window.location.href = "index.html";
  });
}
