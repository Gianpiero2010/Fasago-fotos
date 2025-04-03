// upload.js - Manejo completo de la subida de fotos

// 1. Configuración inicial
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si Firebase está inicializado
    if (typeof firebase === 'undefined') {
        console.error('Firebase no está cargado');
        return;
    }

    // Elementos del DOM
    const fileInput = document.getElementById('fileInput');
    const captionInput = document.getElementById('captionInput');
    const uploadForm = document.getElementById('uploadForm');
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const clearPreviewBtn = document.getElementById('clearPreview');
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('uploadStatus');

    // 2. Vista previa de la imagen
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Validar tipo de archivo
        if (!file.type.match('image.*')) {
            showStatus('Solo se permiten imágenes (JPEG, PNG, WEBP)', 'error');
            resetFileInput();
            return;
        }

        // Validar tamaño (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showStatus('La imagen es demasiado grande (máx. 5MB)', 'error');
            resetFileInput();
            return;
        }

        // Mostrar vista previa
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            previewContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });

    // 3. Limpiar vista previa
    clearPreviewBtn.addEventListener('click', function() {
        resetFileInput();
        previewContainer.style.display = 'none';
    });

    // 4. Manejar envío del formulario
    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const file = fileInput.files[0];
        const caption = captionInput.value.trim();

        // Validaciones finales
        if (!file) {
            showStatus('Por favor selecciona una imagen', 'error');
            return;
        }

        try {
            // Mostrar estado de carga
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Subiendo... <span class="spinner"></span>';

            // Subir a Firebase Storage
            const user = firebase.auth().currentUser;
            if (!user) throw new Error('Usuario no autenticado');

            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`photos/${user.uid}/${Date.now()}_${file.name}`);
            const uploadTask = fileRef.put(file);

            // Opcional: Mostrar progreso
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Progreso: ' + progress + '%');
                },
                (error) => {
                    throw error;
                },
                async () => {
                    // Subida completada
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

                    // Guardar metadatos en Firestore
                    await firebase.firestore().collection('photos').add({
                        userId: user.uid,
                        imageURL: downloadURL,
                        caption: caption,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        likes: 0,
                        comments: []
                    });

                    // Éxito
                    showStatus('¡Foto subida con éxito!', 'success');
                    resetForm();
                }
            );
        } catch (error) {
            console.error('Error al subir:', error);
            showStatus('Error: ' + error.message, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Subir Foto';
        }
    });

    // 5. Funciones auxiliares
    function resetFileInput() {
        fileInput.value = '';
        imagePreview.src = '';
    }

    function resetForm() {
        uploadForm.reset();
        previewContainer.style.display = 'none';
    }

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
        statusMessage.style.display = 'block';
        
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 5000);
    }

    // 6. Verificar autenticación
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location.href = 'login.html';
        }
    });
});
