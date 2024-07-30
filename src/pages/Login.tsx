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
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import {useUser} from "../Context/UserContext";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { user } = useUser();

    const handleLogin = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            history.push('/app');
        } catch (error) {
            console.error('Fehler beim Anmelden:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Anmelden</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
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
                <IonButton expand="block" onClick={handleLogin} disabled={loading}>
                    Anmelden
                </IonButton>
                <IonLoading isOpen={loading} message={'Bitte warten...'} />
            </IonContent>
        </IonPage>
    );
};

export default Login;
