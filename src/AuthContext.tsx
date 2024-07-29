import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config/firebaseConfig';

interface AuthContextType {
    user: User | null;
    wgId: string | null;
    setWgId: (wgId: string) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [wgId, setWgId] = useState<string | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData?.wgId) {
                        setWgId(userData.wgId);
                    }
                }
            } else {
                setUser(null);
                setWgId(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const updateWgId = (wgId: string) => {
        setWgId(wgId);
        if (user) {
            setDoc(doc(db, 'users', user.uid), { wgId }, { merge: true });
        }
    };

    return (
        <AuthContext.Provider value={{ user, wgId, setWgId: updateWgId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
