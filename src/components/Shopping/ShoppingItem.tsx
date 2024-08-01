import React from 'react';
import { IonIcon } from '@ionic/react';
import { cartOutline, chevronForward } from 'ionicons/icons';

const ShoppingItem: React.FC<{
    product: any;
    deleteProduct: (id: string) => void;
    openModal: (item: any) => void;
}> = ({ product, openModal }) => {
    return (
        <div
            key={product.id} className="shopping-item"
            onClick={() => openModal(product)}
            style={{ borderLeft: product.alert ? '4px solid red' : 'none' }}
        >
            <div>
                <IonIcon icon={cartOutline} />
            </div>
            <div className="item-label">
                <p className="item-title">{product.title}</p>
                <p className="item-info">{product.info}</p>
            </div>
            <div className="item-options">
                <IonIcon icon={chevronForward} color="dark" />
            </div>
        </div>
    );
};

export default ShoppingItem;
