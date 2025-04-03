document.addEventListener("DOMContentLoaded", function() {
    // Verifica si el usuario está autenticado
    if (!firebase.auth().currentUser) {
        window.location.href = "login.html"; // Si no está autenticado, redirige a login
    }

    // Cargar las fotos desde Firebase Storage
    loadPhotos();
});

// Función para cargar las fotos
function loadPhotos() {
    const photoFeed = document.getElementById('photoFeed');
    const user = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref();
    const userPhotosRef = storageRef.child('photos/' + user.uid);

    userPhotosRef.listAll().then((res) => {
        res.items.forEach((itemRef) => {
            itemRef.getDownloadURL().then((url) => {
                const photoDiv = document.createElement('div');
                photoDiv.className = 'photo';

                const img = document.createElement('img');
                img.src = url;
                photoDiv.appendChild(img);

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = '❌';
                deleteBtn.onclick = function() {
                    deletePhoto(itemRef);
                };
                photoDiv.appendChild(deleteBtn);

                const downloadBtn = document.createElement('a');
                downloadBtn.className = 'download-btn';
                downloadBtn.href = url;
                downloadBtn.download = itemRef.name;
                downloadBtn.textContent = '⬇️';
                photoDiv.appendChild(downloadBtn);

                photoFeed.appendChild(photoDiv);
            });
        });
    }).catch((error) => {
        console.error("Error al cargar las fotos: ", error);
    });
}

// Función para eliminar una foto
function deletePhoto(itemRef) {
    itemRef.delete().then(() => {
        alert('Foto eliminada con éxito');
        loadPhotos(); // Recargar las fotos después de eliminar
    }).catch((error) => {
        console.error('Error al eliminar la foto: ', error);
    });
}
