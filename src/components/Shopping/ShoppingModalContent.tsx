import React from 'react';
import { IonInput, IonButton, IonToggle, IonItem, IonLabel } from '@ionic/react';

const ShoppingModalContent: React.FC<{
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    info: string;
    setInfo: React.Dispatch<React.SetStateAction<string>>;
    alert: boolean;
    setAlert: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: () => void;
    deleteProduct: (id: string) => void;
    selectedProduct: any;
}> = ({
          title,
          setTitle,
          info,
          setInfo,
          alert,
          setAlert,
          onSubmit,
          deleteProduct,
          selectedProduct,
      }) => {
    return (
        <div className="update-container">
            <IonItem className="input-item">
                <IonInput
                    placeholder="z.B. Milch"
                    value={title}
                    onIonInput={(e) => setTitle(e.detail.value!)}
                />
            </IonItem>

            <IonItem className="input-item">
                <IonInput
                    placeholder="z.B. 2 Liter"
                    value={info}
                    onIonInput={(e) => setInfo(e.detail.value!)}
                />
            </IonItem>

            <div className="toggle-item">
                <IonLabel>Dringend</IonLabel>
                <IonToggle
                    checked={alert}
                    onIonChange={(e) => setAlert(e.detail.checked)}
                />
            </div>

            <IonButton expand="block" onClick={onSubmit} color="success">
                {selectedProduct ? 'Aktualisieren' : 'Hinzufügen'}
            </IonButton>
            {selectedProduct && (
                <IonButton expand="block" onClick={() => deleteProduct(selectedProduct.id)} color="danger">
                    Löschen
                </IonButton>
            )}
        </div>
    );

};

export default ShoppingModalContent;
