import React, { useEffect, useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonItem,
    IonLabel, IonLoading
} from '@ionic/react';
import { addDoc, collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useUser } from '../Context/UserContext';
import { useHistory } from 'react-router-dom';

const CreateWG: React.FC = () => {
    const [wgName, setWgName] = useState('');
    const { user, refreshUserData } = useUser();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const loadData = async () => {
            if (user) {
                await fetchUserData(user.uid);
                setLoading(false);
            }
        };
        loadData();
    }, [user]);

    const fetchUserData = async (uid: string) => {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            setUserData(userDoc.data());
        }
    };

    const handleCreateWG = async () => {
        try {
            if (user) {
                const wgRef = await addDoc(collection(db, 'wgs'), {
                    name: wgName,
                    members: [user.uid],
                });

                await setDoc(doc(db, 'wgs', wgRef.id, 'users', user.uid), {
                    displayName: userData?.displayName,
                    email: userData?.email,
                    uid: user.uid,
                    wgId: wgRef.id,
                });

                await setDoc(doc(db, 'users', user.uid), {
                    wgId: wgRef.id,
                }, { merge: true });

                history.replace('/app');
                window.location.reload();
            }
        } catch (error) {
            console.error('Fehler beim Erstellen der WG:', error);
        }
    };


    if (loading || !user || !userData) {
        return (
            <IonContent>
                <IonLoading isOpen={loading} message="Momentchen..." spinner="bubbles" />
            </IonContent>
        );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>WG gründen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">WG Name</IonLabel>
                    <IonInput value={wgName} onIonInput={(e: any) => setWgName(e.target.value)} />
                </IonItem>
                <IonButton expand="block" onClick={handleCreateWG}>WG gründen</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default CreateWG;
