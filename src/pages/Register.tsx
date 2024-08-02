import React, { useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonLoading,
    IonCard,
    IonNote,
} from '@ionic/react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { Link, useHistory } from 'react-router-dom';
import { useUser } from '../Context/UserContext';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const history = useHistory();
    const { updateUser } = useUser();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleRegister = async () => {
        setLoading(true);
        setError(null);

        if (!email || !password || !displayName) {
            setError("Bitte füllen Sie alle Felder aus.");
            setLoading(false);
            return;
        }
        if (displayName.length < 2 || displayName.length > 16) {
            setError("Der Name muss zwischen 2 und 16 Zeichen lang sein.");
            setLoading(false);
            return;
        }
        if (!validateEmail(email)) {
            setError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
            setLoading(false);
            return;
        }
        if (password.length < 8) {
            setError("Das Passwort muss mindestens 8 Zeichen lang sein.");
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName,
            });

            const userDocData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                wgId: null,
            };

            await setDoc(doc(db, 'users', user.uid), userDocData);
            updateUser(userDocData);

            history.push('/select-wg');
            window.location.reload();
        } catch (error) {
            console.error('Fehler bei der Registrierung:', error);
            setError("Fehler bei der Registrierung. Bitte versuchen Sie es erneut.");
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

            <IonContent>
                <IonCard className="ion-padding">
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
                    {error && (
                        <IonNote color="danger">
                            {error}
                        </IonNote>
                    )}
                    <IonButton expand="block" onClick={handleRegister} disabled={loading}>
                        Registrieren
                    </IonButton>

                    <Link to="/login">
                        <IonButton expand="block" fill="clear">
                            Login
                        </IonButton>
                    </Link>

                    <IonLoading isOpen={loading} message='Momentchen...' spinner="bubbles" />
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Register;
