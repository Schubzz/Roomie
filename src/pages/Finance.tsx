import React, {useEffect, useState} from 'react';
import {db} from "../config/firebaseConfig";
import {getDocs, collection, doc, addDoc, deleteDoc, updateDoc} from "firebase/firestore";
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
import {add, cog} from "ionicons/icons";
import FinanceModal from "../components/Finance/FinanceModal";
import FinanceItem from '../components/Finance/FinanceItem';
import FinanceModalContent from '../components/Finance/FinanceModalContent';
import FinanceFilter from '../components/Finance/FinanceFilter';
import FinanceBalance from '../components/Finance/FinanceBalance';
import {useWG} from "../Context/WGContext";
import {Link} from "react-router-dom";
import '../theme/Finance.css';
import {useUser} from "../Context/UserContext";

interface FinanceItem {
    id: string;
    title: string;
    info: string;
    createdAt: Date;
    paidBy: string;
    sharedWith: string[];
    amount: number;
}

interface SettlementItem {
    id: string;
    amount: number;
    creditor: string;
    debtor: string;
    settledAt: Date;
}

const Finance: React.FC = () => {
    const {wg} = useWG();
    const {user} = useUser();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<FinanceItem | null>(null);
    const [title, setTitle] = useState("");
    const [info, setInfo] = useState("");
    const [amount, setAmount] = useState(0);
    const [paidBy, setPaidBy] = useState("");
    const [sharedWith, setSharedWith] = useState<string[]>([]);
    const [financeList, setFinanceList] = useState<FinanceItem[]>([]);
    const [loadingFinance, setLoadingFinance] = useState(true);
    const [filter, setFilter] = useState<string>("expenses");
    const [balances, setBalances] = useState<{
        [key: string]: { amount: number; creditor: string; debtor: string }[]
    }>({})
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [userExpenses, setUserExpenses] = useState(0);
    const [settlements, setSettlements] = useState<SettlementItem[]>([]);

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
                calculateExpenses(sortedData);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingFinance(false);
        }
    };

    const calculateBalances = (financeData: FinanceItem[]) => {
        const balanceMap: { [key: string]: { [key: string]: number } } = {};

        financeData.forEach(item => {
            const share = item.amount / item.sharedWith.length;

            item.sharedWith.forEach(member => {
                if (member !== item.paidBy) {
                    if (!balanceMap[item.paidBy]) balanceMap[item.paidBy] = {};
                    if (!balanceMap[member]) balanceMap[member] = {};

                    if (!balanceMap[item.paidBy][member]) balanceMap[item.paidBy][member] = 0;
                    if (!balanceMap[member][item.paidBy]) balanceMap[member][item.paidBy] = 0;

                    balanceMap[item.paidBy][member] += share;
                    balanceMap[member][item.paidBy] -= share;

                    balanceMap[item.paidBy][member] = parseFloat(balanceMap[item.paidBy][member].toFixed(2));
                    balanceMap[member][item.paidBy] = parseFloat(balanceMap[member][item.paidBy].toFixed(2));
                }
            });
        });

        const finalBalances: { [key: string]: { amount: number; creditor: string; debtor: string }[] } = {};

        for (const creditor in balanceMap) {
            for (const debtor in balanceMap[creditor]) {
                const amount = balanceMap[creditor][debtor];

                if (amount > 0) {
                    if (!finalBalances[creditor]) finalBalances[creditor] = [];
                    finalBalances[creditor].push({
                        amount,
                        creditor,
                        debtor,
                    });
                }
            }
        }

        setBalances(finalBalances);
    };

    const resetForm = () => {
        setTitle("");
        setInfo("");
        setAmount(0);
        setPaidBy("");
        setSharedWith([]);
        setSelectedItem(null);
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
                const itemDoc = doc(db, `wgs/${wg.id}/finances`, selectedItem.id);
                await updateDoc(itemDoc, {
                    title,
                    info,
                    amount,
                    paidBy,
                    sharedWith,
                });
                getFinanceList();
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
                const itemDoc = doc(db, `wgs/${wg.id}/finances`, id);
                await deleteDoc(itemDoc);
                const updatedFinanceList = financeList.filter(item => item.id !== id);
                setFinanceList(updatedFinanceList);
                calculateBalances(updatedFinanceList);
                calculateExpenses(updatedFinanceList);
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

    const calculateExpenses = (financeData: FinanceItem[]) => {
        let total = 0;
        let userTotal = 0;

        financeData.forEach(item => {
            total += item.amount;
            if (item.paidBy === user?.uid) {
                userTotal += item.amount;
            }
        });

        setTotalExpenses(total);
        setUserExpenses(userTotal);
    };

    const getSettlementList = async () => {
        try {
            if (wg) {
                const settlementCollectionRef = collection(db, `wgs/${wg.id}/settlements`);
                const data = await getDocs(settlementCollectionRef);
                const settlementData: SettlementItem[] = data.docs.map((doc) => {
                    const settlementItem = doc.data();
                    return {
                        ...settlementItem,
                        id: doc.id,
                        settledAt: settlementItem.settledAt.toDate ? settlementItem.settledAt.toDate() : new Date(settlementItem.settledAt)
                    };
                }) as SettlementItem[];

                const sortedData = settlementData.sort((a, b) => b.settledAt.getTime() - a.settledAt.getTime());
                setSettlements(sortedData);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const settleBalance = async (amount: number, creditor: string, debtor: string) => {
        try {
            if (wg) {
                const settlementCollectionRef = collection(db, `wgs/${wg.id}/settlements`);
                await addDoc(settlementCollectionRef, {
                    amount,
                    creditor,
                    debtor,
                    settledAt: new Date(),
                });
                getSettlementList();
                const updatedBalances = {...balances};
                updatedBalances[debtor] = updatedBalances[debtor].filter(transaction => !(transaction.creditor === creditor && transaction.amount === amount));
                setBalances(updatedBalances);
            }
        } catch (err) {
            console.error(err);
        }
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

    const groupByDate = (financeList: FinanceItem[]) => {
        return financeList.reduce((acc, item) => {
            const date = new Date(item.createdAt).toLocaleDateString('de-DE');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(item);
            return acc;
        }, {} as { [key: string]: FinanceItem[] });
    };

    const groupedFinanceList = groupByDate(financeList);

    if (loadingFinance) {
        return (
            <IonContent className="ion-justify-content-center ion-align-items-center">
                <IonLoading isOpen={loadingFinance} message="Momentchen..." spinner="bubbles"/>
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
                                <IonIcon icon={cog} size="large" color="dark"/>
                            </Link>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Finanzen</IonTitle>
                </IonToolbar>

                <IonToolbar>
                    <FinanceFilter filter={filter} setFilter={setFilter}/>
                </IonToolbar>

                <IonToolbar>
                    <div className="relative-container">
                        <div className="counter">
                            <div className="flex-counter">
                                <span>Meine Ausgaben</span>
                                <span> {userExpenses.toFixed(2)} €</span>
                            </div>

                            <span>|</span>

                            <div className="flex-counter">
                                <span>Gesamtausgaben</span>
                                <span> {totalExpenses.toFixed(2)} €</span>
                            </div>
                        </div>

                        <div className="fab-button">
                            <IonButton onClick={() => {
                                resetForm();
                                setShowModal(true);
                            }} color="primary" size="small" shape="round">
                                <IonIcon icon={add} slot="icon-only" size="large"/>
                            </IonButton>
                        </div>
                    </div>
                </IonToolbar>

            </IonHeader>

            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                {filter === "expenses" ? (
                    <div className="finance-item-container">
                        {Object.keys(groupedFinanceList).map(date => (
                            <div key={date}>
                                <p>{date}</p>
                                {groupedFinanceList[date].map(item => (
                                    <FinanceItem
                                        key={item.id}
                                        item={item}
                                        deleteItem={deleteItem}
                                        openModal={openModal}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <FinanceBalance balances={balances} settleBalance={settleBalance}/>
                    </>
                )}

                <FinanceModal
                    isOpen={showModal}
                    title={selectedItem ? "Eintrag bearbeiten" : "Ausgabe hinzufügen"} // Anpassen des Titels je nach Zustand
                    onClose={() => {
                        resetForm();
                        setShowModal(false);
                    }}
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