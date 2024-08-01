import React from 'react';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

interface TasksFilterProps {
    filter: string;
    setFilter: (value: string) => void;
}

const TasksFilter: React.FC<TasksFilterProps> = ({ filter, setFilter }) => {
    return (
        <IonSegment value={filter} onIonChange={(e) => setFilter(e.detail.value as string)}>
            <IonSegmentButton value="all">
                <IonLabel>Alle Aufgaben</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="mine">
                <IonLabel>Meine Aufgaben</IonLabel>
            </IonSegmentButton>
        </IonSegment>
    );
};

export default TasksFilter;
