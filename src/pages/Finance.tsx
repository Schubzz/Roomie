import React, { useState } from 'react';
import {
    IonButton,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage, IonIcon, IonText, IonInput, IonLabel, IonSegment, IonSegmentButton
} from '@ionic/react';
import {addCircleSharp} from "ionicons/icons";
import Modal from "../components/Modal";

function Finance() {

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
                    <IonTitle>Finanzen</IonTitle>
                    <IonButton slot="end" onClick={() => setShowModal(true)}>
                        <IonIcon icon={addCircleSharp}/>
                    </IonButton>
                </IonToolbar>

                <IonToolbar>
                    <IonSegment value="finance">
                        <IonSegmentButton value="finanance">
                            <IonLabel>Finanzen</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="saldos">
                            <IonLabel>Saldos</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

                <IonText>Finanz Auflistung</IonText>

                <Modal isOpen={showModal}
                       title="Neuer Eintrag"
                       onClose={() => setShowModal(false)}
                       onSave={handleSave}
                >
                    <IonInput placeholder='neuer Finanzeintrag'/>

                </Modal>


            </IonContent>
        </IonPage>
    );
}

export default Finance;