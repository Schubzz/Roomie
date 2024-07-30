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
    IonLabel,
    IonLoading,
} from '@ionic/react';
import { getDocs, collection, updateDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useUser } from '../Context/UserContext';
import { useHistory } from 'react-router-dom';

const SelectWG: React.FC = () => {
    const { user, refreshUserData } = useUser();
    const [wgs, setWgs] = useState([]);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const loadData = async () => {
            if (user) {
                await fetchUserData(user.uid);
                await getWgs();
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

    const joinWG = async (wgId: string) => {
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
                await setDoc(userRefInWG, {
                    wgId,
                    displayName: userData?.displayName,
                    email: userData?.email,
                    uid: user?.uid,
                });

                const userRef = doc(db, `users/${user?.uid}`);
                await updateDoc(userRef, {
                    wgId,
                });

                history.push('/app');
                window.location.reload();
            } else {
                console.error("WG not found");
            }
        } catch (err) {
            console.error(err);
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
