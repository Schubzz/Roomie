import React from 'react';
import {IonInput, IonButton, IonTextarea, IonItem, IonLabel, IonSelectOption, IonSelect, IonIcon} from '@ionic/react';
import { add } from 'ionicons/icons';

const TaskInput: React.FC<{
    title: string,
    setTitle: (value: string) => void,
    description: string,
    setDescription: (value: string) => void,
    rotation: string,
    setRotation: (value: string) => void,
    assignedTo: string[],
    setAssignedTo: (value: string[]) => void,
    onSubmit: () => void
}> = ({
          title,
          setTitle,
          description,
          setDescription,
          rotation,
          setRotation,
          assignedTo,
          setAssignedTo,
          onSubmit
      }) => {
    const handleAssignedToChange = (e: CustomEvent) => {
        const options = e.detail.value;
        setAssignedTo(options);
    };

    return (
        <div className="task-input-container">
            <IonItem>
                <IonLabel position="stacked">Titel</IonLabel>
                <IonInput
                    value={title}
                    onIonInput={(e) => setTitle(e.detail.value!)}
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Beschreibung</IonLabel>
                <IonTextarea
                    value={description}
                    onIonInput={(e) => setDescription(e.detail.value!)}
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Turnus</IonLabel>
                <IonSelect
                    value={rotation}
                    onIonChange={(e) => setRotation(e.detail.value)}
                >
                    <IonSelectOption value="none">Keiner</IonSelectOption>
                    <IonSelectOption value="daily">Täglich</IonSelectOption>
                    <IonSelectOption value="weekly">Wöchentlich</IonSelectOption>
                    <IonSelectOption value="monthly">Monatlich</IonSelectOption>
                </IonSelect>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Zugewiesen an</IonLabel>
                <IonSelect
                    multiple={true}
                    value={assignedTo}
                    onIonChange={(e) => setAssignedTo(e.detail.value as string[])}
                >
                    {/* Dummy Data */}
                    <IonSelectOption value="user1">User 1</IonSelectOption>
                    <IonSelectOption value="user2">User 2</IonSelectOption>
                    {/* Replace with dynamic data */}
                </IonSelect>
            </IonItem>

            <IonButton
                expand="block"
                onClick={onSubmit}
                color="success"
            >
                Hinzufügen
                <IonIcon icon={add} slot="end" />
            </IonButton>
        </div>
    );
};

export default TaskInput;
