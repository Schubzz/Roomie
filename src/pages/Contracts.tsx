import React, { useEffect, useState } from 'react';
import {
    IonHeader,
    IonContent,
    IonToolbar,
    IonPage,
    IonIcon,
    IonButton,
    IonButtons,
    IonTitle,
    IonLabel,
    IonSegmentButton,
    IonSegment,
    IonRefresherContent,
    IonRefresher,
    RefresherEventDetail,
} from '@ionic/react';
import {
    add, cog,
    documentTextOutline,
    flame,
    flash,
    home,
    musicalNotes,
    tv,
    waterOutline,
    wifi,
} from 'ionicons/icons';
import '../theme/Contracts.css';
import { db } from '../config/firebaseConfig.js';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import ContractList from '../components/Contracts/ContractList';
import NewContractModal from '../components/Contracts/NewContractModal';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Strom', icon: flash, color: '#ecce01', size: 'large' },
    { name: 'Gas', icon: flame, color: '#F57D0D' },
    { name: 'Internet', icon: wifi, color: '#2069cb' },
    { name: 'Miete', icon: home, color: 'gray' },
    { name: 'Musik', icon: musicalNotes, color: '#1DB954' },
    { name: 'Streaming', icon: tv, color: '#d20a14' },
    { name: 'Wasser', icon: waterOutline, color: '#4d93f5' },
    { name: 'Sonstige Kategorie', icon: documentTextOutline, color: '#bbbbbb' },
];

const Contracts: React.FC = () => {
    const { user } = useAuth();
    const wgId = user?.wgId;
    const [showNewModal, setShowNewModal] = useState(false);
    const [contractList, setContractList] = useState<any[]>([]);
    const [newContractTitle, setNewContractTitle] = useState('');
    const [newContractCost, setNewContractCost] = useState('');
    const [newContractOwner, setNewContractOwner] = useState('');
    const [newContractCategory, setNewContractCategory] = useState('');
    const [roommates, setRoommates] = useState<any[]>([]);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        if (wgId) {
            getContractList();
            getRoommates();
        }
    }, [wgId]);

    const getContractList = async () => {
        try {
            const wgCollectionRef = collection(db, `wgs/${wgId}/contracts`);
            const data = await getDocs(wgCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setContractList(filteredData);
        } catch (err) {
            console.log(err);
        }
    };

    const getRoommates = async () => {
        try {
            const usersCollectionRef = collection(db, `wgs/${wgId}/users`);
            const data = await getDocs(usersCollectionRef);
            const roommatesData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setRoommates(roommatesData);
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmitContract = async () => {
        try {
            const wgCollectionRef = collection(db, `wgs/${wgId}/contracts`);
            await addDoc(wgCollectionRef, {
                title: newContractTitle,
                cost: newContractCost,
                owner: newContractOwner,
                category: newContractCategory,
                createdAt: new Date(),
            });
            getContractList();
            setNewContractTitle('');
            setNewContractCost('');
            setNewContractOwner('');
            setNewContractCategory('');
            setShowNewModal(false);
        } catch (err) {
            console.error(err);
        }
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

    const filteredContracts = contractList.filter(contract =>
        filter === 'all' || (filter === 'mine' && contract.owner === user?.uid)
    );

    const totalContracts = filteredContracts.length;
    const totalCost = filteredContracts.reduce((sum, contract) => {
        const cost = parseFloat(contract.cost);
        return !isNaN(cost) ? sum + cost : sum;
    }, 0);

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
                    <IonSegment value={filter} onIonChange={(e) => setFilter(e.detail.value as string)}>
                        <IonSegmentButton value="all">
                            <IonLabel>Alle Verträge</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="mine">
                            <IonLabel>Meine Verträge</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </IonToolbar>
                <IonToolbar>
                    <div className="relative-container">
                        <div className="counter">
                            <span>{totalContracts}</span> Verträge <span>|</span> <span>{totalCost}</span> € gesamt
                        </div>
                        <div className="fab-button">
                            <IonButton onClick={() => setShowNewModal(true)} color="primary" size="small" shape="round">
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
                    contractList={filteredContracts}
                    getContractList={getContractList}
                    roommates={roommates}
                    categories={categories}
                />
                <NewContractModal
                    isOpen={showNewModal}
                    onClose={() => setShowNewModal(false)}
                    newContractTitle={newContractTitle}
                    setNewContractTitle={setNewContractTitle}
                    newContractCost={newContractCost}
                    setNewContractCost={setNewContractCost}
                    newContractOwner={newContractOwner}
                    setNewContractOwner={setNewContractOwner}
                    newContractCategory={newContractCategory}
                    setNewContractCategory={setNewContractCategory}
                    onSubmitContract={onSubmitContract}
                    roommates={roommates}
                    categories={categories}
                />
            </IonContent>
        </IonPage>
    );
};

export default Contracts;
