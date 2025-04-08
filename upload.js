// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCkNgikdUByZmfAIAMcvBiw5t9hKewtFPQ",
  authDomain: "fasago-fotos-4a5fd.firebaseapp.com",
  projectId: "fasago-fotos-4a5fd",
  storageBucket: "fasago-fotos-4a5fd.appspot.com",
  messagingSenderId: "271898420621",
  appId: "1:271898420621:web:6010ea98a75b2ec257c9c4"
};

// Inicializar Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const storage = firebase.storage();
const db = firebase.firestore();

// Previsualización de la imagen
document.getElementById('photoUpload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const preview = document.getElementById('imagePreview');
      preview.src = event.target.result;
      document.getElementById('previewContainer').style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// Función para subir la foto con descripción
document.getElementById('uploadForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const file = document.getElementById('photoUpload').files[0];
  const description = prompt("Por favor, añade una descripción para la foto:", "");
  
  if (!file) {
    alert("Debes seleccionar una imagen primero.");
    return;
  }
  
  if (!description) {
    alert("Debes añadir una descripción.");
    return;
  }

  const uploadBtn = document.querySelector('#uploadForm button');
  uploadBtn.disabled = true;
  uploadBtn.textContent = 'Subiendo...';

  try {
    // 1. Subir imagen a Storage
    const storageRef = storage.ref(`photos/${Date.now()}_${file.name}`);
    const snapshot = await storageRef.put(file);
    const downloadURL = await snapshot.ref.getDownloadURL();

    // 2. Guardar metadatos en Firestore
    await db.collection('photos').add({
      imageURL: downloadURL,
      description: description,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userId: firebase.auth().currentUser?.uid || 'anonymous'
    });

    // 3. Mostrar confirmación
    document.getElementById('uploadStatus').textContent = '¡Foto subida con éxito!';
    document.getElementById('uploadStatus').className = 'status success';
    
    // 4. Resetear formulario
    document.getElementById('uploadForm').reset();
    document.getElementById('previewContainer').style.display = 'none';
    
    // 5. Redirigir a galería después de 2 segundos
    setTimeout(() => {
      window.location.href = 'gallery.html';
    }, 2000);
    
  } catch (error) {
    console.error("Error al subir:", error);
    document.getElementById('uploadStatus').textContent = `Error: ${error.message}`;
    document.getElementById('uploadStatus').className = 'status error';
  } finally {
    uploadBtn.disabled = false;
    uploadBtn.textContent = 'Subir Foto';
  }
});

// Cerrar sesión
document.getElementById('logoutBtn').addEventListener('click', function() {
  firebase.auth().signOut().then(() => {
    window.location.href = 'index.html';
  });
});
