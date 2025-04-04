// Vista previa de imagen
document.getElementById('photoUpload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      document.getElementById('imagePreview').src = event.target.result;
      document.getElementById('previewContainer').style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// Subir foto
document.getElementById('uploadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const file = document.getElementById('photoUpload').files[0];
  const user = firebase.auth().currentUser;
  
  if (!file || !user) return;

  const uploadBtn = document.querySelector('#uploadForm button');
  uploadBtn.disabled = true;
  uploadBtn.textContent = 'Subiendo...';

  const storageRef = firebase.storage().ref(`photos/${user.uid}/${file.name}`);
  const uploadTask = storageRef.put(file);

  uploadTask.on('state_changed',
    null,
    (error) => {
      document.getElementById('uploadStatus').textContent = 'Error: ' + error.message;
      document.getElementById('uploadStatus').className = 'error';
      uploadBtn.disabled = false;
      uploadBtn.textContent = 'Subir Foto';
    },
    () => {
      document.getElementById('uploadStatus').textContent = '¡Foto subida con éxito!';
      document.getElementById('uploadStatus').className = 'status';
      document.getElementById('uploadForm').reset();
      document.getElementById('previewContainer').style.display = 'none';
      uploadBtn.disabled = false;
      uploadBtn.textContent = 'Subir Foto';
    }
  );
});
