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

// --------------------- FUNCIÓN DE LOGIN CON PERSISTENCIA ---------------------
async function handleLogin(email, password) {
  try {
    // Configurar persistencia LOCAL (recuerda la sesión)
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// --------------------- SETUP DE FORMULARIOS ---------------------
function setupLoginForm() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        await handleLogin(email, password);
        window.location.href = "home.html";
      } catch (error) {
        let errorMessage = error.message;
        if (error.code === 'auth/user-not-found') {
          errorMessage = "Usuario no registrado. Por favor regístrate.";
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = "Contraseña incorrecta.";
        }
        document.getElementById('error').textContent = errorMessage;
      }
    });
  }
}

// --------------------- MOSTRAR USUARIO ACTUAL ---------------------
function displayUserInfo() {
  const userEmailElement = document.getElementById('user-email');
  const user = firebase.auth().currentUser;

  if (userEmailElement && user) {
    userEmailElement.textContent = user.email;
  }
}

// --------------------- VERIFICAR AUTENTICACIÓN ---------------------
function checkAuthState(){
  firebase.auth().onAuthStateChanged((user) => {
    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['home.html', 'gallery.html', 'upload.html'];

    // Condicional corregido (observa los paréntesis y llaves)
    if (protectedPages.includes(currentPage)) {  // <-- Error aquí (paréntesis extra)
      if (!user) window.location.href = "index.html";
    } else if (user && currentPage === 'index.html') {  // <-- Este está CORRECTO
      window.location.href = "home.html";
    }

    if (user) displayUserInfo();
  });
}
// --------------------- INICIALIZAR ---------------------
function initAuth() {
  setupLoginForm();
  setupRegisterForm(); // Añade esta función si tienes registro
  setupLogout();
  checkAuthState();
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initAuth);
if (document.readyState !== 'loading') initAuth();
