import React from 'react';
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton, IonButtons
} from '@ionic/react';

const ShoppingModal = ({ isOpen, title, onClose, children }) => {
    return (
        <IonModal
            isOpen={isOpen}
            onDidDismiss={onClose}
            initialBreakpoint={0.4}
            breakpoints={[0, 0.4,]}
        >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="end">
                    <IonButton  onClick={onClose}>schließen</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {children}
            </IonContent>
        </IonModal>
    );
};

export default ShoppingModal;