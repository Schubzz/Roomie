import React from 'react';
import { IonIcon, IonChip, IonLabel } from '@ionic/react';
import { documentTextOutline } from 'ionicons/icons';
import { useWG } from '../../Context/WGContext';

interface ContractItemProps {
    id: string;
    title: string;
    cost: string;
    owner: string;
    category: string;
    createdAt: Date;
}

const ContractItem: React.FC<{
    item: ContractItemProps,
    deleteItem: (id: string) => void,
    openModal: (item: ContractItemProps) => void,
    categories: { name: string, icon: string, color: string }[]
}> = ({ item, openModal, categories }) => {
    const { wg } = useWG();

    const getOwnerDisplayName = (ownerId: string) => {
        const member = wg?.members.find((member) => member.uid === ownerId);
        return member ? member.displayName : 'Unbekannt';
    };

    const getCategoryIcon = (categoryName: string) => {
        const category = categories.find(cat => cat.name === categoryName);
        return category ? { icon: category.icon, color: category.color } : { icon: documentTextOutline, color: 'grey' };
    };

    return (
        <div key={item.id} className="contract-item" onClick={() => openModal(item)}>
            <div>
                <IonIcon icon={getCategoryIcon(item.category).icon} style={{ color: getCategoryIcon(item.category).color }} />
            </div>
            <div className="item-label">
                <p className="item-title">{item.title}</p>
                <IonChip outline={true} className="contract-owner">
                    <IonLabel>{getOwnerDisplayName(item.owner)}</IonLabel>
                </IonChip>
            </div>
            <div>
                <p className="item-amount">{item.cost} €</p>
            </div>
        </div>
    );
};

export default ContractItem;
