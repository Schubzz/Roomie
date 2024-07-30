import React from 'react';
import { IonInput, IonButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';


interface ShoppingInputProps {
    newProductTitle: string;
    setNewProductTitle: React.Dispatch<React.SetStateAction<string>>;
    newInfo: string;
    setNewInfo: React.Dispatch<React.SetStateAction<string>>;
    onSubmitProduct: () => void;
}

const ShoppingInput: React.FC<ShoppingInputProps> = ({ newProductTitle, setNewProductTitle, newInfo, setNewInfo, onSubmitProduct }) => {
    return (
        <div className="shopping-input-container">
            <div className="shopping-input">
                <IonInput
                    name="title"
                    placeholder="Produkt"
                    value={newProductTitle}
                    onIonInput={(e) => setNewProductTitle(e.detail.value!)}
                />
                <IonInput
                    name="info"
                    placeholder="Info"
                    value={newInfo}
                    onIonInput={(e) => setNewInfo(e.detail.value!)}
                />
                <IonButton
                    onClick={onSubmitProduct}
                    shape="round"
                    color="success"
                >
                    <IonIcon icon={add} slot="icon-only" size="large" />
                </IonButton>
            </div>
        </div>
    );
};

export default ShoppingInput;
