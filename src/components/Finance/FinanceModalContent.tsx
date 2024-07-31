import React from 'react';
import {
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel
} from '@ionic/react';
import { useWG } from '../../Context/WGContext';

interface FinanceItem {
    id: string;
    title: string;
    info: string;
    createdAt: Date;
    paidBy: string;
    sharedWith: string[];
    amount: number;
}

interface FinanceModalContentProps {
    title: string;
    setTitle: (value: string) => void;
    info: string;
    setInfo: (value: string) => void;
    amount: number;
    setAmount: (value: number) => void;
    paidBy: string;
    setPaidBy: (value: string) => void;
    sharedWith: string[];
    setSharedWith: (value: string[]) => void;
    updateItem: () => void;
    deleteItem: (id: string) => void;
    selectedItem: FinanceItem | null;
    onSubmitItem: () => void;
}

const FinanceModalContent: React.FC<FinanceModalContentProps> = ({
                                                                     title,
                                                                     setTitle,
                                                                     info,
                                                                     setInfo,
                                                                     amount,
                                                                     setAmount,
                                                                     paidBy,
                                                                     setPaidBy,
                                                                     sharedWith,
                                                                     setSharedWith,
                                                                     updateItem,
                                                                     deleteItem,
                                                                     selectedItem,
                                                                     onSubmitItem,
                                                                 }) => {
    const { wg } = useWG();

    return (
        <div className="update-container">
            <IonItem>
                <IonLabel position="stacked">Titel</IonLabel>
                <IonInput value={title} onIonInput={(e) => setTitle(e.detail.value!)} />
            </IonItem>

            <IonItem>
                <IonLabel position="stacked">Info</IonLabel>
                <IonInput value={info} onIonInput={(e) => setInfo(e.detail.value!)} />
            </IonItem>

            <IonItem>
                <IonLabel position="stacked">Betrag</IonLabel>
                <IonInput type="number" value={amount} onIonInput={(e) => setAmount(parseFloat(e.detail.value!))} />
            </IonItem>

            <IonItem>
                <IonLabel position="stacked">Bezahlt von</IonLabel>
                <IonSelect value={paidBy} onIonChange={(e) => setPaidBy(e.detail.value)}>
                    {wg?.members.map((member) => (
                        <IonSelectOption key={member.uid} value={member.uid}>
                            {member.displayName}
                        </IonSelectOption>
                    ))}
                </IonSelect>
            </IonItem>

            <IonItem>
                <IonLabel position="stacked">Geteilt mit</IonLabel>
                <IonSelect
                    multiple={true}
                    value={sharedWith}
                    onIonChange={(e) => setSharedWith(e.detail.value)}
                >
                    {wg?.members.map((member) => (
                        <IonSelectOption key={member.uid} value={member.uid}>
                            {member.displayName}
                        </IonSelectOption>
                    ))}
                </IonSelect>
            </IonItem>

            <IonButton expand="block" onClick={selectedItem ? updateItem : onSubmitItem} color="success">
                {selectedItem ? "Aktualisieren" : "Hinzufügen"}
            </IonButton>
            {selectedItem && (
                <IonButton expand="block" onClick={() => deleteItem(selectedItem.id)} color="danger">
                    Löschen
                </IonButton>
            )}
        </div>
    );
};

export default FinanceModalContent;
