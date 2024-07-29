import React from 'react';
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonInput
} from '@ionic/react';

const NewContractModal: React.FC<{
    isOpen: boolean,
    onClose: () => void,
    newContractTitle: string,
    setNewContractTitle: React.Dispatch<React.SetStateAction<string>>,
    newContractCost: string,
    setNewContractCost: React.Dispatch<React.SetStateAction<string>>,
    newContractOwner: string,
    setNewContractOwner: React.Dispatch<React.SetStateAction<string>>,
    newContractCategory: string,
    setNewContractCategory: React.Dispatch<React.SetStateAction<string>>,
    onSubmitContract: () => void,
    roommates: any[],
    categories: { name: string, icon: string }[]
}> = ({
          isOpen,
          onClose,
          newContractTitle,
          setNewContractTitle,
          newContractCost,
          setNewContractCost,
          newContractOwner,
          setNewContractOwner,
          newContractCategory,
          setNewContractCategory,
          onSubmitContract,
          roommates,
          categories
      }) => {
    return (
        <IonModal
            isOpen={isOpen}
            onDidDismiss={onClose}
            initialBreakpoint={0.75}
            breakpoints={[0, 0.5, 0.75, 1]}
        >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Neuen Vertrag erstellen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

                <div className="contract-input-container">

                    <div className="contract-input">
                        <IonInput
                            placeholder="Titel"
                            value={newContractTitle}
                            onIonInput={(e) => setNewContractTitle(e.detail.value!)}
                        />
                    </div>

                    <div className="price-container">
                        <div className="price-input">
                            <IonInput
                                placeholder="Kosten"
                                value={newContractCost}
                                onIonInput={(e) => setNewContractCost(e.detail.value!)}
                            />
                        </div>
                        <p>€</p>
                    </div>

                    <div className="contract-input">
                        <IonSelect
                            placeholder="Inhaber"
                            value={newContractOwner}
                            onIonChange={(e) => setNewContractOwner(e.detail.value)}
                        >
                            {roommates.map((roommate) => (
                                <IonSelectOption key={roommate.id} value={roommate.id}>
                                    {roommate.name}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                    </div>

                    <div className="contract-input">
                        <IonSelect
                            placeholder="Kategorie"
                            value={newContractCategory}
                            onIonChange={(e) => setNewContractCategory(e.detail.value)}
                        >
                            {categories.map((category) => (
                                <IonSelectOption key={category.name} value={category.name}>
                                    {category.name}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                    </div>
                </div>

                <IonButton
                    expand="block"
                    onClick={onSubmitContract}
                    color="primary"
                >
                    Vertrag erstellen
                </IonButton>

                <div className="cancel-button">
                    <IonButton
                        fill="clear"
                        color="dark"
                        onClick={onClose}
                    >
                        abbrechen
                    </IonButton>
                </div>
            </IonContent>
        </IonModal>
    );
};

export default NewContractModal;
