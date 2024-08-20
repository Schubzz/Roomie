import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { doc, getDoc, onSnapshot, setDoc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useUser, User } from './UserContext';

interface WG {
    id: string;
    name: string;
    members: User[];
}

interface WGContextType {
    wg: WG | null;
    setWg: (wgId: string) => void;
    refreshWGData: () => void;
    updateWG: (wgName: string) => void;
}

const WGContext = createContext<WGContextType | undefined>(undefined);

export const WGProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useUser();
    const [wg, setWGState] = useState<WG | null>(null);

    const fetchWGData = async (wgId: string) => {
        const wgDoc = await getDoc(doc(db, 'wgs', wgId));
        if (wgDoc.exists()) {
            const wgData = wgDoc.data();
            const membersSnap = await getDocs(collection(db, `wgs/${wgId}/users`));
            const members = membersSnap.docs.map((doc) => doc.data() as User);
            setWGState({
                id: wgId,
                name: wgData?.name || '',
                members,
            });
        }
    };

    const setWg = (wgId: string) => {
        if (user) {
            updateDoc(doc(db, 'users', user.uid), { wgId });
            fetchWGData(wgId);
        }
    };

    const updateWG = async (wgName: string) => { // Neue Funktion zum Aktualisieren des WG-Namens
        if (wg && wg.id) {
            await updateDoc(doc(db, 'wgs', wg.id), { name: wgName });
            setWGState((prevWG) => prevWG ? { ...prevWG, name: wgName } : null);
        }
    };

    const refreshWGData = () => {
        if (user?.wgId) {
            fetchWGData(user.wgId);
        }
    };

    useEffect(() => {
        if (user?.wgId) {
            const unsubscribe = onSnapshot(doc(db, 'wgs', user.wgId), (doc) => {
                fetchWGData(doc.id);
            });
            return () => unsubscribe();
        }
    }, [user]);

    return (
        <WGContext.Provider value={{ wg, setWg, refreshWGData, updateWG }}>
            {children}
        </WGContext.Provider>
    );
};

export const useWG = () => {
    const context = useContext(WGContext);
    if (context === undefined) {
        throw new Error('useWG must be used within a WGProvider');
    }
    return context;
};
