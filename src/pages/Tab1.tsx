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
    IonCard, IonCardTitle, IonIcon
} from '@ionic/react';
import {closeOutline} from "ionicons/icons";

function Tab2() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Putzen</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" color='dark'>

                <IonCard>
                    <IonCardTitle className='ion-padding'>Putzpläne</IonCardTitle>
                </IonCard>


                <IonButton expand="block" onClick={() => setIsOpen(true)} color='primary'>
                    Open
                </IonButton>

                <IonModal isOpen={isOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Neue Aufgabe</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setIsOpen(false)}>
                                    <IonIcon color='primary' icon={closeOutline} size=''/>
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding" color='dark'>

                    </IonContent>
                </IonModal>

            </IonContent>
        </IonPage>
    );
}

export default Tab2;