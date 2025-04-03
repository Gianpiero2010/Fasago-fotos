// home.js - Lógica para la página de inicio
document.addEventListener('DOMContentLoaded', function() {
    // Inicialización
    const auth = firebase.auth();
    const db = firebase.firestore();
    const recentPhotosContainer = document.getElementById('recentPhotos');
    const logoutBtn = document.getElementById('logoutBtn');

    // Verificar autenticación
    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.href = 'login.html';
        } else {
            loadRecentPhotos(user.uid);
        }
    });

    // Cargar últimas 4 fotos del usuario
    async function loadRecentPhotos(userId) {
        try {
            recentPhotosContainer.innerHTML = '<div class="loading-spinner"></div>';
            
            const querySnapshot = await db.collection('photos')
                .where('userId', '==', userId)
                .orderBy('createdAt', 'desc')
                .limit(4)
                .get();

            if (querySnapshot.empty) {
                recentPhotosContainer.innerHTML = `
                    <div class="no-photos">
                        <p>Aún no tienes fotos subidas</p>
                        <a href="upload.html" class="upload-cta-btn">Sube tu primera foto</a>
                    </div>
                `;
                return;
            }

            recentPhotosContainer.innerHTML = '';
            querySnapshot.forEach(doc => {
                const photo = doc.data();
                createPhotoCard(photo);
            });
        } catch (error) {
            console.error("Error al cargar fotos:", error);
            recentPhotosContainer.innerHTML = `
                <div class="error-message">
                    <p>Error al cargar las fotos. Intenta recargar la página.</p>
                </div>
            `;
        }
    }

    // Crear tarjeta de foto
    function createPhotoCard(photo) {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.innerHTML = `
            <img src="${photo.imageURL}" alt="${photo.caption || 'Foto del usuario'}" loading="lazy">
            <div class="photo-overlay">
                <p class="photo-caption">${photo.caption || ''}</p>
                <div class="photo-stats">
                    <span class="likes">❤️ ${photo.likes || 0}</span>
                    <span class="comments">💬 ${photo.comments?.length || 0}</span>
                </div>
            </div>
        `;
        recentPhotosContainer.appendChild(photoCard);
    }

    // Cerrar sesión
    logoutBtn.addEventListener('click', function() {
        auth.signOut()
            .then(() => window.location.href = 'login.html')
            .catch(error => {
                console.error("Error al cerrar sesión:", error);
                alert("Ocurrió un error al cerrar sesión. Intenta nuevamente.");
            });
    });
});
