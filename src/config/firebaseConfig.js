import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore }  from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDJWSALbpixqM3spGgN3PeFOVUudGvNr9I",
    authDomain: "roomie-d356b.firebaseapp.com",
    projectId: "roomie-d356b",
    storageBucket: "roomie-d356b.appspot.com",
    messagingSenderId: "265935400090",
    appId: "1:265935400090:web:058e2131ccea61232c8323",
    measurementId: "G-M912629J7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);