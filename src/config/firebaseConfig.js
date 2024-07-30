import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat";

// Firebase Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyDJWSALbpixqM3spGgM3PeFOVUudGvNr9I",
    authDomain: "roomie-d356b.firebaseapp.com",
    projectId: "roomie-d356b",
    storageBucket: "roomie-d356b.appspot.com",
    messagingSenderId: "265935400090",
    appId: "1:265935400090:web:058e2131ccea61232c8323",
    measurementId: "G-M912629J7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Auth-Persistenz setzen
setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Auth persistence enabled");
    })
    .catch((error) => {
        console.error("Error setting auth persistence:", error);
    });

// Firestore Offline-Persistenz aktivieren
db.enablePersistence()
    .then(() => {
        console.log("Offline persistence enabled");
    })
    .catch((err) => {
        if (err.code === 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled in one tab at a time
            console.error("Persistence failed: Multiple tabs open");
        } else if (err.code === 'unimplemented') {
            // The current browser does not support all of the features required to enable persistence
            console.error("Persistence is not available");
        }
    });

export { auth, db };

firebase.firestore().enablePersistence()
    .catch((err) => {
        if (err.code === 'failed-precondition') {

        } else if (err.code === 'unimplemented') {

        }
    });
// Subsequent queries will use persistence, if it was enabled successfully