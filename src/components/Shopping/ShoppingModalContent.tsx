import React from 'react';
import { IonInput, IonButton, IonToggle } from '@ionic/react';

const ShoppingModalContent: React.FC<{
    updatedProductTitle: string;
    setUpdatedProductTitle: React.Dispatch<React.SetStateAction<string>>;
    updatedProductInfo: string;
    setUpdatedProductInfo: React.Dispatch<React.SetStateAction<string>>;
    updatedProductAlert: boolean;
    setUpdatedProductAlert: React.Dispatch<React.SetStateAction<boolean>>;
    updateProduct: () => void;
    deleteProduct: (id: string) => void;
    selectedProduct: any;
}> = ({
          updatedProductTitle,
          setUpdatedProductTitle,
          updatedProductInfo,
          setUpdatedProductInfo,
          updatedProductAlert,
          setUpdatedProductAlert,
          updateProduct,
          deleteProduct,
          selectedProduct,
      }) => {
    return (
        <div className="update-container">
            <div className="update-input">
                <IonInput

                    value={updatedProductTitle}
                    onIonInput={(e: any) => setUpdatedProductTitle(e.target.value)}
                />
            </div>

            <div className="update-input">
                <IonInput

                    value={updatedProductInfo}
                    onIonInput={(e: any) => setUpdatedProductInfo(e.target.value)}
                />
            </div>
            <div className="alert-container">
                <p>dringend!</p>
                <IonToggle
                    aria-label="Warning toggle"
                    color="warning"
                    checked={updatedProductAlert}
                    onIonChange={(e) => setUpdatedProductAlert(e.detail.checked)}
                />
            </div>
            <div className="update-button-container">
                <IonButton
                    expand="block"
                    onClick={updateProduct}
                    color="success"
                >
                    Aktualisieren
                </IonButton>
                <div className="delete-button">
                    <IonButton
                        onClick={() => deleteProduct(selectedProduct.id)}
                        color="danger"
                        fill="clear"
                    >
                        Produkt löschen
                    </IonButton>
                </div>
            </div>
        </div>
    );
};

export default ShoppingModalContent;
