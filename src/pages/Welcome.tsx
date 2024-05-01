import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader, IonIcon,
    IonImg,
    IonItem,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {arrowForward, closeOutline} from "ionicons/icons";
import React from "react";

const Welcome: React.FC = () => {
    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Guude!</IonTitle>
                    </IonToolbar>
                </IonHeader>


                <IonImg
                    src='/icons/roomie-icon-512x512.png'
                    alt='Roomie Logo'
                />

                <IonText className='ion-padding ion-text-lg-capitalize'>
                    Hier beginnt das Onboarding
                </IonText>

                <IonButton expand='block' color='secondary' routerLink='/app'>
                    <IonText className='ion-text-uppercase'>zur App</IonText>
                    <IonIcon color='primary' icon={arrowForward}/>
                </IonButton>

            </IonContent>
        </IonPage>
    );
};

export default Welcome;
