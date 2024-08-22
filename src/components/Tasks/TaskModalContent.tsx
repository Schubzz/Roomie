import React from 'react';
import {
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
    IonTextarea,
    IonToggle,
    IonList,
    IonReorder,
    IonReorderGroup,
    ItemReorderEventDetail
} from '@ionic/react';
import { useWG } from '../../Context/WGContext';

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

interface TasksModalContentProps {
    title: string;
    setTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    rotation: string;
    setRotation: (value: string) => void;
    assignedTo: string[];
    setAssignedTo: (value: string[]) => void;
    startDay: string;
    setStartDay: (value: string) => void;
    status: string;
    setStatus: (value: string) => void;
    updateItem: () => void;
    deleteItem: (id: string) => void;
    selectedItem: TaskItemProps | null;
    onSubmitItem: () => void;
}

const TasksModalContent: React.FC<TasksModalContentProps> = ({
                                                                 title,
                                                                 setTitle,
                                                                 description,
                                                                 setDescription,
                                                                 rotation,
                                                                 setRotation,
                                                                 assignedTo,
                                                                 setAssignedTo,
                                                                 startDay,
                                                                 setStartDay,
                                                                 status,
                                                                 setStatus,
                                                                 updateItem,
                                                                 deleteItem,
                                                                 selectedItem,
                                                                 onSubmitItem,
                                                             }) => {
    const { wg } = useWG();

    const handleStatusToggle = () => {
        setStatus(status === 'done' ? 'pending' : 'done');
    };

    const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
        const fromIndex = event.detail.from;
        const toIndex = event.detail.to;
        const newAssignedTo = [...assignedTo];
        const [movedItem] = newAssignedTo.splice(fromIndex, 1);
        newAssignedTo.splice(toIndex, 0, movedItem);
        setAssignedTo(newAssignedTo);
        event.detail.complete();
    };

    return (
        <div className="update-container">
            <IonItem className="input-item">
                <IonInput
                    placeholder="z.B. Müll rausbringen"
                    value={title}
                    onIonInput={(e) => setTitle(e.detail.value!)}
                />
            </IonItem>

            <IonItem className="input-item">
                <IonInput
                    placeholder="z.B. Biotonne"
                    value={description}
                    onIonInput={(e) => setDescription(e.detail.value!)}
                />
            </IonItem>

            <div className="flex-container">
                <IonItem className="input-item">
                    <IonSelect
                        placeholder="Turnus"
                        value={rotation || undefined}
                        onIonChange={(e) => setRotation(e.detail.value)}
                    >
                        <IonSelectOption value="none">Kein Turnus</IonSelectOption>
                        <IonSelectOption value="daily">Täglich</IonSelectOption>
                        <IonSelectOption value="weekly">Wöchentlich</IonSelectOption>
                        <IonSelectOption value="monthly">Monatlich</IonSelectOption>
                    </IonSelect>
                </IonItem>

                {(rotation === 'weekly' || rotation === 'monthly') && (
                    <IonItem className="input-item">
                        <IonSelect
                            placeholder="Starttag"
                            value={startDay || undefined}
                            onIonChange={(e) => setStartDay(e.detail.value)}
                        >
                            <IonSelectOption value="sunday">Sonntag</IonSelectOption>
                            <IonSelectOption value="monday">Montag</IonSelectOption>
                            <IonSelectOption value="tuesday">Dienstag</IonSelectOption>
                            <IonSelectOption value="wednesday">Mittwoch</IonSelectOption>
                            <IonSelectOption value="thursday">Donnerstag</IonSelectOption>
                            <IonSelectOption value="friday">Freitag</IonSelectOption>
                            <IonSelectOption value="saturday">Samstag</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                )}
            </div>

            <IonItem className="input-item">
                <IonSelect
                    multiple={true}
                    placeholder="Zugewiesen an"
                    value={assignedTo || undefined}
                    onIonChange={(e) => setAssignedTo(e.detail.value as string[])}
                >
                    {wg?.members.map((member) => (
                        <IonSelectOption key={member.uid} value={member.uid}>
                            {member.displayName}
                        </IonSelectOption>
                    ))}
                </IonSelect>
            </IonItem>

            <IonList className="reorder-list">
                <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
                    {assignedTo.map((uid, index) => {
                        const member = wg?.members.find(member => member.uid === uid);
                        return (
                            <IonItem key={uid}>
                                <IonLabel>{member ? member.displayName : 'Unbekannt'}</IonLabel>
                                <IonReorder slot="end"></IonReorder>
                            </IonItem>
                        );
                    })}
                </IonReorderGroup>
            </IonList>

            <div className="toggle-item">
                <IonLabel>Erledigt</IonLabel>
                <IonToggle checked={status === 'done'} onIonChange={handleStatusToggle} />
            </div>

            <IonButton expand="block" onClick={selectedItem ? updateItem : onSubmitItem} color="success">
                {selectedItem ? "Aktualisieren" : "Hinzufügen"}
            </IonButton>
            {selectedItem && (
                <IonButton expand="block" onClick={() => deleteItem(selectedItem.id)} color="danger">
                    Löschen
                </IonButton>
            )}
        </div>
    );

};

export default TasksModalContent;
