import React from 'react';
import {IonInput, IonButton, IonToggle, IonButtons} from '@ionic/react';

const ShoppingModalContent = ({
                                  updatedProductTitle,
                                  setUpdatedProductTitle,
                                  updatedProductInfo,
                                  setUpdatedProductInfo,
                                  updatedProductAlert,
                                  setUpdatedProductAlert,
                                  updateProduct,
                                  deleteProduct,
                                  selectedProduct,
                                  onClose
                              }) => {
    return (
        <div className="update-container">
            <div className="update-input">
                <IonInput
                    placeholder="Produkt"
                    value={updatedProductTitle}
                    onIonInput={(e) => setUpdatedProductTitle(e.target.value)}
                />
                <IonInput
                    placeholder="info"
                    value={updatedProductInfo}
                    onIonInput={(e) => setUpdatedProductInfo(e.target.value)}
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
                <IonButton expand="block" onClick={updateProduct} color="success">
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
