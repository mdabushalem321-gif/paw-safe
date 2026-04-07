// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXSCIrXxZwuT2kqxjHWqxk5xAl2BxyOOk",
    authDomain: "paw-paw-ceedf.firebaseapp.com",
    projectId: "paw-paw-ceedf",
    storageBucket: "paw-paw-ceedf.firebasestorage.app",
    messagingSenderId: "802085775276",
    appId: "1:802085775276:web:9458458621ccc7f0d93c09",
    measurementId: "G-D07TYWHY42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, db, storage, collection, addDoc, getDocs, query, orderBy, limit, onSnapshot, ref, uploadBytes, getDownloadURL };
