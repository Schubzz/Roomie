import React, {useEffect, useState} from 'react';
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
    IonNote, IonIcon,
} from '@ionic/react';
import {Link, useHistory} from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebaseConfig';
import {useUser} from "../Context/UserContext";
import Welcome from "./Welcome";
import {Preferences} from "@capacitor/preferences";
import {arrowUndo} from "ionicons/icons";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const history = useHistory();
    const {user} = useUser();
    const [introSeen, setIntroSeen] = useState(true);
    const INTRO_KEY = "intro-seen";

    useEffect(() => {
        const checkStorage = async() => {
            const seen = await Preferences.get({ key: INTRO_KEY});
            setIntroSeen(seen.value === "true");
        }
        checkStorage();
    }, []);

    useEffect(() => {
        if (user) {
            history.push('/app');
        }
    }, [user, history]);

    const handleLogin = async() => {
        setLoading(true);
        setError(null);

        if (!email || !password) {
            setError("Bitte füllen Sie alle Felder aus.");
            setLoading(false);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            history.push('/app');
        } catch (error) {
            console.error('Fehler beim Anmelden:', error);
            setError("Ungültige Anmeldeinformationen.");
        } finally {
            setLoading(false);
        }
    };

    const finishIntro = async() => {
        setIntroSeen(true);
        Preferences.set({ key: INTRO_KEY, value: "true"});
    }

    const seeIntroAgain = () => {
        setIntroSeen(false);
        Preferences.remove({ key: INTRO_KEY });
    }


    return (
        <>
            {!introSeen ? (
                <Welcome onFinish={finishIntro}/>
            ) : (
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Anmelden</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent>
                        <IonCard className="ion-padding">
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
                            <IonButton expand="block" onClick={handleLogin} disabled={loading}>
                                Anmelden
                            </IonButton>

                            <Link to="/register">
                                <IonButton expand="block" fill="clear">
                                    Registrieren
                                </IonButton>
                            </Link>

                            <IonButton expand="block" fill="clear" onClick={seeIntroAgain} disabled={loading}>
                                <IonIcon icon={arrowUndo}/>   Intro
                            </IonButton>

                            <IonLoading isOpen={loading} message={'Bitte warten...'}/>
                        </IonCard>
                    </IonContent>
                </IonPage>
            )}
        </>
    );
};

export default Login;
