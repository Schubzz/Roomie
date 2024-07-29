import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from './config/firebaseConfig';

export const saveDisplayNameInWG = async (userId: string, wgId: string, displayName: string) => {
    const userRefInWG = doc(db, `wgs/${wgId}/users/${userId}`);
    await setDoc(userRefInWG, {
        displayName: displayName
    }, { merge: true });
};

export const updateUserDisplayNameInWG = async (userId: string, wgId: string, displayName: string) => {
    const userRefInWG = doc(db, `wgs/${wgId}/users/${userId}`);
    await updateDoc(userRefInWG, {
        displayName: displayName
    });
};
