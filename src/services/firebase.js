// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXcXEUrEuE5grUcfklT1hlfuVBnEzkOwg",
    authDomain: "wingmancvweb.firebaseapp.com",
    projectId: "wingmancvweb",
    storageBucket: "wingmancvweb.firebasestorage.app",
    messagingSenderId: "689401384386",
    appId: "1:689401384386:web:22b152298a6f553fbf1a5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
