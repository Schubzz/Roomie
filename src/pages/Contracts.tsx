import React, { useEffect, useState } from 'react';
import {
    IonHeader,
    IonContent,
    IonToolbar,
    IonPage,
    IonIcon,
    IonButtons,
    IonTitle,
    IonButton,
    IonRefresher,
    IonRefresherContent,
    IonLoading,
    RefresherEventDetail,
} from '@ionic/react';
import {add, cog, documentTextOutline, flame, flash, home, musicalNotes, tv, waterOutline, wifi} from 'ionicons/icons';
import ContractsModal from '../components/Contracts/ContractsModal';
import ContractList from '../components/Contracts/ContractList';
import ContractsFilter from '../components/Contracts/ContractsFilter';
import { useWG } from '../Context/WGContext';
import { Link } from 'react-router-dom';
import '../theme/Contracts.css';
import { useUser } from '../Context/UserContext';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import ContractsModalContent from "../components/Contracts/ContractModalContent";

interface ContractItemProps {
    id: string;
    title: string;
    cost: string;
    owner: string;
    category: string;
    createdAt: Date;
}

const categories = [
    { name: 'Strom', icon: flash, color: '#ecce01' },
    { name: 'Gas', icon: flame, color: '#F57D0D' },
    { name: 'Internet', icon: wifi, color: '#2069cb' },
    { name: 'Miete', icon: home, color: 'gray' },
    { name: 'Musik', icon: musicalNotes, color: '#1DB954' },
    { name: 'Streaming', icon: tv, color: '#d20a14' },
    { name: 'Wasser', icon: waterOutline, color: '#4d93f5' },
    { name: 'Sonstige Kategorie', icon: documentTextOutline, color: '#bbbbbb' },
];

const Contracts: React.FC = () => {
    const { wg } = useWG();
    const { user } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ContractItemProps | null>(null);
    const [title, setTitle] = useState('');
    const [cost, setCost] = useState('');
    const [owner, setOwner] = useState('');
    const [category, setCategory] = useState('');
    const [contractList, setContractList] = useState<ContractItemProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        if (wg) {
            getContractList();
        }
    }, [wg]);

    const getContractList = async () => {
        try {
            if (wg) {
                const contractCollectionRef = collection(db, `wgs/${wg.id}/contracts`);
                const data = await getDocs(contractCollectionRef);
                const contractData: ContractItemProps[] = data.docs.map((doc) => {
                    const contractItem = doc.data();
                    return {
                        ...contractItem,
                        id: doc.id,
                        createdAt: contractItem.createdAt.toDate ? contractItem.createdAt.toDate() : new Date(contractItem.createdAt)
                    };
                }) as ContractItemProps[];

                const sortedData = contractData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                setContractList(sortedData);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setCost('');
        setOwner('');
        setCategory('');
        setSelectedItem(null);
    };

    const onSubmitItem = async () => {
        try {
            if (wg) {
                const contractCollectionRef = collection(db, `wgs/${wg.id}/contracts`);
                await addDoc(contractCollectionRef, {
                    title,
                    cost,
                    owner,
                    category,
                    createdAt: new Date()
                });
                getContractList();
                resetForm();
                setShowModal(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const updateItem = async () => {
        try {
            if (wg && selectedItem) {
                const itemDoc = doc(db, `wgs/${wg.id}/contracts`, selectedItem.id);
                await updateDoc(itemDoc, {
                    title,
                    cost,
                    owner,
                    category
                });
                getContractList();
                resetForm();
                setShowModal(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteItem = async (id: string) => {
        try {
            if (wg) {
                const itemDoc = doc(db, `wgs/${wg.id}/contracts`, id);
                await deleteDoc(itemDoc);
                const updatedContractList = contractList.filter(item => item.id !== id);
                setContractList(updatedContractList);
                setShowModal(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const openModal = (item: ContractItemProps) => {
        setSelectedItem(item);
        setTitle(item.title);
        setCost(item.cost);
        setOwner(item.owner);
        setCategory(item.category);
        setShowModal(true);
    };

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        try {
            await getContractList();
            event.detail.complete();
        } catch (err) {
            console.error(err);
            event.detail.complete();
        }
    };

    const filteredContracts = filter === 'mine'
        ? contractList.filter(contract => contract.owner === user?.uid)
        : contractList;

    const totalContracts = filteredContracts.length;
    const totalCost = filteredContracts.reduce((sum, contract) => {
        const cost = parseFloat(contract.cost);
        return !isNaN(cost) ? sum + cost : sum;
    }, 0);

    if (loading) {
        return (
            <IonContent>
                <IonLoading isOpen={loading} message="Momentchen..." spinner="bubbles" />
            </IonContent>
        );
    }

    return (
        <IonPage>
            <IonHeader className="contract-header">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton>
                            <Link to="/settings">
                                <IonIcon icon={cog} size="large" color="dark" />
                            </Link>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Verträge</IonTitle>
                </IonToolbar>

                <IonToolbar>
                    <ContractsFilter filter={filter} setFilter={setFilter} />
                </IonToolbar>

                <IonToolbar>
                    <div className="relative-container">
                        <div className="counter">
                            <div className="flex-counter">
                                <span>Verträge</span>
                                <span>{totalContracts}</span>
                            </div>
                            <span>|</span>
                            <div className="flex-counter">
                                <span>Gesamtkosten</span>
                                <span>{totalCost} €</span>
                            </div>
                        </div>

                        <div className="fab-button">
                            <IonButton onClick={() => {
                                resetForm();
                                setShowModal(true);
                            }} color="primary" size="small" shape="round">
                                <IonIcon icon={add} slot="icon-only" size="large" />
                            </IonButton>
                        </div>
                    </div>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <ContractList
                    contracts={filteredContracts}
                    deleteItem={deleteItem}
                    openModal={openModal}
                    categories={categories} // Ensure categories is passed down to ContractList
                />

                <ContractsModal
                    isOpen={showModal}
                    title={selectedItem ? 'Vertrag bearbeiten' : 'Vertrag hinzufügen'}
                    onClose={() => {
                        resetForm();
                        setShowModal(false);
                    }}
                >
                    <ContractsModalContent
                        title={title}
                        setTitle={setTitle}
                        cost={cost}
                        setCost={setCost}
                        owner={owner}
                        setOwner={setOwner}
                        category={category}
                        setCategory={setCategory}
                        updateItem={updateItem}
                        deleteItem={deleteItem}
                        selectedItem={selectedItem}
                        onSubmitItem={onSubmitItem}
                        categories={categories} // Ensure categories is passed down to ContractsModalContent
                        roommates={wg?.members || []}
                    />
                </ContractsModal>
            </IonContent>
        </IonPage>
    );
};

export default Contracts;
