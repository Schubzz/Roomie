import React, { useEffect, useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonList,
    IonItem,
    IonLabel
} from '@ionic/react';
import { getDocs, collection, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const SelectWG: React.FC = () => {
    const [wgs, setWgs] = useState([]);
    const { user } = useAuth();
    const history = useHistory();

    const getWgs = async () => {
        try {
            const data = await getDocs(collection(db, 'wgs'));
            const wgList = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setWgs(wgList);
        } catch (err) {
            console.error(err);
        }
    };

    const joinWG = async (wgId) => {
        try {
            const wgRef = doc(db, `wgs/${wgId}`);
            const wgSnap = await getDoc(wgRef);
            const wgData = wgSnap.data();

            if (wgData) {
                const updatedMembers = [...wgData.members, user?.uid];
                await updateDoc(wgRef, {
                    members: updatedMembers,
                });

                const userRefInWG = doc(db, `wgs/${wgId}/users/${user?.uid}`);
                const userSnapInWG = await getDoc(userRefInWG);

                if (!userSnapInWG.exists()) {
                    await setDoc(userRefInWG, {
                        wgId,
                        name: user?.displayName || "Unbekannt"
                    });
                }

                // Update the user document on the top level
                const userRef = doc(db, `users/${user?.uid}`);
                await updateDoc(userRef, {
                    wgId,
                });

                history.push('/app');
            } else {
                console.error("WG not found");
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getWgs();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>WG Auswählen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    {wgs.map((wg) => (
                        <IonItem key={wg.id} button onClick={() => joinWG(wg.id)}>
                            <IonLabel>{wg.name}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
                <IonButton expand="block" onClick={() => history.push('/create-wg')}>Neue WG gründen</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default SelectWG;
