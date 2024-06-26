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
                    <IonInput
                        type="text"
                        labelPlacement="floating"
                        label="Dein Name"
                        fill="outline"
                        aria-label="Dein Name"
                        className="custom-input ion-margin-top"
                        required
                        onIonInput={(e) => handleInputChange('username', e.detail.value)}>
                    </IonInput>

                <NavigationButtons onNext={onNext} onPrev={onPrev} isNextDisabled={isNextDisabled} />

            </IonCardContent>
        </IonCard>
    );
};

export default RegisterStep2;
