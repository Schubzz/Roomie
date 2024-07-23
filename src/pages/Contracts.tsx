import React, { useState } from 'react';
import {
    IonButton,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage, IonIcon, IonText, IonInput
} from '@ionic/react';
import {addCircleSharp} from "ionicons/icons";
import Modal from "../components/Modal";

function Contracts() {

    const [showModal, setShowModal] = useState(false);

    const handleSave = () => {
        // Logik zum Speichern der Daten
        console.log("Eintrag hinzugefügt")
        setShowModal(false);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Verträge</IonTitle>
                    <IonButton slot="end" onClick={() => setShowModal(true)}>
                        <IonIcon icon={addCircleSharp}/>
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

                <IonText>Verträge Auflistung</IonText>

                <Modal isOpen={showModal}
                       title="Neuer Vertrag"
                       onClose={() => setShowModal(false)}
                       onSave={handleSave}
                >
                    <IonInput placeholder='alle Verträge'/>

                </Modal>


            </IonContent>
        </IonPage>
    );
}

export default Contracts;