import React, { useEffect, useState } from 'react';
import {
    IonIcon,
    IonButtons,
    IonButton,
    IonChip,
    IonLabel, IonRow
} from '@ionic/react';
import { chevronForward, trashBinOutline, documentText } from 'ionicons/icons';
import ContractModal from './ContractModal';
import { deleteDoc, doc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { db } from "../../config/firebaseConfig";
import { useAuth } from "../../AuthContext";

const ContractList: React.FC<{
    contractList: any[],
    getContractList: () => void,
    roommates: any[],
    categories: { name: string, icon: string, color: string }[],
}> = ({
          contractList,
          getContractList,
          roommates,
          categories,
      }) => {

    const { user } = useAuth();
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedContract, setSelectedContract] = useState<any>(null);
    const [updatedContractTitle, setUpdatedContractTitle] = useState("");
    const [updatedContractCost, setUpdatedContractCost] = useState("");
    const [updatedContractOwner, setUpdatedContractOwner] = useState("");
    const [updatedContractCategory, setUpdatedContractCategory] = useState("");

    const [updatedRoommates, setUpdatedRoommates] = useState(roommates);

    useEffect(() => {
        getRoommates();
    }, [user]);

    const getRoommates = async () => {
        try {
            if (user?.wgId) {
                const usersCollectionRef = collection(db, `wgs/${user.wgId}/users`);
                const data = await getDocs(usersCollectionRef);
                const roommatesData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setUpdatedRoommates(roommatesData);
            }
        } catch (err) {
            console.error('Fehler beim Laden der Mitbewohner: ', err);
        }
    };

    const deleteContract = async (id: string) => {
        try {
            if (user?.wgId) {
                const contractDoc = doc(db, `wgs/${user.wgId}/contracts`, id);
                await deleteDoc(contractDoc);
                getContractList();
                setShowEditModal(false);
            }
        } catch (err) {
            console.error('Fehler beim Löschen des Vertrags: ', err);
        }
    };

    const updateContract = async () => {
        try {
            if (selectedContract && user?.wgId) {
                const contractDoc = doc(db, `wgs/${user.wgId}/contracts`, selectedContract.id);
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
            console.error('Fehler beim Aktualisieren des Vertrags: ', err);
        }
    };

    const getOwnerDisplayName = (ownerId: string) => {
        const owner = updatedRoommates.find(roommate => roommate.id === ownerId);
        return owner ? owner.displayName : "Unbekannt";
    };

    const getCategoryIcon = (categoryName: string) => {
        const category = categories.find(cat => cat.name === categoryName);
        return category ? { icon: category.icon, color: category.color } : { icon: documentText, color: "grey" };
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
                            <p className="item-title">{contract.title}</p>
                            <p className="item-cost">{contract.cost} €</p>
                        </div>
                        <IonRow className="ion-align-items-center">
                            <IonIcon icon={getCategoryIcon(contract.category).icon}
                                     style={{ color: getCategoryIcon(contract.category).color }}
                                     className="item-icon"
                                     size="large"
                            />
                            <IonChip outline={true}>
                                <IonLabel>{getOwnerDisplayName(contract.owner)}</IonLabel>
                            </IonChip>
                        </IonRow>
                    </div>
                    <div className="item-options">
                        <span className="item-option-span">
                            <IonButtons>
                                <IonButton onClick={() => deleteContract(contract.id)}>
                                    <IonIcon icon={trashBinOutline} color="danger" />
                                </IonButton>
                            </IonButtons>
                        </span>
                        <div className="separator" />
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
                        roommates={updatedRoommates}
                        categories={categories}
                    />
                </div>
            ))}
        </div>
    );
};

export default ContractList;
