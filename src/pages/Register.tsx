// Register.tsx
import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel, IonLoading } from '@ionic/react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { updateUser } = useAuth();

    const handleRegister = async () => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Set the display name
            await updateProfile(user, {
                displayName: displayName,
            });

            const userDocData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                wgId: null,
            };

            // Save user info in Firestore
            await setDoc(doc(db, 'users', user.uid), userDocData);

            // Update the user context
            updateUser(userDocData);

            history.push('/select-wg');
        } catch (error) {
            console.error('Fehler bei der Registrierung:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registrieren</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Name</IonLabel>
                    <IonInput
                        value={displayName}
                        onIonInput={(e: any) => setDisplayName(e.target.value)}
                        required
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">E-Mail</IonLabel>
                    <IonInput
                        type="email"
                        value={email}
                        onIonInput={(e: any) => setEmail(e.target.value)}
                        required
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Passwort</IonLabel>
                    <IonInput
                        type="password"
                        value={password}
                        onIonInput={(e: any) => setPassword(e.target.value)}
                        required
                    />
                </IonItem>
                <IonButton expand="block" onClick={handleRegister} disabled={loading}>
                    Registrieren
                </IonButton>
                <IonLoading isOpen={loading} message={'Bitte warten...'} />
            </IonContent>
        </IonPage>
    );
};

export default Register;
