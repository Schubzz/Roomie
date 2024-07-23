import React from 'react';
import { IonButtons, IonButton, IonIcon } from '@ionic/react';
import { chevronForward, trashBinOutline } from 'ionicons/icons';

const ShoppingItem = ({ product, deleteProduct, openModal }) => {
    return (
        <div key={product.id} className="shopping-item">
            <div className="item-label" style={{ borderLeft: product.alert ? '4px solid red' : 'none' }}>
                <p className="item-title">{product.title}</p>
                <p className="item-info">{product.info}</p>
            </div>
            <div className="item-options">
                <span className="item-option-span">
                    <IonButtons>
                        <IonButton onClick={() => deleteProduct(product.id)}>
                            <IonIcon icon={trashBinOutline} color="danger" />
                        </IonButton>
                    </IonButtons>
                </span>
                <div className="separator" />
                <span className="item-option-span">
                    <IonIcon icon={chevronForward} size="large" onClick={() => openModal(product)} />
                </span>
            </div>
        </div>
    );
};

export default ShoppingItem;
