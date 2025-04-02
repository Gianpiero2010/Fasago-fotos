document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("uploadForm")) {
        document.getElementById("uploadForm").addEventListener("submit", savePhoto);
    }
    if (document.getElementById("feed")) {
        loadPhotos();
    }
});

// Función para guardar la foto
function savePhoto() {
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
    feed.innerHTML = "";

    let photos = JSON.parse(localStorage.getItem("photos")) || [];

    photos.forEach(photo => {
        const post = document.createElement("div");
        post.className = "post";

        const img = document.createElement("img");
        img.src = photo.image;

        const caption = document.createElement("p");
        caption.textContent = photo.caption;

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "💾 Guardar Foto";
        saveBtn.onclick = function () {
            saveToLocalStorage(photo); // Guardar la foto al hacer clic
        };

        post.appendChild(img);
        post.appendChild(caption);
        post.appendChild(saveBtn);
        feed.appendChild(post);
    });
}

// Función para guardar la foto en localStorage
function saveToLocalStorage(photo) {
    let savedPhotos = JSON.parse(localStorage.getItem("savedPhotos")) || [];
    savedPhotos.push(photo);
    localStorage.setItem("savedPhotos", JSON.stringify(savedPhotos));

    alert("Foto guardada en tu galería.");
}
