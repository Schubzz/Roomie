import React, {useState} from 'react';
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {deleteUser, updateProfile} from 'firebase/auth';
import {arrayRemove, collection, deleteDoc, doc, getDocs, updateDoc} from 'firebase/firestore';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../AuthContext';
import {auth, db} from '../config/firebaseConfig';

const Settings: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [userName, setUserName] = useState(user?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const history = useHistory();

  const getRoommates = async () => {
    if (user?.wgId) {
      const usersCollectionRef = collection(db, `wgs/${user.wgId}/users`);
      const data = await getDocs(usersCollectionRef);
      return data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    }
    return [];
  };

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

      // Reload roommates data to reflect the updated displayName
      await getRoommates();

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
