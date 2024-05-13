import React, { useState } from 'react';
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonCard, IonCardTitle, IonIcon, IonCardSubtitle, IonItem, IonInput
} from '@ionic/react';
import {addCircleSharp, closeOutline, text} from "ionicons/icons";
import AddModal from "../components/AddModal";

function Contracts() {

    const [text, setText] = useState('Hallo, ');
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (event) => {
        const inputValue = event.detail.value;
        setText('Hallo, ' + inputValue);
    }

    const printText = () => {
        setShowModal(false);
    }

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            printText();
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className='toolbar'>
                    <IonTitle>Verträge</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => setShowModal(true)}>
                            <IonIcon icon={addCircleSharp} size='large'/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent color='medium'>

                <IonCard color='dark'>
                    <IonCardTitle className='ion-padding'>Verträge</IonCardTitle>
                </IonCard>

                <div className='ion-padding'>
                    <IonCardSubtitle>
                        {text}
                    </IonCardSubtitle>
                </div>

                <AddModal
                    modalTitle='Hinzufügen'
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

export default Contracts;