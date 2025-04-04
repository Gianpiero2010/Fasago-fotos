// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCkNgikdUByZmfAIAMcvBiw5t9hKewtFPQ",
  authDomain: "fasago-fotos-4a5fd.firebaseapp.com",
  storageBucket: "fasago-fotos-4a5fd.appspot.com",
  projectId: "fasago-fotos-4a5fd",
  appId: "1:271898420621:web:6010ea98a75b2ec257c9c4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Obtiene el usuario
const username = localStorage.getItem('galleryUser');
if (!username) window.location.href = 'index.html';

document.getElementById('userTitle').textContent = username;

// Referencia al almacenamiento
const storageRef = firebase.storage().ref(`users/${username}`);

// Subir fotos
document.getElementById('uploadBtn').addEventListener('click', () => {
  const file = document.getElementById('photoUpload').files[0];
  if (!file) return;

  const uploadTask = storageRef.child(file.name).put(file);
  
  uploadTask.on('state_changed',
    null,
    (error) => {
      document.getElementById('uploadStatus').textContent = `Error: ${error.message}`;
    },
    () => {
      loadPhotos();
      document.getElementById('uploadStatus').textContent = '¡Foto subida!';
      setTimeout(() => {
        document.getElementById('uploadStatus').textContent = '';
      }, 3000);
    }
  );
});

// Cargar fotos
function loadPhotos() {
  storageRef.listAll().then((res) => {
    const grid = document.getElementById('photoGrid');
    grid.innerHTML = '';
    
    res.items.forEach((itemRef) => {
      itemRef.getDownloadURL().then((url) => {
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('photo');
        grid.appendChild(img);
      });
    });
  }).catch(console.error);
}

// Cerrar sesión
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('galleryUser');
  window.location.href = 'index.html';
});

// Inicializar
loadPhotos();
