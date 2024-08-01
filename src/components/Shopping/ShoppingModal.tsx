import React from 'react';
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons
} from '@ionic/react';

const ShoppingModal: React.FC<{
    isOpen: boolean,
    title: string,
    onClose: () => void,
    children: React.ReactNode
}> = ({ isOpen, title, onClose, children }) => {
    return (
        <IonModal
            isOpen={isOpen}
            onDidDismiss={onClose}
            initialBreakpoint={0.75}
            breakpoints={[0, 0.5, 0.75, 1]}
        >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onClose}>Schließen</IonButton>
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
