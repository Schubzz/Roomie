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

function Shopping() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Einkaufen</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" color='dark'>

                <IonCard>
                    <IonCardTitle className='ion-padding'>Einkaufen</IonCardTitle>
                </IonCard>


                <IonButton expand="block" onClick={() => setIsOpen(true)}>
                    Open
                </IonButton>

                <IonModal isOpen={isOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Neuer Eintrag</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setIsOpen(false)}>
                                    <IonIcon color='primary' icon={closeOutline} size=''/>
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">

                    </IonContent>
                </IonModal>

            </IonContent>
        </IonPage>
    );
}

export default Shopping;