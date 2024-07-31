import React from 'react';
import { IonButtons, IonButton, IonIcon } from '@ionic/react';
import {chevronForward, trashBinOutline, walletOutline} from 'ionicons/icons';
import { useWG } from '../../Context/WGContext';

const FinanceItem = ({ item, deleteItem, openModal }) => {
    const { wg } = useWG();

    const getDisplayName = (uid) => {
        const member = wg?.members.find((member) => member.uid === uid);
        return member ? member.displayName : "Unbekannt";
    };

    return (
        <div key={item.id} className="finance-item" onClick={() => openModal(item)}>
            <div>
                <IonIcon icon={walletOutline}/>
            </div>
            <div className="item-label">
                <p className="item-title">{item.title}</p>
                <p className="item-paid-by">Bezahlt von {getDisplayName(item.paidBy)}</p>
            </div>
            <div>
                <p className="item-amount">{item.amount} €</p>
            </div>
        </div>
    );
};

export default FinanceItem;
