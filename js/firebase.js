import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

// Configuración de Firebase usando variables de entorno de Vite.
// Defina estas variables en un archivo .env (por ejemplo .env.local) en la raíz del proyecto:
// VITE_FIREBASE_API_KEY=...
// VITE_FIREBASE_AUTH_DOMAIN=...
// VITE_FIREBASE_DATABASE_URL=...
// VITE_FIREBASE_PROJECT_ID=...
// VITE_FIREBASE_STORAGE_BUCKET=...
// VITE_FIREBASE_MESSAGING_SENDER_ID=...
// VITE_FIREBASE_APP_ID=...

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const saveVotes = (productID) => {
    const starCountRef = ref(database, 'votes');
    const newVoteRef = push(votesRef)

    return set(newVoteRef, {
        productID: productID,
        timestamp: Date.now()
    })
    .then(()=>{
        return {
            status: true,
            message: "Voto guardado"
        }
    })
    .catch((error) => {
        console.error("Error al guardar el voto", error)
        return{
            status: false,
            message: "Error saving vote"
        }
    });
}