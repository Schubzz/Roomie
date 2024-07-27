import React, {useState} from 'react';
import {
    IonIcon,
    IonButtons,
    IonButton,
    IonAvatar,
    IonChip,
    IonLabel
} from '@ionic/react';
import {chevronForward, trashBinOutline, documentText} from 'ionicons/icons';
import ContractModal from './ContractModal';
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../../config/firebaseConfig";

const ContractList: React.FC<{
    contractList: any[],
    getContractList: () => void,
    roommates: any[],
    categories: { name: string, icon: string, color: string }[]
}> = ({contractList, getContractList, roommates, categories}) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedContract, setSelectedContract] = useState<any>(null);
    const [updatedContractTitle, setUpdatedContractTitle] = useState("");
    const [updatedContractCost, setUpdatedContractCost] = useState("");
    const [updatedContractOwner, setUpdatedContractOwner] = useState("");
    const [updatedContractCategory, setUpdatedContractCategory] = useState("");

    const deleteContract = async (id: string) => {
        try {
            const contractDoc = doc(db, "contracts", id);
            await deleteDoc(contractDoc);
            getContractList();
            setShowEditModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    const updateContract = async () => {
        try {
            if (selectedContract) {
                const contractDoc = doc(db, "contracts", selectedContract.id);
                await updateDoc(contractDoc, {
                    title: updatedContractTitle,
                    cost: updatedContractCost,
                    owner: updatedContractOwner,
                    category: updatedContractCategory,
                });
                setShowEditModal(false);
                getContractList();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getOwnerName = (ownerId: string) => {
        const owner = roommates.find(roommate => roommate.id === ownerId);
        return owner ? owner.name : "Unbekannt";
    };

    const getCategoryIcon = (categoryName: string) => {
        const category = categories.find(cat => cat.name === categoryName);
        return category ? {icon: category.icon, color: category.color} : {icon: documentText, color: "grey"};
    };

    const openEditModal = (contract: any) => {
        setSelectedContract(contract);
        setUpdatedContractTitle(contract.title);
        setUpdatedContractCost(contract.cost);
        setUpdatedContractOwner(contract.owner);
        setUpdatedContractCategory(contract.category);
        setShowEditModal(true);
    };

    return (
        <div className="contract-item-container">
            {contractList.map((contract) => (
                <div key={contract.id} className="contract-item">


                    <div className="item-label">

                        <div className="item-info">

                            <IonIcon icon={getCategoryIcon(contract.category).icon}
                                     style={{color: getCategoryIcon(contract.category).color}}
                                     className="item-icon"
                                     size=""
                            />
                            <p className="item-title">{contract.title}</p>
                            <p className="item-cost">{contract.cost} €</p>
                        </div>



                        <IonChip outline={true}>
                            <IonAvatar>
                                <img alt="Silhouette of a person's head"
                                     src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
                            </IonAvatar>
                            <IonLabel>{getOwnerName(contract.owner)}</IonLabel>
                        </IonChip>


                    </div>


                    <div className="item-options">
                        <span className="item-option-span">
                            <IonButtons>
                                <IonButton onClick={() => deleteContract(contract.id)}>
                                    <IonIcon icon={trashBinOutline} color="danger"/>
                                </IonButton>
                            </IonButtons>
                        </span>
                        <div className="separator"/>
                        <span className="item-option-span">
                            <IonIcon
                                icon={chevronForward}
                                size="large"
                                onClick={() => openEditModal(contract)}
                            />
                        </span>
                    </div>


                    <ContractModal
                        isOpen={showEditModal}
                        onClose={() => setShowEditModal(false)}
                        updatedContractTitle={updatedContractTitle}
                        setUpdatedContractTitle={setUpdatedContractTitle}
                        updatedContractCost={updatedContractCost}
                        setUpdatedContractCost={setUpdatedContractCost}
                        updatedContractOwner={updatedContractOwner}
                        setUpdatedContractOwner={setUpdatedContractOwner}
                        updatedContractCategory={updatedContractCategory}
                        setUpdatedContractCategory={setUpdatedContractCategory}
                        updateContract={updateContract}
                        deleteContract={deleteContract}
                        selectedContract={selectedContract}
                        roommates={roommates}
                        categories={categories}
                    />
                </div>
            ))}
        </div>
    );
};

export default ContractList;
