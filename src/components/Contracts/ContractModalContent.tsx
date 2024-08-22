import React from 'react';
import {
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel
} from '@ionic/react';

interface ContractsModalContentProps {
    title: string;
    setTitle: (value: string) => void;
    cost: string;
    setCost: (value: string) => void;
    owner: string;
    setOwner: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
    updateItem: () => void;
    deleteItem: (id: string) => void;
    selectedItem: any;
    onSubmitItem: () => void;
    categories: { name: string }[];
    roommates: any[];
}

const ContractsModalContent: React.FC<ContractsModalContentProps> = ({
                                                                         title,
                                                                         setTitle,
                                                                         cost,
                                                                         setCost,
                                                                         owner,
                                                                         setOwner,
                                                                         category,
                                                                         setCategory,
                                                                         updateItem,
                                                                         deleteItem,
                                                                         selectedItem,
                                                                         onSubmitItem,
                                                                         categories,
                                                                         roommates
                                                                     }) => {
    return (
        <div className="update-container">
            <IonItem className="input-item">
                <IonInput
                    placeholder="z.B. Strom"
                    value={title}
                    onIonInput={(e) => setTitle(e.detail.value!)}
                />
            </IonItem>

            <IonItem className="input-item">
                <IonInput
                    placeholder="z.B. 12"
                    value={cost}
                    onIonInput={(e) => setCost(e.detail.value!)}
                />
                <span className="currency-symbol">€</span>
            </IonItem>

            <div className="flex-container">
                <IonItem className="select-item">
                    <IonSelect placeholder="Inhaber" value={owner} onIonChange={(e) => setOwner(e.detail.value)}>
                        {roommates.map((roommate) => (
                            <IonSelectOption key={roommate.uid} value={roommate.uid}>
                                {roommate.displayName}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                </IonItem>

                <IonItem className="select-item">
                    <IonSelect placeholder="Kategorie" value={category} onIonChange={(e) => setCategory(e.detail.value)}>
                        {categories.map((cat) => (
                            <IonSelectOption key={cat.name} value={cat.name}>
                                {cat.name}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                </IonItem>
            </div>

            <IonButton expand="block" onClick={selectedItem ? updateItem : onSubmitItem} color="success">
                {selectedItem ? 'Aktualisieren' : 'Hinzufügen'}
            </IonButton>
            {selectedItem && (
                <IonButton expand="block" onClick={() => deleteItem(selectedItem.id)} color="danger">
                    Löschen
                </IonButton>
            )}
        </div>
    );

};

export default ContractsModalContent;
