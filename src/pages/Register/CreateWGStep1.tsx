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

const CreateWgStep1: React.FC<Props> = ({onNext, onPrev, handleInputChange, isNextDisabled}) => {
    return (
        <IonCard>

            <IonText color="primary">
                <h2>Wie möchtest du deine WG nennen?</h2>
            </IonText>

            <p>Gib deiner WG einen einzigartigen Namen.</p>

            <IonCardContent>

                <IonCardSubtitle>4 / 5</IonCardSubtitle>

                <IonInput
                    fill="outline"
                    labelPlacement="floating"
                    label="Name der WG"
                    type="text"
                    className="custom-input ion-margin-top"
                    required
                    onIonInput={(e) => handleInputChange('wgName', e.detail.value)}
                ></IonInput>

                <NavigationButtons onNext={onNext} onPrev={onPrev} isNextDisabled={isNextDisabled}/>

            </IonCardContent>

        </IonCard>
    );
};

export default CreateWgStep1;
