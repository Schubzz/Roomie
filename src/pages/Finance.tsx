import React, { useEffect, useState } from 'react';
import { db } from "../config/firebaseConfig";
import { getDocs, collection, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
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
    IonFab,
    IonFabButton,
   RefresherEventDetail,
} from '@ionic/react';
import { add, cog } from "ionicons/icons";
import FinanceModal from "../components/Finance/FinanceModal";
import FinanceItem from '../components/Finance/FinanceItem';
import FinanceModalContent from '../components/Finance/FinanceModalContent';
import FinanceFilter from '../components/Finance/FinanceFilter';
import FinanceBalance from '../components/Finance/FinanceBalance';
import { useWG } from "../Context/WGContext";
import { Link } from "react-router-dom";
import '../theme/Finance.css';

interface FinanceItem {
    id: string;
    title: string;
    info: string;
    createdAt: Date;
    paidBy: string;
    sharedWith: string[];
    amount: number;
}

const Finance: React.FC = () => {
    const { wg } = useWG();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<FinanceItem | null>(null);
    const [title, setTitle] = useState("");
    const [info, setInfo] = useState("");
    const [amount, setAmount] = useState(0);
    const [paidBy, setPaidBy] = useState("");
    const [sharedWith, setSharedWith] = useState<string[]>([]);
    const [financeList, setFinanceList] = useState<FinanceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("expenses");
    const [balances, setBalances] = useState<{ [key: string]: { amount: number; creditor: string; debtor: string }[] }>({});


    useEffect(() => {
        if (wg) {
            getFinanceList();
        }
    }, [wg]);

    const getFinanceList = async () => {
        try {
            if (wg) {
                const financeCollectionRef = collection(db, `wgs/${wg.id}/finances`);
                const data = await getDocs(financeCollectionRef);
                const financeData: FinanceItem[] = data.docs.map((doc) => {
                    const financeItem = doc.data();
                    return {
                        ...financeItem,
                        id: doc.id,
                        createdAt: financeItem.createdAt.toDate ? financeItem.createdAt.toDate() : new Date(financeItem.createdAt)
                    };
                }) as FinanceItem[];

                const sortedData = financeData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                setFinanceList(sortedData);
                calculateBalances(sortedData);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const calculateBalances = (financeData: FinanceItem[]) => {
        const balanceMap: { [key: string]: { amount: number; creditor: string; debtor: string }[] } = {};

        financeData.forEach(item => {
            item.sharedWith.forEach(member => {
                if (member !== item.paidBy) {
                    const share = item.amount / item.sharedWith.length;
                    if (!balanceMap[member]) balanceMap[member] = [];

                    balanceMap[member].push({ amount: share, creditor: item.paidBy, debtor: member });
                }
            });
        });

        setBalances(balanceMap);
    };


    const onSubmitItem = async () => {
        try {
            if (wg) {
                const financeCollectionRef = collection(db, `wgs/${wg.id}/finances`);
                await addDoc(financeCollectionRef, {
                    title,
                    info,
                    amount,
                    paidBy,
                    sharedWith,
                    createdAt: new Date(),
                });
                getFinanceList();
                setTitle("");
                setInfo("");
                setAmount(0);
                setPaidBy("");
                setSharedWith([]);
                setShowModal(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const updateItem = async () => {
        try {
            if (wg && selectedItem) {
                const itemDoc = doc(db, `wgs/${wg.id}/finances`, selectedItem.id);
                await updateDoc(itemDoc, {
                    title,
                    info,
                    amount,
                    paidBy,
                    sharedWith,
                });
                setShowModal(false);
                getFinanceList();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteItem = async (id: string) => {
        try {
            if (wg) {
                const itemDoc = doc(db, `wgs/${wg.id}/finances`, id);
                await deleteDoc(itemDoc);
                setFinanceList(prevList => prevList.filter(item => item.id !== id));
                setShowModal(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const openModal = (item: FinanceItem) => {
        setSelectedItem(item);
        setTitle(item.title);
        setInfo(item.info);
        setAmount(item.amount);
        setPaidBy(item.paidBy);
        setSharedWith(item.sharedWith);
        setShowModal(true);
    };

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        try {
            await getFinanceList();
            event.detail.complete();
        } catch (err) {
            console.error(err);
            event.detail.complete();
        }
    };

    if (loading) {
        return (
            <IonContent className="ion-justify-content-center ion-align-items-center">
                <IonLoading isOpen={loading} message="Momentchen..." spinner="bubbles" />
            </IonContent>
        );
    }

    return (
        <IonPage>
            <IonHeader className="finance-header">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton>
                            <Link to="/settings">
                                <IonIcon icon={cog} size="large" color="dark" />
                            </Link>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Finanzen</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <FinanceFilter filter={filter} setFilter={setFilter} />
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                {filter === "expenses" ? (
                    <div className="finance-item-container">
                        {financeList.map((item) => (
                            <FinanceItem
                                key={item.id}
                                item={item}
                                deleteItem={deleteItem}
                                openModal={openModal}
                            />
                        ))}
                    </div>
                ) : (
                    <FinanceBalance balances={balances} />
                )}

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => setShowModal(true)}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>

                <FinanceModal
                    isOpen={showModal}
                    title="Ausgabe hinzufügen"
                    onClose={() => setShowModal(false)}
                >
                    <FinanceModalContent
                        title={title}
                        setTitle={setTitle}
                        info={info}
                        setInfo={setInfo}
                        amount={amount}
                        setAmount={setAmount}
                        paidBy={paidBy}
                        setPaidBy={setPaidBy}
                        sharedWith={sharedWith}
                        setSharedWith={setSharedWith}
                        updateItem={updateItem}
                        deleteItem={deleteItem}
                        selectedItem={selectedItem}
                        onSubmitItem={onSubmitItem}  // Hier hinzugefügt
                    />
                </FinanceModal>
            </IonContent>
        </IonPage>
    );
};

export default Finance;
