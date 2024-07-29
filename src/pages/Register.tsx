import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { useHistory } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const history = useHistory();

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Setze den displayName für den Benutzer
            await updateProfile(user, {
                displayName: userName
            });

            // Speichere die Benutzerinformationen in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: userName,
                wgId: null,
            });

            history.push('/select-wg');
        } catch (error) {
            console.error("Fehler bei der Registrierung: ", error);
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
                    <IonInput value={userName} onIonInput={(e: any) => setUserName(e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput type="email" value={email} onIonInput={(e: any) => setEmail(e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Passwort</IonLabel>
                    <IonInput type="password" value={password} onIonInput={(e: any) => setPassword(e.target.value)} />
                </IonItem>
                <IonButton expand="block" onClick={handleRegister}>Registrieren</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Register;
