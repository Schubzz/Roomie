import React, {ReactNode} from 'react';
import {
    IonModal,
    IonContent,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton
} from '@ionic/react';


interface AddModalProps {
    isOpen: boolean;
    onDismiss: () => void;
    onCreate: () => void;
    children: ReactNode;
    modalTitle: string;
}

const AddModal : React.FC<AddModalProps> = ({isOpen, onDismiss, onCreate, children, modalTitle}) => {
    return (
        <IonModal
            isOpen={isOpen}
            onDidDismiss={onDismiss}
            breakpoints={[0.25, 0.5, 0.75, 1]}
            initialBreakpoint={0.75}
        >
            <IonContent color='dark' className='ion-padding-vertical'>
                <IonToolbar color='dark'>
                    <IonTitle>{modalTitle}</IonTitle>
                    <IonButtons slot="start">
                        <IonButton color="primary" onClick={onDismiss}>
                            Abbrechen
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton color="primary" onClick={() => onCreate()}>
                            Fertig
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                {children}
            </IonContent>
        </IonModal>
    );
};

export default AddModal;

