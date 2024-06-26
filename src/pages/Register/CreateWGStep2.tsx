import React from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardSubtitle, IonGrid, IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonText
} from '@ionic/react';
import NavigationButtons from './NavigationButtons';
import {arrowForward, saveOutline, saveSharp, ticket} from "ionicons/icons";

interface Props {
    onPrev: () => void;
    handleInputChange: (field: string, value: any) => void;
    handleSubmit: () => void;
    isNextDisabled: boolean;
}

const CreateWgStep2: React.FC<Props> = ({onPrev, handleInputChange, handleSubmit, isNextDisabled}) => {
    return (
        <IonCard>

            <IonText color="primary">
                <h2>Wo ist deine WG?</h2>
            </IonText>

            <IonCardContent>

                    <IonCardSubtitle>5 / 5</IonCardSubtitle>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                    }}
                    >
                        <IonLabel>Land</IonLabel>
                        <IonSelect className="custom-select ion-margin-top"
                                   fill="outline"
                                   label="Land"
                                   onIonChange={(e) => handleInputChange('country', e.detail.value)}>
                            <IonSelectOption className="custom-select-option" value="de">Deutschland</IonSelectOption>
                            <IonSelectOption className="custom-select-option" value="at">Österreich</IonSelectOption>
                            <IonSelectOption className="custom-select-option" value="ch">Schweiz</IonSelectOption>
                        </IonSelect>
                    </div>

                    <IonInput
                        type="number"
                        labelPlacement="floating"
                        label="PLZ"
                        aria-label="PLZ"
                        fill="outline"
                        className="custom-input ion-margin-top"
                        required
                        onIonInput={(e) => handleInputChange('postalCode', e.detail.value)}>
                    </IonInput>

                    <IonInput
                        type="text"
                        labelPlacement="floating"
                        label="Stadt"
                        aria-label="Stadt"
                        fill="outline"
                        className="custom-input ion-margin-top"
                        required
                        onIonInput={(e) => handleInputChange('city', e.detail.value)}>
                    </IonInput>

                    <div
                        style={{
                            marginTop: '1em'
                    }}
                    >
                        <IonButton
                            expand="block"
                            color="primary"
                            onClick={handleSubmit}
                            disabled={isNextDisabled}
                        >
                            <IonText>Speichern</IonText>
                            <IonIcon color='dark' icon={arrowForward}/>
                        </IonButton>

                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: '1em'
                        }}
                        >
                            <button
                                onClick={onPrev}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--ion-color-primary)',
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                            >
                                Zurück
                            </button>
                        </div>
                    </div>

            </IonCardContent>
        </IonCard>
    );
};

export default CreateWgStep2;
