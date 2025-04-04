// Cargar fotos al iniciar
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const photoGrid = document.getElementById('photoGrid');
    photoGrid.innerHTML = '<p>Cargando fotos...</p>';
    
    firebase.storage().ref(`photos/${user.uid}`).listAll()
      .then(result => {
        if (result.items.length === 0) {
          photoGrid.innerHTML = '<p>No hay fotos. <a href="upload.html">Sube la primera</a></p>';
          return;
        }
        
        photoGrid.innerHTML = '';
        result.items.forEach(item => {
          item.getDownloadURL().then(url => {
            photoGrid.innerHTML += `
              <div class="photo-card">
                <img src="${url}" loading="lazy">
              </div>
            `;
          });
        });
      })
      .catch(error => {
        photoGrid.innerHTML = `<p class="error">Error al cargar fotos: ${error.message}</p>`;
      });
  }
});
