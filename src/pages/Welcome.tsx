import {
    IonButton,
    IonButtons, IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon,
    IonImg,
    IonItem,
    IonPage, IonRow,
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

                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <div className='ion-text-center'>
                                <h3>Hallo</h3>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <div>
                                <IonImg
                                    style={{width: '100px', height: '100px',}}
                                    src='/icons/roomie-icon-trans.png'
                                    alt='Roomie Logo'
                                />
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>


                <IonText className='ion-padding ion-text-lg-capitalize'>
                    Hier beginnt das Onboarding
                </IonText>

                <IonButton expand='block' color='secondary' routerLink='/app/cleaning'>
                    <IonText className='ion-text-uppercase'>zur App</IonText>
                    <IonIcon color='primary' icon={arrowForward}/>
                </IonButton>

            </IonContent>
        </IonPage>
    );
};

export default Welcome;
