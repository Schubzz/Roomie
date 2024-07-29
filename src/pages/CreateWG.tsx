import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';
import {addDoc, collection, doc, setDoc} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const CreateWG: React.FC = () => {
    const [wgName, setWgName] = useState('');
    const { user, setWgId } = useAuth();
    const history = useHistory();

    const handleCreateWG = async () => {
        try {
            if (user) {
                const wgRef = await addDoc(collection(db, 'wgs'), {
                    name: wgName,
                    members: [user.uid]
                });

                // Setze die wgId für den Benutzer innerhalb der WG
                await setDoc(doc(db, 'wgs', wgRef.id, 'users', user.uid), {
                    name: user.displayName || 'Unbekannt',
                    wgId: wgRef.id
                });

                // Aktualisiere das Benutzerprofil auf der obersten Ebene
                await setDoc(doc(db, 'users', user.uid), {
                    wgId: wgRef.id
                });

                setWgId(wgRef.id); // Update wgId im AuthContext

                history.push('/app');
            }
        } catch (error) {
            console.error('Fehler beim Erstellen der WG:', error);
        }
    };

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
