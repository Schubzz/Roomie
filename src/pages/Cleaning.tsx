import React, {useState} from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonInput,
    IonText
} from '@ionic/react';
import {addCircleSharp} from 'ionicons/icons';
import Modal from '../components/Modal';

const Cleaning = () => {
    const [showModal, setShowModal] = useState(false);

    const handleSave = () => {
        // Logik zum Speichern der Daten
        console.log("Task added: ")
        setShowModal(false);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Putzen</IonTitle>
                    <IonButton slot="end" onClick={() => setShowModal(true)}>
                        <IonIcon icon={addCircleSharp}/>
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

                <IonText>Hallo</IonText>

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
