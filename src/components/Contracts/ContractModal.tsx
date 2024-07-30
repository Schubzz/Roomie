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
    IonInput, IonButtons
} from '@ionic/react';

const ContractModal: React.FC<{
    isOpen: boolean,
    onClose: () => void,
    updatedContractTitle: string,
    setUpdatedContractTitle: React.Dispatch<React.SetStateAction<string>>,
    updatedContractCost: string,
    setUpdatedContractCost: React.Dispatch<React.SetStateAction<string>>,
    updatedContractOwner: string,
    setUpdatedContractOwner: React.Dispatch<React.SetStateAction<string>>,
    updatedContractCategory: string,
    setUpdatedContractCategory: React.Dispatch<React.SetStateAction<string>>,
    updateContract: () => void,
    deleteContract: (id: string) => void,
    selectedContract: any,
    categories: { name: string, icon: string }[],
    roommates: any[]
}> = ({
          isOpen,
          onClose,
          updatedContractTitle,
          setUpdatedContractTitle,
          updatedContractCost,
          setUpdatedContractCost,
          updatedContractOwner,
          setUpdatedContractOwner,
          updatedContractCategory,
          setUpdatedContractCategory,
          updateContract,
          deleteContract,
          selectedContract,
          categories,
          roommates
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
                    <IonTitle>Vertrag bearbeiten</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onClose}>schließen</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">


                <div className="contract-input-container">

                    <div className="contract-input">
                        <IonInput
                            value={updatedContractTitle}
                            onIonInput={(e) => setUpdatedContractTitle(e.detail.value!)}
                        />
                    </div>

                    <div className="price-container">
                        <div className="price-input">
                            <IonInput
                                value={updatedContractCost}
                                onIonInput={(e) => setUpdatedContractCost(e.detail.value!)}
                            />
                        </div>
                        <p>€</p>
                    </div>

                    <div className="contract-input">
                        <IonSelect
                            value={updatedContractOwner}
                            onIonChange={(e) => setUpdatedContractOwner(e.detail.value)}
                        >
                            {roommates.map((roommate) => (
                                <IonSelectOption key={roommate.uid} value={roommate.uid}>
                                    {roommate.displayName}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                    </div>

                    <div className="contract-input">
                        <IonSelect
                            value={updatedContractCategory}
                            onIonChange={(e) => setUpdatedContractCategory(e.detail.value)}
                        >
                            {categories.map((category) => (
                                <IonSelectOption key={category.name} value={category.name}>
                                    {category.name}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                    </div>
                </div>

                <div className="update-button-container">
                    <IonButton
                        expand="block"
                        onClick={updateContract}
                        color="success"
                    >
                        Aktualisieren
                    </IonButton>
                    <div className="delete-button">
                        <IonButton
                            onClick={() => deleteContract(selectedContract.id)}
                            color="danger"
                            fill="clear"
                            expand="block"
                        >
                            Vertrag löschen
                        </IonButton>
                    </div>
                </div>

            </IonContent>
        </IonModal>
    );
};

export default ContractModal;
