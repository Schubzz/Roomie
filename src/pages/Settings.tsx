import React, { useState, useEffect } from 'react';
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
  IonList,
  IonLoading,
  IonAlert,
  IonBackButton,
  IonButtons,
  IonListHeader,
} from '@ionic/react';
import { updateProfile, deleteUser } from 'firebase/auth';
import { doc, updateDoc, deleteDoc, collection, getDocs, arrayRemove, getDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../config/firebaseConfig';
import { useUser } from '../Context/UserContext';
import { useWG } from '../Context/WGContext';

const Settings: React.FC = () => {
  const { user, updateUser, refreshUserData } = useUser();
  const { wg, updateWG } = useWG();
  const [userName, setUserName] = useState(user?.displayName || '');
  const [wgName, setWGName] = useState(wg?.name || '');
  const [wgMembers, setWGMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchWGMembers = async () => {
      if (wg?.id) {
        const membersCollection = collection(db, `wgs/${wg.id}/users`);
        const membersSnapshot = await getDocs(membersCollection);
        const membersList = membersSnapshot.docs.map(doc => doc.data().displayName);
        setWGMembers(membersList);
      }
    };

    fetchWGMembers();
  }, [wg]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser!, {
        displayName: userName,
      });

      // Update Firestore user document
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName: userName,
      });

      // Update Firestore user document in WG collection
      if (user.wgId) {
        const userRefInWG = doc(db, `wgs/${user.wgId}/users/${user.uid}`);
        await updateDoc(userRefInWG, {
          displayName: userName,
        });
      }

      updateUser({ displayName: userName });
      refreshUserData();

      setAlertMessage('Profil aktualisiert!');
      setShowAlert(true);
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Profils:', error);
      setAlertMessage('Fehler beim Aktualisieren des Profils.');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateWGName = async () => {
    if (!wg?.id) return;

    setLoading(true);
    try {
      const wgRef = doc(db, 'wgs', wg.id);
      await updateDoc(wgRef, {
        name: wgName,
      });

      updateWG(wgName);

      setAlertMessage('WG-Name aktualisiert!');
      setShowAlert(true);
    } catch (error) {
      console.error('Fehler beim Aktualisieren des WG-Namens:', error);
      setAlertMessage('Fehler beim Aktualisieren des WG-Namens.');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const deleteCollection = async (collectionRef) => {
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(docSnapshot.ref);
    });
  };

  const handleDeleteProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      if (user.wgId) {
        // Recursively delete user's subcollections and documents
        const userCollectionRef = collection(db, `wgs/${user.wgId}/users/${user.uid}/subcollection`);
        await deleteCollection(userCollectionRef);

        // Delete the user document in the WG collection
        await deleteDoc(doc(db, `wgs/${user.wgId}/users/${user.uid}`));

        // Remove user from WG members list
        const wgRef = doc(db, 'wgs', user.wgId);
        await updateDoc(wgRef, {
          members: arrayRemove(user.uid)
        });
      }

      // Delete Firestore user document in the top-level collection
      const userRef = doc(db, 'users', user.uid);
      await deleteDoc(userRef);

      // Delete Firebase Auth user
      await deleteUser(auth.currentUser!);

      setAlertMessage('Profil gelöscht!');
      setShowAlert(true);

      // Redirect to register page
      history.push('/');
    } catch (error) {
      console.error('Fehler beim Löschen des Profils:', error);
      setAlertMessage('Fehler beim Löschen des Profils.');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      history.push('/');
    } catch (error) {
      console.error('Fehler beim Abmelden:', error);
    }
  };

  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>Einstellungen</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Benutzername</IonLabel>
              <IonInput
                  value={userName}
                  onIonInput={(e: any) => setUserName(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">WG-Name</IonLabel>
              <IonInput
                  value={wgName}
                  onIonInput={(e: any) => setWGName(e.target.value)}
              />
            </IonItem>
          </IonList>
          <IonButton expand="block" onClick={handleUpdateProfile} disabled={loading}>
            Profil aktualisieren
          </IonButton>
          <IonButton expand="block" onClick={handleUpdateWGName} disabled={loading}>
            WG-Name aktualisieren
          </IonButton>
          <IonList>
            <IonListHeader>
              Mitbewohner
            </IonListHeader>
            {wgMembers.map((member, index) => (
                <IonItem key={index}>
                  <IonLabel>{member}</IonLabel>
                </IonItem>
            ))}
          </IonList>
          <IonButton expand="block" color="danger" onClick={handleDeleteProfile} disabled={loading}>
            Profil löschen
          </IonButton>
          <IonButton expand="block" color="medium" onClick={handleLogout}>
            Abmelden
          </IonButton>
          <IonLoading isOpen={loading} message={'Bitte warten...'} />
          <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              message={alertMessage}
              buttons={['OK']}
          />
        </IonContent>
      </IonPage>
  );
};

export default Settings;
