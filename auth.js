import { auth } from './firebase-config';

// Función principal de login/registro
export async function handleAuth(email, password) {
  try {
    // 1. Intento de login
    await auth.signInWithEmailAndPassword(email, password);
    
    // 2. Redirigir si es exitoso
    window.location.href = '/home.html';
    
  } catch (error) {
    // 3. Manejo de errores
    switch(error.code) {
      case 'auth/user-not-found':
        await handleNewUser(email, password);
        break;
        
      case 'auth/wrong-password':
        showError('Contraseña incorrecta');
        break;
        
      default:
        showError(`Error: ${error.message}`);
    }
  }
}

// Función para registrar nuevo usuario
async function handleNewUser(email, password) {
  if (confirm(`¿Deseas registrarte con ${email}?`)) {
    try {
      // 1. Crear usuario
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      
      // 2. Enviar email de verificación (opcional)
      await userCredential.user.sendEmailVerification();
      
      // 3. Redirigir
      window.location.href = '/welcome.html';
      
    } catch (error) {
      showError(`Error al registrarse: ${error.message}`);
    }
  }
}

// Mostrar errores en UI
function showError(message) {
  const errorElement = document.getElementById('auth-error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  
  setTimeout(() => {
    errorElement.style.display = 'none';
  }, 5000);
}
