import { auth } from './firebase.js';

// Manejo de login/logout
auth.onAuthStateChanged(user => {
  if (!user && !location.pathname.includes('login.html')) {
    location.href = 'login.html';
  }
});

// Login con Google
document.getElementById('googleLogin')?.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
});
