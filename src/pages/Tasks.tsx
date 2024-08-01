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
    RefresherEventDetail,
} from '@ionic/react';
import { add, cog} from "ionicons/icons";
import TasksModal from "../components/Tasks/TaskModal";
import TasksFilter from '../components/Tasks/TaskFilter';
import { useWG } from "../Context/WGContext";
import { Link } from "react-router-dom";
import '../theme/Tasks.css';
import { useUser } from "../Context/UserContext";
import TasksModalContent from '../components/Tasks/TaskModalContent';
import TaskItem from '../components/Tasks/TaskItem';

interface TaskItemProps {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    assignedTo: string[];
    rotation: string;
    startDay: string;
    status: string;
}

const Tasks: React.FC = () => {
    const { wg } = useWG();
    const { user } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<TaskItemProps | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rotation, setRotation] = useState("none");
    const [assignedTo, setAssignedTo] = useState<string[]>([]);
    const [startDay, setStartDay] = useState("sunday");
    const [status, setStatus] = useState("pending");
    const [taskList, setTaskList] = useState<TaskItemProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("all");
    const [userTasksCount, setUserTasksCount] = useState(0);
    const [totalTasksCount, setTotalTasksCount] = useState(0);

    useEffect(() => {
        if (wg) {
            getTaskList();
        }
    }, [wg]);

    useEffect(() => {
        if (taskList.length > 0) {
            const userTasks = taskList.filter(task =>
                task.assignedTo.includes(user?.uid || '') &&
                (task.assignedTo[0] === user?.uid || task.assignedTo.length === 1)
            );
            setUserTasksCount(userTasks.length);
            setTotalTasksCount(taskList.length);
        }
    }, [taskList, user]);

    const getTaskList = async () => {
        try {
            if (wg) {
                const taskCollectionRef = collection(db, `wgs/${wg.id}/tasks`);
                const data = await getDocs(taskCollectionRef);
                let taskData: TaskItemProps[] = data.docs.map((doc) => {
                    const taskItem = doc.data();
                    return {
                        ...taskItem,
                        id: doc.id,
                        createdAt: taskItem.createdAt.toDate ? taskItem.createdAt.toDate() : new Date(taskItem.createdAt),
                        startDay: taskItem.startDay || 'sunday',
                    };
                }) as TaskItemProps[];

                // Rotate tasks if needed
                taskData = taskData.map(task => rotateTask(task));

                const sortedData = taskData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                setTaskList(sortedData);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const rotateTask = (task: TaskItemProps) => {
        if (!task.rotation || task.rotation === 'none' || task.assignedTo.length <= 1) return task;

        const now = new Date();
        const lastRotationDate = task.createdAt;
        let nextRotationDate = new Date(lastRotationDate);

        if (task.rotation === 'daily') {
            nextRotationDate.setDate(lastRotationDate.getDate() + 1);
        } else if (task.rotation === 'weekly') {
            const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(task.startDay);
            nextRotationDate.setDate(lastRotationDate.getDate() + ((7 - lastRotationDate.getDay() + dayOfWeek) % 7 || 7));
        } else if (task.rotation === 'monthly') {
            nextRotationDate.setMonth(lastRotationDate.getMonth() + 1);
        }

        if (now >= nextRotationDate) {
            const updatedAssignedTo = [...task.assignedTo];
            const rotatedUser = updatedAssignedTo.shift();
            updatedAssignedTo.push(rotatedUser!);

            return {
                ...task,
                assignedTo: updatedAssignedTo,
                createdAt: new Date(),
            };
        }

        return task;
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setRotation("none");
        setAssignedTo([]);
        setStartDay("sunday");
        setStatus("pending");
        setSelectedItem(null);
    };

    const markTaskAsDone = async (taskId: string) => {
        try {
            if (wg) {
                const itemDoc = doc(db, `wgs/${wg.id}/tasks`, taskId);
                await updateDoc(itemDoc, {
                    status: 'done'
                });
                getTaskList();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const onSubmitItem = async () => {
        try {
            if (wg) {
                const taskCollectionRef = collection(db, `wgs/${wg.id}/tasks`);
                await addDoc(taskCollectionRef, {
                    title,
                    description,
                    rotation,
                    assignedTo,
                    startDay,
                    createdAt: new Date(),
                    status: "pending"
                });
                getTaskList();
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
                const itemDoc = doc(db, `wgs/${wg.id}/tasks`, selectedItem.id);
                await updateDoc(itemDoc, {
                    title,
                    description,
                    rotation,
                    assignedTo,
                    startDay,
                    status
                });
                getTaskList();
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
                const itemDoc = doc(db, `wgs/${wg.id}/tasks`, id);
                await deleteDoc(itemDoc);
                const updatedTaskList = taskList.filter(item => item.id !== id);
                setTaskList(updatedTaskList);
                setShowModal(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const openModal = (item: TaskItemProps) => {
        setSelectedItem(item);
        setTitle(item.title);
        setDescription(item.description);
        setRotation(item.rotation);
        setAssignedTo(Array.isArray(item.assignedTo) ? item.assignedTo : [item.assignedTo]);
        setStartDay(item.startDay || 'sunday');
        setStatus(item.status);
        setShowModal(true);
    };

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        try {
            await getTaskList();
            event.detail.complete();
        } catch (err) {
            console.error(err);
            event.detail.complete();
        }
    };

    const getRotationIcon = (rotation: string) => {
        if (rotation === 'weekly') return 'Wöchentlich';
        if (rotation === 'monthly') return 'Monatlich';
        if (rotation === 'daily') return 'Täglich';
        return 'Keiner';
    };

    const getDayIcon = (startDay: string) => {
        const dayMap: { [key: string]: string } = {
            sunday: 'So',
            monday: 'Mo',
            tuesday: 'Di',
            wednesday: 'Mi',
            thursday: 'Do',
            friday: 'Fr',
            saturday: 'Sa'
        };
        return dayMap[startDay];
    };

    const filteredTasks = filter === 'mine'
        ? taskList.filter(task =>
            task.assignedTo.includes(user?.uid || '') &&
            (task.assignedTo[0] === user?.uid || task.assignedTo.length === 1)
        )
        : taskList;

    if (loading) {
        return (
            <IonContent className="ion-justify-content-center ion-align-items-center">
                <IonLoading isOpen={loading} message="Momentchen..." spinner="bubbles"/>
            </IonContent>
        );
    }

    return (
        <IonPage>
            <IonHeader className="tasks-header">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton>
                            <Link to="/settings">
                                <IonIcon icon={cog} size="large" color="dark"/>
                            </Link>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Aufgaben</IonTitle>
                </IonToolbar>

                <IonToolbar>
                    <TasksFilter filter={filter} setFilter={setFilter}/>
                </IonToolbar>

                <IonToolbar>
                    <div className="relative-container">
                        <div className="counter">
                            <div className="flex-counter">
                                <span>Meine Aufgaben</span>
                                <span>{userTasksCount}</span>
                            </div>

                            <span>|</span>

                            <div className="flex-counter">
                                <span>Gesamtaufgaben</span>
                                <span>{totalTasksCount}</span>
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

                <div className="task-item-container">
                    {filteredTasks.map(item => (
                        <TaskItem
                            key={item.id}
                            item={item}
                            deleteItem={deleteItem}
                            openModal={openModal}
                            markAsDone={markTaskAsDone}
                            getRotationIcon={getRotationIcon}
                            getDayIcon={getDayIcon}
                        />
                    ))}
                </div>

                <TasksModal
                    isOpen={showModal}
                    title={selectedItem ? "Aufgabe bearbeiten" : "Aufgabe hinzufügen"}
                    onClose={() => {
                        resetForm();
                        setShowModal(false);
                    }}
                >
                    <TasksModalContent
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        rotation={rotation}
                        setRotation={setRotation}
                        assignedTo={assignedTo}
                        setAssignedTo={setAssignedTo}
                        startDay={startDay}
                        setStartDay={setStartDay}
                        status={status}
                        setStatus={setStatus}
                        updateItem={updateItem}
                        deleteItem={deleteItem}
                        selectedItem={selectedItem}
                        onSubmitItem={onSubmitItem}
                    />
                </TasksModal>
            </IonContent>
        </IonPage>
    );
};

export default Tasks;
