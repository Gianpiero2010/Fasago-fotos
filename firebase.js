// Importaciones modernas (SDK v9+)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Tu configuración (¡NO compartas esto públicamente!)
const firebaseConfig = {
  apiKey: "AIzaSyCkNgikdUByZmfAIAMcvBiw5t9hKewtFPQ",
  authDomain: "fasago-fotos-4a5fd.firebaseapp.com",
  projectId: "fasago-fotos-4a5fd",
  storageBucket: "fasago-fotos-4a5fd.firebasestorage.app",
  messagingSenderId: "271898420621",
  appId: "1:271898420621:web:6010ea98a75b2ec257c9c4"
};

// Inicialización explícita
const app = initializeApp(firebaseConfig);

// Exporta los servicios
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// Verificación (opcional)
console.log("Firebase inicializado:", app.name); // Debe mostrar "[DEFAULT]"
