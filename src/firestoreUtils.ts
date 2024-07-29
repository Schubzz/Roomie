import { db } from './config/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export async function deleteCollection(path: string) {
    const collectionRef = collection(db, path);
    const snapshot = await getDocs(collectionRef);

    const promises = snapshot.docs.map(async (docSnapshot) => {
        const docRef = doc(db, path, docSnapshot.id);
        await deleteDoc(docRef);

        // Check for subcollections
        const subCollections = await getDocs(collection(db, docRef.path));
        subCollections.forEach((subCollection) => {
            deleteCollection(subCollection.ref.path);
        });
    });

    await Promise.all(promises);
}
