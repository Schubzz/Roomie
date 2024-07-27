import React from 'react';
import {IonInput, IonButton, IonIcon, IonButtons} from '@ionic/react';
import {add} from 'ionicons/icons';

const ShoppingInput = ({newProductTitle, setNewProductTitle, newInfo, setNewInfo, onSubmitProduct}) => {
    return (
        <div className="shopping-input-container">
            <div className="shopping-input">
                <IonInput
                    name="title"
                    placeholder="Produkt"
                    value={newProductTitle}
                    onIonInput={(e) => setNewProductTitle(e.target.value)}
                />
                <IonInput
                    name="info"
                    placeholder="info"
                    value={newInfo}
                    onIonInput={(e) => setNewInfo(e.target.value)}
                />
                <IonButton
                    onClick={onSubmitProduct}
                    shape="round"
                    color="success"
                >
                    <IonIcon icon={add} slot="icon-only" size="large"/>
                </IonButton>
            </div>
        </div>
    );
};

export default ShoppingInput;
