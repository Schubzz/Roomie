import React, { useEffect, useState } from 'react';
import { db } from "../config/firebaseConfig.js";
import { getDocs, collection, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import "../theme/Shopping.css"
import {
    IonHeader,
    IonContent,
    IonToolbar,
    IonPage,
    IonIcon,
    IonButtons,
    IonTitle, IonButton, RefresherEventDetail, IonRefresher, IonRefresherContent,
    IonLoading,
} from '@ionic/react';
import { cog } from "ionicons/icons";
import ShoppingModal from "../components/Shopping/ShoppingModal";
import ShoppingInput from '../components/Shopping/ShoppingInput';
import ShoppingItem from '../components/Shopping/ShoppingItem';
import ShoppingModalContent from '../components/Shopping/ShoppingModalContent';
import { useWG } from "../Context/WGContext";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";

interface ShoppingItem {
    id: string;
    title: string;
    info: string;
    alert: boolean;
    createdAt: Date;
}

const Shopping: React.FC = () => {
    const { user } = useUser();
    const { wg } = useWG();
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ShoppingItem | null>(null);
    const [updatedProductTitle, setUpdatedProductTitle] = useState("");
    const [updatedProductInfo, setUpdatedProductInfo] = useState("");
    const [updatedProductAlert, setUpdatedProductAlert] = useState(false);
    const [newProductTitle, setNewProductTitle] = useState("");
    const [newInfo, setNewInfo] = useState("");
    const [newAlert, setNewAlert] = useState(false);
    const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (wg) {
            getShoppingList();
        }
    }, [wg]);

    const getShoppingList = async () => {
        try {
            if (wg) {
                const shoppingCollectionRef = collection(db, `wgs/${wg.id}/shopping`);
                const data = await getDocs(shoppingCollectionRef);
                const filteredData: ShoppingItem[] = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                })) as ShoppingItem[];

                const sortedData = filteredData.sort((a, b) => {
                    if (a.alert === b.alert) {
                        return a.createdAt > b.createdAt ? -1 : 1;
                    }
                    return b.alert ? 1 : -1;
                });

                setShoppingList(sortedData);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const onSubmitProduct = async () => {
        try {
            if (wg) {
                const shoppingCollectionRef = collection(db, `wgs/${wg.id}/shopping`);
                await addDoc(shoppingCollectionRef, {
                    title: newProductTitle,
                    info: newInfo,
                    alert: newAlert,
                    createdAt: new Date()
                });
                getShoppingList();
                setNewProductTitle("");
                setNewInfo("");
                setNewAlert(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const updateProduct = async () => {
        try {
            if (wg && selectedProduct) {
                const productDoc = doc(db, `wgs/${wg.id}/shopping`, selectedProduct.id);
                await updateDoc(productDoc, {
                    title: updatedProductTitle,
                    info: updatedProductInfo,
                    alert: updatedProductAlert
                });
                setShowModal(false);
                getShoppingList();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            if (wg) {
                const productDoc = doc(db, `wgs/${wg.id}/shopping`, id);
                await deleteDoc(productDoc);
                setShoppingList(prevList => prevList.filter(item => item.id !== id));
                setShowModal(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const openModal = (product: ShoppingItem) => {
        setSelectedProduct(product);
        setUpdatedProductTitle(product.title);
        setUpdatedProductInfo(product.info);
        setUpdatedProductAlert(product.alert || false);
        setShowModal(true);
    };

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        try {
            await getShoppingList();
            event.detail.complete();
        } catch (err) {
            console.error(err);
            event.detail.complete();
        }
    };

    const totalItems = shoppingList.length;
    const urgentItems = shoppingList.filter(item => item.alert).length;

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
                    <IonTitle>Einkäufe</IonTitle>
                </IonToolbar>


                <IonToolbar>
                    <ShoppingInput
                        newProductTitle={newProductTitle}
                        setNewProductTitle={setNewProductTitle}
                        newInfo={newInfo}
                        setNewInfo={setNewInfo}
                        onSubmitProduct={onSubmitProduct}
                    />
                </IonToolbar>


                <IonToolbar>
                    <div className="relative-container">
                        <div className="counter">
                            <span>{totalItems}</span> Produkte <span>|</span> <span>{urgentItems}</span> dringend
                        </div>
                    </div>
                </IonToolbar>
            </IonHeader>


            <IonContent>

                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <div className="shopping-item-container">
                    {shoppingList.map((product) => (
                        <ShoppingItem
                            key={product.id}
                            product={product}
                            deleteProduct={deleteProduct}
                            openModal={openModal}
                        />
                    ))}
                </div>
                <ShoppingModal
                    isOpen={showModal}
                    title="Produkt bearbeiten"
                    onClose={() => setShowModal(false)}
                >
                    <ShoppingModalContent
                        updatedProductTitle={updatedProductTitle}
                        setUpdatedProductTitle={setUpdatedProductTitle}
                        updatedProductInfo={updatedProductInfo}
                        setUpdatedProductInfo={setUpdatedProductInfo}
                        updatedProductAlert={updatedProductAlert}
                        setUpdatedProductAlert={setUpdatedProductAlert}
                        updateProduct={updateProduct}
                        deleteProduct={deleteProduct}
                        selectedProduct={selectedProduct}
                    />
                </ShoppingModal>
            </IonContent>
        </IonPage>
    );
}

export default Shopping;
