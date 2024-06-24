import React from 'react';
import {
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
    onPrev: () => void;
    handleInputChange: (field: string, value: any) => void;
    isNextDisabled: boolean;
}

const RegisterStep2: React.FC<Props> = ({onNext, onPrev, handleInputChange, isNextDisabled}) => {
    return (
        <IonCard>
            <IonText color="primary">
                <h2>Wie heißt du?</h2>
            </IonText>
            <p>Anhand deines Namens wissen deine Roomies wer du bist.</p>
            <IonCardContent>
                <IonCardSubtitle>2 / 5</IonCardSubtitle>
                <IonItem>
                    <IonLabel position="stacked">Dein Name</IonLabel>
                    <IonInput type="text" className="custom-input" required
                              onIonChange={(e) => handleInputChange('username', e.detail.value)}></IonInput>
                </IonItem>
                <NavigationButtons onNext={onNext} onPrev={onPrev} isNextDisabled={isNextDisabled} />
            </IonCardContent>
        </IonCard>
    );
};

export default RegisterStep2;
