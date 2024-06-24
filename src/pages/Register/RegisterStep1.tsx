import React from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonInput,
    IonItem,
    IonLabel,
    IonText
} from '@ionic/react';
import NavigationButtons from './NavigationButtons';

interface Props {
    onNext: () => void;
    handleInputChange: (field: string, value: any) => void;
    isNextDisabled: boolean;
}

const RegisterStep1: React.FC<Props> = ({onNext, handleInputChange, isNextDisabled}) => {
    return (
        <IonCard>
            <IonText color="primary">
                <h2> Erstelle einen Account um zu starten</h2>
            </IonText>
            <IonCardContent>
                <IonCardSubtitle>1 / 5</IonCardSubtitle>
                <IonItem>
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput type="email" className="custom-input" required
                              onIonChange={(e) => handleInputChange('email', e.detail.value)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Passwort</IonLabel>
                    <IonInput type="password" className="custom-input" required
                              onIonChange={(e) => handleInputChange('password', e.detail.value)}></IonInput>
                </IonItem>
                <IonButton expand="block" color="primary" style={{marginTop: '1em'}} disabled>
                    Login per Google
                </IonButton>
                <NavigationButtons onNext={onNext} isNextDisabled={isNextDisabled} />
            </IonCardContent>
        </IonCard>
    );
};

export default RegisterStep1;
