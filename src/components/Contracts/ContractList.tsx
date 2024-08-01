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
import { useUser } from "../../Context/UserContext";
import { useWG } from "../../Context/WGContext";

const ContractList: React.FC<{
    contractList: any[],
    getContractList: () => void,
    categories: { name: string, icon: string, color: string }[],
}> = ({
          contractList,
          getContractList,
          categories,
      }) => {
    const { user } = useUser();
    const { wg, refreshWGData } = useWG();
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedContract, setSelectedContract] = useState<any>(null);
    const [updatedContractTitle, setUpdatedContractTitle] = useState("");
    const [updatedContractCost, setUpdatedContractCost] = useState("");
    const [updatedContractOwner, setUpdatedContractOwner] = useState("");
    const [updatedContractCategory, setUpdatedContractCategory] = useState("");

    useEffect(() => {
        if (user?.wgId) {
            refreshWGData();
        }
    }, [user?.wgId]);

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
        const owner = wg?.members.find(member => member.uid === ownerId);
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
                <div key={contract.id} className="contract-item" onClick={() => openEditModal(contract)}>
                    <div>
                        <IonIcon icon={getCategoryIcon(contract.category).icon}
                                 style={{ color: getCategoryIcon(contract.category).color }}
                                 className="item-icon"
                                 size="large"
                        />
                    </div>
                    <div className="item-label">
                        <p className="item-title">{contract.title}</p>
                        <IonChip outline={true} className="contract-owner">
                            <IonLabel>{getOwnerDisplayName(contract.owner)}</IonLabel>
                        </IonChip>
                    </div>
                    <div>
                        <p className="item-amount">{contract.cost} €</p>
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
                        categories={categories}
                        roommates={wg?.members || []}
                    />
                </div>
            ))}
        </div>
    );
};

export default ContractList;
