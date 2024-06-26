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

                <IonInput
                    type="email"
                    labelPlacement="floating"
                    label="Email"
                    aria-label="Email"
                    fill="outline"
                    className="custom-input ion-margin-top"
                    required
                    onIonInput={(e) => handleInputChange('email', e.detail.value)}
                ></IonInput>

                <IonInput
                    type="password"
                    labelPlacement="floating"
                    label="Passwort"
                    aria-label="Passwort"
                    fill="outline"
                    className="custom-input ion-margin-top"
                    required
                    onIonInput={(e) => handleInputChange('password', e.detail.value)}
                ></IonInput>


                <NavigationButtons onNext={onNext} isNextDisabled={isNextDisabled}/>

                {/*<IonButton expand="block" color="light" style={{marginTop: '1em'}}>*/}
                {/*    Login per Google*/}
                {/*</IonButton>*/}

            </IonCardContent>
        </IonCard>
    );
};

export default RegisterStep1;
