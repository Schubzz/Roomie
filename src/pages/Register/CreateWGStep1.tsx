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

const CreateWgStep1: React.FC<Props> = ({ onNext, onPrev, handleInputChange, isNextDisabled }) => {
    return (
        <IonCard>
            <IonText color="primary">
                <h2>Wie möchtest du deine WG nennen?</h2>
            </IonText>
            <p>Gib deiner WG einen einzigartigen Namen.</p>
            <IonCardContent>
                <IonCardSubtitle>4 / 5</IonCardSubtitle>
                <IonItem>
                    <IonLabel position="stacked">Name der WG</IonLabel>
                    <IonInput type="text" className="custom-input" required onIonChange={(e) => handleInputChange('wgName', e.detail.value)}></IonInput>
                </IonItem>
                <NavigationButtons onNext={onNext} onPrev={onPrev} isNextDisabled={isNextDisabled} />
            </IonCardContent>
        </IonCard>
    );
};

export default CreateWgStep1;
