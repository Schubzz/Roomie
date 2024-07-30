import React from 'react';
import { IonButtons, IonButton, IonIcon } from '@ionic/react';
import { chevronForward, trashBinOutline } from 'ionicons/icons';
import { useWG } from '../../Context/WGContext';

const FinanceItem = ({ item, deleteItem, openModal }) => {
    const { wg } = useWG();

    const getDisplayName = (uid) => {
        const member = wg?.members.find((member) => member.uid === uid);
        return member ? member.displayName : "Unbekannt";
    };

    return (
        <div key={item.id} className="finance-item">
            <div className="item-label">
                <p className="item-title">{item.title}</p>
                <p className="item-info">{item.info}</p>
                <p className="item-paid-by">Bezahlt von: {getDisplayName(item.paidBy)}</p>
                <p className="item-shared-with">
                    Geteilt mit: {item.sharedWith.map((uid) => getDisplayName(uid)).join(", ")}
                </p>
                <p className="item-amount">Betrag: {item.amount} €</p>
            </div>
            <div className="item-options">
        <span className="item-option-span">
          <IonButtons>
            <IonButton onClick={() => deleteItem(item.id)}>
              <IonIcon icon={trashBinOutline} color="danger" />
            </IonButton>
          </IonButtons>
        </span>
                <div className="separator" />
                <span className="item-option-span">
          <IonIcon icon={chevronForward} size="large" onClick={() => openModal(item)} />
        </span>
            </div>
        </div>
    );
};

export default FinanceItem;
