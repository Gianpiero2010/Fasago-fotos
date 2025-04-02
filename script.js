document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("uploadForm")) {
        document.getElementById("uploadForm").addEventListener("submit", savePhoto);
    }
    if (document.getElementById("feed")) {
        loadPhotos();
    }
});

// Función para guardar la foto
function savePhoto(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const fileInput = document.getElementById("fileInput");
    const captionInput = document.getElementById("captionInput");

    if (fileInput.files.length === 0) {
        alert("Selecciona una imagen.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const photoData = {
            id: Date.now(),
            image: event.target.result,
            caption: captionInput.value
        };

        let photos = JSON.parse(localStorage.getItem("photos")) || [];
        photos.push(photoData);
        localStorage.setItem("photos", JSON.stringify(photos));

        fileInput.value = "";
        captionInput.value = "";

        alert("Foto subida con éxito.");
        loadPhotos(); // Cargar fotos después de guardar
    };

    reader.readAsDataURL(fileInput.files[0]);
}

// Función para cargar fotos en la galería
function loadPhotos() {
    const feed = document.getElementById("feed");
    feed.innerHTML = ""; // Limpiar galería antes de cargar las nuevas fotos

    let photos = JSON.parse(localStorage.getItem("photos")) || [];

    photos.forEach(photo => {
        const post = document.createElement("div");
        post.className = "post";

        const img = document.createElement("img");
        img.src = photo.image;

        const caption = document.createElement("p");
        caption.textContent = photo.caption;

        // Botón de guardar foto
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "💾 Guardar Foto";
        saveBtn.onclick = function () {
            saveToLocalStorage(photo); // Guardar la foto al hacer clic
        };

        // Botón de eliminar foto
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌ Eliminar";
        deleteBtn.onclick = function () {
            deletePhoto(photo.id); // Eliminar la foto al hacer clic
        };

        // Botón de descargar foto
        const downloadBtn = document.createElement("button");
        downloadBtn.textContent = "⬇️ Descargar Foto";
        downloadBtn.onclick = function () {
            downloadPhoto(photo); // Descargar la foto al hacer clic
        };

        post.appendChild(img);
        post.appendChild(caption);
        post.appendChild(saveBtn);
        post.appendChild(downloadBtn);
        post.appendChild(deleteBtn);
        feed.appendChild(post);
    });
}

// Función para guardar la foto en una sección separada en localStorage
function saveToLocalStorage(photo) {
    let savedPhotos = JSON.parse(localStorage.getItem("savedPhotos")) || [];
    savedPhotos.push(photo);
    localStorage.setItem("savedPhotos", JSON.stringify(savedPhotos));

    alert("Foto guardada en tu galería.");
}

// Función para eliminar foto
function deletePhoto(photoId) {
    let photos = JSON.parse(localStorage.getItem("photos")) || [];
    photos = photos.filter(photo => photo.id !== photoId);
    localStorage.setItem("photos", JSON.stringify(photos));

    // Cargar nuevamente las fotos después de eliminar una
    loadPhotos();

    alert("Foto eliminada.");
}

// Función para descargar foto
function downloadPhoto(photo) {
    const link = document.createElement("a");
    link.href = photo.image; // Fuente de la imagen
    link.download = "foto-" + photo.id + ".png"; // Nombre de la imagen descargada
    link.click();
    alert("Descargando foto...");
}
