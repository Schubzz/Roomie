import {initializeApp} from "firebase/app";
import {getAuth, setPersistence, browserLocalPersistence} from "firebase/auth";
import {
    getFirestore,
    enableIndexedDbPersistence,
    disableNetwork,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager,
    CACHE_SIZE_UNLIMITED
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDJWSALbpixqM3spGgN3PeFOVUudGvNr9I",
    authDomain: "roomie-d356b.firebaseapp.com",
    projectId: "roomie-d356b",
    storageBucket: "roomie-d356b.appspot.com",
    messagingSenderId: "265935400090",
    appId: "1:265935400090:web:058e2131ccea61232c8323",
    measurementId: "G-M912629J7V"
};

const app = initializeApp(firebaseConfig);

initializeFirestore(app,
    {
        localCache:
            persistentLocalCache(/*settings*/{tabManager: persistentMultipleTabManager()}),

    });


const auth = getAuth(app);
const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
        console.error("Fehler beim Einstellen der Auth-Persistenz:", error);
    });

// enableIndexedDbPersistence(db)
//     .catch((err) => {
//         if (err.code === 'failed-precondition') {
//             console.error("Mehrere Tabs geöffnet, Persistenz kann nur in einem Tab aktiviert werden:", err);
//         } else if (err.code === 'unimplemented') {
//             console.error("Persistenz ist in diesem Browser nicht verfügbar:", err);
//         }
//     });

export {auth, db};
