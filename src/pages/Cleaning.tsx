import React, {useState} from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonInput, IonButtons
} from '@ionic/react';
import {cog} from 'ionicons/icons';
import Modal from '../components/Modal';
import UserInfo from "../components/UserInfo";
import WGInfo from "../components/WGInfo";
import {Link} from "react-router-dom";

const Cleaning = () => {
    const [showModal, setShowModal] = useState(false);

    const handleSave = () => {
        // Logik zum Speichern der Daten
        console.log("Task added: ")
        setShowModal(false);
    };

    return (
        <IonPage>
            <IonHeader className="contract-header">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton>
                            <Link to="/settings">
                                <IonIcon icon={cog} size="large" color="dark" />
                            </Link>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Putzen</IonTitle>
                </IonToolbar>

                <IonToolbar>
                    <div className="relative-container">
                            Hier funktion einbauen
                    </div>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

               <UserInfo/>
                <WGInfo />

                <Modal isOpen={showModal}
                       title="Neue Aufgabe"
                       onClose={() => setShowModal(false)}
                       onSave={handleSave}
                >
                    <IonInput placeholder='Hi'/>

                </Modal>

            </IonContent>

        </IonPage>
    );
};

export default Cleaning;
