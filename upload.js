// Configuración Firebase (usa tus datos)
const firebaseConfig = {
    apiKey: "AIzaSyCkNgikdUByZmfAIAMcvBiw5t9hKewtFPQ",
    authDomain: "fasago-fotos-4a5fd.firebaseapp.com",
    projectId: "fasago-fotos-4a5fd",
    storageBucket: "fasago-fotos-4a5fd.appspot.com", // ¡Termina en .appspot.com!
    messagingSenderId: "271898420621",
    appId: "1:271898420621:web:6010ea98a75b2ec257c9c4"
  };
  
  // Inicializar Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
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
  
  // Subir foto a Firebase Storage
  document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const file = document.getElementById('photoUpload').files[0];
    const user = firebase.auth().currentUser;
    
    if (!file || !user) {
      alert("Selecciona una imagen o inicia sesión.");
      return;
    }
  
    // Referencia al almacenamiento: photos/{userId}/{nombreArchivo}
    const storageRef = firebase.storage().ref(`photos/${user.uid}/${file.name}`);
    const uploadTask = storageRef.put(file);
  
    // Cambiar estado del botón durante la subida
    const uploadBtn = document.querySelector('#uploadForm button');
    uploadBtn.disabled = true;
    uploadBtn.textContent = 'Subiendo...';
  
    // Manejar progreso y errores
    uploadTask.on(
      'state_changed',
      null, // Opcional: progreso
      (error) => {
        document.getElementById('uploadStatus').textContent = `Error: ${error.message}`;
        document.getElementById('uploadStatus').className = 'error';
        uploadBtn.disabled = false;
        uploadBtn.textContent = 'Subir Foto';
      },
      () => {
        // Subida exitosa
        document.getElementById('uploadStatus').textContent = '¡Foto subida con éxito!';
        document.getElementById('uploadStatus').className = 'status';
        document.getElementById('uploadForm').reset();
        document.getElementById('previewContainer').style.display = 'none';
        uploadBtn.disabled = false;
        uploadBtn.textContent = 'Subir Foto';
      }
    );
  });
