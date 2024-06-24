import React from 'react';
import { IonButton } from '@ionic/react';

interface Props {
    onNext?: () => void;
    onPrev?: () => void;
    isPrevDisabled?: boolean;
    isNextDisabled?: boolean;
}

const NavigationButtons: React.FC<Props> = ({ onNext, onPrev, isPrevDisabled, isNextDisabled }) => {
    return (
        <div style={{ marginTop: '1em' }}>
            {onNext && (
                <IonButton
                    expand="block"
                    color="primary"
                    onClick={onNext}
                    disabled={isNextDisabled}
                    style={{ marginBottom: '1em' }}
                >
                    Weiter
                </IonButton>
            )}
            {onPrev && (
                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={onPrev}
                        disabled={isPrevDisabled}
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
            )}
        </div>
    );
};

export default NavigationButtons;
