import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import {IonLoading} from "@ionic/react";

export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    wgId: string | null;
}

interface UserContextType {
    user: User | null;
    updateUser: (updates: Partial<User>) => void;
    refreshUserData: () => void;
    loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    const fetchUserData = async (uid: string) => {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
                uid,
                email: userData?.email || null,
                displayName: userData?.displayName || null,
                wgId: userData?.wgId || null,
            });
        }
    };

    const updateUser = async (updates: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            await setDoc(doc(db, 'users', user.uid), updates, { merge: true });
        }
    };

    const refreshUserData = async () => {
        if (user) {
            await fetchUserData(user.uid);
        }
    };

    useEffect(() => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                    if (firebaseUser) {
                        await fetchUserData(firebaseUser.uid);
                    } else {
                        setUser(null);
                    }
                    setLoading(false);
                });
                return () => unsubscribe();
            })
            .catch((error) => {
                console.error("Fehler beim Einstellen der Auth-Persistenz:", error);
                setLoading(false);
            });
    }, [auth]);

    return (
        <UserContext.Provider value={{ user, updateUser, refreshUserData, loading }}>
            {loading ? <IonLoading isOpen={true} message={'Momentchen...'} /> : children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
