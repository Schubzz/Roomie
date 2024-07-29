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
  IonList,
  IonLoading,
  IonAlert,
  IonBackButton,
  IonButtons,
} from '@ionic/react';
import { updateProfile, deleteUser } from 'firebase/auth';
import { doc, updateDoc, deleteDoc, collection, getDocs, arrayRemove } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { auth, db } from '../config/firebaseConfig';

const Settings: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [userName, setUserName] = useState(user?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const history = useHistory();

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
      history.push('/login');
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
          </IonList>
          <IonButton expand="block" onClick={handleUpdateProfile} disabled={loading}>
            Profil aktualisieren
          </IonButton>
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
