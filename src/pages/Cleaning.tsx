import React, {BaseSyntheticEvent, useRef, useState} from 'react';
import {
    IonButtons,
    IonButton,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonCard, IonCardTitle, IonIcon, IonItem, IonInput, IonText, IonCardSubtitle
} from '@ionic/react';
import {
    addCircleSharp,
} from "ionicons/icons";
import AddModal from "../components/AddModal";

function Cleaning() {

    const [text, setText] = useState('Du hast aktuell nichts, aber auch wirklich garnichts zu tun... ');
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (event: CustomEvent) => {
        const inputValue = event.detail.value;
        setText('TU ES: ' + inputValue);
    }

    const printText = () => {
        setShowModal(false);
    }

    const handleEnterPress = (event: React.KeyboardEvent<HTMLIonInputElement>) => {
        if (event.key === 'Enter') {
            printText();
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className='toolbar'>
                    <IonTitle>Putzen</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => setShowModal(true)}>
                            <IonIcon icon={addCircleSharp} size='large'/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent color='medium'>

                <IonCard color='dark'>
                    <IonCardTitle className='ion-padding'>Putzpläne</IonCardTitle>
                </IonCard>

                <div className='ion-padding'>
                    <IonCardSubtitle>
                        {text}
                    </IonCardSubtitle>
                </div>

                <AddModal
                    modalTitle='Erstellen'
                    isOpen={showModal}
                    onDismiss={() => setShowModal(false)}
                    onCreate={printText}
                >
                    <IonItem color='dark'>
                        <IonInput
                            onIonChange={handleInputChange}
                            onKeyPress={handleEnterPress}
                            placeholder="Dein Name"
                        />
                    </IonItem>
                </AddModal>

            </IonContent>
        </IonPage>
    );
}

export default Cleaning;