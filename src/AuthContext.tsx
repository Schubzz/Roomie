// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config/firebaseConfig';

interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    wgId: string | null;
}

interface AuthContextType {
    user: User | null;
    setWgId: (wgId: string) => void;
    updateUser: (updates: Partial<User>) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data() as User;
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName || userData.displayName,
                        wgId: userData.wgId,
                    });
                }
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const setWgId = (wgId: string) => {
        if (user) {
            setUser({ ...user, wgId });
            setDoc(doc(db, 'users', user.uid), { wgId }, { merge: true });
        }
    };

    const updateUser = (updates: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            setDoc(doc(db, 'users', user.uid), updates, { merge: true });
        }
    };

    return (
        <AuthContext.Provider value={{ user, setWgId, updateUser }}>
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
