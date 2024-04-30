import { useState } from 'react';
import { IonAlert, IonPage } from "@ionic/react";
// @ts-ignore
import { useRegisterSW } from 'virtual:pwa-register/react';

const RefreshSw = () => {
    const [showAlert, setShowAlert] = useState(false);

    const {
        needRefresh,
        updateServiceWorker,
    } = useRegisterSW({
        onNeedRefresh() {
            setShowAlert(true);
        },
        onOfflineReady() {
            // Optionale Funktion, wenn die App zum ersten Mal offline-fähig ist
        }
    });

    const handleUpdate = () => {
        setShowAlert(false); // Schließt den Alert
        updateServiceWorker(true); // true zwingt den sofortigen SW-Update und Reload
    };

    return (
        <IonPage>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={'Update verfügbar'}
                message={'Eine neue Version der App ist verfügbar. Möchten Sie jetzt aktualisieren?'}
                buttons={[
                    {
                        text: 'Später',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => setShowAlert(false)
                    },
                    {
                        text: 'Aktualisieren',
                        handler: handleUpdate
                    }
                ]}
            />
        </IonPage>
    );
}

export default RefreshSw;
