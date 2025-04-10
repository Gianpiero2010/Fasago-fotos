document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("uploadForm")) {
        document.getElementById("uploadForm").addEventListener("submit", savePhoto);
    }
    if (document.getElementById("feed")) {
        loadPhotos();
    }
});

// Guardar foto en localStorage
function savePhoto(event) {
    event.preventDefault();

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
        loadPhotos(); // Recargar la galería después de subir la foto
    };

    reader.readAsDataURL(fileInput.files[0]);
}

// Cargar fotos en la galería
function loadPhotos() {
    const feed = document.getElementById("feed");
    if (!feed) return;
    feed.innerHTML = "";

    let photos = JSON.parse(localStorage.getItem("photos")) || [];

    photos.forEach(photo => {
        const post = document.createElement("div");
        post.className = "post";

        const img = document.createElement("img");
        img.src = photo.image;

        const caption = document.createElement("p");
        caption.textContent = photo.caption;

        // Botón de eliminar
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌ Eliminar";
        deleteBtn.onclick = function () {
            deletePhoto(photo.id);
        };

        // Botón de descarga
        const downloadBtn = document.createElement("a");
        downloadBtn.textContent = "⬇️ Descargar";
        downloadBtn.href = photo.image;
        downloadBtn.download = `foto_${photo.id}.png`;
        downloadBtn.className = "download-btn";

        post.appendChild(img);
        post.appendChild(caption);
        post.appendChild(deleteBtn);
        post.appendChild(downloadBtn);
        feed.appendChild(post);
    });
}

// Eliminar foto
function deletePhoto(photoId) {
    let photos = JSON.parse(localStorage.getItem("photos")) || [];
    photos = photos.filter(photo => photo.id !== photoId);
    localStorage.setItem("photos", JSON.stringify(photos));
    loadPhotos();
}
