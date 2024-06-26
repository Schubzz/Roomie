import React, { useState, useRef } from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonIcon,
    IonItem,
    IonLabel, IonText
} from '@ionic/react';
import { cloudUpload } from 'ionicons/icons';  // Importiere das gewünschte Icon aus den Ionicons
import NavigationButtons from './NavigationButtons';

interface Props {
    onNext: () => void;
    onPrev: () => void;
    handleInputChange: (field: string, value: any) => void;
}

const RegisterStep3: React.FC<Props> = ({ onNext, onPrev, handleInputChange }) => {
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicturePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            handleInputChange('profilePicture', file);
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <IonCard>

            <IonText color="primary">
                <h2>Zeig dein schönstes Gesicht.</h2>
            </IonText>

                <p>An deinem Profilbild können dich deine Roomies besser erkennen.</p>

            <IonCardContent>

                <IonCardSubtitle>3 / 5</IonCardSubtitle>

                <IonItem>

                    <IonLabel>Profilbild hochladen</IonLabel>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        style={{ display: 'none' }}
                        className="ion-margin-top"
                        ref={fileInputRef}
                    />

                    <IonButton onClick={handleButtonClick}>
                        <IonIcon icon={cloudUpload} />  {/* Verwende das gewünschte Icon */}
                    </IonButton>

                </IonItem>

                {profilePicturePreview && (
                    <IonItem>
                        <img src={profilePicturePreview} alt="Profile Preview" style={{ width: '100%', marginTop: '1em' }} />
                    </IonItem>
                )}

                <NavigationButtons onNext={onNext} onPrev={onPrev}/>

            </IonCardContent>

        </IonCard>
    );
};

export default RegisterStep3;
