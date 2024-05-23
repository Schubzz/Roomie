import React from 'react';
import { IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons } from '@ionic/react';

const Modal = ({ isOpen, title, onClose, onSave, children }) => {
    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="start">
                        <IonButton onClick={onClose}>Schließen</IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton onClick={onSave}>Speichern</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {children}
            </IonContent>
        </IonModal>
    );
};

export default Modal;
